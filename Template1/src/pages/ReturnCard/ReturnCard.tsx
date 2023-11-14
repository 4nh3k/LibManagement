import React from 'react';

interface Props {
  id?: string;
}

const ReturnCard: React.FC<Props> = ({ id }) => {
  return (
    <div>
      <h2 className='font-bold text-'>Return Card</h2>
    </div>
  );
};

export default ReturnCard;
