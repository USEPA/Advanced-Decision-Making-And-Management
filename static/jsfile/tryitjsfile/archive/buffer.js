
function newdefnode(nodeid){
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

  maploc[index].nodetypeform = ""
  maploc[index].nodetypecount = -1
  maploc[index].record = []
  maploc[index].data = []

  figure.on("dblclick", function(emitter, event) {


    var node_alert = alertify.confirm(node_name_form(nodeid) + maploc[index].nodetypeform+node_add_type_btn(nodeid)).set('title', "Specify Node Type").set('labels', {ok:'Ok', cancel:'Clear'}).set('closable',false);
    maploc[index].nodealert = node_alert

    // recover previously selected type(s)
    if (maploc[index].record.length > 0) {
      for (var j = 0; j < maploc[index].record.length; j++) {
        var e = document.getElementById('nodetype_' + nodeid +'_' + j);
        e.selectedIndex = maploc[index].record[j].type
      }
    }


    maploc[index].nodealert.set('onok', function(closeEvent) {

      // on ok, change the name of this node
      maploc[index].name = $("#nodename_" + maploc[index].node).val()
      figure.resetChildren()
      figure.add(new draw2d.shape.basic.Label({text:maploc[index].name, stroke:0}), new draw2d.layout.locator.BottomLocator())

      if (maploc[index].nodetypecount > -1){ // if user specify at least one node type

        // get newly selected type(s)
        var record = [];
        for (var j = 0; j < maploc[index].nodetypecount + 1; j++) {
          var e = document.getElementById('nodetype_' + nodeid +'_' + j);
          record.push({type: e.selectedIndex, change_flag: 0});
          //e.selectedIndex = record[j].type;
          try {
            if (maploc[index].record[j].type !== e.selectedIndex){
              record[j].change_flag = 1
            }
          } catch (e) {
            record[j].change_flag = 1
          }

        }
        maploc[index].record = record;
        //????
        // change color of this node!
        var typels = []
        if (maploc[index].record.length > 0) {
          for (var j = 0; j < maploc[index].record.length; j++) {
            typels.push(maploc[index].record[j].type)
          }
        }
        var newcolor
        if (typels.includes(0)) {
        newcolor = new draw2d.util.Color("#efd915") }
        if (typels.includes(1)) {
        newcolor = new draw2d.util.Color("#70AE47") }
        if (typels.includes(3)) {
        newcolor = new draw2d.util.Color("#0051dd") }
        if (typels.includes(2)) {
        newcolor = new draw2d.util.Color("#4471C4")}
        figure.setBackgroundColor(newcolor);
        figure.setColor(newcolor.darker());

        // jump the second alert for information fillout
        setTimeout(function () {

          // generate an empty form
          var infoform = ""
          for (var j = 0; j < record.length; j++) {
            infoform = infoform + nodeinfoform(record[j].type, maploc[index].node, j)
          }

          var node_info_alert = alertify.confirm(infoform).set('title', "Specify Node Information").set('labels', {ok:'Ok', cancel:'Cancel'}).set('closable',false)

          // need to recover previously entered data if consistent
          if (maploc[index].data.length > 0) {
            for (var j = 0; j < record.length; j++) {
              if (maploc[index].record[j].change_flag == 0){
                if (maploc[index].record[j].type == 0 || maploc[index].record[j].type == 1){
                  //$("#test_step4").html(String(maploc[index].data[j].amount))
                  document.getElementById('nodeinfo1_' + nodeid +'_' + j).selectedIndex = maploc[index].data[j].prodindex
                  $("#nodeinfo2_" + nodeid +'_' + j).val(String(maploc[index].data[j].amount))
                  $("#nodeinfo3_" + nodeid +'_' + j).val(String(maploc[index].data[j].price))
                }
                if (maploc[index].record[j].type == 3){
                  document.getElementById('nodeinfo1_' + nodeid +'_' + j).selectedIndex = maploc[index].data[j].techindex
                  $("#nodeinfo2_" + nodeid +'_' + j).val(String(maploc[index].data[j].cap))
                }
              }
            }
          }


          node_info_alert.set('onok', function(closeEvent){

            for (var j = 0; j < record.length; j++) {
              maploc[index].data.push({})
            }
            for (var j = 0; j < record.length; j++) {
              savenodeinfo(maploc[index].node, j) // save information of the node
            }
            for (var j = 0; j < record.length; j++) {
              if (record[j].type == 0) {
                sup_table_push(maploc[index].node, j)
              }
              if (record[j].type == 1) {
                dem_table_push(maploc[index].node, j)
              }
              if (record[j].type == 3) {
                sit_table_push(maploc[index].node, j)
              }
            }


          });
          node_info_alert.set('oncancel', function(closeEvent){
            alertify.error("Canceled!")
          });

        }, 400);
      } else { // if user does not specify node type
        alertify.error("Please specify node type!")
      }

    })

    maploc[index].nodealert.set('oncancel',function(closeEvent) {
      maploc[index].nodetypeform = ""
      maploc[index].nodealert.setContent(node_name_form(nodeid) + maploc[index].nodetypeform + node_add_type_btn(nodeid))
      maploc[index].nodetypecount = -1
      for (var j = 0; j < maploc[index].record.length; j++) {
        $('#nodedata_' + maploc[index].node +'_' + j).remove()
      }
      maploc[index].record = []
      maploc[index].data = []
      figure.setBackgroundColor(rawcolor);
      figure.setColor(rawcolor.darker());
    })

  }) // on ok: figure out what are the types, then generate a table

  return figure
}
