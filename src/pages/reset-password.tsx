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
import { request } from "../utils/normaApi/normaApi";
import { useNavigate } from "react-router-dom";
import { SyntheticEvent, useState } from "react";
import { RequestStatus } from "../services/common";
import Loader from "../components/loader/loader";

export default function ResetPasswordPage() {
  const [newPassword, onChangeNewPassword] = useStringInput();
  const [verificationCode, onChangeVerificationCode] = useStringInput();

  const [status, setStatus] = useState<RequestStatus | undefined>(undefined);
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  const onPasswordReset = async (e: SyntheticEvent) => {
    e.preventDefault();
    setStatus("request");
    await request("/password-reset/reset", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: newPassword, token: verificationCode }),
    })
      .then(() => navigate("/login", { replace: true }))
      .catch((error) => {
        setStatus("error");
        setErrorMsg(error.message);
      });
  };

  return (
    <FormWrapper>
      {status === "request" ? (
        <Loader />
      ) : (
        <>
          <Form title="Восстановление пароля" errorMsg={errorMsg}>
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
            <Button
              htmlType="submit"
              size="medium"
              extraClass="mt-6"
              onClick={onPasswordReset}
            >
              Сохранить
            </Button>
          </Form>
          <FormLinksWrapper>
            <FormLink to="/login" label="Вспомнили пароль?">
              Войти
            </FormLink>
          </FormLinksWrapper>
        </>
      )}
    </FormWrapper>
  );
}
