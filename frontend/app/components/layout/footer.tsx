import { Link } from 'react-router';
import TwitterIcon from '~/assets/icons/twitter.svg';
import LinkedInIcon from '~/assets/icons/linkedin.svg';
import DribbbleIcon from '~/assets/icons/dribbble.svg';
import InstagramIcon from '~/assets/icons/instagram.svg';
import FacebookIcon from '~/assets/icons/facebook.svg';

const aboutLinks = [
  { label: 'Companies', href: '#' },
  { label: 'Pricing', href: '#' },
  { label: 'Terms', href: '#' },
  { label: 'Advice', href: '#' },
  { label: 'Privacy Policy', href: '#' },
];

const resourceLinks = [
  { label: 'Help Docs', href: '#' },
  { label: 'Guide', href: '#' },
  { label: 'Updates', href: '#' },
  { label: 'Contact Us', href: '#' },
];

const socialLinks = [
  { icon: FacebookIcon, label: 'Facebook', href: '#' },
  { icon: InstagramIcon, label: 'Instagram', href: '#' },
  { icon: DribbbleIcon, label: 'Dribbble', href: '#' },
  { icon: LinkedInIcon, label: 'LinkedIn', href: '#' },
  { icon: TwitterIcon, label: 'Twitter', href: '#' },
];

export default function Footer() {
  return (
    <footer className="w-full bg-[#202430]">
      <div className="max-w-[1440px] mx-auto px-6 md:px-8 lg:px-[124px] py-10 md:py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 lg:gap-12">
          {/* Brand Column */}
          <div className="flex flex-col gap-6 lg:col-span-1">
            <Link to="/" className="flex items-center gap-2">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="16" cy="16" r="16" fill="#4640DE" />
                <circle cx="14.5" cy="14.5" r="7" stroke="white" strokeWidth="2" />
                <line x1="19.5" y1="19.5" x2="24" y2="24" stroke="white" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <span className="text-[24px] font-bold leading-[36px] tracking-[-0.24px] text-white" style={{ fontFamily: "'Red Hat Display', sans-serif" }}>
                QuickHire
              </span>
            </Link>
            <p
              className="text-[16px] font-normal leading-[25.6px] text-[#d6ddeb] max-w-[280px]"
              style={{ fontFamily: "'Epilogue', sans-serif" }}
            >
              Great platform for the job seeker that passionate about startups. Find your dream job easier.
            </p>
          </div>

          {/* About Column */}
          <div className="flex flex-col gap-4">
            <h4
              className="text-[18px] font-semibold leading-[28.8px] text-white"
              style={{ fontFamily: "'Epilogue', sans-serif" }}
            >
              About
            </h4>
            <nav className="flex flex-col gap-3">
              {aboutLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-[16px] font-normal leading-[25.6px] text-[#d6ddeb] hover:text-white transition-colors"
                  style={{ fontFamily: "'Epilogue', sans-serif" }}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Resources Column */}
          <div className="flex flex-col gap-4">
            <h4
              className="text-[18px] font-semibold leading-[28.8px] text-white"
              style={{ fontFamily: "'Epilogue', sans-serif" }}
            >
              Resources
            </h4>
            <nav className="flex flex-col gap-3">
              {resourceLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-[16px] font-normal leading-[25.6px] text-[#d6ddeb] hover:text-white transition-colors"
                  style={{ fontFamily: "'Epilogue', sans-serif" }}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Newsletter Column */}
          <div className="flex flex-col gap-4">
            <h4
              className="text-[18px] font-semibold leading-[28.8px] text-white"
              style={{ fontFamily: "'Epilogue', sans-serif" }}
            >
              Get job notifications
            </h4>
            <p
              className="text-[16px] font-normal leading-[25.6px] text-[#d6ddeb]"
              style={{ fontFamily: "'Epilogue', sans-serif" }}
            >
              The latest job news, articles, sent to your inbox weekly.
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Email Address"
                className="flex-1 px-4 py-3 bg-white border border-[#d6ddeb] text-[16px] font-normal leading-[25.6px] text-[#25324b] placeholder:text-[#a8adb7] outline-none"
                style={{ fontFamily: "'Epilogue', sans-serif" }}
              />
              <button
                className="px-6 py-3 bg-[#4640de] text-white text-[16px] font-bold leading-[25.6px] hover:bg-[#3530b0] transition-colors shrink-0"
                style={{ fontFamily: "'Epilogue', sans-serif" }}
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-[1px] bg-white/10 my-8 md:my-10" />

        {/* Bottom Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p
            className="text-[14px] md:text-[16px] font-normal leading-[25.6px] text-[#d6ddeb] opacity-60"
            style={{ fontFamily: "'Epilogue', sans-serif" }}
          >
            2021 @ QuickHire. All rights reserved.
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-6">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                aria-label={social.label}
              >
                <img src={social.icon} alt={social.label} className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
