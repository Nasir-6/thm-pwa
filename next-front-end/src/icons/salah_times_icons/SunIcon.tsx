import React from 'react';

interface Props {
  isCurrentSalahTime: boolean;
}
const SunIcon = ({ isCurrentSalahTime }: Props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className={`${isCurrentSalahTime ? 'active-svg' : ''}`}>
    <path
      fill="url(#a)"
      d="M12 5.63a6.37 6.37 0 1 0 0 12.74 6.37 6.37 0 0 0 0-12.75Zm0 11.25a4.87 4.87 0 1 1 0-9.75 4.87 4.87 0 0 1 0 9.75Zm-.75-13.5V1.5a.75.75 0 1 1 1.5 0v1.88a.75.75 0 1 1-1.5 0ZM4.05 5.1A.75.75 0 1 1 5.1 4.05l1.32 1.32a.75.75 0 1 1-1.06 1.06L4.05 5.11Zm-.67 7.64H1.5a.75.75 0 1 1 0-1.5h1.88a.75.75 0 1 1 0 1.5Zm3.05 4.82a.75.75 0 0 1 0 1.06l-1.32 1.32a.75.75 0 0 1-1.06-1.06l1.32-1.32a.75.75 0 0 1 1.06 0Zm6.32 3.05v1.88a.75.75 0 1 1-1.5 0v-1.88a.75.75 0 1 1 1.5 0Zm7.2-1.73a.75.75 0 1 1-1.06 1.06l-1.32-1.32a.75.75 0 1 1 1.06-1.06l1.32 1.32Zm3.3-6.89a.75.75 0 0 1-.75.75h-1.88a.75.75 0 1 1 0-1.5h1.88a.75.75 0 0 1 .75.75Zm-5.68-5.57a.75.75 0 0 1 0-1.06l1.32-1.32a.75.75 0 1 1 1.06 1.06l-1.32 1.32a.75.75 0 0 1-1.06 0Z"
    />
    <defs>
      <linearGradient id="a" x1="1.82" x2="31.57" y1="23.25" y2="23.01" gradientUnits="userSpaceOnUse">
        <stop stopColor="#C47F45" />
        <stop offset="1" stopColor="#FFB673" />
      </linearGradient>
    </defs>
  </svg>
);

export default SunIcon;
