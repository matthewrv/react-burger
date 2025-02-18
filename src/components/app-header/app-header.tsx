import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import headerStyles from "./app-header.module.css";
import { NavLink } from "react-router-dom";

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
            <NavLink to="/" className={headerStyles["nav-link"]}>
              <BurgerIcon type="primary" />
              <span className="text text_type_main-default">Конструктор</span>
            </NavLink>
          </li>

          <li
            className={`pl-5 pr-5 pt-4 pb-4 ${headerStyles["order-history-item"]}`}
          >
            <NavLink to="/orders" className={headerStyles["nav-link"]}>
              <ListIcon type="secondary" />
              <span className="text text_type_main-default text_color_inactive">
                Лента заказов
              </span>
            </NavLink>
          </li>

          <li className={`pl-5 pr-5 pt-4 pb-4 ${headerStyles["account-item"]}`}>
            <NavLink to="/profile" className={headerStyles["nav-link"]}>
              <ProfileIcon type="secondary" />
              <span className="text text_type_main-default text_color_inactive">
                Личный кабинет
              </span>
            </NavLink>
          </li>
        </ol>
      </nav>
    </header>
  );
};

export default AppHeader;
