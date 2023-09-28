import React from 'react';
import { useBase } from '../withBase';

function CloseIcon() {
  const { appearance } = useBase();
  return (
    <svg
      width="23"
      height="23"
      viewBox="0 0 26 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line
        x1="1.08894"
        y1="1.30657"
        x2="25.0616"
        y2="25.2792"
        stroke={appearance.variables?.iconColor}
        strokeWidth="2"
      />
      <line
        x1="25.0616"
        y1="2.72078"
        x2="1.08894"
        y2="26.6934"
        stroke={appearance.variables?.iconColor}
        strokeWidth="2"
      />
    </svg>
  );
}

export default CloseIcon;
