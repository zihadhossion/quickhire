interface IconProps {
  className?: string;
}

export function DesignIcon({ className = 'w-12 h-12' }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="6" y="6" width="36" height="36" rx="4" stroke="#4640DE" strokeWidth="3" />
      <circle cx="18" cy="18" r="4" stroke="#4640DE" strokeWidth="3" />
      <circle cx="30" cy="30" r="4" stroke="#4640DE" strokeWidth="3" />
      <path d="M18 18L30 30" stroke="#4640DE" strokeWidth="3" />
    </svg>
  );
}

export function SalesIcon({ className = 'w-12 h-12' }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 36L18 24L26 32L42 16" stroke="#4640DE" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M30 16H42V28" stroke="#4640DE" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function MarketingIcon({ className = 'w-12 h-12' }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M40 8L22 20V36L28 28L40 34V8Z" stroke="#4640DE" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M22 20H10C8.89543 20 8 20.8954 8 22V34C8 35.1046 8.89543 36 10 36H22" stroke="#4640DE" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function FinanceIcon({ className = 'w-12 h-12' }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="24" cy="24" r="18" stroke="#4640DE" strokeWidth="3" />
      <path d="M24 14V34" stroke="#4640DE" strokeWidth="3" strokeLinecap="round" />
      <path d="M18 20C18 17.7909 19.7909 16 22 16H26C28.2091 16 30 17.7909 30 20C30 22.2091 28.2091 24 26 24H22C19.7909 24 18 25.7909 18 28C18 30.2091 19.7909 32 22 32H26C28.2091 32 30 30.2091 30 28" stroke="#4640DE" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export function TechnologyIcon({ className = 'w-12 h-12' }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="6" y="8" width="36" height="24" rx="2" stroke="#4640DE" strokeWidth="3" />
      <path d="M16 40H32" stroke="#4640DE" strokeWidth="3" strokeLinecap="round" />
      <path d="M24 32V40" stroke="#4640DE" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export function EngineeringIcon({ className = 'w-12 h-12' }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M30 6L36 12L30 18" stroke="#4640DE" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M18 6L12 12L18 18" stroke="#4640DE" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M24 4V14" stroke="#4640DE" strokeWidth="3" strokeLinecap="round" />
      <circle cx="24" cy="32" r="12" stroke="#4640DE" strokeWidth="3" />
      <path d="M24 26V32L28 34" stroke="#4640DE" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function BusinessIcon({ className = 'w-12 h-12' }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="8" y="16" width="32" height="24" rx="2" stroke="#4640DE" strokeWidth="3" />
      <path d="M16 16V12C16 9.79086 17.7909 8 20 8H28C30.2091 8 32 9.79086 32 12V16" stroke="#4640DE" strokeWidth="3" />
      <path d="M8 26H40" stroke="#4640DE" strokeWidth="3" />
      <circle cx="24" cy="26" r="2" fill="#4640DE" />
    </svg>
  );
}

export function HumanResourceIcon({ className = 'w-12 h-12' }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="24" cy="16" r="8" stroke="#4640DE" strokeWidth="3" />
      <path d="M10 42C10 34.268 16.268 28 24 28C31.732 28 38 34.268 38 42" stroke="#4640DE" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}
