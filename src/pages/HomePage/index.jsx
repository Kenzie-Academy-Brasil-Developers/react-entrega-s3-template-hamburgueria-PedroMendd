import { useState, useEffect } from "react";
import { CartModal } from "../../components/CartModal";
import { Header } from "../../components/Header";
import { ProductList } from "../../components/ProductList";

export const HomePage = () => {
  const [productList, setProductList] = useState([]);
  const [cartList, setCartList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchDataAndRestoreCart = async () => {
      try {
        const response = await fetch(
          "https://hamburgueria-kenzie-json-serve.herokuapp.com/products"
        );
        if (response.ok) {
          const data = await response.json();
          setProductList(data);
        } else {
          throw new Error("Erro ao obter os produtos da API");
        }

        const savedCartList = JSON.parse(localStorage.getItem("cartList"));
        if (savedCartList) {
          setCartList(savedCartList);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchDataAndRestoreCart();
  }, []);

  const addToCart = (product) => {
    const updatedCartList = [...cartList, product];
    setCartList(updatedCartList);
    localStorage.setItem("cartList", JSON.stringify(updatedCartList));
  };

  const removeFromCart = (productId) => {
    const updatedCartList = cartList.filter((item) => item.id !== productId);
    setCartList(updatedCartList);
    localStorage.setItem("cartList", JSON.stringify(updatedCartList));
  };

  const clearCart = () => {
    setCartList([]);
    localStorage.removeItem("cartList");
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const cartItemCount = cartList.length;

  return (
    <>
      <Header
        productList={productList}
        setProductList={setProductList}
        cartItemCount={cartItemCount}
        openModal={openModal}
      />
      <main>
        <ProductList productList={productList} addToCart={addToCart} />
        <CartModal
          cartList={cartList}
          isModalOpen={isModalOpen}
          closeModal={closeModal}
          removeFromCart={removeFromCart}
          clearCart={clearCart}
        />
      </main>
    </>
  );
};
