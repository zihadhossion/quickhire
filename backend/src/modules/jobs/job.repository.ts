import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from 'src/core/base/base.repository';
import { Job } from './job.entity';
import { JobFilterDto } from './dto/job-filter.dto';
import { JobStatusEnum } from '@shared/enums';

@Injectable()
export class JobRepository extends BaseRepository<Job> {
    constructor(
        @InjectRepository(Job)
        private readonly jobRepository: Repository<Job>,
    ) {
        super(jobRepository);
    }

    /**
     * Search jobs with full-text search, category, location, and status filters.
     * Returns a tuple of [jobs, totalCount] for pagination.
     *
     * - Uses PostgreSQL tsvector for full-text search when `search` is provided
     * - Filters by category (exact match) and location (case-insensitive ILIKE)
     * - Defaults to active jobs if no status is specified
     * - Orders by search relevance (ts_rank) when searching, otherwise by created_at DESC
     */
    async searchJobs(filters: JobFilterDto): Promise<[Job[], number]> {
        const {
            search,
            category,
            location,
            status,
            page = 1,
            limit = 10,
        } = filters;

        const offset = (page - 1) * limit;
        const jobStatus = status || JobStatusEnum.ACTIVE;

        const qb = this.jobRepository
            .createQueryBuilder('job')
            .where('job.status = :jobStatus', { jobStatus })
            .andWhere('job.deleted_at IS NULL');

        // Full-text search using tsvector
        if (search) {
            qb.andWhere(
                'job.search_vector @@ plainto_tsquery(:language, :search)',
                { language: 'english', search },
            );
        }

        // Category filter (exact match)
        if (category) {
            qb.andWhere('job.category = :category', { category });
        }

        // Location filter (case-insensitive partial match)
        if (location) {
            qb.andWhere('LOWER(job.location) ILIKE :location', {
                location: `%${location.toLowerCase()}%`,
            });
        }

        // Order by relevance when searching, otherwise by creation date
        if (search) {
            qb.addOrderBy(
                'ts_rank(job.search_vector, plainto_tsquery(:language, :search))',
                'DESC',
            );
        }
        qb.addOrderBy('job.created_at', 'DESC');

        // Pagination
        qb.skip(offset).take(limit);

        return qb.getManyAndCount();
    }
}
