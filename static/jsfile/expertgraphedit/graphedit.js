// initialize canvas

var timeunit
try {
  timeunit = document.getElementById("helper").getAttribute("time-unit");
} catch {
  timeunit = 'year'
}

var coef = 1.0
if (timeunit == 'year') {
  coef = 1.0
} else if (timeunit == 'month') {
  coef = 1.0/12
} else if (timeunit == 'day') {
  coef = 1.0/365
}

var produnitform = '<p> *Product unit: </p> <br/> <div class = "selectdiv" ><select name="type" id = "transcostunit"> <option value = "UNIT">UNIT</option> <option value = "metric tonne">metric tonne</option> <option value = "kg">kg</option> <option value = "lb">lb</option> <option value = "cubic meter">cubic meter</option> <option value = "liter">liter</option> <option value = "gallon">gallon</option> <option value = "kWh">kWh</option> <option value = "BTU">BTU</option> </select> </div> <br/><br/>'

var empty_prod_form = '<p> *Product name: </p> <input class="ajs-input" id="inpOne" type="text" /> ' + produnitform +'<p> *Transportation cost USD/unit/km: </p> <input class="ajs-input" id="inpTwo" type="number" step = 0.1 min = 0 /> <p> Additional information: </p> <input class="ajs-input" id="inpThree" type="text" />'
var empty_tech_form1 = '<p> *Technology name: </p> <input class="ajs-input" id="techOne" type="text" /> <p>*Reference product: </p> <br/> <div class = "selectdiv" ><select name="type" id = "refprod_select"> '
var empty_tech_form2 = '</select> </div> <br/><br/> <p> *Minimum capacity [unit reference product/' + timeunit + ']: </p> <input class="ajs-input" id="techTwo" type="number" step = 10 min = 0 /> <p> *Maximum capacity [unit reference product/' + timeunit + ']: </p> <input class="ajs-input" id="techThree" type="number" step = 10 min = 0  /> <p> *Investment cost (fixed) [USD]: </p> <input class="ajs-input" id="techFour" type="number" step = 10 min = 0  /> <p> *Investment cost (proportioanl) [USD/(unit reference product/' + timeunit + ')]: </p> <input class="ajs-input" id="techFive" type="number" step = 10 min = 0  /> <p> *Operational cost (fixed) [USD/' + timeunit + ']: </p> <input class="ajs-input" id="techSix" type="number" step = 10 min = 0  /> <p> *Operational cost (proportioanl) [USD/unit reference product]: </p> <input class="ajs-input" id="techSeven" type="number" step = 10 min = 0  /> <p> Additional information: </p> <input class="ajs-input" id="techEight" type="text" />'
var empty_tech_form = empty_tech_form1 + empty_tech_form2



