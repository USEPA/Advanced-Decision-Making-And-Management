nodels = []
supls = []
demls = []
techls = []
candls = []

step3 = false
step4 = false
step5 = false
step6 = false

function ChangeZoom(){
 if (nodels.length >= 2) {
   var latlonls = []
   for (var i = 0; i < nodels.length; i++) {
     latlonls.push([nodels[i].data.lat, nodels[i].data.lon])
   }
   mymap.fitBounds(latlonls)
  }
}

function ChangeZoom2(){
 if (nodels.length >= 2) {
   var latlonls = []
   for (var i = 0; i < nodels.length; i++) {
     latlonls.push([nodels[i].data.lat, nodels[i].data.lon+0.02])
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
}


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

function makeid(length) {
   var result           = '';
   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}

function findNodeIndex(ls, id){
  for (var i = 0; i < ls.length; i++){
    if (ls[i].data.id == id){
      return i
    }
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

function initstep3() {

    try {mymap.remove()}
    catch {}

    initgeomap('gfx_holder1');

    if (supls.length > 0){
      supls = [] }

      supmarker1 = supmarker(43.1263008, -89.5513992,  {name: "CAFO1", prod: "Waste", amount: 65000, price: -5})
      supmarker1.addTo(mymap)
      nodels.push(supmarker1)
      supls.push(supmarker1)

      supmarker2 = supmarker(43.2139015, -89.4787979,  {name: "CAFO2", prod: "Waste", amount: 35000, price: -10})
      supmarker2.addTo(mymap)
      nodels.push(supmarker2)
      supls.push(supmarker2)

      supmarker3 = supmarker(43.2456017, -89.4372025,  {name: "CAFO3", prod: "Waste", amount: 15000, price: -20})
      supmarker3.addTo(mymap)
      nodels.push(supmarker3)
      supls.push(supmarker3)

    ChangeZoom();
    step3 = true

}

function initstep4() {
  try {mymap.remove()}
  catch {}
  initgeomap('gfx_holder2');
  if (step3) {
    for (var i = 0; i < supls.length; i++){
      var copy = supmarker(supls[i].data.lat, supls[i].data.lon,  {name: supls[i].data.name, prod: supls[i].data.prod, amount: supls[i].data.amount, price: supls[i].data.price}, draggable = false)
      copy.changable = false
      copy.data.amount = copy.data.amount + '" readonly = "readonly'
      copy.data.price = copy.data.price + '" readonly = "readonly'
      copy.addTo(mymap)
    }

    if (techls.length > 0) {
      techls = [] }

      techmarker1 = techmarker(43.172902, -89.503568,  {name: "Technology1", type: "Anaerobic Digestion", capacity: 60000, cost: 6, refprod: 'Waste', unit: 'tonne', src: $('#techpic1').attr('src')})
      techmarker1.addTo(mymap)
      nodels.push(techmarker1)
      techls.push(techmarker1)

      techmarker2 = techmarker(43.192902, -89.403568,  {name: "Technology2", type: "Anaerobic Digestion + Generator", capacity: 60000, cost: 6.1, refprod: 'Waste', unit: 'tonne', src: $('#techpic2').attr('src')})
      techmarker2.addTo(mymap)
      nodels.push(techmarker2)
      techls.push(techmarker2)


    if (candls.length > 0) {
      candls = [] }

      candmarker1 = candmarker(43.154104, -89.452053,  {name: "Tech Candidate", type: "Anaerobic Digestion + Biomethane", refprod: 'Waste', unit: 'tonne', src: $('#techpic3').attr('src')})
      candmarker1.addTo(mymap)
      nodels.push(candmarker1)
      candls.push(candmarker1)

    ChangeZoom();
    step4 = true
  }
}

function initstep5() {
  try {mymap.remove()}
  catch {}
  initgeomap('gfx_holder3')
  if (step3 && step4) {

    for (var i = 0; i < techls.length; i++){
      var copy = techmarker(techls[i].data.lat, techls[i].data.lon,  {name: techls[i].data.name, refprod: techls[i].data.refprod, type: techls[i].data.type, cost: techls[i].data.cost, capacity: techls[i].data.capacity, unit: techls[i].data.unit,src: techls[i].data.src}, draggable = false)
      copy.changable = false
      copy.data.capacity = copy.data.capacity + '" readonly = "readonly'
      copy.addTo(mymap)
    }

    for (var i = 0; i < candls.length; i++){
      var copy = candmarker(candls[i].data.lat, candls[i].data.lon,  {name: candls[i].data.name, type: candls[i].data.type, src: candls[i].data.src}, draggable = false)
      copy.changable = false
      copy.addTo(mymap)
    }

    for (var i = 0; i < supls.length-1; i++){
      var copy = supmarker(supls[i].data.lat, supls[i].data.lon,  {name: supls[i].data.name, prod: supls[i].data.prod, amount: supls[i].data.amount, price: supls[i].data.price}, draggable = false)
      copy.changable = false
      copy.data.amount = copy.data.amount + '" readonly = "readonly'
      copy.data.price = copy.data.price + '" readonly = "readonly'
      copy.addTo(mymap)
    }

    if (demls.length > 0) {
      demls = []
    }

    demmarker1 = demmarker(43.1205028, -89.5575972,  {name: "Consumer1", prod: "Biogas", amount: 280000, price: 2000, unit: '1000-cft'})
    demmarker1.addTo(mymap)
    nodels.push(demmarker1)
    demls.push(demmarker1)

    demmarker2 = demmarker(43.18610, -89.54510,  {name: "Consumer2", prod: "Digestate", amount: 115000, price: 5, unit: 'tonne', prod2: "Waste", amount2: 115000, price2: 0, unit2: 'tonne'})

    demmarker2.on('dblclick', (event)=>{
        demmarker2.content = ''
        demmarker2.content = makecontent('dem', demmarker2.data)
        demmarker2.content = demmarker2.content + '<br/><div class="form-group"> <label>Product: </label> <input class="form-control" type="text" value = ' + demmarker2.data.prod2 +' readonly="readonly" /> </div><div class="form-group"> <label>Capacity ('+ demmarker2.data.unit2+' per year): </label> <input class="form-control" type="number" id = "demcap2" value = "' + demmarker2.data.amount2 +'"/> </div><div class="form-group"> <label>Price (USD per '+ demmarker2.data.unit2+'): </label> <input class="form-control" type="number" id = "demprice2" value = "' + demmarker2.data.price2 + '"/></div>'
        alertify.confirm(demmarker2.content).set('title', 'Information').set('onok', function(closeEvent) {
          if (demmarker2.changable) {
            var i = findNodeIndex(demls, demmarker2.data.id)
            demmarker2.data.amount = $('#demcap').val()
            demmarker2.data.price = $('#demprice').val()
            demmarker2.data.amount2 = $('#demcap2').val()
            demmarker2.data.price2 = $('#demprice2').val()
            demls[i].data = demmarker2.data
          }
          alertify.confirm().destroy()
        }).set('oncancel',function(closeEvent) {
          alertify.confirm().destroy()
        }).set('closable',false)});

    demmarker2.addTo(mymap)
    nodels.push(demmarker2)
    demls.push(demmarker2)

    //好难啊！！！！！
    var i = supls.length - 1
    supmarker3 = supmarker(supls[i].data.lat, supls[i].data.lon,  {name: supls[i].data.name, prod: supls[i].data.prod, amount: supls[i].data.amount, price: supls[i].data.price, prod2: "Electricity", amount2: 3000000, price2: 1, unit2: 'kWh'}, draggable = false)
    supmarker3.setIcon(greengoldIcon)
    supmarker3.data.amount = supmarker3.data.amount + '" readonly = "readonly'
    supmarker3.data.price = supmarker3.data.price + '" readonly = "readonly'
    supmarker3.unbindTooltip()
    supmarker3.bindTooltip("<b>CAFO3</b><br/><b>Consumer3</b>" )

    supmarker3.on('dblclick', (event)=>{
        supmarker3.content = '<h6> <strong>Consumer Informtion </strong></h6> <p> Location: </p> <p>Latitude:' + (supmarker3.getLatLng().lat).toFixed(7) +'&nbsp;&nbsp;  Longitude: ' + (supmarker3.getLatLng().lng).toFixed(7) +'</p> <div class="form-group"> <label> Product: </label> <input class="form-control" type="text" value = ' + supmarker3.data.prod2 +' readonly="readonly" /> </div><div class="form-group"> <label> Capacity ('+ supmarker3.data.unit2+' per year): </label> <input class="form-control" type="number" id = "demcap2" value = "' + supmarker3.data.amount2 +'"/> </div> <div class="form-group"> <label> Demand Price (USD per '+ supmarker3.data.unit2+'): </label> <input class="form-control" type="number" id = "demprice2" value = "' + supmarker3.data.price2 + '"/> </div>' + makecontent('sup', supmarker3.data)
        alertify.confirm(supmarker3.content).set('title', 'Information').set('onok', function(closeEvent) {
          if (supmarker3.changable) {
            var i = findNodeIndex(demls, supmarker3.data.id)
            supmarker3.data.amount2 = $('#demcap2').val()
            supmarker3.data.price2 = $('#demprice2').val()
            demls[i].data = supmarker3.data
          }
          alertify.confirm().destroy()
        }).set('oncancel',function(closeEvent) {
          alertify.confirm().destroy()
        }).set('closable',false)});

    supmarker3.addTo(mymap)
    demls.push(supmarker3)

    demmarker4 = demmarker(43.1931626, -89.4594898,  {name: "Consumer4", prod: "Biomethane", amount: 30000, price: 3000, unit: 'gal'})
    demmarker4.addTo(mymap)
    nodels.push(demmarker4)
    demls.push(demmarker4)

    ChangeZoom();
    step5 = true;
  }
}

function initstep6(){
  try {mymap.remove()}
  catch {}
  try {mymap2.remove()}
  catch {}

  initgeomap('gfx_holder4');

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

    if (step3 && step4 && step5) {


    for (var i = 0; i < techls.length; i++){
      var copy1 = techmarker(techls[i].data.lat, techls[i].data.lon,  {name: techls[i].data.name, refprod: techls[i].data.refprod, type: techls[i].data.type, cost: techls[i].data.cost, capacity: techls[i].data.capacity, unit: techls[i].data.unit,src: techls[i].data.src}, draggable = false)
      var copy2 = techmarker(techls[i].data.lat, techls[i].data.lon,  {name: techls[i].data.name, refprod: techls[i].data.refprod, type: techls[i].data.type, cost: techls[i].data.cost, capacity: techls[i].data.capacity, unit: techls[i].data.unit,src: techls[i].data.src}, draggable = false)
      copy1.changable = false
      copy2.changable = false
      copy1.data.capacity = copy1.data.capacity + '" readonly = "readonly'
      copy2.data.capacity = copy2.data.capacity + '" readonly = "readonly'
      copy1.addTo(mymap)
      copy2.addTo(mymap2)
    }

    for (var i = 0; i < candls.length; i++){
      var copy1 = candmarker(candls[i].data.lat, candls[i].data.lon,  {name: candls[i].data.name, type: candls[i].data.type, src: candls[i].data.src}, draggable = false)
      var copy2 = candmarker(candls[i].data.lat, candls[i].data.lon,  {name: candls[i].data.name, type: candls[i].data.type, src: candls[i].data.src}, draggable = false)
      copy1.changable = false
      copy2.changable = false
      copy1.addTo(mymap)
      copy2.addTo(mymap2)
    }

    for (var i = 0; i < supls.length-1; i++){
      var copy1 = supmarker(supls[i].data.lat, supls[i].data.lon,  {name: supls[i].data.name, prod: supls[i].data.prod, amount: supls[i].data.amount, price: supls[i].data.price}, draggable = false)
      var copy2 = supmarker(supls[i].data.lat, supls[i].data.lon,  {name: supls[i].data.name, prod: supls[i].data.prod, amount: supls[i].data.amount, price: supls[i].data.price}, draggable = false)
      copy1.changable = false
      copy2.changable = false
      copy1.data.amount = copy1.data.amount + '" readonly = "readonly'
      copy1.data.price = copy1.data.price + '" readonly = "readonly'
      copy2.data.amount = copy2.data.amount + '" readonly = "readonly'
      copy2.data.price = copy2.data.price + '" readonly = "readonly'
      copy1.addTo(mymap)
      copy2.addTo(mymap2)
    }

    var copy1 = demmarker(demls[0].data.lat, demls[0].data.lon,  {name: demls[0].data.name, prod: demls[0].data.prod, amount: demls[0].data.amount, price: demls[0].data.price, unit: demls[0].data.unit}, draggable = false)
    var copy2 = demmarker(demls[0].data.lat, demls[0].data.lon,  {name: demls[0].data.name, prod: demls[0].data.prod, amount: demls[0].data.amount, price: demls[0].data.price, unit: demls[0].data.unit}, draggable = false)
    copy1.changable = false
    copy2.changable = false
    copy1.data.amount = copy1.data.amount + '" readonly = "readonly'
    copy1.data.price = copy1.data.price + '" readonly = "readonly'
    copy2.data.amount = copy2.data.amount + '" readonly = "readonly'
    copy2.data.price = copy2.data.price + '" readonly = "readonly'
    copy1.addTo(mymap)
    copy2.addTo(mymap2)


    var copy3 = demmarker(demls[1].data.lat, demls[1].data.lon,  {name: demls[1].data.name, prod: demls[1].data.prod, amount: demls[1].data.amount, price: demls[1].data.price, unit: demls[1].data.unit, prod2: demls[1].data.prod2, amount2: demls[1].data.amount2, price2: demls[1].data.price2, unit2: demls[1].data.unit2}, draggable = false)

    var copy4 = demmarker(demls[1].data.lat, demls[1].data.lon,  {name: demls[1].data.name, prod: demls[1].data.prod, amount: demls[1].data.amount, price: demls[1].data.price, unit: demls[1].data.unit, prod2: demls[1].data.prod2, amount2: demls[1].data.amount2, price2: demls[1].data.price2, unit2: demls[1].data.unit2}, draggable = false)

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


    var copy5 = demmarker(demls[2].data.lat, demls[2].data.lon,  {name: demls[2].data.name, prod: demls[2].data.prod, amount: demls[2].data.amount, price: demls[2].data.price, prod2: demls[2].data.prod2, amount2: demls[2].data.amount2, price2: demls[2].data.price2, unit2: demls[2].data.unit2}, draggable = false)
    copy5.data.amount = copy5.data.amount + '" readonly = "readonly'
    copy5.data.price = copy5.data.price + '" readonly = "readonly'
    copy5.unbindTooltip()
    copy5.bindTooltip("<b>CAFO3</b><br/><b>Consumer3</b>" )
    copy5.setIcon(greengoldIcon)

    var copy6 = demmarker(demls[2].data.lat, demls[2].data.lon,  {name: demls[2].data.name, prod: demls[2].data.prod, amount: demls[2].data.amount, price: demls[2].data.price, prod2: demls[2].data.prod2, amount2: demls[2].data.amount2, price2: demls[2].data.price2, unit2: demls[2].data.unit2}, draggable = false)
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


    var copy7 = demmarker(demls[3].data.lat, demls[3].data.lon,  {name: demls[3].data.name, prod: demls[3].data.prod, amount: demls[3].data.amount, price: demls[3].data.price, unit: demls[3].data.unit}, draggable = false)
    var copy8 = demmarker(demls[3].data.lat, demls[3].data.lon,  {name: demls[3].data.name, prod: demls[3].data.prod, amount: demls[3].data.amount, price: demls[3].data.price, unit: demls[3].data.unit}, draggable = false)
    copy7.changable = false
    copy8.changable = false
    copy7.data.amount = copy7.data.amount + '" readonly = "readonly'
    copy7.data.price = copy7.data.price + '" readonly = "readonly'
    copy8.data.amount = copy8.data.amount + '" readonly = "readonly'
    copy8.data.price = copy8.data.price + '" readonly = "readonly'
    copy7.addTo(mymap)
    copy8.addTo(mymap2)



    ChangeZoom();
    ChangeZoom2();

    wastedestinations = techls.concat(candls);
    wastedestinations.push(demls[1])

    for (i = 0; i < supls.length; i++ ){
      for (j = 0; j < wastedestinations.length; j++){
        var value = newpath([[supls[i].getLatLng().lat, supls[i].getLatLng().lng],[wastedestinations[j].getLatLng().lat, wastedestinations[j].getLatLng().lng]], {prod: "Waste", cost: '3', unit: 'tonne', color: 'black'})
        var path = value[0]
        path.addTo(mymap)
        var arrowHead = L.polylineDecorator(path, {
            patterns: [
              {offset: '60%', repeat: 0, symbol: L.Symbol.arrowHead({pixelSize: 6, polygon: false, pathOptions: {color: 'black', stroke: true}})}]
            }).addTo(mymap);
      }
    }

    digestsource = techls.concat(candls);

    for (i = 0; i <digestsource.length; i++){
      var value = newpath([[digestsource[i].getLatLng().lat, digestsource[i].getLatLng().lng],[demls[1].getLatLng().lat, demls[1].getLatLng().lng]], {prod: "Digestate", cost: '3', unit: 'tonne', color: 'blue'}, map = mymap2)
      var path = value[0]
      path.addTo(mymap2)
      var arrowHead = L.polylineDecorator(path, {
          patterns: [
            {offset: '60%', repeat: 0, symbol: L.Symbol.arrowHead({pixelSize: 6, polygon: false, pathOptions: {color: 'blue', stroke: true}})}]
          }).addTo(mymap2);
    }

    var value = newpath([[techls[0].getLatLng().lat, techls[0].getLatLng().lng],[demls[0].getLatLng().lat, demls[0].getLatLng().lng]], {prod: "Biogas", cost: '0.1', unit: 'ctf', color: 'green'}, map = mymap2)
    var path = value[0]
    path.addTo(mymap2)
    var arrowHead = L.polylineDecorator(path, {
        patterns: [
          {offset: '60%', repeat: 0, symbol: L.Symbol.arrowHead({pixelSize: 6, polygon: false, pathOptions: {color: 'green', stroke: true}})}]
        }).addTo(mymap2);

    var value = newpath([[techls[1].getLatLng().lat, techls[1].getLatLng().lng],[supls[2].getLatLng().lat, supls[2].getLatLng().lng]], {prod: "Electricity", cost: '0', unit: 'kWh', color: 'orange'}, map = mymap2)
    var path = value[0]
    path.addTo(mymap2)
    var arrowHead = L.polylineDecorator(path, {
        patterns: [
          {offset: '60%', repeat: 0, symbol: L.Symbol.arrowHead({pixelSize: 6, polygon: false, pathOptions: {color: 'orange', stroke: true}})}]
        }).addTo(mymap2);

    var value = newpath([[candls[0].getLatLng().lat, candls[0].getLatLng().lng],[demls[3].getLatLng().lat, demls[3].getLatLng().lng]], {prod: "Biomethane", cost: '0.3', unit: 'gal', color: 'red'}, map = mymap2)
    var path = value[0]
    path.addTo(mymap2)
    var arrowHead = L.polylineDecorator(path, {
        patterns: [
          {offset: '60%', repeat: 0, symbol: L.Symbol.arrowHead({pixelSize: 6, polygon: false, pathOptions: {color: 'red', stroke: true}})}]
        }).addTo(mymap2);

    step6 = true;
  }
}

function initstep7(){
  if (step3 && step4 && step5 && step6) {
    $('#runbtn').attr("class","btn btn-light border btn-block");
    $('#runbtn').attr("onclick","loadspinner(), beginsolve()");
  }
}

function beginsolve(){
  // NODE DATA
  var nodedata = []
  var n = 1;
  for (var i = 0; i < supls.length; i++){
    var item = ["n" + n , supls[i].data.lat, supls[i].data.lon]
    nodedata.push(item)
    n = n + 1
  }
  for (var i = 0; i < techls.length; i++){
    var item = ["n" + n , techls[i].data.lat, techls[i].data.lon]
    nodedata.push(item)
    n = n + 1
  }
  for (var i = 0; i < candls.length; i++){
    var item = ["n" + n, candls[i].data.lat, candls[i].data.lon]
    nodedata.push(item)
    n = n + 1
  }
  for (var i = 0; i < demls.length; i++){
    if (i!= 2) {
      var item = ["n" + n, demls[i].data.lat, demls[i].data.lon]
      nodedata.push(item)
      n = n + 1
    }
  }

  // SUP DATA
  var supdata = []
  var s = 1;
  for (var i = 0; i < supls.length; i++){
    var item = ["s" + s, "n" + s, "p1", supls[i].data.price, supls[i].data.amount]
    supdata.push(item)
    s = s + 1
  }

  //SITE DATA
  var sitedata = []
  var ts = 1;
  for (var i = 0 ; i < techls.length; i++) {
    var item = ["ts" + ts, "n" + (ts + 3), "t" + ts, techls[i].data.capacity]
    sitedata.push(item)
    ts = ts + 1
  }

  //CAND DATA
  var canddata = [["cd1", "n6", "t3"]]

  //DEM DATA
  var demdata = [["d1", "n7", "p2", demls[0].data.price, demls[0].data.amount],
                [ "d2", "n8", "p3", demls[1].data.price, demls[1].data.amount],
                [ "d3", "n8", "p1", demls[1].data.price2, demls[1].data.amount2],
                [ "d4", "n3", "p4", demls[2].data.price2, demls[2].data.amount2],
                [ "d5", "n9", "p5", demls[3].data.price, demls[3].data.amount]]

//console.log(demdata)
//console.log(demls)

  //PROD DATA
  var proddata = [["p1","Waste",3],
                  ["p2","Biogas", 0.1],
                  ["p3","Digestate", 3],
                  ["p4","Electricity", 0.001],
                  ["p5","Biomethane", 0.3]]
  //TECH DATA
  var techdata = [["t1","AD", 0, 300000, "p1",9.126,208241,0.876096,19991.136],
                  ["t2","AD+Ele", 0, 300000, "p1",15.24042,347762.47,4.35435687,19991.136],
                  ["t3","AD+Bm", 0, 300000, "p1",0,9.05e6,0,2.79e5]]

  //ALPHA DATA
  var alphadata = [[-1,1500,0.95,0,0],
                   [-1,0,0.95,85,0],
                   [-1,0,0.95,0,11]]

 var el = document.getElementsByName("csrfmiddlewaretoken");
 csrf_value = el[0].getAttribute("value");

 nodedata = JSON.stringify(nodedata)
 supdata = JSON.stringify(supdata)
 sitedata = JSON.stringify(sitedata)
 canddata = JSON.stringify(canddata)
 demdata = JSON.stringify(demdata)
 proddata = JSON.stringify(proddata)
 techdata = JSON.stringify(techdata)
 alphadata = JSON.stringify(alphadata)

 jQuery.ajax({
   method: "POST",
   url: "/ajax/begintosolveeg2",
   data: {csrfmiddlewaretoken: csrf_value, nodedata: nodedata, supdata:supdata, sitedata:sitedata, canddata:canddata, demdata:demdata, proddata:proddata, techdata:techdata, alphadata:alphadata},
   success: function (data) {
     if (data.pseudoID) {
       setTimeout(function(){
       location.href = '/eg2_results/' + data.pseudoID; }, 3000);
     }
   }
 });

}

function loadspinner(){
  $("#overlaycontainer").css("display","block");
}
