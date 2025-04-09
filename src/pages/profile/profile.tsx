import profileStyles from "./profile.module.css";
import { NavLink, Outlet } from "react-router-dom";
import { FC, useCallback } from "react";
import { useAppDispatch } from "../../services/hooks";
import { logout } from "../../services/auth/auth";

const ProfilePage: FC = () => {
  const linkStyle = ({ isActive }: { isActive: boolean }) =>
    `text text_type_main-medium ${profileStyles.link} ${
      isActive ? profileStyles.activeLink : "text_color_inactive"
    }`;

  const dispatch = useAppDispatch();
  const onLogout = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  return (
    <div className={`${profileStyles.container}`}>
      <div className={`pt-30`}>
        <nav>
          <ul className={profileStyles.list}>
            <li className={profileStyles.listItem}>
              <NavLink to="/profile" end className={linkStyle}>
                Профиль
              </NavLink>
            </li>
            <li className={profileStyles.listItem}>
              <NavLink to="/profile/orders" end className={linkStyle}>
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
      <Outlet />
    </div>
  );
};

export default ProfilePage;
