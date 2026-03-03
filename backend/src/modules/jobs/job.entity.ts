import {
    Entity,
    Column,
    ManyToOne,
    OneToMany,
    Index,
    JoinColumn,
} from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { BaseEntity } from 'src/core/base';
import { JobCategoryEnum, JobTypeEnum, JobStatusEnum } from '@shared/enums';
import type { User } from '@modules/users/user.entity';
import type { Application } from '@modules/applications/application.entity';

@Entity('jobs')
@Index('IDX_jobs_category', ['category'])
@Index('IDX_jobs_location', ['location'])
@Index('IDX_jobs_status', ['status'])
@Index('IDX_jobs_created_at', ['createdAt'])
@Index('IDX_jobs_category_status', ['category', 'status'])
@Index('IDX_jobs_posted_by', ['postedById'])
@Index('IDX_jobs_deleted_at', ['deletedAt'])
export class Job extends BaseEntity {
    @ApiProperty({
        example: 'Senior Backend Engineer',
        description: 'Job position title',
        maxLength: 255,
    })
    @Column({ length: 255 })
    title: string;

    @ApiProperty({
        example: 'Acme Corp',
        description: 'Company offering the job',
        maxLength: 255,
    })
    @Column({ length: 255 })
    company: string;

    @ApiProperty({
        example: 'Dhaka, Bangladesh',
        description: 'Job location or "Remote"',
        maxLength: 255,
    })
    @Column({ length: 255 })
    location: string;

    @ApiProperty({
        enum: JobCategoryEnum,
        example: JobCategoryEnum.ENGINEERING,
        description: 'Job category',
    })
    @Column({ type: 'enum', enum: JobCategoryEnum })
    category: JobCategoryEnum;

    @ApiPropertyOptional({
        enum: JobTypeEnum,
        example: JobTypeEnum.FULL_TIME,
        description: 'Employment type',
    })
    @Column({ type: 'enum', enum: JobTypeEnum, nullable: true })
    type: JobTypeEnum | null;

    @ApiProperty({
        example: 'We are looking for a talented engineer...',
        description: 'Full job description',
    })
    @Column({ type: 'text' })
    description: string;

    @ApiPropertyOptional({
        example: '5+ years of experience with Node.js and TypeScript...',
        description: 'Job requirements and qualifications',
    })
    @Column({ type: 'text', nullable: true })
    requirements: string | null;

    @ApiPropertyOptional({
        example: '$80,000 - $100,000 per year',
        description: 'Salary range or compensation details',
        maxLength: 255,
    })
    @Column({ type: 'varchar', length: 255, nullable: true })
    salary: string | null;

    @ApiPropertyOptional({
        example: ['React', 'Node.js', 'PostgreSQL'],
        description: 'Tags or keywords for the job',
        type: [String],
    })
    @Column({ type: 'text', array: true, nullable: true })
    tags: string[] | null;

    @ApiProperty({
        enum: JobStatusEnum,
        example: JobStatusEnum.ACTIVE,
        description: 'Publication status',
        default: JobStatusEnum.ACTIVE,
    })
    @Column({
        type: 'enum',
        enum: JobStatusEnum,
        default: JobStatusEnum.ACTIVE,
    })
    status: JobStatusEnum;

    // tsvector column for full-text search — populated by DB trigger, never set via ORM
    @Column({
        name: 'search_vector',
        type: 'tsvector',
        nullable: true,
        select: false,
    })
    searchVector: unknown;

    @ApiPropertyOptional({
        example: 'uuid-of-admin-user',
        description: 'ID of the admin who posted this job',
    })
    @Column({ name: 'posted_by_id', nullable: true })
    postedById: string | null;

    @ManyToOne('User', { onDelete: 'SET NULL', nullable: true, eager: false })
    @JoinColumn({ name: 'posted_by_id' })
    postedBy: User | null;

    @OneToMany('Application', 'job', { cascade: false })
    applications: Application[];
}
