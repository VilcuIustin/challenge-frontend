import {
  Accordion,
  AccordionButton,
  Text,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  TableContainer,
  Table,
  TableCaption,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { productRemuneration } from "../../models/remuneration";

const Rewards = (props: { remuneration: Array<productRemuneration> }) => {
  let [searchParams] = useSearchParams();
  let remuneration = props.remuneration;
  return (
    <Accordion allowMultiple bg={"white"} rounded={10}>
      {remuneration?.map((r) => {
        return (
          <AccordionItem id={r.productId}>
            <h2>
              <AccordionButton bg={"white"} rounded={5}>
                <Box as="span" flex="1" textAlign="left">
                  <Text fontWeight={"bold"}>{r.productName}</Text>
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <TableContainer>
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th>Employee</Th>
                      <Th isNumeric>Remuneration</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {r.employeesRemuneration.map((er) => {
                      return (
                        <Tr>
                          <Td>{er.name}</Td>
                          <Td textAlign={"center"}>{er.remuneration}</Td>
                        </Tr>
                      );
                    })}
                  </Tbody>
                </Table>
              </TableContainer>
            </AccordionPanel>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
};

export default Rewards;
