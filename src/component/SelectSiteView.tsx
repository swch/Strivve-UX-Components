/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import withBase, { BaseProps } from './withBase';
import SelectSiteList from './SelectSiteList';
import Loader from './Loader';
import SelectSiteCore, { SelectSiteState } from '../core/selectSite';
import { mountSelectSiteViewProps } from '../types';
import SelectSiteCarousel from './SelectSiteCarousel';
import Button from './Button';
import SearchSiteView from './SearchSiteView';

export function SelectSiteView({
  options,
  core,
  appearance,
  localization,
}: BaseProps & mountSelectSiteViewProps) {
  const [state, setState] = useState<SelectSiteState>();
  const [selectSiteCore, setSelectSiteCore] = useState<SelectSiteCore>();
  const [openSearch, setOpenSearch] = useState<boolean>(false);

  useEffect(() => {
    const selectSite = core.createSelectSite(options);
    selectSite.subscribe((state: SelectSiteState) => {
      setState(state);
      options?.subscribe?.(state);
    });
    setSelectSiteCore(selectSite);
  }, []);

  const handleSubmit = () => {
    selectSiteCore?.submit?.();
  };

  const isHaveJob = core.jobs?.length > 0;
  const jobIds = (core.jobs || []).map((item) => item.site_id);

  const sites = (state?.sites || []).filter(
    (item) => !jobIds.includes(item.id)
  );

  if (state?.loading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: 120,
        }}
      >
        <Loader />
      </div>
    );
  }

  return (
    <div
      data-testid="selectSiteView"
      className="selectSiteView"
      css={appearance.elements?.selectSiteView}
    >
      {isHaveJob && state?.step === 2 ? (
        <div css={appearance.elements?.tabContainer}>
          <button
            css={
              state?.tab === 2
                ? appearance.elements?.tabItemActive
                : appearance.elements?.tabItem
            }
            onClick={() => {
              selectSiteCore?.setTab(2);
              core.sendEvent('your_sites_button - n/a - click');
            }}
          >
            Your Sites
          </button>
          <button
            css={
              state?.tab === 1
                ? appearance.elements?.tabItemActive
                : appearance.elements?.tabItem
            }
            onClick={() => {
              selectSiteCore?.setTab(1);
              core.sendEvent('more_sites_button - n/a - click');
            }}
          >
            More Sites
          </button>
        </div>
      ) : (
        <div css={appearance.elements?.selectSiteHeader}>
          <p css={appearance.elements?.selectSiteTitle}>
            {isHaveJob
              ? localization?.selectSiteTitleHaveJob
              : localization?.selectSiteTitle}
          </p>
          <div>
            {state?.step === 2 && (
              <button
                className="iconButton"
                css={appearance.elements?.iconButton}
                onClick={() => {
                  setOpenSearch(true);
                  core.sendEvent(`select_site_search - n/a - view`);
                }}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 23 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="13.5"
                    cy="9.5"
                    r="8"
                    stroke="#6BBF00"
                    strokeWidth="3"
                  />
                  <line
                    x1="8.06066"
                    y1="16.0607"
                    x2="1.06066"
                    y2="23.0607"
                    stroke="#6BBF00"
                    strokeWidth="3"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>
      )}
      {state?.error && (
        <p
          data-testid="selectSiteErrorMessage"
          className="selectSiteErrorMessage"
        >
          {state.message}
        </p>
      )}
      {options?.view !== 'list' && state?.step === 1 && (
        <div style={{ width: '100%' }}>
          <SelectSiteCarousel
            sites={
              sites
                ? sites.filter((site) => site.tags.includes('top_notify'))
                : []
            }
            selected={state?.selected || []}
            onSelectItem={(item: any) => {
              core.sendEvent(`select_site_carousel - ${item.host} - select`);
              if (options?.multiple) {
                selectSiteCore?.selectItem(item);
              } else {
                selectSiteCore?.selectItem(item);
                handleSubmit();
              }
            }}
            sendEvent={(a) => core.sendEvent(a)}
          />
          <div css={appearance.elements?.selectSiteCarouselFooter}>
            <Button
              title="Browse all sites"
              onClick={() => {
                selectSiteCore?.setStep(2);
                selectSiteCore?.setTab(1);
                core.sendEvent('browse_all_button - n/a - click');
              }}
              variant="outlined"
            />
            {isHaveJob && (
              <Button
                onClick={() => {
                  selectSiteCore?.setStep(2);
                  selectSiteCore?.setTab(2);
                  core.sendEvent('my_sites_button - n/a - click');
                }}
                title="My Sites"
                variant="text"
              />
            )}
          </div>
        </div>
      )}

      {(options?.view === 'list' || state?.step === 2) && (
        <>
          {state?.tab === 2 ? (
            <SelectSiteList
              key="my-sites"
              id="my-site"
              sites={
                core.jobs?.map((item) => ({
                  ...(item.site || {}),
                  job: item,
                })) || []
              }
              selected={[]}
              onSelectItem={(item: any) => {}}
            />
          ) : (
            <SelectSiteList
              key="sites"
              sites={sites || []}
              selected={state?.selected || []}
              onSelectItem={(item: any) => {
                core.sendEvent(`select_site_list - ${item.host} - select`);

                if (options?.multiple) {
                  selectSiteCore?.selectItem(item);
                } else {
                  selectSiteCore?.selectItem(item);
                  handleSubmit();
                }
              }}
              sendEvent={(a) => core.sendEvent(a)}
            />
          )}

          <div
            className="selectSiteListFooter"
            css={appearance.elements?.selectSiteListFooter}
          >
            <Button
              title="Back"
              variant="text"
              onClick={() => {
                selectSiteCore?.setStep(1);
                core.sendEvent('click_back_to_carousel');
              }}
            />
          </div>
        </>
      )}
      {openSearch && (
        <SearchSiteView
          options={{
            ...options,
            onClose() {
              setOpenSearch(false);
              core.sendEvent(`select_site_search - n/a - cancel`);
            },
          }}
          appearance={appearance}
          localization={localization}
          core={core}
        />
      )}
    </div>
  );
}

export default withBase(SelectSiteView);
