const mongoose = require('mongoose')

const personDataSchema = new mongoose.Schema({

    AnlageName:{
        type: String
    },

    Id:{

        type:Number
        

    },
    Controller:{
            type: Object,


            System:{
                type:Object,
                Modell:{
                    type:String
                },
                Ethernet_Adresse:{
                    type:String
                },
                TCP_IP_Adresse:{
                    type:String
                },
                DNS_Name:{
                    type:String
                },
                Datum_Uhrzeit:{
                    type:String
                },
                Software_Relaise:{
                    type:String
                },
                freier_Speicher:{
                    type:String
                },
                Fehlerspeicher:{
                    type:String
                },
                Usereinstellungen:{
                    type:String
                }
            },
            Eingänge:{
                type:Object
            },
            Ausgänge:{
                type:Object
            },
            Numerisch:{
                type:Object
            },
            Programme:{
                type:Object
            },
            Zeitpläne:{
                type:Object
            },
            Historiken:{
                type:Object
            }

        }
    ,
    userName:{
        type: String
    },
    age:{
        type: String
    },
    email:{
        type: String
    },
    Alarme:{
        type: String
    }

})

module.exports = mongoose.model('personData',personDataSchema)