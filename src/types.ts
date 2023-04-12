import { MountAccountLinkOptions, MountSelectSitesOptions } from "./component/component";
import StrivveCore from "./core/core";

export interface BaseStyle {
  primary_color: string;
  background_color: string;
  text_color: string;
  font_size: number;
  font_family: string;
  spacing_unit: number;
  border_radius: number;
  border_color: string;
}

export interface Localization {
  success_message: string;
  link_button: string;
}

export interface StrivveComponent {
  core: StrivveCore;
  mountSelectSites: (id: string, options?: MountSelectSitesOptions) => void
  unmountSelectSites: (id: string) => void;
  mountAccountLink: (id: string, options: MountAccountLinkOptions) => void
  unmountAccountLink: (id: string) => void;
}
