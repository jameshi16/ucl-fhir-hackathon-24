'use client';

import { useState } from 'react';
import CardQueue from "../components/card-queue";
import AddButton from "../components/add-button";
import AddUserDialog from "../components/add-user-dialog";
import { useDataProvider } from "../contexts/DataProvider";
import type HealthCareData from '../types/healthcaredata';

const QueuePage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [conditions, setConditions] = useState<String[]>([]);
  const { addData } = useDataProvider();

  const handleAdd = () => {
    setName('');
    setConditions([]);
    setIsOpen(true);
  }

  const onSubmit = () => {
    if (name === '' || conditions.length === 0) {
      alert("not enough info");
      return;
    }

    addData({
      id: String(Date.now()),
      name,
      conditions
    } as HealthCareData);
  };

  return (
    <div className="m-6">
      <h1 className="text-2xl text-center my-4">Current Queue</h1>
      <AddButton onClick={handleAdd} />
      <CardQueue />
      <AddUserDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        name={name}
        setName={setName}
        conditions={conditions}
        setConditions={setConditions}
        onSubmit={onSubmit} />
    </div>
  );
}

export default QueuePage;
