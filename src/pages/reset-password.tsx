import FormWrapper from "../components/form-wrapper/form-wrapper";
import Form from "../components/form/form";
import FormLinksWrapper from "../components/form-links-wrapper/form-links-wrapper";
import FormLink from "../components/form-link/form-link";
import { useStringInput } from "../hooks";
import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";

export default function ResetPasswordPage() {
  const [newPassword, onChangeNewPassword] = useStringInput();
  const [verificationCode, onChangeVerificationCode] = useStringInput();

  return (
    <FormWrapper>
      <Form title="Восстановление пароля">
        <PasswordInput
          value={newPassword}
          onChange={onChangeNewPassword}
          placeholder="Введите новый пароль"
        />
        <Input
          value={verificationCode}
          onChange={onChangeVerificationCode}
          placeholder="Введите код из письма"
          extraClass="mt-6"
        />
        <Button htmlType="submit" size="medium" extraClass="mt-6">
          Сохранить
        </Button>
      </Form>
      <FormLinksWrapper>
        <FormLink to="/login" label="Вспомнили пароль?">
          Войти
        </FormLink>
      </FormLinksWrapper>
    </FormWrapper>
  );
}
