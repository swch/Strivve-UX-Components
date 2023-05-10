/** @jsxImportSource @emotion/react */
import React from 'react';
import { useBase } from './withBase';
import { MerchantSite } from '../types';

export interface AccountLinkContainerProps {
  site?: MerchantSite
  children: React.ReactNode;
  hide_title?: boolean
}

function AccountLinkContainer({ site, children, hide_title }: AccountLinkContainerProps) {
  const { appearance } = useBase();
  const image = site?.images?.find((item: any) => item.width === 128);

  if (hide_title) {
    return (
      <div>{children}</div>
    )
  }

  return (
    <div
      className='accountLinkContainer'
      css={appearance.elements?.accountLinkContainer}
    >
      <div
        className='accountLinkHeader'
        css={appearance.elements?.accountLinkHeader}
      >
        {image ? (
          <img
            alt="Logo"
            src={image.url}
            css={appearance.elements?.accountLinkHeaderImage}
            className='accountLinkHeaderImage'
          />
        ) : null}
        <h1
          css={appearance.elements?.accountLinkHeaderTitle}
          className='accountLinkHeaderTitle'
        >
          {site?.name}
        </h1>
      </div>
      {children ? (
        <div
          className='accountLinkBody'
          css={appearance.elements?.accountLinkBody}
        >
          {children}
        </div>
      ) : null}
    </div>
  );
}

export default AccountLinkContainer;