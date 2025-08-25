import { Outlet, useLocation } from 'react-router';
import Menu from './components/Menu'
import './App.css'

function App() {
  const location = useLocation();

    const role: "admin" | "user" = location.pathname.startsWith("/admin") ? "admin" : "user"; 

  return (
    <>
         <Menu role={role} />
        <Outlet />
    </>
  )
}

export default App
