type ApiMethodConfig = {
  method: "GET" | "POST" | "PATCH" | "DELETE";
  body?: string[];
  id?: boolean;
};

type ApiConfig = {
  [controller: string]: {
    [endpoint: string]: ApiMethodConfig;
  };
};

export const apiConfig: ApiConfig = {
  Authentication: {
    register: {
      method: "POST",
      body: ["username", "email", "password"]
    },
    login: {
      method: "POST",
      body: ["username", "email", "password"]
    }
  },

  
  Marketplace: {
    "": {
      method: "GET"
    },
    order: {
      method: "POST",
      body: ["productsId"]
    },
    getAccountInfo: {
      method: "GET"
    },
    getLogs: {
      method: "GET"
    }
  },


  Admin: {
    products: {
      method: "GET"
    },
    addProduct: {
      method: "POST",
      body: ["name", "price", "inStock"]
    },
    updateProduct: {
      method: "PATCH",
      id: true,
      body: ["name","price","inStock","isAvailable"]
    },
    deleteProduct: {
      method: "DELETE",
      id: true
    },
    users: {
      method: "GET"
    },
    getOrdersInShoppingCart: {
      method: "GET"
    },
    getOrdersPurchased: {
      method: "GET"
    },
    changeOrderStatus: {
      method: "PATCH",
      body: ["orderId","status"]
    },
    changeAccountBalance: {
      method: "PATCH",
      body: ["accountId","newBalance"]
    }
  }
} as const;