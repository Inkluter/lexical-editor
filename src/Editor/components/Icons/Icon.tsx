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

  const listOrdered = (
    <svg
      fill="#000000"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="5.77" y="6.42" width="18.06" height="1.75" />
      <rect x="5.77" y="11.71" width="18.06" height="1.75" />
      <rect x="5.77" y="16.99" width="18.06" height="1.75" />
      <path d="M3.13,4.87V8a2,2,0,0,0,0,.45.3.3,0,0,0,.13.16.62.62,0,0,0,.32.06H3.7v.11h-2V8.71h.1a.79.79,0,0,0,.35-.06.29.29,0,0,0,.14-.16A1.75,1.75,0,0,0,2.3,8V6a1.28,1.28,0,0,0,0-.33.24.24,0,0,0-.1-.11.28.28,0,0,0-.16,0,.91.91,0,0,0-.35.09l-.05-.1L3,4.87Z" />
      <path d="M3.65,14.3H1.37v-.06a12.51,12.51,0,0,0,1.27-1.67,1.81,1.81,0,0,0,.22-.84.7.7,0,0,0-.18-.5.6.6,0,0,0-.45-.2.75.75,0,0,0-.68.44l-.11,0a1.58,1.58,0,0,1,.47-.81,1.09,1.09,0,0,1,.72-.26,1.06,1.06,0,0,1,.54.14,1,1,0,0,1,.38.37.9.9,0,0,1,.14.45,1.6,1.6,0,0,1-.21.77,7.28,7.28,0,0,1-1.25,1.47h.83a1.87,1.87,0,0,0,.4,0,.33.33,0,0,0,.15-.09,1.16,1.16,0,0,0,.16-.26h.1Z" />
      <path d="M2.09,18v-.1a1.88,1.88,0,0,0,.45-.17.67.67,0,0,0,.22-.25.69.69,0,0,0,.09-.34.55.55,0,0,0-.17-.41.58.58,0,0,0-.43-.17.8.8,0,0,0-.68.42l-.11,0A1.72,1.72,0,0,1,2,16.19a1.16,1.16,0,0,1,.71-.24.93.93,0,0,1,.66.24.76.76,0,0,1,.26.57.78.78,0,0,1-.12.41,1,1,0,0,1-.38.35,1.34,1.34,0,0,1,.51.4,1,1,0,0,1,.17.6,1.38,1.38,0,0,1-.44,1A1.62,1.62,0,0,1,2.2,20a1.24,1.24,0,0,1-.71-.16.34.34,0,0,1-.16-.29.32.32,0,0,1,.31-.32.41.41,0,0,1,.18,0l.32.25a.84.84,0,0,0,.52.23A.47.47,0,0,0,3,19.55a.61.61,0,0,0,.15-.42,1.1,1.1,0,0,0-.27-.72A1.42,1.42,0,0,0,2.09,18Z" />
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
    default:
      return null;
  }
};
