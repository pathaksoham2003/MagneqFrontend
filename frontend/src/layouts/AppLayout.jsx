import {SidebarProvider} from "../context/SidebarContext";
import {useSidebar} from "../hooks/useSidebar";
import {Outlet} from "react-router";
import AppHeader from "./AppHeader";
import Backdrop from "./Backdrop";
import AppSidebar from "./AppSidebar";
import {useEffect} from "react";

const LayoutContent = () => {
  const {isExpanded, isHovered, isMobileOpen} = useSidebar();

  return (
    <div className="min-h-screen xl:flex bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300">
      <div>
        <AppSidebar />
        <Backdrop />
      </div>
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${
          isExpanded || isHovered ? "lg:ml-[290px]" : "lg:ml-[90px]"
        } ${isMobileOpen ? "ml-0" : ""}`}
      >
        <AppHeader />
        <div className="p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

const AppLayout = () => {
  
  useEffect(() => {

  }, []);

  return (
    <SidebarProvider>
      <LayoutContent />
    </SidebarProvider>
  );
};

export default AppLayout;
