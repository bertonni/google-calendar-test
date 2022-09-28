import api from "../assets/api";
import Layout from "../components/Layout";

const Home = () => {

  const handleClick = async () => {
    const res = await api.get("/");
    const response = res.data;
    console.log(response);
  };

  return (
    <Layout>
      <div className="flex h-full w-full flex-col items-center justify-center relative">
        <h1 className="text-3xl font-medium">Home Page</h1>
        <button onClick={handleClick}>test</button>
      </div>
    </Layout>
  );
};

export default Home;
