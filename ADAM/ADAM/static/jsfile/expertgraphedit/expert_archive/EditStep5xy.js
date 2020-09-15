function initgeomap(){
  geomap = new draw2d.Canvas('gfx_holder');
  ii = 0;
  prod = 0
  transdataprod = []
  arcset = []
  html5Slider = false

  geomap.installEditPolicy( new draw2d.policy.connection.DragConnectionCreatePolicy({
  createConnection: function(){
    var connection = new MyTransConnection()
    connection.setSelectable(false)
    connection.on("added", function(emitter, event){
      geomap.remove(connection) //this page does not allow new connections
      })
    return connection
    }
  }));

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

function findTechIndexByAlia(alia){
  for (var i = 0; i < techlist.length; i++){
    if (techlist[i].alia == alia){
      return i
    }
  }
  return
}

function loadspinner(text){
  $("#spinnertext").html(text)
  $("#overlaycontainer").css("display","block");
}

function xynode(name){
  var figure = new draw2d.shape.basic.Circle({height: 20, width:20});
  figure.add(new draw2d.shape.basic.Label({text:name, stroke:0}), new draw2d.layout.locator.BottomLocator())
  var note = new draw2d.shape.note.PostIt()

  figure.add(note, new draw2d.layout.locator.TopLocator())
  var rawcolor = new draw2d.util.Color("#231F21")
  figure.resetPorts();
  figure.createPort("input", new draw2d.layout.locator.LeftLocator()).setSelectable(false).setResizeable(false)
  figure.createPort("output", new draw2d.layout.locator.RightLocator()).setSelectable(false).setResizeable(false)
  figure.setBackgroundColor(rawcolor)
  figure.setColor(rawcolor.darker())

  figure.on("added", function(emitter, event){
    note.setVisible(true)
    note.setText('X: ' + Math.round(figure.x) + '\nY: ' + Math.round(figure.y))
  })

  figure.setDraggable(false)
  figure.setSelectable(false)

  return figure
}

function xypath(i, j){
  var connection = new MyTransConnection()
  connection.setSelectable(false)
  sourceid = nodels[i].nodeid
  targetid = nodels[j].nodeid
  connection.setSource(geomap.getFigure(sourceid).getOutputPort(0))
  connection.setTarget(geomap.getFigure(targetid).getInputPort(0))
  var dist = distcalculator(nodels[i].x, nodels[j].x, nodels[i].y, nodels[j].y).toFixed(2)
  connection.add(new draw2d.shape.basic.Label({text:dist, stroke:0.5}), new draw2d.layout.locator.ParallelMidpointLocator())

  return [connection,dist]
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
          $('#xywritetrans').css("display", "none");
          $('#xyselectprod').css("display", "");
        }
      }

    }
  });
  $('#continuebtn').css("display", "");
  $('#xymapsave1').css("display", "");
}

function xyprod(){
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

function distcalculator(x1,x2,y1,y2){
  var dist =Math.sqrt(Math.pow(x2-x1,2) + Math.pow(y2-y1,2));
  return dist
}

function drawroutes(prod) {

  cleararc()
  transdataprod = transdata[prod]
  for (var i = 0; i < transdataprod.length; i++){
    for (var j = 0; j < transdataprod[i].length; j++){
      if (transdataprod[i][j] == "Y"){
        var value = xypath(i, j)
        var path = value[0]
        var dist = value[1]
        geomap.add(path)
        arcset.push({line: path, ii: i, jj: j, dist: dist, show: true})
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
    arcset[i].line.setVisible(false)
    var childrenls = arcset[i].line.getChildren().asArray()
    for (var j = 0; j < childrenls.length; j++){
      childrenls[j].setVisible(false)
    }
    arcset[i].line.setTargetDecorator(new draw2d.decoration.connection.ArrowDecorator(1,1).setColor('#ffffff').setBackgroundColor('#ffffff'));
    arcset[i].show = false
  }
}

function xyfilt(){
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
          arcset[i].line.setVisible(true)
          var childrenls = arcset[i].line.getChildren().asArray()
          for (var j = 0; j < childrenls.length; j++){
            childrenls[j].setVisible(true)
          }
          arcset[i].line.setTargetDecorator(new draw2d.decoration.connection.ArrowDecorator(8,8).setColor('#000000').setBackgroundColor('#000000'));
          arcset[i].show = true
        }
      }
      $("#overlaycontainer").css("display","none");
    }, 100)
  });
}

function xyrecover(){
  alertify.confirm('Confirm', 'Recover original routes?',
  function() {
    if ($(".horizontalbar").css("display") !== 'none') {
      $(".horizontalbar").css("display","none")
    }
    for (var i = 0; i < arcset.length; i++){
      if (arcset[i].show == false) {
        arcset[i].line.setVisible(true)
        var childrenls = arcset[i].line.getChildren().asArray()
        for (var j = 0; j < childrenls.length; j++){
          childrenls[j].setVisible(true)
        }
        arcset[i].line.setTargetDecorator(new draw2d.decoration.connection.ArrowDecorator(8,8).setColor('#000000').setBackgroundColor('#000000'));
        arcset[i].show = true
      }
    }
  },
  null).set('labels',{ok:'Yes', cancel:'Cancel'});
}

function xysavetrans(taskid){
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
