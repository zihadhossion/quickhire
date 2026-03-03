import SearchIcon from '~/assets/icons/search.svg';
import LocationIcon from '~/assets/icons/location.svg';
import HeroPerson from '~/assets/image/hero-person.png';

export default function HeroSection() {
  return (
    <section className="relative w-full bg-[#f8f8fd] overflow-hidden">
      {/* Decorative Pattern (background lines) */}
      <div className="absolute right-0 top-0 w-[860px] h-full hidden lg:block pointer-events-none">
        <div className="absolute right-0 top-[50px] w-[459px] h-[355px] border-[4px] border-[#cbcbf4] rounded-none opacity-60" />
        <div className="absolute right-0 top-[75px] w-[860px] h-[644px] border-[4px] border-[#cbcbf4] rounded-none opacity-70" />
        <div className="absolute right-[10px] top-[82px] w-[840px] h-[629px] border-[4px] border-[#cbcbf4] rounded-none opacity-70" />
        <div className="absolute right-[46px] top-[112px] w-[768px] h-[569px] border-[4px] border-[#cbcbf4] rounded-none opacity-70" />
      </div>

      {/* Hero Person Image - Desktop */}
      <div className="absolute right-[50px] bottom-0 hidden lg:block pointer-events-none z-[1]">
        <img
          src={HeroPerson}
          alt="Professional person"
          className="w-[486px] h-auto max-h-[700px] object-contain"
        />
      </div>

      <div className="relative z-[2] w-full max-w-[1440px] mx-auto px-6 md:px-8 lg:px-[124px] pt-12 pb-16 md:pt-16 md:pb-20 lg:pt-[100px] lg:pb-[120px]">
        {/* Title */}
        <div className="max-w-full lg:max-w-[629px]">
          <h1
            className="text-[36px] md:text-[48px] lg:text-[72px] font-semibold leading-[1.1] text-[#25324b] mb-4 lg:mb-6"
            style={{ fontFamily: "'Clash Display', sans-serif" }}
          >
            Discover{' '}
            <br className="hidden md:block" />
            more than{' '}
            <br className="hidden lg:block" />
            <span className="text-[#26a3ff]">5000+</span>{' '}
            <span className="text-[#26a3ff]">Jobs</span>
          </h1>

          <p
            className="text-[16px] md:text-[18px] lg:text-[20px] font-normal leading-[1.6] text-[#515b6f] opacity-70 mb-6 lg:mb-[23px] max-w-[521px]"
            style={{ fontFamily: "'Epilogue', sans-serif" }}
          >
            Great platform for the job seeker that searching for new career heights and passionate about startups.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-full lg:max-w-[852px]">
          <div className="flex flex-col md:flex-row items-stretch bg-white p-4 shadow-[0px_3px_4px_0px_rgba(192,192,192,0.03),0px_7px_11px_0px_rgba(192,192,192,0.04),0px_14px_23px_0px_rgba(192,192,192,0.05),0px_29px_47px_0px_rgba(192,192,192,0.06),0px_79px_128px_0px_rgba(192,192,192,0.09)]">
            {/* Job Title Input */}
            <div className="flex items-center gap-4 flex-1 px-4 py-3 md:py-0 border-b md:border-b-0 md:border-r border-[#d6ddeb]">
              <img src={SearchIcon} alt="" className="w-6 h-6 shrink-0" />
              <input
                type="text"
                placeholder="Job title or keyword"
                className="w-full bg-transparent text-[16px] leading-[25.6px] text-[#25324b] placeholder:text-[#7c8493] placeholder:opacity-50 outline-none"
                style={{ fontFamily: "'Epilogue', sans-serif" }}
              />
            </div>

            {/* Location Input */}
            <div className="flex items-center gap-4 flex-1 px-4 py-3 md:py-0 md:pl-4">
              <img src={LocationIcon} alt="" className="w-6 h-6 shrink-0" />
              <div className="flex items-center justify-between w-full">
                <input
                  type="text"
                  placeholder="Florence, Italy"
                  className="w-full bg-transparent text-[16px] leading-[25.6px] text-[#25324b] placeholder:text-[#25324b] placeholder:opacity-90 outline-none"
                  style={{ fontFamily: "'Epilogue', sans-serif" }}
                />
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0 hidden md:block">
                  <path d="M4 6L8 10L12 6" stroke="#25324B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>

            {/* Search Button */}
            <button
              className="flex items-center justify-center px-[27px] py-[14px] bg-[#4640de] text-white text-[18px] font-bold leading-[28.8px] hover:bg-[#3530b0] transition-colors mt-3 md:mt-0 md:ml-4 shrink-0"
              style={{ fontFamily: "'Epilogue', sans-serif" }}
            >
              Search my job
            </button>
          </div>

          {/* Popular Tags */}
          <p
            className="mt-4 text-[14px] md:text-[16px] font-normal leading-[25.6px] text-[#202430] opacity-70"
            style={{ fontFamily: "'Epilogue', sans-serif" }}
          >
            <span className="font-medium">Popular : </span>
            UI Designer, UX Researcher, Android, Admin
          </p>
        </div>
      </div>
    </section>
  );
}
