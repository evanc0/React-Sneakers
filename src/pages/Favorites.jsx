import styles from "../style.module.scss";
import cn from "classnames";
import Card from "../components/Card/Card";



function Favorites({items, onAddToFavorite}) {
    return (
        <div className={cn(styles.content, "p-40")}>
        <div className="d-flex align-center justify-between mb-40">
          
          <h1>Мои закладки</h1>
          
        </div>

        <div className={cn("d-flex", "flex-wrap")}>         
        {items.map((item) => (
            <Card
              key={item.id}
              favorited={true}
              onFavorite={onAddToFavorite}
              {...item}
            />
          ))}
        </div>
      </div>
    )
}

export default Favorites;