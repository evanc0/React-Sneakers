import { useState, useEffect } from "react";
import styles from "./Card.module.scss"

import cn from "classnames"
import {  } from "react";

function Card({id, title, imageUrl, price,  onFavorite, onPlus }) {
  const [isAdded, setIsAdded] = useState(false);
// console.log(id);
  const onClickPlus = () => {
    onPlus({title, imageUrl, price, id})
    setIsAdded(!isAdded)
  }


    return(
        <div className={styles.card}>
            <div className={styles.favorite} onClick={onFavorite}>
              <img src="/img/heart-unliked.svg" alt="Unliked"  />  
            </div>
            <img width={133} height={112} src={imageUrl} alt="Sneakers" />
            <h5>{title}</h5>
            <div className={cn(styles.cardBottom, "d-flex", "justify-between", "align-center")}>
              <div className={cn("d-flex", "flex-column")}>
                <span>Цена:</span>
                <b>{price} руб.</b>
              </div>
                <img className={cn(styles.plus)} onClick={onClickPlus}  src={isAdded ? "/img/btn-cheked.svg" : "/img/btn-plus.svg"} alt="Plus" />
            </div>
          </div>
    );
}

export default Card