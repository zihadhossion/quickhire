interface DeleteJobModalProps {
  jobId: string | null;
  submitting: boolean;
  onConfirm: (id: string) => Promise<void>;
  onCancel: () => void;
}

export default function DeleteJobModal({
  jobId,
  submitting,
  onConfirm,
  onCancel,
}: DeleteJobModalProps) {
  if (!jobId) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onCancel}
      />
      <div className="relative w-full max-w-md mx-4 bg-white rounded-xl shadow-xl p-6">
        <h3
          className="text-[18px] font-semibold text-[#25324b] mb-2"
          style={{ fontFamily: "'Epilogue', sans-serif" }}
        >
          Delete Job
        </h3>
        <p
          className="text-[14px] text-[#515b6f] mb-6"
          style={{ fontFamily: "'Epilogue', sans-serif" }}
        >
          Are you sure you want to delete this job? This action cannot be
          undone.
        </p>
        <div className="flex items-center justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-[14px] font-semibold text-[#515b6f] border border-[#d6ddeb] rounded hover:bg-[#f8f8fd] transition-colors"
            style={{ fontFamily: "'Epilogue', sans-serif" }}
          >
            Cancel
          </button>
          <button
            onClick={() => onConfirm(jobId)}
            disabled={submitting}
            className="px-4 py-2 text-[14px] font-semibold text-white bg-red-600 rounded hover:bg-red-700 disabled:opacity-60 transition-colors"
            style={{ fontFamily: "'Epilogue', sans-serif" }}
          >
            {submitting ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
}
