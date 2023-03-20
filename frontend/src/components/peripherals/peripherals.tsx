import { Tag } from "antd";
import React, { useState } from "react";

import type { ColumnsType } from "antd/es/table";
import { Peripheral, PeripheralProps } from "./peripherals.types";
import { BaseTable } from "../BaseTable/BaseTable";
import { PeripheralsForm } from "../Forms/peripherals";
import { useDeletePeripheral, useUpdatePeripheral } from "../../hooks/useFetch";

export const Peripherals: React.FC<PeripheralProps> = ({ data, gatewayId }) => {
  const [selectedToEdit, setSelectedToEdit] = useState<Peripheral | null>(null);
  const updateMutation = useUpdatePeripheral(gatewayId);
  const deleteMutation = useDeletePeripheral(gatewayId);

  const columns: ColumnsType<Peripheral> = [
    {
      title: "UID",
      key: "id",
      dataIndex: "id",
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      render: (status) => (
        <Tag color={status === "online" ? "green" : "red"}>{status}</Tag>
      ),
    },
    {
      title: "Vendor",
      key: "vendor",
      dataIndex: "vendor",
    },
    {
      title: "Created At",
      key: "createdAt",
      dataIndex: "created",
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
      />
      {selectedToEdit && (
        <PeripheralsForm
          data={selectedToEdit}
          open={selectedToEdit !== null}
          onClose={() => setSelectedToEdit(null)}
          onSubmit={(values) => {
            updateMutation.mutate(
              { data: values, id: selectedToEdit.id },
              {
                onError: (error: any) => alert(error.message),
                onSuccess: () => {
                  setSelectedToEdit(null);
                },
              }
            );
          }}
        />
      )}
    </>
  );
};
