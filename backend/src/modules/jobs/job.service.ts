import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/core/base/base.service';
import {
    CreatedResponseDto,
    SuccessResponseDto,
    DeletedResponseDto,
    PaginatedResponseDto,
} from 'src/shared/dtos/response.dto';
import { Job } from './job.entity';
import { JobRepository } from './job.repository';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { JobFilterDto } from './dto/job-filter.dto';

@Injectable()
export class JobService extends BaseService<Job> {
    constructor(private readonly jobRepository: JobRepository) {
        super(jobRepository, 'Job');
    }

    /**
     * Get paginated and filtered list of jobs.
     * Uses full-text search, category, location, and status filters.
     */
    async findAllPaginated(
        filters: JobFilterDto,
    ): Promise<PaginatedResponseDto<Job>> {
        const page = filters.page || 1;
        const limit = filters.limit || 10;

        const [jobs, total] = await this.jobRepository.searchJobs(filters);

        return new PaginatedResponseDto<Job>(
            jobs,
            page,
            limit,
            total,
            'Jobs retrieved successfully',
        );
    }

    /**
     * Get a single job by ID wrapped in a success response.
     * Throws NotFoundException if the job does not exist.
     */
    async findOneById(id: string): Promise<SuccessResponseDto<Job>> {
        const job = await this.findByIdOrFail(id);

        return new SuccessResponseDto<Job>(job, 'Job retrieved successfully');
    }

    /**
     * Create a new job posting.
     * Optionally associates the job with the admin user who posted it.
     */
    async createJob(
        dto: CreateJobDto,
        postedById?: string,
    ): Promise<CreatedResponseDto<Job>> {
        const jobData: Partial<Job> = {
            ...dto,
            ...(postedById ? { postedById } : {}),
        };

        const job = await this.create(jobData);

        return new CreatedResponseDto<Job>(job, 'Job created successfully');
    }

    /**
     * Update an existing job by ID.
     * Throws NotFoundException if the job does not exist.
     */
    async updateJob(id: string, dto: UpdateJobDto): Promise<Job> {
        const updated = await this.update(id, dto);

        if (!updated) {
            return this.findByIdOrFail(id);
        }

        return updated;
    }

    /**
     * Soft delete a job by ID.
     * Throws NotFoundException if the job does not exist.
     */
    async removeJob(id: string): Promise<DeletedResponseDto> {
        await this.remove(id);

        return new DeletedResponseDto('Job deleted successfully');
    }
}
