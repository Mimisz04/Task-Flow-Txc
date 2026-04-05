import { createBrowserRouter } from "react-router";
import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import { CreateDemand } from "./pages/CreateDemand";
import { Kanban } from "./pages/Kanban";
import { Calendar } from "./pages/Calendar";
import { Layout } from "./components/Layout";

export const router = createBrowserRouter([
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Dashboard },
      { path: "demandas/nova", Component: CreateDemand },
      { path: "kanban", Component: Kanban },
      { path: "calendario", Component: Calendar },
    ],
  },
]);
