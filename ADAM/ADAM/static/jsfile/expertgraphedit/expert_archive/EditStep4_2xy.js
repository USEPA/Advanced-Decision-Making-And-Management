var timeunit
try {
  timeunit = document.getElementById("helper").getAttribute("time-unit");
} catch {
  timeunit = 'year'
}

function initgeomap(){
  geomap = new draw2d.Canvas('gfx_holder');
  ii = 0;
}

function zoomin(){
  zoom = geomap.getZoom()
  zoom = zoom/1.2
  geomap.setZoom(zoom, true)
}

function zoomout(){
  zoom = geomap.getZoom()
  zoom = zoom*1.2
  geomap.setZoom(zoom, true)
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
    content += '<br/> <p> Please specify demanded cap (product unit/' + timeunit + ')</p> <input class="ajs-input demcap' + id + '" type="number" value = ' + demdata[i].cap +' step = 10 min = 0 /> <br/> <p> Please specify demanded price (USD/product unit)</p> <input class="ajs-input demprice' + id + '" type="number" value = ' + demdata[i].price + ' step = 1 /> <br/> <button class = "btn default" style = "padding: 3px 10px" onclick="removeDemTable(\'' + String(id) + '\',\'' + String(i+1) + '\')">Remove</button> </div>'
  }

  return content
}

function removeDemTable(id, i){
  id =  '#deminfo' + String(id) + String(i)
  $(id).html("")
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
  //console.log('emptydeminfo' + String(id) + String(ii))
  //console.log(id)
  for (var j = 0; j < prodlist.length; j++){
      content +=   '<option value = "' + j + '"> ' + prodlist[j].name + ' (' + prodlist[j].unit + ')' + ' </option>'
  }
  content += '</select> </div> </div> <br/>'
  content += '<br/> <p> Please specify demanded cap (product unit/' + timeunit + ')</p> <input class="ajs-input demcap' + id + '" type="number" step = 10 min = 0 /> <br/> <p> Please specify demanded price (USD/product unit)</p> <input class="ajs-input demprice' + id + '" type="number"  step = 1 /> <br/> <button class = "btn default" style = "padding: 3px 10px" onclick="removeEmptyDemTable(\'' + String(id) + '\',\'' + String(ii) + '\')">Remove</button> </div>'

  content = content + '</div>'

  $(contentid).html(content)
}

function removeEmptyDemTable(id, i){
  id =  '#emptydeminfo' + String(id) + String(i)
  $(id).html("")
  //console.log(id)
}

function xynode(name){
  var figure = new draw2d.shape.basic.Circle({height: 20, width:20});
  figure.add(new draw2d.shape.basic.Label({text:name, stroke:0}), new draw2d.layout.locator.BottomLocator())
  var note = new draw2d.shape.note.PostIt()

  figure.add(note, new draw2d.layout.locator.TopLocator())
  var rawcolor = new draw2d.util.Color("#231F21")
  figure.resetPorts();
  figure.setBackgroundColor(rawcolor)
  figure.setColor(rawcolor.darker())

  figure.on("added", function(emitter, event){
    note.setVisible(true)
    note.setText('X: ' + Math.round(figure.x) + '\nY: ' + Math.round(figure.y))
  })

  figure.on("dblclick", function(emitter, event) {
    try {
      var id = figure.id
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
          //console.log(nodels[i].demdata)
          var newcolor
          if (nodels[i].demdata.length > 0){
            newcolor = new draw2d.util.Color("#70ae47")
          } else {
            newcolor = new draw2d.util.Color("#231F21")
          }
          figure.setBackgroundColor(newcolor);
          figure.setColor(newcolor.darker());
        }
      }).set('oncancel', function(closeEvent) {
        content = '<div id = "deminfo' + String(id) + '">'
        content = content +  ExistingDemTable(id) + '</div>' + addButton(id)
        alertify.confirm().destroy();
      })
    } catch(e) {alertify.error("Unknown error.")};
  })

  figure.setDraggable(false)
  figure.setSelectable(false)

  return figure
}

function extractValuesfromHTMLCollection(collection) {
  ls = []
  for (var j = 0; j < collection.length; j++){
    ls.push(collection[j].value)
  }
  return ls
}

