"use client"
import "./style.scss"
import React from 'react'
import { useSelector } from 'react-redux';
import { sidebarSelectorMode } from "@/redux-toolkit/selector";
import { Divider } from "@heroui/react";
import MenuSidebar from "../MenuSideBar/MenuSidebar";

function SideBar() {
  const sidebarMode = useSelector(sidebarSelectorMode);
  return (
    <div>
      {/* Logo */}
      <div className="logo--container">
        <div className="image-logo--container">
          <img src="/white_on_trans.png" />
        </div>
      </div>

      {sidebarMode === true ? (<div className="px-[20px]">
        <Divider className="bg-[#9d9e9d]" />
      </div>) : null}

      <div>
        <MenuSidebar />
      </div>
    </div>
  )
}

export default SideBar