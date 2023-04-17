import { Button, Flex, Select, Text } from "@chakra-ui/react"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Converters from "../../Utils/Converters";
import axios from "axios";
import { productRemuneration } from "../../models/remuneration";
import Rewards from "./Rewards";


const Remuneration = () => {
    const navigate = useNavigate();
    const [month, setMonth] = useState<string>("");
    const [year, setYear] = useState<string>("");
    let currentYear = new Date().getFullYear();
    const [remuneration, setRemuneration] = useState<Array<productRemuneration>>(new Array);

    useEffect(() => {
        let currentDate = new Date();
        setMonth(currentDate.getUTCMonth().toString());
        setYear(currentDate.getUTCFullYear().toString());
    }, []);

    useEffect(() => {
        if (month == "" || year == "") return;
        console.log(month, year);
        axios.get(process.env.REACT_APP_BASE_URL + `remuneration?month=${month}&year=${year}`)
        .then((el) => {
            setRemuneration(el.data.content);
        })
      }, [month, year]);


    return <Flex w={"100%"} flexDir={"column"} alignItems={"center"}>
        <Text fontSize={"3xl"} fontWeight={"bold"}>Remuneration</Text>
        <Flex flexDir={"column"}>
        <Flex my={3}>
              <Select
                w={"150px"}
                bg={"white"}
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
              <Select w={"150px"} bg={"white"} value={year} onChange={(el) => setYear(el.target.value)}>
                {Array.from(Array(6).keys())
                  .map((el) => el + currentYear - 5)
                  .map((el) => {
                    return <option value={el}>{el}</option>;
                  })}
              </Select>
            </Flex>
                  <Rewards remuneration={remuneration}/>
        </Flex>
        
    </Flex>
}

export default Remuneration;