import "./App.css";
import { Flex, Switch } from "@chakra-ui/react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Router,
  Routes,
} from "react-router-dom";
import SimpleSidebar from "./components/common/NavBar";
import Login from "./pages/Authorization/Login";
import DashboardAdmin from "./pages/Dashboard/DashboardAdmin";
import InviteUser from "./pages/Authorization/InviteUser";
import Employees from "./pages/Employees/Employees";
import AddProduct from "./pages/Products/AddProduct";
import Products from "./pages/Products/Products";
import ProductRewards from "./pages/ProductReward/ProductRewards";
import Sales from "./pages/Sales/Sales";
import Remuneration from "./pages/Remuneration/Remuneration";
import Rewards from "./pages/Remuneration/Rewards";
import { canAccess, canAccessRoles } from "./Utils/canAccess";
import "./Utils/Interceptor";

function App() {
  return (
    <Flex flexDir={"row"} bg={"gray.100"} minH={"100vh"}>
      <Flex w={"100%"}>
        <BrowserRouter>
          <SimpleSidebar />
          <Routes>
            <Route
              path="login"
              element={!canAccess() ? <Login /> : <DashboardAdmin />}
            />
            <Route
              path="/"
              element={!canAccess() ? <Login /> : <DashboardAdmin />}
            />
            <Route
              path="dashboard"
              element={
                canAccess() ? <DashboardAdmin /> : <Navigate to={"/login"} />
              }
            />
            <Route
              path="invite"
              element={
                canAccessRoles(["Manager", "Admin"]) ? (
                  <InviteUser />
                ) : (
                  <Navigate to={"/dashboard"} />
                )
              }
            />
            <Route
              path="employees"
              element={
                canAccessRoles(["Manager", "Admin"]) ? (
                  <Employees />
                ) : (
                  <Navigate to={"/dashboard"} />
                )
              }
            />
            <Route
              path="add-employee"
              element={
                canAccessRoles(["Manager", "Admin"]) ? (
                  <InviteUser />
                ) : (
                  <Navigate to={"/dashboard"} />
                )
              }
            />
            <Route
              path="add-product"
              element={
                canAccessRoles(["Manager", "Admin"]) ? (
                  <AddProduct />
                ) : (
                  <Navigate to={"/dashboard"} />
                )
              }
            />
            <Route
              path="products"
              element={
                canAccessRoles(["Manager", "Admin"]) ? (
                  <Products />
                ) : (
                  <Navigate to={"/dashboard"} />
                )
              }
            />
            <Route
              path="remuneration"
              element={
                canAccessRoles(["Manager", "Admin"]) ? (
                  <Remuneration />
                ) : (
                  <Navigate to={"/dashboard"} />
                )
              }
            />
            <Route
              path="rewards/:productId"
              element={
                canAccessRoles(["Manager", "Admin"]) ? (
                  <ProductRewards />
                ) : (
                  <Navigate to={"/dashboard"} />
                )
              }
            />
            <Route
              path="sales/:employeeId"
              element={
                canAccessRoles(["Manager", "Admin"]) ? (
                  <Sales />
                ) : (
                  <Navigate to={"/dashboard"} />
                )
              }
            />
          </Routes>
        </BrowserRouter>
      </Flex>
    </Flex>
  );
}

export default App;
