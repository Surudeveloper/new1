function login() {
  localStorage.clear();
  //localStorage.removeItem('menu');
  $.ajax({
    url: '/fbpartners/login',
    type: "POST",
    data: JSON.stringify({
      user: {
        email: $('#email').val(),
        password: $('#password').val(),
        bankname: $('#bank').val()
      }
    }),
    contentType: "application/json; charset=utf-8",
    success: function (data) {
      if (data == 'failed') {
        $('.msg').css("display", "block");
      } else {
     
        switch(getCookie('tenet')){
          case '1':
            decidelanding(getCookie('dru6'))
            break;
        
        case '2':
          $(location).attr('href', '/landingpage')
          break;
        
        case '3':
          if(getCookie('dru6') == 'admin'){
            $(location).attr('href', '/admin-dashboard')
            }else{
              $(location).attr('href', '/landingpage')
            }
          break;
          case '4':
            $(location).attr('href', '/landingpage')
            break;
        }
        
      }
    }
  });
}
function decidelanding (role){
  switch(role){
    case 'CT':
      $(location).attr('href', '/myleads')
      break;
    case 'CTN':
      $(location).attr('href', '/myleads')
      break;
      case 'TE':
        $(location).attr('href', '/telphony')
        break;
      case 'TM':
        $(location).attr('href', '/telphony')
        break; 
        case 'Banker':
          $(location).attr('href', '/myleads')
          break;   
    default:
      $(location).attr('href', '/finlandingpage')
      break;
  }
}

function dealerlogin() {

  $.ajax({
    url: '/fbpartners/login',
    type: "POST",
    data: JSON.stringify({
      user: {
        email: $('#email').val(),
        password: $('#password').val(),
        bankname: ''
      }
    }),
    contentType: "application/json; charset=utf-8",
    success: function (data) {
      if (data == 'failed') {
        $('.msg').css("display", "block");
      } else {
        if (getCookie('dru6') == 'FinancialAdmin') {
          $(location).attr('href', '/myleads')
        } else if (getCookie('dru6') == 'admin') {
          $(location).attr('href', '/users')
        } else {
          $(location).attr('href', '/mytasks')
        }
      }
    }
  });
}
function createpartner() {
  if (formvalidator()) {
    $.ajax({
      url: '/fbpartners/createpartner',
      type: "POST",
      data: JSON.stringify({
        doc: {
          id: guidGenerator(),
          bankname: $('#bank').val(),
          bankdisplayname:$('#bankdisplayname').val(),
          email: $('#email').val(),
          password: $('#password').val(),
          hosttype: $('#dealertype').val(),
          Adpassword: $('#Adpassword').val(),          
          isembedded: $('#isembedded').is(":checked") ? 1 : 0,
          logopath: $('.addoc').find('a').attr('href'),
          emailto:$("#mailerto").val(),
          emailpassword: $('#emailpassword').val(),
          port:$("#Port").val(),
          url:$("#url").val(),
          domain: $('#domain').val(),
          Assigned: $('#ldAssigned option:selected').text(),
          AssignedEmail: $('#ldAssigned option:selected').val().split('|')[0],
          AssignedId: $('#ldAssigned option:selected').val().split('|')[1],
          team: $('#team option:selected').text(),
          teamId: $('#team option:selected').val(),

        }
      }),
      contentType: "application/json; charset=utf-8",
      success: function (data) {
        if (data == 'failed') {
          alert('contact Admin')
        } else if (data == 'wrong Admin password') {
          $('.msg').css("display", "block");
        } else if (data == 'partner exists enter new name') {
          $('.msg1').css("display", "block");
        } else {
          $(location).attr('href', '/financesettings')
        }
      }
    });
  }
}

function Createuser() {

  if (formvalidator()) {

    var t = getUrlVars()["keyid"];
    var _id = guidGenerator();
    var _url = '/fbpartners/createuser';
    if (t) {
      _id = t;
      _url = '/fbpartners/updateuser'
    }


    
  
    $.ajax({
      url: _url,
      type: "POST",
      data: JSON.stringify({
        user: {
          id: _id,
          email: $('#Email').val(),
          name: $('#Name').val(),
          phone: $('#Phone').val(),
          joiningdate:$('#joiningdate').val(),
          city: $('#City').val(),
          //role:$('#role').val(),
          role: $('#role option:selected').val(),
          team: $('#team option:selected').text()? $('#team option:selected').text() : '',
          teamId: $('#team option:selected').val()?$('#team option:selected').val() : '',
          manager: $('#manager option:selected').text() ? $('#manager option:selected').text() : '',
          managerId: $('#manager option:selected').val().split('|')[0]  ? $('#manager option:selected').val().split('|')[0] : '',
          managerEmail: $('#manager option:selected').val().split('|')[1] ? $('#manager option:selected').val().split('|')[1] : '',
          salary: $('#salary').val(),
          Expenses: $('#Expenses').val(),
          band: $('#band option:selected').text(),
          bandId: $('#band option:selected').val(),
          monthlytarget: $('#monthlytarget').val(),
          quaterlytarget: $('#quaterlytarget').val(),
          logopath: $('.addoc').find('a').attr('href'),
          status: 1

        }
      }),
      contentType: "application/json; charset=utf-8",
      success: function (data) {
        if (data == 'email exists') {
          alert('email exist enter new email');
        } else if (data == 'failed') {
          alert('contact Admin')
        } else {
          $(location).attr('href', '/users')
        }
      }
    });
  }
}


function notifydue() {

  //alert(event.target.attributes.getNamedItem('data-cemail').value)
  ////console.log($(this).attr('data-cemail'));
  var loan = {
    //loanname:$(this).attr('data-cemail'),
    companyEmail: event.target.attributes.getNamedItem('data-cemail').value,
    EMIamount: event.target.attributes.getNamedItem('data-EMIamount').value,
    sno: event.target.attributes.getNamedItem('data-sno').value,
    duedate: event.target.attributes.getNamedItem('data-duedate').value,
    company: event.target.attributes.getNamedItem('data-company').value,
  }
  $.ajax({
    url: '/fbpartnersloan/notifydue',
    type: "POST",
    data: JSON.stringify({
      loan
    }),
    contentType: "application/json; charset=utf-8",
    success: function (data) {

      if (data == 'failed') {
        alert('contact Admin')
      } else {

       // $(location).attr('href', '/dashboard')
      }
    }
  });

}
//------------------------lead score----------------------
function createleadscore(){
  var id=getUrlVars()["keyid"]
if(id){
  var _url="/fbpartners/updateleadscore/"+id;
  //alert($("#scorevalue_10").text())
 var leadscore= {
  scorevalue: $("#scorevalue_10").text(),
  colorcode: $("#colocode_10").val()
 
  }
}else{
  var _url="/fbpartners/createleadscore";
  //alert($("#scorevalue_10").text())
 var leadscore= {
  id: $("#id_10").val()+','+$('#id_20').val()+','+$('#id_30').val()+','+$('#id_40').val()+','+$('#id_50').val()+','+$('#id_60').val()+','+$('#id_70').val()+','+$('#id_80').val()+','+$('#id_90').val()+','+$('#id_100').text(),
  scorevalue: $("#scorevalue_10").text()+','+$('#scorevalue_20').text()+','+$('#scorevalue_30').text()+','+$('#scorevalue_40').text()+','+$('#scorevalue_50').text()+','+$('#scorevalue_60').text()+','+$('#scorevalue_70').text()+','+$('#scorevalue_80').text()+','+$('#scorevalue_90').text()+','+$('#scorevalue_100').text(),
  colorcode: $("#valcode_10").val().replace("#",'')+','+$('#valcode_20').val().replace("#",'')+','+$('#valcode_30').val().replace("#",'')+','+$('#valcode_40').val().replace("#",'')+','+$('#valcode_50').val().replace("#",'')+','+$('#valcode_60').val().replace("#",'')+','+$('#valcode_70').val().replace("#",'')+','+$('#valcode_80').val().replace("#",'')+','+$('#valcode_90').val().replace("#",'')+','+$('#valcode_100').val().replace("#",''),
  //colorcode: $("#colocode_10").val()+','+$('#colocode_20').val()+','+$('#colocode_30').val()+','+$('#colocode_40').val()+','+$('#colocode_50').val()+','+$('#colocode_60').val()+','+$('#colocode_70').val()+','+$('#colocode_80').val()+','+$('#colocode_90').val()+','+$('#colocode_100').val(),
  description: $("#depration_10").val()+','+$('#depration_20').val()+','+$('#depration_30').val()+','+$('#depration_40').val()+','+$('#depration_50').val()+','+$('#depration_60').val()+','+$('#depration_70').val()+','+$('#depration_80').val()+','+$('#depration_90').val()+','+$('#depration_100').val(),
  }
}
 // console.log(user);
$.ajax({
  url: _url,
      type: "POST",
      data: JSON.stringify({
        leadscore
      }),
      contentType: "application/json; charset=utf-8", 
      success:function(data){
   console.log(data.Result)
  if(data.Result==="OK"){
    $(location).attr('href', '/add-leadscore1')
  
  }
      }
})  
 
}
//-------------------------lead score end--------------
//---------------------notifications start--------------------
function pullnotifications(){
  //alert("hi")
  var alldelet=getUrlVars()["keyid"]
  //alert(url)
   var _url = '/fbpartnersfinance/pullnotifications';
   console.log($("#noti0").text())
   if($("#noNotifications").text()!=="no notifications"){
   if(alldelet!=="all"){
    var doc= {
       id1:$("#noti0").text(),
        id2:$("#noti1").text(),
       id3:$("#noti2").text(),
        id4:$("#noti3").text(),
     }
   }else{
      doc= {
       url:alldelet,
        }
   }
 var id1=$("#noti0").text();
 console.log(id1)
   $.ajax({
     url: _url,
     type: "POST",
     data: JSON.stringify({
       doc
     }),
     contentType: "application/json; charset=utf-8",
     success: function (data) {
       if (data == 'failed') {
         alert('contact Admin')
       } else {
       //  $(location).attr('href', '/documents')
       }
     }
   });
 }else{
 
 }
 }
//---------------------notification end---------------------

