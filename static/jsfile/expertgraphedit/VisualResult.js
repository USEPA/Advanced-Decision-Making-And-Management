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
  var cartodbAttribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/attribution">CARTO</a>';

  L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
    attribution: cartodbAttribution,
    maxZoom: 18,
}).addTo(mymap);


  mymap.on('keypress', function(ev) {
    var keyName = event.key;
    if (keyName == 'z') {
      changeZoom()
    }
  })

  greyIcon = new L.Icon({
  iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-grey.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [9, 15],
  iconAnchor: [4, 15],
  popupAnchor: [0.4, -4],
  shadowSize: [15, 15]});


  goldIcon = new L.Icon({
  iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [9, 15],
  iconAnchor: [4, 15],
  popupAnchor: [0.4, -4],
  shadowSize: [15, 15]});

  blueIcon = new L.Icon({
  iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [9, 15],
  iconAnchor: [4, 15],
  popupAnchor: [0.4, -4],
  shadowSize: [15, 15]});

  redIcon = new L.Icon({
  iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [9, 15],
  iconAnchor: [4, 15],
  popupAnchor: [0.4, -4],
  shadowSize: [15, 15]});

  greenIcon = new L.Icon({
  iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [9, 15],
  iconAnchor: [4, 15],
  popupAnchor: [0.4, -4],
  shadowSize: [15, 15]});

  bluegoldIcon = new L.Icon({
  iconUrl: '/static/figure/markers/blue-gold.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [9, 15],
  iconAnchor: [4, 15],
  popupAnchor: [0.4, -4],
  shadowSize: [15, 15]});

  redgoldIcon = new L.Icon({
  iconUrl: '/static/figure/markers/red-gold.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [9, 15],
  iconAnchor: [4, 15],
  popupAnchor: [0.4, -4],
  shadowSize: [15, 15]});

  redblueIcon = new L.Icon({
  iconUrl: '/static/figure/markers/red-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [9, 15],
  iconAnchor: [4, 15],
  popupAnchor: [0.4, -4],
  shadowSize: [15, 15]});

  greengoldIcon = new L.Icon({
  iconUrl: '/static/figure/markers/green-gold.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [9, 15],
  iconAnchor: [4, 15],
  popupAnchor: [0.4, -4],
  shadowSize: [15, 15]});

  greenblueIcon = new L.Icon({
  iconUrl: '/static/figure/markers/green-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [9, 15],
  iconAnchor: [4, 15],
  popupAnchor: [0.4, -4],
  shadowSize: [15, 15]});

  greenredIcon = new L.Icon({
  iconUrl: '/static/figure/markers/green-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [9, 15],
  iconAnchor: [4, 15],
  popupAnchor: [0.4, -4],
  shadowSize: [15, 15]});

  redbluegoldIcon = new L.Icon({
  iconUrl: '/static/figure/markers/red-blue-gold.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [9, 15],
  iconAnchor: [4, 15],
  popupAnchor: [0.4, -4],
  shadowSize: [15, 15]});

  greenbluegoldIcon = new L.Icon({
  iconUrl: '/static/figure/markers/green-blue-gold.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [9, 15],
  iconAnchor: [4, 15],
  popupAnchor: [0.4, -4],
  shadowSize: [15, 15]});

  redbluegreenIcon = new L.Icon({
  iconUrl: '/static/figure/markers/red-blue-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [9, 15],
  iconAnchor: [4, 15],
  popupAnchor: [0.4, -4],
  shadowSize: [15, 15]});

  redgreengoldIcon = new L.Icon({
  iconUrl: '/static/figure/markers/red-green-gold.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [9, 15],
  iconAnchor: [4, 15],
  popupAnchor: [0.4, -4],
  shadowSize: [15, 15]});

  redbluegreengoldIcon = new L.Icon({
  iconUrl: '/static/figure/markers/red-blue-green-gold.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [9, 15],
  iconAnchor: [4, 15],
  popupAnchor: [0.4, -4],
  shadowSize: [15, 15]});



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
  content += '<div class="form-group"> <label>Supplied capacity/amount (product unit/' + timeunit + ')</label>  <input class="form-control prodcap " type="number" value = ' + cap + ' min = 0 readonly/> </div> <div class="form-group"> <label> Supplied price (USD/product unit) </label> <input class="form-control prodprice" type="number" value = ' + price + '  readonly/></div></div>'

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
  content += '<div class="form-group"> <label>Demanded capacity/amount (product unit/' + timeunit + ')</label>  <input class="form-control demcap " type="number" value = ' + cap + ' min = 0 readonly/> </div> <div class="form-group"> <label> Demanded price (USD/product unit) </label> <input class="form-control demprice" type="number" value = ' + price + ' readonly/></div></div>'

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


