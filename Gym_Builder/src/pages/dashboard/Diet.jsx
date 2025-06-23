import React from 'react';

const Diet = () => {
  const diets = [
    {
      type: 'Muscle Gain Plan',
      description: 'Designed to help you build lean muscle mass while minimizing fat gain.',
      meals: [
        {
          time: '7:00 AM',
          item: 'Oats with protein powder and banana',
        },
        {
          time: '10:00 AM',
          item: 'Boiled eggs and a handful of almonds',
        },
        {
          time: '1:00 PM',
          item: 'Grilled chicken breast with brown rice and veggies',
        },
        {
          time: '4:00 PM',
          item: 'Protein shake and a peanut butter sandwich',
        },
        {
          time: '7:00 PM',
          item: 'Fish with quinoa and salad',
        },
        {
          time: '9:30 PM',
          item: 'Greek yogurt or cottage cheese',
        },
      ],
    },
    {
      type: 'Fat Loss Plan',
      description: 'Structured to reduce body fat while maintaining muscle mass.',
      meals: [
        {
          time: '7:30 AM',
          item: 'Green smoothie with spinach, berries, and protein',
        },
        {
          time: '10:00 AM',
          item: 'Boiled eggs and green tea',
        },
        {
          time: '1:00 PM',
          item: 'Grilled chicken with steamed vegetables',
        },
        {
          time: '4:00 PM',
          item: 'Handful of nuts and protein bar',
        },
        {
          time: '7:00 PM',
          item: 'Salmon with asparagus and a side salad',
        },
        {
          time: '9:00 PM',
          item: 'Protein shake with water',
        },
      ],
    },
    {
      type: 'Maintenance Plan',
      description: 'Helps maintain your current weight with a balanced intake.',
      meals: [
        {
          time: '8:00 AM',
          item: 'Eggs, toast, and fruit',
        },
        {
          time: '11:00 AM',
          item: 'Yogurt with granola',
        },
        {
          time: '2:00 PM',
          item: 'Chicken sandwich and a piece of fruit',
        },
        {
          time: '5:00 PM',
          item: 'Mixed nuts and a protein bar',
        },
        {
          time: '8:00 PM',
          item: 'Rice, vegetables, and paneer/tofu',
        },
      ],
    },
  ];

  return (
    <div className="bg-gradient-to-b from-black via-gray-900 to-cyan-950 text-white py-16 px-6">
      <h1 className="text-4xl font-bold text-center text-cyan-400 mb-12">Diet Plans for Every Goal</h1>
      {diets.map((diet, index) => (
        <div key={index} className="mb-12 max-w-4xl mx-auto bg-[#0f172a] border border-cyan-800 rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-semibold text-cyan-300 mb-2">{diet.type}</h2>
          <p className="text-gray-300 mb-4">{diet.description}</p>
          <ul className="space-y-2">
            {diet.meals.map((meal, idx) => (
              <li key={idx} className="flex justify-between bg-cyan-900/20 px-4 py-2 rounded-md border border-cyan-700">
                <span className="text-gray-200">{meal.time}</span>
                <span className="text-gray-400">{meal.item}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Diet;
