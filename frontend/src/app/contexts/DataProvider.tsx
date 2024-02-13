'use client';

import React, { useContext, useEffect } from 'react';
import type HealthCareData from '../types/healthcaredata';

type Data = {
  all: HealthCareData[];
}

// Create a context with a default value
const DataContext = React.createContext({
  all: []
} as Data);

// Create a provider component
export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const [data, setData] = React.useState([]);

  return (
    <DataContext.Provider value={{ all: data }}>
      {children}
    </DataContext.Provider>
  );
}

export const DataConsumer = DataContext.Consumer;

export const useDataProvider = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useDataProvider must be used within a DataProvider');
  }
  return context;
}
