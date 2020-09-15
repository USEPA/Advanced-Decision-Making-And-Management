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


function xynode(name){
  var figure = new draw2d.shape.basic.Circle({height: 20, width:20});
  figure.add(new draw2d.shape.basic.Label({text:name, stroke:0}), new draw2d.layout.locator.BottomLocator())

  var rawcolor = new draw2d.util.Color("#231F21")
  figure.resetPorts();
  figure.createPort("input", new draw2d.layout.locator.LeftLocator()).setSelectable(false).setResizeable(false)
  figure.createPort("output", new draw2d.layout.locator.RightLocator()).setSelectable(false).setResizeable(false)
  figure.setBackgroundColor(rawcolor)
  figure.setColor(rawcolor.darker())

  figure.setDraggable(false)
  figure.setSelectable(false)

  return figure
}

function xytechnode(name, tech, cap){
  var figure = new draw2d.shape.basic.Circle({height: 20, width:20});
  figure.add(new draw2d.shape.basic.Label({text:name, stroke:0}), new draw2d.layout.locator.BottomLocator())
  var note = new draw2d.shape.note.PostIt()
  figure.add(note, new draw2d.layout.locator.TopLocator())

  var rawcolor = new draw2d.util.Color("#CB273A")
  figure.resetPorts();
  figure.createPort("input", new draw2d.layout.locator.LeftLocator()).setSelectable(false).setResizeable(false)
  figure.createPort("output", new draw2d.layout.locator.RightLocator()).setSelectable(false).setResizeable(false)
  figure.setBackgroundColor(rawcolor)
  figure.setColor(rawcolor.darker())

  figure.on("added", function(emitter, event){
    note.setVisible(true)
    note.setText('Tech: ' + tech + '\nCap: ' + cap)
  })

  figure.setDraggable(false)
  figure.setSelectable(false)

  return figure
}

function xypath(i, j, flow){
  var connection = new MyTransConnection()
  connection.setSelectable(false)
  sourceid = nodels[i].nodeid
  targetid = nodels[j].nodeid
  connection.setSource(geomap.getFigure(sourceid).getOutputPort(0))
  connection.setTarget(geomap.getFigure(targetid).getInputPort(0))
  var dist = distcalculator(nodels[i].x, nodels[j].x, nodels[i].y, nodels[j].y).toFixed(2)
  var text = 'Distance: ' + dist + '\nFlow: ' + flow
  //connection.add(new draw2d.shape.basic.Label({text:text, stroke:0.5}), new draw2d.layout.locator.ParallelMidpointLocator())
  var note = new draw2d.shape.note.PostIt()
  note.setGlow(true)
  note.setText(text).setVisible(false)
  connection.add(note, new draw2d.layout.locator.ParallelMidpointLocator())

  connection.on("click", function(emitter, event){
    if (note.isVisible()){
      note.setVisible(false)
    } else {
      note.setVisible(true)
      note.toFront()
    }
  })
  
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

function distcalculator(x1,x2,y1,y2){
  var dist =Math.sqrt(Math.pow(x2-x1,2) + Math.pow(y2-y1,2));
  return dist
}
