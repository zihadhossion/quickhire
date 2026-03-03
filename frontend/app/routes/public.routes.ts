import { route, index } from "@react-router/dev/routes";

export const publicRoutes = [
  index("pages/home.tsx"),
  route("jobs", "pages/public/jobs.tsx"),
  route("jobs/:id", "pages/public/job-detail.tsx"),
  route("jobs/:id/apply", "pages/public/apply.tsx"),
];
