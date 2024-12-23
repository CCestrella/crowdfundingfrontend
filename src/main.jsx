import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { AuthProvider } from "./components/AuthProvider.jsx";
import NavBar from "./components/NavBar.jsx";
import HomePage from "./pages/HomePage.jsx";
import AthleteListPage from "./components/AthleteList.jsx";
import PostAthletePage from "./pages/PostAthletePage.jsx";
import AthleteInfo from "./components/AthleteInfo.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import PostPledgePage from "./pages/PostPledgePage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

const AppLayout = () => (
  <div>
    <NavBar />
    <Outlet />
  </div>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      // Public Routes
      { path: "/", element: <HomePage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/users", element: <SignUpPage /> },
      { path: "/landing", element: <LandingPage /> },
      { path: "/athletes", element: <AthleteListPage /> },

      // Protected Routes
      {
        path: "/athlete/new",
        element: (
          <ProtectedRoute>
            <PostAthletePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/athlete/:id",
        element: (
          <ProtectedRoute>
            <AthleteInfo />
          </ProtectedRoute>
        ),
      },
      {
        path: "/pledges",
        element: (
          <ProtectedRoute>
            <PostPledgePage />
          </ProtectedRoute>
        ),
      },
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
