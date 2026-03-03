export enum JobTypeEnum {
  FULL_TIME = 'full_time',
  PART_TIME = 'part_time',
  CONTRACT = 'contract',
  FREELANCE = 'freelance',
  INTERNSHIP = 'internship',
  REMOTE = 'remote',
}

export const JOB_TYPE_LABELS: Record<JobTypeEnum, string> = {
  [JobTypeEnum.FULL_TIME]: 'Full Time',
  [JobTypeEnum.PART_TIME]: 'Part Time',
  [JobTypeEnum.CONTRACT]: 'Contract',
  [JobTypeEnum.FREELANCE]: 'Freelance',
  [JobTypeEnum.INTERNSHIP]: 'Internship',
  [JobTypeEnum.REMOTE]: 'Remote',
};
