<template>
    <ion-page>
        <ion-header class="ion-no-border">
            <ion-toolbar class="ion-no-border book-slot-toolbar" color="light">
                <ion-col slot="start" size="6">
                    <ion-thumbnail @click="openMenu">
                        <img style="border-radius: 10px;" src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y">
                    </ion-thumbnail>
                </ion-col>
                <!-- <ion-button @click="openMenu" slot="start" fill="outline" color="light">
                    <ion-icon :icon="menuOutline" slot="icon-only" color="dark"></ion-icon>
                </ion-button> -->
                <!-- <div class="user-details_simple">
                    <h5>Daniel Batican</h5>
                    <span>Student</span>
                </div> -->
                <!-- <ion-title>Test</ion-title> -->
                <ion-col slot="end" size="6">
                    <ion-label>Department</ion-label>
                    <ion-select v-model="selectedDep" interface="popover" >
                        <ion-select-option v-for="department in departments" :key="department.id"  :value="department.id">{{department.abbv}}</ion-select-option>
                    </ion-select>
                </ion-col>
            </ion-toolbar>
           
        </ion-header>
         <ion-content color="dark" force-overscroll="true" overflow-scroll="true">
             <div class="segment">
                 <ion-segment color="light">
                    <ion-segment-button value="0">
                        <ion-label>Automobile</ion-label>
                    </ion-segment-button>
                    <ion-segment-button value="1">
                        <ion-label>Motorcycle</ion-label>
                    </ion-segment-button>
                </ion-segment>
             </div>
             <ion-item detail="false" class="slot-filter" lines="none" color="light">
                <!-- <ion-col size="4">
                    <ion-label>Department</ion-label>
                    <ion-select v-model="selectedDep" interface="popover" >
                        <ion-select-option v-for="department in departments" :key="department.id"  :value="department.id">{{department.name}}</ion-select-option>
                    </ion-select>
                </ion-col> -->
                <!-- <ion-col size="6">
                    <ion-label>Parking lot</ion-label>
                    <ion-select interface="popover">
                        <ion-select-option v-for="slot in parkingSpot" :key="slot.id" :value="slot.id">{{slot.parking_number}}</ion-select-option>
                    </ion-select>
                </ion-col> -->
                <ion-col>
                    <ion-label>Status</ion-label>
                    <p style="margin:0;">Available</p>
                </ion-col>
            </ion-item>
            <section id="main_">    
                <ion-grid class="ion-text-center park-listing">
                    <ion-row>
                        <ion-col size="5" class="parking-left-top" style="border-right: 1px solid #5d6974"></ion-col>
                        <ion-col size="5" class="parking-right-top" style="border-left: 1px solid #5d6974"></ion-col>
                        <ion-col size="5"  v-for="(slot,i) in parkingSpot" :key="slot.id">
                            <div class="avail" v-if="slot.status == 1">
                                <ion-button class="loii-btn" expand="block" :color="slot.selected ? 'light' : 'primary'" @click="buttonState(i)"><ion-label>{{slot.parking_number}}</ion-label></ion-button>
                            </div>
                            <div class="occu" v-else-if="slot.status == 2">
                                <!-- <ion-button expand="block"><ion-label>{{slot.slotNum}}</ion-label></ion-button> -->
                                <ion-img src="../assets/img/car.png"></ion-img>
                            </div>
                            <div class="resv" v-else-if="slot.status == 3">
                                <ion-button expand="block" disabled color="medium"><ion-icon :icon="lockClosed" slot="icon-only"></ion-icon></ion-button>
                            </div>
                        </ion-col>
                        <ion-col size="5" class="parking-left-bottom" style="border-right: 1px solid #5d6974"></ion-col>
                        <ion-col size="5" class="parking-right-bottom" style="border-left: 1px solid #5d6974"></ion-col>
                    </ion-row>
                    <div class="park-entry">
                        <ion-icon :icon="arrowUpOutline"></ion-icon>
                        <h4>ENTRY</h4>
                    </div>
                </ion-grid>
                <div class="park-btn">
                    <ion-button expand="block" size="large"  @click="proceed">Proceed</ion-button>
                </div>
            </section>
         </ion-content>
    </ion-page>
