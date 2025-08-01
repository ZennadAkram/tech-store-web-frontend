export interface Product {
  id: number;
  name: string;
  poster_image: string | null;
  description: string;
  created_at: string; 
  starting_price: string;
  brand: {
    name: string;
  };
  category: {
    name: string;
  };
  versions: Version[];
  reviews: Review[];
  average_rating: number | null;
}

export interface Version {
  id: number;
  price: string;
  colors: Color[];
  storage_capacity: string;
  stock: number;
  images: Image[];
  features:Features[]|null;
}

export interface Features{
  id: number;
  title: string;
  value: string;
  image: string|null;
  description:string|null;
}
export interface Color {
  id: number;
  name: string;
  code: string; // hex color code
}

export interface Image {
  id: number;
  image: string; 
}

export interface Review {
  id: number;
  user: number; 
  rating: number;
  review: string;
  created_at: string;
}

