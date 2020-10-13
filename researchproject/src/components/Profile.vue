<template>
    <div>
       <div v-bind:key="data.id" v-for="data in profile">
           <profileItem v-bind:profile="data" v-on:del-profile="$emit('del-profile',data._id)" />
       </div>
    </div>
</template>

<script>
import profileItem from "./profileItem.vue"
    export default {
        name:"Profile",
        components:{
            profileItem
        },
        props:["profile"]
    }
</script>

<style lang="css" scoped>

</style>