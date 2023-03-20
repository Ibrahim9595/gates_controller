import { Form, Input, Button, Modal } from "antd";
import { GatewayDetails } from "../gateways/gateways.types";

export type GatewayFormData = Pick<GatewayDetails, "name" | "ipv4">;
type GatewaysFormProps = {
  data?: Partial<GatewayFormData>;
  open: boolean;
  loading: boolean;
  onClose: () => void;
  onSubmit: (values: GatewayFormData) => void;
};

export const GatewaysForm: React.FC<GatewaysFormProps> = ({
  data = {},
  open,
  onClose,
  loading,
  onSubmit,
}) => {
  const [form] = Form.useForm();

  return (
    <Modal open={open} footer={null} onCancel={onClose}>
      <Form
        layout={"vertical"}
        form={form}
        initialValues={data}
        onFinish={onSubmit}
        style={{ maxWidth: 600 }}
      >
        <Form.Item
          label="gateway name"
          name="name"
          rules={[{ required: true, message: "This field is required" }]}
        >
          <Input placeholder="Enter gateway name" />
        </Form.Item>
        <Form.Item
          label="IPv4"
          name="ipv4"
          rules={[
            { required: true, message: "This field is required" },
            {
              pattern:
                /(\b25[0-5]|\b2[0-4][0-9]|\b[01]?[0-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}/,
              message: "This should be an ipv4",
            },
          ]}
        >
          <Input placeholder="ex@ 192.1.1.1" />
        </Form.Item>
        <Form.Item>
          <Button
            loading={loading}
            disabled={loading}
            type="primary"
            htmlType="submit"
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};
