import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { ApplicationStatusEnum } from '@shared/enums';

export class UpdateApplicationStatusDto {
    @ApiProperty({
        enum: ApplicationStatusEnum,
        example: ApplicationStatusEnum.SHORTLISTED,
        description: 'New status for the application',
    })
    @IsEnum(ApplicationStatusEnum)
    status: ApplicationStatusEnum;
}
