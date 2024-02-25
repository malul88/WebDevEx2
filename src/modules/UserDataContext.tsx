// User.tsx
import { createContext } from 'react';
import User from './User';

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
});


export default UserContext;
