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

export default function LoginPage() {
  const [email, onChangeEmail] = useStringInput();
  const [password, onChangePassword] = useStringInput();

  return (
    <FormWrapper>
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
    </FormWrapper>
  );
}
