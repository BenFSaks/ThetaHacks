import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import Upload from './Upload'
import './index.css'
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import ViewTok from './ViewTok'

  const router = createBrowserRouter([
    {
      path: "/",
      element: <App></App>,
      children: [
        {
          path: "",
          element: <ViewTok></ViewTok>
          // element: <div>Hello World</div>
        },
        {
          path: "upload",
          element: <Upload></Upload>,
        },
      ],
    },
  ]);
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
