function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}


nodels = []


function initgeomap(divid, center = [43.0731, -89.4012], zoom = 10){
  mymap = L.map(divid).setView(center, zoom);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}', {
    foo: 'bar',
    attribution: 'Map data <a href="https://www.openstreetmap.org/">OpenStreetMap</a> under <a href="http://opendatacommons.org/licenses/odbl/1.0/">ODbL</a>',
    maxZoom: 18,
}).addTo(mymap);
  mymap.doubleClickZoom.disable()
  mymap.on('dblclick', ChangeZoom)

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
    categories = ['Tech','Demand','Supply'];
    color = ['blue', 'green', 'gold']

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

function ChangeZoom2(){
 if (nodels.length >= 2) {
   var latlonls = []
   for (var i = 0; i < nodels.length; i++) {
     latlonls.push([nodels[i].lat, nodels[i].lon])
   }
   mymap2.fitBounds(latlonls)
  }
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
  if (mode == 'sup') {
    content = '<h6> <strong>Supply Information </strong></h6> <p>Location: </p> <p>Latitude: ' + (data.lat).toFixed(4) +'&nbsp;&nbsp; Longitude: ' + (data.lon).toFixed(4) +'</p> <div class="form-group"> <label>Product: </label> <input class="form-control" type="text" value = ' + data.prod +' readonly="readonly" /> </div><div class="form-group"> <label>Capacity (tonne per year): </label> <input class="form-control" type="number" value = ' + data.amount +' readonly="readonly"/> </div><div class="form-group"> <label>Price (USD per tonne): </label> <input class="form-control" type="number" value = ' + data.price + ' readonly="readonly"/></div>'
    return content
  }

  if (mode == 'dem') {
    content = '<h6> <strong>Consumer Information</strong> </h6> <p>Consumer Location: </p> <p>Latitude: ' + (data.lat).toFixed(4) +'&nbsp;&nbsp;  Longitude: ' + (data.lon).toFixed(4) +'</p> <div class="form-group"> <label>Product: </label> <input class="form-control" type="text" value = ' + data.prod +' readonly="readonly" /> </div> <div class="form-group"> <label>Demand Capacity ('+ data.unit+' per year): </label> <input class="form-control" type="number" value = ' + data.amount +' readonly="readonly"/> </div><div class="form-group"> <label> Demand Price (USD per '+ data.unit+'): </label> <input class="form-control" type="number" value = ' + data.price + ' readonly="readonly"/></div>'
    return content
  }

  if (mode == 'tech') {
    content = '<h6> <strong> Technology Information </strong> </h6> <p>Technology Location: </p> <p>Latitude:' + (data.lat).toFixed(4) +'&nbsp;&nbsp; Longitude:' + (data.lon).toFixed(4) +'</p> <div class="form-group"> <label>Type: </label> <input class="form-control" type="text" value = "' + data.type +'" readonly="readonly" /> </div><div class="form-group"> <label>Capacity ('+ data.unit+' ' + data.refprod + ' per year): </label> <input class="form-control" type="number" value = ' + data.capacity +' readonly="readonly"/> </div> <div class="form-group"> <label>Operating Cost (USD per '+ data.unit+' ' + data.refprod + '): </label> <input class="form-control" type="number" value = ' + data.cost + ' readonly="readonly"/> </div> <p>Pathways: </p> <img src ='  + data.src + ' width = 100% >'
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

function supmarker(lat, lon, data){

  var id = makeid(8)
  var marker = L.marker([lat, lon], {
    title: name,
    draggable: false,
    icon: goldIcon} )
  data.lat = lat
  data.lon = lon
  marker.content = ''
  marker.content = makecontent('sup', data)

  marker.on('dblclick', (event)=>{
      alertify.confirm(marker.content).set('title', 'Information').set('onok', null).set('oncancel', null).set('closable',false)});

  var pop = marker.bindTooltip("<b>"+data.name + "</b>")
  return [marker,id]
}

function demmarker(lat, lon, data){

  var id = makeid(8)
  var marker = L.marker([lat, lon], {
    title: name,
    draggable: false,
    icon: greenIcon} )
  data.lat = lat
  data.lon = lon
  marker.content = ''
  marker.content = makecontent('dem', data)
  marker.on('dblclick', (event)=>{
      alertify.confirm(marker.content).set('title', 'Information').set('onok', null).set('oncancel', null).set('closable',false)});

  var pop = marker.bindTooltip("<b>"+data.name + "</b>")
  return [marker,id]
}

function techmarker(lat, lon, data){

  var id = makeid(8)
  var marker = L.marker([lat, lon], {
    title: name,
    draggable: false,
    icon: blueIcon} )
  data.lat = lat
  data.lon = lon
  marker.content = ''
  marker.content = makecontent('tech', data)
  marker.on('dblclick', (event)=>{
      alertify.confirm(marker.content).set('title', 'Information').set('onok', null).set('oncancel', null).set('closable',false)});

  var pop = marker.bindTooltip("<b>"+data.name + "</b>")
  return [marker,id]
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
    //console.log(err)
    //console.log(route)
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
      path.road.unbindTooltip()
      path.summary.remove();
      path.flag = false
    } else {
      path.road.addTo(map);
      //var pop2 = path.road.bindTooltip('Test').openTooltip()
      //pop2.openPopup()
      path.summary.addTo(map);
      path.flag = true
      //path.removeFrom(map)

    }
  })

  var dist = distcalculator(latlng).toFixed(2)
  data.dist = dist
  var pop = path.bindTooltip(makecontent('flow', data))
  path.on('mouseover', (event)=>{
    pop.openTooltip()
  });
  path.on('mouseout', (event)=>{
    pop.closeTooltip()
  });


  return [path, dist]
}

