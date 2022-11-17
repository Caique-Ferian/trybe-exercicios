import React, { useEffect, useState } from 'react';
import NavBar from '../../components/NavBar';
import OrderCard from '../../components/OrderCard';
import { requestGet } from '../../services/utils';
import './ordersPage.css';

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function fetchSale() {
      const saleInfo = await requestGet('/customer/orders');
      setOrders(saleInfo);
      console.log('pedidos do cliente ---', saleInfo);
    }
    fetchSale();
  }, []);

  return (
    <div className="ordersPage">
      <NavBar />
      <div className="contentPage">
        <h1>OrdersPage</h1>
        <div className="ordersList">
          { orders.map((order) => (
            <OrderCard
              rote="customer"
              product={ order }
              dataTest="customer_orders"
              address={ false }
              key={ order.id }
            />
          )) }
        </div>
      </div>
    </div>
  );
}
