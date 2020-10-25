const axios = require('axios')

function api(){
    
    this.getValue = function(){
        var testData = {
            // Trigger:"AIN", wait for the real data
            AlarmId: 11,
            TriggerValue: 3

        }
        var trigger = 0;
        var alarmLevel = 0;
        axios.get("http://localhost:3000/alarm/alarmId/" + testData.AlarmId).then((res) => {
        if(res.data.message == null){
            switch (res.data.TriggerMode) {
                case 1:
                    if (testData.TriggerValue > res.data.AlarmMax) {
                        trigger = 1;
                    } else {
                        trigger = 0;
                    }
        
                    break;
                case 2:
                    if (testData.TriggerValue < res.data.AlarmMin) {
                        trigger = 1;
                    } else {
                        trigger = 0;
                    }
                    break;
                case 3:
                    if (res.data.AlarmMax >= res.data.AlarmMin) {
        
                        if ((testData.TriggerValue < res.data.AlarmMin) || (testData.TriggerValue > res.data.AlarmMax)) {
                            trigger = 1;
                        } else {
                            trigger = 0;
                        }
                    } else {
                        if ((testData.TriggerValue > res.data.AlarmMax) && (testData.TriggerValue < res.data.AlarmMin)) {
                            trigger = 1;
                        } else {
                            trigger = 0;
                        }
                    }
                    break;
        
            }
            if(trigger == 1){
                alarmLevel = 3;
            }
            if((trigger == 0)&&(res.data.NormalizationTime != null)){
                alarmLevel = 1;
            }
            if((trigger == 0)&&(res.data.AlarmTime == null)){
                alarmLevel = 2;
            }
            if(res.data.AckUser != null){
                alarmLevel = 0;
            }
            console.log(alarmLevel)
            axios.patch("http://localhost:3000/alarm/update/" + testData.AlarmId, {
                TriggerValue: testData.TriggerValue,
                TriggerStatus: trigger,
                Alarmlevel: alarmLevel
            }).catch((err) => console.log(err));
        }
        

        }).catch(() => console.log("not found"));
    }
}



module.exports = api;
