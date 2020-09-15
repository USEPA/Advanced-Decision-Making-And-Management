function ChangeZoom(){
 if (nodedatajs.length >= 2) {
   var latlonls = []
   for (var i = 0; i < nodedatajs.length; i++) {
     latlonls.push([nodedatajs[i].x, nodedatajs[i].y])
   }
   mymap.fitBounds(latlonls)
  }
}

function ChangeZoom2(){
 if (nodedatajs.length >= 2) {
   var latlonls = []
   for (var i = 0; i < nodedatajs.length; i++) {
     latlonls.push([nodedatajs[i].x, nodedatajs[i].y])
   }
   mymap2.fitBounds(latlonls)
  }
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

function makeid(length) {
   var result           = '';
   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}



divid = 'gfx_holder4'
center = [43.0731, -89.4012]
zoom = 10

mymap = L.map(divid).setView(center, zoom);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}', {
  foo: 'bar',
  attribution: 'Map data <a href="https://www.openstreetmap.org/">OpenStreetMap</a> under <a href="http://opendatacommons.org/licenses/odbl/1.0/">ODbL</a>',
  maxZoom: 18,
}).addTo(mymap);
mymap.doubleClickZoom.disable()

goldIcon = new L.Icon({
iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png',
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

greengoldIcon = new L.Icon({
iconUrl: '/static/figure/markers/green-gold.png',
shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
iconSize: [18.75, 30.75],
iconAnchor: [9, 30.75],
popupAnchor: [0.75, -8.5],
shadowSize: [30.75, 30.75]});

var legend = L.control({position: 'bottomleft'});
  legend.onAdd = function (mymap) {

  var div = L.DomUtil.create('div', 'card w-100');
  labels = ['<strong style = "font-size: 1.0rem;">Categories</strong>'],
  categories = ['Tech','Demand','Supply', 'Candidate'];
  color = ['blue', 'green', 'gold', 'red']

  for (var i = 0; i < categories.length; i++) {

          div.innerHTML +=
          labels.push(
              '<div class = "text-left" style = "font-size: 0.9rem;">&nbsp;&nbsp;<img src="https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-' + color[i] + '.png" style = "width: 13px" alt="" style="vertical-align:middle"> - ' + categories[i] + '</div>'
          );
      }
      div.innerHTML = labels.join('');
  return div;
  };
  legend.addTo(mymap);

mymap2 = L.map('gfx_holder5').setView([43.0731, -89.4012], 10);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}', {
  foo: 'bar',
  attribution: 'Map data <a href="https://www.openstreetmap.org/">OpenStreetMap</a> under <a href="http://opendatacommons.org/licenses/odbl/1.0/">ODbL</a>',
  maxZoom: 18,
}).addTo(mymap2);
mymap2.doubleClickZoom.disable()

var legend = L.control({position: 'topright'});
  legend.onAdd = function (mymap) {

  var div = L.DomUtil.create('div', 'card w-100');
  labels = ['<strong style = "font-size: 0.9rem;">Product Flows</strong>'],
  categories = ['Waste','Biogas','Digestate', 'Electricity','Biomethane'];
  color = ['black','green', 'blue', 'orange','red']

  for (var i = 0; i < categories.length; i++) {

          div.innerHTML +=
          labels.push(
              '<div class = "text-left" style = "font-size: 0.9rem;">&nbsp;<strong style = "color: '+ color[i]+ '"> &rarr; </strong> &nbsp;' + categories[i] + '</div>'
          );
      }
      div.innerHTML = labels.join('');
  return div;
  };
  legend.addTo(mymap2);


