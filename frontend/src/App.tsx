import { Outlet, useLocation } from 'react-router';
import {useEffect} from 'react';
import Menu from './components/Menu'
import axios from 'axios';
import './App.css'

function App() {
  const location = useLocation();

    const role: "admin" | "user" = location.pathname.startsWith("/admin") ? "admin" : "user"; 


// useEffect(() => {
//   const deneme = async () => {
//     const response = await axios.get('http://localhost:8080/etkinlikler', {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });

//     console.log(response.data, "çalıştı")
//   }
//   deneme();
// }, [])

  return (
    <>
         <Menu role={role} />
        <Outlet />
    </>
  )
}

export default App
