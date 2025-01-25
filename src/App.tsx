import React, { useState } from "react";
import appStyles from "./App.module.css";
import AppHeader from "./components/app-header/app-header";
import BurgerConstructor from "./components/burger-constructor/burger-constructor";
import BurgerIngridients from "./components/burger-ingridients/burger-ingridients";
import { BurgerIngridient } from "./utils/data";

type Status = "loading" | "error" | "success";

function App() {
  const [status, updateStatus] = useState<Status>("loading");
  const [ingridients, setIngridients] = React.useState<BurgerIngridient[]>([]);

  React.useEffect(() => {
    fetch("https://norma.nomoreparties.space/api/ingredients")
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        }
        return Promise.reject(`Ошибка ${resp.status}`);
      })
      .then((response) => {
        const respIngridients: BurgerIngridient[] = response.data;
        respIngridients.forEach((element) => {
          element.__v = 1;
        });
        setIngridients(respIngridients);
        updateStatus("success");
      })
      .catch(() => {
        updateStatus("error");
      });
  }, []);

  switch (status) {
    case "loading":
      return (
        <div className={appStyles.loader}>
          <span className={appStyles.spinner}></span>
          <span className="text text_type_main-default">Загрузка...</span>
        </div>
      );
    case "error":
      return (
        <div className={appStyles.error}>
          <h1 className="text text_type_main-large text-center">
            Ошибка запроса
          </h1>
          <p className="text text_type_main-default text-center">
            Не удалось получить список ингридиентов.
          </p>
          <p className="text text_type_main-default text-center">
            Попробуйте перезагрузить страницу.
          </p>
        </div>
      );

    case "success":
      return (
        <>
          <AppHeader />
          <main className={`${appStyles.main} pl-5 pr-5`}>
            <BurgerIngridients ingridients={ingridients} />
            <BurgerConstructor ingridients={ingridients} />
          </main>
        </>
      );
  }
}

export default App;
