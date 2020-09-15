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


function initgeomap(center = [51.505, -0.09], zoom = 2){
  ii = 0
  mymap = L.map('gfx_holder').setView(center, zoom);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}', {
    foo: 'bar',
    attribution: 'Map data <a href="https://www.openstreetmap.org/">OpenStreetMap</a> under <a href="http://opendatacommons.org/licenses/odbl/1.0/">ODbL</a>',
    maxZoom: 18,
}).addTo(mymap);


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
                '<div><img src="https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-' + color[i] + '.png" style = "width: 10px" alt="" style="vertical-align:middle" /> - ' + categories[i] + '</div>'
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
  var content = '<div class = "container" id = "'+ formid +'"><h5>General Information</h5><div class="form-group"> <label>Name</label>  <input class="form-control" id = "name" type="text" placeholder = "Name" value = "' + nodename + '" readonly/> </div><div class="form-group"> <label>Location</label> <div class="input-group"><input type="number" aria-label="Latitude" class="form-control" id = "lat" placeholder = "Latitude" value = "' + lat + '" readonly><input type="number" aria-label="Longitude" class="form-control" id = "lng" placeholder = "Longitude" value = "' + lng + '" readonly></div></div>'

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
        content += demContent(formid, false, demd[i].name, demd[i].price, demd[i].cap)
      }
      else {
        content += demContent(formid, true, demd[i].name, demd[i].price, demd[i].cap)
      }
    }

  content += '</div>'
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
    content += '<option value = "Technology Candidate Data" disabled> Technology Candidate </option>'
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
  content += '</div> <div class="form-group"> <label>Demanded product</label> <select name="demprod" class = "form-control demtype" readonly>'
  for (var j = 0; j < prodlist_ap.length; j++){
    if (name != prodlist_ap[j].id) {
      content +=   '<option value = "' + prodlist_ap[j].id + '" disabled> p' + prodlist_ap[j].id + ' - ' + prodlist_ap[j].name + ' - ' + prodlist_ap[j].unit + ' </option>'
    } else {
      content +=   '<option value = "' + prodlist_ap[j].id + '" selected> p' + prodlist_ap[j].id + ' - ' + prodlist_ap[j].name + ' - ' + prodlist_ap[j].unit + '</option>'
    }
  }
  content += '</select> </div>'
  content += '<div class="form-group"> <label>Demanded capacity (product unit/' + timeunit + ')</label>  <input class="form-control demcap " type="number" value = ' + cap + ' min = 0 readonly/> </div> <div class="form-group"> <label> Demanded price (USD/product unit) </label> <input class="form-control demprice" type="number" value = ' + price + ' readonly/></div></div>'

  return content
}


// Define a marker
function newmarker(lat, lon, name, data = [], tech = [], demd = []){

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
        alertify.confirm().destroy()
      }).set('oncancel', function(closeEvent) {
        alertify.confirm().destroy();
      }).set('closable',true).set('labels', {ok:'Ok', cancel:'Cancel'})
        });

  return marker
}



function clearmap(){
  var keyobj = Object.keys(arcset)
  for (var j = 0; j < keyobj.length; j++){
    for (var i = 0; i < arcset[keyobj[j]].length; i++){
      arcset[keyobj[j]][i].line.removeFrom(mymap)
      arcset[keyobj[j]][i].line.arrow.removeFrom(mymap)
      arcset[keyobj[j]][i].line.show = false
    }
  }
}


