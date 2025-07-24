import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useKeyboard } from '../context/KeyboardContext.jsx';

const LoginPage = () => {
  const navigate = useNavigate();
  const { showKeyboard, hideKeyboard } = useKeyboard();
  const handleLogin = (event) => {
    event.preventDefault();
    navigate('/quiz-intro');
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen p-6" style={{ backgroundColor: '#FBFBFE' }}>
      <img src="/logo.svg" alt="Hiki-No-More Logo" className="w-32 h-auto mb-4" />
      <h1 className="text-2xl my-8 font-bold text-gray-800">Hiki-No-More</h1>
      <form onSubmit={handleLogin} className="flex flex-col gap-2 w-full max-w-xs px-4">
        <div className="form-control w-full">
          <label className="label"><span className="label-text font-bold text-sm text-gray-600">Username / Email</span></label>
          <input type="text" placeholder="Your username/Email" className="input input-bordered w-full rounded-lg bg-blue-100 placeholder:text-gray-500" onFocus={showKeyboard} onBlur={hideKeyboard} />
        </div>
        <div className="form-control w-full">
          <label className="label"><span className="label-text font-bold text-sm text-gray-600">Password</span></label>
          <input type="password" placeholder="Your password" className="input input-bordered w-full rounded-lg bg-blue-100 placeholder:text-gray-500" onFocus={showKeyboard} onBlur={hideKeyboard} />
          <label className="label"><span className="label-text-alt"></span><a href="#" className="label-text-alt link text-blue-600 text-xs">Forgot Password?</a></label>
        </div>
        <button type="submit" className="btn btn-lg rounded-full border-none text-black mt-4" style={{ backgroundColor: '#A8D1F5' }}>Log in</button>
      </form>
    </div>
  );
};

export default LoginPage;