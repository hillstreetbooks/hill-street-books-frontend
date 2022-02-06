import React, { createContext, useState } from 'react';
import Routes from './routes';

export const UserContext = createContext(null);

const App = () => {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={user}>
      <Routes />
    </UserContext.Provider>
  );
};

export default App;
