import { Product, ApiResponse, Category, User, OrderPayload } from "@/types";

const FALLBACK_PRODUCTS: Product[] = [
  {
    id: 1,
    title: "Shirt Jacket",
    slug: "shirt-jacket",
    category: "Men",
    category_slug: "men",
    price: 6499,
    compare_at_price: 7200,
    is_featured: true,
    is_new_arrival: true,
    is_archival: false,
    primary_image: "/images/products/shirt-jacket.jpg",
    secondary_image: "/images/products/shirt-jacket.jpg",
    sizes: ["S", "M", "L"],
    colors: [{ name: "Sand Stone", hex: "#C4BFB6" }],
    description: "Architectural shirt jacket in relaxed structured silhouette with contrast inner cuff detail and minimalist front closure."
  },
  {
    id: 2,
    title: "Oversized Hoodie",
    slug: "oversized-hoodie",
    category: "Men",
    category_slug: "men",
    price: 12699,
    compare_at_price: 14000,
    is_featured: true,
    is_new_arrival: true,
    is_archival: false,
    primary_image: "/images/products/oversized-hoodie.jpg",
    secondary_image: "/images/products/oversized-hoodie.jpg",
    sizes: ["S", "M", "L"],
    colors: [{ name: "Deep Umber", hex: "#3E3633" }],
    description: "Ultra-heavyweight 480 GSM drop-shoulder fleece hoodie with high-density ribbed collar and structured boxy drape."
  },
  {
    id: 3,
    title: "Puffer Jacket",
    slug: "puffer-jacket",
    category: "Men",
    category_slug: "men",
    price: 16999,
    compare_at_price: 18900,
    is_featured: true,
    is_new_arrival: true,
    is_archival: false,
    primary_image: "/images/products/puffer-jacket.jpg",
    secondary_image: "/images/products/puffer-jacket.jpg",
    sizes: ["S", "M", "L"],
    colors: [{ name: "Sage Olive", hex: "#B6BAA8" }],
    description: "Architectural quilted down jacket with insulated storm collar and matte water-resistant finish."
  },
  {
    id: 4,
    title: "Corduroy Jacket",
    slug: "corduroy-jacket",
    category: "Men",
    category_slug: "men",
    price: 13899,
    compare_at_price: 15400,
    is_featured: true,
    is_new_arrival: true,
    is_archival: false,
    primary_image: "/images/products/corduroy-jacket.jpg",
    secondary_image: "/images/products/corduroy-jacket.jpg",
    sizes: ["S", "M", "L"],
    colors: [{ name: "Dark Mocha", hex: "#382C26" }],
    description: "Wide-wale heavyweight cotton corduroy overshirt with tonal horn buttons and reinforced pockets."
  },
  {
    id: 5,
    title: "Flannel Shirt",
    slug: "flannel-shirt",
    category: "Men",
    category_slug: "men",
    price: 10580,
    compare_at_price: 11800,
    is_featured: true,
    is_new_arrival: true,
    is_archival: false,
    primary_image: "/images/products/flannel-shirt.jpg",
    secondary_image: "/images/products/flannel-shirt.jpg",
    sizes: ["S", "M", "L"],
    colors: [{ name: "Charcoal Plaid", hex: "#4A4D4F" }],
    description: "Brushed double-weave organic cotton flannel with relaxed drop shoulder tailoring."
  },
  {
    id: 6,
    title: "Cargo Pant",
    slug: "cargo-pant",
    category: "Men",
    category_slug: "men",
    price: 9270,
    compare_at_price: 10300,
    is_featured: true,
    is_new_arrival: true,
    is_archival: false,
    primary_image: "/images/products/cargo-pant.jpg",
    secondary_image: "/images/products/cargo-pant.jpg",
    sizes: ["30", "32", "34"],
    colors: [{ name: "Earth Ochre", hex: "#A97C47" }],
    description: "Structured utilitarian cargo trousers in heavyweight cotton ripstop with darted knee articulation."
  },
  {
    id: 7,
    title: "Wide Leg Pant",
    slug: "wide-leg-pant",
    category: "Men",
    category_slug: "men",
    price: 7900,
    compare_at_price: 8800,
    is_featured: true,
    is_new_arrival: true,
    is_archival: false,
    primary_image: "/images/products/wide-leg-pant.jpg",
    secondary_image: "/images/products/wide-leg-pant.jpg",
    sizes: ["30", "32", "34"],
    colors: [{ name: "Washed Slate", hex: "#2B2E33" }],
    description: "Wide-leg pleated architectural trouser with floor-skimming drape in dense cotton twill."
  },
  {
    id: 8,
    title: "Varsity Jacket",
    slug: "varsity-jacket",
    category: "Men",
    category_slug: "men",
    price: 15400,
    compare_at_price: 17200,
    is_featured: true,
    is_new_arrival: true,
    is_archival: false,
    primary_image: "/images/products/varsity-jacket.jpg",
    secondary_image: "/images/products/varsity-jacket.jpg",
    sizes: ["S", "M", "L"],
    colors: [{ name: "Rich Umber", hex: "#5A3828" }],
    description: "Tailored wool blend jacket with full satin lining and heavy gauge rib knit trims."
  }
];

