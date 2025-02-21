import {
  Button,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { request } from "../utils/normaApi/norma-api";
import { ForgotPasswordResponse } from "../utils/normaApi/models";
import FormWrapper from "../components/form-wrapper/form-wrapper";
import Form from "../components/form/form";
import FormLinksWrapper from "../components/form-links-wrapper/form-links-wrapper";
import FormLink from "../components/form-link/form-link";
import { useNavigate } from "react-router-dom";
import { useStringInput } from "../hooks";
import { SyntheticEvent, useState } from "react";
import { RequestStatus } from "../services/common";
import Loader from "../components/loader/loader";
import { useAppLocation } from "../services/hooks";
import { setVerificationCodeSent } from "../utils/persist-state";

export default function ForgotPasswordPage() {
  const [email, onChangeEmail] = useStringInput();
  const [status, setStatus] = useState<RequestStatus | undefined>(undefined);
  const [errorMsg, setErrorMsg] = useState("");

  const location = useAppLocation();

  const navigate = useNavigate();
  const onPasswordReset = async (e: SyntheticEvent) => {
    e.preventDefault();
    setStatus("request");
    await request<ForgotPasswordResponse>("/password-reset", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    })
      .then(() => {
        setVerificationCodeSent(true);
        navigate("/reset-password", { replace: true, state: location.state });
      })
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
            <EmailInput value={email} onChange={onChangeEmail} />
            <Button
              extraClass="mt-6"
              htmlType="submit"
              onClick={onPasswordReset}
            >
              Восстановить пароль
            </Button>
          </Form>
          <FormLinksWrapper>
            <FormLink
              label="Вспомнили пароль?"
              state={location.state}
              to="/login"
            >
              Войти
            </FormLink>
          </FormLinksWrapper>
        </>
      )}
    </FormWrapper>
  );
}
