
function UpdateLabel(){
  e = document.getElementsByClassName("custom-file-input")[0].files[0].name;
  $('#id_datafile_label').html(e);
}

function rename(id,name) {
  name = name.slice(0,-4)
  var content = '<label for="basic-addon2">Please type the new file name:</label><div class="input-group mb-3"><input type="text" class="form-control" value = "' + name + '" aria-label="filename" aria-describedby="basic-addon2" id = "newname"><div class="input-group-append"><span class="input-group-text" id="basic-addon2">.csv</span></div></div>'

  alertify.confirm(content).set('title', 'Rename').set('onok', function(closeEvent) {
    var el = document.getElementsByName("csrfmiddlewaretoken");
    csrf_value = el[0].getAttribute("value");
    jQuery.ajax({
      method: "POST",
      url: "/expert/ajax/renamefile",
      data: {new_name: $('#newname').val(), doc: id,csrfmiddlewaretoken: csrf_value,},
      proccessData: false,
      success: function (data) {
        if (data.success) {
          window.location.reload();
        }
      }
    });
  }).set('oncancel', null).set('closable',false);
}

function renote(id,notes) {
    var content = '<div class="form-group"><label for="notearea">Please edit the information of file below:</label><textarea class="form-control" id="notearea" rows="5" >' + notes + '</textarea></div>'
      alertify.confirm(content).set('title', 'Edit Data Information').set('onok', function(closeEvent) {
      var el = document.getElementsByName("csrfmiddlewaretoken");
      csrf_value = el[0].getAttribute("value");
      jQuery.ajax({
        method: "POST",
        url: "/expert/ajax/renotefile",
        data: {new_notes: $('#notearea').val(), doc: id,csrfmiddlewaretoken: csrf_value,},
        proccessData: false,
        success: function (data) {
          if (data.success) {
            window.location.reload();
          }
        }
      });
  }).set('oncancel', null).set('closable',false);
}

function selectall(){
  var flag = $("#selectall_checkbox").is(":checked")
  var checkboxes = document.getElementsByClassName('form-check-input')
   for (var i = 0; i < checkboxes.length; i++)
   {
      var el = checkboxes[i]
      if (el.offsetParent == null) {
        el.checked = false;
      } else {
        el.checked = flag;
      }
   }
}

function deleteselected(){
  var selected = []
  var checkboxes = document.getElementsByClassName('form-check-input')
  for (var i = 0; i < checkboxes.length; i++) {
     if (checkboxes[i].checked){
       var item = {type:checkboxes[i].id, id:checkboxes[i].value}
       selected.push(item)
     }
  }
  alertify.confirm('Confirm', 'Delete all selected files?',
  function() {
    var selectedstring
    selectedstring = JSON.stringify(selected)
    var el = document.getElementsByName("csrfmiddlewaretoken");
    csrf_value = el[0].getAttribute("value");
    jQuery.ajax({
      method: "POST",
      url: "/expert/ajax/deleteselectedfiles",
      data: {csrfmiddlewaretoken: csrf_value, filels: selectedstring},
      proccessData: false,
      success: function (data) {
        if (data.success) {
          window.location.reload();
        }
      }
    });
},
  null).set('labels',{ok:'Yes', cancel:'Cancel'}).set('closable',false);
}

function deletefile(id) {
  var selected = []
  selected.push({id: id})
  selectedstring = JSON.stringify(selected)
  alertify.confirm('Confirm', 'Are you sure to delete this file?',
  function() {
    var el = document.getElementsByName("csrfmiddlewaretoken");
    csrf_value = el[0].getAttribute("value");
    jQuery.ajax({
      method: "POST",
      url: "/expert/ajax/deleteselectedfiles",
      data: {filels: selectedstring, csrfmiddlewaretoken: csrf_value},
      proccessData: false,
      success: function (data) {
        if (data.success) {
          window.location.reload();
        }
      }
    });
  },
  null).set('labels',{ok:'Yes', cancel:'Cancel'}).set('closable',false);
}

