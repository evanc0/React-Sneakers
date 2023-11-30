import styles from "../style.module.scss"
import cn from "classnames"

function Header(props) {
  console.log(props);
    return (
        <header className="d-flex justify-between align-center p-40">
        <div className={cn(styles.headerLeft, "d-flex", "align-center")}>
          <img width={40} height={40} src="/img/logo.png"/>
          <div>
            <h3 className="text-uppercase">React Sneakers</h3>
            <p className="opacity-5">Магазин Лучших кроссовок</p>
          </div>
        </div>
       
        
          <ul className="d-flex">
            <li onClick={props.onClickCart} className={cn("mr-30", "cu-p")}> 
            <img width={18} height={18} src="/img/cart.svg"/>
              <span>1205 руб.</span>
            </li>
            <li>
            <img width={18} height={18} src="/img/user.svg"/>
            </li>
          </ul>
      </header>
    );
}

export default Header