import React from 'react';

const weeklySheet = [
  { day: 'Monday', workout: 'Chest + Triceps', diet: 'Followed', status: '✅' },
  { day: 'Tuesday', workout: 'Back + Biceps', diet: 'Followed', status: '✅' },
  { day: 'Wednesday', workout: 'Legs + Core', diet: 'Skipped', status: '⚠️' },
  { day: 'Thursday', workout: 'Shoulders', diet: 'Followed', status: '✅' },
  { day: 'Friday', workout: 'Cardio + Abs', diet: 'Followed', status: '✅' },
  { day: 'Saturday', workout: 'Rest Day', diet: 'Cheat Meal', status: '🛌' },
  { day: 'Sunday', workout: 'Rest Day', diet: 'Clean', status: '🛌' },
];

const Sheet = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b mt-5 from-black via-gray-900 to-cyan-950 text-white px-6 py-12">
      <h1 className="text-4xl font-bold text-center text-cyan-400 mb-10">Weekly Cheat Sheet</h1>

      <div className="overflow-x-auto max-w-4xl mx-auto">
        <table className="w-full text-left border border-cyan-700 rounded-lg overflow-hidden">
          <thead className="bg-cyan-800 text-white">
            <tr>
              <th className="py-3 px-4">Day</th>
              <th className="py-3 px-4">Workout</th>
              <th className="py-3 px-4">Diet</th>
              <th className="py-3 px-4">Status</th>
            </tr>
          </thead>
          <tbody className="bg-cyan-950/50 text-gray-200">
            {weeklySheet.map((entry, idx) => (
              <tr key={idx} className="border-b border-cyan-800 hover:bg-cyan-900/50 transition">
                <td className="py-3 px-4">{entry.day}</td>
                <td className="py-3 px-4">{entry.workout}</td>
                <td className="py-3 px-4">{entry.diet}</td>
                <td className="py-3 px-4">{entry.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-center text-sm text-gray-400 mt-8">
        Track your weekly routine and diet consistency. Rest days and cheat meals are just as important!
      </p>
    </div>
  );
};

export default Sheet;
