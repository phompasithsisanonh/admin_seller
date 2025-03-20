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

  return (
    <Box
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg="gray.100"
    >
      <Box w="350px" bg="white" p="6" boxShadow="md" borderRadius="lg">
        {/* Logo */}
        <Box textAlign="center" mb="4">
          <Image
            src={logoshop}
            alt="logo"
            mx="auto"
            borderRadius={'50'}
            objectFit={"cover"}
            boxSize="80px"
          />
        </Box>

        <Heading size="md" textAlign="center" mb="4">
          ADMIN SIGN
        </Heading>

        {/* Login Form */}
        <form onSubmit={submit}>
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
      </Box>
    </Box>
  );
};

export default AdminLogin;
