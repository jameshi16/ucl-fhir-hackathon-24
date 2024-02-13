'use client';

import React, { useContext, useEffect } from 'react';
import type HealthCareData from '../types/healthcaredata';
import axios from 'axios';

type Data = {
  all: HealthCareData[];
  setAll: (data: HealthCareData[]) => void;
  addData: (data: HealthCareData) => void;
  swap: (index1: string, index2: string) => void;
  deleteUser: (id: string) => void;
}

// Create a context with a default value
const DataContext = React.createContext({
  all: [],
  setAll: (_datum) => {},
  addData: (_datum) => {},
  swap: (_index1, _index2) => {},
  deleteUser: (_id) => {}
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

  const fetchDataFromServer = async () => {
    try {
      const response = await axios.get(process.env.NEXT_PUBLIC_BASE_URL + '/queue');
      setData(response.data as HealthCareData[]);
    } catch (error) {
      console.error(error);
    }
  };

  const swapServer = async (index1: string, index2: string) => {
    try {
      const response = await axios.post(process.env.NEXT_PUBLIC_BASE_URL + `/reorder?id1=${index1}&id2=${index2}`);
      if (response.status === 200) {
        //      fetchDataFromServer();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteUser = async (id: string) => {
    setData(data.filter((item) => item.id !== id));
    try {
      const response = await axios.delete(process.env.NEXT_PUBLIC_BASE_URL + `/user/delete?id=${id}`);
      if (response.status === 200) {
        //    fetchDataFromServer();
      }
    } catch (error) {
      console.error(error);
    }
  }

  const addUser = async (datum: HealthCareData) => {
    const newData = [...data];
    const insertAt = Math.floor(Math.random() * (newData.length));
    newData.splice(insertAt, 0, datum);
    setData(newData);

    try {
      const response = await axios.post(process.env.NEXT_PUBLIC_BASE_URL + '/patient/123', datum);
      if (response.status === 200) {
        //  fetchDataFromServer();
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    //    fetchDataFromServer();
  }, []);

  return (
    <DataContext.Provider value={{
      all: data, setAll: setData, addData: addUser,
      swap: (index1, index2) => swapServer(index1, index2),
      deleteUser
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
