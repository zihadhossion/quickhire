import Header from '~/components/layout/header';
import HeroSection from '~/components/pages/landing/HeroSection';
import CompanyLogos from '~/components/pages/landing/CompanyLogos';
import CategorySection from '~/components/pages/landing/CategorySection';
import CTASection from '~/components/pages/landing/CTASection';
import FeaturedJobs from '~/components/pages/landing/FeaturedJobs';
import LatestJobs from '~/components/pages/landing/LatestJobs';

import type { Route } from '../pages/+types/home';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'QuickHire - Discover More Than 5000+ Jobs' },
    { name: 'description', content: 'Great platform for the job seeker that searching for new career heights and passionate about startups.' },
  ];
}

export default function Home() {
  return (
    <div className="w-full">
      {/* Header overlays the hero */}
      <div className="bg-[#f8f8fd]">
        <Header />
      </div>
      <HeroSection />
      <CompanyLogos />
      <CategorySection />
      <CTASection />
      <FeaturedJobs />
      <LatestJobs />
    </div>
  );
}
