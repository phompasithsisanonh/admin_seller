import { Box, Text, Icon, Button } from "@chakra-ui/react";
import { WarningIcon } from "@chakra-ui/icons";

const Destive = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      bg="red.100"
      p={6}
      borderRadius="md"
      border="1px solid"
      borderColor="red.300"
      maxW="400px"
      mx="auto"
      mt={10}
      boxShadow="lg"
    >
      <Icon as={WarningIcon} boxSize={12} color="red.500" mb={4} />
      <Text fontSize="xl" fontWeight="bold" color="red.700">
        Access Denied
      </Text>
      <Text fontSize="md" color="red.600" mt={2}>
        Your seller account is currently blocked. Please contact support for assistance.
      </Text>
      <Button colorScheme="red" mt={4} isDisabled>
        Restricted Access
      </Button>
    </Box>
  );
};



export default Destive;