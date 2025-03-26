import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Heading,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { messageClear, reset_password } from "../../store/Reducers/authReducer";
import { useDispatch, useSelector } from "react-redux";

const ResetPassword = () => {
  const { token } = useParams();
  const { errorMessage, successMessage } = useSelector(
    (state) => state.auth || ""
  );
  const  navigate=useNavigate()
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
   const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your password reset logic here
    if (formData.newPassword !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    dispatch(
      reset_password({
        token: token,
        newPassword: formData.newPassword,
        confirmPassword: formData.confirmPassword,
      })
    );
    console.log("Password reset submitted:", formData);
  };
  useEffect(() => {
    if (successMessage) {
      setTimeout(() => {
        setIsLoading(false);

        toast({
          title: successMessage,
          description: "Check your inbox for the password reset link",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      }, 1500);
      navigate('/')
      dispatch(messageClear());
    }
    if (errorMessage) {
      setTimeout(() => {
        setIsLoading(false);
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
  }, [successMessage, errorMessage, dispatch, toast,navigate]);
  return (
    <Box
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg={useColorModeValue("gray.50", "gray.800")}
    >
     
      <Box
        maxW="md"
        w="full"
        bg={useColorModeValue("white", "gray.700")}
        boxShadow="lg"
        rounded="lg"
        p={6}
      >
        <Heading as="h1" size="lg" textAlign="center" mb={6}>
          Reset Password
        </Heading>
        <form onSubmit={handleSubmit}>
          <Stack spacing={4}>
            <FormControl id="newPassword" isRequired>
              <FormLabel>New Password</FormLabel>
              <Input
                type="password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                placeholder="Enter new password"
              />
            </FormControl>

            <FormControl id="confirmPassword" isRequired>
              <FormLabel>Confirm Password</FormLabel>
              <Input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm new password"
              />
            </FormControl>

            <Button   isLoading={isLoading} type="submit" colorScheme="blue" size="lg" fontSize="md">
                ອັບເດດລະຫັດຜ່ານໃໝ່
            </Button>
          </Stack>
        </form>
      </Box>
    </Box>
  );
};

export default ResetPassword;
