import React, { useEffect, useState } from "react";
import {
  get_seller,
  seller_status_update,
  statusVerify,
} from "../../store/Reducers/sellerReducer";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  Box,
  Flex,
  Heading,
  Image,
  Text,
  Select,
  Button,
  FormControl,
  Badge,
  useColorModeValue,
  Card,
  CardHeader,
  CardBody,
  Divider,
  Icon,
  Grid,
  GridItem,
  Skeleton,
  Alert,
  AlertIcon,
  VStack,
  useToast,
  Textarea,

} from "@chakra-ui/react";
import { messageClear } from "../../store/Reducers/categoryReducer";
import { MdOutlineStore, MdLocationOn, MdPerson, MdVerifiedUser } from "react-icons/md";
import { FaIdCard } from "react-icons/fa";
import { MdCheckCircle, MdError } from "react-icons/md";
const SellerDetails = () => {
  const dispatch = useDispatch();
  const { seller, successMessage, loading } = useSelector(
    (state) => state.seller
  );

  const [status, setStatus] = useState("");
  const [statusverified, setStatusverified] = useState("");
  const [rejectionReason, setRejectionReason] = useState("");
  const { sellerId } = useParams();
  const toast = useToast();

  // Colors
  const cardBg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.800", "white");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const badgeBg = useColorModeValue("gray.100", "gray.700");
  const labelColor = useColorModeValue("gray.600", "gray.300");
  // Status badge colors
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "active":
        return "green";
      case "deactive":
        return "red";
      case "pending":
        return "yellow";
      default:
        return "gray";
    }
  };
  const getStatusverify = (status) => {
    switch (status?.toLowerCase()) {
      case "verified":
        return "green";
      case "reject":
        return "red";
      case "under_review":
        return "yellow";
      default:
        return "gray";
    }
  };
  // Payment badge colors
  const getPaymentColor = (payment) => {
    switch (payment?.toLowerCase()) {
      case "paid":
        return "green";
      case "pending":
        return "yellow";
      case "failed":
        return "red";
      default:
        return "gray";
    }
  };

  // Handle status update
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!status) {
      toast({
        title: "Please select a status",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    dispatch(
      seller_status_update({
        sellerId,
        status,
      })
    );
  };
  const handleVerify = () => {
    dispatch(
      statusVerify({
        sellerId: sellerId,
        statusverified: statusverified,
        rejectionReason: rejectionReason,
      })
    );
    toast({
      title: "ສຳເລັດ",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };
  // Fetch seller data
  useEffect(() => {
    dispatch(
      get_seller({
        sellerId: sellerId,
      })
    );
  }, [dispatch, sellerId]);

  // Update status when seller data is loaded
  useEffect(() => {
    if (seller) {
      setStatus(seller.status || "");
    }
  }, [seller]);

  // Show success message
  useEffect(() => {
    if (successMessage) {
      toast({
        title: successMessage,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      dispatch(messageClear());
    }
  }, [successMessage, dispatch, toast]);

  return (
    <Box px={{ base: 4, md: 8 }} py={6}>
      <Flex align="center" mb={6}>
        <Icon as={FaIdCard} fontSize="xl" mr={2} />
        <Heading as="h1" size="lg" fontFamily="Noto Sans Lao, serif">
          ຂໍ້ມູນລາຍລະອຽດຜູ້ຂາຍ
        </Heading>
      </Flex>

      {loading ? (
        <VStack spacing={4} align="stretch">
          <Skeleton height="300px" />
          <Skeleton height="200px" />
        </VStack>
      ) : !seller ? (
        <Alert status="error">
          <AlertIcon />
          ບໍ່ພົບຂໍ້ມູນຜູ້ຂາຍ
        </Alert>
      ) : (
        <Card
          bg={cardBg}
          shadow="md"
          borderRadius="lg"
          borderWidth="1px"
          borderColor={borderColor}
        >
          <CardBody p={6}>
            <Grid
              templateColumns={{ base: "1fr", md: "250px 1fr 1fr" }}
              gap={6}
            >
              {/* Seller Image */}
              <GridItem>
                <VStack align="center" spacing={4}>
                  <Box
                    width="230px"
                    height="230px"
                    borderRadius="md"
                    overflow="hidden"
                    borderWidth="1px"
                    borderColor={borderColor}
                  >
                    {seller?.image ? (
                      <Image
                        width="full"
                        height="full"
                        objectFit="cover"
                        src={seller.image}
                        alt={seller.name}
                        fallback={<Skeleton width="230px" height="230px" />}
                      />
                    ) : (
                      <Flex
                        width="full"
                        height="full"
                        bg={badgeBg}
                        align="center"
                        justify="center"
                      >
                        <Text color="gray.500">ບໍ່ມີຮູບພາບ</Text>
                      </Flex>
                    )}
                  </Box>
                  <Badge
                    colorScheme={getStatusColor(seller.status)}
                    fontSize="md"
                    px={3}
                    py={1}
                    borderRadius="full"
                  >
                    {seller.status}
                  </Badge>
                </VStack>
              </GridItem>

              {/* Basic Information */}
              <GridItem>
                <Card variant="outline" height="full" borderColor={borderColor}>
                  <CardHeader pb={2}>
                    <Flex align="center">
                      <Icon as={MdPerson} mr={2} />
                      <Text
                        fontWeight="bold"
                        fontSize="lg"
                        color={textColor}
                        fontFamily="Noto Sans Lao, serif"
                      >
                        ຂໍ້ມູນພື້ນຖານ
                      </Text>
                    </Flex>
                  </CardHeader>
                  <Divider />
                  <CardBody py={4}>
                    <VStack spacing={3} align="stretch">
                      <Flex>
                        <Text
                          fontWeight="semibold"
                          width="130px"
                          color={textColor}
                        >
                          ລະຫັດຜູ້ຂາຍ:
                        </Text>
                        <Badge colorScheme="red" fontSize="sm">
                          {seller?.seller_code}
                        </Badge>
                      </Flex>
                      <Flex>
                        <Text
                          fontWeight="semibold"
                          width="130px"
                          color={textColor}
                        >
                          ຊື່ ແລະ ນາມສະກຸນ:
                        </Text>
                        <Text color={textColor}>{seller?.name}</Text>
                      </Flex>
                      <Flex>
                        <Text
                          fontWeight="semibold"
                          width="130px"
                          color={textColor}
                        >
                          ອິເມວ:
                        </Text>
                        <Text color={textColor}>{seller?.email}</Text>
                      </Flex>
                      <Flex>
                        <Text
                          fontWeight="semibold"
                          width="130px"
                          color={textColor}
                        >
                          ສິດໃຊ້ງານ:
                        </Text>
                        <Badge colorScheme="purple">{seller?.role}</Badge>
                      </Flex>
                      <Flex>
                        <Text
                          fontWeight="semibold"
                          width="130px"
                          color={textColor}
                        >
                          ສະຖານະຊໍາລະ:
                        </Text>
                        <Badge colorScheme={getPaymentColor(seller?.payment)}>
                          {seller?.payment}
                        </Badge>
                      </Flex>
                    </VStack>
                  </CardBody>
                </Card>
              </GridItem>

              {/* Address Information */}
              <GridItem>
                <Card variant="outline" height="full" borderColor={borderColor}>
                  <CardHeader pb={2}>
                    <Flex align="center">
                      <Icon as={MdLocationOn} mr={2} />
                      <Text
                        fontWeight="bold"
                        fontSize="lg"
                        color={textColor}
                        fontFamily="Noto Sans Lao, serif"
                      >
                        ທີ່ຢູ່ຜູ້ຂາຍ
                      </Text>
                    </Flex>
                  </CardHeader>
                  <Divider />
                  <CardBody py={4}>
                    <VStack spacing={3} align="stretch">
                      <Flex>
                        <Text
                          fontWeight="semibold"
                          width="130px"
                          color={textColor}
                        >
                          ຊື່ຮ້ານຄ້າ:
                        </Text>
                        <Flex align="center">
                          <Icon as={MdOutlineStore} mr={1} color="blue.500" />
                          <Text color={textColor}>
                            {seller?.shopInfo?.shopName || "-"}
                          </Text>
                        </Flex>
                      </Flex>
                      <Flex>
                        <Text
                          fontWeight="semibold"
                          width="130px"
                          color={textColor}
                        >
                          Division:
                        </Text>
                        <Text color={textColor}>
                          {seller?.shopInfo?.division || "-"}
                        </Text>
                      </Flex>
                      <Flex>
                        <Text
                          fontWeight="semibold"
                          width="130px"
                          color={textColor}
                        >
                          District:
                        </Text>
                        <Text color={textColor}>
                          {seller?.shopInfo?.district || "-"}
                        </Text>
                      </Flex>
                      <Flex>
                        <Text
                          fontWeight="semibold"
                          width="130px"
                          color={textColor}
                        >
                          State:
                        </Text>
                        <Text color={textColor}>
                          {seller?.shopInfo?.sub_district || "-"}
                        </Text>
                      </Flex>
                    </VStack>
                  </CardBody>
                </Card>
              </GridItem>
            </Grid>
            {/* verify */}
            <Grid
              templateColumns={{ base: "1fr", md: "550px 1fr 1fr" }}
              gap={6}
              p={4}
            >
              <GridItem>
                <Card
                  variant="outline"
                  height="full"
                  borderColor={borderColor}
                  borderRadius="xl"
                  shadow="md"
                  transition="all 0.3s"
                  _hover={{
                    shadow: "lg",
                    transform: "translateY(-4px)",
                  }}
                >
                  <CardHeader
                    pb={2}
                    bgGradient="linear(to-r, blue.50, purple.50)"
                    borderTopRadius="xl"
                  >
                    <Flex align="center" justify="space-between">
                      <Flex align="center">
                        <Icon
                          as={MdVerifiedUser}
                          mr={2}
                          color="blue.500"
                          boxSize={6}
                        />
                        <Text
                          fontWeight="bold"
                          fontSize="xl"
                          color={textColor}
                          fontFamily="Noto Sans Lao, serif"
                        >
                          ຂໍ້ມູນຫຼັກຖານການຢືນຢັ້ນຕົວຕົນ
                        </Text>
                      </Flex>
                      {seller?.kyc?.status && (
                        <Badge
                          colorScheme={getStatusverify(seller.kyc.status)}
                          variant="subtle"
                          px={2}
                          py={1}
                          borderRadius="full"
                        >
                          {seller.kyc.status}
                        </Badge>
                      )}
                    </Flex>
                  </CardHeader>

                  <Divider borderColor={borderColor} />

                  <CardBody py={6}>
                    <VStack spacing={4} align="stretch">
                      {/* ID Card/Passport */}
                      <Flex
                        align="center"
                        _hover={{ bg: "gray.50" }}
                        p={2}
                        borderRadius="md"
                      >
                        <Text
                          fontWeight="semibold"
                          width="140px"
                          color={labelColor}
                          fontSize="sm"
                        >
                          ບັດປະຈຳຕົວ ຫຼື ພາສປອດ:
                        </Text>
                        <Flex align="center" flex={1}>
                          <Icon as={MdOutlineStore} mr={2} color="blue.500" />
                          {seller?.kyc?.idCard ? (
                            <Image
                              src={seller.kyc.idCard}
                              alt="ID Card"
                              maxH="100px"
                              objectFit="cover"
                              borderRadius="md"
                              border="1px solid"
                              borderColor={borderColor}
                            />
                          ) : (
                            <Text color="gray.500">-</Text>
                          )}
                        </Flex>
                      </Flex>

                      {/* Business License */}
                      <Flex
                        align="center"
                        _hover={{ bg: "gray.50" }}
                        p={2}
                        borderRadius="md"
                      >
                        <Text
                          fontWeight="semibold"
                          width="140px"
                          color={labelColor}
                          fontSize="sm"
                        >
                          ໃບອະນຸຍາດທຸລະກິດ:
                        </Text>
                        {seller?.kyc?.businessLicense ? (
                          <Image
                            src={seller.kyc.businessLicense}
                            alt="Business License"
                            maxH="100px"
                            objectFit="cover"
                            borderRadius="md"
                            border="1px solid"
                            borderColor={borderColor}
                          />
                        ) : (
                          <Text color="gray.500">-</Text>
                        )}
                      </Flex>

                      {/* Address Proof */}
                      <Flex
                        align="center"
                        _hover={{ bg: "gray.50" }}
                        p={2}
                        borderRadius="md"
                      >
                        <Text
                          fontWeight="semibold"
                          width="140px"
                          color={labelColor}
                          fontSize="sm"
                        >
                          ຫຼັກຖານທີ່ຢູ່:
                        </Text>
                        {seller?.kyc?.addressProof ? (
                          <Image
                            src={seller.kyc.addressProof}
                            alt="Address Proof"
                            maxH="100px"
                            objectFit="cover"
                            borderRadius="md"
                            border="1px solid"
                            borderColor={borderColor}
                          />
                        ) : (
                          <Text color="gray.500">-</Text>
                        )}
                      </Flex>

                      {/* Status */}
                      <Flex align="center" p={2}>
                        <Text
                          fontWeight="semibold"
                          width="140px"
                          color={labelColor}
                          fontSize="sm"
                        >
                          ສະຖານະ:
                        </Text>
                        <Flex align="center">
                          {seller?.kyc?.status && (
                            <Icon
                              as={
                                seller.kyc.status === "approved"
                                  ? MdCheckCircle
                                  : MdError
                              }
                              color={
                                getStatusverify(seller.kyc.status) + ".500"
                              }
                              mr={2}
                            />
                          )}
                          <Text color={textColor}>
                            {seller?.kyc?.status || "-"}
                          </Text>
                        </Flex>
                      </Flex>

                      {/* Rejection Reason */}
                      <Flex align="center" p={2}>
                        <Text
                          fontWeight="semibold"
                          width="140px"
                          color={labelColor}
                          fontSize="sm"
                        >
                          ເຫດຜົນປະຕິເສດ:
                        </Text>
                        <Text
                          color={textColor}
                          fontStyle={
                            seller?.kyc?.rejectionReason ? "normal" : "italic"
                          }
                        >
                          {seller?.kyc?.rejectionReason || "-"}
                        </Text>
                      </Flex>

                      {/* Submitted At */}
                      <Flex align="center" p={2}>
                        <Text
                          fontWeight="semibold"
                          width="140px"
                          color={labelColor}
                          fontSize="sm"
                        >
                          ວັນທີ່ຍື່ນ:
                        </Text>
                        <Text color={textColor}>
                          {seller?.kyc?.submittedAt
                            ? new Date(
                                seller.kyc.submittedAt
                              ).toLocaleDateString()
                            : "-"}
                        </Text>
                      </Flex>
                    </VStack>
                  </CardBody>
                </Card>
              </GridItem>
            </Grid>
            {/* Status Update Form */}
            <Box mt={8} pt={5} borderTopWidth="1px" borderColor={borderColor}>
              <form onSubmit={handleSubmit}>
                <Flex
                  gap={4}
                  direction={{ base: "column", sm: "row" }}
                  align={{ base: "stretch", sm: "center" }}
                >
                  <FormControl maxW={{ base: "full", sm: "300px" }}>
                    <Select
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      placeholder="--Select Status--"
                      bg={cardBg}
                      color={textColor}
                      borderColor={borderColor}
                      _focus={{ borderColor: "blue.500" }}
                      required
                    >
                      <option value="active">Active</option>
                      <option value="deactive">Deactive</option>
                      <option value="pending">Pending</option>
                    </Select>
                  </FormControl>
                  <Button
                    type="submit"
                    colorScheme="red"
                    isLoading={loading}
                    loadingText="Submitting"
                    width={{ base: "full", sm: "auto" }}
                  >
                    ປັບປຸງສະຖານະ
                  </Button>
                </Flex>
              </form>
            </Box>

            {/* Status Update Form */}
            <Box mt={8} pt={5} borderTopWidth="1px" borderColor={borderColor}>
              <form onSubmit={handleVerify}>
                <Flex
                  gap={4}
                  direction={{ base: "column", sm: "row" }}
                  align={{ base: "stretch", sm: "center" }}
                >
                  <FormControl maxW={{ base: "full", sm: "300px" }}>
                    <Select
                      value={statusverified}
                      onChange={(e) => setStatusverified(e.target.value)}
                      placeholder="--Select Status--"
                      bg={cardBg}
                      color={textColor}
                      borderColor={borderColor}
                      _focus={{ borderColor: "blue.500" }}
                      required
                    >
                      <option value="verified">verified</option>
                      <option value="reject">reject</option>
                      <option value="under_review">under_review</option>
                    </Select>
                    <FormControl
                      paddingBottom={"30px"}
                      direction={{ base: "column", sm: "column" }}
                      paddingTop={"30px"}
                    >
                      <label>ໝາຍເຫດ:</label>
                      <Textarea
                        width={"700"}
                        height={"20"}
                        value={rejectionReason}
                        onChange={(e) => setRejectionReason(e.target.value)}
                      />
                    </FormControl>
                    <Button
                      type="submit"
                      colorScheme="red"
                      isLoading={loading}
                      loadingText="Submitting"
                      width={{ base: "full", sm: "auto" }}
                    >
                      ຢືນຢັນຕົວຕົນ
                    </Button>
                  </FormControl>
                </Flex>
              </form>
            </Box>
          </CardBody>
        </Card>
      )}
    </Box>
  );
};

export default SellerDetails;
