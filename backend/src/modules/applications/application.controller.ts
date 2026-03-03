import {
    Controller,
    Get,
    Post,
    Patch,
    Body,
    Param,
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
import { RolesGuard } from 'src/core/guards/roles.guard';
import { RolesEnum } from 'src/shared/enums/role.enum';
import {
    CreatedResponseDto,
    SuccessResponseDto,
    PaginatedResponseDto,
    UpdatedResponseDto,
} from 'src/shared/dtos/response.dto';
import { Application } from './application.entity';
import { ApplicationService } from './application.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationStatusDto } from './dto/update-application-status.dto';
import { ApplicationFilterDto } from './dto/application-filter.dto';

@ApiTags('Applications')
@Controller('applications')
@UseGuards(RolesGuard)
export class ApplicationController extends BaseController<
    Application,
    CreateApplicationDto,
    UpdateApplicationStatusDto
> {
    constructor(private readonly applicationService: ApplicationService) {
        super(applicationService);
    }

    /**
     * Submit a new job application.
     * Public endpoint - no authentication required.
     */
    @Post()
    @Public()
    @HttpCode(HttpStatus.CREATED)
    @ApiSwagger({
        resourceName: 'Application',
        operation: 'create',
        requestDto: CreateApplicationDto,
        responseDto: Application,
        successStatus: 201,
        requiresAuth: false,
        errors: [
            { status: 400, description: 'Job is not active or does not exist' },
            {
                status: 409,
                description: 'You have already applied for this job',
            },
        ],
    })
    async create(
        @Body() createApplicationDto: CreateApplicationDto,
    ): Promise<CreatedResponseDto<Application>> {
        return this.applicationService.submitApplication(createApplicationDto);
    }

    /**
     * Get all applications with filters and pagination.
     * Admin only.
     */
    @Get()
    @Roles(RolesEnum.ADMIN)
    @HttpCode(HttpStatus.OK)
    @ApiSwagger({
        resourceName: 'Applications',
        operation: 'getAll',
        responseDto: Application,
        isArray: true,
        requiresAuth: true,
        withPagination: true,
    })
    async findAll(
        @Query() filters: ApplicationFilterDto,
    ): Promise<PaginatedResponseDto<Application>> {
        return this.applicationService.findAllPaginated(filters);
    }

    /**
     * Get a single application by ID.
     * Admin only.
     */
    @Get(':id')
    @Roles(RolesEnum.ADMIN)
    @HttpCode(HttpStatus.OK)
    @ApiSwagger({
        resourceName: 'Application',
        operation: 'getOne',
        responseDto: Application,
        requiresAuth: true,
    })
    async findOne(
        @Param('id', ParseUUIDPipe) id: string,
    ): Promise<SuccessResponseDto<Application>> {
        return this.applicationService.findOneById(id);
    }

    /**
     * Update application status.
     * Admin only.
     */
    @Patch(':id/status')
    @Roles(RolesEnum.ADMIN)
    @HttpCode(HttpStatus.OK)
    @ApiSwagger({
        resourceName: 'Application',
        operation: 'update',
        requestDto: UpdateApplicationStatusDto,
        responseDto: Application,
        requiresAuth: true,
        summary: 'Update application status',
    })
    async updateStatus(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() dto: UpdateApplicationStatusDto,
    ): Promise<UpdatedResponseDto<Application>> {
        return this.applicationService.updateStatus(id, dto.status);
    }
}
