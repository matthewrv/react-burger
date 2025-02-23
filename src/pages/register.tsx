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
import { useAppDispatch, useAppLocation } from "../services/hooks";
import { register, useAuthContext } from "../services/auth";

export default function RegisterPage() {
  const location = useAppLocation();

  const [name, onChangeName] = useStringInput();
  const [email, onChangeEmail] = useStringInput();
  const [password, onChangePassword] = useStringInput();

  const { errorMsg } = useAuthContext();
  const dispatch = useAppDispatch();

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(register({ email, name, password }));
  };

  return (
    <FormWrapper>
      <Form title="Регистрация" errorMsg={errorMsg} onSubmit={onSubmit}>
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
        <FormLink
          to="/login"
          state={location.state}
          label="Уже зарегистрированы?"
        >
          Войти
        </FormLink>
      </FormLinksWrapper>
    </FormWrapper>
  );
}
