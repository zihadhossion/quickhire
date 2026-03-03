import { useEffect } from 'react';
import { Link } from 'react-router';
import ArrowRightIcon from '~/assets/icons/arrow-right.svg';
import { useAppDispatch, useAppSelector } from '~/redux/store/hooks';
import { fetchJobs } from '~/services/httpServices/jobService';
import type { Job } from '~/types/job';
import { JobTypeEnum, JOB_TYPE_LABELS } from '~/enums/job-type.enum';
import { JOB_TAG_COLORS, getLogoColor, getLogoLetter } from '~/utils/jobUtils';
import JobCardSkeleton from '~/components/common/JobCardSkeleton';

export default function FeaturedJobs() {
  const dispatch = useAppDispatch();
  const { jobs, loading } = useAppSelector((state) => state.jobs);

  useEffect(() => {
    dispatch(fetchJobs({ limit: 8 }));
  }, [dispatch]);

  const displayJobs = jobs?.slice(0, 8);

  return (
    <section className="w-full bg-white pb-12 md:pb-16 lg:pb-[72px] pt-8 md:pt-12 lg:pt-0 px-6 md:px-8 lg:px-[124px]">
      <div className="max-w-[1440px] mx-auto">
        {/* Header */}
        <div className="flex items-end justify-between mb-8 md:mb-10 lg:mb-12">
          <h2
            className="text-[28px] md:text-[36px] lg:text-[48px] font-semibold leading-[1.1] text-[#25324b]"
            style={{ fontFamily: "'Clash Display', sans-serif" }}
          >
            Featured <span className="text-[#26a3ff]">jobs</span>
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

        {/* Job Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
          {loading
            ? Array.from({ length: 8 }).map((_, i) => (
              <JobCardSkeleton key={i} />
            ))
            : displayJobs?.map((job: Job) => {
              const bgColor = job.logoUrl ? undefined : getLogoColor(job.id);
              const letter = getLogoLetter(job.company);
              return (
                <Link
                  key={job.id}
                  to={`/jobs/${job.id}`}
                  className="flex flex-col gap-4 p-5 md:p-6 border border-[#d6ddeb] bg-white hover:border-[#4640de] transition-colors"
                >
                  {/* Header: Logo + Tag */}
                  <div className="flex items-center justify-between">
                    {job.logoUrl ? (
                      <img
                        src={job.logoUrl}
                        alt={job.company}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    ) : (
                      <div
                        className="w-12 h-12 flex items-center justify-center rounded-full text-white text-[18px] font-bold"
                        style={{ backgroundColor: bgColor }}
                      >
                        {letter}
                      </div>
                    )}
                    <span
                      className="text-[14px] md:text-[16px] font-normal leading-[25.6px] text-[#4640de] border border-[#4640de] px-3 py-1"
                      style={{ fontFamily: "'Epilogue', sans-serif" }}
                    >
                      {JOB_TYPE_LABELS[job.type as JobTypeEnum] ?? job.type}
                    </span>
                  </div>

                  {/* Title + Company */}
                  <div className="flex flex-col gap-0.5">
                    <h3
                      className="text-[16px] md:text-[18px] font-semibold leading-[28.8px] text-[#25324b]"
                      style={{ fontFamily: "'Epilogue', sans-serif" }}
                    >
                      {job.title}
                    </h3>
                    <div
                      className="flex items-center gap-2 text-[14px] md:text-[16px] font-normal leading-[25.6px] text-[#515b6f]"
                      style={{ fontFamily: "'Epilogue', sans-serif" }}
                    >
                      <span>{job.company}</span>
                      <span className="w-1 h-1 rounded-full bg-[#515b6f] opacity-30" />
                      <span>{job.location}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p
                    className="text-[14px] md:text-[16px] font-normal leading-[25.6px] text-[#7c8493] line-clamp-2"
                    style={{ fontFamily: "'Epilogue', sans-serif" }}
                  >
                    {job.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {job?.tags?.map((tag) => {
                      const colors = JOB_TAG_COLORS[tag] || {
                        bg: 'bg-gray-100',
                        text: 'text-gray-600',
                      };
                      return (
                        <span
                          key={tag}
                          className={`px-2.5 py-1 text-[12px] md:text-[14px] font-semibold leading-[22.4px] rounded-full ${colors.bg} ${colors.text}`}
                          style={{ fontFamily: "'Epilogue', sans-serif" }}
                        >
                          {tag}
                        </span>
                      );
                    })}
                  </div>
                </Link>
              );
            })}
        </div>

        {/* Mobile Show All Button */}
        <div className="flex md:hidden justify-center mt-8">
          <Link
            to="/jobs"
            className="flex items-center gap-2 text-[16px] font-semibold text-[#4640de]"
            style={{ fontFamily: "'Epilogue', sans-serif" }}
          >
            Show all jobs
            <img src={ArrowRightIcon} alt="" className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
