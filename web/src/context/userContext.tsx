import React, { createContext, useContext, useState } from 'react';
import { User } from '../models/user';

interface IUserContext {
  user: User;
}

const initalContext: IUserContext = {
  user: { id: 'maxime@kraaft.co', username: 'Maxime Blanchard' },
};

export const UserContext = createContext<IUserContext>(initalContext);

interface UserContextProviderProps {
  children: React.ReactNode;
}

export const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const userContext = useContext(UserContext);
  const [user, setUser] = useState(userContext.user);
  const contextValue = { user, setUser };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};
