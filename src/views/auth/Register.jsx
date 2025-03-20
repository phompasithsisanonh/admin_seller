import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle, FaFacebook } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { PropagateLoader } from "react-spinners";
import {
  seller_register,
  messageClear,
} from "../../store/Reducers/authReducer";
import toast from "react-hot-toast";
import {
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  Divider,
  Checkbox,
  VStack,
  IconButton,
} from "@chakra-ui/react";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loader, successMessage, errorMessage } = useSelector(
    (state) => state.auth
  );

  const [state, setState] = useState({ name: "", email: "", password: "" });

  const inputHandle = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const submit = (e) => {
    e.preventDefault();
    dispatch(seller_register(state));
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
  }, [successMessage, errorMessage, dispatch, navigate]);

  return (
    <Flex minH="100vh" bg="#f7f7fc" align="center" justify="center">
      <Container maxW="sm" bg="white" p={6} rounded="lg" shadow="lg">
        <Heading as="h2" size="lg" textAlign="center" mb={2} color="purple.600">
          Welcome to Ecommerce
        </Heading>
        <Text textAlign="center" color="gray.600" mb={4}>
          Please register your account
        </Text>

        <form onSubmit={submit}>
          <VStack spacing={4}>
            <FormControl isRequired>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={state.name}
                onChange={inputHandle}
                focusBorderColor="purple.400"
              />
            </FormControl>

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

            <Checkbox colorScheme="purple">
              I agree to the{" "}
              <Link to="/terms" style={{ color: "#6f68d1" }}>
                Privacy Policy & Terms
              </Link>
            </Checkbox>

            <Button
              type="submit"
              colorScheme="purple"
              width="full"
              isLoading={loader}
              spinner={<PropagateLoader color="white" size={10} />}
            >
              Sign Up
            </Button>

            <Text fontSize="sm">
              Already have an account?{" "}
              <Link
                to="/login"
                style={{ color: "#6f68d1", fontWeight: "bold" }}
              >
                Sign In
              </Link>
            </Text>

            <Divider my={3} />

            <Text fontSize="sm" textAlign="center">
              Or sign up with
            </Text>

            <Flex gap={4}>
              <IconButton
                aria-label="Sign up with Google"
                icon={<FaGoogle />}
                colorScheme="red"
                size="lg"
              />
              <IconButton
                aria-label="Sign up with Facebook"
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

export default Register;
