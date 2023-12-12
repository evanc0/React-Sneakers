import { useContext, useState } from "react";
import axios from "axios";
import cn from "classnames"

import Info from "../Info";
import AppContext from "../../Context";
import { useCart } from "../../hooks/useCart";

import stylesDrawer from './Drawer.module.scss'
import styles from "../../style.module.scss"

const delay = (ms) => new Promise((resolve) => {
    setTimeout(resolve, ms)
})

function Drawer({onClose, onRemove, items = [], opened}) {
    const {cartItems, setCartItems, totalPrice} = useCart() // используем свой кастомный хук
    const {ordersUrl, cartUrl} = useContext(AppContext)
    const [orderId, setOrderId ] = useState(null);
    const [isOrderComplete, setIsOrderComplete ] = useState(false);
    const [isLoading, setIsLoading ] = useState(false);
     

    const onClickOrder = async () => {
        try{
            setIsLoading(true);
            const {data} = await axios.post(`${ordersUrl}`, {
                items: cartItems
            });

            

            setOrderId(data.id);
            setIsOrderComplete(true);
            setCartItems([]);
            
            for (let i = 0; i < cartItems.length; i++) {
                const item = cartItems[i];
                await axios.delete(`${cartUrl}/` + item.id);
                await delay(1000)
            }

        }catch(error) {
            alert('Ошибка при создании заказа :(')
            
        }
        setIsLoading(false);
    }

    return(
        <div  className={cn(stylesDrawer.overlay, opened ? stylesDrawer.overlayVisible : "")}>
            <div className={stylesDrawer.drawer}>
            <h2 className={cn("d-flex", "mb-30", "justify-between")}>Корзина  <img onClick={onClose} className={cn("cu-p")} src="/img/btn-remove.svg" alt="Close" /></h2>

            {items.length > 0 ? (
                <div className={cn("d-flex", "flex-column", "flex")}>
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
                            <b>{totalPrice} руб.</b>
                            </li>
                            <li>
                            <span>Налог 5%:</span>
                            <div></div>
                            <b>{totalPrice / 100 * 5} руб.</b>
                            </li>
                        </ul>
                        <button className={cn(styles.greenButton)} disabled={isLoading} onClick={onClickOrder}>Оформить заказ <img src="/img/arrow.svg" alt="Arrow" /></button>
                    </div>
                </div>
            ) : ( 
                <Info 
                    title={isOrderComplete ?  "Заказ оформлен!" : "Корзина пустая"}
                    description={isOrderComplete ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке` : "Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ"} 
                    image={isOrderComplete ? "/img/complete-order.jpg" : "/img/empty-cart.jpg"}
                />
            )}

            
        </div>
      </div>
    );
}

export default Drawer