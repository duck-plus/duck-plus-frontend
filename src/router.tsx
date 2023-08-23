import { createBrowserRouter } from 'react-router-dom';
import { number, route, string } from 'react-router-typesafe-routes/dom';
import CafeListPage from './components/pages/CafeListPage';
import CafeDetailPage from './components/pages/CafeDetailPage';
import CafeMapPage from './components/pages/CafeMapPage';
import MainHomePage from './components/pages/MainHomePage';
// import Home from "./components/pages/Home";
import RouteErrorElement from './components/atoms/RouteErrorElement';
import App from './components/App';
import CommingSoon from './components/pages/CommingSoonPage';
import CalcResultPage from './components/pages/CalcResultPage';
import CalcPage from './components/pages/CalcPage';
import HomePage from './components/pages/HomePage';

// typed Routes
export const ROUTES = {
  HOME: route('', {}),
  CALC: route(
    'calc',
    {},
    {
      RESULT: route('result', {
        searchParams: {
          dailyCharge: number().default(0),
        },
      }),
    }
  ),
  CAFE: route(
    '',
    {},
    {
      LIST: route('cafe-list', {}),
      DETAILS: route('cafe-details', {
        searchParams: {
          code: string().default(''),
        },
      }),
      MAP: route('cafe-map', {
        searchParams: {
          code: string().default(''),
        },
      }),
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
        element: <MainHomePage />,
      },

      // Calc
      {
        path: ROUTES.CALC.path,
        element: <CalcPage />,
      },
      {
        path: ROUTES.CALC.RESULT.relativePath,
        element: <CalcResultPage />,
      },

      // Cafe
      {
        path: ROUTES.CAFE.LIST.path,
        element: <CafeListPage />,
      },
      {
        path: ROUTES.CAFE.DETAILS.path,
        element: <CafeDetailPage />,
      },
      {
        path: ROUTES.CAFE.MAP.path,
        element: <CafeMapPage />,
      },
    ],
  },
]);

export default router;
