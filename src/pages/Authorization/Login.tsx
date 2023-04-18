import {
  Button,
  Card,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
  useStatStyles,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const toast = useToast();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

  const loginProcess = () => {
    setIsLoading(true);
    if (email.length == 0) {
      setErrorEmail("Email field is required");
      setIsLoading(false);
    } else if (email.length > 320) {
      setErrorEmail("Email need to be at maximum of 320 characters");
      setIsLoading(false);
    } else if (
      !email.match(
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      )
    ) {
      setErrorEmail("Email is not in the correct format");
      setIsLoading(false);
    } else setErrorEmail("");

    if (password.length < 8) {
      setErrorPassword("Password must be at least 8 charaters");
      setIsLoading(false);
    } else if (password.length > 320) {
      setErrorPassword("Password need to be at maximum of 320 characters");
      setIsLoading(false);
    } else setErrorPassword("");
    if (errorEmail + errorPassword != "") return;
    axios
      .post(process.env.REACT_APP_BASE_URL + "auth/login", { email, password })
      .then((response) => {
        if (response.data.error == null) {
          window.localStorage.removeItem("token");
          window.localStorage.removeItem("refreshToken");

          window.localStorage.setItem(
            "token",
            response.data.content.accessToken
          );
          window.localStorage.setItem(
            "refreshToken",
            response.data.content.refreshToken
          );
          setIsLoading(false);
          window.location.href = "dashboard";
        }
        setIsLoading(false);
      })
      .catch((err) => {
        let errorMsg = "";
        if (err.response?.data?.error != null)
          errorMsg = err.response?.data?.error;
        else errorMsg = "Something went wrong";

        setIsLoading(false);
        return toast({
          title: errorMsg,
          status: "error",
          duration: 9000,
          isClosable: true,
          position: "bottom-right",
        });
      });
  };

  return (
    <Flex w={"100%"} alignItems={"center"} flexDir={"column"}>
      <Flex h={"20%"}>
        <Text alignSelf={"center"} fontWeight={"bold"} fontSize={"4xl"}>
          Your Logo
        </Text>
      </Flex>

      <Flex h={"100%"}>
        <Card
          shadow={"2xl"}
          h={"400px"}
          w={"400px"}
          alignSelf={"center"}
          borderRadius={10}
        >
          <Flex flexDir={"column"} m={"10"} h={"100%"} alignItems={"center"}>
            <Text fontSize={"3xl"} fontWeight={"bold"}>
              Log in
            </Text>
            <Flex flexDir={"column"} w={"100%"} mt={5}>
              <FormControl
                isRequired
                isDisabled={isLoading}
                isInvalid={errorEmail != ""}
              >
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  onChange={(el) => setEmail(el.target.value)}
                />
                <FormErrorMessage>{errorEmail}</FormErrorMessage>
              </FormControl>
            </Flex>
            <Flex flexDir={"column"} w={"100%"} mt={5}>
              <FormControl
                isRequired
                isInvalid={errorPassword != ""}
                isDisabled={isLoading}
              >
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  onChange={(el) => setPassword(el.target.value)}
                />
                <FormErrorMessage>{errorPassword}</FormErrorMessage>
              </FormControl>
            </Flex>
            <Flex
              h={"100%"}
              w={"100%"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Button
                isLoading={isLoading}
                onClick={() => loginProcess()}
                colorScheme="twitter"
                w={"100%"}
              >
                Log in
              </Button>
            </Flex>
          </Flex>
        </Card>
      </Flex>
    </Flex>
  );
};

export default Login;