//---------------------------list start------------------
function Createlist() {
  if (formvalidator()) {
    var t = getUrlVars()["keyid"];
    var _id = guidGenerator();
    var _url = '/fbpartners/createlist';
    if (t) {
      _id = t;
      _url = '/fbpartners/updatelist'
    }

    $.ajax({
      url: _url,
      type: "POST",
      data: JSON.stringify({
        list: {
          id: _id,
          type: $('#type').val(),
          name: $('.name').val(),
          value: $('.value').val(),
          isgeneric: $('#isgeneric').is(":checked") ? 1 : 0,
          description: $('.description').val()
        }
      }),
      contentType: "application/json; charset=utf-8",
      success: function (data) {
        if (data == 'failed') {
          alert('contact to admin')
        } else if (data == 'OK') {
          $(location).attr('href', 'list');
        } else {
          $('.name').focus().addClass('required');
          alert('Name Exist..')
        }
      },
      error: function (err) {
        alert('something went wrong')
      }
    });
  }
}
function deletelist() {
  var _id = getUrlVars()["keyid"];
  if (_id) {
    var type= $('#isgeneric').is(":checked") ? 1 : 0;
    $.ajax({
      url: "/fbpartners/deletelist?id=" + _id +"&type="+type,
      type: "post",
      success: function (data) {
        if (data == 'failed') {
          alert('contact to admin')
        } else {
          $(location).attr('href', 'list');
        }
      },
      error: function (error) {
        alert(error)
      }
    })
  }
}
function savelistcsv() {
  var filename = $('.addocs').find('a').attr('href');
  if (filename) {
    $.ajax({
      url: '/fbpartners/savecsvlist',
      type: "POST",
      data: JSON.stringify({
        filename: filename
      }),
      contentType: "application/json; charset=utf-8",
      success: function (data) {
        // console.log(data)
        if (data == 'failed') {
          alert('contact Admin')
        } else {
          $('div.csvareas').empty().append(`<span class="csvareas dz-clickable">
          <i class="fa fa-arrow-circle-o-up fa-3x dz-clickable"></i>
             <br>
          Drop Files (or)Click here
          </span>`);
          if (data == 'OK') {
            $('#uploadlists').modal('hide');
            showallList();
          } else {
            alert(data)
          }
        }
      },
      error: function (error) {
        if (error.status == 403) {
          $(location).attr('href', '/');
        }
        if (error.status == 500) {
          alert('internal server error')
        }
      }
    });
  } else {
    alert("Please Select File")
  }
}
//---------------------------list end---------------
//------------------------- partnerteams start------------------------
function Createdealerteam() {
  if (formvalidator()) {
    var t = getUrlVars()["keyid"];
    var _id = guidGenerator();
    var _url = '/fbpartners/createfinanceteam';
    if (t) {
      _id = t;
      _url = '/fbpartners/updatefinanceteam'
    }

    $.ajax({
      url: _url,
      type: "POST",
      data: JSON.stringify({
        team: {
          id: _id,
          email: $('#Email').val(),
          teamname: $('#teamname').val(),
          description: $('#description').val(),
          issales: $('#issales').is(":checked") ? 1 : 0,
         //teamtype:$('#teamtype option:selected').val(),
          currentmngr:$('#currentmngr').val(),
          manager: $('#manager option:selected').text(),
          managerId: $('#manager option:selected').val().split('|')[1],
          managerEmail: $('#manager option:selected').val().split('|')[0],
          salescoordinator: $('#scmanager option:selected').toArray().map(item => item.text).join(),
          salescoordinatorId: $('#scmanager option:selected').toArray().map(item => item.value).join(),
          //telecaller: $('#telecaller option:selected').toArray().map(item => item.text).join(),
          //telecallerId: $('#telecaller option:selected').toArray().map(item => item.value).join(),
          logopath: $('.addoc').find('a').attr('href'),
          status: 1

        }
      }),
      contentType: "application/json; charset=utf-8",
      success: function (data) {
        if (data == 'failed') {
          alert('contact Admin')
        } else {
          $(location).attr('href', '/dealerteams')
        }
      }
    });
  }
}
function deletedealerteams() {
  var _id = getUrlVars()["keyid"];
  var _url = '/fbpartners/deletefinanceteam';
  var result = confirm('Are you sure want to delete team')
  if (result) {
    $.ajax({
      url: _url,
      type: "POST",
      data: JSON.stringify({
        team: {
          id: _id

        }
      }),
      contentType: "application/json; charset=utf-8",
      success: function (data) {
        if (data == 'failed') {
          alert('contact Admin')
        } else {
          $(location).attr('href', '/financeteams')
        }
      }
    });
  }
}
//-------------------------partner teams end--------------------------
//--------------------------Activities types start----------------------

function CreateActivitytype() {
  if (formvalidator()) {

    var t = getUrlVars()["keyid"];
    var _id = guidGenerator();
    var _url = '/fbpartners/CreateActivitytype';
    if (t) {
      _id = t;
      _url = '/fbpartners/updateActivitytype?keyid=' + t
    }

    $.ajax({
      url: _url,
      type: "POST",
      data: JSON.stringify({
        activities: {
          id: _id,
          name: $('#name').val(),
          path: $('#logopath option:selected').val(),
          // path: $('.addoc').find('a').attr('href'),
          colorcode: $('#colorcode').val(),
          description: $('#description').val()
        }
      }),
      contentType: "application/json; charset=utf-8",
      success: function (data) {
        // console.log('2862 - ', data)
        if (data == 'failed') {
          alert('contact Admin')
        } else if (data == 'OK') {
          $(location).attr('href', '/Activitytype');
        } else {
          alert(data);
          $('#name').focus().addClass('required');
        }
      }
    });
  }
}
function deleteActivitytype() {
  var _id = getUrlVars()["keyid"];
  var _url = '/fbpartners/deleteActivitytype?keyid=' + _id;
  var result = confirm('Are you sure want to delete Activity Type')
  if (result && _id) {
    $.ajax({
      url: _url,
      type: "POST",
      contentType: "application/json; charset=utf-8",
      success: function (data) {
        if (data == 'failed') {
          alert('contact Admin')
        } else {
          $(location).attr('href', '/Activitytype')
        }
      }
    });
  }
}
//---------------------------Activities types end-----------------------
// -----------Activity Start--------------------
function CreateActivity() {
  if (formvalidator()) {
    var t = getUrlVars()["keyid"];
    var _id = guidGenerator();
    var _url = '/fbpartners/CreateActivity';
    if (t) {
      _id = t;
      _url = '/fbpartners/updateActivity?keyid=' + t
    }

    $.ajax({
      url: _url,
      type: "POST",
      data: JSON.stringify({
        activities: {
          id: _id,
          name: $('#name').val(),
          description: $('#description').val(),
          typeId: $('#activitytype option:selected').val(),
          typename: $('#activitytype option:selected').text(),
          colorcode:$('#activitytype option:selected').data("colorcode"),
          time: $('#time').val()
        }
      }),
      contentType: "application/json; charset=utf-8",
      success: function (data) {
        if (data == 'failed') {
          alert('contact Admin')
        } else {
          $(location).attr('href', '/Activity-timeline')
        }
      }
    });
  }
}
function deleteActivity() {
  var _id = getUrlVars()["keyid"];
  var _url = '/fbpartners/deleteActivity?keyid=' + _id;
  var result = confirm('Are you sure want to delete Activity')
  if (result && _id) {
    $.ajax({
      url: _url,
      type: "POST",
      contentType: "application/json; charset=utf-8",
      success: function (data) {
        if (data == 'failed') {
          alert('contact Admin')
        } else {
          $(location).attr('href', '/Activity')
        }
      }
    });
  }
}
//---------------------------Activity end-----------------------
function Createcontact() {
 
  if (formvalidator()) {
    // //console.log("checking updae"); 
    var t = getUrlVars()["keyid"];
    var _id = guidGenerator();
    var _url = '/fbpartners/createcontact';
    if (t) {
      _id = t;
      _url = '/fbpartners/updatecontact'
    }

    $.ajax({
      url: _url,
      type: "POST",
      data: JSON.stringify({
        contact: {
          id: _id,
          email: $('#Email').val(),
          cname: $('#Name').val(),
          phone: $('#Phone').val(),
          position: $('#Position').val(),

          Address: $('#Address').val(),
          company: $('#Company option:selected').text(),
          tagNames:$("#TagName").val().toString(),
          position: $('#position').val(),
          city: $('#City').val(),
          logopath: $('.addoc').find('a').attr('href'),
          Assigned: $('#ldAssigned option:selected').text(),
          AssignedEmail: $('#ldAssigned option:selected').val().split('|')[0],
          AssignedId: $('#ldAssigned option:selected').val().split('|')[1],
          team: $('#team option:selected').text(),
          teamId: $('#team option:selected').val(),
          status: 1
        }
      }),
      contentType: "application/json; charset=utf-8",
      success: function (data) {

        if (data == 'failed') {
          alert('contact Admin')
        }else if(data.Result=="OK") {
          $(location).attr('href', '/contacts')
        } else {
          alert(data)
          $(location).attr('href', '/contacts')
        } 

      }
    });
  }
}
function createleadcontact(contactnumber, contacts, company,email,city) {
  ////console.log("checking");
  if (formvalidator()) {

    //var t =getUrlVars()["keyid"];
    var _id = guidGenerator();
    var _url = '/fbpartners/createcontact';
    // if(t)
    // {
    //   _id=t;
    //   _url='/fbpartners/updatecontact'
    // }
    ////console.log(contacts);
    $.ajax({
      url: _url,
      type: "POST",
      data: JSON.stringify({
        contact: {
          id: _id,
          email:email,
          cname: contacts,
          phone: contactnumber,
          //position:$('#Position').val(),

          //Address:$('#Address').val(),
          company: company,

          //position:$('#position').val(),
          city:city, 
          //logopath: $('.addoc').find('a').attr('href'),                
          status: 1
        }
      }),
      contentType: "application/json; charset=utf-8",
      success: function (data) {

        if (data == 'failed') {
          alert('contact Admin')
        }
        //  else
        //   {
        //      $(location).attr('href', '/contacts')
        //   }
      }
    });
  }
}

// function Createcontact() {
//   if (formvalidator()) {

//     var t = getUrlVars()["keyid"];
//     var _id = guidGenerator();
//     var _url = '/fbpartners/createcontact';
//     if (t) {
//       _id = t;
//       _url = '/fbpartners/updatecontact'
//     }

//     $.ajax({
//       url: _url,
//       type: "POST",
//       data: JSON.stringify({
//         contact: {
//           id: _id,
//           email: $('#Email').val(),
//           cname: $('#Name').val(),
//           phone: $('#Phone').val(),
//           position: $('#Position').val(),

//           Address: $('#Address').val(),
//           company: $('#Company option:selected').text(),

//           position: $('#position').val(),
//           city: $('#City').val(),
//           logopath: $('.addoc').find('a').attr('href'),
//           status: 1
//         }
//       }),
//       contentType: "application/json; charset=utf-8",
//       success: function (data) {

//         if (data == 'failed') {
//           alert('contact Admin')
//         } else {
//           $(location).attr('href', '/contacts')
//         }
//       }
//     });
//   }
// }
//-----------------------bulk contact start-------------------------
function savebulkcontactcsv() {
  var filename = $('.addocs').find('a').attr('href');
  if (filename) {
    $.ajax({
      url: '/fbpartners/bulkcontacts',
      type: "POST",
      data: JSON.stringify({
        filename: filename
      }),
      contentType: "application/json; charset=utf-8",
      success: function (data) {
        if (data == 'failed') {
          alert('contact Admin')
        } else {
          $('div.csvareas').empty().append(`<span class="csvareas dz-clickable">
          <i class="fa fa-arrow-circle-o-up fa-3x dz-clickable"></i>
             <br>
          Drop Files (or)Click here
          </span>`);

          $('.msg').css('display', 'block').empty().append(`<div class="alert alert-success">
          <strong>Success..! </strong>&nbsp;&nbsp;File Saved</div>`);

          $(".alert").fadeTo(2000, 500).slideUp(500, function () {
            $(".msg").empty();
            $('#uploadbulkcontacts').modal('hide');
            if($(location).attr('pathname')=="bulkcontacts"){
              getbulkcontacts();
            }else if($(location).attr('pathname')=="telphony"){
            getteleponyusers();
          }else{
            location.reload();
          }
        });
        }
      }
    });
  } else {
    alert("Please Select File")
  }
}
//------------------------bulk contact end--------------------------
//-------------------------bulk company start-----------------
function savecompanycsv() {
  $.ajax({
    url: '/fbpartners/savecsvcompany',
    type: "POST",
    data: JSON.stringify({
      filename: $('.addocs').find('a').attr('href')
    }),
    contentType: "application/json; charset=utf-8",
    success: function (data) {
      if (data == 'failed') {
        alert('contact Admin')
      } else {
        $('div.csvareas').empty().append(`<span class="csvareas dz-clickable">
          <i class="fa fa-arrow-circle-o-up fa-3x dz-clickable"></i>
             <br>
          Drop Files (or)Click here
          </span>`);
        getcompanys();
        // $(location).attr('href', '/companies');
      }
    }
  });
}
//---------------------------contacts bulk upload-----------
function savecontactcsv() {
  $.ajax({
    url: '/fbpartners/savecsvcontact',
    type: "POST",
    data: JSON.stringify({
      filename: $('.addocs').find('a').attr('href')
    }),
    contentType: "application/json; charset=utf-8",
    success: function (data) {
      if (data == 'failed') {
        alert('contact Admin')
      } else {
        $('div.csvareas').empty().append(`<span class="csvareas dz-clickable">
          <i class="fa fa-arrow-circle-o-up fa-3x dz-clickable"></i>
             <br>
          Drop Files (or)Click here
          </span>`);
        getcontacts();
        // $(location).attr('href', '/contacts')
      }
    }
  });
}
function saveuploadcontactcsv() {
  var filename = $('.addocs').find('a').attr('href');
  if (filename) {
    $.ajax({
      url: '/fbpartners/savecsvcontact',
      type: "POST",
      data: JSON.stringify({
        filename: filename
      }),
      contentType: "application/json; charset=utf-8",
      success: function (data) {
        if (data == 'failed') {
          alert('contact Admin')
        } else {
          $('div.csvareas').empty().append(`<span class="csvareas dz-clickable">
          <i class="fa fa-arrow-circle-o-up fa-3x dz-clickable"></i>
             <br>
          Drop Files (or)Click here
          </span>`);

          $('.msg').css('display', 'block').empty().append(`<div class="alert alert-success">
          <strong>Success..! </strong>&nbsp;&nbsp;File Saved</div>`);

          $(".alert").fadeTo(2000, 500).slideUp(500, function () {
            $(".msg").empty();
            $('#uploadcontacts').modal('hide');
          });

        }
      }
    });
  } else {
    alert("Please Select File")
  }
}

