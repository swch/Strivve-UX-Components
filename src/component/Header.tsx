/** @jsxImportSource @emotion/react */
import React from 'react';
import { useBase } from './withBase';
import BackIcon from './icons/BackIcon';
import CloseIcon from './icons/CloseIcon';
import { StrivveCoreMount } from '../core/core';

function Header() {
  const { appearance, headerOptions, core } = useBase();

  return headerOptions ? (
    <div className="headerWrapper" css={appearance.elements?.headerWrapper}>
      <div>
        {core.state.mount !== StrivveCoreMount.INTRO && (
          <div onClick={() => core.goBack()}>
            <BackIcon />
          </div>
        )}
      </div>
      <p className="headerTitle" css={appearance.elements?.headerTitle}>
        {headerOptions?.title}
      </p>
      <div onClick={headerOptions?.onClose}>
        <CloseIcon />
      </div>
    </div>
  ) : null;
}

export default Header;
