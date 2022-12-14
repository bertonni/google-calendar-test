import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Layout dontShowLogin>
      <div className="h-full flex flex-col items-center justify-center w-full gap-4">
        <h1 className="text-5xl text-gray-600 font-bold">Ooops!</h1>
        <p className="text-gray-600 text-lg">
          Parece que a página que você tentou acessar não existe :(
        </p>
        <button
          className="rounded-full px-6 py-2 text-gray-600 bg-gray-200 hover:bg-gray-300"
          onClick={() => navigate("/")}
        >
          Voltar para o Início
        </button>
      </div>
    </Layout>
  );
};

export default NotFound;