//--------------------------contacts bulk upload end-------
//-------------------------bulk upload users start-----
function saveuploaduserscsv() {  
  var filename = $('#uploadusers .addocs').find('a').attr('href');

  if (filename) {
    $.ajax({
      url: '/fbpartners/saveuserscsv',
      type: "POST",
      data: JSON.stringify({
        filename: filename
      }),
      contentType: "application/json; charset=utf-8",
      success: function (data) {
        console.log(data)
        if (data == 'failed') {
          alert('contact Admin')
        } else {
          // $('div.csvareas').empty().append(`<span class="csvareas dz-clickable">
          // <i class="fa fa-arrow-circle-o-up fa-3x dz-clickable"></i>
          //    <br>
          // Drop Files (or)Click here
          // </span>`);

          $('.msg').css('display', 'block').empty().append(`<div class="alert alert-success">
          <strong>Success..! </strong>&nbsp;&nbsp;File Saved</div>`);

          $(".alert").fadeTo(2000, 500).slideUp(500, function () {
            $(".msg").empty();
            getusers();
            // $('#uploadusers').modal('hide');
          });
        }
      }
    });
  } else {
    alert("Please Select File")
  }
}
//-------------------------bulk upload users end------
//-------------------------bulk company end------------------

function Createcompany() {
  if (formvalidator()) {
    var t = getUrlVars()["keyid"];
    var _id = guidGenerator();
    var _url = '/fbpartners/createcompany';
    if (t) {
      _id = t;
      _url = '/fbpartners/updatecompany'
    }
    $.ajax({
      url: _url,
      type: "POST",
      data: JSON.stringify({
        company: {
          id: _id,
          email: $('#Email').val(),
          cname: $('#Name').val(),
          entitytype: $('#entitytype option:selected').val(),
          phone: $('#Phone').val(),
          workphone: $('#Workphone').val(),
          website: $('#website').val(),
          tagNames: $("#TagName").val().toString(),
          City: $('#City').val(),
          Address: $('#Address').val(),
          Assigned: $('#ldAssigned option:selected').text(),
          AssignedEmail: $('#ldAssigned option:selected').val().split('|')[0],
          AssignedId: $('#ldAssigned option:selected').val().split('|')[1],
          team: $('#team option:selected').text(),
          teamId: $('#team option:selected').val(),
          //contact:$('#Contact option:selected').text(),

          contact: $('#Contact').val(),
          city: $('#City').val(),
          status: 1
        }
      }),
      contentType: "application/json; charset=utf-8",
      success: function (data) {

        if (data == 'failed') {
          alert('contact Admin')
        } else if(data=="OK") {
          // $(location).attr('href', '/companies')
          if (getUrlVars()["changeurl"] == "true" || getUrlVars()["changeurl"] == true) {
            $(location).attr('href', '/add-leads')
          } else {
            $(location).attr('href', '/companies')
          }
        }else{
          alert(data);
        }
      }
    });
  }
}
function Createleadstages() {
  if (formvalidator()) {

    //var t =getUrlVars()["keyid"];
    var _id = guidGenerator();
    var _url = '/fbpartners/createleadstages';
    // if(t)
    // {
    //   _id=t;
    //   _url='/fbpartners/updatecompany'
    // }

    $.ajax({
      url: _url,
      type: "POST",
      data: JSON.stringify({
        leadstage: {
          id: _id,
          stagename: $('#stagename').val(),
          description: $('#description').val()

        }
      }),
      contentType: "application/json; charset=utf-8",
      success: function (data) {

        if (data == 'failed') {
          alert('contact Admin')
        } else {
          gettenantleadstages();
          //$(location).attr('href', '/lead-stages')
        }
      }
    });
  }
}
function getallstages() {
  var arry = [];
  var count = 0;
  $('.sleslda.checking > .allmanpads').each(function () {
    // $('.sleslda.checking > .ls_manage').each(function () {
    var record = {};
    record['id'] = $(this).attr('data-id')
    record['order'] = count++;
    arry.push(record)
  });
  return arry;
}