function initcanvas(){
  canvas = new draw2d.Canvas('gfx_holder');
  canvas.installEditPolicy( new draw2d.policy.connection.DragConnectionCreatePolicy({
   createConnection: function(){
       var connection = new MyConnection()
       connection.setSelectable(false)
       connection.on("added", function(emitter, event){
         var sourceshape = connection.getSource().getParent().cssClass
         var targetshape = connection.getTarget().getParent().cssClass
         if (sourceshape == targetshape ) {
           alertify.error("Cannot Connect!");
           canvas.remove(connection)

         }
         else {
           var cncunit
          if (sourceshape.includes("Circle")){
            cncunit = connection.getSource().getParent().userData.unit
          } else {
            cncunit = connection.getTarget().getParent().userData.unit
          }
         var transforminfoHTML = '<p> *Transformation coefficient (' + cncunit + '): </p> <input class="ajs-input" id="transform" type="number" value = "" step = 0.1/>';
         $('.transforminfo').html("");
           alertify.alert().setting({
             'label':'Ok',
             'title': 'Transformation Coefficient',
             'message': transforminfoHTML,
             'onok': function(closeEvent) {
               var transform = $('#transform').val();
               if (transform == "") {
                 transform = 0
               }
               if (transform <= 0){
                 alertify.error("Input not valid!");
                 canvas.remove(connection)

               } else {
                 if (sourceshape.includes("Circle")) {
                   connection.userData = {"yield": -transform}
                 }
                 else {
                   connection.userData = {"yield": transform}
                 }
               }
               $('#transform')[0].value = '';
               $('.transforminfo').html(transforminfoHTML)
             },
             'closable':false}
           ).show();
       }
     })

     connection.on("dblclick", function(emitter,event){
       var sourceshape = connection.getSource().getParent().cssClass
       var targetshape = connection.getTarget().getParent().cssClass
       var cncunit
       var yieldnumber
      if (sourceshape.includes("Circle")){
        cncunit = connection.getSource().getParent().userData.unit
        yieldnumber = String(-connection.userData.yield)
      } else {
        cncunit = connection.getTarget().getParent().userData.unit
        yieldnumber = String(+connection.userData.yield)
      }
       var transforminfoHTML = '<p> *Transformation coefficient (' + cncunit + '): </p> <input class="ajs-input" id="transform2" type="number" value = "'+yieldnumber+'" step = 0.1/>';
       $('.transforminfo').html("");

       alertify.confirm(transforminfoHTML).set('onok', function(closeEvent) {

         var transform = $('#transform2').val();
         if (transform == "") {
           transform = 0
           alertify.error("No input");
         }
         if (transform <= 0){
           alertify.error('Input not valid');
           $('#transform2')[0].value = yieldnumber
         } else {
           if (sourceshape.includes("Circle")){
             connection.userData = {"yield": -transform}
           }
           else {
             connection.userData = {"yield": transform}
           }
       }
         $('.transforminfo').html('<p> *Transformation coefficient: </p> <input class="ajs-input" id="transform" type="number" step = 0.1/>')

     }).set('oncancel', function(closeEvent){
       canvas.remove(connection);
       $('.transforminfo').html('<p> *Transformation coefficient: </p> <input class="ajs-input" id="transform" type="number" step = 0.1/>')

     }).set('title', "Transformation Coefficient").set('labels', {ok:'Ok', cancel:'Delete'}).set('closable',false)
   })

   return connection
 }
}));
}
// for adding existing elements
function addcircle(item, modify = 1){
  var figure = new draw2d.shape.basic.Circle({height: 40, width:40});
  var title
  figure.id = item.id
  figure.userData = item.userData
  figure.add(new draw2d.shape.basic.Label({text:figure.userData.name, x:55, y:25, stroke:0}), new draw2d.layout.locator.BottomLocator());

  if (item.ports.length == 1 && item.ports[0].type.includes('Output')){
    var rawcolor = new draw2d.util.Color("#f7ee36")
    figure.resetPorts();
    figure.createPort("output", new draw2d.layout.locator.RightLocator()).setSelectable(false).setResizeable(false)
    figure.setBackgroundColor(rawcolor)
    figure.setColor(rawcolor.darker())
    title = "Raw Material Information"
  }

  if (item.ports.length == 1 && item.ports[0].type.includes('Input')){
    var rawcolor = new draw2d.util.Color("#2ad148")
    figure.resetPorts();
    figure.createPort("input", new draw2d.layout.locator.LeftLocator()).setSelectable(false).setResizeable(false)
    figure.setBackgroundColor(rawcolor)
    figure.setColor(rawcolor.darker())
    title = "Final Product Information"
  }

  if (item.ports.length == 2) {
    var rawcolor = new draw2d.util.Color("#3ea9f0")
    figure.resetPorts();
    figure.createPort("input", new draw2d.layout.locator.LeftLocator()).setSelectable(false).setResizeable(false)
    figure.createPort("output", new draw2d.layout.locator.RightLocator()).setSelectable(false).setResizeable(false)
    figure.setBackgroundColor(rawcolor)
    figure.setColor(rawcolor.darker())
    title = "Intermediate Product Information"
  }

  figure.on("dblclick", function(emitter, event) {

    var content = $('.productinfo').html()
    var productinfoHTML = content;
    $('.productinfo').html("");


    var alarm = alertify.confirm(productinfoHTML)

    $('#inpOne').val(figure.userData.name);
    $('#inpTwo').val(figure.userData.transcost);
    $('#inpThree').val(figure.userData.addinfo);
    $('#transcostunit').val(figure.userData.unit);

    if (modify == 0) {
      $('#inpOne').attr('readonly', true);
      $('#inpTwo').attr('readonly', true);
      $('#inpThree').attr('readonly', true);
      $('#transcostunit').attr('disabled', true);
    }

    alarm.set('onok', function(closeEvent) {

      var prodname = $('#inpOne').val();
      var transunit = $('#transcostunit').val();
      var transcost = $('#inpTwo').val();
      var addinfo = $('#inpThree').val();

      $('#inpOne')[0].value = figure.userData.name;
      $('#inpTwo')[0].value = figure.userData.transcost;
      $('#inpThree')[0].value = figure.userData.addinfo;
      $('#transcostunit')[0].value = figure.userData.unit;


      if (prodname != "" && transcost != ""){
        if (Number(transcost) < 0) {
          alertify.error('Input not valid!');}
        else{
        figure.resetChildren()
        figure.add(new draw2d.shape.basic.Label({text:prodname, x:55, y:25, stroke:0}), new draw2d.layout.locator.BottomLocator());
        figure.userData = {"name": prodname, "transcost": transcost, "addinfo": addinfo, "unit": transunit}
      }
    } else {
      alertify.error('Please enter required information!');
    }
      $('.productinfo').html(empty_prod_form)
  }).set('oncancel', function(closeEvent){
    $('#inpOne')[0].value = figure.userData.name;
    $('#inpTwo')[0].value = figure.userData.transcost;
    $('#inpThree')[0].value = figure.userData.addinfo;
    $('#transcostunit')[0].value = figure.userData.transunit;
    $('.productinfo').html(empty_prod_form)}).set('title', title).set('labels', {ok:'Ok', cancel:'Cancel'}).set('closable',false);
  })
  return figure
}


