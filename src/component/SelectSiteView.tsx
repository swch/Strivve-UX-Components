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

  const jobIds = (state?.jobs || [])
    .filter(
      (item) => item.status === 'SUCCESSFUL' || item.status === 'UPDATING'
    )
    .map((item) => item.site_id);

  const totalSuccessJob = jobIds.length || 0;
  const isHaveJob = jobIds.length > 0;

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
      <div css={appearance.elements?.selectSiteHeader}>
        <p css={appearance.elements?.selectSiteTitle}>
          {isHaveJob ? (
            <>
              {localization?.selectSiteTitleHaveJob}{' '}
              <a
                onClick={() => selectSiteCore?.setView('linked')}
                css={appearance.elements?.selectSiteTitleLink}
              >
                {totalSuccessJob} sites
              </a>
              , keep going!
            </>
          ) : (
            localization?.selectSiteTitle
          )}
        </p>
        <div>
          {state?.view === 'list' && (
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
      {state?.error && (
        <p
          data-testid="selectSiteErrorMessage"
          className="selectSiteErrorMessage"
        >
          {state.message}
        </p>
      )}
      {state?.view === 'carousel' && (
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
                selectSiteCore?.setView('list');
                core.sendEvent('browse_all_button - n/a - click');
              }}
              variant="outlined"
            />
          </div>
        </div>
      )}

      {(state?.view === 'list' || state?.view === 'linked') && (
        <>
          {state?.view === 'linked' ? (
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
                selectSiteCore?.setView('carousel');
                core.sendEvent(`select_site_list - n/a - back`);
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
