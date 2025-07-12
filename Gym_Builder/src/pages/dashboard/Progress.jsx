import React, { useEffect, useState, useContext } from 'react';
import { collection, getDocs, query, where, db, setDoc, doc, getDoc } from '../../config/Firebase';
import { UserContext } from '../../context/UserContext';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const Progress = () => {
  const { user } = useContext(UserContext);
  const [progressData, setProgressData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [level, setLevel] = useState('Beginner');
  const [fitnessInput, setFitnessInput] = useState({ age: '', weight: '', chest: '', height: '', bodyFat: '' });
  const [fitnessScore, setFitnessScore] = useState(null);
  const [selectedSkill, setSelectedSkill] = useState('Beginner');
  const [previousScore, setPreviousScore] = useState(null);

  useEffect(() => {
    if (!user) return;
    const fetchData = async () => {
      try {
        const q = query(collection(db, 'progress'), where('uid', '==', user.uid));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => doc.data());
        setProgressData(data);
        setLoading(false);
        determineLevel(data);

        const fitnessSnap = await getDoc(doc(db, 'fitnessData', user.uid));
        if (fitnessSnap.exists()) {
          const fitnessData = fitnessSnap.data();
          setFitnessInput({
            age: fitnessData.age.toString(),
            weight: fitnessData.weight.toString(),
            chest: fitnessData.chest.toString(),
            height: fitnessData.height?.toString() || '',
            bodyFat: fitnessData.bodyFat?.toString() || '',
          });
          setFitnessScore(fitnessData.fitnessScore);
          setPreviousScore(fitnessData.fitnessScore);
          setSelectedSkill(fitnessData.skill);
          setLevel(fitnessData.skill);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [user]);

  const determineLevel = (data) => {
    const totalWorkouts = data.length;
    if (totalWorkouts >= 20) {
      setLevel('Pro');
      setSelectedSkill('Pro');
    } else if (totalWorkouts >= 10) {
      setLevel('Intermediate');
      setSelectedSkill('Intermediate');
    } else {
      setLevel('Beginner');
      setSelectedSkill('Beginner');
    }
  };

  const calculateFitness = async () => {
    const { age, weight, chest, height, bodyFat } = fitnessInput;
    if (!age || !weight || !chest || !height || !bodyFat) return;
    const score = Math.round(
      ((parseInt(weight) + parseInt(chest)) / parseInt(age)) * 5 +
      parseInt(height) * 0.1 -
      parseInt(bodyFat) * 0.5
    );
    setFitnessScore(score);
    if (user) {
      await setDoc(doc(db, 'fitnessData', user.uid), {
        uid: user.uid,
        age: parseInt(age),
        weight: parseInt(weight),
        chest: parseInt(chest),
        height: parseInt(height),
        bodyFat: parseInt(bodyFat),
        fitnessScore: score,
        skill: selectedSkill,
      });
      setPreviousScore(score);
    }
  };

  const progressPercentage = fitnessScore !== null ? Math.min(fitnessScore, 100) : 0;
  const scoreDelta = fitnessScore !== null && previousScore !== null ? fitnessScore - previousScore : null;

  const tips = {
    Beginner: ['Start slow and build consistency.', 'Focus on form and hydration.', 'Track every session.'],
    Intermediate: ['Increase intensity progressively.', 'Add new exercises to challenge yourself.', 'Focus on diet and rest.'],
    Pro: ['Maintain balance in strength and cardio.', 'Track macros and micronutrients.', 'Help mentor others or set advanced goals.'],
  };

  return (
    <div className="bg-gradient-to-b mt-10 from-black via-gray-900 to-cyan-950 min-h-screen p-6 text-white">
      <h1 className="text-4xl font-bold text-center text-cyan-400 mb-8">Progress Tracker</h1>

      {loading ? (
        <p className="text-center text-gray-400">Loading your progress...</p>
      ) : (
        <div className="max-w-4xl mx-auto">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-semibold text-cyan-300 mb-2">Your Fitness Score</h2>
            <div className="inline-block w-32 h-32">
              <CircularProgressbar
                value={progressPercentage}
                text={`${Math.round(progressPercentage)}%`}
                styles={buildStyles({
                  textColor: '#67e8f9',
                  pathColor: '#22d3ee',
                  trailColor: '#1e293b',
                })}
              />
            </div>
            <p className="mt-4 text-cyan-400">Level: <strong>{level}</strong></p>
          </div>

          <div className="mb-10 bg-[#0f172a] border border-cyan-800 p-6 rounded-xl">
            <h3 className="text-lg font-semibold text-cyan-300 mb-4">Choose Your Skill Level</h3>
            <select value={selectedSkill} onChange={e => setSelectedSkill(e.target.value)} className="bg-gray-800 text-white p-2 rounded">
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Pro">Pro</option>
            </select>
          </div>

          <div className="mb-10 bg-[#0f172a] border border-cyan-800 p-6 rounded-xl">
            <h2 className="text-2xl font-bold text-cyan-400 mb-6 text-center">Fitness Calculator</h2>
            <h3 className="text-lg font-semibold text-cyan-300 mb-4">Enter Your Details</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
  <div>
    <label className="text-sm text-cyan-300 mb-1 block">Age (Years)</label>
    <input
      type="number"
      placeholder="e.g., 25"
      value={fitnessInput.age}
      onChange={e => setFitnessInput({ ...fitnessInput, age: e.target.value })}
      className="bg-gray-800 text-white p-2 rounded w-full"
    />
  </div>
  <div>
    <label className="text-sm text-cyan-300 mb-1 block">Weight (kg)</label>
    <input
      type="number"
      placeholder="e.g., 70"
      value={fitnessInput.weight}
      onChange={e => setFitnessInput({ ...fitnessInput, weight: e.target.value })}
      className="bg-gray-800 text-white p-2 rounded w-full"
    />
  </div>
  <div>
    <label className="text-sm text-cyan-300 mb-1 block">Chest (inches)</label>
    <input
      type="number"
      placeholder="e.g., 38"
      value={fitnessInput.chest}
      onChange={e => setFitnessInput({ ...fitnessInput, chest: e.target.value })}
      className="bg-gray-800 text-white p-2 rounded w-full"
    />
  </div>
  <div>
    <label className="text-sm text-cyan-300 mb-1 block">Height (cm)</label>
    <input
      type="number"
      placeholder="e.g., 175"
      value={fitnessInput.height}
      onChange={e => setFitnessInput({ ...fitnessInput, height: e.target.value })}
      className="bg-gray-800 text-white p-2 rounded w-full"
    />
  </div>
  <div>
    <label className="text-sm text-cyan-300 mb-1 block">Body Fat (%)</label>
    <input
      type="number"
      placeholder="e.g., 18"
      value={fitnessInput.bodyFat}
      onChange={e => setFitnessInput({ ...fitnessInput, bodyFat: e.target.value })}
      className="bg-gray-800 text-white p-2 rounded w-full"
    />
  </div>
</div>

            <button className="bg-cyan-600 hover:bg-cyan-700 px-4 py-2 rounded" onClick={calculateFitness}>Calculate</button>
            {fitnessScore !== null && (
              <p className="mt-4 text-cyan-300">
                Your fitness score is <span className="font-bold">{fitnessScore}</span> — {fitnessScore > 50 ? 'Above Average' : 'Needs Improvement'}
                {scoreDelta !== null && scoreDelta !== 0 && (
                  <span className="block text-sm mt-1 text-gray-400">{scoreDelta > 0 ? `Improved by ${scoreDelta}` : `Dropped by ${Math.abs(scoreDelta)}`} from last score</span>
                )}
              </p>
            )}
          </div>

          <div className="mt-10 bg-cyan-900/30 p-6 rounded-xl border border-cyan-700">
            <h3 className="text-lg font-semibold text-cyan-300 mb-2">Suggestions for {selectedSkill}</h3>
            <ul className="list-disc list-inside text-gray-300">
              {tips[selectedSkill].map((tip, index) => (
                <li key={index}>{tip}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Progress;
