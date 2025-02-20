import editProfileStyles from "./edit-profile.module.css";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import SafeInput from "../../components/safe-input/safe-input";
import { useAuthContext } from "../../services/auth";

export default function EditProfile() {
  const { user } = useAuthContext();

  return (
    <form>
      <SafeInput type="text" placeholder="Имя" initialValue={user?.name} />
      <SafeInput
        type="email"
        placeholder="Логин"
        initialValue={user?.email}
        extraClass="mt-6"
      />
      <SafeInput type="password" placeholder="Пароль" extraClass="mt-6" />
      <div className={`mt-6 ${editProfileStyles.buttons}`}>
        <Button htmlType="reset" type="secondary">
          Отмена
        </Button>
        <Button htmlType="submit">Сохранить</Button>
      </div>
    </form>
  );
}
