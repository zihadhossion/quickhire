import {
    Injectable,
    BadRequestException,
    ConflictException,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from 'src/core/base/base.service';
import {
    CreatedResponseDto,
    SuccessResponseDto,
    PaginatedResponseDto,
    UpdatedResponseDto,
} from 'src/shared/dtos/response.dto';
import { ApplicationStatusEnum, JobStatusEnum } from '@shared/enums';
import { Job } from '@modules/jobs/job.entity';
import { Application } from './application.entity';
import { ApplicationRepository } from './application.repository';
import { CreateApplicationDto } from './dto/create-application.dto';
import { ApplicationFilterDto } from './dto/application-filter.dto';

@Injectable()
export class ApplicationService extends BaseService<Application> {
    constructor(
        private readonly applicationRepository: ApplicationRepository,
        @InjectRepository(Job)
        private readonly jobRepository: Repository<Job>,
    ) {
        super(applicationRepository, 'Application');
    }

    /**
     * Get all applications with filters and pagination (admin only).
     */
    async findAllPaginated(
        filters: ApplicationFilterDto,
    ): Promise<PaginatedResponseDto<Application>> {
        const page = filters.page || 1;
        const limit = filters.limit || 10;

        const [applications, total] =
            await this.applicationRepository.searchApplications(filters);

        return new PaginatedResponseDto<Application>(
            applications,
            page,
            limit,
            total,
            'Applications retrieved successfully',
        );
    }

    /**
     * Get a single application by ID (admin only).
     */
    async findOneById(id: string): Promise<SuccessResponseDto<Application>> {
        const application = await this.applicationRepository.findById(id, {
            job: true,
        });

        if (!application) {
            throw new NotFoundException(`Application with ID ${id} not found`);
        }

        return new SuccessResponseDto<Application>(
            application,
            'Application retrieved successfully',
        );
    }

    /**
     * Submit a new job application (public endpoint).
     * 1. Verifies the job exists and is active.
     * 2. Creates the application record.
     * 3. Handles duplicate (job_id, email) constraint gracefully.
     */
    async submitApplication(
        dto: CreateApplicationDto,
    ): Promise<CreatedResponseDto<Application>> {
        // 1. Verify job exists and is active
        const job = await this.jobRepository.findOne({
            where: { id: dto.jobId, status: JobStatusEnum.ACTIVE },
        });

        if (!job) {
            throw new BadRequestException(
                'The job is not active or does not exist',
            );
        }

        // 2. Create the application, catch unique constraint violation
        try {
            const application = await this.applicationRepository.create({
                jobId: dto.jobId,
                applicantName: dto.applicantName,
                email: dto.email,
                resumeLink: dto.resumeLink,
                coverNote: dto.coverNote || null,
                status: ApplicationStatusEnum.PENDING,
            });

            return new CreatedResponseDto<Application>(
                application,
                'Application submitted successfully',
            );
        } catch (error: any) {
            // PostgreSQL unique constraint violation code
            if (error.code === '23505') {
                throw new ConflictException(
                    'You have already applied for this job',
                );
            }
            throw error;
        }
    }

    /**
     * Update the status of an application (admin only).
     */
    async updateStatus(
        id: string,
        status: ApplicationStatusEnum,
    ): Promise<UpdatedResponseDto<Application>> {
        const application = await this.applicationRepository.findById(id);

        if (!application) {
            throw new NotFoundException(`Application with ID ${id} not found`);
        }

        const updated = await this.applicationRepository.update(id, { status });

        if (!updated) {
            throw new NotFoundException(`Application with ID ${id} not found`);
        }

        return new UpdatedResponseDto<Application>(
            updated,
            'Application status updated successfully',
        );
    }
}
