import { useCallback } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router';
import { useAppDispatch, useAppSelector } from '~/redux/store/hooks';
import { logoutUser } from '~/services/httpServices/authService';
import { RouteGuard } from '~/components/guards/RouteGuard';
import { UserRoleEnum } from '~/enums/user-role.enum';

const navItems = [
  {
    label: 'Dashboard',
    to: '/admin/dashboard',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    label: 'Jobs',
    to: '/admin/jobs',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    label: 'Applications',
    to: '/admin/applications',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
];

export default function AdminLayout() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAppSelector((state) => state.auth);

  const handleLogout = useCallback(() => {
    dispatch(logoutUser()).then(() => {
      navigate('/login');
    });
  }, [dispatch, navigate]);

  return (
    <RouteGuard requireAuth allowedRoles={[UserRoleEnum.ADMIN]} redirectTo="/login">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="w-64 bg-[#202430] text-white flex flex-col shrink-0">
          {/* Logo */}
          <div className="flex items-center gap-2 px-6 py-5 border-b border-white/10">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="16" cy="16" r="16" fill="#4640DE" />
              <circle cx="14.5" cy="14.5" r="7" stroke="white" strokeWidth="2" />
              <line x1="19.5" y1="19.5" x2="24" y2="24" stroke="white" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <span
              className="text-[20px] font-bold leading-[30px] tracking-[-0.2px]"
              style={{ fontFamily: "'Red Hat Display', sans-serif" }}
            >
              QuickHire
            </span>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 py-4 space-y-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-[14px] font-medium transition-colors ${
                    isActive
                      ? 'bg-[#4640DE] text-white'
                      : 'text-gray-400 hover:bg-white/5 hover:text-white'
                  }`}
                  style={{ fontFamily: "'Epilogue', sans-serif" }}
                >
                  {item.icon}
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* User Info + Logout */}
          <div className="px-3 py-4 border-t border-white/10">
            <div className="flex items-center gap-3 px-3 py-2 mb-2">
              <div className="w-8 h-8 rounded-full bg-[#4640DE] flex items-center justify-center text-white text-[14px] font-bold">
                {(user?.fullName ?? user?.name)?.charAt(0).toUpperCase() ?? 'A'}
              </div>
              <div className="flex-1 min-w-0">
                <p
                  className="text-[14px] font-medium text-white truncate"
                  style={{ fontFamily: "'Epilogue', sans-serif" }}
                >
                  {user?.fullName ?? user?.name ?? 'Admin'}
                </p>
                <p
                  className="text-[12px] text-gray-400 truncate"
                  style={{ fontFamily: "'Epilogue', sans-serif" }}
                >
                  {user?.email}
                </p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-[14px] font-medium text-gray-400 hover:bg-white/5 hover:text-white transition-colors"
              style={{ fontFamily: "'Epilogue', sans-serif" }}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 bg-[#f8f8fd] overflow-auto">
          <Outlet />
        </main>
      </div>
    </RouteGuard>
  );
}
