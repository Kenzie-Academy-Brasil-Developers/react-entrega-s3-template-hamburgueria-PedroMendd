export const ProductCard = ({ product, addToCard }) => {
  const handleAddToCard = () => {
    addToCard(product);
  };
  return (
    <li className="item-container">
      <div className="imagem">
        <img src={product.img} alt={product.name} />
      </div>

      <div className="texto">
        <h3>{product.name}</h3>
        <span className="categoria">{product.category}</span>
        <span className="preco">
          {product.price.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </span>
        <button onClick={handleAddToCard}>Adicionar</button>
      </div>
    </li>
  );
};
