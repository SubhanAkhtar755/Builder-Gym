import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const mealPlans = {
  'Muscle Gain': {
    price: 800,
    meals: [
      { name: 'Breakfast: Oats & Eggs', calories: 450, protein: 30, carbs: 50, fats: 15 },
      { name: 'Lunch: Chicken & Rice', calories: 600, protein: 40, carbs: 60, fats: 20 },
      { name: 'Dinner: Salmon & Quinoa', calories: 550, protein: 35, carbs: 40, fats: 25 },
      { name: 'Snacks: Nuts & Protein Shake', calories: 400, protein: 25, carbs: 20, fats: 30 }
    ]
  },
  'Fat Loss': {
    price: 600,
    meals: [
      { name: 'Breakfast: Greek Yogurt & Berries', calories: 300, protein: 20, carbs: 25, fats: 10 },
      { name: 'Lunch: Grilled Chicken Salad', calories: 400, protein: 35, carbs: 20, fats: 15 },
      { name: 'Dinner: Tofu Stir Fry', calories: 350, protein: 25, carbs: 30, fats: 12 },
      { name: 'Snacks: Boiled Eggs & Veggies', calories: 250, protein: 20, carbs: 10, fats: 10 }
    ]
  },
  'Maintenance': {
    price: 700,
    meals: [
      { name: 'Breakfast: Smoothie Bowl', calories: 400, protein: 20, carbs: 45, fats: 12 },
      { name: 'Lunch: Turkey Wrap', calories: 500, protein: 30, carbs: 50, fats: 18 },
      { name: 'Dinner: Grilled Fish & Veggies', calories: 450, protein: 30, carbs: 35, fats: 15 },
      { name: 'Snacks: Cottage Cheese & Fruit', calories: 300, protein: 20, carbs: 25, fats: 10 }
    ]
  }
};

const calculateCalories = (weight, age, goal) => {
  const base = 10 * weight + 6.25 * 170 - 5 * age + 5;
  switch (goal) {
    case 'Muscle Gain': return Math.round(base * 1.2 + 500);
    case 'Fat Loss': return Math.round(base * 1.2 - 400);
    default: return Math.round(base * 1.2);
  }
};

const Diet = () => {
  const [weight, setWeight] = useState(70);
  const [age, setAge] = useState(25);
  const [goal, setGoal] = useState('Maintenance');
  const [requiredCalories, setRequiredCalories] = useState(0);
  const [selectedMeals, setSelectedMeals] = useState([]);
  const [planPrice, setPlanPrice] = useState(0);

  useEffect(() => {
    const cal = calculateCalories(weight, age, goal);
    setRequiredCalories(cal);
    setSelectedMeals(mealPlans[goal].meals);
    setPlanPrice(mealPlans[goal].price);
  }, [weight, age, goal]);

  const totalCalories = selectedMeals.reduce((sum, meal) => sum + meal.calories, 0);
  const totalProtein = selectedMeals.reduce((sum, meal) => sum + meal.protein, 0);
  const totalCarbs = selectedMeals.reduce((sum, meal) => sum + meal.carbs, 0);
  const totalFats = selectedMeals.reduce((sum, meal) => sum + meal.fats, 0);

  return (
    <div className="bg-gradient-to-b mt-10 from-black via-gray-900 to-cyan-950 min-h-screen p-6 text-white">
      <motion.h1 
        className="text-4xl font-bold text-center text-cyan-400 mb-10"
        initial={{ opacity: 0, y: -30 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6 }}
      >
        Custom Diet Planner
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        <motion.div 
          className="bg-[#0f172a] p-6 rounded-2xl shadow-xl border border-cyan-800"
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-xl font-semibold text-cyan-300 mb-4">Your Info</h2>
          <label className="block mb-2">Weight (kg)</label>
          <input type="number" className="w-full p-2 rounded bg-gray-900 border border-cyan-700 text-white" value={weight} onChange={e => setWeight(+e.target.value)} />
          <label className="block mt-4 mb-2">Age</label>
          <input type="number" className="w-full p-2 rounded bg-gray-900 border border-cyan-700 text-white" value={age} onChange={e => setAge(+e.target.value)} />
          <label className="block mt-4 mb-2">Goal</label>
          <select className="w-full p-2 rounded bg-gray-900 border border-cyan-700 text-white" value={goal} onChange={e => setGoal(e.target.value)}>
            <option value="Muscle Gain">Muscle Gain</option>
            <option value="Fat Loss">Fat Loss</option>
            <option value="Maintenance">Maintenance</option>
          </select>
          <p className="mt-4 text-green-400 font-semibold">Estimated Daily Calories: {requiredCalories} kcal</p>
          <p className="text-yellow-300 font-medium mt-2">Avg. Daily Plan Price: Rs. {planPrice}</p>
        </motion.div>

        <motion.div 
          className="md:col-span-2 bg-[#0f172a] p-6 rounded-2xl shadow-xl border border-cyan-800"
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-xl font-semibold text-cyan-300 mb-4">Meal Plan ({goal})</h2>
          {selectedMeals.map((meal, idx) => (
            <div key={idx} className="border border-cyan-700 bg-cyan-900/30 p-4 rounded-xl mb-3">
              <h3 className="font-semibold text-lg text-cyan-200">{meal.name}</h3>
              <p className="text-sm text-gray-300">Calories: {meal.calories} | Protein: {meal.protein}g | Carbs: {meal.carbs}g | Fats: {meal.fats}g</p>
            </div>
          ))}
          <div className="mt-6 border-t border-cyan-700 pt-4">
            <p className="text-lg font-bold text-cyan-300">Total: {totalCalories} kcal | {totalProtein}g Protein | {totalCarbs}g Carbs | {totalFats}g Fats</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Diet;
