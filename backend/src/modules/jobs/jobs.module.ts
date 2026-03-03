import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Job } from './job.entity';
import { JobController } from './job.controller';
import { JobService } from './job.service';
import { JobRepository } from './job.repository';

@Module({
    imports: [TypeOrmModule.forFeature([Job])],
    controllers: [JobController],
    providers: [JobService, JobRepository],
    exports: [JobService, JobRepository],
})
export class JobsModule {}
