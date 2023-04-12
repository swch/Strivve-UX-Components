import StrivveService from "../service/service";
import { APIFilter, MerchantSite } from "../service/types";

export interface SelectSiteCoreOptions {
  service: StrivveService;
  filter?: APIFilter
  single?: boolean;
  onSubmit?: Function;
}

export interface SelectSiteState {
  sites: any[]
  selected: any[]
  loading: boolean
  search: string
}

export const initialStateSelectSite = {
  sites: [],
  selected: [],
  loading: false,
  search: ''
}

export default class SelectSiteCore {
  service: StrivveService;
  state: SelectSiteState = initialStateSelectSite;
  private subscriber: Function = () => { };
  private sites: MerchantSite[] = []
  single?: boolean;
  private onSubmit?: Function;

  constructor({ service, filter, single, onSubmit }: SelectSiteCoreOptions) {
    this.service = service;
    this.single = single;
    this.onSubmit = onSubmit;
    this.getSites(filter)
  }

  async getSites(filter?: APIFilter) {
    this.updateState({ loading: true })
    try {
      const res = await this.service.getMerchantSites(filter)
      this.sites = res;
      this.updateState({ loading: false, sites: res });
      return res
    } catch (error) {
      this.updateState({ loading: false })
      return []
    }
  }

  public subscribe(func: Function) {
    this.subscriber = func;
  }

  public submit() {
    this.onSubmit?.(this.state.selected);
  }

  changeSearch(search: string) {
    this.updateState({
      search,
      sites: this.sites.filter(site => {
        const normalized_query = search.toLowerCase();
        const normalized_site_name = site.name.toLowerCase();
        return normalized_site_name.indexOf(normalized_query) >= 0;
      })
    })
  }

  selectItem(merchant: MerchantSite) {
    if (this.state.selected?.find(item => item.id === merchant.id)) {
      const selected = this.state.selected.filter((item: any) => item.id !== merchant.id);
      this.updateState({ selected });
    } else {
      let selected = this.state.selected || [];
      if (this.single) {
        selected = [merchant];
      } else {
        selected.push(merchant);
      }
      this.updateState({ selected });
    }
  }

  private updateState(value: Partial<SelectSiteState>) {
    this.state = {
      ...this.state,
      ...value
    }

    this.notifyForm()
  }

  private notifyForm() {
    this.subscriber(this.state)
  }
}