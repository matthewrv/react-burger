import { ChangeEvent, useState } from "react";
import loginStyles from "./login.module.css";
import {
  Button,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const [password, setPassword] = useState("");
  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <div className={loginStyles.container}>
      <div className="text-center">
        <h1 className="text text_type_main-medium">Вход</h1>
        <form className={`pt-6 pb-20 ${loginStyles.form}`}>
          <EmailInput value={email} onChange={onChangeEmail} />
          <PasswordInput
            extraClass="mt-6"
            value={password}
            onChange={onChangePassword}
          />
          <Button
            extraClass="mt-6"
            htmlType="button"
            type="primary"
            size="medium"
          >
            Войти
          </Button>
        </form>
        <div className="text text_type_main-default text_color_inactive">
          {"Вы новый пользователь? "}
          <Link to="/register" className={loginStyles.link}>
            Зарегистрироваться
          </Link>
        </div>
        <div className="text text_type_main-default text_color_inactive mt-4">
          {"Забыли пароль? "}
          <Link to="/forgot-password" className={loginStyles.link}>
            Восстановить пароль
          </Link>
        </div>
      </div>
    </div>
  );
}
