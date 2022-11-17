import React, { useContext, useEffect, useState } from 'react';
import NavBar from '../../components/NavBar';
import OrderCard from '../../components/OrderCard';
import { AuthContext } from '../../services/AuthProvider';
import { requestGet } from '../../services/utils';
import './ordersPage.css';

export default function Seller() {
  const { user } = useContext(AuthContext);
  console.log(user);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const ordersList = await requestGet('/seller/orders');
      console.log('lista de pedidos---', ordersList);
      setOrders(ordersList);
    }
    fetchData();
  }, []);

  return (
    <div className="page">
      <NavBar />
      <h1>SellerPage</h1>
      <div className="ordersPage">
        { orders.map((order) => (
          <OrderCard
            rote="seller"
            product={ order }
            dataTest="seller_orders"
            address
            key={ order.id }
          />
        )) }
      </div>
    </div>
  );
}
