<template>
  <v-ons-page>
    <div class="content">
      <UserHeader/>
      <Profile v-bind:profile="profile" v-on:del-profile="deleteProfile" />

    </div>
  </v-ons-page>
</template>

<script>
import Profile from "@/components/Profile";
import UserHeader from "@/components/UserHeader.vue";
import axios from 'axios'
export default {
  name: "Admin",
  components: {
    Profile,
    UserHeader
  },
  data() {
    return {
      profile: []
    };
  },
  methods: {
    deleteProfile(id) {
      var result = confirm("Are you sure to delete this profile?");
      if (result == true) {
        this.profile = this.profile.filter(data => data._id !== id);
      }
      axios.delete('http://localhost:3000/person/'+id).catch(err => console.log(err))
    }
  },
  created() {
      axios.get('http://localhost:3000/person')
      .then(res => this.profile = res.data)
      .catch(err => console.log(err))
  }
};
</script>

<style lang="css">
.button {
  background: #00cc80;
  width: calc(100% - 2.5em);
  height: 2.5em;
  line-height: 0;
  display: block;
  color: #fff;
  border-radius: 8px;
  padding: 0.5em;
  text-decoration: none;
  font-size: 1em;
  position: relative;
  margin: 0.5em auto;
  z-index: 4;
}
</style>