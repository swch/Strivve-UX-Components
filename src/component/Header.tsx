/** @jsxImportSource @emotion/react */
import React from 'react';
import { useBase } from './withBase';
import BackIcon from './icons/BackIcon';
import CloseIcon from './icons/CloseIcon';
import { StrivveCoreMount } from '../core/strivveCore';
import SiteItem from './SiteItem';
import { errorStatus } from '../constants';

function Header({ hideJob }: { hideJob?: boolean }) {
  const { appearance, headerOptions, core } = useBase();

  const jobs = core?.jobs;
  const item = core.jobs?.[jobs.length - 1];
  const isError = errorStatus.includes(item?.termination_type || '');
  const isSuccess = !isError && item?.status === 'SUCCESSFUL';

  return headerOptions ? (
    <div className="headerWrapper" css={appearance.elements?.headerWrapper}>
      <div>
        {core.state.mount !== StrivveCoreMount.INTRO &&
          core.state.mount !== StrivveCoreMount.ACCOUNT_LINK &&
          core.state.mount !== StrivveCoreMount.SELECT_SITE_CAROUSEL && (
            <div onClick={() => core.goBack()}>
              <BackIcon />
            </div>
          )}
      </div>
      {item &&
      core.state.mount.includes('select_site') &&
      !hideJob &&
      !isError &&
      !isSuccess ? (
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
      {headerOptions?.showCloseButton ? (
        <div onClick={headerOptions?.onClose}>
          <CloseIcon/>
        </div>
      ) : <span>&nbsp;</span>}
    </div>
  ) : null;
}

export default Header;
