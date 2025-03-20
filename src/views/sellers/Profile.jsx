import React, { useEffect, useState } from "react";
import { FaImages, FaIdCard, FaCheck, FaUpload } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import { FadeLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import {
  profile_image_upload,
  messageClear,
  profile_info_add,
  get_user_info,
  get_profileseller,
  uploadKycDocument,
} from "../../store/Reducers/authReducer";
import toast from "react-hot-toast";
import { CiEdit } from "react-icons/ci";
import {
  Box,
  Flex,
  Input,
  Button,
  Text,
  Image,
  Stack,
  IconButton,
  FormControl,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Badge,
  Heading,
  Divider,
  FormLabel,
  Progress,
  useColorModeValue,
  VStack,
  HStack,
  Tooltip,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Alert,
  AlertIcon,
  Circle,
} from "@chakra-ui/react";

const Profile = () => {
  const [editMode, setEditMode] = useState(false);
  const {
    userInfo,
    data_get_profileseller,
    loader,
    successMessage,
  } = useSelector((state) => state.auth);
  const [kycDocuments, setKycDocuments] = useState({
    idCard: data_get_profileseller?.kyc?.idCard,
    businessLicense: data_get_profileseller?.kyc?.businessLicense,
    addressProof: data_get_profileseller?.kyc?.addressProof,
  });
  console.log(data_get_profileseller);

  const [kycStatus, setKycStatus] = useState(); // pending, under_review, verified, deactive
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();

  const [state, setState] = useState({
    name: data_get_profileseller?.name || "",
    division: data_get_profileseller?.shopInfo?.division || "",
    district: data_get_profileseller?.shopInfo?.district || "",
    shopName: data_get_profileseller?.shopInfo?.shopName || "",
    sub_district: data_get_profileseller?.shopInfo?.sub_district || "",
    phone: data_get_profileseller?.phone,
    address: data_get_profileseller?.address || "",
    status: data_get_profileseller?.status || "",
    active: data_get_profileseller?.active || "",
  });
  const cardBg = useColorModeValue("white", "gray.700");
  const textColor = useColorModeValue("gray.800", "gray.100");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  useEffect(() => {
    dispatch(get_user_info());
  }, [dispatch]);
  console.log(kycStatus);
  useEffect(() => {
    if (userInfo) {
      setState({
        name: userInfo.name || "",
        division: userInfo?.shopInfo?.division || "",
        district: userInfo?.shopInfo?.district || "",
        shopName: userInfo?.shopInfo?.shopName || "",
        sub_district: userInfo?.shopInfo?.sub_district || "",
        phone: userInfo?.phone || "",
        address: userInfo?.address || "",
        status: userInfo?.status || "",
        active: userInfo?.active || "",
      });
      setKycDocuments({
        idCard: userInfo?.kyc?.idCard,
        businessLicense: userInfo?.kyc?.businessLicense,
        addressProof: userInfo?.kyc?.addressProof,
        
      });
      setKycStatus({
        status: userInfo?.kyc?.status,
      })
    }
  }, [userInfo]);

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
    }
  }, [successMessage, dispatch]);

  const add_image = (e) => {
    if (e.target.files.length > 0) {
      const formData = new FormData();
      formData.append("image", e.target.files[0]);
      dispatch(profile_image_upload(formData));
    }
  };

  const handleKycDocumentUpload = (type, e) => {
    if (e.target.files.length > 0) {
      setKycDocuments({
        ...kycDocuments,
        [type]: e.target.files[0],
      });
      toast.success(`${type} document uploaded successfully`);
    }
  };

  const submitKycDocuments = (e) => {
    // Validate that all documents exist
    if (
      !kycDocuments.idCard ||
      !kycDocuments.businessLicense ||
      !kycDocuments.addressProof
    ) {
      toast.error("Please upload all required documents");
      return;
    }

    const formData = new FormData();
    formData.append("idCard", kycDocuments.idCard);
    formData.append("businessLicense", kycDocuments.businessLicense);
    formData.append("addressProof", kycDocuments.addressProof); // Fixed the space issue

    // Log individual items to verify they're being added
    console.log("ID Card:", kycDocuments.idCard);
    console.log("Business License:", kycDocuments.businessLicense);
    console.log("Address Proof:", kycDocuments.addressProof);

    // Uncomment to actually send the data
    dispatch(uploadKycDocument(formData));

    toast.success("KYC documents submitted successfully for review");
    onClose();
  };

  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const add = (e) => {
    e.preventDefault();
    dispatch(profile_info_add(state));
    setEditMode(false);
  };

  const handleEditToggle = () => setEditMode((prev) => !prev);

  const getKycStatusBadge = () => {
    switch (kycStatus) {
      case "verified":
        return <Badge colorScheme="green">Verified</Badge>;
      case "under_review":
        return <Badge colorScheme="orange">Under Review</Badge>;
      case "reject":
        return <Badge colorScheme="red">deactive</Badge>;
      default:
        return <Badge colorScheme="gray">Not Verified</Badge>;
    }
  };

  const getKycProgress = () => {
    switch (kycStatus) {
      case "verified":
        return 100;
      case "under_review":
        return 75;
      case "reject":
        return 50;
      default:
        return 25;
    }
  };
  useEffect(() => {
    dispatch(get_profileseller());
  }, [dispatch]);
  return (
    <Box px={{ base: 4, md: 7 }} py={5}>
      <Tabs isFitted variant="enclosed" colorScheme="red">
        <TabList mb="1em">
          <Tab fontWeight="semibold">Profile Information</Tab>
          <Tab fontWeight="semibold">
            KYC Verification {getKycStatusBadge()}
          </Tab>
          <Tab fontWeight="semibold">Security Settings</Tab>
        </TabList>

        <TabPanels>
          {/* Profile Information Tab */}
          <TabPanel>
            <Flex
              direction={{ base: "column", lg: "row" }}
              gap={8}
              justifyContent="space-between"
            >
              {/* Profile Picture Section */}
              <Box w={{ base: "100%", lg: "30%" }}>
                <Box
                  p={6}
                  rounded="lg"
                  bg={cardBg}
                  shadow="md"
                  border="1px"
                  borderColor={borderColor}
                >
                  <Heading size="md" mb={4} textAlign="center">
                    Profile Image
                  </Heading>
                  <Divider mb={4} />

                  <Flex direction="column" align="center" py={3}>
                    {userInfo?.image ? (
                      <label
                        htmlFor="img"
                        style={{ position: "relative", cursor: "pointer" }}
                      >
                        <Image
                          src={userInfo.image}
                          alt="Profile"
                          boxSize="200px"
                          objectFit="cover"
                          borderRadius="full"
                          border="3px solid"
                          borderColor="red.500"
                          transition="transform 0.3s"
                          _hover={{ transform: "scale(1.05)" }}
                        />
                        {loader && (
                          <Box
                            position="absolute"
                            top={0}
                            left={0}
                            w="full"
                            h="full"
                            bg="blackAlpha.600"
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            borderRadius="full"
                          >
                            <FadeLoader color="white" />
                          </Box>
                        )}
                        <Box
                          position="absolute"
                          bottom="0"
                          right="0"
                          bg="red.500"
                          p={2}
                          borderRadius="full"
                          color="white"
                        >
                          <FaRegEdit />
                        </Box>
                      </label>
                    ) : (
                      <label htmlFor="img" style={{ cursor: "pointer" }}>
                        <Box
                          display="flex"
                          flexDirection="column"
                          justifyContent="center"
                          alignItems="center"
                          border="2px dashed"
                          borderColor={borderColor}
                          p={8}
                          w="200px"
                          h="200px"
                          borderRadius="full"
                          transition="all 0.3s"
                          _hover={{ bg: "gray.50", borderColor: "red.400" }}
                        >
                          <FaImages size="40" color="#E53E3E" />
                          <Text mt={2} color={textColor}>
                            ເລືອກຮູບພາບ
                          </Text>
                        </Box>
                      </label>
                    )}
                    <Input id="img" type="file" hidden onChange={add_image} />
                  </Flex>

                  <Text
                    mt={2}
                    fontSize="sm"
                    color="gray.500"
                    textAlign="center"
                  >
                    Click on the image to change your profile picture
                  </Text>
                </Box>
              </Box>

              {/* User Information Section */}
              <Box w={{ base: "100%", lg: "65%" }}>
                <Box
                  p={6}
                  rounded="lg"
                  bg={cardBg}
                  shadow="md"
                  border="1px"
                  borderColor={borderColor}
                >
                  <Flex
                    justifyContent="space-between"
                    alignItems="center"
                    mb={4}
                  >
                    <Heading size="md">Personal Information</Heading>
                    <Tooltip
                      label={editMode ? "Cancel Editing" : "Edit Information"}
                    >
                      <IconButton
                        onClick={handleEditToggle}
                        colorScheme={editMode ? "gray" : "red"}
                        variant={editMode ? "outline" : "solid"}
                        icon={<CiEdit size={20} />}
                        size="md"
                      />
                    </Tooltip>
                  </Flex>

                  <Divider mb={6} />

                  {editMode ? (
                    <form onSubmit={add}>
                      <Stack spacing={6}>
                        <Flex gap={6} direction={{ base: "column", md: "row" }}>
                          <FormControl>
                            <FormLabel>ອີເມວ (Email)</FormLabel>
                            <Input
                              name="email"
                              value={userInfo.email || ""}
                              isDisabled
                              borderColor={borderColor}
                              bg="gray.50"
                            />
                          </FormControl>
                          <FormControl>
                            <FormLabel>ຊື່ຜູ້ຂາຍ (Seller Name)</FormLabel>
                            <Input
                              name="name"
                              value={state.name}
                              onChange={inputHandle}
                              borderColor={borderColor}
                            />
                          </FormControl>
                        </Flex>

                        <Flex gap={6} direction={{ base: "column", md: "row" }}>
                          <FormControl>
                            <FormLabel>ຊື່ຮ້ານຄ້າ (Shop Name)</FormLabel>
                            <Input
                              value={state.shopName}
                              onChange={inputHandle}
                              name="shopName"
                              borderColor={borderColor}
                            />
                          </FormControl>
                          <FormControl>
                            <FormLabel>ເບີໂທລະສັບ (Phone)</FormLabel>
                            <Input
                              value={state.phone}
                              onChange={inputHandle}
                              name="phone"
                              placeholder="Phone Number"
                              borderColor={borderColor}
                            />
                          </FormControl>
                        </Flex>

                        <FormControl>
                          <FormLabel>ທີ່ຢູ່ (Address)</FormLabel>
                          <Input
                            value={state.address}
                            onChange={inputHandle}
                            name="address"
                            placeholder="Full Address"
                            borderColor={borderColor}
                          />
                        </FormControl>

                        <Flex gap={6} direction={{ base: "column", md: "row" }}>
                          <FormControl>
                            <FormLabel>ແຂວງ (Division)</FormLabel>
                            <Input
                              value={state.division}
                              onChange={inputHandle}
                              name="division"
                              borderColor={borderColor}
                            />
                          </FormControl>
                          <FormControl>
                            <FormLabel>ເມືອງ (District)</FormLabel>
                            <Input
                              value={state.district}
                              onChange={inputHandle}
                              name="district"
                              borderColor={borderColor}
                            />
                          </FormControl>
                        </Flex>

                        <FormControl>
                          <FormLabel>ບ້ານ (Sub District)</FormLabel>
                          <Input
                            value={state.sub_district}
                            onChange={inputHandle}
                            name="sub_district"
                            borderColor={borderColor}
                          />
                        </FormControl>

                        <Button
                          type="submit"
                          isLoading={loader}
                          colorScheme="red"
                          size="lg"
                          leftIcon={<FaCheck />}
                        >
                          Save Changes
                        </Button>
                      </Stack>
                    </form>
                  ) : (
                    <Stack spacing={4} divider={<Divider />}>
                      <Flex justify="space-between" align="center">
                        <Text fontWeight="bold" color="gray.500">
                          ສິດ (Role):
                        </Text>
                        <Badge colorScheme="purple" fontSize="0.9em" p={1}>
                          {userInfo.role || "Seller"}
                        </Badge>
                      </Flex>

                      <Flex justify="space-between" align="center">
                        <Text fontWeight="bold" color="gray.500">
                          ສະຖານະ (Status):
                        </Text>
                        <Badge
                          colorScheme={
                            userInfo.status === "active" ? "green" : "red"
                          }
                          fontSize="0.9em"
                          p={1}
                        >
                          {userInfo.status || "Active"}
                        </Badge>
                      </Flex>

                      <Flex justify="space-between" wrap="wrap">
                        <VStack
                          align="start"
                          spacing={3}
                          w={{ base: "100%", sm: "48%" }}
                          mb={{ base: 3, sm: 0 }}
                        >
                          <Box>
                            <Text fontSize="sm" color="gray.500">
                              ຊື່ຜູ້ຂາຍ (Seller Name)
                            </Text>
                            <Text fontWeight="medium">{userInfo.name}</Text>
                          </Box>
                          <Box>
                            <Text fontSize="sm" color="gray.500">
                              ອີເມວ (Email)
                            </Text>
                            <Text fontWeight="medium">{userInfo.email}</Text>
                          </Box>
                          <Box>
                            <Text fontSize="sm" color="gray.500">
                              ຊື່ຮ້ານຄ້າ (Shop Name)
                            </Text>
                            <Text fontWeight="medium">
                              {state.shopName || "-"}
                            </Text>
                          </Box>
                          <Box>
                            <Text fontSize="sm" color="gray.500">
                              ເບີໂທລະສັບ (Phone)
                            </Text>
                            <Text fontWeight="medium">
                              {state.phone || "-"}
                            </Text>
                          </Box>
                        </VStack>

                        <VStack
                          align="start"
                          spacing={3}
                          w={{ base: "100%", sm: "48%" }}
                        >
                          <Box>
                            <Text fontSize="sm" color="gray.500">
                              ທີ່ຢູ່ (Address)
                            </Text>
                            <Text fontWeight="medium">
                              {state.address || "-"}
                            </Text>
                          </Box>
                          <Box>
                            <Text fontSize="sm" color="gray.500">
                              ແຂວງ (Division)
                            </Text>
                            <Text fontWeight="medium">
                              {state.division || "-"}
                            </Text>
                          </Box>
                          <Box>
                            <Text fontSize="sm" color="gray.500">
                              ເມືອງ (District)
                            </Text>
                            <Text fontWeight="medium">
                              {state.district || "-"}
                            </Text>
                          </Box>
                          <Box>
                            <Text fontSize="sm" color="gray.500">
                              ບ້ານ (Sub District)
                            </Text>
                            <Text fontWeight="medium">
                              {state.sub_district || "-"}
                            </Text>
                          </Box>
                        </VStack>
                      </Flex>
                    </Stack>
                  )}
                </Box>
              </Box>
            </Flex>
          </TabPanel>

          {/* KYC Verification Tab */}

          <TabPanel>
            {kycStatus?.status === "under_review" ? (
                <Box
                p={6}
                rounded="lg"
                bg={cardBg}
                shadow="md"
                border="1px"
                borderColor="orange.200"
              >
                <Flex justify="space-between" align="center" mb={4}>
                  <Heading size="md">KYC Verification</Heading>
                  <Badge colorScheme="orange" p={2} borderRadius="md">In Process</Badge>
                </Flex>
                
                <Progress
                  value={75}
                  colorScheme="orange"
                  size="md"
                  borderRadius="full"
                  mb={4}
                />
                
                <Alert status="info" variant="left-accent" borderRadius="md" mb={6}>
                  <AlertIcon />
                  <Box>
                    <Text fontWeight="bold">Your documents are being reviewed</Text>
                    <Text fontSize="sm">This usually takes 1-2 business days. We'll notify you when the verification is complete.</Text>
                  </Box>
                </Alert>
                
                <Box bg="orange.50" p={4} borderRadius="md" borderLeft="4px solid" borderColor="orange.400">
                  <Flex align="center" mb={3}>
                    <FaIdCard color="#ED8936" size={24} />
                    <Text ml={3} fontWeight="medium">Verification in progress</Text>
                  </Flex>
                  <Text ml={8} fontSize="sm" color="gray.600">
                    Our team is reviewing your submitted documents. You will receive an email notification once the process is complete.
                  </Text>
                </Box>
              </Box>
            ) : kycStatus?.status  === "verified" ? (
              <Box
              p={6}
              rounded="lg"
              bg={cardBg}
              shadow="md"
              border="1px"
              borderColor="green.200"
            >
              <Flex justify="space-between" align="center" mb={4}>
                <Heading size="md">KYC Verification</Heading>
                <Badge colorScheme="green" p={2} borderRadius="md">Complete</Badge>
              </Flex>
              
              <Progress
                value={100}
                colorScheme="green"
                size="md"
                borderRadius="full"
                mb={4}
              />
              
              <Alert status="success" variant="left-accent" borderRadius="md" mb={6}>
                <AlertIcon />
                <Box>
                  <Text fontWeight="bold">Verification Successful!</Text>
                  <Text fontSize="sm">ບັນຊີຂອງທ່ານໄດ້ຖືກຢືນຢັນແລ້ວ ທ່ານສາມາດໃຊ້ງານລະບົບໄດ້ຢ່າງເຕັມທີ່</Text>
                </Box>
              </Alert>
              
              <Flex justify="center" direction="column" align="center" py={6}>
                <Box position="relative" mb={4}>
                  <Circle size="100px" bg="green.100" p={3}>
                    <Circle size="80px" bg="green.50" p={3}>
                      <FaCheck size={40} color="#38A169" />
                    </Circle>
                  </Circle>
                </Box>
                <Text fontWeight="medium" fontSize="lg" mb={2} textAlign="center">
                  Your account is fully verified
                </Text>
                <Text color="gray.500" textAlign="center" mb={4}>
                  You now have complete access to all seller features
                </Text>
                <Button
                  colorScheme="green"
                  variant="outline"
                  rightIcon={<FaIdCard />}
                  mt={2}
                >
                  View Verification Details
                </Button>
              </Flex>
            </Box>
            ) : kycStatus?.status  === "reject" ? (
              <Box
                p={6}
                rounded="lg"
                bg={cardBg}
                shadow="md"
                border="1px"
                borderColor={borderColor}
              >
                <Heading size="md" mb={3}>
                  KYC Verification
                </Heading>
                <Text color="gray.600" mb={6}>
                  ກະລຸນະປ້ອນຂໍ້ມູນ (KYC) ເພື່ອທີ່ຈະເຂົ້າໃຊ້ງານລະບົບທັງຫມົດ
                </Text>

                <Box mb={6}>
                  <Flex justify="space-between" align="center" mb={2}>
                    <Text fontWeight="medium">Verification Status</Text>
                    {getKycStatusBadge()}
                  </Flex>
                  <Progress
                    value={getKycProgress()}
                    colorScheme={
                      kycStatus === "verified"
                        ? "green"
                        : kycStatus === "under_review"
                        ? "orange"
                        : "red"
                    }
                    size="sm"
                    borderRadius="md"
                    mb={2}
                  />
                  <Badge></Badge>
                  <Text fontSize="sm" color="gray.500">
                    {kycStatus === "verified"
                      ? "ບັນຊີຂອງທ່ານໄດ້ຖືກຢືນຢັນແລ້ວ"
                      : kycStatus === "under_review"
                      ? "Your documents are being reviewed. This usually takes 1-2 business days."
                      : "Please complete your KYC verification to access all seller features."}
                  </Text>
                </Box>

                <Divider mb={6} />

                <Stack spacing={6}>
                  <Flex
                    justify="space-between"
                    align="center"
                    p={4}
                    borderWidth="1px"
                    borderRadius="md"
                    borderColor={
                      kycDocuments.idCard ? "green.300" : borderColor
                    }
                    bg={kycDocuments.idCard ? "green.50" : "transparent"}
                  >
                    <Box>
                      <Flex align="center">
                        <FaIdCard color="#E53E3E" size={24} />
                        <Text ml={3} fontWeight="medium">
                          ID Card / Passport
                        </Text>
                      </Flex>
                      <Text ml={8} mt={1} fontSize="sm" color="gray.500">
                        ກະລຸນາອັບໂຫຼດຮູບພາບຂອງທ່ານ ທີ່ມີຂໍ້ມູນທີ່ຖືກຕ້ອງ ພາສປອດ
                        ຫຼື ບັດປະຈຳຕົວທີ່ມີຂໍ້ມູນທີ່ຖືກຕ້ອງ
                      </Text>
                    </Box>
                    <Box>
                      {kycDocuments.idCard ? (
                        <HStack>
                          <Badge colorScheme="green">Uploaded</Badge>
                          <label htmlFor="idCard">
                            <Button size="sm" colorScheme="gray" as="span">
                              Change
                            </Button>
                          </label>
                        </HStack>
                      ) : (
                        <label htmlFor="idCard">
                          <Button
                            size="sm"
                            leftIcon={<FaUpload />}
                            colorScheme="red"
                            as="span"
                          >
                            Upload
                          </Button>
                        </label>
                      )}
                      <Input
                        id="idCard"
                        type="file"
                        hidden
                        onChange={(e) => handleKycDocumentUpload("idCard", e)}
                      />
                    </Box>
                  </Flex>

                  <Flex
                    justify="space-between"
                    align="center"
                    p={4}
                    borderWidth="1px"
                    borderRadius="md"
                    borderColor={
                      kycDocuments.businessLicense ? "green.300" : borderColor
                    }
                    bg={
                      kycDocuments.businessLicense ? "green.50" : "transparent"
                    }
                  >
                    <Box>
                      <Flex align="center">
                        <FaIdCard color="#E53E3E" size={24} />
                        <Text ml={3} fontWeight="medium">
                          ໃບທະບຽນວິສາຫະກິດ
                        </Text>
                      </Flex>
                      <Text ml={8} mt={1} fontSize="sm" color="gray.500">
                        ກະລຸນາອັບໂຫລດໃບທະບຽນວິສາຫະກິດຂອງທ່ານ
                      </Text>
                    </Box>
                    <Box>
                      {kycDocuments.businessLicense ? (
                        <HStack>
                          <Badge colorScheme="green">Uploaded</Badge>
                          <label htmlFor="businessLicense">
                            <Button size="sm" colorScheme="gray" as="span">
                              Change
                            </Button>
                          </label>
                        </HStack>
                      ) : (
                        <label htmlFor="businessLicense">
                          <Button
                            size="sm"
                            leftIcon={<FaUpload />}
                            colorScheme="red"
                            as="span"
                          >
                            Upload
                          </Button>
                        </label>
                      )}
                      <Input
                        id="businessLicense"
                        type="file"
                        hidden
                        onChange={(e) =>
                          handleKycDocumentUpload("businessLicense", e)
                        }
                      />
                    </Box>
                  </Flex>

                  <Flex
                    justify="space-between"
                    align="center"
                    p={4}
                    borderWidth="1px"
                    borderRadius="md"
                    borderColor={
                      kycDocuments.addressProof ? "green.300" : borderColor
                    }
                    bg={kycDocuments.addressProof ? "green.50" : "transparent"}
                  >
                    <Box>
                      <Flex align="center">
                        <FaIdCard color="#E53E3E" size={24} />
                        <Text ml={3} fontWeight="medium">
                          ໃບຢັ້ງຢືນທີ່ຢູ່
                        </Text>
                      </Flex>
                      <Text ml={8} mt={1} fontSize="sm" color="gray.500">
                        ກະລຸນາອັບໂຫລດໃບຢັ້ງຢືນທີ່ຢູ່ຂອງທ່ານ ທີ່ບໍ່ເກີນ 3 ເດືອນ
                      </Text>
                    </Box>
                    <Box>
                      {kycDocuments.addressProof ? (
                        <HStack>
                          <Badge colorScheme="green">Uploaded</Badge>
                          <label htmlFor="addressProof">
                            <Button size="sm" colorScheme="gray" as="span">
                              Change
                            </Button>
                          </label>
                        </HStack>
                      ) : (
                        <label htmlFor="addressProof">
                          <Button
                            size="sm"
                            leftIcon={<FaUpload />}
                            colorScheme="red"
                            as="span"
                          >
                            Upload
                          </Button>
                        </label>
                      )}
                      <Input
                        id="addressProof"
                        type="file"
                        hidden
                        onChange={(e) =>
                          handleKycDocumentUpload("addressProof", e)
                        }
                      />
                    </Box>
                  </Flex>

                  <Button
                    colorScheme="red"
                    size="lg"
                    isDisabled={
                      !kycDocuments.idCard ||
                      !kycDocuments.businessLicense ||
                      !kycDocuments.addressProof ||
                      kycStatus === "verified" ||
                      kycStatus === "under_review"
                    }
                    onClick={onOpen}
                    mt={4}
                  >
                    Submit Verification Documents
                  </Button>

                  {kycStatus === "deactive" && (
                    <Alert status="error" borderRadius="md">
                      <AlertIcon />
                      Your verification was deactive. Please check your email
                      for more details and upload updated documents.
                    </Alert>
                  )}
                </Stack>
              </Box>
            ) : (
              <Box>Not Verified</Box>
            )}

            {/* Confirmation Modal */}
            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Confirm Document Submission</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Text>
                    You're about to submit the following documents for KYC
                    verification:
                  </Text>
                  <Stack mt={4} spacing={2}>
                    {kycDocuments.idCard && (
                      <Text>• ID Card: {kycDocuments.idCard.name}</Text>
                    )}
                    {kycDocuments.businessLicense && (
                      <Text>
                        • Business License: {kycDocuments.businessLicense.name}
                      </Text>
                    )}
                    {kycDocuments.addressProof && (
                      <Text>
                        • Address Proof: {kycDocuments.addressProof.name}
                      </Text>
                    )}
                  </Stack>
                  <Text mt={4}>
                    This process can take 1-2 business days to complete. You'll
                    be notified once your verification is approved.
                  </Text>
                </ModalBody>

                <ModalFooter>
                  <Button colorScheme="gray" mr={3} onClick={onClose}>
                    Cancel
                  </Button>
                  <Button colorScheme="red" onClick={submitKycDocuments}>
                    Submit Documents
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </TabPanel>

          {/* Security Settings Tab */}
          <TabPanel>
            <Box
              p={6}
              rounded="lg"
              bg={cardBg}
              shadow="md"
              border="1px"
              borderColor={borderColor}
            >
              <Heading size="md" mb={4}>
                Security Settings
              </Heading>
              <Divider mb={6} />

              <form>
                <Stack spacing={6}>
                  <FormControl>
                    <FormLabel>Current Password</FormLabel>
                    <Input
                      name="old_password"
                      type="password"
                      placeholder="Enter your current password"
                      borderColor={borderColor}
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel>New Password</FormLabel>
                    <Input
                      name="new_password"
                      type="password"
                      placeholder="Enter new password"
                      borderColor={borderColor}
                    />
                    <Text fontSize="xs" color="gray.500" mt={1}>
                      Password must be at least 8 characters with numbers and
                      special characters
                    </Text>
                  </FormControl>

                  <FormControl>
                    <FormLabel>Confirm New Password</FormLabel>
                    <Input
                      name="confirm_password"
                      type="password"
                      placeholder="Confirm new password"
                      borderColor={borderColor}
                    />
                  </FormControl>

                  <Button colorScheme="red" size="lg" width="100%">
                    Update Password
                  </Button>
                </Stack>
              </form>
            </Box>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default Profile;
