import {
  Box,
  SimpleGrid,
  Text,
  Stat,
  StatLabel,
  StatNumber,
  Card,
  CardHeader,
  CardBody,
  ButtonGroup,
  Button,
} from "@chakra-ui/react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get_success_payment, dash } from "../../store/Reducers/sellerReducer";

const SellerDashboard = () => {
  const dispatch = useDispatch();
  const { get_success_payments, dash_seller } = useSelector(
    (state) => state.seller
  );

  const { userInfo } = useSelector((state) => state.auth);
  const [totalOrders, setTotalOrders] = useState();
  const [salesData, setSalesData] = useState([]);
  const [timeframe, setTimeframe] = useState("daily"); // Default: "daily"

  useEffect(() => {
    dispatch(dash({ sellerId: userInfo._id }));
    setTotalOrders(get_success_payments.length);
    dispatch(get_success_payment({ sellId: userInfo._id }));
  }, [dispatch, userInfo._id, get_success_payments]);
  const getWeekNumber = (date) => {
    const startDate = new Date(date.getFullYear(), 0, 1);
    const diff = date - startDate;
    const oneDay = 1000 * 60 * 60 * 24;
    const weekNumber = Math.ceil((diff / oneDay + startDate.getDay() + 1) / 7);
    return weekNumber;
  };
  // การแปลงข้อมูลยอดขายตามช่วงเวลา
  useEffect(() => {
    const transformData = (timeframe) => {
      let groupedData = {};

      dash_seller.forEach((i) => {
        let dateKey;
        const dateObj = new Date(i.datePayment);

        switch (timeframe) {
          case "daily":
            dateKey = dateObj.toISOString().split("T")[0]; // YYYY-MM-DD
            break;
          case "monthly":
            dateKey = `${dateObj.getFullYear()}-${(dateObj.getMonth() + 1)
              .toString()
              .padStart(2, "0")}`; // YYYY-MM
            break;
          case "yearly":
            dateKey = `${dateObj.getFullYear()}`; // YYYY
            break;
          case "weekly":
            // คำนวณสัปดาห์ของปี
            const weekNumber = getWeekNumber(dateObj);
            dateKey = `${dateObj.getFullYear()}-W${weekNumber}`;
            break;
          default:
            return;
        }

        if (!groupedData[dateKey]) {
          groupedData[dateKey] = { date: dateKey, sales: 0 };
        }
        groupedData[dateKey].sales += i.authId.price; // รวมยอดขายของวันเดียวกัน
      });

      // แปลง Object -> Array
      let data = Object.values(groupedData);

      // คำนวณการเปลี่ยนแปลง (%)
      data = data.map((item, index, arr) => {
        if (index > 0) {
          const prevSales = arr[index - 1].sales;
          item.change = ((item.sales - prevSales) / prevSales) * 100;
        } else {
          item.change = 0; // เริ่มต้นไม่มีการเปลี่ยนแปลง
        }
        return item;
      });

      return data;
    };

    const data = transformData(timeframe);
    setSalesData(data);
  }, [dash_seller, timeframe]);

  // คำนวณยอดขายรวม
  const totalSeller = dash_seller.reduce((a, b) => a + b.authId.price, 0);

  return (
    <Box p={6}>
      {/* ปุ่มเลือกช่วงเวลา */}
      <ButtonGroup variant="outline" spacing="6" mb={6}>
        <Button onClick={() => setTimeframe("daily")}>รายวัน</Button>
        <Button onClick={() => setTimeframe("monthly")}>รายเดือน</Button>
        <Button onClick={() => setTimeframe("yearly")}>รายปี</Button>
        <Button onClick={() => setTimeframe("weekly")}>สัปดาห์นี้</Button>
      </ButtonGroup>

      {/* Summary Stats */}
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
        <StatBox title="ยอดขายรวม" value={`${totalSeller.toLocaleString()}`} />
        <StatBox title="คำสั่งซื้อทั้งหมด" value={totalOrders} />
        <StatBox title="สินค้าที่ขายได้" value={dash_seller.length} />
      </SimpleGrid>

      {/* Sales Graph */}
      <Card mt={6}>
        <CardHeader>
          <Text fontSize="lg" fontWeight="bold">
            แนวโน้มยอดขาย
          </Text>
        </CardHeader>
        <CardBody>
          <ResponsiveContainer width="95%" height="auto" aspect={2}>
            <BarChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis yAxisId="left" orientation="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Bar yAxisId="left" dataKey="sales" fill="#3182CE" barSize={40} />
              <Bar
                yAxisId="right"
                dataKey="change"
                fill="#e53e3e"
                barSize={20}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardBody>
      </Card>
    </Box>
  );
};

// Component for Stats
const StatBox = ({ title, value }) => (
  <Card p={4}>
    <Stat>
      <StatLabel>{title}</StatLabel>
      <StatNumber fontSize="2xl" fontWeight="bold">
        {value}
      </StatNumber>
    </Stat>
  </Card>
);

export default SellerDashboard;
