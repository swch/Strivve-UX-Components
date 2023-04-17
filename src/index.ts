import 'regenerator-runtime/runtime';

import Strivve from "./Strivve";

if (!window.Strivve) {
  window.Strivve = new Strivve();
}

export * from './types';

export * from './service/service';
export { default as StrivveService } from './service/service';

export * from './core/core';
export { default as StrivveCore } from './core/core';

export * from './component/component';
export { default as StrivveComponent } from './component/component';

export default Strivve;