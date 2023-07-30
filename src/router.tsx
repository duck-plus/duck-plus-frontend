import { createBrowserRouter } from "react-router-dom";
import App from "./components/App";
import { route } from "react-router-typesafe-routes/dom";

// typed Routes
export const ROUTES = {
  HOME: route("", {}),
} as const;

const router = createBrowserRouter([
  {
    path: ROUTES.HOME.path,
    element: <App />,
  },
]);

export default router;
