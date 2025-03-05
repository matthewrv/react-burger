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
import { useForm } from "../hooks";
import { FC, SyntheticEvent } from "react";
import { useAppDispatch, useAppLocation } from "../services/hooks";
import { register, useAuthContext } from "../services/auth";
import { TRegisterRequest } from "../utils/normaApi/models";

const RegisterPage: FC = () => {
  const location = useAppLocation();

  const { values, handleChange } = useForm<TRegisterRequest>({
    name: "",
    email: "",
    password: "",
  });

  const { errorMsg } = useAuthContext();
  const dispatch = useAppDispatch();

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(register(values));
  };

  return (
    <FormWrapper>
      <Form title="Регистрация" errorMsg={errorMsg} onSubmit={onSubmit}>
        <Input
          placeholder="Имя"
          value={values.name}
          onChange={handleChange}
          name="name"
        ></Input>
        <EmailInput
          extraClass="mt-6"
          value={values.email}
          onChange={handleChange}
          name="email"
        />
        <PasswordInput
          extraClass="mt-6"
          value={values.password}
          onChange={handleChange}
          name="password"
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
};

export default RegisterPage;
