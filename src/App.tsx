import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Flex, Switch } from "@chakra-ui/react";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import SimpleSidebar from "./components/common/NavBar";
import Login from "./pages/Authorization/Login";
import DashboardAdmin from "./pages/Dashboard/DashboardAdmin";
import InviteUser from "./pages/Authorization/InviteUser";
import Employees from "./pages/Employees/Employees";
import AddProduct from "./pages/Products/AddProduct";
import Products from "./pages/Products/Products";
import ProductRewards from "./pages/ProductReward/ProductRewards";

function App() {
  return (
    <Flex flexDir={"row"} h={"100vh"}>
      <Flex w={"100%"}>
        <BrowserRouter>
          <SimpleSidebar />
          <Routes>
            <Route path='login' element={<Login />} />
            <Route path='dashboard' element={<DashboardAdmin />} />
            <Route path='invite' element={<InviteUser />} />
            <Route path='employees' element={<Employees />} />
            <Route path='add-employee' element={<InviteUser />} />
            <Route path='add-product' element={<AddProduct />} />
            <Route path='products' element={<Products />} />
            <Route path='rewards/:productId' element={<ProductRewards />} />
          </Routes>
        </BrowserRouter>
      </Flex>
    </Flex>
  );
}

export default App;
