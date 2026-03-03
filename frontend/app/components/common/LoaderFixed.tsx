export default function LoaderFixed() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#f8f8fd]">
      <div className="text-center">
        <svg
          className="animate-spin h-10 w-10 text-[#4640DE] mx-auto mb-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
        <p className="text-[#515b6f]" style={{ fontFamily: "'Epilogue', sans-serif" }}>
          Loading...
        </p>
      </div>
    </div>
  );
}
