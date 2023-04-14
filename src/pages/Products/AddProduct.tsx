import { Button, Card, Flex, Text, FormControl, FormErrorMessage, FormLabel, Input, Select, useToast } from "@chakra-ui/react"
import axios from "axios";
import { useState } from "react";


const AddProduct = () => {
    const toast = useToast()
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [productName, setProductName] = useState<string>("");
    const [errorProductName, setErrorProductName] = useState<string>("");

    const createProduct = () => {
        setIsLoading(true);
        setProductName(productName.trim());
    
        if(productName.length == 0){
            setErrorProductName("Product name is required");
            setIsLoading(false);
        }
        else if(productName.length > 256){
            setErrorProductName("Product name must be at maximum 256 characters");
            setIsLoading(false);
        }
        else{
            setErrorProductName("");
        }

        if(errorProductName != "")
            return;

            axios.post(process.env.REACT_APP_BASE_URL+"product", 
            {
              name: productName
            }
            ).then(response => {
              setIsLoading(false);
              return toast({
                title: 'Product created',
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
                  Create product
                </Text>
                <Flex flexDir={"column"} w={"100%"} mt={5}>
                  <FormControl isRequired isInvalid={errorProductName != ""}>
                    <FormLabel>Product name</FormLabel>
                    <Input onChange={(e) => setProductName(e.target.value)} isDisabled={isLoading}/>
                    <FormErrorMessage>{errorProductName}</FormErrorMessage>
                  </FormControl>
                </Flex>
                <Flex
                  h={"100%"}
                  w={"100%"}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <Button colorScheme='twitter' isLoading={isLoading} onClick={() => createProduct()} w={"100%"} mt={10}>
                    Create product
                  </Button>
                </Flex>
              </Flex>
            </Card>
          </Flex>
        </Flex>);
}

export default AddProduct;