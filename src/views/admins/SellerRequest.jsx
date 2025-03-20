import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get_seller_request } from "../../store/Reducers/sellerReducer";
import {
  Box,
  Flex,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Link,
  Button,
  Text,
  Badge,
  HStack,
  Tooltip,
  useColorModeValue,
  Heading,
  Icon
} from "@chakra-ui/react";
import { FaEye } from "react-icons/fa";
import { SiPrivateinternetaccess } from "react-icons/si";
import Search from "../../Search";

const SellerRequest = () => {
  const dispatch = useDispatch();
  const { sellers } = useSelector((state) => state.seller);
  
  // State management
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [parPage, setParPage] = useState(5);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  
  // Colors
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  
  // Fetch seller data
  useEffect(() => {
    dispatch(get_seller_request());
  }, [dispatch,parPage,setItemsPerPage ]);
  
  // Filter sellers based on search
  const filteredSellers = sellers.filter((seller) => {
    return (
      seller?.name?.toLowerCase().includes(searchValue.toLowerCase()) ||
      seller.seller_code.toString().includes(searchValue.toLowerCase())
    );
  });
  
  // Pagination logic
  const totalSellers = filteredSellers.length;
  const totalPages = Math.ceil(totalSellers / itemsPerPage);
  const indexOfLastSeller = currentPage * itemsPerPage;
  const indexOfFirstSeller = indexOfLastSeller - itemsPerPage;
  const currentSellers = filteredSellers.slice(indexOfFirstSeller, indexOfLastSeller);
  
  // Handle page change
  const changePage = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
  };
  
  // Status badge renderer
  const renderStatusBadge = (status) => {
    let color;
    switch(status.toLowerCase()) {
      case 'active':
        color = "green";
        break;
      case 'pending':
        color = "yellow";
        break;
      case 'deactivated':
        color = "red";
        break;
      default:
        color = "gray";
    }
    return <Badge colorScheme={color}>{status}</Badge>;
  };
  
  // Payment status badge renderer
  const renderPaymentBadge = (payment) => {
    let color;
    switch(payment.toLowerCase()) {
      case 'paid':
        color = "green";
        break;
      case 'pending':
        color = "yellow";
        break;
      case 'failed':
        color = "red";
        break;
      default:
        color = "gray";
    }
    return <Badge colorScheme={color}>{payment}</Badge>;
  };

  return (
    <Box px={{ base: 3, lg: 8 }} py={6}>
      {/* Header */}
      <Flex align="center" mb={6}>
        <Icon as={SiPrivateinternetaccess} fontSize="2xl" mr={2} />
        <Heading as="h1" size="lg" fontFamily="Noto Sans Lao, serif">
          ອະນຸຍາດຜູ້ຂາຍໃຊ້ງານ
        </Heading>
      </Flex>
      
      {/* Main content card */}
      <Box 
        p={5} 
        bg={bgColor} 
        boxShadow="md" 
        borderRadius="lg" 
        borderWidth="1px"
        borderColor={borderColor}
      >
        {/* Search component */}
        <Search
          setParPage={setParPage}
          setSearchValue={setSearchValue}
          searchValue={searchValue}
        />
        
        {/* Table */}
        <Box overflowX="auto" mt={5}>
          <Table variant="simple" colorScheme="gray" size="md">
            <Thead bg="gray.50">
              <Tr>
                <Th fontFamily="Noto Sans Lao, serif">ລະຫັດຜູ້ຂາຍ</Th>
                <Th fontFamily="Noto Sans Lao, serif">ຊື່ ແລະ ນາມສະກຸນ</Th>
                <Th fontFamily="Noto Sans Lao, serif">ອີເມວ</Th>
                <Th fontFamily="Noto Sans Lao, serif">ສະຖານະຊໍາລະ</Th>
                <Th fontFamily="Noto Sans Lao, serif">ສະຖານະ</Th>
                <Th fontFamily="Noto Sans Lao, serif">Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {currentSellers.length > 0 ? (
                currentSellers.map((seller, index) => (
                  <Tr key={index} _hover={{ bg: "gray.50" }}>
                    <Td fontWeight="medium">{seller.seller_code}</Td>
                    <Td>{seller.name}</Td>
                    <Td>{seller.email}</Td>
                    <Td>{renderPaymentBadge(seller.payment)}</Td>
                    <Td>{renderStatusBadge(seller.status)}</Td>
                    <Td>
                      <Tooltip label="View Details" placement="top">
                        <Link href={`/admin/dashboard/seller/details/${seller._id}`}>
                          <Button
                            colorScheme="green"
                            size="sm"
                            variant="solid"
                            leftIcon={<FaEye />}
                          >
                            View
                          </Button>
                        </Link>
                      </Tooltip>
                    </Td>
                  </Tr>
                ))
              ) : (
                <Tr>
                  <Td colSpan={6} textAlign="center" py={10}>
                    <Text fontSize="lg" color="gray.500">
                      No sellers found
                    </Text>
                  </Td>
                </Tr>
              )}
            </Tbody>
          </Table>
        </Box>
        
        {/* Pagination */}
        {totalSellers > 0 && (
          <Flex justify="space-between" align="center" mt={6}>
            <Text color="gray.600">
              Showing {indexOfFirstSeller + 1} to {Math.min(indexOfLastSeller, totalSellers)} of {totalSellers} entries
            </Text>
            <HStack spacing={2}>
              <Button
                onClick={() => changePage(1)}
                size="sm"
                disabled={currentPage === 1}
                colorScheme="gray"
                variant="outline"
              >
                First
              </Button>
              <Button
                onClick={() => changePage(currentPage - 1)}
                size="sm"
                disabled={currentPage === 1}
                colorScheme="gray"
                variant="outline"
              >
                Prev
              </Button>
              <Flex align="center" mx={2}>
                <Text>
                  Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
                </Text>
              </Flex>
              <Button
                onClick={() => changePage(currentPage + 1)}
                size="sm"
                disabled={currentPage === totalPages}
                colorScheme="gray"
                variant="outline"
              >
                Next
              </Button>
              <Button
                onClick={() => changePage(totalPages)}
                size="sm"
                disabled={currentPage === totalPages}
                colorScheme="gray"
                variant="outline"
              >
                Last
              </Button>
            </HStack>
          </Flex>
        )}
      </Box>
    </Box>
  );
};

export default SellerRequest;