import styles from "./style.module.scss";
import {Route} from 'react-router-dom'
import axios from "axios";
import cn from "classnames";
import Header from "./components/Header";
import Drawer from "./components/Drawer";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';

function App() {
  const location = useLocation();
  const [items, setItems] = useState([])
  const [cartItems, setCartItems] = useState([])
  const [favorites, setFavorites] = useState([])
  const [searchValue, setSearchValue] = useState("")
  const [cartOpened, setCartOpened] = useState(false)
  console.log(location);


  useEffect(()=> {
    axios.get('https://656a227bde53105b0dd82fef.mockapi.io/items').then((res)=>{
       setItems(res.data)
    });

    axios.get('https://656a227bde53105b0dd82fef.mockapi.io/cart').then((res) => {
      setCartItems(res.data)
    })
    axios.get('https://656a220dde53105b0dd82ef7.mockapi.io/favorites').then((res) => {   // для того чтобы фул проект был бесплатный, тут идёт адресс на второй аккаунт mockapi (авторизовался через google - ранее через github)
      setFavorites(res.data)
    })
          
  },[])


  const onAddToCart = (item) => {
    axios.post('https://656a227bde53105b0dd82fef.mockapi.io/cart', item)
    setCartItems(prev => [...prev, item])
  }

  const onRemoveItem = (id) => {
    axios.delete(`https://656a227bde53105b0dd82fef.mockapi.io/cart/${id}`)
    setCartItems((prev) => prev.filter(item => item.id !== id));

  }

  const onChangeSearchInput = (event) => {
    console.log(event.target.value)
    setSearchValue(event.target.value);
  }

  const onAddToFavorite = async (obj) => {
    console.log(obj);
    
    try {
      if (favorites.find((favObj) => favObj.id === obj.id)) {
        axios.delete(`https://656a220dde53105b0dd82ef7.mockapi.io/favorites/${obj.id}`);
        // setFavorites(prev => prev.filter(item => item.id !== obj.id))
      } else {
        const {data} = await axios.post('https://656a220dde53105b0dd82ef7.mockapi.io/favorites', obj) // для того чтобы фул проект был бесплатный, тут идёт адресс на второй аккаунт mockapi (авторизовался через google - ранее через github)
        setFavorites(prev => [...prev, data])
      }

    } catch(error) {
      alert("Не удалось доабвить в избранное")
    }
  }

    

  return (
    <div className={cn(styles.wrapper, "clear")}>

     {cartOpened && <Drawer items={cartItems} onClose={() => setCartOpened(false)} onRemove={onRemoveItem}/>}
      <Header onClickCart={() => setCartOpened(true)}/>
      { location.pathname === "/" &&  
        <Home 
          items={items} 
          searchValue={searchValue} 
          setSearchValue={setSearchValue} 
          onChangeSearchInput={onChangeSearchInput}
          onAddToFavorite={onAddToFavorite}
          onAddToCart={onAddToCart}
        />
      }
      { location.pathname === "/favorites" &&  
        <Favorites 
          items={favorites}
          onAddToFavorite={onAddToFavorite}
        />
      }
     

      
    </div>
  );              
}

export default App;
