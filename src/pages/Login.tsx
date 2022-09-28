import { Navigate } from "react-router-dom";
import { IAuthContext } from "../@types/types";
import Layout from "../components/Layout";
import { useAuthContext } from "../contexts/AuthContext";

const Login = () => {
  const { signin, loggedUser } = useAuthContext() as IAuthContext;

  if (loggedUser) return <Navigate to={"/add"} />

  return (
    <Layout>
      <div className="h-full w-full flex flex-col items-center justify-center">
        <button
          onClick={signin}
          className="px-4 py-2 bg-sky-500 text-white font-medium"
        >
          Login with Google
        </button>
      </div>
    </Layout>
  );
};

export default Login;
