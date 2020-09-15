var timeunit
try {
  timeunit = document.getElementById("helper").getAttribute("time-unit");
} catch {
  timeunit = 'year'
}

var coef
if (timeunit == 'year') {
  coef = 1.0
} else if (timeunit == 'month') {
  coef = 1.0/12
} else if (timeunit == 'day') {
  coef = 1.0/365
}


var modeltype
try {
  modeltype = document.getElementById("helper").getAttribute("model-type");
} catch {
  modeltype = 'year'
}

var task_id
try {
  task_id = document.getElementById("helper").getAttribute("task-id");
} catch {
}


function initgeomap(center = [51.505, -0.09], zoom = 2){
  ii = 0
  mymap = L.map('gfx_holder').setView(center, zoom);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}', {
    foo: 'bar',
    attribution: 'Map data <a href="https://www.openstreetmap.org/">OpenStreetMap</a> under <a href="http://opendatacommons.org/licenses/odbl/1.0/">ODbL</a>',
    maxZoom: 18,
}).addTo(mymap);

  mymap.on('contextmenu', function(ev) {
    latlng = ev.latlng
    addNewTech(latlng.lat, latlng.lng)
});

  mymap.on('keypress', function(ev) {
    var keyName = event.key;
    if (keyName == 'z') {
      changeZoom()
    }
  })


  goldIcon = new L.Icon({
  iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [18.75, 30.75],
  iconAnchor: [9, 30.75],
  popupAnchor: [0.75, -8.5],
  shadowSize: [30.75, 30.75]});

  blueIcon = new L.Icon({
  iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [18.75, 30.75],
  iconAnchor: [9, 30.75],
  popupAnchor: [0.75, -8.5],
  shadowSize: [30.75, 30.75]});

  redIcon = new L.Icon({
  iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [18.75, 30.75],
  iconAnchor: [9, 30.75],
  popupAnchor: [0.75, -8.5],
  shadowSize: [30.75, 30.75]});

  bluegoldIcon = new L.Icon({
  iconUrl: '/static/figure/markers/blue-gold.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [18.75, 30.75],
  iconAnchor: [9, 30.75],
  popupAnchor: [0.75, -8.5],
  shadowSize: [30.75, 30.75]});

  redgoldIcon = new L.Icon({
  iconUrl: '/static/figure/markers/red-gold.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [18.75, 30.75],
  iconAnchor: [9, 30.75],
  popupAnchor: [0.75, -8.5],
  shadowSize: [30.75, 30.75]});

  redblueIcon = new L.Icon({
  iconUrl: '/static/figure/markers/red-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [18.75, 30.75],
  iconAnchor: [9, 30.75],
  popupAnchor: [0.75, -8.5],
  shadowSize: [30.75, 30.75]});

  redbluegoldIcon = new L.Icon({
  iconUrl: '/static/figure/markers/red-blue-gold.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [18.75, 30.75],
  iconAnchor: [9, 30.75],
  popupAnchor: [0.75, -8.5],
  shadowSize: [30.75, 30.75]});

  var legend = L.control({position: 'bottomleft'});
    legend.onAdd = function (mymap) {

    var div = L.DomUtil.create('div', 'card');
    labels = ['<strong>Categories</strong>'],
    categories = ['Supply', 'Tech Site', 'Tech Cand'];
    color = ['gold', 'blue', 'red']

    for (var i = 0; i < categories.length; i++) {

            div.innerHTML +=
            labels.push(
                '<div><img src="https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-' + color[i] + '.png" style = "width: 10px" alt="" style="vertical-align:middle"> - ' + categories[i] + '</div>'
            );
        }
        div.innerHTML = labels.join('');
    return div;
    };
    legend.addTo(mymap);
}

function makeid(length) {
   var result           = '';
   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}

function changeZoom(){
 if (markerls.length >= 2) {
   var latlonls = []
   for (var i = 0; i < markerls.length; i++) {
     latlonls.push([markerls[i].getLatLng().lat, markerls[i].getLatLng().lng])
   }
   mymap.fitBounds(latlonls)
  }
}

function findMarkerByID(id){
  for (var i = 0; i < markerls.length; i++){
    if (markerls[i].id == id){
      return i
    }
  }
  return
}

