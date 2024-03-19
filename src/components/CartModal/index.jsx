import { MdClose } from "react-icons/md";
import { CartItemCard } from "./CartItemCard";

export const CartModal = ({
  cartList,
  isModalOpen,
  closeModal,
  removeFromCart,
  clearCart,
}) => {
  const total = cartList.reduce((prevValue, product) => {
    return prevValue + product.price;
  }, 0);

  return (
    <>
      {isModalOpen && (
        <>
          <div className="backdrop" onClick={closeModal}></div>
          <div className="modal" role="dialog">
            <div className="titulo-botao">
              <h2>Carrinho de compras</h2>
              <button aria-label="close" title="Fechar" onClick={closeModal}>
                <MdClose size={21} />
              </button>
            </div>
            <div>
              <ul>
                {cartList.map((product) => (
                  <CartItemCard
                    key={product.id}
                    product={product}
                    removeFromCart={removeFromCart}
                  />
                ))}
              </ul>
            </div>
            <div className="modal-total">
              <div className="modal-span">
                <span>Total</span>
                <span>
                  {total.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </span>
              </div>
              <button onClick={clearCart}>Remover todos</button>
            </div>
          </div>
        </>
      )}
    </>
  );
};
