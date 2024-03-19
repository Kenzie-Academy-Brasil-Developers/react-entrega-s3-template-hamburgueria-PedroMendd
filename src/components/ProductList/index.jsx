import { ProductCard } from "./ProductCard";

export const ProductList = ({ productList, addToCart }) => {
  return (
    <ul className="product-list">
      {productList.map((product) => (
        <ProductCard key={product.id} product={product} addToCard={addToCart}/>
      ))}
    </ul>
  );
};
