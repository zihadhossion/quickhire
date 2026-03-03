export default function JobDetailSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-8 w-2/3 bg-gray-200 rounded mb-4" />
      <div className="h-5 w-1/3 bg-gray-200 rounded mb-8" />
      <div className="space-y-3">
        <div className="h-4 w-full bg-gray-200 rounded" />
        <div className="h-4 w-full bg-gray-200 rounded" />
        <div className="h-4 w-3/4 bg-gray-200 rounded" />
      </div>
    </div>
  );
}
