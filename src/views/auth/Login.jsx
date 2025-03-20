import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle, FaFacebook } from "react-icons/fa";
import { PropagateLoader } from "react-spinners";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { seller_login, messageClear } from "../../store/Reducers/authReducer";
import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
  Divider,
  IconButton,
  VStack,
  Image,
} from "@chakra-ui/react";
import logoshop from "../../layout/logoshop.png";
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loader, errorMessage, successMessage } = useSelector(
    (state) => state.auth
  );

  const [state, setState] = useState({ email: "", password: "" });

  const inputHandle = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const submit = (e) => {
    e.preventDefault();
    dispatch(seller_login(state));
  };

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
      navigate("/");
    }
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
  }, [successMessage, errorMessage,dispatch ,navigate]);

  return (
    <Flex minH="100vh" bg="#f7f7fc" align="center" justify="center">
      <Container maxW="sm" bg="white" p={6} rounded="lg" shadow="lg">
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
        <Text textAlign="center" color="gray.600" mb={4}>
         SELLER SIGN
        </Text>

        <form onSubmit={submit}>
          <VStack spacing={4}>
            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={state.email}
                onChange={inputHandle}
                focusBorderColor="purple.400"
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={state.password}
                onChange={inputHandle}
                focusBorderColor="purple.400"
              />
            </FormControl>

            <Button
              type="submit"
              colorScheme="purple"
              width="full"
              isLoading={loader}
              spinner={<PropagateLoader color="white" size={10} />}
            >
              Sign In
            </Button>

            <Text fontSize="sm">
              Don’t have an account?{" "}
              <Link to="/register" style={{ color: "#6f68d1", fontWeight: "bold" }}>
                Sign Up
              </Link>
            </Text>

            <Divider my={3} />

            <Text fontSize="sm" textAlign="center">
              Or sign in with
            </Text>

            <Flex gap={4}>
              <IconButton
                aria-label="Sign in with Google"
                icon={<FaGoogle />}
                colorScheme="red"
                size="lg"
              />
              <IconButton
                aria-label="Sign in with Facebook"
                icon={<FaFacebook />}
                colorScheme="blue"
                size="lg"
              />
            </Flex>
          </VStack>
        </form>
      </Container>
    </Flex>
  );
};

export default Login;
