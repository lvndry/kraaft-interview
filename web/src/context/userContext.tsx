import React, { createContext, useContext, useState } from 'react';
import { User } from '../models/user';

interface IUserContext {
  currentUser: User;
  users: User[];
}

const initalContext: IUserContext = {
  currentUser: { id: 'maxime@kraaft.co', username: 'Maxime Blanchard' },
  users: [
    {
      id: 'maxime2@kraaft.co',
      username: 'Maxime',
    },
    {
      id: 'cedric@kraaft.co',
      username: 'Cedric Boidin',
    },
  ],
};

export const UserContext = createContext<IUserContext>(initalContext);

interface UserContextProviderProps {
  children: React.ReactNode;
}

export const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const userContext = useContext(UserContext);
  const [currentUser] = useState(userContext.currentUser);
  const [users] = useState(userContext.users);

  const contextValue = { currentUser, users };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};
