import styles from "../style.module.scss";
import cn from "classnames";
import Card from "../components/Card/Card";
import { useContext } from "react";
import AppContext from "../Context";



function Favorites() {

  const {favorites, onAddToFavorite} = useContext(AppContext)
  

    return (
        <div className={cn(styles.content, "p-40")}>
        <div className="d-flex align-center justify-between mb-40">
          
          <h1>Мои закладки</h1>
          
        </div>

        <div className={cn("d-flex", "flex-wrap")}>         
        {favorites.map((item) => (
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