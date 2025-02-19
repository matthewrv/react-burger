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
import { useAppDispatch, useAppSelector } from "../services/hooks";
import { login } from "../services/auth";
import { Navigate } from "react-router-dom";

export default function LoginPage() {
  const [email, onChangeEmail] = useStringInput();
  const [password, onChangePassword] = useStringInput();

  const { user, authentication, errorMsg } = useAppSelector(
    (state) => state.auth
  );
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
      {authentication === "in progress" ? (
        <Loader />
      ) : (
        <>
          <Form title="Вход" errorMsg={errorMsg}>
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