function updateleadstagesflows() {
  var _url = '/fbpartners/updateleadstagesflows';
  $.ajax({
    url: _url,
    type: "POST",
    data: JSON.stringify({
      flow: {
        stages: getallstages()
      }
    }),
    contentType: "application/json; charset=utf-8",
    success: function (data) {
      if (data == 'failed') {
        alert('contact Admin')
      } else {
        // gettenantleadstages();
      }
    }
  });
}
function updateloanformleadstage(id) {
  // if (formvalidator()) {
// console.log($('#leadid').val())
     //var t =getUrlVars()["keyid"];
     var id=$('#leadid').val();
     var _url = '/fbpartners/updateloanformleadstages?keyid='+id;
     leadstage= {
      LoanType: $('#formname option:selected').text(),
      LoanTypeid: $('#formname option:selected').val(),
      loanformstatus: 1
 
     }
     $.ajax({
       url: _url,
       type: "POST",
       contentType: "application/json; charset=utf-8",
       dataType: "JSON",
       data: JSON.stringify({
         leadstage
       }),
       success: function (data) {
 
         if (data == 'failed') {
           alert('contact Admin')
         } else {
          //  $('#exampleModalCenter').delay(1000).fadeOut('fast');

           $("#exampleModalCenter").modal("hide")
           $('body').removeClass('blur');

        
           gettenantleadstages();
           //$(location).attr('href', '/lead-stages')
         }
       }
     });
 //  }
 }
 function updatenextleadstages(id) {
  // if (formvalidator()) {
     //var t =getUrlVars()["keyid"];
     var id=$('#leadid').val();
     var _url = '/fbpartners/updatenextleadstages?keyid='+id;
     leadstage= {
       nextleadstages: $('#leadstages option:selected').toArray().map(item => item.text).join(),
       nextleadstagesid: $('#leadstages option:selected').toArray().map(item => item.value).join(),
       nextleadtatus: 1
 
     }
     $.ajax({
       url: _url,
       type: "POST",
       contentType: "application/json; charset=utf-8",
       dataType: "JSON",
       data: JSON.stringify({
         leadstage
       }),
       success: function (data) {
 
         if (data == 'failed') {
           alert('contact Admin')
         } else {
           alert("hi")
           gettenantleadstages();
           //$(location).attr('href', '/lead-stages')
           $("#exampleModal2").modal("hide")
         }
       }
     });
 //  }
 }
 function savemaxtime() {
  if (formvalidator2('leadstagemaxtime')) {
    var id = $('#leadid').val();
    var _url = '/fbpartners/savemaxtime_leadstages?keyid=' + id;

    $.ajax({
      url: _url,
      type: "POST",
      data: JSON.stringify({
        leadstage: {
          time: $('#time').val() + '|' + $('#formate option:selected').val()
        }
      }),
      contentType: "application/json; charset=utf-8",
      success: function (data) {
        if (data == 'failed') {
          alert('contact Admin')
        } else {
          $('.modal').modal('hide');
          gettenantleadstages();
        }
      }
    });
  }
}
 function updatedealerlearform(parent){
  var keyid=getUrlVars()["keyid"]
   var _url="/fbpartnerlead/updatedealerleadform?keyid="+keyid;
   var record=getloanformjsonforpost(parent);
   record['stages']=$("#leadstage option:selected").text(),
   record['formnameid']=$("#formname").text()+"-"+$("#leadstage").find(':selected').data("formid"),

  $.ajax({
    url: _url,
    type: "POST",
    contentType: "application/json; charset=utf-8",
    dataType: "JSON",
    data: JSON.stringify({
      loanform:record
    }),
    success: function (data) {
//console.log(data)
      if (data == 'failed') {
        alert('contact Admin')
      } else {     

        $("#exampleModal").modal("hide")
        bindeditmydealeads();
      }
    }
  });
}
function getloanformjsonforpost(id){

  var record ={}
  var recarry=[]
  // var tmparry=[]
 
  $("#"+id+" .screebmains > .form-group").each(function(){
    if(!$(this).hasClass('fbhide')){
    var selval = $(this).data('ctrltype')
    switch (selval) {      
      case 'radio':  
      
        record[$(this).find('label').next().data('prop')] = $(this).find('label').next().find("input:checked").val()     
      break;
      case 'checkbox':
    record[$(this).find('label').next().data('prop')] = $(this).find('label').next().find("input:checked").map(function() {
    return $(this).val();
  }).get().join();
      break; 
      case 'select':  
   
        record[$(this).find('select').data('prop')] = $(this).find('select').val()     
      break;
      case 'textarea':  
      
        record[$(this).find('textarea').data('prop')] = $(this).find('textarea').val()     
      break;  
      default:
      record[$(this).find('input').data('prop')] = $(this).find('input').val()
      break;
    }
}
  })
  $(".screebmains > .sec").each(function(){   
   
    if($(this).data('isrepeat') === 1){    
      var tmparry=[]
      var secclass = $(this).attr('class').replace('sec','').trim()         
      if(!recarry.includes(secclass)){
        recarry.push(secclass);
        console.log('491',secclass) 
        $('.'+secclass).each(function(){
          var records={}
          $(this).find('.form-group').each(function(){
            if(!$(this).hasClass('fbhide')){
              var selval = $(this).data('ctrltype')
              switch (selval) {      
                case 'radio':              
                records[$(this).find('label').next().data('prop')] = $(this).find('label').next().find("input:checked").val()     
                break;
                case 'checkbox':
                  records[$(this).find('label').next().data('prop')] = $(this).find('label').next().find("input:checked").map(function() {
                return $(this).val();
                }).get().join();
                break; 
                case 'select':             
                records[$(this).find('select').data('prop')] = $(this).find('select').val()     
                break;
                case 'textarea':                
                records[$(this).find('textarea').data('prop')] = $(this).find('textarea').val()     
                break;  
                default:
                records[$(this).find('input').data('prop')] = $(this).find('input').val()
                break;
              }
             
          }
      
           }) 
          
           tmparry.push(records)
          
           record[secclass] = tmparry 
        })
      }
      
    }else{
     
      var nrecord ={};
      var nsecclass = $(this).attr('class').replace('sec','').trim()
      console.log(nsecclass)
     $(this).find('.form-group').each(function(){
     
      if(!$(this).hasClass('fbhide')){
        
        var selval = $(this).data('ctrltype')
        switch (selval) {      
          case 'radio':           
          nrecord[$(this).find('label').next().data('prop')] = $(this).find('label').next().find("input:checked").val()     
          break;
          case 'checkbox':
        nrecord[$(this).find('label').next().data('prop')] = $(this).find('label').next().find("input:checked").map(function() {
        return $(this).val();
      }).get().join();
          break; 
          case 'select':        
            nrecord[$(this).find('select').data('prop')] = $(this).find('select').val()     
          break;
          case 'textarea':            
             nrecord[$(this).find('textarea').data('prop')] = $(this).find('textarea').val()     
          break;  
          default:
          nrecord[$(this).find('input').data('prop')] = $(this).find('input').val()
          break;
        }
    }

     }) 
     console.log(nsecclass)
     record[nsecclass] = nrecord

    }

  })

  return record;
}
function getadditionalformjsonforpost() {
  var record = {}
  $("[data-prop]").each(function () {
    if (!$(this).parents('.form-group').hasClass('fbhide')) {
      var selval = $(this).parents('.form-group').data('ctrltype');
      // console.log(selval)
      switch (selval) {
        case 'radio':
          record[$(this).data('prop')] = $(this).find("input:checked").val()
          break;
        case 'checkbox':
          record[$(this).data('prop')] = $(this).find("input:checked").map(function () {
            return $(this).val();
          }).get().join();
          break;
        case 'select':
          record[$(this).data('prop')] = $(this).val()
          break;
        case 'textarea':
          record[$(this).data('prop')] = $(this).val()
          break;
        default:
          record[$(this).data('prop')] = $(this).val()
          break;
      }
    }
  });
  return record;
}
function Createleads() {
  if (formvalidator()) {   
    var t = getUrlVars()["keyid"];
    var _id = guidGenerator();
    var refid = guidGenerator();
    var _url = '/fbpartnerlead/createdealerlead';   
    if (!t) {
    createleadcontact($('#contactnumber').val(), $('#Contact').val(), $('#Company option:selected').text(),$('#email').val(),$('#city').val());
    }
 
    $.ajax({
      url: _url,
      type: "POST",
      data: JSON.stringify({
        leads: {
          id: _id,
          //refid: refid,
          leadname:$('#leadname').val(),
          leadequipments: $('#leadequipments option:selected').toArray().map(item => item.text).join(),  
          leadequipmentsId:$('#leadequipments option:selected').toArray().map(item => $(item).data("id")).join(),     
          leadamount: $('#leadamount').val(),
          leadscore: $('#leadscore option:selected').val(),
          contactnumber: $('#contactnumber').val(),
          leadsummary: $('#leadsummary').val(),
          financerequired: $('input[name="financerequired"]:checked').val(),
          manfrequired: $('#manufacturer').val()?1:0,
          mancode: $('#manufacturer option:selected').val().split('|')[1],
          manurl:$('#manufacturer option:selected').val().split('|')[0],        
          contact: $('#Contact ').val(),
          contactEmail: $('#email').val(),
          contactcity: $('#city ').val(),
          state:$('#State option:selected').val(),
          zone:$('#Zone option:selected').val(),
          ismanf: $('#manfrefid').val() ? 1 : 0,
          isfin:$('#refid').val() ? 1 : 0,
          tagNames:$("#TagName").val().toString(),
          company: $('#Company option:selected').text(),
          companyEmail: $('#Company option:selected').val().split('|')[0],
          campaignname: $('#campaignname option:selected').text(),
          campaignnameId: $('#campaignname option:selected').val(),
          isvisible: $('#isvisible').is(":checked") ? 1 : 0,
          leadstage:  $('#leadstage option:selected').text(),
          cleadstage: $('#leadstage option:selected').text(),
          Assigned: $('#ldAssigned option:selected').text(),
          AssignedEmail: $('#ldAssigned option:selected').val().split('|')[0],
          AssignedId: $('#ldAssigned option:selected').val().split('|')[1],
          oldassigned: $('#assignedid').val(), 
          team: $('#team option:selected').text(),
          teamId: $('#team option:selected').val(),
          form:getadditionalformjsonforpost()      
        }
      }),

      contentType: "application/json; charset=utf-8",
      success: function (data) {
      console.log('753',data)
        if (data == 'failed') {
          alert('contact Admin')
        } else {
         // console.log('in1')
            //  if($('input[name="financerequired"]:checked').val() === 'Yes'){
            //   // console.log('in2')
            //   createdealertofinancelead(data);
            // // console.log('1308',data)
            //  createdealertomanufacturerlead(data)
            //  }
            //  else{
            $(location).attr('href', '/leads')
            // }
          
        }
      }
    });
  }
}
function createdealertofinancelead(sourceid){
 // if (formvalidator()) {
    var _url = '/fbExternallead/createdealertofinancelead';
    $.ajax({
      url: _url,
      type: "POST",
      data: JSON.stringify({
        leads: {     
          refid: sourceid.id,
          url:'http://finbot2.com/',
          dealername:getCookie('fbbank'),
          dealerId:sourceid.tenantid,
          leadname:$('#leadname').val(),
          leadequipments: $('#leadequipments option:selected').toArray().map(item => item.text).join(),        
          leadamount: $('#leadamount').val(),
          contactnumber: $('#contactnumber').val(),
          leadsummary: $('#leadsummary').val(),      
          contact: $('#Contact ').val(),
          contactEmail: $('#email').val(),
          contactcity: $('#city ').val(),
          company: $('#Company option:selected').text(),
          companyEmail: $('#Company option:selected').val().split('|')[0],
          Assigned: $('#ldAssigned option:selected').text(),
          AssignedEmail: $('#ldAssigned option:selected').val().split('|')[0],
          AssignedId: $('#ldAssigned option:selected').val().split('|')[1],             
        }
      }),

      contentType: "application/json; charset=utf-8",
      success: function (data) {
console.log('1351',data)
        if (data == 'failed') {
          alert('contact Admin')
        } else {
          console.log('in here 1355',data)
          updatedestinationid(data,sourceid,2)
          // if($('input[name="manfrequired"]:checked').val() === 'Yes'){
          //   console.log('in2')
          //  createdealertomanufacturerlead(sourceid);
          // }
          // else{
        // $(location).attr('href', '/leads')
         // }
           
          
        }
      }
    });
  //}
}
function createdealertomanufacturerlead(sourceid){
 
   // if (formvalidator()) {
      // var _url = '/fbpartnerlead/createdealertomanufacturerlead';
      var _url = '/fbExternallead/createExternalmanufacturerlead';
      $.ajax({
        url: _url,
        type: "POST",
        data: JSON.stringify({
          leads: {     
            refid: sourceid.id,
            dealername:getCookie('fbbank'),
            dealerId:sourceid.tenantid,
            leadname:$('#leadname').val(),
             url:'http://finbot2.com/',
            leadequipments: $('#leadequipments option:selected').toArray().map(item => item.text).join(),        
            leadamount: $('#leadamount').val(),
            contactnumber: $('#contactnumber').val(),
            leadsummary: $('#leadsummary').val(),      
            contact: $('#Contact ').val(),
            contactEmail: $('#email').val(),
            mancode:'many1',
            contactcity: $('#city ').val(),
            company: $('#Company option:selected').text(),
            companyEmail: $('#Company option:selected').val().split('|')[0],
            Assigned: $('#ldAssigned option:selected').text(),
            AssignedEmail: $('#ldAssigned option:selected').val().split('|')[0],
            AssignedId: $('#ldAssigned option:selected').val().split('|')[1],             
          }
        }),
  
        contentType: "application/json; charset=utf-8",
        success: function (data) {
  
          if (data == 'failed') {
            alert('contact Admin')
          } else {
              
            updatedestinationid(data,sourceid,1)
          // $(location).attr('href', '/leads')          
          }
        }
      });
    //}
  }
function updatedestinationid(destid,lid,type){
  var _url = '/fbExternallead/updatedestinationid';
      $.ajax({
        url: _url,
        type: "POST",
        data: JSON.stringify({
          leads: {    
            leadid:lid.id, 
            refid: destid.id,
            uid:destid.tenantid,
            type:  type                    
          }
        }),
  
        contentType: "application/json; charset=utf-8",
        success: function (data) {
  
          if (data == 'failed') {
            alert('contact Admin')
          } else {
          $(location).attr('href', '/leads')          
          }
        }
      });
    //}
}
function updatestakeholder() {
  var t = getUrlVars()["keyid"];
  if (t) {
    if ($('#stakeholders option:selected').val()) {
      var _id = guidGenerator();
      var _url = '/fbpartnerlead/updatedealerstakeholders';
      _id = t;
      $.ajax({
        url: _url,
        type: "POST",
        data: JSON.stringify({
          stakeholder: {
            id: _id,

            stakeholder: $('#stakeholders option:selected').text(),
            stakeholderemail: $('#stakeholders option:selected').val().split('|')[0],
            stakeholderId: $('#stakeholders option:selected').val().split('|')[1],
          }

        }),

        contentType: "application/json; charset=utf-8",
        success: function (data) {

          if (data == 'failed') {
            alert('contact Admin')
          } else if (data.Result == "OK") {
            getstakeholders();
            // if (getCookie('dru6') == 'admin') {
            //   $(location).attr('href', '/leads')
            // } else if (getCookie('dru6') == 'FinancialAdmin') {
            //   $(location).attr('href', '/myleads')
            // } else {
            //   $(location).attr('href', '/leads')
            // }
          } else {
            alert(data)
          }
        }
      });
    } else {
      alert('Please Select Stakeholder');
    }
  }
}
function deletestakeholders(sid) {

  var _id = getUrlVars()["keyid"];
  var _url = '/fbpartnerlead/deletedealerstakeholder';
  var result = confirm('A/re you sure want to delete stakeholder')
  if (result) {
    $.ajax({
      url: _url,
      type: "POST",
      data: JSON.stringify({
        stakeholder: {
          id: _id,
          sid:sid

        }
      }),
      contentType: "application/json; charset=utf-8",
      success: function (data) {
        if (data == 'failed') {
          alert('contact Admin')
        } else {
          getstakeholders();
        }
      }
    });
  }
}
function createdealtofinlead(docpath, docname) {

  if (formvalidator()) {
    //console.log("next update");
    var t = getUrlVars()["keyid"];
    var _id = guidGenerator();
    var _url = '/fbpartnersfinance/createfinancelead';
    var tpath = '';
    var financesummary;
    var feedbacksummary;


    ldstage = $('#leadstage option:selected').text();
    if (!$('#financesummary').val()) {
      financesummary = $('#financesummary').val();
    } else {
      financesummary = new Date().toLocaleString().slice(0, 10) + '\n' + $('#financesummary').val();
    }

    if (!$('#feedbacksummary').val()) {
      feedbacksummary = $('#feedbacksummary').val();

    } else {


      feedbacksummary = new Date().toLocaleString().slice(0, 10) + '\n' + $('#feedbacksummary').val();
    }
    // var financesummary=$('#financesummary').val();
    // var feedbacksummary=$('#feedbacksummary ').val();

    if (t) {
      //console.log('checking update');
      fdsold = $("#fdback").val();
      finold = $("#fnback").val();
      fdsnew = $('#feedbacksummary ').val();
      finnew = $('#financesummary').val();
      if (!$('#feedbacksummary').val()) {
        feedbacksummary = fdsold
      } else {
        var feedbacksummarys = fdsold + '\n' + new Date().toLocaleString().slice(0, 10) + '\n' + $('#feedbacksummary').val();
        feedbacksummary = feedbacksummarys;
      }
      if (!$('#financesummary').val()) {
        financesummary = finold
      } else {
        var financesummarys = finold + '\n' + new Date().toLocaleString().slice(0, 10) + '\n' + $('#financesummary').val();
        financesummary = financesummarys;
      }
      //if(fdsnew.localeCompare(fdsold) == 1){ var feedbacksummarys= fdsold+'\n'+new Date().toLocaleString().slice(0,10)+'\n'+difftext(fdsnew,fdsold); feedbacksummary = feedbacksummarys;}else{ feedbacksummary= fdsold}
      //if(finnew.localeCompare(finold) == 1){ var financesummarys= finold+'\n'+new Date().toLocaleString().slice(0,10)+'\n'+difftext(finnew,finold); financesummary = financesummarys;}else{ financesummary= finold}

      if ($('#ldstageold ').val() === $('#leadstage option:selected').text()) {
        ldstage = '';
      } else {
        ldstage = $('#leadstage option:selected').text()
      }

      _id = t;
      _url = '/fbpartners/updateleads'

    }


    ////console.log($('#leadequipments option:selected').toArray().map(item => item.text).join());
    $.ajax({
      url: _url,
      type: "POST",
      data: JSON.stringify({
        leads: {
          id: _id,

          leadequipments: $('#leadequipments option:selected').toArray().map(item => item.text).join(),
          financialpartner: $('#financialpartner').val(),
          leadamount: $('#leadamount').val(),
          contactnumber: $('#contactnumber').val(),
          leadsummary: $('#leadsummary').val(),
          financerequired: $('input[name="financerequired"]:checked').val(),
          financesummary: financesummary,
          feedbacksummary: feedbacksummary,
          contact: $('#Contact ').val(),
          company: $('#Company option:selected').text(),
          leadstage: ldstage,
          cleadstage: $('#leadstage option:selected').text(),
          Assigned: $('#Assigned option:selected').text(),
          AssignedEmail: $('#Assigned option:selected').val().split('|')[0],
          AssignedId: $('#Assigned option:selected').val().split('|')[1],
          docname: docname,
          docpath: docpath,
        }
      }),

      contentType: "application/json; charset=utf-8",
      success: function (data) {

        if (data == 'failed') {
          alert('contact Admin')
        } else {
          if (getCookie('dru6') == 'admin') {
            $(location).attr('href', '/leads')
          } else if (getCookie('dru6') == 'FinancialAdmin') {
            $(location).attr('href', '/myleads')
          } else {


            $(location).attr('href', '/mytasks')
          }
        }
      }
    });
  }
}
function cancelleads() {
  if (getCookie('dru6') == 'admin') {
    $(location).attr('href', '/leads')
  } else if (getCookie('dru6') == 'FinancialAdmin') {
    $(location).attr('href', '/myleads')
  } else {


    $(location).attr('href', '/mytasks')
  }
}
// -----------API KEYS Start--------------------
// createapikey
function createapikey() {
  var _docid = getUrlVars()['keyid'];
  var _url = '/fbpartners/createapikey'
  if (_docid) {
    _url = '/fbpartners/updateapikey?keyid=' + _docid
  }
  if (formvalidator()) {
    let pages = [];
    $('tbody tr').each((tr_idx,tr) => {
          let permissions = {};
          permissions['name'] = $(tr).find('td:first').text();
    
          if ($(tr).find('.delete').prop('checked') == true) {
            permissions['level'] = 3;
          } else if ($(tr).find('.write').prop('checked') == true) {
            permissions['level'] = 2;
          } else if ($(tr).find('.read').prop('checked') == true) {
            permissions['level'] = 1;
          } else {
            permissions['level'] = 0;
          }
          pages.push(permissions);
    });

    var apidetails = {
      company: $('#Companyname').val(),
      description: $('#Description').val(),
      privateKey: $('#privatekey').val(),
      publicKey: $('#publickey').val(),
      startDate: $('#csd').val(),
      endDate: $('#ced').val(),
      // type: $('#Api_Type option:selected').val()
      pages: pages
    }

    $.ajax({
      url: _url,
      type: "POST",
      data: JSON.stringify({
        apidetails
      }),
      contentType: "application/json; charset=utf-8",
      success: function (data) {
        console.log(data)
        if (data == 'failed') {
          alert('contact Admin')
        } else if (data == 'OK') {
     
          $(location).attr('href', 'apikeys');
        } else {
          alert(data);
        }
      }
    });
  }
}

