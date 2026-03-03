import { route } from "@react-router/dev/routes";

export const adminRoutes = [
  route("dashboard", "pages/admin/dashboard.tsx"),
  route("jobs", "pages/admin/jobs.tsx"),
  route("applications", "pages/admin/applications.tsx"),
];
