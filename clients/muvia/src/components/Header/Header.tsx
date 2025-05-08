
'use client'
import './style.scss';
import { useEffect, useRef, useState } from 'react'
import { Avatar, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, addToast } from "@heroui/react";
// import SwitchDarkLight from '../SwtichDarkLight/SwitchDarkLight';
import { Input, Divider } from "@heroui/react";
import FindIcon from '../icons/FindIcon';
import sidebarSlide from '@/components/Sidebar/sidebarSlice';
import authenSlice from '@/redux-toolkit/slices/authen.slice';
import { useDispatch, useSelector } from 'react-redux';
import { sidebarSelectorMode } from "@/redux-toolkit/selector";
import { authenSelectorUser } from '@/redux-toolkit/selector';
import Link from 'next/link';
import routing from '@/utils/routing';
import { useRouter } from "next/navigation";
import { useMutation } from '@apollo/client';
import { LOGOUT_USER } from '@/graphql/actions/authenActions/logout.action';
const Header = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const sidebarMode = useSelector(sidebarSelectorMode);
  const userAuthen = useSelector(authenSelectorUser);
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();
  const [logoutUser, { data, loading, error }] = useMutation(LOGOUT_USER);
  const handleTongleSidebar = () => {
    dispatch(sidebarSlide.actions.changeMode(!sidebarMode));
  }

  // console.log("user-header: ", userAuthen)
  useEffect(() => {
    const handleScroll = () => {
      if (!headerRef.current) return;
      if (window.scrollY > 0) {
        headerRef.current.classList.add('active');
        headerRef.current.classList.remove('non-active');
      } else {
        headerRef.current.classList.remove('active');
        headerRef.current.classList.add('non-active');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleRedirect = () => {
    if(input.trim() === "") return
    setInput("")
    router.push(`${routing.finding}?content=${input}`)
  }

  const handleLogOut = async () => {
    try {
      const result = await logoutUser();
      localStorage.removeItem("access_token")
      dispatch(authenSlice.actions.setUser(null))
      addToast({
        title:"Error",
        description: "Đăng xuất thành công",
        color:"success"
      })
      router.push("/")
    }catch(err: any) {
      addToast({
        title:"Error",
        description: `${err.message}`,
        color:"danger"
      })
    }
  }

  const handleGotoProfile = () => {
    if(!userAuthen) {
      addToast({
        title:"Error",
        description:"Đăng nhập để truy cập",
        color:"danger"
      })
    }
    router.push(`${routing.profile}/me`)
  }

  return (
    <div ref={headerRef} className={`header-container non-active ${sidebarMode === true ? "on" : "off"}`}>
      {/* Left part */}
      <div>
        <div className='back-button--container' onClick={handleTongleSidebar}>
          {
            sidebarMode === true ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-3 text-white">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
              </svg>
            ) :
              (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-3 text-white">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>

              )
          }
        </div>
      </div>

      {/* Rigth part */}
      <div className='header-rigth-part'>

        {/* Search */}

        <Input
          value={input}
          onValueChange={setInput}
          labelPlacement="outside"
          placeholder="Search everything"
          startContent={
            <FindIcon style={{cursor:"pointer"}} onClick={handleRedirect} />
          }
      
        />

        {/* Notification */}
        <div >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-white">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
          </svg>
        </div>
        {/* Avatar */}
        <div>
          {
            userAuthen === null ? (
              <div style={{ whiteSpace: 'nowrap' }} className="flex h-5 items-center space-x-4 text-small ">
                <Link href={`${routing.login}`} style={{ color: "#fff", fontSize: "0.7rem" }}>Đăng nhập</Link>
                <Divider orientation="vertical" className='bg-white' />
                <Link href={`${routing.register}`} style={{ color: "#fff", fontSize: "0.7rem" }}>Đăng ký</Link>
              </div>
            ) : (
              <Dropdown>
                <DropdownTrigger>
                  <Avatar className='cursor-pointer' size="lg" src={`${userAuthen.avatar.url}`} />
                </DropdownTrigger>
                <DropdownMenu disabledKeys={["edit", "delete"]}>
                  <DropdownItem onClick={handleGotoProfile} key="new">Profile</DropdownItem>
                  <DropdownItem  onClick={handleLogOut} key="copy">Log out</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            )
          }

        </div>

        {/* Switch mode dark light */}
        {/* <SwitchDarkLight /> */}
      </div>

    </div>
  )
}

export default Header