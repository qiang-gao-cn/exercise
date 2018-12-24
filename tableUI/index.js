/*
* volo.js: Simple javascript to demonstrate volo api.
* Author: harry.ma@dao-lab.com
*/

if (!(document.body || document.getElementsByTagName("body")[0])) {
    document.body = document.createElement("body");
}

if (!(document.head || document.getElementsByTagName("head")[0])) {
    document.head = document.createElement("head");
}

if (!(document.title || document.getElementsByTagName("title")[0])) {
    document.title = "Volo Video Optimizer";
}

var css  = document.createElement('link');
css.rel  = "stylesheet";
css.type = "text/css";
css.href = "index.css";
css.media = 'all';
document.head.appendChild(css);

var volo = document.createElement("div");
volo.id = "Volo";
volo.className = "container-fluid";
document.body.appendChild(volo);

var heads = document.createElement("div");
heads.id = "heads";
volo.appendChild(heads);
var h3s = document.createElement("h3");
heads.appendChild(h3s);
h3s.innerHTML = "Volo Cube Job Summary";

loadJson("",createle);
function createle(job){
  for(var i=0;i<job.length;i++){
    var bodys = document.createElement("div");
    bodys.id = "bodys";
    bodys.className = "col-lg-3 col-md-6 col-sm-12 col-xs-12";
    volo.appendChild(bodys);

    var JobsList = document.createElement("table");
    JobsList.id = "JobsList"+i;
    JobsList.innerHTML = "<tr><th>Start/Stop</th><td><button id=\"start"+i+"\" name=\"start\" onclick=\"startchangenable(this)\">start</button><button  style=\"display:none;\" id=\"stop"+i+"\" name=\"stop\"  onclick=\"stopchangenable(this)\">stop</button></td></tr>"
        + "<tr><th>Job Name</th><td></td></tr>"
        + "<tr><th>Last Update</th><td></td></tr>"
        + "<tr><th>Status</th><td></td></tr>"
        + "<tr><th>Speed</th><td></td></tr>"
        + "<tr><th>Bitrate</th><td></td></tr>"
        + "<tr><th>Run Time</th><td></td></tr>"
        + "<tr><th>VideoSize</th><td></td></tr>"
        + "<tr><th>Edit/Save</th><td><button id=\"edit"+i+"\" onclick=\"edit(this)\">edit</button><button style=\"display:none;\" id=\"save"+i+"\" onclick=\"save(this)\">save</button></td></tr>"
        + "<tr><th>Preview</th><td></td></tr>"
    bodys.appendChild(JobsList);
  }
}
// var bodys0 = document.createElement("div");
// bodys0.id = "bodys";
// bodys0.className = "col-lg-3 col-md-12 col-sm-12 col-xs-12";
// volo.appendChild(bodys0);
// var bodys1 = document.createElement("div");
// bodys1.id = "bodys";
// bodys1.className = "col-lg-3 col-md-12 col-sm-12 col-xs-12";
// volo.appendChild(bodys1);
// var bodys2 = document.createElement("div");
// bodys2.id = "bodys";
// bodys2.className = "col-lg-3 col-md-12 col-sm-12 col-xs-12";
// volo.appendChild(bodys2);
// var bodys3 = document.createElement("div");
// bodys3.id = "bodys";
// bodys3.className = "col-lg-3 col-md-12 col-sm-12 col-xs-12";
// volo.appendChild(bodys3);
//
// var JobsList0 = document.createElement("table");
// JobsList0.id = "JobsList0";
// JobsList0.innerHTML = "<tr><th>Start/Stop</th><td><button id=\"start0\" name=\"start\" onclick=\"startchangenable(this)\">start</button><button  style=\"display:none;\" id=\"stop0\" name=\"stop\"  onclick=\"stopchangenable(this)\">stop</button></td></tr>"
//     + "<tr><th>Job Name</th><td></td></tr>"
//     + "<tr><th>Last Update</th><td></td></tr>"
//     + "<tr><th>Status</th><td></td></tr>"
//     + "<tr><th>Speed</th><td></td></tr>"
//     + "<tr><th>Bitrate</th><td></td></tr>"
//     + "<tr><th>Run Time</th><td></td></tr>"
//     + "<tr><th>VideoSize</th><td></td></tr>"
//     + "<tr><th>Edit/Save</th><td><button id=\"edit0\" onclick=\"edit(this)\">edit</button><button style=\"display:none;\" id=\"save0\" onclick=\"save(this)\">save</button></td></tr>"
//     + "<tr><th>Preview</th><td></td></tr>"
// bodys0.appendChild(JobsList0);
// var JobsList1 = document.createElement("table");
// JobsList1.id = "JobsList1";
// JobsList1.innerHTML = "<tr><th>Start/Stop</th><td><button id=\"start1\" name=\"start\" onclick=\"startchangenable(this)\">start</button><button  style=\"display:none;\" id=\"stop1\" name=\"stop\"  onclick=\"stopchangenable(this)\">stop</button></td></tr>"
//     + "<tr><th>Job Name</th><td></td></tr>"
//     + "<tr><th>Last Update</th><td></td></tr>"
//     + "<tr><th>Status</th><td></td></tr>"
//     + "<tr><th>Speed</th><td></td></tr>"
//     + "<tr><th>Bitrate</th><td></td></tr>"
//     + "<tr><th>Run Time</th><td></td></tr>"
//     + "<tr><th>VideoSize</th><td></td></tr>"
//     + "<tr><th>Edit/Save</th><td><button id=\"edit1\" onclick=\"edit(this)\">edit</button><button  style=\"display:none;\" id=\"save1\" onclick=\"save(this)\">save</button></td></tr>"
//     + "<tr><th>Preview</th><td></td></tr>"
// bodys1.appendChild(JobsList1);
// var JobsList2 = document.createElement("table");
// JobsList2.id = "JobsList2";
// JobsList2.innerHTML = "<tr><th>Start/Stop</th><td><button id=\"start2\" name=\"start\" onclick=\"startchangenable(this)\">start</button><button  style=\"display:none;\" id=\"stop2\" name=\"stop\"  onclick=\"stopchangenable(this)\">stop</button></td></tr>"
//     + "<tr><th>Job Name</th><td></td></tr>"
//     + "<tr><th>Last Update</th><td></td></tr>"
//     + "<tr><th>Status</th><td></td></tr>"
//     + "<tr><th>Speed</th><td></td></tr>"
//     + "<tr><th>Bitrate</th><td></td></tr>"
//     + "<tr><th>Run Time</th><td></td></tr>"
//     + "<tr><th>VideoSize</th><td></td></tr>"
//     + "<tr><th>Edit/Save</th><td><button id=\"edit2\" onclick=\"edit(this)\">edit</button><button  style=\"display:none;\" id=\"save2\" onclick=\"save(this)\">save</button></td></tr>"
//     + "<tr><th>Preview</th><td></td></tr>"
// bodys2.appendChild(JobsList2);
// var JobsList3 = document.createElement("table");
// JobsList3.id = "JobsList3";
// JobsList3.innerHTML = "<tr><th>Start/Stop</th><td><button id=\"start3\" name=\"start\" onclick=\"startchangenable(this)\">start</button><button  style=\"display:none;\" id=\"stop3\" name=\"stop\"  onclick=\"stopchangenable(this)\">stop</button></td></tr>"
//     + "<tr><th>Job Name</th><td></td></tr>"
//     + "<tr><th>Last Update</th></td><td></td></tr>"
//     + "<tr><th>Status</th><td></td></tr>"
//     + "<tr><th>Speed</th><td></td></tr>"
//     + "<tr><th>Bitrate</th><td></td></tr>"
//     + "<tr><th>Run Time</th><td></td></tr>"
//     + "<tr><th>VideoSize</th><td></td></tr>"
//     + "<tr><th>Edit/Save</th><td><button id=\"edit3\" onclick=\"edit(this)\">edit</button><button  style=\"display:none;\" id=\"save3\" onclick=\"save(this)\">save</button></td></tr>"
//     + "<tr><th>Preview</th><td></td></tr>"
// bodys3.appendChild(JobsList3);

