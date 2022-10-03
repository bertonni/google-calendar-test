import {
  GoogleAuthProvider,
  IdTokenResult,
  inMemoryPersistence,
  onAuthStateChanged,
  onIdTokenChanged,
  setPersistence,
  signInWithPopup,
  signInWithRedirect,
  signOut,
  User,
} from "firebase/auth";
import {
  useState,
  createContext,
  useContext,
  FC,
  PropsWithChildren,
  useMemo,
  useEffect,
} from "react";
import { useNavigate } from "react-router-dom";
import { IAuthContext } from "../@types/types";
import { auth, provider } from "../utils/firebase";

const AuthContext = createContext<IAuthContext | null>(null);

export const useAuthContext = () => {
  return useContext(AuthContext);
};

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [loggedUser, setLoggedUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loadingInitial, setLoadingInitial] = useState<boolean>(true);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [credentials, setCredentials] = useState<IdTokenResult | null>(null);

  const navigate = useNavigate();

  // useEffect(() => {

  //   console.log(loggedUser);

  //   loggedUser
  //     ?.getIdToken()
  //     .then((res) => console.log('res', res))
  //     .catch((err) => console.log('err', err));
  // }, [loggedUser]);

  useEffect(() => {
    console.log(loggedUser);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        setLoggedUser(user);
      } else {
        // User is signed out
        setLoggedUser(null);
      }
      setLoadingInitial(false);
    });
  }, [loggedUser]);

  const forceRefreshToken = async () => {

    if (loggedUser) {
      await loggedUser
        .getIdToken(true)
        .then((res) => {
          console.log('res', res);
          setAccessToken(res);
        })
        .catch((err) => console.log("err", err));
    }
  };

  const signin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;

        if (token) setAccessToken(token);
        // The signed-in user info.
        const user = result.user;
        console.log(user, token);
        setLoggedUser(user);
        navigate("/add");
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  };

  const logout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        setLoggedUser(null);
        setAccessToken(null);
      })
      .catch((error) => {
        // An error happened
        console.log(error);
      });
  };

  const memoedValues = useMemo(
    () => ({
      loggedUser,
      error,
      loadingInitial,
      accessToken,
      credentials,
      setError,
      forceRefreshToken,
      signin,
      logout,
      setLoggedUser,
    }),
    [loggedUser, credentials, accessToken, error]
  );

  return (
    <AuthContext.Provider value={memoedValues}>
      {!loadingInitial && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
