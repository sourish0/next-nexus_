"use client"
import { FC, useState } from 'react';

const Sidebar: FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex h-screen">
      {/* Mobile Menu Button */}
      <button
        className="lg:hidden p-4 text-white bg-blue-600 focus:outline-none"
        onClick={toggleSidebar}
      >
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* Sidebar */}
      <div
        className={`bg-blue-600 text-white w-64 flex flex-col justify-between lg:static fixed inset-0 lg:w-64 transition-transform transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        {/* Top section */}
        <div>
          <div className="flex items-center justify-center h-16">
            <span className="text-2xl font-bold">Logo</span>
          </div>
          <nav className="mt-10">
            <a href="/profile/Team" className="flex items-center py-2 px-4 bg-blue-800">
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 7l1.664-2.083A4 4 0 019.017 4h5.966a4 4 0 014.353 3.224L21 7m0 0v6m-18 0v-6m0 0h18"
                />
              </svg>
              <span className="ml-4">Dashboard</span>
            </a>
            <a href="#" className="flex items-center py-2 px-4 hover:bg-blue-500">
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 17h8m0 0v-6m0 6l-8-8-4 4-6-6"
                />
              </svg>
              <span className="ml-4">Team</span>
            </a>
            <a href="#" className="flex items-center py-2 px-4 hover:bg-blue-500">
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 17v5H5v-5m4 0a4 4 0 100-8h-4m8 8v5h-4v-5m4 0a4 4 0 100-8h-4m4-4V3h-4v5m4 0a4 4 0 100-8h-4"
                />
              </svg>
              <span className="ml-4">Projects</span>
            </a>
            {/* Add more links as needed */}
          </nav>
        </div>
        {/* Bottom section */}
        <div>
          <a href="#" className="flex items-center py-2 px-4 hover:bg-blue-500">
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 17v5H5v-5m4 0a4 4 0 100-8h-4m8 8v5h-4v-5m4 0a4 4 0 100-8h-4m4-4V3h-4v5m4 0a4 4 0 100-8h-4"
              />
            </svg>
            <span className="ml-4">Settings</span>
          </a>
        </div>
      </div>

      {/* Main content area */}
      <div className="flex-1 p-6 bg-gray-100">
        {/* Top Bar */}
        <div className="flex justify-between items-center">
          <input
            type="text"
            placeholder="Search..."
            className="px-4 py-2 rounded-lg bg-white shadow"
          />
          <div className="flex items-center">
            <svg
              className="h-6 w-6 mr-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 18v3m0 0v-3m0 0h6m-6 0h-6m0 0V9a2 2 0 012-2h8a2 2 0 012 2v6"
              />
            </svg>
            <img
              src="/profile.jpg" // Replace with the profile image path
              alt="Profile"
              className="w-10 h-10 rounded-full"
            />
            <span className="ml-2 font-semibold">Tom Cook</span>
          </div>
        </div>

        {/* Content area */}
        <div className="mt-6 border-2 border-dashed border-gray-300 rounded-lg h-full">
          {/* This area can be used to render content */}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
