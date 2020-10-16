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
    var defauteValue = [
      {
        AlarmId: null,
        AlarmTrigger: null,
        NormalizationMessage: null,
        AlarmTime: null,
      },
    ];
    var selected, selectMode, fields;
    return {
      items: defauteValue,
      selected,
      selectMode,
      fields,
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
    setInterval(this.timer, 1000);
    this.getAlarm();
    let personID = this.$store.getters.UserID;
    if (personID != "default") {
      axios.get("http://localhost:3000/person/id/" + personID).then((res) => {
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
    onRowSelected(items) {
      this.selected = items;
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
            axios.delete('http://localhost:3000/alarm/alarmId/'+id)
            .catch(err => console.log(err))
          }
        }
      }
    },

    timer() {
      this.getAlarm();
      console.log("time test");
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
            if (i != (res.data.length-1)) {
              alarmData[i + 1] = {
                AlarmId: null,
                AlarmTrigger: null,
                NormalizationMessage: null,
                AlarmTime: null,
              };
            }
          }
        } else if(res.data.length == 1) {
         
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