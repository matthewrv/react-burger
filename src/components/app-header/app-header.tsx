import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import headerStyles from "./app-header.module.css";
import { NavLink } from "react-router-dom";
import TopNavItem from "../top-nav-item/top-nav-item";

const AppHeader = () => {
  return (
    <header className={`${headerStyles.header} p-4`}>
      <nav className={headerStyles["navigation"]}>
        <ol className={`pt-4 pb-4 ${headerStyles["navigation-list"]}`}>
          <li className={headerStyles["logo-item"]}>
            <NavLink to="/" className={headerStyles["nav-link"]}>
              <Logo />
            </NavLink>
          </li>

          <li
            className={`pl-5 pr-5 pt-4 pb-4 ${headerStyles["burger-constructor-item"]}`}
          >
            <NavLink
              to="/"
              className={headerStyles["nav-link"]}
              children={({ isActive }) => (
                <TopNavItem
                  isActive={isActive}
                  icon={"BurgerIcon"}
                  text={"Конструктор"}
                />
              )}
            />
          </li>

          <li
            className={`pl-5 pr-5 pt-4 pb-4 ${headerStyles["order-history-item"]}`}
          >
            <NavLink
              to="/orders"
              className={headerStyles["nav-link"]}
              children={({ isActive }) => (
                <TopNavItem
                  isActive={isActive}
                  icon={"ListIcon"}
                  text={"Лента заказов"}
                />
              )}
            />
          </li>

          <li className={`pl-5 pr-5 pt-4 pb-4 ${headerStyles["account-item"]}`}>
            <NavLink
              to="/profile"
              className={headerStyles["nav-link"]}
              children={({ isActive }) => (
                <TopNavItem
                  isActive={isActive}
                  icon={"ProfileIcon"}
                  text={"Личный кабинет"}
                />
              )}
            />
          </li>
        </ol>
      </nav>
    </header>
  );
};

export default AppHeader;
