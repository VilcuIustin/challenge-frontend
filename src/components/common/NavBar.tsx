import { Flex, Button, Text, Icon, Container, Tooltip } from "@chakra-ui/react";
import { useState } from "react";
import {
  BsFillPeopleFill,
  BsFillBriefcaseFill,
  BsCreditCardFill,
  BsDoorOpenFill,
  BsFillCaretLeftFill,
  BsFillCaretRightFill,
} from "react-icons/bs";
import { useLocation, useNavigate } from "react-router-dom";
import { canAccessRoles } from "../../Utils/canAccess";

const NavBar = () => {
  const [sideBarSize, setSideBarSize] = useState(80);
  const [foldText, setFoldText] = useState("close");
  const [isOpen, setIsOppen] = useState(true);
  let location = useLocation();
  let navigate = useNavigate();
  const logOut = () => {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("refreshToken");
    window.location.href = "login";
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

  let navbarElements = [
    {
      text: "Employees",
      url: "employees",
      icon: <BsFillPeopleFill color="var(--chakra-colors-twitter-900)" />,
      visible: canAccessRoles(['Manager', 'Admin']),
    },
    {
      text: "Products",
      url: "products",
      icon: <BsFillBriefcaseFill color="var(--chakra-colors-twitter-900)" />,
      visible: canAccessRoles(['Manager', 'Admin']),
    },
    {
      text: "Remuneration",
      url: "remuneration",
      icon: <BsCreditCardFill color="var(--chakra-colors-twitter-900)" />,
      visible: canAccessRoles(['Manager', 'Admin']),
    },
    {
      text: "Log Out",
      url: "",
      icon: <BsDoorOpenFill color="var(--chakra-colors-twitter-900)" />,
      action: logOut,
      visible: true,
    },
  ];

  return location.pathname.toLowerCase().match("login") ? null : (
    <Flex
      shadow={"2xl"}
      borderRight={"1px"}
      borderRightColor={"gray.300"}
      w={sideBarSize}
      bg={"white"}
      flexDir={"column"}
      minH={"100%"}
    >
      <Flex mb={10}>
        <Flex
          justifyContent={"center"}
          ms={5}
          alignSelf={"center"}
          flexGrow={1}
        >
          <Text fontWeight={"bold"} textColor={"twitter.500"}>
            Logo
          </Text>
        </Flex>
        <Button
          bg={"transparent"}
          alignSelf={"center"}
          onClick={() => unFold()}
        >
          {!isOpen ? <BsFillCaretRightFill /> : <BsFillCaretLeftFill />}
        </Button>
      </Flex>
      <Flex flexDir={"column"}>
        {navbarElements.map((el) => {
          return (
            el.visible ? <Tooltip label={isOpen ? null : el.text}>
              <Button
                mb={3}
                bg={"transparent"}
                onClick={() =>
                  el.action != undefined ? el.action() : navigate(el.url)
                }
              >
                {isOpen ? null : el.icon}
                {isOpen ? el.text : null}
              </Button>
            </Tooltip>
          : null);
        })}
      </Flex>
    </Flex>
  );
};

export default NavBar;
