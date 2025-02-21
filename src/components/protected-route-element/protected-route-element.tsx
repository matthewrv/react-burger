import { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../../services/auth";
import Loader from "../loader/loader";
import styles from "./protected-route-element.module.css";
import { useAppLocation } from "../../services/hooks";

export default function ProtectedRouteElement(props: {
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
      return <Navigate to="/login" state={{ from: location }} />;
    }
    case "authenticated": {
      return props.element;
    }
  }
}
