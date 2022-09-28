import { Link } from 'react-router-dom';
import { IAuthContext } from '../@types/types';
import { useAuthContext } from '../contexts/AuthContext';

const Navbar = () => {

  const { loggedUser, logout } = useAuthContext() as IAuthContext;

  return (
    <div className="absolute top-0 left-0 right-0 py-4 flex items-center justify-center gap-4 z-10 w-full">
      <Link className='font-medium text-gray-600' to={"/"}>Home</Link>
      {loggedUser && <Link className='font-medium text-gray-600' to={"/add"}>Add Event</Link>}
      <Link className='font-medium text-gray-600' to={"/terms"}>Terms</Link>
      <Link className='font-medium text-gray-600' to={"/policy"}>Policy</Link>
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