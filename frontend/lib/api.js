const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api/v1";

export async function fetchApi(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {})
  };

  // Attach auth token if available in localStorage
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("void_access_token");
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.warn(`[API] Network error requesting ${endpoint}:`, error);
    return {
      success: false,
      message: "Unable to reach server. Please ensure the backend is running.",
      error: error.message
    };
  }
}

export const api = {
  // Products
  getProducts: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return fetchApi(`/products${query ? `?${query}` : ""}`);
  },
  getProductBySlug: (slug) => fetchApi(`/products/${slug}`),
  getFeaturedProducts: () => fetchApi("/products/featured"),
  
  // Categories
  getCategories: () => fetchApi("/categories"),
  getCategoryBySlug: (slug) => fetchApi(`/categories/${slug}`),
  
  // Orders
  createOrder: (orderPayload) => fetchApi("/orders", {
    method: "POST",
    body: JSON.stringify(orderPayload)
  }),
  getOrderByNumber: (orderNumber) => fetchApi(`/orders/${orderNumber}`),
  
  // Contact & Newsletter
  submitContact: (contactPayload) => fetchApi("/contact", {
    method: "POST",
    body: JSON.stringify(contactPayload)
  }),
  subscribeNewsletter: (email) => fetchApi("/newsletter", {
    method: "POST",
    body: JSON.stringify({ email })
  }),
  
  // Auth
  login: (credentials) => fetchApi("/auth/login", {
    method: "POST",
    body: JSON.stringify(credentials)
  }),
  register: (userData) => fetchApi("/auth/register", {
    method: "POST",
    body: JSON.stringify(userData)
  }),
  getCurrentUser: () => fetchApi("/auth/me"),
  
  // Health
  checkHealth: () => fetchApi("/health"),
};
