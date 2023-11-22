import {
  DollarCircleOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Card, Space, Statistic, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { getProductListNoPagination } from "../api/productApi";
import { getOrderList } from "../api/orderApi";
import { getUserList } from "../api/adminApi";


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Dashboard() {
  const [orders, setOrders] = useState(0);
  const [product, setProduct] = useState(0);
  const [customers, setCustomers] = useState(0);
  const [revenue, setRevenue] = useState(0);

  useEffect(() => {
    getOrderList().then((res) => {
      setOrders(res.data.data?.length);
      setRevenue(res.data.data?.length);
    });
    getProductListNoPagination().then((res) => {
      setProduct(res.data.data?.length);
    });
    getUserList().then((res) => {
      setCustomers(res.data.data?.length);
    });
  }, []);

  return (
    <Space size={20} direction="vertical">
      <Typography.Title level={4}>Dashboard</Typography.Title>
      <Space direction="horizontal">
        <DashboardCard
          icon={
            <ShoppingCartOutlined
              style={{
                color: "green",
                backgroundColor: "rgba(0,255,0,0.25)",
                borderRadius: 20,
                fontSize: 24,
                padding: 8,
              }}
            />
          }
          title={"Orders"}
          value={orders}
        />
        <DashboardCard
          icon={
            <ShoppingOutlined
              style={{
                color: "blue",
                backgroundColor: "rgba(0,0,255,0.25)",
                borderRadius: 20,
                fontSize: 24,
                padding: 8,
              }}
            />
          }
          title={"Product"}
          value={product}
        />
        <DashboardCard
          icon={
            <UserOutlined
              style={{
                color: "purple",
                backgroundColor: "rgba(0,255,255,0.25)",
                borderRadius: 20,
                fontSize: 24,
                padding: 8,
              }}
            />
          }
          title={"Customer"}
          value={customers}
        />
        <DashboardCard
          icon={
            <DollarCircleOutlined
              style={{
                color: "red",
                backgroundColor: "rgba(255,0,0,0.25)",
                borderRadius: 20,
                fontSize: 24,
                padding: 8,
              }}
            />
          }
          title={"Revenue"}
          value={revenue}
        />
      </Space>
      <Space>
        <RecentOrders />
        <DashboardChart />
      </Space>
    </Space>
  );
}

function DashboardCard({ title, value, icon }:{ title:any, value:any, icon:any }) {
  return (
    <Card>
      <Space direction="horizontal">
        {icon}
        <Statistic title={title} value={value} />
      </Space>
    </Card>
  );
}
function RecentOrders() {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getOrderList().then((res) => {
      setDataSource(res.data.data.splice(0, 3));
      setLoading(false);
    });
  }, []);

  return (
    <>
      <Typography.Text>Recent Orders</Typography.Text>
      <Table
        columns={[
          {
            title: "Title",
            dataIndex: "title",
          },
          {
            title: "Quantity",
            dataIndex: "quantity",
          },
          {
            title: "Price",
            dataIndex: "discountedPrice",
          },
        ]}
        loading={loading}
        dataSource={dataSource}
        pagination={false}
      ></Table>
    </>
  );
}

function DashboardChart() {
  const [reveneuData, setReveneuData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    getProductListNoPagination().then((res) => {
      const productData = res.data.data;
      const labels = productData.map((item: { ProductName: any; }) => {
        return `Product-${item.ProductName}`;
      });
      const data = productData.map((item: { ProductNumber: any; }) => {
        return `${item.ProductNumber}`;
      });
      // const data = labels.map(() => productData.dataType.number({ min: 0, max: 1000 }))

      const dataSource:any = {
        labels,
        datasets: [
          {
            label: "Inventory",
            data: data,
            backgroundColor: "rgba(53, 162, 235, 1)",
          },
        ],
      };
      setReveneuData(dataSource);
    });
  }, []);

  const options:any = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: "Product Inventory",
      },
      //the bar size
      scales: {
        xAxes: [
          {
            stacked: true,
            ticks: {
              padding: 5
            },
            gridLines: {
              display: true
            }
          }
        ],
        yAxes: [
          {
            stacked: false,
            gridLines: {
              drawBorder: true
            },
            ticks: {
              beginAtZero: true,
              maxTicksLimit: 6,
              padding: 20,
              callback(ProductNumber:any) {
                if (ProductNumber < 1e3) return ProductNumber;
                if (ProductNumber >= 1e3) return +(ProductNumber / 1e3).toFixed(1) + "K";
              }
            }
          }
        ]
      },
    },
  };

  return (
    <Card style={{ width: 500, height: 250 }}>
      <Bar options={options} data={reveneuData} />
    </Card>
  );
}
export default Dashboard;