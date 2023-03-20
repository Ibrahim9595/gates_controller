import { FloatButton, Tag } from "antd";
import React, { useState } from "react";

import type { ColumnsType } from "antd/es/table";
import { GatewayListItem, GatewaysProps } from "./gateways.types";
import { BaseTable } from "../BaseTable/BaseTable";
import { GatewayDetails } from "./gateway-details";
import { GatewaysForm } from "../Forms/gateways";
import { PlusOutlined } from "@ant-design/icons";
import {
  useCreateGateway,
  useDeleteGateway,
  useUpdateGateway,
} from "../../hooks/useFetch";

export const Gateways: React.FC<GatewaysProps> = ({ data }) => {
  const [selectedGateway, setSelectedGateWay] =
    useState<GatewayListItem | null>(null);
  const [selectedToEdit, setSelectedToEdit] = useState<GatewayListItem | null>(
    null
  );

  const [addNew, setAddNew] = useState(false);

  const addMutation = useCreateGateway();
  const updateMutation = useUpdateGateway();
  const deleteMutation = useDeleteGateway();

  const columns: ColumnsType<GatewayListItem> = [
    {
      title: "name",
      key: "name",
      dataIndex: "name",
    },
    {
      title: "IPv4",
      key: "ipv4",
      dataIndex: "ipv4",
      render: (ipv4) => <Tag color="cyan">{ipv4}</Tag>,
    },
  ];

  return (
    <>
      <BaseTable
        columns={columns}
        data={data}
        onDelete={({ id }) =>
          deleteMutation.mutate(
            { id },
            {
              onError: (error: any) => alert(error.message),
            }
          )
        }
        onEdit={(el) => setSelectedToEdit(el)}
        onViewDetails={(el) => setSelectedGateWay(el)}
      />
      {selectedGateway && (
        <GatewayDetails
          data={selectedGateway}
          open={selectedGateway !== null}
          onClose={() => setSelectedGateWay(null)}
        />
      )}

      {selectedToEdit && (
        <GatewaysForm
          loading={updateMutation.isLoading}
          data={selectedToEdit}
          open={selectedToEdit !== null}
          onClose={() => setSelectedToEdit(null)}
          onSubmit={(values) => {
            updateMutation.mutate(
              { data: values, id: selectedToEdit.id },
              {
                onSuccess: () => {
                  setSelectedToEdit(null);
                },
                onError: () => alert("This name field already exist"),
              }
            );
          }}
        />
      )}

      {addNew && (
        <GatewaysForm
          open={addNew}
          loading={addMutation.isLoading}
          onClose={() => setAddNew(false)}
          onSubmit={(values) => {
            addMutation.mutate(values, {
              onSuccess: () => {
                setAddNew(false);
              },
              onError: () => alert("This name field already exist"),
            });
          }}
        />
      )}

      <FloatButton
        icon={<PlusOutlined />}
        type="primary"
        onClick={() => setAddNew(true)}
      />
    </>
  );
};
