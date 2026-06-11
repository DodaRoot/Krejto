import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/Dashboard.tsx"),
  route("search", "routes/SearchPage.tsx"),
  route("itemPage/:id", "routes/ItemPage.tsx"),
] satisfies RouteConfig;
