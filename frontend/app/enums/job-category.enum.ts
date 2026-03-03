export enum JobCategoryEnum {
  ENGINEERING = 'engineering',
  DESIGN = 'design',
  MARKETING = 'marketing',
  SALES = 'sales',
  PRODUCT = 'product',
  DATA_SCIENCE = 'data_science',
  FINANCE = 'finance',
  OPERATIONS = 'operations',
  HR = 'hr',
  CUSTOMER_SUCCESS = 'customer_success',
  LEGAL = 'legal',
  OTHER = 'other',
}

export const JOB_CATEGORY_LABELS: Record<JobCategoryEnum, string> = {
  [JobCategoryEnum.ENGINEERING]: 'Engineering',
  [JobCategoryEnum.DESIGN]: 'Design',
  [JobCategoryEnum.MARKETING]: 'Marketing',
  [JobCategoryEnum.SALES]: 'Sales',
  [JobCategoryEnum.PRODUCT]: 'Product',
  [JobCategoryEnum.DATA_SCIENCE]: 'Data Science',
  [JobCategoryEnum.FINANCE]: 'Finance',
  [JobCategoryEnum.OPERATIONS]: 'Operations',
  [JobCategoryEnum.HR]: 'Human Resource',
  [JobCategoryEnum.CUSTOMER_SUCCESS]: 'Customer Service',
  [JobCategoryEnum.LEGAL]: 'Legal',
  [JobCategoryEnum.OTHER]: 'Others',
};
