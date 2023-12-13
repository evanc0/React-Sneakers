import { useState } from "react";
import styles from "./Card.module.scss"
import cn from "classnames"
import ContentLoader from "react-content-loader"
import AppContext from "../../Context";
import { useContext } from "react";

function Card({id, title, imageUrl, price,  onFavorite, onPlus, favorited = false, loading = false}) {
  
  const {isItemAdded} = useContext(AppContext)
  const [isFavorite, setIsFavorite] = useState(favorited);
  const obj = { id, parentId:id, title, imageUrl, price};


  const onClickPlus = () => {
    onPlus(obj)
  }

  const onClickFavorite = () => {
    onFavorite(obj)
    setIsFavorite(!isFavorite)
  }

  // useEffect(() => {
  //   setIsAdded(added)
  // },[added])

    return(
        <div className={styles.card}>
          {loading ? (
            <ContentLoader 
              speed={2}
              width={160}
              height={250}
              viewBox="0 0 150 265"
              backgroundColor="#f3f3f3"
              foregroundColor="#ecebeb"
              >
              <rect x="0" y="0" rx="10" ry="10" width="150" height="155" /> 
              <rect x="0" y="167" rx="5" ry="5" width="150" height="15" /> 
              <rect x="0" y="187" rx="5" ry="5" width="100" height="15" /> 
              <rect x="0" y="234" rx="5" ry="5" width="80" height="25" />
              <rect x="124" y="230" rx="10" ry="10" width="32" height="32" /> 
              
            </ContentLoader> ) : (
         <>
            <div className={styles.favorite} onClick={onClickFavorite}>
              { onFavorite && <img 
                src={isFavorite ? "img/heart-liked.svg" : "img/heart-unliked.svg"} 
                alt="Unliked"  />  
              }
            </div>
            <img width="100%" height={135} src={imageUrl} alt="Sneakers" />
            <h5>{title}</h5>
            <div className={cn(styles.cardBottom, "d-flex", "justify-between", "align-center")}>
              <div className={cn("d-flex", "flex-column")}>
                <span>Цена:</span>
                <b>{price} руб.</b>
              </div>
              { onPlus && <img 
                className={cn(styles.plus)} 
                onClick={onClickPlus}  
                src={isItemAdded(id) ? "img/btn-cheked.svg" : "img/btn-plus.svg"} 
                alt="Plus" 
              />}
            </div>
         </> 
         )}
            
        </div>
    );
}

export default Card