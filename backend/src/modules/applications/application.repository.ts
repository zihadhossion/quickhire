import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from 'src/core/base/base.repository';
import { Application } from './application.entity';
import { ApplicationFilterDto } from './dto/application-filter.dto';

@Injectable()
export class ApplicationRepository extends BaseRepository<Application> {
    constructor(
        @InjectRepository(Application)
        private readonly applicationRepo: Repository<Application>,
    ) {
        super(applicationRepo);
    }

    /**
     * Search applications with filters and pagination.
     * Returns [applications, total] with the job relation loaded.
     */
    async searchApplications(
        filters: ApplicationFilterDto,
    ): Promise<[Application[], number]> {
        const page = filters.page || 1;
        const limit = filters.limit || 10;
        const offset = (page - 1) * limit;

        const qb = this.applicationRepo
            .createQueryBuilder('application')
            .leftJoinAndSelect('application.job', 'job')
            .where('application.deleted_at IS NULL');

        if (filters.jobId) {
            qb.andWhere('application.job_id = :jobId', {
                jobId: filters.jobId,
            });
        }

        if (filters.status) {
            qb.andWhere('application.status = :status', {
                status: filters.status,
            });
        }

        qb.orderBy('application.created_at', 'DESC')
            .offset(offset)
            .limit(limit);

        return qb.getManyAndCount();
    }

    /**
     * Bulk soft-delete all applications for a given job.
     * Sets deleted_at = NOW() where job_id matches and not already deleted.
     */
    async softDeleteByJobId(jobId: string): Promise<void> {
        await this.applicationRepo
            .createQueryBuilder()
            .update(Application)
            .set({ deletedAt: () => 'NOW()' })
            .where('job_id = :jobId AND deleted_at IS NULL', { jobId })
            .execute();
    }
}
