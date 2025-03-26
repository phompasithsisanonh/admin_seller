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
  Heading,
  InputGroup,
  InputRightElement,
  useColorModeValue,
  useDisclosure,
  Stack,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import logoshop from "../../layout/logoshop.png";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loader, errorMessage, successMessage } = useSelector(
    (state) => state.auth
  );

  const [state, setState] = useState({ email: "", password: "" });
  const { isOpen, onToggle } = useDisclosure();

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
  }, [successMessage, errorMessage, dispatch, navigate]);

  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const primaryColor = "purple.500";
  const secondaryColor = "purple.600";

  return (
    <Flex 
      minH="100vh" 
      bg={useColorModeValue("gray.50", "gray.900")} 
      align="center" 
      justify="center"
      p={4}
    >
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
          <Box 
            position="relative"
            p={2}
          >
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
            <Heading size="lg" mb={1} color={primaryColor}>Seller Portal</Heading>
            <Text fontSize="sm" color="gray.500">Access your seller dashboard</Text>
          </Box>

          <form onSubmit={submit} style={{ width: '100%' }}>
            <VStack spacing={5} align="stretch">
              <FormControl isRequired>
                <FormLabel fontSize="sm" fontWeight="medium">Email Address</FormLabel>
                <Input
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  value={state.email}
                  onChange={inputHandle}
                  size="md"
                  bg={useColorModeValue("gray.50", "gray.700")}
                  borderRadius="md"
                  focusBorderColor={primaryColor}
                />
              </FormControl>

              <FormControl isRequired>
                <Flex justify="space-between" align="center">
                  <FormLabel fontSize="sm" fontWeight="medium">Password</FormLabel>
                  <Link
                    to="/send-email"
                    style={{ fontSize: '0.75rem', color: '#805AD5' }}
                  >
                    Forgot Password?
                  </Link>
                </Flex>
                <InputGroup>
                  <Input
                    type={isOpen ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password"
                    value={state.password}
                    onChange={inputHandle}
                    size="md"
                    bg={useColorModeValue("gray.50", "gray.700")}
                    borderRadius="md"
                    focusBorderColor={primaryColor}
                  />
                  <InputRightElement>
                    <IconButton
                      icon={isOpen ? <ViewOffIcon /> : <ViewIcon />}
                      variant="ghost"
                      onClick={onToggle}
                      aria-label={isOpen ? "Hide password" : "Show password"}
                      size="sm"
                      color="gray.500"
                      _hover={{ color: primaryColor }}
                    />
                  </InputRightElement>
                </InputGroup>
              </FormControl>

              <Button
                type="submit"
                colorScheme="purple"
                width="full"
                size="md"
                mt={2}
                isLoading={loader}
                spinner={<PropagateLoader color="white" size={10} />}
                boxShadow="sm"
                _hover={{
                  transform: "translateY(-2px)",
                  boxShadow: "md",
                  bg: secondaryColor
                }}
                transition="all 0.2s ease"
              >
                Sign In
              </Button>
            </VStack>
          </form>

          <Stack direction="row" spacing={1} w="full" justify="center" pt={2}>
            <Text fontSize="sm" color="gray.500">
              Don't have an account?
            </Text>
            <Link to="/register">
              <Text fontSize="sm" color={primaryColor} fontWeight="semibold">
                Sign Up
              </Text>
            </Link>
          </Stack>

          <Box w="full" pt={2}>
            <Flex align="center" mb={4}>
              <Divider />
              <Text px={3} color="gray.500" fontSize="xs" textTransform="uppercase" fontWeight="bold">
                or continue with
              </Text>
              <Divider />
            </Flex>

            <Flex justify="center" gap={4}>
              <IconButton
                aria-label="Sign in with Google"
                icon={<FaGoogle />}
                colorScheme="red"
                variant="outline"
                borderRadius="md"
                size="lg"
                _hover={{
                  transform: "translateY(-2px)",
                  shadow: "md",
                }}
                transition="all 0.2s ease"
              />
              <IconButton
                aria-label="Sign in with Facebook"
                icon={<FaFacebook />}
                colorScheme="facebook"
                variant="outline"
                borderRadius="md"
                size="lg"
                _hover={{
                  transform: "translateY(-2px)",
                  shadow: "md",
                }}
                transition="all 0.2s ease"
              />
            </Flex>
          </Box>
        </VStack>
      </Container>
    </Flex>
  );
};

export default Login;