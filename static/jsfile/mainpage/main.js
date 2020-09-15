datashown = []

function initgeomap(divid, center = [37.0902, -95.7129], zoom = 4){
  mymap = L.map(divid).setView(center, zoom);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}', {
    foo: 'bar',
    attribution: 'Map data <a href="https://www.openstreetmap.org/">OpenStreetMap</a> under <a href="http://opendatacommons.org/licenses/odbl/1.0/">ODbL</a>',
    maxZoom: 18,
}).addTo(mymap);


  cowIcon = new L.Icon({
  iconUrl: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/softbank/145/cow-face_1f42e.png',
  iconSize: [18, 18],
  iconAnchor: [9, 9],
  popupAnchor: [5, 0]});

  beefIcon = new L.Icon({
  iconUrl: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/237/ox_1f402.png',
  iconSize: [18, 18],
  iconAnchor: [9, 9],
  popupAnchor: [5, 0]});

  wwtpIcon = new L.Icon({
  iconUrl: 'https://image.flaticon.com/icons/svg/877/877656.svg',
  iconSize: [18, 18],
  iconAnchor: [9, 9],
  popupAnchor: [5, 0]});

  biogasIcon = new L.Icon({
  iconUrl: 'https://image.flaticon.com/icons/svg/542/542512.svg',
  iconSize: [18, 18],
  iconAnchor: [9, 9],
  popupAnchor: [5, 0]});

}

function findDataIndex(id){
  for (i = 0; i < datashown.length; i++){
    if (datashown[i].id == id){
      return i
    }
  }
  return -1
}

