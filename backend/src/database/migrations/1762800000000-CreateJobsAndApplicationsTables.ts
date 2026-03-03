import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateJobsAndApplicationsTables1762800000000
    implements MigrationInterface
{
    name = 'CreateJobsAndApplicationsTables1762800000000';

    public async up(queryRunner: QueryRunner): Promise<void> {
        // ── STEP 1: Create Enum Types ─────────────────────────────────────
        await queryRunner.query(`
            CREATE TYPE "public"."jobs_category_enum" AS ENUM(
                'engineering', 'design', 'marketing', 'sales', 'product',
                'data_science', 'finance', 'operations', 'hr',
                'customer_success', 'legal', 'other'
            )
        `);
        await queryRunner.query(`
            CREATE TYPE "public"."jobs_type_enum" AS ENUM(
                'full_time', 'part_time', 'contract', 'freelance',
                'internship', 'remote'
            )
        `);
        await queryRunner.query(`
            CREATE TYPE "public"."jobs_status_enum" AS ENUM(
                'active', 'closed', 'draft'
            )
        `);
        await queryRunner.query(`
            CREATE TYPE "public"."applications_status_enum" AS ENUM(
                'pending', 'reviewed', 'rejected', 'shortlisted'
            )
        `);

        // ── STEP 2: Create jobs table ─────────────────────────────────────
        await queryRunner.query(`
            CREATE TABLE "jobs" (
                "id"             uuid         NOT NULL DEFAULT uuid_generate_v4(),
                "created_at"     TIMESTAMP    NOT NULL DEFAULT now(),
                "updated_at"     TIMESTAMP    NOT NULL DEFAULT now(),
                "deleted_at"     TIMESTAMP,
                "title"          varchar(255) NOT NULL,
                "company"        varchar(255) NOT NULL,
                "location"       varchar(255) NOT NULL,
                "category"       "public"."jobs_category_enum" NOT NULL,
                "type"           "public"."jobs_type_enum",
                "description"    text         NOT NULL,
                "status"         "public"."jobs_status_enum" NOT NULL DEFAULT 'active',
                "search_vector"  tsvector,
                "posted_by_id"   uuid,
                CONSTRAINT "PK_jobs" PRIMARY KEY ("id")
            )
        `);

        // ── STEP 3: Create applications table ────────────────────────────
        await queryRunner.query(`
            CREATE TABLE "applications" (
                "id"             uuid         NOT NULL DEFAULT uuid_generate_v4(),
                "created_at"     TIMESTAMP    NOT NULL DEFAULT now(),
                "updated_at"     TIMESTAMP    NOT NULL DEFAULT now(),
                "deleted_at"     TIMESTAMP,
                "job_id"         uuid         NOT NULL,
                "applicant_name" varchar(100) NOT NULL,
                "email"          varchar(255) NOT NULL,
                "resume_link"    text         NOT NULL,
                "cover_note"     text,
                "status"         "public"."applications_status_enum" NOT NULL DEFAULT 'pending',
                CONSTRAINT "PK_applications" PRIMARY KEY ("id"),
                CONSTRAINT "UQ_applications_job_email" UNIQUE ("job_id", "email")
            )
        `);

        // ── STEP 4: Foreign Key Constraints ──────────────────────────────
        await queryRunner.query(`
            ALTER TABLE "jobs"
                ADD CONSTRAINT "FK_jobs_posted_by"
                FOREIGN KEY ("posted_by_id")
                REFERENCES "users"("id")
                ON DELETE SET NULL
                ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "applications"
                ADD CONSTRAINT "FK_applications_job"
                FOREIGN KEY ("job_id")
                REFERENCES "jobs"("id")
                ON DELETE CASCADE
                ON UPDATE NO ACTION
        `);

        // ── STEP 5: B-Tree Indexes on jobs ───────────────────────────────
        await queryRunner.query(
            `CREATE INDEX "IDX_jobs_category" ON "jobs" ("category")`,
        );
        await queryRunner.query(
            `CREATE INDEX "IDX_jobs_location" ON "jobs" ("location")`,
        );
        await queryRunner.query(
            `CREATE INDEX "IDX_jobs_status" ON "jobs" ("status")`,
        );
        await queryRunner.query(
            `CREATE INDEX "IDX_jobs_created_at" ON "jobs" ("created_at" DESC)`,
        );
        await queryRunner.query(
            `CREATE INDEX "IDX_jobs_category_status" ON "jobs" ("category", "status")`,
        );
        await queryRunner.query(
            `CREATE INDEX "IDX_jobs_posted_by" ON "jobs" ("posted_by_id")`,
        );
        await queryRunner.query(
            `CREATE INDEX "IDX_jobs_deleted_at" ON "jobs" ("deleted_at")`,
        );

        // ── STEP 6: B-Tree Indexes on applications ───────────────────────
        await queryRunner.query(
            `CREATE INDEX "IDX_applications_job_id" ON "applications" ("job_id")`,
        );
        await queryRunner.query(
            `CREATE INDEX "IDX_applications_email" ON "applications" ("email")`,
        );
        await queryRunner.query(
            `CREATE INDEX "IDX_applications_status" ON "applications" ("status")`,
        );
        await queryRunner.query(
            `CREATE INDEX "IDX_applications_created_at" ON "applications" ("created_at" DESC)`,
        );
        await queryRunner.query(
            `CREATE INDEX "IDX_applications_deleted_at" ON "applications" ("deleted_at")`,
        );

        // ── STEP 7: GIN Index for Full-Text Search ────────────────────────
        await queryRunner.query(
            `CREATE INDEX "IDX_jobs_search_fts" ON "jobs" USING GIN ("search_vector")`,
        );

        // ── STEP 8: FTS Trigger Function ─────────────────────────────────
        await queryRunner.query(`
            CREATE OR REPLACE FUNCTION jobs_search_vector_update()
            RETURNS TRIGGER AS $$
            BEGIN
                NEW.search_vector :=
                    setweight(to_tsvector('english', COALESCE(NEW.title, '')), 'A') ||
                    setweight(to_tsvector('english', COALESCE(NEW.company, '')), 'B') ||
                    setweight(to_tsvector('english', COALESCE(NEW.location, '')), 'C') ||
                    setweight(to_tsvector('english', COALESCE(CAST(NEW.category AS text), '')), 'C') ||
                    setweight(to_tsvector('english', COALESCE(NEW.description, '')), 'D');
                RETURN NEW;
            END;
            $$ LANGUAGE plpgsql
        `);

        // ── STEP 9: Attach Trigger ────────────────────────────────────────
        await queryRunner.query(`
            CREATE TRIGGER "trg_jobs_search_vector"
            BEFORE INSERT OR UPDATE ON "jobs"
            FOR EACH ROW EXECUTE FUNCTION jobs_search_vector_update()
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Reverse order: trigger → function → FKs → indexes → tables → enums
        await queryRunner.query(
            `DROP TRIGGER IF EXISTS "trg_jobs_search_vector" ON "jobs"`,
        );
        await queryRunner.query(
            `DROP FUNCTION IF EXISTS jobs_search_vector_update()`,
        );

        await queryRunner.query(
            `ALTER TABLE "applications" DROP CONSTRAINT "FK_applications_job"`,
        );
        await queryRunner.query(
            `ALTER TABLE "jobs" DROP CONSTRAINT "FK_jobs_posted_by"`,
        );

        await queryRunner.query(
            `DROP INDEX "public"."IDX_applications_deleted_at"`,
        );
        await queryRunner.query(
            `DROP INDEX "public"."IDX_applications_created_at"`,
        );
        await queryRunner.query(
            `DROP INDEX "public"."IDX_applications_status"`,
        );
        await queryRunner.query(`DROP INDEX "public"."IDX_applications_email"`);
        await queryRunner.query(
            `DROP INDEX "public"."IDX_applications_job_id"`,
        );

        await queryRunner.query(`DROP INDEX "public"."IDX_jobs_search_fts"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_jobs_deleted_at"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_jobs_posted_by"`);
        await queryRunner.query(
            `DROP INDEX "public"."IDX_jobs_category_status"`,
        );
        await queryRunner.query(`DROP INDEX "public"."IDX_jobs_created_at"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_jobs_status"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_jobs_location"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_jobs_category"`);

        await queryRunner.query(`DROP TABLE "applications"`);
        await queryRunner.query(`DROP TABLE "jobs"`);

        await queryRunner.query(
            `DROP TYPE "public"."applications_status_enum"`,
        );
        await queryRunner.query(`DROP TYPE "public"."jobs_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."jobs_type_enum"`);
        await queryRunner.query(`DROP TYPE "public"."jobs_category_enum"`);
    }
}
