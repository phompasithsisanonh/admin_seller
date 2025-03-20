import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Heading,
  Badge,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  useToast,
  Switch,
  Text,
  VStack,
  HStack,
  Divider,
  Tag,
  TagLabel,
  TagCloseButton,
  FormHelperText,
  IconButton,
  useColorModeValue,
  Spinner,
} from "@chakra-ui/react";
import { AddIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { get_category } from "../../store/Reducers/categoryReducer";
import { useDispatch, useSelector } from "react-redux";
import { get_products_admin_seller } from "../../store/Reducers/productReducer";
import {
  coupon_add,
  coupon_edit,
  coupon_get,
} from "../../store/Reducers/couponReducer";
// Mock data for demonstration

// Mock categories data

const Coupon = () => {
  const [coupons, setCoupons] = useState([]);
  const { categorys } = useSelector((state) => state.category);
  const { banners } = useSelector((state) => state.product);
  const { get_coupon, loader } = useSelector((state) => state.coupon);
  const page = 1;
  const searchValue = "";
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(get_products_admin_seller());
  }, [dispatch]);
  useEffect(() => {
    dispatch(
      get_category({
        page,
        searchValue,
      })
    );
  }, [dispatch]);
  const [currentCoupon, setCurrentCoupon] = useState({
    code: "", // 🔹 รหัสคูปอง เช่น 'DISCOUNT50'
    type: "percentage", // 🔹 ประเภทของคูปอง ('percentage' = ลดเป็นเปอร์เซ็นต์, 'fixed' = ลดเป็นจำนวนเงิน)
    value: 0, // 🔹 มูลค่าส่วนลด (เช่น 10% หรือ 100 บาท)
    minPurchase: 0, // 🔹 ยอดซื้อขั้นต่ำที่ใช้คูปองได้ (เช่น ต้องซื้อขั้นต่ำ 500 บาท)
    maxDiscount: null, // 🔹 จำนวนเงินลดสูงสุดที่ใช้ได้ (เช่น ลดได้สูงสุด 200 บาท)
    startDate: "", // 🔹 วันเริ่มต้นที่คูปองสามารถใช้ได้ (เช่น '2024-03-01')
    endDate: "", // 🔹 วันหมดอายุของคูปอง (เช่น '2024-03-31')
    status: "active", // 🔹 สถานะของคูปอง ('active' = ใช้งานได้, 'expired' = หมดอายุ, 'disabled' = ปิดใช้งาน)
    usageLimit: 0, // 🔹 จำนวนครั้งที่คูปองสามารถใช้ได้ทั้งหมด (เช่น 100 ครั้ง)
    usageCount: 0, // 🔹 จำนวนครั้งที่คูปองถูกใช้ไปแล้ว (ใช้เพื่อติดตามการใช้งาน)
    applicableCategories: [], // 🔹 รายการหมวดหมู่สินค้าที่สามารถใช้คูปองนี้ได้ (เช่น ['electronics', 'clothing'])
    applicableProducts: [], // 🔹 รายการสินค้าที่สามารถใช้คูปองนี้ได้ (เช่น ['product123', 'product456'])
  });

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentCoupon({ ...currentCoupon, [name]: value });
  };

  const handleNumberChange = (name, value) => {
    setCurrentCoupon({ ...currentCoupon, [name]: value });
  };

  const handleCategoryChange = (e) => {
    const categoryId = e.target.value;
    if (categoryId && !selectedCategories.includes(categoryId)) {
      setSelectedCategories([...selectedCategories, categoryId]);
      setCurrentCoupon({
        ...currentCoupon,
        applicableCategories: [
          ...currentCoupon.applicableCategories,
          categoryId,
        ],
      });
    }
  };

  const handleProductChange = (e) => {
    const productId = e.target.value;
    console.log(productId);
    if (productId && !selectedProducts.includes(productId)) {
      setSelectedProducts([...selectedProducts, productId]);
      setCurrentCoupon({
        ...currentCoupon,
        applicableProducts: [...currentCoupon.applicableProducts, productId],
      });
    }
  };

  const removeCategory = (categoryId) => {
    setSelectedCategories(selectedCategories.filter((id) => id !== categoryId));
    setCurrentCoupon({
      ...currentCoupon,
      applicableCategories: currentCoupon.applicableCategories.filter(
        (id) => id !== categoryId
      ),
    });
  };

  const removeProduct = (productId) => {
    setSelectedProducts(selectedProducts.filter((id) => id !== productId));
    setCurrentCoupon({
      ...currentCoupon,
      applicableProducts: currentCoupon.applicableProducts.filter(
        (id) => id !== productId
      ),
    });
  };
  console.log(currentCoupon);
  const handleSave = () => {
    if (!currentCoupon.code) {
      toast({
        title: "Error",
        description: "Coupon code is required",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    if (isEditing) {
      dispatch(
        coupon_edit({
          couponId: currentCoupon._id,
          code: currentCoupon.code,
          type: currentCoupon.type,
          value: currentCoupon.value,
          minPurchase: currentCoupon.minPurchase,
          maxDiscount: currentCoupon.maxDiscount,
          startDate: currentCoupon.startDate,
          endDate: currentCoupon.endDate,
          status: currentCoupon.status,
          usageLimit: currentCoupon.usageLimit,
          applicableCategories: currentCoupon.applicableCategories,
          applicableProducts: currentCoupon.applicableProducts,
        })
      ).then(() => dispatch(coupon_get()));
      toast({
        title: "Coupon updated",
        description: `Coupon ${currentCoupon.code} has been updated successfully.`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } else {
      dispatch(
        coupon_add({
          code: currentCoupon.code,
          type: currentCoupon.type,
          value: currentCoupon.value,
          minPurchase: currentCoupon.minPurchase,
          maxDiscount: currentCoupon.maxDiscount,
          startDate: currentCoupon.startDate,
          endDate: currentCoupon.endDate,
          status: currentCoupon.status,
          usageLimit: currentCoupon.usageLimit,
          applicableCategories: currentCoupon.applicableCategories,
          applicableProducts: currentCoupon.applicableProducts,
        })
      ).then(() => dispatch(coupon_get()));
      toast({
        title: "Coupon created",
        description: `Coupon  has been created successfully.`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }

    resetForm();
    onClose();
  };

  const editCoupon = (coupon) => {
    setCurrentCoupon(coupon);
    setSelectedCategories(coupon.applicableCategories);
    setSelectedProducts(coupon.applicableProducts);
    setIsEditing(true);
    onOpen();
  };

  const addNewCoupon = () => {
    resetForm();
    setIsEditing(false);
    onOpen();
  };

  const resetForm = () => {
    setCurrentCoupon({
      code: "",
      type: "percentage",
      value: 0,
      minPurchase: 0,
      maxDiscount: null,
      startDate: "",
      endDate: "",
      status: "active",
      usageLimit: 0,
      usageCount: 0,
      applicableCategories: [],
      applicableProducts: [],
    });
    setSelectedCategories([]);
    setSelectedProducts([]);
  };

  const deleteCoupon = (id) => {
    setCoupons(coupons.filter((coupon) => coupon.id !== id));
    toast({
      title: "Coupon deleted",
      description: "The coupon has been deleted successfully.",
      status: "info",
      duration: 3000,
      isClosable: true,
    });
  };
  useEffect(() => {
    dispatch(coupon_get());
  }, [dispatch]);
  const product = banners.map((item) => item.products);
  const productFlattened = product.flat(); // แปลงเป็น Array เดียว
  const productIds = productFlattened.map((p) => p); // ดึงเฉพาะ _id

  return (
    <Box p={5}>
      <Flex justifyContent="space-between" alignItems="center" mb={6}>
        <Heading size="lg">Coupon Management</Heading>
        <Button
          leftIcon={<AddIcon />}
          colorScheme="blue"
          onClick={addNewCoupon}
        >
          Add New Coupon
        </Button>
      </Flex>

      <TableContainer
        bg={bgColor}
        borderWidth="1px"
        borderRadius="lg"
        borderColor={borderColor}
        p={4}
        mb={6}
        overflowX="auto"
      >
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Code</Th>
              <Th>Type</Th>
              <Th>Value</Th>
              <Th>Min Purchase</Th>
              <Th>Valid Until</Th>
              <Th>Status</Th>
              <Th>Usage</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {loader ? (
              <Tr>
                <Td colSpan="8" textAlign="center">
                  <Spinner size="lg" />
                </Td>
              </Tr>
            ) : (
              get_coupon.map((coupon) => (
                <Tr key={coupon.id}>
                  <Td fontWeight="bold">{coupon.code}</Td>
                  <Td>
                    <Badge
                      colorScheme={
                        coupon.type === "percentage" ? "green" : "purple"
                      }
                    >
                      {coupon.type === "percentage"
                        ? "Percentage"
                        : "Fixed Amount"}
                    </Badge>
                  </Td>
                  <Td>
                    {coupon.type === "percentage"
                      ? `${coupon.value}%`
                      : `${coupon.value} ກີບ`}
                  </Td>
                  <Td>{coupon.minPurchase} ກີບ</Td>
                  <Td>{coupon.endDate}</Td>
                  <Td>
                    <Badge
                      colorScheme={coupon.status === "active" ? "green" : "red"}
                    >
                      {coupon.status === "active" ? "Active" : "disabled"}
                    </Badge>
                  </Td>
                  <Td>
                    {coupon.usageCount} / {coupon.usageLimit || "∞"}
                  </Td>
                  <Td>
                    <HStack spacing={2}>
                      <IconButton
                        aria-label="Edit coupon"
                        icon={<EditIcon />}
                        size="sm"
                        colorScheme="blue"
                        onClick={() => editCoupon(coupon)}
                      />
                      <IconButton
                        aria-label="Delete coupon"
                        icon={<DeleteIcon />}
                        size="sm"
                        colorScheme="red"
                        onClick={() => deleteCoupon(coupon.id)}
                      />
                    </HStack>
                  </Td>
                </Tr>
              ))
            )}
          </Tbody>
        </Table>
      </TableContainer>

      {/* Add/Edit Coupon Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {isEditing ? "Edit Coupon" : "Add New Coupon"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Tabs variant="enclosed">
              <TabList>
                <Tab>General</Tab>
                <Tab>Restrictions</Tab>
                <Tab>Products & Categories</Tab>
              </TabList>

              <TabPanels>
                {/* General Tab */}
                <TabPanel>
                  <VStack spacing={4} align="stretch">
                    <FormControl isRequired>
                      <FormLabel>ລະຫັດຄູປອງ</FormLabel>
                      <Input
                        name="code"
                        value={currentCoupon.code}
                        onChange={handleInputChange}
                        placeholder="e.g. SUMMER25"
                      />
                    </FormControl>

                    <FormControl>
                      <FormLabel>ປະເພດຄູປອງ</FormLabel>
                      <Select
                        name="type"
                        value={currentCoupon.type}
                        onChange={handleInputChange}
                      >
                        <option value="percentage">
                          Percentage Discount (ຫຼຸດເປັນເປີເຊັນ)
                        </option>
                        <option value="fixed">
                          Fixed Amount Discount (ຫຼຸດເປັນຈຳນວນເງິນ)
                        </option>
                      </Select>
                    </FormControl>

                    <FormControl isRequired>
                      <FormLabel>
                        {currentCoupon.type === "percentage"
                          ? "Discount Percentage"
                          : "Discount Amount"}
                      </FormLabel>
                      <NumberInput
                        min={0}
                        max={
                          currentCoupon.type === "percentage" ? 100 : undefined
                        }
                        value={currentCoupon.value}
                        onChange={(valueString) =>
                          handleNumberChange("value", Number(valueString))
                        }
                      >
                        <NumberInputField />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                    </FormControl>

                    <HStack spacing={4}>
                      <FormControl>
                        <FormLabel>ວັນທີ່ເລີ່ມ</FormLabel>
                        <Input
                          type="date"
                          name="startDate"
                          value={currentCoupon.startDate}
                          onChange={handleInputChange}
                        />
                      </FormControl>

                      <FormControl>
                        <FormLabel>ວັນທີສີ້ນສຸດ</FormLabel>
                        <Input
                          type="date"
                          name="endDate"
                          value={currentCoupon.endDate}
                          onChange={handleInputChange}
                        />
                      </FormControl>
                    </HStack>

                    <FormControl display="flex" alignItems="center">
                      <FormLabel htmlFor="status" mb="0">
                        Active
                      </FormLabel>
                      <Switch
                        id="status"
                        isChecked={currentCoupon.status === "active"}
                        onChange={(e) => {
                          setCurrentCoupon({
                            ...currentCoupon,
                            status: e.target.checked ? "active" : "disabled",
                          });
                        }}
                      />
                    </FormControl>
                  </VStack>
                </TabPanel>

                {/* Restrictions Tab */}
                <TabPanel>
                  <VStack spacing={4} align="stretch">
                    <FormControl>
                      <FormLabel>ຍອດຊື້ຂັ້ນຕໍ່າ ($)</FormLabel>
                      <NumberInput
                        min={0}
                        value={currentCoupon.minPurchase}
                        onChange={(valueString) =>
                          handleNumberChange("minPurchase", Number(valueString))
                        }
                      >
                        <NumberInputField />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                    </FormControl>

                    <FormControl>
                      <FormLabel>ຍອດຫລຸດໄດ້ສູງສຸດ($)</FormLabel>
                      <NumberInput
                        min={0}
                        value={currentCoupon.maxDiscount || 0}
                        onChange={(valueString) => {
                          const value =
                            valueString === "0" ? null : Number(valueString);
                          handleNumberChange("maxDiscount", value);
                        }}
                      >
                        <NumberInputField />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                      <FormHelperText>
                        Leave 0 for unlimited discount
                      </FormHelperText>
                    </FormControl>

                    <FormControl>
                      <FormLabel>ຈຳນວນຄັ້ງໃຊ້ຄູປອງໄດ້</FormLabel>
                      <NumberInput
                        min={0}
                        value={currentCoupon.usageLimit}
                        onChange={(valueString) =>
                          handleNumberChange("usageLimit", Number(valueString))
                        }
                      >
                        <NumberInputField />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                      <FormHelperText>
                        Number of times this coupon can be used. Leave 0 for
                        unlimited usage.
                      </FormHelperText>
                    </FormControl>
                  </VStack>
                </TabPanel>

                {/* Products & Categories Tab */}
                <TabPanel>
                  <VStack spacing={6} align="stretch">
                    <Box>
                      <FormLabel>Apply to Categories</FormLabel>
                      <HStack>
                        <Select
                          placeholder="Select category"
                          onChange={handleCategoryChange}
                          value=""
                        >
                          {categorys.map((category) => (
                            <option key={category.id} value={category.id}>
                              {category.name}
                            </option>
                          ))}
                        </Select>
                        <Button
                          colorScheme="blue"
                          variant="outline"
                          isDisabled={true}
                        >
                          Add
                        </Button>
                      </HStack>

                      <Box mt={3}>
                        {selectedCategories.length > 0 ? (
                          <HStack spacing={2} flexWrap="wrap">
                            {selectedCategories.map((catId) => {
                              const category = categorys.find(
                                (c) => c._id === catId
                              );
                              return (
                                <Tag
                                  size="md"
                                  key={catId}
                                  borderRadius="full"
                                  variant="solid"
                                  colorScheme="blue"
                                  m={1}
                                >
                                  <TagLabel>
                                    {category ? category.name : catId}
                                  </TagLabel>
                                  <TagCloseButton
                                    onClick={() => removeCategory(catId)}
                                  />
                                </Tag>
                              );
                            })}
                          </HStack>
                        ) : (
                          <Text color="gray.500">
                            No categories selected. Coupon will apply to all
                            categories.
                          </Text>
                        )}
                      </Box>
                    </Box>

                    <Divider />

                    <Box>
                      <FormLabel>Apply to Specific Products</FormLabel>
                      <HStack>
                        <Select
                          placeholder="Select product"
                          onChange={handleProductChange}
                          value=""
                        >
                          {banners.map((products) =>
                            products.products.map((product) => (
                              <option key={product._id} value={product._id}>
                                {product.name}-{product.code_products}
                              </option>
                            ))
                          )}
                        </Select>
                        <Button
                          colorScheme="blue"
                          variant="outline"
                          isDisabled={true}
                        >
                          Add
                        </Button>
                      </HStack>

                      <Box mt={3}>
                        {selectedProducts.length > 0 ? (
                          <HStack spacing={2} flexWrap="wrap">
                            {selectedProducts.map((prodId) => {
                              const found = productIds.find(
                                (id) => id._id === prodId
                              );

                              return (
                                <Tag
                                  size="md"
                                  key={prodId}
                                  borderRadius="full"
                                  variant="solid"
                                  colorScheme="green"
                                  m={1}
                                >
                                  <TagLabel>
                                    {found
                                      ? `${found.name}-${found.code_products}`
                                      : prodId}
                                  </TagLabel>
                                  <TagCloseButton
                                    onClick={() => removeProduct(prodId)}
                                  />
                                </Tag>
                              );
                            })}
                          </HStack>
                        ) : (
                          <Text color="gray.500">
                            No products selected.{" "}
                            {selectedCategories.length > 0
                              ? "Coupon will apply to all products in the selected categories."
                              : "Coupon will apply to all products."}
                          </Text>
                        )}
                      </Box>
                    </Box>
                  </VStack>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={handleSave}>
              {isEditing ? "Update" : "Create"} Coupon
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Coupon;