var configElem = document.createElement("div");
configElem.setAttribute("id", "config");
//configElem.style.visibility = "hidden";
volo.appendChild(configElem);
function loadJson(filename, callback=null,count=null) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            try {
                var obj = JSON.parse(this.responseText);
                if (obj && callback) {
                    callback(obj,count,filename);
                }
            } catch(e) {}
        }
    };
    xhttp.open("GET", "api/"+filename, true);
    xhttp.send();
}
function showJobStatus(job,i) {

    document.getElementById("JobsList"+i).rows[3].cells[1].textContent = job.Status;
    document.getElementById("JobsList"+i).rows[4].cells[1].textContent = job.Info[0].ifps;
    document.getElementById("JobsList"+i).rows[5].cells[1].textContent = job.Info[0].ibitrate;
    document.getElementById("JobsList"+i).rows[6].cells[1].textContent = job.Info[0].out_time.split(".")[0];
    document.getElementById("JobsList"+i).rows[7].cells[1].textContent = job.MediaInfo.src[0].stream[0].width + "*" + job.MediaInfo.src[0].stream[0].height;
    if (job.Thumbnail) {
        document.getElementById("JobsList"+i).rows[9].cells[1].innerHTML = "<img src=\"data:image/png;base64," + job.Thumbnail + "\"/>";
    }
}
function showJobsList(job,i) {
    document.getElementById("JobsList"+i).rows[1].cells[1].textContent = job.Job;
    document.getElementById("JobsList"+i).rows[2].cells[1].textContent = job.Timestamp;
    loadJson(job.Job+"/index.json", showJobStatus,i);

}
function update(job) {
  for(var i=0;i<job.length;i++){
    loadJson(job[i].dir+"/idx.json", showJobsList,i);
  }
}
loadJson("", update);
setInterval(function(){ loadJson("", update); }, 3000);

