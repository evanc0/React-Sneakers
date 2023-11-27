import styles from "../style.module.scss"

import cn from "classnames"

function Card() {
    return(
        <div className={styles.card}>
            <div className={styles.favorite}>
              <img src="/img/heart-unliked.svg" alt="Unliked" />  
            </div>
            <img width={133} height={112} src="/img/sneakers/1.jpg" alt="Sneakers" />
            <h5>Мужские Кроссовки Nike Blazer Mid Suede</h5>
            <div className={cn(styles.cardBottom, "d-flex", "justify-between", "align-center")}>
              <div className={cn("d-flex", "flex-column")}>
                <span>Цена:</span>
                <b>12 999 руб.</b>
              </div>
              <button className={styles.button}>
                <img width={11} height={11} src="/img/plus.svg" alt="Plus" />
              </button>
            </div>
          </div>
    );
}

export default Card