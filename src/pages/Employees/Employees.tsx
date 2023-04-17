import { Button, Card, Divider, Text, Flex, Input } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { minimalEmployee } from "../../models/minimalEmployee";
import { useNavigate } from "react-router-dom";

const Employees = () => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState<Array<minimalEmployee>>();

  useEffect(() => {
    axios
      .post(process.env.REACT_APP_BASE_URL + "employee/paginated", {
        page: 0,
        size: 10,
      })
      .then((response) => {
        if (response.data.error == null) {
          setEmployees(response.data.content);
        }
      });
  }, []);

  return (
    <Flex flexDir={"column"} w={"100%"} h={"100%"}>
      <Text align={"center"} fontSize={"3xl"} fontWeight={"bold"}>
        Employees
      </Text>
      <Button colorScheme="twitter" onClick={()=> navigate("/add-employee")} alignSelf={"center"} mt={3}>
        Add Employee
      </Button>
      <Flex flexDir={"column"} align={"center"}>
        <Flex flexDir={"column"}>
          {employees?.map((el) => {
            return (
              <Card my={3} id={el.id} w={{base:"base", sm:"sm", md:"md"}} py={4} px={3}>
                <Flex alignItems={"center"}>
                  <Text
                    wordBreak={"break-all"}
                    fontSize={"xl"}
                    mx={3}
                    fontWeight={"bold"}
                  >
                    {el.firstName} {el.lastName}
                  </Text>
                  <Flex flexGrow={1} flexDir={"row"} justifyContent={"end"}>
                    <Button onClick={() => navigate(`/sales/${el.id}`)}>
                      Sales
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
export default Employees;
