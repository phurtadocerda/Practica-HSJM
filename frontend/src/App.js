import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Instagram, Facebook, Youtube, Twitter } from 'lucide-react';
import { login as loginUser, logout as logoutUser, getUser } from './services/authService';

// --- COMPONENTES PRINCIPALES ---
import Login from './components/login';
import Navbar from './components/Navbar';
import AppRoutes from './routes/AppRoutes';
import ScrollToTop from './components/ScrollToTop';
import './App.css';

// --- IMÁGENES GLOBALES (Solo conservamos las del Slider del Inicio) ---
import foto4 from './assets/foto4.jpeg'; 
import foto5 from './assets/foto5.jpeg'; 
import foto6 from './assets/foto6.jpeg'; 
import foto7 from './assets/foto7.jpeg'; 
import foto8 from './assets/foto8.jpeg'; 
import foto9 from './assets/foto9.jpeg'; 
import foto10 from './assets/foto10.jpeg'; 
import foto11 from './assets/foto11.jpeg'; 
import foto12 from './assets/foto12.jpeg'; 
import foto13 from './assets/foto13.jpeg';

function App() {
  const navigate = useNavigate(); // Hook de React Router para navegar

  // 1. Sacamos la información del usuario desde localStorage
  const user = getUser();

  // 2. Configuramos los estados de sesión
  const [isLoggedIn, setIsLoggedIn] = useState(!!user);
  const [userName, setUserName] = useState(user?.nombre || '');
  const [userRole, setUserRole] = useState(user?.rol || '');

  // Imágenes para pasarle al componente Inicio
  const images = [foto4, foto5, foto6, foto7, foto8, foto9, foto10, foto11, foto12, foto13];

  // --- LOGIN / LOGOUT ---

const handleLogin = async (rutUsuario, passwordUsuario) => {
  try {
    const data = await loginUser(rutUsuario, passwordUsuario);

    if (data.success) {
      const nombreCompleto = data.user.nombre;
      // Mantenemos tu lógica de la llave maestra
      const rolUsuario = (rutUsuario === '21245882-1') ? 'jefe' : data.user.rol;

      setUserName(nombreCompleto);
      setUserRole(rolUsuario);
      setIsLoggedIn(true);
      
      navigate('/inicio');
    }
  } catch (error) {
    const message = error.response?.data?.message || "Error de conexión";
    alert("Acceso denegado: " + message);
  }
};

  const handleLogout = () => {
    logoutUser();
    setIsLoggedIn(false);
    setUserName('');
    setUserRole('');
    navigate('/login'); // Redirigimos al login al cerrar sesión
  };

  // Si no está logueado, muestra la pantalla de Login
  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  // Si está logueado, muestra el Layout principal
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 overflow-x-hidden">
      <ScrollToTop />
      
      {/* NAVEGACIÓN */}
      <Navbar 
        onLogout={handleLogout} 
        userName={userName} 
      />

      {/* CONTENEDOR DE RUTAS DINÁMICAS */}
      <main className="max-w-7xl mx-auto px-4 pt-20 md:pt-40 pb-12 flex-grow w-full">
        {/* Aquí AppRoutes se encarga de inyectar la vista correcta según la URL */}
        <AppRoutes 
          userName={userName} 
          userRole={userRole} 
          images={images} 
        />
      </main>

      {/* FOOTER */}
      <footer className="bg-[#003e44] text-white pt-16 pb-8 mt-auto shadow-inner relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-8 flex flex-col items-center justify-center">
          <div className="flex flex-col items-center space-y-6">
            <h5 className="font-black border-b-4 border-[#ffb81c] pb-2 mb-2 text-lg uppercase text-[#ffb81c] text-center w-fit">Contacto</h5>
            <div className="space-y-4 text-sm font-black text-center">
              <p className="flex items-center justify-center gap-3 uppercase tracking-wider"><MapPin size={20} className="text-[#ffb81c]" /> O'HIGGINS 551, MELIPILLA</p>
              <p className="flex items-center justify-center gap-3 uppercase tracking-wider">📞 CENTRAL: (2) 2574 5555</p>
            </div>
            <div className="flex justify-center gap-4 pt-2">
              <SocialIcon icon={<Instagram size={20} />} link="https://www.instagram.com/hospitaldemelipilla/" />
              <SocialIcon icon={<Facebook size={20} />} link="https://www.facebook.com/hospitaldemelipilla/" />
              <SocialIcon icon={<Youtube size={20} />} link="https://www.youtube.com/@hosp_melipilla" />
              <SocialIcon icon={<Twitter size={20} />} link="https://x.com/hosp_melipilla" />
            </div>
          </div>
        </div>
        <div className="absolute bottom-4 right-8 flex items-center gap-2 text-white/40 text-[10px] font-bold uppercase tracking-widest pointer-events-none">
          <span>Hecho con</span>
          <span className="text-red-500 animate-pulse text-sm">❤️</span>
          <span>por departamento TI</span>
        </div>
      </footer>
    </div>
  );
}

// Componente auxiliar que solo se usa en el Footer de este archivo
function SocialIcon({ icon, link }) {
  return (
    <a href={link} target="_blank" rel="noreferrer" className="bg-white/10 p-3 rounded-full hover:bg-[#ffb81c] hover:text-[#003e44] transition-all duration-300 shadow-lg active:scale-95">
      {icon}
    </a>
  );
}



export default App;