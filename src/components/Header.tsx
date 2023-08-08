import { useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { VisitRegister } from './VisitRegister'
import { VisitList } from './VisitList'

export const Header = () => {

  return(
    <header className="bg-dark text-white">
      <nav className='flex items-center gap-3 m-auto p-4'>
        <Link to="/" className="text">Register</Link>
        <Link to="/Visits" className="text">Visits</Link>
      </nav>
      <Routes>
        <Route path='/' element={<VisitRegister />} />
        <Route path='/Visits' element={<VisitList />} />
      </Routes>
    </header>
  )

}