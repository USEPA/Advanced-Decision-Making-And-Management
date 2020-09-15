datashown = []
modeltype = 1

function initgeomap(center = [51.505, -0.09], zoom = 2){
  ii = 0
  mymap = L.map('gfx_holder').setView(center, zoom);
  var cartodbAttribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/attribution">CARTO</a>';

  L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
    attribution: cartodbAttribution,
    maxZoom: 18,
}).addTo(mymap);


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

function ChangeZoom(markerls){
 if (markerls.length >= 2) {
   var latlonls = []
   for (var i = 0; i < markerls.length; i++) {
     latlonls.push([markerls[i].getLatLng().lat, markerls[i].getLatLng().lng])
   }
   mymap.fitBounds(latlonls)
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
  content += '<div class="form-group"> <label>Supplied capacity (product unit/' + 'time unit' + ')</label>  <input class="form-control prodcap " type="number" value = ' + cap + ' min = 0 readonly/> </div> <div class="form-group"> <label> Supplied price (USD/product unit) </label> <input class="form-control prodprice" type="number" value = ' + price + '  readonly/></div></div>'

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
  content += '<div class="form-group"> <label>Technology capacity (reference product unit/' + 'time unit' + ')</label>  <input class="form-control techcap " id = "techcap' + code + '" type="number" value = ' + cap + ' min = 0 readonly/> </div> </div>'

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
  for (var j = 0; j < prodlist.length; j++){
    if (name != prodlist[j].id) {
      content +=   '<option value = "' + prodlist[j].id + '" disabled> p' + prodlist[j].id + ' - ' + prodlist[j].name + ' - ' + prodlist[j].unit + ' </option>'
    } else {
      content +=   '<option value = "' + prodlist[j].id + '" selected> p' + prodlist[j].id + ' - ' + prodlist[j].name + ' - ' + prodlist[j].unit + '</option>'
    }
  }
  content += '</select> </div>'
  content += '<div class="form-group"> <label>Demanded capacity (product unit/' + 'time unit' + ')</label>  <input class="form-control demcap " type="number" value = ' + cap + ' min = 0 readonly/> </div> <div class="form-group"> <label> Demanded price (USD/product unit) </label> <input class="form-control demprice" type="number" value = ' + price + ' readonly/></div></div>'

  return content
}

// Define a marker
function newmarker(lat, lon, name, data = [], tech = [], demd = []){

  var id = makeid(8)
  var marker = L.marker([lat, lon], {
    title: name     ,
    draggable: false,
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

function findDataIndex(id){
  for (i = 0; i < datashown.length; i++){
    if (datashown[i].id == id){
      return i
    }
  }
  return -1
}

function checkChange(type, id) {
  $("#overlaycontainer").css("display","block");
  $("#spinner").css("visibility","visible");

  if ($('#check' + id).prop('checked') == false){
    try {
      index = findDataIndex(id)
      console.log(index)
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
        url: "/expert/ajax/visualfilegetdata",
        data: {type: type, id: id, csrfmiddlewaretoken: csrf_value},
        success: function (data) {

          if (data.error.length) {
            for (var i = 0; i < data.error.length; i++){
              alertify.notify(data.error[i], 'error', 10, null);
              $("#overlaycontainer").css("display","none");
              $("#spinner").css("visibility","hidden");
            }
          } else {
          var markerls = []
          toplot = data.ls

          if (type.includes('Supply')) {
            for (i = 1; i < toplot.length; i++){
              var item = toplot[i]
              var itemdata = [{name: item[3].slice(1), price: Number(item[4]), cap: Number(item[5])}]
              var marker = newmarker(Number(item[1]), Number(item[2]), item[0], data = itemdata, tech = [], demd = [])
              marker.addTo(mymap)
              markerls.push(marker)
            }
          }

          if (type.includes('Demand')) {
            for (i = 1; i < toplot.length; i++){
              var item = toplot[i]
              var itemdata = [{name: item[3].slice(1), price: Number(item[4]), cap: Number(item[5])}]
              var marker = newmarker(Number(item[1]), Number(item[2]), item[0], data = [], tech = [], demd = itemdata)
              marker.setIcon(greenIcon)
              marker.addTo(mymap)
              markerls.push(marker)
            }
          }

          if (type.includes('Site')) {
            for (i = 1; i < toplot.length; i++){
              var item = toplot[i]
              var cap = 0
              try {
                cap = Number(item[4])
              } catch { }
              var itemtech = [{type: type, name: item[3].slice(1), cap: cap}]
              var marker = newmarker(Number(item[1]), Number(item[2]), item[0], data = [], tech = itemtech, demd = [])
              marker.setIcon(blueIcon)
              marker.addTo(mymap)
              markerls.push(marker)
            }
          }

          if (type.includes('Candidate')) {
            for (i = 1; i < toplot.length; i++){
              var item = toplot[i]
              var cap = 0
              try {
                cap = Number(item[4])
              } catch { }
              var itemtech = [{type: type, name: item[3].slice(1), cap: cap}]
              var marker = newmarker(Number(item[1]), Number(item[2]), item[0], data = [], tech = itemtech, demd = [])
              marker.setIcon(redIcon)
              marker.addTo(mymap)
              markerls.push(marker)
            }
          }

          datashown.push({id:id, ls: data.ls, markerls:markerls})
          ChangeZoom(markerls);
          $("#overlaycontainer").css("display","none");
          $("#spinner").css("visibility","hidden");
        }
      }
      });
    }
  }
}
