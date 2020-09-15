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
    categories = ['Node','Existing Tech'];
    color = ['grey','blue']

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

function ExistingSiteTable(id){
  index = findFigureByID(id)
  sitedata = nodels[index].sitedata
  var content = ''
  for (var i = 0; i < sitedata.length; i++){
    content += '<div id = "siteinfo' + String(id) + String(i+1) + '"> <h4> Existing Tech Info ' + (i+1) + '</h4> <br/> <div> <p>Please select the installed technology</p> <br/> <div class="selectdiv"> <select name="sitetech" class = "sitetech' + id + '">'

    for (var j = 0; j < techlist.length; j++){
      if (sitedata[i].techindex != j) {
        content +=   '<option value = "' + j + '"> ' + techlist[j].name + ' (Reference prod: ' + techlist[j].refprod  + ', ' + techlist[j].unit + ')' + ' </option>'
      } else {
        content +=   '<option value = "' + j + '" selected > ' + techlist[j].name + ' (Reference prod: ' + techlist[j].refprod  + ', ' + techlist[j].unit + ')' + ' </option>'
      }
    }
    content += '</select> </div> </div> <br/>'
    content += '<br/> <p> Please specify technology cap (reference prod unit/' + timeunit + ')</p> <input class="ajs-input sitecap' + id + '" type="number" value = ' + sitedata[i].cap +' step = 10 min = 0 /> <br/> <button class = "btn default" style = "padding: 3px 10px" onclick="removeSiteTable(\'' + String(id) + '\',\'' + String(i+1) + '\')">Remove</button> </div>'
  }

  return content
}

function removeSiteTable(id, i){
  id =  '#siteinfo' + String(id) + String(i)
  $(id).html("")
}

function addButton(id){
  return '<br/> <button class = "btn default" style = "padding: 3px 10px" onclick="addEmptySite(\'' + id + '\')">Add Existing Tech Info</button>'
}

function addEmptySite(id){
  ii ++
  var contentid = '#siteinfo' + String(id)
  var original = $(contentid).html()
  var content = '<div id = "siteinfo' + String(id) + '">'
  content = content + original
  content += '<div id = "emptysiteinfo' + String(id) + String(ii) + '"> <h4> Existing Tech Info' + '</h4> <br/> <div> <p>Please select the installed technology</p> <br/> <div class="selectdiv"> <select name="sitetech" class = "sitetech' + id + '">'

  for (var j = 0; j < techlist.length; j++){
      content +=   '<option value = "' + j + '"> ' + techlist[j].name + ' (Reference prod: ' + techlist[j].refprod  + ', ' + techlist[j].unit + ')' + ' </option>'
  }
  content += '</select> </div> </div> <br/>'
  content += '<br/> <p> Please specify technology cap (reference prod unit/' + timeunit + ')</p> <input class="ajs-input sitecap' + id + '" type="number" step = 10 min = 0 /> <br/> <button class = "btn default" style = "padding: 3px 10px" onclick="removeEmptySiteTable(\'' + String(id) + '\',\'' + String(ii) + '\')">Remove</button> </div>'

  content = content + '</div>'

  $(contentid).html(content)
}

function removeEmptySiteTable(id, i){
  id =  '#emptysiteinfo' + String(id) + String(i)
  $(id).html("")
}

