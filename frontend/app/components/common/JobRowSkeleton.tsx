export default function JobRowSkeleton() {
  return (
    <div className="flex items-center gap-4 md:gap-6 p-4 md:p-6 bg-white border border-[#d6ddeb] animate-pulse">
      <div className="w-12 h-12 md:w-16 md:h-16 bg-gray-200 shrink-0" />
      <div className="flex-1 min-w-0 space-y-2">
        <div className="h-5 w-1/2 bg-gray-200 rounded" />
        <div className="h-4 w-1/3 bg-gray-200 rounded" />
        <div className="flex gap-2">
          <div className="h-6 w-16 bg-gray-200 rounded-full" />
          <div className="h-6 w-16 bg-gray-200 rounded-full" />
        </div>
      </div>
    </div>
  );
}
