import {
  type RouteConfig,
  index,
  route,
  layout,
} from "@react-router/dev/routes";

export default [
  layout("routes/Index.tsx", [
    index("routes/Landing.tsx"),
    route("profile", "routes/Profile.tsx"),
    route("liked", "routes/Liked.tsx"),
    route("messages", "routes/Messages.tsx"),
    route("search", "routes/SearchPage.tsx"),
    route("itemPage/:id", "routes/ItemPage.tsx"),
    route("preferences", "routes/Preferences.tsx"),
  ]),
  route("*", "routes/NotFound.tsx"),
] satisfies RouteConfig;
