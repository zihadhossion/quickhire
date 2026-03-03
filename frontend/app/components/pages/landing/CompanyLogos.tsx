import VodafoneLogo from '~/assets/icons/vodafone-logo.svg';
import IntelLogo from '~/assets/icons/intel-logo.svg';
import TeslaLogo from '~/assets/icons/tesla-logo.svg';
import AmdLogo from '~/assets/icons/amd-logo.svg';
import TalkitLogo from '~/assets/icons/talkit-logo.svg';

const companyLogos = [
  { name: 'Vodafone', src: VodafoneLogo, width: 'w-[100px] md:w-[130px] lg:w-[154px]' },
  { name: 'Intel', src: IntelLogo, width: 'w-[60px] md:w-[80px] lg:w-[100px]' },
  { name: 'Tesla', src: TeslaLogo, width: 'w-[70px] md:w-[90px] lg:w-[114px]' },
  { name: 'AMD', src: AmdLogo, width: 'w-[70px] md:w-[90px] lg:w-[112px]' },
  { name: 'Talkit', src: TalkitLogo, width: 'w-[60px] md:w-[80px] lg:w-[100px]' },
];

export default function CompanyLogos() {
  return (
    <section className="w-full bg-white py-8 md:py-10 lg:py-12 px-6 md:px-8 lg:px-[124px]">
      <div className="max-w-[1440px] mx-auto">
        <p
          className="text-[16px] md:text-[18px] font-normal leading-[28.8px] text-[#202430] opacity-50 mb-6 md:mb-8"
          style={{ fontFamily: "'Epilogue', sans-serif" }}
        >
          Companies we helped grow
        </p>

        <div className="flex items-center justify-between gap-4 md:gap-6 lg:gap-[37px] overflow-x-auto">
          {companyLogos.map((logo) => (
            <div
              key={logo.name}
              className={`${logo.width} h-[30px] md:h-[36px] lg:h-[40px] shrink-0 opacity-30 grayscale`}
            >
              <img
                src={logo.src}
                alt={logo.name}
                className="w-full h-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
