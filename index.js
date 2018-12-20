/*
* volo.js: Simple javascript to demonstrate volo api.
* Author: harry.ma@dao-lab.com
*/

document.head.innerHTML += '<link rel="shortcut icon" href="/favicon.ico" type="image/x-icon">';
document.head.innerHTML += '<title>Volo Video Optimizer</title>';
document.head.innerHTML += '<link rel="stylesheet" type="text/css" href="index.css">';
document.body.innerHTML += '<div id="volo"></div>';

function loadJson(url, callback=null, item=null) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            try {
                var obj = JSON.parse(this.responseText);
                if (obj) {
                    if (typeof(callback) == "function") {
                        callback(obj, item);
                    }
                }
            } catch(e) {}
        }
    };
    xhttp.open("GET", url, false);
    xhttp.send();
}
function render_label(jobObj, jobName, itemObj, itemName, itemValue) {
    itemObj.innerHTML = itemName + ": " + itemValue;
}
function render_enable(jobObj, jobName, itemObj, itemName, itemValue) {
    itemObj.innerHTML = itemName + ": " + itemValue;
}

function render_output(jobObj, jobName, itemObj, itemName, itemValue) {

    render_label(jobObj, jobName, itemObj, itemName, itemValue);
}
function set_item(jobObj, jobName, itemName, fn_render) {
    if (jobObj.hasOwnProperty(itemName)) {
        if (!document.getElementById(jobName)) {
            document.getElementById("volo").innerHTML += '<div class="jobname" style="min-width:360px;max-width:25vw;" id=' + jobName + '>';
        }
        if (!document.getElementById(jobName + '.' + itemName)) {
            document.getElementById(jobName).innerHTML += '<div style="height:50px;line-height: 50px;padding-left:5px;" class='+itemName+' id=' + jobName + '.' + itemName + '>';
        }
        fn_render(jobObj, jobName, document.getElementById(jobName + '.' + itemName), itemName, jobObj[itemName])
    }
}
function show_job(jobObj, url) {
    jobName = url.substring(0, url.lastIndexOf('.')) || url
    if (jobObj.hasOwnProperty("name")) {
        jobName = jobObj.name;
    }
    set_item(jobObj, jobName, "name", render_label);
    set_item(jobObj, jobName, "enable", render_enable);
    set_item(jobObj, jobName, "output", render_output);
    set_item(jobObj, jobName, "state", render_label);
    if (jobObj.hasOwnProperty("report")) {
        set_item(jobObj.report, jobName, "ifps", render_label);
        set_item(jobObj.report, jobName, "ibitrate", render_label);
        set_item(jobObj.report, jobName, "speed", render_label);
    }
}
function list_job(jobObj) {
    jobObj = jobObj.sort();
    for (var i = 0; i < jobObj.length; i++) {
        loadJson('/api/' + jobObj[i].file, show_job, jobObj[i].file);
    }
}
function update() {
    loadJson('/api/', list_job);
}

update();
setInterval(function(){ update(); }, 3000);
loadJson('/api/',appendbtnipt);
function appendbtnipt(jobObj){
  jobObj = jobObj.sort();
  for (var i = 0; i < jobObj.length; i+=2) {
      var jobnames = jobObj[i].file.split(".job");
      var btndiv=document.createElement("div");
      btndiv.innerHTML = "<button onclick=\"startchangenable(this)\" id=\"start"+jobnames[0]+"\">start</button><button class=\"dis\" onclick=\"stopchangenable(this)\" id=\"stop"+jobnames[0]+"\">stop</button>";
      document.getElementById(jobnames[0]).appendChild(btndiv);

      var optdiv=document.createElement("div");
      var optval=document.createElement("div");
      optval.style="border-top:none;";
      optdiv.style="border-bottom:none;";
      optdiv.innerHTML = "<button onclick=\"edit(this)\" id=\"edit"+jobnames[0]+"\">edit</button><button class=\"dis\" onclick=\"save(this)\" id=\"save"+jobnames[0]+"\">save</button>";
      optval.innerHTML = "<label for=\"SERVER_URL\">Server Url:</label><input disabled  id=\"url"+jobnames[0]+"\" style=\"margin-left:7px;\" class=\"disa iptcss\" type=\"text\" placeholder=\"Server URL\"><br /><label for=\"SERVER_URL\">Server Key:</label><input disabled  id=\"key"+jobnames[0]+"\" class=\"disa iptcss\" type=\"text\" placeholder=\"Server KEY\">";
      document.getElementById(jobnames[0]).appendChild(optdiv);
      document.getElementById(jobnames[0]).appendChild(optval);
      var iframediv=document.createElement("div");
      iframediv.innerHTML = "<button onclick=\"load(this)\" id=\"Load"+jobnames[0]+"\">Load</button><input class=\"iptcss\" type=\"text\" placeholder=\"Please input video name\">";
      document.getElementById(jobnames[0]).appendChild(iframediv);

  }
}
function saveJob(jobOld, jobNew, filename) {
    var result = {};
    for(var key in jobOld) result[key] = jobOld[key];
    for(var key in jobNew) result[key] = jobNew[key];
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", filename, true);
    xhttp.send(JSON.stringify(result));
}
function startchangenable(self){
  self.style.display = "none";
  var splval = self.id.split("start")[1];
  document.getElementById("stop"+splval).style.display = "block";
  var jobpath = splval+".job";
  var timestamp=new Date().getTime();
  var jobNew = {"enable": "1","version":timestamp};
  loadJson("api/"+jobpath, saveJob, jobNew);
}
function stopchangenable(self){
  self.style.display = "none";
  var splval = self.id.split("stop")[1];
  document.getElementById("start"+splval).style.display = "block";
  var timestamp=new Date().getTime();
  var jobNew = {"enable": "0","version":timestamp};
  loadJson("/api/"+splval+".job", saveJob, jobNew);
}
function edit(self){
  self.style.display = "none";
  var splval = self.id.split("edit")[1];
  document.getElementById("save"+splval).style.display = "block";
  document.getElementById("url"+splval).disabled = false;
  document.getElementById("key"+splval).disabled = false;
}
function save(self){
  self.style.display = "none";
  var splval = self.id.split("save")[1];
  document.getElementById("edit"+splval).style.display = "block";
  var urlid = document.getElementById("url"+splval);
  var keyid = document.getElementById("key"+splval);
  urlid.disabled = true;
  keyid.disabled = true;
  var outputval = urlid.value + "/" + keyid.value;
  var jobNew = {"output": outputval};
  loadJson("/api/"+splval+".job", saveJob, jobNew);
}
