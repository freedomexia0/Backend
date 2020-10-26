


let eingaenge =[
        "dp_ain_1=input(AIN1,,,23,20,,%7B1%7D%20Tempf%FChler_1%20,C,PT1000,true)",
        "dp_ain_2=input(AIN2,,AlarmAus,,,,%7B4%7D%20Tempf%FChler_2,C,PT1000,true)",
        "dp_ain_3=input(AIN3,,AlarmAus,,,,%7B7%7D%20Analog%20Eingang%200_10V,V,10V,true)",
        "cnt_din1=input(DIN1,,,0,0,,test_din1,,DIN,true)",
        "cnt_din_2=input(DIN2,,,0,0,,test_din1_2,,DIN,true)"
]

var optionsTrigger= [
    { value: null, text: "Please select a Trigger" }
  ]

for(let i = 0;i<eingaenge.length;i++){
    var TrigerModel ={
       value:null,text:null
     }
   TrigerModel.value = eingaenge[i].split("(")[1].slice(0,4);
   TrigerModel.text ="Trigger:  "+ eingaenge[i].split("=")[0]

   optionsTrigger.push(TrigerModel)

 }

 console.log(optionsTrigger)