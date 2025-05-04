import { createBrowserRouter, RouterProvider } from "react-router-dom";

import AuthPage from "../view/AuthPage";
import BaseLayout from "../components/BaseLayout";

const router = createBrowserRouter([
  {
    path: "/Auth",
    element: <AuthPage />,
  },
  {
    element: <BaseLayout />,
    loader: async () => {
      if (!localStorage.access_token) {
        Toastify({
          text: "Please Login First",
          duration: 3000,
          destination: "https://github.com/apvarun/toastify-js",
          newWindow: true,
          close: true,
          gravity: "top", // `top` or `bottom`
          position: "left", // `left`, `center` or `right`
          stopOnFocus: true, // Prevents dismissing of toast on hover
          style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
          },
          onClick: function () {}, // Callback after click
        }).showToast();
        return redirect("/login");
      }
      return null;
    },
    Children: [],
  },
]);

export default router;
