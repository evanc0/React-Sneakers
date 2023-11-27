import styles from "./style.module.scss"
import cn from "classnames"
import Header from "./components/Header"
import Drawer from "./components/Drawer"
import Card from "./components/Card"
// import './style.module.scss'

function App() {

  return (
    <div className={ cn(styles.wrapper, "clear")}>
        
      <Drawer/>
      <Header/>


      <div className={cn(styles.content, "p-40")}>
        <div className="d-flex align-center justify-between mb-40">
          <h1 >Все кроссовки</h1>
            <div className={cn(styles.searchBlock, "d-flex")}>
              <img src="/img/search.svg" alt="Search" />
              <input placeholder="Поиск..." />
            </div>
        </div>


        <div className="d-flex">
        <Card/>
          
        </div>
      </div>

    </div>
  )
}

export default App
