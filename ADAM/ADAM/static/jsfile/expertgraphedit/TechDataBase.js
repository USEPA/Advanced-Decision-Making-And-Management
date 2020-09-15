var admin
try {
  admin = document.getElementById("helper").getAttribute("admin");
} catch {
  admin = 0
}

timeunit = 'year'
coef = 1.0

function findProdIndexByID(id){
  for (var i = 0; i < prodlist.length; i++){
    if (prodlist[i].id == id){
      return i
    }
  }
  return
}

function findTechIndexByID(id){
  for (var i = 0; i < techlist.length; i++){
    if (techlist[i].id == id){
      return i
    }
  }
  return
}

function TechInfo(techid) {
  i = findTechIndexByID(techid)
  p = findProdIndexByID(techlist[i].refprod)

  var content = '<br/><h5>Basic Information</h5><div class = "container text-left" style = "width: 100%;" > <ul class="list-group"> <li class="list-group-item"><strong>Technology Name: </strong>  ' + techlist[i].name + ' </li> <li class="list-group-item"><strong> Technology ID: </strong> t' + techlist[i].id + '</li><li class="list-group-item"><strong>Reference Product: </strong> p' + techlist[i].refprod + ' - ' + prodlist[p].name + ' - ' +prodlist[p].unit + '</li> <li class="list-group-item"><strong>Capacity(refprod unit/' + timeunit + '): </strong>' + (coef*Number(techlist[i].capmin)).toFixed(0) + ' ~ ' + (coef*Number(techlist[i].capmax)).toFixed(0) + '</li> <li class="list-group-item"><strong>Investment Cost (USD): </strong> ' + (coef*Number(techlist[i].invfix)).toFixed(2) + ' + ' + (coef*Number(techlist[i].invpro)).toFixed(2) + '*Capacity </li> <li class="list-group-item"><strong>Operational Cost (USD/' + timeunit +'): </strong> ' + (coef*Number(techlist[i].opfix)).toFixed(2) + ' + ' + (coef*Number(techlist[i].oppro)).toFixed(2) + '*Capacity </li> <li class="list-group-item"><strong>Description: </strong>' + techlist[i].note + '</li> </ul> </div><br/> <h5>Related Materials</h5><div class = "row"> <table width = 100% class = "table text-center table-hover"> <thead> <tr> <th>Material Name</th> <th>Role</th> <th>Conversion</th></tr></thead><tbody>'
  for (j = 0; j < techlist[i].transformationset.length; j++) {
    content += '<tr><td>' + techlist[i].transformationset[j].prodname + '</td>'
    if (Number(techlist[i].transformationset[j].yield) > 0 ) {
      content += '<td>Outflow</td>'
    } else {
      content += '<td>Inflow</td>'
    }
    content += '<td>' + techlist[i].transformationset[j].yield + ' (' + prodlist[findProdIndexByID(techlist[i].transformationset[j].prodid)].unit+ ')' + '</td>'
    content += '</tr>'
  }
  content += '</tbody></table> <div class = "container" style = "width:80%;left:10%"><img src = "' + techlist[i].png +'" style= "width:100%"/></div></div>'

  alertify.confirm(content).set('onok', null).set('oncancel', null).set('closable', false).set('title','Technology Information');

  }

function AddTechBase(id = false) {
  var content = '<div class="form-group"><label>Number of Input and Output Streams</label><div class="input-group"><input class="form-control" id = "inputnum" type="number" value = "1" /><input class="form-control" id = "outputnum" type="number" value = "1" /></div></div>'
  var alarm = alertify.confirm(content).set('closable', false).set('title','Add Technology')
  if (id){
    alarm.set('labels', {ok:'NEXT', cancel: 'GO BACK'}).set('oncancel', function(){
      alertify.confirm().destroy();
        location.href = '/expert/usermain/task/' + id + '/3'
    })
  } else{
    alarm.set('labels', {ok:'NEXT', cancel: 'CANCEL'}).set('oncancel', function(){
      alertify.confirm().destroy();
    })
  }
  alarm.set('onok', function(){
    var inum = $('#inputnum').val();
    var onum = $('#outputnum').val();
    setTimeout(function(){ AddTechBaseDetail(inum,onum,id); }, 300);
  });
}

