
function initgeomap(center = [51.505, -0.09], zoom = 2){
  prod = 0
  transdataprod = []
  arcset = []
  html5Slider = false
  mymap = L.map('gfx_holder').setView(center, zoom);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}', {
    foo: 'bar',
    attribution: 'Map data <a href="https://www.openstreetmap.org/">OpenStreetMap</a> under <a href="http://opendatacommons.org/licenses/odbl/1.0/">ODbL</a>',
    maxZoom: 18,
}).addTo(mymap);
  mymap.doubleClickZoom.disable()
  mymap.on('dblclick', ChangeZoom)

  greyIcon = new L.Icon({
  iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-grey.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]});

  redIcon = new L.Icon({
  iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]});

  blueIcon = new L.Icon({
  iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]});

  greenIcon = new L.Icon({
  iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]});

  goldIcon = new L.Icon({
  iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]});

  var legend = L.control({position: 'bottomleft'});
    legend.onAdd = function (mymap) {

    var div = L.DomUtil.create('div', 'card');
    labels = ['<strong>Categories</strong>'],
    categories = ['Node'];
    color = ['grey']

    for (var i = 0; i < categories.length; i++) {

            div.innerHTML +=
            labels.push(
                '<div><img src="https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-' + color[i] + '.png" style = "width: 10px" alt="" style="vertical-align:middle"> - ' + categories[i] + '</div>'
            );
        }
        div.innerHTML = labels.join('');
    return div;
    };
    legend.addTo(mymap);greyIcon = new L.Icon({
    iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-grey.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]});

    redIcon = new L.Icon({
    iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]});

    blueIcon = new L.Icon({
    iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]});

    greenIcon = new L.Icon({
    iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]});

    goldIcon = new L.Icon({
    iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]});

    var legend = L.control({position: 'bottomleft'});
      legend.onAdd = function (mymap) {

      var div = L.DomUtil.create('div', 'card');
      labels = ['<strong>Categories</strong>'],
      categories = ['Node','Installed Tech','Existing Tech','Demand','Supply'];
      color = ['grey', 'red', 'blue', 'green', 'gold']

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
  var marker = L.marker([lat, lon], {
    title: name,
    draggable: false,
    icon: greyIcon} )

  var pop = marker.bindTooltip("<b>"+name + "</b>") //<br/>Latitude: " + lat +"<br/>Longitude: " + lon

  return [marker,id]
}

