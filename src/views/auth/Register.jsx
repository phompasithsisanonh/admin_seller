import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle, FaFacebook } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { PropagateLoader } from "react-spinners";
import {
  seller_register,
  send_otp,
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
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(false);
  const { loader, successMessage, errorMessage } = useSelector(
    (state) => state.auth
  );

  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
    otp: "",
  });

  const inputHandle = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const sendOtp = () => {
    if (!state.email && state.name) {
      toast.error("Please enter your email");
      return;
    }
    dispatch(send_otp({ email: state.email }))
      .then(() => {
        setIsOtpSent(true);
        // ป้องกันการกด "Resend OTP" ซ้ำๆ รอ 30 วินาที
        setTimeout(() => {
          setResendDisabled(false);
        }, 30000);
      })
      .catch(() => {
        toast.error("Failed to send OTP");
      });
  };

  const submit = (e) => {
    e.preventDefault();
    if (!state.otp) {
      toast.error("Please enter OTP");
      return;
    }
    dispatch(seller_register(state));
  };

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
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

          {!isOtpSent ? (
            <Button
              colorScheme="blue"
              width="full"
              onClick={sendOtp}
              isLoading={loader}
            >
              Send OTP
            </Button>
          ) : (
            <>
              <FormControl isRequired>
                <FormLabel>OTP</FormLabel>
                <Input
                  type="text"
                  name="otp"
                  placeholder="Enter OTP"
                  value={state.otp}
                  onChange={inputHandle}
                  focusBorderColor="purple.400"
                />
                {/* ปุ่ม Resend OTP */}
                <Button
                  variant="link"
                  colorScheme="blue"
                  onClick={sendOtp}
                  isDisabled={resendDisabled}
                >
                  Resend OTP {resendDisabled ? "(Wait 30s)" : ""}
                </Button>
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
                onClick={submit}
                spinner={<PropagateLoader color="white" size={10} />}
              >
                Sign Up
              </Button>
            </>
          )}

          <Text fontSize="sm">
            Already have an account?{" "}
            <Link to="/login" style={{ color: "#6f68d1", fontWeight: "bold" }}>
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
      </Container>
    </Flex>
  );
};

export default Register;
