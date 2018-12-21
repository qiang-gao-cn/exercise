/*
 * volo.js: Simple javascript to demonstrate volo api.
 * Author: harry.ma@dao-lab.com
 */
document.head.innerHTML += '<link rel="shortcut icon" href="/favicon.ico" type="image/x-icon">';
document.head.innerHTML += '<title>Volo Video Optimizer</title>';
document.head.innerHTML += '<meta charset="utf-8">';
document.head.innerHTML += '<meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">';
document.head.innerHTML += '<link rel="stylesheet" type="text/css" href="volo.css">';
document.body.innerHTML += '<h3>Volo Cube Job Summary</h3>';
document.body.innerHTML += '<div id="volo"></div>';

var jobs_list = {};

function loadJson(url, callback = null, item = null) {
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
      } catch (e) {}
    }
  };
  xhttp.open("GET", url, true);
  xhttp.send();
}

function updateJson(jobOld, jobNew, filename) {
  var result = {};
  for (var key in jobOld) result[key] = jobOld[key];
  for (var key in jobNew) result[key] = jobNew[key];

  var xhttp = new XMLHttpRequest();
  xhttp.open("PUT", filename, true);
  xhttp.send(JSON.stringify(result));
}

function start_stop_job(jobName, to_change) {
  var jobNew = {
    "enable": to_change ? "1" : "0"
  };
  var job_url = '/api/' + jobName + '.job';
  updateJson(jobs_list[jobName], jobNew, job_url, loadJson, job_url);
  loadJson(job_url, show_job, job_url);
}

function update_output_rtmp(jobName, srv_url_id, srv_key_id, save_output_id) {
  var url_new = document.getElementById(srv_url_id).value + '/' + document.getElementById(srv_key_id).value;
  var url_parts = url_new.split('/');
  if (url_new.startsWith('rtmp://') && url_parts.length == 5) {
    var jobNew = {
      "output": url_new
    };
    var job_url = '/api/' + jobName + '.job';
    updateJson(jobs_list[jobName], jobNew, job_url, loadJson, job_url);
    loadJson(job_url, show_job, job_url);
    document.getElementById(save_output_id).value = "save";
  } else {
    alert("Invalid rtmp url. it looks like rtmp://ip:port/app/stream");
  }
}

function load_preview(jobName, input_id, player_id) {
  var player = "";
  if (jobName == "facebook") {
    player = "write one line facebook iframe here";
  } else if (jobName == "youtube") {
    player = "write one line youtube iframe here";
  } else if (jobName == "record") {
    player = "write one line video.js player here";
  }
  document.getElementById(player_id).innerHTML = player+ "<br />"
  + "<iframe src=\"https:\/\/www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Fam730hk%2Fvideos%2F"+document.getElementById(input_id).value+"%2F&width=426&show_text=false&height=240&appId\" width=\"426\" height=\"240\" style=\"border:none;overflow:hidden\" scrolling=\"no\" frameborder=\"0\" allowTransparency=\"true\" allow=\"encrypted-media\" allowFullScreen=\"true\"></iframe>";
}

function render_label(jobObj, jobName, itemObj, itemName, itemValue) {
  itemObj.innerHTML = itemName + ": " + itemValue;
}

function render_enable(jobObj, jobName, itemObj, itemName, itemValue) {
  if (itemName == "enable") {
    var label = "Start";
    var to_change = "1";
    if (itemValue == 1 || itemValue == "true") {
      label = "Stop";
      var to_change = "0";
    }
    itemObj.innerHTML = '<input type="button" onclick="start_stop_job(\'' + jobName + '\', ' + to_change + ')" value=' + label + '>';
  }
}

function render_output(jobObj, jobName, itemObj, itemName, itemValue) {
  if (itemName == "output") {
    var url_parts = itemValue.split('/');
    if (itemValue.startsWith('rtmp://') && url_parts.length == 5) {
      if (itemObj.innerHTML == "") {
        var server_url_id = jobName + '.srv.url';
        var server_key_id = jobName + '.srv.key';
        var save_output_id = jobName + '.save.output';

        var server_url = 'url: <input id="' + server_url_id + '" type="text" value="rtmp://' + url_parts[2] + '/' + url_parts[3] + '" oninput="document.getElementById(\'' + save_output_id + '\').value=\'*save\'">';
        var server_key = 'key: <input id="' + server_key_id + '" type="text" value="' + url_parts[4] + '" oninput="document.getElementById(\'' + save_output_id + '\').value=\'*save\'">';
        var button = '<input id="' + save_output_id + '" type="button" value="save" onclick="update_output_rtmp(\'' + jobName + '\', \'' + server_url_id + '\', \'' + server_key_id + '\', \'' + save_output_id + '\')">';
        itemObj.innerHTML += server_url +"<br/>"+ server_key +"<br/>"+ button;
      }
    } else {
      render_label(jobObj, jobName, itemObj, itemName, itemValue)
    }
  }
}

function render_preview(jobObj, jobName, itemObj, itemName, itemValue) {
  if (jobName != "capture" && itemObj.innerHTML == "") {
    var player_id = jobName + '.preview.player';
    var input_id = jobName + '.preview.input';
    itemObj.innerHTML = 'preview: <input type="text" id="' + input_id + '"> <input type="button" value="load" onclick="load_preview(\'' + jobName + '\', \'' + input_id + '\', \'' + player_id + '\')"><div style="border:none;" class="video_div" id="' + player_id + '"></div>';
  }
}

function set_item(jobObj, jobName, itemName, fn_render) {
  if (jobObj.hasOwnProperty(itemName)) {
    if (!document.getElementById(jobName)) {
      document.getElementById("volo").innerHTML += '<div class="job_div" id="' + jobName + '">';
    }
    if (!document.getElementById(jobName + '.' + itemName)) {
      document.getElementById(jobName).innerHTML += '<div class="field_div" id="' + jobName + '.' + itemName + '">';
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
  if (jobObj.hasOwnProperty("report")) {
    set_item(jobObj.report, jobName, "ifps", render_label);
    set_item(jobObj.report, jobName, "ibitrate", render_label);
    set_item(jobObj.report, jobName, "speed", render_label);
  }
  set_item(jobObj, jobName, "enable", render_enable);
  set_item(jobObj, jobName, "output", render_output);
  set_item(jobObj, jobName, "state", render_label);


  if (url.split('.').pop() == 'job') {
    jobs_list[jobName] = jobObj;
  }

  set_item({"preview": 1}, jobName, "preview", render_preview);
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
setInterval(function() {
  update();
}, 3000);
