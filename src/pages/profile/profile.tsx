import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import profileStyles from "./profile.module.css";
import { NavLink } from "react-router-dom";
import { useStringInput } from "../../hooks";
import { useCallback } from "react";
import { useAppDispatch } from "../../services/hooks";
import { logout } from "../../services/auth";

export default function ProfilePage() {
  const linkStyle = ({ isActive }: { isActive: boolean }) =>
    `text text_type_main-medium ${profileStyles.link} ${
      isActive ? profileStyles.activeLink : "text_color_inactive"
    }`;

  const dispatch = useAppDispatch();
  const onLogout = useCallback(() => {
    dispatch(logout());
  }, []);

  const [name, onChangeName] = useStringInput();
  const [email, onChangeEmail] = useStringInput();
  const [password, onChangePassword] = useStringInput();

  return (
    <div className={`pt-30 ${profileStyles.container}`}>
      <div>
        <nav>
          <ul className={profileStyles.list}>
            <li className={profileStyles.listItem}>
              <NavLink to="/profile" className={linkStyle}>
                Профиль
              </NavLink>
            </li>
            <li className={profileStyles.listItem}>
              <NavLink to="/history" className={linkStyle}>
                История заказов
              </NavLink>
            </li>
            <li className={profileStyles.listItem}>
              <a className={linkStyle({ isActive: false })} onClick={onLogout}>
                Выход
              </a>
            </li>
          </ul>
        </nav>
        <p
          className={`text text_type_main-default text_inactive_color mt-20 ${profileStyles.info}`}
        >
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </div>
      <form>
        <Input
          type="text"
          value={name}
          onChange={onChangeName}
          placeholder="Имя"
          icon="EditIcon"
        />
        <Input
          type="email"
          value={email}
          onChange={onChangeEmail}
          placeholder="Логин"
          icon="EditIcon"
          extraClass="mt-6"
        />
        <Input
          type="password"
          value={password}
          onChange={onChangePassword}
          placeholder="Пароль"
          icon="EditIcon"
          extraClass="mt-6"
        />
        <div className={`mt-6 ${profileStyles.buttons}`}>
          <Button htmlType="reset" type="secondary">
            Отмена
          </Button>
          <Button htmlType="submit">Сохранить</Button>
        </div>
      </form>
    </div>
  );
}
