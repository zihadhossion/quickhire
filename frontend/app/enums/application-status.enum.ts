export enum ApplicationStatusEnum {
  PENDING = 'pending',
  REVIEWED = 'reviewed',
  REJECTED = 'rejected',
  SHORTLISTED = 'shortlisted',
}

export const APPLICATION_STATUS_LABELS: Record<ApplicationStatusEnum, string> = {
  [ApplicationStatusEnum.PENDING]: 'Pending',
  [ApplicationStatusEnum.REVIEWED]: 'Reviewed',
  [ApplicationStatusEnum.REJECTED]: 'Rejected',
  [ApplicationStatusEnum.SHORTLISTED]: 'Shortlisted',
};

export const APPLICATION_STATUS_COLORS: Record<ApplicationStatusEnum, string> = {
  [ApplicationStatusEnum.PENDING]: 'bg-yellow-100 text-yellow-800',
  [ApplicationStatusEnum.REVIEWED]: 'bg-blue-100 text-blue-800',
  [ApplicationStatusEnum.SHORTLISTED]: 'bg-green-100 text-green-800',
  [ApplicationStatusEnum.REJECTED]: 'bg-red-100 text-red-800',
};