function addrectangle(item, modify = 1){
  var rawcolor = new draw2d.util.Color("#adadad")
  var figure = new draw2d.shape.basic.Rectangle({height: 40, width: 70, radius: 5});
  figure.id = item.id
  figure.userData = item.userData
  figure.add(new draw2d.shape.basic.Label({text:figure.userData.name, x:55, y:25, stroke:0}), new draw2d.layout.locator.BottomLocator());

  figure.resetPorts();
  figure.createPort("input", new draw2d.layout.locator.LeftLocator()).setSelectable(false).setResizeable(false)
  figure.createPort("output", new draw2d.layout.locator.RightLocator()).setSelectable(false).setResizeable(false)
  figure.setBackgroundColor(rawcolor)
  figure.setColor(rawcolor.darker())

  figure.on("dblclick", function(emitter, event) {

    var options = ''

    var inputconnections = figure.getInputPort(0).getConnections().asArray()
    for (var i = 0; i < inputconnections.length; i++){
      var cnc = inputconnections[i]
      if (cnc.getCanvas()){
        var sourcenode = cnc.getSource().getParent()
        prodname = sourcenode.userData.name
        options = options + '<option value = "' + prodname + '"> ' + prodname + ' </option>'
      }
    }

    var outputconnections = figure.getOutputPort(0).getConnections().asArray()
    for (var i = 0; i < outputconnections.length; i++){
      var cnc = outputconnections[i]
      if (cnc.getCanvas()){
        var targetnode = cnc.getTarget().getParent()
        prodname = targetnode.userData.name
        options = options + '<option value = "' + prodname + '"> ' + prodname + ' </option>'
      }
    }

    var content = empty_tech_form1 + options + empty_tech_form2
    var technologyinfoHTML = content;
    $('.technologyinfo').html("");

    var data = figure.userData
    var alarm = alertify.confirm(technologyinfoHTML)

    //console.log(figure.userData)
    $('#techOne').val(data.name);
    $('#techTwo').val(coef*data.capmin);
    $('#techThree').val(coef*data.capmax);
    $('#techFour').val(data.invfix);
    $('#techFive').val(coef*data.invpro);
    $('#techSix').val(coef*data.opfix);
    $('#techSeven').val(data.oppro);
    $('#techEight').val(data.addinfo);
    $('#refprod_select').val(data.refprod);

    if (modify == 0) {
      $('#techOne').attr('readonly', true);
      $('#techTwo').attr('readonly', true);
      $('#techThree').attr('readonly', true);
      $('#techFour').attr('readonly', true);
      $('#techFive').attr('readonly', true);
      $('#techSix').attr('readonly', true);
      $('#techSeven').attr('readonly', true);
      $('#techEight').attr('readonly', true);
      $('#refprod_select').attr('disabled', true);
    }

    alarm.set('onok', function(closeEvent) {

      var techname = $('#techOne').val();
      var capmin = $('#techTwo').val()/coef;
      var capmax = $('#techThree').val()/coef;
      var invfix = $('#techFour').val();
      var invpro = $('#techFive').val()/coef;
      var opfix = $('#techSix').val()/coef;
      var oppro = $('#techSeven').val();
      var addinfo = $('#techEight').val();
      var refprod = $('#refprod_select').val();

      if (String(techname) != "" && String(capmin) != "" && String(capmax) != "" && String(invfix) != "" && String(invpro) != "" && String(opfix) != "" && String(oppro) != ""){
        if (Number(capmax) < Number(capmin) || Number(capmax) <= 0 || Number(capmin) <= 0 || Number(invfix) < 0 || Number(invpro) < 0 || Number(opfix) < 0 || Number(oppro) < 0) {
          alertify.error('Input not valid!');
        }
        else{
        figure.resetChildren()
        figure.add(new draw2d.shape.basic.Label({text:techname, x:55, y:25, stroke:0}), new draw2d.layout.locator.BottomLocator());
        figure.userData = {"name": techname, "capmin": capmin, "capmax": capmax, "invfix": invfix, "invpro": invpro, "opfix": opfix, "oppro": oppro, "addinfo": addinfo, "refprod": refprod}
      }
    } else {
      alertify.error('Please enter required information!');
    }
      $('.technologyinfo').html(empty_tech_form)
      alarm.destroy();
  }).set('oncancel', function(closeEvent){
    $('.technologyinfo').html(empty_tech_form)
    alarm.destroy();
    }).set('title', "Technology Information").set('labels', {ok:'Ok', cancel:'Cancel'}).set('closable',false);
  })
  return figure
}


function addconnection(item, modify = 1){
  var connection = new MyConnection()
  connection.setSelectable(false)
  var sourcenodeid = item.source.node
  var targetnodeid = item.target.node
  connection.setSource(canvas.getFigure(sourcenodeid).getOutputPort(0))
  connection.setTarget(canvas.getFigure(targetnodeid).getInputPort(0))
  connection.userData = item.userData

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
    var cncunit
    var yieldnumber
   if (sourceshape.includes("Circle")){
     cncunit = connection.getSource().getParent().userData.unit
     yieldnumber = String(-connection.userData.yield)
   } else {
     cncunit = connection.getTarget().getParent().userData.unit
     yieldnumber = String(+connection.userData.yield)
   }
   var transforminfoHTML
    if (modify){
      transforminfoHTML = '<p> *Transformation coefficient (' + cncunit + '): </p> <input class="ajs-input" id="transform2" type="number" value = "'+yieldnumber+'" step = 0.1/>';
    } else {
      transforminfoHTML = '<p> *Transformation coefficient (' + cncunit + '): </p> <input class="ajs-input" id="transform2" type="number" value = "'+yieldnumber+'" step = 0.1 readonly="readonly"/>';
    }

    $('.transforminfo').html("");

    alertify.confirm(transforminfoHTML).set('onok', function(closeEvent) {

      var transform = $('#transform2').val();
      if (transform == "") {
        transform = 0
        alertify.error("No input");
      }
      if (transform <= 0){
        alertify.error('Input not valid');
        $('#transform2')[0].value = yieldnumber
      } else {
        if (sourceshape.includes("Circle")){
          connection.userData = {"yield": -transform}
        }
        else {
          connection.userData = {"yield": transform}
        }
    }
      $('.transforminfo').html('<p> *Transformation coefficient: </p> <input class="ajs-input" id="transform" type="number" step = 0.1/>')

  }).set('oncancel', function(closeEvent){
    canvas.remove(connection);

    $('.transforminfo').html('<p> *Transformation coefficient: </p> <input class="ajs-input" id="transform" type="number" step = 0.1/>')

  }).set('title', "Transformation Coefficient").set('labels', {ok:'Ok', cancel:'Delete'}).set('closable',false)
})

  return connection
}


