import React, { useState } from 'react';
import logoHospital from '../assets/logo.png'; 
import { Eye, EyeOff } from 'lucide-react';
import { register } from '../services/authService';

const Login = ({ onLogin }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [rut, setRut] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // ESTADOS PARA EL REGISTRO
  const [regData, setRegData] = useState({
    nombres: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    rut: '',
    fechaNacimiento: '',
    areaTrabajo: '',
    password: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!rut || !password) {
      setError('⚠️ Por favor ingrese RUT y Contraseña');
      return;
    }
    onLogin(rut, password);
  };

  const handleRegister = async (e) => {
  e.preventDefault();
  try {
    const data = await register(regData);
    
    if (data.success) {
      alert('✅ Registro exitoso. Ahora puedes iniciar sesión.');
      setIsRegistering(false);
    }
  } catch (err) {

    if (err.response && err.response.data) {
      alert('❌ Error: ' + err.response.data.message);
    } 
    else {
      alert('❌ No se pudo conectar con el servidor. Revisa tu conexión.');
    }
  }
};

  // ESTILOS CORREGIDOS PARA QUE AMBOS SEAN IGUALES (Hermanos gemelos)
  const inputStyleCompacto = { 
    width: '100%', 
    height: '45px', // Altura fija obligatoria
    padding: '0 15px', 
    borderRadius: '8px', 
    border: '1px solid #ccc', 
    boxSizing: 'border-box', 
    fontSize: '14px',
    outline: 'none',
    backgroundColor: '#fff'
  };

  const labelStyleCompacto = { fontSize: '11px', color: '#666', marginLeft: '3px', fontWeight: 'bold', display: 'block', marginBottom: '3px' };
  const campoContainerStyle = { marginBottom: '12px', textAlign: 'left', position: 'relative' };

  // Estilo para el botón del ojito centrado perfectamente
  const eyeButtonStyle = {
    position: 'absolute',
    right: '12px',
    top: '0',
    bottom: '0',
    margin: 'auto', // Centrado vertical perfecto
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#666',
    display: 'flex',
    alignItems: 'center',
    padding: '0',
    zIndex: 10
  };

  return (
    <div className="login-screen">
      <div className="login-box">
        <img src={logoHospital} alt="Logo Hospital Melipilla" className="login-logo" style={{ maxHeight: '100px', width: 'auto', marginBottom: '15px' }} />
        
        {!isRegistering ? (
          <div className="form-container">
            <h1 style={{ marginBottom: '5px' }}>Acceso Intranet</h1>
            <p className="subtitle" style={{ marginBottom: '20px' }}>Hospital San José de Melipilla</p>
            <form onSubmit={handleSubmit}>
              
              {/* RUT */}
              <div style={campoContainerStyle}>
                <input 
                  type="text" 
                  placeholder="RUT" 
                  value={rut} 
                  onChange={(e) => setRut(e.target.value)} 
                  required 
                  style={inputStyleCompacto} 
                />
              </div>
              
              {/* PASSWORD CON OJO (LOGIN) */}
              <div style={campoContainerStyle}>
                <input 
                  type={showPassword ? "text" : "password"} 
                  placeholder="Contraseña" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  required 
                  style={{ ...inputStyleCompacto, paddingRight: '40px' }} 
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} style={eyeButtonStyle}>
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              {error && <p style={{ color: '#ff4d4d', fontSize: '13px', fontWeight: 'bold', marginBottom: '10px' }}>{error}</p>}
              <button type="submit" className="btn-ingresar" style={{ height: '45px', marginTop: '10px' }}>INGRESAR</button>
            </form>
            <p className="switch-text" style={{ marginTop: '15px' }}>
              ¿No tienes cuenta? <span onClick={() => {setIsRegistering(true); setShowPassword(false);}} style={{ cursor: 'pointer', fontWeight: 'bold' }}>Regístrate aquí</span>
            </p>
          </div>
        ) : (
          <div className="form-container">
            <p style={{ color: '#666', marginBottom: '2px', fontSize: '15px' }}>Registro Funcionario</p>
            <h2 style={{ color: '#00a19a', fontWeight: 'bold', fontSize: '15px', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: 'tight' }}>
              Solicitud de Acceso 
            </h2>
            
            <form onSubmit={handleRegister}>
              <div style={campoContainerStyle}>
                <input type="text" placeholder="Nombres" required style={inputStyleCompacto} 
                  onChange={(e) => setRegData({...regData, nombres: e.target.value})} />
              </div>

              <div style={campoContainerStyle}>
                <input type="text" placeholder="Apellido Paterno" required style={inputStyleCompacto} 
                  onChange={(e) => setRegData({...regData, apellidoPaterno: e.target.value})} />
              </div>

              <div style={campoContainerStyle}>
                <input type="text" placeholder="Apellido Materno" required style={inputStyleCompacto} 
                  onChange={(e) => setRegData({...regData, apellidoMaterno: e.target.value})} />
              </div>

              <div style={campoContainerStyle}>
                <input type="text" placeholder="RUT (ej: 12345678-9)" required style={inputStyleCompacto} 
                  onChange={(e) => setRegData({...regData, rut: e.target.value})} />
              </div>
              
              <div style={campoContainerStyle}>
                <label style={labelStyleCompacto}>Fecha de Nacimiento </label>
                <input type="date" required style={inputStyleCompacto} 
                  onChange={(e) => setRegData({...regData, fechaNacimiento: e.target.value})} />
              </div>

              <div style={campoContainerStyle}>
                <label style={labelStyleCompacto}>Área de Trabajo / Unidad</label>
                <select required style={inputStyleCompacto} onChange={(e) => setRegData({...regData, areaTrabajo: e.target.value})}>
                  <option value="">Seleccione su área...</option>
                  <option value="Urgencias">Urgencias</option>
                  <option value="Informatica">Transformacion Digital</option>
                  <option value="Pabellon">Pabellón</option>
                  <option value="Administracion">Administración</option>
                  <option value="Imagenologia">Imagenología</option>
                </select>
              </div>

              {/* PASSWORD CON OJO (REGISTRO) */}
              <div style={campoContainerStyle}>
                <input 
                  type={showPassword ? "text" : "password"} 
                  placeholder="Crear Contraseña" 
                  required 
                  style={{ ...inputStyleCompacto, paddingRight: '40px' }} 
                  onChange={(e) => setRegData({...regData, password: e.target.value})} 
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} style={eyeButtonStyle}>
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              
              <button type="submit" className="btn-registro" style={{ backgroundColor: '#00a19a', color: 'white', width: '100%', height: '45px', borderRadius: '8px', border: 'none', fontWeight: 'bold', marginTop: '10px', cursor: 'pointer', fontSize: '14px' }}>
                REGISTRARSE
              </button>
            </form>

            <p className="switch-text" style={{ marginTop: '15px', fontSize: '12px' }}>
              ¿Ya tienes cuenta? <span onClick={() => {setIsRegistering(false); setShowPassword(false);}} style={{ fontWeight: 'bold', textDecoration: 'underline', color: '#003876', cursor: 'pointer' }}>Volver al inicio</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;