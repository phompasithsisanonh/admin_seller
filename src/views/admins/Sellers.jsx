import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  Box,
  Input,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Image,
  Button,
  Flex,
  IconButton,
  Text,
  Badge,
} from "@chakra-ui/react";
import { FaEye } from "react-icons/fa";
import { get_seller_admin } from "../../store/Reducers/authReducer";

const Sellers = () => {
  const dispatch = useDispatch();
  const { data_get_admin_seller } = useSelector((state) => state.auth);

  /////pagination and search funtion
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const countDocument = data_get_admin_seller.length;
  const itemsPerPage = 5;
  const totalPages = Math.ceil(countDocument / itemsPerPage);
  const changePage = (number) => {
    if (number < 1 || number > totalPages) return;
    setCurrentPage(number);
  };
  const indexOfLastSeller = currentPage * itemsPerPage;
  const indexOfFirstSeller = indexOfLastSeller - itemsPerPage; ///2-2 =0
  const filteredSellers = data_get_admin_seller.filter((seller) => {
    console.log(seller);
    const filteredProducts = seller.name
      .toLowerCase()
      .includes(searchValue.toLowerCase());
    return filteredProducts || filteredProducts.length > 0;
  });
  const currentSellers = filteredSellers.slice(
    indexOfFirstSeller, //0
    indexOfLastSeller //2
  );
  useEffect(() => {
    dispatch(get_seller_admin());
  }, [searchValue, currentPage, dispatch]);

  const getStatusProps = (status) => {
    switch (status) {
      case "active":
        return "green";
      case "pending":
        return "orange";
      default:
        return "gray";
    }
  };

  return (
    <Box
      w="full"
      bg="white"
      p="6"
      boxShadow="md"
      borderRadius="lg"
      px="4"
      py="5"
    >
      <Text fontWeight={"bold"} fontSize={"20px"} as="h1" size="lg" mb="4">
        ສະມາຊິກຜູ້ຂາຍ
      </Text>
      <Box p="4" borderRadius="md">
        <Flex justify="space-between" mb="4">
          <Input
            onChange={(e) => setSearchValue(e.target.value)}
            value={searchValue}
            focusBorderColor="indigo.500"
            _hover={{ borderColor: "indigo.500" }}
            placeholder="ຄົ້ນຫາຊື່ສິນຄ້າ ແລະ ລະຫັດສິນຄ້າ"
            w="auto"
          />
        </Flex>
        <Box overflowX="auto">
          <Table variant="simple" colorScheme="purple">
            <Thead>
              <Tr>
                <Th fontFamily="Noto Sans Lao, serif">ລະຫັດຜູ້ຂາຍ</Th>
                <Th fontFamily="Noto Sans Lao, serif">ຮູບພາບ</Th>
                <Th fontFamily="Noto Sans Lao, serif">ຊື່ຜູ້ຂາຍ</Th>
                <Th fontFamily="Noto Sans Lao, serif">ຊື່ຮ້ານ</Th>
                <Th fontFamily="Noto Sans Lao, serif">ສະຖານະຈ່າຍເງິນ</Th>
                <Th fontFamily="Noto Sans Lao, serif">ອິເມວ</Th>
                <Th fontFamily="Noto Sans Lao, serif">ສະຖານະໃຊ້ງານ</Th>
                <Th fontFamily="Noto Sans Lao, serif">District</Th>
                <Th fontFamily="Noto Sans Lao, serif">Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {currentSellers.map((d, i) => (
                <Tr key={i}>
                  <Td>
                    <Badge colorScheme="yellow">{d.seller_code}</Badge>
                  </Td>
                  <Td>
                    <Image boxSize="45px" src={d.image || ""} alt="" />
                  </Td>
                  <Td>{d.name}</Td>
                  <Td>{d.shopInfo?.shopName}</Td>
                  <Td>{d.payment}</Td>
                  <Td>{d.email}</Td>
                  <Td>
                    <Badge
                      colorScheme={getStatusProps(d.status)}
                      fontSize="md"
                      p="2"
                    >
                      {d.status}
                    </Badge>
                  </Td>
                  <Td>{d.shopInfo?.district}</Td>
                  <Td>
                    <Link to={`/admin/dashboard/seller/details/${d._id}`}>
                      <IconButton
                        icon={<FaEye />}
                        aria-label="View Details"
                        bg="green.500"
                        color="white"
                        _hover={{ boxShadow: "lg", bg: "green.600" }}
                      />
                    </Link>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
        <Flex
          display={"flex"}
          paddingTop={"30px"}
          justifyContent={"center"}
          alignItems={"center"}
          justify="end"
          mt="4"
        >
          <Button
            onClick={() => changePage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            ກ່ອນໜ້າ
          </Button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <Button
            onClick={() => changePage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            ຖັດໄປ
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default Sellers;
