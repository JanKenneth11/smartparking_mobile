<template>
    <ion-menu side="start" type="overlay" menu-id="app-menu" content-id="main-content">
        <!-- <ion-header>
            <ion-toolbar>
                
                <ion-title>PROFILE</ion-title>
            </ion-toolbar>
        </ion-header> -->
        <ion-content class="menu-content" scroll-y="false">
            <ion-button @click="closeMenu" fill="clear" class="close-btn" color="light">
                <ion-icon slot="icon-only" :icon="closeOutline"></ion-icon>
            </ion-button>
            <div class="user-profile">
                <ion-avatar>
                    <ion-img src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y"></ion-img>
                </ion-avatar>
                <div>
                    <h4>{{$store.getters.user.name}}</h4>
                    <span>{{$store.getters.user.email}}</span>
                </div>
                
            </div>
            <ion-list lines="none">
                    <ion-button @click="openSettings" fill="clear" color="dark">
                        <ion-icon :icon="settingsOutline" slot="start" color="dark"></ion-icon>
                        Settings
                    </ion-button>
                    <ion-button @click="openMyReservations" fill="clear" color="dark">
                        <ion-icon :icon="bookmarksOutline" slot="start" color="dark"></ion-icon>
                        My Reservations
                    </ion-button>
                    <ion-button fill="clear" color="dark">
                        <ion-icon :icon="helpCircleOutline" slot="start" color="dark"></ion-icon>
                        <a href="mailto:vjankenneth@gmail.com">Help</a>
                    </ion-button>
                    <ion-button fill="clear" color="dark">
                        <ion-icon :icon="informationCircleOutline" slot="start" color="dark"></ion-icon>
                        About
                    </ion-button>
                    
                    <ion-button fill="clear" color="dark" @click="logoutConfirmation">
                        <ion-icon :icon="logOutOutline" slot="start" color="dark"></ion-icon>
                        Log Out
                    </ion-button>
                    
            </ion-list>
        </ion-content>
    </ion-menu>
</template>

<script>
import {
  menuController,
  alertController
} from "@ionic/vue";
import { closeOutline, logOutOutline, settingsOutline, bookmarksOutline, informationCircleOutline, helpCircleOutline} from 'ionicons/icons';

export default {
    setup() {
        
    },
    data: () => ({
        closeOutline,
        logOutOutline,
        settingsOutline,
        bookmarksOutline,
        informationCircleOutline,
        helpCircleOutline,
        user: {},
    }),
    components: {

    },
     ionViewWillEnter () {
          console.log(this.$store.getters.user);
         //   this.setCustomer()
        // this.user = this.$store.getters.user;
        //  console.log(this.user);
    },
    mounted() {
        console.log(this.$store.getters.user);
        // this.setCustomer()
    },
    methods: {
        
        closeMenu(){
            menuController.close("app-menu");
            //   this.$router.push(url);
        },
        openSettings(){
            console.log('oks');
            menuController.close("app-menu");
            this.$router.push('/settings');
        },
        openMyReservations(){
            console.log('oks');
            menuController.close("app-menu");
            this.$router.push('/myreservations');
        },
        async logoutConfirmation() {
            const alert = await alertController
                .create({
                // cssClass: 'my-custom-class',
                header: 'Logout',
                message: 'Are you sure you want to logout?',
                buttons: [
                    {
                        text: 'Cancel',
                        handler: (data) => {
                            console.log(data);
                        }
                    },
                    {
                        text: 'Logout',
                        handler: () => {
                            // console.log(data);
                            this.$axios.post('user/v1/logout').then(({data}) => {
                                if(data){
                                    console.log(data);
                                    localStorage.removeItem("token")
                                    this.$router.push('/login')
                                    // menuController.close("customer");

                                }
                            })

                        }
                    },
                ],
                });
            await alert.present();
        },
    }
}
</script>
<style>
    .user-profile {
        display: flex;
        align-items: center;
        padding: 100px 20px 30px;
        background: #222428;
        color: #fff;
    }
    .user-profile>div {
        margin-left: 10px;
        line-height: 0.7;
    }
    .user-profile>div h4{
        margin: 0;
    }
    .menu-content .close-btn {
        position: absolute;
        right: 0;
    }
    .menu-content ion-list {
        margin-top: 20px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }
</style>