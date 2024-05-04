import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import Locations from "./locations.tsx";
import Menu from "./menu.tsx";
import "./index.css";

import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Menu />} />
      <Route path="/App" element={<App />} />
      <Route path="/locations" element={<Locations />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
