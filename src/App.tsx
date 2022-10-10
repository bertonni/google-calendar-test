import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Terms from "./pages/Terms";
import Policy from "./pages/Policy";
import AddEvent from "./pages/AddEvent";
import RequireAuth from "./components/RequireAuth";
import MyEvents from "./pages/MyEvents";
import Calendar from "./pages/Calendar";

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/add"
        element={
          <RequireAuth>
            <AddEvent />
          </RequireAuth>
        }
      />
      <Route
        path="/events"
        element={
          <RequireAuth>
            <MyEvents />
          </RequireAuth>
        }
      />
      <Route
        path="/calendar"
        element={
          <RequireAuth>
            <Calendar />
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