function loadspinner(text){
  $("#spinnertext").html(text)
  $("#overlaycontainer").css("display","block");
}

function readtransfiles(taskid) {
  var el = document.getElementsByName("csrfmiddlewaretoken");
  csrf_value = el[0].getAttribute("value");
  loadspinner('Reading...')
  jQuery.ajax({
    method: "POST",
    url: "/expert/ajax/visualtaskresult",
    data: {csrfmiddlewaretoken: csrf_value, taskid: taskid},
    success: function (data) {
      if (data) {
        if (data.msg.length > 0 ) {
          $("#overlaycontainer").css("display","none");
          for (var i = 0; i < data.msg.length; i++){
            alertify.error(data.msg[i])
          }
        } else {
          arcset = []
          nodedata = data.nodedata
          proddata = data.prodlist
          pricedata = data.pricedata




          nodels = []
          for (var i = 1; i< nodedata.length; i++){
            nodels.push({node:nodedata[i][0], lat:nodedata[i][1], lon:nodedata[i][2]})
          }
          transdata = data.transdata

          for (var ii = 0; ii < transdata.length; ii++){
            transdataprod = transdata[ii];
            arcsubset = [];
            for (var i = 0; i < transdataprod.length; i++){
              for (var j = 0; j < transdataprod[i].length; j++){
                if (Number(transdataprod[i][j]) >= 0.01){
                  index = findProdIndexByID(proddata[ii].slice(1))
                  var data = {prod: prodlist[index].name, cost: prodlist[index].transcost, unit: prodlist[index].unit, color: colorls[ii%colorls.length], flow: Number(transdataprod[i][j])  }
                  var value = newpath([[nodels[i].lat, nodels[i].lon],[nodels[j].lat, nodels[j].lon]],data)
                  var path = value[0]
                  var dist = value[1]
                  path.addTo(mymap)

                  var arrowHead = path.arrow.addTo(mymap);

                  arcsubset.push({line: path, dist: dist, ii: i, jj: j})

                }
              }
            }
            arcset.push(arcsubset);
          }
          if (pricedata.length > 0){
            makecardcontent(price = true);
            pricelayer = []
            for (var jj = 0; jj < proddata.length; jj++){
              pricelayer.push([])
            }

          } else {
            makecardcontent();
          }

          $("#overlaycontainer").css("display","none");
        }
      }

    }
  });
}

function drawsquares(ii, onzoom=false){

var checkboxes = document.getElementsByClassName('pricecheck')
var flag = checkboxes[ii-1].checked
for (var i = 0; i < checkboxes.length; i++){
  if (i != ii-1){
    checkboxes[i].checked = false
  }
}

if (pricelayer[ii-1].length == 0) {
  // Make grid
  var minlat = Math.min.apply(Math, nodels.map(function(o) { return o.lat; }))
  var maxlat = Math.max.apply(Math, nodels.map(function(o) { return o.lat; }))
  var minlng = Math.min.apply(Math, nodels.map(function(o) { return o.lon; }))
  var maxlng = Math.max.apply(Math, nodels.map(function(o) { return o.lon; }))

  // onzoom - remove and recalculate the grids

  var latstep = (maxlat - minlat)/40
  var lngstep = (maxlng - minlng)/40

  gridls = []

  for (var i = 0; i < 41; i++) {
    for (var j = 0; j < 41; j++) {
      var loc = [minlat + i*latstep, minlng + j*lngstep]
      var bounds = [[minlat + (i-0.5)*latstep, minlng + (j-0.5)*lngstep], [minlat + (i+0.5)*latstep, minlng + (j+0.5)*lngstep]]
      var price = pricecalculator(loc, ii)
      gridls.push({bounds:bounds, price: price})
    }
  }

  maxprice = Math.max.apply(Math, gridls.map(function(o) { return o.price; }))
  minprice = Math.min.apply(Math, gridls.map(function(o) { return o.price; }))

  colorbarls = ['#0004ff','#0072ff','#00e1ff','#00ffb6','#50ff00','#b6ff00','#ffff00','#ffc300','#ff6a00','#ff0000','#b20000','#7a0000']
  step = (maxprice - minprice)/(colorbarls.length)

  for (var i = 0; i < gridls.length; i++) {
    var index = Math.floor((gridls[i].price - minprice)/step)
    var color = colorbarls[index]
    var cell = L.rectangle(gridls[i].bounds,
      {color: color,
      weight: 0.05,
      fillOpacity: 0.3,
      })
    cell.openpop = false
    var pop = cell.bindPopup('Estimated Price: ' + (minprice + index*step).toFixed(2) + ' ~ ' + (minprice + (index+1)*step).toFixed(2) + 'USD/unit')
    gridls[i].cell = cell
  }

pricelayer[ii-1] = gridls

}
cleancells();
if (flag) {
  var gridls = pricelayer[ii-1]
    for (var i = 0; i < gridls.length; i++) {
        gridls[i].cell.addTo(mymap);
        }
      }
}