function ChangeZoom(markerls){
   var latlonls = []
   for (var j = 0; j < markerls.length; j++) {
     latlonls.push([markerls[j].getLatLng().lat, markerls[j].getLatLng().lng])
   }
   mymap.fitBounds(latlonls)
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

function cafomarker(lat, lon, data){

  var id = makeid(8)
  var marker = L.marker([lat, lon], {
    title: name,
    draggable: false,
    icon: cowIcon} )
  data.lat = lat
  data.lon = lon
  marker.content = ''

  marker.on('dblclick', (event)=>{
      alertify.confirm(marker.content).set('title', 'Information').set('onok', null).set('oncancel', null).set('closable',false)});

  var pop = marker.bindPopup("<b> Dairy Farm</b> <p>Latitude: " + data.lat + "</p><p>Longitude: " + data.lon + "</p><p>Address: " + data.addr + "</p><p>Animal Units: " + data.au + "</p>")
  return marker
}

function beefmarker(lat, lon, data){

  var id = makeid(8)
  var marker = L.marker([lat, lon], {
    title: name,
    draggable: false,
    icon: beefIcon} )
  data.lat = lat
  data.lon = lon
  marker.content = ''

  marker.on('dblclick', (event)=>{
      alertify.confirm(marker.content).set('title', 'Information').set('onok', null).set('oncancel', null).set('closable',false)});

  var pop = marker.bindPopup("<b>Beef Farm</b> <p>Latitude: " + data.lat + "</p><p>Longitude: " + data.lon + "</p><p>Address: " + data.addr + "</p><p>Animal Units: " + data.au + "</p>")
  return marker
}

function wwtpmarker(lat, lon, data){

  var id = makeid(8)
  var marker = L.marker([lat, lon], {
    title: name,
    draggable: false,
    icon: wwtpIcon} )
  data.lat = lat
  data.lon = lon
  marker.content = ''

  marker.on('dblclick', (event)=>{
      alertify.confirm(marker.content).set('title', 'Information').set('onok', null).set('oncancel', null).set('closable',false)});

  var pop = marker.bindPopup("<b>Wastewater Treatment Plant</b> <p>Latitude: " + data.lat + "</p><p>Longitude: " + data.lon + "</p><p>Address: " + data.addr + "</p><p>Capacity: " + data.cap + "</p>")
  return marker
}

function biogasmarker(lat, lon, data){

  var id = makeid(8)
  var marker = L.marker([lat, lon], {
    title: name,
    draggable: false,
    icon: biogasIcon} )
  data.lat = lat
  data.lon = lon
  marker.content = ''

  marker.on('dblclick', (event)=>{
      alertify.confirm(marker.content).set('title', 'Information').set('onok', null).set('oncancel', null).set('closable',false)});

  var pop = marker.bindPopup("<b>Biogas Facility</b> <p>Latitude: " + data.lat + "</p><p>Longitude: " + data.lon + "</p><p>Address: " + data.addr + "</p><p>Animal Type: " + data.animal + "</p><p>Project Type: " + data.project + "</p><p>Biogas Use: " + data.bguse + "</p>")
  return marker
}


function initstep2() {
  initgeomap('gfx_holder1');
}

function checkChange(id) {
  $("#overlaycontainer").css("display","block");
  $("#spinner").css("visibility","visible");

  if ($('#'+id).prop('checked') == false){
    try {
      index = findDataIndex(id)
      for (i = 0; i < datashown[index].markerls.length; i++){
        datashown[index].markerls[i].removeFrom(mymap)
      }
      datashown.splice(index,1);
    } catch {}
    $("#overlaycontainer").css("display","none");
    $("#spinner").css("visibility","hidden");

  } else {
    if (findDataIndex(id) == -1) {
      var el = document.getElementsByName("csrfmiddlewaretoken");
      csrf_value = el[0].getAttribute("value");
      jQuery.ajax({
        method: "POST",
        url: "main/ajax/getdata",
        data: {id: id, csrfmiddlewaretoken: csrf_value},
        success: function (data) {
          var markerls = []
          toplot = data.ls
          if (data.id.includes('cafos')) {
            for (i = 0; i < toplot.length; i++){
              var item = toplot[i]
              var marker = cafomarker(item[2], item[3], {addr: item[0], au: item[1]})
              marker.addTo(mymap)
              markerls.push(marker)
            }
          }

          if (data.id.includes('beefs')) {
            for (i = 0; i < toplot.length; i++){
              var item = toplot[i]
              var marker = beefmarker(item[2], item[3], {addr: item[0], au: item[1]})
              marker.addTo(mymap)
              markerls.push(marker)
            }
          }

          if (data.id.includes('wwtps')) {
            for (i = 0; i < toplot.length; i++){
              var item = toplot[i]
              var marker = wwtpmarker(item[2], item[3], {addr: item[0], cap: item[1]})
              marker.addTo(mymap)
              markerls.push(marker)
            }
          }

          if (data.id.includes('biogas')) {
            for (i = 0; i < toplot.length; i++){
              var item = toplot[i]
              var marker = biogasmarker(item[2], item[3], {addr: item[0], animal: item[1], project: item[4], bguse: item[5]})
              marker.addTo(mymap)
              markerls.push(marker)
            }
          }

          datashown.push({id:data.id, ls: data.ls, markerls:markerls})
          ChangeZoom(markerls);
          $("#overlaycontainer").css("display","none");
          $("#spinner").css("visibility","hidden");
        }
      });
    }
  }
}

function checkBound(id) {
  $("#overlaycontainer").css("display","block");
  $("#spinner").css("visibility","visible");

  if ($('#'+id).prop('checked') == false){
    try {
      index = findDataIndex(id)
      datashown[index].shp.removeFrom(mymap)
      datashown.splice(index,1);
    } catch {}
    $("#overlaycontainer").css("display","none");
    $("#spinner").css("visibility","hidden");

  } else {
    if (findDataIndex(id) == -1) {
      var el = document.getElementsByName("csrfmiddlewaretoken");
      csrf_value = el[0].getAttribute("value");
      jQuery.ajax({
        method: "POST",
        url: "main/ajax/getbounds",
        data: {id: id, csrfmiddlewaretoken: csrf_value},
        success: function (data) {
          var shpfile
          if (data.id.includes('lake')) {
              var shpfile = new L.Shapefile(document.getElementById("helper2").getAttribute("helptext") + data.path, {
            			onEachFeature: function(feature, layer) {
            				if (feature.properties) {
            					layer.bindPopup(Object.keys(feature.properties).map(function(k) {
            						return k + ": " + feature.properties[k];
            					}).join("<br />"), {
            						maxHeight: 200
            					});
                      mymap.fitBounds(layer.getBounds())
            				}
            			},
                  color: '#9A0001'
            		});
                shpfile.addTo(mymap);
          }
          datashown.push({id:data.id, shp:shpfile})
          $("#overlaycontainer").css("display","none");
          $("#spinner").css("visibility","hidden");
        }
      });
    }
  }
}




function checkChangeAll(type) {
  if (type == 'cafos') {
    var checkboxes = document.getElementsByClassName('form-check-input')
     for (var i = 0; i < checkboxes.length; i++)
     {
       flag = $('#cafos_all').prop('checked')
        if (checkboxes[i].id.includes('cafos') && checkboxes[i].id != 'cafos_all'){
          checkboxes[i].checked = flag;
          checkChange(checkboxes[i].id)
        }
     }
  }
  if (type == 'beefs') {
    var checkboxes = document.getElementsByClassName('form-check-input')
     for (var i = 0; i < checkboxes.length; i++)
     {
       flag = $('#beefs_all').prop('checked')
        if (checkboxes[i].id.includes('beefs') && checkboxes[i].id != 'beefs_all'){
          checkboxes[i].checked = flag;
          checkChange(checkboxes[i].id)
        }
     }
  }
  if (type == 'wwtps') {
    var checkboxes = document.getElementsByClassName('form-check-input')
     for (var i = 0; i < checkboxes.length; i++)
     {
       flag = $('#wwtps_all').prop('checked')
        if (checkboxes[i].id.includes('wwtps') && checkboxes[i].id != 'wwtps_all'){
          checkboxes[i].checked = flag;
          checkChange(checkboxes[i].id)
        }
     }
  }
  if (type == 'biogas') {
    var checkboxes = document.getElementsByClassName('form-check-input')
     for (var i = 0; i < checkboxes.length; i++)
     {
       flag = $('#biogas_all').prop('checked')
        if (checkboxes[i].id.includes('biogas') && checkboxes[i].id != 'biogas_all'){
          checkboxes[i].checked = flag;
          checkChange(checkboxes[i].id)
        }
     }
  }
}
