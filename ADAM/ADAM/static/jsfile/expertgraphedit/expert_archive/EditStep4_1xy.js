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
    content += '<br/> <p> Please specify supplied amount (product unit/' + timeunit + ')</p> <input class="ajs-input supamount' + id + '" type="number" value = ' + supdata[i].amount +' step = 10 min = 0 /> <br/> <p> Please specify supplied price (USD/product unit)</p> <input class="ajs-input supprice' + id + '" type="number" value = ' + supdata[i].price + ' step = 1 /> <br/> <button class = "btn default" style = "padding: 3px 10px" onclick="removeSupTable(\'' + String(id) + '\',\'' + String(i+1) + '\')">Remove</button> </div>'
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
  //console.log('emptysupinfo' + String(id) + String(ii))
  //console.log(id)
  for (var j = 0; j < prodlist.length; j++){
      content +=   '<option value = "' + j + '"> ' + prodlist[j].name + ' (' + prodlist[j].unit + ')' + ' </option>'
  }
  content += '</select> </div> </div> <br/>'
  content += '<br/> <p> Please specify supplied amount (product unit/' + timeunit + ')</p> <input class="ajs-input supamount' + id + '" type="number" step = 10 min = 0 /> <br/> <p> Please specify supplied price (USD/product unit)</p> <input class="ajs-input supprice' + id + '" type="number"  step = 1 /> <br/> <button class = "btn default" style = "padding: 3px 10px" onclick="removeEmptySupTable(\'' + String(id) + '\',\'' + String(ii) + '\')">Remove</button> </div>'

  content = content + '</div>'

  $(contentid).html(content)
}

function removeEmptySupTable(id, i){
  id =  '#emptysupinfo' + String(id) + String(i)
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
          //console.log(nodels[i].supdata)
          var newcolor
          if (nodels[i].supdata.length > 0){
            newcolor = new draw2d.util.Color("#efd915")
          } else {
            newcolor = new draw2d.util.Color("#231F21")
          }
          figure.setBackgroundColor(newcolor);
          figure.setColor(newcolor.darker());
        }
      }).set('oncancel', function(closeEvent) {
        content = '<div id = "supinfo' + String(id) + '">'
        content = content +  ExistingSupTable(id) + '</div>' + addButton(id)
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

function xyloadsup(taskid){
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
                  nodels[i].supdata = []
                  newcolor = new draw2d.util.Color("#231F21")
                  var figure = geomap.getFigure(nodels[i].nodeid)
                  figure.setBackgroundColor(newcolor);
                  figure.setColor(newcolor.darker());
                }

                supdata = data.supdata
                for (var i = 1; i < supdata.length; i++){
                  var item = supdata[i]
                  var nodeIndex = findFigureByName(item[1])
                  var prodIndex = findProdIndexByAlia(item[2])
                  var price = item[3]
                  var amount = item[4]
                  nodels[nodeIndex].supdata.push({prodindex: prodIndex, amount: amount, price: price})
                  var newcolor
                  if (nodels[nodeIndex].supdata.length > 0){
                    newcolor = new draw2d.util.Color("#efd915")
                  }
                  var figure = geomap.getFigure(nodels[nodeIndex].nodeid)
                  figure.setBackgroundColor(newcolor);
                  figure.setColor(newcolor.darker());
                  }
                supid = data.supid
                $('#xymapsave1').css("display", "");
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

function xyuploadsup(){
  var supuploadHTML = $('.sup_upload').html();
  $('.sup_upload').html("");
  alertify.confirm(supuploadHTML).set('onok', function(closeEvent) {
    $('#uploadbtm').click()
    $('.sup_upload').html(supuploadHTML);
  }).set('oncancel', function(closeEvent){
    $('.sup_upload').html(supuploadHTML);
  }).set('title', "Upload a supply data file").set('labels', {ok:'Upload', cancel:'Cancel'}).set('closable',false);
}

function xysavesup(taskid, onfile = false){
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
        url: "/expert/ajax/step4savesup",
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
        url: "/expert/ajax/step4savechangesup",
        data: {content: nodelsstring, csrfmiddlewaretoken: csrf_value, taskid: taskid, mode: 'xy', supid: supid},
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

function xyuclearsup() {
  alertify.confirm('Confirm', 'Clear all supply data?',
  function() {
    for (var i = 0; i < nodels.length; i++){
      nodels[i].supdata = []
      newcolor = new draw2d.util.Color("#231F21")
      var figure = geomap.getFigure(nodels[i].nodeid)
      figure.setBackgroundColor(newcolor);
      figure.setColor(newcolor.darker());
    }
  }, null).set('labels',{ok:'Yes', cancel:'Cancel'})
}
