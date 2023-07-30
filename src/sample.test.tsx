import { render } from "@testing-library/react";
import Home from "./components/pages/Home";
import App from "./components/App";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import RouteErrorElement from "./components/atoms/RouteErrorElement";
import CafeDetail from "./components/pages/CafeDetail";
import CafeList from "./components/pages/CafeList";
import CafeMap from "./components/pages/CafeMap";
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
  ],
  {
    initialEntries: [ROUTES.HOME.path],
  }
);

test("2 * 2 equals 4.", () => {
  render(<RouterProvider router={memoryRouter}></RouterProvider>);
  expect(2 * 2).toBe(4);
});
