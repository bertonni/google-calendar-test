import { Navigate } from "react-router-dom";
import { IAuthContext } from "../@types/types";
import Layout from "../components/Layout";
import { useAuthContext } from "../contexts/AuthContext";

const Login = () => {
  const { signin, loggedUser } = useAuthContext() as IAuthContext;

  if (loggedUser) return <Navigate to={"/add"} />

  return (
    <Layout>
      <div className="h-full w-full flex flex-col items-center justify-center gap-2">
        <button
          onClick={signin}
          className="px-4 py-2 bg-sky-500 text-white font-medium rounded hover:brightness-110"
        >
          Login with Google
        </button>
        {/* <a href="http://localhost:8080/auth/google"
          className="px-4 py-2 bg-sky-500 text-white font-medium rounded hover:brightness-110"
        >
          Login with Google 2
        </a> */}
      </div>
    </Layout>
  );
};

export default Login;
