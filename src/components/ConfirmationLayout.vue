<template>
    <ion-content :color="modalColor" scroll-y="false" style="text-align:center;">
        <!-- <ion-item class="header" lines="none" :color="modalColor">
            <ion-button slot="start" fill="clear" @click="closeModal">
                <ion-icon class="closebtnicon" color="light" :icon="closeOutline" slot="icon-only"></ion-icon>
            </ion-button>
            <ion-label slot="center">{{pageTitle}}</ion-label>
        </ion-item> -->
        <!-- <div class="confirmation-content">
            <div class="confirmation-icon">
                <ion-icon :icon="iconConfirmation"></ion-icon>
                <h3>{{confirmationTitle}}</h3>
            </div>
            <div>
                <slot />
            </div>
        </div> -->
            <slot />
        <!-- <div style="padding: 0 15px; margin-top: 50px"> -->
            <ion-button @click="closeModal" expand="block" fill="outline" color="light" class="btn-close">{{btnLabel}}</ion-button>
        <!-- </div> -->
    </ion-content>
</template>
<script>
import { IonContent, /*IonButton,  IonLabel, IonItem, IonIcon */} from '@ionic/vue';
// import {closeOutline} from 'ionicons/icons';
import {modalController,} from '@ionic/vue';
export default {
    props: [
        'pageTitle',
        'modalColor',
        'btnLabel',
        'iconConfirmation',
        'confirmationTitle'
    ],
    // data:() => ({
    //     closeOutline,
    // }),
    components: {
        IonContent,
        // IonButton,
        // IonLabel,
        // IonItem,
        // IonIcon,
    },
    methods: {
        closeModal(){
            return modalController.dismiss();
        },
    },
}
</script>
<style>
.btn-close  {
    width: 100%;
    position: absolute;
    bottom: 5%;
    padding: 0 15px;
    /* margin-top: 20px; */
}
.closebtnicon {
    font-size: 50px;
}
.confirmation-content {
    margin-top: 50px;
}
.confirmation-content .confirmation-header ion-icon {
    font-size: 120px; margin: 25px auto;
}
.confirmation-content .confirmation-content h5 {
    width: 73%; margin: 15px auto;
}
</style>