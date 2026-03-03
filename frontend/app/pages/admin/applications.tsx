import { useEffect, useState, useCallback, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '~/redux/store/hooks';
import { fetchApplications, updateApplicationStatus } from '~/services/httpServices/applicationService';
import type { Application, UpdateApplicationStatusDto } from '~/types/application';
import { ApplicationStatusEnum, APPLICATION_STATUS_LABELS, APPLICATION_STATUS_COLORS } from '~/enums/application-status.enum';

const STATUS_OPTIONS = Object.values(ApplicationStatusEnum);

export default function AdminApplications() {
  const dispatch = useAppDispatch();
  const { applications, loading } = useAppSelector(
    (state) => state.applications
  );
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchApplications());
  }, [dispatch]);

  const filteredApplications = useMemo(() => {
    if (statusFilter === 'All') return applications;
    return applications.filter((a) => a.status === statusFilter);
  }, [applications, statusFilter]);

  const handleStatusChange = useCallback(
    async (id: string, status: Application['status']) => {
      setUpdatingId(id);
      const dto: UpdateApplicationStatusDto = { status };
      try {
        await dispatch(updateApplicationStatus({ id, dto })).unwrap();
      } catch {
        // error handled by Redux
      } finally {
        setUpdatingId(null);
      }
    },
    [dispatch]
  );

  return (
    <div className="p-6 md:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <h1
          className="text-[24px] md:text-[32px] font-semibold text-[#25324b]"
          style={{ fontFamily: "'Clash Display', sans-serif" }}
        >
          Applications
        </h1>

        {/* Status Filter */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2.5 border border-[#d6ddeb] bg-white rounded text-[14px] text-[#515b6f] focus:outline-none focus:border-[#4640de] transition-colors"
          style={{ fontFamily: "'Epilogue', sans-serif" }}
        >
          <option value="All">All Statuses</option>
          {STATUS_OPTIONS.map((s) => (
            <option key={s} value={s}>
              {APPLICATION_STATUS_LABELS[s]}
            </option>
          ))}
        </select>
      </div>

      {/* Applications Table */}
      <div className="border border-[#d6ddeb] rounded-xl bg-white shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-6 space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center gap-4 animate-pulse">
                <div className="h-4 w-1/5 bg-gray-200 rounded" />
                <div className="h-4 w-1/5 bg-gray-200 rounded" />
                <div className="h-4 w-1/5 bg-gray-200 rounded" />
                <div className="h-4 w-1/8 bg-gray-200 rounded" />
                <div className="h-4 w-1/8 bg-gray-200 rounded" />
              </div>
            ))}
          </div>
        ) : filteredApplications.length === 0 ? (
          <div className="p-12 text-center">
            <p
              className="text-[16px] text-[#7c8493]"
              style={{ fontFamily: "'Epilogue', sans-serif" }}
            >
              {statusFilter === 'All'
                ? 'No applications yet.'
                : `No ${APPLICATION_STATUS_LABELS[statusFilter as ApplicationStatusEnum]?.toLowerCase() ?? statusFilter.toLowerCase()} applications.`}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#d6ddeb] bg-[#f8f8fd]">
                  <th
                    className="text-left px-6 py-3 text-[12px] font-semibold text-[#7c8493] uppercase tracking-wider"
                    style={{ fontFamily: "'Epilogue', sans-serif" }}
                  >
                    Applicant
                  </th>
                  <th
                    className="text-left px-6 py-3 text-[12px] font-semibold text-[#7c8493] uppercase tracking-wider"
                    style={{ fontFamily: "'Epilogue', sans-serif" }}
                  >
                    Email
                  </th>
                  <th
                    className="text-left px-6 py-3 text-[12px] font-semibold text-[#7c8493] uppercase tracking-wider"
                    style={{ fontFamily: "'Epilogue', sans-serif" }}
                  >
                    Job Title
                  </th>
                  <th
                    className="text-left px-6 py-3 text-[12px] font-semibold text-[#7c8493] uppercase tracking-wider"
                    style={{ fontFamily: "'Epilogue', sans-serif" }}
                  >
                    Phone
                  </th>
                  <th
                    className="text-left px-6 py-3 text-[12px] font-semibold text-[#7c8493] uppercase tracking-wider"
                    style={{ fontFamily: "'Epilogue', sans-serif" }}
                  >
                    Status
                  </th>
                  <th
                    className="text-left px-6 py-3 text-[12px] font-semibold text-[#7c8493] uppercase tracking-wider"
                    style={{ fontFamily: "'Epilogue', sans-serif" }}
                  >
                    Date Applied
                  </th>
                  <th
                    className="text-left px-6 py-3 text-[12px] font-semibold text-[#7c8493] uppercase tracking-wider"
                    style={{ fontFamily: "'Epilogue', sans-serif" }}
                  >
                    Resume
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredApplications.map((app) => (
                  <tr
                    key={app.id}
                    className="border-b border-[#d6ddeb] last:border-b-0 hover:bg-[#f8f8fd] transition-colors"
                  >
                    <td
                      className="px-6 py-4 text-[14px] font-medium text-[#25324b]"
                      style={{ fontFamily: "'Epilogue', sans-serif" }}
                    >
                      {app.applicantName}
                    </td>
                    <td
                      className="px-6 py-4 text-[14px] text-[#515b6f]"
                      style={{ fontFamily: "'Epilogue', sans-serif" }}
                    >
                      {app.email}
                    </td>
                    <td
                      className="px-6 py-4 text-[14px] text-[#515b6f]"
                      style={{ fontFamily: "'Epilogue', sans-serif" }}
                    >
                      {app.job?.title ?? '-'}
                    </td>
                    <td
                      className="px-6 py-4 text-[14px] text-[#515b6f]"
                      style={{ fontFamily: "'Epilogue', sans-serif" }}
                    >
                      {app.phone ?? '-'}
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={app.status}
                        onChange={(e) =>
                          handleStatusChange(
                            app.id,
                            e.target.value as ApplicationStatusEnum
                          )
                        }
                        disabled={updatingId === app.id}
                        className={`px-2 py-1 rounded-full text-[12px] font-semibold border-0 focus:outline-none focus:ring-2 focus:ring-[#4640de] cursor-pointer disabled:opacity-50 ${
                          APPLICATION_STATUS_COLORS[app.status] ?? 'bg-gray-100 text-gray-800'
                        }`}
                        style={{ fontFamily: "'Epilogue', sans-serif" }}
                      >
                        {STATUS_OPTIONS.map((s) => (
                          <option key={s} value={s}>
                            {APPLICATION_STATUS_LABELS[s]}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td
                      className="px-6 py-4 text-[14px] text-[#515b6f]"
                      style={{ fontFamily: "'Epilogue', sans-serif" }}
                    >
                      {new Date(app.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </td>
                    <td className="px-6 py-4">
                      {app.resumeUrl ? (
                        <a
                          href={app.resumeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[12px] font-semibold text-[#4640de] hover:text-[#3530b0] underline transition-colors"
                          style={{ fontFamily: "'Epilogue', sans-serif" }}
                        >
                          View
                        </a>
                      ) : (
                        <span className="text-[12px] text-[#7c8493]">-</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
