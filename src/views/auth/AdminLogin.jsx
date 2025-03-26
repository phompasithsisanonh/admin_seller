import React, { useEffect, useState } from "react";
import {
  Box,
  Input,
  Button,
  FormControl,
  FormLabel,
  VStack,
  Heading,
  Image,
  Spinner,
  useToast,
  Container,
  useColorModeValue,
  Flex,
  Text,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { admin_login, messageClear } from "../../store/Reducers/authReducer";
import { useNavigate } from "react-router-dom";
import logoshop from "../../layout/logoshop.png";
const AdminLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();
  const { loader, errorMessage, successMessage } = useSelector(
    (state) => state.auth || ""
  );

  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const submit = (e) => {
    e.preventDefault();
    dispatch(admin_login(state));
  };

  useEffect(() => {
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
    if (successMessage) {
      toast({
        title: "Success",
        description: successMessage,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      dispatch(messageClear());
      navigate("/");
    }
  }, [errorMessage, successMessage, dispatch, navigate, toast]);
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  return (
    <Flex
      minH="100vh"
      bg={useColorModeValue("gray.50", "gray.900")}
      align="center"
      justify="center"
      p={4}
    >
      {errorMessage}
      <Container
        maxW="md"
        bg={bgColor}
        p={8}
        rounded="xl"
        shadow="lg"
        borderWidth="1px"
        borderColor={borderColor}
        transition="all 0.3s ease"
      >
        <VStack spacing={6} align="center">
          {/* Logo */}
          <Box position="relative" p={2}>
            <Box
              position="absolute"
              top="0"
              left="0"
              right="0"
              bottom="0"
              bgGradient="linear(to-r, purple.400, purple.600)"
              opacity="0.1"
              borderRadius="full"
              transform="scale(1.1)"
            />
            <Image
              src={logoshop}
              alt="Shop Logo"
              borderRadius="full"
              boxSize="100px"
              objectFit="cover"
            />
          </Box>
          <Box textAlign="center">
            <Heading size="lg" mb={1}>
              Admin Portal
            </Heading>
            <Text fontSize="sm" color="gray.500">
              Access your admin dashboard
            </Text>
          </Box>

          {/* Login Form */}
          <form style={{ width: "100%" }} onSubmit={submit}>
            <VStack spacing="4">
              {/* Email */}
              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={state.email}
                  onChange={inputHandle}
                  required
                  size="md"
                  bg={useColorModeValue("gray.50", "gray.700")}
                  borderRadius="md"
                />
              </FormControl>

              {/* Password */}
              <FormControl>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  value={state.password}
                  onChange={inputHandle}
                  required
                  size="md"
                  bg={useColorModeValue("gray.50", "gray.700")}
                  borderRadius="md"
                />
              </FormControl>

              {/* Submit Button */}
              <Button
                type="submit"
                colorScheme="blue"
                width="full"
                isDisabled={loader}
              >
                {loader ? <Spinner size="sm" /> : "Login"}
              </Button>
            </VStack>
          </form>
        </VStack>
      </Container>
    </Flex>
  );
};

export default AdminLogin;
