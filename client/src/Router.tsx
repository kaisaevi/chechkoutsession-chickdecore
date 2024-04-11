import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import Layout from "./pages/Layout";
import HomePage from "./pages/HomePage";
import ConfirmationPage from "./pages/ConfirmationPage";
import CancelPage from "./pages/CancelPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        index: true,
        element: <HomePage />,
      },
      {
        path: "/confirmation",
        element: <ConfirmationPage />,
      },
      {
        path: "/cancel",
        element: <CancelPage />,
      },
    ],
  },
]);
