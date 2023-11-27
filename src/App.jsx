import styles from "./style.module.scss";
import cn from "classnames";
import Header from "./components/Header";
import Drawer from "./components/Drawer";
import Card from "./components/Card/Card";
// import './style.module.scss'

const arr = [
  { title: "Мужские Кроссовки Nike Blazer Mid Suede", price: 12999, imageUrl: '/img/sneakers/1.jpg'},
  { title: "Мужские Кроссовки Nike Air Max 270", price: 15600, imageUrl: '/img/sneakers/2.jpg' },
  { title: "Мужские Кроссовки Nike Blazer Mid Suede", price: 8499, imageUrl: '/img/sneakers/3.jpg' },
  { title: "Кроссовки Puma X Aka Boku Future Rider", price: 8999, imageUrl: '/img/sneakers/4.jpg' },
];
console.log(arr);

function App() {
  return (
    <div className={cn(styles.wrapper, "clear")}>
      <Drawer />
      <Header />

      <div className={cn(styles.content, "p-40")}>
        <div className="d-flex align-center justify-between mb-40">
          <h1>Все кроссовки</h1>
          <div className={cn(styles.searchBlock, "d-flex")}>
            <img src="/img/search.svg" alt="Search" />
            <input placeholder="Поиск..." />
          </div>
        </div>

        <div className="d-flex">

          {arr.map((obj) => (
          <Card 
            key={obj.index}
            title={obj.title}
            price={obj.price}
            imageUrl={obj.imageUrl}
            onClick={() => console.log(obj)}
          />
        ))}
        </div>
      </div>
    </div>
  );
}

export default App;
