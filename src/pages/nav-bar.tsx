import { Link, NavLink, Outlet } from "react-router-dom"
import search_icon from "../assets/search_icon.png"
import profile_icon from "../assets/profile_icon.png"
import cart_icon from "../assets/cart_icon.png"
import menu_icon from "../assets/menu_icon.png"
import dropdown_icon from "../assets/dropdown_icon.png"

import { useState } from "react"

export const NavBar = () => {
    const [showMenu, setShowMenu] = useState(false);
    return (
        <nav className="items-center justify-between p-5 font-medium">
            <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
                <li>
                    <NavLink className="flex flex-col items-center gap-1" to="/">
                    <p>Home</p>
                    <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden"/>
                    </NavLink>
                </li>
                <li>
                    <NavLink className="flex flex-col items-center gap-1" to="/login"><p>Login</p>
                    <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden"/></NavLink>
                </li>
                <li>
                    <NavLink className="flex flex-col items-center gap-1" to="/Dashboard"><p>Dashboard</p>
                    <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden"/></NavLink>
                </li>
                <li>
                    <NavLink className="flex flex-col items-center gap-1" to="/Profile"><p>Profile</p>
                    <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden"/></NavLink>
                </li>
            </ul>

            <img onClick={()=>setShowMenu(true)} src={menu_icon} className="float-end pt-1 w-5 cursor-pointer sm:hidden" alt="" />
            
            <Link to="/cart" className="float-end px-3">
                <img src={cart_icon} className="w-5 min-w-5" alt="" />
                <p className="relative bottom-[5px] right-[-8px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">10</p>
            </Link>

            <div className="float-end px-3 group relative">
                <img className="w-5 cursor-pointer" src={profile_icon} alt="" />
                <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
                    <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
                        <p className="cursor-pointer hover:text-black">My Profile</p>
                        <p className="cursor-pointer hover:text-black">Orders</p>
                        <p className="cursor-pointer hover:text-black">Logout</p>
                    </div>
                </div>
            </div>

            <div className="float-end px-3">
                <img src={search_icon} alt="" className="w-5 h-5 cursor-pointer"/>
            </div>

            <div className={`absolute top-0 right-0 bottom-0 overflow-hidden sm:hidden md:hidden lg:hidden bg-white transition-all ${showMenu ? 'w-full' : 'w-0'}`}>
                <div className="flex flex-col text-gray-600">
                    <div onClick={()=>setShowMenu(false)} className="flex cursor-pointer items-center gap-4 p-3">
                        <img src={dropdown_icon} className="h-4 rotate-180" alt="" />
                        <p>Back</p>
                    </div>
                    <NavLink onClick={()=>setShowMenu(false)} className='py-2 pl-6 border' to={'/'}>Home</NavLink>
                    <NavLink onClick={()=>setShowMenu(false)} className='py-2 pl-6 border' to={'/dashboard'}>Dashboard</NavLink>
                    <NavLink onClick={()=>setShowMenu(false)} className='py-2 pl-6 border' to={'/profile'}>Profile</NavLink>
                    <NavLink onClick={()=>setShowMenu(false)} className='py-2 pl-6 border' to={'/orders'}>Orders</NavLink>
                </div>
            </div>

            <div><Outlet/></div>
        </nav>
    )
}