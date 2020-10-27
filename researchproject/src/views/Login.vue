<template>
  <div class="login">
    <div class="container">
      <LoginHeader />
      <div class="text-container">
        <h2>Username</h2>
        <div class="border">
          <input
            id="username"
            type="text"
            class="text-input text-input--underbar"
            placeholder="Enter your user name"
            value
          />
        </div>

        <h2>Password</h2>
        <div class="border">
          <input
            id="password"
            type="password"
            class="text-input text-input--underbar"
            placeholder="********"
            value
          />
        </div>
      </div>

      <div class="login-forget">
        <button class="button" v-on:click="login()">Login</button>
        Or you can login with
        <img
          class="googleIcon"
          src="../assets/googlelogo_color_272x92dp.png"
          alt="google"
        />
        <button class="button" v-on:click="login_with_google()">Login with google</button>
      </div>
      <div class="login-with-google"></div>
    </div>
  </div>
</template>

<script>
import LoginHeader from "@/components/LoginHeader.vue";
import axios from "axios";
import { mapMutations } from "vuex";
import { mapGetters } from "vuex";
export default {
  name: "Login",
  components: {
    LoginHeader
  },
  computed: {
    ...mapGetters(["UserID"]),
    ...mapGetters(["UserName"]),
    ...mapGetters(["Authority"])


  },
   created(){
   },

  methods: {
    ...mapMutations(["changeID"]),
    ...mapMutations(["changeName"]),
    ...mapMutations(["changeAuthority"]),
    login: async function() {
      let username = document.getElementById("username").value;
      let password = document.getElementById("password").value;

      if (username == "") {
        alert("Please enter your art name!");
        return;
      }
      if (password == "") {
        alert("Please enter your password!");
        return;
      } else if (password.length < 10) {
        // document.getElementById("Warn").value = 'test';
        alert("Password should be more than 10 digits!");
        return;
      }

      axios
        .get("http://49.235.1.205:3000/person/userName/" + username)
        .then(res => {
          if (res.data.message == null) {
            axios
              .post("http://49.235.1.205:3000/user/login", {
                password: password,
                username: username
              })
              .then(key => {
                this.$store.commit("changeID", res.data._id);
                this.$store.commit("changeName", res.data.userName);
                this.$store.commit("changeAuthority", key.data.admin);

                
                if(key.data.admin ==true){
                   this.$router.replace({ name: "Admin" });
                }else{
                  this.$router.replace({ name: "User" });
                }

                
                console.log(this.$store.getters.UserID);
              })
              .catch(err => console.log(err));
            console.log(res);
          } else {
            alert("This username already exists!");
          }
        })
        .catch(err => console.log(err));
    }
  }
};
</script>

<style lang='css'>
body {
  background-color: #efeff4;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}
.googleIcon {
  height: 20px;
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
  height: 50px;
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
.forget_btn {
  margin: 0;
  font-size: 0.8em;
}
.container {
  background-color: aliceblue;
  width: 80%;
  margin: 0 auto;
  position: relative;
  top: 50px;
  border-radius: 8px;
}
   .container {
  background-color: aliceblue;
  width: 300px;
  margin: 0 auto;
  position: relative;
  top: 50px;
  border-radius: 8px;
}


</style>