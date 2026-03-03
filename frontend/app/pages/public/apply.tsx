import { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAppDispatch, useAppSelector } from '~/redux/store/hooks';
import { fetchJobById } from '~/services/httpServices/jobService';
import { submitApplication } from '~/services/httpServices/applicationService';
import { clearSubmittedApplication, clearApplicationError } from '~/redux/features/applicationSlice';
import Header from '~/components/layout/header';

const applicationSchema = z.object({
  applicantName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  resumeLink: z.string().url('Resume link must be a valid URL'),
  coverNote: z.string().optional(),
});

type ApplicationFormData = z.infer<typeof applicationSchema>;

export default function ApplyPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { selectedJob: job } = useAppSelector((state) => state.jobs);
  const { submittedApplication, loading, error } = useAppSelector(
    (state) => state.applications
  );

  const [showSuccess, setShowSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      applicantName: '',
      email: '',
      resumeLink: '',
      coverNote: '',
    },
  });

  useEffect(() => {
    if (id) {
      dispatch(fetchJobById(id));
    }
    return () => {
      dispatch(clearSubmittedApplication());
      dispatch(clearApplicationError());
    };
  }, [dispatch, id]);

  useEffect(() => {
    if (submittedApplication) {
      setShowSuccess(true);
      const timer = setTimeout(() => {
        navigate(`/jobs/${id}`);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [submittedApplication, navigate, id]);

  const onSubmit = useCallback(
    (data: ApplicationFormData) => {
      if (!id) return;
      dispatch(
        submitApplication({
          jobId: id,
          applicantName: data.applicantName,
          email: data.email,
          resumeLink: data.resumeLink,
          coverNote: data.coverNote || undefined,
        })
      );
    },
    [dispatch, id]
  );

  return (
    <div className="w-full min-h-screen bg-[#f8f8fd]">
      <div className="bg-[#f8f8fd]">
        <Header />
      </div>

      <div className="py-8 md:py-12 px-6 md:px-8 lg:px-[124px]">
        <div className="max-w-[720px] mx-auto">
          {/* Back Link */}
          <Link
            to={`/jobs/${id}`}
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
            Back to Job Details
          </Link>

          {/* Job Info Banner */}
          {job && (
            <div className="border border-[#d6ddeb] rounded-xl p-6 bg-white shadow-sm mb-8">
              <h2
                className="text-[20px] font-semibold text-[#25324b]"
                style={{ fontFamily: "'Epilogue', sans-serif" }}
              >
                Applying for: {job.title}
              </h2>
              <p
                className="text-[14px] text-[#515b6f] mt-1"
                style={{ fontFamily: "'Epilogue', sans-serif" }}
              >
                {job.company} - {job.location}
              </p>
            </div>
          )}

          {/* Success State */}
          {showSuccess ? (
            <div className="border border-green-200 rounded-xl p-8 bg-green-50 text-center">
              <svg
                className="w-16 h-16 text-green-500 mx-auto mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3
                className="text-[20px] font-semibold text-green-700 mb-2"
                style={{ fontFamily: "'Epilogue', sans-serif" }}
              >
                Application Submitted Successfully!
              </h3>
              <p
                className="text-[16px] text-green-600"
                style={{ fontFamily: "'Epilogue', sans-serif" }}
              >
                Redirecting you back to the job details...
              </p>
            </div>
          ) : (
            /* Application Form */
            <div className="border border-[#d6ddeb] rounded-xl p-6 md:p-8 bg-white shadow-sm">
              <h2
                className="text-[24px] font-semibold text-[#25324b] mb-6"
                style={{ fontFamily: "'Clash Display', sans-serif" }}
              >
                Submit Your Application
              </h2>

              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p
                    className="text-[14px] text-red-600"
                    style={{ fontFamily: "'Epilogue', sans-serif" }}
                  >
                    {error}
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Full Name */}
                <div>
                  <label
                    className="block text-[14px] font-semibold text-[#515b6f] mb-2"
                    style={{ fontFamily: "'Epilogue', sans-serif" }}
                  >
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    {...register('applicantName')}
                    placeholder="Enter your full name"
                    className="w-full px-4 py-3 border border-[#d6ddeb] bg-white text-[16px] text-[#25324b] placeholder-[#a8adb7] rounded focus:outline-none focus:border-[#4640de] transition-colors"
                    style={{ fontFamily: "'Epilogue', sans-serif" }}
                  />
                  {errors.applicantName && (
                    <p className="mt-1 text-[12px] text-red-500">
                      {errors.applicantName.message}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label
                    className="block text-[14px] font-semibold text-[#515b6f] mb-2"
                    style={{ fontFamily: "'Epilogue', sans-serif" }}
                  >
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    {...register('email')}
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 border border-[#d6ddeb] bg-white text-[16px] text-[#25324b] placeholder-[#a8adb7] rounded focus:outline-none focus:border-[#4640de] transition-colors"
                    style={{ fontFamily: "'Epilogue', sans-serif" }}
                  />
                  {errors.email && (
                    <p className="mt-1 text-[12px] text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Resume Link */}
                <div>
                  <label
                    className="block text-[14px] font-semibold text-[#515b6f] mb-2"
                    style={{ fontFamily: "'Epilogue', sans-serif" }}
                  >
                    Resume Link <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="url"
                    {...register('resumeLink')}
                    placeholder="https://drive.google.com/your-resume-link"
                    className="w-full px-4 py-3 border border-[#d6ddeb] bg-white text-[16px] text-[#25324b] placeholder-[#a8adb7] rounded focus:outline-none focus:border-[#4640de] transition-colors"
                    style={{ fontFamily: "'Epilogue', sans-serif" }}
                  />
                  <p
                    className="mt-1 text-[12px] text-[#7c8493]"
                    style={{ fontFamily: "'Epilogue', sans-serif" }}
                  >
                    Provide a link to your resume (e.g. Google Drive, Dropbox)
                  </p>
                  {errors.resumeLink && (
                    <p className="mt-1 text-[12px] text-red-500">
                      {errors.resumeLink.message}
                    </p>
                  )}
                </div>

                {/* Cover Note */}
                <div>
                  <label
                    className="block text-[14px] font-semibold text-[#515b6f] mb-2"
                    style={{ fontFamily: "'Epilogue', sans-serif" }}
                  >
                    Cover Note{' '}
                    <span className="text-[#7c8493] font-normal">(optional)</span>
                  </label>
                  <textarea
                    {...register('coverNote')}
                    placeholder="Tell us why you're a great fit for this role..."
                    rows={5}
                    className="w-full px-4 py-3 border border-[#d6ddeb] bg-white text-[16px] text-[#25324b] placeholder-[#a8adb7] rounded focus:outline-none focus:border-[#4640de] transition-colors resize-none"
                    style={{ fontFamily: "'Epilogue', sans-serif" }}
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full px-6 py-3 bg-[#4640DE] text-white text-[16px] font-bold rounded hover:bg-[#3530c4] disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
                  style={{ fontFamily: "'Epilogue', sans-serif" }}
                >
                  {loading ? (
                    <span className="inline-flex items-center gap-2">
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        />
                      </svg>
                      Submitting...
                    </span>
                  ) : (
                    'Submit Application'
                  )}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
