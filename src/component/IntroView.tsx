/** @jsxImportSource @emotion/react */
import React from 'react';
import withBase, { BaseProps } from './withBase';
import Button from './Button';
import TimeIcon from './icons/TimeIcon';
import StepOneIcon from './icons/StepOneIcon';
import StepTwoIcon from './icons/StepTwoIcon';
import { StrivveCoreMount } from '../core/core';
import { mountIntroViewProps } from '../types';

function IntroView({
  localization,
  appearance,
  core,
  options,
}: mountIntroViewProps & BaseProps) {
  return (
    <div css={appearance.elements?.introView} className="introView">
      <p css={appearance.elements?.introTitle} className="introTitle">
        {localization.introTitle}
      </p>
      <div
        css={appearance.elements?.introIconWrapper}
        className="introIconWrapper"
      >
        <TimeIcon />
        <p>{localization.introIconText}</p>
      </div>

      <div>
        <p css={appearance.elements?.introStepTitle} className="introStepTitle">
          {localization.introStepTitle}
        </p>
        <div
          css={appearance.elements?.introStepWrapper}
          className="introStepWrapper"
        >
          <div>
            <div
              css={appearance.elements?.introStepIconWrapper}
              className="introStepIconWrapper"
            >
              <StepOneIcon /> {localization.introStepOne}
            </div>
            <div
              css={appearance.elements?.introStepDescription}
              className="introStepDescription"
            >
              {localization.introStepOneDescription}
            </div>
          </div>
          <div>
            <div
              css={appearance.elements?.introStepIconWrapper}
              className="introStepIconWrapper"
            >
              <StepTwoIcon /> {localization.introStepTwo}
            </div>
            <div
              css={appearance.elements?.introStepDescription}
              className="introStepDescription"
            >
              {localization.introStepTwoDescription}
            </div>
          </div>
        </div>
        {options?.banner && (
          <div
            onClick={options.onClickBanner}
          >
            <img
              alt="banner"
              src={options.banner}
              css={appearance.elements?.introStepBanner}
              className="introStepBanner"
            />
          </div>
        )}
        <div
          css={appearance.elements?.introStepButtonWrapper}
          className="introStepButtonWrapper"
        >
          <Button
            title={localization.introButtonText}
            onClick={options?.onClickButton}
          />
        </div>
      </div>
    </div>
  );
}

export default withBase(IntroView);
