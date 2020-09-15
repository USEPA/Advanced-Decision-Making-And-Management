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
    categories = ['Node','Supply'];
    color = ['grey', 'gold']

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

function ExistingSupTable(id){
  index = findFigureByID(id)
  supdata = nodels[index].supdata
  var content = ''
  for (var i = 0; i < supdata.length; i++){
    content += '<div id = "supinfo' + String(id) + String(i+1) + '"> <h4> Supply Info ' + (i+1) + '</h4> <br/> <div> <p>Please select the supplied product</p> <br/> <div class="selectdiv"> <select name="supprod" class = "supprod' + id + '">'
    //console.log('supinfo' + id + (i+1))
    for (var j = 0; j < prodlist.length; j++){
      if (supdata[i].prodindex != j) {
        content +=   '<option value = "' + j + '"> ' + prodlist[j].name + ' (' + prodlist[j].unit + ')' + ' </option>'
      } else {
        content +=   '<option value = "' + j + '" selected > ' + prodlist[j].name + ' (' + prodlist[j].unit + ')' + ' </option>'
      }
    }
    content += '</select> </div> </div> <br/>'
    content += '<br/> <p> Please specify supplied amount (product unit/' + timeunit + ') </p> <input class="ajs-input supamount' + id + '" type="number" value = ' + supdata[i].amount +' step = 10 min = 0 /> <br/> <p> Please specify supplied price (USD/product unit) </p> <input class="ajs-input supprice' + id + '" type="number" value = ' + supdata[i].price + ' step = 1 /> <br/> <button class = "btn default" style = "padding: 3px 10px" onclick="removeSupTable(\'' + String(id) + '\',\'' + String(i+1) + '\')">Remove</button> </div>'
  }

  return content
}

function removeSupTable(id, i){
  id =  '#supinfo' + String(id) + String(i)
  $(id).html("")
  //console.log(id)
}

function addButton(id){
  return '<br/> <button class = "btn default" style = "padding: 3px 10px" onclick="addEmptySup(\'' + id + '\')">Add Supply Info</button>'
}

function addEmptySup(id){
  ii ++
  var contentid = '#supinfo' + String(id)
  var original = $(contentid).html()
  var content = '<div id = "supinfo' + String(id) + '">'
  content = content + original
  content += '<div id = "emptysupinfo' + String(id) + String(ii) + '"> <h4> Supply Info' + '</h4> <br/> <div> <p>Please select the supplied product</p> <br/> <div class="selectdiv"> <select name="supprod" class = "supprod' + id + '">'

  for (var j = 0; j < prodlist.length; j++){
      content +=   '<option value = "' + j + '"> ' + prodlist[j].name + ' (' + prodlist[j].unit + ')' +  ' </option>'
  }
  content += '</select> </div> </div> <br/>'
  content += '<br/> <p> Please specify supplied amount (product unit/' + timeunit + ')</p> <input class="ajs-input supamount' + id + '" type="number" step = 10 min = 0 /> <br/> <p> Please specify supplied price (USD/product unit) </p> <input class="ajs-input supprice' + id + '" type="number"  step = 1 /> <br/> <button class = "btn default" style = "padding: 3px 10px" onclick="removeEmptySupTable(\'' + String(id) + '\',\'' + String(ii) + '\')">Remove</button> </div>'

  content = content + '</div>'

  $(contentid).html(content)
}

function removeEmptySupTable(id, i){
  id =  '#emptysupinfo' + String(id) + String(i)
  $(id).html("")
}

