var empty_prod_form = '<p> *Product name: </p> <input class="ajs-input" id="inpOne" type="text" /> <p> *Transportation cost [USD/tonne/km]: </p> <input class="ajs-input" id="inpTwo" type="number" step = 0.1 min = 0 /> <p> Additional information: </p> <input class="ajs-input" id="inpThree" type="text"  />'
var empty_tech_form = '<p> *Technology name: </p> <input class="ajs-input" id="techOne" type="text" /> <p> *Minimum capacity [tonne main feed/year]: </p> <input class="ajs-input" id="techTwo" type="number" step = 10 min = 0 /> <p> *Maximum capacity [tonne main feed/year]: </p> <input class="ajs-input" id="techThree" type="number" step = 10 min = 0  /> <p> *Investment cost (fixed) [USD]: </p> <input class="ajs-input" id="techFour" type="number" step = 10 min = 0  /> <p> *Investment cost (proportioanl) [USD/(tonne main feed/year)]: </p> <input class="ajs-input" id="techFive" type="number" step = 10 min = 0  /> <p> *Operational cost (fixed) [USD/year]: </p> <input class="ajs-input" id="techSix" type="number" step = 10 min = 0  /> <p> *Operational cost (proportioanl) [USD/tonne main feed]: </p> <input class="ajs-input" id="techSeven" type="number" step = 10 min = 0  /> <p> EAdditional information: </p> <input class="ajs-input" id="techEight" type="text" />'


function sup_table_push(nodeid, num) {
  for (var i = 0; i < maploc.length; i++) {
    if (maploc[i].node == nodeid) {
      var new_line = '<tr id = "nodedata_' + nodeid +'_' + num + '"><td>s' + sup_count +'</td><td>n' + (i+1) + '<td>' + maploc[i].data[num].prod + '</td><td>' + maploc[i].data[num].amount + '</td><td>' + maploc[i].data[num].price + '</td></tr>'
      if ($('#nodedata_' + nodeid +'_' + num).length > 0) {
        $('#nodedata_' + nodeid +'_' + num).remove()
        //$("#test_step4").html($('#nodedata_' + nodeid +'_' + num).length)
      }
      var table_content = $("#sup_data_table").html()
      table_content = table_content + new_line
      sup_count ++
      $("#sup_data_table").html(table_content)
    }
  }
}

function dem_table_push(nodeid, num) {
  for (var i = 0; i < maploc.length; i++) {
    if (maploc[i].node == nodeid) {
      var new_line = '<tr id = "nodedata_' + nodeid +'_' + num + '"><td>d' + dem_count +'</td><td>n' + (i+1) + '<td>' + maploc[i].data[num].prod + '</td><td>' + maploc[i].data[num].amount + '</td><td>' + maploc[i].data[num].price + '</td></tr>'
      if ($('#nodedata_' + nodeid +'_' + num).length > 0) {
        $('#nodedata_' + nodeid +'_' + num).remove()
        //$("#test_step4").html($('#nodedata_' + nodeid +'_' + num).length)
      }
      var table_content = $("#dem_data_table").html()
      table_content = table_content + new_line
      dem_count ++
      $("#dem_data_table").html(table_content)
    }
  }
}

function sit_table_push(nodeid, num) {
  for (var i = 0; i < maploc.length; i++) {
    if (maploc[i].node == nodeid) {
      var new_line = '<tr id = "nodedata_' + nodeid +'_' + num + '"><td>ts' + sit_count +'</td><td>n' + (i+1) + '<td>' + maploc[i].data[num].tech + '</td><td>' + maploc[i].data[num].cap  + '</td></tr>'
      if ($('#nodedata_' + nodeid +'_' + num).length > 0) {
        $('#nodedata_' + nodeid +'_' + num).remove()
        //$("#test_step4").html($('#nodedata_' + nodeid +'_' + num).length)
      }
      var table_content = $("#sit_data_table").html()
      table_content = table_content + new_line
      sit_count ++
      $("#sit_data_table").html(table_content)
    }
  }
}

function refreshalert() {
  alertify.confirm("Once go back to step 3 your data in this step will be cleared. ").set('onok', function(closeEvent) { changecard('custom-4','custom-3')
}).set('title', "Attention!").set('labels', {ok:'Ok', cancel:'Cancel'}).set('closable',false)
}

function node_name_form(nodeid) {
  for (var i = 0; i < maploc.length; i++) {
    if (maploc[i].node == nodeid) {
      nameform = '<p> Please enter the name of this node: </p> <br/> <input class="ajs-input" id= "nodename_' + nodeid + '" type="text" value = "'+ maploc[i].name+ '"/>'
    }
  }
  return nameform
}

function empty_node_form(nodeid, num) {
  var empty_node_form_content = '<p> Please select a role: </p> <br/> <div class="selectdiv"> <select name="node_type" id = "nodetype_' + nodeid +'_' + num + '"> <option value = "source"> Source </option> <option value = "sink"> Sink </option>  <option value = "tech_cand"> Tech Candidate </option> <option value = "tech_site"> Tech Site </option> </select></div> <br/><br/>'

  return empty_node_form_content
}

function updatenodetypeselect(nodeid, num) {
  var e = document.getElementById("nodetype_${nodeid}_${num}");
  var techname = e.options[e.selectedIndex].value;

}

function node_add_type_btn(nodeid) {
  return '<br/> <button class = "btn default" style = "padding: 3px 10px" onclick="addnodeform(\'' + nodeid + '\')">Add a role</button>'
}


