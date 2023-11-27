import styles from "../style.module.scss"
import cn from "classnames"

function Drawer() {
    return(
        <div style={{display: 'none'}} className={styles.overlay}>
            <div className={styles.drawer}>
            <h2 className={cn("d-flex", "mb-30", "justify-between")}>Корзина  <img className={cn("cu-p")} src="/img/btn-remove.svg" alt="Remove" /></h2>

            <div className={styles.items}>
            <div className={cn(styles.cartItem, "d-flex", "align-center", "mb-20")}>
                {/* <img className="mr-20" width={70} height={70} src="/img/sneakers/1.jpg" alt="Sneakers" /> */}
                <div style={{ backgroundImage: 'url(/img/sneakers/1.jpg)'}} className={cn(styles.cartItemImg)}></div>
                <div className="mr-2 flex">
                <p className="mb-5">Мужские Кроссовки Nike Blazer Mid Suede</p>
                <b>12 999 руб.</b>
                </div>
                <img className={cn(styles.removeBtn)} src="/img/btn-remove.svg" alt="Remove" />
            </div>
            <div className={cn(styles.cartItem, "d-flex", "align-center", "mb-20")}>
                {/* <img className="mr-20" width={70} height={70} src="/img/sneakers/1.jpg" alt="Sneakers" /> */}
                <div style={{ backgroundImage: 'url(/img/sneakers/1.jpg)'}} className={cn(styles.cartItemImg)}></div>
                <div className="mr-2 flex">
                <p className="mb-5">Мужские Кроссовки Nike Blazer Mid Suede</p>
                <b>12 999 руб.</b>
                </div>
                <img className={cn(styles.removeBtn)} src="/img/btn-remove.svg" alt="Remove" />
            </div>
            <div className={cn(styles.cartItem, "d-flex", "align-center", "mb-20")}>
                {/* <img className="mr-20" width={70} height={70} src="/img/sneakers/1.jpg" alt="Sneakers" /> */}
                <div style={{ backgroundImage: 'url(/img/sneakers/1.jpg)'}} className={cn(styles.cartItemImg)}></div>
                <div className="mr-2 flex">
                <p className="mb-5">Мужские Кроссовки Nike Blazer Mid Suede</p>
                <b>12 999 руб.</b>
                </div>
                <img className={cn(styles.removeBtn)} src="/img/btn-remove.svg" alt="Remove" />
            </div>
            
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