function downloadselected(){
  var selected = []
  var checkboxes = document.getElementsByClassName('form-check-input')
  for (var i = 0; i < checkboxes.length; i++) {
     if (checkboxes[i].checked){
       var item = {type:checkboxes[i].id, id:checkboxes[i].value}
       selected.push(item)
     }
  }
  alertify.confirm('Confirm', 'Download all selected files?',
  function() {
    var selectedstring
    selectedstring = JSON.stringify(selected)
    var el = document.getElementsByName("csrfmiddlewaretoken");
    csrf_value = el[0].getAttribute("value");
    jQuery.ajax({
      method: "POST",
      url: "/expert/ajax/downloadselectedfiles",
      data: {csrfmiddlewaretoken: csrf_value, filels: selectedstring},
      success: function(response){window.location.href = response.redirect;}}).done(function (data) {
        if (data.success) {
          window.location.href = data.url;}
        });
},
  null).set('labels',{ok:'Yes', cancel:'Cancel'}).set('closable',false);
}

function updateDoc(){
  var type = $('#datatype').val()
    if (type == "all") {
      $('.Supply').css("display","")
      $('.Demand').css("display","")
      $('.Site').css("display","")
      $('.Candidate').css("display","")
    } else if (type == "sup") {
      $('.Supply').css("display","")
      $('.Demand').css("display","none")
      $('.Site').css("display","none")
      $('.Candidate').css("display","none")
    } else if (type == "dem") {
      $('.Supply').css("display","none")
      $('.Demand').css("display","")
      $('.Site').css("display","none")
      $('.Candidate').css("display","none")
    } else if (type == "site") {
      $('.Supply').css("display","none")
      $('.Demand').css("display","none")
      $('.Site').css("display","")
      $('.Candidate').css("display","none")
    } else if (type == "cand") {
      $('.Supply').css("display","none")
      $('.Demand').css("display","none")
      $('.Site').css("display","none")
      $('.Candidate').css("display","")
    }
  }

function uploadnew(){
  var uploadHTML = $('.uploadform').html();
  $('.uploadform').html("");
  alertify.confirm(uploadHTML).set('onok', function(closeEvent) {
    var el = document.getElementsByName("csrfmiddlewaretoken");
    csrf_value = el[0].getAttribute("value");
    var formData = new FormData();
    formData.append('datafile', $('#id_datafile')[0].files[0]);
    formData.append('datanotes', $('#id_datanotes').val())
    formData.append('datatype', $('#id_datatype').val())
    formData.append('csrfmiddlewaretoken', csrf_value);
    $('#overlaycontainer2').css('display',"")
    $.ajax({
      type: "POST",
      url: "/expert/ajax/dataupload",
      processData: false,
      contentType: false,
      data: formData,
      async: false,
      success: function (data) {
        if (data.success){
          window.location.reload();
        }
      }
    });
    $('#overlaycontainer2').css('display',"none")
    $('.uploadform').html(uploadHTML);
  }).set('oncancel', function(closeEvent){
    $('.uploadform').html(uploadHTML);
  }).set('title', "Upload a data file").set('labels', {ok:'Upload', cancel:'Cancel'}).set('closable',false);
}

function UpdateTable(){
  var select = $('#id_datatype').val();

  if (select == "Supply Data") {
    $('#suptemplate').css('display',"");
    $('#demtemplate').css('display',"none");
    $('#sitetemplate').css('display',"none");
    $('#candtemplate').css('display',"none");
  } else if (select == "Demand Data") {
    $('#suptemplate').css('display',"none");
    $('#demtemplate').css('display',"");
    $('#sitetemplate').css('display',"none");
    $('#candtemplate').css('display',"none");
  } else if(select == "Technology Site Data") {
    $('#suptemplate').css('display',"none");
    $('#demtemplate').css('display',"none");
    $('#sitetemplate').css('display',"");
    $('#candtemplate').css('display',"none");
  } else if(select == "Technology Candidate Data") {
    $('#suptemplate').css('display',"none");
    $('#demtemplate').css('display',"none");
    $('#sitetemplate').css('display',"none");
    $('#candtemplate').css('display',"");
  }
}
