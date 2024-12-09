import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomePage from "./pages/HomePage.jsx";
import AthletePage from "./pages/AthletePage.jsx";
import AthleteInfo from "./components/AthleteInfo.jsx";
import NavBar from "./components/NavBar.jsx";
import { AuthProvider } from "./components/AuthProvider.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import PostAthletePage from "./pages/PostAthletePage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <NavBar />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/Athlete", element: <AthletePage /> },
      { path: "/athlete/:id", element: <AthleteInfo /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/newathlete", element: <PostAthletePage /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
