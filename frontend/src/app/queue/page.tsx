'use client';

import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";
import Card from '@/app/components/card';

const reorder = <T,>(list: T[], startIndex: number, endIndex: number): T[] => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const CardQueue = () => {
  const [items, setItems] = useState([{
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

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const { source, destination } = result;
    setItems(reorder(items, source.index, destination.index));
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {items.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided) => (
                  <Card
                    data={item}
                    position={index}
                    provided={provided} />
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default CardQueue;
