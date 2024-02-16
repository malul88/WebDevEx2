import './App.css'
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserDataContext from '../../modules/UserDataContext';
import User from '../../modules/User';
import BattlePage from '../BattlePage/BattlePage';
import HomePage from '../Home/Home';

function App() {

  const [userData, setUserData] = useState(
    User.loadUserData() || new User(0, 0, [])
  );

  return (
    <UserDataContext.Provider value={{ userData, setUserData }}>
      <Router>
          <Routes>
            <Route path="/" element={<HomePage />}  />
            <Route path="/battle" element={<BattlePage />} />
          </Routes>
      </Router>
    </UserDataContext.Provider>
  );
  }

export default App