function newmarker(lat, lon, name){

  var id = makeid(8)
  var marker = L.marker([lat, lon], {
    title: name,
    draggable: false,
    icon: greyIcon} )

  marker.on('dblclick', (event)=>{
      var content = '<div id = "supinfo'+ String(id) + '">'
      content = content +  ExistingSupTable(id) + '</div>' + addButton(id)
      //console.log(content)
      alertify.confirm(content).set('title', 'Supply Information').set('onok', function(closeEvent) {
        var prods = extractValuesfromHTMLCollection(document.getElementsByClassName('supprod' + id))
        var amounts = extractValuesfromHTMLCollection(document.getElementsByClassName('supamount' + id))
        var prices = extractValuesfromHTMLCollection(document.getElementsByClassName('supprice' + id))
        var i = findFigureByID(id)
        // check if information is entered
        var flag = false
        for (var j = 0; j<prods.length; j++){
          if (prods[j] == ""){
            flag = true
          }
          if (amounts[j] == ""){
            flag = true
          }
          if (prices[j] == ""){
            flag = true
          }
        }

        if (flag){
          alertify.error("Please enter required information.")
        } else {
          nodels[i].supdata = []
          for (var j = 0; j < prods.length; j++){
            nodels[i].supdata.push({prodindex: prods[j], amount: amounts[j], price: prices[j]})
          }
          if (nodels[i].supdata.length > 0){
            nodels[i].marker.setIcon(goldIcon)
          } else {
            nodels[i].marker.setIcon(greyIcon)
          }
        }
      }).set('oncancel', function(closeEvent) {
        content = '<div id = "supinfo' + String(id) + '">'
        content = content +  ExistingSupTable(id) + '</div>' + addButton(id)
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

function geoloadsup(taskid){
  var supfileHTML = $('.select_sup').html();
  $('.select_sup').html("");
    alertify.confirm(supfileHTML).set('onok', function(closeEvent) {
      var fileid = $('#supfileselection').val();
        var el = document.getElementsByName("csrfmiddlewaretoken");
        csrf_value = el[0].getAttribute("value");
        if (fileid > 0){
        jQuery.ajax({
          method: "POST",
          url: "/expert/ajax/supfileselection",
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
                  nodels[i].supdata = []
                  nodels[i].marker.setIcon(greyIcon)
                }
                supdata = data.supdata
                for (var i = 1; i < supdata.length; i++){
                  var item = supdata[i]
                  var nodeIndex = findFigureByName(item[1])
                  var prodIndex = findProdIndexByAlia(item[2])
                  var price = item[3]
                  var amount = item[4]
                  nodels[nodeIndex].supdata.push({prodindex: prodIndex, amount: amount, price: price})
                  if (nodels[nodeIndex].supdata.length > 0){
                    nodels[nodeIndex].marker.setIcon(goldIcon)
                  }
                }
                supid = data.supid
                $('#geomapsave1').css("display", "");
              }
            }

          }
        });}
      $('#supfileselection')[0].value = '';
      $('.select_sup').html(supfileHTML)
    }).set('oncancel', function(closeEvent){
      $('#supfileselection')[0].value = '';
      $('.select_sup').html(supfileHTML)
    }).set('title', "Load a supply file").set('labels', {ok:'Ok', cancel:'Cancel'}).set('closable',false);;
}

function geouploadsup(){
  var supuploadHTML = $('.sup_upload').html();
  $('.sup_upload').html("");
  alertify.confirm(supuploadHTML).set('onok', function(closeEvent) {
    $('#uploadbtm').click()
    $('.sup_upload').html(supuploadHTML);
  }).set('oncancel', function(closeEvent){
    $('.sup_upload').html(supuploadHTML);
  }).set('title', "Upload a supply data file").set('labels', {ok:'Upload', cancel:'Cancel'}).set('closable',false);
}

function geosavesup(taskid, onfile = false){
  var nodelsstring = []
  for (var i = 0; i< nodels.length; i++){
    nodelsstring.push({nodename: nodels[i].nodename, nodeid: nodels[i].nodeid, lat: nodels[i].lat, lon: nodels[i].lon, supdata:nodels[i].supdata})
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
        url: "/expert/ajax/step4savesup",
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
        url: "/expert/ajax/step4savechangesup",
        data: {content: nodelsstring, csrfmiddlewaretoken: csrf_value, taskid: taskid, mode: 'geo', supid: supid},
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

function geouclearsup() {
  alertify.confirm('Confirm', 'Clear all supply data?',
  function() {
    for (var i = 0; i < nodels.length; i++){
      nodels[i].supdata = []
      nodels[i].marker.setIcon(greyIcon)
    }
  }, null).set('labels',{ok:'Yes', cancel:'Cancel'})
}
