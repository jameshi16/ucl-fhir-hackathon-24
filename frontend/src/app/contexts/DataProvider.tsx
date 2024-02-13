'use client';

import React, { useContext, useEffect } from 'react';
import type HealthCareData from '../types/healthcaredata';

type Data = {
  all: HealthCareData[];
  setAll: (data: HealthCareData[]) => void;
  addData: (data: HealthCareData) => void;
}

// Create a context with a default value
const DataContext = React.createContext({
  all: [],
  setAll: (_datum) => {},
  addData: (_datum) => {}
} as Data);

// Create a provider component
export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const [data, setData] = React.useState([{
    id: '1',
    name: 'Hellen Smith',
    conditions: ['Diabetes', 'Asthma'],
  }, {
    id: '2',
    name: 'John Doe',
    conditions: ['Chronic Depression']
  }, {
    id: '3',
    name: 'Jane Doe',
    conditions: ['Thingy']
  }]);

  return (
    <DataContext.Provider value={{
      all: data, setAll: setData, addData: (datum) => {
        setData([...data, datum]);
      }
    }}>
      {children}
    </DataContext.Provider >
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
