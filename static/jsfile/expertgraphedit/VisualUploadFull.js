
function initgeomap(center = [51.505, -0.09], zoom = 2){
  prod = 0
  transdataprod = []
  arcset = []
  html5Slider = false
  mymap = L.map('gfx_holder').setView(center, zoom);
  var cartodbAttribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/attribution">CARTO</a>';

  L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
    attribution: cartodbAttribution,
    maxZoom: 18,
}).addTo(mymap);
  mymap.doubleClickZoom.disable()
  mymap.on('dblclick', ChangeZoom)

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

  return marker
}


function loadspinner(text){
  $("#spinnertext").html(text)
  $("#overlaycontainer").css("display","block");
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

function ChangeZoom(){
 if (nodels.length >= 2) {
   var latlonls = []
   for (var i = 0; i < nodels.length; i++) {
     latlonls.push([nodels[i].lat, nodels[i].lon])
   }
   mymap.fitBounds(latlonls)
  }
}
