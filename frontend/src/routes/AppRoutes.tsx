import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Loading from "../components/Loading";

const Home = lazy(() => import("../pages/Home"));
const Signup = lazy(() => import("../pages/Signup"));
const Login = lazy(() => import("../pages/Login"));
const ProductOverview = lazy(() => import("../pages/ProductOverview"));

const Notfound = lazy(() => import("../pages/Notfound"));

const AppRoutes = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/product/:id" element={<ProductOverview />} />

        <Route path="*" element={<Notfound />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
