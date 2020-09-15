
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
  iconSize: [18.75, 30.75],
  iconAnchor: [9, 30.75],
  popupAnchor: [0.75, -8.5],
  shadowSize: [30.75, 30.75]});

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

function ChangeZoom(){
 if (nodels.length >= 2) {
   var latlonls = []
   for (var i = 0; i < nodels.length; i++) {
     latlonls.push([nodels[i].lat, nodels[i].lon])
   }
   mymap.fitBounds(latlonls)
  }
}

function findFigureByID(id){
  for (var i = 0; i < nodels.length; i++){
    if (nodels[i].nodeid == id){
      return i
    }
  }
  return
}

function findFigureByName(name){
  for (var i = 0; i < nodels.length; i++){
    if (nodels[i].nodename == name){
      return i
    }
  }
  return
}

function findTechIndexByAlia(alia){
  for (var i = 0; i < techlist.length; i++){
    if (techlist[i].alia == alia){
      return i
    }
  }
  return
}


function newmarker(lat, lon, name){

  var id = makeid(8)
  var text = "<b>"+name + "</b>"
  var icon = greyIcon

  var marker = L.marker([lat, lon], {
    title: name,
    draggable: false,
    icon: icon} )

  var pop = marker.bindTooltip(text) //<br/>Latitude: " + lat +"<br/>Longitude: " + lon

  return [marker,id]
}

function newtechmarker(lat, lon, sitedata){

  var id = makeid(8)
  var marker = L.marker([lat, lon], {
    title: name,
    draggable: false,
    icon: redIcon} )

  var pop = marker.bindTooltip('<b>' + sitedata.node + '</b><p>Tech: ' + sitedata.tech + '</p><p>Cap:' + sitedata.cap + '</p>')

  return [marker,id]
}


function newpath(latlng, flow){
  var path = L.polyline(latlng, {weight: 1.5})
  var dist = distcalculator(latlng).toFixed(2)
  var pop = path.bindTooltip("<p> Distance: "+ dist + "km </p><p>Flow: " + flow + "</p>")

  path.on('mouseover', (event)=>{
    pop.openPopup()
  })
  path.on('mouseout', (event)=>{
    pop.closePopup()
  })
  return [path, dist]
}

function newroute(latlng, flow){
  var path = L.polyline(latlng, {weight: 1.5})
  var dist = distcalculator(latlng).toFixed(2)
  var point1 = new L.Routing.Waypoint()
  point1.latLng = L.latLng(latlng[0][0],latlng[0][1])
  var point2 = new L.Routing.Waypoint()
  point2.latLng = L.latLng(latlng[1][0],latlng[1][1])
  var options = {styles: [{color: 'black', opacity: 0.15, weight: 7}, {color: 'white', opacity: 0.8, weight: 6}, {color: 'blue', opacity: 1, weight: 2.5}], addWaypoints: false}

  var router = new L.Routing.OSRMv1({
        serviceUrl: "http://54.208.179.171:5000/route/v1"
    })
  router.route([point1, point2], function(err, route) {
    path2 = new L.Routing.line(route[0], options)
    var pop = path2.bindTooltip("<p> Distance: "+ dist + "km </p><p>Flow: " + flow + "</p>")
    path2.on('mouseover', (event)=>{
      pop.openPopup()
    })
    path2.on('mouseout', (event)=>{
      pop.closePopup()
    })
    path2.addTo(mymap)
  })
  return path
}

function newhybrid(latlng, flow, map = mymap){
  var path = L.polyline(latlng, {weight: 1.5})
  var point1 = new L.Routing.Waypoint()
  point1.latLng = L.latLng(latlng[0][0],latlng[0][1])
  var point2 = new L.Routing.Waypoint()
  point2.latLng = L.latLng(latlng[1][0],latlng[1][1])
  var options = {styles: [{color: 'black', opacity: 0.15, weight: 7}, {color: 'white', opacity: 0.8, weight: 6}, {color: 'black', opacity: 1, weight: 2.5}], addWaypoints: false}

  var router = new L.Routing.OSRMv1({
        serviceUrl: "http://54.208.179.171:5000/route/v1"
    })
  router.route([point1, point2], function(err, route) {
    path2 = new L.Routing.line(route[0], options)
    path.road = path2
    path.roadtime = (Number(route[0].summary.totalTime)/3600).toFixed(2)
    path.roaddist = (Number(route[0].summary.totalDistance)/1000).toFixed(2)
  })

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
  var pop = path.bindTooltip("<p> Distance: "+ dist + "km </p><p>Flow: " + flow + "</p>")
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

function extractValuesfromHTMLCollection(collection) {
  ls = []
  for (var j = 0; j < collection.length; j++){
    ls.push(collection[j].value)
  }
  return ls
}
