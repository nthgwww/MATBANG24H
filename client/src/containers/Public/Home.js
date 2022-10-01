import React, { useEffect, useRef } from 'react'
import Header from './Header'
import { Outlet, useLocation } from 'react-router-dom'
import { Navigation, Search } from './index'
import { Intro, Contact } from '../../components'
import { useSelector } from 'react-redux'
import { path } from '../../ultils/constant'


const Home = () => {
    const { isLoggedIn } = useSelector(state => state.auth)
    const location = useLocation()
    const navRef = useRef()

    useEffect(() => {
        const handleScroll = (e) => {
            if (window.pageYOffset >= 134) {
                navRef.current.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                z-index: 50;
                `
            } else {
                navRef.current.style.cssText = `
                width: 100%
                `
            }
        }
        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])
    return (
        <div className='w-full flex gap-6 flex-col items-center h-full'>
            <Header />
            <div ref={navRef} className='w-full'>
                <Navigation />
            </div>
            {location.pathname !== `/${path.CONTACT}` && !location.pathname?.includes(path.DETAIL) && <Search />}
            <div className='w-4/5 lg:w-3/5 flex flex-col items-start justify-start mt-3'>
                <Outlet />
            </div>
            <Intro />
            <Contact />
            <div className='h-[500px]'>

            </div>
        </div>
    )
}

export default Home