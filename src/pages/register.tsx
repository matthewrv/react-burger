import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import registerStyles from "./register.module.css";
import { ChangeEvent, useCallback, useState } from "react";
import { Link } from "react-router-dom";
import Form from "../components/form/form";
import FormLinksWrapper from "../components/form-links-wrapper/form-links-wrapper";
import FormLink from "../components/form-link/form-link";
import FormWrapper from "../components/form-wrapper/form-wrapper";

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
    <FormWrapper>
      <Form title="Регистрация">
        <Input placeholder="Имя" value={name} onChange={onChangeName}></Input>
        <EmailInput extraClass="mt-6" value={email} onChange={onChangeEmail} />
        <PasswordInput
          extraClass="mt-6"
          value={password}
          onChange={onChangePassword}
        />
        <Button extraClass="mt-6" htmlType="submit">
          Зарегистрироваться
        </Button>
      </Form>

      <FormLinksWrapper>
        <FormLink to="/login" label="Уже зарегистрированы?">
          Войти
        </FormLink>
      </FormLinksWrapper>
    </FormWrapper>
  );
}
