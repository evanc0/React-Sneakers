import React, { useContext } from 'react'
import cn from "classnames";
import styles from "../style.module.scss";
import AppContext from '../Context';

const Info = ({ title, image, description,}) => {
    const {setCartOpened} = useContext(AppContext)
  return (
    <div className={cn(styles.cartEmpty, "d-flex", "align-center", "justify-center", "flex-column", "flex")}>
        <img className={cn("mb-20")} width={120} src={image} alt="Empty" />
        <h2>{title}</h2>
        <p className={cn("opacity-6")}>{description}</p>
        <button onClick={() => setCartOpened(false)}className={styles.greenButton}>
            <img  src="/img/arrow.svg" alt="Arrow" /> Вернуться назад
        </button>
    </div>
  )
}

export default Info;