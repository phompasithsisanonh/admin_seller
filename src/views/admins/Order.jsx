import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  confirm_payment,
  confirm_payment_delivery,
  messageClear,
} from "../../store/Reducers/sellerReducer";
import {
  Badge,
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  IconButton,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
  useColorModeValue,
  Card,
  CardHeader,
  CardBody,
  Heading,
  Stack,
  Tag,
  Tooltip,
} from "@chakra-ui/react";
import { FiEye, FiDollarSign } from "react-icons/fi";
import toast from "react-hot-toast";
import { get_order_to_admin } from "../../store/Reducers/authReducer";

const Order = () => {
  const { get_order_to_admins } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { successMessage, errorMessage } = useSelector(
    (state) => state.seller
  );
  const { userInfo } = useSelector((state) => state.auth);
  console.log(get_order_to_admins);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const bg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const headerBg = useColorModeValue("gray.50", "gray.700");

  useEffect(() => {
    dispatch(get_order_to_admin());
  }, [dispatch, userInfo._id]);

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

  const handleStatusChange = (e, id) => {
    const { name, value } = e.target;
    const action =
      name === "payment_status" ? confirm_payment : confirm_payment_delivery;
    dispatch(action({ id, [name]: value })).then(() =>
      dispatch(get_order_to_admin())
    );
  };

  const handleOpenDetails = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleOpenReceipt = (order) => {
    setSelectedOrder(order);
    setIsReceiptModalOpen(true);
  };

  return (
    <Box bg="white" borderRadius="md" shadow="md" p={5}>
      <Flex justify="space-between" align="center" mb={5}>
        <Text
          fontSize="2xl"
          fontWeight="bold"
          fontFamily="Noto Sans Lao, serif"
        >
          ຄຳສັ່ງຊື້
        </Text>
        <HStack>
          <Badge colorScheme="green" p={2} borderRadius="md">
            ຈຳນວນຄຳສັ່ງຊື້: {get_order_to_admins?.length || 0}
          </Badge>
        </HStack>
      </Flex>
      <Card
        bg={bg}
        boxShadow="md"
        borderRadius="lg"
        borderWidth="1px"
        borderColor={borderColor}
        overflow="hidden"
      >
        <CardHeader bg={headerBg} py={4}></CardHeader>
        <CardBody p={0}>
          <Box overflowX="auto">
            <Table variant="simple" size="md">
              <Thead bg={headerBg}>
                <Tr>
                  <Th fontFamily="Noto Sans Lao, serif">ລະຫັດຜູ້ຂາຍ</Th>
                  <Th fontFamily="Noto Sans Lao, serif">ຊື່ສິນຄ້າ</Th>
                  <Th fontFamily="Noto Sans Lao, serif">ໝວດສິນຄ້າ</Th>
                  <Th fontFamily="Noto Sans Lao, serif">ລາຄາ</Th>
                  <Th fontFamily="Noto Sans Lao, serif">ຄ່າທຳນຽມ %</Th>
                  <Th fontFamily="Noto Sans Lao, serif">ສະຖານະຈ່າຍເງິນ</Th>
                  <Th fontFamily="Noto Sans Lao, serif">ສະຖານະຂົນສົ່ງ</Th>
                  <Th fontFamily="Noto Sans Lao, serif">ອັບເດດສະຖານະ</Th>
                  <Th fontFamily="Noto Sans Lao, serif" textAlign="center">
                    ຈັດການ
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {get_order_to_admins?.map(
                  (order) => (
                    // order.authId.products[0].map((product) => (
                    <Tr
                      key={order.authId.products._id}
                      _hover={{ bg: "gray.50" }}
                    >
                      <Td>
                        <HStack>
                          <Image
                            src={order.authId.products[0].images[0]}
                            alt={order.authId.products[0].name}
                            boxSize="40px"
                            objectFit="cover"
                            borderRadius="md"
                            mr={2}
                          />
                          <Text fontWeight="medium">
                            {order.authId.products[0].code_products}
                          </Text>
                        </HStack>
                      </Td>
                      <Td>{order.authId.products[0].name}</Td>
                      <Td>
                        <Tag colorScheme="blue" size="sm">
                          {order.authId.products[0].category}
                        </Tag>
                      </Td>
                      <Td fontWeight="semibold">{`${order.authId.products[0].price.toLocaleString()} ກີບ`}</Td>
                      <Td fontWeight="semibold">{`${
                        order.authId.commission || 0
                      } %`}</Td>
                      <Td>
                        <Badge
                          colorScheme={
                            order.authId.payment_status === "ຈ່າຍແລ້ວ"
                              ? "green"
                              : order.authId.payment_status ===
                                "ຍົກເລີກຄຳສັ່ງຊື້"
                              ? "red"
                              : "yellow"
                          }
                          px={2}
                          py={1}
                          borderRadius="full"
                        >
                          {order.authId.payment_status}
                        </Badge>
                      </Td>
                      <Td>
                        <Badge
                          colorScheme={
                            order.authId.delivery_status === "ຈັດສົ່ງສຳເລັດ"
                              ? "green"
                              : order.authId.delivery_status === "ກຳລັງຈັດສົ່ງ"
                              ? "blue"
                              : "orange"
                          }
                          px={2}
                          py={1}
                          borderRadius="full"
                        >
                          {order.authId.delivery_status}
                        </Badge>
                      </Td>
                      <Td>
                        <Stack spacing={2}>
                          <Select
                            name="payment_status"
                            isDisabled={
                              order.authId.payment_status === "ຈ່າຍແລ້ວ" ||
                              order.authId.payment_status === "ຍົກເລີກຄຳສັ່ງຊື້"
                            }
                            onChange={(e) =>
                              handleStatusChange(e, order.authId._id)
                            }
                            size="sm"
                            borderRadius="md"
                            placeholder="ສະຖານະການຈ່າຍເງິນ"
                          >
                            <option value="ຈ່າຍແລ້ວ">ຈ່າຍແລ້ວ</option>
                            <option value="ຍົກເລີກຄຳສັ່ງຊື້">
                              ຍົກເລີກຄຳສັ່ງຊື້
                            </option>
                          </Select>
                          <Select
                            name="delivery_status"
                            onChange={(e) =>
                              handleStatusChange(e, order.authId._id)
                            }
                            size="sm"
                            borderRadius="md"
                            placeholder="ສະຖານະການຂົນສົ່ງ"
                          >
                            <option value="ຈັດສົ່ງໄປສາຂາ">ຈັດສົ່ງໄປສາຂາ</option>
                            <option value="ກຳລັງຈັດສົ່ງ">ກຳລັງຈັດສົ່ງ</option>
                            <option value="ຈັດສົ່ງສຳເລັດ">ຈັດສົ່ງສຳເລັດ</option>
                          </Select>
                        </Stack>
                      </Td>
                      <Td>
                        <Flex justifyContent="center" gap={2}>
                          <Tooltip
                            label="ໃບແຈ້ງຫຼັກຖານການໂອນເງິນ"
                            placement="top"
                          >
                            <IconButton
                              icon={<FiDollarSign />}
                              colorScheme="green"
                              variant="outline"
                              size="sm"
                              onClick={() => handleOpenReceipt(order)}
                              aria-label="View receipt"
                            />
                          </Tooltip>
                          <Tooltip label="ລາຍລະອຽດສິນຄ້າ" placement="top">
                            <IconButton
                              icon={<FiEye />}
                              colorScheme="blue"
                              variant="outline"
                              size="sm"
                              onClick={() => handleOpenDetails(order)}
                              aria-label="View details"
                            />
                          </Tooltip>
                        </Flex>
                      </Td>
                    </Tr>
                  )
                  // ))
                )}
              </Tbody>
            </Table>
          </Box>
        </CardBody>
      </Card>

      {/* Order Details Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        isCentered
        size="lg"
        scrollBehavior="inside"
      >
        <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
        <ModalContent borderRadius="lg">
          <ModalHeader
            bg={headerBg}
            borderTopRadius="lg"
            fontFamily="Noto Sans Lao, serif"
          >
            ລາຍລະອຽດສິນຄ້າ
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody p={0}>
            <Box p={6}>
              <VStack align="start" spacing={4}>
                <Card w="full" variant="outline">
                  <CardHeader bg={headerBg} py={3}>
                    <Heading size="sm" fontFamily="Noto Sans Lao, serif">
                      ທີ່ຢູ່ຈັດສົ່ງ
                    </Heading>
                  </CardHeader>
                  <CardBody>
                    <HStack justify="space-between" mb={2}>
                      <Text fontWeight="medium">ລະຫັດສັ່ງຊື້:</Text>
                      <Badge colorScheme="yellow" px={2} py={1}>
                        {selectedOrder?.authId?.code_payment}
                      </Badge>
                    </HStack>
                    <Grid columns={2} spacing={2}>
                      <GridItem
                        label="ຊື່ລູກຄ້າ"
                        value={selectedOrder?.detailsId?.shippingInfo?.name}
                      />
                      <GridItem
                        label="ທີ່ຢູ່"
                        value={selectedOrder?.detailsId?.shippingInfo?.address}
                      />
                      <GridItem
                        label="ແຂວງ"
                        value={selectedOrder?.detailsId?.shippingInfo?.province}
                      />
                      <GridItem
                        label="ເມືອງ"
                        value={selectedOrder?.detailsId?.shippingInfo?.city}
                      />
                      <GridItem
                        label="ບໍລິສັດຂົນສົ່ງ"
                        value={
                          selectedOrder?.detailsId?.shippingInfo?.transport
                        }
                      />
                      <GridItem
                        label="ສາຂາ"
                        value={selectedOrder?.detailsId?.shippingInfo?.branch}
                      />
                      <GridItem
                        label="ເບີໂທລະສັບ"
                        value={selectedOrder?.detailsId?.shippingInfo?.phone}
                      />
                      <GridItem
                        label="ວັນທີ"
                        value={selectedOrder?.datePayment}
                      />
                    </Grid>
                  </CardBody>
                </Card>

                <Card w="full" variant="outline">
                  <CardHeader bg={headerBg} py={3}>
                    <Heading size="sm" fontFamily="Noto Sans Lao, serif">
                      ສິນຄ້າ
                    </Heading>
                  </CardHeader>
                  <CardBody>
                    {selectedOrder?.authId?.products?.map((product, index) => (
                      <Box
                        key={index}
                        mb={
                          index < selectedOrder?.authId?.products.length - 1
                            ? 4
                            : 0
                        }
                      >
                        <HStack spacing={4} mb={2}>
                          <Image
                            src={product.images && product.images[0]}
                            alt={product.name}
                            boxSize="60px"
                            objectFit="cover"
                            borderRadius="md"
                          />
                          <VStack align="start" spacing={0}>
                            <Badge colorScheme="yellow">
                              {product?.code_products}
                            </Badge>
                            <Text fontWeight="semibold">{product?.name}</Text>
                          </VStack>
                        </HStack>
                        <Grid columns={2} spacing={2}>
                          <GridItem
                            label="ຈຳນວນສິນຄ້າ"
                            value={`${product?.quantity} ລາຍການ`}
                          />
                          <GridItem
                            label="ລາຄາ"
                            value={`${product?.price?.toLocaleString()} ກີບ`}
                          />
                          <GridItem
                            label="ສ່ວນຫຼຸດ"
                            value={`${product?.discount?.toLocaleString()} %`}
                          />
                          <GridItem
                            label="ລະຫັດສ່ວນຫຼຸດທີ່ນຳໃຊ້"
                            value={`${selectedOrder?.authId?.couponCode}`}
                          />
                        </Grid>
                        {index < selectedOrder?.authId?.products.length - 1 && (
                          <Divider my={4} />
                        )}
                      </Box>
                    ))}
                  </CardBody>
                </Card>
              </VStack>
              <Flex
                justify="space-between"
                align="center"
                mt={6}
                p={4}
                bg={headerBg}
                borderRadius="md"
              >
                <Text
                  fontWeight="bold"
                  fontSize="lg"
                  fontFamily="Noto Sans Lao, serif"
                >
                  ລາຄາລວມຕ້ອງຈ່າຍ:
                </Text>
                <Text fontWeight="bold" fontSize="lg" color="green.500">
                  {selectedOrder?.authId?.price?.toLocaleString()} ກີບ
                </Text>
              </Flex>
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={() => setIsModalOpen(false)}>
              ປິດ
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Payment Receipt Modal */}
      <Modal
        isOpen={isReceiptModalOpen}
        onClose={() => setIsReceiptModalOpen(false)}
        isCentered
        size="md"
      >
        <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
        <ModalContent borderRadius="lg">
          <ModalHeader
            bg={headerBg}
            borderTopRadius="lg"
            fontFamily="Noto Sans Lao, serif"
          >
            ໃບແຈ້ງຫຼັກຖານການໂອນເງິນ
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={6} align="center">
              <Box
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                boxShadow="md"
                w="full"
              >
                <Image
                  src={selectedOrder?.images}
                  alt="Payment receipt"
                  w="full"
                  objectFit="cover"
                />
              </Box>

              <Card w="full" variant="outline">
                <CardBody>
                  <Grid columns={2} spacing={3}>
                    <GridItem label="ຊຳລະຜ່ານ" value="BCEL" />
                    <GridItem
                      label="ວັນທີ່ຊຳລະເງິນ"
                      value={selectedOrder?.datePayment}
                    />
                    <GridItem
                      label="ສະຖານະ"
                      value={
                        <Badge
                          colorScheme={
                            selectedOrder?.authId?.payment_status === "ຈ່າຍແລ້ວ"
                              ? "green"
                              : "yellow"
                          }
                          px={2}
                          py={1}
                        >
                          {selectedOrder?.authId?.payment_status}
                        </Badge>
                      }
                    />
                  </Grid>
                </CardBody>
              </Card>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              onClick={() => setIsReceiptModalOpen(false)}
            >
              ປິດ
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

// Helper component for grid display
const Grid = ({ children, columns = 2, spacing = 3 }) => {
  return (
    <Box
      display="grid"
      gridTemplateColumns={`repeat(${columns}, 1fr)`}
      gap={spacing}
    >
      {children}
    </Box>
  );
};

// Helper component for grid items
const GridItem = ({ label, value }) => {
  return (
    <HStack justify="space-between">
      <Text color="gray.600">{label}:</Text>
      <Box textAlign="right">
        {React.isValidElement(value) ? (
          value
        ) : (
          <Text fontWeight="medium">{value}</Text>
        )}
      </Box>
    </HStack>
  );
};

export default Order;
