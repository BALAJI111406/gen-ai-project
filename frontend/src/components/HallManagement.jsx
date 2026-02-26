import { useState, useEffect } from 'react';
import { hallAPI } from '../services/api';

export default function HallManagement() {
  const [halls, setHalls] = useState([]);
  const [form, setForm] = useState({ hallName: '', capacity: '', rows: '', columns: '' });

  useEffect(() => {
    loadHalls();
  }, []);

  const loadHalls = async () => {
    try {
      const { data } = await hallAPI.getAll();
      setHalls(data);
    } catch (err) {
      console.error('Failed to load halls', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await hallAPI.create(form);
      setForm({ hallName: '', capacity: '', rows: '', columns: '' });
      loadHalls();
    } catch (err) {
      alert('Failed to create hall');
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Delete this hall?')) {
      await hallAPI.delete(id);
      loadHalls();
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Hall Management</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4">Add New Hall</h3>
          <form onSubmit={handleSubmit}>
            <input
              placeholder="Hall Name"
              value={form.hallName}
              onChange={(e) => setForm({ ...form, hallName: e.target.value })}
              className="w-full p-2 mb-3 border rounded"
              required
            />
            <input
              type="number"
              placeholder="Capacity"
              value={form.capacity}
              onChange={(e) => setForm({ ...form, capacity: e.target.value })}
              className="w-full p-2 mb-3 border rounded"
              required
            />
            <input
              type="number"
              placeholder="Rows"
              value={form.rows}
              onChange={(e) => setForm({ ...form, rows: e.target.value })}
              className="w-full p-2 mb-3 border rounded"
              required
            />
            <input
              type="number"
              placeholder="Columns"
              value={form.columns}
              onChange={(e) => setForm({ ...form, columns: e.target.value })}
              className="w-full p-2 mb-3 border rounded"
              required
            />
            <button className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">
              Add Hall
            </button>
          </form>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4">Existing Halls</h3>
          <div className="space-y-3">
            {halls.map((hall) => (
              <div key={hall._id} className="flex justify-between items-center p-3 bg-gray-100 rounded">
                <div>
                  <p className="font-semibold">{hall.hallName}</p>
                  <p className="text-sm text-gray-600">
                    Capacity: {hall.capacity} | {hall.rows}x{hall.columns}
                  </p>
                </div>
                <button onClick={() => handleDelete(hall._id)} className="text-red-600 hover:text-red-800">
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
