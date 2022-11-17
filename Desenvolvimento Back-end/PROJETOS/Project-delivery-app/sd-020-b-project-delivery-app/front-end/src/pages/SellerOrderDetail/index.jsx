import React, { useEffect, useState } from 'react'; // useState
import { useParams } from 'react-router-dom';
import CartList from '../../components/CartList';
import NavBar from '../../components/NavBar';
import { requestGet } from '../../services/utils';

export default function OrderDetails() {
  const { id } = useParams();
  const [sale, setSale] = useState(null);
  const [ptDate, setPTDate] = useState('');
  console.log('sale---', sale);

  useEffect(() => {
    async function fetchSale() {
      // -- OUTRA REQUISIÇÃO
      const saleInfo = await requestGet(`seller/orders/${id}`);
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
            data-testid="seller_order_details__element-order-details-label-order-id"
          >
            { sale.id }
          </h2>
          <h2
            data-testid="seller_order_details__element-order-details-label-order-date"
          >
            { ptDate }
          </h2>
          <h2
            data-testid={
              `seller_order_details__element-order-details-label-delivery-status${id}`
            }
          >
            { sale.status }
          </h2>
          <button
            type="button"
            data-testid="seller_order_details__button-preparing-check"
            disabled
            onClick={ console.log('oi oi, botão de preparar pedido') }
          >
            Preparar Pedido
          </button>
          <button
            type="button"
            data-testid="seller_order_details__button-dispatch-check"
            disabled
            onClick={ console.log('oi oi, botão de saiu para entrega') }
          >
            Saiu para Entrega
          </button>

          <CartList
            cart={ sale.products }
            totalCart={ Number(sale.totalPrice) }
            dataTest="seller_order_details"
          />
        </div>
      )}
    </div>
  );
}
