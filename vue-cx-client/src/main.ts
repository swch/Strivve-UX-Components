import { createApp } from 'vue'
import Strivve from '@strivve/strivve-cx';
import './style.css'
import App from './App.vue'

const app = createApp( App );
app.provide('strivve', Strivve);

app.mount('#app')
