import React, { useEffect, useState } from 'react'; 

import { useDispatch, } from 'react-redux';
// import { get_deactive_sellers } from '../../store/Reducers/sellerReducer';
import Pagination from '../../Pagination';
import {
    Box,

    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Select,
    Table,
    Tbody,

    Th,
    Thead,
    Tr,
} from '@chakra-ui/react';

const DeactiveSellers = () => {
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const [searchValue, setSearchValue] = useState('');
    const [parPage, setParPage] = useState(5);

    // const { sellers, totalSeller } = useSelector((state) => state.seller);

    useEffect(() => {
        // const obj = {
        //     parPage: parseInt(parPage),
        //     page: parseInt(currentPage),
        //     searchValue,
        // };
        //  dispatch(get_deactive_sellers(obj));
    }, [searchValue, currentPage, parPage, dispatch]);

    return (
        <Box px={4} py={5}>
            <Heading as="h1" size="lg" mb={3}>
                Deactivated Sellers
            </Heading>

            <Box p={4} bg="purple.500" rounded="md">
                <Flex justify="space-between" align="center" mb={4}>
                    <FormControl display="flex" alignItems="center">
                        <FormLabel htmlFor="perPage" mb={0} color="gray.200">
                            Items per page:
                        </FormLabel>
                        <Select
                            id="perPage"
                            value={parPage}
                            onChange={(e) => setParPage(parseInt(e.target.value))}
                            bg="purple.600"
                            borderColor="gray.700"
                            color="gray.200"
                            size="sm"
                        >
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="20">20</option>
                        </Select>
                    </FormControl>

                    <FormControl>
                        <Input
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            placeholder="Search"
                            bg="purple.600"
                            borderColor="gray.700"
                            color="gray.200"
                            size="sm"
                        />
                    </FormControl>
                </Flex>

                <Table variant="simple" colorScheme="purple">
                    <Thead>
                        <Tr>
                            <Th>No</Th>
                            <Th>Image</Th>
                            <Th>Name</Th>
                            <Th>Shop Name</Th>
                            <Th>Payment Status</Th>
                            <Th>Email</Th>
                            <Th>Status</Th>
                            <Th>District</Th>
                            <Th>Action</Th>
                        </Tr>
                    </Thead>

                    <Tbody>
                        {/* {sellers.map((d, i) => (
                            <Tr key={d._id}>
                                <Td>{i + 1}</Td>
                                <Td>
                                    <img
                                        src={d.image}
                                        alt={d.name}
                                        width={45}
                                        height={45}
                                    />
                                </Td>
                                <Td>{d.name}</Td>
                                <Td>{d.shopInfo?.shopName}</Td>
                                <Td>{d.payment}</Td>
                                <Td>{d.email}</Td>
                                <Td>{d.status}</Td>
                                <Td>{d.shopInfo?.district}</Td>
                                <Td>
                                    <Link to={`/admin/dashboard/seller/details/${d._id}`}>
                                        <Button
                                            bg="green.500"
                                            color="white"
                                            _hover={{ bg: 'green.600' }}
                                            size="sm"
                                            leftIcon={<FaEye />}
                                        >
                                            View
                                        </Button>
                                    </Link>
                                </Td>
                            </Tr>
                        ))} */}
                    </Tbody>
                </Table>

                <Box mt={4} textAlign="right">
                    <Pagination
                        pageNumber={currentPage}
                        setPageNumber={setCurrentPage}
                        // totalItem={totalSeller}
                        parPage={parPage}
                        showItem={3}
                    />
                </Box>
            </Box>
        </Box>
    );
};

export default DeactiveSellers;
