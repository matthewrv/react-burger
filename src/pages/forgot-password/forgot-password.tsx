import { ChangeEvent, useCallback, useState } from "react";
import forgotPasswordStyles from "./forgot-password.module.css";
import {
  Button,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const onChangeEmail = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setEmail(e.target.value);
    },
    [setEmail]
  );

  return (
    <div className={forgotPasswordStyles.container}>
      <div className="text-center">
        <h1 className="text text_type_main-medium">Восстановление пароля</h1>
        <form className={`pt-6 pb-20 ${forgotPasswordStyles.form}`}>
          <EmailInput value={email} onChange={onChangeEmail} />
          <Button extraClass="mt-6" htmlType="submit">
            Восстановить пароль
          </Button>
        </form>
        <div className="text text_type_main-default text_color_inactive">
          {"Вспомнили пароль? "}
          <Link to="/login" className={forgotPasswordStyles.link}>
            Войти
          </Link>
        </div>
      </div>
    </div>
  );
}