function newmarker(lat, lon, name){

  var id = makeid(8)
  var marker = L.marker([lat, lon], {
    title: name,
    draggable: false,
    icon: greyIcon} )

  marker.on('dblclick', (event)=>{
      var content = '<div id = "siteinfo'+ String(id) + '">'
      content = content +  ExistingSiteTable(id) + '</div>' + addButton(id)
      //console.log(content)
      alertify.confirm(content).set('title', 'Existing Tech Information').set('onok', function(closeEvent) {
        var techs = extractValuesfromHTMLCollection(document.getElementsByClassName('sitetech' + id))
        var caps = extractValuesfromHTMLCollection(document.getElementsByClassName('sitecap' + id))
        var i = findFigureByID(id)
        // check if information is entered
        var flag = false
        for (var j = 0; j<techs.length; j++){
          if (techs[j] == ""){
            flag = true
          }
          if (caps[j] == ""){ //need to check cap between capmin and capmax
            flag = true
          }
        }

        if (flag){
          alertify.error("Please enter required information.")
        } else {
          nodels[i].sitedata = []

          for (var j = 0; j < techs.length; j++){
            nodels[i].sitedata.push({techindex: techs[j], cap: caps[j]})
          }

          if (nodels[i].sitedata.length > 0){
            nodels[i].marker.setIcon(blueIcon)
          } else {
            nodels[i].marker.setIcon(greyIcon)
          }
        }

      }).set('oncancel', function(closeEvent) {
        content = '<div id = "siteinfo' + String(id) + '">'
        content = content +  ExistingSiteTable(id) + '</div>' + addButton(id)
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

function geoloadsite(taskid){
  var sitefileHTML = $('.select_site').html();
  $('.select_site').html("");
    alertify.confirm(sitefileHTML).set('onok', function(closeEvent) {
        var fileid = $('#sitefileselection').val();
        var el = document.getElementsByName("csrfmiddlewaretoken");
        csrf_value = el[0].getAttribute("value");
        if (fileid > 0){
        jQuery.ajax({
          method: "POST",
          url: "/expert/ajax/sitefileselection",
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
                  nodels[i].sitedata = []
                  nodels[i].marker.setIcon(greyIcon)
                }
                sitedata = data.sitedata
                for (var i = 1; i < sitedata.length; i++){
                  var item = sitedata[i]
                  var nodeIndex = findFigureByName(item[1])
                  var techIndex = findTechIndexByAlia(item[2])
                  var cap = item[3]
                  nodels[nodeIndex].sitedata.push({techindex: techIndex, cap: cap})
                  if (nodels[nodeIndex].sitedata.length > 0){
                    nodels[nodeIndex].marker.setIcon(blueIcon)
                  }
                }
                siteid = data.siteid
                $('#geomapsave1').css("display", "");
              }
            }

          }
        });}
      $('#sitefileselection')[0].value = '';
      $('.select_site').html(sitefileHTML)
    }).set('oncancel', function(closeEvent){
      $('#sitefileselection')[0].value = '';
      $('.select_site').html(sitefileHTML)
    }).set('title', "Load an existing tech file").set('labels', {ok:'Ok', cancel:'Cancel'}).set('closable',false);;
}

function geouploadsite(){
  var siteuploadHTML = $('.site_upload').html();
  $('.site_upload').html("");
  alertify.confirm(siteuploadHTML).set('onok', function(closeEvent) {
    $('#uploadbtm').click()
    $('.site_upload').html(siteuploadHTML);
  }).set('oncancel', function(closeEvent){
    $('.site_upload').html(siteuploadHTML);
  }).set('title', "Upload an existing tech data file").set('labels', {ok:'Upload', cancel:'Cancel'}).set('closable',false);
}

function geosavesite(taskid, onfile = false){
  var nodelsstring = []
  for (var i = 0; i< nodels.length; i++){
    nodelsstring.push({nodename: nodels[i].nodename, nodeid: nodels[i].nodeid, lat: nodels[i].lat, lon: nodels[i].lon, sitedata:nodels[i].sitedata})
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
        url: "/expert/ajax/step4savesite",
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
        url: "/expert/ajax/step4savechangesite",
        data: {content: nodelsstring, csrfmiddlewaretoken: csrf_value, taskid: taskid, mode: 'geo', siteid: siteid},
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

function geouclearsite() {
  alertify.confirm('Confirm', 'Clear all existing tech data?',
  function() {
    for (var i = 0; i < nodels.length; i++){
      nodels[i].sitedata = []
      nodels[i].marker.setIcon(greyIcon)
    }
  }, null).set('labels',{ok:'Yes', cancel:'Cancel'})
}
