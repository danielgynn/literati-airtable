import { lazy } from "react";

const Home = lazy(() => import("../pages/Home/Home"));
const Profile = lazy(() => import("../pages/Profile/Profile"));

export default [
  {
    path: "/",
    exact: true,
    component: Home,
    private: false,
  },
  {
    path: "/profile",
    exact: true,
    component: Profile,
    private: false,
  },
];
