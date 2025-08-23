import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, Navigate } from "react-router";
import { RouterProvider } from "react-router/dom";
import CreateNews from './components/Admin/CreateNews.tsx'
import CreateAnnouncement from './components/Admin/CreateAnnouncement.tsx'
import ListNews from './components/User/ListNews.tsx';
import ListAnnouncements from './components/User/ListAnnouncements.tsx';
import NotFound from './components/NotFound.tsx';
import NewsDetail from './components/User/NewsDetail.tsx';



const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/admin/haberekle" replace />, // uygulama açıldığında redirect
  },
  {
    path: "/admin",
    element: <App />,
    children: [
      {
        index: true, 
        element: <Navigate to="/admin/haberekle" replace />, // /admin pathinde redirect
      },
      {
        path: "haberekle",
        element: <CreateNews />,
      },
      {
        path: "duyuruekle",
        element: <CreateAnnouncement />,
      },
    ],
  },
  {
    path: "/kullanici",
    element: <App />,
    children: [
          { index: true, element: <Navigate to="haberler" replace /> },
      {
        path: "haberler",
        element: <ListNews />,
      },
      {
      path: "haberler/:id",
      element: <NewsDetail />,
    },
      {
        path: "duyurular",
        element: <ListAnnouncements />,
      },
    ],
  },
   { path: "*", element: <NotFound /> }, // global 404
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />,
  </StrictMode>,
)
