import { Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import Login from "./pages/Login";
import Button from "./components/buttons/Button";
import ProtectedLayout from "./components/ProtectedLayout";
import PurchaseOrder from "./components/purchase/PurchaseOrder";
import CreatePO from "./components/purchase/CreatePO";
import Dashboard from "./pages/Dashboard";
import CreateOrder from "./pages/CreateOrder";
import TrackOrder from "./pages/TrackOrder";
import Sales from "./pages/Sales";

import Purchase from "./pages/Purchase";
import Production from "./pages/Production";
import Ledger from "./pages/Ledger";
import Email from "./pages/Email";
import Chat from "./pages/Chat";
import Store from "./pages/Store/Index";
import StoreList from "./pages/Store/StoreList";
import AddStock from "./pages/Store/AddStock";
import ClassDetail from "./pages/Store/ClassDetail";
import StoreCard from "./pages/Store/StoreHeader";
import Stores from "./pages/Stores";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Quality from "./pages/Quality/index";
import QualityConcen from "./pages/Quality/QualityConcen";
import CreateTicket from "./pages/Quality/CreateTicket";
import QualityCard from "./pages/Quality/QualityCard";

function App() {
  return (
    <div className="App">
      <ReactQueryDevtools initialIsOpen={false} />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<AppLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/create_order" element={<CreateOrder />} />
          <Route path="/track_order" element={<TrackOrder />} />
          <Route path="/sales" element={<Sales />} />
          <Route element={<Purchase />}>
            <Route path="/purchase" element={<PurchaseOrder />} />
            <Route path="/create_po" element={<CreatePO />} />
          </Route>
          <Route path="/production" element={<Production />} />
          <Route path="/ledger" element={<Ledger />} />

          <Route path="/email" element={<Email />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/store" element={<Stores />} />
          <Route path="/stores" element={<Store />}>
            <Route path="class/:classType" element={<StoreList />} />
            <Route path="class/:classType/:id" element={<ClassDetail />} />
            <Route path="add" element={<AddStock />} />
          </Route>
          <Route path="/quality" element={<Quality />}>
            <Route path="quality_concern" element={<QualityConcen />} />
            <Route path="create_ticket" element={<CreateTicket />} />
            <Route path="card" element={<QualityCard />} />

          </Route>
        </Route>
      </Routes>
    </div>
  );
}
export default App;
