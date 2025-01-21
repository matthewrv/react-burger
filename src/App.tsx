import "./App.css";
import AppHeader from "./components/app-header/app-header";
import BurgerConstructor from "./components/burger-constructor/burger-constructor";
import BurgerIngridients from "./components/burger-ingridients/burger-ingridients";
import burgerIngridients from "./utils/data";

function App() {
  return (
    <>
      <AppHeader />
      <main className="main pl-5 pr-5">
        <BurgerIngridients ingridients={burgerIngridients} />
        <BurgerConstructor ingridients={burgerIngridients} />
      </main>
    </>
  );
}

export default App;
