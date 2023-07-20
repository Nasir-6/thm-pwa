import React from 'react';

type Props = {
  isCurrentSalahTime: boolean;
};

const MoonIcon = ({ isCurrentSalahTime }: Props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className={`${isCurrentSalahTime ? 'active-svg' : ''}`}>
    <path
      fill="url(#a)"
      d="M2.62 8.25a.75.75 0 0 0 .75.75h1.5v1.5a.75.75 0 1 0 1.5 0V9h1.5a.75.75 0 0 0 0-1.5h-1.5V6a.75.75 0 1 0-1.5 0v1.5h-1.5a.75.75 0 0 0-.75.75Zm9-3.75h-.75v.75a.75.75 0 1 1-1.5 0V4.5h-.75a.75.75 0 0 1 0-1.5h.75v-.75a.75.75 0 0 1 1.5 0V3h.75a.75.75 0 0 1 0 1.5Zm-6.77 9.57a.75.75 0 0 0 0 .45A9.38 9.38 0 1 0 16.4 2.97a.75.75 0 0 0-.93.93 7.88 7.88 0 0 1-9.69 9.7.75.75 0 0 0-.93.47Zm1.87 1.23A9.38 9.38 0 0 0 17.18 4.85 7.88 7.88 0 1 1 6.72 15.3Z"
    />
    <path
      fill="url(#a)"
      d="M12.8 7.61a.75.75 0 0 0-1.5 0v.25h-.25a.75.75 0 0 0 0 1.5h.25v.25a.75.75 0 1 0 1.5 0v-.25h.25a.75.75 0 0 0 0-1.5h-.25v-.25Z"
      clipRule="evenodd"
    />
    <defs>
      <linearGradient id="a" x1="22.27" x2="-5" y1="21.38" y2="21.14" gradientUnits="userSpaceOnUse">
        <stop stopColor="#C47F45" />
        <stop offset="1" stopColor="#FFB673" />
      </linearGradient>
    </defs>
  </svg>
);

export default MoonIcon;
