import React from 'react';
import { useNavigate } from 'react-router-dom';

const SignUpPage = () => {
  const navigate = useNavigate();
  const handleSignUp = (event) => {
    event.preventDefault();
    navigate('/quiz-intro');
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-dvh py-12" style={{ backgroundColor: '#FBFBFE' }}>
      <img src="/logo.svg" alt="Hiki-No-More Logo" className="w-32 h-auto mb-4" />
      <h1 className="text-2xl mt-8 font-bold text-gray-800">Hiki-No-More</h1>
      <p className="text-xs text-gray-500">Note: There is no need to fill in details, press sign up below.</p>
      <form onSubmit={handleSignUp} className="flex flex-col gap-2 w-full max-w-xs px-4">
        <div className="form-control w-full">
          <label className="label"><span className="label-text font-bold text-sm text-gray-600">Username</span></label>
          <input type="text" placeholder="Choose a username" className="input input-bordered w-full rounded-lg bg-blue-100 placeholder:text-gray-500" />
        </div>
        <div className="form-control w-full">
          <label className="label"><span className="label-text font-bold text-sm text-gray-600">Email</span></label>
          <input type="email" placeholder="Your email address" className="input input-bordered w-full rounded-lg bg-blue-100 placeholder:text-gray-500" />
        </div>
        <div className="form-control w-full">
          <label className="label"><span className="label-text font-bold text-sm text-gray-600">Password</span></label>
          <input type="password" placeholder="Create a password" className="input input-bordered w-full rounded-lg bg-blue-100 placeholder:text-gray-500" />
        </div>
        <div className="form-control mt-2">
          <label className="label cursor-pointer justify-start gap-3">
            <input type="checkbox" className="checkbox checkbox-primary" />
            <span className="label-text text-gray-600">I agree to the <a href="#" className="link text-blue-600 ml-1">Terms and Conditions</a></span>
          </label>
        </div>
        <button type="submit" className="btn btn-lg w-full rounded-full mt-4 border-none text-black" style={{ backgroundColor: '#A8D1F5' }}>Sign up</button>
      </form>
    </div>
  );
};

export default SignUpPage;