// for adding new elements
function addprod(type, addnotice = 1, y = 200){

  var figure = new draw2d.shape.basic.Circle({height: 40, width:40});
  figure.resetPorts();
  var locx

  if (type == "raw"){
    var rawcolor = new draw2d.util.Color("#f7ee36")
    figure.createPort("output", new draw2d.layout.locator.RightLocator()).setSelectable(false).setResizeable(false)
    locx = 200
  }

  if (type == "final"){
    var rawcolor = new draw2d.util.Color("#2ad148")
    figure.createPort("input", new draw2d.layout.locator.LeftLocator()).setSelectable(false).setResizeable(false)
    locx = 660
  }

  if (type == "int"){
    var rawcolor = new draw2d.util.Color("#3ea9f0")
    figure.createPort("input", new draw2d.layout.locator.LeftLocator()).setSelectable(false).setResizeable(false)
    figure.createPort("output", new draw2d.layout.locator.RightLocator()).setSelectable(false).setResizeable(false)
    locx = 400
  }

  figure.setBackgroundColor(rawcolor)
  figure.setColor(rawcolor.darker())
  if (addnotice) {
    figure.on("added", function(emitter, event){
      var productinfoHTML = $('.productinfo').html();
      $('.productinfo').html("");

      alertify.confirm(productinfoHTML).set('onok', function(closeEvent) {
        var prodname = $('#inpOne').val();
        var transcost = $('#inpTwo').val();
        var addinfo = $('#inpThree').val();
        var transunit = $('#transcostunit').val();

        if (prodname != "" && transcost != ""){
          if (Number(transcost) < 0) {
            alertify.error('Input not valid!');
            canvas.remove(figure);
          }
          else{
          figure.add(new draw2d.shape.basic.Label({text:prodname, x:55, y:25, stroke:0}), new draw2d.layout.locator.BottomLocator());
          figure.userData = {"name": prodname, "transcost": transcost, "addinfo": addinfo, "unit": transunit }
        }
      } else {
        alertify.error('Please enter required information!');
        canvas.remove(figure);
      }
        $('#inpOne')[0].value = '';
        $('#inpTwo')[0].value = '';
        $('#inpThree')[0].value = '';
        $('#transcostunit')[0].value = ''
        $('.productinfo').html(productinfoHTML)
    }).set('oncancel', function(closeEvent){
      canvas.remove(figure);
      $('#inpOne')[0].value = '';
      $('#inpTwo')[0].value = '';
      $('#inpThree')[0].value = '';
      $('#transcostunit')[0].value = ''
      $('.productinfo').html(productinfoHTML)}).set('title', "Raw Material Information").set('labels', {ok:'Ok', cancel:'Cancel'}).set('closable',false);
    })
  }

  figure.on("dblclick", function(emitter, event) {

    var data = figure.userData

    var content = $('.productinfo').html()
    var productinfoHTML = content;
    $('.productinfo').html("");


    var alarm = alertify.confirm(productinfoHTML)

    $('#inpOne').val(data.name);
    $('#inpTwo').val(data.transcost);
    $('#inpThree').val(data.addinfo);
    $('#transcostunit').val(data.unit);

    alarm.set('onok', function(closeEvent) {

      var prodname = $('#inpOne').val();
      var transcost = $('#inpTwo').val();
      var addinfo = $('#inpThree').val();
      var transunit = $('#transcostunit').val();

      $('#inpOne')[0].value = data.name;
      $('#inpTwo')[0].value = data.transcost;
      $('#inpThree')[0].value = data.addinfo;
      $('#transcostunit')[0].value = data.unit

      if (prodname != "" && transcost != ""){
        if (Number(transcost) < 0) {
          alertify.error('Input not valid!');}
        else{
        figure.resetChildren()
        figure.add(new draw2d.shape.basic.Label({text:prodname, x:55, y:25, stroke:0}), new draw2d.layout.locator.BottomLocator());
        figure.userData = {"name": prodname, "transcost": transcost, "addinfo": addinfo, "unit": transunit}
      }
    } else {

      alertify.error('Please enter required information!');
    }
      $('.productinfo').html(empty_prod_form);
      alarm.destroy();
  }).set('oncancel', function(closeEvent){
    $('#inpOne')[0].value = data.name;
    $('#inpTwo')[0].value = data.transcost;
    $('#inpThree')[0].value = data.addinfo;
    $('#transcostunit')[0].value = data.unit
    $('.productinfo').html(empty_prod_form)
    alarm.destroy()}).set('title', "Raw Material Information").set('labels', {ok:'Ok', cancel:'Cancel'}).set('closable',false);

  })

  canvas.add(figure, locx, y);
  return figure
}

