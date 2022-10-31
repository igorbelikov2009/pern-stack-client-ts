// Страница готовая. Здесь настроим axios
import axios, { AxiosRequestConfig } from "axios";

// eslint-disable-next-line
// enum StatusCode {
//   Unauthorized = 401, // Неавторизованный
//   Forbidden = 403, // Запрещенный
//   TooManyRequests = 429, // Слишком много запросов
//   InternalServerError = 500, // Внутренняя ошибка сервера
// }

// обычный хост
const $host = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  responseType: "json",
});

const $authHost = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  responseType: "json",
});

// делаем авторизацию хоста
const authInterceptor = (config: AxiosRequestConfig): AxiosRequestConfig => {
  // config имеет тип AxiosRequestConfig, поэтому не может быть undefined.
  // С другой стороны, config.header действительно может быть undefined.
  // Поскольку это Record( export type AxiosRequestHeaders = Record<string, string>;),
  // вы действительно можете использовать его по умолчанию с пустым объектом:
  config.headers = config.headers ?? {};
  // Теперь можно смело использовать config.headers

  config.headers.authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
};

// авторизованный хост
$authHost.interceptors.request.use(authInterceptor);

export { $host, $authHost };
