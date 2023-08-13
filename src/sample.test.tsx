import { render } from "@testing-library/react";
import App from "./components/App";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import RouteErrorElement from "./components/atoms/RouteErrorElement";
import HomePage from "./components/pages/HomePage";
import CafeDetailPage from "./components/pages/CafeDetailPage";
import CafeListPage from "./components/pages/CafeListPage";
import CafeMapPage from "./components/pages/CafeMapPage";
import { ROUTES } from "./router";

// react-lottie-player
jest.mock("react-lottie-player").mock("lottie-web");

// ResizeObserver
beforeEach(() => {
  window.ResizeObserver = jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
  }));
});
afterEach(() => {
  window.ResizeObserver = ResizeObserver;
  jest.restoreAllMocks();
});

const memoryRouter = createMemoryRouter(
  [
    {
      errorElement: <RouteErrorElement />,
      element: <App />,
      children: [
        {
          path: ROUTES.HOME.path,
          element: <HomePage />,
        },
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
  ],
  {
    initialEntries: [ROUTES.HOME.path],
  }
);

test("2 * 2 equals 4.", () => {
  render(<RouterProvider router={memoryRouter}></RouterProvider>);
  expect(2 * 2).toBe(4);
});