function geofilt(){
  if (Object.keys(arcset).length > 0){
    if ($(".horizontalbar").css("display") == 'none') {
    loadspinner("Setting up filter...")
    setTimeout(function() {

    var checkedls = []
    var maxls = []
    var minls = []
    var checkboxes = document.getElementsByClassName('form-check-input')
    for (var i = 0; i < checkboxes.length; i++){
      if (checkboxes[i].checked) {
        checkedls.push(i)
        var mindist
        var maxdist
        if (arcset[proddata[i]].length > 0){
          mindist = Math.min.apply(Math, arcset[proddata[i]].map(function(o) { return o.dist; }))
          maxdist = Math.max.apply(Math, arcset[proddata[i]].map(function(o) { return o.dist; }))
        } else {
          mindist = 1e30
          maxdist = 0
        }
        maxls.push(maxdist)
        minls.push(mindist)
      }

    }

    var mindist
    var maxdist
    if (minls.length == 0 || maxls.length == 0){
      mindist = 0
      maxdist = 1
    } else {
      mindist = Math.min.apply(Math, minls)
      maxdist = Math.max.apply(Math, maxls)
    }


    $('#mindist').val(mindist);
    $('#maxdist').val(maxdist);

    if (html5Slider){
      html5Slider.noUiSlider.destroy();
    }

    makeSlider(mindist, maxdist);

    $('#mindist').on('change', function(){
      html5Slider.noUiSlider.set([$('#mindist').val(), null]);
    });

    $('#maxdist').on('change', function(){
      html5Slider.noUiSlider.set([null, $('#maxdist').val()]);
    });

    $(".horizontalbar").css("display","block")
  }, 100)};

  if ($(".horizontalbar").css("display") !== 'none') {
    filtconfirm()
    $(".horizontalbar").css("display","none")
  }

  }
    $("#overlaycontainer").css("display","none");
}

function makeSlider(mindist, maxdist){
  html5Slider = document.getElementById('hslider');
  noUiSlider.create(html5Slider, {
      start: [mindist, maxdist],
      connect: false,
      step: 1,
      range: {
          'min': mindist,
          'max': maxdist
      }
  });

  html5Slider.noUiSlider.on('update', function (values, handle) {
    loadspinner("Please Wait...");
    var value = values[handle];
    if (handle) {
        $('#maxdist').val(Math.round(value));
    } else {
        $('#mindist').val(Math.round(value));
    }
    setTimeout(function() {
      clearmap();
      maxdist =  $('#maxdist').val()
      mindist =  $('#mindist').val()
      var checkboxes = document.getElementsByClassName('form-check-input')
      for (i = 0; i < checkboxes.length; i++){
        if (checkboxes[i].checked) {
          for (var j = 0; j < arcset[proddata[i]].length; j++){
            arc = arcset[proddata[i]][j]
            if (Math.round(arc.dist) >= mindist && Math.round(arc.dist) <= maxdist && arc.line.keep) {
              arc.line.addTo(mymap);
              arc.line.arrow.addTo(mymap);
              arc.line.show = true
            } else {
              arc.line.show = false
            }
          }
        }
      }
      $("#overlaycontainer").css("display","none");
    }, 800)

  });
}

function filtconfirm() {
  alertify.confirm('Confirm', 'Confirm to filt paths by defined range?', function (){
  maxdist =  $('#maxdist').val()
  mindist =  $('#mindist').val()
  var checkboxes = document.getElementsByClassName('form-check-input')
  for (i = 0; i < checkboxes.length; i++){
    if (checkboxes[i].checked) {
      for (var j = 0; j < arcset[proddata[i]].length; j++){
        arc = arcset[proddata[i]][j]
        if (Math.round(arc.dist) >= mindist && Math.round(arc.dist) <= maxdist && arc.line.keep) {
          arc.line.addTo(mymap);
          arc.line.arrow.addTo(mymap);
          arc.line.show = true
        } else {
          arc.line.show = false
          arc.line.keep = false
        }
      }
    }
  }
  $(".horizontalbar").css("display",'none')
}, null).set('labels',{ok:'Yes', cancel:'Cancel'}).set('closable',true);
}

function loadspinner(text){
  $("#spinnertext").html(text)
  $("#overlaycontainer").css("display","block");
}

