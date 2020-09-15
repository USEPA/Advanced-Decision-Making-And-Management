var admin
try {
  admin = document.getElementById("helper").getAttribute("admin");
} catch {
  admin = 0
}


function findProdIndexByID(id){
  for (var i = 0; i < prodlist.length; i++){
    if (prodlist[i].id == id){
      return i
    }
  }
  return
}

function ProdInfo(prodid) {
  i = findProdIndexByID(prodid)
  var content = '<h5>Basic Information</h5><div class = "container text-left" style = "width: 100%;" > <ul class="list-group"> <li class="list-group-item"><strong>Feedstock Name: </strong>  ' + prodlist[i].name + ' </li> <li class="list-group-item"><strong> Feedstock ID: </strong> p' + prodlist[i].id + '</li><li class="list-group-item"><strong>Unit: </strong>' + prodlist[i].unit + '</li> <li class="list-group-item"><strong>Transport Cost (USD/unit/km): </strong>' + prodlist[i].transcost + '</li> <li class="list-group-item"><strong>Description: </strong>' + prodlist[i].note + '</li> </ul> </div><br/> <h5>Related Technology</h5><div class = "row"> <table width = 100% class = "table text-center table-hover"> <thead> <tr> <th>Technology Name</th> <th>Role</th> <th>Yield</th></tr></thead><tbody>'
  for (j = 0; j < prodlist[i].transformationset.length; j++) {
    content += '<tr><td>' + prodlist[i].transformationset[j].techname + '</td>'
    if (Number(prodlist[i].transformationset[j].yield) > 0 ) {
      content += '<td>Outflow</td>'
    } else {
      content += '<td>Inflow</td>'
    }
    content += '<td>' + prodlist[i].transformationset[j].yield
    content +='</td></tr>'
  }
  content += '</tbody></table></div>'

  alertify.confirm(content).set('onok', null).set('onclose', null).set('closable', false).set('title','Product Information');
}

function AddProdBase(id = false) {
  var content = '<div class="form-group"><label>Product Name</label><input class="form-control" id = "prodnameinput" type="text" value = "" placeholder = "Product Name" /></div><div class="form-group"><label>Unit</label><select class = "custom-select" id = "produnitinput"><option value = "UNIT" selected> UNIT </option><option value = "metric tonne">metric tonne</option><option value = "kg">kg</option><option value = "lb">lb</option><option value = "cubic meter">cubic meter</option><option value = "liter">liter</option><option value = "gallon">gallon</option><option value = "kWh">kWh</option><option value = "BTU">BTU</option></select></div><div class="form-group"><label>Transportation Cost (USD/unit/km)</label><input class="form-control" type="number" id = "prodtranscostinput" placeholder = "0" /></div> <div class="form-group"><label>Additional Information</label><textarea class="form-control" id="prodnotearea" rows="5" ></textarea></div>'

  if (admin == "True") {
    content += '<div class="custom-control custom-checkbox"><input type="checkbox" class="custom-control-input" id="publicprod"><label class="custom-control-label" for="publicprod">Public Product</label></div>'
  } else {
    content += '<div class="custom-control custom-checkbox invisible"><input type="checkbox" class="custom-control-input" id="publicprod"><label class="custom-control-label" for="publicprod">Public Product</label></div>'
  }

  var alarm = alertify.confirm(content).set('title','Add Product').set('closable', false)
  if (id) {
    alarm.set('labels',{ok:'ADD', cancel: 'GO BACK'}).set('oncancel', function(){
        alertify.confirm().destroy();
        if (type == 'sup'){
          location.href = '/expert/usermain/task/' + id + '/2'
        } else {
          location.href = '/expert/usermain/task/' + id + '/4'
        }
      })
  } else {
    alarm.set('labels',{ok:'ADD', cancel: 'CANCEL'})
    alarm.set('oncancel', function(){
      alertify.confirm().destroy();
    })
  }
  alarm.set('onok', function(){
    prodname = $("#prodnameinput").val();
    produnit = $("#produnitinput").val();
    prodtranscost = $("#prodtranscostinput").val();
    prodnote = $("#prodnotearea").val();
    prodpublic = $("#publicprod").prop('checked')
    if (prodname.length == 0 || prodtranscost.length == 0){
      alertify.error("Name and transportation cost are required.")
      if (id) {
        setTimeout(function(){ AddProdBase(id); }, 300)

      }
    } else {
      var el = document.getElementsByName("csrfmiddlewaretoken");
      csrf_value = el[0].getAttribute("value");
      jQuery.ajax({
        method: "POST",
        url: "/expert/ajax/prodbaseadd",
        data: {csrfmiddlewaretoken: csrf_value, prodname:prodname, produnit:produnit, prodtranscost:prodtranscost, prodnote:prodnote, prodpublic:prodpublic},
        success: function (data) {
          if (data) {
            if (id) {
              if (type == 'sup') {
                location.href = '/expert/usermain/task/' + id + '/2'
              } else {
                location.href = '/expert/usermain/task/' + id + '/4'
              }
            } else {
              location.reload();
            }
          }
        }
      });
    }
  })
}