function deleteapikey() {
  var _docid = getUrlVars()['keyid'];
  if (_docid) {
    $.ajax({
      type: "post",
      url: "/fbpartners/deleteapikey?keyid=" + _docid,
      success: function (data) {
        if (data == 'failed') {
          alert('contact Admin')
        } else {
          $(location).attr('href', 'apikeys');
        }
      }
    });
  } else {
    alert('Error')
  }
}
// -----------API KEYS End--------------------

//------------dealerLead page START--------------------
function createdealeaddocument() {
  var _id = getUrlVars()['keyid'];
  if (_id) {
    var docpath = 'leads/'+_id+'/' + $('.addocs').find('a').attr('href');
    var docname = $('#documentname').val();
    Updatedealerlead(docpath, docname);
  }
}
function createdealerleadddocument() {
  var _id = getUrlVars()['keyid'];
  var _url = '/fbExternallead/createdealerleadddocument'
  $('.docdis').empty()
 var leaddoc={
   id : _id,
    refid: $('#refid').val(),
    manfrefid:$('#manfrefid').val(),
     docpath :'leads/'+_id+'/' + $('.addocs').find('a').attr('href'),
     docname : $('#documentname').val(),
    isvisible: $('#isvisible').is(":checked") ? 1 : 0,
    isvisiblemanf:$('#isvisiblemanf').is(":checked") ? 1 : 0,
    tenantid:$('#finid').val(),
    manfid:$('#manfid').val(),
 }
    $.ajax({
      type: "POST",
      contentType: "application/json; charset=utf-8",
      url: _url,
      data: JSON.stringify({
        leaddoc
      }),
      success: function (data) {
        if (data == 'failed') {
          alert('contact Admin')
        } else {
          $('div.imgarea').append(`<span class="imgareas File dz-clickable"><i class="fa fa-arrow-circle-o-up fa-3x dz-clickable"></i><br>Drop
          Files (or)Click here</span>`)
          $('#myModal').modal('hide').find('.form-control').val('');
          $('#myModal #isvisible,#myModal #isvisiblemanf').attr('checked', false);
          data[0].leaddocs.forEach(function (el) {
           
              $(".docdis").append('<tr><td class="ksidws">' + el.docname + '</td><td class="ksidws2"><a href="/fbpartners/viewodoc?docname=' + el.docpath + '" class="fildownad"><i class="fa fa-download"></i></a></td></tr>') 
            
        })
         // location.reload();
        }
    }
    });
  
}
function Updatedealerlead() {
  var _id = getUrlVars()['keyid'];
  if (_id) {
    _url = '/fbpartnerlead/updatedealerlead'   
    var leads = {
      id: _id,
      refid: $('#sourceid').val(),
      leadname: $('#leadname').val(),
      leadnumber:$("#bleadnumber").text(),
      leadequipments: $('#leadequipments option:selected').toArray().map(item => item.text).join(),
      leadequipmentsId:$('#leadequipments option:selected').toArray().map(item => $(item).data("id")).join(), 
      financialpartner: $('#financialpartner').val(),
      leadamount: $('#leadamount').val(),
      contactnumber: $('#contactnumber').val(),
      leadsummary: $('#leadsummary').val(),
      allowallparty: $('#allowallparty').is(":checked") ? 1 : 0,
      thirdparty:$('#thirdparty').val(),
      financerequired: $('input[name="financerequired"]:checked').val(),
      manfrequired: $('#manufacturer').val()?1:0,
      mancode: $('#manufacturer option:selected').val().split('|')[1],
      manurl:$('#manufacturer option:selected').val().split('|')[0],    
      contact: $('#Contact ').val(),
      contactEmail: $('#email').val(),
      contactcity: $('#city ').val(),
      state:$('#pState').text(),
      zone:$('#pZone').text(),

            tagNames:$("#TagName").val().toString(),
      leadscore: $('#pleadscore').attr('data-fbldselval'),
      company: $('#ptCompany').text(),     
      companyEmail: $('#pCompany').attr('data-fbldselval').split('|')[0],
      campaignname: $('#ptcampaignname').text(),
      campaignnameId: $('#pcampaignname').attr('data-fbldselval'),
      ismanf: $('#manfrefid').val() ? 1 : 0,
      isfin:$('#refid').val() ? 1 : 0,
      //isvisible: $('#isvisible').is(":checked") ? 1 : 0,
      leadstage: $('#ptleadstage').text(),
      ldstage:$('#ldstageold ').val(),
      cleadstage: $('#ptleadstage').text(),
      Assigned: $('#ptldAssigned').text(),
      AssignedEmail: $('#pldAssigned').attr('data-fbldselval').split('|')[0],
      AssignedId: $('#pldAssigned').attr('data-fbldselval').split('|')[1],
      team: $('#ptteam').text(),
      teamId: $('#pteam').attr('data-fbldselval'),
      oldassigned: $('#assignedid').val(),
    
      form:getadditionalformjsonforpost()
    
    }
    
    $.ajax({
      type: "POST",
      contentType: "application/json; charset=utf-8",
      url: _url,
      data: JSON.stringify({
        leads
      }),
      success: function (data) {
        if (data == 'failed') {
          alert('contact Admin')
        } else {

         // createdealertofinancelead($('#sourceid').val());
          location.reload();
        }
    }
    });
  }
}

function Createleadtask() {
  var t = getUrlVars()["keyid"];
  var _id = guidGenerator();
  if($("#disstask").val()==="disdealertask"){
    var _url = '/fbpartnersfinance/Createdisleadtask?keyid='+t;

  }else{
  var _url = '/fbpartnersfinance/Createleadtask';
  }  var desc;
  if ($('#type option:selected').text() === 'Approval') {
    desc = $('#ApprovalRequest').val();
  } else if ($('#type option:selected').text() === 'Question') {
    desc = $('#Question').val();
  } else {
    desc = $('#description').val()
  }

  $.ajax({
    url: _url,
    type: "POST",
    data: JSON.stringify({
      task: {
        id: _id,
        leadid: t,
        subject: $('#subject').val(),
        startdate: $('#startdate').val(),
        enddate: $('#enddate').val(),
        type: $('#type option:selected').text(),
        priority: $('#priority option:selected').text(),
        watcher: $('#watcher option:selected').toArray().map(item => item.text).join(),
        watcherEmail: $('#watcher option:selected').toArray().map(item => item.value).join(),
        Assigned: $('#Assigned option:selected').text(),
        AssignedEmail: $('#Assigned option:selected').val().split('|')[0],
        AssignedId: $('#Assigned option:selected').val().split('|')[1],
        description: desc,
        taskstatus: 1,
        typeoftask:$("#disstask").val(),
        taskownername:getCookie('dru5'),
        taskowneremail:getCookie('dru4').replace("%40","@"),
        isfinance : "0"


      }
    }),
    contentType: "application/json; charset=utf-8",
    success: function (data) {

      if (data == 'failed') {
        alert('contact Admin')
      } else {
        getleadtask();
        getdealeadchat(t)
      }
    }
  });
}

function Createleadmeeting() {
  // if (formvalidator()) {

  var t = getUrlVars()["keyid"];
  var _id = guidGenerator();
  if($("#dismeeting").val()==="disdealermeeting"){
    var _url = '/fbpartnersfinance/Createdisleadmeeting?keyid='+t;

  }else{
  var _url = '/fbpartnersfinance/createmeeting';
  }
  $.ajax({
    url: _url,
    type: "POST",
    data: JSON.stringify({
      meeting: {
        id: _id,
        notes: $('#notes').val(),
        subject: $('#msubject').val(),
        meetingtype: $('#meetingtype option:selected').text(),
        meetingtypeId: $('#meetingtype option:selected').val().split('|')[0],
        scheduleddate: $('#date').val(),
        starttime: $('#starttime').val(),
        endtime: $('#endtime').val(),
        summary: $('#summary').val(),
        Attendedfor: 'lead',
        Attendes: $('#attending option:selected').toArray().map(item => item.text).join(),
        AttendesEmail: $('#attending option:selected').toArray().map(item => item.value).join(),
        meetingownername:getCookie('dru5'),
        meetingowneremail:getCookie('dru4').replace("%40","@"),

        lead: '',
        leadId: t,

        Assigned: $('#finAssigned option:selected').text(),
        AssignedEmail: $('#finAssigned option:selected').val().split('|')[0],
        AssignedId: $('#finAssigned option:selected').val().split('|')[1],
        status: 1,
        isfinance:"0",
        typeofmeeting:$("#dismeeting").val()
      }
    }),
    contentType: "application/json; charset=utf-8",
    success: function (data) {

      if (data == 'failed') {
        alert('contact Admin')
      } else {
        getmyleadmeeting();
        getdealeadchat(t)
      }
    }
  });
}