function initstep2() {
  initgeomap('gfx_holder1');

  supval1 = supmarker(43.1263008, -89.5513992,  {name: "CAFO1", prod: "Waste", amount: 65000, price: -5})
  var supmarker1 = supval1[0]
  var supid1 = supval1[1]
  supmarker1.addTo(mymap)
  nodels.push({marker: supmarker1, nodename: "CAFO1", nodeid: supid1, lat: supmarker1.getLatLng().lat, lon: supmarker1.getLatLng().lng, supdata:{name: "CAFO1", prod: "Waste", amount: 65000, price: -5}})

  supval2 = supmarker(43.2139015, -89.4787979,  {name: "CAFO2", prod: "Waste", amount: 35000, price: -10})
  var supmarker2 = supval2[0]
  var supid2 = supval2[1]
  supmarker2.addTo(mymap)
  nodels.push({marker: supmarker2, nodename: "CAFO2", nodeid: supid2, lat: supmarker2.getLatLng().lat, lon: supmarker2.getLatLng().lng, supdata:{name: "CAFO2", prod: "Waste", amount: 35000, price: -10}})

  supval3 = supmarker(43.2456017, -89.4372025,  {name: "CAFO3", prod: "Waste", amount: 15000, price: -20})
  var supmarker3 = supval3[0]
  var supid3 = supval3[1]
  supmarker3.addTo(mymap)
  nodels.push({marker: supmarker3, nodename: "CAFO3", nodeid: supid3, lat: supmarker3.getLatLng().lat, lon: supmarker3.getLatLng().lng, supdata:{name: "CAFO3", prod: "Waste", amount: 15000, price: -20}})

  ChangeZoom();
}

function initstep3() {
  initgeomap('gfx_holder2');

  supval1 = supmarker(43.1263008, -89.5513992,  {name: "CAFO1", prod: "Waste", amount: 65000, price: -5})
  var supmarker1 = supval1[0]
  var supid1 = supval1[1]
  supmarker1.addTo(mymap)
  nodels.push({marker: supmarker1, nodename: "CAFO1", nodeid: supid1, lat: supmarker1.getLatLng().lat, lon: supmarker1.getLatLng().lng, supdata:{name: "CAFO1", prod: "Waste", amount: 65000, price: -5}})

  supval2 = supmarker(43.2139015, -89.4787979,  {name: "CAFO2", prod: "Waste", amount: 35000, price: -10})
  var supmarker2 = supval2[0]
  var supid2 = supval2[1]
  supmarker2.addTo(mymap)
  nodels.push({marker: supmarker2, nodename: "CAFO2", nodeid: supid2, lat: supmarker2.getLatLng().lat, lon: supmarker2.getLatLng().lng, supdata:{name: "CAFO2", prod: "Waste", amount: 35000, price: -10}})

  supval3 = supmarker(43.2456017, -89.4372025,  {name: "CAFO3", prod: "Waste", amount: 15000, price: -20})
  var supmarker3 = supval3[0]
  var supid3 = supval3[1]
  supmarker3.addTo(mymap)
  nodels.push({marker: supmarker3, nodename: "CAFO3", nodeid: supid3, lat: supmarker3.getLatLng().lat, lon: supmarker3.getLatLng().lng, supdata:{name: "CAFO3", prod: "Waste", amount: 15000, price: -20}})

  techval1 = techmarker(43.172902, -89.503568,  {name: "Technology1", type: "Anaerobic Digestion", capacity: 60000, cost: 6, refprod: 'Waste', unit: 'tonne', src: $('#techpic1').attr('src')})
  var techmarker1 = techval1[0]
  var techid1 = techval1[1]
  techmarker1.addTo(mymap)
  nodels.push({marker: techmarker1, nodename: "Technology1", nodeid: techid1, lat: techmarker1.getLatLng().lat, lon: techmarker1.getLatLng().lng, techdata:{name: "Technology1", type: "Anaerobic Digestion", capacity: 60000, cost: 6, refprod: 'Waste', unit: 'tonne', src: $('#techpic1').attr('src')}})

  techval2 = techmarker(43.192902, -89.403568,  {name: "Technology2", type: "Anaerobic Digestion + Generator", capacity: 60000, cost: 6.1, refprod: 'Waste', unit: 'tonne', src: $('#techpic2').attr('src')})
  var techmarker2 = techval2[0]
  var techid2 = techval2[1]
  techmarker2.addTo(mymap)
  nodels.push({marker: techmarker2, nodename: "Technology2", nodeid: techid2, lat: techmarker2.getLatLng().lat, lon: techmarker2.getLatLng().lng, techdata:{name: "Technology2", type: "Anaerobic Digestion + Generator", capacity: 60000, cost: 6.1, refprod: 'Waste', unit: 'tonne', src: $('#techpic2').attr('src')}})


  ChangeZoom();
}

