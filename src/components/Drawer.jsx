import styles from "../style.module.scss"
import cn from "classnames"

function Drawer({onClose, onRemove, items = []}) {
    return(
        <div  className={styles.overlay}>
            <div className={styles.drawer}>
            <h2 className={cn("d-flex", "mb-30", "justify-between")}>Корзина  <img onClick={onClose} className={cn("cu-p")} src="/img/btn-remove.svg" alt="Close" /></h2>

            {items.length > 0 ? (
                <div>
                    <div className={styles.items}>
                        {items.map(obj => (
                        <div key={obj.id} className={cn(styles.cartItem, "d-flex", "align-center", "mb-20")}>
                            <div style={{ backgroundImage: `url(${obj.imageUrl})`}} className={cn(styles.cartItemImg)}></div>
                            <div className="mr-2 flex">
                            <p className="mb-5">{obj.title}</p>
                            <b>{obj.price} руб.</b>
                            </div>
                            <img onClick={() => onRemove(obj.id)} className={cn(styles.removeBtn)}  src="/img/btn-remove.svg" alt="Remove" />
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
            ) : ( 
            <div className={cn(styles.cartEmpty, "d-flex", "align-center", "justify-center", "flex-column", "flex")}>
                <img src="/img/empty-cart.jpg" alt="Empty" />
                <h2>Корзина пустая</h2>
                <p className={cn("opacity-6")}>Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ</p>
                <button onClick={onClose}className={styles.greenButton}>
                    <img  src="/img/arrow.svg" alt="Arrow" /> Вернуться назад
                </button>
            </div>
            )}

            
        </div>
      </div>
    );
}

export default Drawer