// Страница готовая
import { $authHost, $host } from ".";
import {
  fetchChangeStatusOrderProps,
  fetchOrdersProps,
  sendOrderProps,
} from "../types/types";

// Отправить заказ
export const sendOrder = async ({
  auth,
  mobile,
  basket,
}: sendOrderProps): Promise<sendOrderProps> => {
  if (auth) {
    const { data } = await $authHost({
      method: "POST",
      url: "api/orders",
      data: { mobile, basket },
    });
    return data;
  } else {
    const { data } = await $host({
      method: "POST",
      url: "api/orders",
      data: { mobile, basket },
    });
    return data;
  }
};

// Получить заказы
export const fetchOrders = async ({
  limit,
  page,
  complete,
}: fetchOrdersProps): Promise<fetchOrdersProps> => {
  const { data } = await $authHost.get(
    `api/orders?limit=${limit}&page=${page}&complete=${complete}`
  );
  return data;
};

// // Получить изменение статуса заказа
export const fetchChangeStatusOrder = async ({
  complete,
  id,
}: fetchChangeStatusOrderProps): Promise<fetchChangeStatusOrderProps> => {
  const { data } = await $authHost.put("api/orders", { complete, id });
  return data;
};

// // Удалить заказ
export const fetchDeleteOrder = async ({ id }: { id: any }): Promise<any> => {
  const { data } = await $authHost({
    method: "DELETE",
    url: "api/orders",
    data: { id },
  });
  return data;
};

// // Получить один заказ-устройство
export const getOneOrderDevices = async (id: any): Promise<any> => {
  const { data } = await $authHost.get("api/orders/" + id);
  return data;
};
