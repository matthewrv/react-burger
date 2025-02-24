import FormWrapper from "../components/form-wrapper/form-wrapper";
import Form from "../components/form/form";
import FormLinksWrapper from "../components/form-links-wrapper/form-links-wrapper";
import FormLink from "../components/form-link/form-link";
import { useForm } from "../hooks";
import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { request } from "../utils/normaApi/norma-api";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { SyntheticEvent, useMemo, useState } from "react";
import Loader from "../components/loader/loader";
import {
  getVerificationCodeSent,
  setVerificationCodeSent,
} from "../utils/persist-state";
import { ResetPasswordRequest } from "../utils/normaApi/models";

export default function ResetPasswordPage() {
  const { values, handleChange } = useForm<ResetPasswordRequest>({
    password: "",
    token: "",
  });
  const [inProgress, setInProgress] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const verificationCodeSent = useMemo(getVerificationCodeSent, []);

  const onSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setInProgress(true);
    await request("/password-reset/reset", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    })
      .then(() => {
        setVerificationCodeSent(false);
        navigate("/login", { replace: true, state: location.state });
      })
      .catch((error) => {
        setErrorMsg(error);
      })
      .finally(() => setInProgress(false));
  };

  return !verificationCodeSent ? (
    <Navigate to="/forgot-password" state={location.state} />
  ) : (
    <FormWrapper>
      {inProgress ? (
        <Loader />
      ) : (
        <>
          <Form
            title="Восстановление пароля"
            errorMsg={errorMsg}
            onSubmit={onSubmit}
          >
            <PasswordInput
              name="password"
              value={values.password}
              onChange={handleChange}
              placeholder="Введите новый пароль"
            />
            <Input
              name="token"
              value={values.token}
              onChange={handleChange}
              placeholder="Введите код из письма"
              extraClass="mt-6"
            />
            <Button htmlType="submit" size="medium" extraClass="mt-6">
              Сохранить
            </Button>
          </Form>
          <FormLinksWrapper>
            <FormLink
              to="/login"
              state={location.state}
              label="Вспомнили пароль?"
            >
              Войти
            </FormLink>
          </FormLinksWrapper>
        </>
      )}
    </FormWrapper>
  );
}
