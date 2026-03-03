import { useEffect, useState, type ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router";
import LoaderFixed from "~/components/common/LoaderFixed";
import { UserRoleEnum } from "~/enums/user-role.enum";
import { useAppDispatch } from "~/redux/store/hooks";
import type { RootState } from "~/redux/store/rootReducer";
import { userTokenVerify } from "~/services/httpServices/userHttpService";
import type { UserVerifyState } from "~/types/user-verify";

type UserRole = UserRoleEnum.ADMIN | UserRoleEnum.USER;

interface RouteGuardProps {
  children: ReactNode;
  requireAuth?: boolean;
  allowedRoles?: UserRole[];
  deniedRoles?: UserRole[];
  redirectTo?: string;
  redirectMap?: Partial<Record<UserRole, string>>;
  redirectAuthenticated?: boolean;
}

export function RouteGuard({
  children,
  requireAuth = true,
  allowedRoles,
  deniedRoles,
  redirectTo,
  redirectMap,
  redirectAuthenticated = false,
}: RouteGuardProps) {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { isAuthenticated, userVerifyData, success, error } = useSelector<
    RootState,
    UserVerifyState
  >((state) => state.userVerify);
  const [initialCheckDone, setInitialCheckDone] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      await dispatch(userTokenVerify());
      setInitialCheckDone(true);
    };
    checkAuth();
  }, [dispatch]);

  const userRole = userVerifyData?.data?.role as UserRole | undefined;

  if (!initialCheckDone && !success) {
    return <LoaderFixed />;
  }

  if (redirectAuthenticated && isAuthenticated) {
    if (userRole) {
      const roleRedirect = redirectMap?.[userRole];
      if (roleRedirect) {
        return <Navigate to={roleRedirect} replace />;
      }
      return <Navigate to="/" replace />;
    } else {
      return <Navigate to="/" replace />;
    }
  }

  if (
    requireAuth &&
    !redirectAuthenticated &&
    !isAuthenticated &&
    initialCheckDone
  ) {
    return <Navigate to="/login" replace />;
  }

  if (isAuthenticated) {
    if (userRole) {
      if (deniedRoles && deniedRoles.includes(userRole)) {
        const roleRedirect = redirectMap?.[userRole];
        return <Navigate to={roleRedirect || redirectTo || "/"} replace />;
      }
      if (allowedRoles && !allowedRoles.includes(userRole)) {
        const roleRedirect = redirectMap?.[userRole];
        return <Navigate to={roleRedirect || redirectTo || "/"} replace />;
      }
    } else {
      return <Navigate to="/" replace />;
    }
  }

  return <>{children}</>;
}
