import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { 
  Box, 
  SimpleGrid, 
  Text, 
  Container, 
  Spinner, 
  Alert, 
  AlertIcon,
  Heading,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Card,
  CardHeader,
  CardBody,
  Flex,
  Icon,
  Divider,
  useColorModeValue
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { dashbord } from "../../store/Reducers/productReducer";
import { FiShoppingBag, FiPackage, FiCreditCard, FiClock } from "react-icons/fi";

const AdminDashboard = () => {
  const dispatch = useDispatch();
 
  // ข้อมูลจาก Redux (ปรับตามโครงสร้าง backend)
  const {
    paid_orders = [],
    pending_orders = [],
    total_sales = [],
    all_products = [],
    loader, 
    error 
  } = useSelector((state) => state.product);

  // แปลงเดือนจากตัวเลขเป็นชื่อ
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];
  const monthLabels = total_sales.map((item) => 
    months[(item._id?.month || 1) - 1] || "Unknown"
  );

  // Theme colors
  const cardBg = useColorModeValue("white", "gray.700");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const primaryColor = "#4F46E5"; // Indigo color
  const secondaryColor = "#9F7AEA"; // Purple color

  const [chartOptions] = useState({
    chart: { 
      type: "bar", 
      height: 350,
      toolbar: {
        show: true,
        tools: {
          download: true,
          selection: true,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: true,
        }
      },
      fontFamily: "Inter, sans-serif",
    },
    plotOptions: {
      bar: { 
        horizontal: false, 
        columnWidth: "55%", 
        endingShape: "rounded",
        borderRadius: 4,
      },
    },
    dataLabels: { enabled: false },
    stroke: { show: true, width: 2, colors: ["transparent"] },
    xaxis: { 
      categories: monthLabels,
      axisBorder: { show: true, color: borderColor },
      axisTicks: { show: true, color: borderColor },
    },
    yaxis: { 
      title: { text: "ຍອດຂາຍ", style: { fontSize: '14px', fontWeight: 500 } },
      labels: { formatter: (val) => val.toLocaleString() }
    },
    fill: { opacity: 1 },
    tooltip: { 
      y: { formatter: (val) => val.toLocaleString() },
      theme: "light",
    },
    legend: { 
      position: "top",
      horizontalAlign: "right",
      offsetY: -30,
    },
    grid: {
      borderColor: borderColor,
      strokeDashArray: 4,
    },
    colors: [primaryColor, secondaryColor],
  });

  const [chartSeries, setChartSeries] = useState([
    { name: "ອໍເດີຕໍ່ເດືອນ", data: [] },
    { name: "ຍອດຂາຍຕໍ່ເດືອນ", data: [] },
  ]);

  // Fetch dashboard data
  useEffect(() => {
    dispatch(dashbord());
  }, [dispatch]);

  // Update chart data
  useEffect(() => {
    if (total_sales.length > 0) {
      setChartSeries([
        {
          name: "ອໍເດີຕໍ່ເດືອນ",
          data: total_sales.map((item) => item.totalOrders || 0),
        },
        {
          name: "ຍອດຂາຍຕໍ່ເດືອນ",
          data: total_sales.map((item) => item.totalRevenue || 0),
        },
      ]);
    }
  }, [total_sales]);

  // คำนวณยอดขายรวม
  const totalRevenue = total_sales.reduce((acc, curr) => acc + (curr.totalRevenue || 0), 0);

  // Stats data
  const statsData = [
    { 
      title: "Total Sales", 
      value: totalRevenue.toLocaleString() || 0, 
      icon: FiCreditCard,
      color: "purple.500" 
    },
    { 
      title: "Products", 
      value: all_products.length || 0, 
      icon: FiPackage,
      color: "blue.500" 
    },
    { 
      title: "Paid Orders", 
      value: paid_orders.length || 0, 
      icon: FiShoppingBag,
      color: "green.500" 
    },
    { 
      title: "Pending Orders", 
      value: pending_orders.length || 0, 
      icon: FiClock,
      color: "orange.500" 
    }
  ];

  return (
    <Container maxW="container.xl" py={8}>
      {loader && (
        <Flex direction="column" alignItems="center" justifyContent="center" py={10}>
          <Spinner size="xl" thickness="4px" speed="0.65s" color={primaryColor} />
          <Text mt={4} fontSize="lg">ກຳລັງໂຫລດ...</Text>
        </Flex>
      )}
      
      {error && (
        <Alert status="error" mb={6} borderRadius="lg" variant="left-accent">
          <AlertIcon />
          ເກີດຂໍ້ຜິດພາດ: {error}
        </Alert>
      )}
      
      {!loader && !error && (
        <>
          <Heading as="h1" size="xl" mb={6} color={primaryColor}>
            Dashboard Overview
          </Heading>
          
          <SimpleGrid columns={[1, 2, 4]} spacing={6} mb={8}>
            {statsData.map((stat, index) => (
              <Card key={index} borderRadius="lg" boxShadow="md" bg={cardBg} borderWidth="1px" borderColor={borderColor}>
                <CardBody>
                  <Flex align="center">
                    <Box p={3} borderRadius="lg" bg={stat.color} color="white" mr={4}>
                      <Icon as={stat.icon} boxSize={6} />
                    </Box>
                    <Stat>
                      <StatLabel color="gray.500">{stat.title}</StatLabel>
                      <StatNumber fontSize="2xl">{stat.value}</StatNumber>
                      <StatHelpText fontSize="sm">Current Period</StatHelpText>
                    </Stat>
                  </Flex>
                </CardBody>
              </Card>
            ))}
          </SimpleGrid>

          <Card borderRadius="lg" boxShadow="md" bg={cardBg} mb={8} borderWidth="1px" borderColor={borderColor}>
            <CardHeader pb={0}>
              <Heading size="md" color={primaryColor}>Monthly Sales Performance</Heading>
            </CardHeader>
            <CardBody pt={2}>
              {total_sales.length > 0 ? (
                <Chart
                  options={chartOptions}
                  series={chartSeries}
                  type="bar"
                  height={400}
                />
              ) : (
                <Flex justifyContent="center" alignItems="center" height="300px">
                  <Text textAlign="center" color="gray.500">ບໍ່ມີຂໍ້ມູນສຳລັບການສະແດງຜົນ</Text>
                </Flex>
              )}
            </CardBody>
          </Card>

          <Card borderRadius="lg" boxShadow="md" bg={cardBg} borderWidth="1px" borderColor={borderColor}>
            <CardHeader>
              <Heading size="md" color={primaryColor}>Recent Customer Messages</Heading>
            </CardHeader>
            <Divider borderColor={borderColor} />
            <CardBody>
              <Flex justifyContent="center" alignItems="center" height="100px">
                <Text color="gray.500">ຍັງບໍ່ມີຂໍ້ຄວາມລ່າສຸດ</Text>
              </Flex>
            </CardBody>
          </Card>
        </>
      )}
    </Container>
  );
};

export default AdminDashboard;