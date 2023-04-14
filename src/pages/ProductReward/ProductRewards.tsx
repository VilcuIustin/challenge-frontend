import { Button, Flex } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { productReward } from "../../models/productReward";
import { useParams } from "react-router-dom";


const ProductRewards = () => {
    const params = useParams();
    const [productRewards, setProductRewards] = useState<Array<productReward>>();
    useEffect(() => {
        axios.get(process.env.REACT_APP_BASE_URL+ `productReward?productId=${params.productId}`)
        .then(response => {
            if(response.data.error == null){
                setProductRewards(response.data.content);
              }
        })
    }, []);


    return <Flex flexDir={"column"} w={"100%"} h={"100%"}>
       {productRewards?.map(el => {
        return <Flex id={el.id}>
            {el.reward} {el.month} {el.year}
        </Flex>
       })}
    </Flex>
}

export default ProductRewards;