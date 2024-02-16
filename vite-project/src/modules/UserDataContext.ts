// UserDataContext.js
import React from 'react';
import User from './User';

const UserDataContext = React.createContext(
    {
        userData: new User(0, 0, []),
        setUserData: (userData: User) => {
            User.instance = userData;
        }
    }
);

export default UserDataContext;