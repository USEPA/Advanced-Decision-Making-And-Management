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

var task_id
try {
  task_id = document.getElementById("helper").getAttribute("task-id");
} catch {
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
    addNewDem(latlng.lat, latlng.lng)
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

  greenIcon = new L.Icon({
  iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
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

  greengoldIcon = new L.Icon({
  iconUrl: '/static/figure/markers/green-gold.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [18.75, 30.75],
  iconAnchor: [9, 30.75],
  popupAnchor: [0.75, -8.5],
  shadowSize: [30.75, 30.75]});

  greenblueIcon = new L.Icon({
  iconUrl: '/static/figure/markers/green-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [18.75, 30.75],
  iconAnchor: [9, 30.75],
  popupAnchor: [0.75, -8.5],
  shadowSize: [30.75, 30.75]});

  greenredIcon = new L.Icon({
  iconUrl: '/static/figure/markers/green-red.png',
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

  greenbluegoldIcon = new L.Icon({
  iconUrl: '/static/figure/markers/green-blue-gold.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [18.75, 30.75],
  iconAnchor: [9, 30.75],
  popupAnchor: [0.75, -8.5],
  shadowSize: [30.75, 30.75]});

  redbluegreenIcon = new L.Icon({
  iconUrl: '/static/figure/markers/red-blue-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [18.75, 30.75],
  iconAnchor: [9, 30.75],
  popupAnchor: [0.75, -8.5],
  shadowSize: [30.75, 30.75]});

  redgreengoldIcon = new L.Icon({
  iconUrl: '/static/figure/markers/red-green-gold.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [18.75, 30.75],
  iconAnchor: [9, 30.75],
  popupAnchor: [0.75, -8.5],
  shadowSize: [30.75, 30.75]});

  redbluegreengoldIcon = new L.Icon({
  iconUrl: '/static/figure/markers/red-blue-green-gold.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [18.75, 30.75],
  iconAnchor: [9, 30.75],
  popupAnchor: [0.75, -8.5],
  shadowSize: [30.75, 30.75]});



  var legend = L.control({position: 'bottomleft'});
    legend.onAdd = function (mymap) {

    var div = L.DomUtil.create('div', 'card');
    labels = ['<strong>Categories</strong>'],
    categories = ['Supply', 'Tech Site', 'Tech Cand', 'Demand'];
    color = ['gold', 'blue', 'red', 'green']

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
  var flagd = 0

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

  if (marker.demd.length > 0){
    flagd = 1
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
  if (flagd) {
    marker.setIcon(greenIcon)
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
  if (flagts && flagd) {
    marker.setIcon(greenblueIcon)
  }
  if (flagd && flags) {
    marker.setIcon(greengoldIcon)
  }
  if (flagtc && flagd) {
    marker.setIcon(greenredIcon)
  }
  if (flagtc && flagts && flags) {
    marker.setIcon(redbluegoldIcon)
  }
  if (flagtc && flagts && flagd) {
    marker.setIcon(redbluegreenIcon)
  }
  if (flagd && flagts && flags) {
    marker.setIcon(greenbluegoldIcon)
  }
  if (flagtc && flagd && flags) {
    marker.setIcon(redgreengoldIcon)
  }
  if (flagtc && flagts && flags && flagd) {
    marker.setIcon(redbluegreengoldIcon)
  }
}

// Node form - frame
function nodeForm(nodename = "", lat = "", lng = "", data = [{name:"default", price:"0", cap:"0"}], tech = [], demd = []) {
  formid = 'nodeForm' + makeid(8)
  var content = '<div class = "container" id = "'+ formid +'"><h5>General Information</h5><div class="form-group"> <label>Name</label>  <input class="form-control" id = "name" type="text" placeholder = "Name" value = "' + nodename + '"/> </div><div class="form-group"> <label>Location</label> <div class="input-group"><input type="number" aria-label="Latitude" class="form-control" id = "lat" placeholder = "Latitude" value = "' + lat + '"><input type="number" aria-label="Longitude" class="form-control" id = "lng" placeholder = "Longitude" value = "' + lng + '"></div></div>'

  var alreadydata = 0
  if (data.length > 0) {
    alreadydata = 1
  }
    for (i = 0; i < data.length; i++){
      if (i == 0){
        content += supContent(formid, false, data[i].name, data[i].price, data[i].cap)
      }
      else {
        content += supContent(formid, false, data[i].name, data[i].price, data[i].cap)
      }
    }

    if (tech.length > 0) {
      alreadydata = 1
    }

    for (i = 0; i < tech.length; i++){
      if (i == 0){
        content += techContent(formid, false, tech[i].type, tech[i].name, tech[i].cap)
      }
      else {
        content += techContent(formid, false, tech[i].type, tech[i].name, tech[i].cap)
      }
    }

    for (i = 0; i < demd.length; i++){
      if (i == 0){
        content += demContent(formid, alreadydata, demd[i].name, demd[i].price, demd[i].cap)
      }
      else {
        content += demContent(formid, true, demd[i].name, demd[i].price, demd[i].cap)
      }
    }

  content += '</div>'
  content += '<ion-icon name="add-circle-outline" class = "iconpiclarger" style = "color:#9A0000; cursor: pointer;" onclick = "addDemContent(\''+formid+'\')" ></ion-icon>'
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

// Tech form - technology content - readonly for this step
function techContent(formid, removable = false, type = "Select data type", name = "default", cap = "0") {
  var code = makeid(8)
  var contentid = 'techcontent' + code
  var content = ' <div id = "'+ contentid + '"><br/><div class = "row"> <div class = "col text-left"><h5> Technology Information </h5></div>'
  if (removable) {
    content += '<div class = "col text-right"><ion-icon name="remove-circle-outline" class = "iconpiclarger" style = "color:#9A0000; cursor: pointer;" onclick = "removeTechContent(\''+contentid+'\')"></ion-icon></div>'
  }
  content += '</div> <div class="form-group"> <label>Data type</label> <select name="techtype" class = "form-control techtype" id = "type' + code + '" onchange = "UpdateTechCap(\'' + code + '\')" readonly>'
  if (type == "Select data type") {
    content += '<option value = "Select data type" selected hidden disabled> Select Data Type </option>'
  }
  if (type == "Technology Site Data") {
    content += '<option value = "Technology Site Data" selected> Technology Site </option>'
  } else {
    content += '<option value = "Technology Site Data" disabled> Technology Site </option>'
  }
  if (modeltype == 1) {
    if (type == "Technology Candidate Data") {
      content += '<option value = "Technology Candidate Data" selected> Technology Candidate </option>'
    } else {
      content += '<option value = "Technology Candidate Data" disabled> Technology Candidate </option>'
    }
  } else {
    content += '<option value = "Technology Candidate" disabled> Technology Candidate </option>'
  }
  content += '</select></div> <div class="form-group"> <label>Technology</label> <select name="techname" class = "form-control techname" readonly> <option value = "default" disabled selected> Please select a technology</option>'

  for (var j = 0; j < techlist.length; j++){
    if (name != techlist[j].id) {
      content +=   '<option value = "' + techlist[j].id + '" disabled> t' + techlist[j].id + ' - ' + techlist[j].name + ' </option>'
    } else {
      content +=   '<option value = "' + techlist[j].id + '" selected> t' + techlist[j].id + ' - ' + techlist[j].name + '</option>'
    }
  }
  content += '</select> </div>'
  content += '<div class="form-group"> <label>Technology capacity (reference product unit/' + timeunit + ')</label>  <input class="form-control techcap " id = "techcap' + code + '" type="number" value = ' + cap + ' min = 0 readonly/> </div> </div>'

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


// Demand form - demand content
function demContent(formid, removable = false, name = "default", price = "0", cap = "0") {
  var contentid = 'demcontent' + makeid(8)
  var content = ' <div id = "'+ contentid + '"><br/><div class = "row"> <div class = "col text-left"><h5> Demand Information </h5></div>'
  if (removable) {
    content += '<div class = "col text-right"><ion-icon name="remove-circle-outline" class = "iconpiclarger" style = "color:#9A0000; cursor: pointer;" onclick = "removeDemContent(\''+contentid+'\')"></ion-icon></div>'
  }
  content += '</div> <div class="form-group"> <label>Demanded product</label> <select name="demprod" class = "form-control demtype" onchange = "addProd()"><option value = "defaultoption" disabled selected> Select a product </option>' //<option value = "ADD"> Add a product </option>
  for (var j = 0; j < prodlist_ap.length; j++){
    if (name != prodlist_ap[j].id) {
      content +=   '<option value = "' + prodlist_ap[j].id + '"> p' + prodlist_ap[j].id + ' - ' + prodlist_ap[j].name + ' - ' + prodlist_ap[j].unit + ' </option>'
    } else {
      content +=   '<option value = "' + prodlist_ap[j].id + '" selected> p' + prodlist_ap[j].id + ' - ' + prodlist_ap[j].name + ' - ' + prodlist_ap[j].unit + '</option>'
    }
  }
  content += '</select> </div>'
  content += '<div class="form-group"> <label>Demanded capacity (product unit/' + timeunit + ')</label>  <input class="form-control demcap " type="number" value = ' + cap + ' min = 0 /> </div> <div class="form-group"> <label> Demanded price (USD/product unit) </label> <input class="form-control demprice" type="number" value = ' + price + ' /></div></div>'

  return content
}

function addProd(){
  if ($(".demtype").val() == 'ADD') {
    alertify.confirm().close()
    demConfirm(task_id, url = '/expert/usermain/prodbase?task='+task_id+'&type=dem')
  }
}


// Add a demand content form to the frame
function addDemContent(formid, name = "default", price = "0", cap = "0") {
  // Need to extract values manually
  var lat = $('#lat').val()
  var lng = $('#lng').val()
  var name = $('#name').val()
  var data = []
  var tech = []
  var demd = []
  for (i = 0; i < $('.prodcap').length; i++) {
    item = {name: $('.prodtype')[i].value, price: $('.prodprice')[i].value, cap: $('.prodcap')[i].value}
    data.push(item)
  }
  for (i = 0; i < $('.techcap').length; i++) {
    item = {type: $('.techtype')[i].value, name: $('.techname')[i].value, cap: $('.techcap')[i].value}
    tech.push(item)
  }
  for (i = 0; i < $('.demcap').length; i++) {
    item = {name: $('.demtype')[i].value, price: $('.demprice')[i].value, cap: $('.demcap')[i].value}
    demd.push(item)
  }


  // add an empty form
  var content = $('#'+formid).html()
  content = content  + demContent(formid, removable = true)
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
  for (i = 0; i < $('.demcap').length - 1; i++) {
    $('.demtype')[i].value = demd[i].name
    $('.demprice')[i].value = demd[i].price
    $('.demcap')[i].value = demd[i].cap
  }
}

// Remove a content from from the frame
function removeDemContent(contentid) {
  $('#'+contentid).html("")
}

// Add a new, blank demand node
function addNewDem(latinput = false, lnginput = false){
  if (latinput && lnginput){
    content = nodeForm(nodename = "", lat = latinput, lng = lnginput, data = [], techtype = [], demd = [{name:"default", price:"0", cap:"0"}])[0]
  } else {
    content = nodeForm(nodename = "", lat = "", lng = "", data = [], techtype = [], demd = [{name:"default", price:"0", cap:"0"}])[0]
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
    var demd = []

    for (i = 0; i < $('.prodcap').length; i++) {
      item = {name: $('.prodtype')[i].value, price: $('.prodprice')[i].value, cap: $('.prodcap')[i].value}
      data.push(item)
    }

    for (i = 0; i < $('.techcap').length; i++) {
      item = {type: $('.techtype')[i].value, name: $('.techname')[i].value, cap: $('.techcap')[i].value}
      tech.push(item)
    }

    for (i = 0; i < $('.demcap').length; i++) {
      item = {name: $('.demtype')[i].value, price: $('.demprice')[i].value, cap: $('.demcap')[i].value}
      demd.push(item)
    }


    var marker = newmarker(lat,lng,name,data,tech,demd)

    markerSetColor(marker)
    marker.addTo(mymap)
    markerls.push(marker)
    changeZoom();

    alarm.destroy();
  }).set('oncancel', function(closeEvent) {alarm.destroy();}).set('title', 'Add a Demand').set('closable',true).set('labels', {ok:'Ok', cancel:'Cancel'})
}

// Define a marker
function newmarker(lat, lon, name, data, tech = [], demd = []){

  var id = makeid(8)
  var marker = L.marker([lat, lon], {
    title: name     ,
    draggable: true,
    icon: goldIcon} )
  marker.name = name
  marker.id = id
  marker.data = data
  marker.tech = tech
  marker.demd = demd
  var pop = marker.bindTooltip("<b>"+marker.name + "</b>")

  marker.on('dblclick', (event)=>{
    val = nodeForm(nodename = marker.name, lat = marker.getLatLng().lat, lng = marker.getLatLng().lng, marker.data, marker.tech, marker.demd)
    marker.content = val[0]
    formid = val[1]

      alertify.confirm(marker.content).set('title', 'Information').set('onok', function(closeEvent) {
        var lat = $('#lat').val()
        var lng = $('#lng').val()
        var name = $('#name').val()
        var data = []
        var tech = []
        var demd = []

        for (i = 0; i < $('.prodcap').length; i++) {
          item = {name: $('.prodtype')[i].value, price: $('.prodprice')[i].value, cap: $('.prodcap')[i].value}
          data.push(item)
        }

        for (i = 0; i < $('.techcap').length; i++) {
          item = {type: $('.techtype')[i].value, name: $('.techname')[i].value, cap: $('.techcap')[i].value}
          tech.push(item)
        }

        for (i = 0; i < $('.demcap').length; i++) {
          item = {name: $('.demtype')[i].value, price: $('.demprice')[i].value, cap: $('.demcap')[i].value}
          demd.push(item)
        }


        marker.setLatLng(L.latLng(lat, lng))
        marker.name = name
        if (marker.name.length == 0) {
          marker.name = "Anon."
        }
        marker.data = data
        marker.tech = tech
        marker.demd = demd

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
function lookForProd(){
  var content = ' <div class = "row"> <div class = "col text-left"><h5> Product Database </h5></div></div>'
  content += ' <div class="form-group"> <label>Product</label> <select name="supprod" class = "custom-select" id = "prodtype" onchange = "updateProdInfo()" >'
  content += '<option value = "default" disabled selected> Please select a product </option>' //<option value = "ADD">Add a product</option>
  for (var j = 0; j < prodlist.length; j++){
    if (prodlist_ap.includes(prodlist[j])) {
      content +=   '<option value = "' + prodlist[j].id + '">*' + prodlist[j].name + ' - p' + prodlist[j].id +  ' </option>'
    } else {
      content +=   '<option value = "' + prodlist[j].id + '"> ' + prodlist[j].name + ' - p' + prodlist[j].id +  ' </option>'
    }
  }

  content += '</select> </div><div id = "prodsummary"> </div>'

  alertify.alert(content).set('title', 'Product Database').set('onok', function(closeEvent) {
    alertify.alert().destroy()
  }).set('closable',true).set('label', 'Close')
}

function updateProdInfo() {
  prodid = $('#prodtype').val()
  if (prodid == "ADD") {
    alertify.confirm().close()
    demConfirm(task_id, url = '/expert/usermain/prodbase?task='+task_id+'&type=dem')
  } else {
  i = findProdIndexByID(prodid)
  var content = '<br/><h5>Basic Information</h5><div class = "container text-left" style = "width: 100%;" > <ul class="list-group"> <li class="list-group-item"><strong>Feedstock Name: </strong>  ' + prodlist[i].name + ' </li> <li class="list-group-item"><strong> Feedstock ID: </strong> p' + prodlist[i].id + '</li><li class="list-group-item"><strong>Unit: </strong>' + prodlist[i].unit + '</li> <li class="list-group-item"><strong>Transport Cost (USD/unit/km): </strong>' + prodlist[i].transcost + '</li> <li class="list-group-item"><strong>Description: </strong>' + prodlist[i].note + '</li> </ul> </div><br/> <h5>Related Technology</h5><div class = "row"> <table width = 100% class = "table text-center table-hover"> <thead> <tr> <th>Technology Name</th> <th>Role</th></tr></thead><tbody>'
  for (j = 0; j < prodlist[i].transformationset.length; j++) {
    content += '<tr><td>' + prodlist[i].transformationset[j].techname + '</td>'
    if (Number(prodlist[i].transformationset[j].yield) > 0 ) {
      content += '<td>Outflow</td>'
    } else {
      content += '<td>Inflow</td>'
    }
    content += '</tr>'
  }
  content += '</tbody></table></div>'

  $('#prodsummary').html(content)
  }
}

// Clear all markers on the map
function demClear() {
  alertify.confirm('Confirm', 'Clear all demand?',
  function() {
    indexls = []
    for (var i = 0; i < markerls.length; i++){
      if (markerls[i].data.length || markerls[i].tech.length) {
        markerls[i].demd = []
        markerSetColor(markerls[i])
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

// Load a demand data file
function demLoad(taskid){
  var demfileHTML = $('.select_dem').html();
  $('.select_dem').html("");
    alertify.confirm(demfileHTML).set('onok', function(closeEvent) {
      var fileid = $('#demfileselection').val();

        if (fileid > 0){
          ajaxRequestDemData(fileid);
        }
      $('#demfileselection')[0].value = '';
      $('.select_dem').html(demfileHTML);
      alertify.confirm().destroy();
    }).set('oncancel', function(closeEvent){
      $('#demfileselection')[0].value = '';
      $('.select_dem').html(demfileHTML);
      alertify.confirm().destroy();
    }).set('title', "Load a demand file").set('labels', {ok:'Ok', cancel:'Cancel'}).set('closable',true);;
}

function ajaxRequestDemData(fileid) {
  var el = document.getElementsByName("csrfmiddlewaretoken");
  var csrf_value = el[0].getAttribute("value");
  var prodids = []
  for (i = 0; i < prodlist_ap.length; i++) {
    prodids.push(prodlist_ap[i].id)
  }
  prodids = JSON.stringify(prodids)
  jQuery.ajax({
    method: "POST",
    url: "/expert/ajax/demfileselection",
    data: {csrfmiddlewaretoken: csrf_value, fileid: fileid, prodids: prodids},
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
          demdata = data.demdata

          for (i = 1; i < demdata.length; i++) {
            var lat = Number(demdata[i][1])
            var lng = Number(demdata[i][2])

            var value = findMarkerByLatLng(lat,lng)
            var flag = value[0]
            var index = value[1]
            //console.log(flag)
            if (flag) {
              if (markerls[index].name.includes(demdata[i][0]) == false){
                markerls[index].name = markerls[index].name + ' ' + demdata[i][0]
                markerls[index].unbindTooltip()
                var pop = markerls[index].bindTooltip("<b>"+markerls[index].name + "</b>")
              }

              markerls[index].demd.push({name: demdata[i][3].slice(1), price: Number(demdata[i][4]), cap: Number(demdata[i][5])})
              markerSetColor(markerls[index])
            } else {
              var name = demdata[i][0]
              if (name.length == 0) {
                name = "Anon."
              }
              var data = [{name: demdata[i][3].slice(1), price: Number(demdata[i][4]), cap: Number(demdata[i][5])}]
              var marker = newmarker(lat,lng,name,[],[],data)
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

function demUpload(){
  var demuploadHTML = $('.dem_upload').html();
  $('.dem_upload').html("");
  alertify.confirm(demuploadHTML).set('onok', function(closeEvent) {
    var el = document.getElementsByName("csrfmiddlewaretoken");
    csrf_value = el[0].getAttribute("value");
    var formData = new FormData();
    formData.append('datafile', $('#id_datafile')[0].files[0]);
    formData.append('datanotes', $('#id_datanotes').val());
    formData.append('csrfmiddlewaretoken', csrf_value);
    $.ajax({
      type: "POST",
      url: "/expert/ajax/demfileupload",
      processData: false,
      contentType: false,
      data: formData,
      async: false,
      success: function (data) {
        fileid = data.fileid
        $('#overlaycontainer2').css('display','block')
      }
    });
    ajaxRequestDemData(fileid);
    $('#overlaycontainer2').css('display',"none")
    $('.dem_upload').html(demuploadHTML);
  }).set('oncancel', function(closeEvent){
    $('.dem_upload').html(demuploadHTML);
  }).set('title', "Upload a demand data file").set('labels', {ok:'Upload', cancel:'Cancel'}).set('closable',true);
}

function demConfirm(taskid, url = false) {
  var demlatls = []
  var demlngls = []
  var demprols = []
  var demcapls = []
  var dembidls = []
  var demnames = []
  var ajaxurl
  if (url){
    ajaxurl = url
  } else {
    ajaxurl = '/expert/usermain/task/'+ taskid + '/5'
  }

  // Extract demd
  for (var i = 0; i< markerls.length; i++){
    for (j = 0; j<markerls[i].demd.length; j++){
      demlatls.push(markerls[i].getLatLng().lat)
      demlngls.push(markerls[i].getLatLng().lng)
      demprols.push(markerls[i].demd[j].name)
      demcapls.push(markerls[i].demd[j].cap)
      dembidls.push(markerls[i].demd[j].price)
      demnames.push(markerls[i].name)
    }
  }
  demlatls = JSON.stringify(demlatls)
  demlngls = JSON.stringify(demlngls)
  demcapls = JSON.stringify(demcapls)
  demprols = JSON.stringify(demprols)
  dembidls = JSON.stringify(dembidls)
  demnames = JSON.stringify(demnames)

    alertify.confirm('Confirm', 'Save demand data redirect to nextstep?',
    function() {
      var el = document.getElementsByName("csrfmiddlewaretoken");
      csrf_value = el[0].getAttribute("value");
      jQuery.ajax({
        method: "POST",
        url: "/expert/ajax/step4savedem",
        data: {demlatls: demlatls, demlngls: demlngls, demprols: demprols, demcapls: demcapls, dembidls: dembidls, csrfmiddlewaretoken: csrf_value, taskid: taskid, demnames: demnames},
        success: function (data) {
          if (data.msg) {
            $('#overlaycontainer').css('display','block')
            setTimeout(function(){
            location.href=ajaxurl; }, 1500);
          }
        }
      });
  },
    null).set('labels',{ok:'Yes', cancel:'Cancel'});
}
