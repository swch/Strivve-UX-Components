/** @jsxImportSource @emotion/react */
import React from 'react';
import { useBase } from './withBase';
import BackIcon from './icons/BackIcon';
import CloseIcon from './icons/CloseIcon';
import { StrivveCoreMount } from '../core/core';
import SiteItem from './SiteItem';
import { errorStatus } from '../constans';

function Header({ hideJob }: { hideJob?: boolean }) {
  const { appearance, headerOptions, core } = useBase();

  const jobs = core?.jobs;
  const item = core.jobs?.[jobs.length - 1];
  const isError = errorStatus.includes(item?.termination_type || '');

  return headerOptions ? (
    <div className="headerWrapper" css={appearance.elements?.headerWrapper}>
      <div>
        {core.state.mount !== StrivveCoreMount.INTRO && (
          <div onClick={() => core.goBack()}>
            <BackIcon />
          </div>
        )}
      </div>
      {item &&
      core.state.mount === StrivveCoreMount.SELECT_SITE &&
      !hideJob &&
      !isError ? (
        <SiteItem
          item={{
            ...(item.site || {}),
            job: item,
          }}
        />
      ) : (
        <p className="headerTitle" css={appearance.elements?.headerTitle}>
          {headerOptions?.title}
        </p>
      )}
      <div onClick={headerOptions?.onClose}>
        <CloseIcon />
      </div>
    </div>
  ) : null;
}

export default Header;
