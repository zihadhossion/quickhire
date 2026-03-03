import { useState } from 'react';
import { Link } from 'react-router';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="w-full">
      <nav className="flex items-center justify-between px-6 py-4 md:px-8 lg:px-[124px] lg:py-0 lg:h-[78px]">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="16" cy="16" r="16" fill="#4640DE" />
            <circle cx="14.5" cy="14.5" r="7" stroke="white" strokeWidth="2" />
            <line x1="19.5" y1="19.5" x2="24" y2="24" stroke="white" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <span className="text-[24px] font-bold leading-[36px] tracking-[-0.24px] text-[#25324b]" style={{ fontFamily: "'Red Hat Display', sans-serif" }}>
            QuickHire
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-4">
          <Link
            to="/jobs"
            className="text-[16px] font-medium leading-[25.6px] text-[#515b6f] hover:text-[#25324b] transition-colors"
            style={{ fontFamily: "'Epilogue', sans-serif" }}
          >
            Find Jobs
          </Link>
          <Link
            to="/jobs"
            className="text-[16px] font-medium leading-[25.6px] text-[#515b6f] hover:text-[#25324b] transition-colors"
            style={{ fontFamily: "'Epilogue', sans-serif" }}
          >
            Browse Companies
          </Link>
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden lg:flex items-center gap-4">
          <Link
            to="/login"
            className="text-[16px] font-bold leading-[25.6px] text-[#4640de] hover:text-[#3530b0] transition-colors"
            style={{ fontFamily: "'Epilogue', sans-serif" }}
          >
            Login
          </Link>
          <Link
            to="/register"
            className="flex items-center justify-center px-6 py-3 bg-[#4640de] text-white text-[16px] font-bold leading-[25.6px] hover:bg-[#3530b0] transition-colors"
            style={{ fontFamily: "'Epilogue', sans-serif" }}
          >
            Sign Up
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-[#25324b] transition-transform ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-[#25324b] transition-opacity ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-[#25324b] transition-transform ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden px-6 pb-6 flex flex-col gap-4 bg-white border-b border-[#d6ddeb]">
          <Link
            to="/jobs"
            className="text-[16px] font-medium text-[#515b6f] py-2"
            style={{ fontFamily: "'Epilogue', sans-serif" }}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Find Jobs
          </Link>
          <Link
            to="/jobs"
            className="text-[16px] font-medium text-[#515b6f] py-2"
            style={{ fontFamily: "'Epilogue', sans-serif" }}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Browse Companies
          </Link>
          <div className="flex flex-col gap-3 pt-2">
            <Link
              to="/login"
              className="text-[16px] font-bold text-[#4640de] text-center py-3 border border-[#4640de]"
              style={{ fontFamily: "'Epilogue', sans-serif" }}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Login
            </Link>
            <Link
              to="/register"
              className="text-[16px] font-bold text-white text-center py-3 bg-[#4640de]"
              style={{ fontFamily: "'Epilogue', sans-serif" }}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
