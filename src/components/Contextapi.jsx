import React, { createContext, useState } from 'react';

// Create Context
export const StatusContext = createContext();

export const StatusProvider = ({ children }) => {
  const [status, setStatus] = useState("Pending");

  // Function to update status
  const updateStatus = (newStatus) => {
    setStatus(newStatus);
  };

  return (
    <StatusContext.Provider value={{ status, updateStatus }}>
      {children}
    </StatusContext.Provider>
  );
};