function AddTechBaseDetail(inum, onum, id){
  var content = '<strong>Basic Information</strong><div class="form-group"><label>Technology Name</label><input class="form-control" id = "techname" type="text" value = "" placeholder = "Technology Name" /></div>'

  if (admin == "True") {
    content += '<div class="custom-control custom-checkbox"><input type="checkbox" class="custom-control-input" id="publictech"><label class="custom-control-label" for="publictech">Public Technology</label></div><br/>'
  } else {
    content += '<div class="custom-control custom-checkbox invisible"><input type="checkbox" class="custom-control-input" id="publictech"><label class="custom-control-label" for="publictech">Public Technology</label></div><br/>'
  }

  inum = Math.round(inum)
  onum = Math.round(onum)
  for (var i = 0; i < inum; i++) {
    var inputcontent = '<strong>Input Streams ' + (i+1) +'</strong><div class = "form-group"><label>Select feedstock</label><select class = "custom-select inputprod">'
    for (var j = 0; j < prodlist.length; j++) {
      inputcontent += '<option value = "' + prodlist[j].id + '"> p' + prodlist[j].id + ' - ' + prodlist[j].name + ' - ' + prodlist[j].unit + ' </option>'
    }
    inputcontent += '</select></div><div class = "form-group"><label>Transformation Coefficient</label><input class="form-control inputyield" type="number" value = "1" /></div><div class="form-check"><input class="form-check-input inputrefprod" type="radio" name="exampleRadios" id="radioinput' + i + '" value="' + i + '"><label class="form-check-label" for="radioinput' + i + '">Reference Product</label></div><br/>'
    content += inputcontent
  }

  for (var i = 0; i < onum; i++) {
    var inputcontent = '<strong>Output Streams ' + (i+1) +'</strong><div class = "form-group"><label>Select product</label><select class = "custom-select outputprod">'
    for (var j = 0; j < prodlist.length; j++) {
      inputcontent += '<option value = "' + prodlist[j].id + '"> p' + prodlist[j].id + ' - ' + prodlist[j].name + ' - ' + prodlist[j].unit + ' </option>'
    }
    inputcontent += '</select></div><div class = "form-group"><label>Transformation Coefficient</label><input class="form-control outputyield" type="number" value = "1" /></div><div class="form-check"><input class="form-check-input outputrefprod" type="radio" name="exampleRadios" id="radiooutput' + i + '" value="' + i + '"><label class="form-check-label" for="radiooutput' + i + '">Reference Product</label></div><br/>'
    content += inputcontent
  }

  content += '<strong>Economic Information</strong><div class="form-group"><label>Capacity Ranges (reference product unit per year) </label><div class="input-group"><input class="form-control" id = "capmin" type="number" placeholder = "0" /><input class="form-control" id = "capmax" type="number" placeholder = "10000" /></div></div>'
  content += '<div class="form-group text-align-middle"><label>Operation Cost (USD per year) </label><div class="input-group"><input class="form-control" id = "opfix" type="number" placeholder = "0" /> &nbsp + &nbsp Capacity &nbsp * &nbsp <input class="form-control" id = "oppro" type="number" placeholder = "10000" /></div></div>'
  content += '<div class="form-group text-align-middle"><label>Investment Cost (USD) </label><div class="input-group"><input class="form-control" id = "invfix" type="number" placeholder = "0" /> &nbsp + &nbsp Capacity &nbsp * &nbsp <input class="form-control" id = "invpro" type="number" placeholder = "10000" /></div></div>'
  content += '<strong>Additional Information</strong><div class="form-group"><textarea class="form-control" id="technotearea" rows="5" ></textarea></div>'

  var alarm = alertify.confirm(content).set('closable', false).set('title','Add Technology')
  if (id) {
    alarm.set('labels', {ok:'ADD', cancel: 'GO BACK'}).set('oncancel', function(){
      alertify.confirm().destroy();
      location.href = '/expert/usermain/task/' + id + '/3'
    })
  } else {
    alarm.set('labels', {ok:'ADD', cancel: 'CANCEL'}).set('oncancel', function(){
      alertify.confirm().destroy();
    })
  }

  alarm.set('onok', function(){
    techname =  $('#techname').val();
    techpublic = $('#publictech').prop('checked');
    techcapmin = Number($('#capmin').val());
    techcapmax = Number($('#capmax').val());
    techinvfix = Number($('#invfix').val());
    techinvpro = Number($('#invpro').val());
    techopfix = Number($('#opfix').val());
    techoppro = Number($('#oppro').val());
    technotes = $('#technotearea').val();

    transformation = []

    yieldcheck = false
    refprodcheck = true
    repeatcheck = false
    prodidls = []

    for (var i = 0; i < inum; i++) {
      item = {prodid: $('.inputprod').eq(i).val(), yield: -Number($('.inputyield').eq(i).val()), ifrefprod: $('.inputrefprod').eq(i).prop('checked')}
      if ($('.inputyield').eq(i).val() <= 0) {
        yieldcheck = true
      }
      if ($('.inputrefprod').eq(i).prop('checked')) {
        refprodcheck = false
      }
      if (prodidls.includes(prodidls.push($('.inputprod').eq(i).val()))) {
        repeatcheck = true
      }
      prodidls.push($('.inputprod').eq(i).val())
      transformation.push(item)
    }
    for (var i = 0; i < onum; i++) {
      item = {prodid: $('.outputprod').eq(i).val(), yield: +Number($('.outputyield').eq(i).val()), ifrefprod: $('.outputrefprod').eq(i).prop('checked')}
      if ($('.outputyield').eq(i).val() <= 0) {
        yieldcheck = true
      }
      if ($('.outputrefprod').eq(i).prop('checked')) {
        refprodcheck = false
      }
      if (prodidls.includes(prodidls.push($('.outputprod').eq(i).val()))) {
        repeatcheck = true
      }
      prodidls.push($('.outputprod').eq(i).val())
      transformation.push(item)
    }

    if (techname.length == 0 || techcapmin < 0 || techcapmax <= 0 || techcapmax<techcapmin || yieldcheck || refprodcheck || repeatcheck) {
      alertify.error("Please enter valid values.")
      setTimeout(function(){AddTechBaseDetail(inum, onum, id);}, 300)
    } else {
      transformation = JSON.stringify(transformation)
      var el = document.getElementsByName("csrfmiddlewaretoken");
      csrf_value = el[0].getAttribute("value");
      jQuery.ajax({
        method: "POST",
        url: "/expert/ajax/techbaseadd",
        data: {csrfmiddlewaretoken: csrf_value, techname:techname, technotes:technotes, techpublic:techpublic, capmin:techcapmin, capmax: techcapmax, invfix: techinvfix, invpro: techinvpro, opfix: techopfix, oppro: techoppro, transformation: transformation},
        success: function (data) {
          if (data) {
            console.log(id)
            if (id) {
              location.href = '/expert/usermain/task/' + id + '/3'
            } else {
              location.href = '/expert/usermain/techbase/' + data.techid
            }
          }
        }
      });
    }

  })
}


