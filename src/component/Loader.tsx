import React from 'react';

function Loader() {
  return (
    <div id="loader">
      <div className='loader' />
      <style>{`
      .loader {
        width: 48px;
        height: 48px;
        border: 5px solid lightgray;
        border-bottom-color: transparent;
        border-radius: 50%;
        display: inline-block;
        box-sizing: border-box;
        animation: rotation 1s linear infinite;
        }
    
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