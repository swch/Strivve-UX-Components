import { APIFilter, MerchantSite, StrivveServiceInterface } from '../types';

export interface SelectSiteCoreOptions {
  service: StrivveServiceInterface;
  filter?: APIFilter;
  multiple?: boolean;
  onSubmit?: Function;
  sendEvent?: (action: string, data: any) => void;
  view?: 'list' | 'carousel' | 'linked';
}

export interface SelectSiteState {
  sites: any[];
  selected: any[];
  loading: boolean;
  search: string;
  error?: boolean;
  message?: string;
  view?: 'list' | 'carousel' | 'linked';
  filter: { top_hosts?: string; tags?: string };
}

const defaultFilter = {
  tags: 'prod,synthetic,disabled',
};

export const initialStateSelectSite = {
  sites: [],
  selected: [],
  loading: false,
  search: '',
  error: false,
  filter: defaultFilter,
};

export default class SelectSiteCore {
  service: StrivveServiceInterface;
  state: SelectSiteState = initialStateSelectSite;
  private subscriber: Function = () => {};
  private sites: MerchantSite[] = [];
  multiple?: boolean;
  private onSubmit?: Function;
  sendEvent?: (action: string, data: any) => void;

  constructor({
    service,
    filter,
    multiple,
    onSubmit,
    view,
    sendEvent,
  }: SelectSiteCoreOptions) {
    this.service = service;
    this.multiple = multiple;
    this.onSubmit = onSubmit;
    this.sendEvent = sendEvent;
    this.setState({ view });
    this.getSites(filter);
  }

  async getSites(filter?: APIFilter) {
    this.setState({ loading: true });
    try {
      await this.service.init();
      const tags =
        filter?.tags ||
        this.service.fi_detail?.config?.config?.merchant_site_tags ||
        this.state.filter.tags;
      const top_hosts =
        filter?.top_hosts ||
        this.service.fi_detail?.config?.config?.top_sites ||
        this.state.filter.top_hosts;
      const merchantFilter: any = {
        ...(filter || {}),
        tags,
        top_hosts,
      };

      const res = await this.service.getMerchantSites(merchantFilter);
      const sites = res.filter((site) => {
        const normalized_query = this.state.search.toLowerCase();
        const normalized_site_name = site.name.toLowerCase();
        return normalized_site_name.indexOf(normalized_query) >= 0;
      });
      this.sites = sites;
      this.setState({ loading: false, sites, filter: { tags, top_hosts } });
      return res;
    } catch (error: any) {
      this.setState({
        loading: false,
        error: true,
        message: error?.message,
      });
      return [];
    }
  }

  public subscribe(func: Function) {
    this.subscriber = func;
    this.notifyForm();
  }

  public submit() {
    this.onSubmit?.(this.state.selected);
  }

  changeSearch(search: string) {
    this.setState({
      search,
      sites: this.sites.filter((site) => {
        const normalized_query = search.toLowerCase();
        const normalized_site_name = site.name.toLowerCase();
        return normalized_site_name.indexOf(normalized_query) >= 0;
      }),
    });
  }

  selectItem(merchant: MerchantSite) {
    if (this.state.selected?.find((item) => item.id === merchant.id)) {
      const selected = this.state.selected.filter(
        (item: any) => item.id !== merchant.id
      );
      this.setState({ selected });
    } else {
      let selected = this.state.selected || [];
      if (this.multiple) {
        selected.push(merchant);
      } else {
        selected = [merchant];
      }
      this.setState({ selected });
    }
  }

  setView(view: 'list' | 'carousel' | 'linked') {
    this.setState({ view });
  }

  public setState(value: Partial<SelectSiteState>) {
    this.state = {
      ...this.state,
      ...value,
    };
    this.notifyForm();
  }

  private notifyForm() {
    this.subscriber(this.state);
  }
}
