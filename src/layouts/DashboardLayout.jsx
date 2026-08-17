import { useState } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  return (
    <div className="min-h-screen bg-gray-100">

      <Sidebar
        isOpen={sidebarOpen}
        onClose={() =>
          setSidebarOpen(false)
        }
      />

      <div className="lg:ml-72">

        <Header
          onMenuClick={() =>
            setSidebarOpen(true)
          }
        />

        <main className="p-6">

          <Outlet />

        </main>

      </div>

    </div>
  );
};

export default DashboardLayout;