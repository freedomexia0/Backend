<template>
    <div class="profile-item">
        <p> {{profile.artName}} 
            <button @click="$emit('del-profile',profile._id)" class="del" >x</button>
        </p>
    </div>
</template>

<script>
    export default {
        name:"profileItem",
        props:["profile"],
        methods: {

               

        }
    }
</script>

<style lang="css" scoped>

.profile-item {
    background: #f4f4f4;
    padding: 10px;
    border-bottom: 1px #ccc dotted;
}


.del {
    background: #ff0000;
    color: #fff;
    border: none;
    padding: 5px 9px;
    border-radius: 50%;
    cursor: pointer;
    float: right;
}



</style>