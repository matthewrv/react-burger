import { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../../services/auth";

export default function ProtectedRouteElement(props: {
  element: ReactElement;
}) {
  const auth = useAuthContext();

  switch (auth.authentication) {
    case "in progress": {
      return null;
    }
    case "anonimous": {
      return <Navigate to="/login" />;
    }
    case "authenticated": {
      return props.element;
    }
  }
}