function cleancells(){
  for (var j = 0; j < proddata.length; j++){
    gridls = pricelayer[j]
    for (var i = 0; i < gridls.length; i++){
      gridls[i].cell.removeFrom(mymap);
    }
  }
}

function pricecalculator(loc, ii){ //weighted knn, k = 10
  var distpricels = []

  for (var i = 0; i < nodels.length; i++) {
    var dist = distcalculator([loc,[nodels[i].lat, nodels[i].lon]])
    var weight
    if (dist == 0) {
      weight = 1e30
    } else {
      weight = 1/(dist*dist)
    }
    var price = pricedata[i+1][ii]
    distpricels.push({dist: dist, price: price, weight: weight})

  }
  distpricels.sort(function(a, b) {
        return a.dist - b.dist;
    });
  distpricels = distpricels.slice(0, Math.min(10, nodels.length))
  var weightsum = distpricels.reduce((a, b) => a + b.weight, 0)
  var finalprice = 1/weightsum*(distpricels.reduce((a,b) => a + b.weight*b.price, 0))

  return finalprice
}

function makeheatmap(id) {
  prices = []
  for (var i = 1; i< nodedata.length; i++){
    prices.push(Number(pricedata[i][id]))
  }
  minprice = Math.min(...prices)
  maxprice = Math.max(...prices)

  latlngintens = []
  for (var i = 1; i< nodedata.length; i++){
    var scaledprice = 10000*(pricedata[i][id]-minprice)/(maxprice-minprice)
    latlngintens.push([nodedata[i][1],nodedata[i][2], scaledprice])
  }

  var heat = L.heatLayer(latlngintens, {radius: 25}).addTo(mymap);
}

