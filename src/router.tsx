import { createBrowserRouter } from "react-router-dom";
import { route } from "react-router-typesafe-routes/dom";
import CafeList from "./components/pages/CafeList";
import CafeDetail from "./components/pages/CafeDetail";
import CafeMap from "./components/pages/CafeMap";
import Home from "./components/pages/Home";
import RouteErrorElement from "./components/atoms/RouteErrorElement";
import App from "./components/App";

// typed Routes
export const ROUTES = {
  HOME: route("", {}),
  CAFE: route(
    "cafe",
    {},
    {
      LIST: route("list", {}),
      DETAIL: route("detail", {}),
      MAP: route("map", {}),
    }
  ),
} as const;

// typed Routes => React Component map.
const router = createBrowserRouter([
  {
    errorElement: <RouteErrorElement />,
    element: <App />,
    children: [
      {
        path: ROUTES.HOME.path,
        element: <Home />,
      },
      {
        path: ROUTES.CAFE.LIST.path,
        element: <CafeList />,
      },
      {
        path: ROUTES.CAFE.DETAIL.path,
        element: <CafeDetail />,
      },
      {
        path: ROUTES.CAFE.MAP.path,
        element: <CafeMap />,
      },
    ],
  },
]);

export default router;
