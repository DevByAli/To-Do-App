import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage";
import Auth from "../pages/Auth";
import Home from "../pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Auth />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

export default router;
