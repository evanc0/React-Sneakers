import styles from "./style.module.scss";
import {Route} from 'react-router-dom'
import axios from "axios";
import cn from "classnames";
import Header from "./components/Header";
import Drawer from "./components/Drawer";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import { createContext, useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import AppContext from "./Context";

const cartUrl = "https://656a227bde53105b0dd82fef.mockapi.io/cart"
const itemUrl = "https://656a227bde53105b0dd82fef.mockapi.io/items"
const favoritesUrl = "https://656a220dde53105b0dd82ef7.mockapi.io/favorites"


// console.log(AppContext);

function App() {
  const location = useLocation();
  const [items, setItems] = useState([])
  const [cartItems, setCartItems] = useState([])
  const [favorites, setFavorites] = useState([])
  const [searchValue, setSearchValue] = useState("")
  const [cartOpened, setCartOpened] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  // console.log(location);


  useEffect(()=> {
    async function fetchData() {
      const cartResponse =  await axios.get(cartUrl);
      const favoritesResponse =  await axios.get(favoritesUrl); // для того чтобы фул проект был бесплатный, тут идёт адресс на второй аккаунт mockapi (авторизовался через google - ранее через github)
      const itemsResponse =  await axios.get(itemUrl);
      
      
  
      setCartItems(cartResponse.data)
      setFavorites(favoritesResponse.data)
      setItems(itemsResponse.data)

      setIsLoading(false)
    }

    fetchData()
  },[]);


  const onAddToCart = (obj) => {
    console.log(obj);
    try {
      if (cartItems.find((item) => Number(item.id) === Number(obj.id))) {
        axios.delete(`${cartUrl}/${obj.id}`)
        setCartItems(prev => prev.filter(item => Number(item.id) !== Number(obj.id)))
      } else {
        axios.post(cartUrl, obj)
        setCartItems(prev => [...prev, obj])
      }
     

    } catch(error) {
      alert("Не удалось добавить товар в корзину")
    }
  };

  const onRemoveItem = (id) => {
    axios.delete(`${cartUrl}/${id}`)
    setCartItems((prev) => prev.filter(item => item.id !== id));

  };

  const onChangeSearchInput = (event) => {
    console.log(event.target.value)
    setSearchValue(event.target.value);
  };

  const onAddToFavorite = async (obj) => {
    console.log(obj);
    
    try {
      if (favorites.find((favObj) => favObj.id === obj.id)) {
        axios.delete(`${favoritesUrl}/${obj.id}`);
        // setFavorites(prev => prev.filter(item => item.id !== obj.id))
      } else {
        const {data} = await axios.post(favoritesUrl, obj) // для того чтобы фул проект был бесплатный, тут идёт адресс на второй аккаунт mockapi (авторизовался через google - ранее через github)
        setFavorites(prev => [...prev, data])
      }

    } catch(error) {
      alert("Не удалось доабвить в избранное")
    }
  };

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.id) === Number(id))
  }

    

  return (
    <AppContext.Provider value={{items, cartItems, favorites, isItemAdded}}>
    <div className={cn(styles.wrapper, "clear")}>

     {cartOpened && <Drawer items={cartItems} onClose={() => setCartOpened(false)} onRemove={onRemoveItem}/>}
      <Header onClickCart={() => setCartOpened(true)}/>
      { location.pathname === "/" &&  
        <Home  
          items={items} 
          cartItems={cartItems}
          searchValue={searchValue} 
          setSearchValue={setSearchValue} 
          onChangeSearchInput={onChangeSearchInput}
          onAddToFavorite={onAddToFavorite}
          onAddToCart={onAddToCart}
          isLoading={isLoading}
        />
      }
      { location.pathname === "/favorites" &&  
        <Favorites 
         items={items}
          onAddToFavorite={onAddToFavorite}
        />
      }
     

      
    </div>
    </AppContext.Provider>
  );              
}

export default App;
