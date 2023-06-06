import React from 'react'
import { Navigation } from '../Public'
import logo from "../../assets/logo.png";

const Header = () => {
    return (
        <div className='w-full flex flex-none h-[40px]'>
            <div className='flex justify-center items-center font-bold bg-yellow-400 text-slate-900 w-[256px] flex-none'>
                <img src={logo} className='object-fit w-[60px] h-[40px] '/>
                Matbang24h
            </div>
            <div className='flex-auto'>
                <Navigation isAdmin={true} />
            </div>
        </div>
    )
}

export default Header