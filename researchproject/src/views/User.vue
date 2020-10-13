<template>
  <v-ons-page>
    <div class="content">
      <UserHeader />
      <div class="text-container">
        <h2>Username/Artname</h2>
        <div class="border">
          <input
            id="username"
            type="text"
            class="text-input text-input--underbar"
            placeholder="Enter your user name"
            value
          />
        </div>

        <h2>Age</h2>
        <div class="border">
          <input
            id="age"
            type="text"
            class="text-input text-input--underbar"
            placeholder="********"
            value
          />
        </div>

        <h2>E-mail</h2>
        <div class="border">
          <input
            id="email"
            type="text"
            class="text-input text-input--underbar"
            placeholder="********"
            value
          />
        </div>

        <h2>Music Genre</h2>
        <div class="border">
          <input
            id="musicGenre"
            type="text"
            class="text-input text-input--underbar"
            placeholder="********"
            value
          />
        </div>

        <h2>Song</h2>
        <div class="border">
          <input
            id="song"
            type="text"
            class="text-input text-input--underbar"
            placeholder="********"
            value
          />
        </div>
      </div>

      <button class="button" v-on:click="save()">Save</button>
    </div>
  </v-ons-page>
</template>

<script>
import UserHeader from "@/components/UserHeader.vue";
import { mapGetters } from "vuex";
import axios from "axios";
export default {
  name: "User",
  components: {
    UserHeader
  },
  computed: {
    ...mapGetters(["UserID"])
  },
  created() {
    let personID = this.$store.getters.UserID;
    console.log(personID);
    if (personID != "default") {
      axios.get("http://localhost:3000/person/id/" + personID).then(res => {
        console.log(res);
        if (res.data.artName != null) {
          document.getElementById("username").placeholder = res.data.artName;
        }
        if (res.data.age != null) {
          document.getElementById("age").placeholder = res.data.age;
        }
        if (res.data.email != null) {
          document.getElementById("email").placeholder = res.data.email;
        }
        if (res.data.songList != null) {
          document.getElementById("song").placeholder = res.data.songList;
        }
        if (res.data.musicGenre != null) {
          document.getElementById("musicGenre").placeholder =
            res.data.musicGenre;
        }
      });
    } else {
      this.$router.replace({ name: "Login" });
    }
  },
  methods: {
    save: async function() {
      let profile = {};
      let new_age = document.getElementById("age").value;
      let new_email = document.getElementById("email").value;
      let new_song = document.getElementById("song").value;
      let new_genre = document.getElementById("musicGenre").value;

      let age = document.getElementById("age").placeholder;
      let email = document.getElementById("email").placeholder;
      let song = document.getElementById("song").placeholder;
      let genre = document.getElementById("musicGenre").placeholder;

      if (new_age != "" && age != new_age) {
        profile = { ...profile, age: new_age };
      }

      if (new_email != "" && email != new_email) {
        profile = { ...profile, email: new_email };
      }

      if (new_song != "" && song != new_song) {
        profile = { ...profile, songList: new_song };
      }

      if (new_genre != "" && genre != new_genre) {
        profile = { ...profile, musicGenre: new_genre };
      }
      
      console.log(profile);
      axios.patch(
        "http://localhost:3000/person/" + this.$store.getters.UserID,
        profile
      );
      location.reload();
    }
  }
};
</script>

<style lang="css">
body {
  background-color: #efeff4;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}
.text-container {
  margin: 3em 2.5em;
}
.text-container h2 {
  font-size: 0.5em;
  text-align: left;
}

.login-with-google {
  width: 80%;
  height: 100px;
}

.login-forget {
  height: 80px;
}
.center button {
  background: #fff;
}
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
.text-input {
  width: 90%;
}

.text-container {
width: 80%;
}

@media only screen and (min-width:650px){

.text-container {
  margin-left: 25%;
  width: 50%;
}
.button{
   width: calc(100% - 20em);
}

}

</style>