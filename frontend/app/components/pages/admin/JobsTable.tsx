import type { Job } from '~/types/job';
import { JobCategoryEnum, JOB_CATEGORY_LABELS } from '~/enums/job-category.enum';
import { JobTypeEnum, JOB_TYPE_LABELS } from '~/enums/job-type.enum';

interface JobsTableProps {
  jobs: Job[];
  loading: boolean;
  onEdit: (job: Job) => void;
  onDeleteRequest: (id: string) => void;
}

export default function JobsTable({ jobs, loading, onEdit, onDeleteRequest }: JobsTableProps) {
  if (loading) {
    return (
      <div className="p-6 space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center gap-4 animate-pulse">
            <div className="h-4 w-1/5 bg-gray-200 rounded" />
            <div className="h-4 w-1/6 bg-gray-200 rounded" />
            <div className="h-4 w-1/6 bg-gray-200 rounded" />
            <div className="h-4 w-1/8 bg-gray-200 rounded" />
            <div className="h-4 w-1/8 bg-gray-200 rounded" />
          </div>
        ))}
      </div>
    );
  }

  if (jobs.length === 0) {
    return (
      <div className="p-12 text-center">
        <p
          className="text-[16px] text-[#7c8493] mb-4"
          style={{ fontFamily: "'Epilogue', sans-serif" }}
        >
          No jobs posted yet.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-[#d6ddeb] bg-[#f8f8fd]">
            <th
              className="text-left px-6 py-3 text-[12px] font-semibold text-[#7c8493] uppercase tracking-wider"
              style={{ fontFamily: "'Epilogue', sans-serif" }}
            >
              Title
            </th>
            <th
              className="text-left px-6 py-3 text-[12px] font-semibold text-[#7c8493] uppercase tracking-wider"
              style={{ fontFamily: "'Epilogue', sans-serif" }}
            >
              Company
            </th>
            <th
              className="text-left px-6 py-3 text-[12px] font-semibold text-[#7c8493] uppercase tracking-wider"
              style={{ fontFamily: "'Epilogue', sans-serif" }}
            >
              Location
            </th>
            <th
              className="text-left px-6 py-3 text-[12px] font-semibold text-[#7c8493] uppercase tracking-wider"
              style={{ fontFamily: "'Epilogue', sans-serif" }}
            >
              Type
            </th>
            <th
              className="text-left px-6 py-3 text-[12px] font-semibold text-[#7c8493] uppercase tracking-wider"
              style={{ fontFamily: "'Epilogue', sans-serif" }}
            >
              Category
            </th>
            <th
              className="text-left px-6 py-3 text-[12px] font-semibold text-[#7c8493] uppercase tracking-wider"
              style={{ fontFamily: "'Epilogue', sans-serif" }}
            >
              Created
            </th>
            <th
              className="text-right px-6 py-3 text-[12px] font-semibold text-[#7c8493] uppercase tracking-wider"
              style={{ fontFamily: "'Epilogue', sans-serif" }}
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => (
            <tr
              key={job.id}
              className="border-b border-[#d6ddeb] last:border-b-0 hover:bg-[#f8f8fd] transition-colors"
            >
              <td
                className="px-6 py-4 text-[14px] font-medium text-[#25324b]"
                style={{ fontFamily: "'Epilogue', sans-serif" }}
              >
                {job.title}
              </td>
              <td
                className="px-6 py-4 text-[14px] text-[#515b6f]"
                style={{ fontFamily: "'Epilogue', sans-serif" }}
              >
                {job.company}
              </td>
              <td
                className="px-6 py-4 text-[14px] text-[#515b6f]"
                style={{ fontFamily: "'Epilogue', sans-serif" }}
              >
                {job.location}
              </td>
              <td className="px-6 py-4">
                <span
                  className="text-[12px] font-semibold text-[#4640de] border border-[#4640de] px-2 py-0.5 rounded-full"
                  style={{ fontFamily: "'Epilogue', sans-serif" }}
                >
                  {JOB_TYPE_LABELS[job.type as JobTypeEnum] ?? job.type}
                </span>
              </td>
              <td
                className="px-6 py-4 text-[14px] text-[#515b6f]"
                style={{ fontFamily: "'Epilogue', sans-serif" }}
              >
                {JOB_CATEGORY_LABELS[job.category as JobCategoryEnum] ?? job.category}
              </td>
              <td
                className="px-6 py-4 text-[14px] text-[#515b6f]"
                style={{ fontFamily: "'Epilogue', sans-serif" }}
              >
                {new Date(job.createdAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center justify-end gap-2">
                  <button
                    onClick={() => onEdit(job)}
                    className="px-3 py-1.5 text-[12px] font-semibold text-[#4640de] border border-[#4640de] rounded hover:bg-[#4640de] hover:text-white transition-colors"
                    style={{ fontFamily: "'Epilogue', sans-serif" }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDeleteRequest(job.id)}
                    className="px-3 py-1.5 text-[12px] font-semibold text-red-600 border border-red-300 rounded hover:bg-red-600 hover:text-white transition-colors"
                    style={{ fontFamily: "'Epilogue', sans-serif" }}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
