export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: 'fashion' | 'footwear' | 'watches' | 'electronics' | 'accessories' | 'beauty' | 'decor';
  subCategory?: string;
  description: string;
  images: string[];
  colors: { name: string; hex: string }[];
  sizes: string[];
  details: string[];
  sustainability?: string[];
  shippingInfo?: string;
  rating: number;
  isNew?: boolean;
  isSale?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor: string;
  selectedSize: string;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  status: 'processing' | 'shipped' | 'delivered';
  shippingAddress: {
    fullName: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    phone: string;
  };
}

export interface UserProfile {
  fullName: string;
  email: string;
  phone: string;
  avatar?: string;
  addresses: {
    id: string;
    fullName: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    phone: string;
    isDefault: boolean;
  }[];
}
