import { createBrowserRouter } from "react-router-dom";
import { route, string } from "react-router-typesafe-routes/dom";
import CafeList from "./components/pages/CafeListPage";
import CafeDetail from "./components/pages/CafeDetailPage";
import CafeMap from "./components/pages/CafeMapPage";
// import Home from "./components/pages/Home";
import Calc from "./components/pages/CalcPage";
import RouteErrorElement from "./components/atoms/RouteErrorElement";
import App from "./components/App";
import CommingSoon from "./components/pages/CommingSoonPage";

// typed Routes
export const ROUTES = {
  HOME: route("", {}),
  CALC: route("calc", {}),
  CAFE: route(
    "",
    {},
    {
      LIST: route("cafe-list", {}),
      DETAILS: route("cafe-details/:code", {
        searchParams: {
          code: string().defined(),
        },
      }),
      MAP: route("cafe-map", {}),
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
        // element: <Home />,
        element: <CommingSoon />,
      },
      {
        path: ROUTES.CALC.path,
        element: <Calc />,
      },
      {
        path: ROUTES.CAFE.LIST.path,
        element: <CafeList />,
      },
      {
        path: ROUTES.CAFE.DETAILS.path,
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
