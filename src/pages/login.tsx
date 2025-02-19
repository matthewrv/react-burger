import {
  Button,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Form from "../components/form/form";
import FormLink from "../components/form-link/form-link";
import FormWrapper from "../components/form-wrapper/form-wrapper";
import FormLinksWrapper from "../components/form-links-wrapper/form-links-wrapper";
import { useStringInput } from "../hooks";
import { SyntheticEvent } from "react";
import Loader from "../components/loader/loader";
import ErrorView from "../components/error/error";
import { useAppDispatch, useAppSelector } from "../services/hooks";
import { login } from "../services/auth";
import { Navigate } from "react-router-dom";

export default function LoginPage() {
  const [email, onChangeEmail] = useStringInput();
  const [password, onChangePassword] = useStringInput();

  const { user, loginStatus } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const onClick = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <FormWrapper>
      {loginStatus === "request" ? (
        <Loader />
      ) : loginStatus === "error" ? (
        <ErrorView title="Ошибка запроса">
          <p className="text text_type_main-default">Попробуйте позже</p>
          <Button
            extraClass="mt-6"
            type="secondary"
            size="medium"
            htmlType="button"
            onClick={() => window.location.reload()}
          >
            Перезагрузить страницу
          </Button>
        </ErrorView>
      ) : (
        <>
          <Form title="Вход">
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
              onClick={onClick}
            >
              Войти
            </Button>
          </Form>
          <FormLinksWrapper>
            <FormLink to="/register" label="Вы новый пользователь?">
              Зарегистрироваться
            </FormLink>
            <FormLink to="/forgot-password" label="Забыли пароль?">
              Восстановить пароль
            </FormLink>
          </FormLinksWrapper>
        </>
      )}
    </FormWrapper>
  );
}
