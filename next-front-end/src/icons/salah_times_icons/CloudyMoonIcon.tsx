import React from 'react';

type Props = {
  isCurrentSalahTime: boolean;
};

const CloudyMoonIcon = ({ isCurrentSalahTime }: Props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className={`${isCurrentSalahTime ? 'active-svg' : ''}`}>
    <path
      fill="url(#a)"
      d="M14.63 6.75c-.4 0-.78.03-1.16.1A6.75 6.75 0 0 0 8.27.92a.75.75 0 0 0-.9.9 5.28 5.28 0 0 1-1.4 4.9 5.26 5.26 0 0 1-4.9 1.4.75.75 0 0 0-.9.9 6.77 6.77 0 0 0 3.03 4.22A4.87 4.87 0 0 0 7.12 21h7.5a7.12 7.12 0 0 0 0-14.25ZM2 9.75h.25a6.76 6.76 0 0 0 6.75-7 5.22 5.22 0 0 1 3 4.5 7.16 7.16 0 0 0-4.03 4.07 4.9 4.9 0 0 0-3.66.83 5.27 5.27 0 0 1-2.3-2.4Zm12.63 9.75h-7.5a3.37 3.37 0 1 1 .45-6.72c-.05.36-.08.73-.08 1.1a.75.75 0 0 0 1.5 0 5.62 5.62 0 1 1 5.63 5.62Z"
    />
    <defs>
      <linearGradient id="a" x1="1.18" x2="29.74" y1="21" y2="20.75" gradientUnits="userSpaceOnUse">
        <stop stopColor="#C47F45" />
        <stop offset="1" stopColor="#FFB673" />
      </linearGradient>
    </defs>
  </svg>
);

export default CloudyMoonIcon;
