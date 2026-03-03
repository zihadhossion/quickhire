import ArrowRightIcon from '~/assets/icons/arrow-right.svg';
import {
  DesignIcon,
  SalesIcon,
  MarketingIcon,
  FinanceIcon,
  TechnologyIcon,
  EngineeringIcon,
  BusinessIcon,
  HumanResourceIcon,
} from './CategoryIcons';

const categories = [
  { name: 'Design', jobCount: 235, Icon: DesignIcon },
  { name: 'Sales', jobCount: 756, Icon: SalesIcon },
  { name: 'Marketing', jobCount: 140, Icon: MarketingIcon },
  { name: 'Finance', jobCount: 325, Icon: FinanceIcon },
  { name: 'Technology', jobCount: 436, Icon: TechnologyIcon },
  { name: 'Engineering', jobCount: 542, Icon: EngineeringIcon },
  { name: 'Business', jobCount: 211, Icon: BusinessIcon },
  { name: 'Human Resource', jobCount: 346, Icon: HumanResourceIcon },
];

export default function CategorySection() {
  return (
    <section className="w-full bg-white py-12 md:py-16 lg:pt-[72px] lg:pb-0 px-6 md:px-8 lg:px-[124px]">
      <div className="max-w-[1440px] mx-auto">
        {/* Header */}
        <div className="flex items-end justify-between mb-8 md:mb-10 lg:mb-12">
          <h2
            className="text-[28px] md:text-[36px] lg:text-[48px] font-semibold leading-[1.1] text-[#25324b]"
            style={{ fontFamily: "'Clash Display', sans-serif" }}
          >
            Explore by <span className="text-[#26a3ff]">category</span>
          </h2>

          <a
            href="#"
            className="hidden md:flex items-center gap-4 text-[16px] font-semibold leading-[25.6px] text-[#4640de] hover:text-[#3530b0] transition-colors shrink-0"
            style={{ fontFamily: "'Epilogue', sans-serif" }}
          >
            Show all jobs
            <img src={ArrowRightIcon} alt="" className="w-6 h-6" />
          </a>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
          {categories.map((category, index) => (
            <a
              key={category.name}
              href="#"
              className={`group flex flex-col gap-4 md:gap-6 lg:gap-8 p-5 md:p-6 lg:p-8 border border-[#d6ddeb] hover:bg-[#4640de] transition-colors ${
                index === 2 ? 'bg-[#4640de]' : 'bg-white'
              }`}
            >
              <div className={`${index === 2 ? '[&_svg]:stroke-white' : 'group-hover:[&_svg]:stroke-white'}`}>
                <category.Icon className="w-10 h-10 md:w-12 md:h-12" />
              </div>
              <div className="flex flex-col gap-2 md:gap-3">
                <h3
                  className={`text-[16px] md:text-[18px] lg:text-[24px] font-semibold leading-[28.8px] ${
                    index === 2 ? 'text-white' : 'text-[#25324b] group-hover:text-white'
                  } transition-colors`}
                  style={{ fontFamily: "'Clash Display', sans-serif" }}
                >
                  {category.name}
                </h3>
                <div className="flex items-center gap-4">
                  <span
                    className={`text-[14px] md:text-[16px] lg:text-[18px] font-normal leading-[1.6] ${
                      index === 2 ? 'text-white/70' : 'text-[#7c8493] group-hover:text-white/70'
                    } transition-colors`}
                    style={{ fontFamily: "'Epilogue', sans-serif" }}
                  >
                    {category.jobCount} jobs available
                  </span>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    className={`w-5 h-5 md:w-6 md:h-6 ${
                      index === 2 ? 'text-white' : 'text-[#25324b] group-hover:text-white'
                    } transition-colors`}
                  >
                    <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Mobile Show All Button */}
        <div className="flex md:hidden justify-center mt-8">
          <a
            href="#"
            className="flex items-center gap-2 text-[16px] font-semibold text-[#4640de]"
            style={{ fontFamily: "'Epilogue', sans-serif" }}
          >
            Show all jobs
            <img src={ArrowRightIcon} alt="" className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
}
