import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import { AdminSidebar } from './'
import { path } from '../../ultils/constant'

const Admin = () => {
    const { isLoggedIn } = useSelector(state => state.auth)
    const { currentData } = useSelector(state => state.user)

    if (!isLoggedIn || currentData?.role !== 'ADMIN') return <Navigate to={`/${path.LOGIN}`} replace={true} />
    return (
        <div className='w-full h-min-screen flex gap-4'>
            <div className='w-[327px] flex-none py-4 pl-4 h-full shadow-sm'>
                <AdminSidebar />
            </div>
            <div className='flex-auto h-full py-4'>
                <Outlet />
            </div>
        </div>
    )
}

export default Admin