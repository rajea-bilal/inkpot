import { useEffect } from "react";
import { RouterProvider } from "react-router";
import { routes } from "./app.routes";
import { useAuth } from "@/features/auth/hooks/useAuth";

function App() {
  const auth = useAuth();

  useEffect(() => {
    auth.handleGetMe();
  }, []);

  return <RouterProvider router={routes} />;
}

export default App;
