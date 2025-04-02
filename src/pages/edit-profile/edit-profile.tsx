import editProfileStyles from "./edit-profile.module.css";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import TogglableInput from "../../components/togglable-input/togglable-input";
import { updateUser, useAuthContext } from "../../services/auth";
import { FC, SyntheticEvent, useState } from "react";
import { useAppDispatch } from "../../services/hooks";

const EditProfile: FC = () => {
  const { user } = useAuthContext();

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [password, setPassword] = useState("");

  const somethingChanged =
    name !== user?.name || email !== user?.email || password;

  const dispatch = useAppDispatch();

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const request = {
      name: name,
      email: email,
      password: password,
    };
    dispatch(updateUser(request));
  };

  const onReset = (e: SyntheticEvent) => {
    e.preventDefault();
    setName(user?.name || "");
    setEmail(user?.email || "");
    setPassword("");
  };

  return (
    <form className={`pt-30`}>
      <TogglableInput
        type="text"
        placeholder="Имя"
        value={name}
        setValue={setName}
      />
      <TogglableInput
        type="email"
        placeholder="Логин"
        value={email}
        setValue={setEmail}
        extraClass="mt-6"
      />
      <TogglableInput
        type="password"
        placeholder="Пароль"
        value={password}
        setValue={setPassword}
        extraClass="mt-6"
      />
      {somethingChanged && (
        <div className={`mt-6 ${editProfileStyles.buttons}`}>
          <Button htmlType="reset" type="secondary" onClick={onReset}>
            Отмена
          </Button>
          <Button htmlType="submit" onClick={onSubmit}>
            Сохранить
          </Button>
        </div>
      )}
    </form>
  );
};

export default EditProfile;
