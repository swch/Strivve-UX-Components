import React from 'react';
import { useBase } from './withBase';
import { MerchantSite } from '../types';

export interface AccountLinkContainerProps {
  site?: MerchantSite
  children: React.ReactNode;
  hide_title?: boolean
}

function AccountLinkContainer({ site, children, hide_title }: AccountLinkContainerProps) {
  const { style } = useBase();
  const image = site?.images?.find((item: any) => item.width === 128);

  if (hide_title) {
    return (
      <div>{children}</div>
    )
  }

  return (
    <div
      style={{
        border: "1px solid " + style?.border_color,
        borderRadius: style?.border_radius,
        backgroundColor: style?.background_color,
        fontFamily: style?.font_family,
        marginBottom: style.spacing_unit
      }}
    >
      <div
        style={{
          padding: "4px 12px",
          borderBottom: "1px solid " + style?.border_color,
          display: "flex",
          alignItems: "center",
          height: 48,
        }}
      >
        {image ? (
          <img
            alt="Logo"
            width={40}
            src={image.url}
            style={{ marginRight: 12 }}
          />
        ) : null}
        <h1
          style={{
            fontSize: 16,
            marginBottom: 0,
            marginTop: 0,
          }}
        >
          {site?.name}
        </h1>
      </div>
      {children ? (
        <div
          style={{
            margin: 12,
          }}
        >
          {children}
        </div>
      ) : null}
    </div>
  );
}

export default AccountLinkContainer;