function findMarkerByLatLng(lat,lng) {
  for (var j = 0; j < markerls.length; j++){
    if (Math.abs(markerls[j].getLatLng().lat - lat) < 0.001 && Math.abs(markerls[j].getLatLng().lng - lng) < 0.001) {
      return [true, j]
    }
  }
  return [false,-1]
}

function findProdIndexByID(id){
  for (var i = 0; i < prodlist.length; i++){
    if (prodlist[i].id == id){
      return i
    }
  }
  return
}

function findTechIndexByID(id){
  for (var i = 0; i < techlist_all.length; i++){
    if (techlist_all[i].id == id){
      return i
    }
  }
  return
}

function markerSetColor(marker){
  var flags = 0
  var flagts = 0
  var flagtc = 0

  if (marker.data.length > 0){
    flags = 1
  }

  for (i = 0; i < marker.tech.length; i++) {
    if (marker.tech[i].type == "Technology Site Data") {
      flagts = 1
    }
    if (marker.tech[i].type == "Technology Candidate Data") {
      flagtc = 1
    }
  }
  if (flags){
    marker.setIcon(goldIcon)
  }
  if (flagts) {
    marker.setIcon(blueIcon)
  }
  if (flagtc) {
    marker.setIcon(redIcon)
  }
  if (flagts && flags) {
    marker.setIcon(bluegoldIcon)
  }
  if (flagtc && flags) {
    marker.setIcon(redgoldIcon)
  }
  if (flagtc && flagts) {
    marker.setIcon(redblueIcon)
  }
  if (flagtc && flagts && flags) {
    marker.setIcon(redbluegoldIcon)
  }

}

// Node form - frame
function nodeForm(nodename = "", lat = "", lng = "", data = [{name:"default", price:"0", cap:"0"}], tech = []) {
  formid = 'nodeForm' + makeid(8)
  var content = '<div class = "container" id = "'+ formid +'"><h5>General Information</h5><div class="form-group"> <label>Name</label>  <input class="form-control" id = "name" type="text" placeholder = "Name" value = "' + nodename + '"/> </div><div class="form-group"> <label>Location</label> <div class="input-group"><input type="number" aria-label="Latitude" class="form-control" id = "lat" placeholder = "Latitude" value = "' + lat + '"><input type="number" aria-label="Longitude" class="form-control" id = "lng" placeholder = "Longitude" value = "' + lng + '"></div></div>'

  var alreadydata = 0
  if (data) {
    alreadydata = 1
    for (i = 0; i < data.length; i++){
      if (i == 0){
        content += supContent(formid, false, data[i].name, data[i].price, data[i].cap)
      }
      else {
        content += supContent(formid, false, data[i].name, data[i].price, data[i].cap)
      }
    }
  }

    for (i = 0; i < tech.length; i++){
      if (i == 0){
        content += techContent(formid, alreadydata, tech[i].type, tech[i].name, tech[i].cap)
      }
      else {
        content += techContent(formid, true, tech[i].type, tech[i].name, tech[i].cap)
      }
    }

  content += '</div>'
  content += '<ion-icon name="add-circle-outline" class = "iconpiclarger" style = "color:#9A0000; cursor: pointer;" onclick = "addTechContent(\''+formid+'\')" ></ion-icon>'
  return [content, formid]
}

// Supply form - supply content - readonly for this step
function supContent(formid, removable = false, name = "default", price = "0", cap = "0") {
  var contentid = 'supcontent' + makeid(8)
  var content = ' <div id = "'+ contentid + '"><br/><div class = "row"> <div class = "col text-left"><h5> Supply Information </h5></div>'
  if (removable) {
    content += '<div class = "col text-right"><ion-icon name="remove-circle-outline" class = "iconpiclarger" style = "color:#9A0000; cursor: pointer;" onclick = "removeSupContent(\''+contentid+'\')"></ion-icon></div>'
  }
  content += '</div> <div class="form-group"> <label>Supplied feedstock</label> <select name="supprod" class = "form-control prodtype" readonly>'
  for (var j = 0; j < prodlist.length; j++){
    if (name != prodlist[j].id) {
      content +=   '<option value = "' + prodlist[j].id + '" disabled> p' + prodlist[j].id + ' - ' + prodlist[j].name + ' - ' + prodlist[j].unit + ' </option>'
    } else {
      content +=   '<option value = "' + prodlist[j].id + '" selected> p' + prodlist[j].id + ' - ' + prodlist[j].name + ' - ' + prodlist[j].unit + '</option>'
    }
  }
  content += '</select> </div>'
  content += '<div class="form-group"> <label>Supplied capacity (product unit/' + timeunit + ')</label>  <input class="form-control prodcap " type="number" value = ' + cap + ' min = 0 readonly/> </div> <div class="form-group"> <label> Supplied price (USD/product unit) </label> <input class="form-control prodprice" type="number" value = ' + price + '  readonly/></div></div>'

  return content
}

