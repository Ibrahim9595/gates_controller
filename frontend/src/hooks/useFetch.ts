import { useQuery, useMutation, useQueryClient } from "react-query";
import {
  GatewayDetails,
  GatewayListItem,
} from "../components/gateways/gateways.types";
import { Peripheral } from "../components/peripherals";
const BASE_URL = "http://localhost:5500";

type Response<T> = {
  data: T;
  status: number;
};
export const performFetch = async (
  path: string,
  {
    method = "GET",
    body = {},
  }: { body?: any; method?: "GET" | "POST" | "PUT" | "DELETE" }
) =>
  fetch(`${BASE_URL}/${path}`, {
    body: method === "GET" ? undefined : JSON.stringify(body),
    method,
    headers: {
      "Content-Type": "application/json",
    },
  }).then(async (res) => {
    if (res.statusText !== "OK") {
      throw await res.json();
    }
    return res.json();
  });

export const useGetGateways = () => {
  return useQuery<Response<GatewayListItem[]>>("gateways", () =>
    performFetch("gateways", {})
  );
};

export const useGetGetwayDetails = (id: string) => {
  return useQuery<Response<GatewayDetails>>(["gateway", id], () =>
    performFetch(`gateways/${id}`, {})
  );
};

export const useCreateGateway = () => {
  const queryClient = useQueryClient();
  return useMutation<
    Response<GatewayListItem>,
    unknown,
    Omit<GatewayListItem, "peripheral" | "id">
  >(
    "gateways",
    (el) => performFetch("gateways", { method: "POST", body: el }),
    {
      onSuccess: ({ data }) => {
        const { status, data: oldData } = queryClient.getQueryData(
          "gateways"
        ) as Response<GatewayListItem[]>;
        queryClient.setQueryData("gateways", {
          status,
          data: oldData.concat(data),
        });
      },
    }
  );
};

export const useUpdateGateway = () => {
  const queryClient = useQueryClient();
  return useMutation<
    Response<GatewayListItem>,
    unknown,
    { data: Omit<GatewayListItem, "peripheral" | "id">; id: string }
  >(
    "gateways",
    ({ data, id }) =>
      performFetch(`gateways/${id}`, { method: "PUT", body: data }),
    {
      onSuccess: ({ data }) => {
        const { status, data: oldData } = queryClient.getQueryData(
          "gateways"
        ) as Response<GatewayListItem[]>;
        queryClient.setQueryData("gateways", {
          status,
          data: oldData.map((el) => (el.id === data.id ? data : el)),
        });
      },
    }
  );
};

export const useDeleteGateway = () => {
  const queryClient = useQueryClient();
  return useMutation<Response<GatewayListItem>, unknown, { id: string }>(
    "gateways",
    ({ id }) => performFetch(`gateways/${id}`, { method: "DELETE" }),
    {
      onSuccess: ({ data }) => {
        queryClient.refetchQueries("gateways");
      },
    }
  );
};

export const useCreatePeripheral = (gatewayId: string) => {
  const key = ["gateway", gatewayId];
  const queryClient = useQueryClient();
  return useMutation<
    Response<Peripheral>,
    unknown,
    Omit<Peripheral, "gatewayId" | "id" | "created">
  >(
    key,
    (el) =>
      performFetch(`gateways/${gatewayId}/peripherals`, {
        method: "POST",
        body: el,
      }),
    {
      onSuccess: ({ data }) => {
        const { status, data: oldData } = (queryClient.getQueryData(key) ||
          {}) as Response<GatewayDetails>;

        queryClient.setQueryData(key, {
          status,
          data: { ...oldData, peripheral: oldData.peripheral.concat(data) },
        });
      },
    }
  );
};

export const useUpdatePeripheral = (gatewayId: string) => {
  const key = ["gateway", gatewayId];
  const queryClient = useQueryClient();
  return useMutation<
    Response<Peripheral>,
    unknown,
    { data: Omit<Peripheral, "gatewayId" | "id" | "created">; id: string }
  >(
    key,
    ({ data, id }) =>
      performFetch(`gateways/${gatewayId}/peripherals/${id}`, {
        method: "PUT",
        body: data,
      }),
    {
      onSuccess: ({ data }) => {
        const { status, data: oldData } = (queryClient.getQueryData(key) ||
          {}) as Response<GatewayDetails>;

        queryClient.setQueryData(key, {
          status,
          data: {
            ...oldData,
            peripheral: oldData.peripheral.map((el) =>
              el.id === data.id ? data : el
            ),
          },
        });
      },
    }
  );
};

export const useDeletePeripheral = (gatewayId: string) => {
  const key = ["gateway", gatewayId];
  const queryClient = useQueryClient();
  return useMutation<Response<Peripheral>, unknown, { id: string }>(
    key,
    ({ id }) =>
      performFetch(`gateways/${gatewayId}/peripherals/${id}`, {
        method: "DELETE",
      }),
    {
      onSuccess: ({ data }) => {
        queryClient.refetchQueries(key);
      },
    }
  );
};
