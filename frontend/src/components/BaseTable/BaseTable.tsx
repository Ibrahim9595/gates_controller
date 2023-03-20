import Table, { ColumnsType } from "antd/es/table";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Space } from "antd";

type BaseTableProps<T = any> = {
  columns: ColumnsType<T>;
  data: T;
  onViewDetails?: (el: T) => void;
  onDelete?: (el: T) => void;
  onEdit?: (el: T) => void;
};

export const BaseTable: React.FC<BaseTableProps> = ({
  columns,
  data,
  onDelete,
  onEdit,
  onViewDetails,
}) => {
  return (
    <Table
      columns={[
        ...columns,
        {
          title: "Actions",
          key: "actions",
          fixed: "right",
          render: (_, record) => (
            <Space direction="horizontal" size="small">
              {onViewDetails && (
                <Button
                  shape="circle"
                  icon={<EyeOutlined />}
                  onClick={() => onViewDetails(record)}
                />
              )}
              {onDelete && (
                <Popconfirm
                  title="Delete confirm"
                  description="Are you sure to delete this item?"
                  okText="Yes"
                  cancelText="No"
                  onConfirm={() => onDelete(record)}
                >
                  <Button shape="circle" icon={<DeleteOutlined />} />
                </Popconfirm>
              )}
              {onEdit && (
                <Button
                  shape="circle"
                  icon={<EditOutlined />}
                  onClick={() => onEdit(record)}
                />
              )}
            </Space>
          ),
        },
      ]}
      dataSource={data}
      pagination={false}
    />
  );
};