function EditProd(prodid){
  i = findProdIndexByID(prodid)
  var content = '<div class="form-group"><label>Product Name</label><input class="form-control" id = "prodnameinput" type="text" value = "" placeholder = "Product Name" /></div><div class="form-group"><label>Unit</label><select class = "custom-select" id = "produnitinput"><option value = "UNIT" selected> UNIT </option><option value = "metric tonne">metric tonne</option><option value = "kg">kg</option><option value = "lb">lb</option><option value = "cubic meter">cubic meter</option><option value = "liter">liter</option><option value = "gallon">gallon</option><option value = "kWh">kWh</option><option value = "BTU">BTU</option></select></div><div class="form-group"><label>Transportation Cost (USD/unit/km)</label><input class="form-control" type="number" id = "prodtranscostinput" placeholder = "0" /></div> <div class="form-group"><label>Additional Information</label><textarea class="form-control" id="prodnotearea" rows="5" ></textarea></div>'

  var alarm = alertify.confirm(content)
  $("#prodnameinput").val(prodlist[i].name);
  $("#produnitinput").val(prodlist[i].unit);
  $("#prodtranscostinput").val(prodlist[i].transcost);
  $("#prodnotearea").val(prodlist[i].note);

  alarm.set('closable', false).set('title','Product Information').set('oncancel', function(){
    alertify.confirm().destroy();
  }).set('onok', function(){
    prodname = $("#prodnameinput").val();
    produnit = $("#produnitinput").val();
    prodtranscost = $("#prodtranscostinput").val();
    prodnote = $("#prodnotearea").val();
    prodpublic = $("#publicprod").prop('checked')
    if (prodname.length == 0 || prodtranscost.length == 0){
      alertify.error("Name and transportation cost are required.")
    } else {
      var el = document.getElementsByName("csrfmiddlewaretoken");
      csrf_value = el[0].getAttribute("value");
      jQuery.ajax({
        method: "POST",
        url: "/expert/ajax/prodbaseedit",
        data: {csrfmiddlewaretoken: csrf_value, prodname:prodname, produnit:produnit, prodtranscost:prodtranscost, prodnote:prodnote, prodid:prodid},
        success: function (data) {
          if (data) {
            location.reload();
            alertify.success("Edit Successfully");
          }
        }
      });
    }
  });
}

function DeleteProd(prodid){
  alertify.confirm('Confirm', 'Delete this product?',
  function() {
    var el = document.getElementsByName("csrfmiddlewaretoken");
    csrf_value = el[0].getAttribute("value");
    jQuery.ajax({
      method: "POST",
      url: "/expert/ajax/prodbasedelete",
      data: {csrfmiddlewaretoken: csrf_value, prodid: prodid},
      success: function (data) {
        if (data.success) {
          window.location.reload();
        }
      }
    });
},
  null).set('labels',{ok:'CONFIRM', cancel:'Cancel'}).set('closable',false);
}