function makecontent(mode, data) {
  var content
  if (mode == 'sup') {
    content = '<h6> <strong>Supply Information </strong></h6> <p>Location: </p> <p>Latitude: ' + (data.lat).toFixed(4) +'&nbsp;&nbsp; Longitude: ' + (data.lon).toFixed(4) +'</p> <div class="form-group"> <label>Product: </label> <input class="form-control" type="text" value = ' + data.prod +' readonly="readonly" /> </div><div class="form-group"> <label>Capacity (tonne per year): </label> <input class="form-control" id = "supcap" type="number" value = "' + data.amount +'"/> </div><div class="form-group"> <label>Price (USD per tonne): </label> <input class="form-control" id="supprice" type="number" value = "' + data.price + '"/></div>'
    return content
  }

  if (mode == 'dem') {
    content = '<h6> <strong>Consumer Informtion </strong></h6> <p> Location: </p> <p>Latitude:' + (data.lat).toFixed(4) +'&nbsp;&nbsp;  Longitude: ' + (data.lon).toFixed(4) +'</p> <div class="form-group"> <label>Product: </label> <input class="form-control" type="text" value = ' + data.prod +' readonly="readonly" /> </div><div class="form-group"> <label>Capacity ('+ data.unit+' per year): </label> <input class="form-control" type="number" id = "demcap" value = "' + data.amount +'"/> </div><div class="form-group"> <label>Price (USD per '+ data.unit+'): </label> <input class="form-control" type="number" id = "demprice" value = "' + data.price + '"/></div>'
    return content
  }

  if (mode == 'tech') {
    content = '<h6> <strong>Technology Informtion </strong> </h6> <p>Location: </p> <p>Latitude: ' + (data.lat).toFixed(4) +'&nbsp;&nbsp; Longitude: ' + (data.lon).toFixed(4) +'</p> <div class="form-group"> <label>Type: </label> <input class="form-control" type="text" value = "' + data.type +'" readonly="readonly" /> </div><div class="form-group"> <label>Capacity ('+ data.unit+' ' + data.refprod + ' per year): </label> <input class="form-control" type="number" id = "techcap" value = "' + data.capacity +'"/> </div><div class="form-group"><p>Pathways: </p> <img src ='  + data.src + ' width = 100% ></div>'
    return content
  }

  if (mode == 'cand') {
    content = '<h6> <strong>Technology Candidate Informtion </strong> </h6> <br/> <p>Location: </p> <p><Latitude:' + (data.lat).toFixed(4) +'&nbsp;&nbsp;  Longitude: ' + (data.lon).toFixed(4) +'</p> <div class="form-group"> <label>Type:</label> <input class="form-control" type="text" value = "' + data.type +'" readonly="readonly" /> <br/>  <br/><p>Pathways: </p> <img src ='  + data.src + ' width = 100% ></div>'
    return content
  }

  if (mode == 'flow') {
    var content
    if (data.flow) {
      var transcost = (Number(data.cost)*Number(data.dist)*Number(data.flow)).toFixed(2)
      var flownumber = data.flow.toFixed(2)
      content = "<div class = 'text-left'><p><strong> Distance:</strong> "+ data.dist + "km </p><p><strong>Product:</strong> " + data.prod + "</p><p><strong>Transport Cost:</strong> " + transcost + " USD </p><p><strong>Product Flow:</strong> " + flownumber +" " + data.unit + "/year </p> <p><strong>Click to show GIS routes.</strong></p></div> "
    } else {
      content = "<div class = 'text-left'><p><strong> Distance:</strong> "+ data.dist + "km </p><p><strong>Product:</strong> " + data.prod + "</p><p><strong>Transport Cost:</strong> " + data.cost + " USD/" + data.unit +"/km </p> <p><strong>Click to show GIS routes.</strong></p></div>"
    }
    return content
  }
}

function supmarker(lat, lon, data, draggable = true){

  var id = makeid(8)
  var marker = L.marker([lat, lon], {
    title: name,
    draggable: draggable,
    icon: goldIcon} )
  data.lat = lat
  data.lon = lon
  marker.data = data
  marker.data.id = id
  marker.changable = true

  marker.on('move', (event)=>{
    marker.data.lat = marker.getLatLng().lat
    marker.data.lon = marker.getLatLng().lng
  })

  marker.on('dblclick', (event)=>{
      marker.content = ''
      marker.content = makecontent('sup', marker.data)
      alertify.confirm(marker.content).set('title', 'Information').set('onok', function(closeEvent) {
        if (marker.changable) {
          var i = findNodeIndex(supls, marker.data.id)
          marker.data.amount = $('#supcap').val()
          marker.data.price = $('#supprice').val()
          supls[i].data = marker.data
        }
        alertify.confirm().destroy()
      }).set('oncancel',function(closeEvent) {
        alertify.confirm().destroy()
      }).set('closable',false)});

  var pop = marker.bindTooltip("<b>"+data.name + "</b>")
  return marker
}

