import styles from "../style.module.scss"
import cn from "classnames"
import { Link } from 'react-router-dom';
import { useCart } from "../hooks/useCart";

function Header(props) {
  const { totalPrice } = useCart() // используем свой кастомный хук
  console.log(totalPrice);


    return (
        <header className="d-flex justify-between align-center p-40">
        <Link to="/">
          <div className={cn(styles.headerLeft, "d-flex", "align-center")}>
            <img width={40} height={40} src="/img/logo.png" alt="Logotype"/>
            <div>
              <h3 className="text-uppercase">React Sneakers</h3>
              <p className="opacity-5">Магазин Лучших кроссовок</p>
            </div>
          </div>
        </Link>
       
        
          <ul className={cn("d-flex")}>
            <li onClick={props.onClickCart} className={cn("mr-30", "cu-p", "d-flex")}> 
            <img width={18} height={18} src="/img/cart.svg" alt="Корзина"/>
              <span>{totalPrice} руб.</span>
            </li>
            <Link to="/favorites">
              <li className={cn("pr-30","d-flex", "cu-p")}>
              <img width={18} height={18} src="/img/heart.svg" alt="Закладки"/>
              <span>Закладки</span>
              </li>
            </Link>
            <Link to="/orders">
              <li className={cn("pr-30","d-flex", "cu-p")}>
              <img width={18} height={18} src="/img/user.svg" alt="Профиль"/>
              <span>Профиль</span>
              </li>
            </Link>
          </ul>
      </header>
    );
}

export default Header