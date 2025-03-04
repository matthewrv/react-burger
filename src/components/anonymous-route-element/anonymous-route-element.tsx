import { FC, ReactNode } from "react";
import { useAuthContext } from "../../services/auth";
import { Navigate } from "react-router-dom";
import Loader from "../loader/loader";
import styles from "./anonymous-route-element.module.css";
import { useAppLocation } from "../../services/hooks";

export type TAnonymousRouteElement = {
  element: ReactNode;
};

const AnonymousRouteElement: FC<TAnonymousRouteElement> = ({
  element,
}: TAnonymousRouteElement) => {
  const auth = useAuthContext();
  const location = useAppLocation();

  if (!auth.isAuthCompleted) {
    return (
      <div className={styles.wrapper}>
        <Loader />
      </div>
    );
  }

  if (auth.user) {
    const from = location.state?.from ?? { pathname: "/" };
    return <Navigate to={from} replace={true} />;
  }

  return element;
};

export default AnonymousRouteElement;
