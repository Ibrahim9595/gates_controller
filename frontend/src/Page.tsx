import { Space, Spin } from "antd";
import { Gateways } from "./components/gateways/gateways";
import { useGetGateways } from "./hooks/useFetch";

export const Page = () => {
  const { isLoading, data, isError } = useGetGateways();

  return (
    <>
      {isLoading && (
        <Space align="center">
          <Spin size="large" />
        </Space>
      )}
      {isError && <p>Error</p>}
      {data && <Gateways data={data.data} />}
    </>
  );
};
