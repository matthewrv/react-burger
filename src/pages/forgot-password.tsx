import { ChangeEvent, useCallback, useState } from "react";
import {
  Button,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import request from "../utils/normaApi/normaApi";
import {
  ForgotPasswordRequest,
  ForgotPasswordResponse,
} from "../utils/normaApi/models";
import FormWrapper from "../components/form-wrapper/form-wrapper";
import Form from "../components/form/form";
import FormLinksWrapper from "../components/form-links-wrapper/form-links-wrapper";
import FormLink from "../components/form-link/form-link";
import { useNavigate } from "react-router-dom";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const onChangeEmail = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setEmail(e.target.value);
    },
    [setEmail]
  );

  const navigate = useNavigate();
  const onPasswordReset = () => {
    request<ForgotPasswordResponse>("/forgot-password", {
      body: JSON.stringify({ email }),
    }).then(() => navigate("/reset-password", { replace: true }));
  };

  return (
    <FormWrapper>
      <Form title="Восстановление пароля">
        <EmailInput value={email} onChange={onChangeEmail} />
        <Button extraClass="mt-6" htmlType="submit" onClick={onPasswordReset}>
          Восстановить пароль
        </Button>
      </Form>
      <FormLinksWrapper>
        <FormLink label="Вспомнили пароль?" to="/login">
          Войти
        </FormLink>
      </FormLinksWrapper>
    </FormWrapper>
  );
}
