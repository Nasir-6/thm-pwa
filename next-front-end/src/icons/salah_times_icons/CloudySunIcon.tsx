import React from 'react';

type Props = {
  isCurrentSalahTime: boolean;
};

const CloudySunIcon = ({ isCurrentSalahTime }: Props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className={`${isCurrentSalahTime ? 'active-svg' : ''}`}>
    <path
      fill="url(#a)"
      d="M14.63 6.75a7.1 7.1 0 0 0-1.9.26c-.25-.4-.54-.77-.88-1.09l.88-1.27a.75.75 0 0 0-1.22-.86l-.9 1.27A5.24 5.24 0 0 0 8.1 4.5l-.27-1.53a.75.75 0 1 0-1.48.26l.27 1.53a5.2 5.2 0 0 0-2.19 1.4l-1.27-.9A.75.75 0 0 0 2.3 6.5l1.27.9A5.2 5.2 0 0 0 3 9.9l-1.53.27a.75.75 0 1 0 .26 1.48l1.53-.27c.14.4.32.8.55 1.16A4.87 4.87 0 0 0 7.12 21h7.5a7.12 7.12 0 1 0 0-14.25ZM4.55 10.42v-.04c-.18-.97.05-1.96.6-2.77l.02-.01v-.02a3.72 3.72 0 0 1 2.4-1.52h.04c.95-.17 1.93.04 2.73.58l.05.04.04.02c.33.24.63.54.87.87a7.17 7.17 0 0 0-3.34 3.75 4.91 4.91 0 0 0-2.91.4c-.25-.4-.42-.85-.5-1.3Zm10.07 9.08h-7.5a3.37 3.37 0 1 1 .45-6.72c-.05.36-.08.73-.08 1.1a.75.75 0 0 0 1.5 0 5.62 5.62 0 1 1 5.63 5.62Z"
    />
    <defs>
      <linearGradient id="a" x1="1.84" x2="29.48" y1="21" y2="20.75" gradientUnits="userSpaceOnUse">
        <stop stopColor="#C47F45" />
        <stop offset="1" stopColor="#FFB673" />
      </linearGradient>
    </defs>
  </svg>
);

export default CloudySunIcon;
