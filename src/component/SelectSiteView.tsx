/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import withBase, { BaseProps } from './withBase';
import SelectSiteList from './SelectSiteList';
import Loader from './Loader';
import SelectSiteCore, { SelectSiteState } from '../core/selectSiteCore';
import { mountSelectSiteViewProps } from '../types';
import SelectSiteCarousel from './SelectSiteCarousel';
import Button from './Button';
import SearchSiteView from './SearchSiteView';
import MySiteList from './MySiteList';
import Header from './Header';
import { StrivveCoreMount, StrivveCoreState } from '../core/strivveCore';
import { errorStatus } from '../constants';

export function SelectSiteView({
  options,
  core,
  appearance,
  localization,
}: BaseProps & mountSelectSiteViewProps) {
  const [state, setState] = useState<SelectSiteState>();
  const [selectSiteCore, setSelectSiteCore] = useState<SelectSiteCore>();
  const [openSearch, setOpenSearch] = useState<boolean>(false);
  const [coreState, setCoreState] = useState<StrivveCoreState>();

  useEffect(() => {
    const selectSite = core.createSelectSite(options);
    selectSite.subscribe((state: SelectSiteState) => {
      setState(state);
      options?.subscribe?.(state);
    });
    setSelectSiteCore(selectSite);

    core.subscribe((state: StrivveCoreState) => {
      setCoreState(state);
    });
  }, []);

  const handleSubmit = () => {
    selectSiteCore?.submit?.();
  };

  const jobIds = (state?.jobs || [])
    .filter((item) => item.status === 'SUCCESSFUL')
    .map((item) => item.site_id);

  const totalSuccessJob = jobIds.length || 0;
  const isHaveJob = jobIds.length > 0;

  const sites = (state?.sites || []).filter(
    (item) => !jobIds.includes(item.id)
  );
  const top_hosts = state?.filter.top_hosts
    ? typeof state.filter.top_hosts === 'string'
      ? state.filter.top_hosts.split(',')
      : []
    : [];

  const failedJobs = (state?.jobs || []).filter((item) =>
    errorStatus.includes(item?.termination_type) && !errorStatus.includes(item?.status)
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
      <Header
        hideJob={coreState?.mount === StrivveCoreMount.SELECT_SITE_LINKED}
      />
      {coreState?.mount === StrivveCoreMount.SELECT_SITE_LINKED ? null : (
        <div css={appearance.elements?.selectSiteHeader}>
          <p css={appearance.elements?.selectSiteTitle}>
            {failedJobs.length > 0 &&
            failedJobs.length === state?.jobs.length ? (
              <>
                <a
                  onClick={() => {
                    core.push(StrivveCoreMount.SELECT_SITE_LINKED);
                  }}
                  css={appearance.elements?.selectSiteTitleLink}
                >
                  {localization?.all_sites_failure_text?.replace(
                    '<n>', failedJobs.length > 1 ? failedJobs.length.toString() : ''
                  ).replace('<s>', failedJobs.length > 1 ? 's' : '')}
                </a>{' '}
              </>
            ) : isHaveJob ? (
              <>
                {}{' '}
                <a
                  onClick={() => {
                    core.push(StrivveCoreMount.SELECT_SITE_LINKED);
                  }}
                  css={appearance.elements?.selectSiteTitleLink}
                >
                  {localization?.all_sites_success_text?.replace(
                    '<n>',
                    totalSuccessJob.toString()
                  ).replace('<s>', totalSuccessJob > 1 ? 's' : '')}
                </a>
              </>
            ) : coreState?.mount === StrivveCoreMount.SELECT_SITE_LIST ? (
              localization?.all_sites_title
            ) : (
              localization?.site_selection_title
            )}
          </p>
          <div>
            {coreState?.mount === StrivveCoreMount.SELECT_SITE_LIST && (
              <button
                className="iconButton"
                css={appearance.elements?.iconButton}
                onClick={() => {
                  setOpenSearch(true);
                  core.sendEvent({
                    component: 'select_site_search',
                    action: 'view',
                  });
                }}
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 23 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="13.5"
                    cy="9.5"
                    r="8"
                    stroke={appearance.variables?.iconColor}
                    strokeWidth="3"
                  />
                  <line
                    x1="8.06066"
                    y1="16.0607"
                    x2="1.06066"
                    y2="23.0607"
                    stroke={appearance.variables?.iconColor}
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
      {coreState?.mount === StrivveCoreMount.SELECT_SITE_CAROUSEL && (
        <>
          <SelectSiteCarousel
            sites={
              top_hosts.length > 0
                ? sites.filter((item) => top_hosts.includes(item.host))
                : sites
                ? sites.filter((site) => site.tags.includes('top_notify'))
                : []
            }
            selected={state?.selected || []}
            onSelectItem={(item: any) => {
              core.sendEvent({
                component: 'select_site_carousel',
                action: 'select',
                site: item.host,
              });
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
              title={localization.site_selection_btn_all_sites}
              onClick={() => {
                core.push(StrivveCoreMount.SELECT_SITE_LIST);
                core.sendEvent({
                  component: 'select_site_carousel',
                  action: 'browse_all',
                });
              }}
              variant="outlined"
            />
          </div>
        </>
      )}

      {(coreState?.mount === StrivveCoreMount.SELECT_SITE_LIST ||
        coreState?.mount === StrivveCoreMount.SELECT_SITE_LINKED) && (
        <>
          {coreState?.mount === StrivveCoreMount.SELECT_SITE_LINKED ? (
            <MySiteList
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
                core.sendEvent({
                  component: 'select_site_list',
                  action: 'select',
                  site: item.host,
                });

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
            {!appearance.layout?.showBackButton ? null : (
              <Button
                title="Back"
                variant="text"
                onClick={() => {
                  core.push(StrivveCoreMount.SELECT_SITE_CAROUSEL);
                  core.sendEvent({
                    component: 'select_site_list',
                    action: 'back',
                  });
                }}
              />
            )}
          </div>
        </>
      )}
      {openSearch && (
        <SearchSiteView
          options={{
            ...options,
            onClose() {
              setOpenSearch(false);
              core.sendEvent({
                component: 'select_site_search',
                action: 'close',
              });
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
