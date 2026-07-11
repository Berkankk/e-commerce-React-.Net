import axios, {
  AxiosError,
  AxiosResponse,
} from "axios";

import { toast } from "react-toastify";
import { router } from "../Router/Route";
import type { Cart } from "../Model/ICart";

axios.defaults.baseURL = "http://localhost:5164/api/";
axios.defaults.withCredentials = true;

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError<any>) => {
    const response = error.response;

    if (!response) {
      toast.error("Sunucuya ulaşılamadı.");
      return Promise.reject(error);
    }

    const { data, status } = response;

    switch (status) {
      case 400:
        if (data?.errors) {
          const modelErrors: string[] = [];

          for (const key in data.errors) {
            const errors = data.errors[key];

            if (Array.isArray(errors)) {
              modelErrors.push(...errors);
            }
          }

          modelErrors.forEach((message) => {
            toast.error(message);
          });
        } else {
          toast.error(
            data?.title ??
            data ??
            "Geçersiz bir işlem gerçekleştirildi."
          );
        }

        break;

      case 401:
        toast.error(
          data?.title ?? "Bu işlem için yetkiniz bulunmuyor."
        );
        break;

      case 404:
        router.navigate("/not-found", {
          state: {
            error: data,
            status,
          },
        });
        break;

      case 429:
        toast.warning(
          "Çok hızlı işlem yaptınız. Lütfen kısa bir süre bekleyin."
        );
        break;

      case 500:
        router.navigate("/server-error", {
          state: {
            error: data,
            status,
          },
        });
        break;

      default:
        toast.error("Beklenmeyen bir hata oluştu.");
        break;
    }

    return Promise.reject(error);
  }
);

const queries = {
  get: <T>(url: string): Promise<T> =>
    axios
      .get<T>(url)
      .then((response: AxiosResponse<T>) => response.data),

  post: <T>(url: string): Promise<T> =>
    axios
      .post<T>(url)
      .then((response: AxiosResponse<T>) => response.data),

  put: <T>(url: string): Promise<T> =>
    axios
      .put<T>(url)
      .then((response: AxiosResponse<T>) => response.data),

  delete: <T>(url: string): Promise<T> =>
    axios
      .delete<T>(url)
      .then((response: AxiosResponse<T>) => response.data),
};

const Errors = {
  get400Error: () => queries.get("/error/bad-request"),
  get401Error: () => queries.get("/error/unauthorized"),
  get404Error: () => queries.get("/error/not-found"),
  get500Error: () => queries.get("/error/server-error"),
  getValidationError: () =>
    queries.get("/error/validation-error"),
};

const Catalog = {
  list: () => queries.get("products"),

  details: (id: number) =>
    queries.get(`products/${id}`),
};

const CartRequests = {
  get: () => queries.get<Cart>("cart"),

  addItem: (
    productId: number,
    quantity = 1
  ) =>
    queries.post<Cart>(
      `cart?productId=${productId}&quantity=${quantity}`
    ),

  deleteItem: (
    productId: number,
    quantity = 1
  ) =>
    queries.delete<Cart>(
      `cart?productId=${productId}&quantity=${quantity}`
    ),
};

const requests = {
  Catalog,
  Cart: CartRequests,
  Errors,
};

export default requests;