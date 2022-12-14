import { FC, PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";

const RequireAuth: FC<PropsWithChildren> = ({ children }) => {
  const { loggedUser } = useAuthContext();

  return <>{loggedUser ? <>{children}</> : <Navigate to={"/"} />}</>;
};

export default RequireAuth;