function addnodeform(nodeid){ // need to implement delete - include in the on cancel function
  for (var i = 0; i < maploc.length; i++) {
    if (maploc[i].node == nodeid) {

      // record selected type
      var name = $("#nodename_" + maploc[i].node).val()
      var record = [];
      for (var j = 0; j < maploc[i].nodetypecount + 1; j++) {
        var e = document.getElementById('nodetype_' + nodeid +'_' + j);
        record.push(e.selectedIndex);
        //$("#test_step4").html(record)
      }

      maploc[i].nodetypecount ++ ;
      maploc[i].nodetypeform = maploc[i].nodetypeform + empty_node_form(nodeid, maploc[i].nodetypecount)
      maploc[i].nodealert.setContent(node_name_form(nodeid) + maploc[i].nodetypeform + node_add_type_btn(nodeid))

      // recover selected values after expanding the table
      for (var j = 0; j < maploc[i].nodetypecount + 1; j++) {
        var e = document.getElementById('nodetype_' + nodeid +'_' + j);
        e.selectedIndex = record[j]
      }
      $("#nodename_" + maploc[i].node).val(name)
    }
  }
}

function nodeinfoform(type, nodeid, num) {
  var infoform

  if (type == 0) {
    infoform = '<h4> Supply Info ' + (num+1) + '</h4> <p id = "nodeinfo1_' + nodeid +'_' + num + '"> </p> <br/> <p> Please specify supplied amount </p> <input class="ajs-input" id="nodeinfo2_' + nodeid +'_' + num + '" type="number" step = 10 min = 0 /> <br/> <p> Please specify supplied price </p> <input class="ajs-input" id="nodeinfo3_' + nodeid +'_' + num + '" type="number" step = 1 min = 0 /> <br/>'
  }
  //<option value = "int1"> ' + int1.userData.name + ' </option>

  if (type == 1) {
    infoform = '<h4> Demand Info ' + (num+1) + '</h4> <p id = "nodeinfo1_' + nodeid +'_' + num + '"> </p> <br/> <p> Please specify demanded capacity </p> <input class="ajs-input" id="nodeinfo2_' + nodeid +'_' + num + '" type="number" step = 10 min = 0 /> <br/> <p> Please specify demanded price </p> <input class="ajs-input" id="nodeinfo3_' + nodeid +'_' + num + '" type="number" step = 1 min = 0 /> <br/>'
  }

  if (type == 2) {
    infoform = '<h4> Tech Candidate Info ' + (num+1) + '</h4> <p> You do not need to specify anything here. </p> <br/>'
  }

  if (type == 3) {
    infoform = '<h4> Tech Site Info ' + (num+1) + '</h4> <p id = "nodeinfo1_' + nodeid +'_' + num + '"> </p> <br/> <p> Please specify the installed capacity </p> <input class="ajs-input" id="nodeinfo2_' + nodeid +'_' + num + '" type="number" step = 10 /> <br/>' // remember to check if in valid range
  }


  return infoform
}

function savenodeinfo(nodeid, num) {
  for (var i = 0; i < maploc.length; i++) {
    if (maploc[i].node == nodeid) {
      var type = maploc[i].record[num].type
      if (type == 0 || type == 1) {
        var e = document.getElementById('nodeinfo1_' + nodeid +'_' + num);
        maploc[i].data[num].amount = $("#nodeinfo2_" + nodeid +'_' + num).val()
        maploc[i].data[num].price = $("#nodeinfo3_" + nodeid +'_' + num).val()
      }

      if (type == 3) {
        var e = document.getElementById('nodeinfo1_' + nodeid +'_' + num);
        maploc[i].data[num].cap = $("#nodeinfo2_" + nodeid +'_' + num).val()
      }

    }
  }
}


// functions for adding a new product and technology
function newcircle(name, transcost, info, type){
  var figure = new draw2d.shape.basic.Circle({height: 40, width:40});
  var title

  figure.userData = {"name": String(name), "transcost": transcost, "addinfo": info}
  figure.add(new draw2d.shape.basic.Label({text:figure.userData.name, stroke:0}), new draw2d.layout.locator.BottomLocator())
  figure.setSelectable(false)
  figure.setDraggable(false)

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

  figure.on("dblclick", function(emitter, event) {
    $('.productinfo').html("");
    var productinfoHTML = '<p> *Product name: </p> <input class="ajs-input" id="inpOne" type="text" value = "'+ String(figure.userData.name)+ '" /> <p> *Transportation cost [USD/tonne/km]: </p> <input class="ajs-input" id="inpTwo" type="number" step = 0.1 min = 0 value = "'+String(figure.userData.transcost)+'" /> <p> Additional information: </p> <input class="ajs-input" id="inpThree" type="text" value = "'+String(figure.userData.addinfo)+'"  />';


    alertify.confirm(productinfoHTML).set('onok', function(closeEvent) {

      var prodname = $('#inpOne').val();
      var transcost = $('#inpTwo').val();
      var addinfo = $('#inpThree').val();


      if (prodname != "" && transcost != ""){
        if (transcost < 0) {
          alertify.error('Input not valid!');}
        else{
        figure.resetChildren()
        figure.add(new draw2d.shape.basic.Label({text:prodname, stroke: 0}), new draw2d.layout.locator.BottomLocator());
        figure.userData = {"name": prodname, "transcost": transcost, "addinfo": addinfo}
      }
    } else {
      alertify.error('Please enter required information!');
    }
      $('.productinfo').html(empty_prod_form)
  }).set('oncancel', function(closeEvent){
    $('#inpOne')[0].value = figure.userData.name;
    $('#inpTwo')[0].value = figure.userData.transcost;
    $('#inpThree')[0].value = figure.userData.addinfo;
    $('.productinfo').html(empty_prod_form)}).set('title', title).set('labels', {ok:'Ok', cancel:'Cancel'}).set('closable',false);
  })

  return figure
}

