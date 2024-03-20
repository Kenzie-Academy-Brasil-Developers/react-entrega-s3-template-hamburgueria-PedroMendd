import { useState, useEffect } from "react";
import { CartModal } from "../../components/CartModal";
import { Header } from "../../components/Header";
import { ProductList } from "../../components/ProductList";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const HomePage = () => {
  const [productList, setProductList] = useState([]);
  const [cartList, setCartList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const addToCart = (product) => {
    const productWithUniqueId = {
      ...product,
      uniqueId: `${product.id}-${Date.now()}`,
    };
    const updatedCartList = [...cartList, productWithUniqueId];
    setCartList(updatedCartList);
    localStorage.setItem("cartList", JSON.stringify(updatedCartList));

    toast.success(`${product.name} adicionado ao carrinho!`);
  };

  const removeFromCart = (uniqueId) => {
    const updatedCartList = cartList.filter(
      (item) => item.uniqueId !== uniqueId
    );
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

  useEffect(() => {
    const fetchDataAndRestoreCart = async () => {
      try {
        const response = await axios.get(
          "https://hamburgueria-kenzie-json-serve.herokuapp.com/products"
        );
        setProductList(response.data);

        const savedCartList = JSON.parse(localStorage.getItem("cartList"));
        if (savedCartList) {
          setCartList(savedCartList);
        }
        const savedIsModalOpen = JSON.parse(
          localStorage.getItem("isModalOpen")
        );
        setIsModalOpen(savedIsModalOpen ?? false);
      } catch (error) {
        console.error("Houve um erro ao buscar os dados:", error);
      }
    };

    fetchDataAndRestoreCart();
  }, []);

  return (
    <>
      <Header
        productList={productList}
        setProductList={setProductList}
        cartItemCount={cartItemCount}
        openModal={openModal}
      />

      <div className="centered-container">
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
        <ToastContainer />
      </div>
    </>
  );
};
