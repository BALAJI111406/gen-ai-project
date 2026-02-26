import { useState } from 'react';
import { studentAPI } from '../services/api';

export default function StudentUpload() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return setMessage('Please select a file');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const { data } = await studentAPI.upload(formData);
      setMessage(`Success: ${data.count} students uploaded`);
      setFile(null);
    } catch (err) {
      setMessage('Upload failed: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Upload Students</h2>
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl">
        <form onSubmit={handleUpload}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">CSV File</label>
            <input
              type="file"
              accept=".csv"
              onChange={(e) => setFile(e.target.files[0])}
              className="w-full p-2 border rounded"
            />
          </div>
          <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
            Upload
          </button>
        </form>
        {message && <p className="mt-4 text-sm">{message}</p>}
        <div className="mt-6 p-4 bg-gray-100 rounded">
          <h3 className="font-semibold mb-2">CSV Format:</h3>
          <code className="text-sm">registerNumber,name,department,subject</code>
          <p className="text-sm mt-2">Example: 2021001,John Doe,CSE,Mathematics</p>
        </div>
      </div>
    </div>
  );
}
