import {
  Button,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Form from "../components/form/form";
import FormLink from "../components/form-link/form-link";
import FormWrapper from "../components/form-wrapper/form-wrapper";
import FormLinksWrapper from "../components/form-links-wrapper/form-links-wrapper";
import { useForm } from "../hooks";
import { FC, SyntheticEvent } from "react";
import { useAppDispatch, useAppLocation } from "../services/hooks";
import { login, useAuthContext } from "../services/auth/auth";
import { TLoginRequest } from "../utils/normaApi/models";

const LoginPage: FC = () => {
  const location = useAppLocation();

  const { values, handleChange } = useForm<TLoginRequest>({
    email: "",
    password: "",
  });

  const { errorMsg } = useAuthContext();
  const dispatch = useAppDispatch();

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(login(values));
  };

  return (
    <FormWrapper>
      <Form title="Вход" errorMsg={errorMsg} onSubmit={onSubmit}>
        <EmailInput value={values.email} onChange={handleChange} name="email" />
        <PasswordInput
          extraClass="mt-6"
          value={values.password}
          onChange={handleChange}
          name="password"
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
};

export default LoginPage;
