import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, Link, useNavigate } from 'react-router-dom'
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import StudentUpload from './components/StudentUpload';
import HallManagement from './components/HallManagement';
import SeatingGeneration from './components/SeatingGeneration';
import SeatingChart from './components/SeatingChart';
import './index.css';

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Token exists; restore user immediately
      // Backend will reject on protected routes if token is invalid
      setUser({ username: 'Admin', email: 'admin@example.com', id: 'restored' });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  const Protected = ({ children }) => {
    if (!user) return <Navigate to="/login" replace />;
    return children;
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">AI Exam Seating System</h1>
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <span className="text-gray-700">Welcome, {user.username}</span>
                <Link to="/dashboard" className="text-blue-600 hover:underline">Dashboard</Link>
                <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
                <Link to="/register" className="text-blue-600 hover:underline">Register</Link>
              </>
            )}
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto">
        <Routes>
          <Route path="/login" element={<Login onLogin={(u) => { setUser(u); navigate('/dashboard'); }} />} />
          <Route path="/register" element={<Register onRegister={(u) => { setUser(u); navigate('/dashboard'); }} />} />
          <Route path="/dashboard" element={<Protected><Dashboard /></Protected>} />
          <Route path="/students" element={<Protected><StudentUpload /></Protected>} />
          <Route path="/halls" element={<Protected><HallManagement /></Protected>} />
          <Route path="/generate" element={<Protected><SeatingGeneration /></Protected>} />
          <Route path="/view" element={<Protected><SeatingChart /></Protected>} />
          <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
