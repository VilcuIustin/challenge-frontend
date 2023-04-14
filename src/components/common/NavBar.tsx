import { Flex, Button } from "@chakra-ui/react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const NavBar = () => {
  const [sideBarSize, setSideBarSize] = useState(80);
  const [foldText, setFoldText] = useState("close");
  const [isOpen, setIsOppen] = useState(true);
  let location = useLocation();
  let navigate = useNavigate();
  const logOut = () => {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("refreshToken");
    navigate("login");
  };
  const unFold = () => {
    if (isOpen) {
      setSideBarSize(40);
      setIsOppen(false);
      setFoldText("open");
    } else {
      setSideBarSize(80);
      setIsOppen(true);
      setFoldText("close");
    }
  };
  return location.pathname.toLowerCase().match("login") ? null : (
    <Flex
      shadow={"2xl"}
      borderRight={"1px"}
      borderRightColor={"gray.300"}
      w={sideBarSize}
      bg={"gray.100"}
      flexDir={"column"}
      h={"100vh"}
    >
      <Flex mb={10}>
        <Flex justifyContent={"center"} alignSelf={"center"} flexGrow={1}>
          Logo
        </Flex>
        <Button onClick={() => unFold()}>{foldText}</Button>
      </Flex>
      <Flex flexDir={"column"}>
        <Button onClick={() => navigate("employees")}>Employees</Button>
        <Button onClick={() => navigate("add-employee")}>Add Employee</Button>
        <Button onClick={() => navigate("products")}>Products</Button>
        <Button onClick={() => navigate("add-product")}>Add Products</Button>
        <Button
          onClick={() => {
            logOut();
          }}
        >
          Log out
        </Button>
      </Flex>
    </Flex>
  );
};

export default NavBar;
