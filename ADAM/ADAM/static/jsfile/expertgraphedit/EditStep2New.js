var timeunit
try {
  timeunit = document.getElementById("helper").getAttribute("time-unit");
} catch {
  timeunit = 'year'
}

var task_id
try {
  task_id = document.getElementById("helper").getAttribute("task-id");
} catch {
}

function initgeomap(center = [51.505, -0.09], zoom = 2){
  ii = 0
  mymap = L.map('gfx_holder').setView(center, zoom);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}', {
    foo: 'bar',
    attribution: 'Map data <a href="https://www.openstreetmap.org/">OpenStreetMap</a> under <a href="http://opendatacommons.org/licenses/odbl/1.0/">ODbL</a>',
    maxZoom: 18,
}).addTo(mymap);

  mymap.on('contextmenu', function(ev) {
    latlng = ev.latlng
    addNewSup(latlng.lat, latlng.lng)
});

  mymap.on('keypress', function(ev) {
    var keyName = event.key;
    if (keyName == 'z') {
      changeZoom()
    }
  })

  goldIcon = new L.Icon({
  iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [18.75, 30.75],
  iconAnchor: [9, 30.75],
  popupAnchor: [0.75, -8.5],
  shadowSize: [30.75, 30.75]});

  var legend = L.control({position: 'bottomleft'});
    legend.onAdd = function (mymap) {

    var div = L.DomUtil.create('div', 'card');
    labels = ['<strong>Categories</strong>'],
    categories = ['Supply'];
    color = ['gold']

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

function changeZoom(){
 if (markerls.length >= 2) {
   var latlonls = []
   for (var i = 0; i < markerls.length; i++) {
     latlonls.push([markerls[i].getLatLng().lat, markerls[i].getLatLng().lng])
   }
   mymap.fitBounds(latlonls)
  }
}

function findMarkerByID(id){
  for (var i = 0; i < markerls.length; i++){
    if (markerls[i].id == id){
      return i
    }
  }
  return
}

function findMarkerByLatLng(lat,lng) {
  for (var j = 0; j < markerls.length; j++){
    if (Math.abs(markerls[j].getLatLng().lat - lat) < 0.001 && Math.abs(markerls[j].getLatLng().lng - lng) < 0.001) {
      return [true, j]
    }
  }
  return [false,-1]
}

function findProdIndexByID(id){
  for (var i = 0; i < prodlist.length; i++){
    if (prodlist[i].id == id){
      return i
    }
  }
  return
}

// Supply form - frame
function supForm(nodename = "", lat = "", lng = "", data = [{name:"default", price:"0", cap:"0"}]) {
  formid = 'supform' + makeid(8)
  var content = '<div class = "container" id = "'+ formid +'"><h5>General Information</h5><div class="form-group"> <label>Name</label>  <input class="form-control" id = "name" type="text" placeholder = "Name" value = "' + nodename + '"/> </div><div class="form-group"> <label>Location</label> <div class="input-group"><input type="number" aria-label="Latitude" class="form-control" id = "lat" placeholder = "Latitude" value = "' + lat + '"><input type="number" aria-label="Longitude" class="form-control" id = "lng" placeholder = "Longitude" value = "' + lng + '"></div></div>'
  for (i = 0; i < data.length; i++){
    if (i == 0){
      content += supContent(formid, false, data[i].name, data[i].price, data[i].cap)
    }
    else {
      content += supContent(formid, true, data[i].name, data[i].price, data[i].cap)
    }
  }
  content += '</div>'
  content += '<ion-icon name="add-circle-outline" class = "iconpiclarger" style = "color:#9A0000; cursor: pointer;" onclick = "addSupContent(\''+formid+'\')" ></ion-icon>'
  return [content, formid]
}

// Supply form - supply content
function supContent(formid, removable = false, name = "default", price = "0", cap = "0") {
  var contentid = 'supcontent' + makeid(8)
  var content = ' <div id = "'+ contentid + '"><br/><div class = "row"> <div class = "col text-left"><h5> Supply Information </h5></div>'
  if (removable) {
    content += '<div class = "col text-right"><ion-icon name="remove-circle-outline" class = "iconpiclarger" style = "color:#9A0000; cursor: pointer;" onclick = "removeSupContent(\''+contentid+'\')"></ion-icon></div>'
  }
  content += '</div> <div class="form-group"> <label>Supplied feedstock</label> <select name="supprod" class = "custom-select prodtype" onchange = "addprod()"><option value = "defaultoption" disabled selected> Select a feedstock </option>'//<option value = "ADD"> Add a feedstock </option>
  for (var j = 0; j < prodlist.length; j++){
    if (name != prodlist[j].id) {
      content +=   '<option value = "' + prodlist[j].id + '"> p' + prodlist[j].id + ' - ' + prodlist[j].name + ' - ' + prodlist[j].unit + ' </option>'
    } else {
      content +=   '<option value = "' + prodlist[j].id + '" selected > p' + prodlist[j].id + ' - ' + prodlist[j].name + ' - ' + prodlist[j].unit + '</option>'
    }
  }
  content += '</select> </div>'
  content += '<div class="form-group"> <label>Supplied capacity (product unit/' + timeunit + ')</label>  <input class="form-control prodcap " type="number" value = ' + cap + ' min = 0 /> </div> <div class="form-group"> <label> Supplied price (USD/product unit) </label> <input class="form-control prodprice" type="number" value = ' + price + ' /></div></div>'

  return content
}

function addprod(){
  if ($(".prodtype").val() == 'ADD') {
    alertify.confirm().close()
    supConfirm(task_id, url = '/expert/usermain/prodbase?task='+task_id+'&type=sup')
  }
}

// Add a supply content form to the frame
function addSupContent(formid, name = "default", price = "0", cap = "0") {
  // Need to extract values manually
  var lat = $('#lat').val()
  var lng = $('#lng').val()
  var name = $('#name').val()
  var data = []
  for (i = 0; i < $('.prodcap').length; i++) {
    item = {name: $('.prodtype')[i].value, price: $('.prodprice')[i].value, cap: $('.prodcap')[i].value}
    data.push(item)
  }
  // add an empty form
  var content = $('#'+formid).html()
  content = content  + supContent(formid, removable = true)
  $('#'+formid).html(content)
  // Set values manually
  $('#lat').val(lat)
  $('#lng').val(lng)
  $('#name').val(name)
  for (i = 0; i < $('.prodcap').length - 1; i++) {
    $('.prodtype')[i].value = data[i].name
    $('.prodprice')[i].value = data[i].price
    $('.prodcap')[i].value = data[i].cap
  }
}

// Remove a supply content from from the frame
function removeSupContent(contentid) {
  $('#'+contentid).html("")
}

// Add a new, blank supply node
function addNewSup(latinput = false, lnginput = false){
  if (latinput && lnginput){
    content = supForm(nodename = "", lat = latinput, lng = lnginput)[0]
  } else {
    content = supForm()[0]
  }
  alarm = alertify.confirm(content)

  alarm.set('onok', function(closeEvent) {
      var lat = $('#lat').val()
      var lng = $('#lng').val()

    var name = $('#name').val()
    if (name.length == 0) {
      name = "Anon."
    }
    var data = []

    for (i = 0; i < $('.prodcap').length; i++) {
      item = {name: $('.prodtype')[i].value, price: $('.prodprice')[i].value, cap: $('.prodcap')[i].value}
      data.push(item)
    }

    var marker = newmarker(lat,lng,name,data).addTo(mymap)
    markerls.push(marker)
    changeZoom();

    alarm.destroy();
  }).set('oncancel', function(closeEvent) {alarm.destroy();}).set('title', 'Add a Supply').set('closable',true).set('labels', {ok:'Ok', cancel:'Cancel'})
}

// Define a supply marker
function newmarker(lat, lon, name, data){

  var id = makeid(8)
  var marker = L.marker([lat, lon], {
    title: name     ,
    draggable: true,
    icon: goldIcon} )
  marker.name = name
  marker.id = id
  marker.data = data
  var pop = marker.bindTooltip("<b>"+marker.name + "</b>")

  marker.on('dblclick', (event)=>{
    val = supForm(nodename = marker.name, lat = marker.getLatLng().lat, lng = marker.getLatLng().lng, marker.data)
    marker.content = val[0]
    formid = val[1]

      alertify.confirm(marker.content).set('title', 'Supply Information').set('onok', function(closeEvent) {
        var lat = $('#lat').val()
        var lng = $('#lng').val()
        var name = $('#name').val()
        var data = []

        for (i = 0; i < $('.prodcap').length; i++) {
          item = {name: $('.prodtype')[i].value, price: $('.prodprice')[i].value, cap: $('.prodcap')[i].value}
          data.push(item)
        }
        marker.setLatLng(L.latLng(lat, lng))
        marker.name = name
        if (marker.name.length == 0) {
          marker.name = "Anon."
        }
        marker.data = data
        marker.unbindTooltip()
        var pop = marker.bindTooltip("<b>"+marker.name + "</b>")
        alertify.confirm().destroy()
      }).set('oncancel', function(closeEvent) {
        alertify.confirm().destroy();
      }).set('closable',true).set('labels', {ok:'Ok', cancel:'Cancel'})
        });

  marker.on('contextmenu',(event)=>{
    alertify.confirm('Delete', 'Delete this supply?',
    function() {
      marker.removeFrom(mymap);
      markerls.splice(findMarkerByID(marker.id),1)
    }, null).set('labels',{ok:'Yes', cancel:'Cancel'}).set('closable',true)
  })

  return marker
}

// Embedded simplified database
function lookForProd(){
  var content = ' <div class = "row"> <div class = "col text-left"><h5> Product Database </h5></div></div>'
  content += ' <div class="form-group"> <label>Feedstock</label> <select name="supprod" class = "custom-select" id = "prodtype" onchange = "updateProdInfo()" >'
  content += '<option value = "default" disabled selected> Please select a feedstock </option> '//<option value = "ADD"> Add a feedstock </option>
  for (var j = 0; j < prodlist.length; j++){
      content +=   '<option value = "' + prodlist[j].id + '"> ' + prodlist[j].name + ' - p' + prodlist[j].id +  ' </option>'
  }
  content += '</select> </div><div id = "prodsummary"> </div>'

  alertify.alert(content).set('title', 'Product Database').set('onok', function(closeEvent) {
    alertify.alert().destroy()
  }).set('closable',true).set('label', 'Close')
}

function updateProdInfo() {
  prodid = $('#prodtype').val()
  if (prodid == 'ADD') {
    alertify.confirm().close()
    supConfirm(task_id, url = '/expert/usermain/prodbase?task='+task_id+'&type=sup')
  } else {

  i = findProdIndexByID(prodid)
  var content = '<br/><h5>Basic Information</h5><div class = "container text-left" style = "width: 100%;" > <ul class="list-group"> <li class="list-group-item"><strong>Feedstock Name: </strong>  ' + prodlist[i].name + ' </li> <li class="list-group-item"><strong> Feedstock ID: </strong> p' + prodlist[i].id + '</li><li class="list-group-item"><strong>Unit: </strong>' + prodlist[i].unit + '</li> <li class="list-group-item"><strong>Transport Cost (USD/unit/km): </strong>' + prodlist[i].transcost + '</li> <li class="list-group-item"><strong>Description: </strong>' + prodlist[i].note + '</li> </ul> </div><br/> <h5>Related Technology</h5><div class = "row"> <table width = 100% class = "table text-center table-hover"> <thead> <tr> <th>Technology Name</th> <th>Role</th></tr></thead><tbody>'
  for (j = 0; j < prodlist[i].transformationset.length; j++) {
    content += '<tr><td>' + prodlist[i].transformationset[j].techname + '</td>'
    if (Number(prodlist[i].transformationset[j].yield) > 0 ) {
      content += '<td>Outflow</td>'
    } else {
      content += '<td>Inflow</td>'
    }
    content += '</tr>'
  }
  content += '</tbody></table></div>'

  $('#prodsummary').html(content)
  }
}

// Clear all markers on the map
function supClear() {
  alertify.confirm('Confirm', 'Clear all supply?',
  function() {
    for (var i = 0; i < markerls.length; i++){
      markerls[i].removeFrom(mymap)
    }
    markerls = []
  }, null).set('labels',{ok:'Yes', cancel:'Cancel'}).set('closable',true)
}

// Load a supply data file
function supLoad(taskid){
  var supfileHTML = $('.select_sup').html();
  $('.select_sup').html("");
    alertify.confirm(supfileHTML).set('onok', function(closeEvent) {
      var fileid = $('#supfileselection').val();

        if (fileid > 0){

          ajaxRequestSupData(fileid);
        }
      $('#supfileselection')[0].value = '';
      $('.select_sup').html(supfileHTML);
      alertify.confirm().destroy();
    }).set('oncancel', function(closeEvent){
      $('#supfileselection')[0].value = '';
      $('.select_sup').html(supfileHTML);
      alertify.confirm().destroy();
    }).set('title', "Load a supply file").set('labels', {ok:'Ok', cancel:'Cancel'}).set('closable',true);;
}

function ajaxRequestSupData(fileid) {
  var el = document.getElementsByName("csrfmiddlewaretoken");
  var csrf_value = el[0].getAttribute("value");
  console.log(csrf_value)
  jQuery.ajax({
    method: "POST",
    url: "/expert/ajax/supfileselection",
    data: {csrfmiddlewaretoken: csrf_value, fileid: fileid},
    success: function (data) {
      if (data) {
        if (data.msg.length > 0 ) {
          for (var i = 0; i < data.msg.length; i++){
            alertify.notify(data.msg[i], 'error', 10, null);
          }
        } else {

          for (var i = 0; i < markerls.length; i++){
            markerls[i].removeFrom(mymap)
          }
          supdata = data.supdata
          for (i = 1; i < supdata.length; i++) {
            var lat = Number(supdata[i][1])
            var lng = Number(supdata[i][2])

            var value = findMarkerByLatLng(lat,lng)
            var flag = value[0]
            var index = value[1]
            if (flag) {
              if (supdata[i][0] != markerls[index].name){
                markerls[index].name = markerls[index].name + ' ' + supdata[i][0]
                markerls[index].unbindTooltip()
                var pop = markerls[index].bindTooltip("<b>"+markerls[index].name + "</b>")
              }
              markerls[index].data.push({name: supdata[i][3].slice(1), price: Number(supdata[i][4]), cap: Number(supdata[i][5])})
            } else {
              var name = supdata[i][0]
              if (name.length == 0) {
                name = "Anon."
              }
              var data = [{name: supdata[i][3].slice(1), price: Number(supdata[i][4]), cap: Number(supdata[i][5])}]
              var marker = newmarker(lat,lng,name,data)
              markerls.push(marker)
            }

          }
          for (i = 0; i < markerls.length; i++) {
            markerls[i].addTo(mymap)
          }
          changeZoom();
        }
      }

    }
  });
}

function supUpload(){
  var supuploadHTML = $('.sup_upload').html();
  $('.sup_upload').html("");
  alertify.confirm(supuploadHTML).set('onok', function(closeEvent) {
    var el = document.getElementsByName("csrfmiddlewaretoken");
    csrf_value = el[0].getAttribute("value");
    var formData = new FormData();
    formData.append('datafile', $('#id_datafile')[0].files[0]);
    formData.append('datanotes', $('#id_datanotes').val())
    formData.append('csrfmiddlewaretoken', csrf_value);
    $.ajax({
      type: "POST",
      url: "/expert/ajax/supfileupload",
      processData: false,
      contentType: false,
      data: formData,
      async: false,
      success: function (data) {
        fileid = data.fileid
        $('#overlaycontainer2').css('display','block')
      }
    });
    ajaxRequestSupData(fileid);
    $('#overlaycontainer2').css('display',"none")
    $('.sup_upload').html(supuploadHTML);
  }).set('oncancel', function(closeEvent){
    $('.sup_upload').html(supuploadHTML);
  }).set('title', "Upload a supply data file").set('labels', {ok:'Upload', cancel:'Cancel'}).set('closable',true);
}

function supConfirm(taskid, url = false){
  var suplatls = []
  var suplngls = []
  var supprols = []
  var supcapls = []
  var supbidls = []
  var supnames = []
  var ajaxurl
  if (url){
    ajaxurl = url
  } else {
    ajaxurl = '/expert/usermain/task/'+ taskid + '/3'
  }
  // Extract data
  for (var i = 0; i< markerls.length; i++){
    for (j = 0; j<markerls[i].data.length; j++){
      suplatls.push(markerls[i].getLatLng().lat)
      suplngls.push(markerls[i].getLatLng().lng)
      supprols.push(markerls[i].data[j].name)
      supcapls.push(markerls[i].data[j].cap)
      supbidls.push(markerls[i].data[j].price)
      supnames.push(markerls[i].name)
    }
  }
  suplatls = JSON.stringify(suplatls)
  suplngls = JSON.stringify(suplngls)
  supcapls = JSON.stringify(supcapls)
  supprols = JSON.stringify(supprols)
  supbidls = JSON.stringify(supbidls)
  supnames = JSON.stringify(supnames)

    alertify.confirm('Confirm', 'Save supply data?',
    function() {
      var el = document.getElementsByName("csrfmiddlewaretoken");
      csrf_value = el[0].getAttribute("value");
      jQuery.ajax({
        method: "POST",
        url: "/expert/ajax/step2savesup",
        data: {suplatls: suplatls, suplngls: suplngls, supprols: supprols, supcapls: supcapls, supbidls: supbidls, csrfmiddlewaretoken: csrf_value, taskid: taskid, supnames: supnames},
        success: function (data) {
          if (data.msg) {
            $('#overlaycontainer').css('display','block')
            setTimeout(function(){
            location.href = ajaxurl; }, 1500);
          }
        }
      });
  },
    null).set('labels',{ok:'Yes', cancel:'Cancel'});
}
