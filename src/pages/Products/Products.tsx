import { Button, Card, Divider, Text, Flex, Input } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { MinimalProduct } from "../../models/minimalProduct";
import axios from "axios";
import { useNavigate, useNavigation } from "react-router-dom";

const Products = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Array<MinimalProduct>>();

  useEffect(() => {
    axios
      .post(process.env.REACT_APP_BASE_URL + "product/paginated", {
        page: 0,
        size: 10,
      })
      .then((response) => {
        if (response.data.error == null) {
          setProducts(response.data.content);
        }
      });
  }, []);
  return (
    <Flex flexDir={"column"} w={"100%"} h={"100%"}>
      <Text align={"center"} fontSize={"3xl"} fontWeight={"bold"}>
        Products
      </Text>
      <Button
        colorScheme="twitter"
        onClick={() => navigate("/add-product")}
        alignSelf={"center"}
        mt={3}
      >
        Add Product
      </Button>
      <Flex flexDir={"column"} align={"center"}>
        <Flex flexDir={"column"}>
          {products?.map((el) => {
            return (
              <Card
                my={3}
                w={{ base: "base", md: "md" }}
                py={4}
                px={3}
              >
                <Flex id={el.id} flexDir={{base:"column", md:"row"}} alignItems={"center"}>
                  <Text
                    wordBreak={"break-all"}
                    fontSize={"xl"}
                    mb={3}
                    mx={3}
                    fontWeight={"bold"}
                  >
                    {el.name}
                  </Text>
                  <Flex
                    flexGrow={1}
                    flexDir={{ base: "column", md: "row" }}
                    justifyContent={"end"}
                  >
                    {/*<Button mx={3} mb={{base:3, sm:3, md:0}}>Edit</Button>*/}
                    <Button onClick={() => navigate(`/rewards/${el.id}`)}>
                      Add/Edit Reward
                    </Button>
                  </Flex>
                </Flex>
              </Card>
            );
          })}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Products;
