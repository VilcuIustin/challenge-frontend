import {
  Button,
  Flex,
  Text,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  useDisclosure,
  Input,
  NumberInput,
  NumberInputField,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { MinimalProduct } from "../../models/minimalProduct";
import Converters from "../../Utils/Converters";

const CreateSalePopup = (props: any) => {
  const toast = useToast();
  const { isOpen, onOpen, onClose, employeeId } = props;
  const [products, setProducts] = useState<Array<MinimalProduct>>();
  const [productId, setProductId] = useState("");
  const [month, setMonth] = useState<string>("");
  const [year, setYear] = useState<string>("");
  const [productsSold, setProductsSold] = useState<string>("0");
  let currentYear = new Date().getFullYear();
  const addSale = () => {
    axios
      .post(process.env.REACT_APP_BASE_URL + "employeesales", {
        month,
        year,
        employeeId,
        productId,
        productsSold,
      })
      .then((response) => {
        window.location.reload();
      });
  };

  useEffect(() => {
    if (isOpen !== true) return;

    let currentDate = new Date();
    setMonth((currentDate.getUTCMonth() + 1).toString());
    setYear(currentDate.getUTCFullYear().toString());
    axios
      .get(process.env.REACT_APP_BASE_URL + "product/all")
      .then((response) => {
        setProducts(response.data.content);
        setProductId(response.data.content[0].id);
      });
  }, [isOpen]);
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Sale</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Product</Text>
            <Select onChange={(el) => setProductId(el.target.value)}>
              {products?.map((el) => (
                <option value={el.id}>{el.name}</option>
              ))}
            </Select>
            <Flex my={3}>
              <Select
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
              <Select value={year} onChange={(el) => setYear(el.target.value)}>
                {Array.from(Array(6).keys())
                  .map((el) => el + currentYear - 3)
                  .map((el) => {
                    return <option value={el}>{el}</option>;
                  })}
              </Select>
            </Flex>

            <Text>Products sold</Text>
            <NumberInput
              value={productsSold}
              onChange={(el) =>
                setProductsSold(Converters.textToNumberParser(el))
              }
            >
              <NumberInputField />
            </NumberInput>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost" onClick={() => addSale()}>
              Add sale
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateSalePopup;
