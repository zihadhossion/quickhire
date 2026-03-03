/** Tag color mapping for bg-tinted job pills (jobs.tsx, job-detail.tsx, FeaturedJobs.tsx) */
export const JOB_TAG_COLORS: Record<string, { bg: string; text: string }> = {
  Marketing: { bg: "bg-[#EB8533]/10", text: "text-[#EB8533]" },
  Design: { bg: "bg-[#56CDAD]/10", text: "text-[#56CDAD]" },
  Business: { bg: "bg-[#4640DE]/10", text: "text-[#4640DE]" },
  Tech: { bg: "bg-[#FF6550]/10", text: "text-[#FF6550]" },
  Technology: { bg: "bg-[#4640DE]/10", text: "text-[#4640DE]" },
  Finance: { bg: "bg-[#0D7C66]/10", text: "text-[#0D7C66]" },
  Sales: { bg: "bg-[#E74C3C]/10", text: "text-[#E74C3C]" },
  Engineering: { bg: "bg-[#3498DB]/10", text: "text-[#3498DB]" },
  Healthcare: { bg: "bg-[#1ABC9C]/10", text: "text-[#1ABC9C]" },
  Legal: { bg: "bg-[#8E44AD]/10", text: "text-[#8E44AD]" },
  "Human Resource": { bg: "bg-[#F39C12]/10", text: "text-[#F39C12]" },
  "Customer Service": { bg: "bg-[#2ECC71]/10", text: "text-[#2ECC71]" },
  Others: { bg: "bg-gray-100", text: "text-gray-600" },
};

/** Tag border-color mapping for border-only pills (LatestJobs.tsx) */
export const JOB_TAG_BORDER_COLORS: Record<
  string,
  { border: string; text: string }
> = {
  Marketing: { border: "border-[#EB8533]", text: "text-[#EB8533]" },
  Design: { border: "border-[#56CDAD]", text: "text-[#56CDAD]" },
  Business: { border: "border-[#4640DE]", text: "text-[#4640DE]" },
  Tech: { border: "border-[#FF6550]", text: "text-[#FF6550]" },
  Technology: { border: "border-[#4640DE]", text: "text-[#4640DE]" },
  Finance: { border: "border-[#0D7C66]", text: "text-[#0D7C66]" },
  Sales: { border: "border-[#E74C3C]", text: "text-[#E74C3C]" },
  Engineering: { border: "border-[#3498DB]", text: "text-[#3498DB]" },
  Healthcare: { border: "border-[#1ABC9C]", text: "text-[#1ABC9C]" },
  Legal: { border: "border-[#8E44AD]", text: "text-[#8E44AD]" },
  "Human Resource": { border: "border-[#F39C12]", text: "text-[#F39C12]" },
  "Customer Service": { border: "border-[#2ECC71]", text: "text-[#2ECC71]" },
  Others: { border: "border-gray-300", text: "text-gray-600" },
};

const LOGO_COLORS_DEFAULT = [
  "#000000",
  "#0061FF",
  "#7B68EE",
  "#2FCB6F",
  "#FF6B6B",
  "#00C4CC",
  "#1BDBDB",
  "#1DA1F2",
];
const LOGO_COLORS_BRIGHT = [
  "#56CDAD",
  "#00C7B7",
  "#0061FF",
  "#7B61FF",
  "#7B42BC",
  "#02B3E4",
  "#1DA1F2",
  "#4353FF",
];

export const getLogoColor = (id: string): string => {
  let hash = 0;
  for (let i = 0; i < id?.length; i++) {
    hash = id.charCodeAt(i) + ((hash << 5) - hash);
  }
  return LOGO_COLORS_DEFAULT[Math.abs(hash) % LOGO_COLORS_DEFAULT.length];
};

export const getLogoColorBright = (id: string): string => {
  let hash = 0;
  for (let i = 0; i < id?.length; i++) {
    hash = id.charCodeAt(i) + ((hash << 5) - hash);
  }
  return LOGO_COLORS_BRIGHT[Math.abs(hash) % LOGO_COLORS_BRIGHT.length];
};

export const getLogoLetter = (company: string): string =>
  company?.charAt(0)?.toUpperCase();
