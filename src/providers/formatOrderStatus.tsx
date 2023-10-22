// orderStatusUtil.ts
// import OrderStatus from '../types/OrderStatus';

// types/OrderStatus.ts
const OrderStatus = {
  CART: 0,
  EMITTED: 1,
  PAYMENT_APPROVED: 2,
  IN_TRANSPORT: 3,
  RECEIVED: 4,
  CANCELED: 5,
  PAYMENT_NOT_APPROVED: 6,
  TRANSPORT_PROBLEMS: 7,
  RECEIVING_PROBLEMS: 8,
} as const;

export default OrderStatus;


export function formatStatus(status: keyof typeof OrderStatus) {
  return OrderStatus[status] || 'Desconhecido';
}
