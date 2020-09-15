var timeunit
try {
  timeunit = document.getElementById("helper").getAttribute("time-unit");
} catch {
  timeunit = 'year'
}

function initgeomap(center = [51.505, -0.09], zoom = 2){
  ii = 0
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
    categories = ['Node','Demand'];
    color = ['grey',  'green']

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

function findProdIndexByAlia(alia){
  for (var i = 0; i < prodlist.length; i++){
    if (prodlist[i].alia == alia){
      return i
    }
  }
  return
}

function ExistingDemTable(id){
  index = findFigureByID(id)
  demdata = nodels[index].demdata
  var content = ''
  for (var i = 0; i < demdata.length; i++){
    content += '<div id = "deminfo' + String(id) + String(i+1) + '"> <h4> Demand Info ' + (i+1) + '</h4> <br/> <div> <p>Please select the demanded product</p> <br/> <div class="selectdiv"> <select name="demprod" class = "demprod' + id + '">'
    //console.log('deminfo' + id + (i+1))
    for (var j = 0; j < prodlist.length; j++){
      if (demdata[i].prodindex != j) {
        content +=   '<option value = "' + j + '"> ' + prodlist[j].name + ' (' + prodlist[j].unit + ')' + ' </option>'
      } else {
        content +=   '<option value = "' + j + '" selected > ' + prodlist[j].name + ' (' + prodlist[j].unit + ')' + ' </option>'
      }
    }
    content += '</select> </div> </div> <br/>'
    content += '<br/> <p> Please specify demanded cap (product unit/' + timeunit + ') </p> <input class="ajs-input demcap' + id + '" type="number" value = ' + demdata[i].cap +' step = 10 min = 0 /> <br/> <p> Please specify demanded price (USD/product unit)</p> <input class="ajs-input demprice' + id + '" type="number" value = ' + demdata[i].price + ' step = 1 /> <br/> <button class = "btn default" style = "padding: 3px 10px" onclick="removeDemTable(\'' + String(id) + '\',\'' + String(i+1) + '\')">Remove</button> </div>'
  }

  return content
}

function removeDemTable(id, i){
  id =  '#deminfo' + String(id) + String(i)
  $(id).html("")
  //console.log(id)
}

function addButton(id){
  return '<br/> <button class = "btn default" style = "padding: 3px 10px" onclick="addEmptyDem(\'' + id + '\')">Add Demand Info</button>'
}

function addEmptyDem(id){
  ii ++
  var contentid = '#deminfo' + String(id)
  var original = $(contentid).html()
  var content = '<div id = "deminfo' + String(id) + '">'
  content = content + original
  content += '<div id = "emptydeminfo' + String(id) + String(ii) + '"> <h4> Demand Info' + '</h4> <br/> <div> <p>Please select the demanded product</p> <br/> <div class="selectdiv"> <select name="demprod" class = "demprod' + id + '">'

  for (var j = 0; j < prodlist.length; j++){
      content +=   '<option value = "' + j + '"> ' + prodlist[j].name + ' (' + prodlist[j].unit + ')' + ' </option>'
  }
  content += '</select> </div> </div> <br/>'
  content += '<br/> <p> Please specify demanded cap (product unit/' + timeunit + ') </p> <input class="ajs-input demcap' + id + '" type="number" step = 10 min = 0 /> <br/> <p> Please specify demanded price (USD/product unit) </p> <input class="ajs-input demprice' + id + '" type="number"  step = 1 /> <br/> <button class = "btn default" style = "padding: 3px 10px" onclick="removeEmptyDemTable(\'' + String(id) + '\',\'' + String(ii) + '\')">Remove</button> </div>'

  content = content + '</div>'

  $(contentid).html(content)
}

function removeEmptyDemTable(id, i){
  id =  '#emptydeminfo' + String(id) + String(i)
  $(id).html("")
}

function newmarker(lat, lon, name){

  var id = makeid(8)
  var marker = L.marker([lat, lon], {
    title: name,
    draggable: false,
    icon: greyIcon} )

  marker.on('dblclick', (event)=>{
      var content = '<div id = "deminfo'+ String(id) + '">'
      content = content +  ExistingDemTable(id) + '</div>' + addButton(id)
      //console.log(content)
      alertify.confirm(content).set('title', 'Demand Information').set('onok', function(closeEvent) {
        var prods = extractValuesfromHTMLCollection(document.getElementsByClassName('demprod' + id))
        var caps = extractValuesfromHTMLCollection(document.getElementsByClassName('demcap' + id))
        var prices = extractValuesfromHTMLCollection(document.getElementsByClassName('demprice' + id))
        var i = findFigureByID(id)
        // check if information is entered
        var flag = false
        for (var j = 0; j<prods.length; j++){
          if (prods[j] == ""){
            flag = true
          }
          if (caps[j] == ""){
            flag = true
          }
          if (prices[j] == ""){
            flag = true
          }
        }

        if (flag){
          alertify.error("Please enter required information.")
        } else {
          nodels[i].demdata = []
          for (var j = 0; j < prods.length; j++){
            nodels[i].demdata.push({prodindex: prods[j], cap: caps[j], price: prices[j]})
          }
          if (nodels[i].demdata.length > 0){
            nodels[i].marker.setIcon(greenIcon)
          } else {
            nodels[i].marker.setIcon(greyIcon)
          }
        }
      }).set('oncancel', function(closeEvent) {
        content = '<div id = "deminfo' + String(id) + '">'
        content = content +  ExistingDemTable(id) + '</div>' + addButton(id)
        alertify.confirm().destroy();
      })

        });

  var pop = marker.bindTooltip("<b>"+name + "</b>") //<br/>Latitude: " + lat +"<br/>Longitude: " + lon
  //pop.openPopup()

  return [marker,id]
}

function extractValuesfromHTMLCollection(collection) {
  ls = []
  for (var j = 0; j < collection.length; j++){
    ls.push(collection[j].value)
  }
  return ls
}

function geoloaddem(taskid){
  var demfileHTML = $('.select_dem').html();
  $('.select_dem').html("");
    alertify.confirm(demfileHTML).set('onok', function(closeEvent) {
      var fileid = $('#demfileselection').val();
        var el = document.getElementsByName("csrfmiddlewaretoken");
        csrf_value = el[0].getAttribute("value");
        if (fileid > 0){
        jQuery.ajax({
          method: "POST",
          url: "/expert/ajax/demfileselection",
          data: {csrfmiddlewaretoken: csrf_value, fileid: fileid, mode: 'geo', taskid: taskid},
          processData: false,
          success: function (data) {
            if (data) {
              if (data.msg.length > 0 ) {
                for (var i = 0; i < data.msg.length; i++){
                  alertify.error(data.msg[i])
                }
              } else {

                for (var i = 0; i < nodels.length; i++){
                  nodels[i].demdata = []
                  nodels[i].marker.setIcon(greyIcon)
                }
                demdata = data.demdata
                console.log(demdata)
                for (var i = 1; i < demdata.length; i++){
                  var item = demdata[i]
                  var nodeIndex = findFigureByName(item[1])
                  var prodIndex = findProdIndexByAlia(item[2])
                  var price = item[3]
                  var cap = item[4]
                  nodels[nodeIndex].demdata.push({prodindex: prodIndex, cap: cap, price: price})
                  if (nodels[nodeIndex].demdata.length > 0){
                    nodels[nodeIndex].marker.setIcon(greenIcon)
                  }
                }
                demid = data.demid
                $('#geomapsave1').css("display", "");
              }
            }

          }
        });}
      $('#demfileselection')[0].value = '';
      $('.select_dem').html(demfileHTML)
    }).set('oncancel', function(closeEvent){
      $('#demfileselection')[0].value = '';
      $('.select_dem').html(demfileHTML)
    }).set('title', "Load a demand file").set('labels', {ok:'Ok', cancel:'Cancel'}).set('closable',false);;
}

function geouploaddem(){
  var demuploadHTML = $('.dem_upload').html();
  $('.dem_upload').html("");
  alertify.confirm(demuploadHTML).set('onok', function(closeEvent) {
    $('#uploadbtm').click()
    $('.dem_upload').html(demuploadHTML);
  }).set('oncancel', function(closeEvent){
    $('.dem_upload').html(demuploadHTML);
  }).set('title', "Upload a demand data file").set('labels', {ok:'Upload', cancel:'Cancel'}).set('closable',false);
}

function geosavedem(taskid, onfile = false){
  var nodelsstring = []
  for (var i = 0; i< nodels.length; i++){
    nodelsstring.push({nodename: nodels[i].nodename, nodeid: nodels[i].nodeid, lat: nodels[i].lat, lon: nodels[i].lon, demdata:nodels[i].demdata})
  }
  nodelsstring = JSON.stringify(nodelsstring)
  console.log(nodelsstring)

  if (onfile == false) {
    alertify.prompt( 'Name your file', 'Please enter the name of new file:', '',
    function(evt, value) {
      var el = document.getElementsByName("csrfmiddlewaretoken");
      csrf_value = el[0].getAttribute("value");
      jQuery.ajax({
        method: "POST",
        url: "/expert/ajax/step4savedem",
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
        url: "/expert/ajax/step4savechangedem",
        data: {content: nodelsstring, csrfmiddlewaretoken: csrf_value, taskid: taskid, mode: 'geo', demid: demid},
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

function geoucleardem() {
  alertify.confirm('Confirm', 'Clear all demand data?',
  function() {
    for (var i = 0; i < nodels.length; i++){
      nodels[i].demdata = []
      nodels[i].marker.setIcon(greyIcon)
    }
  }, null).set('labels',{ok:'Yes', cancel:'Cancel'})
}
