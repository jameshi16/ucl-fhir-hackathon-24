'use client';

import { useState } from 'react';
import CardQueue from "../components/card-queue";
import AddButton from "../components/add-button";
import AddUserDialog from "../components/add-user-dialog";

const QueuePage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [conditions, setConditions] = useState<String[]>([]);

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
  };

  return (
    <div>
      <h1 className="text-2xl text-center my-4">Current Queue</h1>
      <CardQueue />
      <AddButton onClick={handleAdd} />
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
