import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomePage from "./pages/HomePage.jsx";
import AthletePage from "./pages/AthletePage.jsx";
import AthleteInfo from "./components/AthleteInfo.jsx";
import NavBar from "./components/NavBar.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <NavBar />
        <HomePage />
      </>
    ),
  },
  {
    path: "/Athlete",
    element: (
      <>
        <NavBar />
        <AthletePage />
      </>
    ),
  },
  {
    path: "/athlete/:id", // Assuming athlete details can have individual pages
    element: (
      <>
        <NavBar />
        <AthleteInfo />
      </>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
