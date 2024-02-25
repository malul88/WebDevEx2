import './App.css'
import  { useEffect, useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import BattlePage from '../BattlePage/BattlePage';
import HomePage from '../Home/Home';
import User from '../../modules/User';
import {UserContext} from '../../modules/UserDataContext';

function App() {
  const [user, setUser] = useState<User | null>(null);
  
  // Fetch user data from local storage when the app starts
  useEffect(() => {
    const fetchUser = async () => {
      // Fetch user instance using your singleton class
      console.log('fetchUser called in app.tsx');
      const userInstance = await User.getInstance();
      console.log(`userInstance: ${userInstance}`);
      setUser(userInstance);
    };
    fetchUser();
  }, []);

  // Save user data to local storage before the user leaves the page
  useEffect(() => {
    const handleBeforeUnload = () => {
      user?.saveUserData();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [user]);

  // Provide the user data to the rest of the app
  // The user data is provided to the rest of the app using the UserContext.Provider
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Router basename='/'>
          <Routes>
            <Route path="/" element={<HomePage />}  />
            <Route path="/battle" element={<BattlePage />} />
          </Routes>
      </Router>
    </UserContext.Provider>
  );
  }

export default App
