<template>
  <div id="header">
    <h1>Research Project Test Webpage</h1>
    <h2>Welcome!</h2>
    <h2 id="userName"> {{username}} </h2>
    
    <div  id="nav">
      <button class="button" v-on:click="logout()">Log out</button>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapMutations } from 'vuex'
import { mapGetters } from "vuex"
export default {
  name: 'UserHeader',
  components: {

  },
  data(){
    return {
      username: String
    };
  },
  computed:{
  ...mapGetters(["UserName"])
  },
  methods:{
     ...mapMutations(['changeID']),
     logout: function(){
        this.$store.commit('changeID','default')
        this.$router.replace({ name: "Home" });

     }
  },
  created (){
    console.log( this.$store.getters.UserName)
    this.username = this.$store.getters.UserName
  }
}
</script>


<style lang="css" >
#header h1 {
  font-weight: bold;
}
#header h2 {
  margin-top: 25px;
  font-size: 1em;
}

@media only screen and (min-width: 650px) {
#header button {
  margin-top: -10px;
  width: 100px;
}
#header h1 {
  margin-left: 20px;
}

  #header {
    display: flex;
    justify-content: space-between;
  }
}
</style>
