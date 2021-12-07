<template>
    <ion-app>
        <ion-content force-overscroll="false">
            <section id="main">
                <div class="app-login">
                    <div class="app-logo">
                        <!-- <img src=""/> -->
                    </div>
                    <div class="app-login-form ion-text-center">
                        <h1>Login</h1>
                        <ion-item lines="none">
                            <!-- <ion-label position="floating">Floating Label</ion-label> -->
                            
                            <ion-input v-model="input.email" type="email" placeholder="Enter Email" required></ion-input>
                            <ion-icon  :icon="personCircleOutline" slot="start"></ion-icon>
                        </ion-item>
                        <ion-item lines="none">
                            <!-- <ion-label position="floating">Floating Label</ion-label> -->
                            <ion-icon  :icon="lockClosed" slot="start"></ion-icon>
                            <ion-input v-model="input.password" :type="passwordStatus ? 'text' : 'password'" placeholder="Enter Password" required></ion-input>
                            <ion-icon  :icon="passwordStatus ? eyeSharp : eyeOffSharp" slot="end" @click="passwordStatus = !passwordStatus"></ion-icon>

                        </ion-item>
                        <div>
                            <ion-button @click="mobileLogin" expand="block">Sign In</ion-button>
                        </div>
                    </div>
                </div>
            </section>
        </ion-content>
    </ion-app>
</template>
<script>
import {IonApp, IonContent, IonInput, IonItem, IonButton, IonIcon, toastController, loadingController } from '@ionic/vue';
import {personCircleOutline, lockClosed, eyeSharp, eyeOffSharp} from 'ionicons/icons';

export default {
    components: {
        IonApp, IonContent, IonInput, IonItem, IonButton, IonIcon, 
    },
    data:() => ({
        personCircleOutline,
        lockClosed,
        eyeSharp, 
        eyeOffSharp,
        passwordStatus: false,
        static: {
            email: 'dan@gmail.com',
            password: '1234'
        },
        input: {
            email: '',
            password: '',
        }
    }),
    methods: {
        mobileLogin(){
            console.log(this.static)
            console.log(this.input)
            if(this.static.email == this.input.email && this.static.password == this.input.password){
                this.presentLoadingWithOptions()
                // console.log('passed');
                // this.$router.push('/main')
            }
            if (this.input.email == '' && this.input.password == '') {
                this.errorToast('Please provide credentials');
            } else {
                if(this.input.email != this.static.email){
                    this.errorToast('Invalid email')
                    // console.log('una na if');
                } 
                if (this.input.password != this.static.password) {
                    this.errorToast('Invalid pass')
                    // console.log('panduwa');
                }
                if (this.input.email != this.static.email && this.input.password != this.static.password) {
                    this.errorToast('Invalid email and password')
                    // console.log('last');
                } 
            }
            
            // console.log(this.static)
            // console.log(this.input)
        },
        async errorToast(custommessage) {
            const toast = await toastController
                .create({
                header: 'There was a problem in logging in',
                message: custommessage,
                duration: 2000,
                color: 'danger',
                position: 'top',
                keyboardClose: true,
                })
            return toast.present();

        },

         async presentLoadingWithOptions() {
            const loading = await loadingController
                .create({
                spinner: 'circular',
                showBackdrop: true,
                // duration: 1000,
                translucent: true,
                });
            loading.present();
            var vm = this;
            this.$axios.post('user/login', this.input).then(({data}) => {
                localStorage.setItem("token", data.token);
                loading.dismiss();
                vm.$router.push('/main');
                // if(data.error){
                //     console.log(data)
                //     // md_error.present()
                // }
                // else{
                //     // modal_success.show
                //     console.log(data)
                // }
                console.log(data);
            })

            // setTimeout(function() {
                // loading.onDidDismiss().then(() => {
                // vm.$router.push('/main')
            // });
                
            // }, 1000);
        },
    }
}
</script>
<style>
.app-login-form {
    padding: 0 15px;
}
.app-login-form h1 {
    margin-bottom: 30px;
    font-weight: 900;
}
.app-login-form ion-button {
    margin-top: 25px;
    font-size: 18px;
    letter-spacing: 2.5px;
}
.app-login-form ion-item ion-input {
    font-size: 20px;
}
.app-login-form ion-icon {
    opacity: .5;
}
</style>