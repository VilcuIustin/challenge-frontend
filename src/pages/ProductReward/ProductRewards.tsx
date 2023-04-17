import {
  Button,
  Card,
  Flex,
  NumberInput,
  NumberInputField,
  Text,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { productReward } from "../../models/productReward";
import { useParams } from "react-router-dom";
import { NIL as NIL_UUID } from "uuid";
import NumberToMonthName from "../../Utils/Converters";
import Converters from "../../Utils/Converters";

const ProductRewards = () => {
  const toast = useToast();
  const params = useParams();
  const [loading, setLoading] = useState<boolean>(false);
  const [productRewards, setProductRewards] = useState<Array<productReward>>(
    new Array<productReward>()
  );

  const updateRewardValue = (reward: productReward, value: string) => {
    reward.reward = value;
    setProductRewards([...productRewards]);
  };

  const updateReward = (reward: productReward) => {
    setLoading(true);
    try {
      if (reward.id === NIL_UUID) {
        axios
          .post(process.env.REACT_APP_BASE_URL + `productReward`, {
            id: reward.id,
            productId: params.productId,
            month: reward.month,
            year: reward.year,
            reward: Number.parseInt(reward.reward) ?? 0,
          })
          .then((response) => {
            return toast({
              title: "reward created",
              status: "success",
              duration: 9000,
              isClosable: true,
              position: "bottom-right",
            });
          });
      } else {
        axios
          .patch(process.env.REACT_APP_BASE_URL + `productReward`, {
            id: reward.id,
            productId: params.productId,
            month: reward.month,
            year: reward.year,
            reward: Number.parseInt(reward.reward),
          })
          .then((response) => {
            setLoading(false);
            return toast({
              title: "reward updated",
              status: "success",
              duration: 9000,
              isClosable: true,
              position: "bottom-right",
            });
          });
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    axios
      .get(
        process.env.REACT_APP_BASE_URL +
          `productReward?productId=${params.productId}`
      )
      .then((response) => {
        if (response.data.error == null) {
          setProductRewards(response.data.content);
        }
      });
  }, []);

  return (
    <Flex flexDir={"column"} w={"100%"} h={"100%"}>
      <Flex flexDir={"column"} align={"center"}>
        <Flex flexDir={"column"}>
          {productRewards?.map((el) => {
            return (
              <Card shadow={"lg"} my={3} id={el.id} w={"md"} py={4} px={3}>
                <Flex alignItems={"center"} flexDir={"column"}>
                  <Flex mb={5}>
                    <Text
                      wordBreak={"break-all"}
                      fontSize={"xl"}
                      mx={3}
                      fontWeight={"bold"}
                    >
                      {el.year} {Converters.NumberToMonthName(el.month)}
                    </Text>
                  </Flex>

                  <Flex flexGrow={1} flexDir={"column"} justifyContent={"end"}>
                    <Text mb={2}>Reward per product sold</Text>
                    <NumberInput
                      isDisabled={loading}
                      w={"150px"}
                      me={3}
                      value={el.reward}
                      onChange={(input) =>
                        updateRewardValue(el, Converters.textToNumberParser(input))
                      }
                    >
                      <NumberInputField />
                    </NumberInput>
                    <Button
                      mt={5}
                      isLoading={loading}
                      onClick={() => updateReward(el)}
                    >
                      Update reward
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

export default ProductRewards;
