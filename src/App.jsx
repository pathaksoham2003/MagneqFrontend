import {Routes, Route, Navigate} from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import Login from "./pages/Login";
import CreatePO from "./pages/Purchase/CreatePO";
import Dashboard from "./pages/Dashboard";
import CreateOrder from "./pages/CreateOrder";
import TrackOrder from "./pages/TrackOrder";
import Sales from "./pages/Sales/index";
import Purchase from "./pages/Purchase/index";
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
import RawMaterialDetail from "./pages/Stores/RawMaterialDetail";
import ManageFinishedGood from "./pages/DeveloperPanel/ManageFinishedGood";
import ManageRawMaterials from "./pages/DeveloperPanel/ManageRawMaterials";
import ManageUsers from "./pages/DeveloperPanel/ManageUsers";
import CreateRawMaterial from "./pages/DeveloperPanel/ManageRawMaterials/CreateRawMaterial";
import CreateFinishedGood from "./pages/DeveloperPanel/ManageFinishedGood/CreateFinishedGood";
import ViewFinishedGood from "./pages/DeveloperPanel/ManageFinishedGood/ViewFinishedGood";
import PurchaseOrder from "./pages/Purchase/PurchaseOrder";
import PurchaseDetails from "./pages/Purchase/PurchaseDetails";
import CreateUserPage from "./pages/DeveloperPanel/ManageUsers/CreateUserPage";
import ViewSalesOrder from "./pages/Sales/ViewSalesOrder";
import ManageSuppliers from "./pages/DeveloperPanel/ManageSuppliers";
import ManageCustomers from "./pages/DeveloperPanel/ManageCustomers";
import CreateSupplier from "./pages/DeveloperPanel/ManageSuppliers/CreateSupplier";
import CreateCustomer from "./pages/DeveloperPanel/ManageCustomers/CreateCustomer";

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
          <Route path="/sales/:id" element={<ViewSalesOrder />} />
          <Route path="/purchase" element={<Purchase />}>
            <Route index element={<PurchaseOrder />} />
            <Route path="create" element={<CreatePO />} />
            <Route path=":id" element={<PurchaseDetails />} />
            <Route path="track" element={<CreatePO />} />
          </Route>
          <Route path="/store" element={<Stores />}>
            <Route index element={<RawMaterial />} />
            <Route path="add" element={<AddStock />} />
          </Route>
          <Route
            path="/raw_material/:class_type/:id"
            element={<RawMaterialDetail />}
          />
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
            <Route path=":id" element={<QualityCard />} />
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
          <Route path="manage_suppliers" element={<ManageSuppliers />} />
          <Route path="manage_suppliers/create" element={<CreateSupplier />} />
          <Route path="manage_customers" element={<ManageCustomers />} />
          <Route path="manage_customers/create" element={<CreateCustomer />} />
          <Route path="manage_users/create" element={<CreateUserPage />} />
        </Route>
      </Routes>
    </div>
  );
}
export default App;
