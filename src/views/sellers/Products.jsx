import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import Pagination from "../../Pagination";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import { LuImageMinus } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { get_products } from "../../store/Reducers/productReducer";
import {
  Box,
  Button,
  Flex,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Image,
  Text,
  Stack,
  Badge,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  HStack,
} from "@chakra-ui/react";
import { get_success_payment } from "../../store/Reducers/sellerReducer";

const Products = () => {
  const { products, totalProduct, parPage } = useSelector(
    (state) => state.product
  );
  const { userInfo } = useSelector((state) => state.auth);
  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);
  const [sendOne, setSendOne] = useState();
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState("");

  ///pagiantion
  const [pageNumber, setPageNumber] = useState(1);
  useEffect(() => {
    dispatch(
      get_products({
        page: parseInt(pageNumber),
        searchValue: searchValue,
      })
    );
  }, [searchValue, parPage, dispatch, pageNumber]);
  useEffect(() => {
    dispatch(get_success_payment({ sellId: userInfo._id }));
  }, [dispatch, userInfo._id]);

  return (
    <Box bg="white" borderRadius="md" shadow="md" p={6}>
      <Text fontSize={["md", "lg"]} fontWeight="semibold" mb={3}>
        ສິນຄ້າທັງໝົດ ({totalProduct})
      </Text>

      <Box>
        <Input
          onChange={(e) => setSearchValue(e.target.value)}
          value={searchValue}
          focusBorderColor="indigo.500"
          _hover={{ borderColor: "indigo.500" }}
          placeholder="ຄົ້ນຫາຊື່ສິນຄ້າ ແລະ ລະຫັດສິນຄ້າ"
          w="auto"
        />

        <Box overflowX="auto" mt={5}>
          {/* Table for larger screens */}
          <Table
            variant="simple"
            colorScheme="gray"
            w={"full"}
            display={["none", "table"]}
          >
            <Thead>
              <Tr>
                <Th fontFamily="Noto Sans Lao, serif">ລຳດັບ</Th>
                <Th fontFamily="Noto Sans Lao, serif">ລະຫັດສິນຄ້າ</Th>
                <Th fontFamily="Noto Sans Lao, serif">ຮູບພາບ</Th>
                <Th fontFamily="Noto Sans Lao, serif">ຊື້ສິນຄ້າ</Th>
                <Th fontFamily="Noto Sans Lao, serif">ໝວດສິນຄ້າ</Th>
                <Th fontFamily="Noto Sans Lao, serif">ແບຣນສິນຄ້າ</Th>
                <Th fontFamily="Noto Sans Lao, serif">ລາຄາ</Th>
                <Th fontFamily="Noto Sans Lao, serif">ສ່ວນຫຼຸດ</Th>
                <Th fontFamily="Noto Sans Lao, serif">ສະຕ໋ອກ</Th>
                <Th fontFamily="Noto Sans Lao, serif">ຂາຍແລ້ວ</Th>
                <Th fontFamily="Noto Sans Lao, serif">action</Th>
              </Tr>
            </Thead>

            <Tbody>
              {products.map((d, i) => (
                <Tr key={i}>
                  <Td>{i + 1}</Td>
                  <Td>
                    <Badge colorScheme={"yellow"}>{d.code_products}</Badge>
                  </Td>
                  <Td>
                    <Image src={d.images[0]} boxSize="45px" objectFit="cover" />
                  </Td>
                  <Td>{d?.name?.slice(0, 15)}...</Td>
                  <Td>{d.category}</Td>
                  <Td>{d.brand}</Td>
                  <Td>{d.price.toLocaleString()} </Td>
                  <Td>{d.discount === 0 ? "No Discount" : `${d.discount}%`}</Td>
                  <Td>{d.stock}</Td>
                  <Td>{d.sale}</Td>
                  <Td>
                    <Flex gap={4}>
                      <Link to={`/seller/dashboard/edit-product/${d._id}`}>
                        <Button
                          colorScheme="yellow"
                          variant="outline"
                          size="sm"
                        >
                          <FaEdit />
                        </Button>
                      </Link>

                      <Link>
                        <Button
                          onClick={() => {
                            setIsReceiptModalOpen(true);
                            setSendOne(d);
                          }}
                          colorScheme="teal"
                          variant="outline"
                          size="sm"
                        >
                          <LuImageMinus />
                        </Button>
                      </Link>

                      <Button
                        onClick={() => {
                          setIsReceiptModalOpen(true);
                          setSendOne(d);
                        }}
                        colorScheme="green"
                        variant="outline"
                        size="sm"
                      >
                        <FaEye />
                      </Button>
      
                    </Flex>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>

          {/* Stack for smaller screens */}
          <Stack spacing={4} display={["block", "none"]}>
            {products.map((d, i) => (
              <Box key={i} borderWidth="1px" borderRadius="md" p={4}>
                <Flex justify="space-between" align="center">
                  <Text fontWeight="semibold">{d.code_products}</Text>
                  <Image
                    src={d.images[0]}
                    boxSize="45px"
                    objectFit="cover"
                    alt="product image"
                  />
                </Flex>

                <Text mt={2} fontWeight="bold">
                  {d?.name?.slice(0, 15)}...
                </Text>
                <Text>{d.category}</Text>
                <Text>{d.brand}</Text>
                <Text>{d.price.toLocaleString()}</Text>
                <Text>
                  {d.discount === 0 ? "No Discount" : `${d.discount}%`}
                </Text>
                <Text>{d.stock}</Text>

                <Flex gap={2} mt={2}>
                  <Link to={`/seller/dashboard/edit-product/${d._id}`}>
                    <Button colorScheme="yellow" variant="outline" size="sm">
                      <FaEdit />
                    </Button>
                  </Link>

                  <Link to={`/seller/dashboard/add-banner/${d._id}`}>
                    <Button colorScheme="teal" variant="outline" size="sm">
                      <LuImageMinus />
                    </Button>
                  </Link>

                  <Button colorScheme="green" variant="outline" size="sm">
                    <FaEye />
                  </Button>
                  <Button colorScheme="red" variant="outline" size="sm">
                    <FaTrash />
                  </Button>
                </Flex>
              </Box>
            ))}
          </Stack>
        </Box>

        <Flex justify="flex-end" mt={4}>
          <Pagination
            pageNumber={pageNumber}
            setPageNumber={setPageNumber}
            totalItem={totalProduct}
            parPage={parPage}
            showItem={Math.ceil(totalProduct / parPage)}
          />
        </Flex>
      </Box>

      {/* ✅ ย้าย ref มาที่นี่ */}
      <Modal
        isOpen={isReceiptModalOpen}
        onClose={() => setIsReceiptModalOpen(false)}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>ລາຍລະອຽດສິນຄ້າ</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box p={6} borderWidth={1} borderRadius="lg" boxShadow="md">
              <Box>
                <HStack justify="space-between">
                  <Text>ລະຫັດສິນຄ້າ:</Text>
                  <Text>
                    <Badge colorScheme="yellow">
                      {" "}
                      {sendOne?._id?.slice(-4)}
                    </Badge>
                  </Text>
                </HStack>
                <HStack justify="space-between">
                  <Text>ຊື່ສິນຄ້າ:</Text>
                  <Text>{sendOne?.name}</Text>
                </HStack>
                <HStack justify="space-between">
                  <Text>ໝວດສິນຄ້າ:</Text>
                  <Text>{sendOne?.category}</Text>
                </HStack>
                <HStack justify="space-between">
                  <Text>ຈຳນວນສິນຄ້າ:</Text>
                  <Text>{sendOne?.stock}</Text>
                </HStack>
                <HStack justify="space-between">
                  <Text>ລາຄາ:</Text>
                  <Text>{sendOne?.price?.toLocaleString()} ກີບ</Text>
                </HStack>
                <HStack justify="space-between">
                  <Text>ສ່ວນຫຼຸດ:</Text>
                  <Text>{sendOne?.discount?.toLocaleString()} %</Text>
                </HStack>
              </Box>
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button onClick={() => setIsReceiptModalOpen(false)}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Modal to receipt*/}
      <Modal
        isOpen={isReceiptModalOpen}
        onClose={() => setIsReceiptModalOpen(false)}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          {" "}
          {/* ✅ ย้าย ref มาที่นี่ */}
          <ModalHeader>ຮູບພາບສິນຄ້າ</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box
              p={6}
              maxWidth={"auto"}
              borderWidth={"auto"}
              borderRadius="lg"
              boxShadow="md"
            >
              <HStack maxWidth={"auto"} align="start" spacing={4}>
                {sendOne?.images?.map((d) => (
                  <Image
                    src={d}
                    alt={d.name}
                    boxSize="200px"
                    objectFit="cover"
                    borderRadius="md"
                    mr={2}
                  />
                ))}
              </HStack>
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button onClick={() => setIsReceiptModalOpen(false)}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Products;
