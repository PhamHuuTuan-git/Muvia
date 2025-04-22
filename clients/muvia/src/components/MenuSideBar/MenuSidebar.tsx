
"use client";
import BlogIcon from "../icons/BlogIcon"
import FilmIcon from "../icons/FilmIcon"
import HomeIcon from "../icons/HomeIcon"
import UsersIcon from "../icons/UsersIcon"
import "./style.scss"
import React from 'react'
import { useSelector } from 'react-redux';
import { sidebarSelectorMode } from "@/redux-toolkit/selector";
import Link from 'next/link';
import routing from "@/utils/routing"
import { usePathname } from 'next/navigation';
function MenuSidebar() {
    const pathname = usePathname();
    const sidebarMode = useSelector(sidebarSelectorMode);
    return (
        <div>
            <ul className='menu--container'>
                <Link href={`${routing.home}`} 
                className={`list-item ${pathname === routing.home && "active"}`}
                >
                    <div className="item--container">
                        <HomeIcon className="icon-item" />
                        {sidebarMode && <p className="text-item">Home</p>}
                    </div>
                </Link>
                <Link 
                    href={`${routing.movies}`} 
                    className={`list-item ${pathname === routing.movies && "active"}`}
                >
                    <div className="item--container">
                        <FilmIcon className="icon-item" />
                        {sidebarMode && <p className="text-item">Movies</p>}
                    </div >
                </Link>
                <Link
                    href={`${routing.blogs}`} 
                    className={`list-item ${pathname === routing.blogs && "active"}`}
                >
                    <div className="item--container">
                        <BlogIcon className="icon-item" />
                        {sidebarMode && <p className="text-item">Blog</p>}
                    </div>
                </Link>
                <Link
                    href={`${routing.aboutUs}`} 
                    className={`list-item ${pathname === routing.aboutUs && "active"}`}
                >
                    <div className="item--container">
                        <UsersIcon className="icon-item" />
                        {sidebarMode && <p className="text-item">About us</p>}
                    </div>
                </Link>
            </ul>
        </div>
    )
}

export default MenuSidebar