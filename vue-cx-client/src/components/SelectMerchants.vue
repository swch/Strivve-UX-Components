<template>
  <div id="select-sites"></div>
</template>

<script lang="ts">

import {Appearance, CardBody, StrivveComponent, StrivveCore, StrivveService} from "@strivve/strivve-cx";
import {defineComponent} from "vue";
import type { PropType } from "vue";

export default defineComponent({
    name: "SelectMerchants",
    inject: {
      Strivve: {
        from: 'strivve'
      }
    },
    props: {
      apiInstance: String,
      cardData: Object as PropType<CardBody>,
      appearance: Object as PropType<Appearance>
    },
    mounted() {
      console.log("Mounted");

      const service : StrivveService = this.Strivve.createService({ api_instance: this.apiInstance });
      const core : StrivveCore = this.Strivve.createCore({
        service: service,
        card: this.cardData,
      });

      const component : StrivveComponent = this.Strivve.createComponent({ core: core, appearance: this.appearance });

      component.mountSelectSiteView('select-sites', {
        submit: (selected : any) => {
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
