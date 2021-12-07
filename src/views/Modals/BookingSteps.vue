<template>
    <ion-header class="ion-no-border modal-header">
        <ion-toolbar>
            <ion-button @click="closeModal" slot="start" fill="clear" color="dark">
                <ion-icon slot="icon-only" :icon="chevronBackOutline"></ion-icon>
            </ion-button>
            <h2>Book a parking slot</h2>
        </ion-toolbar>
    </ion-header>
    <ion-content>
        <ion-card>
            <ion-card-content>
                <span>Selected Slot: <strong>{{slotConfirmation.slotNum}}</strong></span>
            </ion-card-content>
        </ion-card>
        <div class="confirmation-datetime">
            <ion-label>
                <ion-icon :icon="calendarOutline"></ion-icon>
                <span style="margin-left: 10px">Date and Time</span>
            </ion-label>
            <ion-card>
                <ion-card-content>
                    <!-- <ion-item lines="none">
                        <ion-label>Pick a Date</ion-label>
                        <ion-datetime value="" min="1990-02" max="2000"
                        :day-short-names="customDayShortNames"
                        display-format="DDDD MMM DD, YY"
                        month-short-names="jan, feb, mar, apr, may, jun, jul, aug, sep, oct, nov, dec"></ion-datetime>
                    </ion-item>
                    <ion-item lines="none">
                        <ion-label>Time</ion-label>
                        <ion-datetime display-format="HH:mm"></ion-datetime>
                    </ion-item> -->
                    <div>
                    </div>
                </ion-card-content>
            </ion-card>
        </div>
        <div class="place-btn">
            <ion-button @click="confirmSlot" expand="block" size="large" color="dark">Place Spot</ion-button>
        </div>
    </ion-content>
</template>
<script>
import {
    modalController,
    loadingController,
    IonHeader,
    IonToolbar,
    IonButton,
    IonIcon,
    IonContent,
    IonCard,
    IonCardContent,
    IonLabel
    // DatePickerPluginInterface,
} from '@ionic/vue';
import { chevronBackOutline, calendarOutline } from 'ionicons/icons';
// import { QRScanner } from '@ionic-native/qr-scanner';
import ModalSuccess from '/src/views/Modals/BookSuccess.vue';
import ModalFailed from '/src/views/Modals/BookFailed.vue';

export default {
    name: 'Modal',
    props: {
        slotConfirmation: {
            required: true,
            type: Object,
        }
    },
    components: {
        IonHeader,
        IonToolbar,
        IonButton,
        IonIcon,
        IonContent,
        IonCard,
        IonCardContent,
        IonLabel
    },
    data: () => ({
        chevronBackOutline,
        calendarOutline,
    }),
    ionViewWillEnter () {
        console.log(this.slotConfirmation)
    },
    mounted (){
        // var admin = this.reviews.replies;
        console.log(this.slotConfirmation);
    },
    methods : {
        closeModal(){
          return modalController.dismiss();
        },
        // displayContents(err, text) {
        //     if(err){
        //         // an error occurred, or the scan was canceled (error code `6`)
        //     } else {
        //         // The scan completed, display the contents of the QR code:
        //         alert(text);
        //     }
        // },
        // test(){
        //     QRScanner.scan(this.displayContents());
        // },
        confirmSlot(){
            this.presentLoadingWithOptions();
        },

        async presentLoadingWithOptions() {
            const loading = await loadingController
                .create({
                spinner: 'circular',
                showBackdrop: true,
                // duration: 1000,
                translucent: true,
                });
                var vm = this;
            loading.present();

            setTimeout(function() {
                loading.dismiss();
                var status = true;

                if(status) {
                    vm.openSuccess();
                } else {
                    vm.openFailed();
                }
                
            }, 1000);
        },

        async openSuccess() 
        {
            const modal = await modalController
                .create({
                component: ModalSuccess,
                    componentProps: {
                        slotInfo: this.slotConfirmation,
                    },
                })
            var vm = this;
            modal.onDidDismiss()
            .then(() => {
                // this.test()
                vm.$router.push('/myreservations');
                modalController.dismiss();
                // console.log('gumawas ine');
            });
            return modal.present();
        },
        async openFailed() 
        {
            const modal = await modalController
                .create({
                component: ModalFailed,
                    componentProps: {
                        slotInfo: this.slotConfirmation,
                    },
                })
            modal.onDidDismiss()
            .then(() => {
                // this.test()
                // modalController.dismiss();
                // console.log('gumawas ine');
            });
            return modal.present();
        },
    }
}
</script>
<style>
    .modal-header h2 {
        font-size: 28px;
        margin: 0;
        padding: 20px 0;
        font-weight: 900;
    }
    .modal-header ion-button>button{
        font-size: 16px;
        padding: 0;
    }
    .modal-header ion-button>button.button-native{
        padding: 0;

    }
    .confirmation-datetime ion-label {
        margin: 0 15px;
        display: flex !important;
        align-items: center;
    }
    .confirmation-datetime ion-icon {
        font-size: 25px;
    }
    .confirmation-datetime ion-icon {
        margin-left: 10px;
    }
    .confirmation-datetime ion-card {
        margin:10px 15px;
    }
</style>