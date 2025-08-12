import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const login = (email, password) => {
    // This is a mock login function.
    // In a real app, you would make an API call to your backend here.
    if (email && password) {
      setUser({ email });
      navigate('/chat');
      return true;
    }
    return false;
  };

  const signup = (email, password) => {
    // This is a mock signup function.
    // In a real app, you would make an API call to your backend to create a new user.
    if (email && password) {
      setUser({ email });
      navigate('/quiz-intro'); // Assuming quiz is the next step after signup
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    navigate('/');
  };

  const value = { user, login, signup, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};