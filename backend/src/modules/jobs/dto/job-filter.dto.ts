import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { JobCategoryEnum, JobStatusEnum } from '@shared/enums';
import { PaginationDto } from 'src/shared/dtos/pagination.dto';

export class JobFilterDto extends PaginationDto {
    @ApiPropertyOptional({
        example: 'backend engineer',
        description:
            'Full-text search query against job title, company, and description',
    })
    @IsOptional()
    @IsString()
    search?: string;

    @ApiPropertyOptional({
        enum: JobCategoryEnum,
        example: JobCategoryEnum.ENGINEERING,
        description: 'Filter by job category',
    })
    @IsOptional()
    @IsEnum(JobCategoryEnum)
    category?: JobCategoryEnum;

    @ApiPropertyOptional({
        example: 'Dhaka',
        description: 'Filter by location (case-insensitive partial match)',
    })
    @IsOptional()
    @IsString()
    location?: string;

    @ApiPropertyOptional({
        enum: JobStatusEnum,
        example: JobStatusEnum.ACTIVE,
        description:
            'Filter by job status (defaults to active for public queries)',
    })
    @IsOptional()
    @IsEnum(JobStatusEnum)
    status?: JobStatusEnum;
}
