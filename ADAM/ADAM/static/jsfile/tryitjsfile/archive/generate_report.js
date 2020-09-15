// functions for adding a new product and technology
function newcircle(name, transcost, info, type){
  var figure = new draw2d.shape.basic.Circle({height: 40, width:40});
  var title

  figure.userData = {"name": String(name), "transcost": transcost, "addinfo": info}
  figure.add(new draw2d.shape.basic.Label({text:figure.userData.name, stroke:0}), new draw2d.layout.locator.BottomLocator())
  figure.setDraggable(false)
  figure.setSelectable(false)

  if (type == 'raw' ){
    var rawcolor = new draw2d.util.Color("#f7ee36")
    figure.resetPorts();
    figure.createPort("output", new draw2d.layout.locator.RightLocator()).setSelectable(false).setResizeable(false)
    figure.setBackgroundColor(rawcolor)
    figure.setColor(rawcolor.darker())
    title = "Raw Material Information"
  }

  if (type == 'final'){
    var rawcolor = new draw2d.util.Color("#2ad148")
    figure.resetPorts();
    figure.createPort("input", new draw2d.layout.locator.LeftLocator()).setSelectable(false).setResizeable(false)
    figure.setBackgroundColor(rawcolor)
    figure.setColor(rawcolor.darker())
    title = "Final Product Information"
  }

  if (type == 'int') {
    var rawcolor = new draw2d.util.Color("#3ea9f0")
    figure.resetPorts();
    figure.createPort("input", new draw2d.layout.locator.LeftLocator()).setSelectable(false).setResizeable(false)
    figure.createPort("output", new draw2d.layout.locator.RightLocator()).setSelectable(false).setResizeable(false)
    figure.setBackgroundColor(rawcolor)
    figure.setColor(rawcolor.darker())
    title = "Intermediate Product Information"
  }

  return figure
}

function newrectangle(name, capmin, capmax, invfix, invpro, opfix, oppro, addinfo, id){
  var rawcolor = new draw2d.util.Color("#adadad")
  var figure = new draw2d.shape.basic.Rectangle({height: 40, width: 70, radius: 5});
  figure.userData = {name:name, capmin: capmin, capmax:capmax, invfix: invfix, invpro:invpro, opfix:opfix, oppro:oppro, addinfo:addinfo}
  figure.add(new draw2d.shape.basic.Label({text:figure.userData.name, stroke: 0}), new draw2d.layout.locator.BottomLocator());

  figure.setDraggable(false)
  figure.setSelectable(false)
  figure.resetPorts();
  figure.createPort("input", new draw2d.layout.locator.LeftLocator()).setSelectable(false).setResizeable(false)
  figure.createPort("output", new draw2d.layout.locator.RightLocator()).setSelectable(false).setResizeable(false)
  figure.setBackgroundColor(rawcolor)
  figure.setColor(rawcolor.darker())

  return figure
}

function newconnection(source, target, data){
  var connection = new MyConnection()
  connection.setSelectable(false)
  var sourcenodeid = source
  var targetnodeid = target


  connection.setSource(canvas.getFigure(sourcenodeid).getOutputPort(0))
  connection.setTarget(canvas.getFigure(targetnodeid).getInputPort(0))
  connection.userData = {yield: data}
  connection.add(new draw2d.shape.basic.Label({text:"yield: "+connection.userData.yield, stroke: 0}), new draw2d.layout.locator.ParallelMidpointLocator())


  return connection
}

function newdefnode(nodeid, type){
  var name
  var index

  for (i = 0; i < nodedatajs.length; i++) {
    if (nodedatajs[i].node == nodeid) {
      name = nodedatajs[i].name
      index = i
    }
  }

  var figure = new draw2d.shape.basic.Circle({height: 20, width:20});
  figure.add(new draw2d.shape.basic.Label({text:name, stroke:0}), new draw2d.layout.locator.BottomLocator())
  var rawcolor = new draw2d.util.Color("#231F21")
  figure.resetPorts();
  figure.setBackgroundColor(rawcolor);
  figure.setColor(rawcolor.darker());
  figure.setDraggable(false);


  if (type == 'farm') {
    newcolor = new draw2d.util.Color("#efd915")
    figure.setBackgroundColor(newcolor);
    figure.setColor(new draw2d.util.Color("#0051dd").darker());
  }
  if (type == 'site') {
    newcolor = new draw2d.util.Color("#00ffea")
    figure.setBackgroundColor(newcolor);
    figure.setColor(newcolor.darker());
  }
  if (type == 'tech') {
    newcolor = new draw2d.util.Color("#0051dd")
    figure.setBackgroundColor(newcolor);
    figure.setColor(newcolor.darker());
  }
  if (type == 'land') {
    newcolor = new draw2d.util.Color("#70AE47")
    figure.setBackgroundColor(newcolor);
    figure.setColor(newcolor.darker());
  }
  if (type == 'colc') {
    newcolor = new draw2d.util.Color("#ff0000")
    figure.setBackgroundColor(newcolor);
    figure.setColor(newcolor.darker());
  }

  return figure
  }