// Tech form - technology content
function techContent(formid, removable = false, type = "Select data type", name = "default", cap = "0") {
  var code = makeid(8)
  var contentid = 'techcontent' + code
  var content = ' <div id = "'+ contentid + '"><br/><div class = "row"> <div class = "col text-left"><h5> Technology Information </h5></div>'
  if (removable) {
    content += '<div class = "col text-right"><ion-icon name="remove-circle-outline" class = "iconpiclarger" style = "color:#9A0000; cursor: pointer;" onclick = "removeTechContent(\''+contentid+'\')"></ion-icon></div>'
  }
  content += '</div> <div class="form-group"> <label>Data type</label> <select name="techtype" class = "form-control techtype" id = "type' + code + '" onchange = "UpdateTechCap(\'' + code + '\')">'
  if (type == "Select data type") {
    content += '<option value = "Select data type" selected hidden disabled> Select Data Type </option>'
  }
  if (type == "Technology Site Data") {
    content += '<option value = "Technology Site Data" selected> Technology Site </option>'
  } else {
    content += '<option value = "Technology Site Data"> Technology Site </option>'
  }
  if (modeltype == 1) {
    if (type == "Technology Candidate Data") {
      content += '<option value = "Technology Candidate Data" selected> Technology Candidate </option>'
    } else {
      content += '<option value = "Technology Candidate Data"> Technology Candidate </option>'
    }
  } else {
    content += '<option value = "Technology Candidate" disabled> Technology Candidate </option>'
  }
  content += '</select></div> <div class="form-group"> <label>Technology</label> <select name="techname" class = "custom-select techname" onchange = "addTech()"> <option value = "default" disabled selected> Please select a technology</option>' //<option value = "ADD">Add a technology</option>

  for (var j = 0; j < techlist.length; j++){
    if (name != techlist[j].id) {
      content +=   '<option value = "' + techlist[j].id + '"> *t' + techlist[j].id + ' - ' + techlist[j].name + ' </option>'
    } else {
      content +=   '<option value = "' + techlist[j].id + '" selected> *t' + techlist[j].id + ' - ' + techlist[j].name + '</option>'
    }
  }
  for (var j = 0; j < techlist_all.length; j++) {
    if (techlist.includes(techlist_all[j])){
    } else {
      if (name != techlist_all[j].id) {
        content +=   '<option value = "' + techlist_all[j].id + '"> t' + techlist_all[j].id + ' - ' + techlist_all[j].name + ' </option>'
      } else {
        content +=   '<option value = "' + techlist_all[j].id + '" selected> t' + techlist_all[j].id + ' - ' + techlist_all[j].name + '</option>'
      }
    }
  }
  content += '</select> </div>'
  content += '<div class="form-group"> <label>Technology capacity (reference product unit/' + timeunit + ')</label>  <input class="form-control techcap " id = "techcap' + code + '" type="number" value = ' + cap + ' min = 0 disabled/> </div> </div>'

  return content
}
// Once select tech candidate, the capacity form is disabled
function UpdateTechCap(code){
  var value = $('#type' + code).val()
  if (value == 'Technology Site Data') {
    $('#techcap' + code).prop('disabled', false );
  } else {
    $('#techcap' + code).prop('disabled', true );
  }
}

function addTech(){
  if ($(".techname").val() == "ADD") {
    alertify.confirm().close()
    techConfirm(task_id, url = '/expert/usermain/techbase?task='+task_id)
  }
}

