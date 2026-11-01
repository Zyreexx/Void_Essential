// VOID ESSENTIALS — Global TypeScript Definitions

export interface ProductVariant {
  id?: number;
  size: string;
  color_name?: string;
  color?: string;
  color_hex?: string;
  hex?: string;
  sku: string;
  stock_quantity?: number;
  stock?: number;
  price_override?: number;
}

export interface ProductImage {
  id?: number;
  image_url: string;
  alt_text?: string;
  is_primary?: boolean;
  display_order?: number;
}

export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  id: number;
  title: string;
  slug: string;
  description?: string;
  care_instructions?: string;
  fabric_composition?: string;
  price: number;
  compare_at_price?: number | null;
  category?: string;
  category_id?: number;
  category_slug?: string;
  is_featured?: boolean;
  is_archival?: boolean;
  is_new_arrival?: boolean;
  primary_image?: string;
  secondary_image?: string;
  images?: Array<{ url: string; primary?: boolean }> | ProductImage[];
  sizes?: string[];
  colors?: ProductColor[];
  variants?: ProductVariant[];
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  tagline?: string;
  image_url?: string;
  display_order?: number;
  product_count?: number;
}

export interface User {
  id: number;
  email: string;
  full_name: string;
  role: 'admin' | 'customer';
  created_at?: string;
}

export interface CartItem {
  id: string; // Composite unique key (product.id + variant.sku/size)
  product: Product;
  variant?: ProductVariant | null;
  quantity: number;
  size?: string;
  color?: string;
}

export interface OrderItemPayload {
  product_id: number;
  variant_id?: number;
  quantity: number;
  price: number;
}

export interface OrderPayload {
  customer_name: string;
  customer_email: string;
  shipping_address: string;
  items: OrderItemPayload[];
  total_amount: number;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  count?: number;
  isFallback?: boolean;
}
