import { Link } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';

const Navbar = () => {

  const { loggedUser, logout } = useAuthContext();

  return (
    <div className="py-4 flex items-center flex-wrap justify-center gap-4 z-10 w-full">
      <Link className='font-medium text-gray-600' to={"/"}>Home</Link>
      {loggedUser && <Link className='font-medium text-gray-600' to={"/calendar"}>Calendário</Link>}
      <Link className='font-medium text-gray-600' to={"/terms"}>Termos</Link>
      <Link className='font-medium text-gray-600' to={"/policy"}>Política de Uso</Link>
      {loggedUser && (
        <div className='flex items-center gap-2'>
          <h4 className='text-gray-500 font-bold'>Hello, { loggedUser.displayName }
          </h4>
          <button className='font-medium text-gray-600' onClick={logout} >Logout</button>
        </div>
      )}
      {!loggedUser && <Link className='font-medium text-gray-600' to={"/login"}>Login</Link>}
    </div>
  );
}

export default Navbar;