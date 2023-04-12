import 'regenerator-runtime/runtime';

import Strivve from "./Strivve";

if (!window.Strivve) {
  window.Strivve = new Strivve();
}

export default Strivve;