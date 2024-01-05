import { createContext, useState } from "react";
const CartContext = createContext(null);

function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  function addToCart(addedProduct) {
    let newCartValue = [];
    let isAlreadyAdded = cart.some((product) => {
      return product.id === addedProduct.id;
    });
    if (isAlreadyAdded) {
      newCartValue = cart.map((product) => {
        if (product.id === addedProduct.id) {
          return { ...product, qty: product.qty + 1 };
        }
        return product;
      });
    } else {
      newCartValue = [...cart, { ...addedProduct, qty: 1 }];
    }
    setCart(newCartValue);
  }

  function addProductQuantity(id, newQty) {
    if (newQty < 1) return;
    let newCartValue = cart.map((product) => {
      if (product.id === id) {
        return { ...product, qty: newQty };
      }
      return product;
    });
    setCart(newCartValue);
  }

  function removeFromCart(productId) {
    let filteredCart = cart.filter((product) => product.id !== productId);
    setCart(filteredCart);
  }

  let contextValue = {
    cart,
    addToCart,
    removeFromCart,
    addProductQuantity,
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
}

export { CartContext };
export default CartProvider;