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
        <slot />
    </ion-content>
</template>
<script>
export default {
    props: [
        'modalTitle',
        // '',
    ],
    setup() {
        
    },
    methods: {
        // closeModal(){
        //     return modalController.dismiss();
        // },
    },
}
</script>