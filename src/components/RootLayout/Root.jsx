import React from 'react'
import TopBar from '../TopBar/TopBar'
import { Outlet } from 'react-router-dom'

export default function Root() {
  return (
    <>
        <header>
            {/* <TopBar /> */}
        </header>
        <main>
            <Outlet />
        </main>
        <footer>
            
        </footer>
    </>
  )
}