//------------dealerLead page END--------------------
//-------------bul upload products start----------
function saveproductcsv() {
  $.ajax({
    url: '/fbpartners/savecsvproducts',
    type: "POST",
    data: JSON.stringify({
      filename: $('.addocs').find('a').attr('href')
    }),
    contentType: "application/json; charset=utf-8",
    success: function (data) {
      if (data == 'failed') {
        alert('contact Admin')
      } else {
        $('div.csvareas').empty().append(`<span class="csvareas dz-clickable">
          <i class="fa fa-arrow-circle-o-up fa-3x dz-clickable"></i>
             <br>
          Drop Files (or)Click here
          </span>`);
        getproducts();
        // $(location).attr('href', '/products')
      }
    }
  });
}
function saveproducttwocsv() {
  $.ajax({
    url: '/fbpartners/savecsvproductstwo',
    type: "POST",
    data: JSON.stringify({
      filename: $('.addocs').find('a').attr('href')
    }),
    contentType: "application/json; charset=utf-8",
    success: function (data) {
      if (data == 'failed') {
        alert('contact Admin')
      } else {
        $('div.csvareas').empty().append(`<span class="csvareas dz-clickable">
          <i class="fa fa-arrow-circle-o-up fa-3x dz-clickable"></i>
             <br>
          Drop Files (or)Click here
          </span>`);
       // getproductstwo();
         $(location).attr('href', '/productstwo')
      }
    }
  });
}


//----------------taskSuresh Start-----------------

function saveNewProductcsv() {
  $.ajax({
    url: '/fbpartners/savecsvnewproduct',
    type: "POST",
    data: JSON.stringify({
      filename: $('.addocs').find('a').attr('href')
    }),
    contentType: "application/json; charset=utf-8",
    success: function (data) {
      if (data == 'failed') {
        alert('contact Admin')
      } else {
        $('div.csvareas').empty().append(`<span class="csvareas dz-clickable">
          <i class="fa fa-arrow-circle-o-up fa-3x dz-clickable"></i>
             <br>
          Drop Files (or)Click here
          </span>`);
         $(location).attr('href', '/newProduct')
      }
    }
  });
}

function CreateNewProduct() {
  if (formvalidator()) {

    var t = getUrlVars()["keyid"];
     var _id = guidGenerator();
    var _url = '/fbpartners/createNewProduct';

    // if (t) {
    //   _id = t;
    //   _url = '/fbpartners/updateNewProduct'
    // }
    
    $.ajax({
      url: _url,
      type: "POST",
      data: JSON.stringify({
        product: {
          id:_id ,
          Name: $('#Name').val(),
          Type: $('#type').val(),
          Start_Date: $('#stdate').val(),
          End_Date: $('#endate').val(),
          Summary: $('#Summary').val(),
          Task_Owner: $('#tOwner').val(),
        }
      }),
      contentType: "application/json; charset=utf-8",
      success: function (data) {

        if (data == 'failed') {
          alert('contact Admin')
        } else {
          $(location).attr('href', '/newProduct')
        }
      }
    });
  }
}

//----------------taskSuresh End-----------------


//--------------bulk upload products end------------
// ------------Telephonys Start---------------
function Createtelephonys(id) {
  if (formvalidator()) {
    if (getCookie('fbbank') === 'Finbot') {
      h = '/financesettings'
    } else {
      h = '/settings'
    }

    var _id = guidGenerator();
    var _url = '/fbpartners/createtelephony';
    if (id&&id!='undefined') { 
      _id = id;
      _url = '/fbpartners/updatetelephony'
    }
    $.ajax({
      url: _url,
      type: "POST",
      data: JSON.stringify({
        telphony: {
          id: _id,
          mini_interval: $('#mini_interval option:selected').val(),
          calls_per_day: $('#calls_per_day').val(),
          filter: $('#Filter option:selected').val(),
          transcript: $('#Transcript').val()
        }
      }),
      contentType: "application/json; charset=utf-8",
      success: function (data) {
        if (data == 'failed') {
          alert('contact Admin')
        } else {
          $(location).attr('href', h)
        }
      }
    });
  }
}

function deletetelephonys(_id) {
  
  var result = confirm('Are you sure want to delete Telphony');
  if (id&&id!='undefined'&& result) {
    var _url = '/fbpartners/deletetelephony';

    $.ajax({
      url: _url,
      type: "POST",
      data: JSON.stringify({
        telphony: {
          id: _id
        }
      }),
      contentType: "application/json; charset=utf-8",
      success: function (data) {
        if (data == 'failed') {
          alert('contact Admin')
        } else {
          $(location).attr('href', h)
        }
      }
    });
  }
}

function create_tel_financelead(uid) {

  if (formvalidator2("form2")) {
    var _url = '/fbpartnerlead/tel_createfinancelead';
    var telleads = {
      userid: uid,
      teamid: $('#tel_teams option:selected').val(),
      team: $('#tel_teams option:selected').text(),
      loantype: $('#Loan-Type option:selected').text(),
      loantypeId: $('#Loan-Type option:selected').val(),
      leadsummary: $('#leadsummary').val(),
    }
    $.ajax({
      url: _url,
      type: "POST",
      data: JSON.stringify({
        telleads
      }),

      contentType: "application/json; charset=utf-8",
      success: function (data) {
        if (data == 'failed') {
          alert('contact Admin')
        } else {
          // $(location).attr('href', 'telphony');
          $('#myModal').modal('hide');
          
          getteleponyusers();
        }
      }
    });
  }
}

function create_tel_financetask(uid) {
  if (formvalidator()) {
    var _url = '/fbpartnersfinance/tel_createfinancetask';
    var teltask = {
      userid: uid,
      startDate: $('#startDate').val(),
      task_Desc: $('#task_Desc').val()
    }
    // console.log('teltask - ', teltask)
    $.ajax({
      url: _url,
      type: "POST",
      data: JSON.stringify({
        teltask
      }),

      contentType: "application/json; charset=utf-8",
      success: function (data) {
        if (data == 'failed') {
          alert('contact Admin')
        } else {
          // $(location).attr('href', 'telphony');
          $('#myModal').modal('hide');
          $('#myModal').find('input textarea').val('');
          $('#sources option[value="1"]').attr('selected',true).trigger('change');
          getteleponyusers();
        }
      }
    });
  }
}

function create_tel_noaction(uid) {
  if (formvalidator()) {
    var _url = '/fbpartnersfinance/tel_creatfinnoaction';
    var telnoaction = {
      userid: uid,
      description: $('#desc_noaction').val()
    }
    // console.log('telnoaction - ', telnoaction)
    $.ajax({
      type: "POST",
      contentType: "application/json; charset=utf-8",
      url: _url,
      data: JSON.stringify({
        telnoaction
      }),
      success: function (data) {
        console.log(data)
        if (data == 'failed') {
          alert('contact Admin')
        } else {
          // $(location).attr('href', 'telphony');
          $('#myModal').modal('hide');
          $('#myModal').find('input textarea').val('');
          $('#sources option[value="1"]').attr('selected',true).trigger('change');
          getteleponyusers();
        }
      },
      error: function (err) {
        console.log(err)
      }
    });
  }
}
// ------------Telephonys End---------------
function Createproducts(docpath, docname) {
  if (formvalidator()) {

    var t = getUrlVars()["keyid"];
    var _id = guidGenerator();
    var _url = '/fbpartners/createproducts';

    //createproddocument(docnames,docpaths)
    ////console.log(window.opener.document.getElementById('documentname').value);
    if (t) {
      _id = t;
      _url = '/fbpartners/updateproducts'
    }
    //var pname = $('#Name').val().replace(/\s+/g, '-');

    $.ajax({
      url: _url,
      type: "POST",
      data: JSON.stringify({
        products: {
          id: _id,
          Name: $('#Name').val(),
          Price: $('#Price').val(),
          SerialNumber: $('#Serial-Number').val(),
          Manufacturer: $('#manufacturer option:selected').text(),
          ManufacturerId:$('#manufacturer option:selected').val().split('|')[0],
          Manufacturercode:$('#manufacturer option:selected').val().split('|')[1],
          Price: $('#Price').val(),        
          Tax: $('#Tax option:selected').val(),
          HSNCode:$('#hsncode').val(),
          isservice: $('#isservice').is(":checked") ? 1 : 0,
          Description: $('#Description').val(),
          sDescription: $('#sDescription').val(),
          ContactPerson: $('#Contact ').val(),
          logopath: $('.addoc').find('a').attr('href'),
          productowner: $('#Assigned option:selected').toArray().map(item => item.text).join(),
          docname: docname,
          docpath: docpath,


        }
      }),
      contentType: "application/json; charset=utf-8",
      success: function (data) {

        if (data == 'failed') {
          alert('contact Admin')
        } else {
          $(location).attr('href', '/products')
        }
      }
    });
  }
}

function createproddocument() {
  var docpath = 'product/' + $('.addocs').find('a').attr('href');
  var docname = $('#documentname').val();
  Createproducts(docpath, docname);
}

function createleaddocument() {
  var docpath = 'leads/' + $('.addocs').find('a').attr('href');
  var docname = $('#documentname').val();
  Createleads(docpath, docname);
}
function savesubproductcsv(){
  $.ajax({
    url: '/fbpartners/savecsvsubproducts',
    type: "POST",
    data: JSON.stringify({
      filename:$('.addocs').find('a').attr('href')
    }),
    contentType: "application/json; charset=utf-8",
      success: function (data) {
        if (data == 'failed') {
          alert('contact Admin')
        } else {
       // getproducts();
             $(location).attr('href', '/products')
        }
      }
    });
}

//if (formvalidator())
//   {

//   var t =getUrlVars()["keyid"];
//   var _id=guidGenerator();
//   var _url='/fbpartners/createproducts';


//   if(t)
//   {
//     _id=t;
//     _url='/fbpartners/updateproducts'
//   }
//  //var pname = $('#Name').val().replace(/\s+/g, '-');

//   $.ajax({
//                       url:_url ,
//                       type: "POST",
//                       data: JSON.stringify({products:{
//                       id:_id,                     
//                       Name:$('#Name').val(),
//                       Price:$('#Price').val(),
//                       SerialNumber:$('#Serial-Number').val(),
//                       Manufacturer:$('#Company').val(),
//                       Description:$('#Description').val(),  
//                       ContactPerson:$('#Contact ').val(),
//                       logopath: $('.addoc').find('a').attr('href'), 
//                       docpath:'product/'+$('.addoc').find('a').attr('href'),


//                       }}),
//                     contentType: "application/json; charset=utf-8",
//                       success: function (data) {

//                       if(data=='failed')
//                         {
//                           alert('contact Admin')
//                         }
//                        else
//                         {
//                            $(location).attr('href', '/products')
//                         }
//                        }
//     });
//   }
// }

//createproddocument($('#documentname ').val(),'product/'+$('.addoc').find('a').attr('href'));

function Createproductstwo() {
  if (formvalidator()) {

    var t = getUrlVars()["keyid"];
    var _id = guidGenerator();
    var _url = '/fbpartners/createproductstwo';

    if (t) {
      _id = t;
      _url = '/fbpartners/updateproductstwo'
    }
    
    $.ajax({
      url: _url,
      type: "POST",
      data: JSON.stringify({
        productstwo: {
          id: _id,
          Name: $('#Name').val(),
          Manufacturer: $('#manufacturer').val(),
		      Code:$('#Code').val(),
		      Price_min: $('#Price_min').val(),
		      Price_max: $('#Price_max').val(),       
          Type: $('#Type option:selected').text(),
          Category: $('#Category option:selected').text(),
          Subcategory: $('#Subcategory option:selected').text(),
          Tags: $('#Tags').val().toString(),
          logopath: $('.addoc').find('a').attr('href'),
          
        }
      }),
      contentType: "application/json; charset=utf-8",
      success: function (data) {

        if (data == 'failed') {
          alert('contact Admin')
        } else {
          $(location).attr('href', '/productstwo')
        }
      }
    });
  }
}

