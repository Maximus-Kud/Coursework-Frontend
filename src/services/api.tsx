import { localhost } from "../config/constants";
import type { ProductType } from "../types/ProductType";
import { apiConfig } from "../config/apiConfig";





export async function callApi(controller: keyof typeof apiConfig, endpoint: keyof typeof apiConfig[typeof controller] | "" = "", data: any = {}, id?: string | number) {
  const config = apiConfig[controller][endpoint];
  if (!config) throw new Error(`Unknown endpoint: ${controller}/${endpoint}`);

  let url = `${localhost}${controller}`;

  if (endpoint) url += `/${endpoint}`;
  if (config.id && id) url += `/${id}`;

  const options: RequestInit = {
    method: config.method,
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token") ? `Bearer ${localStorage.getItem("token")}` : "",
    },
  };

  if (config.body && config.method !== "GET") options.body = JSON.stringify(data);

  const response = await fetch(url, options);
  const text = await response.text();

  if (!response.ok) {
    let errorData = {};

    try {
      errorData = text ? JSON.parse(text) : {};
    }
    catch {
      errorData = { message: text };
    }

    throw errorData;
  }

  const result = text ? JSON.parse(text) : {};

  if (endpoint === 'login' && result.token) {
    localStorage.setItem("token", result.token);
  }


  return result;
}



// ========== Authentication ==========
export async function authenticationRegister(data: {
  username: string;
  email: string;
  password: string;
}) {
  return callApi("Authentication", "register", data);
}

export async function authenticationLogin(data: {
  username: string,
  email: string,
  password: string
}) {
  return callApi("Authentication", "login", data);
}


// ========== Marketplace ==========
export async function marketplaceGetAvailableProducts() {
  return callApi("Marketplace");
}

export async function marketplaceOrder(productsId: number[]) {
  return callApi("Marketplace", "order", { productsId });
}

export async function marketplaceGetAccountInfo() {
  return callApi("Marketplace", "getAccountInfo");
}

export async function marketplaceGetLogs() {
  return callApi("Marketplace", "getLogs");
}


// ========== Admin ==========
export async function adminGetProducts() {
  return callApi("Admin", "products");
}

export async function adminAddProduct(name: string, price: number, inStock: number) {
  return callApi("Admin", "addProduct", { name, price, inStock });
}

export async function adminUpdateProduct(name: string, price: number, inStock: number, isAvailable: boolean, id: number) {
  return callApi("Admin", "updateProduct", { name, price, inStock, isAvailable }, id);
}

export async function adminDeleteProduct(id: number) {
  return callApi("Admin", "deleteProduct", {}, id);
}

export async function adminGetUsers() {
  return callApi("Admin", "users");
}

export async function adminGetOrdersInShoppingCart() {
  return callApi("Admin", "getOrdersInShoppingCart");
}

export async function adminGetOrdersPurchased() {
  return callApi("Admin", "getOrdersPurchased");
}

export async function adminChangeOrderStatus(orderId: number, status: string) {
  return callApi("Admin", "changeOrderStatus", { orderId, status });
}

export async function adminChangeAccountBalance(accountId: string, newBalance: number) {
  return callApi("Admin", "changeAccountBalance", { accountId, newBalance });
}