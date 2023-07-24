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
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.17867 11.9825L11.6744 4.48681M12.1888 8.67557L14.0259 6.8384C15.3247 5.53965 15.3247 3.43397 14.0259 2.13522C12.7272 0.836477 10.6215 0.836477 9.32277 2.13522L7.48559 3.9724M8.51441 12.3499L6.67723 14.1871C5.37849 15.4858 3.2728 15.4858 1.97406 14.1871C0.675314 12.8884 0.675314 10.7827 1.97406 9.48393L3.81124 7.64675"
        stroke="#2B2E31"
      />
    </svg>
  );

  const listOrdered = (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.99998 4H15M5.99998 12H15M5.99998 8H15M2.99998 5.5V2H2.5L1.5 3M2.99998 5.5H1.5M2.99998 5.5H4.5M4.49998 13H1.5C1.5 13 1.77682 12.2232 2.5 11.5C3.22318 10.7768 4 9.5 3 9C2 8.5 1 10 1 10"
        stroke="#2B2E31"
      />
    </svg>
  );

  const listUnordered = (
    <svg
      fill="#000000"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="5.94" y="6.42" width="18.06" height="1.75" />
      <rect x="5.94" y="11.71" width="18.06" height="1.75" />
      <rect x="5.94" y="16.99" width="18.06" height="1.75" />
      <circle cx="1.85" cy="7.29" r="1.52" />
      <circle cx="1.85" cy="12.58" r="1.52" />
      <circle cx="1.85" cy="17.87" r="1.52" />
    </svg>
  );

  const editLink = (
    <svg
      fill="#000000"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="Edit / Edit_Pencil_02">
        <path
          id="Vector"
          d="M4 16.0001V20.0001L8 20.0001L18.8686 9.13146L18.8695 9.13061C19.265 8.73516 19.4628 8.53736 19.5369 8.3092C19.6021 8.10835 19.6022 7.89201 19.5369 7.69117C19.4627 7.46284 19.2646 7.26474 18.8686 6.86872L17.1288 5.12892C16.7345 4.7346 16.5369 4.53704 16.3091 4.46301C16.1082 4.39775 15.8919 4.39775 15.691 4.46301C15.463 4.53709 15.2652 4.73488 14.8704 5.12976L14.8686 5.13146L4 16.0001Z"
          stroke="#000000"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );

  const bold = (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 8L7 8C9.20914 8 11 7.20914 11 5C11 2.79086 9.5 2 8 2L5 2C4.44772 2 4 2.44772 4 3L4 7.98578L7 7.98578C11 8 12.5 8.77664 12.5 10.9858C12.5 13.1949 10.7091 14 8.5 14L5 14C4.44772 14 4 13.5523 4 13L4 8Z"
        stroke="#2B2E31"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  const italic = (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9 3L7 13M9 3H7M9 3L11 3M7 13H9M7 13H5"
        stroke="#2B2E31"
        strokeLinejoin="round"
      />
    </svg>
  );

  const strikethrough = (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.5 4.34494C11.2142 3.61887 10.6861 2.98052 9.95116 2.5606C7.58847 1.21067 4.56562 2.39989 4.56767 5.04366C4.56925 7.07499 6.39082 7.42492 8.15689 8.00308M4.5 11.6549C4.78581 12.381 5.31389 13.0193 6.04884 13.4392C8.40908 14.7878 11.4296 13.6036 11.4323 10.9625C11.4327 10.6022 11.3549 10.2836 11.2157 10M8.15689 8.00308H13.5M8.15689 8.00308H2.5"
        stroke="#2B2E31"
        strokeLinejoin="round"
      />
    </svg>
  );

  const underline = (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 2V8C4 10.2091 5.79086 12 8 12C10.2091 12 12 10.2091 12 8V2M4 14H12"
        stroke="#2B2E31"
        strokeLinejoin="round"
      />
    </svg>
  );

  const center = (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M1 4H15M2.5 12H13.5M4 8H12" stroke="#2B2E31" />
    </svg>
  );

  const left = (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M1 4H15M1 12H7.39999M1 8H15" stroke="#2B2E31" />
    </svg>
  );

  const right = (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M1 4H15M8.60001 12H15M1 8H15" stroke="#2B2E31" />
    </svg>
  );

  const justify = (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M1 4H15M1 12H15M1 8H15" stroke="#2B2E31" />
    </svg>
  );

  const arrowUp = (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M2 11L8.25223 5L14 11" stroke="#2B2E31" />
    </svg>
  );

  const arrowDown = (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M14 5L7.74778 11L2 5" stroke="#2B2E31" />
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
    case 'list-ordered':
      return listOrdered;
    case 'list-unordered':
      return listUnordered;
    case 'edit-link':
      return editLink;
    case 'bold':
      return bold;
    case 'italic':
      return italic;
    case 'strikethrough':
      return strikethrough;
    case 'underline':
      return underline;
    case 'center':
      return center;
    case 'left':
      return left;
    case 'right':
      return right;
    case 'justify':
      return justify;
    case 'arrow-up':
      return arrowUp;
    case 'arrow-down':
      return arrowDown;
    default:
      return null;
  }
};
