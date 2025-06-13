export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  images?: string[];
  category: string;
  brand: string;
  capacity?: string;
  condition: 'Excellent' | 'Good' | 'Fair';
  badges?: ('sale' | 'new' | 'refurbished')[];
  features?: string[];
  specifications?: Record<string, string>;
}