import type { Job } from './job';
import type { ApplicationStatusEnum } from '~/enums/application-status.enum';

export type { ApplicationStatusEnum };

export interface Application {
  id: string;
  jobId: string;
  applicantName: string;
  email: string;
  phone?: string;
  coverLetter?: string;
  resumeUrl: string;
  status: ApplicationStatusEnum;
  createdAt: string;
  job?: Job;
}

export interface ApplicationState {
  applications: Application[];
  submittedApplication: Application | null;
  loading: boolean;
  error: string | null;
}

export interface CreateApplicationDto {
  jobId: string;
  applicantName: string;
  email: string;
  resumeLink: string;
  coverNote?: string;
}

export interface UpdateApplicationStatusDto {
  status: ApplicationStatusEnum;
}
