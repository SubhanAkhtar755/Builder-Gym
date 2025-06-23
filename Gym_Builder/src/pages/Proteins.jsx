import React from 'react';

const proteinData = [
  {
    name: "Optimum Nutrition Gold Standard Whey",
    price: "Rs. 11,500",
    image:
      "data:image/jpeg;base64,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",
    description:
      "24g protein, 5.5g BCAAs per serving. Ideal for muscle recovery and growth.",
    benefits:
      "Builds lean muscle, improves strength, and quick post-workout recovery.",
  },
  {
    name: "Dymatize ISO100 Hydrolyzed",
    price: "Rs. 13,000",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzYZl5KNELwudjrLybKdrxfqKyOVWoLZj3EQ&s",
    description: "Fast-absorbing whey isolate with 25g protein per scoop.",
    benefits:
      "Perfect for athletes and bodybuilders looking for rapid absorption.",
  },
  {
    name: "MuscleTech NitroTech Whey Gold",
    price: "Rs. 10,200",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgyzMrGtiLUski4mDI8hheUeBUiKqpkluDYg&s",
    description: "Delivers high-quality whey peptides and isolates.",
    benefits: "Promotes strength, endurance and muscle repair.",
  },
  {
    name: "MyProtein Impact Whey Protein",
    price: "Rs. 9,000",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3D1bvBkFE9qpjS0KN79VIyQgwKdr3xKaq6w&s",
    description: "21g protein per serving. Great daily protein source.",
    benefits:
      "Affordable and ideal for beginners starting their fitness journey.",
  },
  {
    name: "Rule1 R1 Protein Whey Blend",
    price: "Rs. 11,000",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLYr0LA1XCPI9sDRv5f6E65c-2IiNv5xXivA&s",
    description:
      "Blend of whey isolate and concentrate. 25g protein per scoop.",
    benefits: "Supports lean muscle gain without unnecessary fillers.",
  },
];


const Proteins = () => {
  return (
    <div className="bg-gradient-to-b from-black via-gray-900 to-cyan-950 text-white">
      {/* Hero Section */}
      <section className="bg-[url('https://images.unsplash.com/photo-1598970434795-0c54fe7c0642?auto=format&fit=crop&w=1740&q=80')] bg-cover bg-center text-white py-24 px-4 relative">
        <div className="absolute inset-0 bg-black/80"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-5xl font-extrabold text-cyan-400 mb-4">Premium Protein Supplements</h1>
          <p className="text-lg max-w-2xl mx-auto text-gray-200">Fuel your body with top-quality protein blends for strength, endurance, and faster recovery. Explore our handpicked products to achieve your fitness goals.</p>
        </div>
      </section>

      {/* Product Cards */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-cyan-400 mb-16">Our Top Products</h2>
        <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {proteinData.map((item, idx) => (
            <div key={idx} className="bg-[#0f172a] rounded-xl shadow-xl hover:shadow-2xl border border-cyan-800 overflow-hidden transition-all">
              <img src={item.image} alt={item.name} className="w-full h-60 object-contain bg-black p-4" />
              <div className="p-6">
                <h3 className="text-lg font-semibold text-cyan-300 mb-1">{item.name}</h3>
                <p className="text-sm text-gray-400 mb-1">{item.description}</p>
                <p className="text-sm text-gray-400 mb-3"><strong>Benefits:</strong> {item.benefits}</p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-green-400">{item.price}</span>
                  <a
                    href={`https://wa.me/923001234567?text=${encodeURIComponent(`Hi, I'm interested in buying ${item.name} for ${item.price}.\n\nDetails:\n${item.description}\n${item.benefits}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-lg font-medium"
                  >
                    Buy Now
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Protein Section */}
      <section className="py-20 px-6 bg-[#0f172a] border-t border-cyan-900">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-cyan-400 mb-6">Why Take Protein Supplements?</h2>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto mb-12">
            Protein is essential for muscle repair, fat loss, and body maintenance. Whether you're an athlete, fitness enthusiast, or just someone aiming for a healthier body — protein helps build strength, speed up recovery, and support overall health.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          <div className="bg-cyan-900/30 p-6 rounded-xl border border-cyan-700">
            <h3 className="font-semibold text-lg text-cyan-300 mb-2">💪 Muscle Recovery</h3>
            <p className="text-gray-300">Proteins repair damaged muscles after intense workouts and reduce soreness.</p>
          </div>
          <div className="bg-cyan-900/30 p-6 rounded-xl border border-cyan-700">
            <h3 className="font-semibold text-lg text-cyan-300 mb-2">⚖️ Weight Management</h3>
            <p className="text-gray-300">High protein diets support fat loss and help maintain a lean physique.</p>
          </div>
          <div className="bg-cyan-900/30 p-6 rounded-xl border border-cyan-700">
            <h3 className="font-semibold text-lg text-cyan-300 mb-2">🚀 Performance Boost</h3>
            <p className="text-gray-300">Improves strength, energy levels, and helps you push harder in training.</p>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 px-6 bg-gray-900">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-cyan-400 mb-10">Frequently Asked Questions</h2>
          <div className="space-y-6 text-gray-300">
            <div>
              <h4 className="font-semibold text-lg">❓ Is it safe to use protein supplements daily?</h4>
              <p>Yes, high-quality protein supplements are safe for daily use when taken in recommended doses.</p>
            </div>
            <div>
              <h4 className="font-semibold text-lg">❓ Can beginners take protein powders?</h4>
              <p>Absolutely! Supplements like MyProtein Impact Whey are ideal for beginners as they are mild and effective.</p>
            </div>
            <div>
              <h4 className="font-semibold text-lg">❓ What's the best time to take protein?</h4>
              <p>Post-workout is ideal. However, it can also be taken in the morning or between meals to meet protein goals.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-cyan-600 text-white text-center">
        <h2 className="text-4xl font-bold mb-2">Ready to Level Up?</h2>
        <p className="text-lg mb-4">Shop our premium supplements and fuel your fitness journey!</p>
      </section>
    </div>
  );
};

export default Proteins;
