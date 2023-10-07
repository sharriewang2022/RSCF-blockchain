import { Layout, Button, Space, Typography } from "antd";
import { ThemedTitleV2 } from "@refinedev/antd";
// highlight-next-line
import { useLogin } from "@refinedev/core";

export const Login: React.FC = () => {
    // highlight-next-line
    const { mutate: login, isLoading } = useLogin();

    return (
        <Layout
            style={{
                height: "100vh",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Space direction="vertical" align="center" size="large">
                <ThemedTitleV2
                    collapsed={false}
                    wrapperStyles={{
                        fontSize: "22px",
                    }}
                />
                <Button
                    type="primary"
                    size="middle"
                    loading={isLoading}
                    onClick={() => login({})}
                >
                   Ethereum Login
                </Button>
                <Typography.Text type="secondary">
                    Powered by Auth0
                </Typography.Text>
            </Space>
        </Layout>
    );
};