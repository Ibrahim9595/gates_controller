import { handler as gatewayCreate } from "../services/gateways/create";
import { handler as gatewayDelete } from "../services/gateways/delete";
import { handler as peripheralCreate } from "../services/gateways/peripherals/create";
import { handler } from "../services/gateways/peripherals/delete";
import { handler as peripheralUpdate } from "../services/gateways/peripherals/update";
import { handler as gatewayUpdate } from "../services/gateways/update";
import { getPrismaClient } from "../utils/get-prisma-client";

describe("Test gateways create", () => {
  test("gateways create success", async () => {
    const obj = { name: "test", ipv4: "192.1.1.1" };
    const createMock = jest.fn((data) => Promise.resolve(data) as any);
    jest
      .spyOn(getPrismaClient().gateway, "create")
      .mockImplementation(createMock);

    await gatewayCreate({ body: obj });

    expect(createMock).toBeCalledWith({
      data: obj,
    });
  });

  test("gateways create handle failure", async () => {
    const obj = { name: "test", ipv4: "192.1.1.1" };
    const createMock = jest.fn(() => Promise.reject() as any);
    jest
      .spyOn(getPrismaClient().gateway, "create")
      .mockImplementation(createMock);

    await expect(gatewayCreate({ body: obj })).rejects.toThrow("UNKNOWN_ERROR");
  });
});

describe("Test gateways update", () => {
  test("gateways update success", async () => {
    const obj = { name: "test", ipv4: "192.1.1.1" };
    const id = "1234";

    const updateMock = jest.fn((data) => Promise.resolve(data) as any);
    jest
      .spyOn(getPrismaClient().gateway, "update")
      .mockImplementation(updateMock);

    await gatewayUpdate({ body: obj, params: { id } });

    expect(updateMock).toBeCalledWith({
      data: obj,
      where: { id },
    });
  });

  test("gateways update handle failure", async () => {
    const obj = { name: "test", ipv4: "192.1.1.1" };
    const id = "1234";

    const createMock = jest.fn(() => Promise.reject() as any);
    jest
      .spyOn(getPrismaClient().gateway, "update")
      .mockImplementation(createMock);

    await expect(gatewayUpdate({ body: obj, params: { id } })).rejects.toThrow(
      "UNKNOWN_ERROR"
    );
  });
});

describe("Test gateways delete", () => {
  test("gateways update success", async () => {
    const id = "1234";

    const deleteMock = jest.fn((data) => Promise.resolve(data) as any);
    const deleteManyMock = jest.fn((data) => Promise.resolve(data) as any);
    jest
      .spyOn(getPrismaClient().gateway, "delete")
      .mockImplementation(deleteMock);

    jest
      .spyOn(getPrismaClient().peripheral, "deleteMany")
      .mockImplementation(deleteManyMock);

    await gatewayDelete({ params: { id } });

    expect(deleteMock).toBeCalledWith({
      where: { id },
    });

    expect(deleteManyMock).toBeCalledWith({ where: { gatewayId: id } });
  });
});

describe("Test peripherals create", () => {
  test("peripherals create success", async () => {
    const obj = { status: "online", vendor: "test" };
    const id = "124";

    const createMock = jest.fn((data) => Promise.resolve(data) as any);
    const countMock = jest.fn(() => Promise.resolve(5) as any);
    jest
      .spyOn(getPrismaClient().peripheral, "create")
      .mockImplementation(createMock);
    jest
      .spyOn(getPrismaClient().peripheral, "count")
      .mockImplementation(countMock);

    await peripheralCreate({ body: obj, params: { gatewayId: id } } as any);

    expect(countMock).toBeCalledWith({
      where: {
        gatewayId: id,
      },
    });
    expect(createMock).toBeCalledWith({
      data: {
        ...obj,
        gatewayId: id,
      },
    });
  });

  test("peripherals create fails when count >= 10", async () => {
    const obj = { status: "online", vendor: "test" };
    const id = "124";

    const createMock = jest.fn((data) => Promise.resolve(data) as any);
    const countMock = jest.fn(() => Promise.resolve(10) as any);
    jest
      .spyOn(getPrismaClient().peripheral, "create")
      .mockImplementation(createMock);
    jest
      .spyOn(getPrismaClient().peripheral, "count")
      .mockImplementation(countMock);

    await expect(
      peripheralCreate({ body: obj, params: { gatewayId: id } } as any)
    ).rejects.toThrow("MAX_PERIPHERALS_FOR_GATEWAY_REACHED");
  });
});

describe("Test peripherals update", () => {
  test("peripherals update success", async () => {
    const params: any = {
      body: { status: "offline", vendor: "test" },
      params: { gatewayId: "1235", id: "1345" },
    };

    const updateMock = jest.fn((data) => Promise.resolve(data) as any);
    jest
      .spyOn(getPrismaClient().peripheral, "update")
      .mockImplementation(updateMock);

    await peripheralUpdate(params);

    expect(updateMock).toBeCalledWith({
      data: params.body,
      where: { id: params.params.id },
    });
  });
});

describe("Test peripherals delete", () => {
  test("gateways delete success", async () => {
    const params = { params: { gatewayId: "test", id: "1234" } };

    const deleteMock = jest.fn((data) => Promise.resolve(data) as any);
    jest
      .spyOn(getPrismaClient().peripheral, "delete")
      .mockImplementation(deleteMock);

    await handler(params);

    expect(deleteMock).toBeCalledWith({
      where: { id: params.params.id },
    });
  });
});
