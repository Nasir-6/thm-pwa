import React from 'react';

interface Props {
  isCurrentSalahTime: boolean;
}

const SunriseIcon = ({ isCurrentSalahTime }: Props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" className={`${isCurrentSalahTime ? 'active-svg' : ''}`}>
    <path
      fill="url(#a)"
      d="M7.29 4.09a.75.75 0 0 1 1.38-.58l.72 1.73a.75.75 0 1 1-1.38.58l-.72-1.73ZM2 10.17l1.73.72a.75.75 0 1 0 .58-1.38l-1.73-.72A.75.75 0 1 0 2 10.17Zm17.96.78c.1 0 .2-.02.29-.06l1.73-.72a.75.75 0 1 0-.58-1.38l-1.73.72a.75.75 0 0 0 .29 1.44ZM15 6.22a.75.75 0 0 0 .98-.4l.72-1.73a.75.75 0 0 0-1.38-.58l-.72 1.73a.75.75 0 0 0 .4.98ZM23.25 15a.75.75 0 0 1-.75.75h-21a.75.75 0 1 1 0-1.5h4.17a6.37 6.37 0 1 1 12.66 0h4.17a.75.75 0 0 1 .75.75Zm-16.07-.75h9.64a4.88 4.88 0 1 0-9.64 0ZM19.5 18h-15a.75.75 0 1 0 0 1.5h15a.75.75 0 1 0 0-1.5Z"
    />
    <defs>
      <linearGradient id="a" x1="1.82" x2="31.57" y1="19.5" y2="19.17" gradientUnits="userSpaceOnUse">
        <stop stopColor="#C47F45" />
        <stop offset="1" stopColor="#FFB673" />
      </linearGradient>
    </defs>
  </svg>
);

export default SunriseIcon;
