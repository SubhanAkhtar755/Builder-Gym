// Admin.jsx — Admin panel to mark attendance for all users
import React, { useEffect, useState } from 'react';
import { collection, getDocs, doc, setDoc, db } from '../../../config/Firebase';

const getTodayDate = () => new Date().toISOString().split('T')[0];

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [attendance, setAttendance] = useState({});
  const today = getTodayDate();

  useEffect(() => {
    const fetchUsers = async () => {
      const querySnapshot = await getDocs(collection(db, 'users'));
      const usersList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setUsers(usersList);
    };

    const fetchAllAttendance = async () => {
      const userAttendance = {};
      const querySnapshot = await getDocs(collection(db, 'attendance'));
      querySnapshot.forEach(doc => {
        userAttendance[doc.id] = doc.data().records || {};
      });
      setAttendance(userAttendance);
    };

    fetchUsers();
    fetchAllAttendance();
  }, []);

  const markAttendance = async (userId, status) => {
    const updatedUserAttendance = {
      ...attendance[userId],
      [today]: status,
    };

    setAttendance(prev => ({ ...prev, [userId]: updatedUserAttendance }));
    await setDoc(doc(db, 'attendance', userId), { records: updatedUserAttendance }, { merge: true });
  };

  return (
    <div className="min-h-screen mt-10 bg-gradient-to-b from-black via-gray-900 to-cyan-950 text-white p-4 sm:p-6">
      <h1 className="text-2xl sm:text-3xl text-center text-cyan-400 font-bold mb-6">
        Admin Panel - Mark Daily Attendance
      </h1>

      <div className="grid gap-4 max-w-5xl mx-auto">
        {users.map(user => (
          <div
            key={user.id}
            className="bg-cyan-950/60 p-4 rounded-xl shadow-md flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4"
          >
            <div>
              <p className="text-base sm:text-lg font-semibold break-words">
                {user.name || 'No Name'} ({user.email || user.id})
              </p>
              <p className="text-sm text-cyan-300">
                Today's Attendance: <strong>{attendance[user.id]?.[today] || 'Not Marked'}</strong>
              </p>
            </div>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              <button
                onClick={() => markAttendance(user.id, 'Present')}
                className="bg-green-500 hover:bg-green-600 px-3 py-1 rounded text-sm"
              >
                ✅ Present
              </button>
              <button
                onClick={() => markAttendance(user.id, 'Absent')}
                className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-sm"
              >
                ❌ Absent
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Admin;
