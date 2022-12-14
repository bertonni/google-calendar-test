import { Routes, Route } from "react-router-dom";
import Calendar from "./pages/Calendar";
import RequireAuth from "./components/RequireAuth";
import MyEvents from "./pages/MyEvents";
import NotFound from "./pages/NotFound";

function App() {

  return (
    <Routes>
      <Route path="/" element={<Calendar />} />
      <Route path="/my-events" element={<RequireAuth>
        <MyEvents />
      </RequireAuth>} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
