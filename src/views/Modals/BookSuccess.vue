<template>
    <confirmation-layout pageTitle="Success" modalColor="success" btnLabel="Proceed">
        <div class="confirmation-content" >
            <div class="confirmation-icon">
                <ion-icon :icon="checkmarkCircleOutline" style="font-size: 120px"></ion-icon>
                <h3><strong>SUCCESS</strong></h3>
            </div>
            <div class="confirmation-content">
                <h5>PARKING SPOT TRANSACTION SUCCESSFULL. SCAN THE QR WHEN YOU REACH THE PARKING LOT</h5>
            </div>
        </div>
    </confirmation-layout>
</template>
<script>
import { checkmarkCircleOutline } from 'ionicons/icons';

export default {
    name: 'BookSuccess',
    props: {
        slotInfo: {
            required: true,
            type: Object,
        }
    },
     data:() => ({
        checkmarkCircleOutline,
    }),
    ionViewWillEnter () {
        console.log(this.slotInfo)
    },
    mounted (){
        // var admin = this.reviews.replies;
        console.log(this.slotInfo);
    },
    methods: {
    },
}
</script>