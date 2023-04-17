import {
  Button,
  Card,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
  Text,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";

const InviteUser = () => {
  const toast = useToast()
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [errorFirstName, setErrorFirstName] = useState<string>("");
  const [errorLastName, setErrorLastName] = useState<string>("");
  const [errorEmail, setErrorEmail] = useState<string>("");
  const createEmployee = () => {
    setIsLoading(true);
    setFirstName(firstName.trim());
    setLastName(lastName.trim());
    setEmail(email.trim());

    if(firstName.length == 0){
      setErrorFirstName("First name is required");
      setIsLoading(false);
    }
    else if(firstName.length > 128){
      setErrorFirstName("First name must be at maximum 128 characters");
      setIsLoading(false);
    }
    else{
      setErrorFirstName("");
    }
    if(lastName.length == 0){
      setErrorLastName("Last name is required");
      setIsLoading(false);
    }
    else if(lastName.length > 128){
      setErrorLastName("Last name must be at maximum 128 characters");
      setIsLoading(false);
    }
    else{
      setErrorLastName("");
    }

    if(email.length == 0){
      setErrorEmail("Email field is required");
      setIsLoading(false);
    }
    else if(email.length > 320){
      setErrorEmail("Email need to be at maximum of 320 characters");
      setIsLoading(false);
    }
    else if(!email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)){
      setErrorEmail("Email is not in the correct format");
      setIsLoading(false);
    }
    else{
      setErrorEmail("");
    }

    if((errorFirstName + errorLastName + errorEmail) != "")
      return;

    axios.post(process.env.REACT_APP_BASE_URL+"auth/enroll", 
    {
      firstName: firstName,
      lastName:lastName,
      email:email
    }
    ).then(response => {
      setIsLoading(false);
      return toast({
        title: 'Employee invited',
        status: 'success',
        duration: 9000,
        isClosable: true,
        position: 'bottom-right'
      })
    }).catch(ex => {
      console.log(ex);
      setIsLoading(false);
    })

  }


  return (
    <Flex w={"100%"} alignItems={"center"} flexDir={"column"}>
      <Flex h={"100%"}>
        <Card shadow={"2xl"} w={"400px"} alignSelf={"center"} borderRadius={10}>
          <Flex flexDir={"column"} m={"10"} h={"100%"} alignItems={"center"}>
            <Text fontSize={"3xl"} fontWeight={"bold"}>
              Invite employee
            </Text>
            <Flex flexDir={"column"} w={"100%"} mt={5}>
              <FormControl isRequired isInvalid={errorFirstName != ""}>
                <FormLabel>First name</FormLabel>
                <Input onChange={(e) => setFirstName(e.target.value)} isDisabled={isLoading}/>
                <FormErrorMessage>{errorFirstName}</FormErrorMessage>
              </FormControl>
            </Flex>
            <Flex flexDir={"column"} w={"100%"} mt={5}>
              <FormControl isRequired isInvalid={errorLastName != ""}>
                <FormLabel>Last name</FormLabel>
                <Input onChange={(e) => setLastName(e.target.value)} isDisabled={isLoading}/>
                <FormErrorMessage>{errorLastName}</FormErrorMessage>
              </FormControl>
            </Flex>
            <Flex flexDir={"column"} w={"100%"} mt={5}>
              <FormControl isRequired isInvalid={errorEmail != ""}>
                <FormLabel>Email</FormLabel>
                <Input onChange={(e) => setEmail(e.target.value)} isDisabled={isLoading}/>
                <FormErrorMessage>{errorEmail}</FormErrorMessage>
              </FormControl>
            </Flex>
            <Flex flexDir={"column"} w={"100%"} mt={5}>
              <FormControl isRequired>
                <FormLabel>Role</FormLabel>
                <Select isDisabled={isLoading}>
                  <option value='1'>Employee</option>
                  <option value='2'>Manager</option>
                  <option value='4'>Admin</option>
                </Select>
              </FormControl>
            </Flex>
            <Flex
              h={"100%"}
              w={"100%"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Button colorScheme='twitter' isLoading={isLoading} onClick={() => createEmployee()} w={"100%"} mt={10}>
                Create employee
              </Button>
            </Flex>
          </Flex>
        </Card>
      </Flex>
    </Flex>
  );
};

export default InviteUser;

