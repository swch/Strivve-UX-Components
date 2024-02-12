<script lang="ts">
import {defineComponent, type PropType} from 'vue'
import {Appearance, CardBody, StrivveComponent, StrivveCore, StrivveService} from "@strivve/strivve-cx";

export default defineComponent({
  name: "LinkingJourney",
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
      service,
      card: this.cardData,
    });

    const component : StrivveComponent = this.Strivve.createComponent({ core, appearance: this.appearance });

    component.mountLinkingJourney('linking-journey', {
      selectSiteOptions : {},
      accountLinkOptions : {}
    })
  }
})

</script>

<template>
  <div id="linking-journey"></div>
</template>

<style scoped>

</style>