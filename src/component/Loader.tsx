/** @jsxImportSource @emotion/react */
import React from 'react';
import { useBase } from './withBase';

function Loader() {
  const { appearance } = useBase();
  return (
    <div data-testid="loader" id="loader">
      <div css={appearance.elements?.loader} />
      <style>{`    
        @keyframes rotation {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
        } 
      `}</style>
    </div>
  );
}

export default Loader;