function initstep4(){
  initgeomap('gfx_holder3');

  supval1 = supmarker(43.1263008, -89.5513992,  {name: "CAFO1", prod: "Waste", amount: 65000, price: -5})
  var supmarker1 = supval1[0]
  var supid1 = supval1[1]
  supmarker1.addTo(mymap)
  nodels.push({marker: supmarker1, nodename: "CAFO1", nodeid: supid1, lat: supmarker1.getLatLng().lat, lon: supmarker1.getLatLng().lng, supdata:{name: "CAFO1", prod: "Waste", amount: 65000, price: -5}})

  supval2 = supmarker(43.2139015, -89.4787979,  {name: "CAFO2", prod: "Waste", amount: 35000, price: -10})
  var supmarker2 = supval2[0]
  var supid2 = supval2[1]
  supmarker2.addTo(mymap)
  nodels.push({marker: supmarker2, nodename: "CAFO2", nodeid: supid2, lat: supmarker2.getLatLng().lat, lon: supmarker2.getLatLng().lng, supdata:{name: "CAFO2", prod: "Waste", amount: 35000, price: -10}})

  supval3 = demmarker(43.2456017, -89.4372025,  {name: "Consumer3", prod: "Electricity", amount: 3000000, price: 1, unit: 'kWh'})
  var supmarker3 = supval3[0]
  var supid3 = supval3[1]
  supmarker3.content = supmarker3.content + '<br/>' + makecontent('sup', {name: "CAFO3", prod: "Waste", amount:15000 , price: -20, lat: supmarker3.getLatLng().lat, lon: supmarker3.getLatLng().lng})
  supmarker3.setIcon(greengoldIcon)
  supmarker3.unbindTooltip()
  supmarker3.bindTooltip("<b>Consumer3</b><br/><b>CAFO3</b>" )
  supmarker3.addTo(mymap)
  nodels.push({marker: supmarker3, nodename: "CAFO3", nodeid: supid3, lat: supmarker3.getLatLng().lat, lon: supmarker3.getLatLng().lng, supdata:{name: "CAFO3", prod: "Waste", amount: 15000, price: -20}, demdata: {name: "Consumer3", prod: "Electricity", amount: 3000000, price: 1, unit: 'kWh'}})

  demval1 = demmarker(43.1205028, -89.5575972,  {name: "Consumer1", prod: "Biogas", amount: 280000, price: 2000, unit: '1000-cft'})
  var demmarker1 = demval1[0]
  var demid1 = demval1[1]
  demmarker1.addTo(mymap)
  nodels.push({marker: demmarker1, nodename: "Consumer1", nodeid: demid1, lat: demmarker1.getLatLng().lat, lon: demmarker1.getLatLng().lng, demdata:{name: "Consumer1", prod: "Biogas", amount: 280000, price: 2000, unit: '1000-cft'}})

  demval2 = demmarker(43.18610, -89.54510,  {name: "Consumer2", prod: "Digestate", amount: 115000, price: 5, unit: 'tonne'})
  var demmarker2 = demval2[0]
  var demid2 = demval2[1]
  demmarker2.content = demmarker2.content + '<br/>' + makecontent('dem', {name: "Consumer2", prod: "Waste", amount: 115000, price: 0, unit: 'tonne', lat: demmarker2.getLatLng().lat, lon: demmarker2.getLatLng().lng})
  demmarker2.addTo(mymap)
  nodels.push({marker: demmarker2, nodename: "Consumer2", nodeid: demid2, lat: demmarker2.getLatLng().lat, lon: demmarker2.getLatLng().lng, demdata:{name: "Consumer2", prod: "Digestate", amount: 115000, price: 5, unit: 'tonne'}})

  techval1 = techmarker(43.172902, -89.503568,  {name: "Technology1", type: "Anaerobic Digestion", capacity: 60000, cost: 6, refprod: 'Waste', unit: 'tonne', src: $('#techpic1').attr('src')})
  var techmarker1 = techval1[0]
  var techid1 = techval1[1]
  techmarker1.addTo(mymap)
  nodels.push({marker: techmarker1, nodename: "Technology1", nodeid: techid1, lat: techmarker1.getLatLng().lat, lon: techmarker1.getLatLng().lng, techdata:{name: "Technology1", type: "Anaerobic Digestion", capacity: 60000, cost: 6, refprod: 'Waste', unit: 'tonne', src: $('#techpic1').attr('src')}})

  techval2 = techmarker(43.192902, -89.403568,  {name: "Technology2", type: "Anaerobic Digestion + Generator", capacity: 60000, cost: 6.1, refprod: 'Waste', unit: 'tonne', src: $('#techpic2').attr('src')})
  var techmarker2 = techval2[0]
  var techid2 = techval2[1]
  techmarker2.addTo(mymap)
  nodels.push({marker: techmarker2, nodename: "Technology2", nodeid: techid2, lat: techmarker2.getLatLng().lat, lon: techmarker2.getLatLng().lng, techdata:{name: "Technology2", type: "Anaerobic Digestion + Generator", capacity: 60000, cost: 6.1, refprod: 'Waste', unit: 'tonne', src: $('#techpic2').attr('src')}})

  ChangeZoom();
}