function newrectangle(name, capmin, capmax, invfix, invpro, opfix, oppro, addinfo, id){
  var rawcolor = new draw2d.util.Color("#adadad")
  var figure = new draw2d.shape.basic.Rectangle({height: 40, width: 70, radius: 5});
  figure.userData = {name:name, capmin: capmin, capmax:capmax, invfix: invfix, invpro:invpro, opfix:opfix, oppro:oppro, addinfo:addinfo}
  figure.add(new draw2d.shape.basic.Label({text:figure.userData.name, stroke: 0}), new draw2d.layout.locator.BottomLocator());

  figure.setSelectable(false)
  figure.setDraggable(false)
  figure.resetPorts();
  figure.createPort("input", new draw2d.layout.locator.LeftLocator()).setSelectable(false).setResizeable(false)
  figure.createPort("output", new draw2d.layout.locator.RightLocator()).setSelectable(false).setResizeable(false)
  figure.setBackgroundColor(rawcolor)
  figure.setColor(rawcolor.darker())

  figure.on("dblclick", function(emitter, event) {
    data = figure.userData

    var technologyinfoHTML = '<p> *Technology name: </p> <input class="ajs-input" id="techOne" type="text" value = "'+String(data.name)+'" /> <p> *Minimum capacity [tonne main feed/year]: </p> <input class="ajs-input" id="techTwo" type="number" step = 10 min = 0 value = "'+String(data.capmin)+'" /> <p> *Maximum capacity [tonne main feed/year]: </p> <input class="ajs-input" id="techThree" type="number" step = 10 min = 0 value = "'+String(data.capmax)+'"  /> <p> *Investment cost (fixed) [USD]: </p> <input class="ajs-input" id="techFour" type="number" step = 10 min = 0 value = "'+String(data.invfix)+'"  /> <p> *Investment cost (proportioanl) [USD/(tonne main feed/year)]: </p> <input class="ajs-input" id="techFive" type="number" step = 10 min = 0 value = "'+String(data.invpro)+'"  /> <p> *Operational cost (fixed) [USD/year]: </p> <input class="ajs-input" id="techSix" type="number" step = 10 min = 0 value = "'+String(data.opfix)+'"  /> <p> *Operational cost (proportioanl) [USD/tonne main feed]: </p> <input class="ajs-input" id="techSeven" type="number" step = 10 min = 0 value = "'+String(data.oppro)+'"  /> <p> Additional information: </p> <input class="ajs-input" id="techEight" type="text" value = "'+String(data.addinfo)+'" />';

    $('.technologyinfo').html("");

    alertify.confirm(technologyinfoHTML).set('onok', function(closeEvent) {

      var techname = $('#techOne').val();
      var capmin = $('#techTwo').val();
      var capmax = $('#techThree').val();
      var invfix = $('#techFour').val();
      var invpro = $('#techFive').val();
      var opfix = $('#techSix').val();
      var oppro = $('#techSeven').val();
      var addinfo = $('#techEight').val();


      if (techname != "" && capmin != "" && capmax != "" && invfix != "" && invpro != "" && opfix != "" && oppro != ""){
        if (capmax < capmin || capmax <= 0 || invfix < 0 || invpro < 0 || opfix < 0 || oppro < 0) {
          alertify.error('Input not valid!');
        }
        else{
        figure.resetChildren()
        figure.add(new draw2d.shape.basic.Label({text:techname, stroke: 0}), new draw2d.layout.locator.BottomLocator());
        figure.userData = {"name": techname, "capmin": capmin, "capmax": capmax, "invfix": invfix, "invpro": invpro, "opfix": opfix, "oppro": oppro, "addinfo": addinfo}
        $('#'+id+'_name').html(techname)
        $('#'+id+'_cap').html(String(capmin) + "~" + String(capmax))
        $('#'+id+'_invfix').html(String(invfix))
        $('#'+id+'_invpro').html(String(invpro))
        $('#'+id+'_opfix').html(String(opfix))
        $('#'+id+'_oppro').html(String(oppro))
      }
    } else {
      alertify.error('Please enter required information!');
    }
      $('.technologyinfo').html(empty_tech_form)
  }).set('oncancel', function(closeEvent){
    $('#techOne')[0].value = data.name;
    $('#techTwo')[0].value = data.capmin;
    $('#techThree')[0].value = data.capmax;
    $('#techFour')[0].value = data.invfix;
    $('#techFive')[0].value = data.invpro;
    $('#techSix')[0].value = data.opfix;
    $('#techSeven')[0].value = data.oppro;
    $('#techEight')[0].value = data.addinfo;
    $('.technologyinfo').html(empty_tech_form)}).set('title', "Technology Information").set('labels', {ok:'Ok', cancel:'Cancel'}).set('closable',false);
  })
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


  connection.on("click", function(emitter,event){
    var sourceshape = connection.getSource().getParent().cssClass
    var targetshape = connection.getTarget().getParent().cssClass
    if (sourceshape == targetshape ) {
      canvas.remove(connection)
      alertify.error("Cannot Connect!");
    }
  })

  connection.on("dblclick", function(emitter,event){
    var sourceshape = connection.getSource().getParent().cssClass
    var targetshape = connection.getTarget().getParent().cssClass

    var transforminfoHTML = '<p> *Transformation coefficient: </p> <input class="ajs-input" id="transform2" type="number" value = "'+String(connection.userData.yield)+'" step = 0.1 />';
    $('.transforminfo').html("");

    alertify.confirm(transforminfoHTML).set('onok', function(closeEvent) {

      var transform = $('#transform2').val();
      if (transform == "") {
        transform = 0
        alertify.error("No input");
      }
      if (transform == 0 || (transform > 0 && sourceshape.includes("Circle")) || (transform < 0 && targetshape.includes("Circle")) ){
        alertify.error('Input not valid');
        $('#transform2')[0].value = connection.userData.yield
      } else {
        connection.resetChildren();
        connection.userData = {"yield": transform};
        connection.add(new draw2d.shape.basic.Label({text:"yield: "+connection.userData.yield, stroke: 0}), new draw2d.layout.locator.ParallelMidpointLocator());
    }
      $('.transforminfo').html('<p> *Transformation coefficient: </p> <input class="ajs-input" id="transform" type="number" step = 0.1 />')

  }).set('oncancel', function(closeEvent){

  }).set('title', "Transformation Coefficient").set('labels', {ok:'Ok', cancel:'Cancel'}).set('closable',false)
})

  return connection
}

