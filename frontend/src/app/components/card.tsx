'use client';

import React from 'react';
import type HealthCareData from '../types/healthcaredata';
import { DraggableProvided } from 'react-beautiful-dnd';

type CardProps = {
  data: HealthCareData;
  position: number;
  provided: DraggableProvided;
}

const Card = ({ data, position, provided }: CardProps) => {
  return (
    <div style={{
      boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
      padding: '1em',
      margin: '1em 0',
      borderRadius: '4px'
    }}
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <b>{data.name}</b>
        <span>Position: {position + 1}</span> {/* plus 1 because index is 0 based */}
      </div>
      <p>{data.conditions.join(', ')}</p>
    </div >
  );
}

export default Card;
