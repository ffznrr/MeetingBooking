import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";
import AuthPage from "../view/AuthPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/Auth",
    element: <AuthPage />,
  },
]);

export default router;
