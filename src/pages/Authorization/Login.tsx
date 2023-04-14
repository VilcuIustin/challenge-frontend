import {
  Button,
  Card,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";

const Login = () => {
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
              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input />
              </FormControl>
            </Flex>
            <Flex flexDir={"column"} w={"100%"} mt={5}>
              <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                <Input />
              </FormControl>
            </Flex>
            <Flex
              h={"100%"}
              w={"100%"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Button colorScheme='twitter' w={"100%"}>
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
