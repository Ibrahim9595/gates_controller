export type Peripheral = {
  id: string;
  gatewayId: string;
  status: "online" | "offline";
  vendor: string;
  created: string;
};

export type PeripheralProps = {
  data: Peripheral[];
  gatewayId: string;
};
