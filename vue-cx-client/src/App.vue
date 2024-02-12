<template>
<!--  <SelectMerchants :api-instance="instance" :card-data="card" :appearance="appearance"/>-->
  <LinkingJourney :api-instance="instance" :card-data="card" :appearance="appearance"/>
</template>

<script lang="ts">
import SelectMerchants from "./components/SelectMerchants.vue";
import LinkingJourney from "./components/LinkingJourney.vue";
export default {
  components: {
    LinkingJourney,
    SelectMerchants
  },
  data() {
    return {
      instance: "customer-dev",
      card: {
        pan: '4111111111111111',
            cvv: '321',
            expiration_month: '2',
            expiration_year: '24',
            name_on_card: 'Mvick',
      },
      appearance: {
        layout: {
          logoImageUrl: 'https://strivve.com/wp-content/uploads/2019/09/StrivveLogoLG.png',
          appName: 'Strivve',
          showBackButton: false,
        },
        variables: {
          primaryColor: '#62d900',
          secondaryColor: '#bf9200',
          iconColor: '#5600bf',
          fontFamily: 'sans-serif',
          fontSize: '16px',
          textColor: '#000000',
          textColorSecondary: '#565656',
          borderColor: 'lightgray',
          height: '50vh',
          backgroundColor: 'rgba(178,125,19,0.4)',
        },
        elements: {
          input: {
            padding: '12px',
            border: '1px solid #D9D9D9',
            borderRadius: '5px',
            marginBottom: '12px',
            width: '-webkit-fill-available',
            ':focus-visible': {
              outlineColor: '#6BBF00',
            }
          },
          button: {
            background: 'var(--primaryColor)',
            borderRadius: '6px',
            padding: '10px 12px',
            color: 'white',
            width: '100%',
            cursor: 'pointer',
            border: '2px solid var(--primaryColorDark)',
            '&:hover': {
              background: 'var(--primaryColorDark)'
            },
            '&:disabled': {
              background: 'gray',
              border: '2px solid gray',
            }
          }
        }
      }
    }
  }
}
</script>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
