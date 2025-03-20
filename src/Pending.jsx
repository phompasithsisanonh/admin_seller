import { Box, Text, Icon, VStack } from "@chakra-ui/react";
import { MdWarningAmber } from "react-icons/md";

const  Pending = () => {
  return (
    <Box

      height="100vh"
      bg="yellow.100"
      padding={0}
      margin={0}
    >
      <VStack
        p={6}
        bg="yellow.300"
        borderRadius="lg"
        boxShadow="lg"
        textAlign="center"
      >
        <Icon as={MdWarningAmber} boxSize={16} color="yellow.700" />
        <Text fontSize="xl" fontWeight="bold" color="yellow.800">
          Pending Admin Approval
        </Text>
        <Text fontSize="md" color="yellow.700">
          Your access request is under review. Please wait for admin approval.
        </Text>
      </VStack>
    </Box>
  );
};

export default  Pending;