function readtransfiles(taskid) {
  var el = document.getElementsByName("csrfmiddlewaretoken");
  csrf_value = el[0].getAttribute("value");
  loadspinner('Reading transportation routes...')
  jQuery.ajax({
    method: "POST",
    url: "/expert/ajax/readtransfiles",
    data: {csrfmiddlewaretoken: csrf_value, taskid: taskid},
    success: function (data) {
      if (data) {
        if (data.msg.length > 0 ) {
          $("#overlaycontainer").css("display","none");
          for (var i = 0; i < data.msg.length; i++){
            alertify.error(data.msg[i])
          }
        } else {
          clearmap()
          arcset = {}
          nodedata = data.nodedata
          proddata = data.prodlist
          nodels = []
          for (var i = 1; i< nodedata.length; i++){
            nodels.push({node:nodedata[i][0], lat:nodedata[i][1], lon:nodedata[i][2]})
          }
          /*transdata = data.transdata

          for (var ii = 0; ii < transdata.length; ii++){
            transdataprod = transdata[ii];
            arcsubset = [];
            for (var i = 0; i < transdataprod.length; i++){
              for (var j = 0; j < transdataprod[i].length; j++){
                if (transdataprod[i][j] == "Y"){
                  index = findProdIndexByID(proddata[ii].slice(1))
                  var data = {prod: prodlist[index].name, cost: prodlist[index].transcost, unit: prodlist[index].unit, color: colorls[ii%colorls.length]}
                  var value = newpath([[nodels[i].lat, nodels[i].lon],[nodels[j].lat, nodels[j].lon]],data)
                  var path = value[0]
                  var dist = value[1]
                  //path.addTo(mymap)

                  //var arrowHead = path.arrow.addTo(mymap);

                  arcsubset.push({line: path, dist: dist, ii: i, jj: j})

                }
              }
            }
            arcset.push(arcsubset);
          }*/

          for (var ii = 0; ii < proddata.length; ii++) {
            var arcsubset = [];
            arcset[proddata[ii]] = arcsubset
          }

          makecardcontent(taskid);

          $("#overlaycontainer").css("display","none");
          //$("#generateroutes").attr("class","btn btn-light border disabled").attr("onclick","")
          $("#recoverroutes").attr("class","btn btn-light border").attr("onclick","georecover()")
          $("#distancefilter").attr("class","btn btn-light border").attr("onclick","geofilt()")
        }
      }

    }
  });
}

function generatetrans(taskid) {
  var el = document.getElementsByName("csrfmiddlewaretoken");
  csrf_value = el[0].getAttribute("value");
  loadspinner('Generating transportation routes...')
  jQuery.ajax({
    method: "POST",
    url: "/expert/ajax/generatetransfiles",
    data: {csrfmiddlewaretoken: csrf_value, taskid: taskid},
    success: function (data) {
      if (data) {
        if (data.msg.length > 0 ) {
          for (var i = 0; i < data.msg.length; i++){
            alertify.error(data.msg[i])
          }
        } else {
          clearmap()
          arcset = {}
          nodedata = data.nodedata
          proddata = data.prodlist
          nodels = []
          for (var i = 1; i< nodedata.length; i++){
            nodels.push({node:nodedata[i][0], lat:nodedata[i][1], lon:nodedata[i][2]})
          }
          //transdata = data.transdata

          /*for (var ii = 0; ii < transdata.length; ii++){
            transdataprod = transdata[ii];
            arcsubset = [];
            for (var i = 0; i < transdataprod.length; i++){
              for (var j = 0; j < transdataprod[i].length; j++){
                if (transdataprod[i][j] == "Y"){
                  index = findProdIndexByID(proddata[ii].slice(1))
                  //console.log(index)
                  var data = {prod: prodlist[index].name, cost: prodlist[index].transcost, unit: prodlist[index].unit, color: colorls[ii%colorls.length]}
                  var value = newpath([[nodels[i].lat, nodels[i].lon],[nodels[j].lat, nodels[j].lon]],data)
                  var path = value[0]
                  var dist = value[1]
                  //path.addTo(mymap)

                  //var arrowHead = path.arrow.addTo(mymap);

                  arcsubset.push({line: path, dist: dist, ii: i, jj: j})

                }
              }
            }
            arcset.push(arcsubset);
          }*/
          for (var ii = 0; ii < proddata.length; ii++) {
            var arcsubset = [];
            arcset[proddata[ii]] = arcsubset
          }

          makecardcontent(taskid);

          $("#overlaycontainer").css("display","none");
          //$("#generateroutes").attr("class","btn btn-light border disabled").attr("onclick","")
          //$("#selectprodroutes").attr("class","btn btn-light border").attr("onclick","geoprod()")
          $("#recoverroutes").attr("class","btn btn-light border").attr("onclick","georecover()")
          $("#distancefilter").attr("class","btn btn-light border").attr("onclick","geofilt()")
        }
      }

    }
  });
}

