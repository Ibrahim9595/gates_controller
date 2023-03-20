import { Peripheral } from "../peripherals";

export type GatewayListItem = {
  id: string;
  name: string;
  ipv4: string;
  peripheral: Pick<Peripheral, "id" | "status">[];
};

export type GatewayDetails = {
  id: string;
  name: string;
  ipv4: string;
  peripheral: Peripheral[];
};

export type GatewaysProps = {
  data: GatewayListItem[];
};
