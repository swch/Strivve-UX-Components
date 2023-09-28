import React from 'react';
import { useBase } from '../withBase';

function BackIcon() {
  const { appearance } = useBase();
  return (
    <svg
      width="15"
      height="22"
      viewBox="0 0 15 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M2 12.5L13.6797 23.2656" stroke={appearance.variables?.iconColor} strokeWidth="2" />
      <path d="M13.6797 0.707031L1.5 13.5" stroke={appearance.variables?.iconColor} strokeWidth="2" />
    </svg>
  );
}

export default BackIcon;
