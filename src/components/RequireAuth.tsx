import { FC, PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";
import { IAuthContext } from "../@types/types";
import { useAuthContext } from "../contexts/AuthContext";

const RequireAuth: FC<PropsWithChildren> = ({ children }) => {
  const { loggedUser } = useAuthContext() as IAuthContext;

  return <>{loggedUser ? <>{children}</> : <Navigate to={"/login"} />}</>;
};

export default RequireAuth;
