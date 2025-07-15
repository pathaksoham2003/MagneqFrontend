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
import Email from "./pages/Email";
import Chat from "./pages/Chat";
import AddStock from "./pages/Store/AddStock";
import Stores from "./pages/Stores";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import Quality from "./pages/Quality/index";
import QualityConcen from "./pages/Quality/QualityConcen";
import CreateTicket from "./pages/Quality/CreateTicket";
import QualityCard from "./pages/Quality/QualityCard";
import ProductionDetails from "./pages/Production/ProductionDetails";
import RawMaterial from "./pages/Stores/RawMaterial";
import FinishedGoods from "./pages/DeveloperPanel/ManageFinishedGood";
import ManageFinishedGood from "./pages/DeveloperPanel/ManageFinishedGood";
import ManageRawMaterials from "./pages/DeveloperPanel/ManageRawMaterials";
import ManageUsers from "./pages/DeveloperPanel/ManageUsers";
import CreateRawMaterial from "./pages/DeveloperPanel/ManageRawMaterials/CreateRawMaterial";
import CreateFinishedGood from "./pages/DeveloperPanel/ManageFinishedGood/CreateFinishedGood";
import ViewFinishedGood from "./pages/DeveloperPanel/ManageFinishedGood/ViewFinishedGood";

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

          <Route path="/email" element={<Email />} />
          <Route path="/chat" element={<Chat />} />
          {/* <Route path="/stores" element={<Store />}>
            <Route path="class/:classType" element={<StoreList />} />
            <Route path="class/:classType/:id" element={<ClassDetail />} />
            <Route path="add" element={<AddStock />} />
            </Route> */}

          <Route path="/quality" element={<Quality />}>
            <Route index element={<QualityConcen />} />
            <Route path="create_ticket" element={<CreateTicket />} />
            <Route path="card" element={<QualityCard />} />
          </Route>

          <Route path="finished_good" element={<ManageFinishedGood />} />
          <Route path="finished_good/:id" element={<ViewFinishedGood />} />
          <Route path="finished_good/create" element={<CreateFinishedGood />} />
          <Route
            path="raw_material/:class_type"
            element={<ManageRawMaterials />}
          />
          <Route
            path="raw_material/:class_type/create"
            element={<CreateRawMaterial />}
          />
          <Route path="manage_users" element={<ManageUsers />} />
        </Route>
      </Routes>
    </div>
  );
}
export default App;
