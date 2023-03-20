import { Form, Input, Button, Modal, Radio } from "antd";
import { Peripheral } from "../peripherals";

type FormData = Pick<Peripheral, "vendor" | "status">;
type PeripheralsFormProps = {
  data?: Partial<FormData>;
  open: boolean;
  onClose: () => void;
  onSubmit: (values: FormData) => void;
};

export const PeripheralsForm: React.FC<PeripheralsFormProps> = ({
  data = {},
  open,
  onClose,
  onSubmit,
}) => {
  const [form] = Form.useForm();

  return (
    <Modal open={open} onCancel={onClose} footer={null}>
      <Form
        layout={"vertical"}
        form={form}
        initialValues={data}
        onFinish={onSubmit}
        style={{ maxWidth: 600 }}
      >
        <Form.Item
          label="Peripheral vendor"
          name="vendor"
          rules={[{ required: true, message: "This field is required" }]}
        >
          <Input placeholder="Enter Peripheral vendor name" />
        </Form.Item>
        <Form.Item
          label="Online"
          name="status"
          rules={[{ required: true, message: "This field is required" }]}
        >
          <Radio.Group>
            <Radio value="online">Online</Radio>
            <Radio value="offline">Offline</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};
