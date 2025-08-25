import {useState, useEffect} from 'react';
import { NavLink } from "react-router";


interface MenuProps {
  role: "admin" | "user";
}

const Menu: React.FC<MenuProps> = ({ role }) => {
    const [newAnnouncement, setNewAnnouncement] = useState(false);
  // Tailwind ile aktif linkleri belirlemek için className fonksiyonu
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `px-4 py-2 rounded-lg font-medium transition-colors duration-200
     ${isActive ? "bg-blue-600 text-white shadow-lg" : "text-gray-700 hover:bg-blue-100 hover:text-blue-800"}`;
useEffect(() => {
  const ws = new WebSocket('ws://localhost:8080/ws/websocket');

  ws.onopen = () => console.log('WS bağlandı');

  ws.onmessage = (event) => {
    console.log('Mesaj geldi:', event.data);
   setNewAnnouncement(true);
  };

  // Test mesajı göndermek istersen
  // ws.send("Merhaba server");

  return () => ws.close();
}, []);

  return (

    <nav className="p-4 w-full bg-white shadow-md border-b border-gray-200">
<div className="max-w-6xl mx-auto flex justify-end pb-3 text-gray-700 font-medium" >
 <NavLink
  to={role === "admin" ? "/kullanici" : "/admin"}
 className="flex justify-end  relative group"
>
  <span className="relative inline-flex items-center">
    {role === "admin" ? "Kullanıcı Görünümüne Geç" : "Admin Görünümüne Geç"}
    
    {/* Eğer admin ise, notification badge */}
    {role === "admin" && newAnnouncement && (
  <span className="absolute -top-2 -right-3 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white text-xs font-bold shadow-md animate-pulse">
    1
  </span>
)}

    
    <span className="absolute left-0 -bottom-0.5 w-0 h-[2px] bg-blue-300 transition-all duration-300 group-hover:w-full"></span>
  </span>
</NavLink>

</div>


      <div className="max-w-6xl mx-auto flex items-center justify-between">

        <div className="flex items-center gap-2">
          <NavLink to={role === "admin" ? "/admin/haberekle" : "/kullanici/haberler"} className="flex items-center gap-2">
        <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg shadow-md">
          DH
        </div>
        <span className="font-bold text-xl text-gray-800">Dernek Haberleri</span>
        </NavLink>
      </div>

      {/* Menü linkleri */}
      <div className="flex gap-4">
        {role === "admin" ? (
          <>
            <NavLink to="/admin/haberekle" className={linkClass}>
              Haber Ekle
            </NavLink>
            <NavLink to="/admin/duyuruekle" className={linkClass}>
              Duyuru Ekle
            </NavLink>
          </>
        ) : (
          <>
            <NavLink to="/kullanici/haberler" className={linkClass}>
              Haberler
            </NavLink>
            <NavLink to="/kullanici/duyurular" className={linkClass}>
              Duyurular
            </NavLink>
{newAnnouncement && (
  <div className="fixed top-5 right-5 z-50">
    <div className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-3 rounded-2xl shadow-lg text-sm font-semibold flex items-center gap-2 animate-bounce">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 text-white"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      Yeni duyurunuz var!

         <button
        onClick={() => setNewAnnouncement(false)}
        className="cursor-pointer ml-3 text-white hover:text-gray-200 transition"
      >
        ✕
      </button>
    </div>
  </div>
)}
          </>
        )}
      </div>
      </div>
    </nav>
  );
};

export default Menu;