function demmarker(lat, lon, data, draggable = true){

  var id = makeid(8)
  var marker = L.marker([lat, lon], {
    title: name,
    draggable: draggable,
    icon: greenIcon} )
  data.lat = lat
  data.lon = lon
  marker.data = data
  marker.data.id = id
  marker.changable = true

  marker.on('move', (event)=>{
    marker.data.lat = marker.getLatLng().lat
    marker.data.lon = marker.getLatLng().lng
  })

  marker.on('dblclick', (event)=>{
      marker.content = ''
      marker.content = makecontent('dem', marker.data)
      alertify.confirm(marker.content).set('title', 'Information').set('onok', function(closeEvent) {
        if (marker.changable) {
          var i = findNodeIndex(demls, marker.data.id)
          marker.data.amount = $('#demcap').val()
          marker.data.price = $('#demprice').val()
          demls[i].data = marker.data
        }
        alertify.confirm().destroy()
      }).set('oncancel',function(closeEvent) {
        alertify.confirm().destroy()
      }).set('closable',false)});

  var pop = marker.bindTooltip("<b>"+data.name + "</b>")
  return marker
}


function techmarker(lat, lon, data, draggable = true){

  var id = makeid(8)
  var marker = L.marker([lat, lon], {
    title: name,
    draggable: draggable,
    icon: blueIcon} )
  data.lat = lat
  data.lon = lon
  marker.data = data
  marker.data.id = id
  marker.changable = true

  marker.on('move', (event)=>{
    marker.data.lat = marker.getLatLng().lat
    marker.data.lon = marker.getLatLng().lng
  })

  marker.on('dblclick', (event)=>{
      marker.content = ''
      marker.content = makecontent('tech', marker.data)
      alertify.confirm(marker.content).set('title', 'Information').set('onok', function(closeEvent) {
        if (marker.changable) {
          var i = findNodeIndex(techls, marker.data.id)
          marker.data.capacity = $('#techcap').val()
          marker.data.cost = $('#techcost').val()
          techls[i].data = marker.data
        }
        alertify.confirm().destroy()
      }).set('oncancel',function(closeEvent) {
        alertify.confirm().destroy()
      }).set('closable',false)});

  var pop = marker.bindTooltip("<b>"+data.name + "</b>")
  return marker
}

function candmarker(lat, lon, data, draggable = true){

  var id = makeid(8)
  var marker = L.marker([lat, lon], {
    title: name,
    draggable: draggable,
    icon: redIcon} )
  data.lat = lat
  data.lon = lon
  marker.data = data
  marker.data.id = id
  marker.changable = true

  marker.on('move', (event)=>{
    marker.data.lat = marker.getLatLng().lat
    marker.data.lon = marker.getLatLng().lng
  })

  marker.on('dblclick', (event)=>{
      marker.content = ''
      marker.content = makecontent('cand', marker.data)
      alertify.confirm(marker.content).set('title', 'Information').set('onok', function(closeEvent) {
        if (marker.changable) {
          var i = findNodeIndex(candls, marker.data.id)
        }
        alertify.confirm().destroy()
      }).set('oncancel',function(closeEvent) {
        alertify.confirm().destroy()
      }).set('closable',false)});

  var pop = marker.bindTooltip("<b>"+data.name + "</b>")
  return marker
}

