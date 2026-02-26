import { useState } from 'react';
import { seatingAPI } from '../services/api';

export default function SeatingGeneration({ onNavigate }) {
  const [form, setForm] = useState({ examDate: '', subject: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleGenerate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const { data } = await seatingAPI.generate(form);
      setMessage('Seating plan generated successfully!');
      setTimeout(() => onNavigate('view'), 2000);
    } catch (err) {
      setMessage('Generation failed: ' + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Generate Seating Plan</h2>
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl">
        <form onSubmit={handleGenerate}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Exam Date</label>
            <input
              type="date"
              value={form.examDate}
              onChange={(e) => setForm({ ...form, examDate: e.target.value })}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Subject</label>
            <input
              placeholder="e.g., Mathematics"
              value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <button
            disabled={loading}
            className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700 disabled:bg-gray-400"
          >
            {loading ? 'Generating...' : 'Generate with AI'}
          </button>
        </form>
        {message && (
          <div className={`mt-4 p-3 rounded ${message.includes('failed') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
            {message}
          </div>
        )}
        <div className="mt-6 p-4 bg-blue-50 rounded">
          <h3 className="font-semibold mb-2">AI Algorithm Features:</h3>
          <ul className="text-sm space-y-1">
            <li>✓ Avoids same department adjacency</li>
            <li>✓ Prevents consecutive roll numbers</li>
            <li>✓ Optimizes space utilization</li>
            <li>✓ Auto-retry with relaxed constraints</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
