import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { AuthProvider } from "./components/AuthProvider.jsx";
import NavBar from "./components/NavBar.jsx";
import HomePage from "./pages/HomePage.jsx";
import AthleteList from "./components/AthleteList.jsx";
import PostAthletePage from "./pages/PostAthletePage.jsx";
import AthleteInfo from "./components/AthleteInfo.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import PostPledgesForm from "./components/PostPledgesForm.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import LandingPage from "./pages/LandingPage.jsx";

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
      { path: "/", element: <HomePage /> },
      { path: "/athletes", element: <AthleteList /> },
      { path: "/athlete/new", element: <PostAthletePage /> },
      { path: "/athlete/:id", element: <AthleteInfo /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/pledges", element: <PostPledgesForm /> },
      { path: "/users/", element: <SignUpPage /> },
      { path: "/landing", element: <LandingPage /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
);

