<script lang="ts">
import {defineComponent, type PropType} from 'vue'
import {
  Appearance,
  CardBody,
  StrivveComponent,
  StrivveCore,
  StrivveCoreMount,
  StrivveService,
  StrivveServiceOptions
} from "@strivve/strivve-cx";
import Strivve from "@strivve/strivve-cx/dist/Strivve";

export default defineComponent({
  name: "LinkingJourney",
  inject: ['strivve'],
  props: {
    apiInstance: String,
    cardData: Object as PropType<CardBody>,
    appearance: Object as PropType<Appearance>
  },
  async mounted() {
    console.log("Mounted");

    const strv : Strivve = this.strivve as Strivve;
    const service : StrivveService = strv.createService(<StrivveServiceOptions>{ api_instance: this.apiInstance });
    await service.waitForLogin();

    const core : StrivveCore = strv.createCore({
      service,
      card: this.cardData,
      mount: StrivveCoreMount.SELECT_SITE_CAROUSEL
    });

    const component : StrivveComponent = strv.createComponent({ core, appearance: this.appearance });

    component.mountLinkingJourney('linking-journey', {
      selectSiteOptions : {},
      accountLinkOptions : {site_id : "1"},
      headerOptions: {
        title: 'My Bank',
        showCloseButton: false,
        onClose: () => {
          // console.log(stv);
          // component.unmountLinkingJourney("");
        },
      }
    })
  }
})

</script>

<template>
  <div id="linking-journey"></div>
</template>

<style scoped>

</style>