import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
    IsString,
    IsEnum,
    IsOptional,
    IsArray,
    MinLength,
    MaxLength,
} from 'class-validator';
import { JobCategoryEnum, JobTypeEnum } from '@shared/enums';

export class CreateJobDto {
    @ApiProperty({
        example: 'Senior Backend Engineer',
        description: 'Job position title',
        minLength: 3,
        maxLength: 255,
    })
    @IsString()
    @MinLength(3)
    @MaxLength(255)
    title: string;

    @ApiProperty({
        example: 'Acme Corp',
        description: 'Company offering the job',
        minLength: 2,
        maxLength: 255,
    })
    @IsString()
    @MinLength(2)
    @MaxLength(255)
    company: string;

    @ApiProperty({
        example: 'Dhaka, Bangladesh',
        description: 'Job location or "Remote"',
        minLength: 2,
        maxLength: 255,
    })
    @IsString()
    @MinLength(2)
    @MaxLength(255)
    location: string;

    @ApiProperty({
        enum: JobCategoryEnum,
        example: JobCategoryEnum.ENGINEERING,
        description: 'Job category',
    })
    @IsEnum(JobCategoryEnum)
    category: JobCategoryEnum;

    @ApiPropertyOptional({
        enum: JobTypeEnum,
        example: JobTypeEnum.FULL_TIME,
        description: 'Employment type',
    })
    @IsOptional()
    @IsEnum(JobTypeEnum)
    type?: JobTypeEnum;

    @ApiProperty({
        example:
            'We are looking for a talented engineer to join our growing team and work on cutting-edge projects...',
        description: 'Full job description (minimum 20 characters)',
        minLength: 20,
    })
    @IsString()
    @MinLength(20)
    description: string;

    @ApiPropertyOptional({
        example: '5+ years of experience with Node.js and TypeScript...',
        description:
            'Job requirements and qualifications (minimum 10 characters)',
        minLength: 10,
    })
    @IsOptional()
    @IsString()
    @MinLength(10)
    requirements?: string;

    @ApiPropertyOptional({
        example: '$80,000 - $100,000 per year',
        description: 'Salary range or compensation details',
        maxLength: 255,
    })
    @IsOptional()
    @IsString()
    @MaxLength(255)
    salary?: string;

    @ApiPropertyOptional({
        example: ['React', 'Node.js', 'PostgreSQL'],
        description: 'Tags or keywords for the job',
        type: [String],
    })
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    tags?: string[];
}
