/** @jsxImportSource @emotion/react */
import React from 'react';
import withBase, { BaseProps } from './withBase';
import Button from './Button';
import TimeIcon from './icons/TimeIcon';
import StepOneIcon from './icons/StepOneIcon';
import StepTwoIcon from './icons/StepTwoIcon';
import { mountIntroViewProps } from '../types';
import Header from './Header';

function IntroView({
  localization,
  appearance,
  core,
  options,
}: mountIntroViewProps & BaseProps) {
  return (
    <>
      <div css={appearance.elements?.introView} className="introView">
        <div>
          <Header />
          <p css={appearance.elements?.introTitle} className="introTitle">
            {localization.intro_title}
          </p>
          <div
            css={appearance.elements?.introIconWrapper}
            className="introIconWrapper"
          >
            <TimeIcon />
            <p>{localization.intro_icon_text}</p>
          </div>
          <p
            css={appearance.elements?.introStepTitle}
            className="introStepTitle"
          >
            {localization.intro_step_title}
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
                <StepOneIcon /> {localization.intro_step_one}
              </div>
              <div
                css={appearance.elements?.introStepDescription}
                className="introStepDescription"
              >
                {localization.intro_step_one_description}
              </div>
            </div>
            <div>
              <div
                css={appearance.elements?.introStepIconWrapper}
                className="introStepIconWrapper"
              >
                <StepTwoIcon /> {localization.intro_step_two}
              </div>
              <div
                css={appearance.elements?.introStepDescription}
                className="introStepDescription"
              >
                {localization.intro_step_two_description}
              </div>
            </div>
          </div>
          {options?.banner && (
            <div onClick={options.onClickBanner}>
              <img
                alt="banner"
                src={options.banner}
                css={appearance.elements?.introStepBanner}
                className="introStepBanner"
              />
            </div>
          )}
        </div>
        <div
          css={appearance.elements?.introStepButtonWrapper}
          className="introStepButtonWrapper"
        >
          <Button
            title={localization.intro_btn}
            onClick={options?.onClickButton}
          />
        </div>
      </div>
    </>
  );
}

export default withBase(IntroView);
