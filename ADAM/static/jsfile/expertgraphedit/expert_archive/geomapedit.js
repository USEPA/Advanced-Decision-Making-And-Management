
//initialize the geographical map
function initgeomap(center = [51.505, -0.09], zoom = 2){
  ii = 0
  mymap = L.map('gfx_holder').setView(center, zoom);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}', {
    foo: 'bar',
    attribution: 'Map data <a href="https://www.openstreetmap.org/">OpenStreetMap</a> under <a href="http://opendatacommons.org/licenses/odbl/1.0/">ODbL</a>',
    maxZoom: 18,
}).addTo(mymap);
  mymap.doubleClickZoom.disable()
  mymap.on('contextmenu', ChangeZoom)

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
    legend.addTo(mymap);

  mymap.on('dblclick', function(ev) {
    latlng = ev.latlng
    content = '<p><strong>Do you want to add a node at the following location?</strong></p><br/><p> Latitude = ' + latlng.lat.toFixed(4) + '  Longitude = ' + latlng.lng.toFixed(4) + '</p>' + '<br/><p> Enter node name: </p> <input class="ajs-input" id="nodename" type="text"/>'
    alertify.confirm(content).set('onok', function() {
      var nodename = $('#nodename').val();
      value = newmarker(latlng.lat, latlng.lng, nodename)
      var marker = value[0]
      var id = value[1]
      marker.addTo(mymap)
      nodels.push({nodename: nodename, nodeid: id, lat: marker.getLatLng().lat, lon: marker.getLatLng().lng})
    }).set('oncancel', function() {
      alertify.confirm().destroy();
    }).set('labels',{ok:'Yes', cancel:'Cancel'})
});
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

function newmarker(lat, lon, name){
  ii++;
  var id = ii
  var marker = L.marker([lat, lon], {
    title: name,
    draggable: true,
    icon: greyIcon})

  marker.on('dblclick', (event)=>{
      alertify.confirm('Confirm', 'Are you sure to delete this element?',
      function() {
        try {i = findfigure(id)
        nodels.splice(i, 1);
        }
        catch(e) {};
        marker.removeFrom(mymap)
      }, null).set('labels',{ok:'Yes', cancel:'Cancel'})
        });

  marker.on('dragend', (event)=>{
    try {i = findfigure(id)
    nodels[i].lat = marker.getLatLng().lat
    nodels[i].lon = marker.getLatLng().lng
    marker.unbindPopup()
    var pop = marker.bindPopup("<b>"+name + "</b><br/>Latitude: " + marker.getLatLng().lat +"<br/>Longitude: " + marker.getLatLng().lng)
    marker.on('mouseover', (event)=>{
      pop.openPopup()
    })
    marker.on('mouseout', (event)=>{
      pop.closePopup()
    })
    }
    catch(e) {};
  })

  var pop = marker.bindPopup("<b>"+name + "</b><br/>Latitude: " + lat +"<br/>Longitude: " + lon)
  marker.on('mouseover', (event)=>{
    pop.openPopup()
  })
  marker.on('mouseout', (event)=>{
    pop.closePopup()
  })

  return [marker,id]
}

function findfigure(id){
  for (var i = 0; i < nodels.length; i++){
    if (nodels[i].nodeid == id){
      return i
    }
  }
  return
}


function geoaddnode(){
  var addnodeHTML = $('.addnodeform_geo').html();
  $('.addnodeform_geo').html("");
  alertify.confirm(addnodeHTML).set('onok', function(closeEvent) {
    var nodename = $('#inp1_geo').val();
    var nodelat = Number($('#inp2_geo').val());
    var nodelon = Number($('#inp3_geo').val());

    if (nodename != "" && nodelat != "" && nodelon != ""){
      value = newmarker(nodelat, nodelon, nodename)
      var marker = value[0]
      var id = value[1]
      marker.addTo(mymap)
      nodels.push({nodename: nodename, nodeid: id, lat: marker.getLatLng().lat, lon: marker.getLatLng().lng})

      console.log(nodels)
  } else {
    alertify.error('Please enter required information!');
  }
    $('#inp1_geo')[0].value = '';
    $('#inp2_geo')[0].value = '';
    $('#inp3_geo')[0].value = '';
    $('.addnodeform_geo').html(addnodeHTML)
}).set('oncancel', function(closeEvent){
  $('#inp1_geo')[0].value = '';
  $('#inp2_geo')[0].value = '';
  $('#inp3_geo')[0].value = '';
$('.addnodeform_geo').html(addnodeHTML)}).set('title', "Add a new node").set('labels', {ok:'Ok', cancel:'Cancel'}).set('closable',false);

}