// add transportation map node
function newtransnode(nodeid){
  var name
  var index
  for (i = 0; i < nodedatajs.length; i++) {
    if (nodedatajs[i].node == nodeid) {
      name = nodedatajs[i].name
      index = i
    }
  }

  var figure = new draw2d.shape.basic.Circle({height: 10, width:10});
  figure.add(new draw2d.shape.basic.Label({text:name, stroke:0}), new draw2d.layout.locator.BottomLocator())
  var color = nodedatajs[index].figureobj.bgColor
  figure.resetPorts();
  figure.createPort("input", new draw2d.layout.locator.LeftLocator()).setSelectable(false).setResizeable(false).setVisible(false)
  figure.createPort("output", new draw2d.layout.locator.RightLocator()).setSelectable(false).setResizeable(false).setVisible(false)
  figure.setDraggable(false);
  figure.setBackgroundColor(color)
  figure.setColor(color.darker())
  figure.userData = {nodeid: nodeid}

  return figure
}


//transportation link
function newtransconnection(source, target, map){
  var connection = new MyTransConnection()
  connection.setSelectable(false)
  var sourcenodeid = source
  var targetnodeid = target


  connection.setSource(map.getFigure(sourcenodeid).getOutputPort(0))
  connection.setTarget(map.getFigure(targetnodeid).getInputPort(0))

  connection.userData={from: map.getFigure(sourcenodeid).userData.nodeid, to: map.getFigure(targetnodeid).userData.nodeid}

  return connection
}

