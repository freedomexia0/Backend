<template>
  <div>
    <div class="content">
      <UserHeader />


      <div v-bind:class="[isBackActive ? 'Hide' : 'unHide']">
        <div class="back">
          <div class="leftMargin"></div>
          <button class="button" v-on:click="allBack()">Back</button>
        </div>
      </div>

        <div v-bind:class="[isMenuActive ? 'unHide' : 'Hide']">
        <div class="selectCard">
          <figure>
            <img src="../assets/personal.png" v-on:click="personalShow()" />
          </figure>
          <figure>
            <img src="../assets/alarmlog.png" v-on:click="alarmShow()" />
          </figure>
        </div>
      </div>


      <div class="text-container">
        <div v-bind:class="[isPersonalActive ? 'Hide' : 'unHide']">
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
          <button class="button" v-on:click="save()">Save</button>
        </div>

        <div v-bind:class="[isAlarmActive ? 'Hide' : 'unHide']" >
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

        </div>
      </div>

    </div>
  </div>
</template>

<script>
import UserHeader from "@/components/UserHeader.vue";
import { mapGetters } from "vuex";
import axios from "axios";
export default {
  data() {
        var eingaenge = [];
    var sps_data_din = [];
    var sps_data_dot = [];
    var sps_data_ain = [];
    var sps_data_aot = [];
     var isAlarmActive = true;
    var isPersonalActive = true;
        var isMenuActive = true;
    var isBackActive = true;
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
            eingaenge,
      sps_data_din,
      sps_data_dot,
      sps_data_ain,
      sps_data_aot,
      isMenuActive,
      isAlarmActive,
      isPersonalActive,
      isBackActive,
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
      axios
        .get("http://49.235.1.205:3000/person/id/" + personID)
        .then((res) => {
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

     getRealData: async function () {
      if (this.sps_data_ain.length != 0) {
        for (let i = 0; i < this.sps_data_ain.length; i++) {
          this.getTriggerValue(
            this.sps_data_ain[i].name,
            this.sps_data_ain[i].value
          );
          await this.Sleep(800);
        }
      }
    },

    getAllTrigger() {
      axios.get("http://49.235.1.205:3000/alarm/alarmlog").then(async (res) => {
        for (let i = 0; i < this.sps_data_ain.length; i++) {
          for (let k = 0; k < res.data.length; k++) {
            if (
              this.sps_data_ain[i].name == res.data[k].AlarmTrigger &&
              res.data[k].AckUser == null
            ) {
              this.getTriggerValue(
                this.sps_data_ain[i].name,
                this.sps_data_ain[i].value
              );
              await this.Sleep(300);
            }
          }
        }
      });
    },

    getTriggerValue(name, value) {
      var trigger = 0;
      var alarmLevel = 0;
      axios
        .get("http://49.235.1.205:3000/alarm/alarmIdlogName/" + name)
        .then((res) => {
          if (res.data.message == null) {
            switch (res.data.TriggerMode) {
              case 1:
                if (value > res.data.AlarmMax) {
                  trigger = 1;
                } else {
                  trigger = 0;
                }

                break;
              case 2:
                if (value < res.data.AlarmMin) {
                  trigger = 1;
                } else {
                  trigger = 0;
                }
                break;
              case 3:
                if (res.data.AlarmMax >= res.data.AlarmMin) {
                  if (value < res.data.AlarmMin || value > res.data.AlarmMax) {
                    trigger = 1;
                  } else {
                    trigger = 0;
                  }
                } else {
                  if (value > res.data.AlarmMax && value < res.data.AlarmMin) {
                    trigger = 1;
                  } else {
                    trigger = 0;
                  }
                }
                break;
            }
            if (trigger == 1) {
              alarmLevel = 3;
            }
            if (trigger == 0 && res.data.NormalizationTime != null) {
              alarmLevel = 1;
            }
            if (trigger == 0 && res.data.AlarmTime == null) {
              alarmLevel = 2;
            }
            if (res.data.AckUser != null) {
              alarmLevel = 0;
            }
            console.log(alarmLevel);
            axios
              .patch(
                "http://49.235.1.205:3000/alarm/update/" + res.data.AlarmId,
                {
                  TriggerValue: value,
                  TriggerStatus: trigger,
                  Alarmlevel: alarmLevel,
                }
              )
              .catch(() => {});
          }
        })
        .catch(() => {});
    },

    //-------------------------------------------------------------------------------------------------------------------


    cgi_file_call(mode, filepath, content, callback) {
      fetch("/draw/cgi-bin/file", {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: mode + ";" + filepath + ";" + content, // body data type must match "Content-Type" header
      })
        .then((response) => response.text())
        .then((data) => {
          if (callback) {
            callback(data);
          }
        });
    },

    Read_eingaenge_Callback(data) {
      data = data.split("\n");
      for (var i = 0; i < data.length; ++i) {
        if (data[i].length > 0) {
          var row = data[i];
          var obj = new Object();

          row = row.split("=");
          obj.dp = row[0];
          var content = row[1];
          content = content.split("(");
          obj.type = content[0];
          var args = content[1].replace(")", "");
          obj.args = args.split(",");
          obj.name = obj.args[0];
          obj.description = obj.args[6];
          this.eingaenge.push(obj);
        }
      }
    },

    Sps_Reader(data) {
      var resArr = [];
      //   console.log("Sps_Reader",data)
      data = data.replace(";", "");
      data = data.split("\n");

      for (var i = 0; i < data.length; ++i) {
        if (data[i].length > 0) {
          var row = data[i];
          var obj = new Object();

          row = row.split("+=");
          obj.type = row[0];
          var content = row[1];
          content = content.replace("'", "");
          obj.args = content.split(",");
          obj.name = obj.args[0];
          obj.value = obj.args[1];
          resArr.push(obj);
        }
      }

      return resArr;
    },

    Read_sps_data_din_Callback(data) {
      this.sps_data_din = this.Sps_Reader(data);
      //    console.log("sps_data_din", this.sps_data_din);
      //  console.log("type: "+ typeof( this.sps_data_din))
    },

    Read_sps_data_dot_Callback(data) {
      this.sps_data_dot = this.Sps_Reader(data);
      //    console.log("sps_data_dot", this.sps_data_dot);
    },

    Read_sps_data_ain_Callback(data) {
      this.sps_data_ain = this.Sps_Reader(data);
      //   console.log("sps_data_ain", this.sps_data_ain);
    },

    Read_sps_data_aot_Callback(data) {
      this.sps_data_aot = this.Sps_Reader(data);
      //   console.log("sps_data_aot", this.sps_data_aot);
    },

    Init_Read_eingaenge() {
      this.cgi_file_call(
        "read",
        "/www3-next/sps/eingaenge",
        "",
        this.Read_eingaenge_Callback
      );
    },

    Init_Read_sps_data_din() {
      this.cgi_file_call(
        "read",
        "/var/tmp/sps_data_din",
        "",
        this.Read_sps_data_din_Callback
      );
    },

    Init_Read_sps_data_dot() {
      this.cgi_file_call(
        "read",
        "/var/tmp/sps_data_dot",
        "",
        this.Read_sps_data_dot_Callback
      );
    },

    Init_Read_sps_data_ain() {
      this.cgi_file_call(
        "read",
        "/var/tmp/sps_data_ain",
        "",
        this.Read_sps_data_ain_Callback
      );
    },

    Init_Read_sps_data_aot() {
      this.cgi_file_call(
        "read",
        "/var/tmp/sps_data_aot",
        "",
        this.Read_sps_data_aot_Callback
      );
    },



    //---------------------------------------------------------------------------------------------------------------------
      personalShow() {
      this.isPersonalActive = false;
      this.isBackActive = false;
      this.isMenuActive = false;
    },
        alarmShow() {
      this.isAlarmActive = false;
      this.isBackActive = false;
      this.isMenuActive = false;
    },
        allBack() {
      this.isPersonalActive = true;
      this.isAlarmActive = true;
      this.isBackActive = true;
      this.isMenuActive = true;
    },
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
              .patch("http://49.235.1.205:3000/alarm/update/" + id, {
                AckUser: this.$store.getters.UserName,
                Alarmlevel: 2
              })
              .catch((err) => console.log(err));
          }
        }
        this.boxTwo = false;
      }
    },

    timer() {
      this.getAlarm();


      this.getAllTrigger();


      this.Init_Read_sps_data_ain();

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
      let new_email = document.getElementById("email").value;

      //  let email = document.getElementById("email").placeholder;

      if (new_email != "") {
        axios
          .patch(
            "http://49.235.1.205:3000/person/" + this.$store.getters.UserID,
            { email: new_email }
          )
          .then(() => {
            location.reload();
          });
      }
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
figure {
  margin: 1em;

  padding: 0;
}

img {
  width: 10em;
}

.selectCard {
  display: inline-flex;
  margin-top: 10em;
}

.back {
  display: inline-flex;
}
.leftMargin {
  height: 5em;
  width: 50em;
}

.adminManul {
  display: inline-flex;
}

.adminVertical {
  width: 80%;
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
  width: 15em;
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
  margin-left: 25%;
  width: 50%;
}
</style>