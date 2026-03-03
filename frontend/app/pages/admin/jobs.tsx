import { useEffect, useState, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '~/redux/store/hooks';
import { fetchJobs, createJob, updateJob, deleteJob } from '~/services/httpServices/jobService';
import type { Job, CreateJobDto, UpdateJobDto } from '~/types/job';
import JobsTable from '~/components/pages/admin/JobsTable';
import JobFormModal, { type JobFormData } from '~/components/pages/admin/JobFormModal';
import DeleteJobModal from '~/components/pages/admin/DeleteJobModal';

export default function AdminJobs() {
  const dispatch = useAppDispatch();
  const { jobs, loading } = useAppSelector((state) => state.jobs);

  const [showModal, setShowModal] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    dispatch(fetchJobs(undefined));
  }, [dispatch]);

  const openCreateModal = useCallback(() => {
    setEditingJob(null);
    setShowModal(true);
  }, []);

  const openEditModal = useCallback((job: Job) => {
    setEditingJob(job);
    setShowModal(true);
  }, []);

  const closeModal = useCallback(() => {
    setShowModal(false);
    setEditingJob(null);
  }, []);

  const handleFormSubmit = useCallback(
    async (data: JobFormData) => {
      setSubmitting(true);
      const dto: CreateJobDto = {
        title: data.title,
        company: data.company,
        location: data.location,
        category: data.category,
        type: data.type,
        description: data.description,
        requirements: data.requirements,
        salary: data.salary || undefined,
        tags: data.tags
          ? data.tags.split(',').map((t) => t.trim()).filter(Boolean)
          : undefined,
      };

      try {
        if (editingJob) {
          const updateDto: UpdateJobDto = { ...dto };
          await dispatch(updateJob({ id: editingJob.id, dto: updateDto })).unwrap();
        } else {
          await dispatch(createJob(dto)).unwrap();
        }
        closeModal();
        dispatch(fetchJobs(undefined));
      } catch {
        // error handled by Redux
      } finally {
        setSubmitting(false);
      }
    },
    [dispatch, editingJob, closeModal]
  );

  const handleDelete = useCallback(
    async (id: string) => {
      setSubmitting(true);
      try {
        await dispatch(deleteJob(id)).unwrap();
        setDeleteConfirmId(null);
      } catch {
        // error handled by Redux
      } finally {
        setSubmitting(false);
      }
    },
    [dispatch]
  );

  return (
    <div className="p-6 md:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1
          className="text-[24px] md:text-[32px] font-semibold text-[#25324b]"
          style={{ fontFamily: "'Clash Display', sans-serif" }}
        >
          Manage Jobs
        </h1>
        <button
          onClick={openCreateModal}
          className="px-6 py-2.5 bg-[#4640DE] text-white text-[14px] font-bold rounded hover:bg-[#3530c4] transition-colors"
          style={{ fontFamily: "'Epilogue', sans-serif" }}
        >
          + Create New Job
        </button>
      </div>

      {/* Jobs Table */}
      <div className="border border-[#d6ddeb] rounded-xl bg-white shadow-sm overflow-hidden">
        <JobsTable
          jobs={jobs ?? []}
          loading={loading}
          onEdit={openEditModal}
          onDeleteRequest={setDeleteConfirmId}
        />
      </div>

      {/* Create/Edit Modal */}
      <JobFormModal
        isOpen={showModal}
        editingJob={editingJob}
        onClose={closeModal}
        onSubmit={handleFormSubmit}
        submitting={submitting}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteJobModal
        jobId={deleteConfirmId}
        submitting={submitting}
        onConfirm={handleDelete}
        onCancel={() => setDeleteConfirmId(null)}
      />
    </div>
  );
}
