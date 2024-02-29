// LoginForm.js
import React from 'react';
import { useCandidate } from '../../store/Context';

const SimpleAuth = () => {
    const {
        username,
        setAppUsername,
        password,
        setAppPassword,
        login,
        isAuthorized
    } = useCandidate()


  const handleLogin = (e) => {
    e.preventDefault();
    login()

  
  };

  return (
    <div className='flex justify-center items-center w-full h-[100vh]'>
    <form className='flex  flex-col gap-2 p-6 bg-white w-1/3 border-black border-solid border-2 rounded-lg'  onSubmit={handleLogin}>
    <div className="border-solid border-b-2 border-[#E7E7E7] w-full px-2 py-2">
    <img
      src={require("../../assets/specialized_icon.png")}
      alt="specialized-icon"
      className="w-1/2"
    />
  </div>
  <h1 className='font-bold text-2xl'>Login</h1>
  <p>Username:</p>
      <input
        type="text"
        className='border border-black border-1 rounded-sm p-2'
        placeholder="Username"
        value={username}
        onChange={(e) => setAppUsername(e.target.value)}
      />
      <p className='text-left'>Password:</p>
      <input
        type="password"
        className='border border-black border-1 rounded-sm p-2'
        placeholder="Password"
        value={password}
        onChange={(e) => setAppPassword(e.target.value)}
      />
      <button 
      className='bg-black text-white p-2 rounded-sm w-1/3'
      type="submit">Login</button>
    </form>

    </div>
    
  );
};

export default SimpleAuth;
