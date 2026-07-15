import axios, {
  type AxiosError,
  type AxiosResponse,
} from "axios";
import { toast } from "react-toastify";

import { router } from "../Router/Route";

import type { IProduct } from "../Model/IProduct";
import type { Cart } from "../Model/ICart";
import type { LoginDto } from "../Model/Account/LoginDto";
import type { RegisterDto } from "../Model/Account/RegisterDto";
import type { User } from "../Model/Account/User";

/*
  ASP.NET Core farklı hata formatları döndürebilir.

  Örnek 1:
  {
    "title": "Validation error",
    "errors": {
      "Email": ["E-posta alanı zorunludur."]
    }
  }

  Örnek 2:
  "Kullanıcı adı veya şifre hatalı."

  Örnek 3:
  [
    "Passwords must have at least one uppercase character.",
    "Passwords must have at least one digit."
  ]
*/
interface ApiErrorObject {
  title?: string;
  message?: string;
  errors?: Record<string, string[]>;
}

type ApiErrorResponse =
  | ApiErrorObject
  | string
  | string[];

/*
  Global axios ayarlarını değiştirmek yerine
  yalnızca bu projede kullanılacak bir Axios instance oluşturuyoruz.

  Böylece ileride başka bir API kullanırsak
  ayarlar birbirine karışmaz.
*/
const api = axios.create({
  baseURL: "http://localhost:5164/api/",
  withCredentials: true,
});

/*
  Başarılı cevaplar değiştirilmeden devam eder.

  Hatalı cevaplar ise merkezi olarak burada yönetilir.
*/
api.interceptors.response.use(
  (response) => response,

  (error: AxiosError<ApiErrorResponse>) => {
    const response = error.response;

    /*
      response yoksa istek backend'e hiç ulaşamamıştır.

      Muhtemel nedenler:
      - API çalışmıyor
      - Port yanlış
      - CORS problemi var
      - İnternet/ağ problemi var
    */
    if (!response) {
      toast.error(
        "Sunucuya ulaşılamadı. API projesinin çalıştığından emin olun."
      );

      return Promise.reject(error);
    }

    const { data, status } = response;

    switch (status) {
      case 400: {
        handleBadRequest(data);
        break;
      }

      case 401: {
        toast.error(
          getApiErrorMessage(
            data,
            "Kullanıcı adı veya şifre hatalı."
          )
        );

        break;
      }

      case 403: {
        toast.error(
          "Bu işlemi gerçekleştirmek için yetkiniz bulunmuyor."
        );

        break;
      }

      case 404: {
        router.navigate("/not-found", {
          state: {
            error: data,
            status,
          },
        });

        break;
      }

      case 429: {
        toast.warning(
          "Çok hızlı işlem yaptınız. Lütfen kısa bir süre bekleyin."
        );

        break;
      }

      case 500: {
        router.navigate("/server-error", {
          state: {
            error: data,
            status,
          },
        });

        break;
      }

      default: {
        toast.error(
          getApiErrorMessage(
            data,
            "Beklenmeyen bir hata oluştu."
          )
        );
      }
    }

    /*
      Hatayı burada kullanıcıya göstersek bile reject etmeliyiz.

      Böylece RegisterPage içerisindeki catch bloğu da çalışır
      ve başarılı işlem yapılmış gibi devam edilmez.
    */
    return Promise.reject(error);
  }
);

/*
  AxiosResponse içerisinden yalnızca gerçek response verisini döndürür.

  Axios normalde:
  {
    data,
    status,
    headers,
    config
  }

  şeklinde bir nesne döndürür.

  Frontend bileşenleri ise çoğunlukla sadece data kısmına ihtiyaç duyar.
*/
const responseBody = <T>(
  response: AxiosResponse<T>
): T => response.data;

