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

function findTechIndexByAlia(alia){
  for (var i = 0; i < techlist.length; i++){
    if (techlist[i].alia == alia){
      return i
    }
  }
  return
}

function ExistingSiteTable(id){
  index = findFigureByID(id)
  sitedata = nodels[index].sitedata
  var content = ''
  for (var i = 0; i < sitedata.length; i++){
    content += '<div id = "siteinfo' + String(id) + String(i+1) + '"> <h4> Existing Tech Info ' + (i+1) + '</h4> <br/> <div> <p>Please select the installed technology</p> <br/> <div class="selectdiv"> <select name="sitetech" class = "sitetech' + id + '">'

    for (var j = 0; j < techlist.length; j++){
      if (sitedata[i].techindex != j) {
        content +=   '<option value = "' + j + '"> ' + techlist[j].name + ' </option>'
      } else {
        content +=   '<option value = "' + j + '" selected > ' + techlist[j].name + ' </option>'
      }
    }
    content += '</select> </div> </div> <br/>'
    content += '<br/> <p> Please specify technology cap (reference prod unit/' + timeunit + ')</p> <input class="ajs-input sitecap' + id + '" type="number" value = ' + sitedata[i].cap +' step = 10 min = 0 /> <br/> <button class = "btn default" style = "padding: 3px 10px" onclick="removeSiteTable(\'' + String(id) + '\',\'' + String(i+1) + '\')">Remove</button> </div>'
  }

  return content
}

function removeSiteTable(id, i){
  id =  '#siteinfo' + String(id) + String(i)
  $(id).html("")
}

function addButton(id){
  return '<br/> <button class = "btn default" style = "padding: 3px 10px" onclick="addEmptySite(\'' + id + '\')">Add Existing Tech Info</button>'
}

function addEmptySite(id){
  ii ++
  var contentid = '#siteinfo' + String(id)
  var original = $(contentid).html()
  var content = '<div id = "siteinfo' + String(id) + '">'
  content = content + original
  content += '<div id = "emptysiteinfo' + String(id) + String(ii) + '"> <h4> Existing Tech Info' + '</h4> <br/> <div> <p>Please select the installed technology</p> <br/> <div class="selectdiv"> <select name="sitetech" class = "sitetech' + id + '">'

  for (var j = 0; j < techlist.length; j++){
      content +=   '<option value = "' + j + '"> ' + techlist[j].name + ' </option>'
  }
  content += '</select> </div> </div> <br/>'
  content += '<br/> <p> Please specify technology cap (reference prod unit/' + timeunit + ')</p> <input class="ajs-input sitecap' + id + '" type="number" step = 10 min = 0 /> <br/> <button class = "btn default" style = "padding: 3px 10px" onclick="removeEmptySiteTable(\'' + String(id) + '\',\'' + String(ii) + '\')">Remove</button> </div>'

  content = content + '</div>'

  $(contentid).html(content)
}