function newpath(latlng, data, map = mymap){
  var path = L.polyline(latlng, {weight: 3*0.67, color: data.color})
  var point1 = new L.Routing.Waypoint()
  point1.latLng = L.latLng(latlng[0][0],latlng[0][1])
  var point2 = new L.Routing.Waypoint()
  point2.latLng = L.latLng(latlng[1][0],latlng[1][1])
  var options = {styles: [{color: 'black', opacity: 0.15, weight: 7*0.67}, {color: 'white', opacity: 0.8, weight: 6*0.67}, {color: data.color, opacity: 1, weight: 2.5*0.67}], addWaypoints: false}

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

var copy1 = techmarker(nodedatajs[3].x, nodedatajs[3].y,  {name: "Technology1", type: "Anaerobic Digestion", capacity: sitedatajs[1][3], cost: 0, refprod: 'Waste', unit: 'tonne', src: $('#techpic1').attr('src')}, draggable = false)
var copy2 = techmarker(nodedatajs[3].x, nodedatajs[3].y,  {name: "Technology1", type: "Anaerobic Digestion", capacity: sitedatajs[1][3], cost: 0, refprod: 'Waste', unit: 'tonne', src: $('#techpic1').attr('src')}, draggable = false)
copy1.changable = false
copy2.changable = false
copy1.data.capacity = copy1.data.capacity + '" readonly = "readonly'
copy2.data.capacity = copy2.data.capacity + '" readonly = "readonly'
copy1.addTo(mymap)
copy2.addTo(mymap2)

var copy1 = techmarker(nodedatajs[4].x, nodedatajs[4].y,  {name: "Technology2", type: "Anaerobic Digestion + Generator", capacity: sitedatajs[2][3], cost: 0, refprod: 'Waste', unit: 'tonne', src: $('#techpic2').attr('src')}, draggable = false)
var copy2 = techmarker(nodedatajs[4].x, nodedatajs[4].y,  {name: "Technology2", type: "Anaerobic Digestion + Generator", capacity: sitedatajs[2][3], cost: 0, refprod: 'Waste', unit: 'tonne', src: $('#techpic2').attr('src')}, draggable = false)
copy1.changable = false
copy2.changable = false
copy1.data.capacity = copy1.data.capacity + '" readonly = "readonly'
copy2.data.capacity = copy2.data.capacity + '" readonly = "readonly'
copy1.addTo(mymap)
copy2.addTo(mymap2)

var copy1 = candmarker(nodedatajs[5].x, nodedatajs[5].y,  {name: "Tech Candidate", type: "Anaerobic Digestion + Biomethane", refprod: 'Waste', unit: 'tonne', src: $('#techpic3').attr('src')}, draggable = false)
var copy2 = candmarker(nodedatajs[5].x, nodedatajs[5].y,  {name: "Tech Candidate", type: "Anaerobic Digestion + Biomethane", refprod: 'Waste', unit: 'tonne', src: $('#techpic3').attr('src')}, draggable = false)
copy1.changable = false
copy2.changable = false
copy1.data.capacity = copy1.data.capacity + '" readonly = "readonly'
copy2.data.capacity = copy2.data.capacity + '" readonly = "readonly'
copy1.addTo(mymap)
copy2.addTo(mymap2)

var copy1 = supmarker(nodedatajs[0].x, nodedatajs[0].y,  {name: "CAFO1", prod: "Waste", amount: supdatajs[1][4], price: supdatajs[1][3]}, draggable = false)
var copy2 = supmarker(nodedatajs[0].x, nodedatajs[0].y,  {name: "CAFO1", prod: "Waste", amount: supdatajs[1][4], price: supdatajs[1][3]}, draggable = false)
copy1.changable = false
copy2.changable = false
copy1.data.amount = copy1.data.amount + '" readonly = "readonly'
copy1.data.price = copy1.data.price + '" readonly = "readonly'
copy2.data.amount = copy2.data.amount + '" readonly = "readonly'
copy2.data.price = copy2.data.price + '" readonly = "readonly'
copy1.addTo(mymap)
copy2.addTo(mymap2)

var copy1 = supmarker(nodedatajs[1].x, nodedatajs[1].y,  {name: "CAFO2", prod: "Waste", amount: supdatajs[2][4], price: supdatajs[2][3]}, draggable = false)
var copy2 = supmarker(nodedatajs[1].x, nodedatajs[1].y,  {name: "CAFO2", prod: "Waste", amount: supdatajs[2][4], price: supdatajs[2][3]}, draggable = false)
copy1.changable = false
copy2.changable = false
copy1.data.amount = copy1.data.amount + '" readonly = "readonly'
copy1.data.price = copy1.data.price + '" readonly = "readonly'
copy2.data.amount = copy2.data.amount + '" readonly = "readonly'
copy2.data.price = copy2.data.price + '" readonly = "readonly'
copy1.addTo(mymap)
copy2.addTo(mymap2)

var copy1 = demmarker(nodedatajs[6].x, nodedatajs[6].y,  {name: "Consumer1", prod: "Biogas", amount: demdatajs[1][4], price: demdatajs[1][3], unit: '1000-cft'}, draggable = false)
var copy2 = demmarker(nodedatajs[6].x, nodedatajs[6].y,  {name: "Consumer1", prod: "Biogas", amount: demdatajs[1][4], price: demdatajs[1][3], unit: '1000-cft'}, draggable = false)
copy1.changable = false
copy2.changable = false
copy1.data.amount = copy1.data.amount + '" readonly = "readonly'
copy1.data.price = copy1.data.price + '" readonly = "readonly'
copy2.data.amount = copy2.data.amount + '" readonly = "readonly'
copy2.data.price = copy2.data.price + '" readonly = "readonly'
copy1.addTo(mymap)
copy2.addTo(mymap2)

var copy3 = demmarker(nodedatajs[7].x, nodedatajs[7].y,  {name: "Consumer2", prod: "Digestate", amount: demdatajs[2][4], price: demdatajs[2][3], unit: 'tonne', prod2: "Waste", amount2: demdatajs[3][4], price2: demdatajs[3][3], unit2: 'tonne'}, draggable = false)

var copy4 = demmarker(nodedatajs[7].x, nodedatajs[7].y, {name: "Consumer2", prod: "Digestate", amount: demdatajs[2][4], price: demdatajs[2][3], unit: 'tonne', prod2: "Waste", amount2: demdatajs[3][4], price2: demdatajs[3][3], unit2: 'tonne'}, draggable = false)

copy3.on('dblclick', (event)=>{
    copy3.content = ''
    copy3.content = makecontent('dem', copy3.data)
    copy3.content = copy3.content + '<br/><div class="form-group"> <label>Product: </label> <input class="form-control" type="text" value = ' + demmarker2.data.prod2 +' readonly="readonly" /> </div><div class="form-group"> <label>Capacity ('+ demmarker2.data.unit2+' per year): </label> <input class="form-control" type="number" id = "demcap2" value = "' + demmarker2.data.amount2 +'" readonly="readonly"/> </div><div class="form-group"> <label>Price (USD per '+ demmarker2.data.unit2+'): </label> <input class="form-control" type="number" id = "demprice2" value = "' + demmarker2.data.price2 + '" readonly="readonly"/></div>'
    alertify.confirm(copy3.content).set('title', 'Information').set('onok', function(closeEvent) {
      alertify.confirm().destroy()
    }).set('oncancel',function(closeEvent) {
      alertify.confirm().destroy()
    }).set('closable',false)});

copy4.on('dblclick', (event)=>{
    copy4.content = ''
    copy4.content = makecontent('dem', copy4.data)
    copy4.content = copy4.content + '<br/><div class="form-group"> <label>Product: </label> <input class="form-control" type="text" value = ' + demmarker2.data.prod2 +' readonly="readonly" /> </div><div class="form-group"> <label>Capacity ('+ demmarker2.data.unit2+' per year): </label> <input class="form-control" type="number" id = "demcap2" value = "' + demmarker2.data.amount2 +'" readonly="readonly"/> </div><div class="form-group"> <label>Price (USD per '+ demmarker2.data.unit2+'): </label> <input class="form-control" type="number" id = "demprice2" value = "' + demmarker2.data.price2 + '" readonly="readonly"/></div>'
    alertify.confirm(copy4.content).set('title', 'Information').set('onok', function(closeEvent) {
      alertify.confirm().destroy()
    }).set('oncancel',function(closeEvent) {
      alertify.confirm().destroy()
    }).set('closable',false)});

  copy3.addTo(mymap)
  copy4.addTo(mymap2)


var copy5 = demmarker(nodedatajs[2].x, nodedatajs[2].y,  {name: "CAFO3", prod: "Waste", amount: supdatajs[3][4], price: supdatajs[3][3], prod2: "Electricity", amount2: demdatajs[4][4], price2: demdatajs[4][3], unit2: 'kWh'}, draggable = false)
copy5.data.amount = copy5.data.amount + '" readonly = "readonly'
copy5.data.price = copy5.data.price + '" readonly = "readonly'
copy5.unbindTooltip()
copy5.bindTooltip("<b>CAFO3</b><br/><b>Consumer3</b>" )
copy5.setIcon(greengoldIcon)

var copy6 = demmarker(nodedatajs[2].x, nodedatajs[2].y,  {name: "CAFO3", prod: "Waste", amount: supdatajs[3][4], price: supdatajs[3][3], prod2: "Electricity", amount2: demdatajs[4][4], price2: demdatajs[4][3], unit2: 'kWh'}, draggable = false)
copy6.data.amount = copy6.data.amount + '" readonly = "readonly'
copy6.data.price = copy6.data.price + '" readonly = "readonly'
copy6.unbindTooltip()
copy6.bindTooltip("<b>CAFO3</b><br/><b>Consumer3</b>" )
copy6.setIcon(greengoldIcon)

copy5.on('dblclick', (event)=>{
    copy5.content = '<h6> <strong>Consumer Informtion </strong></h6> <p> Location: </p> <p>Latitude:' + (supmarker3.getLatLng().lat).toFixed(7) +'&nbsp;&nbsp;  Longitude: ' + (supmarker3.getLatLng().lng).toFixed(7) +'</p> <div class="form-group"> <label> Product: </label> <input class="form-control" type="text" value = ' + supmarker3.data.prod2 +' readonly="readonly" /> </div><div class="form-group"> <label> Capacity ('+ supmarker3.data.unit2+' per year): </label> <input class="form-control" type="number" id = "demcap2" value = "' + supmarker3.data.amount2 +'" readonly="readonly"/> </div> <div class="form-group"> <label> Demand Price (USD per '+ supmarker3.data.unit2+'): </label> <input class="form-control" type="number" id = "demprice2" value = "' + supmarker3.data.price2 + '" readonly="readonly"/> </div>' + makecontent('sup', supmarker3.data)
    alertify.confirm(copy5.content).set('title', 'Information').set('onok', function(closeEvent) {
      alertify.confirm().destroy()
    }).set('oncancel',function(closeEvent) {
      alertify.confirm().destroy()
    }).set('closable',false)});

copy6.on('dblclick', (event)=>{
    copy6.content = '<h6> <strong>Consumer Informtion </strong></h6> <p> Location: </p> <p>Latitude:' + (supmarker3.getLatLng().lat).toFixed(7) +'&nbsp;&nbsp;  Longitude: ' + (supmarker3.getLatLng().lng).toFixed(7) +'</p> <div class="form-group"> <label> Product: </label> <input class="form-control" type="text" value = ' + supmarker3.data.prod2 +' readonly="readonly" /> </div><div class="form-group"> <label> Capacity ('+ supmarker3.data.unit2+' per year): </label> <input class="form-control" type="number" id = "demcap2" value = "' + supmarker3.data.amount2 +'" readonly="readonly"/> </div> <div class="form-group"> <label> Demand Price (USD per '+ supmarker3.data.unit2+'): </label> <input class="form-control" type="number" id = "demprice2" value = "' + supmarker3.data.price2 + '" readonly="readonly"/> </div>' + makecontent('sup', supmarker3.data)
    alertify.confirm(copy6.content).set('title', 'Information').set('onok', function(closeEvent) {
      alertify.confirm().destroy()
    }).set('oncancel',function(closeEvent) {
      alertify.confirm().destroy()
    }).set('closable',false)});

copy5.addTo(mymap);
copy6.addTo(mymap2);


var copy7 = demmarker(nodedatajs[8].x, nodedatajs[8].y,  {name: "Consumer4", prod: "Biomethane", amount: demdatajs[5][4], price: demdatajs[5][3], unit: 'gal'}, draggable = false)
var copy8 = demmarker(nodedatajs[8].x, nodedatajs[8].y,  {name: "Consumer4", prod: "Biomethane", amount: demdatajs[5][4], price: demdatajs[5][3], unit: 'gal'}, draggable = false)
copy7.changable = false
copy8.changable = false
copy7.data.amount = copy7.data.amount + '" readonly = "readonly'
copy7.data.price = copy7.data.price + '" readonly = "readonly'
copy8.data.amount = copy8.data.amount + '" readonly = "readonly'
copy8.data.price = copy8.data.price + '" readonly = "readonly'
copy7.addTo(mymap)
copy8.addTo(mymap2)

for (var i = 0; i < transresultjs[0].length; i++) {
  for (var j = 0; j < transresultjs[0][0].length; j++) {
    if (Number(transresultjs[0][i][j]) > 0.01) {
      var value = newpath([[nodedatajs[i].x, nodedatajs[i].y],[nodedatajs[j].x, nodedatajs[j].y]], {prod: "Waste", cost: '3', unit: 'tonne', color: 'black', flow: Number(transresultjs[0][i][j])})
      var path = value[0]
      path.addTo(mymap)
      var arrowHead = L.polylineDecorator(path, {
          patterns: [
            {offset: '60%', repeat: 0, symbol: L.Symbol.arrowHead({pixelSize: 6, polygon: false, pathOptions: {color: 'black', stroke: true}})}]
          }).addTo(mymap);
    }
  }
}

for (var i = 0; i < transresultjs[1].length; i++) {
  for (var j = 0; j < transresultjs[1][0].length; j++) {
    if (Number(transresultjs[1][i][j]) > 0.01) {
      var value = newpath([[nodedatajs[i].x, nodedatajs[i].y],[nodedatajs[j].x, nodedatajs[j].y]], {prod: "Biogas",cost: '0.1', unit: '1000-cft', color: 'green', flow: Number(transresultjs[1][i][j])}, map = mymap2)
      var path = value[0]
      path.addTo(mymap2)
      var arrowHead = L.polylineDecorator(path, {
          patterns: [
            {offset: '60%', repeat: 0, symbol: L.Symbol.arrowHead({pixelSize: 6, polygon: false, pathOptions: {color: 'green', stroke: true}})}]
          }).addTo(mymap2);
    }
  }
}

for (var i = 0; i < transresultjs[2].length; i++) {
  for (var j = 0; j < transresultjs[2][0].length; j++) {
    if (Number(transresultjs[2][i][j]) > 0.01) {
      var value = newpath([[nodedatajs[i].x, nodedatajs[i].y],[nodedatajs[j].x, nodedatajs[j].y]], {prod: "Digestate", cost: '3',unit: 'tonne', color: 'blue', flow: Number(transresultjs[2][i][j])}, map = mymap2)
      var path = value[0]
      path.addTo(mymap2)
      var arrowHead = L.polylineDecorator(path, {
          patterns: [
            {offset: '60%', repeat: 0, symbol: L.Symbol.arrowHead({pixelSize: 6, polygon: false, pathOptions: {color: 'blue', stroke: true}})}]
          }).addTo(mymap2);
    }
  }
}

for (var i = 0; i < transresultjs[3].length; i++) {
  for (var j = 0; j < transresultjs[3][0].length; j++) {
    if (Number(transresultjs[3][i][j]) > 0.01) {
      var value = newpath([[nodedatajs[i].x, nodedatajs[i].y],[nodedatajs[j].x, nodedatajs[j].y]], {prod: "Electricity", cost: '0',unit: 'kWh', color: 'orange', flow: Number(transresultjs[3][i][j])}, map = mymap2)
      var path = value[0]
      path.addTo(mymap2)
      var arrowHead = L.polylineDecorator(path, {
          patterns: [
            {offset: '60%', repeat: 0, symbol: L.Symbol.arrowHead({pixelSize: 6, polygon: false, pathOptions: {color: 'orange', stroke: true}})}]
          }).addTo(mymap2);
    }
  }
}

for (var i = 0; i < transresultjs[4].length; i++) {
  for (var j = 0; j < transresultjs[4][0].length; j++) {
    if (Number(transresultjs[4][i][j]) > 0.01) {
      var value = newpath([[nodedatajs[i].x, nodedatajs[i].y],[nodedatajs[j].x, nodedatajs[j].y]], {prod: "Biomethane", cost: '0.3',unit: 'gal', color: 'red', flow: Number(transresultjs[4][i][j])}, map = mymap2)
      var path = value[0]
      path.addTo(mymap2)
      var arrowHead = L.polylineDecorator(path, {
          patterns: [
            {offset: '60%', repeat: 0, symbol: L.Symbol.arrowHead({pixelSize: 6, polygon: false, pathOptions: {color: 'red', stroke: true}})}]
          }).addTo(mymap2);
    }
  }
}

ChangeZoom()
ChangeZoom2()
