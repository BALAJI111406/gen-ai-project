import { useState, useEffect } from 'react';
import { seatingAPI } from '../services/api';

import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ totalStudents: 0, totalHalls: 0, totalPlans: 0 });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const { data } = await seatingAPI.getStats();
      setStats(data);
    } catch (err) {
      console.error('Failed to load stats', err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-blue-500 text-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold">Total Students</h3>
          <p className="text-4xl font-bold mt-2">{stats.totalStudents}</p>
        </div>
        <div className="bg-green-500 text-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold">Total Halls</h3>
          <p className="text-4xl font-bold mt-2">{stats.totalHalls}</p>
        </div>
        <div className="bg-purple-500 text-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold">Seating Plans</h3>
          <p className="text-4xl font-bold mt-2">{stats.totalPlans}</p>
        </div>
      </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button onClick={() => navigate('/students')} className="bg-blue-600 text-white p-4 rounded-lg hover:bg-blue-700">
            Upload Students
          </button>
          <button onClick={() => navigate('/halls')} className="bg-green-600 text-white p-4 rounded-lg hover:bg-green-700">
            Manage Halls
          </button>
          <button onClick={() => navigate('/generate')} className="bg-purple-600 text-white p-4 rounded-lg hover:bg-purple-700">
            Generate Seating
          </button>
          <button onClick={() => navigate('/view')} className="bg-orange-600 text-white p-4 rounded-lg hover:bg-orange-700">
            View Plans
          </button>
        </div>
    </div>
  );
}
