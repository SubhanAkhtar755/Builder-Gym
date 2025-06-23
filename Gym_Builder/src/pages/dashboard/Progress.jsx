import React from 'react';

const Progress = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-cyan-950 text-white py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-cyan-400 mb-8 text-center">Your Fitness Progress</h1>

        {/* Summary Section */}
        <section className="bg-[#0f172a] p-6 rounded-xl shadow-lg mb-12">
          <h2 className="text-2xl font-semibold text-cyan-300 mb-4">Weekly Summary</h2>
          <ul className="space-y-2 text-gray-300">
            <li>🏋️‍♂️ Total Workouts: <span className="text-white font-semibold">5</span></li>
            <li>🔥 Calories Burned: <span className="text-white font-semibold">3,200</span></li>
            <li>📈 Weight Change: <span className="text-white font-semibold">-0.5kg</span></li>
            <li>📆 Active Days: <span className="text-white font-semibold">5/7</span></li>
          </ul>
        </section>

        {/* Progress Chart Placeholder */}
        <section className="bg-[#0f172a] p-6 rounded-xl shadow-lg mb-12">
          <h2 className="text-2xl font-semibold text-cyan-300 mb-4">Progress Chart</h2>
          <div className="text-gray-400 italic text-sm">(Coming soon: Graphs showing your weight, strength, and endurance progress)</div>
        </section>

        {/* Achievements */}
        <section className="bg-[#0f172a] p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold text-cyan-300 mb-4">Achievements</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-300">
            <li>🏅 Completed your first 4-week plan</li>
            <li>💪 Increased bench press by 10kg</li>
            <li>⏱ Improved running stamina by 20%</li>
            <li>🎯 Maintained workout consistency for 3 weeks straight</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default Progress;