window.onload = function (){
    // Initialize technology pathway
  canvas = new draw2d.Canvas('gfx_holder');

  canvas.installEditPolicy( new draw2d.policy.connection.DragConnectionCreatePolicy({
  createConnection: function(){
    var connection = new MyConnection()
    connection.setSelectable(false)
    connection.on("added", function(emitter, event){
      canvas.remove(connection) //this page does not allow new connections
      })

    return connection
    }
  }));

  raw1 = newcircle(proddatajs[0].name, proddatajs[0].transcost, proddatajs[0].note, 'raw');
  canvas.add(raw1, 10,100);

  int1 = newcircle(proddatajs[1].name, proddatajs[1].transcost, proddatajs[1].note, 'int');
  canvas.add(int1, 350,200);

  fin1 = newcircle(proddatajs[2].name, proddatajs[2].transcost, proddatajs[2].note, 'final');
  canvas.add(fin1, 500,20);

  fin2 = newcircle(proddatajs[3].name, proddatajs[3].transcost, proddatajs[3].note,  'final');
  canvas.add(fin2, 650,100);

  fin3 = newcircle(proddatajs[4].name, proddatajs[4].transcost, proddatajs[4].note, 'final');
  canvas.add(fin3, 650,300);

  fin4 = newcircle(proddatajs[5].name, proddatajs[5].transcost, proddatajs[5].note, 'final');
  canvas.add(fin4, 500,350);

  fin5 = newcircle(proddatajs[6].name, proddatajs[6].transcost, proddatajs[6].note, 'final');
  canvas.add(fin5, 500,500);

  tech1 = newrectangle(techdatajs[0].name, techdatajs[0].capmin, techdatajs[0].capmax, techdatajs[0].Binv, techdatajs[0].Kinv, techdatajs[0].Bop, techdatajs[0].Kop, "", techdatajs[0].techid);
  canvas.add(tech1, 200,100)

  tech2 = newrectangle(techdatajs[1].name, techdatajs[1].capmin, techdatajs[1].capmax, techdatajs[1].Binv, techdatajs[1].Kinv, techdatajs[1].Bop, techdatajs[1].Kop, "", techdatajs[1].techid);
  canvas.add(tech2, 500,200)

  tech3 = newrectangle(techdatajs[2].name, techdatajs[2].capmin, techdatajs[2].capmax, techdatajs[2].Binv, techdatajs[2].Kinv, techdatajs[2].Bop, techdatajs[2].Kop, "", techdatajs[2].techid);
  canvas.add(tech3, 200,450)

  con1 = newconnection(raw1.id,tech1.id, yielddatajs[0]);
  canvas.add(con1)

  con2 = newconnection(tech1.id, fin1.id, yielddatajs[1]);
  canvas.add(con2)

  con3 = newconnection(tech1.id, int1.id, yielddatajs[2]);
  canvas.add(con3)

  con4 = newconnection(int1.id, tech2.id, yielddatajs[3]);
  canvas.add(con4)

  con5 = newconnection(tech2.id, fin2.id, yielddatajs[4]);
  canvas.add(con5)

  con6 = newconnection(tech2.id, fin3.id, yielddatajs[5]);
  canvas.add(con6)

  con7 = newconnection(raw1.id, tech3.id, yielddatajs[6]);
  canvas.add(con7)

  con8 = newconnection(tech3.id, fin4.id, yielddatajs[7]);
  canvas.add(con8)

  con9 = newconnection(tech3.id, fin5.id, yielddatajs[8]);
  canvas.add(con9)

  for (var i = 1; i<= 3; i++){
    $('#t'+String(i)+'_name').html(techdatajs[i-1].name)
    $('#t'+String(i)+'_cap').html(techdatajs[i-1].capmin + '~' + techdatajs[i-1].capmax)
    $('#t'+String(i)+'_invfix').html(techdatajs[i-1].Binv)
    $('#t'+String(i)+'_invpro').html(techdatajs[i-1].Kinv)
    $('#t'+String(i)+'_opfix').html(techdatajs[i-1].Bop)
    $('#t'+String(i)+'_oppro').html(techdatajs[i-1].Kop)
  }

  var prod_matrix = '<tr> <th>#prod</th> <th>name</th> <th>transcost</th> <th>addinfo</th>'
  for (var i = 0; i < proddatajs.length; i++){
    var item = proddatajs[i]
    var content = '<tr> <td>' + item.prodid + '</td> <td>' + item.name + '</td> <td>' + item.transcost + '</td> <td>' + item.note + '</td></tr>'
    prod_matrix = prod_matrix + content
  }
  $('#prod_matrix').html(prod_matrix)

  for (i = 0; i < yielddatajs.length; i++) {
    $('#alpha-' + String(i)).html(yielddatajs[i])
  }

  geomap = new draw2d.Canvas('geomap_holder');

  geomap.installEditPolicy( new draw2d.policy.connection.DragConnectionCreatePolicy({
  createConnection: function(){
    var connection = new MyConnection()
    connection.setSelectable(false)
    connection.on("added", function(emitter, event){
      canvas.remove(connection) //this page does not allow new connections
      })

    return connection
    }
  }));

  for (var i = 0; i < nodedatajs.length; i++){
    if (i >=0 && i <=2) {
      var value = newdefnode(nodedatajs[i].node, 'farm')
    }
    if (i >=3 && i <=4) {
      var value = newdefnode(nodedatajs[i].node, 'site')
    }
    if (i >=5 && i <=6) {
      var value = newdefnode(nodedatajs[i].node, 'tech')
    }
    if (i >=7 && i <=9) {
      var value = newdefnode(nodedatajs[i].node, 'land')
    }
    if (i >9) {
      var value = newdefnode(nodedatajs[i].node, 'colc')
    }
    nodedatajs[i].figureobj = value
    geomap.add(value, nodedatajs[i].x, nodedatajs[i].y);
  }

  var node_matrix = '<tr><th># Node</th><th>Name</th><th>If Technology Candidate?</th></tr>'
  for (var i = 0; i < nodedatajs.length; i++){
    var item = nodedatajs[i]
    var content = '<tr> <td>' + item.node + '</td> <td>' + item.name + '</td> <td>' + item.cand + '</td></tr>'
    node_matrix = node_matrix + content
  }
  $('#node_matrix').html(node_matrix)

  var dist_matrix = ''
  for (var i = 0; i < distdatajs.length; i++){
    var line = '<tr>'
     for (var j = 0; j< distdatajs[i].length; j++){
       line = line +'<td>' + distdatajs[i][j] + '</td>'
     }
     line = line + '</tr>'
     dist_matrix = dist_matrix + line
  }
  $('#dist_matrix').html(dist_matrix)

  var sup_matrix = ''
  for (var i = 0; i < supdatajs.length; i++){
    var line = '<tr>'
     for (var j = 0; j< supdatajs[i].length; j++){
       line = line +'<td>' + supdatajs[i][j] + '</td>'
     }
     line = line + '</tr>'
     sup_matrix = sup_matrix + line
  }
  $('#sup_matrix').html(sup_matrix)

  var dem_matrix = ''
  for (var i = 0; i < demdatajs.length; i++){
    var line = '<tr>'
     for (var j = 0; j< demdatajs[i].length; j++){
       line = line +'<td>' + demdatajs[i][j] + '</td>'
     }
     line = line + '</tr>'
     dem_matrix = dem_matrix + line
  }
  $('#dem_matrix').html(dem_matrix)

  var site_matrix = ''
  for (var i = 0; i < sitedatajs.length; i++){
    var line = '<tr>'
     for (var j = 0; j< sitedatajs[i].length; j++){
       line = line +'<td>' + sitedatajs[i][j] + '</td>'
     }
     line = line + '</tr>'
     site_matrix = site_matrix + line
  }
  $('#site_matrix').html(site_matrix)

  transmaps = []
  transresultmaps = []
  for (var i = 1; i<=6; i++){
    var transmap = new draw2d.Canvas('trans_holder' + (i));
    var transresultmap = new draw2d.Canvas('trans_result_holder' + (i));
  transmaps.push(transmap)
  transresultmaps.push(transresultmap)
  }

  for (var j = 0; j<6; j++){
    var transmatrix = transdatajs[j]
    transmaps[j].clear()
    transmaps[j].installEditPolicy( new draw2d.policy.connection.DragConnectionCreatePolicy({
     createConnection: function(){
         var connection = new MyTransConnectionSmall()
         connection.setSelectable(false)
         connection.on("added", function(emitter, event){
         transmaps[j].remove(connection) //this page does not allow new connections
       })
      return connection
    }
  }));
    var figurels = []
    for (var i = 0; i < nodedatajs.length; i++){
      var figure = newtransnode(nodedatajs[i].node)
      transmaps[j].add(figure, 5+0.45*nodedatajs[i].x, 5+0.45*nodedatajs[i].y);
      figurels.push(figure)
    }
    for (var m = 0; m < transmatrix.length; m++){
      for (var n = 0; n < transmatrix[m].length; n++){
        if (transmatrix[m][n] > 0.5) {
          var connection = newtransconnection(figurels[m].id, figurels[n].id, transmaps[j])
          transmaps[j].add(connection)
        }
      }
    }
  }

  for (var j = 0; j<6; j++){
    var transmatrix = transresultjs[j]
    transresultmaps[j].clear()
    transresultmaps[j].installEditPolicy( new draw2d.policy.connection.DragConnectionCreatePolicy({
     createConnection: function(){
         var connection = new MyTransConnectionSmall()
         connection.setSelectable(false)
         connection.on("added", function(emitter, event){
         transresultmaps[j].remove(connection) //this page does not allow new connections
       })
      return connection
    }
  }));
    var figurels = []
    for (var i = 0; i < nodedatajs.length; i++){
      var figure = newtransnode(nodedatajs[i].node)
      transresultmaps[j].add(figure,  5+0.45*nodedatajs[i].x, 5+0.45*nodedatajs[i].y);
      figurels.push(figure)
    }
    for (var m = 0; m < transmatrix.length; m++){
      for (var n = 0; n < transmatrix[m].length; n++){
        if (transmatrix[m][n] > 0.5) {
          var connection = newtransconnection(figurels[m].id, figurels[n].id, transresultmaps[j])
          //connection.add(new draw2d.shape.basic.Label({text:"Flow "+String(transmatrix[m][n]), stroke: 0, fontSize: 8}), new draw2d.layout.locator.ParallelMidpointLocator())
          transresultmaps[j].add(connection)
        }
      }
    }

  }
}
