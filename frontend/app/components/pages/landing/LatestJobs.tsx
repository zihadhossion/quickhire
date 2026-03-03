import { useEffect } from 'react';
import { Link } from 'react-router';
import ArrowRightIcon from '~/assets/icons/arrow-right.svg';
import { useAppDispatch, useAppSelector } from '~/redux/store/hooks';
import { fetchJobs } from '~/services/httpServices/jobService';
import type { Job } from '~/types/job';
import { JobTypeEnum, JOB_TYPE_LABELS } from '~/enums/job-type.enum';
import { JOB_TAG_BORDER_COLORS, getLogoColorBright, getLogoLetter } from '~/utils/jobUtils';
import JobRowSkeleton from '~/components/common/JobRowSkeleton';

export default function LatestJobs() {
  const dispatch = useAppDispatch();
  const { jobs, loading } = useAppSelector((state) => state.jobs);

  useEffect(() => {
    // FeaturedJobs already dispatches fetchJobs with limit 8,
    // which covers LatestJobs too (they share the same Redux state).
    // Only dispatch if no jobs are loaded yet.
    if (jobs?.length === 0) {
      dispatch(fetchJobs({ limit: 8 }));
    }
  }, [dispatch, jobs?.length]);

  const displayJobs = jobs?.slice(0, 8);

  return (
    <section className="relative w-full bg-[#f8f8fd] py-12 md:py-16 lg:py-[72px] px-6 md:px-8 lg:px-[124px] overflow-hidden">
      {/* Decorative Pattern */}
      <div className="absolute left-0 top-0 w-[860px] h-full hidden lg:block pointer-events-none">
        <div className="absolute left-0 top-[50px] w-[459px] h-[355px] border-[4px] border-[#cbcbf4] opacity-60" />
        <div className="absolute left-0 top-[75px] w-[860px] h-[644px] border-[4px] border-[#cbcbf4]" />
        <div className="absolute left-[10px] top-[82px] w-[840px] h-[629px] border-[4px] border-[#cbcbf4]" />
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto">
        {/* Header */}
        <div className="flex items-end justify-between mb-8 md:mb-10 lg:mb-12">
          <h2
            className="text-[28px] md:text-[36px] lg:text-[48px] font-semibold leading-[1.1] text-[#25324b]"
            style={{ fontFamily: "'Clash Display', sans-serif" }}
          >
            Latest <span className="text-[#26a3ff]">jobs open</span>
          </h2>

          <Link
            to="/jobs"
            className="hidden md:flex items-center gap-4 text-[16px] font-semibold leading-[25.6px] text-[#4640de] hover:text-[#3530b0] transition-colors shrink-0"
            style={{ fontFamily: "'Epilogue', sans-serif" }}
          >
            Show all jobs
            <img src={ArrowRightIcon} alt="" className="w-6 h-6" />
          </Link>
        </div>

        {/* Job List Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {loading
            ? Array.from({ length: 8 }).map((_, i) => (
              <JobRowSkeleton key={i} />
            ))
            : displayJobs?.map((job: Job) => {
              const bgColor = job.logoUrl ? undefined : getLogoColorBright(job.id);
              const letter = getLogoLetter(job.company);
              return (
                <Link
                  key={job.id}
                  to={`/jobs/${job.id}`}
                  className="flex items-center gap-4 md:gap-6 p-4 md:p-6 bg-white border border-[#d6ddeb] hover:border-[#4640de] transition-colors"
                >
                  {/* Company Logo */}
                  {job.logoUrl ? (
                    <img
                      src={job.logoUrl}
                      alt={job.company}
                      className="w-12 h-12 md:w-16 md:h-16 object-cover shrink-0"
                    />
                  ) : (
                    <div
                      className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center shrink-0 text-white text-[18px] md:text-[24px] font-bold"
                      style={{ backgroundColor: bgColor }}
                    >
                      {letter}
                    </div>
                  )}

                  {/* Job Info */}
                  <div className="flex-1 min-w-0">
                    <h3
                      className="text-[16px] md:text-[20px] font-semibold leading-[1.4] text-[#25324b] truncate"
                      style={{ fontFamily: "'Epilogue', sans-serif" }}
                    >
                      {job.title}
                    </h3>
                    <div
                      className="flex items-center gap-2 mt-1 text-[14px] md:text-[16px] font-normal leading-[25.6px] text-[#515b6f]"
                      style={{ fontFamily: "'Epilogue', sans-serif" }}
                    >
                      <span>{job.company}</span>
                      <span className="w-1 h-1 rounded-full bg-[#515b6f] opacity-30" />
                      <span className="truncate">{job.location}</span>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap items-center gap-2 mt-2">
                      <span
                        className="text-[12px] md:text-[14px] font-semibold text-[#4640de] border border-[#4640de] px-2 py-0.5 rounded-full"
                        style={{ fontFamily: "'Epilogue', sans-serif" }}
                      >
                        {JOB_TYPE_LABELS[job.type as JobTypeEnum] ?? job.type}
                      </span>
                      <span className="w-[1px] h-4 bg-[#d6ddeb]" />
                      {job?.tags?.map((tag) => {
                        const colors = JOB_TAG_BORDER_COLORS[tag] || {
                          border: 'border-gray-300',
                          text: 'text-gray-600',
                        };
                        return (
                          <span
                            key={tag}
                            className={`text-[12px] md:text-[14px] font-semibold ${colors.text} border ${colors.border} px-2 py-0.5 rounded-full`}
                            style={{ fontFamily: "'Epilogue', sans-serif" }}
                          >
                            {tag}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </Link>
              );
            })}
        </div>
      </div>
    </section>
  );
}