function geodeletenode(){
  alertify.confirm('Confirm', 'Double click a marker to delete it.',
  null, null).set('labels',{ok:'Ok', cancel:'Cancel'})
}

function geoloadnode(){
  var nodefileHTML = $('.select_node').html();
  $('.select_node').html("");
    alertify.confirm(nodefileHTML).set('onok', function(closeEvent) {
      var fileid = $('#nodefileselection').val();
        var el = document.getElementsByName("csrfmiddlewaretoken");
        csrf_value = el[0].getAttribute("value");
        if (fileid > 0){
        jQuery.ajax({
          method: "POST",
          url: "/expert/ajax/nodefileselection",
          data: {csrfmiddlewaretoken: csrf_value, fileid: fileid, mode: 'geo'},
          processData: false,
          success: function (data) {
            if (data) {
              if (data.msg.length > 0 ) {
                for (var i = 0; i < data.msg.length; i++){
                  alertify.error(data.msg[i])
                }
              } else {
                nodedata = data.nodedata
                mymap.off();
                mymap.remove();
                initgeomap();
                nodels = []
                for (var i = 1; i < nodedata.length; i++){
                  value = newmarker(Number(nodedata[i][2]), Number(nodedata[i][3]), nodedata[i][0])
                  var marker = value[0]
                  var id = value[1]
                  marker.addTo(mymap)
                  nodels.push({nodename: nodedata[i][0], nodeid: id, lat: marker.getLatLng().lat, lon: marker.getLatLng().lng})
                  }
                ChangeZoom();
                nodeid = data.nodeid
                $('#geomapsave1').css("display", "");
              }
            }
          }
        });}
      $('#nodefileselection')[0].value = '';
      $('.select_node').html(nodefileHTML)
    }).set('oncancel', function(closeEvent){
      $('#nodefileselection')[0].value = '';
      $('.select_node').html(nodefileHTML)
    }).set('title', "Load a geo file").set('labels', {ok:'Ok', cancel:'Cancel'}).set('closable',false);;
}

function geouploadnode(){
  var nodeuploadHTML = $('.node_upload_geo').html();
  $('.node_upload_geo').html("");
  alertify.confirm(nodeuploadHTML).set('onok', function(closeEvent) {
    $('#uploadbtm_geo').click()
    $('.node_upload_geo').html(nodeuploadHTML);
  }).set('oncancel', function(closeEvent){
    $('.node_upload_geo').html(nodeuploadHTML);
  }).set('title', "Upload a geo file").set('labels', {ok:'Upload', cancel:'Cancel'}).set('closable',false);
}

function geosavemap(taskid, onfile = false){
  var nodelsstring
  nodelsstring = JSON.stringify(nodels)
  console.log(nodels)

  if (onfile == false) {
    alertify.prompt( 'Name your graph', 'Please enter the name of new file:', '',
    function(evt, value) {
      var el = document.getElementsByName("csrfmiddlewaretoken");
      csrf_value = el[0].getAttribute("value");
      jQuery.ajax({
        method: "POST",
        url: "/expert/ajax/step3savemap",
        data: {name: value, content: nodelsstring, csrfmiddlewaretoken: csrf_value, taskid: taskid, mode: 'geo'},
        processData: false,
        success: function (data) {
          if (data.msg) {
            $("#testtext").text(data.msg);
            window.location = window.location.href;
          }
        }
      });
  },
    null);
  } else {
    alertify.confirm('Confirm', 'Save changes to the file and confirm?',
    function() {
      var el = document.getElementsByName("csrfmiddlewaretoken");
      csrf_value = el[0].getAttribute("value");
      jQuery.ajax({
        method: "POST",
        url: "/expert/ajax/step3savechange",
        data: {content: nodelsstring, csrfmiddlewaretoken: csrf_value, taskid: taskid, mode: 'geo', nodeid: nodeid},
        processData: false,
        success: function (data) {
          if (data.msg) {
            $("#testtext").text(data.msg);
            window.location = window.location.href;
          }
        }
      });
    },
    null).set('labels',{ok:'Yes', cancel:'Cancel'});
  }

}