/*
  Ortak HTTP metotları.

  TResponse:
  Backend'den dönecek veri tipi.

  TBody:
  Backend'e gönderilecek body tipi.
*/
const queries = {
  get: <TResponse>(
    url: string
  ): Promise<TResponse> =>
    api
      .get<TResponse>(url)
      .then(responseBody),

  post: <TResponse, TBody = undefined>(
    url: string,
    body?: TBody
  ): Promise<TResponse> =>
    api
      .post<TResponse>(url, body)
      .then(responseBody),

  put: <TResponse, TBody = undefined>(
    url: string,
    body?: TBody
  ): Promise<TResponse> =>
    api
      .put<TResponse>(url, body)
      .then(responseBody),

  delete: <TResponse>(
    url: string
  ): Promise<TResponse> =>
    api
      .delete<TResponse>(url)
      .then(responseBody),
};

/*
  Test amaçlı hata endpoint'leri.
*/
const Errors = {
  get400Error: () =>
    queries.get("error/bad-request"),

  get401Error: () =>
    queries.get("error/unauthorized"),

  get404Error: () =>
    queries.get("error/not-found"),

  get500Error: () =>
    queries.get("error/server-error"),

  getValidationError: () =>
    queries.get("error/validation-error"),
};

/*
  Ürün istekleri.
*/
const Catalog = {
  list: (): Promise<IProduct[]> =>
    queries.get<IProduct[]>("products"),

  details: (
    id: number
  ): Promise<IProduct> =>
    queries.get<IProduct>(`products/${id}`),
};

/*
  Sepet istekleri.

  Sepet cookie üzerinden takip edildiği için
  Axios instance içerisinde withCredentials: true bulunuyor.
*/
const CartRequests = {
  get: (): Promise<Cart> =>
    queries.get<Cart>("cart"),

  addItem: (
    productId: number,
    quantity = 1
  ): Promise<Cart> =>
    queries.post<Cart>(
      `cart?productId=${productId}&quantity=${quantity}`
    ),

  deleteItem: (
    productId: number,
    quantity = 1
  ): Promise<Cart> =>
    queries.delete<Cart>(
      `cart?productId=${productId}&quantity=${quantity}`
    ),
};

/*
  Authentication istekleri.

  RegisterDto backend'e gönderilir.
  Başarılı olduğunda User modeli döner.

  Dönen User:
  {
    userName,
    email,
    token
  }
*/
const Account = {
  login: (
    loginDto: LoginDto
  ): Promise<User> =>
    queries.post<User, LoginDto>(
      "account/login",
      loginDto
    ),

  register: (
    registerDto: RegisterDto
  ): Promise<User> =>
    queries.post<User, RegisterDto>(
      "account/register",
      registerDto
    ),
};

const requests = {
  Catalog,
  Cart: CartRequests,
  Account,
  Errors,
};

export default requests;

/*
  400 Bad Request cevaplarını yönetir.
*/
function handleBadRequest(
  data: ApiErrorResponse
): void {
  /*
    Identity bazen hata listesini doğrudan array olarak döndürebilir.
  */
  if (Array.isArray(data)) {
    data.forEach((message) => {
      toast.error(message);
    });

    return;
  }

  /*
    Backend doğrudan string döndürmüş olabilir.
  */
  if (typeof data === "string") {
    toast.error(data);
    return;
  }

  /*
    ASP.NET Core model validation hatası.

    errors:
    {
      Email: ["E-posta zorunludur."],
      Password: ["Şifre yeterince güçlü değil."]
    }
  */
  if (data.errors) {
    const modelErrors =
      Object.values(data.errors).flat();

    modelErrors.forEach((message) => {
      toast.error(message);
    });

    return;
  }

  toast.error(
    data.title ??
      data.message ??
      "Girilen bilgiler geçerli değil."
  );
}

/*
  Farklı API hata formatlarından okunabilir
  tek bir hata mesajı üretir.
*/
function getApiErrorMessage(
  data: ApiErrorResponse,
  fallbackMessage: string
): string {
  if (typeof data === "string") {
    return data;
  }

  if (Array.isArray(data)) {
    return data[0] ?? fallbackMessage;
  }

  return (
    data.message ??
    data.title ??
    fallbackMessage
  );
}