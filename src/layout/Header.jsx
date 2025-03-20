import React from "react";
import { useSelector } from "react-redux";
import {
  Box,
  Flex,
  Avatar,
  Text,
  Heading,

  Image,
} from "@chakra-ui/react";
import logoshop from "./logoshop.png"
const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);
  return (
    <Box py={5} px={2}>
      <Box
        bg="white"
        borderRadius="md"
        shadow="md"
        p={6}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        px={5}
      >
        <Image width={'80px'} objectFit={'cover'} borderRadius={'50'} src={logoshop} alt=""/>
        <Box align="center" gap={8}>
          <Flex justify="center" align="center" gap={3}>
            <Box textAlign="right">
              <Heading size="sm" fontWeight="bold">
                {userInfo.name}
              </Heading>
              <Text fontSize="sm" fontWeight="normal">
                {userInfo.role}
              </Text>
            </Box>
            <Avatar
              size="md"
              name={userInfo.name}
              src={
                userInfo.role === "admin"
                  ? "http://localhost:3001/images/admin.jpg"
                  : userInfo.image
              }
            />
          </Flex>
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
