import Order from '@/types/Order';
import Image from 'next/image';

interface OrderDetailsProps {
  order: Order;
}

const OrderDetails = ({ order }: OrderDetailsProps) => {

  const getPaymentImage = (paymentType: string) => {
    const paymentImages: { [key: string]: string } = {
      'MasterCard': 'mastercard.png',
      'Visa': 'visa.png',
      "Elo": 'elo.png'
      // 'American Express'
      // Adicione mais mapeamentos de tipos de pagamento conforme necessário
    };
    return paymentImages[paymentType] || 'default.png';
  };

  return (
    <div className="bg-white p-4 rounded-md shadow-lg">
      <h2 className="text-3xl font-semibold text-center mb-4">Detalhes do Pedido #{order.id}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          {/* Informações do Pedido */}
          <h3 className="text-2xl font-semibold">Informações do Pedido</h3>
          <div className="mt-4">
            <p>Status: {order.status}</p>
            <p>Data de Emissão: {order.emission_date || 'N/A'}</p>
            <p>Tipo de Entrega: {order.delivery_type}</p>
            <p>Preço do Frete: R$ {order.delivery_price.toFixed(2)}</p>
            <p>Observações: {order.obs || 'N/A'}</p>
          </div>
        </div>

        <div>
          {/* Imagem do Produto (se houver) */}
          {order.sale_items[0]?.image_path && (
            <Image
              src={order.sale_items[0].image_path[0]}
              alt={order.sale_items[0].product_name}
              width={200}
              height={200}
            />
          )}
        </div>
      </div>

      <hr className="my-6 border-t" />

      <div>
        {/* Informações de Pagamento */}
        <h3 className="text-2xl font-semibold">Informações de Pagamento</h3>
        <div className="mt-4">
          <p className="text-lg font-semibold">Tipo de Pagamento</p>
          <Image
            src={`/payment/${getPaymentImage(order.payment_type)}`}
            alt={order.payment_type}
            width={50}
            height={30}
          />
          <p className="text-lg font-semibold">Data de Pagamento</p>
          <p className="ml-4">{order.payment_date || 'N/A'}</p>
          <p className="text-lg font-semibold">Desconto no Pagamento</p>
          <p className="ml-4">{order.payment_discount || 'N/A'}</p>
          <p className="text-lg font-semibold">Parcelas</p>
          <p className="ml-4">{order.installment_payment || 'N/A'}</p>
          <p className="text-lg font-semibold">Total</p>
          <p className="ml-4">R$ {order.total.toFixed(2)}</p>
        </div>

      </div>

      <hr className="my-6 border-t" />

      <div>
        {/* Endereço de Entrega */}
        <h3 className="text-2xl font-semibold">Endereço de Entrega</h3>
        <div className="mt-4">
          <p>CEP: {order.delivery_address.cep}</p>
          <p>Número: {order.delivery_address.number}</p>
          <p>Complemento: {order.delivery_address.complement || 'N/A'}</p>
          <p>Referência: {order.delivery_address.reference || 'N/A'}</p>
          <p>Rua: {order.delivery_address.street}</p>
          <p>Cidade: {order.delivery_address.city}</p>
          <p>Bairro: {order.delivery_address.district}</p>
          <p>Estado: {order.delivery_address.state}</p>
        </div>
      </div>

      <hr className="my-6 border-t" />

      <div>
        {/* Itens da Compra */}
        <h3 className="text-2xl font-semibold">Itens da Compra</h3>
        <ul className="space-y-4">
          {order.sale_items.map((item) => (
            <li key={item.id} className="flex items-center space-x-4">
              <div className="w-16 h-16">
                {item.image_path && (
                  <Image
                    src={item.image_path}
                    alt={item.product_name}
                    width={200}
                    height={200}
                  // className="w-full h-full object-cover rounded-md"
                  />
                )}
              </div>
              <div>
                <p className="text-lg font-semibold">{item.product_name}</p>
                <p>Quantidade: {item.amount}</p>
                <p>Preço Unitário: R$ {item.unity_price.toFixed(2)}</p>
                <p>Total do Item: R$ {item.item_total.toFixed(2)}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default OrderDetails;