function makecardcontent(price = false){
  var content = ''
  if (price == false) {
    for (i = 0 ; i < proddata.length; i++){
      var index = findProdIndexByID(proddata[i].slice(1))
      content += '<div class="custom-control custom-checkbox"> <input class="form-check-input" type="checkbox" value="" onchange="checkChange(' + i + ')" checked> <label class="form-check-label"> <p data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample" style = "color: '+ colorls[i%colorls.length] +'"> ' + prodlist[index].name + ' </p> </label> </div>'
    }//ID: p' + prodlist[index].id + '&nbsp&nbsp&nbsp
  } else {
    content +='<p  data-toggle="collapse" href="#collapseTRANS" role="button" aria-expanded="false" aria-controls="collapseTRANS" class="parent-toggler"> <ion-icon name="add-outline" class = "iconpiclarge"></ion-icon>Transportation Results</p> <div class = "container" style = "left:10%"> <div class="collapse" id="collapseTRANS">'
    for (i = 0 ; i < proddata.length; i++){
      var index = findProdIndexByID(proddata[i].slice(1))
      content += '<div class="custom-control custom-checkbox"> <input class="form-check-input" type="checkbox" value="" onchange="checkChange(' + i + ')" checked> <label class="form-check-label"> <p data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample" style = "color: '+ colorls[i%colorls.length] +'"> ' + prodlist[index].name + ' </p>  </label> </div>' //ID: p' + prodlist[index].id + '&nbsp&nbsp&nbsp
    }
    content += '</div></div>'

    content += '<p  data-toggle="collapse" href="#collapsePRICE" role="button" aria-expanded="false" aria-controls="collapsePRICE" class = "parent-toggler"> <ion-icon name="add-outline" class = "iconpiclarge"></ion-icon>Price Results</p> <div class = "container" style = "left:10%"> <div class="collapse" id="collapsePRICE">'

    for (i = 0 ; i < proddata.length; i++){
      var index = findProdIndexByID(proddata[i].slice(1))
      content += '<div class="custom-control custom-checkbox"> <input class="form-check-input pricecheck" type="checkbox" value="" onchange="drawsquares(' + (i+1) + ')" > <label class="form-check-label"> <p data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample" > ' + prodlist[index].name + ' </p> </label> </div>'
    }//ID: p' + prodlist[index].id + '&nbsp&nbsp&nbsp
    content += '</div></div>'

  }

  $('#cardcontainer').html(content)

  // Remove handler from existing elements
  $(".parent-toggler").off();

  // Re-add event handler for all matching elements
  $(".parent-toggler").on("click", function() {
    ele = $(this)
    if ( ele.css('font-weight') == 700 ) {
      ele.css({'font-weight':700});
        setTimeout(function(){ ele.css({'font-weight':700})}, 30)
        setTimeout(function(){ ele.css({'font-weight':600})}, 60)
        setTimeout(function(){ ele.css({'font-weight':500})},90)
        setTimeout(function(){ ele.css({'font-weight':400})},120)
    } else {

      ele.css({'font-weight':400});
        setTimeout(function(){ ele.css({'font-weight':400})}, 30)
        setTimeout(function(){ ele.css({'font-weight':500})}, 60)
        setTimeout(function(){ ele.css({'font-weight':600})},90)
        setTimeout(function(){ ele.css({'font-weight':700})},120)
    }
  })

  $(".parent-toggler").hover(function(){
      $( this ).animate({'color': '#9A0000'}, 180);
  }, function(){
      $( this ).animate({'color': '#474747'}, 180);
  });
}

function checkChange(ii) {
  index = findProdIndexByID(proddata[ii].slice(1))
  var checkboxes = document.getElementsByClassName('form-check-input')
  var flag = checkboxes[ii].checked
  arcsubset = arcset[ii]
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

function newpath(latlng, data = {prod: "Waste", cost: '3', unit: 'tonne', color: 'blue'}, map = mymap){
  var path = L.polyline(latlng, {weight: 3*0.75, color: data.color})
  var point1 = new L.Routing.Waypoint()
  point1.latLng = L.latLng(latlng[0][0],latlng[0][1])
  var point2 = new L.Routing.Waypoint()
  point2.latLng = L.latLng(latlng[1][0],latlng[1][1])
  var options = {styles: [{color: 'black', opacity: 0.15, weight: 7*0.75}, {color: 'white', opacity: 0.8, weight: 6*0.75}, {color: data.color, opacity: 1, weight: 2.5*0.75}], addWaypoints: false}

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
  var dist = 2*6335.439*Math.asin(Math.sqrt(Math.pow(Math.sin((lat2-lat1)*Math.PI/2/180),2) + Math.cos(lat2*Math.PI/180)*Math.cos(lat1*Math.PI/180)*Math.pow(Math.sin((lng2 - lng1)*Math.PI/2/180),2)));

  return dist
}

function makecontent(mode, data) {
  var content
  if (mode == 'flow') {
    var content
    if (data.flow) {
      var transcost = (Number(data.cost)*Number(data.dist)*Number(data.flow)).toFixed(2)
      var flownumber = data.flow.toFixed(2)
      content = "<div class = 'text-left'><p><strong> Distance:</strong> "+ data.dist + "km </p><p><strong>Product:</strong> " + data.prod + "</p><p><strong>Transport Cost:</strong> " + transcost + " USD </p><p><strong>Product Flow:</strong> " + flownumber +" " + data.unit + "/year </p> <p><strong>Click to show true routes.</strong></p></div> "
    } else {
      content = "<div class = 'text-left'><p><strong> Distance:</strong> "+ data.dist + "km </p><p><strong>Product:</strong> " + data.prod + "</p><p><strong>Transport Cost:</strong> " + data.cost + " USD/" + data.unit +"/km </p> <p><strong>Click to show true routes.</strong></p></div>"
    }
    return content
  }
}