function initstep5(){
  initgeomap('gfx_holder4');

  supval1 = supmarker(43.1263008, -89.5513992,  {name: "CAFO1", prod: "Waste", amount: 65000, price: -5})
  var supmarker1 = supval1[0]
  var supid1 = supval1[1]
  supmarker1.addTo(mymap)
  nodels.push({marker: supmarker1, nodename: "CAFO1", nodeid: supid1, lat: supmarker1.getLatLng().lat, lon: supmarker1.getLatLng().lng, supdata:{name: "CAFO1", prod: "Waste", amount: 65000, price: -5}})

  supval2 = supmarker(43.2139015, -89.4787979,  {name: "CAFO2", prod: "Waste", amount: 35000, price: -10})
  var supmarker2 = supval2[0]
  var supid2 = supval2[1]
  supmarker2.addTo(mymap)
  nodels.push({marker: supmarker2, nodename: "CAFO2", nodeid: supid2, lat: supmarker2.getLatLng().lat, lon: supmarker2.getLatLng().lng, supdata:{name: "CAFO2", prod: "Waste", amount: 35000, price: -10}})

  supval3 = demmarker(43.2456017, -89.4372025,  {name: "Consumer3", prod: "Electricity", amount: 3000000, price: 1, unit: 'kWh'})
  var supmarker3 = supval3[0]
  var supid3 = supval3[1]
  supmarker3.content = supmarker3.content + '<br/>' + makecontent('sup', {name: "CAFO3", prod: "Waste", amount:15000 , price: -20, lat: supmarker3.getLatLng().lat, lon: supmarker3.getLatLng().lng})
  supmarker3.setIcon(greengoldIcon)
  supmarker3.unbindTooltip()
  supmarker3.bindTooltip("<b>Consumer3</b><br/><b>CAFO3</b>" )
  supmarker3.addTo(mymap)
  nodels.push({marker: supmarker3, nodename: "CAFO3", nodeid: supid3, lat: supmarker3.getLatLng().lat, lon: supmarker3.getLatLng().lng, supdata:{name: "CAFO3", prod: "Waste", amount: 15000, price: -20}, demdata: {name: "Consumer3", prod: "Electricity", amount: 3000000, price: 1, unit: 'kWh'}})

  demval1 = demmarker(43.1205028, -89.5575972,  {name: "Consumer1", prod: "Biogas", amount: 280000, price: 2000, unit: '1000-cft'})
  var demmarker1 = demval1[0]
  var demid1 = demval1[1]
  demmarker1.addTo(mymap)
  nodels.push({marker: demmarker1, nodename: "Consumer1", nodeid: demid1, lat: demmarker1.getLatLng().lat, lon: demmarker1.getLatLng().lng, demdata:{name: "Consumer1", prod: "Biogas", amount: 280000, price: 2000, unit: '1000-cft'}})

  demval2 = demmarker(43.18610, -89.54510,  {name: "Consumer2", prod: "Digestate", amount: 115000, price: 5, unit: 'tonne'})
  var demmarker2 = demval2[0]
  var demid2 = demval2[1]
  demmarker2.content = demmarker2.content + '<br/>' + makecontent('dem', {name: "Consumer2", prod: "Waste", amount: 115000, price: 0, unit: 'tonne', lat: demmarker2.getLatLng().lat, lon: demmarker2.getLatLng().lng})
  demmarker2.addTo(mymap)
  nodels.push({marker: demmarker2, nodename: "Consumer2", nodeid: demid2, lat: demmarker2.getLatLng().lat, lon: demmarker2.getLatLng().lng, demdata:{name: "Consumer2", prod: "Digestate", amount: 115000, price: 5, unit: 'tonne'}})

  techval1 = techmarker(43.172902, -89.503568,  {name: "Technology1", type: "Anaerobic Digestion", capacity: 60000, cost: 6, refprod: 'Waste', unit: 'tonne', src: $('#techpic1').attr('src')})
  var techmarker1 = techval1[0]
  var techid1 = techval1[1]
  techmarker1.addTo(mymap)
  nodels.push({marker: techmarker1, nodename: "Technology1", nodeid: techid1, lat: techmarker1.getLatLng().lat, lon: techmarker1.getLatLng().lng, techdata:{name: "Technology1", type: "Anaerobic Digestion", capacity: 60000, cost: 6, refprod: 'Waste', unit: 'tonne', src: $('#techpic1').attr('src')}})

  techval2 = techmarker(43.192902, -89.403568,  {name: "Technology2", type: "Anaerobic Digestion + Generator", capacity: 60000, cost: 6.1, refprod: 'Waste', unit: 'tonne', src: $('#techpic2').attr('src')})
  var techmarker2 = techval2[0]
  var techid2 = techval2[1]
  techmarker2.addTo(mymap)
  nodels.push({marker: techmarker2, nodename: "Technology2", nodeid: techid2, lat: techmarker2.getLatLng().lat, lon: techmarker2.getLatLng().lng, techdata:{name: "Technology2", type: "Anaerobic Digestion + Generator", capacity: 60000, cost: 6.1, refprod: 'Waste', unit: 'tonne', src: $('#techpic2').attr('src')}})

  ChangeZoom();

  // Add transportation routes

  var value = newpath([[supmarker1.getLatLng().lat, supmarker1.getLatLng().lng],[demmarker2.getLatLng().lat, demmarker2.getLatLng().lng]], {prod: "Waste", cost: '3', unit: 'tonne', color: 'black'})
  var path = value[0]
  path.addTo(mymap)
  var arrowHead = L.polylineDecorator(path, {
      patterns: [
        {offset: '60%', repeat: 0, symbol: L.Symbol.arrowHead({pixelSize: 6, polygon: false, pathOptions: {color: 'black', stroke: true}})}]
      }).addTo(mymap);

  var value = newpath([[supmarker1.getLatLng().lat, supmarker1.getLatLng().lng],[techmarker1.getLatLng().lat, techmarker1.getLatLng().lng]], {prod: "Waste", cost: '3', unit: 'tonne', color: 'black'})
  var path = value[0]
  path.addTo(mymap)
  var arrowHead = L.polylineDecorator(path, {
      patterns: [
        {offset: '60%', repeat: 0, symbol: L.Symbol.arrowHead({pixelSize: 6, polygon: false, pathOptions: {color: 'black', stroke: true}})}]
      }).addTo(mymap);

  var value = newpath([[supmarker1.getLatLng().lat, supmarker1.getLatLng().lng],[techmarker2.getLatLng().lat, techmarker2.getLatLng().lng]], {prod: "Waste", cost: '3', unit: 'tonne', color: 'black'})
  var path = value[0]
  path.addTo(mymap)
  var arrowHead = L.polylineDecorator(path, {
      patterns: [
        {offset: '60%', repeat: 0, symbol: L.Symbol.arrowHead({pixelSize: 6, polygon: false, pathOptions: {color: 'black', stroke: true}})}]
      }).addTo(mymap);

  var value = newpath([[supmarker2.getLatLng().lat, supmarker2.getLatLng().lng],[demmarker2.getLatLng().lat, demmarker2.getLatLng().lng]], {prod: "Waste", cost: '3', unit: 'tonne', color: 'black'})
  var path = value[0]
  path.addTo(mymap)
  var arrowHead = L.polylineDecorator(path, {
      patterns: [
        {offset: '60%', repeat: 0, symbol: L.Symbol.arrowHead({pixelSize: 6, polygon: false, pathOptions: {color: 'black', stroke: true}})}]
      }).addTo(mymap);

  var value = newpath([[supmarker2.getLatLng().lat, supmarker2.getLatLng().lng],[techmarker1.getLatLng().lat, techmarker1.getLatLng().lng]], {prod: "Waste", cost: '3', unit: 'tonne', color: 'black'})
  var path = value[0]
  path.addTo(mymap)
  var arrowHead = L.polylineDecorator(path, {
      patterns: [
        {offset: '60%', repeat: 0, symbol: L.Symbol.arrowHead({pixelSize: 6, polygon: false, pathOptions: {color: 'black', stroke: true}})}]
      }).addTo(mymap);

  var value = newpath([[supmarker2.getLatLng().lat, supmarker2.getLatLng().lng],[techmarker2.getLatLng().lat, techmarker2.getLatLng().lng]], {prod: "Waste", cost: '3', unit: 'tonne', color: 'black'})
  var path = value[0]
  path.addTo(mymap)
  var arrowHead = L.polylineDecorator(path, {
      patterns: [
        {offset: '60%', repeat: 0, symbol: L.Symbol.arrowHead({pixelSize: 6, polygon: false, pathOptions: {color: 'black', stroke: true}})}]
      }).addTo(mymap);

  var value = newpath([[supmarker3.getLatLng().lat, supmarker3.getLatLng().lng],[demmarker2.getLatLng().lat, demmarker2.getLatLng().lng]], {prod: "Waste", cost: '3', unit: 'tonne', color: 'black'})
  var path = value[0]
  path.addTo(mymap)
  var arrowHead = L.polylineDecorator(path, {
      patterns: [
        {offset: '60%', repeat: 0, symbol: L.Symbol.arrowHead({pixelSize: 6, polygon: false, pathOptions: {color: 'black', stroke: true}})}]
      }).addTo(mymap);

  var value = newpath([[supmarker3.getLatLng().lat, supmarker3.getLatLng().lng],[techmarker1.getLatLng().lat, techmarker1.getLatLng().lng]], {prod: "Waste", cost: '3', unit: 'tonne', color: 'black'})
  var path = value[0]
  path.addTo(mymap)
  var arrowHead = L.polylineDecorator(path, {
      patterns: [
        {offset: '60%', repeat: 0, symbol: L.Symbol.arrowHead({pixelSize: 6, polygon: false, pathOptions: {color: 'black', stroke: true}})}]
      }).addTo(mymap);

  var value = newpath([[supmarker3.getLatLng().lat, supmarker3.getLatLng().lng],[techmarker2.getLatLng().lat, techmarker2.getLatLng().lng]], {prod: "Waste", cost: '3', unit: 'tonne', color: 'black'})
  var path = value[0]
  path.addTo(mymap)
  var arrowHead = L.polylineDecorator(path, {
      patterns: [
        {offset: '60%', repeat: 0, symbol: L.Symbol.arrowHead({pixelSize: 6, polygon: false, pathOptions: {color: 'black', stroke: true}})}]
      }).addTo(mymap);



  mymap2 = L.map('gfx_holder5').setView(mymap.getCenter(), mymap.getZoom());
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
    categories = ['Waste','Biogas','Digestate', 'Electricity'];
    color = ['black','green', 'blue', 'orange']

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


    supval1 = supmarker(43.1263008, -89.5513992,  {name: "CAFO1", prod: "Waste", amount: 65000, price: -5})
    var supmarker11 = supval1[0]
    var supid11 = supval1[1]
    supmarker11.addTo(mymap2)

    supval2 = supmarker(43.2139015, -89.4787979,  {name: "CAFO2", prod: "Waste", amount: 35000, price: -10})
    var supmarker22 = supval2[0]
    var supid22 = supval2[1]
    supmarker22.addTo(mymap2)

    supval3 = demmarker(43.2456017, -89.4372025,  {name: "Consumer3", prod: "Electricity", amount: 3000000, price: 1, unit: 'kWh'})
    var supmarker33 = supval3[0]
    var supid33 = supval3[1]
    supmarker33.content = supmarker33.content + '<br/>' + makecontent('sup', {name: "CAFO3", prod: "Waste", amount:15000 , price: -20, lat: supmarker33.getLatLng().lat, lon: supmarker33.getLatLng().lng})
    supmarker33.setIcon(greengoldIcon)
    supmarker33.unbindTooltip()
    supmarker33.bindTooltip("<b>Consumer3</b><br/><b>CAFO3</b>" )
    supmarker33.addTo(mymap2)

    demval1 = demmarker(43.1205028, -89.5575972,  {name: "Consumer1", prod: "Biogas", amount: 280000, price: 2000, unit: '1000-cft'})
    var demmarker11 = demval1[0]
    var demid11 = demval1[1]
    demmarker11.addTo(mymap2)

    demval2 = demmarker(43.18610, -89.54510,  {name: "Consumer2", prod: "Digestate", amount: 115000, price: 5, unit: 'tonne'})
    var demmarker22 = demval2[0]
    var demid22 = demval2[1]
    demmarker22.content = demmarker22.content + '<br/>' + makecontent('dem', {name: "Consumer2", prod: "Waste", amount: 115000, price: 0, unit: 'tonne', lat: demmarker22.getLatLng().lat, lon: demmarker22.getLatLng().lng})
    demmarker22.addTo(mymap2)

    techval1 = techmarker(43.172902, -89.503568,  {name: "Technology1", type: "Anaerobic Digestion", capacity: 60000, cost: 6, refprod: 'Waste', unit: 'tonne', src: $('#techpic1').attr('src')})
    var techmarker11 = techval1[0]
    var techid11 = techval1[1]
    techmarker11.addTo(mymap2)

    techval2 = techmarker(43.192902, -89.403568,  {name: "Technology2", type: "Anaerobic Digestion + Generator", capacity: 60000, cost: 6.1, refprod: 'Waste', unit: 'tonne', src: $('#techpic2').attr('src')})
    var techmarker22 = techval2[0]
    var techid22 = techval2[1]
    techmarker22.addTo(mymap2)

    // Add transportation routes

    var value = newpath([[techmarker11.getLatLng().lat, techmarker11.getLatLng().lng],[demmarker11.getLatLng().lat, demmarker11.getLatLng().lng]], {prod: "Biogas", cost: '0.1', unit: 'ctf', color: 'green'}, map = mymap2)
    var path = value[0]
    path.addTo(mymap2)
    var arrowHead = L.polylineDecorator(path, {
        patterns: [
          {offset: '60%', repeat: 0, symbol: L.Symbol.arrowHead({pixelSize: 6, polygon: false, pathOptions: {color: 'green', stroke: true}})}]
        }).addTo(mymap2);

    var value = newpath([[techmarker11.getLatLng().lat, techmarker11.getLatLng().lng],[demmarker22.getLatLng().lat, demmarker22.getLatLng().lng]], {prod: "Digestate", cost: '3', unit: 'tonne', color: 'blue'}, map = mymap2)
    var path = value[0]
    path.addTo(mymap2)
    var arrowHead = L.polylineDecorator(path, {
        patterns: [
          {offset: '60%', repeat: 0, symbol: L.Symbol.arrowHead({pixelSize: 6, polygon: false, pathOptions: {color: 'blue', stroke: true}})}]
        }).addTo(mymap2);

    var value = newpath([[techmarker22.getLatLng().lat, techmarker22.getLatLng().lng],[demmarker22.getLatLng().lat, demmarker22.getLatLng().lng]], {prod: "Digestate", cost: '3', unit: 'tonne', color: 'blue'}, map = mymap2)
    var path = value[0]
    path.addTo(mymap2)
    var arrowHead = L.polylineDecorator(path, {
        patterns: [
          {offset: '60%', repeat: 0, symbol: L.Symbol.arrowHead({pixelSize: 6, polygon: false, pathOptions: {color: 'blue', stroke: true}})}]
        }).addTo(mymap2);

    var value = newpath([[techmarker22.getLatLng().lat, techmarker22.getLatLng().lng],[supmarker33.getLatLng().lat, supmarker33.getLatLng().lng]], {prod: "Electricity", cost: '0', unit: 'kWh', color: 'orange'}, map = mymap2)
    var path = value[0]
    path.addTo(mymap2)
    var arrowHead = L.polylineDecorator(path, {
        patterns: [
          {offset: '60%', repeat: 0, symbol: L.Symbol.arrowHead({pixelSize: 6, polygon: false, pathOptions: {color: 'orange', stroke: true}})}]
        }).addTo(mymap2);

    ChangeZoom2();
}