function makecardcontent(taskid){
  var content = ''
  for (i = 0 ; i < proddata.length; i++){
    var index = findProdIndexByID(proddata[i].slice(1))
    content += '<div class="custom-control custom-checkbox"> <input class="form-check-input" type="checkbox" value="" onchange="checkChange(' + i + ', ' + taskid + ')"> <label class="form-check-label"> <p data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample" style = "color: '+ colorls[i%colorls.length] +'">' + prodlist[index].name + ' - p' + prodlist[index].id + ' </p> </label> </div>'
  }
  $('#cardcontainer').html(content)
}

function checkChange(ii, taskid) {
  index = findProdIndexByID(proddata[ii].slice(1))
  var checkboxes = document.getElementsByClassName('form-check-input')
  var flag = checkboxes[ii].checked
  arcsubset = arcset[proddata[ii]]
  if (arcsubset.length == 0 && flag) {
    loadspinner('Loading Data...')
    jQuery.ajax({
      method: "POST",
      url: "/expert/ajax/gettransportdata",
      data: {csrfmiddlewaretoken: csrf_value, taskid: taskid, prodid: proddata[ii].slice(1)},
      success: function (data) {
        if (data) {
          if (data.msg.length > 0 ) {
            for (var i = 0; i < data.msg.length; i++){
              alertify.error(data.msg[i])
              $("#overlaycontainer").css("display","none");
            }
          } else {
            var index = findProdIndexByID(proddata[ii].slice(1))
            var prodname = prodlist[index].name
            var transcost = prodlist[index].transcost
            var produnit = prodlist[index].unit
            var prodcolor = colorls[ii%colorls.length]
            transdataprod = data.transdataprod

              for (var i = 0; i < transdataprod.length; i++){
                for (var j = 0; j < transdataprod[i].length; j++){
                  if (transdataprod[i][j] == "Y"){

                    var data = {prod: prodname, cost: transcost, unit: produnit, color: prodcolor}
                    var value = newpath([[nodels[i].lat, nodels[i].lon],[nodels[j].lat, nodels[j].lon]],data)
                    var path = value[0]
                    var dist = value[1]
                    path.addTo(mymap)
                    var arrowHead = path.arrow.addTo(mymap);
                    arcsubset.push({line: path, dist: dist, ii: i, jj: j})

                  }
                }
              }

            $("#overlaycontainer").css("display","none");
            //$("#generateroutes").attr("class","btn btn-light border disabled").attr("onclick","")
            //$("#selectprodroutes").attr("class","btn btn-light border").attr("onclick","geoprod()")
            $("#recoverroutes").attr("class","btn btn-light border").attr("onclick","georecover()")
            $("#distancefilter").attr("class","btn btn-light border").attr("onclick","geofilt()")
          }
        }

      }
    });
  } else {
    for (var i = 0; i < arcsubset.length; i++){
      arc = arcsubset[i]
      if (flag) {
        if (arc.line.show){
        } else {
          if (arc.line.keep){
            arc.line.show = true
            arc.line.addTo(mymap)
            arc.line.arrow.addTo(mymap)
          }
        }
      } else {
        if (arc.line.show) {
          arc.line.show = false
          arc.line.removeFrom(mymap)
          arc.line.arrow.removeFrom(mymap)
        }
      }
    }
  }
}

