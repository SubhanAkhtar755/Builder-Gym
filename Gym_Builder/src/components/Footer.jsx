import React, { useState } from 'react';
import {
  FacebookFilled,
  InstagramOutlined,
  TwitterOutlined,
  MailOutlined,
  EnvironmentOutlined,
  PhoneOutlined,
} from '@ant-design/icons';
import { Input, Button } from 'antd';
import { collection, addDoc ,db} from '../config/Firebase';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = async () => {
    if (!email || !email.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }

    try {
      await addDoc(collection(db, 'newsletter'), {
        email: email.trim(),
        subscribedAt: new Date().toISOString(),
      });
      toast.success('Subscribed successfully!');
      setEmail('');
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong, try again.');
    }
  };

  const imageUrls = [
    'https://images.pexels.com/photos/1552249/pexels-photo-1552249.jpeg?auto=compress&cs=tinysrgb&h=640',
    'https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg?auto=compress&cs=tinysrgb&h=640',
    'https://images.pexels.com/photos/1954524/pexels-photo-1954524.jpeg?auto=compress&cs=tinysrgb&h=640',
    'https://images.pexels.com/photos/2261482/pexels-photo-2261482.jpeg?auto=compress&cs=tinysrgb&h=640',
  ];

  return (
    <footer className="bg-gradient-to-b from-black via-gray-900 to-cyan-950 text-gray-300 pt-10 px-6 relative">
      <ToastContainer position="bottom-right" autoClose={3000} />
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Branding + Contact */}
        <div>
          <h2 className="text-2xl font-bold text-cyan-400">BuilderGym</h2>
          <p className="text-sm mt-2 text-gray-400">
            Transform your body, transform your life. Join BuilderGym today and start your fitness journey.
          </p>

          <div className="mt-4 text-sm space-y-2 text-gray-400">
            <p className="flex items-center gap-2"><EnvironmentOutlined />Hasilpur opposites wapda grid station, 63000, Pakistan</p>
            <p className="flex items-center gap-2"><PhoneOutlined />03064400814</p>
            <p className="flex items-center gap-2"><MailOutlined /> contact@buildergym.com</p>
          </div>
        </div>

        {/* Zigzag Image Section */}
        <div className="relative flex flex-wrap justify-center items-center gap-3">
          {imageUrls.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`footer-img-${i}`}
              className={`w-20 h-20 object-cover rounded-lg shadow-md 
                transform transition-transform duration-300 hover:scale-105 
                ${i % 2 === 0 ? 'translate-y-2' : '-translate-y-2'}
              `}
            />
          ))}
        </div>

        {/* Newsletter + Social */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-cyan-300">Subscribe</h3>
          <p className="text-sm text-gray-400 mb-2">Get the latest updates and offers.</p>
          <div className="flex gap-2 mb-4">
            <Input
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-800 border border-cyan-500 text-white"
            />
            <Button
              className="bg-cyan-500 hover:bg-cyan-600 text-white border-none"
              onClick={handleSubscribe}
            >
              Subscribe
            </Button>
          </div>

          <div className="flex items-center gap-4 text-xl text-cyan-300">
            <a href="#" className="hover:text-white"><FacebookFilled /></a>
            <a href="#" className="hover:text-white"><InstagramOutlined /></a>
            <a href="#" className="hover:text-white"><TwitterOutlined /></a>
            <a href="mailto:contact@buildergym.com" className="hover:text-white"><MailOutlined /></a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="text-center text-sm text-gray-500 border-t border-cyan-800 pt-4 mt-10 pb-4">
        © {new Date().getFullYear()} BuilderGym. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