function deleteproductstwo() {

  var _id = getUrlVars()["keyid"];
  var _url = '/fbpartners/deleteproductstwo';
  var result = confirm('Are you sure want to delete product')
  if (result) {
    ////console.log(_id);
    $.ajax({
      url: _url,
      type: "POST",
      data: JSON.stringify({
        productstwo: {
          id: _id
        }
      }),
      contentType: "application/json; charset=utf-8",
      success: function (data) {
        ////console.log(data)
        if (data == 'failed') {
          alert('contact Admin')
        } else {
          ////console.log("success")
          $(location).attr('href', '/productstwo')
        }
      }
    });
  }
}
function Createservices() {
  if (formvalidator()) {

    var t = getUrlVars()["keyid"];
    var _id = guidGenerator();
    var _url = '/fbpartners/createservice';
    var tpath = '';
    if (t) {
      _id = t;
      _url = '/fbpartners/updateservices'
    }


    $.ajax({
      url: _url,
      type: "POST",
      data: JSON.stringify({
        services: {
          id: _id,
          Name: $('#Name').val(),
          Price: $('#Price').val(),
          SerialNumber: $('#Serial-Number').val(),
          Manufacturer: $('#Company option:selected').text(),
          Description: $('#Description').val(),
          ContactPerson: $('#Contact option:selected').text(),

        }
      }),
      contentType: "application/json; charset=utf-8",
      success: function (data) {

        if (data == 'failed') {
          alert('contact Admin')
        } else {
          $(location).attr('href', '/services')
        }
      }
    });
  }
}





function deleteuser() {

  var _id = getUrlVars()["keyid"];
  var _url = '/fbpartners/deleteuser';
  var result = confirm('Are you sure want to delete user')
  if (result) {
    $.ajax({
      url: _url,
      type: "POST",
      data: JSON.stringify({
        user: {
          id: _id

        }
      }),
      contentType: "application/json; charset=utf-8",
      success: function (data) {
        if (data == 'failed') {
          alert('contact Admin')
        } else {
          $(location).attr('href', '/users')
        }
      }
    });
  }
}

function deletecontact() {

  var _id = getUrlVars()["keyid"];
  var _url = '/fbpartners/deletecontact';
  var result = confirm('Are you sure want to delete contact')
  if (result) {
    $.ajax({
      url: _url,
      type: "POST",
      data: JSON.stringify({
        contact: {
          id: _id

        }
      }),
      contentType: "application/json; charset=utf-8",
      success: function (data) {
        if (data == 'failed') {
          alert('contact Admin')
        } else {
          $(location).attr('href', '/contacts')
        }
      }
    });
  }
}

function deletelead() {

  var _id = getUrlVars()["keyid"];
  var _url = '/fbpartners/deleteleads';
  var result = confirm('Are you sure want to delete lead')
  if (result) {
    $.ajax({
      url: _url,
      type: "POST",
      data: JSON.stringify({
        leads: {
          id: _id

        }
      }),
      contentType: "application/json; charset=utf-8",
      success: function (data) {
        if (data == 'failed') {
          alert('contact Admin')
        } else {
          $(location).attr('href', '/leads')
        }
      }
    });
  }
}

function deleteproducts() {

  var _id = getUrlVars()["keyid"];
  var _url = '/fbpartners/deleteproducts';
  var result = confirm('Are you sure want to delete product')
  if (result) {
    ////console.log(_id);
    $.ajax({
      url: _url,
      type: "POST",
      data: JSON.stringify({
        products: {
          id: _id

        }
      }),
      contentType: "application/json; charset=utf-8",
      success: function (data) {
        ////console.log(data)
        if (data == 'failed') {
          alert('contact Admin')
        } else {
          ////console.log("success")
          $(location).attr('href', '/products')
        }
      }
    });
  }
}

function deleteservices() {

  var _id = getUrlVars()["keyid"];
  var _url = '/fbpartners/deleteservices';
  var result = confirm('Are you sure want to delete user')
  if (result) {
    $.ajax({
      url: _url,
      type: "POST",
      data: JSON.stringify({
        services: {
          id: _id

        }
      }),
      contentType: "application/json; charset=utf-8",
      success: function (data) {
        if (data == 'failed') {
          alert('contact Admin')
        } else {
          $(location).attr('href', '/services')
        }
      }
    });
  }
}




function deletecompany() {


  var _id = getUrlVars()["keyid"];
  var _url = '/fbpartners/deletecompany';
  var result = confirm('Are you sure want to delete company')
  if (result) {
    $.ajax({
      url: _url,
      type: "POST",
      data: JSON.stringify({
        company: {
          id: _id

        }
      }),
      contentType: "application/json; charset=utf-8",
      success: function (data) {
        if (data == 'failed') {
          alert('contact Admin')
        } else {
          $(location).attr('href', '/companies')
        }
      }
    });
  }

}

function deleteleadstage() {
  // //console.log(event.target.attributes.getNamedItem('data-leadstage').value);
  var _id = event.target.attributes.getNamedItem('data-leadstage').value
  //var _id =getUrlVars()["keyid"];    
  var _url = '/fbpartners/deleteleadstage';
  var result = confirm('Are you sure want to delete leadstage')
  if (result) {
    $.ajax({
      url: _url,
      type: "POST",
      data: JSON.stringify({
        leadstage: {
          id: _id

        }
      }),
      contentType: "application/json; charset=utf-8",
      success: function (data) {
        if (data == 'failed') {
          alert('contact Admin')
        } else {
          gettenantleadstages();
          //$(location).attr('href', '/lead-stages')
        }
      }
    });
  }

}

function deleteloan() {


  var _id = getUrlVars()["keyid"];
  var _url = '/loanexecutor/deleteloan';
  var result = confirm('Are you sure want to delete loan')
  if (result) {
    $.ajax({
      url: _url,
      type: "POST",
      data: JSON.stringify({
        loan: {
          id: _id

        }
      }),
      contentType: "application/json; charset=utf-8",
      success: function (data) {
        if (data == 'failed') {
          alert('contact Admin')
        } else {
          $(location).attr('href', '/loans')
        }
      }
    });
  }

}


function logout() {
  $.ajax({
    url: '/fbpartners/logout',
    type: "POST",
    data: JSON.stringify({}),
    contentType: "application/json; charset=utf-8",
    success: function (data) {
     $(location).attr('href', '/');
    }
  });
}



function forgotpassword() {
  $.ajax({
    url: '/fbpartners/forgotpassword',
    type: "POST",
    data: JSON.stringify({
      user: {
        email: $('#email').val(),
        bankname: $('#bank').val()
      }
    }),
    contentType: "application/json; charset=utf-8",
    success: function (data) {
      if (data == 'failed') {
        $('.msg').css("display", "block");
      } else {
        $('.msg1').css("display", "block");
      }
    }
  });
}
function resetpassword() {
  if ($('#password').val() == $('#cpassword').val()) {
    $.ajax({
      url: '/fbpartners/resetpassword',
      type: "POST",
      data: JSON.stringify({
        user: {
          token: getUrlVars()['activation'],
          bankname: $('#bank').val(),
          password: $('#password').val()
        }
      }),
      contentType: "application/json; charset=utf-8",
      success: function (data) {
        if (data == 'failed') {
          $('.msg').css("display", "block");
          $('.msg').text('update failed contact support')
        } else {
          $('.msg1').css("display", "block");
        }
      }
    });
  } else {
    $('.msg').css("display", "block");
    $('.msg').text('Passwords are not matching')
  }
}


function guidGenerator() {
  var S4 = function () {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };
  return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}


function formvalidator() {

  var isvalid = true;
  $('[data-valid]:not(#qkl-myModal11 [data-valid])').each(function () {
    var vl = $(this).val();
    var cnd = $(this).attr('data-valid').split('|');
    if (/^\s/g.test(this.value)) {
      this.value = this.value.replace(/^\s+/, '');
      isvalid = false;
      $(this).addClass('required')
    }
    for (var c in cnd) {

      switch (cnd[c]) {
        case 'required':
          if (!vl) {
            isvalid = false;
            $(this).addClass('required')
          }
          break;
        case 'email':
          if (!validateEmail(vl)) {
            isvalid = false;
            $(this).addClass('required')
          }
          break;
        case 'mobile':
          if (!validatemobile(vl)) {
            isvalid = false;
            $(this).addClass('required')
          }
          break;
        case 'text':
          if (!validatetext(vl)) {
            isvalid = false;
            $(this).addClass('required')
          }
          break;
        case 'number':
          if (!validatenumber(vl)) {
            isvalid = false;
            $(this).addClass('required')
          }
          break;
          case 'floatnumber':
            if (!validatefloat(vl)) {
              isvalid = false;
              $(this).addClass('required')
            }else{
              $(this).removeClass('required')
            }
          break;
        case 'date':
          break;
        case 'min':
          break;
        case 'max':
          break;




      }
    }

  });
  return isvalid;
}
function formvalidator2(parent) {
  var isvalid = true;
  $('#'+parent+' [data-valid]').each(function () {
    var id =this
    var vl = $(this).val();
    var cnd = $(this).attr('data-valid').split('|');
    if (/^\s/g.test(this.value)) {
      this.value = this.value.replace(/^\s+/, '');
      isvalid = false;
      $(this).addClass('required')
    }
    for (var c in cnd) {

      switch (cnd[c]) {
        case 'required':
          if (!vl) {
            isvalid = false;
            $(this).addClass('required')
          }else{
            $(this).removeClass('required')
          }
          break;
        case 'email':
          if (!validateEmail(vl)) {
            isvalid = false;
            $(this).addClass('required')
          }else{
            $(this).removeClass('required')
          }
          break;
        case 'mobile':
          if (!validatemobile(vl)) {
            isvalid = false;
            $(this).addClass('required')
          }else{
            $(this).removeClass('required')
          }
          break;
        case 'text':
          if (!validatetext(vl)) {
            isvalid = false;
            $(this).addClass('required')
          }else{
            $(this).removeClass('required')
          }
          break;
        case 'number':
          if (!validatenumber(vl)) {
            isvalid = false;
            $(this).addClass('required')
          }else{
            $(this).removeClass('required')
          }
          break;
          case 'floatnumber':
            if (!validatefloat(vl)) {
              isvalid = false;
              $(this).addClass('required')
            }else{
              $(this).removeClass('required')
            }
          break;
        case 'date':
          break;
        case 'min':
          break;
        case 'max':
          break;




      }
    }

  });
  return isvalid;
}

function validateEmail(val) {
  var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

  if (reg.test(val) == false) {

    return false;
  }
  return true;
}

function validatefloat(val) {
  var reg = /^(?!0\d)\d*(\.\d+)?$/
  if (reg.test(val) == false) {
    return false;
  }
  return true;
}
function validatetext(val) {
  var reg = /^[a-zA-Z ]*$/;

  if (reg.test(val) == false) {

    return false;
  }
  return true;
}

function validatenumber(val) {
  var reg = /^[0-9]*$/;

  if (reg.test(val) == false) {

    return false;
  }
  return true;
}

function validatemobile(vl) {
  var mob = /^[1-9]{1}[0-9]{9}$/;
  if (mob.test(vl) == false) {
    return false;
  }
  return true;
}

function getUrlVars() {
  var vars = [],
    hash;
  var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
  for (var i = 0; i < hashes.length; i++) {
    hash = hashes[i].split('=');
    vars.push(hash[0]);
    vars[hash[0]] = hash[1];
  }
  return vars;
}

function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
$(function () {

  loader = '<div class="iprogress"><i class="fa fa-refresh  fa-spin fa-5x"><\/i><\/div>'
  // var loading = $("#loading");
  $(document).ajaxStart(function () {
    console.log('ajaxstart fired')

    $('body').append(loader)
  });

  $(document).ajaxStop(function () {
    console.log('ajaxstop fired')
    $(".iprogress").remove()
  });
});


// ======================================== Dicussion Start =============================================

