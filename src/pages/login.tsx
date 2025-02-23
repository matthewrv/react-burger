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
import { useAppDispatch, useAppLocation } from "../services/hooks";
import { login, useAuthContext } from "../services/auth";

export default function LoginPage() {
  const location = useAppLocation();

  const [email, onChangeEmail] = useStringInput();
  const [password, onChangePassword] = useStringInput();

  const { errorMsg } = useAuthContext();
  const dispatch = useAppDispatch();

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  return (
    <FormWrapper>
      <Form title="Вход" errorMsg={errorMsg} onSubmit={onSubmit}>
        <EmailInput value={email} onChange={onChangeEmail} />
        <PasswordInput
          extraClass="mt-6"
          value={password}
          onChange={onChangePassword}
        />
        <Button
          extraClass="mt-6"
          htmlType="submit"
          type="primary"
          size="medium"
        >
          Войти
        </Button>
      </Form>
      <FormLinksWrapper>
        <FormLink
          to="/register"
          state={location.state}
          label="Вы новый пользователь?"
        >
          Зарегистрироваться
        </FormLink>
        <FormLink
          to="/forgot-password"
          state={location.state}
          label="Забыли пароль?"
        >
          Восстановить пароль
        </FormLink>
      </FormLinksWrapper>
    </FormWrapper>
  );
}
