import { APIFilter, MerchantSite, StrivveServiceInterface } from '../types';

export interface SelectSiteCoreOptions {
  service: StrivveServiceInterface;
  filter?: APIFilter;
  multiple?: boolean;
  onSubmit?: Function;
  step?: number;
  tab?: number;
  view?: 'list' | 'carousel';
}

export interface SelectSiteState {
  sites: any[];
  selected: any[];
  loading: boolean;
  search: string;
  error?: boolean;
  message?: string;
  step: number;
  tab: number;
}

export const initialStateSelectSite = {
  sites: [],
  selected: [],
  loading: false,
  search: '',
  error: false,
  step: 1,
  tab: 1,
};

export default class SelectSiteCore {
  service: StrivveServiceInterface;
  state: SelectSiteState = initialStateSelectSite;
  private subscriber: Function = () => {};
  private sites: MerchantSite[] = [];
  multiple?: boolean;
  private onSubmit?: Function;

  constructor({
    service,
    filter,
    multiple,
    onSubmit,
    step,
    tab,
  }: SelectSiteCoreOptions) {
    this.service = service;
    this.multiple = multiple;
    this.onSubmit = onSubmit;
    this.setState({ step: step || 1, tab: tab || 1 });
    this.getSites(filter);
  }

  async getSites(filter?: APIFilter) {
    this.setState({ loading: true });
    try {
      const res = await this.service.getMerchantSites(filter);
      const sites = res.filter((site) => {
        const normalized_query = this.state.search.toLowerCase();
        const normalized_site_name = site.name.toLowerCase();
        return normalized_site_name.indexOf(normalized_query) >= 0;
      });
      this.sites = sites;
      this.setState({ loading: false, sites });
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

  setStep(step: number) {
    this.setState({ step });
  }

  setTab(tab: number) {
    this.setState({ tab });
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
