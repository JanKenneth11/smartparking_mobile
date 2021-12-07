<template>
    <confirmation-layout pageTitle="Oh no!" modalColor="danger" btnLabel="Try Again">
         <div class="confirmation-content">
            <div class="confirmation-header">
                <ion-icon :icon="closeCircleOutline"></ion-icon>
                <h3><strong>ERROR</strong></h3>
            </div>
            <div class="confirmation-content">
                <h5>SOMETHING WRONG WHEN TRANSACTING YOUR PARKING SPACE. PLEASE TRY AGAIN.</h5>
            </div>
        </div>
    </confirmation-layout>
</template>
<script>
import { closeCircleOutline } from 'ionicons/icons';

export default {
    name: 'BookSuccess',
    props: {
        slotInfo: {
            required: true,
            type: Object,
        }
    },
    components: {
    },
    data:() => ({
        closeCircleOutline,
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