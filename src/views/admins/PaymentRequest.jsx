import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Text,
  Spinner,
  Input,
  Badge,
  IconButton,
  FormControl,
  Tooltip,
  Table,
  Thead,
  Th,
  Td,
  Tbody,
  Tr,
  TableContainer,
  Select,
} from "@chakra-ui/react";
import moment from "moment";
import {
  approve_payment,
  get_transationed,
  messageClear,
} from "../../store/Reducers/authReducer";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { FcApproval } from "react-icons/fc";

const PaymentApproval = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [selete, setSelete] = useState("all");
  const { get_tranfer, successMessage, errorMessage, loader } = useSelector(
    (state) => state.auth
  );
  const [state, setState] = useState({
    messageWhy: "",
  });

  const imageHandle = (e) => {
    const files = e.target.files;
    const fileArray = Array.from(files);
    setImages((prevImages) => [...prevImages, ...fileArray]);
  };

  const handle = (e) => {
    setState({ ...state, [e.target.name]: [e.target.value] });
  };

  const handleApproval = (id, status) => {
    const formData = new FormData();
    formData.append("status", status);
    formData.append("messageWhy", state.messageWhy);
    images.forEach((img) => formData.append("images", img));
    dispatch(
      approve_payment({
        id_tran: id,
        formData: formData,
      })
    ).then(() => dispatch(get_transationed()));
  };

  useEffect(() => {
    dispatch(get_transationed());
  }, [dispatch]);

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
    }
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
  }, [successMessage, errorMessage, dispatch]);

  const handle_to_check = (id) => {
    navigate(`/detail_transation/${id}`);
  };
  const filteredTransactions = get_tranfer
    .map((item) => ({
      ...item,
      transactions:
        selete === "all"
          ? item.transactions
          : item.transactions.filter(
              (transaction) => transaction.status === selete
            ),
    }))
    .filter((item) => item.transactions.length > 0);
  return (
    <Box px="6" py="8" bg="gray.50" minH="100vh">
      <Box bg="white" p="8" boxShadow="lg" borderRadius="xl">
        <Flex justify="space-between" align="center" mb="6">
          <Text as="h2" size="lg" color="gray.700">
            ອະນຸມັດວົງເງິນຜູ້ຂາຍ
          </Text>
        </Flex>
        <Box paddingBottom={"30px"}>
          <Select
            w="150px"
            display={"flex"}
            justifyContent={"center"}
            onChange={(e) => setSelete(e.target.value)}
          >
            <option value="all">All</option>
            <option value="completed">completed</option>
            <option value="cancel">cancel</option>
            <option value="pending">pending</option>
          </Select>
        </Box>
        <TableContainer>
          <Table variant="simple" size="sm" colorScheme="gray">
            {/* Table Head */}
            <Thead bg="gray.200">
              <Tr>
                <Th fontFamily="Noto Sans Lao, serif" w="15%">
                  ລະຫັດຖອນເງິນ
                </Th>
                <Th fontFamily="Noto Sans Lao, serif" w="20%">
                  ຈຳນວນເງິນ (K)
                </Th>
                <Th fontFamily="Noto Sans Lao, serif" w="15%">
                  ສະຖານະ
                </Th>
                <Th fontFamily="Noto Sans Lao, serif" w="15%">
                  ວັນ/ເດືອນ/ປີ
                </Th>
                <Th fontFamily="Noto Sans Lao, serif" w="15%">
                  ຫຼັກຖານການໂອນ
                </Th>
                <Th fontFamily="Noto Sans Lao, serif" w="15%">
                  ໝາຍເຫດ
                </Th>
                <Th
                  fontFamily="Noto Sans Lao, serif"
                  w="10%"
                  textAlign="center"
                >
                  Action
                </Th>
              </Tr>
            </Thead>

            {/* Table Body */}
            {loader ? (
              <Tbody>
                <Tr>
                  <Td colSpan="7">
                    <Flex justify="center" align="center" py="8">
                      <Spinner size="xl" color="blue.500" thickness="3px" />
                    </Flex>
                  </Td>
                </Tr>
              </Tbody>
            ) : (
              <Tbody>
                {filteredTransactions.map((item_one) =>
                  item_one.transactions.map((item) => (
                    <Tr
                      key={item.id}
                      _hover={{ bg: "gray.50" }}
                      transition="all 0.2s"
                    >
                      {/* Code */}
                      <Td>
                        <Badge
                          colorScheme="yellow"
                          fontSize="sm"
                          px="3"
                          py="1"
                          borderRadius="full"
                        >
                          {item.code_payments_seller || 0}
                        </Badge>
                      </Td>

                      {/* Amount */}
                      <Td fontWeight="medium">
                        {item.amount.toLocaleString()} ກີບ
                      </Td>

                      {/* Status */}
                      <Td>
                        <Badge
                          colorScheme={
                            item.status === "pending"
                              ? "orange"
                              : item.status === "success"
                              ? "green"
                              : "red"
                          }
                          fontSize="sm"
                          px="3"
                          py="1"
                          borderRadius="full"
                        >
                          {item.status}
                        </Badge>
                      </Td>

                      {/* Date */}
                      <Td color="gray.600">{moment(item.date).format("LL")}</Td>

                      {/* Upload Evidence */}
                      <Td>
                        <FormControl>
                          <Input
                            type="file"
                            multiple
                            onChange={imageHandle}
                            border="1px dashed"
                            borderColor="gray.300"
                            p="2"
                            _hover={{ borderColor: "blue.500" }}
                          />
                        </FormControl>
                      </Td>

                      {/* Note */}
                      <Td>
                        <FormControl>
                          <Input
                            type="text"
                            name="messageWhy"
                            onChange={handle}
                            placeholder="Enter note..."
                            _focus={{ borderColor: "blue.500" }}
                          />
                        </FormControl>
                      </Td>

                      {/* Actions */}
                      <Td textAlign="center">
                        {item.status === "pending" && (
                          <>
                            <Tooltip label="Approve" placement="top">
                              <IconButton
                                size="sm"
                                colorScheme="yellow"
                                icon={<FcApproval />}
                                onClick={() =>
                                  handleApproval(item.id, "completed")
                                }
                                _hover={{ transform: "scale(1.05)" }}
                                transition="all 0.2s"
                                mx="1"
                              />
                            </Tooltip>

                            <Tooltip label="Reject" placement="top">
                              <IconButton
                                size="sm"
                                colorScheme="red"
                                icon={<MdDelete />}
                                onClick={() =>
                                  handleApproval(item.id, "cancel")
                                }
                                _hover={{ transform: "scale(1.05)" }}
                                transition="all 0.2s"
                              />
                            </Tooltip>
                          </>
                        )}
                        <Tooltip label="View Details" placement="top">
                          <IconButton
                            size="sm"
                            colorScheme="orange"
                            icon={<FaEye />}
                            onClick={() => handle_to_check(item_one._id)}
                            _hover={{ transform: "scale(1.05)" }}
                            transition="all 0.2s"
                            mx="1"
                          />
                        </Tooltip>
                      </Td>
                    </Tr>
                  ))
                )}
              </Tbody>
            )}
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default PaymentApproval;