function removeEmptySiteTable(id, i){
  id =  '#emptysiteinfo' + String(id) + String(i)
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
      var content = '<div id = "siteinfo'+ String(id) + '">'
      content = content +  ExistingSiteTable(id) + '</div>' + addButton(id)
      //console.log(content)
      alertify.confirm(content).set('title', 'Existing Tech Information').set('onok', function(closeEvent) {
        var techs = extractValuesfromHTMLCollection(document.getElementsByClassName('sitetech' + id))
        var caps = extractValuesfromHTMLCollection(document.getElementsByClassName('sitecap' + id))

        var i = findFigureByID(id)
        // check if information is entered
        var flag = false
        for (var j = 0; j<techs.length; j++){
          if (techs[j] == ""){
            flag = true
          }
          if (caps[j] == ""){ //need to check cap between capmin and capmax
            flag = true
          }
        }

        if (flag){
          alertify.error("Please enter required information.")
        } else {
          nodels[i].sitedata = []
          for (var j = 0; j < techs.length; j++){
            nodels[i].sitedata.push({techindex: techs[j], cap: caps[j]})
          }

          var newcolor
          if (nodels[i].sitedata.length > 0){
            newcolor = new draw2d.util.Color("#0051dd")
          } else {
            newcolor = new draw2d.util.Color("#231F21")
          }
          figure.setBackgroundColor(newcolor);
          figure.setColor(newcolor.darker());
        }
      }).set('oncancel', function(closeEvent) {
        content = '<div id = "siteinfo' + String(id) + '">'
        content = content +  ExistingSiteTable(id) + '</div>' + addButton(id)
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

function xyloadsite(taskid){
  var sitefileHTML = $('.select_site').html();
  $('.select_site').html("");
    alertify.confirm(sitefileHTML).set('onok', function(closeEvent) {
        var fileid = $('#sitefileselection').val();
        var el = document.getElementsByName("csrfmiddlewaretoken");
        csrf_value = el[0].getAttribute("value");
        if (fileid > 0){
        jQuery.ajax({
          method: "POST",
          url: "/expert/ajax/sitefileselection",
          data: {csrfmiddlewaretoken: csrf_value, fileid: fileid, mode: 'xy', taskid: taskid},
          processData: false,
          success: function (data) {
            if (data) {
              //console.log(data)
              if (data.msg.length > 0 ) {
                for (var i = 0; i < data.msg.length; i++){
                  alertify.error(data.msg[i])
                }
              } else {

                for (var i = 0; i < nodels.length; i++){
                  nodels[i].sitedata = []
                  newcolor = new draw2d.util.Color("#231F21")
                  var figure = geomap.getFigure(nodels[i].nodeid)
                  figure.setBackgroundColor(newcolor);
                  figure.setColor(newcolor.darker());
                }

                sitedata = data.sitedata
                for (var i = 1; i < sitedata.length; i++){
                  var item = sitedata[i]
                  var nodeIndex = findFigureByName(item[1])
                  var techIndex = findTechIndexByAlia(item[2])
                  var cap = item[3]
                  nodels[nodeIndex].sitedata.push({techindex: techIndex, cap: cap})
                  var newcolor
                  if (nodels[nodeIndex].sitedata.length > 0){
                    newcolor = new draw2d.util.Color("#0051dd")
                  }
                  var figure = geomap.getFigure(nodels[nodeIndex].nodeid)
                  figure.setBackgroundColor(newcolor);
                  figure.setColor(newcolor.darker());
                  }
                siteid = data.siteid
                $('#xymapsave1').css("display", "");
              }
            }

          }
        });}
      $('#sitefileselection')[0].value = '';
      $('.select_site').html(sitefileHTML)
    }).set('oncancel', function(closeEvent){
      $('#sitefileselection')[0].value = '';
      $('.select_site').html(sitefileHTML)
    }).set('title', "Load an existing tech file").set('labels', {ok:'Ok', cancel:'Cancel'}).set('closable',false);;
}

function xyuploadsite(){
  var siteuploadHTML = $('.site_upload').html();
  $('.site_upload').html("");
  alertify.confirm(siteuploadHTML).set('onok', function(closeEvent) {
    $('#uploadbtm').click()
    $('.site_upload').html(siteuploadHTML);
  }).set('oncancel', function(closeEvent){
    $('.site_upload').html(siteuploadHTML);
  }).set('title', "Upload an existing tech data file").set('labels', {ok:'Upload', cancel:'Cancel'}).set('closable',false);
}

function xysavesite(taskid, onfile = false){
  var nodelsstring
  nodelsstring = JSON.stringify(nodels)
  //console.log(nodelsstring)
  //console.log(siteid)
  if (onfile == false) {
    alertify.prompt( 'Name your file', 'Please enter the name of new file:', '',
    function(evt, value) {
      var el = document.getElementsByName("csrfmiddlewaretoken");
      csrf_value = el[0].getAttribute("value");
      jQuery.ajax({
        method: "POST",
        url: "/expert/ajax/step4savesite",
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
        url: "/expert/ajax/step4savechangesite",
        data: {content: nodelsstring, csrfmiddlewaretoken: csrf_value, taskid: taskid, mode: 'xy', siteid: siteid},
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

function xyuclearsite() {
  alertify.confirm('Confirm', 'Clear all existing tech data?',
  function() {
    for (var i = 0; i < nodels.length; i++){
      nodels[i].sitedata = []
      newcolor = new draw2d.util.Color("#231F21")
      var figure = geomap.getFigure(nodels[i].nodeid)
      figure.setBackgroundColor(newcolor);
      figure.setColor(newcolor.darker());
    }
  }, null).set('labels',{ok:'Yes', cancel:'Cancel'})
}
