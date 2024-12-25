import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";

function Layout() {
  const location = useLocation();

  // Rutas donde no se mostrarán el Header y el Sidebar
  const excludeHeaderSidebarRoutes = ["/", "/login"];

  const shouldShowHeaderSidebar = !excludeHeaderSidebarRoutes.includes(
    location.pathname
  );

  return (
    <div className="app-container">
      {shouldShowHeaderSidebar && <Header />}
      <div className="main-container" style={{ display: "flex" }}>
        {shouldShowHeaderSidebar && <Sidebar />}
        <div className="content" style={{ flex: 1 }}>
          <Outlet /> {/* Aquí se renderizan las vistas específicas */}
        </div>
      </div>
    </div>
  );
}

export default Layout;