function getBaseUrl(): string {
  if (typeof window !== "undefined") {
    return "/api/v1";
  }
  return process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:5001/api/v1";
}

export async function fetchApi<T = any>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
  const baseUrl = getBaseUrl();
  const url = `${baseUrl}${endpoint}`;
  
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...((options.headers as Record<string, string>) || {})
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

    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }

    const data: ApiResponse<T> = await response.json();
    return data;
  } catch (error: any) {
    console.warn(`[API] Fallback triggered for ${endpoint}:`, error.message);
    
    // Graceful fallback for catalog & products when backend is unreachable
    if (endpoint.startsWith("/products")) {
      return {
        success: true,
        data: FALLBACK_PRODUCTS as unknown as T,
        count: FALLBACK_PRODUCTS.length,
        isFallback: true
      };
    }

    return {
      success: false,
      message: "Unable to reach server. Please ensure the backend is running.",
      error: error.message
    };
  }
}

export const api = {
  // Products
  getProducts: (params: Record<string, string> = {}) => {
    const query = new URLSearchParams(params).toString();
    return fetchApi<Product[]>(`/products${query ? `?${query}` : ""}`);
  },
  getProductBySlug: async (slug: string) => {
    const res = await fetchApi<Product>(`/products/${slug}`);
    if (res.success && res.data) return res;
    // Fallback search
    const found = FALLBACK_PRODUCTS.find((p) => p.slug === slug);
    if (found) {
      return { success: true, data: found };
    }
    return res;
  },
  getFeaturedProducts: () => fetchApi<Product[]>("/products/featured"),
  
  // Categories
  getCategories: () => fetchApi<Category[]>("/categories"),
  getCategoryBySlug: (slug: string) => fetchApi<Category>(`/categories/${slug}`),
  
  // Orders
  createOrder: (orderPayload: OrderPayload) => fetchApi("/orders", {
    method: "POST",
    body: JSON.stringify(orderPayload)
  }),
  getOrderByNumber: (orderNumber: string) => fetchApi(`/orders/${orderNumber}`),
  
  // Contact & Newsletter
  submitContact: (contactPayload: any) => fetchApi("/contact", {
    method: "POST",
    body: JSON.stringify(contactPayload)
  }),
  subscribeNewsletter: (email: string) => fetchApi("/newsletter", {
    method: "POST",
    body: JSON.stringify({ email })
  }),
  
  // Auth
  login: (credentials: { email: string; password?: string }) => fetchApi<{ user: User; access_token: string }>("/auth/login", {
    method: "POST",
    body: JSON.stringify(credentials)
  }),
  register: (userData: { email: string; password?: string; full_name?: string }) => fetchApi<{ user: User; access_token: string }>("/auth/register", {
    method: "POST",
    body: JSON.stringify(userData)
  }),
  getCurrentUser: () => fetchApi<User>("/auth/me"),
  
  // Health
  checkHealth: () => fetchApi("/health"),
};