// Add a technology content form to the frame
function addTechContent(formid, name = "default", price = "0", cap = "0") {
  // Need to extract values manually
  var lat = $('#lat').val()
  var lng = $('#lng').val()
  var name = $('#name').val()
  var data = []
  var tech = []
  for (i = 0; i < $('.prodcap').length; i++) {
    item = {name: $('.prodtype')[i].value, price: $('.prodprice')[i].value, cap: $('.prodcap')[i].value}
    data.push(item)
  }
  for (i = 0; i < $('.techcap').length; i++) {
    item = {type: $('.techtype')[i].value, name: $('.techname')[i].value, cap: $('.techcap')[i].value}
    tech.push(item)
  }

  // add an empty form
  var content = $('#'+formid).html()
  content = content  + techContent(formid, removable = true)
  $('#'+formid).html(content)
  // Set values manually
  $('#lat').val(lat)
  $('#lng').val(lng)
  $('#name').val(name)
  for (i = 0; i < $('.prodcap').length - 1; i++) {
    $('.prodtype')[i].value = data[i].name
    $('.prodprice')[i].value = data[i].price
    $('.prodcap')[i].value = data[i].cap
  }
  for (i = 0; i < $('.techcap').length - 1; i++) {
    $('.techtype')[i].value = tech[i].type
    $('.techname')[i].value = tech[i].name
    $('.techcap')[i].value = tech[i].cap
  }
}

// Remove a content from from the frame
function removeTechContent(contentid) {
  $('#'+contentid).html("")
}

// Add a new, blank technology node
function addNewTech(latinput = false, lnginput = false){
  if (latinput && lnginput){
    content = nodeForm(nodename = "", lat = latinput, lng = lnginput, data = [], techtype = [{type:"Select data type", name:"default", cap:"0"}])[0]
  } else {
    content = nodeForm(nodename = "", lat = "", lng = "", data = [], techtype = [{type:"Select data type", name:"default", cap:"0"}])[0]
  }
  alarm = alertify.confirm(content)

  alarm.set('onok', function(closeEvent) {
      var lat = $('#lat').val()
      var lng = $('#lng').val()

    var name = $('#name').val()
    if (name.length == 0) {
      name = "Anon."
    }
    var data = []
    var tech = []

    for (i = 0; i < $('.prodcap').length; i++) {
      item = {name: $('.prodtype')[i].value, price: $('.prodprice')[i].value, cap: $('.prodcap')[i].value}
      data.push(item)
    }

    for (i = 0; i < $('.techcap').length; i++) {
      item = {type: $('.techtype')[i].value, name: $('.techname')[i].value, cap: $('.techcap')[i].value}
      tech.push(item)
    }

    var marker = newmarker(lat,lng,name,data,tech)

    markerSetColor(marker)
    marker.addTo(mymap)
    markerls.push(marker)
    changeZoom();

    alarm.destroy();
  }).set('oncancel', function(closeEvent) {alarm.destroy();}).set('title', 'Add a Technolode Site/Candidate').set('closable',true).set('labels', {ok:'Ok', cancel:'Cancel'})
}

// Define a marker
function newmarker(lat, lon, name, data, tech = []){

  var id = makeid(8)
  var marker = L.marker([lat, lon], {
    title: name     ,
    draggable: true,
    icon: goldIcon} )
  marker.name = name
  marker.id = id
  marker.data = data
  marker.tech = tech
  var pop = marker.bindTooltip("<b>"+marker.name + "</b>")

  marker.on('dblclick', (event)=>{
    val = nodeForm(nodename = marker.name, lat = marker.getLatLng().lat, lng = marker.getLatLng().lng, marker.data, marker.tech)
    marker.content = val[0]
    formid = val[1]

      alertify.confirm(marker.content).set('title', 'Information').set('onok', function(closeEvent) {
        var lat = $('#lat').val()
        var lng = $('#lng').val()
        var name = $('#name').val()
        var data = []
        var tech = []

        for (i = 0; i < $('.prodcap').length; i++) {
          item = {name: $('.prodtype')[i].value, price: $('.prodprice')[i].value, cap: $('.prodcap')[i].value}
          data.push(item)
        }

        for (i = 0; i < $('.techcap').length; i++) {
          item = {type: $('.techtype')[i].value, name: $('.techname')[i].value, cap: $('.techcap')[i].value}
          tech.push(item)
        }

        marker.setLatLng(L.latLng(lat, lng))
        marker.name = name
        if (marker.name.length == 0) {
          marker.name = "Anon."
        }
        marker.data = data
        marker.tech = tech

        markerSetColor(marker);

        marker.unbindTooltip()
        var pop = marker.bindTooltip("<b>"+marker.name + "</b>")
        alertify.confirm().destroy()
      }).set('oncancel', function(closeEvent) {
        alertify.confirm().destroy();
      }).set('closable',true).set('labels', {ok:'Ok', cancel:'Cancel'})
        });

  marker.on('contextmenu',(event)=>{
    alertify.confirm('Delete', 'Delete this marker?',
    function() {
      marker.removeFrom(mymap);
      markerls.splice(findMarkerByID(marker.id),1)
    }, null).set('labels',{ok:'Yes', cancel:'Cancel'}).set('closable',true)
  })

  return marker
}