function DeleteTech(techid){
  alertify.confirm('Confirm', 'Delete this technology?',
  function() {
    var el = document.getElementsByName("csrfmiddlewaretoken");
    csrf_value = el[0].getAttribute("value");
    jQuery.ajax({
      method: "POST",
      url: "/expert/ajax/techbasedelete",
      data: {csrfmiddlewaretoken: csrf_value, techid: techid},
      success: function (data) {
        if (data.success) {
          window.location.reload();
        }
      }
    });
},
  null).set('labels',{ok:'Yes', cancel:'Cancel'}).set('closable',false);
}


function EditTech(techid) { // To do: add/remove product flows 
  i = findTechIndexByID(techid)
  p = findProdIndexByID(techlist[i].refprod)
  tech = techlist[i]

  var content = '<strong>Basic Information</strong><div class="form-group"><label>Technology Name</label><input class="form-control" id = "techname" type="text" value = "' + tech.name + '" placeholder = "Technology Name" /></div>'

  var i = 0;
  for (var ii = 0; ii < tech.transformationset.length; ii++) {

    item = tech.transformationset[ii]
    if (Number(item.yield) < 0) {
      inputcontent = '<strong>Input Streams ' + (i+1) +'</strong><div class = "form-group"><label>Select feedstock</label><select class = "custom-select inputprod">'
      for (var j = 0; j < prodlist.length; j++) {
        if (item.prodid == prodlist[j].id) {
          inputcontent += '<option value = "' + prodlist[j].id + '" selected> p' + prodlist[j].id + ' - ' + prodlist[j].name + ' - ' + prodlist[j].unit + ' </option>'
        } else {
          inputcontent += '<option value = "' + prodlist[j].id + '"> p' + prodlist[j].id + ' - ' + prodlist[j].name + ' - ' + prodlist[j].unit + ' </option>'
        }
      }
      inputcontent += '</select></div><div class = "form-group"><label>Transformation Coefficient</label><input class="form-control inputyield" type="number" value = "' + (-Number(item.yield)) + '" /></div><div class="form-check"><input class="form-check-input inputrefprod" type="radio" name="exampleRadios" id="radioinput' + i + '" value="' + i + '"'
      if (tech.refprod == item.prodid) {
        inputcontent += 'checked'
      }
      inputcontent += '><label class="form-check-label" for="radioinput' + i + '">Reference Product</label></div><br/>'
      i += 1;
      content += inputcontent
    }

  }
  var i = 0;
  for (var ii = 0; ii < tech.transformationset.length; ii++) {

    item = tech.transformationset[ii]
    if (Number(item.yield) > 0) {
      outputcontent = '<strong>Output Streams ' + (i+1) +'</strong><div class = "form-group"><label>Select product</label><select class = "custom-select outputprod">'
      for (var j = 0; j < prodlist.length; j++) {
        if (item.prodid == prodlist[j].id) {
          outputcontent += '<option value = "' + prodlist[j].id + '" selected> p' + prodlist[j].id + ' - ' + prodlist[j].name + ' - ' + prodlist[j].unit + ' </option>'
        } else {
          outputcontent += '<option value = "' + prodlist[j].id + '"> p' + prodlist[j].id + ' - ' + prodlist[j].name + ' - ' + prodlist[j].unit + ' </option>'
        }
      }
      outputcontent += '</select></div><div class = "form-group"><label>Transformation Coefficient</label><input class="form-control outputyield" type="number" value = "' + item.yield + '" /></div><div class="form-check"><input class="form-check-input outputrefprod" type="radio" name="exampleRadios" id="radiooutput' + i + '" value="' + i + '"'

      if (tech.refprod == item.prodid) {
        outputcontent += 'checked'
      }
      outputcontent += '><label class="form-check-label" for="radiooutput' + i + '">Reference Product</label></div><br/>'

      i += 1;
    content += outputcontent
    }
  }

  content += '<strong>Economic Information</strong><div class="form-group"><label>Capacity Ranges (reference product unit per year) </label><div class="input-group"><input class="form-control" id = "capmin" type="number" value = "' + tech.capmin + '" placeholder = "0" /><input class="form-control" id = "capmax" type="number" value = "' + tech.capmax + '" placeholder = "10000" /></div></div>'
  content += '<div class="form-group text-align-middle"><label>Operation Cost (USD per year) </label><div class="input-group"><input class="form-control" id = "opfix" type="number" value = "' + tech.opfix + '" placeholder = "0" /> &nbsp + &nbsp Capacity &nbsp * &nbsp <input class="form-control" id = "oppro" type="number" value = "' + tech.oppro + '" placeholder = "10000" /></div></div>'
  content += '<div class="form-group text-align-middle"><label>Investment Cost (USD) </label><div class="input-group"><input class="form-control" id = "invfix" type="number" value = "' + tech.invfix + '" placeholder = "0" /> &nbsp + &nbsp Capacity &nbsp * &nbsp <input class="form-control" id = "invpro" type="number" value = "' + tech.invpro + '" placeholder = "10000" /></div></div>'
  content += '<strong>Additional Information</strong><div class="form-group"><textarea class="form-control" id="technotearea" rows="5" ></textarea></div>'

  var alarm = alertify.confirm(content)
  $('#technotearea').val(tech.note);

  alarm.set('closable', false).set('title','Add Technology').set('labels', {ok:'COFIRM', cancel: 'CANCEL'}).set('oncancel', function(){
    alertify.confirm().destroy();
  }).set('onok', function(){
    techname =  $('#techname').val();
    techpublic = $('#publictech').prop('checked');
    techcapmin = Number($('#capmin').val());
    techcapmax = Number($('#capmax').val());
    techinvfix = Number($('#invfix').val());
    techinvpro = Number($('#invpro').val());
    techopfix = Number($('#opfix').val());
    techoppro = Number($('#oppro').val());
    technotes = $('#technotearea').val();

    transformation = []

    yieldcheck = false
    refprodcheck = true
    repeatcheck = false
    prodidls = []

    for (var i = 0; i < $('.inputprod').length; i++) {
      item = {prodid: $('.inputprod').eq(i).val(), yield: -Number($('.inputyield').eq(i).val()), ifrefprod: $('.inputrefprod').eq(i).prop('checked')}
      if ($('.inputyield').eq(i).val() <= 0) {
        yieldcheck = true
      }
      if ($('.inputrefprod').eq(i).prop('checked')) {
        refprodcheck = false
      }
      if (prodidls.includes(prodidls.push($('.inputprod').eq(i).val()))) {
        repeatcheck = true
      }
      prodidls.push($('.inputprod').eq(i).val())
      transformation.push(item)
    }
    for (var i = 0; i < $('.outputprod').length; i++) {
      item = {prodid: $('.outputprod').eq(i).val(), yield: +Number($('.outputyield').eq(i).val()), ifrefprod: $('.outputrefprod').eq(i).prop('checked')}
      if ($('.outputyield').eq(i).val() <= 0) {
        yieldcheck = true
      }
      if ($('.outputrefprod').eq(i).prop('checked')) {
        refprodcheck = false
      }
      if (prodidls.includes(prodidls.push($('.outputprod').eq(i).val()))) {
        repeatcheck = true
      }
      prodidls.push($('.outputprod').eq(i).val())
      transformation.push(item)
    }

    if (techname.length == 0 || techcapmin < 0 || techcapmax <= 0 || techcapmax<techcapmin || yieldcheck || refprodcheck || repeatcheck) {
      alertify.error("Please enter valid values.")
      setTimeout(function(){EditTech(techid);}, 300)
    } else {
      transformation = JSON.stringify(transformation)
      var el = document.getElementsByName("csrfmiddlewaretoken");
      csrf_value = el[0].getAttribute("value");
      jQuery.ajax({
        method: "POST",
        url: "/expert/ajax/techbaseedit",
        data: {csrfmiddlewaretoken: csrf_value, techname:techname, technotes:technotes, techpublic:techpublic, capmin:techcapmin, capmax: techcapmax, invfix: techinvfix, invpro: techinvpro, opfix: techopfix, oppro: techoppro, transformation: transformation, techid: techid},
        success: function (data) {
          if (data) {
              location.href = '/expert/usermain/techbase/' + data.techid
          }
        }
      });
    }
  })
}
