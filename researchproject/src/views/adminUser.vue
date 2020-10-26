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
          <b-table
            v-bind:class="[isActive ? 'unHide' : 'Hide']"
            ref="personTable"
            selectable
            :items="person"
            :fields="personFields"
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
            <b-form-group label="Authority settings:">
              <b-form-checkbox-group
                id="checkbox-group-1"
                v-model="selectedAuthority"
                :options="optionsAuthority"
                name="flavour-1"
              ></b-form-checkbox-group>
            </b-form-group>
            <b-button size="sm" @click="setAuthority"
              >Update Authority</b-button
            >

            <button class="button" v-on:click="rmAdmin()">
              Remove Admin Authority
            </button>
            <button class="button" v-on:click="delUser()">Delete User</button>
          </div>
        </div>

        <div>
          <h1>This is Admin Log view Table</h1>

          <b-table
            ref="selectableTable"
            selectable
            :items="itemsLog"
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
            <b-button size="sm" @click="showMsgBoxTwo">Delete</b-button>
            <b-alert v-model="showDelAlert" variant="danger" dismissible>
              Please select at least one alarm!
            </b-alert>
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

        <h3>Add new alarm</h3>

        <div>
          <div>
            <b-form-select
              v-model="selectedTrigger"
              :options="optionsTrigger"
              size="sm"
              class="mt-3"
            ></b-form-select>
          </div>
          <b-alert v-model="showTriggerAlert" variant="danger" dismissible>
            Please select a trigger!
          </b-alert>
          <div>
            <b-form-select
              v-model="selectedTriggerMode"
              :options="optionsTriggerMode"
              size="sm"
              class="mt-3"
              @change="setTriggerMode"
            ></b-form-select>
          </div>
          <div v-bind:class="[isSelectedModeA ? 'Hide' : 'unHide']">
            <h2>Alarm trigger value(Higer threshold):</h2>
            <div class="border">
              <input
                id="alarm_HT"
                type="text"
                class="text-input text-input--underbar"
                placeholder="The alarm higer than this value will be trigger"
                value
              />
            </div>
          </div>
          <div v-bind:class="[isSelectedModeB ? 'Hide' : 'unHide']">
            <h2>Alarm trigger value(Lower threshold):</h2>
            <div class="border">
              <input
                id="alarm_LT"
                type="text"
                class="text-input text-input--underbar"
                placeholder="The alarm lower than this value will be trigger"
                value
              />
            </div>
          </div>
          <b-alert v-model="showModeAlert" variant="danger" dismissible>
            Please finish trigger threshold configuration!
          </b-alert>

          <h2>Alarm message</h2>
          <div class="border">
            <input
              id="alarm_message"
              type="text"
              class="text-input text-input--underbar"
              placeholder="Enter alarm message"
              value
            />
          </div>
          <b-alert v-model="showMessageAlert" variant="danger" dismissible>
            Please fill the alarm message!
          </b-alert>

          <button class="button" v-on:click="create_alarm()">
            Create alarm
          </button>
          <button class="button" v-on:click="cancel_alarm()">Back</button>
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
    var isSelectedModeA = false;
    var isSelectedModeB = false;
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
    var defautePersonValue = [
      {
        User_Name: null,
        E_mail: null,
        personId: null,
        admin: null,
      },
    ];
    var selected, selectedPerson;
    return {
      selectedAuthority: [0,0,0],
      boxOne: "",
      boxTwo: "",
      showTriggerAlert: false,
      showModeAlert: false,
      showMessageAlert: false,
      showDelAlert: false,
      transProps: {
        // Transition name
        name: "flip-list",
      },
      selectedLevel: null,
      selectedMax: null,
      selectedMin: null,
      selectedTrigger: null,
      selectedTriggerMode: null,
      person: defautePersonValue,
      items: defauteValue,
      itemsLog: defauteValue,
      selected,
      personFields: [
        "personId",
        "User_Name",
        "E_mail",
        "admin",
        "write",
        "read",
        "confirm",
      ],
      selectedPerson,
      fields: [
        "__",
        { key: "AlarmTime", sortable: true },

        { key: "AlarmId", sortable: true },
        "AlarmTrigger",
        "TriggerValue",
        "AlarmMessage",
        { key: "Acknowledge", sortable: true },
        "AckUser",
        { key: "NormalizationTime", sortable: true },
      ],
      isActive,
      isSelectedModeA,
      isSelectedModeB,
      dateValue: "",
      timeValue: "",
      optionsAuthority: [
        { value: 1, text: "Confirm" },
        { value: 2, text: "Read" },
        { value: 4, text: "Write" },
      ],
      optionsTriggerMode: [
        { value: null, text: "Please select trigger mode" },
        { value: 1, text: "Above threshold trigger" },
        { value: 2, text: "Below threshold trigger" },
        { value: 3, text: "Range threshold trigger" },
      ],
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
    ...mapGetters(["Authority"])
  },
  created() {


    if(!this.$store.getters.Authority){
       this.$router.replace({ name: "User" });
    }



    this.showDelAlert = false;
    this.isSelectedModeA = true;
    this.isSelectedModeB = true;
    this.AckKey = false;
    this.selected = [];
    this.selectedPerson = [];
    setInterval(this.timer, 5000);
    this.getLogAlarm();

    this.getUser();

    let personID = this.$store.getters.UserID;
    if (personID != "default") {
      axios.get("http://49.235.1.205:3000/person/id/" + personID).then((res) => {
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
    setTriggerMode() {
     
      switch (this.selectedTriggerMode) {
        case 1:
          this.isSelectedModeA = false;
          this.isSelectedModeB = true;
          break;
        case 2:
          this.isSelectedModeA = true;
          this.isSelectedModeB = false;
          break;
        case 3:
          this.isSelectedModeA = false;
          this.isSelectedModeB = false;
          break;
      }
    },

    create_alarm: async function () {
      this.showTriggerAlert = false;
      this.showModeAlert = false;
      this.showMessageAlert = false;
      let newAlarm = {
        Alarmlevel: null,
        AlarmDefinition: "test",
        AlarmTrigger: null,
        AlarmMax: null,
        AlarmMin: null,
        AlarmTime: null,
        AlarmMessage: null,
        TriggerMode: null,
      };
      var alertTrigger = false,
        alertMode = false,
        alertMessage = false;

      newAlarm.AlarmTrigger = this.selectedTrigger;
      newAlarm.AlarmMessage = document.getElementById("alarm_message").value;
      newAlarm.AlarmMax = document.getElementById("alarm_HT").value;
      newAlarm.AlarmMin = document.getElementById("alarm_LT").value;
      newAlarm.TriggerMode = this.selectedTriggerMode;
      if (newAlarm.AlarmTrigger == null) {
        this.showTriggerAlert = true;
        alertTrigger = true;
      }

      if (
        this.selectedTriggerMode == null ||
        (this.selectedTriggerMode == 1 &&
          document.getElementById("alarm_HT").value == "") ||
        (this.selectedTriggerMode == 2 &&
          document.getElementById("alarm_LT").value == "") ||
        (this.selectedTriggerMode == 3 &&
          (document.getElementById("alarm_HT").value == "" ||
            document.getElementById("alarm_LT").value == ""))
      ) {
        this.showModeAlert = true;
        alertMode = true;
      }

      if (document.getElementById("alarm_message").value == "") {
        this.showMessageAlert = true;
        alertMessage = true;
      }

      if (!alertTrigger && !alertMode && !alertMessage) {
        axios
          .post("http://49.235.1.205:3000/alarm/create", newAlarm)
          .catch((err) => console.log(err));
      }
    },

    setAdmin: async function () {
      if (this.selectedPerson.length == 0) {
        alert("You didn't choose an User!");
      } else {
        this.$bvModal
          .msgBoxConfirm("Are you sure to give Admin.", {
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
          .then(async (value) => {
            this.boxTwo = value;
            if (this.boxTwo == true) {
              for (let i = 0; i < this.selectedPerson.length; i++) {
                let id = this.selectedPerson[i].personId;
                let profile = { ...profile, admin: true };

                //console.log(profile);
                axios.patch("http://49.235.1.205:3000/person/" + id, profile);

                await this.Sleep(300);
              }
            }
            this.boxTwo = false;
          })
          .catch((err) => {
            console.log(err); // An error occurred
          });
      }
    },

    setAuthority: async function () {
      if (this.selectedPerson.length == 0) {
        alert("You didn't choose an User!");
      } else {
        this.$bvModal
          .msgBoxConfirm("Are you sure to give Authority?", {
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
          .then(async (value) => {
            this.boxTwo = value;
            if (this.boxTwo == true) {
              let authorityValue = eval(this.selectedAuthority.join("+"));
              for (let i = 0; i < this.selectedPerson.length; i++) {
                let id = this.selectedPerson[i].personId;

                let profile = { ...profile, authority: authorityValue };

                axios.patch("http://49.235.1.205:3000/person/" + id, profile);

                await this.Sleep(300);
              }
            }
            this.boxTwo = false;
          })
          .catch((err) => {
            console.log(err); // An error occurred
          });
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
            let profile = { ...profile, admin: false };

            //console.log(profile);
            axios.patch("http://49.235.1.205:3000/person/" + id, profile);

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
        .post("http://49.235.1.205:3000/person/regist", {
          userName: username,
          admin: adminKey,
        })
        .then((res) => {
          if (res.data.message == null) {
            axios
              .post("http://49.235.1.205:3000/user/regist", {
                password: password,
                personID: res.data._id,
                admin: adminKey,
              })
              .catch((err) => console.log(err));
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
      if (this.boxTwo == true) {
        for (let i = 0; i < this.selected.length; i++) {
          let id = this.selected[i].AlarmId;
          axios
            .delete("http://49.235.1.205:3000/alarm/alarmId/" + id)
            .catch((err) => console.log(err));
        }
      }
      this.boxTwo = false;
    },
    showMsgBoxOne() {
      this.boxOne = "";
      this.$bvModal
        .msgBoxConfirm("Are you sure?")
        .then((value) => {
          this.boxOne = value;
        })
        .catch((err) => {
          console.log(err); // An error occurred
        });
    },
    showMsgBoxTwo() {
      if (this.selected.length == 0) {
        this.showDelAlert = true;
      } else {
        this.boxTwo = "";
        this.$bvModal
          .msgBoxConfirm("Please confirm that you want to delete.", {
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
            this.deleteSelected();
          })
          .catch((err) => {
            console.log(err); // An error occurred
          });
      }
    },
    ackAlarm() {
      if (this.selected.length == 0) {
        alert("You didn't choose an Alarm!");
      } else {
        var result = confirm("Are you sure to confirm selected Alarm?");
        if (result == true) {
          for (let i = 0; i < this.selected.length; i++) {
            let id = this.selected[i].AlarmId;
            axios
              .patch("http://49.235.1.205:3000/alarm/update/" + id, {
                AckUser: this.$store.getters.UserName,
              })
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
            axios
              .delete("http://49.235.1.205:3000/person/" + id)
              .catch((err) => console.log(err));
          }
        }
      }
    },

    timer() {
      this.getAlarm();
      this.getUser();
      this.getLogAlarm();
    },
    getUser() {
      var personData = [
        {
          User_Name: null,
          E_mail: null,
          personId: null,
          admin: null,
          write: null,
          read: null,
          confirm: null,
        },
      ];

      axios.get("http://49.235.1.205:3000/person").then((res) => {
        if (res.data.length > 1) {
          
          for (let i = 0; i < res.data.length; i++) {
            personData[i].User_Name = res.data[i].userName;
            personData[i].personId = res.data[i]._id;
            personData[i].E_mail = res.data[i].email;
            personData[i].admin = res.data[i].admin;

            if ((res.data[i].authority & 4) == 4) {
              personData[i].write = "✓";
            } else {
              personData[i].write = "";
            }

            if ((res.data[i].authority  & 2) == 2) {
              personData[i].read = "✓";
            } else {
              personData[i].read = "";
            }

            if ((res.data[i].authority  & 1) == 1) {
              personData[i].confirm = "✓";
            } else {
              personData[i].confirm = "";
            }


            if (i != res.data.length - 1) {
              personData[i + 1] = {
                User_Name: null,
                E_mail: null,
                personId: null,
                admin: null,
                write: null,
                read: null,
                confirm: null,
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

    getAckKey() {
      if (this.AckKey == true) {
        return true;
      } else {
        return false;
      }
    },
    getLogAlarm() {
      var alarmData = [];

      axios.get("http://49.235.1.205:3000/alarm/alarmlog").then((res) => {
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
              _rowVariant: null,
              TriggerValue: null,
              NormalizationTime: null,
            };

            alarmModel.AlarmTrigger = res.data[i].AlarmTrigger;
            alarmModel.AlarmId = res.data[i].AlarmId;
            alarmModel.AlarmMessage = res.data[i].AlarmMessage;
            alarmModel.AlarmTime = res.data[i].AlarmTime;
            alarmModel.TriggerValue = res.data[i].TriggerValue;
            alarmModel.NormalizationTime = res.data[i].NormalizationTime;
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
        } else if (res.data.length == 1) {
          var alarmModelB = {
            AlarmId: null,
            AlarmTrigger: null,
            AlarmMessage: null,
            AlarmTime: null,
            AckUser: null,
            Acknowledge: null,
            TriggerStatus: null,
            _rowVariant: null,
            TriggerValue: null,
            NormalizationTime: null,
          };

          alarmModelB.AlarmTrigger = res.data[0].AlarmTrigger;
          alarmModelB.AlarmId = res.data[0].AlarmId;
          alarmModelB.AlarmMessage = res.data[0].AlarmMessage;
          alarmModelB.AlarmTime = res.data[0].AlarmTime;
          alarmModel.TriggerValue = res.data[0].TriggerValue;
          alarmModel.NormalizationTime = res.data[0].NormalizationTime;

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

          alarmData.push(alarmModelB);
        }

        this.itemsLog = alarmData;
      });
    },
    getAlarm() {
      var alarmData = [];

      axios.get("http://49.235.1.205:3000/alarm").then((res) => {
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
              _rowVariant: null,
            };
            if (res.data[i].TriggerStatus == 1) {
              alarmModel.AlarmTrigger = res.data[i].AlarmTrigger;
              alarmModel.AlarmId = res.data[i].AlarmId;
              alarmModel.AlarmMessage = res.data[i].AlarmMessage;
              alarmModel.AlarmTime = res.data[i].AlarmTime;
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
            _rowVariant: null,
          };

          if (res.data[0].TriggerStatus == 1) {
            alarmModelB.AlarmTrigger = res.data[0].AlarmTrigger;
            alarmModelB.AlarmId = res.data[0].AlarmId;
            alarmModelB.AlarmMessage = res.data[0].AlarmMessage;
            alarmModelB.AlarmTime = res.data[0].AlarmTime;

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

      axios.patch(
        "http://49.235.1.205:3000/person/" + this.$store.getters.UserID,
        profile
      );
      location.reload();
    },
  },
};
</script>

<style lang="css" >
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