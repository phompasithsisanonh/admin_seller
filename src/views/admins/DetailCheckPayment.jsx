import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { get_tranfer, transation } from "../../store/Reducers/sellerReducer";
import {
  Box,
  Container,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  Heading,
  Card,
  CardHeader,
  CardBody,
  Text,
  Stack,
} from "@chakra-ui/react";

const DetailCheckPayment = () => {
  const { id } = useParams();
  const {
    get_amount,
    totalPending,
    totalSuccess,
    totalCancel,
    pendingItems,
    successItems,
    cencelItems,
    amount_seller,
  } = useSelector((state) => state.seller);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(get_tranfer({ sellerId: id }));
    dispatch(transation({ sellerId: id }));
  }, [dispatch, id]);
  console.log(
    get_amount,
    totalPending,
    totalSuccess,
    totalCancel,
    pendingItems,
    successItems,
    cencelItems,
    amount_seller
  );
  return (
    <Container maxW="container.xl" py={8}>
      <Heading mb={6}>Transaction Details</Heading>

      {/* Stats Overview */}
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6} mb={8}>
        <Card>
          <CardBody>
            <Stat>
              <StatLabel>ຍອດເງິນທັງໝົດ</StatLabel>
              <StatNumber>
                {amount_seller?.totalSales?.toLocaleString() || 0} ກີບ
              </StatNumber>
            </Stat>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <Stat>
              <StatLabel>ລາຍການດຳເນີນການ</StatLabel>
              <StatNumber color="orange.500">
                {totalPending.toLocaleString() || 0} ກີບ
              </StatNumber>
            </Stat>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <Stat>
              <StatLabel>ລາຍການສຳເລັດ</StatLabel>
              <StatNumber color="green.500">
                {totalSuccess.toLocaleString() || 0} ກີບ
              </StatNumber>
            </Stat>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <Stat>
              <StatLabel>ລາຍການຍົກເລີກ</StatLabel>
              <StatNumber color="red.500">
                {totalCancel.toLocaleString() || 0} ກີບ
              </StatNumber>
            </Stat>
          </CardBody>
        </Card>
      </SimpleGrid>

      {/* Transaction Lists */}
      <SimpleGrid columns={{ base: 1, lg: 3 }} spacing={6}>
        {/* Pending Transactions */}
        <Card>
          <CardHeader>
            <Text size="md">ລາຍການດຳເນີນການ</Text>
          </CardHeader>
          <CardBody>
            <Stack spacing={4}>
              {pendingItems?.map((item, index) => (
                <Box key={index} p={3} bg="orange.50" borderRadius="md">
                  <Text fontWeight="bold">
                    Transaction #{item.code_payments_seller}
                  </Text>
                  <Text>Amount: {item.amount?.toLocaleString()} ກີບ</Text>
                  <Text>ຊື່ທະນາຄານ: {item.bank} </Text>
                  <Text>ຊື່ບັນຊີ: {item.seller_name_bank} </Text>
                  <Text>
                    ເລກບັນຊີທະນາຄານ: {item.seller_account_bank_number}{" "}
                  </Text>
                </Box>
              ))}
            </Stack>
          </CardBody>
        </Card>

        {/* Successful Transactions */}
        <Card>
          <CardHeader>
            <Text size="md">ລາຍການສຳເລັດ</Text>
          </CardHeader>
          <CardBody>
            <Stack spacing={4}>
              {successItems?.map((item, index) => (
                <Box key={index} p={3} bg="green.50" borderRadius="md">
                  <Text fontWeight="bold">
                    Transaction #{item.code_payments_seller}
                  </Text>
                  <Text>Amount: {item.amount?.toLocaleString()} ກີບ</Text>
                </Box>
              ))}
            </Stack>
          </CardBody>
        </Card>

        {/* Cancelled Transactions */}
        <Card>
          <CardHeader>
            <Text size="md">ລາຍການຍົກເລີກ</Text>
          </CardHeader>
          <CardBody>
            <Stack spacing={4}>
              {cencelItems?.map((item, index) => (
                <Box key={index} p={3} bg="red.50" borderRadius="md">
                  <Text fontWeight="bold">
                    Transaction #{item.code_payments_seller}
                  </Text>
                  <Text>Amount: {item.amount?.toLocaleString()} ກີບ</Text>
                </Box>
              ))}
            </Stack>
          </CardBody>
        </Card>
      </SimpleGrid>

      {/* Seller Amount */}
      <Card mt={8}>
        <CardHeader>
          <Heading size="md">Seller Details</Heading>
        </CardHeader>
        <CardBody>
          <Stat>
            <StatLabel>Seller Total Amount</StatLabel>
            <StatNumber>
              {amount_seller?.totalSales?.toLocaleString() || 0} ກີບ
            </StatNumber>
          </Stat>
        </CardBody>
      </Card>
    </Container>
  );
};

export default DetailCheckPayment;
