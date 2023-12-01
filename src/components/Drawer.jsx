import styles from "../style.module.scss"
import cn from "classnames"

function Drawer({onClose, items = []}) {
    return(
        <div  className={styles.overlay}>
            <div className={styles.drawer}>
            <h2 className={cn("d-flex", "mb-30", "justify-between")}>Корзина  <img onClick={onClose} className={cn("cu-p")} src="/img/btn-remove.svg" alt="Close" /></h2>
           
            <div className={styles.items}>
                
               { items.map(obj => (
                    <div key={obj.index} className={cn(styles.cartItem, "d-flex", "align-center", "mb-20")}>
                        <div style={{ backgroundImage: `url(${obj.imageUrl})`}} className={cn(styles.cartItemImg)}></div>
                        <div className="mr-2 flex">
                        <p className="mb-5">{obj.title}</p>
                        <b>{obj.price} руб.</b>
                        </div>
                        <img className={cn(styles.removeBtn)} src="/img/btn-remove.svg" alt="Remove" />
                    </div>
                ))}
                
                
            </div>

            <div className={cn(styles.cartTotalBlock)}>
                <ul className={cn(styles.cartTotalBlock)}>
                    <li>
                    <span>Итого:</span>
                    <div></div>
                    <b>21 498 руб.</b>
                    </li>
                    <li>
                    <span>Налог 5%:</span>
                    <div></div>
                    <b>1074 руб.</b>
                    </li>
                </ul>
                <button className={cn(styles.greenButton)}>Оформить заказ <img src="/img/arrow.svg" alt="Arrow" /></button>
            </div>
        </div>
      </div>
    );
}

export default Drawer