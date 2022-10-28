// здесь настроим axios
import axios, { AxiosRequestConfig } from "axios";

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