function RescalexyMap(){
  if (nodels.length > 1){
    var maxX = Math.max.apply(Math, nodels.map(function(o) { return o.x; }))
    var minX = Math.min.apply(Math, nodels.map(function(o) { return o.x; }))
    var maxY = Math.max.apply(Math, nodels.map(function(o) { return o.y; }))
    var minY = Math.min.apply(Math, nodels.map(function(o) { return o.y; }))
    var w = $('#canvas_holder').width() * 0.9
    var h = $('#canvas_holder').height() * 0.9
    if (maxX > w || minX < 0 || maxY > h || minY < 0){
      kX = w/(maxX - minX)
      bX = -(minX)*w/(maxX - minX) + 25
      kY = h/(maxY - minY)
      bY = -(minY)*h/(maxY - minY) + 25
      for (var i = 0; i < nodels.length; i++){
        var figure = geomap.getFigure(nodels[i].nodeid);
        var oriX = nodels[i].x
        var oriY = nodels[i].y
        var newX = kX * oriX + bX
        var newY = kY * oriY + bY
        figure.setX(newX);
        figure.setY(newY);
        nodels[i].mapx = figure.x
        nodels[i].mapy = figure.y
      }
    }
  }
}

function xyloaddem(taskid){
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
          data: {csrfmiddlewaretoken: csrf_value, fileid: fileid, mode: 'xy', taskid: taskid},
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
                  newcolor = new draw2d.util.Color("#231F21")
                  var figure = geomap.getFigure(nodels[i].nodeid)
                  figure.setBackgroundColor(newcolor);
                  figure.setColor(newcolor.darker());
                }

                demdata = data.demdata
                for (var i = 1; i < demdata.length; i++){
                  var item = demdata[i]
                  var nodeIndex = findFigureByName(item[1])
                  var prodIndex = findProdIndexByAlia(item[2])
                  var price = item[3]
                  var cap = item[4]
                  nodels[nodeIndex].demdata.push({prodindex: prodIndex, cap: cap, price: price})
                  var newcolor
                  if (nodels[nodeIndex].demdata.length > 0){
                    newcolor = new draw2d.util.Color("#70ae47")
                  }
                  var figure = geomap.getFigure(nodels[nodeIndex].nodeid)
                  figure.setBackgroundColor(newcolor);
                  figure.setColor(newcolor.darker());
                  }
                demid = data.demid
                $('#xymapsave1').css("display", "");
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

function xyuploaddem(){
  var demuploadHTML = $('.dem_upload').html();
  $('.dem_upload').html("");
  alertify.confirm(demuploadHTML).set('onok', function(closeEvent) {
    $('#uploadbtm').click()
    $('.dem_upload').html(demuploadHTML);
  }).set('oncancel', function(closeEvent){
    $('.dem_upload').html(demuploadHTML);
  }).set('title', "Upload a demand data file").set('labels', {ok:'Upload', cancel:'Cancel'}).set('closable',false);
}

function xysavedem(taskid, onfile = false){
  var nodelsstring
  nodelsstring = JSON.stringify(nodels)
  console.log(nodelsstring)

  if (onfile == false) {
    alertify.prompt( 'Name your file', 'Please enter the name of new file:', '',
    function(evt, value) {
      var el = document.getElementsByName("csrfmiddlewaretoken");
      csrf_value = el[0].getAttribute("value");
      jQuery.ajax({
        method: "POST",
        url: "/expert/ajax/step4savedem",
        data: {name: value, content: nodelsstring, csrfmiddlewaretoken: csrf_value, taskid: taskid, mode: 'xy'},
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
        data: {content: nodelsstring, csrfmiddlewaretoken: csrf_value, taskid: taskid, mode: 'xy', demid: demid},
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

function xyucleardem() {
  alertify.confirm('Confirm', 'Clear all demand data?',
  function() {
    for (var i = 0; i < nodels.length; i++){
      nodels[i].demdata = []
      newcolor = new draw2d.util.Color("#231F21")
      var figure = geomap.getFigure(nodels[i].nodeid)
      figure.setBackgroundColor(newcolor);
      figure.setColor(newcolor.darker());
    }
  }, null).set('labels',{ok:'Yes', cancel:'Cancel'})
}
