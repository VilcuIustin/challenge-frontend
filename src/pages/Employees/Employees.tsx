import { Divider, Flex, Input } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { minimalEmployee } from "../../models/minimalEmployee";

const Employees = () => {

  const [employees, setEmployees] = useState<Array<minimalEmployee>>();

  useEffect(() => {
    axios.post(process.env.REACT_APP_BASE_URL+"employee/paginated", {page:0,size:10})
    .then(response => {
      if(response.data.error == null){
        setEmployees(response.data.content);
      }
    })

  }, []);

  return (
    <Flex flexDir={"column"} w={"100%"} h={"100%"}>
      Name
      <Input />
      <Divider my={10} alignSelf={"center"} w={"98%"} />
      <Flex flexDir={"column"}>
        {employees?.map(el => {
          return <Flex id={el.id}>
            {el.firstName} {el.lastName}
            </Flex>
        })}
      </Flex>
    </Flex>
  );
};
export default Employees;
