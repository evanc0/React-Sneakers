import Card from "../components/Card/Card";
import styles from "../style.module.scss";
import cn from "classnames";

function Home({items, searchValue, setSearchValue, onChangeSearchInput, onAddToFavorite, onAddToCart, isLoading}) {
   
  const blankArray = new Array(8).fill(0).map((item, index) => {
    return {id: Date.now() + index}
  });

  const renderItems = () => {
    const filteredItems = items.filter((item) => item.title.toLowerCase().includes(searchValue.toLowerCase()));

    return (isLoading ? blankArray : filteredItems).map((item, index) => (
      <Card
      {...item}
          key={item?.id}
          onFavorite={(obj) => onAddToFavorite(obj)}
          onPlus={(obj) => onAddToCart(obj)}
          loading={isLoading}
      />
    ));
  };
    return (
        <div className={cn(styles.content, "p-40")}>
        <div className="d-flex align-center justify-between mb-40">
          
          <h1>{searchValue ? `Поиск по запросу: "${searchValue}"` : 'Все кроссовки' }</h1>
          <div className={cn(styles.searchBlock, "d-flex")}>
            <img src="/img/search.svg" alt="Search" />
           {searchValue && <img onClick={() => setSearchValue('')}  className={cn(styles.clear, "cu-p")} src="/img/btn-remove.svg" alt="Clear" />}
            <input onChange={onChangeSearchInput} value={searchValue} placeholder="Поиск..." />
          </div>
        </div>

        <div className={cn("d-flex", "flex-wrap")}>         
          {renderItems()}
        </div>
      </div>
    )
}

export default Home;