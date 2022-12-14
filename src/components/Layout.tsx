import { LayoutCompProps } from "../@types/types";
import { useAuthContext } from "../contexts/AuthContext";

const Layout = ({ children, dontShowLogin }: LayoutCompProps) => {
  const { loggedUser, logout, signin } = useAuthContext();

  return (
    <div className="h-screen w-ful relative flex flex-col">
      {loggedUser ? (
        <div className="flex items-center absolute top-2 right-20 2xl:right-40 rounded z-50">
          <div className="border border-r-0 px-4 py-2 rounded-l">
            <span className="font-medium">{loggedUser?.email}</span>
          </div>
          <div
            className="border border-l-0 rounded-r px-4 py-2 border-rose-400
              bg-rose-400 hover:bg-rose-500 cursor-pointer"
            onClick={logout}
          >
            <button className="text-white font-medium">Sair</button>
          </div>
        </div>
      ) : null}
      {!loggedUser && !dontShowLogin ? (
        <div className="flex items-center absolute top-2 right-20 2xl:right-40 rounded">
          <button
            className="rounded px-6 py-2 bg-[#4285F4] text-white hover:brightness-110 font-medium"
            onClick={signin}
          >
            Login
          </button>
        </div>
      ) : null}
      <div className="flex-1 w-full flex items-center justify-center pt-6">
        {children}
      </div>
    </div>
  );
};

export default Layout;
