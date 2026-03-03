import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsUUID, IsEnum } from 'class-validator';
import { PaginationDto } from 'src/shared/dtos/pagination.dto';
import { ApplicationStatusEnum } from '@shared/enums';

export class ApplicationFilterDto extends PaginationDto {
    @ApiPropertyOptional({
        example: '550e8400-e29b-41d4-a716-446655440000',
        description: 'Filter by job ID',
        format: 'uuid',
    })
    @IsOptional()
    @IsUUID()
    jobId?: string;

    @ApiPropertyOptional({
        enum: ApplicationStatusEnum,
        example: ApplicationStatusEnum.PENDING,
        description: 'Filter by application status',
    })
    @IsOptional()
    @IsEnum(ApplicationStatusEnum)
    status?: ApplicationStatusEnum;
}