function addtec(addnotice = 1, y = 200){

  var rawcolor = new draw2d.util.Color("#adadad")
  var figure = new draw2d.shape.basic.Rectangle({height: 40, width: 70, radius: 5});

  figure.resetPorts();
  figure.createPort("input", new draw2d.layout.locator.LeftLocator()).setSelectable(false).setResizeable(false)
  figure.createPort("output", new draw2d.layout.locator.RightLocator()).setSelectable(false).setResizeable(false)
  figure.setBackgroundColor(rawcolor)
  figure.setColor(rawcolor.darker())

  if (addnotice){
    figure.on("added", function(emitter, event){
      var technologyinfoHTML = $('.technologyinfo').html();
      $('.technologyinfo').html("");

      alertify.confirm(technologyinfoHTML).set('onok', function(closeEvent) {
        var techname = $('#techOne').val();
        var capmin = $('#techTwo').val()/coef;
        var capmax = $('#techThree').val()/coef;
        var invfix = $('#techFour').val();
        var invpro = $('#techFive').val()/coef;
        var opfix = $('#techSix').val()/coef;
        var oppro = $('#techSeven').val();
        var addinfo = $('#techEight').val();
        var refprod = $('#refprod_select').val();

        if (String(techname) != "" && String(capmin) != "" && String(capmax) != "" && String(invfix) != "" && String(invpro) != "" && String(opfix) != "" && String(oppro) != ""){
          if (Number(capmax) < Number(capmin) || Number(capmax) <= 0 || Number(capmin) <= 0 || Number(invfix) < 0 || Number(invpro) < 0 || Number(opfix) < 0 || Number(oppro) < 0) {
            alertify.error('Input not valid!');
            canvas.remove(figure);
          }
          else{
          figure.add(new draw2d.shape.basic.Label({text:techname, x:55, y:25, stroke:0}), new draw2d.layout.locator.BottomLocator());
          figure.userData = {"name": techname, "capmin": capmin, "capmax": capmax, "invfix": invfix, "invpro": invpro, "opfix": opfix, "oppro": oppro, "addinfo": addinfo, "refprod": refprod}
        }
      } else {
        alertify.error('Please enter required information!');
        canvas.remove(figure);
      }
      $('#techOne')[0].value = '';
      $('#techTwo')[0].value = '';
      $('#techThree')[0].value = '';
      $('#techFour')[0].value = '';
      $('#techFive')[0].value = '';
      $('#techSix')[0].value = '';
      $('#techSeven')[0].value = '';
      $('#techEight')[0].value = '';
      $('#refprod_select')[0].value = '';
      $('.technologyinfo').html(technologyinfoHTML)
    }).set('oncancel', function(closeEvent){
      canvas.remove(figure);
      $('#techOne')[0].value = '';
      $('#techTwo')[0].value = '';
      $('#techThree')[0].value = '';
      $('#techFour')[0].value = '';
      $('#techFive')[0].value = '';
      $('#techSix')[0].value = '';
      $('#techSeven')[0].value = '';
      $('#techEight')[0].value = '';
      $('#refprod_select')[0].value = '';
      $('.technologyinfo').html(technologyinfoHTML)}).set('title', "Technology Information").set('labels', {ok:'Ok', cancel:'Cancel'}).set('closable',false);
    })
  }

  figure.on("dblclick", function(emitter, event) {

    var options = ''

    var inputconnections = figure.getInputPort(0).getConnections().asArray()
    for (var i = 0; i < inputconnections.length; i++){
      var cnc = inputconnections[i]
      if (cnc.getCanvas()){
        var sourcenode = cnc.getSource().getParent()
        prodname = sourcenode.userData.name
        options = options + '<option value = "' + prodname + '">' + prodname + '</option>'
      }
    }

    var outputconnections = figure.getOutputPort(0).getConnections().asArray()
    for (var i = 0; i < outputconnections.length; i++){
      var cnc = outputconnections[i]
      if (cnc.getCanvas()){
        var targetnode = cnc.getTarget().getParent()
        prodname = targetnode.userData.name
        options = options + '<option value = "' + prodname + '">' + prodname + '</option>'
      }
    }

    var content = empty_tech_form1 + options + empty_tech_form2
    var technologyinfoHTML = content;
    $('.technologyinfo').html("");

    var data = figure.userData
    var alarm = alertify.confirm(technologyinfoHTML)

    $('#techOne').val(data.name);
    $('#techTwo').val(coef*data.capmin);
    $('#techThree').val(coef*data.capmax);
    $('#techFour').val(data.invfix);
    $('#techFive').val(coef*data.invpro);
    $('#techSix').val(coef*data.opfix);
    $('#techSeven').val(data.oppro);
    $('#techEight').val(data.addinfo);
    $('#refprod_select').val(data.refprod);

    alarm.set('onok', function(closeEvent) {

      var techname = $('#techOne').val();
      var capmin = $('#techTwo').val()/coef;
      var capmax = $('#techThree').val()/coef;
      var invfix = $('#techFour').val();
      var invpro = $('#techFive').val()/coef;
      var opfix = $('#techSix').val()/coef;
      var oppro = $('#techSeven').val();
      var addinfo = $('#techEight').val();
      var refprod = $('#refprod_select').val();

      if (String(techname) != "" && String(capmin) != "" && String(capmax) != "" && String(invfix) != "" && String(invpro) != "" && String(opfix) != "" && String(oppro) != ""){
        if (Number(capmax) < Number(capmin) || Number(capmax) <= 0 || Number(capmin) <= 0 || Number(invfix) < 0 || Number(invpro) < 0 || Number(opfix) < 0 || Number(oppro) < 0) {
          alertify.error('Input not valid!');
        }
        else{
        figure.resetChildren()
        figure.add(new draw2d.shape.basic.Label({text:techname, x:55, y:25, stroke:0}), new draw2d.layout.locator.BottomLocator());
        figure.userData = {"name": techname, "capmin": capmin, "capmax": capmax, "invfix": invfix, "invpro": invpro, "opfix": opfix, "oppro": oppro, "addinfo": addinfo, "refprod": refprod}
      }
    } else {
      alertify.error('Please enter required information!');
    }
      $('.technologyinfo').html(empty_tech_form)
      alarm.destroy();
  }).set('oncancel', function(closeEvent){
    $('.technologyinfo').html(empty_tech_form)
    alarm.destroy();
  }).set('title', "Technology Information").set('labels', {ok:'Ok', cancel:'Cancel'}).set('closable',false);
  })
  canvas.add(figure, 400,y);
  return figure
}

//for deleting element
function delete_el(){
  alertify.confirm('Confirm', 'Are you sure to delete this element?',
  function() {
    try {el = canvas.getPrimarySelection()
    canvas.remove(el)}
    catch(e) {
      alertify.error("Please select an element")
    }
},
  null).set('labels',{ok:'Yes', cancel:'Cancel'});
}