// Embedded simplified database
function lookForTech(){
  var content = ' <div class = "row"> <div class = "col text-left"><h5> Technology Database </h5></div></div>'
  content += ' <div class="form-group"> <label>Technology</label> <select name="techtype" class = "custom-select" id = "techtype" onchange = "updateTechInfo()" >'
  content += '<option value = "default" disabled selected> Please select a technology </option>' //<option value = "ADD"> Add a technology</option>
  for (var j = 0; j < techlist_all.length; j++){
      if (techlist.includes(techlist_all[j])) {
        content +=   '<option value = "' + techlist_all[j].id + '"> *' + techlist_all[j].name + ' - t' + techlist_all[j].id +  ' </option>'
      } else {
        content +=   '<option value = "' + techlist_all[j].id + '"> ' + techlist_all[j].name + ' - t' + techlist_all[j].id +  ' </option>'
      }

  }
  content += '</select> </div><div id = "techsummary"> </div>'

  alertify.alert(content).set('title', 'Technology Database').set('onok', function(closeEvent) {
    alertify.alert().destroy()
  }).set('closable',true).set('label', 'Close')
}

function updateTechInfo() {
  if ($("#techtype").val() == "ADD") {
    alertify.confirm().close()
    techConfirm(task_id, url = '/expert/usermain/techbase?task='+task_id)
  } else {
  techid = $('#techtype').val()
  i = findTechIndexByID(techid)
  p = findProdIndexByID(techlist_all[i].refprod)

  var content = '<br/><h5>Basic Information</h5><div class = "container text-left" style = "width: 100%;" > <ul class="list-group"> <li class="list-group-item"><strong>Technology Name: </strong>  ' + techlist_all[i].name + ' </li> <li class="list-group-item"><strong> Technology ID: </strong> t' + techlist_all[i].id + '</li><li class="list-group-item"><strong>Reference Product: </strong> p' + techlist_all[i].refprod + ' - ' + prodlist[p].name + ' - ' +prodlist[p].unit + '</li> <li class="list-group-item"><strong>Capacity(refprod unit/' + timeunit + '): </strong>' + (coef*Number(techlist_all[i].capmin)).toFixed(0) + ' ~ ' + (coef*Number(techlist_all[i].capmax)).toFixed(0) + '</li> <li class="list-group-item"><strong>Investment Cost (USD): </strong> ' + (coef*Number(techlist_all[i].invfix)).toFixed(2) + ' + ' + (coef*Number(techlist_all[i].invpro)).toFixed(2) + '*Capacity </li> <li class="list-group-item"><strong>Operational Cost (USD/' + timeunit +'): </strong> ' + (coef*Number(techlist_all[i].opfix)).toFixed(2) + ' + ' + (coef*Number(techlist_all[i].oppro)).toFixed(2) + '*Capacity </li> <li class="list-group-item"><strong>Description: </strong>' + techlist_all[i].note + '</li> </ul> </div><br/> <h5>Related Materials</h5><div class = "row"> <table width = 100% class = "table text-center table-hover"> <thead> <tr> <th>Material Name</th> <th>Role</th> <th>Conversion</th></tr></thead><tbody>'
  for (j = 0; j < techlist_all[i].transformationset.length; j++) {
    content += '<tr><td>' + techlist_all[i].transformationset[j].prodname + '</td>'
    if (Number(techlist_all[i].transformationset[j].yield) > 0 ) {
      content += '<td>Outflow</td>'
    } else {
      content += '<td>Inflow</td>'
    }
    content += '<td>' + techlist_all[i].transformationset[j].yield + ' (' + prodlist[findProdIndexByID(techlist_all[i].transformationset[j].prodid)].unit+ ')' + '</td>'
    content += '</tr>'
  }
  content += '</tbody></table> <div class = "container" style = "width:80%;left:10%"><img src = "' + techlist_all[i].png +'" style= "width:100%"/></div></div>'

  $('#techsummary').html(content)
  }
}

