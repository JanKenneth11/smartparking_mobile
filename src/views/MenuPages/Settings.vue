<template>
    <ion-page @ionDidOpen="userInfo">
        <ion-header>
            <ion-toolbar>
                <ion-back-button default-href="/main" slot="start"></ion-back-button>
                <ion-title>Settings</ion-title>
                <ion-button @click="updateUserInfo" slot="end" fill="clear">Done</ion-button>
            </ion-toolbar>
        </ion-header>
        <ion-content color="light">
            <div class="account-settings">
                <div class="account-header" style="text-align: center;">
                    <h3><strong>Account</strong></h3>
                </div>
                <ion-card>
                    <ion-item lines="none">
                        <ion-icon  :icon="cardOutline" slot="start"></ion-icon>
                        <ion-input @ionInput="updateUser.name = $event.target.value;" :value="$store.getters.user.name"></ion-input>
                    </ion-item>
                    <ion-item lines="none">
                        <ion-icon  :icon="mail" slot="start"></ion-icon>
                        <ion-input @ionInput="updateUser.email = $event.target.value;" :value="$store.getters.user.email"></ion-input>
                    </ion-item>
                    <!-- <ion-item lines="none">
                        <ion-icon  :icon="lockClosed" slot="start"></ion-icon>
                        <ion-input :value="$store.getters.user.email" placeholder="Password" type="password"></ion-input>
                    </ion-item>
                    <ion-item lines="none">
                        <ion-icon  :icon="calendar" slot="start"></ion-icon>
                        <ion-input :value="$store.getters.user.email" placeholder="Birthdate"></ion-input>
                    </ion-item> -->
                    <!-- <ion-item lines="none">
                        <ion-icon  :icon="transgender" slot="start"></ion-icon>
                        <ion-input :value="$store.getters.user.gender" placeholder="Gender"></ion-input>
                    </ion-item> -->
                    <!-- <ion-item lines="none">
                        <ion-icon  :icon="earth" slot="start"></ion-icon>
                        <ion-input placeholder="Language"></ion-input>
                    </ion-item> -->
                </ion-card>
            </div>
        </ion-content>
    </ion-page>
</template>
<script>
import {IonPage, IonHeader, IonBackButton, IonTitle, IonToolbar, IonContent, IonInput, IonItem, IonButton, IonIcon, IonCard, /* toastController, loadingController */ } from '@ionic/vue';
import {cardOutline, mail, lockClosed, transgender, calendar} from 'ionicons/icons';

export default {
    setup() {
        
    },
    data:() => ({
        cardOutline, mail, lockClosed, transgender, calendar,
        updateUser: {
            name: '',
            email: '',
        },
    }),
    ionViewWillEnter () {
      console.log(this.$store.getters.user);
    //   this.setCustomer()
    },
    mounted() {
        console.log(this.$store.getters.user);
        // this.setCustomer()
    },
    components: {
        IonPage, IonHeader, IonBackButton, IonTitle, IonToolbar, IonContent, IonInput, IonItem, IonButton, IonIcon, IonCard,
    },
    watch: {
        updateUser : {
        handler(val) {
            console.log(val.name,"name")
            console.log(val.email,"email")
        },
        deep : true,
        }
    },
    methods: {
        userInfo(){
            let temp = JSON.parse(JSON.stringify(this.$store.getters.user))
            this.updateUser.name = temp.name 
            this.updateUser.email = temp.email   
        },
        updateUserInfo(){
            console.log(this.updateUser);
        },
    }
}
</script>