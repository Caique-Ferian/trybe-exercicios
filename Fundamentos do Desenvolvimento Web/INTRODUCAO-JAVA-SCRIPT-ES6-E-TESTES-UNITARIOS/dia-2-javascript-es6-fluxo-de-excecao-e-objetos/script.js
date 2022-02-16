const order = {
    name: 'Rafael Andrade',
    phoneNumber: '11-98763-1416',
    address: {
      street: 'Rua das Flores',
      number: '389',
      apartment: '701',
    },
    order: {
      pizza: {
        marguerita: {
          amount: 1,
          price: 25,
        },
        pepperoni: {
          amount: 1,
          price: 20,
        }
      },
      drinks: {
        coke: {
          type: 'Coca-Cola Zero',
          price: 10,
          amount: 1,
        }
      },
      delivery: {
        deliveryPerson: 'Ana Silveira',
        price: 5,
      }
    },
    payment: {
      total: 60,
    },
  };
  
  const customerInfo = (order) => {
    // Adicione abaixo as informações necessárias.
    const deliveryPerson= order.order.delivery.deliveryPerson;
    const person= order.name;
    const phoneNumber=order['phoneNumber'];
    const address=order['address'].street;
    const addressNumber=order['address'].number;
    const addressApartment=order['address'].apartment;

    console.log(`Olá ${deliveryPerson},entrega para:${person},Telefone:${phoneNumber},R.${address},Nº:${addressNumber}, AP:${addressApartment}.`);
  
  }
  
  customerInfo(order);
  
  const orderModifier = (order) => {
    // Adicione abaixo as informações necessárias.
    const newOrderer=order.name='Luiz Silva';
    const pizza=Object.keys(order.order.pizza);
    const drink=Object.values(order.order.drinks.coke);
    const total=order.payment.total=50;
    console.log(`Olá ${newOrderer} o total do seu pedido de ${pizza[0]},${pizza[1]} e ${drink[0]} é R$${total},00.`);
  
  }
  
  orderModifier(order);