function newpath(latlng){
  var path = L.polyline(latlng)
  var dist = distcalculator(latlng).toFixed(2)
  var pop = path.bindTooltip("<b>"+ dist + "km </b>") //<br/>Latitude: " + lat +"<br/>Longitude: " + lon

  path.on('mouseover', (event)=>{
    pop.openPopup()
  })
  path.on('mouseout', (event)=>{
    pop.closePopup()
  })
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

function geoprod(){
  var content = ''
  content += '<div id = "transprodselection">'
  content += '<h4> Product Selection' + '</h4> <div> <p>Please select a product</p> <br/> <div class="selectdiv"> <select name="demprod" class = "demprodselect">'
  for (var j = 0; j < prodlist.length; j++){
      content +=   '<option value = "' + j + '"> ' + prodlist[j].name + ' </option>'
  }
  content += '</select> </div> </div> <br/><br/>'
  alertify.confirm(content).set('onok', function(closeEvent) {
    prod = document.getElementsByClassName('demprodselect')[0].value

    setTimeout(drawroutes, 300, prod);
    loadspinner("Drawing...")
    alertify.confirm().destroy();
  }).set('oncancel', function(closeEvent) {alertify.confirm().destroy();})
}

function drawroutes(prod) {

  cleararc()
  transdataprod = transdata[prod]
  for (var i = 0; i < transdataprod.length; i++){
    for (var j = 0; j < transdataprod[i].length; j++){
      if (transdataprod[i][j] == "Y"){
        var value = newpath([[nodels[i].lat, nodels[i].lon],[nodels[j].lat, nodels[j].lon]])
        var path = value[0]
        var dist = value[1]
        path.addTo(mymap)

        var arrowHead = L.polylineDecorator(path, {
            patterns: [
              {offset: '60%', repeat: 0, symbol: L.Symbol.arrowHead({pixelSize: 8, polygon: false, pathOptions: {stroke: true}})}]
            }).addTo(mymap);
        arcset.push({line: path, arrow: arrowHead, ii: i, jj: j, dist: dist, show: true})
      }
    }
  }
  $("#overlaycontainer").css("display","none");
  $(".horizontalbar").css("display","none")
}


function cleararc(){
  clearmap();
  arcset = []
}

function clearmap(){
  for (var i = 0; i < arcset.length; i++){
    arcset[i].line.removeFrom(mymap)
    arcset[i].arrow.removeFrom(mymap)
    arcset[i].show = false
  }
}


function geofilt(){
  if (arcset.length > 0){
    if ($(".horizontalbar").css("display") == 'none') {
    loadspinner("Making a Filter...")
    setTimeout(function() {

    var mindist = Math.min.apply(Math, arcset.map(function(o) { return o.dist; }))
    var maxdist = Math.max.apply(Math, arcset.map(function(o) { return o.dist; }))

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
      for (var i = 0; i < arcset.length; i++){
        if (Math.round(arcset[i].dist) >= mindist && Math.round(arcset[i].dist) <= maxdist) {
          arcset[i].line.addTo(mymap);
          arcset[i].arrow.addTo(mymap);
          arcset[i].show = true
        }
      }
      $("#overlaycontainer").css("display","none");
    }, 100)
  });
}

function loadspinner(text){
  $("#spinnertext").html(text)
  $("#overlaycontainer").css("display","block");
}

function generatetrans(taskid) {
  var el = document.getElementsByName("csrfmiddlewaretoken");
  csrf_value = el[0].getAttribute("value");

  jQuery.ajax({
    method: "POST",
    url: "/expert/ajax/generatetransfiles",
    data: {csrfmiddlewaretoken: csrf_value, taskid: taskid},
    processData: false,
    success: function (data) {
      if (data) {
        if (data.msg.length > 0 ) {
          for (var i = 0; i < data.msg.length; i++){
            alertify.error(data.msg[i])
          }
        } else {

          transdata = data.transdata
          $("#overlaycontainer").css("display","none");
          $('#geowritetrans').css("display", "none");
          $('#geoselectprod').css("display", "");
        }
      }

    }
  });

  $('#continuebtn').css("display", "");
  $('#geomapsave1').css("display", "");
}

function georecover(){
  alertify.confirm('Confirm', 'Recover original routes?',
  function() {
    if ($(".horizontalbar").css("display") !== 'none') {
      $(".horizontalbar").css("display","none")
    }
    for (var i = 0; i < arcset.length; i++){
      if (arcset[i].show == false) {
        arcset[i].line.addTo(mymap);
        arcset[i].arrow.addTo(mymap);
        arcset[i].show = true
      }
    }
  },
  null).set('labels',{ok:'Yes', cancel:'Cancel'});
}

function geosavetrans(taskid){
  arcsetls = []
  for (var i = 0; i < arcset.length; i++){
    if (arcset[i].show == true){
      arcsetls.push({ii: arcset[i].ii ,jj: arcset[i].jj})
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

    jQuery.ajax({
      method: "POST",
      url: "/expert/ajax/rewritetransfiles",
      data: {csrfmiddlewaretoken: csrf_value, taskid: taskid, prodid: (Number(prod)+1), transdata: arcsetls},
      processData: false,
      success: function (data) {
        if (data) {
          if (data.error.length > 0 ) {
            for (var i = 0; i < data.error.length; i++){
              alertify.error(data.error[i])
            }
          } else {
            $('#testtext').text("Transportation routes saved.")
          }
        }
      }
    });
  },
  null).set('labels',{ok:'Yes', cancel:'Cancel'});
}
