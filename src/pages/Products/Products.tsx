import { Button, Divider, Flex, Input } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { MinimalProduct } from "../../models/minimalProduct";
import axios from "axios";
import { useNavigate, useNavigation } from "react-router-dom";

const Products = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Array<MinimalProduct>>();

  useEffect(() => {
    axios.post(process.env.REACT_APP_BASE_URL+"product/paginated", {page:0,size:10})
    .then(response => {
      if(response.data.error == null){
        setProducts(response.data.content);
      }
    })

  }, []);
  return <Flex flexDir={"column"} w={"100%"} h={"100%"}>
      Name
      <Input />
      <Divider my={10} alignSelf={"center"} w={"98%"} />
      <Flex flexDir={"column"}>
        {products?.map(el => {
          return <Flex id={el.id}>
            {el.name}
            <Button>Edit</Button>
            <Button onClick={() => navigate(`/rewards/${el.id}`)}>Add/Edit Reward</Button>
            </Flex>
        })}
      </Flex>
    </Flex>
};

export default Products;
