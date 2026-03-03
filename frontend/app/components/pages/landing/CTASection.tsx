import CtaDashboard from '~/assets/image/cta-dashboard.png';

export default function CTASection() {
  return (
    <section className="w-full bg-white py-12 md:py-16 lg:py-[72px] px-6 md:px-8 lg:px-[124px]">
      <div className="max-w-[1440px] mx-auto">
        <div className="relative bg-[#4640de] overflow-hidden">
          {/* Content */}
          <div className="relative z-10 flex flex-col lg:flex-row items-center lg:items-start justify-between p-8 md:p-12 lg:p-16">
            {/* Text */}
            <div className="flex flex-col gap-4 md:gap-6 max-w-full lg:max-w-[364px] mb-8 lg:mb-0">
              <h2
                className="text-[28px] md:text-[36px] lg:text-[48px] font-semibold leading-[1.1] text-white"
                style={{ fontFamily: "'Clash Display', sans-serif" }}
              >
                Start posting{' '}
                <br className="hidden md:block" />
                jobs today
              </h2>
              <p
                className="text-[14px] md:text-[16px] font-medium leading-[25.6px] text-white"
                style={{ fontFamily: "'Epilogue', sans-serif" }}
              >
                Start posting jobs for only $10.
              </p>
              <a
                href="/auth/register"
                className="inline-flex items-center justify-center px-6 py-3 bg-white text-[#4640de] text-[16px] font-bold leading-[25.6px] hover:bg-gray-100 transition-colors self-start"
                style={{ fontFamily: "'Epilogue', sans-serif" }}
              >
                Sign Up For Free
              </a>
            </div>

            {/* Dashboard Preview */}
            <div className="w-full lg:w-[564px] shrink-0">
              <img
                src={CtaDashboard}
                alt="QuickHire Dashboard Preview"
                className="w-full h-auto rounded-sm shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
