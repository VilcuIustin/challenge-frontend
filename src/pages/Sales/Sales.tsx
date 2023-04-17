import {
  Button,
  Card,
  Flex,
  NumberInput,
  NumberInputField,
  Select,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { productEmployeeSales } from "../../models/productSales";
import axios from "axios";
import { useParams } from "react-router-dom";
import CreateSalePopup from "./CreateSalePopup";
import NumberToMonthName from "../../Utils/Converters";
import Converters from "../../Utils/Converters";

const Sales = () => {
  const params = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [productsSales, setProductsSales] = useState<
    Array<productEmployeeSales>
  >(new Array<productEmployeeSales>());
  const [month, setMonth] = useState<string>("");
  const [year, setYear] = useState<string>("");
  const [loading, setLoading] = useState(false);
  let currentYear = new Date().getFullYear();

  const updateProductsSoldValue = (
    productsSold: productEmployeeSales,
    value: string
  ) => {
    productsSold.productsSold = value;
    setProductsSales([...productsSales]);
  };

  const updateProdctSold = (productsSold: productEmployeeSales) => {
    // setLoading(true);
    // try{
    //     axios.post()
    // }finally{
    //     setLoading(false);
    // }
  };

  useEffect(() => {
    let currentDate = new Date();
    setMonth(currentDate.getUTCMonth().toString());
    setYear(currentDate.getUTCFullYear().toString());
  }, []);
  useEffect(() => {
    if (month == "" || year == "") return;
    console.log(month, year);
    axios
      .get(
        process.env.REACT_APP_BASE_URL +
          `employeesales?employeeId=${params.employeeId}` +
          `&month=${month}&year=${year}`
      )
      .then((response) => {
        setProductsSales(response.data.content);
      });
  }, [month, year]);

  return (
    <Flex flexDir={"column"} alignSelf={"center"} w={"100%"} h={"100%"}>
      <Text align={"center"} fontWeight={"bold"} mb={3} fontSize={"3xl"}>
        Sales for{" "}
        <Text wordBreak={"break-all"} color={"twitter.600"}>
          name
        </Text>
      </Text>
      <Flex flexDir={"column"} align={"center"}>
        <Flex flexDir={"column"}>
          <Flex
            flexDir={{ base: "column", sm: "row" }}
            alignItems={{ base: "center", sm: "" }}
            justifyContent={"center"}
          >
            <Select
              bg={"white"}
              w={"150px"}
              value={month}
              onChange={(el) => setMonth(el.target.value)}
            >
              {Array.from(Array(12).keys())
                .map((el) => el + 1)
                .map((el) => {
                  return (
                    <option value={el + ""}>
                      {Converters.NumberToMonthName(el)}
                    </option>
                  );
                })}
            </Select>
            <Select
              bg={"white"}
              w={"150px"}
              value={year}
              onChange={(el) => setYear(el.target.value)}
            >
              {Array.from(Array(6).keys())
                .map((el) => el + currentYear - 3)
                .map((el) => {
                  return <option value={el}>{el}</option>;
                })}
            </Select>
          </Flex>
          <Button mx={5} onClick={onOpen} colorScheme="twitter" mt={4}>
            Add Sale
          </Button>
          <Flex>
            {productsSales?.length === 0 ? (
              <Text mt={10} mx={4} fontWeight={"bold"}>
                There are not products sold by this employee. You can add for
                him.
              </Text>
            ) : (
              <Flex flexDir={"column"}>
                {productsSales?.map((sale) => (
                  <Card
                    my={3}
                    id={sale.id}
                    w={{ base: "base", sm:"sm", md:"md", lg:"lg" }}
                    py={4}
                    px={3}
                  >
                    <Text
                      wordBreak={"break-all"}
                      fontSize={"xl"}
                      mx={3}
                      align={"center"}
                      fontWeight={"bold"}
                      mb={5}
                    >
                      {sale.productName}
                    </Text>
                    <Flex alignItems={"center"}>
                      <Flex
                        flexGrow={1}
                        flexDir={"column"}
                        justifyContent={"end"}
                      >
                        <Text
                          alignSelf={"center"}
                          me={3}
                          fontWeight={"medium"}
                          mb={2}
                        >
                          pieces sold
                        </Text>
                        <Flex justifyContent={"center"}>
                          <NumberInput
                            isDisabled={loading}
                            w={"150px"}
                            me={3}
                            value={sale.productsSold}
                            onChange={(input) =>
                              updateProductsSoldValue(
                                sale,
                                Converters.textToNumberParser(input)
                              )
                            }
                          >
                            <NumberInputField />
                          </NumberInput>
                        </Flex>
                        <Button
                          mt={5}
                          isLoading={loading}
                          onClick={() => updateProdctSold(sale)}
                        >
                          Update reward
                        </Button>
                      </Flex>
                    </Flex>
                  </Card>
                ))}
              </Flex>
            )}
          </Flex>
          <CreateSalePopup
            isOpen={isOpen}
            onOpen={onOpen}
            onClose={onClose}
            employeeId={params.employeeId}
          />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Sales;
