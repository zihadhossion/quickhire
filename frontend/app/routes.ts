import { type RouteConfig, layout, prefix } from "@react-router/dev/routes";
import { publicRoutes } from "./routes/public.routes";
import { authRoutes } from "./routes/auth.routes";
import { adminRoutes } from "./routes/admin.routes";

export default [
  layout("pages/layout.tsx", publicRoutes),
  layout("pages/auth/layout.tsx", authRoutes),
  ...prefix("admin", [
    layout("pages/admin/layout.tsx", adminRoutes),
  ]),
] satisfies RouteConfig;
