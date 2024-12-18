import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomePage from "./pages/HomePage.jsx";
import AthletePage from "./pages/AthletePage.jsx";
import AthleteInfo from "./components/AthleteInfo.jsx";
import NavBar from "./components/NavBar.jsx";
import { AuthProvider } from "./components/AuthProvider.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import PostPledgesForm from "./components/PostPledgesForm.jsx";
import PostAthletePage from "./pages/PostAthletePage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx"; // Import SignUpPage
import LandingPage from "./pages/LandingPage.jsx";
import AthleteList from "./components/AthleteList.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <NavBar />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/athletes", element: <AthleteList /> }, // View all athletes
      { path: "/athlete/new", element: <PostAthletePage /> }, // Create a new athlete
      { path: "/athlete/:id", element: <AthleteInfo /> }, // View specific athlete details
      { path: "/login", element: <LoginPage /> },
      { path: "/pledges", element: <PostPledgesForm /> },
      { path: "/users", element: <SignUpPage /> },
      { path: "/landing", element: <LandingPage /> },
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
