import React from 'react';

type RatingStarProps = {
  className?: string;
  rating: number;
};

const RatingStar: React.FC<RatingStarProps> = ({ rating, className }) => {
  const stars = [];

  for (let i = 0; i < 5; i++) {
    if (i < rating) {
      stars.push(
        <svg
          width='17'
          height='17'
          viewBox='0 0 17 17'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            id='Vector 50'
            d='M11.1104 6.04108C9.93014 4.95219 8.71563 1.83863 8.40772 0.800781C7.91165 3.30183 6.49187 5.36052 5.32867 6.50046C4.39812 7.41241 2.05237 8.08763 0.87207 8.47328C2.24054 8.81923 5.00366 10.2129 6.09844 11.7237C7.19321 13.2346 8.27658 15.6313 8.68142 16.6408C8.68142 16.6408 10.5606 11.9488 11.6749 10.873C12.8381 9.75013 15.2615 9.06106 16.4646 8.72078C16.4646 8.72078 12.2907 7.12998 11.1104 6.04108Z'
            fill='#FFE766'
          />
        </svg>
      );
    } else {
      stars.push(
        <svg
          width='17'
          height='17'
          viewBox='0 0 17 17'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            id='Vector 50'
            d='M11.1104 6.04108C9.93014 4.95219 8.71563 1.83863 8.40772 0.800781C7.91165 3.30183 6.49187 5.36052 5.32867 6.50046C4.39812 7.41241 2.05237 8.08763 0.87207 8.47328C2.24054 8.81923 5.00366 10.2129 6.09844 11.7237C7.19321 13.2346 8.27658 15.6313 8.68142 16.6408C8.68142 16.6408 10.5606 11.9488 11.6749 10.873C12.8381 9.75013 15.2615 9.06106 16.4646 8.72078C16.4646 8.72078 12.2907 7.12998 11.1104 6.04108Z'
            fill='#EDEDED'
          />
        </svg>
      );
    }
  }

  return <div className={`flex ${className}`}>{stars}</div>;
};

export default RatingStar;
