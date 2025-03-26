import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getNav } from "../navigation/index";
import { BiLogOutCircle } from "react-icons/bi";
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  IconButton,
  Text,
  useDisclosure,
  VStack,
  Avatar,
  Badge,
} from "@chakra-ui/react";
import {  useSelector } from "react-redux";
import { FaList } from "react-icons/fa";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
// import { updateLastLogin } from "../store/Reducers/authReducer";

dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.extend(timezone);
const Sidebar = () => {
  // updateLastLoginData
  const { role, userInfo,  } = useSelector(
    (state) => state.auth
  );
  const { pathname } = useLocation();
  const [allNav, setAllNav] = useState([]);
  // const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  // const [formattedTime, setFormattedTime] = useState("");
  // useEffect(() => {
  //   const formDated = () => {
  //     return setFormattedTime(
  //       dayjs(updateLastLoginData.updatedAt).utc(7).tz("Asia/Bangkok").toLocaleString()
  //     );
  //   };
  //   formDated();
  //   dispatch(updateLastLogin());
  // }, [dispatch, updateLastLoginData]);
  useEffect(() => {
    const navs = getNav(role);
    setAllNav(navs);
  }, [role]);
  const handleOut = () => {
    localStorage.removeItem("accessToken");
    navigate("/");
  };
  return (
    <Box>
      {/* Drawer for mobile */}
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        size="xs" // Fixed width for better mobile experience
      >
        <DrawerOverlay bg="rgba(0,0,0,0.2)" />
        <DrawerContent bg="gray.50">
          <DrawerCloseButton size="lg" color="gray.600" mt={2} />
          <DrawerBody p={0}>
            <VStack spacing={1} align="stretch" p={3}>
              {/* User Profile Section */}
              <Flex
                p={4}
                bg="white"
                mb={2}
                borderRadius="md"
                align="center"
                boxShadow="sm"
              >
                <Avatar
                  size="sm"
                  name={userInfo?.name}
                  src={userInfo?.avatar}
                  mr={3}
                />
                <Text fontSize="md" fontWeight="medium" isTruncated>
                  {userInfo?.name || "User"}
                </Text>
              </Flex>

              {/* Navigation Items */}
              {allNav.map((n, i) => (
                <Link to={n.path} key={i} onClick={onClose}>
                  <Button
                    w="full"
                    variant="ghost"
                    colorScheme={pathname === n.path ? "blue" : "gray"}
                    bg={pathname === n.path ? "blue.50" : "transparent"}
                    leftIcon={n.icon}
                    justifyContent="flex-start"
                    fontSize="md"
                    py={6}
                    px={4}
                    borderRadius="md"
                    _hover={{ bg: "gray.100" }}
                    color={pathname === n.path ? "blue.600" : "gray.700"}
                  >
                    {n.title}
                  </Button>
                </Link>
              ))}

              {/* Logout Button */}
              <Button
                w="full"
                variant="ghost"
                colorScheme="red"
                leftIcon={<BiLogOutCircle />}
                justifyContent="flex-start"
                fontSize="md"
                py={6}
                px={4}
                mt={2}
                borderRadius="md"
                color="gray.700"
                onClick={() => handleOut()}
                _hover={{ bg: "red.50", color: "red.600" }}
              >
                Logout
              </Button>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      {/* Desktop Sidebar */}
      <Box
        bg="gray.50"
        w="250px" // Fixed width for consistency
        h="auto" // Full height instead of 150vh
        shadow="md"
        display={{ base: "none", md: "block" }}
        p={4}
        transition="all 0.2s"
      >
        <VStack align="stretch" spacing={1}>
          {/* User Profile Section */}
          <Flex
            p={3}
            bg="white"
            borderRadius="md"
            mb={4}
            align="center"
            boxShadow="sm"
          >
            <Avatar
              size="md"
              name={userInfo?.name}
              src={userInfo?.avatar}
              mr={3}
            />
            <VStack align="stretch" spacing={0}>

            <Text fontSize="md" fontWeight="medium" isTruncated>
              {userInfo?.name || "User"}
            </Text>
            <Text color={'blue.200'} fontSize="15px" fontWeight="medium" isTruncated>
              {userInfo?.role || "undefind"}
            </Text>
            </VStack>
          </Flex>
          <Box>
            <Text fontSize="sm" color="gray.600">
              ເຂົ້າສູ່ລະບົບລ່າສຸດ:{" "}
              <Badge colorScheme="green"></Badge>
            </Text>
          </Box>
          {/* Navigation Items */}
          {allNav.map((n, i) => (
            <Link to={n.path} key={i}>
              <Button
                fontFamily="Noto Sans Lao, serif"
                w="full"
                variant="ghost"
                colorScheme={pathname === n.path ? "blue" : "gray"}
                bg={pathname === n.path ? "blue.50" : "transparent"}
                leftIcon={n.icon}
                justifyContent="flex-start"
                py={6}
                px={4}
                borderRadius="md"
                _hover={{ bg: "gray.100" }}
                color={pathname === n.path ? "blue.600" : "gray.700"}
              >
                {n.title}
              </Button>
            </Link>
          ))}
        </VStack>
      </Box>

      {/* Mobile Toggle Button */}
      <Flex
        position="fixed"
        top={4}
        left={4}
        zIndex={10}
        display={{ base: "flex", md: "none" }}
      >
        <IconButton
          bg="blue.500"
          color="white"
          icon={<FaList />}
          aria-label="Open Sidebar"
          size="lg"
          borderRadius="full"
          _hover={{ bg: "blue.600" }}
          onClick={onOpen}
        />
      </Flex>
    </Box>
  );
};

export default Sidebar;
