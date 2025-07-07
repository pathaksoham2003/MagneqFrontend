import {Routes, Route, Navigate, useNavigate} from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import Login from "./pages/Login";
import PurchaseOrder from "./components/purchase/PurchaseOrder";
import CreatePO from "./components/purchase/CreatePO";
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
import AddStock from "./pages/Store/AddStock";
import Stores from "./pages/Stores";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import ProductionDetails from "./pages/Production/ProductionDetails";
import RawMaterial from "./pages/Stores/RawMaterial";

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
          <Route path="/store" element={<Stores />}>
            <Route index element={<RawMaterial />} />
            <Route path="add" element={<AddStock />} />
          </Route>
          <Route path="/production" element={<Production />} />
          <Route path="/production/:id" element={<ProductionDetails />} />
          <Route path="/ledger" element={<Ledger />} />
          <Route path="/quality" element={<Quality />} />
          <Route path="/email" element={<Email />} />
          <Route path="/chat" element={<Chat />} />
          {/* <Route path="/stores" element={<Store />}>
            <Route path="class/:classType" element={<StoreList />} />
            <Route path="class/:classType/:id" element={<ClassDetail />} />
            <Route path="add" element={<AddStock />} />
          </Route> */}
        </Route>
      </Routes>
    </div>
  );
}
export default App;
