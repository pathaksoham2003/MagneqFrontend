import {Routes, Route, Navigate} from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import Login from "./pages/Login";
import Button from "./components/buttons/Button";
import ProtectedLayout from "./components/ProtectedLayout";
import Dashboard from "./pages/Dashboard";
import CreateOrder from "./pages/CreateOrder";
import TrackOrder from "./pages/TrackOrder";
import Sales from "./pages/Sales";
import Stores from "./pages/Stores";
import Purchase from "./pages/Purchase";
import Production from "./pages/Production";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create-order" element={<CreateOrder />} />
          <Route path="/track-order" element={<TrackOrder />} />
          <Route path="/sales" element={<Sales />} />
          <Route path="/stores" element={<Stores />} />
          <Route path="/purchase" element={<Purchase />} />
          <Route path="/production" element={<Production />} />
        </Route>
      </Routes>
    </div>
  );
}
export default App;
