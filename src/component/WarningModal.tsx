/** @jsxImportSource @emotion/react */
import React from 'react';
import { useBase } from './withBase';
import Button from './Button';
import { MerchantSite } from '../types';
import AccountLinkContainer from './AccountLinkContainer';

type WarningModalProps = {
  open?: boolean;
  site?: MerchantSite;
  onClickStay?: () => void;
  onClickLeave?: () => void;
};

function WarningModal({
  open,
  site,
  onClickLeave,
  onClickStay,
}: WarningModalProps) {
  const { appearance, localization } = useBase();

  if (!open) {
    return null;
  }

  return (
    <div data-testid="modal" className="modal" css={appearance.elements?.modal}>
      <div className="modalWarning" css={appearance.elements?.modalWarning}>
        <AccountLinkContainer site={site} hide_title>
          <></>
        </AccountLinkContainer>
        <div style={{ flex: 1 }}>
          <h3 className="modalTitle" css={appearance.elements?.modalTitle}>
            {localization.logon_cancel_title}
          </h3>
          <p
            className="modalDescription"
            css={appearance.elements?.modalDescription}
          >
            {localization.logon_cancel_text}
          </p>
        </div>
        <div
          css={appearance.elements?.accountLinkFooter}
          className="accountLinkFooter"
        >
          <Button
            type="button"
            title={localization.logon_cancel_btn_leave}
            variant="outlined"
            onClick={onClickLeave}
          />
          <Button type="button" title={localization.logon_cancel_btn_stay} onClick={onClickStay} />
        </div>
      </div>
    </div>
  );
}

export default WarningModal;