// for adding elements from database
function addcircle2(data,type){
  var figure = new draw2d.shape.basic.Circle({height: 40, width:40});
  var title
  figure.userData = data
  figure.add(new draw2d.shape.basic.Label({text:data.name, x:55, y:25, stroke:0}), new draw2d.layout.locator.BottomLocator());

  if (type == 'raw'){
    var rawcolor = new draw2d.util.Color("#f7ee36")
    figure.resetPorts();
    figure.createPort("output", new draw2d.layout.locator.RightLocator()).setSelectable(false).setResizeable(false)
    figure.setBackgroundColor(rawcolor)
    figure.setColor(rawcolor.darker())
    title = "Raw Material Information"
  }

  if (type == 'fin'){
    var rawcolor = new draw2d.util.Color("#2ad148")
    figure.resetPorts();
    figure.createPort("input", new draw2d.layout.locator.LeftLocator()).setSelectable(false).setResizeable(false)
    figure.setBackgroundColor(rawcolor)
    figure.setColor(rawcolor.darker())
    title = "Final Product Information"
  }

  if (type == 'itm') {
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
    var productinfoHTML = '<p> *Product name: </p> <input class="ajs-input" id="inpOne" type="text" value = "'+ String(data.name)+ '" /> ' + produnitform + '<p> *Transportation cost [USD/tonne/km]: </p> <input class="ajs-input" id="inpTwo" type="number" step = 0.1 min = 0 value = "'+String(data.transcost)+'" /> <p> Additional information: </p> <input class="ajs-input" id="inpThree" type="text" value = "'+String(data.addinfo)+'"  />';


    alertify.confirm(productinfoHTML).set('onok', function(closeEvent) {

      var prodname = $('#inpOne').val();
      var transcost = $('#inpTwo').val();
      var addinfo = $('#inpThree').val();
      var transunit = $('#transcostunit').val();

      $('#inpOne')[0].value = data.name;
      $('#inpTwo')[0].value = data.transcost;
      $('#inpThree')[0].value = data.addinfo;
      $('#transcostunit')[0].value = data.unit

      if (prodname != "" && transcost != ""){
        if (Number(transcost) < 0) {
          alertify.error('Input not valid!');}
        else{
        figure.resetChildren()
        figure.add(new draw2d.shape.basic.Label({text:prodname, x:55, y:25, stroke:0}), new draw2d.layout.locator.BottomLocator());
        figure.userData = {"name": prodname, "transcost": transcost, "addinfo": addinfo, "unit":transunit}
      }
    } else {
      alertify.error('Please enter required information!');
    }
      $('.productinfo').html(empty_prod_form)
  }).set('oncancel', function(closeEvent){
    $('#inpOne')[0].value = data.name;
    $('#inpTwo')[0].value = data.transcost;
    $('#inpThree')[0].value = data.addinfo;
    $('#transcostunit')[0].value = data.unit
    $('.productinfo').html(empty_prod_form)}).set('title', title).set('labels', {ok:'Ok', cancel:'Cancel'}).set('closable',false);
  })
  return figure
}

function addrectangle2(data){
  var rawcolor = new draw2d.util.Color("#adadad")
  var figure = new draw2d.shape.basic.Rectangle({height: 40, width: 70, radius: 5});
  figure.userData = data
  figure.add(new draw2d.shape.basic.Label({text:data.name, x:55, y:25, stroke:0}), new draw2d.layout.locator.BottomLocator());

  figure.resetPorts();
  figure.createPort("input", new draw2d.layout.locator.LeftLocator()).setSelectable(false).setResizeable(false)
  figure.createPort("output", new draw2d.layout.locator.RightLocator()).setSelectable(false).setResizeable(false)
  figure.setBackgroundColor(rawcolor)
  figure.setColor(rawcolor.darker())

  figure.on("dblclick", function(emitter, event) {

    var options = ''

    var inputconnections = figure.getInputPort(0).getConnections().asArray()
    for (var i = 0; i < inputconnections.length; i++){
      var cnc = inputconnections[i]
      if (cnc.getCanvas()){
        var sourcenode = cnc.getSource().getParent()
        prodname = sourcenode.userData.name
        options = options + '<option value = "' + prodname + '">' + prodname + '</option>'
      }
    }

    var outputconnections = figure.getOutputPort(0).getConnections().asArray()
    for (var i = 0; i < outputconnections.length; i++){
      var cnc = outputconnections[i]
      if (cnc.getCanvas()){
        var targetnode = cnc.getTarget().getParent()
        prodname = targetnode.userData.name
        options = options + '<option value = "' + prodname + '">' + prodname + '</option>'
      }
    }

    var content = empty_tech_form1 + options + empty_tech_form2
    var technologyinfoHTML = content;
    $('.technologyinfo').html("");

    var data = figure.userData
    var alarm = alertify.confirm(technologyinfoHTML)


    $('#techOne').val(data.name);
    $('#techTwo').val(coef*data.capmin);
    $('#techThree').val(coef*data.capmax);
    $('#techFour').val(data.invfix);
    $('#techFive').val(coef*data.invpro);
    $('#techSix').val(coef*data.opfix);
    $('#techSeven').val(data.oppro);
    $('#techEight').val(data.addinfo);
    $('#refprod_select').val(data.refprod);

    alarm.set('onok', function(closeEvent) {

      var techname = $('#techOne').val();
      var capmin = $('#techTwo').val()/coef;
      var capmax = $('#techThree').val()/coef;
      var invfix = $('#techFour').val();
      var invpro = $('#techFive').val()/coef;
      var opfix = $('#techSix').val()/coef;
      var oppro = $('#techSeven').val();
      var addinfo = $('#techEight').val();
      var refprod = $('#refprod_select').val();

      if (String(techname) != "" && String(capmin) != "" && String(capmax) != "" && String(invfix) != "" && String(invpro) != "" && String(opfix) != "" && String(oppro) != ""){
        if (Number(capmax) < Number(capmin) || Number(capmax) <= 0 || Number(capmin) <= 0 || Number(invfix) < 0 || Number(invpro) < 0 || Number(opfix) < 0 || Number(oppro) < 0) {
          alertify.error('Input not valid!');
        }
        else{
        figure.resetChildren()
        figure.add(new draw2d.shape.basic.Label({text:techname, x:55, y:25, stroke:0}), new draw2d.layout.locator.BottomLocator());
        figure.userData = {"name": techname, "capmin": capmin, "capmax": capmax, "invfix": invfix, "invpro": invpro, "opfix": opfix, "oppro": oppro, "addinfo": addinfo, "refprod":refprod}
      }
    } else {
      alertify.error('Please enter required information!');
    }
      $('.technologyinfo').html(empty_tech_form)
      alarm.destroy()
  }).set('oncancel', function(closeEvent){
    $('.technologyinfo').html(empty_tech_form)
    alarm.destroy()
  }).set('title', "Technology Information").set('labels', {ok:'Ok', cancel:'Cancel'}).set('closable',false);
  })
  return figure
}

