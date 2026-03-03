interface JobCardSkeletonProps {
  rounded?: boolean;
}

export default function JobCardSkeleton({ rounded = false }: JobCardSkeletonProps) {
  return (
    <div className={`flex flex-col gap-4 p-5 md:p-6 border border-[#d6ddeb] bg-white animate-pulse${rounded ? ' rounded-xl shadow-sm' : ''}`}>
      <div className="flex items-center justify-between">
        <div className="w-12 h-12 rounded-full bg-gray-200" />
        <div className="h-8 w-20 bg-gray-200 rounded" />
      </div>
      <div className="flex flex-col gap-1">
        <div className="h-5 w-3/4 bg-gray-200 rounded" />
        <div className="h-4 w-1/2 bg-gray-200 rounded" />
      </div>
      <div className="h-10 w-full bg-gray-200 rounded" />
      <div className="flex gap-2 mt-auto">
        <div className="h-6 w-16 bg-gray-200 rounded-full" />
        <div className="h-6 w-16 bg-gray-200 rounded-full" />
      </div>
    </div>
  );
}
