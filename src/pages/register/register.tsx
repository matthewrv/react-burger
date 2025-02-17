import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import registerStyles from "./register.module.css";
import { ChangeEvent, useCallback, useState } from "react";
import { Link } from "react-router-dom";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const onChangeName = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setName(e.target.value);
    },
    [setName]
  );

  const [email, setEmail] = useState("");
  const onChangeEmail = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setEmail(e.target.value);
    },
    [setEmail]
  );

  const [password, setPassword] = useState("");
  const onChangePassword = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value);
    },
    [setPassword]
  );

  return (
    <div className={registerStyles.container}>
      <div className="text-center">
        <h1 className="text text_type_main-medium">Регистрация</h1>
        <form className={`pt-6 pb-20 ${registerStyles.form}`}>
          <Input placeholder="Имя" value={name} onChange={onChangeName}></Input>
          <EmailInput
            extraClass="mt-6"
            value={email}
            onChange={onChangeEmail}
          />
          <PasswordInput
            extraClass="mt-6"
            value={password}
            onChange={onChangePassword}
          />
          <Button extraClass="mt-6" htmlType="submit">
            Зарегистрироваться
          </Button>
        </form>
        <div className="text text_type_main-default text_color_inactive">
          Уже зарегистрированы?{" "}
          <Link to="/login" className={registerStyles.link}>
            Войти
          </Link>
        </div>
      </div>
    </div>
  );
}
