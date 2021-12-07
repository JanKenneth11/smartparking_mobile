<template>
  <ion-app>
    <Menu></Menu>
    <ion-router-outlet id="main-content"/>
  </ion-app>
</template>

<script>
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import Menu from './views/MainPages/Menu.vue';
import { QRScanner } from '@ionic-native/qr-scanner';

export default {
  name: 'App',
  components: {
    IonApp,
    IonRouterOutlet,
    Menu,
  },
  mounted() {
    QRScanner.prepare(this.onDone); // show the prompt
  },
  methods : {
    onDone(err, status){
      if (err) {
      // here we can handle errors and clean up any loose ends.
      console.error(err);
      }
      if (status.authorized) {
        // W00t, you have camera access and the scanner is initialized.
        // QRscanner.show() should feel very fast.
      } else if (status.denied) {
      // The video preview will remain black, and scanning is disabled. We can
      // try to ask the user to change their mind, but we'll have to send them
      // to their device settings with `QRScanner.openSettings()`.
      } else {
        // we didn't get permission, but we didn't get permanently denied. (On
        // Android, a denial isn't permanent unless the user checks the "Don't
        // ask again" box.) We can ask again at the next relevant opportunity.
      }
    }
  }
};
</script>