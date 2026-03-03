import { Entity, Column, ManyToOne, JoinColumn, Index, Unique } from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { BaseEntity } from 'src/core/base';
import { ApplicationStatusEnum } from '@shared/enums';
import type { Job } from '@modules/jobs/job.entity';

@Entity('applications')
@Unique('UQ_applications_job_email', ['jobId', 'email'])
@Index('IDX_applications_job_id', ['jobId'])
@Index('IDX_applications_email', ['email'])
@Index('IDX_applications_status', ['status'])
@Index('IDX_applications_created_at', ['createdAt'])
@Index('IDX_applications_deleted_at', ['deletedAt'])
export class Application extends BaseEntity {
    @ApiProperty({
        example: 'uuid-of-job',
        description: 'ID of the job being applied to',
    })
    @Column({ name: 'job_id' })
    jobId: string;

    @ManyToOne('Job', 'applications', { onDelete: 'CASCADE', eager: false })
    @JoinColumn({ name: 'job_id' })
    job: Job;

    @ApiProperty({
        example: 'Jane Doe',
        description: 'Applicant full name',
        maxLength: 100,
    })
    @Column({ name: 'applicant_name', length: 100 })
    applicantName: string;

    @ApiProperty({
        example: 'jane@example.com',
        description: 'Applicant email address',
        maxLength: 255,
    })
    @Column({ length: 255 })
    email: string;

    @ApiProperty({
        example: 'https://drive.google.com/file/d/abc123',
        description: 'URL to resume/CV',
    })
    @Column({ name: 'resume_link', type: 'text' })
    resumeLink: string;

    @ApiPropertyOptional({
        example: 'I am excited to apply for this role...',
        description: 'Optional cover note',
    })
    @Column({ name: 'cover_note', type: 'text', nullable: true })
    coverNote: string | null;

    @ApiProperty({
        enum: ApplicationStatusEnum,
        example: ApplicationStatusEnum.PENDING,
        description: 'Review status of the application',
        default: ApplicationStatusEnum.PENDING,
    })
    @Column({
        type: 'enum',
        enum: ApplicationStatusEnum,
        default: ApplicationStatusEnum.PENDING,
    })
    status: ApplicationStatusEnum;
}
