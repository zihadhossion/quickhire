import { useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from '~/redux/store/hooks';
import { fetchJobById } from '~/services/httpServices/jobService';
import { clearSelectedJob } from '~/redux/features/jobSlice';
import Header from '~/components/layout/header';
import { JOB_TAG_COLORS, getLogoColor, getLogoLetter } from '~/utils/jobUtils';
import JobDetailSkeleton from '~/components/common/JobDetailSkeleton';

export default function JobDetailPage() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { selectedJob: job, loading, error } = useAppSelector((state) => state.jobs);

  useEffect(() => {
    if (id) {
      dispatch(fetchJobById(id));
    }
    return () => {
      dispatch(clearSelectedJob());
    };
  }, [dispatch, id]);

  return (
    <div className="w-full min-h-screen bg-[#f8f8fd]">
      <div className="bg-[#f8f8fd]">
        <Header />
      </div>

      <div className="bg-white py-8 md:py-12 px-6 md:px-8 lg:px-[124px]">
        <div className="max-w-[1440px] mx-auto">
          {/* Back Link */}
          <Link
            to="/jobs"
            className="inline-flex items-center gap-2 text-[14px] font-semibold text-[#4640de] hover:text-[#3530b0] mb-6 transition-colors"
            style={{ fontFamily: "'Epilogue', sans-serif" }}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Jobs
          </Link>

          {loading ? (
            <JobDetailSkeleton />
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-20">
              <p
                className="text-[16px] text-red-500 mb-4"
                style={{ fontFamily: "'Epilogue', sans-serif" }}
              >
                {error}
              </p>
              <button
                onClick={() => navigate('/jobs')}
                className="px-6 py-2 bg-[#4640DE] text-white rounded hover:bg-[#3530c4] transition-colors"
              >
                Back to Jobs
              </button>
            </div>
          ) : job ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Job Header */}
                <div className="flex items-start gap-4">
                  {job.logoUrl ? (
                    <img
                      src={job.logoUrl}
                      alt={job.company}
                      className="w-16 h-16 rounded-full object-cover shrink-0"
                    />
                  ) : (
                    <div
                      className="w-16 h-16 flex items-center justify-center rounded-full text-white text-[24px] font-bold shrink-0"
                      style={{ backgroundColor: getLogoColor(job.id) }}
                    >
                      {job.company?.charAt(0).toUpperCase() ?? '?'}
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <h1
                      className="text-[24px] md:text-[32px] font-semibold leading-[1.2] text-[#25324b]"
                      style={{ fontFamily: "'Clash Display', sans-serif" }}
                    >
                      {job.title}
                    </h1>
                    <div
                      className="flex flex-wrap items-center gap-2 mt-2 text-[16px] text-[#515b6f]"
                      style={{ fontFamily: "'Epilogue', sans-serif" }}
                    >
                      <span className="font-semibold">{job.company}</span>
                      <span className="w-1 h-1 rounded-full bg-[#515b6f] opacity-30" />
                      <span>{job.location}</span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h2
                    className="text-[20px] font-semibold text-[#25324b] mb-4"
                    style={{ fontFamily: "'Epilogue', sans-serif" }}
                  >
                    Description
                  </h2>
                  <div
                    className="text-[16px] leading-[28px] text-[#515b6f] whitespace-pre-line"
                    style={{ fontFamily: "'Epilogue', sans-serif" }}
                  >
                    {job.description}
                  </div>
                </div>

                {/* Requirements */}
                <div>
                  <h2
                    className="text-[20px] font-semibold text-[#25324b] mb-4"
                    style={{ fontFamily: "'Epilogue', sans-serif" }}
                  >
                    Requirements
                  </h2>
                  <div
                    className="text-[16px] leading-[28px] text-[#515b6f] whitespace-pre-line"
                    style={{ fontFamily: "'Epilogue', sans-serif" }}
                  >
                    {job.requirements}
                  </div>
                </div>

                {/* Tags */}
                {(job.tags?.length ?? 0) > 0 && (
                  <div>
                    <h2
                      className="text-[20px] font-semibold text-[#25324b] mb-4"
                      style={{ fontFamily: "'Epilogue', sans-serif" }}
                    >
                      Tags
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      {job.tags?.map((tag) => {
                        const colors = JOB_TAG_COLORS[tag] || {
                          bg: 'bg-gray-100',
                          text: 'text-gray-600',
                        };
                        return (
                          <span
                            key={tag}
                            className={`px-3 py-1.5 text-[14px] font-semibold rounded-full ${colors.bg} ${colors.text}`}
                            style={{ fontFamily: "'Epilogue', sans-serif" }}
                          >
                            {tag}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="border border-[#d6ddeb] rounded-xl p-6 bg-white shadow-sm sticky top-8">
                  <h3
                    className="text-[18px] font-semibold text-[#25324b] mb-6"
                    style={{ fontFamily: "'Epilogue', sans-serif" }}
                  >
                    Job Overview
                  </h3>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <svg
                        className="w-5 h-5 text-[#4640de] shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      <div>
                        <p
                          className="text-[12px] text-[#7c8493]"
                          style={{ fontFamily: "'Epilogue', sans-serif" }}
                        >
                          Job Type
                        </p>
                        <p
                          className="text-[14px] font-semibold text-[#25324b]"
                          style={{ fontFamily: "'Epilogue', sans-serif" }}
                        >
                          {job.type}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <svg
                        className="w-5 h-5 text-[#4640de] shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                        />
                      </svg>
                      <div>
                        <p
                          className="text-[12px] text-[#7c8493]"
                          style={{ fontFamily: "'Epilogue', sans-serif" }}
                        >
                          Category
                        </p>
                        <p
                          className="text-[14px] font-semibold text-[#25324b]"
                          style={{ fontFamily: "'Epilogue', sans-serif" }}
                        >
                          {job.category}
                        </p>
                      </div>
                    </div>

                    {job.salary && (
                      <div className="flex items-center gap-3">
                        <svg
                          className="w-5 h-5 text-[#4640de] shrink-0"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <div>
                          <p
                            className="text-[12px] text-[#7c8493]"
                            style={{ fontFamily: "'Epilogue', sans-serif" }}
                          >
                            Salary
                          </p>
                          <p
                            className="text-[14px] font-semibold text-[#25324b]"
                            style={{ fontFamily: "'Epilogue', sans-serif" }}
                          >
                            {job.salary}
                          </p>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center gap-3">
                      <svg
                        className="w-5 h-5 text-[#4640de] shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      <div>
                        <p
                          className="text-[12px] text-[#7c8493]"
                          style={{ fontFamily: "'Epilogue', sans-serif" }}
                        >
                          Location
                        </p>
                        <p
                          className="text-[14px] font-semibold text-[#25324b]"
                          style={{ fontFamily: "'Epilogue', sans-serif" }}
                        >
                          {job.location}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <svg
                        className="w-5 h-5 text-[#4640de] shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <div>
                        <p
                          className="text-[12px] text-[#7c8493]"
                          style={{ fontFamily: "'Epilogue', sans-serif" }}
                        >
                          Posted
                        </p>
                        <p
                          className="text-[14px] font-semibold text-[#25324b]"
                          style={{ fontFamily: "'Epilogue', sans-serif" }}
                        >
                          {new Date(job.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8">
                    <Link
                      to={`/jobs/${job.id}/apply`}
                      className="flex items-center justify-center w-full px-6 py-3 bg-[#4640DE] text-white text-[16px] font-bold rounded hover:bg-[#3530c4] transition-colors"
                      style={{ fontFamily: "'Epilogue', sans-serif" }}
                    >
                      Apply for this job
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
