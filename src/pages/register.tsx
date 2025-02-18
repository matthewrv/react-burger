import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Form from "../components/form/form";
import FormLinksWrapper from "../components/form-links-wrapper/form-links-wrapper";
import FormLink from "../components/form-link/form-link";
import FormWrapper from "../components/form-wrapper/form-wrapper";
import { useStringInput } from "../hooks";
import { SyntheticEvent } from "react";
import { register } from "../services/auth";
import { useAppDispatch, useAppSelector } from "../services/hooks";
import Loader from "../components/loader/loader";
import ErrorView from "../components/error/error";

export default function RegisterPage() {
  const [name, onChangeName] = useStringInput();
  const [email, onChangeEmail] = useStringInput();
  const [password, onChangePassword] = useStringInput();

  const { status } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const onClick = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(register({ name, email, password }));
  };

  return (
    <FormWrapper>
      {status === "register/pending" ? (
        <Loader />
      ) : status === "register/failed" ? (
        <ErrorView title="Ошибка запроса">
          <p className="text text_type_main-default text-center">
            Попробуйте позже
          </p>
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
          <Form title="Регистрация">
            <Input
              placeholder="Имя"
              value={name}
              onChange={onChangeName}
            ></Input>
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
            <Button extraClass="mt-6" htmlType="submit" onClick={onClick}>
              Зарегистрироваться
            </Button>
          </Form>
          <FormLinksWrapper>
            <FormLink to="/login" label="Уже зарегистрированы?">
              Войти
            </FormLink>
          </FormLinksWrapper>
        </>
      )}
    </FormWrapper>
  );
}
