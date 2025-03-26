import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Text,
  useToast,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Flex,
} from "@chakra-ui/react";
import { EmailIcon, ArrowBackIcon, CheckCircleIcon } from "@chakra-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { messageClear, send_mail } from "../../store/Reducers/authReducer";
import { useNavigate } from "react-router-dom";


const ForgotPassword = () => {
  const { errorMessage, successMessage } = useSelector(
    (state) => state.auth || ""
  );
  const  navigate=useNavigate()
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    dispatch(send_mail({ email: email }));
    // Simulate API call
  };

  const handleReset = () => {
    setEmail("");
    setIsSubmitted(false);
  };
  useEffect(() => {
    if (successMessage) {
      setTimeout(() => {
        setIsLoading(false);
        setIsSubmitted(true);
        toast({
          title: successMessage,
          description: "Check your inbox for the password reset link",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      }, 1500);
      dispatch(messageClear());
    }
    if (errorMessage) {
      setTimeout(() => {
        setIsLoading(false);
        setIsSubmitted(false);
        toast({
          title: errorMessage,
          description: "error",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }, 1500);
      dispatch(messageClear());
    }
  }, [successMessage, errorMessage, dispatch, toast]);
  return (
    <Flex justify="center" align="center" minH="100vh" bg="gray.50">
      <Card maxW="md" w="full" boxShadow="md" borderRadius="lg">
        <CardHeader pb={0}>
          <Heading size="lg">Reset Password</Heading>
          <Text color="gray.600" mt={2}>
            Enter your email address and we'll send you instructions to reset
            your password.
          </Text>
        </CardHeader>

        <CardBody pt={6}>
          {!isSubmitted ? (
            <form onSubmit={handleSubmit}>
              <Stack spacing={4}>
                <FormControl id="email" isRequired>
                  <FormLabel>Email</FormLabel>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <EmailIcon color="gray.400" />
                    </InputLeftElement>
                    <Input
                      type="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </InputGroup>
                  <FormHelperText>
                    We'll send a password reset link to this email.
                  </FormHelperText>
                </FormControl>

                <Button
                  type="submit"
                  colorScheme="blue"
                  w="full"
                  isLoading={isLoading}
                  loadingText="Sending"
                >
                  Send Reset Link
                </Button>
              </Stack>
            </form>
          ) : (
            <Stack spacing={4}>
              <Alert
                status="success"
                variant="subtle"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                textAlign="center"
                borderRadius="md"
                py={4}
              >
                <AlertIcon as={CheckCircleIcon} boxSize={6} mr={0} />
                <AlertTitle mt={4} mb={1} fontSize="lg">
                  Check your inbox
                </AlertTitle>
                <AlertDescription maxWidth="sm">
                  We've sent a password reset link to{" "}
                  <Text as="span" fontWeight="medium">
                    {email}
                  </Text>
                  . Please check your inbox and follow the instructions.
                </AlertDescription>
              </Alert>

              <Button
                variant="outline"
                leftIcon={<ArrowBackIcon />}
                onClick={handleReset}
                w="full"
              >
                Back to Reset Password
              </Button>
            </Stack>
          )}
        </CardBody>

        <Divider />

        <CardFooter justifyContent="center">
          <Button onClick={()=>navigate('/login')} variant="link" colorScheme="blue" size="sm">
            Return to Login
          </Button>
        </CardFooter>
      </Card>
    </Flex>
  );
};

export default ForgotPassword;