// Clear all markers on the map
function techClear() {
  alertify.confirm('Confirm', 'Clear all technology?',
  function() {
    indexls = []
    for (var i = 0; i < markerls.length; i++){
      if (markerls[i].data.length) {
        markerls[i].tech = []
        markerls[i].setIcon(goldIcon)
      } else {
        markerls[i].removeFrom(mymap)
        indexls.push(i)
      }
    }
    for (j = 0; j < indexls.length; j++) {
      i = indexls.length-1-j
      markerls.splice(indexls[i],1)
    }
  }, null).set('labels',{ok:'Yes', cancel:'Cancel'}).set('closable',true)
}

// Load a technology data file
function techLoad(taskid){
  var techfileHTML = $('.select_tech').html();
  $('.select_tech').html("");
    alertify.confirm(techfileHTML).set('onok', function(closeEvent) {
      var fileid = $('#techfileselection').val();

        if (fileid > 0){
          ajaxRequestTechData(fileid);
        }
      $('#techfileselection')[0].value = '';
      $('.select_tech').html(techfileHTML);
      alertify.confirm().destroy();
    }).set('oncancel', function(closeEvent){
      $('#techfileselection')[0].value = '';
      $('.select_tech').html(techfileHTML);
      alertify.confirm().destroy();
    }).set('title', "Load a technology file").set('labels', {ok:'Ok', cancel:'Cancel'}).set('closable',true);;
}

function ajaxRequestTechData(fileid) {
  var el = document.getElementsByName("csrfmiddlewaretoken");
  var csrf_value = el[0].getAttribute("value");
  var techids = []
  for (i = 0; i < techlist_all.length; i++) {
    techids.push(techlist_all[i].id)
  }
  techids = JSON.stringify(techids)
  jQuery.ajax({
    method: "POST",
    url: "/expert/ajax/techfileselection",
    data: {csrfmiddlewaretoken: csrf_value, fileid: fileid, techids: techids},
    success: function (data) {
      if (data) {
        if (data.msg.length > 0 ) {
          for (var i = 0; i < data.msg.length; i++){
            alertify.notify(data.msg[i], 'error', 10, null);
          }
        } else {
          for (var i = 0; i < markerls.length; i++){
            markerls[i].removeFrom(mymap)
          }
          techdata = data.techdata
          type = data.techtype

          for (i = 1; i < techdata.length; i++) {
            var lat = Number(techdata[i][1])
            var lng = Number(techdata[i][2])

            var value = findMarkerByLatLng(lat,lng)
            var flag = value[0]
            var index = value[1]
            //console.log(flag)
            if (flag) {
              if (markerls[index].name.includes(techdata[i][0]) == false){
                markerls[index].name = markerls[index].name + ' ' + techdata[i][0]
                markerls[index].unbindTooltip()
                var pop = markerls[index].bindTooltip("<b>"+markerls[index].name + "</b>")
              }
              var cap
              try {
                cap = Number(techdata[i][4])
              } catch {
                cap = 0
              }
              markerls[index].tech.push({type: type, name: techdata[i][3].slice(1), cap: cap})
              markerSetColor(markerls[index])
            } else {

              var name = techdata[i][0]
              if (name.length == 0) {
                name = "Anon."
              }
              var cap
              try {
                cap = Number(techdata[i][4])
              } catch {
                cap = 0
              }
              var tech = [{type: type, name: techdata[i][3].slice(1), cap: cap}]
              var marker = newmarker(lat,lng,name,false,tech)
              markerls.push(marker)
              markerSetColor(marker)
            }

          }
          for (i = 0; i < markerls.length; i++) {
            markerls[i].addTo(mymap)
          }
          changeZoom();
        }
      }

    }
  });
}

