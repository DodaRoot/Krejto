import {
  type RouteConfig,
  index,
  route,
  layout,
} from "@react-router/dev/routes";

export default [
  layout("routes/IndexPage/Index.tsx", [
    index("routes/LandingPage/Landing.tsx"),
    route("profile", "routes/ProfilePage/Profile.tsx"),
    route("liked", "routes/LikedPage/Liked.tsx"),
    route("messages", "routes/MessagesPage/Messages.tsx"),
    route("search", "routes/SearchPage/SearchPage.tsx"),
    route("itemPage/:id", "routes/ItemPage/ItemPage.tsx"),
    route("preferences", "routes/PreferencesPage/Preferences.tsx"),
    route("loginOrRegister", "routes/LoginRegisterPage/LoginRegister.tsx"),
  ]),
  route("*", "routes/NotFoundPage/NotFound.tsx"),
] satisfies RouteConfig;
