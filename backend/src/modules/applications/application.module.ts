import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationController } from './application.controller';
import { ApplicationService } from './application.service';
import { ApplicationRepository } from './application.repository';
import { Application } from './application.entity';
import { Job } from '@modules/jobs/job.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Application, Job])],
    controllers: [ApplicationController],
    providers: [ApplicationService, ApplicationRepository],
    exports: [ApplicationService, ApplicationRepository],
})
export class ApplicationModule {}
