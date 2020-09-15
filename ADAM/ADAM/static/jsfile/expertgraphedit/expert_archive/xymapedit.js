
// initialize the x-y map
function initgeomap(){
  geomap = new draw2d.Canvas('gfx_holder');
  kX = 1;
  kY = 1;
  bX = 0;
  bY = 0;
  geomap.on('dblclick', function(emitter, event) {
    var mapx = event.x
    var mapy = event.y
    var x = (mapx - bX)/kX
    var y = (mapy - bY)/kY
    content = '<p><strong>Do you want to add a node at the following location?</strong></p><br/><p> X = ' + x.toFixed(4) + '  Y = ' + y.toFixed(4) + '</p>' + '<br/><p> Enter node name: </p> <input class="ajs-input" id="nodename" type="text"/>'
    alertify.confirm(content).set('onok', function() {
      var nodename = $('#nodename').val();
      figure = xynode(nodename)
      geomap.add(figure, x - 10, y - 10)
      nodels.push({nodename: nodename, nodeid: figure.id, x: x, y: y, mapx: figure.x, mapy: figure.y})
      RescalexyMap()
    }).set('oncancel', function() {
      alertify.confirm().destroy();
    }).set('labels',{ok:'Yes', cancel:'Cancel'})
  })
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

// define node on x-y map
function xynode(name){
  var figure = new draw2d.shape.basic.Circle({height: 20, width:20});
  figure.add(new draw2d.shape.basic.Label({text:name, stroke:0}), new draw2d.layout.locator.BottomLocator())
  var note = new draw2d.shape.note.PostIt()

  figure.add(note, new draw2d.layout.locator.TopLocator())
  var rawcolor = new draw2d.util.Color("#231F21")
  figure.resetPorts();
  figure.setBackgroundColor(rawcolor)
  figure.setColor(rawcolor.darker())

  figure.on("move", function(emitter, event) {
    try {i = findfigure(figure.id)
    nodels[i].mapx = figure.x
    nodels[i].mapy = figure.y
    nodels[i].x = (nodels[i].mapx - bX)/kX
    nodels[i].y = (nodels[i].mapy - bY)/kY
    note.setVisible(true);
    note.setText('X: ' + Math.round(nodels[i].x) + '\nY: ' + Math.round(nodels[i].y))
    }
    catch(e) {};
  })

  figure.on("added", function(emitter, event){
    note.setVisible(true)
    note.setText('X: ' + Math.round(figure.x) + '\nY: ' + Math.round(figure.y))
  })


  return figure
}

// find the node in the node list by id
function findfigure(id){
  for (var i = 0; i < nodels.length; i++){
    if (nodels[i].nodeid == id){
      return i
    }
  }
  return
}

// add node on x-y map
function xyaddnode(){
  var addnodeHTML = $('.addnodeform').html();
  $('.addnodeform').html("");

  alertify.confirm(addnodeHTML).set('onok', function(closeEvent) {
    var nodename = $('#inp1').val();
    var nodex = Number($('#inp2').val());
    var nodey = Number($('#inp3').val());

    if (nodename != "" && nodex != "" && nodey != ""){
      var figure = xynode(nodename)
      geomap.add(figure, nodex - 10, nodey - 10)
      nodels.push({nodename: nodename, nodeid: figure.id, x: nodex, y: nodey, mapx: figure.x, mapy: figure.y})
      RescalexyMap();

      console.log(nodels)
  } else {
    alertify.error('Please enter required information!');
  }
    $('#inp1')[0].value = '';
    $('#inp2')[0].value = '';
    $('#inp3')[0].value = '';
    $('.addnodeform').html(addnodeHTML)
}).set('oncancel', function(closeEvent){
  $('#inp1')[0].value = '';
  $('#inp2')[0].value = '';
  $('#inp3')[0].value = '';
$('.addnodeform').html(addnodeHTML)}).set('title', "Add a new node").set('labels', {ok:'Ok', cancel:'Cancel'}).set('closable',false);
}

// delete node on the map, and remove from the node list
function xydeletenode(){
  alertify.confirm('Confirm', 'Are you sure to delete this element?',
  function() {
    try {el = geomap.getPrimarySelection()
    i = findfigure(el.id)
    nodels.splice(i, 1);
    geomap.remove(el);
    RescalexyMap();}
    catch(e) {
      alertify.error("Please select an element")
    }
},
  null).set('labels',{ok:'Yes', cancel:'Cancel'});
}

// load nodes on the x-y map by selecting a file
function xyloadnode(){
  var nodefileHTML = $('.select_node').html();
  $('.select_node').html("");
    alertify.confirm(nodefileHTML).set('onok', function(closeEvent) {
      var fileid = $('#nodefileselection').val();
        //$('#testtext').html("select: "+ fileid)
        var el = document.getElementsByName("csrfmiddlewaretoken");
        csrf_value = el[0].getAttribute("value");
        if (fileid > 0){
        jQuery.ajax({
          method: "POST",
          url: "/expert/ajax/nodefileselection",
          data: {csrfmiddlewaretoken: csrf_value, fileid: fileid, mode: 'xy'},
          processData: false,
          success: function (data) {
            if (data) {
              if (data.msg.length > 0 ) {
                for (var i = 0; i < data.msg.length; i++){
                  alertify.error(data.msg[i])
                }
              } else {
                nodedata = data.nodedata
                geomap.clear()
                scale = 1
                nodels = []
                //console.log(nodedata)
                for (var i = 1; i < nodedata.length; i++){
                  var figure = xynode(nodedata[i][0])
                  geomap.add(figure, Number(nodedata[i][2]) - 10, Number(nodedata[i][3]) - 10)
                  nodels.push({nodename: nodedata[i][0], nodeid: figure.id, x: Number(nodedata[i][2]), y: Number(nodedata[i][3]), mapx: figure.x, mapy: figure.y})
                  RescalexyMap();
                  }
                nodeid = data.nodeid
                $('#xymapsave1').css("display", "");
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

function xyuploadnode(){
  var nodeuploadHTML = $('.node_upload').html();
  $('.node_upload').html("");
  alertify.confirm(nodeuploadHTML).set('onok', function(closeEvent) {
    $('#uploadbtm').click()
    $('.node_upload').html(nodeuploadHTML);
  }).set('oncancel', function(closeEvent){
    $('.node_upload').html(nodeuploadHTML);
  }).set('title', "Upload a geo file").set('labels', {ok:'Upload', cancel:'Cancel'}).set('closable',false);
}

function xysavemap(taskid, onfile = false){
  var nodelsstring
  nodelsstring = JSON.stringify(nodels)
  console.log(nodels)

  if (onfile == false) {
    alertify.prompt( 'Name your file', 'Please enter the name of new file:', '',
    function(evt, value) {
      var el = document.getElementsByName("csrfmiddlewaretoken");
      csrf_value = el[0].getAttribute("value");
      jQuery.ajax({
        method: "POST",
        url: "/expert/ajax/step3savemap",
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
        url: "/expert/ajax/step3savechange",
        data: {content: nodelsstring, csrfmiddlewaretoken: csrf_value, taskid: taskid, mode: 'xy', nodeid: nodeid},
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


// map zoom in
function zoomin(){
  zoom = geomap.getZoom()
  zoom = zoom/1.2
  geomap.setZoom(zoom, true)
}

// map zoom out
function zoomout(){
  zoom = geomap.getZoom()
  zoom = zoom*1.2
  geomap.setZoom(zoom, true)
}