</template>
<script>
import {
    IonPage, IonHeader, IonToolbar, IonContent, IonGrid, IonRow, IonCol, IonButton, IonIcon, IonThumbnail, IonSelect, IonSelectOption, IonItem, IonLabel, IonImg, modalController ,menuController, alertController, loadingController
    } from '@ionic/vue';
import {menuOutline,lockClosed, arrowUpOutline
} from 'ionicons/icons';
import ModalBookingSteps from '/src/views/Modals/BookingSteps.vue';
// import { DatePickerPluginInterface } from "@capacitor-community/date-picker";

export default {
    setup() {
        
    },
    data: () => ({
        menuOutline,
        lockClosed,
        arrowUpOutline,
        selectedDep: null,
        selectedSlot: {},
        types: [],
        parkingSpot: [],
        departments: [],
        // DatePickerPluginInterface,
        // BarcodeScanner
        // CalendarModule,
            
    }),
    ionViewWillEnter () {
        this.init();
        console.log(this.selectedDep)
    },
    mounted (){
        this.init();
        // console.log(this.selectedDep)
    },
    components: {
        IonPage, IonHeader, IonToolbar, IonContent, IonGrid, IonRow, IonCol, IonButton, IonIcon, IonThumbnail, IonSelect, IonSelectOption, IonItem, IonLabel, IonImg,
        // IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
    },
    watch: {
        selectedDep: {
            handler(data){
                // console.log(data);
                this.getParkingSlotsByDepartment(data)
            }
        }
    },
    methods: {
        init() {
            this.$axios.get('user/v1/department/all').then(({data}) => {
                this.departments = data
                this.selectedDep = data[0].id;
                // console.log(this.departments)
                this.getParkingSlotsByDepartment(this.selectedDep)

            });
        },
        async getParkingSlotsByDepartment(id){
             const loading = await loadingController
                .create({
                spinner: 'circular',
                // message: 'loading components',
                showBackdrop: true,
                // duration: 1000,
                translucent: true,
                });
            loading.present();
            var vm = this;
            this.$axios.get('user/v1/department/show/'+id).then(({data}) => {

                // console.log(data);
                vm.parkingSpot = data.parking_slots
                // console.log(vm.parkingSpot)
                loading.dismiss();
            });
        },
        proceed() {
            if(Object.keys(this.selectedSlot).length === 0) {
                this.warningAlert();
            } else {
                this.typeAlert();
            }
        },
        async bookASpot() 
        {
            // const DatePicker: DatePickerPluginInterface = Plugins.DatePickerPlugin as any;
            // const selectedTheme = "light";
            // if(Object.keys(this.selectedSlot).length === 0){
                const modal = await modalController
                    .create({
                    component: ModalBookingSteps,
                        componentProps: {
                            slotConfirmation: this.selectedSlot,
                            // datetimepicker: DatePicker
                        },
                    })
                modal.onDidDismiss()
                .then(() => {
                    // this.test()
                    console.log('gumawas an parent modal');
                });
                return modal.present();
        },
        async bookToday() 
        {
            // const DatePicker: DatePickerPluginInterface = Plugins.DatePickerPlugin as any;
            // const selectedTheme = "light";
            // if(Object.keys(this.selectedSlot).length === 0){
                const modal = await modalController
                    .create({
                    component: ModalBookingSteps,
                        componentProps: {
                            slotConfirmation: this.selectedSlot,
                            // datetimepicker: DatePicker
                        },
                    })
                modal.onDidDismiss()
                .then(() => {
                    // this.test()
                    console.log('gumawas an parent modal');
                });
                return modal.present();
        },
        async warningAlert() {
            const alert = await alertController
                .create({
                header: 'Warning!',
                subHeader: 'No Parking Spot selected',
                message: 'You didn\'t select any parking spot, please select a parking spot.',
                buttons: ['OK'],
                });
            await alert.present();

            const { role } = await alert.onDidDismiss();
            console.log('onDidDismiss resolved with role', role);
        },
        async typeAlert() {
            const alert = await alertController
                .create({
                    header: 'Select a type',
                    subHeader: '',
                    message: '',
                    inputs: [
                        {
                            type: 'radio',
                            value: '1',
                            label: 'Book a Spot'
                        },
                        {
                            type: 'radio',
                            value: '2',
                            label: 'For Today'
                        }
                    ],
                    buttons: [
                        {
                            text: 'OK',
                            handler: (data) => {
                                // console.log(data);
                                console.log(this.selectedType);
                                if(data == 1){
                                    this.bookASpot();
                                } else if(data == 2) {
                                    this.bookToday();
                                } else {
                                    console.log('wara pumili type')
                                }
                            }
                        }
                    ],
                });
            return alert.present();

            // const { role } = await alert.onDidDismiss();
            // console.log('onDidDismiss resolved with role', role);
        },
        buttonState(i)
        {
            this.parkingSpot.forEach(element => {
                element.selected = false;
            });
            
            if (this.parkingSpot[i].id == this.selectedSlot.id) {
                this.parkingSpot[i].selected == false;
                this.selectedSlot = {};
                // console.log(this.selectedSlot);
            } else {
                this.selectedSlot = this.parkingSpot[i];
                this.parkingSpot[i].selected = true;
                // console.log(this.selectedSlot);
            }
        },
        openMenu()
        {
            menuController.open('app-menu');
        },
    },
}
</script>
<style>
.book-slot-toolbar {
    padding: 20px 15px !important;
}
.user-details_simple {
    text-align: right;
    margin-right: 10px;
}
.user-details_simple h5 {
    margin: 0;
}
ion-select {
    max-width: 100%;
}
#main_ .park-listing {
    position: relative;
    padding: 0 15px;
    margin: 120px 0;
}
#main_ .park-listing ion-row {
    justify-content: space-between;
}
#main_ .park-listing ion-col {
    padding: 10px;
    border: 1px solid #5d6974;
}
#main_ .park-listing ion-col:nth-child(odd) {
    border-right: 0;
}
#main_ .park-listing ion-col:nth-child(odd) .occu ion-img {
    -webkit-transform: scaleX(-1);
    transform: scaleX(-1);
}
#main_ .park-listing ion-col:nth-child(even) {
    border-left: 0;
}
#main_ .park-listing ion-col.parking-left-top {
    border-top-right-radius: 75px;
    padding: 35px;
}
#main_ .park-listing ion-col.parking-right-top {
    border-top-left-radius: 75px;
    padding: 35px;
}
#main_ .park-listing ion-col.parking-left-bottom {
    border-bottom-right-radius: 75px;
    padding: 35px;
}
#main_ .park-listing ion-col.parking-right-bottom {
    border-bottom-left-radius: 75px;
    padding: 35px;
}
.slot-filter {
    text-align: center;
    border-bottom-left-radius: 30px;
    border-bottom-right-radius: 30px;
    position: fixed;
    left: 0;
    right: 0;
    top: 155px;
    z-index: 9;
}
.occu ion-img{
    /* width: 75%; */
    /* margin: auto; */
}
.park-btn {
    position: fixed;
    bottom: 0;
    width: 100%;
    padding: 10px 15px;
    --background: #252626;
    background: #252626;
 }
.park-btn ion-button {
    --background: #f8d73a;
    --color: #000;
    font-weight: 900;
}

.park-listing::after {
    content: "";
    border-right: 4px dashed #414950;
    height: 80%;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%, 0);
    margin-top: 35px;
}
.park-entry{
    position: absolute;
    bottom: 0;
    left: 41%;
}
.park-entry ion-icon {
    font-size: 24px;
    color: #414950;
}
.park-entry h4 {
    margin: 0;
    color: #414950;
    font-weight: 900;
}
.segment {
    position: fixed;
    width: 100%;
    z-index: 9;
    background: #f4f5f8;
}
</style>