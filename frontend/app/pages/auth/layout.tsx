import { Outlet } from "react-router";
import { RouteGuard } from "~/components/guards/RouteGuard";
import { UserRoleEnum } from "~/enums/user-role.enum";

export default function AuthLayout() {
  return (
    <RouteGuard
      requireAuth={false}
      redirectAuthenticated
      redirectMap={{
        [UserRoleEnum.ADMIN]: '/admin/dashboard',
        [UserRoleEnum.USER]: '/',
      }}
    >
      <div className="relative">
        <Outlet />
      </div>
    </RouteGuard>
  );
}
