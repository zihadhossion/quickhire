import { useEffect } from 'react';
import { Link } from 'react-router';
import { useAppDispatch, useAppSelector } from '~/redux/store/hooks';
import { fetchJobs } from '~/services/httpServices/jobService';
import { fetchApplications } from '~/services/httpServices/applicationService';
import { ApplicationStatusEnum, APPLICATION_STATUS_LABELS, APPLICATION_STATUS_COLORS } from '~/enums/application-status.enum';

export default function AdminDashboard() {
  const dispatch = useAppDispatch();
  const { jobs, total: totalJobs, loading: jobsLoading } = useAppSelector(
    (state) => state.jobs
  );
  const { applications, loading: appsLoading } = useAppSelector(
    (state) => state.applications
  );

  useEffect(() => {
    dispatch(fetchJobs(undefined));
    dispatch(fetchApplications());
  }, [dispatch]);

  const pendingApplications = applications.filter(
    (a) => a.status === ApplicationStatusEnum.PENDING
  );
  const recentApplications = applications.slice(0, 5);
  const loading = jobsLoading || appsLoading;

  return (
    <div className="p-6 md:p-8">
      <h1
        className="text-[24px] md:text-[32px] font-semibold text-[#25324b] mb-8"
        style={{ fontFamily: "'Clash Display', sans-serif" }}
      >
        Dashboard
      </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {/* Total Jobs */}
        <div className="border border-[#d6ddeb] rounded-xl p-6 bg-white shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-[#4640DE]/10 flex items-center justify-center">
              <svg className="w-6 h-6 text-[#4640DE]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <p
                className="text-[14px] text-[#7c8493]"
                style={{ fontFamily: "'Epilogue', sans-serif" }}
              >
                Total Jobs
              </p>
              <p
                className="text-[28px] font-semibold text-[#25324b]"
                style={{ fontFamily: "'Clash Display', sans-serif" }}
              >
                {loading ? '...' : totalJobs}
              </p>
            </div>
          </div>
        </div>

        {/* Total Applications */}
        <div className="border border-[#d6ddeb] rounded-xl p-6 bg-white shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-[#56CDAD]/10 flex items-center justify-center">
              <svg className="w-6 h-6 text-[#56CDAD]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <p
                className="text-[14px] text-[#7c8493]"
                style={{ fontFamily: "'Epilogue', sans-serif" }}
              >
                Total Applications
              </p>
              <p
                className="text-[28px] font-semibold text-[#25324b]"
                style={{ fontFamily: "'Clash Display', sans-serif" }}
              >
                {loading ? '...' : applications.length}
              </p>
            </div>
          </div>
        </div>

        {/* Pending Applications */}
        <div className="border border-[#d6ddeb] rounded-xl p-6 bg-white shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-[#EB8533]/10 flex items-center justify-center">
              <svg className="w-6 h-6 text-[#EB8533]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p
                className="text-[14px] text-[#7c8493]"
                style={{ fontFamily: "'Epilogue', sans-serif" }}
              >
                Pending Applications
              </p>
              <p
                className="text-[28px] font-semibold text-[#25324b]"
                style={{ fontFamily: "'Clash Display', sans-serif" }}
              >
                {loading ? '...' : pendingApplications.length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Applications Table */}
      <div className="border border-[#d6ddeb] rounded-xl bg-white shadow-sm">
        <div className="flex items-center justify-between p-6 border-b border-[#d6ddeb]">
          <h2
            className="text-[18px] font-semibold text-[#25324b]"
            style={{ fontFamily: "'Epilogue', sans-serif" }}
          >
            Recent Applications
          </h2>
          <Link
            to="/admin/applications"
            className="text-[14px] font-semibold text-[#4640de] hover:text-[#3530b0] transition-colors"
            style={{ fontFamily: "'Epilogue', sans-serif" }}
          >
            View All
          </Link>
        </div>

        {loading ? (
          <div className="p-6 space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center gap-4 animate-pulse">
                <div className="h-4 w-1/4 bg-gray-200 rounded" />
                <div className="h-4 w-1/4 bg-gray-200 rounded" />
                <div className="h-4 w-1/4 bg-gray-200 rounded" />
                <div className="h-4 w-1/6 bg-gray-200 rounded" />
              </div>
            ))}
          </div>
        ) : recentApplications.length === 0 ? (
          <div className="p-12 text-center">
            <p
              className="text-[16px] text-[#7c8493]"
              style={{ fontFamily: "'Epilogue', sans-serif" }}
            >
              No applications yet.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#d6ddeb]">
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
                    Status
                  </th>
                  <th
                    className="text-left px-6 py-3 text-[12px] font-semibold text-[#7c8493] uppercase tracking-wider"
                    style={{ fontFamily: "'Epilogue', sans-serif" }}
                  >
                    Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentApplications.map((app) => (
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
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[12px] font-semibold ${
                          APPLICATION_STATUS_COLORS[app.status] ?? 'bg-gray-100 text-gray-800'
                        }`}
                        style={{ fontFamily: "'Epilogue', sans-serif" }}
                      >
                        {APPLICATION_STATUS_LABELS[app.status] ?? app.status}
                      </span>
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
