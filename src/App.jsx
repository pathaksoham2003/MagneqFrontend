import { Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import Login from "./pages/Login";
import Button from "./components/buttons/Button";
import ProtectedLayout from "./components/ProtectedLayout";
import Dashboard from "./pages/Dashboard";
import CreateOrder from "./pages/CreateOrder";
import TrackOrder from "./pages/TrackOrder";
import Sales from "./pages/Sales";

import Purchase from "./pages/Purchase";
import Production from "./pages/Production";
import Ledger from "./pages/Ledger";
import Quality from "./pages/Quality";
import Email from "./pages/Email";
import Chat from "./pages/Chat";
import Store from "./pages/Store/Index";
import StoreList from "./pages/Store/StoreList";
import AddStock from "./pages/Store/AddStock";
import ClassDetail from "./pages/Store/ClassDetail";
import StoreCard from "./pages/Store/StoreCard";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create_order" element={<CreateOrder />} />
          <Route path="/track_order" element={<TrackOrder />} />
          <Route path="/sales" element={<Sales />} />

          <Route path="/purchase" element={<Purchase />} />
          <Route path="/production" element={<Production />} />
          <Route path="/ledger" element={<Ledger />} />
          <Route path="/quality" element={<Quality />} />
          <Route path="/email" element={<Email />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/store" element={<Store />}>
            <Route path="storecard" element={<StoreCard />}>
              <Route index element={<StoreList />} />
              <Route path="class-detail" element={<ClassDetail />} />
            </Route>
            <Route path="add" element={<AddStock />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}
export default App;
