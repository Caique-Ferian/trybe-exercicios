import React, { useEffect, useState } from 'react'; // useState
import { useParams } from 'react-router-dom';
import CartList from '../../components/CartList';
import NavBar from '../../components/NavBar';
import { requestGet } from '../../services/utils';
import './orderDetails.css';

export default function OrderDetails() {
  const { id } = useParams();
  const [sale, setSale] = useState(null);
  const [ptDate, setPTDate] = useState('');
  console.log('sale---', sale);

  useEffect(() => {
    async function fetchSale() {
      const saleInfo = await requestGet(`customer/orders/${id}`);
      setSale(saleInfo);
      const data = new Date(saleInfo.saleDate);
      const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
      const ptBrDate = data.toLocaleString('pt-BR', options);
      setPTDate(ptBrDate);
      console.log('pedidos do cliente em details ---', saleInfo);
    }
    fetchSale();
  }, [id]);

  // --- DEPOIS COLOCAR ISSO DE DATA EM UM COMPONENTE/FUNÇÃO POR QUE É REUTILIZADO VARIAS VEZES

  return (
    <div className="orderDetailsPage">
      <NavBar />
      {sale
      && (
        <div className="contentPage">
          <h2>Detalhe do Pedido</h2>
          <h2
            data-testid="customer_order_details__element-order-details-label-order-id"
          >
            { sale.id }
          </h2>
          <h2
            data-testid="customer_order_details__element-order-details-label-seller-name"
          >
            { sale.seller.name }
          </h2>
          <h2
            data-testid="customer_order_details__element-order-details-label-order-date"
          >
            { ptDate }
          </h2>
          <h2
            data-testid={
              `customer_order_details__element-order-details-label-delivery-status${id}`
            }
          >
            { sale.status }
          </h2>
          <button
            type="button"
            data-testid="customer_order_details__button-delivery-check"
            disabled
            onClick={ console.log('oi oi, botão de mudança de status') }
          >
            Marcar como entregue
          </button>

          <CartList
            cart={ sale.products }
            totalCart={ Number(sale.totalPrice) }
            dataTest="customer_order_details"
          />
        </div>
      )}
    </div>
  );
}
