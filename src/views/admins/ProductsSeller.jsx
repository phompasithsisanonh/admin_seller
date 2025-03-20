import React, { useEffect, useState } from "react";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  IconButton,
  Input,
  Flex,
  Text,
  Spinner,
  Badge,
  FormControl,
  FormLabel,
  Switch,
  InputGroup,
  InputLeftElement,
  Card,
  CardHeader,
  CardBody,
  Divider,
  useColorModeValue,
  TableContainer,
  Heading,
  ButtonGroup,
  Center,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon, SearchIcon } from "@chakra-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  get_products_admin_seller,
  status_buyOrstopbuy,
} from "../../store/Reducers/productReducer";
import { useNavigate } from "react-router-dom";

const ProductsSeller = () => {
  const dispatch = useDispatch();
  const { banners, loading } = useSelector((state) => state.product);
  const navigate = useNavigate();

  // Theme colors
  const cardBg = useColorModeValue("white", "gray.700");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const headerBg = useColorModeValue("gray.50", "gray.800");
  const primaryColor = "#4F46E5"; // Indigo color

  const PaginatedSellers = ({ sellersData, itemsPerPage }) => {
    const [searchValue, setSearchValue] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    // Calculate total pages for the sellers
    const totalSellers = sellersData.length;
    const totalPages = Math.ceil(totalSellers / itemsPerPage);

    // Handle page change
    const changePage = (pageNumber) => {
      if (pageNumber < 1 || pageNumber > totalPages) return;
      setCurrentPage(pageNumber);
    };

    // Get current sellers to display
    const indexOfLastSeller = currentPage * itemsPerPage;
    const indexOfFirstSeller = indexOfLastSeller - itemsPerPage;
    const filteredSellers = sellersData.filter((seller) => {
      const filteredProducts = seller.seller.name
        .toLowerCase()
        .includes(searchValue.toLowerCase());
      return filteredProducts || filteredProducts.length > 0;
    });

    const currentSellers = filteredSellers.slice(
      indexOfFirstSeller,
      indexOfLastSeller
    );

    return (
      <Card
        borderRadius="lg"
        boxShadow="md"
        bg={cardBg}
        borderWidth="1px"
        borderColor={borderColor}
      >
        <CardHeader pb={2}>
          <Flex justify="space-between" align="center" mb={2}>
            <Heading
              as="h2"
              size="lg"
              color={primaryColor}
              fontFamily="Noto Sans Lao, serif"
            >
              ລາຍການສິນຄ້າຜູ້ຂາຍທັງໝົດ
            </Heading>
            <InputGroup width={{ base: "100%", md: "250px" }}>
              <InputLeftElement pointerEvents="none">
                <SearchIcon color="gray.400" />
              </InputLeftElement>
              <Input
                placeholder="ຄົ້ນຫາຊື່ຜູ້ຂາຍ..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                borderRadius="md"
                focusBorderColor={primaryColor}
              />
            </InputGroup>
          </Flex>
        </CardHeader>
        <Divider borderColor={borderColor} />
        <CardBody p={0}>
          <TableContainer>
            <Table variant="simple">
              <Thead bg={headerBg}>
                <Tr>
                  <Th fontFamily="Noto Sans Lao, serif" py={4}>
                    ລະຫັດສິນຄ້າ
                  </Th>
                  <Th fontFamily="Noto Sans Lao, serif">ຊື່ສິນຄ້າ</Th>
                  <Th fontFamily="Noto Sans Lao, serif">ໝວດສິນຄ້າ</Th>
                  <Th fontFamily="Noto Sans Lao, serif" isNumeric>
                    ລາຄາ
                  </Th>
                  <Th fontFamily="Noto Sans Lao, serif" isNumeric>
                    ຈຳນວນສິນຄ້າ
                  </Th>
                  <Th fontFamily="Noto Sans Lao, serif" isNumeric>
                    ຂາຍໄດ້
                  </Th>
                  <Th fontFamily="Noto Sans Lao, serif">ສະຖານະ</Th>
                  <Th fontFamily="Noto Sans Lao, serif">ປິດສະຖະນະຂາຍສິນຄ້າ</Th>
                  <Th fontFamily="Noto Sans Lao, serif">ຈັດການ</Th>
                </Tr>
              </Thead>

              {currentSellers.length > 0 ? (
                currentSellers?.map((i, index) => (
                  <React.Fragment key={`seller-${index}`}>
                    <Tr bgColor={"gray.900"}>
                      <Td colSpan={9} py={3}>
                        <Badge
                          fontSize="md"
                          px={3}
                          py={1}
                          borderRadius="md"
                          colorScheme="yellow"
                          fontFamily="Noto Sans Lao, serif"
                        >
                          ຜູ້ຂາຍ: {i.seller.name}
                        </Badge>
                      </Td>
                    </Tr>

                    {i.products.map((product) => (
                      <Tbody key={product._id}>
                        <Tr
                          textAlign="center"
                          colorScheme={"whiteAlpha.400"}
                          transition="background-color 0.2s"
                        >
                          <Td fontFamily="Noto Sans Lao, serif">
                            <Badge
                              fontSize="sm"
                              px={2}
                              py={1}
                              borderRadius="md"
                              colorScheme="yellow"
                            >
                              {product.code_products}
                            </Badge>
                          </Td>
                          <Td fontFamily="Noto Sans Lao, serif">
                            {product.name}
                          </Td>
                          <Td fontFamily="Noto Sans Lao, serif">
                            {product.category}
                          </Td>
                          <Td fontFamily="Noto Sans Lao, serif" isNumeric>
                            {product.price.toLocaleString()} ກີບ
                          </Td>
                          <Td fontFamily="Noto Sans Lao, serif" isNumeric>
                            {product.stock}
                          </Td>
                          <Td fontFamily="Noto Sans Lao, serif" isNumeric>
                            {product.sale}
                          </Td>
                          <Td fontFamily="Noto Sans Lao, serif">
                            <Badge
                              colorScheme={
                                product.status_products === "ຂາຍ"
                                  ? "green"
                                  : "red"
                              }
                              borderRadius="full"
                              px={2}
                              py={1}
                            >
                              {product.status_products}
                            </Badge>
                          </Td>
                          <Td>
                            <ProductList
                              key={product._id}
                              productId={product._id}
                              status_products={product.status_products}
                              handleSwitch={handleSwitch}
                            />
                          </Td>
                          <Td>
                            <ButtonGroup spacing={2} size="sm">
                              <IconButton
                                icon={<EditIcon />}
                                colorScheme="blue"
                                aria-label="Edit"
                                borderRadius="md"
                                onClick={() => handleClick(product._id)}
                              />
                              <IconButton
                                icon={<DeleteIcon />}
                                colorScheme="red"
                                aria-label="Delete"
                                borderRadius="md"
                                onClick={() =>
                                  console.log("Delete", product._id)
                                }
                              />
                            </ButtonGroup>
                          </Td>
                        </Tr>
                      </Tbody>
                    ))}
                  </React.Fragment>
                ))
              ) : (
              
                  <Center >
                    <Text colorScheme="red">ບໍ່ພົບຂໍ້ມູນ</Text>
                  </Center>
                
              )}
            </Table>
          </TableContainer>

          <Flex justify="center" align="center" p={4} gap={4}>
            <Button
              onClick={() => changePage(currentPage - 1)}
              isDisabled={currentPage === 1}
              colorScheme="blue"
              variant="outline"
              size="md"
              borderRadius="md"
              leftIcon={<Text>←</Text>}
            >
              Previous
            </Button>
            <Text fontWeight="medium">
              Page {currentPage} of {totalPages}
            </Text>
            <Button
              onClick={() => changePage(currentPage + 1)}
              isDisabled={currentPage === totalPages}
              colorScheme="blue"
              variant="outline"
              size="md"
              borderRadius="md"
              rightIcon={<Text>→</Text>}
            >
              Next
            </Button>
          </Flex>
        </CardBody>
      </Card>
    );
  };

  useEffect(() => {
    dispatch(get_products_admin_seller());
  }, [dispatch]);

  const handleClick = (id) => {
    navigate(`/admin/dashboard/${id}`);
  };

  const handleSwitch = (productId, newStatus) => {
    dispatch(
      status_buyOrstopbuy({
        productId: productId,
        newStatus: newStatus,
      })
    ).then(() => dispatch(get_products_admin_seller()));
  };

  const ProductList = ({ key, status_products, productId, handleSwitch }) => {
    const [isBuying, setIsBuying] = useState(status_products);

    const toggleStatus = () => {
      const newStatus = isBuying === "ຂາຍ" ? "ຢຸດຂາຍ" : "ຂາຍ";
      setIsBuying(newStatus);
      handleSwitch(productId, newStatus);
    };

    return (
      <FormControl
        key={key}
        display="flex"
        alignItems="center"
        justifyContent="center"
        gap={2}
      >
        <Switch
          id={`switch-${productId}`}
          isChecked={isBuying === "ຢຸດຂາຍ"}
          onChange={toggleStatus}
          colorScheme="red"
          size="md"
        />
        <FormLabel
          htmlFor={`switch-${productId}`}
          mb="0"
          fontFamily="Noto Sans Lao, serif"
        >
          {isBuying === "ຢຸດຂາຍ" ? "ຢຸດຂາຍ" : "ຂາຍ"}
        </FormLabel>
      </FormControl>
    );
  };

  return (
    <Box p={6}>
      {loading ? (
        <Flex justify="center" align="center" height="400px" direction="column">
          <Spinner
            size="xl"
            thickness="4px"
            speed="0.65s"
            color={primaryColor}
          />
          <Text mt={4} fontSize="lg" fontFamily="Noto Sans Lao, serif">
            ກຳລັງໂຫລດ...
          </Text>
        </Flex>
      ) : (
        <PaginatedSellers sellersData={banners} itemsPerPage={1} />
      )}
    </Box>
  );
};

export default ProductsSeller;
