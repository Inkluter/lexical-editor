import React from 'react';

interface Props {
  icon: string;
  width?: number;
  height?: number;
}

export const Icon = ({ icon, width = 18, height = 18 }: Props) => {
  const alignCenter = (
    <svg
      width={width}
      height={height}
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
    >
      <path
        fill="#000000"
        fillRule="evenodd"
        d="M18 5a1 1 0 100-2H2a1 1 0 000 2h16zm-4 4a1 1 0 100-2H6a1 1 0 100 2h8zm5 3a1 1 0 01-1 1H2a1 1 0 110-2h16a1 1 0 011 1zm-5 5a1 1 0 100-2H6a1 1 0 100 2h8z"
      />
    </svg>
  );

  const alignLeft = (
    <svg
      width={width}
      height={height}
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
    >
      <path
        fill="#000000"
        fillRule="evenodd"
        d="M18 5a1 1 0 100-2H2a1 1 0 000 2h16zm-8 4a1 1 0 100-2H2a1 1 0 100 2h8zm9 3a1 1 0 01-1 1H2a1 1 0 110-2h16a1 1 0 011 1zm-9 5a1 1 0 100-2H2a1 1 0 100 2h8z"
      />
    </svg>
  );

  const alignRight = (
    <svg
      width={width}
      height={height}
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
    >
      <path
        fill="#000000"
        fillRule="evenodd"
        d="M18 5a1 1 0 100-2H2a1 1 0 000 2h16zm0 4a1 1 0 100-2h-8a1 1 0 100 2h8zm1 3a1 1 0 01-1 1H2a1 1 0 110-2h16a1 1 0 011 1zm-1 5a1 1 0 100-2h-8a1 1 0 100 2h8z"
      />
    </svg>
  );

  const alignJustify = (
    <svg
      width={width}
      height={height}
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
    >
      <path
        fill="#000000"
        fillRule="evenodd"
        d="M18 5a1 1 0 100-2H2a1 1 0 000 2h16zm0 4a1 1 0 100-2H2a1 1 0 100 2h16zm1 3a1 1 0 01-1 1H2a1 1 0 110-2h16a1 1 0 011 1zm-1 5a1 1 0 100-2H2a1 1 0 100 2h16z"
      />
    </svg>
  );

  const link = (
    <svg
      width={width}
      height={height}
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="Interface / Link_Horizontal">
        <path
          id="Vector"
          d="M8 12H16M15 8H17C19.2091 8 21 9.79086 21 12C21 14.2091 19.2091 16 17 16H15M9 8H7C4.79086 8 3 9.79086 3 12C3 14.2091 4.79086 16 7 16H9"
          stroke="#000000"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );

  switch (icon) {
    case 'align-center':
      return alignCenter;
    case 'align-left':
      return alignLeft;
    case 'align-right':
      return alignRight;
    case 'align-justify':
      return alignJustify;
    case 'link':
      return link;
    default:
      return null;
  }
};