function initstep6(){
  initgeomap('gfx_holder6');

  supval1 = supmarker(43.1263008, -89.5513992,  {name: "CAFO1", prod: "Waste", amount: 65000, price: -5})
  var supmarker1 = supval1[0]
  var supid1 = supval1[1]
  supmarker1.addTo(mymap)
  nodels.push({marker: supmarker1, nodename: "CAFO1", nodeid: supid1, lat: supmarker1.getLatLng().lat, lon: supmarker1.getLatLng().lng, supdata:{name: "CAFO1", prod: "Waste", amount: 65000, price: -5}})

  supval2 = supmarker(43.2139015, -89.4787979,  {name: "CAFO2", prod: "Waste", amount: 35000, price: -10})
  var supmarker2 = supval2[0]
  var supid2 = supval2[1]
  supmarker2.addTo(mymap)
  nodels.push({marker: supmarker2, nodename: "CAFO2", nodeid: supid2, lat: supmarker2.getLatLng().lat, lon: supmarker2.getLatLng().lng, supdata:{name: "CAFO2", prod: "Waste", amount: 35000, price: -10}})

  supval3 = demmarker(43.2456017, -89.4372025,  {name: "Consumer3", prod: "Electricity", amount: 3000000, price: 1, unit: 'kWh'})
  var supmarker3 = supval3[0]
  var supid3 = supval3[1]
  supmarker3.content = supmarker3.content + '<br/>' + makecontent('sup', {name: "CAFO3", prod: "Waste", amount:15000 , price: -20, lat: supmarker3.getLatLng().lat, lon: supmarker3.getLatLng().lng})
  supmarker3.setIcon(greengoldIcon)
  supmarker3.unbindTooltip()
  supmarker3.bindTooltip("<b>Consumer3</b><br/><b>CAFO3</b>" )
  supmarker3.addTo(mymap)
  nodels.push({marker: supmarker3, nodename: "CAFO3", nodeid: supid3, lat: supmarker3.getLatLng().lat, lon: supmarker3.getLatLng().lng, supdata:{name: "CAFO3", prod: "Waste", amount: 15000, price: -20}, demdata: {name: "Consumer3", prod: "Electricity", amount: 3000000, price: 1, unit: 'kWh'}})


  demval1 = demmarker(43.1205028, -89.5575972,  {name: "Consumer1", prod: "Biogas", amount: 280000, price: 2000, unit: '1000-cft'})
  var demmarker1 = demval1[0]
  var demid1 = demval1[1]
  demmarker1.addTo(mymap)
  nodels.push({marker: demmarker1, nodename: "Consumer1", nodeid: demid1, lat: demmarker1.getLatLng().lat, lon: demmarker1.getLatLng().lng, demdata:{name: "Consumer1", prod: "Biogas", amount: 280000, price: 2000, unit: '1000-cft'}})

  demval2 = demmarker(43.18610, -89.54510,  {name: "Consumer2", prod: "Digestate", amount: 115000, price: 5, unit: 'tonne'})
  var demmarker2 = demval2[0]
  var demid2 = demval2[1]
  demmarker2.content = demmarker2.content + '<br/>' + makecontent('dem', {name: "Consumer2", prod: "Waste", amount: 115000, price: 0, unit: 'tonne', lat: demmarker2.getLatLng().lat, lon: demmarker2.getLatLng().lng})
  demmarker2.addTo(mymap)
  nodels.push({marker: demmarker2, nodename: "Consumer2", nodeid: demid2, lat: demmarker2.getLatLng().lat, lon: demmarker2.getLatLng().lng, demdata:{name: "Consumer2", prod: "Digestate", amount: 115000, price: 5, unit: 'tonne'}})

  techval1 = techmarker(43.172902, -89.503568,  {name: "Technology1", type: "Anaerobic Digestion", capacity: 60000, cost: 6, refprod: 'Waste', unit: 'tonne', src: $('#techpic1').attr('src')})
  var techmarker1 = techval1[0]
  var techid1 = techval1[1]
  techmarker1.addTo(mymap)
  nodels.push({marker: techmarker1, nodename: "Technology1", nodeid: techid1, lat: techmarker1.getLatLng().lat, lon: techmarker1.getLatLng().lng, techdata:{name: "Technology1", type: "Anaerobic Digestion", capacity: 60000, cost: 6, refprod: 'Waste', unit: 'tonne', src: $('#techpic1').attr('src')}})

  techval2 = techmarker(43.192902, -89.403568,  {name: "Technology2", type: "Anaerobic Digestion + Generator", capacity: 60000, cost: 6.1, refprod: 'Waste', unit: 'tonne', src: $('#techpic2').attr('src')})
  var techmarker2 = techval2[0]
  var techid2 = techval2[1]
  techmarker2.addTo(mymap)
  nodels.push({marker: techmarker2, nodename: "Technology2", nodeid: techid2, lat: techmarker2.getLatLng().lat, lon: techmarker2.getLatLng().lng, techdata:{name: "Technology2", type: "Anaerobic Digestion + Generator", capacity: 60000, cost: 6.1, refprod: 'Waste', unit: 'tonne', src: $('#techpic2').attr('src')}})

  // Add transportation routes

  var value = newpath([[supmarker1.getLatLng().lat, supmarker1.getLatLng().lng],[techmarker1.getLatLng().lat, techmarker1.getLatLng().lng]], {prod: "Waste", cost: '3', unit: 'tonne', color: 'black', flow: 45294.12})
  var path = value[0]
  path.addTo(mymap)
  var arrowHead = L.polylineDecorator(path, {
      patterns: [
        {offset: '60%', repeat: 0, symbol: L.Symbol.arrowHead({pixelSize: 6, polygon: false, pathOptions: {color: 'black', stroke: true}})}]
      }).addTo(mymap);

  var value = newpath([[supmarker2.getLatLng().lat, supmarker2.getLatLng().lng],[techmarker1.getLatLng().lat, techmarker1.getLatLng().lng]], {prod: "Waste", cost: '3', unit: 'tonne', color: 'black', flow: 14705.88})
  var path = value[0]
  path.addTo(mymap)
  var arrowHead = L.polylineDecorator(path, {
      patterns: [
        {offset: '60%', repeat: 0, symbol: L.Symbol.arrowHead({pixelSize: 6, polygon: false, pathOptions: {color: 'black', stroke: true}})}]
      }).addTo(mymap);

  var value = newpath([[supmarker2.getLatLng().lat, supmarker2.getLatLng().lng],[techmarker2.getLatLng().lat, techmarker2.getLatLng().lng]], {prod: "Waste", cost: '3', unit: 'tonne', color: 'black', flow: 20294.12})
  var path = value[0]
  path.addTo(mymap)
  var arrowHead = L.polylineDecorator(path, {
      patterns: [
        {offset: '60%', repeat: 0, symbol: L.Symbol.arrowHead({pixelSize: 6, polygon: false, pathOptions: {color: 'black', stroke: true}})}]
      }).addTo(mymap);

  var value = newpath([[supmarker3.getLatLng().lat, supmarker3.getLatLng().lng],[techmarker2.getLatLng().lat, techmarker2.getLatLng().lng]], {prod: "Waste", cost: '3', unit: 'tonne', color: 'black', flow: 15000})
  var path = value[0]
  path.addTo(mymap)
  var arrowHead = L.polylineDecorator(path, {
      patterns: [
        {offset: '60%', repeat: 0, symbol: L.Symbol.arrowHead({pixelSize: 6, polygon: false, pathOptions: {color: 'black', stroke: true}})}]
      }).addTo(mymap);

      ChangeZoom();


      mymap2 = L.map('gfx_holder7').setView(mymap.getCenter(), mymap.getZoom());
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
        categories = ['Waste','Biogas','Digestate', 'Electricity'];
        color = ['black','green', 'blue', 'orange']

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

        supval1 = supmarker(43.1263008, -89.5513992,  {name: "CAFO1", prod: "Waste", amount: 65000, price: -5})
        var supmarker11 = supval1[0]
        var supid11 = supval1[1]
        supmarker11.addTo(mymap2)

        supval2 = supmarker(43.2139015, -89.4787979,  {name: "CAFO2", prod: "Waste", amount: 35000, price: -10})
        var supmarker22 = supval2[0]
        var supid22 = supval2[1]
        supmarker22.addTo(mymap2)

        supval3 = demmarker(43.2456017, -89.4372025,  {name: "Consumer3", prod: "Electricity", amount: 3000000, price: 1, unit: 'kWh'})
        var supmarker33 = supval3[0]
        var supid33 = supval3[1]
        supmarker33.content = supmarker33.content + '<br/>' + makecontent('sup', {name: "CAFO3", prod: "Waste", amount:15000 , price: -20, lat: supmarker33.getLatLng().lat, lon: supmarker33.getLatLng().lng})
        supmarker33.setIcon(greengoldIcon)
        supmarker33.unbindTooltip()
        supmarker33.bindTooltip("<b>Consumer3</b><br/><b>CAFO3</b>" )
        supmarker33.addTo(mymap2)


        demval1 = demmarker(43.1205028, -89.5575972,  {name: "Consumer1", prod: "Biogas", amount: 280000, price: 2000, unit: '1000-cft'})
        var demmarker11 = demval1[0]
        var demid11 = demval1[1]
        demmarker11.addTo(mymap2)

        demval2 = demmarker(43.18610, -89.54510,  {name: "Consumer2", prod: "Digestate", amount: 115000, price: 5, unit: 'tonne'})
        var demmarker22 = demval2[0]
        var demid22 = demval2[1]
        demmarker22.content = demmarker22.content + '<br/>' + makecontent('dem', {name: "Consumer2", prod: "Waste", amount: 115000, price: 0, unit: 'tonne', lat: demmarker22.getLatLng().lat, lon: demmarker22.getLatLng().lng})
        demmarker22.addTo(mymap2)

        techval1 = techmarker(43.172902, -89.503568,  {name: "Technology1", type: "Anaerobic Digestion", capacity: 60000, cost: 6, refprod: 'Waste', unit: 'tonne', src: $('#techpic1').attr('src')})
        var techmarker11 = techval1[0]
        var techid11 = techval1[1]
        techmarker11.addTo(mymap2)

        techval2 = techmarker(43.192902, -89.403568,  {name: "Technology2", type: "Anaerobic Digestion + Generator", capacity: 60000, cost: 6.1, refprod: 'Waste', unit: 'tonne', src: $('#techpic2').attr('src')})
        var techmarker22 = techval2[0]
        var techid22 = techval2[1]
        techmarker22.addTo(mymap2)

  var value = newpath([[techmarker11.getLatLng().lat, techmarker11.getLatLng().lng],[demmarker11.getLatLng().lat, demmarker11.getLatLng().lng]], {prod: "Biogas", cost: '0.1', unit: '1000-cft', color: 'green', flow: 90000}, map = mymap2)
  var path = value[0]
  path.addTo(mymap2)
  var arrowHead = L.polylineDecorator(path, {
      patterns: [
        {offset: '60%', repeat: 0, symbol: L.Symbol.arrowHead({pixelSize: 6, polygon: false, pathOptions: {color: 'green', stroke: true}})}]
      }).addTo(mymap2);

  var value = newpath([[techmarker11.getLatLng().lat, techmarker11.getLatLng().lng],[demmarker22.getLatLng().lat, demmarker22.getLatLng().lng]], {prod: "Digestate", cost: '3', unit: 'tonne', color: 'blue', flow: 57000}, map = mymap2)
  var path = value[0]
  path.addTo(mymap2)
  var arrowHead = L.polylineDecorator(path, {
      patterns: [
        {offset: '60%', repeat: 0, symbol: L.Symbol.arrowHead({pixelSize: 6, polygon: false, pathOptions: {color: 'blue', stroke: true}})}]
      }).addTo(mymap2);

  var value = newpath([[techmarker22.getLatLng().lat, techmarker22.getLatLng().lng],[demmarker22.getLatLng().lat, demmarker22.getLatLng().lng]], {prod: "Digestate", cost: '3', unit: 'tonne', color: 'blue', flow: 33529.41176}, map = mymap2)
  var path = value[0]
  path.addTo(mymap2)
  var arrowHead = L.polylineDecorator(path, {
      patterns: [
        {offset: '60%', repeat: 0, symbol: L.Symbol.arrowHead({pixelSize: 6, polygon: false, pathOptions: {color: 'blue', stroke: true}})}]
      }).addTo(mymap2);

  var value = newpath([[techmarker22.getLatLng().lat, techmarker22.getLatLng().lng],[supmarker33.getLatLng().lat, supmarker33.getLatLng().lng]], {prod: "Electricity", cost: '0', unit: 'kWh', color: 'orange', flow: 3000000}, map = mymap2)
  var path = value[0]
  path.addTo(mymap2)
  var arrowHead = L.polylineDecorator(path, {
      patterns: [
        {offset: '60%', repeat: 0, symbol: L.Symbol.arrowHead({pixelSize: 6, polygon: false, pathOptions: {color: 'orange', stroke: true}})}]
      }).addTo(mymap2);

  ChangeZoom2();
}
