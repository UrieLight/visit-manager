import { VisitList, VisitRegister } from './components'
import { Toaster } from 'react-hot-toast'
import { Routes, Route, Link } from 'react-router-dom'

function App() {
  return (
    <div>
      <nav className='flex items-center gap-3 m-auto p-4'>
        <Link to="/Register" className="text">Register</Link>
        <Link to="/Visits" className="text">Visits</Link>
      </nav>

      <Routes>
        <Route path='/Register' element={<VisitRegister />} />
        <Route path='/Visits' element={<VisitList />} />
      </Routes>
      
      <Toaster position='bottom-center'/>
    </div>
  )
}

export default App
