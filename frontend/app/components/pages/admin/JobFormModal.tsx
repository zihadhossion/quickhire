import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import type { Job } from '~/types/job';
import { JobCategoryEnum, JOB_CATEGORY_LABELS } from '~/enums/job-category.enum';
import { JobTypeEnum, JOB_TYPE_LABELS } from '~/enums/job-type.enum';

const JOB_CATEGORIES = Object.values(JobCategoryEnum);
const JOB_TYPES = Object.values(JobTypeEnum);

const jobFormSchema = z.object({
  title: z.string().min(2, 'Title is required'),
  company: z.string().min(2, 'Company is required'),
  location: z.string().min(2, 'Location is required'),
  category: z.string().min(1, 'Category is required'),
  type: z.string().min(1, 'Type is required'),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  requirements: z.string().min(10, 'Requirements must be at least 10 characters'),
  salary: z.string().optional(),
  tags: z.string().optional(),
});

export type JobFormData = z.infer<typeof jobFormSchema>;

interface JobFormModalProps {
  isOpen: boolean;
  editingJob: Job | null;
  onClose: () => void;
  onSubmit: (data: JobFormData) => Promise<void>;
  submitting: boolean;
}

export default function JobFormModal({
  isOpen,
  editingJob,
  onClose,
  onSubmit,
  submitting,
}: JobFormModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<JobFormData>({
    resolver: zodResolver(jobFormSchema),
    defaultValues: {
      title: '',
      company: '',
      location: '',
      category: '',
      type: '',
      description: '',
      requirements: '',
      salary: '',
      tags: '',
    },
  });

  useEffect(() => {
    if (!isOpen) {
      reset();
      return;
    }

    if (editingJob) {
      reset({
        title: editingJob.title,
        company: editingJob.company,
        location: editingJob.location,
        category: editingJob.category,
        type: editingJob.type,
        description: editingJob.description,
        requirements: editingJob.requirements ?? '',
        salary: editingJob.salary || '',
        tags: editingJob.tags?.join(', ') ?? '',
      });
    } else {
      reset({
        title: '',
        company: '',
        location: '',
        category: '',
        type: '',
        description: '',
        requirements: '',
        salary: '',
        tags: '',
      });
    }
  }, [isOpen, editingJob, reset]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />
      <div className="relative w-full max-w-2xl max-h-[90vh] mx-4 bg-white rounded-xl shadow-xl overflow-auto">
        <div className="flex items-center justify-between p-6 border-b border-[#d6ddeb]">
          <h2
            className="text-[20px] font-semibold text-[#25324b]"
            style={{ fontFamily: "'Epilogue', sans-serif" }}
          >
            {editingJob ? 'Edit Job' : 'Create New Job'}
          </h2>
          <button
            onClick={onClose}
            className="text-[#7c8493] hover:text-[#25324b] transition-colors"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Title */}
            <div>
              <label
                className="block text-[14px] font-semibold text-[#515b6f] mb-1.5"
                style={{ fontFamily: "'Epilogue', sans-serif" }}
              >
                Job Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                {...register('title')}
                placeholder="e.g. Frontend Developer"
                className="w-full px-3 py-2.5 border border-[#d6ddeb] rounded text-[14px] text-[#25324b] placeholder-[#a8adb7] focus:outline-none focus:border-[#4640de] transition-colors"
                style={{ fontFamily: "'Epilogue', sans-serif" }}
              />
              {errors.title && (
                <p className="mt-1 text-[12px] text-red-500">{errors.title.message}</p>
              )}
            </div>

            {/* Company */}
            <div>
              <label
                className="block text-[14px] font-semibold text-[#515b6f] mb-1.5"
                style={{ fontFamily: "'Epilogue', sans-serif" }}
              >
                Company <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                {...register('company')}
                placeholder="e.g. Acme Corp"
                className="w-full px-3 py-2.5 border border-[#d6ddeb] rounded text-[14px] text-[#25324b] placeholder-[#a8adb7] focus:outline-none focus:border-[#4640de] transition-colors"
                style={{ fontFamily: "'Epilogue', sans-serif" }}
              />
              {errors.company && (
                <p className="mt-1 text-[12px] text-red-500">{errors.company.message}</p>
              )}
            </div>

            {/* Location */}
            <div>
              <label
                className="block text-[14px] font-semibold text-[#515b6f] mb-1.5"
                style={{ fontFamily: "'Epilogue', sans-serif" }}
              >
                Location <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                {...register('location')}
                placeholder="e.g. San Francisco, US"
                className="w-full px-3 py-2.5 border border-[#d6ddeb] rounded text-[14px] text-[#25324b] placeholder-[#a8adb7] focus:outline-none focus:border-[#4640de] transition-colors"
                style={{ fontFamily: "'Epilogue', sans-serif" }}
              />
              {errors.location && (
                <p className="mt-1 text-[12px] text-red-500">{errors.location.message}</p>
              )}
            </div>

            {/* Salary */}
            <div>
              <label
                className="block text-[14px] font-semibold text-[#515b6f] mb-1.5"
                style={{ fontFamily: "'Epilogue', sans-serif" }}
              >
                Salary <span className="text-[#7c8493] font-normal">(optional)</span>
              </label>
              <input
                type="text"
                {...register('salary')}
                placeholder="e.g. $80k - $120k"
                className="w-full px-3 py-2.5 border border-[#d6ddeb] rounded text-[14px] text-[#25324b] placeholder-[#a8adb7] focus:outline-none focus:border-[#4640de] transition-colors"
                style={{ fontFamily: "'Epilogue', sans-serif" }}
              />
            </div>

            {/* Category */}
            <div>
              <label
                className="block text-[14px] font-semibold text-[#515b6f] mb-1.5"
                style={{ fontFamily: "'Epilogue', sans-serif" }}
              >
                Category <span className="text-red-500">*</span>
              </label>
              <select
                {...register('category')}
                className="w-full px-3 py-2.5 border border-[#d6ddeb] rounded text-[14px] text-[#515b6f] focus:outline-none focus:border-[#4640de] transition-colors"
                style={{ fontFamily: "'Epilogue', sans-serif" }}
              >
                <option value="">Select category</option>
                {JOB_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>{JOB_CATEGORY_LABELS[cat]}</option>
                ))}
              </select>
              {errors.category && (
                <p className="mt-1 text-[12px] text-red-500">{errors.category.message}</p>
              )}
            </div>

            {/* Type */}
            <div>
              <label
                className="block text-[14px] font-semibold text-[#515b6f] mb-1.5"
                style={{ fontFamily: "'Epilogue', sans-serif" }}
              >
                Job Type <span className="text-red-500">*</span>
              </label>
              <select
                {...register('type')}
                className="w-full px-3 py-2.5 border border-[#d6ddeb] rounded text-[14px] text-[#515b6f] focus:outline-none focus:border-[#4640de] transition-colors"
                style={{ fontFamily: "'Epilogue', sans-serif" }}
              >
                <option value="">Select type</option>
                {JOB_TYPES.map((t) => (
                  <option key={t} value={t}>{JOB_TYPE_LABELS[t]}</option>
                ))}
              </select>
              {errors.type && (
                <p className="mt-1 text-[12px] text-red-500">{errors.type.message}</p>
              )}
            </div>
          </div>

          {/* Tags */}
          <div>
            <label
              className="block text-[14px] font-semibold text-[#515b6f] mb-1.5"
              style={{ fontFamily: "'Epilogue', sans-serif" }}
            >
              Tags <span className="text-[#7c8493] font-normal">(comma separated)</span>
            </label>
            <input
              type="text"
              {...register('tags')}
              placeholder="e.g. Marketing, Design, Tech"
              className="w-full px-3 py-2.5 border border-[#d6ddeb] rounded text-[14px] text-[#25324b] placeholder-[#a8adb7] focus:outline-none focus:border-[#4640de] transition-colors"
              style={{ fontFamily: "'Epilogue', sans-serif" }}
            />
          </div>

          {/* Description */}
          <div>
            <label
              className="block text-[14px] font-semibold text-[#515b6f] mb-1.5"
              style={{ fontFamily: "'Epilogue', sans-serif" }}
            >
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              {...register('description')}
              placeholder="Job description..."
              rows={4}
              className="w-full px-3 py-2.5 border border-[#d6ddeb] rounded text-[14px] text-[#25324b] placeholder-[#a8adb7] focus:outline-none focus:border-[#4640de] transition-colors resize-none"
              style={{ fontFamily: "'Epilogue', sans-serif" }}
            />
            {errors.description && (
              <p className="mt-1 text-[12px] text-red-500">{errors.description.message}</p>
            )}
          </div>

          {/* Requirements */}
          <div>
            <label
              className="block text-[14px] font-semibold text-[#515b6f] mb-1.5"
              style={{ fontFamily: "'Epilogue', sans-serif" }}
            >
              Requirements <span className="text-red-500">*</span>
            </label>
            <textarea
              {...register('requirements')}
              placeholder="Job requirements..."
              rows={4}
              className="w-full px-3 py-2.5 border border-[#d6ddeb] rounded text-[14px] text-[#25324b] placeholder-[#a8adb7] focus:outline-none focus:border-[#4640de] transition-colors resize-none"
              style={{ fontFamily: "'Epilogue', sans-serif" }}
            />
            {errors.requirements && (
              <p className="mt-1 text-[12px] text-red-500">{errors.requirements.message}</p>
            )}
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 text-[14px] font-semibold text-[#515b6f] border border-[#d6ddeb] rounded hover:bg-[#f8f8fd] transition-colors"
              style={{ fontFamily: "'Epilogue', sans-serif" }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-2.5 bg-[#4640DE] text-white text-[14px] font-bold rounded hover:bg-[#3530c4] disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
              style={{ fontFamily: "'Epilogue', sans-serif" }}
            >
              {submitting
                ? editingJob
                  ? 'Updating...'
                  : 'Creating...'
                : editingJob
                  ? 'Update Job'
                  : 'Create Job'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
