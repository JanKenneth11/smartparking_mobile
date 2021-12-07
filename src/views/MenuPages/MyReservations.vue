<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-back-button default-href="/main" slot="start"></ion-back-button>
                <ion-title>My Reservations</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <ion-card>
                <ion-card-header>
                    <ion-card-title style=" font-size: 20px;">SLOT ID: 12kou1z</ion-card-title>
                    <ion-card-subtitle>
                        <div><strong>Department: </strong> CET</div>
                        <div><strong>Slot Number: </strong> H1 237</div>
                    </ion-card-subtitle>
                </ion-card-header>
                <ion-card-content>
                    <ion-grid>
                        <ion-row style="justify-content: space-around;">
                            <ion-button fill="clear" color="danger">CANCEL</ion-button>
                            <ion-button fill="clear" color="secondary" @click="test">SCAN QR</ion-button>
                        </ion-row>
                    </ion-grid>
                </ion-card-content>
            </ion-card>
        </ion-content>
    </ion-page>
</template>
<script>
import {IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardContent, IonBackButton, IonCardTitle, IonCardSubtitle, IonButton, IonRow, IonGrid } from '@ionic/vue';
import { QRScanner } from '@ionic-native/qr-scanner';

export default {
    setup() {
        
    },
    components: {
        IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardContent, IonBackButton, IonCardTitle, IonCardSubtitle, IonButton, IonRow, IonGrid
    },
    methods: {
        displayContents(err, text) {
            if(err){
                // an error occurred, or the scan was canceled (error code `6`)
                console.log(err);
            } else {
                // The scan completed, display the contents of the QR code:
                console.log(text);
            }
        },
        test(){
            QRScanner.scan(this.displayContents());
        },
    },
}
</script>