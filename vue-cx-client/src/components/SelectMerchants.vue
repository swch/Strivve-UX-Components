<template>
  <div id="select-sites"></div>
</template>

<script lang="ts">

import {Appearance, CardBody, StrivveComponent, StrivveCore, StrivveService, StrivveServiceOptions} from "@strivve/strivve-cx";
import {defineComponent} from "vue";
import type { PropType } from "vue";
import Strivve from "@strivve/strivve-cx/dist/Strivve";

export default defineComponent({
      name: "SelectMerchants",
      inject: ['strivve'],
      props: {
        apiInstance: String,
        cardData: Object as PropType<CardBody>,
        appearance: Object as PropType<Appearance>
      },
      mounted() {
        console.log("Mounted");

        const strv : Strivve = this.strivve as Strivve;
        const service : StrivveService = strv.createService(<StrivveServiceOptions>{ api_instance: this.apiInstance });
        const core : StrivveCore = strv.createCore({
          service: service,
          card: this.cardData,
        });

        const component : StrivveComponent = strv.createComponent({ core: core, appearance: this.appearance });

        component.mountSelectSiteView('select-sites', {
          onSubmit: (selected : any) => {
            alert(selected.map((item : any) => item.name).join(', '));
          },
        });
      }
    }
)

</script>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