function saveJob(jobOld, jobNew, filename) {
    var result = {};
    for(var key in jobOld) result[key] = jobOld[key];
    for(var key in jobNew) result[key] = jobNew[key];

    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "api/"+filename, true);
    xhttp.send(JSON.stringify(result));
}
function startenableJob(jobName,num) {
    var jobNew = {"Enable": "true"};
    loadJson("../"+jobName[num].dir, saveJob, jobNew);
}
function stopenableJob(jobName,num) {
    var jobNew = {"Enable": "false"};
    loadJson("../"+jobName[num].dir, saveJob, jobNew);
}
function startchangenable(self){
  self.style.display="none";
  var num = self.id.split("start");
  document.getElementById("stop"+num[1]).style.display="block";
  loadJson("", startenableJob,num[1]);
}
function stopchangenable(self){
  self.style.display="none";
  var num = self.id.split("stop");
  document.getElementById("start"+num[1]).style.display="block";
  loadJson("", stopenableJob,num[1]);
}

function edit(self){
    self.style.display = "none";
    document.getElementById("save"+self.id.split("edit")[1]).style.display = "block";
    var trs = self.parentNode.parentNode.parentNode.children;
    for(var i=0;i<trs.length;i++){
      var tdobj = document.createElement("td");
      if(i == 0 || i == 1 || i == 2 || i == 3 || i == 9 || i == 8){
        trs[i].children[1].setAttribute("colspan","2");
        continue;
      }
      tdobj.innerHTML = "<input type='text' id=\""+self.id+"td"+i+"\" placeholder=\"修改为...\" value=''/>";
      trs[i].appendChild(tdobj);
    }
}
function save(self){
  self.style.display = "none";
  document.getElementById("edit"+self.id.split("save")[1]).style.display = "block";

  var num = self.id.split("save");
  var trs = self.parentNode.parentNode.parentNode.children;
  var jobname = trs[1].children[2].textContent;

  var url="api/"+jobname+"/index.json";
  startAjax(self,url);

  for(var i=0;i<trs.length;i++){
    if(i == 0 || i == 1 || i == 2 || i == 3 || i == 9 || i == 8){
      trs[i].children[1].setAttribute("colspan","0");
      continue;
    }
    trs[i].removeChild(trs[i].children[2]);
  }
}
function ajaxs(url,obj){
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("PUT",url, true);
  xmlhttp.setRequestHeader("Content-Type","text/plain;charset=UTF-8");
  xmlhttp.send(JSON.stringify(obj));
  xmlhttp.onreadystatechange = function(){
      if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
          console.log(xmlhttp.responseText);
      }
  }
}
function startAjax(self,url){
  var trs = self.parentNode.parentNode.parentNode.children;
  var tr4val = document.getElementById(trs[4].children[3].children[0].id).value;
  var tr5val = document.getElementById(trs[5].children[3].children[0].id).value;
  var tr6val = document.getElementById(trs[6].children[3].children[0].id).value;
  var obj={};
  var xmlhttp;
    if(window.XMLHttpRequest){
      xmlhttp=new XMLHttpRequest();
    }else {
      xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange=function(){
      if(xmlhttp.readyState==4&&xmlhttp.status==200){
        var data=xmlhttp.responseText;
        var dataObj=JSON.parse(data);
        for(var item in dataObj){
          if(dataObj.Info[0].hasOwnProperty("ifps")){
            dataObj.Info[0].ifps = tr4val;
          }else{
            dataObj.Info[0].ifps ="25.00";
          }
          if(dataObj.Info[0].hasOwnProperty("ibitrate")){
            dataObj.Info[0].ibitrate = tr5val;
          }else{
            dataObj.Info[0].ibitrate ="0.00";
          }
          if(dataObj.Info[0].hasOwnProperty("out_time")){
            dataObj.Info[0].out_time = tr6val;
          }else{
            dataObj.Info[0].out_time ="01:00:00";
          }
          obj[item]=dataObj[item];
        }
        ajaxs(url,obj);
      }
    }
    xmlhttp.open("GET",url,true);
    xmlhttp.send();
}