function fuserchat() {
  var _docid = getUrlVars()['keyid'];
  if($.trim($('#inputmsg').val())!=''){
    $.ajax({
      url: '/fbpartnerlead/fbuserchat',
      type: "POST",
      data: JSON.stringify({
        userchat: {
          leadid: _docid,
          msg: $('#inputmsg').val(),
          isfinance: '0'

        }
      }),
      contentType: "application/json; charset=utf-8",
      success: function (data) {
        if (data == 'failed') {
          alert("fuserchat is Failed");
        } else {
          $('#inputmsg').val('');;
          getdealeadchat(_docid);
        }
      }
    });
  } else {
    $('#inputmsg').focus();
  }
}

function fbuserchatupload() {
  var _docid = getUrlVars()['keyid'];
  if ($('#uploadmsg').val() != '') {
    var chatupload = {
      leadid: _docid,
      msg: $('#uploadmsg').val(),
      isfinance: '0',
      files: newDiscussionFiles()
    }
    // //console.log(chatupload);
    $.ajax({
      url: '/fbpartnerlead/fbuserchatupload',
      type: "POST",
      data: JSON.stringify({
        chatupload
      }),
      contentType: "application/json; charset=utf-8",
      success: function (data) {
        if (data == 'failed') {
         // alert("fuserchat is Failed");
        } else {
          //getchat();
          getdealeadchat(_docid);
        }
      }
    });
  } else {
    $('#uploadmsg').focus();
  }
}
function dealerleadCreateActivity() {
  //if (formvalidator()) {

    var t = getUrlVars()["keyid"];
    var _id = guidGenerator();
    var _url = '/fbpartnerlead/dealerleadCreateActivity';
    // if (t) {
    //   _id = t;
    //   _url = '/fbpartners/updateActivity?keyid='+t
    // }

    $.ajax({
      url: _url,
      type: "POST",
      data: JSON.stringify({
        activities: {
          id: _id,
          name: $('#name').val(),
          description: $('#adescription').val(),
          typeId: $('#activitytype option:selected').val(),
          typename: $('#activitytype option:selected').text(),
          colorcode: $('#activitytype option:selected').data("colorcode"),
          time:$('#time').val()+":"+$("#formate option:selected").val(),
         leadid:t,
         isfinance:"0"

        }
      }),
      contentType: "application/json; charset=utf-8",
      success: function (data) {
        console.log(data)
        if (data == 'failed') {
          alert('contact Admin')
        } else {
          $('#ActivityModal'). modal('hide');
          getdealeadchat(t)
        //  $(location).attr('href', '/Activity')
        }
      }
    });
 // }
}
function fbfinchatupload() {
  var _docid = getUrlVars()['keyid'];

 // if ($('#uploadmsg').val() != '') {
    var chatupload = {
      leadid: _docid,
      msg: $('#finuploadmsg').val(),
      files: newDiscussionFiles(),
      isfinance:'1'
    }
    // //console.log(chatupload);
    $.ajax({
      url: '/fbpartners/fbfinchatupload',
      type: "POST",
      data: JSON.stringify({
        chatupload
      }),
      contentType: "application/json; charset=utf-8",
      success: function (data) {
        if (data == 'failed') {
          alert("fuserchat is Failed");
        } else {
          getfinchat();
        }
      }
    });
  //} else {
   // $('#uploadmsg').focus();
  //}
}

function fbfinchat() {
  var _docid = getUrlVars()['keyid'];
  if($.trim($('#fininputmsg').val())!=''){
  $.ajax({
    url: '/fbExternallead/fbfinchat',
  // url: '/fbpartnerlead/fbfintodealerchat',
   
    type: "POST",
    data: JSON.stringify({
      userchat: {
        id:_docid,
        leadid: $('#refid').val(),
        tenantid:$('#finid').val(),
        msg: $('#fininputmsg').val(),
        isfinance:'1'
      }
    }),
    contentType: "application/json; charset=utf-8",
    success: function (data) {
      if (data == 'failed') {
       // alert("fbfinchat is Failed");
      } else {
        getfinchat(_docid);
      }
    }
  })
}else{
  $('#fininputmsg').focus()
}
}
function fbmanfchat() {
  var _docid = getUrlVars()['keyid'];
  if($.trim($('#mfinputmsg').val())!=''){
  $.ajax({
    url: '/fbExternallead/fbmanfchat',
  // url: '/fbpartnerlead/fbfintodealerchat',
   
    type: "POST",
    data: JSON.stringify({
      userchat: {
        id:_docid,
        leadid: $('#manfrefid').val(),
        tenantid:$('#manfid').val(),
        msg: $('#mfinputmsg').val(),
        ismanufacture:'1'
      }
    }),
    contentType: "application/json; charset=utf-8",
    success: function (data) {
      if (data == 'failed') {
       // alert("fbfinchat is Failed");
      } else {
        $('#mfinputmsg').val('');
        getmanfchat(_docid);
      }
    }
  })
}else{
  $('#mfinputmsg').focus()
}
}
function fbdlmanfchat() {
  var _docid = getUrlVars()['keyid'];
  if($.trim($('#dmfinputmsg').val())!=''){
  $.ajax({
    url: '/fbExternallead/fbdlmanfchat',
  // url: '/fbpartnerlead/fbfintodealerchat',
   
    type: "POST",
    data: JSON.stringify({
      userchat: {
        id:_docid,
        leadid: $('#sourceid').val(),
        tenantid:$('#dlrid').val(),
        msg: $('#dmfinputmsg').val(),
        ismanufacture:'1'
      }
    }),
    contentType: "application/json; charset=utf-8",
    success: function (data) {
      if (data == 'failed') {
       // alert("fbfinchat is Failed");
      } else {
        $('#dmfinputmsg').val('')
        getdlmanfchat(_docid);
      }
    }
  })
}else{
  $('#dmfinputmsg').focus()
}
}
function fballpartychat() {
 
 
  if(getCookie('tenet') === '2'){
    var _docid = $('#sourceid').val();
    var _url = 'fbExternallead/fbmanfallpartychat';
    
  }else{
    var _docid = getUrlVars()['keyid'];
    var _url = 'fbExternallead/fballpartychat';
  }
  $.ajax({
    url: _url,
  // url: '/fbpartnerlead/fbfintodealerchat',
   
    type: "POST",
    data: JSON.stringify({
      userchat: {
        id:_docid,
        leadid: $('#sourceid').val(),
        //tenantid:$('#dlrid').val(),
        msg: $('#dalpinputmsg').val(),
        isallparty:'1'
      }
    }),
    contentType: "application/json; charset=utf-8",
    success: function (data) {
      if (data == 'failed') {
       // alert("fbfinchat is Failed");
      } else {
        $('#dalpinputmsg').val(''),
        getallpartychat(_docid);
      }
    }
  })
}
// ======================================== Dicussion End ==============================================


// ======================================== Account Start =============================================
function myaccupdate(id) {
  if (formvalidator()) {
    var _url = '/fbpartners/myaccupdate?keyid=' + id;
    $.ajax({
      url: _url,
      type: "POST",
      data: JSON.stringify({
        user: {
          uname: $('#firstname').val(),
          city: $('#city').val(),
          email: $('#email').val(),
          phone: $('#phone').val(),
          image: $('#newimg').text()
        }
      }),
      contentType: "application/json; charset=utf-8",
      success: function (data) {
        //console.log(data);
        if (data == 'failed') {
          alert('contact Admin');
        } else if (data.Result == "OK") {
          $('.editcog1').removeClass('fa fa-check editcog1').addClass('fa fa-pen editcog1');
          $('.md-grp1 input').css({
            display: 'none'
          });
          $('.editcog1').removeAttr('onclick');
          $('.md-grp1 p').css({
            display: 'block'
          });
          getmyaccount();
          alert('Details UPDATED Successfully ', 'Success Message');
        } else {
          alert(data, 'Error Message');
        }
      }
    });
  }
}

function updatepswd(id) {
  var user = {
    pswd: $('#password').val()
  }
  if (validatepwd(user.pswd)) {
    var _url = '/fbpartners/updatemypswd?keyid=' + id;
    $.ajax({
      url: _url,
      type: "POST",
      data: JSON.stringify({
        user
      }),
      contentType: "application/json; charset=utf-8",
      success: function (data) {
        if (data == 'failed') {
          alert('contact Admin');
        } else {
          cancelpswd();
          alert('PASSWORD UPDATED Successfully ');
        }
      }
    });
  } else {
    alert('Please Fill Password');
  }
}
function validatepwd(val){//30csateesh
  var reg=/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/
  if (reg.test(val) == false) {
    return false;
  }
  return true;
}
function mypartneraccupdate() {
  //alert('mypartneraccupdate');
  if (formvalidator()) {
    var _url = '/fbpartners/mypartneraccupdate';
    //console.log(_url);
    $.ajax({
      url: _url,
      type: "POST",
      data: JSON.stringify({
        partner: {
          image: $('#newimg').text(),
          bname: $('#bankname').val(),
          emailid: $('#email').val(),
          website: $("#website").val(),
          phone: $('#phone').val(),
          mailerto:$("#eMailer").val(),
          mailerpwd:$("#emailpwd").val(),
          port:$("#portnum").val(),
          url:$("#host_name").val(),
          desc: $('input#desc').val()
        }
      }),
      contentType: "application/json; charset=utf-8",
      success: function (data) {
        //console.log(data);
        if (data == 'failed') {
          alert('contact Admin');
        } else if (data.Result == "OK") {
          $('.editcog1').removeClass('fa fa-check editcog1').addClass('fa fa-pen editcog1');
          $('.md-grp1 input').css({
            display: 'none'
          });
          $('.editcog1').removeAttr('onclick');
          $('.md-grp1 p').css({
            display: 'block'
          });
          getmypartneracc();
          alert('Details UPDATED Successfully ', 'Success Message');
        } else {
          alert(data, 'Error Message');
        }
      }
    });
  }
}
// ======================================== Account End =============================================

// ==========================Lead Product Invoice Start====================

function saveproductinvoice() {
  var id = getUrlVars()["keyid"];
  var arr = [];
  $('#invoiceproducts tbody tr.p').each(function () {
    var obj = {};
    obj.pname = $(this).find('td.productname:first-child p').text();
    obj.qty = $(this).find('td.qty p').text();
    obj.tax = $(this).find('td.tax p').text();
    obj.pamount = $(this).find('td.pamount p').text();
    obj.discount = $(this).find('td.discount_amount p').text();
    obj.PTamount = $(this).find('td.PTamount p').text();
    arr.push(obj);
  });
  if (id) {
    var _url = "/fbpartners/saveproductinvoice?keyid=" + id
    $.ajax({
      type: "POST",
      contentType: "application/json; charset=utf-8",
      url: _url,
      data: JSON.stringify({
        arr,
        amount: $('#invoiceproducts tbody tr td p.famount').text(),
        imp_info: $('#imp_info').text(),
        isvisible: $('#isfinanceinvoice').is(":checked") ? 1 : 0
      }),
      success: function (data) {
        bindproduct_invoice()
      }
    });
  }
}

function saveproceedproductinvoice() {
  var id = getUrlVars()["keyid"];
  if (id) {
    var arr = [];
    $('#invoiceproducts tbody tr.p').each(function () {
      var obj = {};
      obj.pname = $(this).find('td.productname:first-child p').text();
      obj.qty = $(this).find('td.qty p').text();
      obj.tax = $(this).find('td.tax p').text();
      obj.pamount = $(this).find('td.pamount p').text();
      obj.discount = $(this).find('td.discount_amount p').text();
      obj.PTamount = $(this).find('td.PTamount p').text();
      arr.push(obj);
    });
    var _url = "/fbpartners/saveproceedproductinvoice?keyid=" + id
    $.ajax({
      type: "POST",
      contentType: "application/json; charset=utf-8",
      url: _url,
      data: JSON.stringify({
        arr,
        amount: $('#invoiceproducts tbody tr td p.famount').text(),
        imp_info: $('#imp_info').text(),
        isvisible: $('#isfinanceinvoice').is(":checked") ? 1 : 0
      }),
      success: function (data) {
        bindproduct_invoice()
      }
    });
  }
}

// ==========================Lead Product Invoice End====================