function addprod2(){
var prodbaseHTML = $('.prodbaseselection').html();
$('.prodbaseselection').html("");

alertify.confirm(prodbaseHTML).set('onok', function(closeEvent) {

  var e = document.getElementById("prodbase");
  var t = document.getElementById("prodtype");
  var prodname = e.options[e.selectedIndex].value;
  var prodtype = t.options[t.selectedIndex].value;
  var selection

  for (var i = 0; i < prodlist.length; i++) {
    if (prodlist[i].name == prodname) {
      selection = i;
    }
  }

  if (prodname != "" && prodtype != ""){
    figure = addcircle2(prodlist[selection], prodtype)
    canvas.add(figure,200,50)
  }
  else if (prodname == "") {
    alertify.error("Please select a product")
  }
  else if (prodtype == ""){
    alertify.error("Please specify the product type")
  }


  $('.prodbaseselection').html(prodbaseHTML)
}).set('oncancel', function(closeEvent){
  $('.prodbaseselection').html(prodbaseHTML)
}).set('title', "Add Product from Database").set('labels', {ok:'Ok', cancel:'Cancel'}).set('closable',false);
}

function addtech2(){
var techselectHTML = $('.techbaseselection').html();
$('.techbaseselection').html("");

alertify.confirm(techselectHTML).set('onok', function(closeEvent) {

  var e = document.getElementById("techbase");
  var techname = e.options[e.selectedIndex].value;
  var selection

  for (var i = 0; i < techlist.length; i++) {
    if (techlist[i].name == techname) {
      selection = i;
    }
  }

  if (techname != "") {
    figure = addrectangle2(techlist[selection])
    canvas.add(figure,400,50)
    //tech_prodset[figure.id] = []
  }
  else {
    alertify.error("Please select a technology")
  }

  $('.techbaseselection').html(techselectHTML)
}).set('oncancel', function(closeEvent){
  $('.techbaseselection').html(techselectHTML)
}).set('title', "Add Technology from Database").set('labels', {ok:'Ok', cancel:'Cancel'}).set('closable',false);
}

//for save graphs
function savefig(label, graph_id, task_id, assign = 0){
  var writer = new draw2d.io.json.Writer();
  var testele = document.getElementById('test');
  var graphdata
  var graphdatastr
  var pngwriter = new draw2d.io.png.Writer();
  var pngsrc

  var xCoords = [];
  var yCoords = [];
  canvas.getFigures().each(function(i,f){
      var b = f.getBoundingBox();
      xCoords.push(b.x, b.x+b.w);
      yCoords.push(b.y, b.y+b.h);
  });
  var minX   = Math.min.apply(Math, xCoords);
  var minY   = Math.min.apply(Math, yCoords);
  var width  = Math.max.apply(Math, xCoords)-minX;
  var height = Math.max.apply(Math, yCoords)-minY;

  pngwriter.marshal(canvas, function(png){
    pngsrc = png;
  }, new draw2d.geo.Rectangle(minX,minY,width,height));

  writer.marshal(canvas, function(json){
      graphdata =json;
      graphdatastr = JSON.stringify(json,null,2);
  });
  if (label == 1){
  alertify.prompt( 'Name your graph', 'Please enter the name of this graph:', '',
  function(evt, value) {
    var el = document.getElementsByName("csrfmiddlewaretoken");
    csrf_value = el[0].getAttribute("value");
    jQuery.ajax({
      method: "POST",
      url: "/expert/ajax/savegraph",
      data: {type:"newgraph", name: value, content: graphdatastr,csrfmiddlewaretoken: csrf_value, pngsrc: pngsrc},
      processData: false,
      success: function (data) {
        if (data.msg) {
          $("#test").text(data.msg);
          if (assign == 1){
            document.getElementById("graphconfirmbtn").setAttribute("onclick", "confirmgraph(" + data.graph_id + "," + task_id + ")")
          }
        }
      }
        });
},
  null);
  }
  else if (label == 0){
    alertify.confirm('Confirm', 'Save changes?', function(closeEvent){
      var el = document.getElementsByName("csrfmiddlewaretoken");
      csrf_value = el[0].getAttribute("value");
      jQuery.ajax({
        method: "POST",
        url: "/expert/ajax/savegraph",
        data: {type:"change", name: '', content: graphdatastr,csrfmiddlewaretoken: csrf_value, pngsrc: pngsrc, graph_id: graph_id},
        processData: false,
        success: function (data) {
          if (data.msg) {
            $("#test").text(data.msg);
            if (assign == 1){
            document.getElementById("graphconfirmbtn").setAttribute("onclick", "confirmgraph(" + data.graph_id + "," + task_id + ")")
            }
          }
        }
          });
  }, null);
  }
  else if (label == 2) {
    alertify.confirm('Confirm', 'Save changes and generate csv files?', function(closeEvent){
      var el = document.getElementsByName("csrfmiddlewaretoken");
      csrf_value = el[0].getAttribute("value");
      jQuery.ajax({
        method: "POST",
        url: "/expert/ajax/savegraph",
        data: {type:"csv", name: '', content: graphdatastr,csrfmiddlewaretoken: csrf_value, pngsrc: pngsrc, graph_id: graph_id},
        success: function(response){window.location.href = response.redirect;}}).done(function (data) {
          if (data.success) {
            window.location.href = data.url;}
          });
  }, null);
  }
}

