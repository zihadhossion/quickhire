import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Query,
    UseGuards,
    HttpCode,
    HttpStatus,
    ParseUUIDPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BaseController } from 'src/core/base/base.controller';
import { ApiSwagger } from 'src/core/decorators/api-swagger.decorator';
import { Public } from 'src/core/decorators/public.decorator';
import { Roles } from 'src/core/decorators/roles.decorator';
import { CurrentUser } from 'src/core/decorators/current-user.decorator';
import { RolesGuard } from 'src/core/guards/roles.guard';
import { RolesEnum } from 'src/shared/enums/role.enum';
import {
    CreatedResponseDto,
    SuccessResponseDto,
    UpdatedResponseDto,
    DeletedResponseDto,
    PaginatedResponseDto,
} from 'src/shared/dtos/response.dto';
import { JobService } from './job.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { JobFilterDto } from './dto/job-filter.dto';
import { Job } from './job.entity';

@ApiTags('Jobs')
@Controller('jobs')
@UseGuards(RolesGuard)
export class JobController extends BaseController<
    Job,
    CreateJobDto,
    UpdateJobDto
> {
    constructor(private readonly jobService: JobService) {
        super(jobService);
    }

    /**
     * Get all jobs with pagination and filters.
     * Public endpoint - no authentication required.
     * Supports full-text search, category, location, and status filters.
     *
     * GET /jobs?page=1&limit=10&search=engineer&category=engineering&location=Dhaka&status=active
     */
    @Get()
    @Public()
    @HttpCode(HttpStatus.OK)
    @ApiSwagger({
        resourceName: 'Jobs',
        operation: 'getAll',
        responseDto: Job,
        isArray: true,
        requiresAuth: false,
        withPagination: true,
    })
    async findAll(
        @Query() filters: JobFilterDto,
    ): Promise<PaginatedResponseDto<Job>> {
        return this.jobService.findAllPaginated(filters);
    }

    /**
     * Get a single job by ID.
     * Public endpoint - no authentication required.
     *
     * GET /jobs/:id
     */
    @Get(':id')
    @Public()
    @HttpCode(HttpStatus.OK)
    @ApiSwagger({
        resourceName: 'Job',
        operation: 'getOne',
        responseDto: Job,
        requiresAuth: false,
    })
    async findOne(
        @Param('id', ParseUUIDPipe) id: string,
    ): Promise<SuccessResponseDto<Job>> {
        return this.jobService.findOneById(id);
    }

    /**
     * Create a new job posting.
     * Admin only - requires authentication.
     * Associates the job with the authenticated admin user.
     *
     * POST /jobs
     */
    @Post()
    @Roles(RolesEnum.ADMIN)
    @HttpCode(HttpStatus.CREATED)
    @ApiSwagger({
        resourceName: 'Job',
        operation: 'create',
        requestDto: CreateJobDto,
        responseDto: Job,
        successStatus: 201,
        requiresAuth: true,
    })
    async create(
        @Body() createJobDto: CreateJobDto,
        @CurrentUser('id') postedById?: string,
    ): Promise<CreatedResponseDto<Job>> {
        return this.jobService.createJob(createJobDto, postedById);
    }

    /**
     * Update an existing job by ID.
     * Admin only - requires authentication.
     *
     * PATCH /jobs/:id
     */
    @Patch(':id')
    @Roles(RolesEnum.ADMIN)
    @HttpCode(HttpStatus.OK)
    @ApiSwagger({
        resourceName: 'Job',
        operation: 'update',
        requestDto: UpdateJobDto,
        responseDto: Job,
        requiresAuth: true,
    })
    async update(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() updateJobDto: UpdateJobDto,
    ): Promise<UpdatedResponseDto<Job>> {
        const job = await this.jobService.updateJob(id, updateJobDto);
        return new UpdatedResponseDto(job, 'Job updated successfully');
    }

    /**
     * Soft delete a job by ID.
     * Admin only - requires authentication.
     *
     * DELETE /jobs/:id
     */
    @Delete(':id')
    @Roles(RolesEnum.ADMIN)
    @HttpCode(HttpStatus.OK)
    @ApiSwagger({
        resourceName: 'Job',
        operation: 'delete',
        requiresAuth: true,
    })
    async remove(
        @Param('id', ParseUUIDPipe) id: string,
    ): Promise<DeletedResponseDto> {
        return this.jobService.removeJob(id);
    }
}
