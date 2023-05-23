import React, { createContext, useContext, useState, useEffect } from "react";
import { useLocalStorage } from "react-use";

const OrderContext = createContext({
  orderItems: [],
  amount: 0,
  detailOpen: false,
  setDetailOpen: () => {},
  addItemToOrder: () => {},
  removeItemFromOrder: () => {},
  removeAllItemFromOrder: () => {}
});

export const OrderProvider = ({ children }) => {
  const [orderItems, setOrderItems] = useLocalStorage("orderlist", []);
  const [amount, setAmount] = useLocalStorage("amount", 0);
  const [detailOpen, setDetailOpen] = useState(false);

  const addItemToOrder = (item) => {
    setAmount(amount + item.price);
    setOrderItems([...orderItems, item]);
  };

  const removeItemFromOrder = (id, price) => {
    setAmount(amount - price);
    setOrderItems(orderItems.filter((item) => item.id !== id));
  };

  const removeAllItemFromOrder = () => {
    setAmount(0);
    setOrderItems([]);
  }

  const createPaymentLink = () => {

  }


  return (
    <OrderContext.Provider
      value={{
        orderItems,
        amount,
        detailOpen,
        setDetailOpen,
        addItemToOrder,
        removeItemFromOrder,
        removeAllItemFromOrder
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrderContext = () => useContext(OrderContext);
