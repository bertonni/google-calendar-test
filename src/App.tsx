import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Terms from "./pages/Terms";
import Policy from "./pages/Policy";
import { gapi } from "gapi-script";
import { useAuthContext } from "./contexts/AuthContext";
import { IAuthContext } from "./@types/types";
import AddEvent from "./pages/AddEvent";
import RequireAuth from "./components/RequireAuth";

const clientId = import.meta.env.VITE_CALENDAR_CLIENT_ID;

function App() {
  const { loggedUser, setLoggedUser } = useAuthContext() as IAuthContext;

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* <Route path="/add" element={<AddEvent />} /> */}
      <Route
        path="/add"
        element={
          <RequireAuth>
            <AddEvent />
          </RequireAuth>
        }
      />
      <Route
        path="/logout"
        element={
          <RequireAuth>
            <Logout />
          </RequireAuth>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/policy" element={<Policy />} />
    </Routes>
  );
}

export default App;
