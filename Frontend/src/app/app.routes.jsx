import { createBrowserRouter } from "react-router";
import { Navigate } from "react-router";
import Login from "../features/auth/pages/Login";
import Register from "../features/auth/pages/Register";
import Dashboard from "@/features/chat/pages/Dashboard";
import Protected from "@/features/auth/components/Protected";
import ChatPage from "@/features/chat/pages/ChatPage";
import HomePage from "@/features/chat/pages/HomePage";

export const routes = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/",
    element: (
      <Protected>
        <Dashboard />
      </Protected>
    ),
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "chat",
        element: <ChatPage />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <Navigate to="/" replace />,
  },
]);
