interface AddressPayment {
  freight: {
    default: number,
    express: number
  };
  id: number;
  default: boolean;
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
}
