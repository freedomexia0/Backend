<template>
  <div>
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
          <h1>This is User view Table</h1>
          <b-table
            ref="selectableTable"
            selectable
            :items="items"
            :fields="fields"
            @row-selected="onRowSelected"
            responsive="sm"
            primary-key="AlarmId"
            :tbody-transition-props="transProps"
          >
            <template #cell(__)="{ rowSelected }">
              <template v-if="rowSelected">
                <span aria-hidden="true">&check;</span>
                <span class="sr-only">Selected</span>
              </template>
              <template v-else>
                <span aria-hidden="true">&nbsp;</span>
                <span class="sr-only">Not selected</span>
              </template>
            </template>
          </b-table>
          <p>
            <b-button size="sm" @click="selectAllRows">Select all</b-button>
            <b-button size="sm" @click="clearSelected">Clear selected</b-button>
            <b-button size="sm" @click="showMsgBoxTwo">Acknowledge</b-button>
            <b-alert v-model="showDelAlert" variant="danger" dismissible>
              Please select at least one alarm!
            </b-alert>
          </p>

          <p>
            Selected Rows:<br />
            {{ selected }}
          </p>
        </div>
      </div>

      <button class="button" v-on:click="save()">Save</button>
    </div>
  </div>
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
        AlarmMessage: null,
        AlarmTime: null,
        AckUser: null,
        Acknowledge: null,
        TriggerStatus: null,
        _rowVariant: null,
      },
    ];

    var selected;
    return {
      showDelAlert: false,
      boxTwo: "",
      transProps: {
        // Transition name
        name: "flip-list",
      },
      items: defauteValue,
      itemsLog: defauteValue,
      selected,
      fields: [
        "__",
        { key: "AlarmTime", sortable: true },

        { key: "AlarmId", sortable: true },
        "AlarmTrigger",
        "TriggerValue",
        "AlarmMessage",
        { key: "NormalizationTime", sortable: true },
      ],
      isActive,
      dateValue: "",
      timeValue: "",
      optionsTrigger: [
        { value: null, text: "Please select a Trigger" },
        { value: "M3", text: "Trigger: M3" },
        { value: "M4", text: "Trigger: M4" },
        { value: "M5", text: "Trigger: M5" },
      ],
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
    this.AckKey = false;
    this.selected = [];
    setInterval(this.timer, 5000);
    this.getAlarm();

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
    showMsgBoxTwo() {
      if (this.selected.length == 0) {
        this.showDelAlert = true;
      } else {
        this.boxTwo = "";
        this.$bvModal
          .msgBoxConfirm("Are you sure to acknowledge?", {
            title: "Please Confirm",
            size: "sm",
            buttonSize: "sm",
            okVariant: "danger",
            okTitle: "YES",
            cancelTitle: "NO",
            footerClass: "p-2",
            hideHeaderClose: false,
            centered: true,
          })
          .then((value) => {
            this.boxTwo = value;
            this.ackAlarm();
          })
          .catch((err) => {
            console.log(err); // An error occurred
          });
      }
    },




    Sleep(milliseconds) {
      return new Promise((resolve) => setTimeout(resolve, milliseconds));
    },


    onRowSelected(items) {
      this.selected = items;
    },
    selectAllRows() {
      this.$refs.selectableTable.selectAllRows();
    },
    clearSelected() {
      this.$refs.selectableTable.clearSelected();
    },
    ackAlarm() {
      if (this.selected.length == 0) {
        this.showDelAlert = true;
      } else {
        if (this.boxTwo == true) {
          for (let i = 0; i < this.selected.length; i++) {
            let id = this.selected[i].AlarmId;
            console.log(id);
            axios
              .patch("http://localhost:3000/alarm/update/" + id, {
                AckUser: this.$store.getters.UserName,
              })
              .catch((err) => console.log(err));
          }
        }
        this.boxTwo = false;
      }
    },

    timer() {
      this.getAlarm();
    },

    getAckKey() {
      if (this.AckKey == true) {
        return true;
      } else {
        return false;
      }
    },
    getAlarm() {
      var alarmData = [];

      axios.get("http://localhost:3000/alarm").then((res) => {
        //console.log(res.data);
        if (res.data.length > 1) {
          for (let i = 0; i < res.data.length; i++) {
            var alarmModel = {
              AlarmId: null,
              AlarmTrigger: null,
              AlarmMessage: null,
              AlarmTime: null,
              AckUser: null,
              Acknowledge: null,
              TriggerStatus: null,
              TriggerValue: null,
              NormalizationTime:null,
              _rowVariant: null,
            };
            if (res.data[i].AlarmTime != null && res.data[i].AckUser == null) {
              alarmModel.AlarmTrigger = res.data[i].AlarmTrigger;
              alarmModel.AlarmId = res.data[i].AlarmId;
              alarmModel.AlarmMessage = res.data[i].AlarmMessage;
              alarmModel.AlarmTime = res.data[i].AlarmTime;
              alarmModel.NormalizationTime = res.data[i].NormalizationTime;
              alarmModel.TriggerValue = res.data[i].TriggerValue;
              if (res.data[i].AckUser != null) {
                alarmModel.AckUser = res.data[i].AckUser;
                alarmModel.Acknowledge = "confirmed";
              }
              if (res.data[i].Alarmlevel == 1) {
                alarmModel._rowVariant = "success";
              }
              if (res.data[i].Alarmlevel == 2) {
                alarmModel._rowVariant = "secondary";
              }
              if (res.data[i].Alarmlevel == 3) {
                alarmModel._rowVariant = "danger";
              }

              alarmData.push(alarmModel);
            }
          }
        } else if (res.data.length == 1) {
          var alarmModelB = {
            AlarmId: null,
            AlarmTrigger: null,
            AlarmMessage: null,
            AlarmTime: null,
            AckUser: null,
            Acknowledge: null,
            TriggerStatus: null,
            NormalizationTime:null,
            _rowVariant: null,
          };

          if (res.data[0].TriggerStatus == 1) {
            alarmModelB.AlarmTrigger = res.data[0].AlarmTrigger;
            alarmModelB.AlarmId = res.data[0].AlarmId;
            alarmModelB.AlarmMessage = res.data[0].AlarmMessage;
            alarmModelB.AlarmTime = res.data[0].AlarmTime;
            alarmModelB.NormalizationTime = res.data[0].NormalizationTime;
            alarmModelB.TriggerValue = res.data[0].TriggerValue;


            if (res.data[0].AckUser != null) {
              alarmModelB.AckUser = res.data[0].AckUser;
              alarmModelB.Acknowledge = "confirmed";
            }

            if (res.data[0].Alarmlevel == 1) {
              alarmModelB._rowVariant = "success";
            }
            if (res.data[0].Alarmlevel == 2) {
              alarmModelB._rowVariant = "secondary";
            }
            if (res.data[0].Alarmlevel == 3) {
              alarmModelB._rowVariant = "danger";
            }
          }

          alarmData.push(alarmModelB);
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
  overflow: auto;
}

table#table-transition-example .flip-list-move {
  transition: transform 1s;
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
  table#table-transition-example .flip-list-move {
    transition: transform 1s;
  }

  .text-container {
    margin-left: 25%;
    width: 50%;
  }
  .button {
    width: calc(100% - 20em);
  }
}
</style>