export interface User {
  phone_number: string;
  pin: string;

  full_name: string;
  email: string;
  company_name: string;
  company_address: string;
  company_year: number;
  country: string;
  city: string;
  account_type: number;
  interesting: string;
  [key: string]: any;
}