function techUpload(){
  var techuploadHTML = $('.tech_upload').html();
  $('.tech_upload').html("");
  alertify.confirm(techuploadHTML).set('onok', function(closeEvent) {
    var el = document.getElementsByName("csrfmiddlewaretoken");
    csrf_value = el[0].getAttribute("value");
    var formData = new FormData();
    formData.append('datafile', $('#id_datafile')[0].files[0]);
    formData.append('datanotes', $('#id_datanotes').val());
    formData.append('datatype', $('#techtypeselection').val());
    formData.append('csrfmiddlewaretoken', csrf_value);
    $.ajax({
      type: "POST",
      url: "/expert/ajax/techfileupload",
      processData: false,
      contentType: false,
      data: formData,
      async: false,
      success: function (data) {
        fileid = data.fileid
        $('#overlaycontainer2').css('display','block')
      }
    });
    ajaxRequestTechData(fileid);
    $('#overlaycontainer2').css('display',"none")
    $('.tech_upload').html(techuploadHTML);
  }).set('oncancel', function(closeEvent){
    $('.tech_upload').html(techuploadHTML);
  }).set('title', "Upload a technology data file").set('labels', {ok:'Upload', cancel:'Cancel'}).set('closable',true);
}

function techConfirm(taskid, url = false){
  var sitelatls = []
  var sitelngls = []
  var sitetechls = []
  var sitecapls = []
  var sitenames = []

  var candlatls = []
  var candlngls = []
  var candtechls = []
  var candnames = []

  var ajaxurl
  if (url){
    ajaxurl = url
  } else {
    ajaxurl = '/expert/usermain/task/'+ taskid + '/4'
  }

  // Extract data
  for (var i = 0; i< markerls.length; i++){
    for (j = 0; j<markerls[i].tech.length; j++){
      var item = markerls[i].tech[j]
      if (item.type == "Technology Site Data") {
        sitelatls.push(markerls[i].getLatLng().lat)
        sitelngls.push(markerls[i].getLatLng().lng)
        sitetechls.push(markerls[i].tech[j].name)
        sitecapls.push(markerls[i].tech[j].cap)
        sitenames.push(markerls[i].name)
      }
      if (item.type == "Technology Candidate Data") {
        candlatls.push(markerls[i].getLatLng().lat)
        candlngls.push(markerls[i].getLatLng().lng)
        candtechls.push(markerls[i].tech[j].name)
        candnames.push(markerls[i].name)
      }

    }
  }

  var errflag = false
  var record

  for (var j = 0; j < sitecapls.length ; j++) {
    var i = sitecapls.length -1 -j
    var index = findTechIndexByID(sitetechls[i])
    var capmin = Number(techlist_all[index].capmin)
    var capmax = Number(techlist_all[index].capmax)

    if (Number(sitecapls[i]) >= capmin*coef && Number(sitecapls[i]) <= capmax*coef)
    {} else {
      errflag = true
      record = i
      }
  }

    alertify.confirm('Confirm', 'Save technology data?',
    function() {

      if (errflag){
        alertify.notify('Some capacity is beyond range. Please check ' + sitenames[record] + '.', 'error', 5, null);
      } else {
      var el = document.getElementsByName("csrfmiddlewaretoken");
      csrf_value = el[0].getAttribute("value");
      sitelatls = JSON.stringify(sitelatls)
      sitelngls = JSON.stringify(sitelngls)
      sitecapls = JSON.stringify(sitecapls)
      sitetechls = JSON.stringify(sitetechls)
      sitenames = JSON.stringify(sitenames)

      candlatls = JSON.stringify(candlatls)
      candlngls = JSON.stringify(candlngls)
      candtechls = JSON.stringify(candtechls)
      candnames = JSON.stringify(candnames)
      jQuery.ajax({
        method: "POST",
        url: "/expert/ajax/step3savetech",
        data: {sitelatls: sitelatls, sitelngls: sitelngls, sitetechls: sitetechls, sitecapls: sitecapls, csrfmiddlewaretoken: csrf_value, taskid: taskid, sitenames: sitenames, candlatls: candlatls, candlngls: candlngls, candtechls: candtechls, candnames: candnames},
        success: function (data) {
          if (data.msg) {
            $('#overlaycontainer').css('display','block')
            setTimeout(function(){
            location.href = ajaxurl; }, 1500);
          }
        }
      });
    }
  },
    null).set('labels',{ok:'Yes', cancel:'Cancel'});

}
