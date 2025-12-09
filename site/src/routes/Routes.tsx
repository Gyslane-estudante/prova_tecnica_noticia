import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";

const Cep = lazy(() => import("../pages/Cep"));
const Noticias = lazy(() => import("../pages/Noticias"));
const Login = lazy(() => import("../pages/Login"));
import PrivateRoute from "./PrivateRoute";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Suspense fallback={<p>Carregando...</p>}>
        <Routes>
          <Route path="/" element={<Cep />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/noticias"
            element={
              <PrivateRoute>
                <Noticias />
              </PrivateRoute>
            }
          />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
