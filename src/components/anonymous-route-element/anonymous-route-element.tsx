import { ReactElement } from "react";
import { useAuthContext } from "../../services/auth";
import { Navigate } from "react-router-dom";
import Loader from "../loader/loader";
import styles from "./anonymous-route-element.module.css";
import { useAppLocation } from "../../services/hooks";

export default function AnonymousRouteElement(props: {
  element: ReactElement;
}) {
  const auth = useAuthContext();
  const location = useAppLocation();

  switch (auth.authentication) {
    case "in progress": {
      return (
        <div className={styles.wrapper}>
          <Loader />
        </div>
      );
    }
    case "anonymous": {
      return props.element;
    }
    case "authenticated": {
      const from = location.state?.from ?? { pathname: "/" };
      return <Navigate to={from} replace={true} />;
    }
  }
}
