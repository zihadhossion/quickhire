export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  category: string;
  type: string;
  description: string;
  requirements: string | null;
  salary: string | null;
  tags: string[] | null;
  logoUrl?: string;
  createdAt: string;
}

export interface JobState {
  jobs: Job[];
  selectedJob: Job | null;
  loading: boolean;
  error: string | null;
  total: number;
  page: number;
  limit: number;
}

export interface FetchJobsParams {
  search?: string;
  category?: string;
  type?: string;
  location?: string;
  page?: number;
  limit?: number;
}

export interface CreateJobDto {
  title: string;
  company: string;
  location: string;
  category: string;
  type: string;
  description: string;
  requirements?: string;
  salary?: string;
  tags?: string[];
}

export interface UpdateJobDto extends Partial<CreateJobDto> {}

export interface PaginatedJobsResponse {
  data: Job[];
  total: number;
  page: number;
  limit: number;
}