function georecover(){
  alertify.confirm('Confirm', 'Recover original routes?',
  function() {
    if ($(".horizontalbar").css("display") !== 'none') {
      $(".horizontalbar").css("display","none")
    }
    clearmap();
    var checkboxes = document.getElementsByClassName('form-check-input')
    var keyobj = Object.keys(arcset)
    for (var j = 0; j < keyobj.length; j++){
      for (var i = 0; i < arcset[keyobj[j]].length; i ++){
        var arc = arcset[keyobj[j]][i]
        arc.line.keep = true
        arc.line.show = false
      }
    checkboxes[j].checked = false
    }

  },
  null).set('labels',{ok:'Yes', cancel:'Cancel'});
}

function geosavetrans(taskid){
  arcsetls = []
  prodidls = []
  var checkboxes = document.getElementsByClassName('form-check-input')
  //var flag = checkboxes[ii].checked
  var keyobj = Object.keys(arcset)
  for (var i = 0; i < keyobj.length; i++){
    if (checkboxes[i].checked){
    arcsubsetls = []
    for (var j = 0; j < arcset[keyobj[i]].length; j++){
      if (arcset[keyobj[i]][j].line.keep == true){
        arcsubsetls.push({ii: arcset[keyobj[i]][j].ii ,jj: arcset[keyobj[i]][j].jj})
      }
    }
    //index = findProdIndexByID(proddata[i].slice(1))
    arcsetls.push({prodid:proddata[i].slice(1), data:arcsubsetls})
    }
  }
  arcsetls = JSON.stringify(arcsetls)
  alertify.confirm('Confirm', 'Save transportation routes?',
  function() {
    if ($(".horizontalbar").css("display") !== 'none') {
      $(".horizontalbar").css("display","none")
    }

    var el = document.getElementsByName("csrfmiddlewaretoken");
    csrf_value = el[0].getAttribute("value");
    loadspinner('Saving transportation data...')
    jQuery.ajax({
      method: "POST",
      url: "/expert/ajax/rewritetransfiles",
      data: {csrfmiddlewaretoken: csrf_value, taskid: taskid, transdata: arcsetls},
      success: function (data) {
        if (data) {
          if (data.error.length > 0 ) {
            for (var i = 0; i < data.error.length; i++){
              $("#overlaycontainer").css("display","none");
              alertify.error(data.error[i])
            }
          } else {
            setTimeout(function(){
            location.href='/expert/usermain/task/'+ taskid; }, 1500);
          }
          }
        }
    });
  },
  null).set('labels',{ok:'Yes', cancel:'Cancel'});
}


