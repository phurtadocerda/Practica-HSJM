import React, { useState } from 'react';
import logoHospital from '../assets/logo.png'; 
import { Eye, EyeOff } from 'lucide-react';

const Login = ({ onLogin }) => {
  const [rut, setRut] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!rut || !password) {
      setError('⚠️ Por favor ingrese RUT y Contraseña');
      return;
    }
    onLogin(rut, password);
  };


  const inputStyleCompacto = { 
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

  const campoContainerStyle = { marginBottom: '12px', textAlign: 'left', position: 'relative' };


  const eyeButtonStyle = {
    position: 'absolute',
    right: '12px',
    top: '0',
    bottom: '0',
    margin: 'auto', 
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
        </div>
      </div>
    </div>
  );
};

export default Login;