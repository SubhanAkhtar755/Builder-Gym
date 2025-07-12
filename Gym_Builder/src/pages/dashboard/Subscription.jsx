// Updated AttendanceChart.jsx to show monthly tick/cross sheet with month navigation and today's summary on top
import React, { useEffect, useState, useContext } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../config/Firebase';
import { UserContext } from '../../context/UserContext';

const AttendanceChart = () => {
  const { user } = useContext(UserContext);
  const [attendanceData, setAttendanceData] = useState({});
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const formatMonth = (date) => date.toISOString().slice(0, 7);
  const getTodayDate = () => new Date().toISOString().split('T')[0];

  const goToPreviousMonth = () => {
    const prev = new Date(currentMonth);
    prev.setMonth(prev.getMonth() - 1);
    setCurrentMonth(prev);
  };

  const goToNextMonth = () => {
    const next = new Date(currentMonth);
    next.setMonth(next.getMonth() + 1);
    setCurrentMonth(next);
  };

  useEffect(() => {
    const fetchAttendance = async () => {
      if (!user) return;
      const docRef = doc(db, 'attendance', user.uid);
      const snap = await getDoc(docRef);
      if (snap.exists()) {
        const data = snap.data().records || {};
        setAttendanceData(data);
      }
    };

    fetchAttendance();
  }, [user]);

  const monthPrefix = formatMonth(currentMonth);
  const today = getTodayDate();
  const todayStatus = attendanceData[today] || 'Not Marked';

  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const dailyData = Array.from({ length: daysInMonth }, (_, i) => {
    const day = (i + 1).toString().padStart(2, '0');
    const date = `${monthPrefix}-${day}`;
    return { date, status: attendanceData[date] || 'Not Marked' };
  });

  return (
    <div className="min-h-screen mt-10 bg-gradient-to-b from-black via-gray-900 to-cyan-950 text-white p-6">
      <h1 className="text-3xl font-bold text-center text-cyan-400 mb-6">Attendance Sheet (Tick / Cross)</h1>

      <div className="max-w-md mx-auto bg-cyan-950/70 p-4 mb-6 rounded-xl text-center shadow-lg">
        <h2 className="text-xl font-semibold mb-2">Today's Attendance</h2>
        <p className="text-lg">Date: <span className="text-cyan-300 font-medium">{today}</span></p>
        <p className="text-lg">Status: <span className="font-bold text-cyan-400">
          {todayStatus === 'Present' ? '✅ Present' : todayStatus === 'Absent' ? '❌ Absent' : '➖ Not Marked'}</span>
        </p>
      </div>

      <div className="flex justify-center gap-6 mb-4">
        <button onClick={goToPreviousMonth} className="bg-cyan-600 hover:bg-cyan-700 px-4 py-2 rounded">⬅ Previous</button>
        <span className="text-xl font-semibold">{monthPrefix}</span>
        <button onClick={goToNextMonth} className="bg-cyan-600 hover:bg-cyan-700 px-4 py-2 rounded">Next ➡</button>
      </div>

      <div className="overflow-x-auto max-w-4xl mx-auto bg-cyan-950/60 rounded-lg p-4 shadow-lg">
        <table className="min-w-full table-auto text-center border-collapse">
          <thead>
            <tr className="bg-cyan-800 text-cyan-200">
              <th className="px-4 py-2 border">Date</th>
              <th className="px-4 py-2 border">Status</th>
            </tr>
          </thead>
          <tbody>
            {dailyData.map(({ date, status }) => (
              <tr key={date} className="border-t border-cyan-700">
                <td className="px-4 py-2 border">{date}</td>
                <td className="px-4 py-2 border">
                  {status === 'Present' ? '✅' : status === 'Absent' ? '❌' : '➖'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttendanceChart;