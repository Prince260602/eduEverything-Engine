import React, { useState, useEffect } from "react";
import { LayoutGrid, LogOut, Menu, MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import Domain from "./Domain/Domain";
import Queries from "./Queries/Queries";

export default function Admin() {
  const [currentPage, setCurrentPage] = useState("domain");
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
      if (window.innerWidth >= 640) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const renderPage = () => {
    switch (currentPage) {
      case "domain":
        return <Domain />;
      case "queries":
        return <Queries />;
      default:
        return <Domain />;
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  return (
    <>
      <nav className="fixed top-0 z-50 w-full border-b bg-gray-100">
        <div className="px-4 py-3 lg:px-6 lg:pl-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start rtl:justify-end">
              <button
                onClick={toggleSidebar}
                type="button"
                className="inline-flex items-center p-2 text-2xl text-gray-800 rounded-lg sm:hidden focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <Menu className="w-6 h-6" />
              </button>
              <span className="text-2xl font-semibold whitespace-nowrap text-gray-800 ml-2">
                Admin Panel
              </span>
            </div>
          </div>
        </div>
      </nav>

      <aside
        className={`fixed top-0 left-0 z-40 w-64 h-screen pt-16 transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } bg-gray-100 sm:translate-x-0`}
        aria-label="Sidebar"
      >
        <div className="h-full px-4 pb-4 overflow-y-auto">
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => handlePageChange("domain")}
                className={`flex items-center w-full p-2 text-lg text-black rounded-lg group hover:bg-gray-700 hover:text-white transition-colors ${
                  currentPage === "domain" ? "bg-gray-700 text-white" : ""
                }`}
              >
                <LayoutGrid className="w-5 h-5" />
                <span className="ml-3">Domain</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => handlePageChange("queries")}
                className={`flex items-center w-full p-2 text-lg text-black rounded-lg group hover:bg-gray-700 hover:text-white transition-colors ${
                  currentPage === "queries" ? "bg-gray-700 text-white" : ""
                }`}
              >
                <MessageSquare className="w-5 h-5" />
                <span className="ml-3">Queries</span>
              </button>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="flex items-center w-full p-2 text-lg text-black rounded-lg group hover:bg-gray-700 hover:text-white transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span className="ml-3">Log out</span>
              </button>
            </li>
          </ul>
        </div>
      </aside>

      <main className="pt-16 sm:ml-64">
        <div>{renderPage()}</div>
      </main>
    </>
  );
}