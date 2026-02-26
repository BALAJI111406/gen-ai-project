import { useState, useEffect } from 'react';
import { seatingAPI } from '../services/api';

export default function SeatingChart() {
  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);

  useEffect(() => {
    loadPlans();
  }, []);

  const loadPlans = async () => {
    try {
      const { data } = await seatingAPI.getAll();
      setPlans(data);
    } catch (err) {
      console.error('Failed to load plans', err);
    }
  };

  const handleDownloadPDF = async (id) => {
    try {
      const { data } = await seatingAPI.downloadPDF(id);
      const url = window.URL.createObjectURL(new Blob([data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `seating-plan-${id}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      alert('PDF download failed');
    }
  };

  const viewPlan = async (id) => {
    try {
      const { data } = await seatingAPI.getById(id);
      setSelectedPlan(data);
    } catch (err) {
      console.error('Failed to load plan details', err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Seating Plans</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4">All Plans</h3>
          <div className="space-y-3">
            {plans.map((plan) => (
              <div key={plan._id} className="p-3 bg-gray-100 rounded">
                <p className="font-semibold">{plan.subject}</p>
                <p className="text-sm text-gray-600">
                  {new Date(plan.examDate).toLocaleDateString()}
                </p>
                <p className="text-sm">Students: {plan.totalStudents}</p>
                <div className="mt-2 space-x-2">
                  <button onClick={() => viewPlan(plan._id)} className="text-blue-600 text-sm hover:underline">
                    View
                  </button>
                  <button onClick={() => handleDownloadPDF(plan._id)} className="text-green-600 text-sm hover:underline">
                    PDF
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4">Plan Details</h3>
          {selectedPlan ? (
            <div className="space-y-4">
              {selectedPlan.seatingArrangement.map((hall, idx) => (
                <div key={idx} className="border p-4 rounded">
                  <h4 className="font-bold text-lg mb-2">{hall.hallName}</h4>
                  <div className="grid grid-cols-4 gap-2">
                    {hall.seats.map((seat, i) => (
                      <div key={i} className="p-2 bg-blue-50 rounded text-xs">
                        <p className="font-semibold">{seat.registerNumber}</p>
                        <p className="text-gray-600">{seat.department}</p>
                        <p className="text-gray-500">R{seat.row}C{seat.column}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">Select a plan to view details</p>
          )}
        </div>
      </div>
    </div>
  );
}
