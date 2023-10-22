import Product from "./Product";

export default interface Order {
  id: number;
  customer_id: number;
  status: number;
  emission_date: string | null;
  approval_date: string | null;
  transport_date: string | null;
  delivery_date: string | null;
  delivery_type: string;
  delivery_price: number;
  obs: string;
  payment_type: string;
  payment_date: string | null;
  payment_discount: number;
  installment_payment: number;
  total: number;
  created_at: string;
  updated_at: string;
  customer_name: string;
  delivery_address: {
    cep: string;
    number: string;
    complement: string;
    reference: string;
    street: string;
    city: string;
    district: string;
    state: string;
    created_at: string;
    updated_at: string;
  };
  sale_items: Product[];
}
