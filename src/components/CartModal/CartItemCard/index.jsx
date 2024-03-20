import { MdDelete } from "react-icons/md";

export const CartItemCard = ({ product, removeFromCart }) => {
  const { uniqueId, name, price, img } = product;

  const handleRemove = () => {
    removeFromCart(uniqueId);
  };

  return (
    <li className="modal-item">
      <div className="modal-food">
        <img src={img} alt={name} />
        <div>
          <h3>{name}</h3>
          <p>
            {price.toLocaleString("pt-BR", {
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
