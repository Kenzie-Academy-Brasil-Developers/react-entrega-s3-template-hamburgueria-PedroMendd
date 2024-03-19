import { useState } from "react";
import Logo from "../../assets/Logo.svg";
import { MdSearch, MdShoppingCart } from "react-icons/md";
import styles from "./intex.module.scss";

export const Header = ({
  productList,
  setProductList,
  cartItemCount,
  openModal,
}) => {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const filteredProducts = productList.filter((product) =>
      product.name.toLowerCase().includes(value.toLowerCase())
    );

    setProductList(filteredProducts);
  };

  return (
    <header className={styles.header}>
      <img src={Logo} alt="Logo Kenzie Burguer" />
      <div>
        <button onClick={openModal}> 
          <MdShoppingCart size={21} />
          <span>{cartItemCount}</span>
        </button>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <button type="submit">
            <MdSearch size={21} />
          </button>
        </form>
      </div>
    </header>
  );
};
