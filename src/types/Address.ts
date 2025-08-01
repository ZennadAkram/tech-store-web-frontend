export interface Address {
  id?:string; 
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  street_address: string;
  city: string;
  state: string;
  postal_code: string;
  country: string; 
  address_type: 'billing' | 'shipping';
};

export interface AddressApiResponse{
count: number;
  next: string | null;
  previous: string | null;
  results:Address[]
};