// add Undefined geo node - for geo layout only
function newundefnode(name){
  var figure = new draw2d.shape.basic.Circle({height: 20, width:20});
  figure.add(new draw2d.shape.basic.Label({text:name, stroke:0}), new draw2d.layout.locator.BottomLocator())
  var rawcolor = new draw2d.util.Color("#231F21")
  figure.resetPorts();
  figure.setBackgroundColor(rawcolor)
  figure.setColor(rawcolor.darker())

  figure.on("move", function(emitter, event) {
    for (var j = 0; j < maploc.length; j++){
      var dis_ij = Math.floor(Math.sqrt((figure.x - maploc[j].x)**2 + (figure.y - maploc[j].y)**2))
      $("#dis_"+name+"n"+String(j+1)).html(dis_ij)
      $("#dis_"+"n"+String(j+1)+name).html(dis_ij)
      $("#dis_"+name+name).html("0")
    }
    for (var j = 0; j < maploc.length; j++){
      if (maploc[j].node == name){
        maploc[j].x = figure.x;
        maploc[j].y = figure.y;
      }
    }
  })

  return figure
}


//add defined geo node - physical meanings can be added
function newdefnode(nodeid, type){
  var name
  var index

  for (i = 0; i < maploc.length; i++) {
    if (maploc[i].node == nodeid) {
      name = maploc[i].name
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

  //maploc[index].nodetypeform = ""
  maploc[index].nodetypecount = -1
  maploc[index].record = []
  maploc[index].data = []

  if (type == 'farm') {
    newcolor = new draw2d.util.Color("#efd915")
    maploc[index].record = [{type: 0},{type: 2},{type:1}]
    maploc[index].data = [{prod: raw1.userData.name, amount: 150000, price: 0},{},{prod: fin1.userData.name, amount: 450000, price: 100}]
    maploc[index].nodetypecount = 3
    figure.setBackgroundColor(newcolor);
    figure.setColor(new draw2d.util.Color("#0051dd").darker());
  }
  if (type == 'site') {
    newcolor = new draw2d.util.Color("#00ffea")
    maploc[index].record = [{type: 3},{type: 3},{type: 1}]
    maploc[index].data = [{tech: tech1.userData.name, cap:200000},{tech: tech2.userData.name, cap:200000},{prod: fin1.userData.name, amount: 450000, price: 100}]
    maploc[index].nodetypecount = 3
    figure.setBackgroundColor(newcolor);
    figure.setColor(newcolor.darker());
  }
  if (type == 'tech') {
    newcolor = new draw2d.util.Color("#0051dd")
    maploc[index].record = [{type: 2},{type: 1}]
    maploc[index].data = [{},{prod: fin1.userData.name, amount: 450000, price: 100}]
    maploc[index].nodetypecount = 2
    figure.setBackgroundColor(newcolor);
    figure.setColor(newcolor.darker());
  }
  if (type == 'land') {
    newcolor = new draw2d.util.Color("#70AE47")
    maploc[index].record = [{type: 1},{type: 1},{type: 1},{type: 1},{type: 1},{type: 1}]
    maploc[index].data = [{prod: raw1.userData.name, amount: 450000, price: 0},{prod: int1.userData.name, amount: 450000, price: 0},{prod: fin2.userData.name, amount: 450000, price: 0},{prod: fin3.userData.name, amount: 450000, price: 0},{prod: fin4.userData.name, amount: 450000, price: 0},{prod: fin5.userData.name, amount: 450000, price: 0}]
    maploc[index].nodetypecount = 5
    figure.setBackgroundColor(newcolor);
    figure.setColor(newcolor.darker());
  }
  if (type == 'colc') {
    newcolor = new draw2d.util.Color("#ff0000")
    maploc[index].record = [{type: 1},{type: 1}]
    maploc[index].data = [{prod: fin2.userData.name, amount: 450000, price: 5},{prod: fin4.userData.name, amount: 450000, price: 5},]
    maploc[index].nodetypecount = 2
    figure.setBackgroundColor(newcolor);
    figure.setColor(newcolor.darker());
  }

  // add more and more types


  figure.on("dblclick", function(emitter, event) {
    var infoform = ""
    for (var j = 0; j < maploc[index].record.length; j++) {
      infoform = infoform + nodeinfoform(maploc[index].record[j].type, maploc[index].node, j)
    }
    var node_info_alert = alertify.confirm(infoform).set('title', "Specify Node Information").set('labels', {ok:'Ok', cancel:'Cancel'}).set('closable',false)

    if (maploc[index].data.length > 0) {
      for (var j = 0; j < maploc[index].data.length; j++) {

          if (maploc[index].record[j].type == 0 ) {
            document.getElementById('nodeinfo1_' + nodeid +'_' + j).innerHTML = "Please specify supply information of " + maploc[index].data[j].prod
            $("#nodeinfo2_" + nodeid +'_' + j).val(String(maploc[index].data[j].amount))
            $("#nodeinfo3_" + nodeid +'_' + j).val(String(maploc[index].data[j].price))
          }
          if (maploc[index].record[j].type == 1) {
            document.getElementById('nodeinfo1_' + nodeid +'_' + j).innerHTML = "Please specify demand information of " + maploc[index].data[j].prod
            $("#nodeinfo2_" + nodeid +'_' + j).val(String(maploc[index].data[j].amount))
            $("#nodeinfo3_" + nodeid +'_' + j).val(String(maploc[index].data[j].price))
          }
          if (maploc[index].record[j].type == 3){
            document.getElementById('nodeinfo1_' + nodeid +'_' + j).innerHTML = "Please specify supply information of " + maploc[index].data[j].tech
            $("#nodeinfo2_" + nodeid +'_' + j).val(String(maploc[index].data[j].cap))
          }
        }
      }
    node_info_alert.set('onok', function(closeEvent){
      for (var j = 0; j < maploc[index].record.length; j++) {
        savenodeinfo(maploc[index].node, j) // save information of the node
      }
      for (var j = 0; j < maploc[index].record.length; j++) {
        if (maploc[index].record[j].type == 0) {
          sup_table_push(maploc[index].node, j)
        }
        if (maploc[index].record[j].type == 1) {
          dem_table_push(maploc[index].node, j)
        }
        if (maploc[index].record[j].type == 3) {
          sit_table_push(maploc[index].node, j)
        }
      }
    })
    })
  return figure
  }

// add transportation map node
function newtransnode(nodeid){
  var name
  var index
  for (i = 0; i < maploc.length; i++) {
    if (maploc[i].node == nodeid) {
      name = maploc[i].name
      index = i
    }
  }

  var figure = new draw2d.shape.basic.Circle({height: 20, width:20});
  figure.add(new draw2d.shape.basic.Label({text:name, stroke:0}), new draw2d.layout.locator.BottomLocator())
  var color = maploc[index].bgcolor
  figure.resetPorts();
  figure.createPort("input", new draw2d.layout.locator.LeftLocator()).setSelectable(false).setResizeable(false)
  figure.createPort("output", new draw2d.layout.locator.RightLocator()).setSelectable(false).setResizeable(false)
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

  connection.on('dblclick', function(emitter,event){
    alertify.confirm('Click DELETE to remove this route.').set('title', 'Delete this route?').set('labels', {ok:'DELETE', cancel:'Cancel'}).set('closable',false).set('onok', function(closeEvent){
      map.remove(connection);
      //var arrow = connection.getTargetDecorator()
      //arrow.setColor('#ffffff').setBackgroundColor('#ffffff')
      //connection.setVisible(0);
    }).set('oncancel', function(closeEvent){
    })

  })
  return connection
}

function initstep4(){
  sup_count = 1
  dem_count = 1
  sit_count = 1
  $("#custom_step4_warning").html("");
  geomapn.clear()
  for (var i = 0; i < maploc.length; i++){
    if (i >=0 && i <=2) {
      var value = newdefnode(maploc[i].node, 'farm')
    }
    if (i >=3 && i <=4) {
      var value = newdefnode(maploc[i].node, 'site')
    }
    if (i >=5 && i <=6) {
      var value = newdefnode(maploc[i].node, 'tech')
    }
    if (i >=7 && i <=9) {
      var value = newdefnode(maploc[i].node, 'land')
    }
    if (i >9) {
      var value = newdefnode(maploc[i].node, 'colc')
    }

    geomapn.add(value, maploc[i].x, maploc[i].y);
    maploc[i].figureobj = value
    for (var j = 0; j < maploc[i].record.length; j++) {
      if (maploc[i].record[j].type == 0){
        sup_table_push(maploc[i].node, j)
      }
      if (maploc[i].record[j].type == 1){
        dem_table_push(maploc[i].node, j)
      }
      if (maploc[i].record[j].type == 3){
        sit_table_push(maploc[i].node, j)
      }
    }
  }
}

function initstep5(){
  $("#custom_step5_warning").html("");
  $("#raw1transmapintro").html("This is the transportation map for " + raw1.userData.name + " .")
  $("#int1transmapintro").html("This is the transportation map for " + int1.userData.name + " .")
  $("#fin2transmapintro").html("This is the transportation map for " + fin2.userData.name + " .")
  $("#fin3transmapintro").html("This is the transportation map for " + fin3.userData.name + " .")
  $("#fin4transmapintro").html("This is the transportation map for " + fin4.userData.name + " .")
  $("#fin5transmapintro").html("This is the transportation map for " + fin5.userData.name + " .")
  // add nodes to transportation maps
  transmaps[0].clear()
  transmaps[0].installEditPolicy( new draw2d.policy.connection.DragConnectionCreatePolicy({
   createConnection: function(){
       var connection = new MyTransConnection()
       connection.setSelectable(false)
       connection.on("added", function(emitter, event){
       transmaps[0].remove(connection) //this page does not allow new connections
     })
    return connection
  }
}));
  for (var i = 0; i < maploc.length; i++){
    maploc[i].bgcolor = maploc[i].figureobj.bgColor
    var figure = newtransnode(maploc[i].node)
    transmaps[0].add(figure, maploc[i].x, maploc[i].y);
    maploc[i].transnodeobj0 = figure
  }

  transmaps[1].clear()
  transmaps[1].installEditPolicy( new draw2d.policy.connection.DragConnectionCreatePolicy({
   createConnection: function(){
       var connection = new MyTransConnection()
       connection.setSelectable(false)
       connection.on("added", function(emitter, event){
       transmaps[1].remove(connection) //this page does not allow new connections
     })
    return connection
  }
}));
  for (var i = 0; i < maploc.length; i++){
    maploc[i].bgcolor = maploc[i].figureobj.bgColor
    var figure = newtransnode(maploc[i].node)
    transmaps[1].add(figure, maploc[i].x, maploc[i].y);
    maploc[i].transnodeobj1 = figure
  }

  transmaps[2].clear()
  transmaps[2].installEditPolicy( new draw2d.policy.connection.DragConnectionCreatePolicy({
   createConnection: function(){
       var connection = new MyTransConnection()
       connection.setSelectable(false)
       connection.on("added", function(emitter, event){
       transmaps[2].remove(connection) //this page does not allow new connections
     })
    return connection
  }
}));
  for (var i = 0; i < maploc.length; i++){
    maploc[i].bgcolor = maploc[i].figureobj.bgColor
    var figure = newtransnode(maploc[i].node)
    transmaps[2].add(figure, maploc[i].x, maploc[i].y);
    maploc[i].transnodeobj2 = figure
  }

  transmaps[3].clear()
  transmaps[3].installEditPolicy( new draw2d.policy.connection.DragConnectionCreatePolicy({
   createConnection: function(){
       var connection = new MyTransConnection()
       connection.setSelectable(false)
       connection.on("added", function(emitter, event){
       transmaps[3].remove(connection) //this page does not allow new connections
     })
    return connection
  }
}));
  for (var i = 0; i < maploc.length; i++){
    maploc[i].bgcolor = maploc[i].figureobj.bgColor
    var figure = newtransnode(maploc[i].node)
    transmaps[3].add(figure, maploc[i].x, maploc[i].y);
    maploc[i].transnodeobj3 = figure
  }

  transmaps[4].clear()
  transmaps[4].installEditPolicy( new draw2d.policy.connection.DragConnectionCreatePolicy({
   createConnection: function(){
       var connection = new MyTransConnection()
       connection.setSelectable(false)
       connection.on("added", function(emitter, event){
       transmaps[4].remove(connection) //this page does not allow new connections
     })
    return connection
  }
}));
  for (var i = 0; i < maploc.length; i++){
    maploc[i].bgcolor = maploc[i].figureobj.bgColor
    var figure = newtransnode(maploc[i].node)
    transmaps[4].add(figure, maploc[i].x, maploc[i].y);
    maploc[i].transnodeobj4 = figure
  }

  transmaps[5].clear()
  transmaps[5].installEditPolicy( new draw2d.policy.connection.DragConnectionCreatePolicy({
   createConnection: function(){
       var connection = new MyTransConnection()
       connection.setSelectable(false)
       connection.on("added", function(emitter, event){
       transmaps[5].remove(connection) //this page does not allow new connections
     })
    return connection
  }
}));
  for (var i = 0; i < maploc.length; i++){
    maploc[i].bgcolor = maploc[i].figureobj.bgColor
    var figure = newtransnode(maploc[i].node)
    transmaps[5].add(figure, maploc[i].x, maploc[i].y);
    maploc[i].transnodeobj5 = figure
  }

  transmatrix0 = new Array(maploc.length).fill(new Array(maploc.length).fill(0));
  // add transportation link to the first map for raw1
  for (var i = 0; i < maploc.length; i++){
    for (var j = 0; j < maploc.length; j++){
      if (i !== j) {

        var i_is_source = 0
        var j_is_target = 0
        // check if node i is a source for raw1
        for (var ki = 0; ki < maploc[i].record.length; ki++) {

          if (maploc[i].record[ki].type == 0) {
            i_is_source = 1
          }
        }

        //   original code -- for free nodes
        for (var kj = 0; kj < maploc[j].record.length; kj++) {
          // check if node j is a sink for raw1
          if (maploc[j].record[kj].type == 1) {
            if (maploc[j].data[kj].prod == raw1.userData.name) {
              j_is_target = 1
            }
          }
          //check if node j is a tech candidate
          if (maploc[j].record[kj].type == 2) {
            j_is_target = 1
          }
          // check if node j is a tech site that take raw 1
          if (maploc[j].record[kj].type == 3) {
            if (maploc[j].data[kj].tech == tech1.userData.name || maploc[j].data[kj].tech == tech3.userData.name){
              j_is_target = 1
            }
          }
        }

        if (i_is_source && j_is_target) {
          var connection = newtransconnection(maploc[i].transnodeobj0.id, maploc[j].transnodeobj0.id, transmaps[0])
          transmaps[0].add(connection)
          //transmatrix0[i][j] = 1
        }
      }
    }
  }

  // add trans link to the second map of int 1
  for (var i = 0; i < maploc.length; i++){
    for (var j = 0; j < maploc.length; j++){
      if (i !== j) {

        var i_is_source = 0
        var j_is_target = 0
        // check if node i is a source for int
        for (var ki = 0; ki < maploc[i].record.length; ki++) {
          if (maploc[i].record[ki].type == 2) {
            i_is_source = 1
          }
          if (maploc[i].record[ki].type == 3) {
            if (maploc[i].data[ki].tech == tech1.userData.name) {
              i_is_source = 1
            }
          }
        }

        for (var kj = 0; kj < maploc[j].record.length; kj++) {
          // check if node j is a sink for int1
          if (maploc[j].record[kj].type == 1) {
            if (maploc[j].data[kj].prod == int1.userData.name) {
              j_is_target = 1
            }
          }
        }

        if (i_is_source && j_is_target) {
          var connection = newtransconnection(maploc[i].transnodeobj1.id, maploc[j].transnodeobj1.id, transmaps[1])
          transmaps[1].add(connection)
        }
      }
    }
  }

  // add trans link to the second map of fin2
  for (var i = 0; i < maploc.length; i++){
    for (var j = 0; j < maploc.length; j++){
      if (i !== j) {

        var i_is_source = 0
        var j_is_target = 0
        // check if node i is a source for fin2
        for (var ki = 0; ki < maploc[i].record.length; ki++) {
          if (maploc[i].record[ki].type == 2) {
            i_is_source = 1
          }
          if (maploc[i].record[ki].type == 3) {
            if (maploc[i].data[ki].tech == tech2.userData.name) {
              i_is_source = 1
            }
          }
        }

        for (var kj = 0; kj < maploc[j].record.length; kj++) {
          // check if node j is a sink for fin2
          if (maploc[j].record[kj].type == 1) {
            if (maploc[j].data[kj].prod == fin2.userData.name) {
              j_is_target = 1
            }
          }
        }

        if (i_is_source && j_is_target) {
          var connection = newtransconnection(maploc[i].transnodeobj2.id, maploc[j].transnodeobj2.id, transmaps[2])
          transmaps[2].add(connection)
        }
      }
    }
  }

  // add trans link to the second map of fin3
  for (var i = 0; i < maploc.length; i++){
    for (var j = 0; j < maploc.length; j++){
      if (i !== j) {

        var i_is_source = 0
        var j_is_target = 0
        // check if node i is a source for fin3
        for (var ki = 0; ki < maploc[i].record.length; ki++) {
          if (maploc[i].record[ki].type == 2) {
            i_is_source = 1
          }
          if (maploc[i].record[ki].type == 3) {
            if (maploc[i].data[ki].tech == tech2.userData.name) {
              i_is_source = 1
            }
          }
        }

        for (var kj = 0; kj < maploc[j].record.length; kj++) {
          // check if node j is a sink for fin3
          if (maploc[j].record[kj].type == 1) {
            if (maploc[j].data[kj].prod == fin3.userData.name) {
              j_is_target = 1
            }
          }
        }

        if (i_is_source && j_is_target) {
          var connection = newtransconnection(maploc[i].transnodeobj3.id, maploc[j].transnodeobj3.id, transmaps[3])
          transmaps[3].add(connection)
        }
      }
    }
  }

  // add trans link to the second map of fin4
  for (var i = 0; i < maploc.length; i++){
    for (var j = 0; j < maploc.length; j++){
      if (i !== j) {

        var i_is_source = 0
        var j_is_target = 0
        // check if node i is a source for fin4
        for (var ki = 0; ki < maploc[i].record.length; ki++) {
          if (maploc[i].record[ki].type == 2) {
            i_is_source = 1
          }
          if (maploc[i].record[ki].type == 3) {
            if (maploc[i].data[ki].tech == tech3.userData.name) {
              i_is_source = 1
            }
          }
        }

        for (var kj = 0; kj < maploc[j].record.length; kj++) {
          // check if node j is a sink for fin4
          if (maploc[j].record[kj].type == 1) {
            if (maploc[j].data[kj].prod == fin4.userData.name) {
              j_is_target = 1
            }
          }
        }

        if (i_is_source && j_is_target) {
          var connection = newtransconnection(maploc[i].transnodeobj4.id, maploc[j].transnodeobj4.id, transmaps[4])
          transmaps[4].add(connection)
        }
      }
    }
  }

  // add trans link to the second map of fin5
  for (var i = 0; i < maploc.length; i++){
    for (var j = 0; j < maploc.length; j++){
      if (i !== j) {

        var i_is_source = 0
        var j_is_target = 0
        // check if node i is a source for fin5
        for (var ki = 0; ki < maploc[i].record.length; ki++) {
          if (maploc[i].record[ki].type == 2) {
            i_is_source = 1
          }
          if (maploc[i].record[ki].type == 3) {
            if (maploc[i].data[ki].tech == tech3.userData.name) {
              i_is_source = 1
            }
          }
        }

        for (var kj = 0; kj < maploc[j].record.length; kj++) {
          // check if node j is a sink for fin5
          if (maploc[j].record[kj].type == 1) {
            if (maploc[j].data[kj].prod == fin5.userData.name) {
              j_is_target = 1
            }
          }
        }

        if (i_is_source && j_is_target) {
          var connection = newtransconnection(maploc[i].transnodeobj5.id, maploc[j].transnodeobj5.id, transmaps[5])
          transmaps[5].add(connection)
        }
      }
    }
  }

}


function initstep6(){
  $('#custom_step6_warning').html("<p>Click Run to run the model with your data!</p> <div class = 'text-center'> <button class = 'btn default' onclick='loadspinner(), passdata()'>Run!</button></div>")
  // extract transportation information from step 5.
  fgls = []
  for (var i = 0; i < transmaps.length; i++){
    fgls.push({transmap: transmaps[i].getFigures().asArray()})
  }

  transls = '['
  for (var i = 0; i < fgls.length; i++) {
    var datals = '['
    for (var j = 0; j<fgls[i].transmap.length; j++){
      if (fgls[i].transmap[j].cssClass.includes("ection")) {
        var myObj = JSON.stringify(fgls[i].transmap[j].userData)
        datals = datals + myObj + ","
      }
    }
    datals = datals.slice(0,-1) + "]"
    transls = transls + datals + ","
  }
  transls = transls.slice(0,-1) + "]"

  var writer = new draw2d.io.json.Writer();
  writer.marshal(canvas, function(json){
      graphdata =json;
      graphdatastr = JSON.stringify(json,null,2);
  });

  maplocdata = '['
  for (var i = 0; i < maploc.length; i++) {
    var myObj = JSON.stringify({node: maploc[i].node, name: maploc[i].name, x: maploc[i].x, y: maploc[i].y, type: maploc[i].record, data: maploc[i].data})
    maplocdata = maplocdata + myObj + ","
  }
  maplocdata = maplocdata.slice(0,-1) + "]"
  //console.log(maplocdata)
}

window.onload = function (){
    // This part is for step 2
     canvas = new draw2d.Canvas('gfx_holder');

     canvas.installEditPolicy( new draw2d.policy.connection.DragConnectionCreatePolicy({
      createConnection: function(){
          var connection = new MyConnection()
          connection.setSelectable(false)
          connection.on("added", function(emitter, event){
          canvas.remove(connection) //this page does not allow new connections
        })

        connection.on("click", function(emitter,event){
          var sourceshape = connection.getSource().getParent().cssClass
          var targetshape = connection.getTarget().getParent().cssClass
          if (sourceshape == targetshape ) {
            canvas.remove(connection)
            alertify.error("Cannot Connect!");
          }
        })

        connection.on("dblclick", function(emitter,event){
          var sourceshape = connection.getSource().getParent().cssClass
          var targetshape = connection.getTarget().getParent().cssClass

          var transforminfoHTML = '<p> *Transformation coefficient: </p> <input class="ajs-input" id="transform2" type="number" value = "'+String(connection.userData.yield)+'" step = 0.1 />';
          $('.transforminfo').html("");

          alertify.confirm(transforminfoHTML).set('onok', function(closeEvent) {

            var transform = $('#transform2').val();
            if (transform == "") {
              transform = 0
              alertify.error("No input");
            }
            if (transform == 0 || (transform > 0 && sourceshape.includes("Circle")) || (transform < 0 && targetshape.includes("Circle")) ){
              alertify.error('Input not valid');
              $('#transform2')[0].value = connection.userData.yield
            } else {
            connection.userData = {"yield": transform}
          }
            $('.transforminfo').html('<p> *Transformation coefficient: </p> <input class="ajs-input" id="transform" type="number" step = 0.1 />')

        }).set('oncancel', function(closeEvent){
          canvas.remove(connection);
          $('.transforminfo').html('<p> *Transformation coefficient: </p> <input class="ajs-input" id="transform" type="number" step = 0.1 />')

        }).set('title', "Transformation Coefficient").set('labels', {ok:'Ok', cancel:'Delete'}).set('closable',false)
      })

      return connection
    }
  }));
  // add default structure
  raw1 = newcircle("cow manure", 3, "raw cow manure", 'raw');
  canvas.add(raw1, 10,100);

  tech1 = newrectangle("biogas generation", 150000, 250000, 1000000, 7.2, 60555, 3.2, "biogas generation technology for cow manure", "t1");
  canvas.add(tech1, 200,100)

  con1 = newconnection(raw1.id,tech1.id, -1);
  canvas.add(con1)

  int1 = newcircle('digestate', 3, 'digestate from cow manure', 'int');
  canvas.add(int1, 350,200);

  fin1 = newcircle('biogas', 99, 'biogas', 'final');
  canvas.add(fin1, 500,20);

  con2 = newconnection(tech1.id, fin1.id, 0.05);
  canvas.add(con2)

  con3 = newconnection(tech1.id, int1.id, 0.95);
  canvas.add(con3)

  tech2 = newrectangle("separation", 0, 100000, 100000, 2, 10000, 1, "separation of digestate", "t2");
  canvas.add(tech2, 500,200)

  fin2 = newcircle('solid digestate', 1, 'solid digestate', 'final');
  canvas.add(fin2, 650,100);

  fin3 = newcircle('liquid digestate', 3.5, 'liquid digestate', 'final');
  canvas.add(fin3, 650,300);

  con4 = newconnection(int1.id, tech2.id, -1);
  canvas.add(con4)

  con5 = newconnection(tech2.id, fin2.id, 0.15);
  canvas.add(con5)

  con6 = newconnection(tech2.id, fin3.id, 0.85);
  canvas.add(con6)

  tech3 = newrectangle("separation 2", 0, 100000, 100000, 2, 10000, 1, "separation of raw manure", "t3");
  canvas.add(tech3, 200,450)

  fin4 = newcircle('solid raw manure', 1.5, 'solid raw manure', 'final');
  canvas.add(fin4, 500,350);

  fin5 = newcircle('liquid raw manure', 4, 'liquid raw manure', 'final');
  canvas.add(fin5, 500,550);

  con7 = newconnection(raw1.id, tech3.id, -1);
  canvas.add(con7)

  con8 = newconnection(tech3.id, fin4.id, 0.15);
  canvas.add(con8)

  con9 = newconnection(tech3.id, fin5.id, 0.85);
  canvas.add(con9)

// This part is for step 3
  geomap = new draw2d.Canvas('gfx_holder2');

  maploc = [{node: "n1", name: "node1", x: 30, y: 20},  //farm
            {node: "n2", name: "node2", x: 30, y: 500},
            {node: "n3", name: "node3", x: 400, y:10},
            {node: "n4", name: "node4", x: 600, y: 500},
            {node: "n5", name: "node5", x: 300, y: 250}, // tech candidate
            {node: "n6", name: "node6", x: 450, y: 150},
            {node: "n7", name: "node7", x: 100, y: 430},
            {node: "n8", name: "node8", x: 300, y: 30}, // land
            {node: "n9", name: "node9", x: 400, y: 200},
            {node: "n10", name: "node10", x: 700, y: 35},
            {node: "n11", name: "node11", x: 250, y: 480}];

  for (var i = 0; i < maploc.length; i++){
    var undefnode = newundefnode("n" + String(i+1));
    geomap.add(undefnode, maploc[i].x, maploc[i].y);
  }

  distable = $("#custom_dis_table").html()
  for (var i = 0; i < maploc.length; i++){
    distable = distable + "<tr><td>n"+String(i+1) + "</td>"
    for (var j = 0; j < maploc.length; j++){
      var dis_ij = Math.floor(Math.sqrt((maploc[i].x - maploc[j].x)**2 + (maploc[i].y - maploc[j].y)**2))
      distable = distable + "<td id = 'dis_n"  + String(i+1) +"n"+ String(j+1) + "'>" + String(dis_ij) + "</td>"
    }
    distable = distable + "</tr>"
  }
  $("#custom_dis_table").html(distable)

// initialize map for step 4, but is clear until step3 is finished
  geomapn = new draw2d.Canvas('gfx_holder3');

// initialize map for step 5, but is clear until step4 is finished

  transmaps = []
  for (var i = 1; i<=6; i++){
    var transmap = new draw2d.Canvas('gfx_holder' + (i+3));

  transmaps.push(transmap)
  }
};


function passdata() {
  var el = document.getElementsByName("csrfmiddlewaretoken");
  csrf_value = el[0].getAttribute("value");
  $.ajaxSettings.traditional = true;
  jQuery.ajax({
    method: "POST",
    url: "",
    data: {type:"custom_model_data", nodedata: maplocdata,csrfmiddlewaretoken: csrf_value, pgraphdata:graphdatastr, transdata: transls}, //,
    success: function(response){window.location.href = response.redirect;}}).done(function (data) {
      if (data.success) {
        window.location.href = data.url;}
      });

}

function loadspinner(){
  $("#overlaycontainer").css("display","block");
}
