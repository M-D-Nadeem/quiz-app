import React, { useState } from 'react';
import { CommentOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import _ from 'lodash';

export default function UserLogin({ setUser }) {
  const [user, setAUser] = useState('');

  function handleSetUser() {
    if (!user) return;
    localStorage.setItem('user', user);
    setUser(user);
    localStorage.setItem('avatar', `https://picsum.photos/id/${_.random(1, 1000)}/200/300`);
  }

  return (
    <div className="bg-slate-300 text-black min-h-screen flex flex-col items-center justify-center">
      <motion.h1
        className="text-3xl mb-4 flex items-center justify-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <CommentOutlined className="text-green-500 mr-2" /> Discussion Section
      </motion.h1>
      
      <div className="flex flex-col items-center">
        <motion.input
          className="mb-4 h-10 w-64 p-2 rounded-lg text-black"
          value={user}
          onChange={e => setAUser(e.target.value)}
          placeholder="Enter your user name"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        />
        
        <motion.button
          onClick={handleSetUser}
          className="h-12 w-32 bg-green-700 text-white font-bold rounded-lg"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          Start
        </motion.button>
      </div>
    </div>
  );
}
