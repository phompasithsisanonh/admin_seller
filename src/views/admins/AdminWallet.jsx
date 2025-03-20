import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Flex,
  Heading,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Card,
  CardHeader,
  CardBody,
  Input,
  Button,
  VStack,
  Text,
  IconButton,
  Spinner,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import {
  FaWallet,
  FaArrowUp,
  FaArrowDown,
  FaHistory,
  FaCog,
  FaQrcode,
  FaCopy,
} from "react-icons/fa";
import { get_wallet } from "../../store/Reducers/walletReducer";
import { useDispatch, useSelector } from "react-redux";

const AdminWallet = () => {
  const dispatch = useDispatch();
  const { wallet, loading, error } = useSelector((state) => state.wallet);
  const [recipientAddress, setRecipientAddress] = useState("");
  const [sendAmount, setSendAmount] = useState("");
  
  useEffect(() => {
    dispatch(get_wallet());
  }, [dispatch]);

  // Calculate dates for today and yesterday in local time
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);
  
  // Format date to YYYY-MM-DD
  const formatDate = (date) => date.toISOString().split("T")[0];
  const yesterdayStr = formatDate(yesterday);
  const todayStr = formatDate(today);
  
  // Filter transactions by date
  const yesterdayTransactions = wallet.filter(
    (t) => formatDate(new Date(t.createdAt)) === yesterdayStr
  );
  const todayTransactions = wallet.filter(
    (t) => formatDate(new Date(t.createdAt)) === todayStr
  );
  
  // Calculate daily totals
  const yesterdayAmount = yesterdayTransactions.reduce((total, transaction) => 
    total + transaction.amount, 0);
  const todayAmount = todayTransactions.reduce((total, transaction) => 
    total + transaction.amount, 0);
  
  // Calculate day-over-day change
  const dailyChange = todayAmount - yesterdayAmount;
  
  // Calculate total balance from all transactions
  const totalCommission = wallet.reduce((total, transaction) => 
    total + transaction.amount, 0);
  
  // Format currency values
  const formatCurrency = (value) => {
    return value.toLocaleString('en-US', {
      style: 'currency',
      currency: 'KIP',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };
  
  // Handle copying wallet address
  const handleCopyAddress = () => {
    const address = "0x1234...5678"; // Replace with actual wallet address
    navigator.clipboard.writeText(address);
    // Could add a toast notification here
  };

  // Render loading state
  if (loading) {
    return (
      <Container centerContent>
        <Spinner size="xl" mt={20} />
      </Container>
    );
  }

  // Render error state
  if (error) {
    return (
      <Container maxW="container.xl" py={6}>
        <Alert status="error">
          <AlertIcon />
          Failed to load wallet data. Please try again later.
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxW="container.xl" py={6}>
      <Flex justify="space-between" align="center" mb={6}>
        <Heading size="lg">Admin Wallet</Heading>
        <IconButton 
          icon={<FaCog />} 
          variant="outline" 
          aria-label="Settings" 
        />
      </Flex>

      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} mb={6}>
        <Card>
          <CardBody>
            <Stat>
              <Flex justify="space-between" align="center">
                <StatLabel>Total Balance</StatLabel>
                <Box color="gray.500">
                  <FaWallet />
                </Box>
              </Flex>
              <StatNumber>{formatCurrency(totalCommission)}</StatNumber>
              <StatHelpText color="green.500">
                {todayTransactions.length} transactions today
              </StatHelpText>
            </Stat>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <Stat>
              <Flex justify="space-between" align="center">
                <StatLabel>Income</StatLabel>
                <Box color={dailyChange >= 0 ? "green.500" : "red.500"}>
                  {dailyChange > 0 ? <FaArrowUp /> : 
                   dailyChange < 0 ? <FaArrowDown /> : 
                   <FaArrowUp />}
                </Box>
              </Flex>
              <StatNumber>{formatCurrency(totalCommission)}</StatNumber>
              <StatHelpText color={dailyChange >= 0 ? "green.500" : "red.500"}>
                {dailyChange > 0 
                  ? `ເພີ່ມຂື້ນ ${formatCurrency(dailyChange)} ຈາກເມື່ອວານ` 
                  : dailyChange < 0 
                    ? `ຫຼຸດລົງ ${formatCurrency(Math.abs(dailyChange))} ຈາກເມື້ອວານ`
                    : `No change from yesterday`}
              </StatHelpText>
            </Stat>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <Stat>
              <Flex justify="space-between" align="center">
                <StatLabel>Expenses</StatLabel>
                <Box color="red.500">
                  <FaArrowDown />
                </Box>
              </Flex>
              <StatNumber>$0.00</StatNumber>
              <StatHelpText>
                Pending implementation
              </StatHelpText>
            </Stat>
          </CardBody>
        </Card>
      </SimpleGrid>

      <Tabs variant="enclosed">
        <TabList>
          <Tab>Transactions</Tab>
          <Tab>Send</Tab>
          <Tab>Receive</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Card>
              <CardHeader>
                <Heading size="md">Recent Transactions</Heading>
              </CardHeader>
              <CardBody>
                <VStack spacing={4}>
                  {wallet.length > 0 ? (
                    wallet.slice(0, 5).map((transaction, index) => (
                      <Box
                        key={transaction.id || index}
                        p={4}
                        borderWidth="1px"
                        borderRadius="lg"
                        width="100%"
                      >
                        <Flex justify="space-between" align="center">
                          <Flex align="center" gap={4}>
                            <FaHistory />
                            <Box>
                              <Text fontWeight="medium">
                                {transaction.description || `Transaction #${index + 1}`}
                              </Text>
                              <Text fontSize="sm" color="gray.500">
                                {new Date(transaction.createdAt).toLocaleDateString()}
                              </Text>
                            </Box>
                          </Flex>
                          <Box textAlign="right">
                            <Text fontWeight="medium">
                              {formatCurrency(transaction.amount)}
                            </Text>
                            <Text 
                              fontSize="sm" 
                              color={transaction.status === "completed" ? "green.500" : "orange.500"}
                            >
                              {transaction.status || "Completed"}
                            </Text>
                          </Box>
                        </Flex>
                      </Box>
                    ))
                  ) : (
                    <Text>No transactions found</Text>
                  )}
                </VStack>
              </CardBody>
            </Card>
          </TabPanel>

          <TabPanel>
            <Card>
              <CardHeader>
                <Heading size="md">Send Funds</Heading>
              </CardHeader>
              <CardBody>
                <VStack spacing={4}>
                  <Box width="100%">
                    <Text mb={2} fontWeight="medium">
                      Recipient Address
                    </Text>
                    <Input 
                      placeholder="Enter wallet address" 
                      value={recipientAddress}
                      onChange={(e) => setRecipientAddress(e.target.value)}
                    />
                  </Box>
                  <Box width="100%">
                    <Text mb={2} fontWeight="medium">
                      Amount
                    </Text>
                    <Input 
                      type="number" 
                      placeholder="0.00" 
                      value={sendAmount}
                      onChange={(e) => setSendAmount(e.target.value)}
                    />
                  </Box>
                  <Button 
                    colorScheme="blue" 
                    width="100%"
                    isDisabled={!recipientAddress || !sendAmount}
                  >
                    Send Transaction
                  </Button>
                </VStack>
              </CardBody>
            </Card>
          </TabPanel>

          <TabPanel>
            <Card>
              <CardHeader>
                <Heading size="md">Receive Funds</Heading>
              </CardHeader>
              <CardBody>
                <VStack spacing={4}>
                  <Box width="100%">
                    <Text mb={2} fontWeight="medium">
                      Your Wallet Address
                    </Text>
                    <Flex gap={2}>
                      <Input readOnly value="0x1234...5678" />
                      <IconButton 
                        icon={<FaCopy />} 
                        aria-label="Copy address"
                        onClick={handleCopyAddress} 
                      />
                    </Flex>
                  </Box>
                  <Flex
                    height="64"
                    width="100%"
                    justify="center"
                    align="center"
                    borderWidth="1px"
                    borderRadius="lg"
                  >
                    <FaQrcode size={100} color="gray" />
                  </Flex>
                </VStack>
              </CardBody>
            </Card>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
};

export default AdminWallet;