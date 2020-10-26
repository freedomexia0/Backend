
const fetch = require("node-fetch");


function cgi_file_call(mode, filepath, content, callback) {
    fetch("/draw/cgi-bin/file", {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: mode + ";" + filepath + ";" + content// body data type must match "Content-Type" header
    })
    .then(response => response.text())
    .then((data) => {
        // console.log(data);
        if (callback) {
            callback(data);
        }
    });
}

var eingaenge = [];
var sps_data_din = [];
var sps_data_dot = [];
var sps_data_ain = [];
var sps_data_aot = [];

// function setData(data){
// 	console.log(data);
// }

// setTimeout(() => {
// 	cgi_file_call("write", "./1.txt", Global_Content, setData);
// }, 1000);


function Read_eingaenge_Callback(data){
    data = data.split("\n");

    for(var i = 0;i<data.length;++i){
        if(data[i].length>0){
            var row = data[i];
            var obj = new Object();

            row = row.split("=");
            obj.dp = row[0];
            var content = row[1];
            content = content.split("(");
            obj.type = content[0];
            var args = content[1].replace(")","");
            obj.args = args.split(",");
            obj.name = obj.args[0];
            obj.description = obj.args[6];
            // console.log(dp,"|",type,"|",arg);
            eingaenge.push(obj);
        }
    }

    // console.log("eingaenge",eingaenge);

    updateAll_IO_Names();

    // var obj = eingaenge.find(obj => obj.dp === "din_3");
    // console.log(obj);
}

function Sps_Reader(data){
    var resArr = [];
    data = data.replace(";","");
    data = data.split("\n");

    for(var i = 0;i<data.length;++i){
        if(data[i].length>0){
            var row = data[i];
            var obj = new Object();

            row = row.split("+=");
            obj.type = row[0];
            var content = row[1];
            content = content.replace("'", "");
            obj.args = content.split(",");
            obj.name =  obj.args[0];
            obj.value =  obj.args[1];
            
            resArr.push(obj);
        }
    }

    return resArr;
}

function Read_sps_data_din_Callback(data){
    sps_data_din = Sps_Reader(data);
    // console.log("sps_data_din", sps_data_din);
}

function Read_sps_data_dot_Callback(data){
    sps_data_dot = Sps_Reader(data);
    // console.log("sps_data_dot", sps_data_dot);
}

function Read_sps_data_ain_Callback(data){
    sps_data_ain = Sps_Reader(data);
    // console.log("sps_data_ain", sps_data_ain);
}

function Read_sps_data_aot_Callback(data){
    sps_data_aot = Sps_Reader(data);
    // console.log("sps_data_aot", sps_data_aot);
}

function Init_Read_eingaenge(){
    cgi_file_call("read", "/www3-next/sps/eingaenge", "", Read_eingaenge_Callback);
}

function Init_Read_sps_data_din(){
    cgi_file_call("read", "/var/tmp/sps_data_din", "", Read_sps_data_din_Callback);
}

function Init_Read_sps_data_dot(){
    cgi_file_call("read", "/var/tmp/sps_data_dot", "", Read_sps_data_dot_Callback);
}

function Init_Read_sps_data_ain(){
    cgi_file_call("read", "/var/tmp/sps_data_ain", "", Read_sps_data_ain_Callback);
}

function Init_Read_sps_data_aot(){
    cgi_file_call("read", "/var/tmp/sps_data_aot", "", Read_sps_data_aot_Callback);
}

Init_Read_eingaenge();

Init_Read_sps_data_din();
Init_Read_sps_data_dot();
Init_Read_sps_data_ain();
Init_Read_sps_data_aot();


async function GetAvailableSvgs(callback) {
    await fetch('/draw/cgi-bin/svgfiles')
        .then(response => response.json())
        .then((data) => {

            Global_SvgMap = new Map(data);

            for (let [key, value] of Global_SvgMap) {
                var ele = $(value);

                $(ele).attr("MapKey", key);

                $(ele).css("background", 'rgba(50,50,50,0.1)');
                $(ele).css("margin", "5px");

                $(ele).attr("height", "40px");
                $(ele).attr("width", "40px");

                $(ele)[0].addEventListener("click", ImportSvgFromLib, false);

                $("#shape_buttons").append(ele);
            }
        });

    if (callback) {
        callback();
    }
}


function ImportSvgFromLib(e) {
    var ele = e.target;

    while (ele && ele.tagName != "svg") {
        ele = ele.parentElement;
    }

    var mapkey = $(ele).attr("MapKey");

    var str = Global_SvgMap.get(mapkey + "");
    
    svgCanvas.importSvgString(str, true);
    svgCanvas.ungroupSelectedElement();
    svgCanvas.ungroupSelectedElement();
}