function newpath(latlng, data = {prod: "Waste", cost: '3', unit: 'tonne', color: 'blue'}, map = mymap){
  var path = L.polyline(latlng, {weight: 3, color: data.color})
  var point1 = new L.Routing.Waypoint()
  point1.latLng = L.latLng(latlng[0][0],latlng[0][1])
  var point2 = new L.Routing.Waypoint()
  point2.latLng = L.latLng(latlng[1][0],latlng[1][1])
  var options = {styles: [{color: 'black', opacity: 0.15, weight: 7}, {color: 'white', opacity: 0.8, weight: 6}, {color: data.color, opacity: 1, weight: 2.5}], addWaypoints: false}

  var router = new L.Routing.OSRMv1({
        serviceUrl: "http://54.208.179.171:5000/route/v1"
    })
  router.route([point1, point2], function(err, route) {

    path2 = new L.Routing.line(route[0], options)
    path.road = path2
    path.roadtime = (Number(route[0].summary.totalTime)/3600).toFixed(2)
    path.roaddist = (Number(route[0].summary.totalDistance)/1000).toFixed(2)
  })

  var arrowHead = L.polylineDecorator(path, {
      patterns: [
        {offset: '60%', repeat: 0, symbol: L.Symbol.arrowHead({pixelSize: 8, polygon: false, pathOptions: {stroke: true, color: data.color}})}]
      })
  path.arrow = arrowHead

  path.show = true
  path.keep = true

  summary = L.control({position: 'bottomright'});
  summary.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'card');
        div.innerHTML = '<div class = "text-left"> <p><strong>Estimated Total Time (h): </strong>' + path.roadtime +'</p> <p><strong>Total True Distance (km): </strong>' + path.roaddist + '</p></div>'
    return div;
    };

  path.summary = summary

  path.flag = false
  path.on('click', (event)=>{
    if (path.flag){
      path.road.removeFrom(map);
      path.summary.remove();
      path.flag = false
    } else {
      path.road.addTo(map);
      path.summary.addTo(map);
      path.flag = true}
  })

  path.on('contextmenu',(event)=>{
    alertify.confirm('Delete', 'Delete this path?',
    function() {
      path.removeFrom(mymap);
      path.arrow.removeFrom(mymap)
      path.show = false
      path.keep = false
    }, null).set('labels',{ok:'Yes', cancel:'Cancel'}).set('closable',true)
  })


  var dist = distcalculator(latlng).toFixed(2)
  data.dist = dist
  var pop = path.bindTooltip(makecontent('flow', data))
  path.on('mouseover', (event)=>{
    pop.openPopup()
  });
  path.on('mouseout', (event)=>{
    pop.closePopup()
  });
  return [path, dist]
}

function distcalculator(latlng){
  var lat1 = latlng[0][0]
  var lng1 = latlng[0][1]
  var lat2 = latlng[1][0]
  var lng2 = latlng[1][1]
  var dist
  dist = 2*6335.439*Math.asin(Math.sqrt(Math.pow(Math.sin((lat2-lat1)*Math.PI/2/180),2) + Math.cos(lat2*Math.PI/180)*Math.cos(lat1*Math.PI/180)*Math.pow(Math.sin((lng2 - lng1)*Math.PI/2/180),2)));

  return dist
}

function makecontent(mode, data) {
  var content
  if (mode == 'flow') {
    var content
    if (data.flow) {
      content = "<div class = 'text-left'><p><strong> Distance:</strong> "+ data.dist + "km </p><p><strong>Product:</strong> " + data.prod + "</p><p><strong>Transport Cost:</strong> " + data.cost + " USD/" + data.unit +"/km </p><p><strong>Product Flow:</strong> " + data.flow +" " + data.unit + "/year </p> <p><strong>Click to show true routes.</strong></p></div> "
    } else {
      content = "<div class = 'text-left'><p><strong> Distance:</strong> "+ data.dist + "km </p><p><strong>Product:</strong> " + data.prod + "</p><p><strong>Transport Cost:</strong> " + data.cost + " USD/" + data.unit +"/km </p> <p><strong>Click to show true routes.</strong></p></div>"
    }
    return content
  }
}

function skipstep5(taskid) {
  alertify.confirm('Confirm', 'Skip this step and use default setting?',
  function() {

    var el = document.getElementsByName("csrfmiddlewaretoken");
    csrf_value = el[0].getAttribute("value");
    loadspinner('Setting transportation...')
    jQuery.ajax({
      method: "POST",
      url: "/expert/ajax/skipstep5",
      data: {csrfmiddlewaretoken: csrf_value, taskid: taskid},
      success: function (data) {
        if (data) {
          if (data.msg.length > 0 ) {
            for (var i = 0; i < data.error.length; i++){
              $("#overlaycontainer").css("display","none");
              alertify.error(data.error[i])
            }
          } else {
            setTimeout(function(){
            location.href='/expert/usermain/task/'+ taskid+'/6'; }, 1500);
          }
          }
        }
    });
  },
  null).set('labels',{ok:'Yes', cancel:'Cancel'});
}
