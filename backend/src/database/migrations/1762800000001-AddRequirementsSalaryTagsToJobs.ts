import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRequirementsSalaryTagsToJobs1762800000001
    implements MigrationInterface
{
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "jobs" ADD COLUMN IF NOT EXISTS "requirements" text`,
        );
        await queryRunner.query(
            `ALTER TABLE "jobs" ADD COLUMN IF NOT EXISTS "salary" character varying(255)`,
        );
        await queryRunner.query(
            `ALTER TABLE "jobs" ADD COLUMN IF NOT EXISTS "tags" text[]`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "jobs" DROP COLUMN IF EXISTS "tags"`,
        );
        await queryRunner.query(
            `ALTER TABLE "jobs" DROP COLUMN IF EXISTS "salary"`,
        );
        await queryRunner.query(
            `ALTER TABLE "jobs" DROP COLUMN IF EXISTS "requirements"`,
        );
    }
}
