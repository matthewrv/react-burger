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

export default function RegisterPage() {
  const [name, onChangeName] = useStringInput();
  const [email, onChangeEmail] = useStringInput();
  const [password, onChangePassword] = useStringInput();

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
