import { PartialType } from '@nestjs/swagger';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { JobStatusEnum } from '@shared/enums';
import { CreateJobDto } from './create-job.dto';

export class UpdateJobDto extends PartialType(CreateJobDto) {
    @ApiPropertyOptional({
        enum: JobStatusEnum,
        example: JobStatusEnum.CLOSED,
        description: 'Publication status',
    })
    @IsOptional()
    @IsEnum(JobStatusEnum)
    status?: JobStatusEnum;
}
