import { NavLink } from "react-router";

interface MenuProps {
  role: "admin" | "user";
}

const Menu: React.FC<MenuProps> = ({ role }) => {
  // Tailwind ile aktif linkleri belirlemek için className fonksiyonu
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `px-4 py-2 rounded-lg font-medium transition-colors duration-200
     ${isActive ? "bg-blue-600 text-white shadow-lg" : "text-gray-700 hover:bg-blue-100 hover:text-blue-800"}`;

  return (

    <nav className="p-4 w-full bg-white shadow-md border-b border-gray-200">
  <NavLink
  to={role === "admin" ? "/kullanici" : "/admin"}
  className="max-w-6xl mx-auto flex justify-end pb-3 text-gray-700 font-medium relative group"
>
  <span className="relative">
    {role === "admin" ? "Kullanıcı Görünümüne Geç" : "Admin Görünümüne Geç"}
    <span className="absolute left-0 -bottom-0.5 w-0 h-[2px] bg-blue-300 transition-all duration-300 group-hover:w-full"></span>
  </span>
</NavLink>


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
          </>
        )}
      </div>
      </div>
    </nav>
  );
};

export default Menu;
