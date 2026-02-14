import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar/Sidebar";
import Topbar from "../components/topbar/Topbar";
<<<<<<< HEAD
import "./AdminLayout.css";
=======
import "./adminLayout.css";
>>>>>>> 4969e58 (Fixed InvoiceCreate import path issue)

export default function AdminLayout() {
  return (
    <div className="admin-layout">
      <aside className="sidebar-container">
        <Sidebar />
      </aside>

      <div className="admin-main">
        <header className="topbar-container">
          <Topbar />
        </header>

        <main className="admin-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
