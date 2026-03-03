import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
    IsString,
    IsEmail,
    IsUUID,
    IsOptional,
    IsUrl,
    MinLength,
    MaxLength,
} from 'class-validator';

export class CreateApplicationDto {
    @ApiProperty({
        example: '550e8400-e29b-41d4-a716-446655440000',
        description: 'UUID of the job to apply for',
        format: 'uuid',
    })
    @IsUUID()
    jobId: string;

    @ApiProperty({
        example: 'Jane Doe',
        description: 'Full name of the applicant (2-100 characters)',
        minLength: 2,
        maxLength: 100,
    })
    @IsString()
    @MinLength(2)
    @MaxLength(100)
    applicantName: string;

    @ApiProperty({
        example: 'jane@example.com',
        description: 'Email address of the applicant',
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        example: 'https://drive.google.com/file/d/abc123',
        description: 'URL to the resume or CV document',
    })
    @IsUrl({}, { message: 'resumeLink must be a valid URL' })
    resumeLink: string;

    @ApiPropertyOptional({
        example: 'I am excited to apply for this role because...',
        description: 'Optional cover note (max 2000 characters)',
        maxLength: 2000,
    })
    @IsOptional()
    @IsString()
    @MaxLength(2000)
    coverNote?: string;
}