// for automatically converting graph to csv files
function confirmgraph(graph_id, task_id) {

  var writer = new draw2d.io.json.Writer();
  var testele = document.getElementById('test');
  var graphdata
  var graphdatastr
  var pngwriter = new draw2d.io.png.Writer();
  var pngsrc

  var xCoords = [];
  var yCoords = [];
  canvas.getFigures().each(function(i,f){
      var b = f.getBoundingBox();
      xCoords.push(b.x, b.x+b.w);
      yCoords.push(b.y, b.y+b.h);
  });
  var minX   = Math.min.apply(Math, xCoords);
  var minY   = Math.min.apply(Math, yCoords);
  var width  = Math.max.apply(Math, xCoords)-minX;
  var height = Math.max.apply(Math, yCoords)-minY;

  pngwriter.marshal(canvas, function(png){
    pngsrc = png;
  }, new draw2d.geo.Rectangle(minX,minY,width,height));

  writer.marshal(canvas, function(json){
      graphdata =json;
      graphdatastr = JSON.stringify(json,null,2);
  });

  var el = document.getElementsByName("csrfmiddlewaretoken");
  csrf_value = el[0].getAttribute("value");

  jQuery.ajax({
    method: "POST",
    url: "/expert/ajax/confirmgraph",
    data: {type:"confirmgraph", name: '', content: graphdatastr,csrfmiddlewaretoken: csrf_value, pngsrc: pngsrc, graph_id: graph_id, task_id: task_id},
    processData: false,
    success: function (data) {
      if (data.msg) {
        $("#msg").text(data.msg);
        window.location.reload();
      }
    }
      });
}

function saveChangeAlert(){
  alertify.confirm("You need to save changes first!").set('title', "Alert").set('labels', {ok:'Ok', cancel:'Cancel'})
}

function zoomin(){
  zoom = canvas.getZoom()
  zoom = zoom/1.2
  canvas.setZoom(zoom, true)
}

function zoomout(){
  zoom = canvas.getZoom()
  zoom = zoom*1.2
  canvas.setZoom(zoom, true)
}

function identifyrefprod(){
  var e = document.getElementById("techbase");
  var techname = e.options[e.selectedIndex].value;
  var selection

  for (var i = 0; i < techlist.length; i++) {
    if (techlist[i].name == techname) {
      selection = i;
    }
  }

  $("#refprod").text("Reference Product: " + String(techlist[selection].refprod));
}

function addconnection_tech(sourcenodeid, targetnodeid, modify = 1){
  var connection = new MyConnection()
  connection.setSelectable(false)
  connection.setSource(canvas.getFigure(sourcenodeid).getOutputPort(0))
  connection.setTarget(canvas.getFigure(targetnodeid).getInputPort(0))
  //connection.userData = item.userData

  connection.on("dblclick", function(emitter,event){
    var sourceshape = connection.getSource().getParent().cssClass
    var targetshape = connection.getTarget().getParent().cssClass
    var cncunit
    var yieldnumber
   if (sourceshape.includes("Circle")){
     cncunit = connection.getSource().getParent().userData.unit
     yieldnumber = String(-connection.userData.yield)
   } else {
     cncunit = connection.getTarget().getParent().userData.unit
     yieldnumber = String(+connection.userData.yield)
   }

   var transforminfoHTML
   if (modify){
     transforminfoHTML = '<p> *Transformation coefficient (' + cncunit + '): </p> <input class="ajs-input" id="transform2" type="number" value = "'+yieldnumber+'" step = 0.1/>';
   } else {
     transforminfoHTML = '<p> *Transformation coefficient (' + cncunit + '): </p> <input class="ajs-input" id="transform2" type="number" value = "'+yieldnumber+'" step = 0.1 readonly = "readonly"/>';
   }

    $('.transforminfo').html("");

    alertify.confirm(transforminfoHTML).set('onok', function(closeEvent) {

      var transform = $('#transform2').val();
      if (transform == "") {
        transform = 0
        alertify.error("No input");
      }
      if (transform <= 0){
        alertify.error('Input not valid');
        $('#transform2')[0].value = yieldnumber
      } else {
      if (sourceshape.includes("Circle")){
        connection.userData = {"yield": -transform}
      }
      else {
        connection.userData = {"yield": transform}
      }
    }
      $('.transforminfo').html('<p> *Transformation coefficient: </p> <input class="ajs-input" id="transform" type="number" step = 0.1/>')

  }).set('oncancel', function(closeEvent){
    alertify.confirm().destroy()
  }).set('title', "Transformation Coefficient").set('labels', {ok:'Ok', cancel:'Cancel'}).set('closable',false)
})

  return connection
}
