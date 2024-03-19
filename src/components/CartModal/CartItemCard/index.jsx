import { MdDelete } from "react-icons/md";

export const CartItemCard = ({ product, removeFromCart }) => {
  const { id, name, price } = product;

  const handleRemove = () => {
   removeFromCart(id)
  }
  return (
    <li className="modal-item">
      <div className="modal-food">
        <img src={product.img} alt={product.name} />
        <div>
          <h3>{product.name}</h3>
          <p>
            {product.price.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </p>
        </div>
      </div>
      <button onClick={handleRemove} aria-label="delete" title="Remover item">
        <MdDelete size={21} />
      </button>
    </li>
  );
};
