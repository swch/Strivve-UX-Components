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
  const { appearance } = useBase();

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
            We’re still trying to connect!
          </h3>
          <p
            className="modalDescription"
            css={appearance.elements?.modalDescription}
          >
            We may not be able to. Do you want to stick around and find out?
          </p>
        </div>
        <div
          css={appearance.elements?.accountLinkFooter}
          className="accountLinkFooter"
        >
          <Button
            type="button"
            title={'Leave'}
            variant="outlined"
            onClick={onClickLeave}
          />
          <Button type="button" title="Stay" onClick={onClickStay} />
        </div>
      </div>
    </div>
  );
}

export default WarningModal;
