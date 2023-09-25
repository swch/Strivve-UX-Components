/** @jsxImportSource @emotion/react */
import React from 'react';
import { useBase } from './withBase';
import { MerchantSite } from '../types';

export interface AccountLinkContainerProps {
  site?: MerchantSite;
  children: React.ReactNode;
  hide_title?: boolean;
}

function AccountLinkContainer({
  site,
  children,
  hide_title,
}: AccountLinkContainerProps) {
  const { appearance, localization } = useBase();
  const image = site?.images?.find((item: any) => item.width === 128);
  const appName = appearance.layout?.appName || '';

  return (
    <div
      className={hide_title ? "" : "accountLinkContainer"}
      css={hide_title ? null : appearance.elements?.accountLinkContainer}
    >
      {!hide_title && (
        <>
          <h3
            className="accountLinkHeaderTitle"
            css={appearance.elements?.accountLinkHeaderTitle}
          >
            {localization.accountLinkTitle}
          </h3>
          <p
            className="accountLinkHeaderDescription"
            css={appearance.elements?.accountLinkHeaderDescription}
          >
            {localization.accountLinkDescription?.replace('{appName}', appName)}
          </p>
        </>
      )}
      <div
        data-testid="accountLinkHeader"
        className="accountLinkHeader"
        css={appearance.elements?.accountLinkHeader}
      >
        <div
          className="accountLinkHeaderImageWrapper"
          css={appearance.elements?.accountLinkHeaderImageWrapper}
        >
          {appearance.layout?.logoImageUrl && (
            <img
              alt="Logo"
              src={appearance.layout?.logoImageUrl}
              css={appearance.elements?.accountLinkHeaderImage}
              className="accountLinkHeaderImage"
            />
          )}
        </div>
        <svg
          width="20"
          height="3"
          viewBox="0 0 20 3"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line
            x1="0.00286993"
            y1="1"
            x2="19.8663"
            y2="1.05701"
            stroke="black"
            strokeWidth="2"
            strokeDasharray="2 2"
          />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="36"
          viewBox="0 -960 960 960"
          width="36"
        >
          <path
            fill="#6BBF00"
            d="M220-80q-24.75 0-42.375-17.625T160-140v-434q0-24.75 17.625-42.375T220-634h70v-96q0-78.85 55.606-134.425Q401.212-920 480.106-920T614.5-864.425Q670-808.85 670-730v96h70q24.75 0 42.375 17.625T800-574v434q0 24.75-17.625 42.375T740-80H220Zm0-60h520v-434H220v434Zm260.168-140Q512-280 534.5-302.031T557-355q0-30-22.668-54.5t-54.5-24.5Q448-434 425.5-409.5t-22.5 55q0 30.5 22.668 52.5t54.5 22ZM350-634h260v-96q0-54.167-37.882-92.083-37.883-37.917-92-37.917Q426-860 388-822.083 350-784.167 350-730v96ZM220-140v-434 434Z"
          />
        </svg>
        <svg
          width="20"
          height="3"
          viewBox="0 0 20 3"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line
            x1="0.00286993"
            y1="1"
            x2="19.8663"
            y2="1.05701"
            stroke="black"
            strokeWidth="2"
            strokeDasharray="2 2"
          />
        </svg>

        <div
          className="accountLinkHeaderImageWrapper"
          css={appearance.elements?.accountLinkHeaderImageWrapper}
        >
          {image ? (
            <img
              alt="Site Logo"
              src={image.url}
              css={appearance.elements?.accountLinkHeaderImage}
              className="accountLinkHeaderImage"
            />
          ) : null}
        </div>
      </div>
      {children ? (
        <div
          className="accountLinkBody"
          css={appearance.elements?.accountLinkBody}
        >
          {children}
        </div>
      ) : null}
    </div>
  );
}

export default AccountLinkContainer;
