import { useEffect, useState, useCallback } from 'react';
import { Link, useSearchParams } from 'react-router';
import { useAppDispatch, useAppSelector } from '~/redux/store/hooks';
import { fetchJobs } from '~/services/httpServices/jobService';
import type { Job, FetchJobsParams } from '~/types/job';
import Header from '~/components/layout/header';
import { JobCategoryEnum, JOB_CATEGORY_LABELS } from '~/enums/job-category.enum';
import { JobTypeEnum, JOB_TYPE_LABELS } from '~/enums/job-type.enum';
import { JOB_TAG_COLORS, getLogoColor, getLogoLetter } from '~/utils/jobUtils';
import JobCardSkeleton from '~/components/common/JobCardSkeleton';

const JOB_CATEGORIES = Object.values(JobCategoryEnum);
const JOB_TYPES = Object.values(JobTypeEnum);

export default function JobsPage() {
  const dispatch = useAppDispatch();
  const { jobs, loading, total, page, limit } = useAppSelector((state) => state.jobs);
  const [searchParams, setSearchParams] = useSearchParams();

  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [category, setCategory] = useState(searchParams.get('category') || '');
  const [type, setType] = useState(searchParams.get('type') || '');
  const [location, setLocation] = useState(searchParams.get('location') || '');
  const currentPage = Number(searchParams.get('page')) || 1;

  const dispatchFetchJobs = useCallback(() => {
    const params: FetchJobsParams = {
      page: currentPage,
      limit: 12,
    };
    if (search.trim()) params.search = search.trim();
    if (category) params.category = category;
    if (type) params.type = type;
    if (location.trim()) params.location = location.trim();
    dispatch(fetchJobs(params));
  }, [dispatch, currentPage, search, category, type, location]);

  useEffect(() => {
    dispatchFetchJobs();
  }, [dispatchFetchJobs]);

  const updateFilters = useCallback(
    (updates: Record<string, string>) => {
      const newParams = new URLSearchParams(searchParams);
      Object.entries(updates).forEach(([key, value]) => {
        if (value) {
          newParams.set(key, value);
        } else {
          newParams.delete(key);
        }
      });
      // Reset page when filters change
      if (!updates.page) {
        newParams.delete('page');
      }
      setSearchParams(newParams);
    },
    [searchParams, setSearchParams]
  );

  const handleSearchSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      updateFilters({ search, location, page: '' });
    },
    [search, location, updateFilters]
  );

  const handleCategoryChange = useCallback(
    (value: string) => {
      setCategory(value);
      updateFilters({ category: value, page: '' });
    },
    [updateFilters]
  );

  const handleTypeChange = useCallback(
    (value: string) => {
      setType(value);
      updateFilters({ type: value, page: '' });
    },
    [updateFilters]
  );

  const totalPages = Math.ceil(total / (limit || 12));

  const goToPage = useCallback(
    (p: number) => {
      updateFilters({ page: String(p) });
    },
    [updateFilters]
  );

  return (
    <div className="w-full min-h-screen bg-[#f8f8fd]">
      <div className="bg-[#f8f8fd]">
        <Header />
      </div>

      {/* Hero / Search Section */}
      <div className="bg-[#f8f8fd] pt-8 pb-12 px-6 md:px-8 lg:px-[124px]">
        <div className="max-w-[1440px] mx-auto">
          <h1
            className="text-[32px] md:text-[40px] lg:text-[48px] font-semibold leading-[1.1] text-[#25324b] mb-6"
            style={{ fontFamily: "'Clash Display', sans-serif" }}
          >
            Find your <span className="text-[#26a3ff]">dream job</span>
          </h1>

          {/* Search & Filters */}
          <form
            onSubmit={handleSearchSubmit}
            className="flex flex-col md:flex-row gap-4"
          >
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search by job title, company, or keyword..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-4 py-3 border border-[#d6ddeb] bg-white text-[16px] text-[#25324b] placeholder-[#a8adb7] focus:outline-none focus:border-[#4640de] transition-colors"
                style={{ fontFamily: "'Epilogue', sans-serif" }}
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Location..."
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="px-4 py-3 border border-[#d6ddeb] bg-white text-[16px] text-[#25324b] placeholder-[#a8adb7] focus:outline-none focus:border-[#4640de] transition-colors w-full md:w-[160px]"
                style={{ fontFamily: "'Epilogue', sans-serif" }}
              />
            </div>
            <select
              value={category}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="px-4 py-3 border border-[#d6ddeb] bg-white text-[16px] text-[#515b6f] focus:outline-none focus:border-[#4640de] transition-colors"
              style={{ fontFamily: "'Epilogue', sans-serif" }}
            >
              <option value="">All Categories</option>
              {JOB_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {JOB_CATEGORY_LABELS[cat]}
                </option>
              ))}
            </select>
            <select
              value={type}
              onChange={(e) => handleTypeChange(e.target.value)}
              className="px-4 py-3 border border-[#d6ddeb] bg-white text-[16px] text-[#515b6f] focus:outline-none focus:border-[#4640de] transition-colors"
              style={{ fontFamily: "'Epilogue', sans-serif" }}
            >
              <option value="">All Types</option>
              {JOB_TYPES.map((t) => (
                <option key={t} value={t}>
                  {JOB_TYPE_LABELS[t]}
                </option>
              ))}
            </select>
            <button
              type="submit"
              className="px-8 py-3 bg-[#4640DE] text-white text-[16px] font-bold hover:bg-[#3530c4] transition-colors"
              style={{ fontFamily: "'Epilogue', sans-serif" }}
            >
              Search
            </button>
          </form>
        </div>
      </div>

      {/* Results Section */}
      <div className="bg-white py-12 px-6 md:px-8 lg:px-[124px]">
        <div className="max-w-[1440px] mx-auto">
          {/* Results Header */}
          <div className="flex items-center justify-between mb-8">
            <p
              className="text-[16px] text-[#515b6f]"
              style={{ fontFamily: "'Epilogue', sans-serif" }}
            >
              Showing{' '}
              <span className="font-semibold text-[#25324b]">
                {jobs?.length > 0
                  ? `${(currentPage - 1) * (limit || 12) + 1}-${Math.min(
                    currentPage * (limit || 12),
                    total
                  )}`
                  : '0'}
              </span>{' '}
              of <span className="font-semibold text-[#25324b]">{total}</span>{' '}
              jobs
            </p>
          </div>

          {/* Job Cards Grid */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <JobCardSkeleton key={i} rounded />
              ))}
            </div>
          ) : jobs?.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20">
              <svg
                className="w-20 h-20 text-[#d6ddeb] mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
              <h3
                className="text-[20px] font-semibold text-[#25324b] mb-2"
                style={{ fontFamily: "'Epilogue', sans-serif" }}
              >
                No jobs found
              </h3>
              <p
                className="text-[16px] text-[#515b6f]"
                style={{ fontFamily: "'Epilogue', sans-serif" }}
              >
                Try adjusting your search or filter criteria.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {jobs?.map((job: Job) => {
                const bgColor = job.logoUrl
                  ? undefined
                  : getLogoColor(job.id);
                const letter = getLogoLetter(job.company);
                return (
                  <div
                    key={job.id}
                    className="flex flex-col gap-4 p-5 md:p-6 border border-[#d6ddeb] rounded-xl bg-white shadow-sm hover:border-[#4640de] transition-colors"
                  >
                    {/* Header: Logo + Type */}
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
                        className="text-[14px] font-normal text-[#4640de] border border-[#4640de] px-3 py-1 rounded"
                        style={{ fontFamily: "'Epilogue', sans-serif" }}
                      >
                        {JOB_TYPE_LABELS[job.type as JobTypeEnum] ?? job.type}
                      </span>
                    </div>

                    {/* Title + Company */}
                    <div className="flex flex-col gap-0.5">
                      <h3
                        className="text-[18px] font-semibold leading-[28.8px] text-[#25324b]"
                        style={{ fontFamily: "'Epilogue', sans-serif" }}
                      >
                        {job.title}
                      </h3>
                      <div
                        className="flex items-center gap-2 text-[14px] font-normal text-[#515b6f]"
                        style={{ fontFamily: "'Epilogue', sans-serif" }}
                      >
                        <span>{job.company}</span>
                        <span className="w-1 h-1 rounded-full bg-[#515b6f] opacity-30" />
                        <span>{job.location}</span>
                      </div>
                    </div>

                    {/* Description */}
                    <p
                      className="text-[14px] font-normal leading-[22.4px] text-[#7c8493] line-clamp-2"
                      style={{ fontFamily: "'Epilogue', sans-serif" }}
                    >
                      {job.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {job?.tags?.map((tag) => {
                        const colors = JOB_TAG_COLORS[tag] || {
                          bg: 'bg-gray-100',
                          text: 'text-gray-600',
                        };
                        return (
                          <span
                            key={tag}
                            className={`px-2.5 py-1 text-[12px] font-semibold rounded-full ${colors.bg} ${colors.text}`}
                            style={{ fontFamily: "'Epilogue', sans-serif" }}
                          >
                            {tag}
                          </span>
                        );
                      })}
                    </div>

                    {/* View Details Button */}
                    <Link
                      to={`/jobs/${job.id}`}
                      className="mt-auto inline-flex items-center justify-center px-4 py-2 bg-[#4640DE] text-white text-[14px] font-bold rounded hover:bg-[#3530c4] transition-colors"
                      style={{ fontFamily: "'Epilogue', sans-serif" }}
                    >
                      View Details
                    </Link>
                  </div>
                );
              })}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-12">
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage <= 1}
                className="px-4 py-2 text-[14px] font-semibold text-[#4640de] border border-[#d6ddeb] rounded hover:bg-[#f8f8fd] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                style={{ fontFamily: "'Epilogue', sans-serif" }}
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter((p) => {
                  if (totalPages <= 7) return true;
                  if (p === 1 || p === totalPages) return true;
                  if (Math.abs(p - currentPage) <= 1) return true;
                  return false;
                })
                .map((p, idx, arr) => {
                  const elements = [];
                  if (idx > 0 && p - arr[idx - 1] > 1) {
                    elements.push(
                      <span
                        key={`ellipsis-${p}`}
                        className="px-2 py-2 text-[14px] text-[#515b6f]"
                      >
                        ...
                      </span>
                    );
                  }
                  elements.push(
                    <button
                      key={p}
                      onClick={() => goToPage(p)}
                      className={`w-10 h-10 text-[14px] font-semibold rounded transition-colors ${p === currentPage
                        ? 'bg-[#4640DE] text-white'
                        : 'text-[#515b6f] border border-[#d6ddeb] hover:bg-[#f8f8fd]'
                        }`}
                      style={{ fontFamily: "'Epilogue', sans-serif" }}
                    >
                      {p}
                    </button>
                  );
                  return elements;
                })}
              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage >= totalPages}
                className="px-4 py-2 text-[14px] font-semibold text-[#4640de] border border-[#d6ddeb] rounded hover:bg-[#f8f8fd] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                style={{ fontFamily: "'Epilogue', sans-serif" }}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
