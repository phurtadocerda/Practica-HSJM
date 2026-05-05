import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { register, getAreas } from '../services/authService';
import { toast } from 'sonner';

const AdminRegisterModal = ({ isOpen, onClose }) => {
  const [regData, setRegData] = useState({
    nombres: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    fechaNacimiento: '',
    rut: '',
    rol: 'funcionario',
    areaTrabajo: '',
    password: ''
  });
  const [areas, setAreas] = useState([]);
  const [loadingAreas, setLoadingAreas] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const loadAreas = async () => {
      setLoadingAreas(true);
      try {
        const data = await getAreas();
        setAreas(data.areas || []);
      } catch (err) {
        console.error('Error cargando áreas:', err);
      } finally {
        setLoadingAreas(false);
      }
    };

    loadAreas();
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await register(regData);
      if (data.success) {
        toast.success('Usuario registrado exitosamente.');
        setRegData({
          nombres: '',
          apellidoPaterno: '',
          apellidoMaterno: '',
          fechaNacimiento: '',
          rut: '',
          rol: 'funcionario',
          areaTrabajo: '',
          password: ''
        });
        onClose();
      }
    } catch (err) {
      if (err.response && err.response.data) {
        toast.error('Error: ' + err.response.data.message);
      } else {
        toast.error('No se pudo conectar con el servidor. Revisa tu conexión.');
      }
    }
  };

  if (!isOpen) return null;

  const inputStyle = {
    width: '100%',
    height: '45px',
    padding: '0 15px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    boxSizing: 'border-box',
    fontSize: '14px',
    outline: 'none',
    backgroundColor: '#fff'
  };

  const campoContainerStyle = { marginBottom: '12px', textAlign: 'left' };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-300 border border-slate-100">
        
        <div className="bg-[#003876] p-6 text-white flex justify-between items-center">
          <h2 className="text-xl font-black">Registro Nuevo Usuario</h2>
          <button onClick={onClose} className="hover:bg-white/20 rounded-full p-1 transition-colors">
            <X size={24} />
          </button>
        </div>
        
        <div className="p-6">
          <form onSubmit={handleSubmit}>
            <div style={campoContainerStyle}>
              <input
                type="text"
                placeholder="RUT"
                value={regData.rut}
                onChange={(e) => setRegData({ ...regData, rut: e.target.value })}
                required
                style={inputStyle}
              />
            </div>

            <div style={campoContainerStyle}>
              <input
                type="text"
                placeholder="Nombres"
                value={regData.nombres}
                onChange={(e) => setRegData({ ...regData, nombres: e.target.value })}
                required
                style={inputStyle}
              />
            </div>

            <div style={campoContainerStyle}>
              <input
                type="text"
                placeholder="Apellido Paterno"
                value={regData.apellidoPaterno}
                onChange={(e) => setRegData({ ...regData, apellidoPaterno: e.target.value })}
                required
                style={inputStyle}
              />
            </div>

            <div style={campoContainerStyle}>
              <input
                type="text"
                placeholder="Apellido Materno"
                value={regData.apellidoMaterno}
                onChange={(e) => setRegData({ ...regData, apellidoMaterno: e.target.value })}
                style={inputStyle}
              />
            </div>

            <div style={campoContainerStyle}>
              <input
                type="date"
                placeholder="Fecha de Nacimiento"
                value={regData.fechaNacimiento}
                onChange={(e) => setRegData({ ...regData, fechaNacimiento: e.target.value })}
                style={inputStyle}
              />
            </div>

            <div style={campoContainerStyle}>
              <select
                value={regData.rol}
                onChange={(e) => setRegData({ ...regData, rol: e.target.value })}
                required
                style={inputStyle}
              >
                <option value="funcionario">Funcionario</option>
                <option value="administrador">Administrador</option>
              </select>
            </div>

            <div style={campoContainerStyle}>
              <select
                value={regData.areaTrabajo}
                onChange={(e) => setRegData({ ...regData, areaTrabajo: e.target.value })}
                required
                style={inputStyle}
              >
                <option value="">{loadingAreas ? 'Cargando áreas...' : 'Seleccione área...'}</option>
                {areas.map((area) => (
                  <option key={area.id} value={area.nombre}>
                    {area.nombre}
                  </option>
                ))}
              </select>
            </div>

            <div style={campoContainerStyle}>
              <input
                type="password"
                placeholder="Contraseña inicial"
                value={regData.password}
                onChange={(e) => setRegData({ ...regData, password: e.target.value })}
                required
                style={inputStyle}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#ffb81c] hover:bg-yellow-500 text-[#003876] font-black py-3 rounded-xl transition-all shadow-lg active:scale-95 text-lg"
            >
              REGISTRAR USUARIO
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminRegisterModal;