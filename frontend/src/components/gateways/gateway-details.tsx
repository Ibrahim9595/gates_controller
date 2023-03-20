import { Button, Modal, Space, Spin, Tag } from "antd";
import React, { useState } from "react";
import { Peripherals } from "../peripherals";
import { GatewayListItem } from "./gateways.types";
import { PlusOutlined } from "@ant-design/icons";
import { PeripheralsForm } from "../Forms/peripherals";
import { useCreatePeripheral, useGetGetwayDetails } from "../../hooks/useFetch";

type GatewayDetailsProps = {
  data: GatewayListItem;
  open: boolean;
  onClose: () => void;
};

export const GatewayDetails: React.FC<GatewayDetailsProps> = ({
  data: { id, name, ipv4 },
  open,
  onClose,
}) => {
  const { isLoading, data, isError } = useGetGetwayDetails(id);
  const [addNew, setAddNew] = useState(false);
  const addMutation = useCreatePeripheral(id);

  return (
    <>
      <Modal open={open} onCancel={onClose} footer={null} width={700}>
        <Space size="large" direction="horizontal">
          <h1>Gateway: </h1>
          <h2>{name}</h2>
          <Tag color="cyan">{ipv4}</Tag>
          <Button
            shape="circle"
            icon={<PlusOutlined />}
            onClick={() => setAddNew(true)}
          />
        </Space>
        {isLoading && <Spin size="large" />}
        {isError && <p>Error fetching details</p>}
        {data && <Peripherals data={data.data.peripheral} gatewayId={id} />}
      </Modal>
      {addNew && (
        <PeripheralsForm
          onClose={() => setAddNew(false)}
          open={addNew}
          onSubmit={(values) => {
            addMutation.mutate(values, {
              onSuccess: () => {
                setAddNew(false);
              },
              onError: (error: any) => alert(error.message),
            });
          }}
        />
      )}
    </>
  );
};
