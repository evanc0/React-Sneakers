import { useContext, useEffect, useState } from "react";
import axios  from "axios";
import cn from "classnames";

import styles from "../style.module.scss";
import Card from "../components/Card/Card";
import AppContext from "../Context";

function Orders() {
    const {onAddToFavorite} = useContext(AppContext);
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true)


    const blankArray = new Array(8).fill(0).map((item, index) => {
        return {id: Date.now() + index}
      });

    useEffect(() => {
        (async () => {
            try{
                const { data } = await axios.get('https://333cc2b740686014.mokky.dev/orders');
            // console.log(data.map((obj) =>obj.items).flat()); или так можно написать
            setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []).flat());
            console.log(data.reduce((prev, obj) => [...prev, ...obj.items], []).flat());
            setIsLoading(false)
            } catch(error) {
                alert("Не удалось загрузить свои заказы")
                console.error(error);
            }
        }
        )();
        
    },[])

    const renderItems = () => {

        return (isLoading ? blankArray : orders).map((item) => (
            <Card
                {...item}
                key={item?.id}
                loading={isLoading}
            />
          ))
        }

    return (
        <div className={cn(styles.content, "p-40")}>
        <div className="d-flex align-center justify-between mb-40">
          
            <h1>Мои заказы</h1>
          
        </div>

        <div className={cn("d-flex", "flex-wrap")}>         
        {renderItems()}
        </div>
      </div>
    )
}

export default Orders;