import CarrinhoPage from "@/pages/CarrinhoPage";
import { HomePage } from "@/pages/HomePage";
import { LoginPage } from "@/pages/LoginPage";
import ProductPage from "@/pages/ProductPage";
import { UserSignupPage } from "@/pages/UserSignupPage";
import { Route, Routes } from "react-router-dom";
import { AuthenticatedRoutes } from "../AuthenticatedRoutes";
// import { AuthenticatedRoutes } from "../AuthenticatedRoutes";

export function BaseRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/signup" element={<UserSignupPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<HomePage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/produto" element={<ProductPage />} />
      <Route path="/produto/:id" element={<ProductPage />} />
      <Route path="/carrinho" element={<CarrinhoPage />} />


      {/* Protected Routes */}
      <Route element={<AuthenticatedRoutes />}>
        <Route path="/pagamento" element={<CarrinhoPage />} />
      </Route>
    </Routes>
  );
}
