import { ReactElement } from "react";
import { useAuthContext } from "../../services/auth";
import { Navigate } from "react-router-dom";
import Loader from "../loader/loader";
import styles from "./anonymous-route-element.module.css";

export default function AnonymousRouteElement(props: {
  element: ReactElement;
}) {
  const auth = useAuthContext();

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
      return <Navigate to="/" replace={true} />;
    }
  }
}
