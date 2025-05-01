"use client"
import "./style.scss";
import Footer from '@/components/Footer/Footer'
import Header from '@/components/Header/Header'
import SideBar from '@/components/Sidebar/SideBar';
import React from 'react'
import { useSelector } from 'react-redux';
import { sidebarSelectorMode } from "@/redux-toolkit/selector";

import AuthProvider from "../providers/AuthProvider";
function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const sidebarMode = useSelector(sidebarSelectorMode);
  return (
    <AuthProvider>

      <div className={`sidebar--container ${sidebarMode === true ? "on" : "off"}`}>
        <SideBar />
      </div>

      <div>
        <div style={{ display: "flex" }}>

          <div className={`fake-sidebar ${sidebarMode === true ? "on" : "off"}`}></div>
          <div style={{ flex: 1, zIndex: 1 }}>
            {/* Header */}
            <Header />

            {/* Page */}
            <div className="content--container">
              {children}

              <div className="p-[20px]">
                <hr className="bg-white transform scale-y-[0.3]" />
              </div>
              {/* Footer */}
              <Footer />
            </div>
          </div>


        </div>

      </div>

    </AuthProvider>
  )
}

export default RootLayout