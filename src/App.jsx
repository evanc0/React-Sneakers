import styles from "./style.module.scss";
import axios from "axios";
import cn from "classnames";
import Header from "./components/Header";
import Drawer from "./components/Drawer/Drawer";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import {useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import AppContext from "./Context";
import Orders from "./pages/Orders";

const cartUrl = "https://656a227bde53105b0dd82fef.mockapi.io/cart" // ресурс из mockapi из-за PUT, который позволяет полностью очистить ресурс
const itemUrl = "https://333cc2b740686014.mokky.dev/items"
const favoritesUrl = "https://333cc2b740686014.mokky.dev/favorites"
const ordersUrl = "https://333cc2b740686014.mokky.dev/orders" 

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
      try {
        const [cartResponse, favoritesResponse, itemsResponse] = await Promise.all([
          axios.get(cartUrl),
          axios.get(favoritesUrl),
          axios.get(itemUrl)
        ]);

        setCartItems(cartResponse.data)
        setFavorites(favoritesResponse.data)
        setItems(itemsResponse.data)

        setIsLoading(false)

      } catch (error) {
        alert("Ошибка при запросе данных")
        console.error(error);
      }
    }
    fetchData()
  },[]);

  const onAddToCart = async (obj) => {
    console.log(obj);
    try {
      const findItem = cartItems.find((item) => Number(item.parentId) === Number(obj.id));
      if (findItem) {
        setCartItems(prev => prev.filter(item => Number(item.parentId) !== Number(obj.id)))
        await axios.delete(`${cartUrl}/${findItem.id}`)
      } else {
        setCartItems(prev => [...prev, obj])
        const { data } = await axios.post(cartUrl, obj)
        setCartItems(prev => prev.map(item => {
          if(item.parentId === data.parentId) {
            return {
              ...item,
              id: data.id
            };
          }
          return item;
        }))
      }
    } catch(error) {
      alert("Не удалось добавить товар в корзину")
      console.error(error);
    }
  };

  const onRemoveItem = (id) => {
    try {
      axios.delete(`${cartUrl}/${id}`)
    setCartItems((prev) => prev.filter(item => Number(item.id) !== Number(id)));
    } catch (error) {
      alert("Ошибка при удалении из корзины")
      console.error(error);
    }

  };

  const onAddToFavorite = async (obj) => {
    console.log(obj);
    
    try {
      if (favorites.find((favObj) => Number(favObj.id) === Number(obj.id))) {
         await axios.delete(`${favoritesUrl}/${obj.id}`);
        // setFavorites((prev) => prev.filter(item => item.id !== obj.id))
      } else {
        const {data} = await axios.post(favoritesUrl, obj) // для того чтобы фул проект был бесплатный, тут идёт адресс на второй аккаунт mockapi (авторизовался через google - ранее через github)
        setFavorites(prev => [...prev, data])
      }

    } catch(error) {
      alert("Не удалось доабвить в избранное")
    }
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };



  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.parentId) === Number(id))
  }

  const isItemFavorites = (id) => {
    return favorites.some((obj) => Number(obj.parentId) === Number(id))
  }

    

  return (
    <AppContext.Provider value={{items, cartItems, favorites, isItemAdded, onAddToFavorite, setCartOpened, setCartItems, ordersUrl, cartUrl, onAddToCart, isItemFavorites}}>
    <div className={cn(styles.wrapper, "clear")}>

      {/* {cartOpened && } */}

      <Drawer 
        items={cartItems} 
        onClose={() => setCartOpened(false)} 
        onRemove={onRemoveItem} 
        opened={cartOpened}
      />
      

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
          isItemFavorites={isItemFavorites}
        />
      }
      { location.pathname === "/favorites" &&  
        <Favorites 
         items={items}
        />
      }
      { location.pathname === "/orders" &&  
        <Orders/>
      }
     

      
    </div>

    
    </AppContext.Provider>
  );              
}

export default App;
