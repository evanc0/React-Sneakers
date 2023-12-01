import styles from "./style.module.scss";
import cn from "classnames";
import Header from "./components/Header";
import Drawer from "./components/Drawer";
import Card from "./components/Card/Card";
import { useEffect, useState } from "react";

function App() {

  const [items, setItems] = useState([])
  const [cartItems, setCartItems] = useState([])
  const [cartOpened, setCartOpened] = useState(false)

  useEffect(()=> {
    fetch('https://656a227bde53105b0dd82fef.mockapi.io/items').then(res => {
      return res.json()
    }).then(json => {
      const test = json.map((obj,index) => ({
       ...obj,
       id: index + 1
      }))
      setItems(test)
      console.log(test);
    })
  },[])


  const onAddToCart = (item) => {
    console.log(item);
    const idToCheck  = item.id
    console.log(idToCheck, "idToCheck");
    console.log(cartItems, "idToCheck");

    const hasItem = cartItems.some(product => product.id === idToCheck);
    console.log(hasItem);
    // setCartItems(prev => [...prev, item]);


    if (hasItem) {
      const updatedCartItems = cartItems.filter(testing => testing.id !== idToCheck);
      console.log(updatedCartItems, "повторное нажатие ");
      setCartItems(updatedCartItems)
    } else {
      setCartItems(prev => [...prev, item]);
    }
    
  }


    

  return (
    <div className={cn(styles.wrapper, "clear")}>

     {cartOpened && <Drawer items={cartItems} onClose={() => setCartOpened(false)}/>}
      <Header onClickCart={() => setCartOpened(true)}/>

      <div className={cn(styles.content, "p-40")}>
        <div className="d-flex align-center justify-between mb-40">
          <h1>Все кроссовки</h1>
          <div className={cn(styles.searchBlock, "d-flex")}>
            <img src="/img/search.svg" alt="Search" />
            <input placeholder="Поиск..." />
          </div>
        </div>

        <div className={cn("d-flex", "flex-wrap")}>
          {items.map((item) => (
            <Card
              id={item.id}
              key={item.index}
              title={item.title}
              price={item.price}
              imageUrl={item.imageUrl}
              onFavorite={() => console.log("Добавили в закладки")}
              onPlus={onAddToCart}
            />
          ))}
        </div>
      </div>
    </div>
  );              
}

export default App;
