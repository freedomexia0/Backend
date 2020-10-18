<template>
  <v-ons-page>
    <div class="content">
      <UserHeader />
      <div class="text-container">
        <h2>Username</h2>
        <div class="border">
          <input
            id="username"
            type="text"
            class="text-input text-input--underbar"
            placeholder="Enter your user name"
            value
            readonly
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

        <div>
          <b-table
            v-bind:class="[isActive ? 'unHide' : 'Hide']"
            ref="personTable"
            selectable
            :select-mode="selectMode"
            :items="person"
            :fields="fields"
            @row-selected="onRowSelectedPerson"
            responsive="sm"
          >
          </b-table>
          <div v-bind:class="[isActive ? 'Hide' : 'unHide']">
            <h3>New user profile</h3>

            <div>
              <h2>User name</h2>
              <div class="border">
                <input
                  id="new_username"
                  type="text"
                  class="text-input text-input--underbar"
                  placeholder="Enter user name"
                  value
                />
              </div>

              <h2>Password</h2>
              <div class="border">
                <input
                  id="password"
                  type="text"
                  class="text-input text-input--underbar"
                  placeholder="********"
                  value
                />
              </div>
              <h2>Authority</h2>
              <div class="border">
                <label for="username">Admin</label>
                <ons-checkbox value="admin"></ons-checkbox>
              </div>

              <button class="button" v-on:click="sign_in()">Create User</button>
              <button class="button" v-on:click="cancel()">Back</button>
            </div>
          </div>
          <div v-bind:class="[isActive ? 'unHide' : 'Hide']">
            <button class="button" v-on:click="addUser()">Add User</button>
            <button class="button" v-on:click="setAdmin()">
              Give Admin Authority
            </button>
            <button class="button" v-on:click="rmAdmin()">
              Remove Admin Authority
            </button>
            <button class="button" v-on:click="delUser()">Delete User</button>
          </div>
        </div>

        <div>
          <b-table
            ref="selectableTable"
            selectable
            :select-mode="selectMode"
            :items="items"
            :fields="fields"
            @row-selected="onRowSelected"
            responsive="sm"
          >
          </b-table>
          <p>
            <b-button size="sm" @click="selectAllRows">Select all</b-button>
            <b-button size="sm" @click="clearSelected">Clear selected</b-button>
            <b-button size="sm" @click="deleteSelected">Delete</b-button>
          </p>
          <p>
            Selected Person Rows:<br />
            {{ selectedPerson }}
          </p>
          <p>
            Selected Rows:<br />
            {{ selected }}
          </p>
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
  data() {
    var isActive = true;
    var defauteValue = [
      {
        AlarmId: null,
        AlarmTrigger: null,
        NormalizationMessage: null,
        AlarmTime: null,
      },
    ];

    var defautePersonValue = [
      {
        User_Name: null,
        E_mail: null,
        personId: null,
        admin: null,
      },
    ];
    var selected, selectMode, fields, selectedPerson;
    return {
      person: defautePersonValue,
      items: defauteValue,
      selected,
      selectedPerson,
      selectMode,
      fields,
      isActive,
    };
  },
  name: "User",
  components: {
    UserHeader,
  },
  computed: {
    ...mapGetters(["UserID"]),
  },
  created() {
    this.selected = [];
    this.selectedPerson = [];
    setInterval(this.timer, 5000);
    this.getAlarm();

    this.getUser();

    let personID = this.$store.getters.UserID;
    if (personID != "default") {
      axios.get("http://localhost:3000/person/id/" + personID).then((res) => {
        if (res.data.userName != null) {
          document.getElementById("username").placeholder = res.data.userName;
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
    setAdmin: async function () {
      if (this.selectedPerson.length == 0) {
        alert("You didn't choose an User!");
      } else {
        var result = confirm(
          "Are you sure to give the User(s) Admin authority?"
        );
        if (result == true) {
          for (let i = 0; i < this.selectedPerson.length; i++) {
            let id = this.selectedPerson[i].personId;
            console.log(id);
            let profile = { ...profile, admin: true };

            //console.log(profile);
            axios.patch("http://localhost:3000/person/" + id, profile);

            await this.Sleep(300);
          }
        }
      }
    },

    rmAdmin: async function () {
      if (this.selectedPerson.length == 0) {
        alert("You didn't choose an User!");
      } else {
        var result = confirm(
          "Are you sure to remove Admin authority from the User(s)?"
        );
        if (result == true) {
          for (let i = 0; i < this.selectedPerson.length; i++) {
            let id = this.selectedPerson[i].personId;
            console.log(id);
            let profile = { ...profile, admin: false };

            //console.log(profile);
            axios.patch("http://localhost:3000/person/" + id, profile);

            await this.Sleep(300);
          }
        }
      }


    },

    Sleep(milliseconds) {
      return new Promise((resolve) => setTimeout(resolve, milliseconds));
    },

    sign_in: async function () {
      let username = document.getElementById("new_username").value;
      let password = document.getElementById("password").value;
      let adminKey = false;

      if (document.querySelector("ons-checkbox").value == "admin") {
        adminKey = true;
      }

      if (username == "") {
        alert("Please enter user name!");
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
        .post("http://localhost:3000/person/regist", {
          userName: username,
          admin: adminKey,
        })
        .then((res) => {
          if (res.data.message == null) {
            axios
              .post("http://localhost:3000/user/regist", {
                password: password,
                personID: res.data._id,
                admin: adminKey,
              })
              .catch((err) => console.log(err));
            console.log(res);
          } else {
            alert("This username already exists!");
          }
        })
        .catch((err) => console.log(err));
    },

    addUser() {
      this.isActive = false;
    },
    cancel() {
      this.isActive = true;
    },

    onRowSelected(items) {
      this.selected = items;
    },
    onRowSelectedPerson(person) {
      this.selectedPerson = person;
    },
    selectAllRows() {
      this.$refs.selectableTable.selectAllRows();
    },
    clearSelected() {
      this.$refs.selectableTable.clearSelected();
    },
    deleteSelected() {
      if (this.selected.length == 0) {
        alert("You didn't choose an Alarm!");
      } else {
        var result = confirm("Are you sure to remove selected Alarm?");
        if (result == true) {
          for (let i = 0; i < this.selected.length; i++) {
            let id = this.selected[i].AlarmId;
            console.log(id);
            axios
              .delete("http://localhost:3000/alarm/alarmId/" + id)
              .catch((err) => console.log(err));
          }
        }
      }
    },
    delUser() {
      if (this.selectedPerson.length == 0) {
        alert("You didn't choose an User!");
      } else {
        var result = confirm(
          "Are you sure to remove the account of selected User?"
        );
        if (result == true) {
          for (let i = 0; i < this.selectedPerson.length; i++) {
            let id = this.selectedPerson[i].personId;
            console.log(id);
            axios
              .delete("http://localhost:3000/person/" + id)
              .catch((err) => console.log(err));
          }
        }
      }
    },

    timer() {
      this.getAlarm();
      this.getUser();
    },
    getUser() {
      var personData = [
        {
          User_Name: null,
          E_mail: null,
          personId: null,
          admin: null,
        },
      ];

      axios.get("http://localhost:3000/person").then((res) => {
        console.log(res.data);

        if (res.data.length > 1) {
          for (let i = 0; i < res.data.length; i++) {
            personData[i].User_Name = res.data[i].userName;
            personData[i].personId = res.data[i]._id;
            personData[i].E_mail = res.data[i].email;
            personData[i].admin = res.data[i].admin;
            if (i != res.data.length - 1) {
              personData[i + 1] = {
                User_Name: null,
                E_mail: null,
                personId: null,
                admin: null,
              };
            }
          }
        } else if (res.data.length == 1) {
          personData[0].User_Name = res.data[0].userName;
          personData[0].personId = res.data[0]._id;
          personData[0].E_mail = res.data[0].email;
          personData[0].admin = res.data[0].admin;
        }

        this.person = personData;
      });
    },

    getAlarm() {
      var alarmData = [
        {
          AlarmId: null,
          AlarmTrigger: null,
          NormalizationMessage: null,
          AlarmTime: null,
        },
      ];
      axios.get("http://localhost:3000/alarm").then((res) => {
        // console.log(res.data.length);
        if (res.data.length > 1) {
          for (let i = 0; i < res.data.length; i++) {
            alarmData[i].AlarmTrigger = res.data[i].AlarmTrigger;
            alarmData[i].AlarmId = res.data[i].AlarmId;
            alarmData[i].NormalizationMessage =
              res.data[i].NormalizationMessage;
            alarmData[i].AlarmTime = res.data[i].AlarmTime;
            if (i != res.data.length - 1) {
              alarmData[i + 1] = {
                AlarmId: null,
                AlarmTrigger: null,
                NormalizationMessage: null,
                AlarmTime: null,
              };
            }
          }
        } else if (res.data.length == 1) {
          alarmData[0].AlarmTrigger = res.data[0].AlarmTrigger;
          alarmData[0].AlarmId = res.data[0].AlarmId;
          alarmData[0].NormalizationMessage = res.data[0].NormalizationMessage;
          alarmData[0].AlarmTime = res.data[0].AlarmTime;
        }

        this.items = alarmData;
      });
    },

    save: async function () {
      let profile = {};
      let new_email = document.getElementById("email").value;

      let email = document.getElementById("email").placeholder;

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

.Hide {
  display: none;
}
.unHide {
  display: inline;
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