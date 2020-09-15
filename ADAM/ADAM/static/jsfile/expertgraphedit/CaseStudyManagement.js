function addcase() {
  modelid = $("#selectmodel").val()
  casename = $("#casename").val()

  var el = document.getElementsByName("csrfmiddlewaretoken");
  csrf_value = el[0].getAttribute("value");
  jQuery.ajax({
    method: "POST",
    url: "/expert/ajax/addcasestudy1",
    data: {csrfmiddlewaretoken: csrf_value, taskid: modelid, casename:casename},
    success: function (data) {
      if (data.success) {
        $('#overlaycontainer').css('display','block')
        setTimeout(function(){
        location.href = '/expert/managecasestudy/'; }, 1500);
      }
    }
  });

}


function updateTable() {

  if ($("#casetype").val() == "study") {
    $(".studytable").css("display","")
    $(".grouptable").css("display","none")

  } else {
    $(".studytable").css("display","none")
    $(".grouptable").css("display","")
  }

}

function groupcase() {
  var containgroup = false
  var selected = []
  var checkboxes = document.getElementsByClassName('form-check-input')
  for (var i = 0; i < checkboxes.length; i++) {
     if (checkboxes[i].checked){
       var item = {type:checkboxes[i].id, id:checkboxes[i].value}
       if (item.type.includes('group')){
         containgroup = true
       }
       selected.push(item)
     }
  }
  if (containgroup) {
    alertify.error('Only scenarios can be grouped!')
  } else {
  var content = '<div class="form-group"><label for="notearea">Case study name:</label><div class="input-group mb-3"><input type="text" class="form-control" value = "" aria-label="filename" aria-describedby="basic-addon2" id = "groupname"></div>'
  console.log(containgroup)
    alertify.confirm(content).set('title', 'Group Scenarios').set('onok', function(closeEvent) {
    var selectedstring
    selectedstring = JSON.stringify(selected)
    var el = document.getElementsByName("csrfmiddlewaretoken");
    csrf_value = el[0].getAttribute("value");
    jQuery.ajax({
      method: "POST",
      url: "/expert/ajax/groupcases",
      data: {csrfmiddlewaretoken: csrf_value, casels: selectedstring, groupname: $("#groupname").val()},
      proccessData: false,
      success: function (data) {
        if (data.success) {
          window.location.reload();
        }
      }
    });
}).set('oncancel', function(closeEvent){
  alertify.confirm().destroy();
}).set('labels',{ok:'Yes', cancel:'Cancel'}).set('closable',false);
}
}

function deletecase(caseid = false, type = false) {
  var mode
  var selected
  var content


  if (caseid && type) {
    mode = type
    selected = []
    selected.push({id: caseid, type:"notchecked"})
    content = '<div> Delete this item?</div>'
  } else {
    mode = $("#casetype").val()
    selected = []
    var checkboxes = document.getElementsByClassName('form-check-input')
    for (var i = 0; i < checkboxes.length; i++) {
       if (checkboxes[i].checked){
         var item = {type:checkboxes[i].id, id:checkboxes[i].value}
         selected.push(item)
       }
    }

    content = '<div> Delete selected items?</div>'
  }


  alertify.confirm(content).set('title', 'Delete').set('onok', function(closeEvent) {
  var selectedstring
  selectedstring = JSON.stringify(selected)
  var el = document.getElementsByName("csrfmiddlewaretoken");
  csrf_value = el[0].getAttribute("value");
  jQuery.ajax({
    method: "POST",
    url: "/expert/ajax/deletecases",
    data: {csrfmiddlewaretoken: csrf_value, caseidls: selectedstring, mode: mode},
    success: function (data) {
      if (data.success) {
        window.location.reload();
      }
    }
  });
  }).set('oncancel', function(closeEvent){
  alertify.confirm().destroy();
  }).set('labels',{ok:'Yes', cancel:'Cancel'}).set('closable',false);
}

function publishcase(id, pub) {
  var containstudy = false
  var selected = [{id:id}]
  /*var checkboxes = document.getElementsByClassName('form-check-input')
  for (var i = 0; i < checkboxes.length; i++) {
     if (checkboxes[i].checked){
       var item = {type:checkboxes[i].id, id:checkboxes[i].value}
       if (item.type.includes('study')){
         containstudy = true
       }
       selected.push(item)
     }
  }*/
  if (containstudy) {
    alertify.error('Only case studies can be published!')
  } else {
    if (pub) {
      var content = '<p>Publish case study (including related products and technologies)? </p>'
    } else {
      var content = '<p>Unpublish case study? </p>'
    }

    alertify.confirm(content).set('title', 'Publish').set('onok', function(closeEvent) {
    var selectedstring
    selectedstring = JSON.stringify(selected)
    var el = document.getElementsByName("csrfmiddlewaretoken");
    csrf_value = el[0].getAttribute("value");
    jQuery.ajax({
      method: "POST",
      url: "/expert/ajax/publishcases",
      data: {csrfmiddlewaretoken: csrf_value, caseidls: selectedstring},
      success: function (data) {
        if (data.success) {
          alertify.success('DONE!')
          setTimeout(function(){window.location.reload();}, 1000)
        }
      }
    });
    }).set('oncancel', function(closeEvent){
    alertify.confirm().destroy();
    }).set('labels',{ok:'Yes', cancel:'Cancel'}).set('closable',false);
  }
}

function rename(id,name,type) {

  var content = '<label for="basic-addon2">New name:</label><div class="input-group mb-3"><input type="text" class="form-control" value = "' + name + '" aria-label="filename" aria-describedby="basic-addon2" id = "newname"></div>'

  alertify.confirm(content).set('title', 'Rename').set('onok', function(closeEvent) {
    var el = document.getElementsByName("csrfmiddlewaretoken");
    csrf_value = el[0].getAttribute("value");
    jQuery.ajax({
      method: "POST",
      url: "/expert/ajax/renamecasestudy",
      data: {newname: $('#newname').val(), caseid: id,csrfmiddlewaretoken: csrf_value, type: type},
      success: function (data) {
        if (data.success) {
          window.location.reload();
        }
      }
    });
  }).set('oncancel', null).set('closable',false);
}
