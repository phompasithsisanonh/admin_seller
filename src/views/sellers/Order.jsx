import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  confirm_payment,
  confirm_payment_delivery,
  get_success_payment,
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
  useToast,
  Spinner,
  Tooltip,
  Tag,
  Center,
  Stack,
} from "@chakra-ui/react";
import { CiMoneyBill } from "react-icons/ci";
import { FcViewDetails } from "react-icons/fc";

const Orders = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const {
    get_success_payments,
    successMessage,
    errorMessage,
    loading,
  } = useSelector((state) => state.seller);
  const { userInfo } = useSelector((state) => state.auth);

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [receiptModalOpen, setReceiptModalOpen] = useState(false);

  // Fetch orders on component mount
  useEffect(() => {
    dispatch(get_success_payment({ sellId: userInfo._id }));
  }, [dispatch, userInfo._id]);

  // Handle toast notifications
  useEffect(() => {
    if (successMessage) {
      toast({
        title: "Success",
        description: successMessage,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      dispatch(messageClear());
    }
    if (errorMessage) {
      toast({
        title: "Error",
        description: errorMessage,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      dispatch(messageClear());
    }
  }, [successMessage, errorMessage, dispatch, toast]);

  // Handle status changes
  const handleStatusChange = (e, id) => {
    const { name, value } = e.target;

    if (!value || value === "Choose") return;

    const action =
      name === "payment_status" ? confirm_payment : confirm_payment_delivery;

    dispatch(action({ id, [name]: value })).then(() =>
      dispatch(get_success_payment({ sellId: userInfo._id }))
    );
  };

  // View order details
  const viewOrderDetails = (order) => {
    setSelectedOrder(order);
    setDetailModalOpen(true);
  };

  // View payment receipt
  const viewPaymentReceipt = (order) => {
    setSelectedOrder(order);
    setReceiptModalOpen(true);
  };

  // Helper to get status color
  const getStatusColor = (status) => {
    if (status === "ຈ່າຍແລ້ວ" || status === "ຈັດສົ່ງສຳເລັດ") return "green";
    if (status === "ລໍຖ້າ" || status === "ຈັດສົ່ງໄປສາຂາ") return "orange";
    if (status === "ກຳລັງຈັດສົ່ງ") return "blue";
    if (status === "ຍົກເລີກຄຳສັ່ງຊື້") return "red";
    return "gray";
  };
  // ຄຳນວນເງິນ
  const CalculateCommition =
    (selectedOrder?.authId?.price * selectedOrder?.authId?.commission) / 100;
  const CalculateTotalreaily =
    selectedOrder?.authId?.price - CalculateCommition;
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
            ຈຳນວນຄຳສັ່ງຊື້: {get_success_payments?.length || 0}
          </Badge>
        </HStack>
      </Flex>

      {loading ? (
        <Center py={10}>
          <Spinner size="xl" />
          <Text ml={3}>ກຳລັງໂຫຼດຂໍ້ມູນ...</Text>
        </Center>
      ) : get_success_payments?.length === 0 ? (
        <Center py={10}>
          <Text fontSize="lg">ບໍ່ມີຄຳສັ່ງຊື້</Text>
        </Center>
      ) : (
        <Box overflow="auto" borderRadius="md" borderWidth="1px">
          <Table variant="simple" colorScheme="gray" size="md">
            <Thead bg="gray.50">
              <Tr>
                <Th fontFamily="Noto Sans Lao, serif">ຊື່ສິນຄ້າ</Th>
                <Th fontFamily="Noto Sans Lao, serif">ໝວດສິນຄ້າ</Th>
                <Th fontFamily="Noto Sans Lao, serif">ລາຄາ</Th>
                <Th fontFamily="Noto Sans Lao, serif">ຈຳນວນ</Th>
                <Th fontFamily="Noto Sans Lao, serif">ຄ່າທຳນຽມລະບົບ</Th>
                <Th fontFamily="Noto Sans Lao, serif">ສະຖານະ</Th>
                <Th fontFamily="Noto Sans Lao, serif">ການຂົນສົ່ງ</Th>
                <Th fontFamily="Noto Sans Lao, serif">ການດຳເນີນການ</Th>
              </Tr>
            </Thead>
            <Tbody>
              {get_success_payments?.map(
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
                            : order.authId.payment_status === "ຍົກເລີກຄຳສັ່ງຊື້"
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
                      <Flex gap={2}>
                        <Tooltip label="ເບິ່ງໃບຮັບເງິນ">
                          <IconButton
                            colorScheme="green"
                            variant="outline"
                            icon={<CiMoneyBill />}
                            size="sm"
                            onClick={() => viewPaymentReceipt(order)}
                          />
                        </Tooltip>
                        <Tooltip label="ລາຍລະອຽດສິນຄ້າ">
                          <IconButton
                            colorScheme="blue"
                            variant="outline"
                            icon={<FcViewDetails />}
                            size="sm"
                            onClick={() => viewOrderDetails(order)}
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
      )}

      {/* Order Details Modal */}
      <Modal
        isOpen={detailModalOpen}
        onClose={() => setDetailModalOpen(false)}
        isCentered
        size="lg"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            bg="blue.50"
            borderTopRadius="md"
            fontFamily="Noto Sans Lao, serif"
          >
            ລາຍລະອຽດຄຳສັ່ງຊື້
            <Badge ml={2} colorScheme="yellow">
              {selectedOrder?.authId?.code_payment}
            </Badge>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box p={4} borderRadius="lg">
              <VStack align="start" spacing={4} width="full">
                {/* Shipping Information */}
                <Box width="full" bg="gray.50" p={3} borderRadius="md">
                  <Text
                    fontWeight="bold"
                    mb={2}
                    fontFamily="Noto Sans Lao, serif"
                  >
                    ທີ່ຢູ່ຈັດສົ່ງ:
                  </Text>
                  <Divider mb={2} />
                  <SimpleInfoRow
                    label="ຊື່ລູກຄ້າ"
                    value={selectedOrder?.detailsId?.shippingInfo?.name}
                  />
                  <SimpleInfoRow
                    label="ທີ່ຢູ່"
                    value={selectedOrder?.detailsId?.shippingInfo?.address}
                  />
                  <SimpleInfoRow
                    label="ແຂວງ"
                    value={selectedOrder?.detailsId?.shippingInfo?.province}
                  />
                  <SimpleInfoRow
                    label="ເມືອງ"
                    value={selectedOrder?.detailsId?.shippingInfo?.city}
                  />
                  <SimpleInfoRow
                    label="ບໍລິສັດຂົນສົ່ງ"
                    value={selectedOrder?.detailsId?.shippingInfo?.transport}
                  />
                  <SimpleInfoRow
                    label="ສາຂາ"
                    value={selectedOrder?.detailsId?.shippingInfo?.branch}
                  />
                  <SimpleInfoRow
                    label="ເບີໂທລະສັບ"
                    value={selectedOrder?.detailsId?.shippingInfo?.phone}
                  />
                  <SimpleInfoRow
                    label="ວັນທີ"
                    value={selectedOrder?.datePayment}
                  />
                </Box>

                {/* Products Information */}
                <Box width="full" bg="gray.50" p={3} borderRadius="md">
                  <Text
                    fontWeight="bold"
                    mb={2}
                    fontFamily="Noto Sans Lao, serif"
                  >
                    ສິນຄ້າ:
                  </Text>
                  <Divider mb={2} />

                  {selectedOrder?.authId?.products?.map((product, index) => (
                    <Box
                      key={index}
                      mb={
                        index < selectedOrder.authId.products.length - 1 ? 3 : 0
                      }
                    >
                      <HStack mb={2}>
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          boxSize="50px"
                          objectFit="cover"
                          borderRadius="md"
                        />
                        <Text fontWeight="semibold">{product.name}</Text>
                      </HStack>
                      <SimpleInfoRow
                        label="ລະຫັດສິນຄ້າ"
                        value={
                          <Badge colorScheme="yellow">
                            {product?.code_products || "N/A"}
                          </Badge>
                        }
                      />
                      <SimpleInfoRow
                        label="ຈຳນວນ"
                        value={`x ${product?.quantity} ລາຍການ`}
                      />
                      <SimpleInfoRow
                        label="ລາຄາ"
                        value={`${product?.price?.toLocaleString()} ກີບ`}
                      />
                      <SimpleInfoRow
                        label="ສ່ວນຫຼຸດ"
                        value={`${product?.discount?.toLocaleString() || 0} %`}
                      />
                      {index < selectedOrder.authId.products.length - 1 && (
                        <Divider my={2} />
                      )}
                    </Box>
                  ))}
                </Box>
                  <Badge colorScheme="red">ກະລຸນາລໍຖ້າຢືນຢັ້ນສະຖານະການໂອນເງິນຈາກ ແອດມິນ ກ່ອນຈັດທຳການຂົນສົ່ງສິນຄ້າ ຂໍຂອບໃຈ</Badge>
                {/* Total Information */}
                <Box
                  width="full"
                  bg="blue.50"
                  p={3}
                  borderRadius="md"
                  borderWidth="1px"
                  borderColor="blue.200"
                >
                  <Flex justify="space-between" align="center">
                    <Text>ຄ່າທຳນຽມລະບົບ</Text>
                    <Text fontWeight="bold" fontSize="xl" color="red">
                      {!isNaN(CalculateCommition)
                        ? CalculateCommition.toLocaleString()
                        : "0"}{" "}
                      ກີບ
                    </Text>
                  </Flex>

                  <Flex justify="space-between" align="center">
                    <Text fontWeight="bold" fontFamily="Noto Sans Lao, serif">
                      ລາຄາລວມຕ້ອງຈ່າຍ:
                    </Text>
                    <Text fontWeight="bold" fontSize="xl" color="blue.700">
                      {!isNaN(CalculateTotalreaily)
                        ? CalculateTotalreaily.toLocaleString()
                        : "0"}{" "}
                      ກີບ
                    </Text>
                  </Flex>
                </Box>
              </VStack>
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button onClick={() => setDetailModalOpen(false)}>ປິດ</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Payment Receipt Modal */}
      <Modal
        isOpen={receiptModalOpen}
        onClose={() => setReceiptModalOpen(false)}
        isCentered
        size="md"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            bg="green.50"
            borderTopRadius="md"
            fontFamily="Noto Sans Lao, serif"
          >
            ໃບແຈ້ງຫຼັກຖານການໂອນເງິນ
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box p={4} borderRadius="lg">
              <VStack align="center" spacing={4} width="full">
                <Image
                  src={selectedOrder?.images}
                  alt="ໃບຮັບເງິນ"
                  maxH="400px"
                  objectFit="contain"
                  borderRadius="md"
                  border="1px solid"
                  borderColor="gray.200"
                />
                <Box width="full" bg="gray.50" p={3} borderRadius="md">
                  <SimpleInfoRow label="ຊຳລະຜ່ານ" value="BCEL" />
                  <SimpleInfoRow
                    label="ວັນທີ່ຊຳລະເງິນ"
                    value={selectedOrder?.datePayment}
                  />
                  <SimpleInfoRow
                    label="ຈຳນວນເງິນ"
                    value={`${selectedOrder?.authId?.price?.toLocaleString()} ກີບ`}
                  />
                  <SimpleInfoRow
                    label="ສະຖານະການຊຳລະ"
                    value={
                      <Badge
                        colorScheme={getStatusColor(
                          selectedOrder?.authId?.payment_status
                        )}
                      >
                        {selectedOrder?.authId?.payment_status}
                      </Badge>
                    }
                  />
                </Box>
              </VStack>
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button onClick={() => setReceiptModalOpen(false)}>ປິດ</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

// Helper component for displaying info rows
const SimpleInfoRow = ({ label, value }) => (
  <HStack justify="space-between" mb={1}>
    <Text fontFamily="Noto Sans Lao, serif">{label}:</Text>
    <Box>{value}</Box>
  </HStack>
);

export default Orders;
