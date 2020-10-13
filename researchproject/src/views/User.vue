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

        <h2>Alarm Id</h2>
        <div class="border">
          <input
            id="id"
            type="text"
            class="text-input text-input--underbar"
            placeholder="********"
            value
          />
        </div>

        <h2>Alarm Level</h2>
        <div class="border">
          <input
            id="level"
            type="text"
            class="text-input text-input--underbar"
            placeholder="********"
            value
          />
        </div>


        <h2>Alarm Time</h2>
        <div class="border">
          <input
            id="alarm"
            type="text"
            class="text-input text-input--underbar"
            placeholder="********"
            value
          />
        </div>

        <h2>Alarm Normalization Time</h2>
        <div class="border">
          <input
            id="normal"
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
    UserHeader,
  },
  computed: {
    ...mapGetters(["UserID"]),
  },
  created() {
    let personID = this.$store.getters.UserID;
    axios.get("http://localhost:3000/alarm/id/5f85e2eb88bd8e33903622ef").then((res) => {
      console.log(res);
      if (res.data.Id != null) {
        document.getElementById("id").placeholder = res.data.Id;
      }
      if (res.data.Alarmlevel != null) {
        document.getElementById("level").placeholder = res.data.Alarmlevel;
      }
      if (res.data.AlarmTime != null) {
        document.getElementById("alarm").placeholder = res.data.AlarmTime;
      }
      if (res.data.NormalizationTime != null) {
        document.getElementById("normal").placeholder = res.data.NormalizationTime;
      }
    });
    console.log(personID);
    if (personID != "default") {
      axios
        .get("http://localhost:3000/person/id/" + personID)
        .then((res) => {
          console.log(res);
          if (res.data.userName != null) {
            document.getElementById("username").placeholder = res.data.userName;
          }
          if (res.data.age != null) {
            document.getElementById("age").placeholder = res.data.age;
          }
          if (res.data.email != null) {
            document.getElementById("email").placeholder = res.data.email;
          }
        });
    } else {
      this.$router.replace({ name: "Login" });
    }
  },
  methods: {
    save: async function () {
      let profile = {};
      let new_age = document.getElementById("age").value;
      let new_email = document.getElementById("email").value;

      let age = document.getElementById("age").placeholder;
      let email = document.getElementById("email").placeholder;

      if (new_age != "" && age != new_age) {
        profile = { ...profile, age: new_age };
      }

      if (new_email != "" && email != new_email) {
        profile = { ...profile, email: new_email };
      }

      console.log(profile);
      axios.patch(
        "http://localhost:3000/person/" + this.$store.getters.UserID,
        profile
      );
      location.reload();
    },
  },
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

@media only screen and (min-width: 650px) {
  .text-container {
    margin-left: 25%;
    width: 50%;
  }
  .button {
    width: calc(100% - 20em);
  }
}
</style>