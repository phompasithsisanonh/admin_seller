import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Text,
  Button,
  Input,
  FormControl,
  FormLabel,
  Select,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Badge,
  Heading,
  Card,
  CardHeader,
  CardBody,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Tab,
  Tabs,
  TabList,
  TabPanel,
  TabPanels,
  FormErrorMessage,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import {
  MdCurrencyExchange,
  MdHistory,
  MdPending,
  MdAccountBalance,
} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  tranfer,
  get_tranfer,
  messageClear,
  transation,
} from "../../store/Reducers/sellerReducer";
import toast from "react-hot-toast";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const Payments = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  const {
    successMessage,
    errorMessage,
    loader,
    amount_seller,
    totalPending,
    totalSuccess,
    pendingItems,
    successItems,
    cencelItems,
  } = useSelector((state) => state.seller);

  // Form state
  const [formState, setFormState] = useState({
    bank: "",
    seller_name_bank: "",
    amount: "",
    seller_account_bank_number: "",
  });

  // Form validation state
  const [errors, setErrors] = useState({});

  // Calculate balances
  const totalSales = amount_seller?.totalSales || 0;
  const availableBalance = totalSales - totalPending;

  // Handle form input changes
  const handleInputChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });

    // Clear error for this field when user types
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: null,
      });
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formState.amount) {
      newErrors.amount = "ກະລຸນາລະບຸຈຳນວນເງິນ";
    } else if (parseFloat(formState.amount) <= 0) {
      newErrors.amount = "ຈຳນວນເງິນຕ້ອງຫຼາຍກວ່າ 0";
    } else if (parseFloat(formState.amount) > availableBalance) {
      newErrors.amount = "ຈຳນວນເງິນເກີນວົງເງິນທີ່ສາມາດຖອນໄດ້";
    }

    if (!formState.seller_name_bank) {
      newErrors.seller_name_bank = "ກະລຸນາລະບຸຊື່ທະນາຄານ";
    }

    if (!formState.bank || formState.bank === "ເລືອກທະນາຄານ") {
      newErrors.bank = "ກະລຸນາເລືອກທະນາຄານ";
    }

    if (!formState.seller_account_bank_number) {
      newErrors.seller_account_bank_number = "ກະລຸນາລະບຸເລກບັນຊີທະນາຄານ";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle withdrawal request submission
  const handleWithdrawalRequest = () => {
    if (!userInfo) {
      return navigate("/login");
    }

    if (!validateForm()) {
      return;
    }

    dispatch(
      tranfer({
        sellerId: userInfo._id,
        bank: formState.bank,
        seller_name_bank: formState.seller_name_bank,
        amount: formState.amount,
        seller_account_bank_number: formState.seller_account_bank_number,
      })
    ).then(() => {
      dispatch(
        get_tranfer({
          sellerId: userInfo._id,
        })
      );

      // Clear form after successful submission
      setFormState({
        bank: "",
        seller_name_bank: "",
        amount: "",
        seller_account_bank_number: "",
      });
    });
  };

  // Toast notifications for success/error messages
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

  // Fetch transaction data on component mount
  useEffect(() => {
    if (userInfo && userInfo._id) {
      dispatch(transation({ sellerId: userInfo._id }));
      dispatch(get_tranfer({ sellerId: userInfo._id }));
    }
  }, [dispatch, userInfo]);

  // Define stats cards
  const statCards = [
    {
      title: "ຍອດເງິນທັງໝົດ",
      value: totalSales,
      color: "purple.50",
      iconBg: "purple.500",
      icon: <MdCurrencyExchange color="white" size="24px" />,
      helpText: "ຍອດເງິນທັງໝົດທີ່ໄດ້ຮັບ",
    },
    {
      title: "ຍອດເງິນຖອນແລ້ວ",
      value: totalSuccess || 0,
      color: "green.50",
      iconBg: "green.500",
      icon: <MdHistory color="white" size="24px" />,
      helpText: "ຍອດເງິນທີ່ຖອນໄປແລ້ວ",
    },
    {
      title: "ລໍຖ້າດຳເນີນການ",
      value: totalPending || 0,
      color: "blue.50",
      iconBg: "blue.500",
      icon: <MdPending color="white" size="24px" />,
      helpText: "ກຳລັງລໍຖ້າການອະນຸມັດ",
    },
    {
      title: "ສາມາດຖອນໄດ້",
      value: availableBalance || 0,
      color: "red.50",
      iconBg: "red.500",
      icon: <MdAccountBalance color="white" size="24px" />,
      helpText: "ຍອດເງິນທີ່ສາມາດຖອນໄດ້",
    },
  ];

  return (
    <Box p={5} bg="gray.50" minH="100vh">
      <Heading    fontFamily="Noto Sans Lao, serif" size="lg" mb={6} color="gray.700">
        ການເງິນແລະການຖອນເງິນ
      </Heading>

      {/* Stats Overview */}
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={5} mb={8}>
        {statCards.map((stat, index) => (
          <Card
            key={index}
            bg={stat.color}
            shadow="md"
            borderRadius="lg"
            overflow="hidden"
          >
            <CardBody>
              <Flex justify="space-between" align="center">
                <Stat>
                  <StatLabel fontWeight="medium">{stat.title}</StatLabel>
                  <StatNumber fontSize="2xl" fontWeight="bold">
                    {stat.value.toLocaleString()} ກີບ
                  </StatNumber>
                  <StatHelpText mb={0}>{stat.helpText}</StatHelpText>
                </Stat>
                <Flex
                  w="12"
                  h="12"
                  bg={stat.iconBg}
                  rounded="full"
                  justify="center"
                  align="center"
                  shadow="md"
                >
                  {stat.icon}
                </Flex>
              </Flex>
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>

      {/* Main Content */}
      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={8}>
        {/* Withdrawal Form */}
        <Card shadow="md">
          <CardHeader>
            <Heading   fontFamily="Noto Sans Lao, serif" size="md" color="gray.700">
              ຖອນເງິນ
            </Heading>
          </CardHeader>
          <CardBody>
            {/* Form */}
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5} mb={5}>
              <FormControl isInvalid={errors.amount}>
                <FormLabel  fontWeight="medium">ຈຳນວນເງິນ</FormLabel>
                <Input
                  type="number"
                  value={formState.amount}
                  placeholder="ລະບຸຈຳນວນເງິນ"
                  onChange={handleInputChange}
                  name="amount"
                  min="0"
                  bg="white"
                  borderColor="gray.300"
                  _focus={{
                    borderColor: "purple.400",
                    boxShadow: "0 0 0 1px purple.400",
                  }}
                />
                {errors.amount && (
                  <FormErrorMessage>{errors.amount}</FormErrorMessage>
                )}
              </FormControl>
              <FormControl isInvalid={errors.seller_name_bank}>
                <FormLabel fontWeight="medium">ຊື່ເຈົ້າຂອງບັນຊີ</FormLabel>
                <Input
                  type="text"
                  value={formState.seller_name_bank}
                  placeholder="ລະບຸຊື່ເຈົ້າຂອງບັນຊີ"
                  onChange={handleInputChange}
                  name="seller_name_bank"
                  bg="white"
                  borderColor="gray.300"
                  _focus={{
                    borderColor: "purple.400",
                    boxShadow: "0 0 0 1px purple.400",
                  }}
                />
                {errors.seller_name_bank && (
                  <FormErrorMessage>{errors.seller_name_bank}</FormErrorMessage>
                )}
              </FormControl>
              <FormControl isInvalid={errors.bank}>
                <FormLabel fontWeight="medium">ທະນາຄານ</FormLabel>
                <Select
                  name="bank"
                  value={formState.bank}
                  onChange={handleInputChange}
                  bg="white"
                  borderColor="gray.300"
                  _focus={{
                    borderColor: "purple.400",
                    boxShadow: "0 0 0 1px purple.400",
                  }}
                >
                  <option>ເລືອກທະນາຄານ</option>
                  <option value={"ທະນາຄານການຄ້າຕ່າງປະເທດລາວ (BCEL)"}>
                    ທະນາຄານການຄ້າຕ່າງປະເທດລາວ (BCEL)
                  </option>
                  <option value="ທະນາຄານພັດທະນາລາວ (LDB BANK)">
                    ທະນາຄານພັດທະນາລາວ (LDB BANK)
                  </option>
                </Select>
                {errors.bank && (
                  <FormErrorMessage>{errors.bank}</FormErrorMessage>
                )}
              </FormControl>
              <FormControl isInvalid={errors.seller_account_bank_number}>
                <FormLabel fontWeight="medium">ເລກບັນຊີທະນາຄານ</FormLabel>
                <Input
                  type="number"
                  value={formState.seller_account_bank_number}
                  placeholder="ລະບຸເລກບັນຊີທະນາຄານ"
                  onChange={handleInputChange}
                  name="seller_account_bank_number"
                  bg="white"
                  borderColor="gray.300"
                  _focus={{
                    borderColor: "purple.400",
                    boxShadow: "0 0 0 1px purple.400",
                  }}
                />
                {errors.seller_account_bank_number && (
                  <FormErrorMessage>
                    {errors.seller_account_bank_number}
                  </FormErrorMessage>
                )}
              </FormControl>
            </SimpleGrid>

            {/* Info Alert */}
            <Alert status="info" mb={5} borderRadius="md">
              <AlertIcon />
              <AlertTitle mr={2}>ໝາຍເຫດ:</AlertTitle>
              <AlertDescription>
                ຖອນໄດ້ສູງສຸດ {availableBalance.toLocaleString()} ກີບ.
                ການຖອນຈະໃຊ້ເວລາປະມານ 1-2 ວັນທຳການ.
              </AlertDescription>
            </Alert>

            {/* Submit Button */}
            <Flex justify="flex-end">
              <Button
                onClick={handleWithdrawalRequest}
                colorScheme="red"
                isLoading={loader}
                loadingText="ກຳລັງດຳເນີນການ"
                size="md"
                px={8}
              >
                ຖອນເງິນ
              </Button>
            </Flex>

            {/* Pending Transactions */}
            <Box mt={8}>
              <Heading   fontFamily="Noto Sans Lao, serif" size="sm" mb={4} color="gray.700">
                ຄຳຮ້ອງຖອນເງິນທີ່ກຳລັງດຳເນີນການ
              </Heading>
              {pendingItems.length > 0 ? (
                <TableContainer
                  bg="white"
                  borderRadius="md"
                  boxShadow="sm"
                  overflowX="auto"
                >
                  <Table variant="simple" size="sm">
                    <Thead bg="purple.100">
                      <Tr>
                        <Th   fontFamily="Noto Sans Lao, serif">ລະຫັດຖອນເງິນ</Th>
                        <Th   fontFamily="Noto Sans Lao, serif">ຈຳນວນເງິນ</Th>
                        <Th   fontFamily="Noto Sans Lao, serif">ສະຖານະ</Th>
                        <Th   fontFamily="Noto Sans Lao, serif">ວັນທີ</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {pendingItems.map((item, index) => (
                        <Tr key={index} _hover={{ bg: "gray.50" }}>
                          <Td>
                            <Badge colorScheme="purple">
                              {item.code_payments_seller}
                            </Badge>
                          </Td>
                          <Td>{item.amount.toLocaleString()} ກີບ</Td>
                          <Td>
                            <Badge colorScheme="yellow">{item.status}</Badge>
                          </Td>
                          <Td>{moment(item.createdAt).format("DD/MM/YYYY")}</Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </TableContainer>
              ) : (
                <Text color="gray.500" py={2}>
                  ບໍ່ມີລາຍການທີ່ກຳລັງດຳເນີນການ
                </Text>
              )}
            </Box>
          </CardBody>
        </Card>

        {/* Transaction History */}
        <Card shadow="md">
          <CardHeader>
            <Heading   fontFamily="Noto Sans Lao, serif" size="md" color="gray.700">
              ປະຫວັດການຖອນເງິນ
            </Heading>
          </CardHeader>
          <CardBody>
            <Tabs  colorScheme="purple" variant="enclosed">
              <TabList>
                <Tab
                  _selected={{ color: "purple.500", borderColor: "purple.500" }}
                >
                  ຮັບເງິນສຳເລັດ
                </Tab>
                <Tab
                  _selected={{ color: "purple.500", borderColor: "purple.500" }}
                >
                  ຖືກຍົກເລີກ
                </Tab>
              </TabList>
              <TabPanels>
                {/* Successful Withdrawals */}
                <TabPanel px={0}>
                  {successItems.length > 0 ? (
                    <TableContainer
                      bg="white"
                      borderRadius="md"
                      boxShadow="sm"
                      overflowX="auto"
                    >
                      <Table variant="simple" size="sm">
                        <Thead bg="green.100">
                          <Tr>
                            <Th   fontFamily="Noto Sans Lao, serif">ລະຫັດຖອນເງິນ</Th>
                            <Th   fontFamily="Noto Sans Lao, serif">ຈຳນວນເງິນ</Th>
                            <Th   fontFamily="Noto Sans Lao, serif">ສະຖານະ</Th>
                            <Th   fontFamily="Noto Sans Lao, serif">ໝາຍເຫດ</Th>
                            <Th   fontFamily="Noto Sans Lao, serif">ວັນທີ</Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          {successItems.map((item, index) => (
                            <Tr key={index} _hover={{ bg: "gray.50" }}>
                              <Td>
                                <Badge colorScheme="purple">
                                  {item.code_payments_seller}
                                </Badge>
                              </Td>
                              <Td>{item.amount.toLocaleString()} ກີບ</Td>
                              <Td>
                                <Badge colorScheme="green">{item.status}</Badge>
                              </Td>
                              <Td>
                                <Badge colorScheme="red">
                                  {item.messageWhy}
                                </Badge>
                              </Td>
                              <Td>
                                {moment(item.createdAt).format("DD/MM/YYYY")}
                              </Td>
                            </Tr>
                          ))}
                        </Tbody>
                      </Table>
                    </TableContainer>
                  ) : (
                    <Text color="gray.500" py={2}>
                      ບໍ່ມີລາຍການສຳເລັດ
                    </Text>
                  )}
                </TabPanel>

                {/* Canceled Withdrawals */}
                <TabPanel px={0}>
                  {cencelItems && cencelItems.length > 0 ? (
                    <TableContainer
                      bg="white"
                      borderRadius="md"
                      boxShadow="sm"
                      overflowX="auto"
                    >
                      <Table variant="simple" size="sm">
                        <Thead bg="red.100">
                          <Tr>
                            <Th>ລະຫັດຖອນເງິນ</Th>
                            <Th>ຈຳນວນເງິນ</Th>
                            <Th>ສະຖານະ</Th>
                            <Th>ວັນທີ</Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          {cencelItems.map((item, index) => (
                            <Tr key={index} _hover={{ bg: "gray.50" }}>
                              <Td>
                                <Badge colorScheme="purple">
                                  {item.code_payments_seller}
                                </Badge>
                              </Td>
                              <Td>{item.amount.toLocaleString()} ກີບ</Td>
                              <Td>
                                <Badge colorScheme="red">{item.status}</Badge>
                              </Td>
                              <Td>
                                {moment(item.createdAt).format("DD/MM/YYYY")}
                              </Td>
                            </Tr>
                          ))}
                        </Tbody>
                      </Table>
                    </TableContainer>
                  ) : (
                    <Text color="gray.500" py={2}>
                      ບໍ່ມີລາຍການຍົກເລີກ
                    </Text>
                  )}
                </TabPanel>
              </TabPanels>
            </Tabs>
          </CardBody>
        </Card>
      </SimpleGrid>
    </Box>
  );
};

export default Payments;
