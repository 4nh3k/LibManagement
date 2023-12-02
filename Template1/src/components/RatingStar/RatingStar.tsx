import React from 'react';

interface RatingStarProps {
  className?: string;
  rating: number;
}

function RatingStar({ rating, className }: RatingStarProps) {
  const renderStar = (isFilled: boolean, key: number) => (
    <svg
      key={key}
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 26 26'
      strokeWidth='1'
      className={`w-6 h-6 stroke-yellow-400 ${
        isFilled ? 'fill-yellow-400 stroke-none' : 'fill-transparent'
      }`}
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z'
      />
    </svg>
  );

  const stars = Array.from({ length: 5 }, (_, index) => renderStar(index < rating, index));

  return <div className={`flex ${className}`}>{stars}</div>;
}

export default RatingStar;
