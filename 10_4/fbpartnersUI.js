function getusers() {
    $('.allmanpads').empty();
    var _url = '/fbpartners/getusers';


    $.ajax({
        url: _url,
        type: "get",
        success: function (data) {


            if (!$.trim(data)) {
                var tileempty = `<div class="empytre">
                <div class="oneemptys">
                <div class="col-md-12 listcontras">
                <div class="recordnew hgreen contact-panel">
                <a href="">
                <div class="panel-body">
                <h3> Let's add new user </h3>
                <img alt="logo" src="static/images/fbpartners/emptydealers.svg" style="width: 250px !important; height:100% !important;">
                </div>`
                $('.allmanpads').prepend(tileempty);
            } else {
                for (var d in data) {

                    var tile = '<div class="col-md-4 col-xs-12 ctile ourservices"><div class="temboxeson"><a href="/add-user?keyid=' + data[d].id + '"><div class="onebormstem"><div class="col-md-12 padsmars"><div class="col-md-3 col-xs-3 padsmars mytemsd"><div class="usernamett">' + data[d].name.charAt(0) + '</div><div class="usrprofilepic"><img src="static/images/fbpartners/users/' + data[d].logopath + '"></div></div>' +
                        '<div class="col-md-9 col-xs-9 padsmars temsname"><h2>' + data[d].name + '</h2><h3>' + data[d].role + '</h3><h3 class="datpikcd">' + data[d].createddate + '</h3></div></div>' +
                        '<div class="col-md-12 col-xs-12 padsmars temtneij"><div class="col-md-12 col-xs-12 padsmars newteamsn"><div class="col-md-7 col-xs-12 padsmars"><div class="tmnewsdje"><h3>City</h3><h2>' + data[d].city + '</h2></div></div>' +
                        '<div class="col-md-5 col-xs-12 padsmars"><div class="bhreamnr"><h3>Phone</h3><h2>' + data[d].phone + '</h2></div></div></div>' +
                        '<div class="col-md-12 col-xs-12 activityu"><h3><img src="static/images/fbpartners/mail.svg" alt="" class="mailicond"/>' + data[d].email + '</h3></div></div></div></a></div></div>'

                    $('.allmanpads').prepend(tile);
                    //if (data[d].logopath != null) {
                        if (data[d].logopath && data[d].logopath !="undefined") {
                        

                        $(".ctile  .usernamett").css("display", "none");
                        $(".ctile .usrprofilepic").css("display", "block");

                    } else {

                        $(".ctile  .usrprofilepic").css("display", "none");
                        $(".ctile  .usrnamesltrs").css("display", "block");

                    }
                    $('.ctile').removeClass('ctile')

                }
            }
        },
        error: function () {
            $(location).attr('href', '/')
        }
    });
}

function getmanagerusers() {
    $('.allmanpads').empty();
    var _url = '/fbpartners/getmanagerusers';


    $.ajax({
        url: _url,
        type: "get",
        success: function (data) {


            if (!$.trim(data)) {
                newtile();
            } else {
                for (var d in data) {


                    var tile = '<div class="col-md-4 col-xs-12 ctile ourservices"><div class="temboxeson"><a href="/add-user?keyid=' + data[d].id + '"><div class="onebormstem"><div class="col-md-12 padsmars"><div class="col-md-3 col-xs-3 padsmars mytemsd"><div class="usernamett">' + data[d].name.charAt(0) + '</div><div class="usrprofilepic"><img src="static/' + data[d].logopath + '"></div></div>' +
                        '<div class="col-md-9 col-xs-9 padsmars temsname"><h2>' + data[d].name + '</h2><h3>' + data[d].role + '</h3><h3 class="datpikcd">' + data[d].date + '</h3></div></div>' +
                        '<div class="col-md-12 col-xs-12 padsmars temtneij"><div class="col-md-12 col-xs-12 padsmars newteamsn"><div class="col-md-6 col-xs-6 padsmars"><div class="tmnewsdje"><h3>' + data[d].city + '</h3><h2>City</h2></div></div>' +
                        '<div class="col-md-6 col-xs-6 padsmars"><div class="bhreamnr"><h3>' + data[d].phone + '</h3><h2>Phone</h2></div></div></div>' +
                        '<div class="col-md-12 col-xs-12 activityu"><h3>' + data[d].email + '</h3></div></div></div></a></div></div>'






                    $('.allmanpads').prepend(tile);
                    if (data[d].logopath != null) {

                        $(".ctile  .usernamett").css("display", "none");
                        $(".ctile .usrprofilepic").css("display", "block");

                    } else {

                        $(".ctile  .usrprofilepic").css("display", "none");
                        $(".ctile  .usrnamesltrs").css("display", "block");

                    }
                    $('.ctile').removeClass('ctile')

                }
            }
        },
        error: function () {
            $(location).attr('href', '/')
        }
    });
}

function gettenantleadstages() {
    $('.checking,.leadstages').empty();
    var _url = 'fbpartners/gettenantleadstages';
    $.ajax({
        url: _url,
        type: "get",
        success: function (data) {

            if (!$.trim(data)) {
                newtile();
            }
            else {
                var dat = data.reverse();
                for (var d in data) {
                    if (data[d].stagename === 'Lead sourced' || data[d].stagename === 'order lost' || data[d].stagename === 'order Won') {
                        var tile = `<div class="row allmanpads ${data[d].stagename.replace(/\s+/g, "_")}" data-id="${data[d].id}">`
                    } else {
                        var tile = `<div class="row allmanpads ls_manage" data-id="${data[d].id}">`
                    }
                    tile=tile + `<div class="col-lg-12 col-md-12 col-xs-12 padmarse ">
                    <div class="ledmnajes">
                        <div class="maintickets">
                            <div class="col-lg-4 col-md-4 col-xs-12 padsmars imagticks">
                                <h3>${data[d].stagename}</h3>
                            </div> 
                            <div class="col-lg-8 col-md-8 col-xs-12 padsmars ticjmekss">
                                <div class="col-lg-8 col-md-8 col-xs-12 leadstage_text">
                                    <p>${add3Dots(data[d].description, '40')}</p>
                                </div>	
                                <div class="col-lg-4 col-md-4 col-xs-12 leadstage_icons">
                                    <ul>`
                                    if(data[d].time){
                                      tile=tile+ `<li>
                                            <div class="popover add_follwer">
                                                <button class="popover__trigger lead_stagebtns" aria-hidden="true" onclick="editlead(\'`+ data[d].id + `\',\'` + data[d].time + `\')" data-toggle="modal" data-target="#leadstagemaxtime" data-time="${data[d].time}"> <img src="/static/images/fbpartners/stage-form0.svg" style="width: 16px;"></button>
                                            </div>
                                        </li>`}else{
                                             tile=tile+ `<li>
                                            <div class="popover add_follwer">
                                                <button class="popover__trigger" aria-hidden="true" onclick="editlead(\'`+ data[d].id + `\',\'` + data[d].time + `\')" data-toggle="modal" data-target="#leadstagemaxtime" data-time="${data[d].time}"><img src="/static/images/fbpartners/stage-form0.svg" style="width: 16px;"></button>
                                            </div>
                                        </li>`    
                                        }
                                 if(data[d].loanformid){
                                       tile= tile+` <li> <div class="popover add_follwer">
                                  <button class="popover__trigger lead_stagebtns" onclick="editlead(\'`+ data[d].id + `\',\'` + data[d].loanformid + `\')" data-toggle="modal" data-target="#exampleModalCenter"><img src="/static/images/fbpartners/stage-form.svg" style="width: 16px;"></button>
                              </div>
                          </li>`
                                 }else{
                             tile=tile+`<li><div class="popover add_follwer">
                        <button class="popover__trigger" onclick="editlead(\'`+ data[d].id + `\',\'` + data[d].loanformid + `\')" data-toggle="modal" data-target="#exampleModalCenter"><img src="/static/images/fbpartners/stage-form.svg" style="width: 16px;"></button>
                    </div>
                   </li>`
                 }
                   if(data[d].nextleadstagesid) {  
                     tile= tile+ `<li> 
                                   <div class="popover add_follwer">
                                       <button class="popover__trigger lead_stagebtns" onclick="editlead(\'`+ data[d].id + `\',\'` + data[d].nextleadstagesid + `\')" data-toggle="modal" data-target="#exampleModal2"><img src="/static/images/fbpartners/stage-form1.svg" style="width: 16px;"></button>
                                   </div>
                               </li>`
                }else{
                         tile= tile+` <li>
                                    <div class="popover add_follwer">
                                        <button class="popover__trigger" onclick="editlead(\'`+ data[d].id + `\',\'` + data[d].nextleadstagesid + `\')" data-toggle="modal" data-target="#exampleModal2"><img src="/static/images/fbpartners/stage-form1.svg" style="width: 16px;"></button>
                                    </div>
                                </li>`
                         }

                    if (data[d].stagename === 'Lead sourced' || data[d].stagename === 'order lost' || data[d].stagename === 'order Won') {
                      
                         tile = tile + `<li class="action">
                                            <div class="popover add_follwer">
                                                <button class="popover__trigger"><img src="/static/images/fbpartners/stage-form2.svg" style="width: 16px;cursor: pointer;"></button></button>
                                            </div>
                                        </li>`
                    } else {
                         tile = tile + `<li class="action">
                            <div class="popover add_follwer">
                                <button class="popover__trigger"><img src="/static/images/fbpartners/stage-form2.svg" style="width: 16px;cursor: pointer;"></button>
                            </div>
                            <ul class="list-group">
                                <li class="list-group-item move_up" title="Move Up"><i class="fa fa-arrow-up stageremove"></i>Move Up</li>
                                <li class="list-group-item move_down" title="Move Down"><i class="fa fa-arrow-down stageremove"></i>Move Down</li>
                                <li class="list-group-item delete" data-leadstage="${data[d].id}" onclick="deleteleadstage();" title="Delete"><i class="fa fa-trash stageremove" data-leadstage="${data[d].id}" title="Delete"></i>Delete</a></li>
                            </ul>
                    </li>`
                    }

                    var tile = tile + `</ul></div></div></div></div></div></div>`
                    var option = `<option value="${data[d].id}">${data[d].stagename}</option>`
                    $('.checking').prepend(tile);
                    $(".leadstages").append(option)


                }
            }
        },
        error: function () {
            $(location).attr('href', '/')
        }
    });
}
function editlead(id,formstageid){
    $("#leadid").val(id)

    if(formstageid){
        $('#formname,#leadstages').val((formstageid).split(",")).trigger('change')
        }
}
function bindfbformnames(s){
    $('#formname').empty().append('<option value="">Please Select Form</option>');
    $.ajax({
      url: '/fbloanconfig/fbformnames?keyid='+s,
      type: "get",
      success: function (data) {
        data.forEach(function (ele) {
          $('#formname').append('<option value="' + ele._id + '">' + ele.name + '</option>');
        })
      },
      error: function () {
        //console.log('error');
      }
    });
}
function getadditionalform() {
    $.ajax({
        url: '/fbloanconfig/formadditional',
        type: "get",
        success: function (data) {
       
            $('#additionalhtml').append(data.html);
            $('.icon-div,.helptooltip').remove();
        },
        error: function () {
            console.log('error');
        }
    });
}
function gettenantleadscore() {
    //alert(leadscoreforderpation)
       $('.checking').empty();
      
       var _url = 'fbpartners/getleadscore';
    
       $.ajax({
           url: _url,
           type: "get",
           success: function (data) {
              // console.log(data)
               data.leadscore.forEach(function(responce,i){
                   $("#colocode_"+responce.leadscore).val(responce.colorcode);
   
   $("#leadscore option:last").after($('<option value="'+responce.leadscore+'">'+responce.leadscore+'('+responce.description+')</option>'));
   
                  $("#depration_"+responce.leadscore).val(responce.description);
   
                  $("#id_"+responce.leadscore).val(responce.id)
                 $("#colocode_"+responce.leadscore).css({"background-color": "#"+responce.colorcode})
               //   $("#colocode_"+responce.leadscore).html(style='background-color:#'+responce.colorcode)
    
               })
    
           },
           error: function () {
               $(location).attr('href', '/')
           }
       });
   }

   function gettenantleadscore1() {
    //alert(leadscoreforderpation)
       $('.checking').empty();
      
       var _url = 'fbpartners/getleadscore';
    
       $.ajax({
           url: _url,
           type: "get",
           success: function (data) {
              // console.log(data)
               data.leadscore.forEach(function(responce,i){
                //    $("#colocode_"+responce.leadscore).val(responce.colorcode);
   
                $("#leadscore option:last").after($('<option value="'+responce.leadscore+'">'+responce.leadscore+'('+responce.description+')</option>'));
   
                  $("#depration_"+responce.leadscore).val(responce.description);
   
                  $("#id_"+responce.leadscore).val(responce.id)
                  $("#valcode_"+responce.leadscore).val(responce.colorcode)
                 $("#colocode_"+responce.leadscore).css({"background-color": "#"+responce.colorcode , "border-radius":"50%", "width":"40px" })
               //   $("#colocode_"+responce.leadscore).html(style='background-color:#'+responce.colorcode)
               $("#colocode_"+responce.leadscore).attr("data-color", "#"+responce.colorcode);
                // $("#colocode_"+responce.leadscore).addClass('active');
              
               })
    
           },
           error: function () {
               $(location).attr('href', '/')
           }
       });
   }

function getdatabyidleadscore(){
    
    var id=getUrlVars()["keyid"]
   
    if(id){
        $(".updateform").hide()
    }
    var _url = 'fbpartners/getleadscorebyid/'+id;
    $.ajax({
        url:_url,
        type:"get",
        success:function(data){
          data[0].leadscore.forEach(function(res,i){
             
        
            $("#scorevalue_10").text(res.leadscore)
            $(".jscolor").val(res.colorcode)
          })
         
        }
    })
}

function newtile() {

    var tile = '<div class="empytre">' +
        '<div class="oneemptys">' +
        '<div class="col-md-12 listcontras">' +
        '<div class="recordnew hgreen contact-panel">' +
        '<a href="">' +
        '<div class="panel-body">' +
        '<h3>' + 'Let' + 's' + 'start as of now' + '</h3>' +
        '<img alt="logo" src="http://webamoeba.com/static/5b04c25dd37a228c096f120c_3ee5c5d0-8968-11e8-af7f-9dbdd6c26e9dempty.png" style="width: 190px !important; height:100% !important;">'

        +
        '</div>' +
        '<div class="panel-footer contact-footer">' +
        '<div class="row">' +
        '<div class="col-md-12 bdrrht"> ' +
        '<div class="starrattings"> ' +
        '<span class="fa fa-star checked"></span>' +
        '<span class="fa fa-star checked"></span>' +
        '<span class="fa fa-star checked"></span>' +
        '<span class="fa fa-star checked"></span>' +
        '<span class="fa fa-star checked"></span> ' +
        '</div>' +
        '</div> </div>'

        +
        '</div>' +
        '</div>' +
        '</a>' +
        '</div>' +
        '</div>' +
        '</div>'
    $('.allmanpads').prepend(tile);
}
//var dapa;
function getcontacts() {
    $('.contactslist').empty();
    
     var _url = '/fbpartners/getcontacts';
  
     $.ajax({
         url: _url,
         type: "get",
         success: function (data) {
  
             if (!$.trim(data)) {
                 var tileempty = '<div class="empytre">' +
                 '<div class="oneemptys">' +
                 '<div class="col-md-12 listcontras">' +
                 '<div class="recordnew hgreen contact-panel">' +
                 '<a href="">' +
                 '<div class="panel-body">' +
                 '<h3>' + 'Let' + 's' + ' add new contacts' + '</h3>' +
                 '<img alt="logo"  src="static/images/fbpartners/contacts.svg" style="width: 250px !important; height:100% !important;">'
         
                 + '</div>'
                 $('.contactslist').append(tileempty);
                 //$('.row.copnyboxb').append(tileempty);
             } else {
  
                 for (var d in data) {
                     if (data[d].logopath) {
                         var imgorname = `<img class="compnyoprofil${d}" src="static/`+data[d].logopath+`"width="100%"/>`
                     } else {
                         var imgorname=`<div class="prfle_ltr prfle_ltr${d}" >${data[d].name?data[d].name.charAt(0) + '' + data[d].name.charAt(1):'N/A'}</div>`
                     }
                     
                     var tile =`<div class="list_item"><a href="add-contact?keyid=${data[d].id}">
                                             <div class="listitem_view">	
                                                 <div class="listitem_profile">
                                                     ${imgorname}
                                                     <figcaption class="listitem_details">
                                                         <h4>${data[d].name?add3Dots(data[d].name, '40'):"N/A"}</h4>
                                                         <span>${data[d].company?add3Dots(data[d].company, '40'):"N/A"}</span>
                                                     </figcaption>
                                                 </div>
                                                 <p class="list_city">${(data[d].city?data[d].city:'N/A')} </p>
                                                 <div class="list_contact">
                                                     <div data-toggle="tooltip" data-placement="top" title="${ data[d].email ? data[d].email:'N/A'}" class="list_email" data-original-title="${data[d].email ? data[d].email:'N/A'}">${data[d].email ? add3Dots(data[d].email,"25"):'N/A'}</div>
                                                     <div class="list_phone">${data[d].phone}</div></div>
                                                 </div>
                                         </div>`
                 $('.contactslist').prepend(tile);
  
 
                 }
  
             }
         },
         error: function () {
             $(location).attr('href', '/')
         }
     });
 }

function getcontactsimages() {

    var _url = '/fbpartners/getcontactsimages';

    $.ajax({
        url: _url,
        type: "get",
        success: function (data) {

            if ($.trim(data)) {

                $('.compproflemp').empty();


                for (var d in data) {


                    var tile =
                        '<div class="compyfroj">' + data[d].name.charAt(0) + ' </div>' +
                        '<img src="static/' + data[d].logopath + '">'
                    $('.compproflemp').prepend(tile);

                }

            }
        },
        error: function () {
            $(location).attr('href', '/')
        }
    });
}
function getformdeatilesforleads(id) {
    var _docid = $("#leadstage").find(':selected').data('formid');
    var id =  getUrlVars()["keyid"];
    $('#exampleModal .screebmains').empty();
    
    if (_docid && _docid != 'undefined') {
        $.ajax({
            url: '/fbloanconfig/formdetails?keyid=' + _docid,
            type: "get",
            success: function (data) {
                $("#exampleModal").modal('show')
                $("#exampleModal .btn-secondary").show()
                $('#exampleModal #formname').text(data.name);
                $('#exampleModal #description').text(data.description);
                // $('#type option[value="' + data.type + '"').prop('selected', 'selected').trigger('change');
                $('#exampleModal .screebmains').html(data.html);
                $('#exampleModal .icon-div,.helptooltip').remove();
                if (data.name) {
                    getformdeatiles(data.name + '-' + _docid,id)
                }
            }, error: function (err) {
                console.log(err)
            }
        });
    }
}
function getleads() {
    $('.allmanpads').empty();
    $('.pipelinemains').hide();

    var _url = '/fbpartnerlead/getdealerleads';
    $('#mstate,#mzone,#mdealer,#mteam,#musers').empty();
    $.ajax({
        url: _url,
        type: "get",
        success: function (data) {
            if (!$.trim(data)) {
                $('.pipelinemains').hide();
                var tileempty = '<div class="empytre">' +
                    '<div class="oneemptys">' +
                    '<div class="col-md-12 listcontras">' +
                    '<div class="recordnew hgreen contact-panel">' +
                    '<a href="">' +
                    '<div class="panel-body">' +
                    '<h3>' + 'Let' + 's' + ' Add New Lead' + '</h3>' +
                    '<img alt="logo" src="static/images/fbpartners/emptyleads.svg" style="width: 250px !important; height:100% !important;">'

                    + '</div>'
                $('.allmanpads').prepend(tileempty);
            } else {

                var mteam = [], mdealer = [], musers = [], mzone = [], mstate = [];

                $('.allmanpads').empty();
                $('.pipelinemains').hide();

                for (var d in data) {

                    if (getCookie('tenet') == 2) {
                        if (data[d].sourcecode) {
                            mdealer.push({
                                sourcecode: data[d].sourcecode
                            })
                        }
                        var tile = '<div class="col-md-4 col-xs-12 ourservices" data-zone="' + data[d].zone + '" data-state="' + data[d].state + '" data-team="' + data[d].team + '" data-AssignedEmail="' + data[d].AssignedEmail + '" data-dealer="' + data[d].sourcecode + '">'
                    } else {
                        $('#source,#allsource').remove();
                        var tile = '<div class="col-md-4 col-xs-12 ourservices" data-zone="' + data[d].zone + '" data-state="' + data[d].state + '" data-team="' + data[d].team + '" data-AssignedEmail="' + data[d].AssignedEmail + '">'
                    }
                    var tile = tile + '<div class="newleadsd"><a href="/dealerleads?keyid=' + data[d]._id + '"><div class="ledsnedone"><div class="col-md-12 col-xs-12 padsmars">' +
                        '<div class="col-md-12 col-xs-12 padsmars"><div class="col-md-8 col-xs-8 padsmars"><h2>' + data[d].company + '</h2></div></div>' +
                        '<div class="col-md-12 col-xs-12 padsmars albgclors"><div class="col-md-12 col-xs-12 padsmars newcontur"></div>      </div></div>' +
                        '<div class="col-md-12 col-xs-12 padsmars"><div class="inerleadsse"><h3>' + data[d].contact + '</h3><div class="col-md-12 col-xs-12 padsmars lonamounts"><div class="col-md-7 col-xs-7 padsmars"><h6>Lead Amount</h6><h1>Rs. ' + Number(data[d].leadamount).toLocaleString('en-IN') + '</h1></div>' +
                        '<div class="col-md-5 col-xs-5 padsmars"><h6>Lead Assigned </h6><h1>' + data[d].Assigned + '</h1></div></div>' +
                        '<div class="col-md-12 col-xs-12 padsmars lonamounts"><div class="col-md-7 col-xs-7 padsmars"><h6>Lead Stage</h6><h1>' + data[d].leadstage + '</h1></div>' +
                        '<div class="col-md-5 col-xs-5 padsmars"><h6>Contact No</h6><h1>' + data[d].contactnumber + '</h1></div>' +
                        '</div></div></div></div></a></div></div>'
                    if (data[d].zone) {
                        mzone.push({
                            zone: data[d].zone
                        })
                    } if (data[d].state) {
                        mstate.push({
                            state: data[d].state
                        })
                    }
                    if (data[d].teamId) {
                        mteam.push({
                            team: data[d].team,
                            teamId: data[d].teamId
                        })
                    }
                    if (data[d].AssignedEmail) {
                        musers.push({
                            Assigned: data[d].Assigned,
                            AssignedEmail: data[d].AssignedEmail
                        })
                    }
                    $('.allmanpads').prepend(tile);

                }
                if ($.trim(mzone)) {
                    var uniq_mzone = [...new Map(mzone.map(item => {
                        return [item.zone, item]
                    })).values()];
                    
                    for (t in uniq_mzone) {
                        $('#mzone').append(`<option value="${uniq_mzone[t].zone}">${uniq_mzone[t].zone}</option>`)
                    }
                }

                if ($.trim(mstate)) {
                    var uniq_mstate = [...new Map(mstate.map(item => {
                        return [item.state, item]
                    })).values()];

                    for (t in uniq_mstate) {
                        $('#mstate').append(`<option value="${uniq_mstate[t].state}">${uniq_mstate[t].state}</option>`)
                    }
                }

                if ($.trim(mteam)) {
                    var uniq_mteam = [...new Map(mteam.map(item => {
                        return [item.teamId, item]
                    })).values()];

                    for (t in uniq_mteam) {
                        $('#mteam').append(`<option value="${uniq_mteam[t].team}">${uniq_mteam[t].team}</option>`)
                    }
                }

                if ($.trim(mdealer)) {
                    var uniq_mdealer = [...new Map(mdealer.map(item => {
                        return [item.sourcecode, item]
                    })).values()];

                    for (s in uniq_mdealer) {
                        $('#mdealer').append(`<option value="${uniq_mdealer[s].sourcecode}">${uniq_mdealer[s].sourcecode}</option>`)
                    }
                }

                if ($.trim(musers)) {
                    var uniq_musers = [...new Map(musers.map(item => {
                        return [item.AssignedEmail, item]
                    })).values()];

                    for (u in uniq_musers) {
                        $('#musers').append(`<option value="${uniq_musers[u].AssignedEmail}">${uniq_musers[u].Assigned}</option>`)
                    }
                }
            }
        },
        error: function () {
            $(location).attr('href', '/')
        }
    });
};
function leadsbyfilter(filter) {
    $('.allmanpads').empty();
    $('.pipelinemains').hide();
    $('#mstate,#mzone,#mdealer,#mteam,#musers').empty();
    var _url = '/fbpartnerlead/getdealerleadsbyfilter?filter=' + filter;
    $.ajax({
        url: _url,
        type: "get",
        success: function (data) {
            if (!$.trim(data)) {
                $('.pipelinemains').hide();
                var tileempty = '<div class="empytre">' +
                    '<div class="oneemptys">' +
                    '<div class="col-md-12 listcontras">' +
                    '<div class="recordnew hgreen contact-panel">' +
                    '<a href="">' +
                    '<div class="panel-body">' +
                    '<h3>' + 'Let' + 's' + ' add new lead' + '</h3>' +
                    '<img alt="logo" src="static/images/fbpartners/emptyleads.svg" style="width: 250px !important; height:100% !important;">'

                    +
                    '</div>'
                $('.allmanpads').prepend(tileempty);
            } else {

                var mteam = [], mdealer = [], musers = [], mzone = [], mstate = [];

                $('.allmanpads').empty();
                $('.pipelinemains').hide();

                for (var d in data) {

                    if (getCookie('tenet') == 2) {
                        if (data[d].sourcecode) {
                            mdealer.push({
                                sourcecode: data[d].sourcecode
                            })
                        }
                        var tile = '<div class="col-md-4 col-xs-12 ourservices" data-zone="' + data[d].zone + '" data-state="' + data[d].state + '" data-team="' + data[d].team + '" data-AssignedEmail="' + data[d].AssignedEmail + '" data-dealer="' + data[d].sourcecode + '">'
                    } else {
                        $('#source').remove();
                        var tile = '<div class="col-md-4 col-xs-12 ourservices" data-zone="' + data[d].zone + '" data-state="' + data[d].state + '" data-team="' + data[d].team + '" data-AssignedEmail="' + data[d].AssignedEmail + '">'
                    }
                    var tile = tile + '<div class="newleadsd"><a href="/dealerleads?keyid=' + data[d]._id + '"><div class="ledsnedone"><div class="col-md-12 col-xs-12 padsmars">' +
                        '<div class="col-md-12 col-xs-12 padsmars"><div class="col-md-8 col-xs-8 padsmars"><h2>' + data[d].company + '</h2></div></div>' +
                        '<div class="col-md-12 col-xs-12 padsmars albgclors"><div class="col-md-12 col-xs-12 padsmars newcontur"></div>      </div></div>' +
                        '<div class="col-md-12 col-xs-12 padsmars"><div class="inerleadsse"><h3>' + data[d].contact + '</h3><div class="col-md-12 col-xs-12 padsmars lonamounts"><div class="col-md-7 col-xs-7 padsmars"><h6>Lead Amount</h6><h1>Rs. ' + Number(data[d].leadamount).toLocaleString('en-IN') + '</h1></div>' +
                        '<div class="col-md-5 col-xs-5 padsmars"><h6>Lead Assigned </h6><h1>' + data[d].Assigned + '</h1></div></div>' +
                        '<div class="col-md-12 col-xs-12 padsmars lonamounts"><div class="col-md-7 col-xs-7 padsmars"><h6>Lead Stage</h6><h1>' + data[d].leadstage + '</h1></div>' +
                        '<div class="col-md-5 col-xs-5 padsmars"><h6>Contact No</h6><h1>' + data[d].contactnumber + '</h1></div>' +
                        '</div></div></div></div></a></div></div>'
                    if (data[d].zone) {
                        mzone.push({
                            zone: data[d].zone
                        })
                    } if (data[d].state) {
                        mstate.push({
                            state: data[d].state
                        })
                    }
                    if (data[d].teamId) {
                        mteam.push({
                            team: data[d].team,
                            teamId: data[d].teamId
                        })
                    }
                    if (data[d].AssignedEmail) {
                        musers.push({
                            Assigned: data[d].Assigned,
                            AssignedEmail: data[d].AssignedEmail
                        })
                    }
                    $('.allmanpads').prepend(tile);

                }
                if ($.trim(mzone)) {
                    var uniq_mzone = [...new Map(mzone.map(item => {
                        return [item.zone, item]
                    })).values()];

                    for (t in uniq_mzone) {
                        $('#mzone').append(`<option value="${uniq_mzone[t].zone}">${uniq_mzone[t].zone}</option>`)
                    }
                }

                if ($.trim(mstate)) {
                    var uniq_mstate = [...new Map(mstate.map(item => {
                        return [item.state, item]
                    })).values()];

                    for (t in uniq_mstate) {
                        $('#mstate').append(`<option value="${uniq_mstate[t].state}">${uniq_mstate[t].state}</option>`)
                    }
                }

                if ($.trim(mteam)) {
                    var uniq_mteam = [...new Map(mteam.map(item => {
                        return [item.teamId, item]
                    })).values()];

                    for (t in uniq_mteam) {
                        $('#mteam').append(`<option value="${uniq_mteam[t].team}">${uniq_mteam[t].team}</option>`)
                    }
                }

                if ($.trim(mdealer)) {
                    var uniq_mdealer = [...new Map(mdealer.map(item => {
                        return [item.sourcecode, item]
                    })).values()];

                    for (s in uniq_mdealer) {
                        $('#mdealer').append(`<option value="${uniq_mdealer[s].sourcecode}">${uniq_mdealer[s].sourcecode}</option>`)
                    }
                }

                if ($.trim(musers)) {
                    var uniq_musers = [...new Map(musers.map(item => {
                        return [item.AssignedEmail, item]
                    })).values()];

                    for (u in uniq_musers) {
                        $('#musers').append(`<option value="${uniq_musers[u].AssignedEmail}">${uniq_musers[u].Assigned}</option>`)
                    }
                }

            }
        },
        error: function () {
            $(location).attr('href', '/')
        }
    });
}
function getcompanyleads(name) {
     $('.topcompanyleads').empty();
    // $('.pipelinemains').hide();

    if(getCookie('fbbank') === 'Finbot'){
        var _url = '/fbpartnersfinance/getcompanyleads?name=' + name;

    }else{
        var _url = '/fbpartners/getcompanyleads?name=' + name;
    }


    // var _url = '/fbpartners/getcompanyleads?name=' + name;

    $.ajax({
        url: _url,
        type: "get",
        success: function (data) {
            ////console.log(data);
            if (!$.trim(data)) {
                var tile1 = 
                `<img src="static/images/fbpartners/leadss.svg" width="100%"></img>`
                $('.topledsner').css("overflow-y","initial");
                
                               $('.topcompanyleads').prepend(tile1) 
                               
            } else {


    


                for (var d in data) {
                   

                    // var tile = 

                    //     `<div class="projuct-names">
					// 				<a href="/add-leads?keyid=` + data[d]._id + `">
					// 					<div class="col-md-12 padsmars">
					// 						<div class="col-md-12 padsmars dfddfff">
					// 							<div class="col-md-5 ledpilped padsmars">
					// 								<h4 class="poprodc">Rs. ` + Number(data[d].leadamount).toLocaleString('en-IN') +`</h4>
					// 							</div
					// 							><div class="col-md-7 ledpilped"> 
					// 								<p> `+ data[d].company + `</p>
					// 							</div>
					// 						</div>
					// 						<div class="col-md-12 padsmars dfddfff">
					// 							<div class="col-md-5 ledpilped padsmars">
					// 								<h4>Contact No </h4>
					// 							</div> 
					// 							<div class="col-md-7 ledpilped">
					// 								<p>`+ data[d].contactnumber +`</p>
					// 							</div>
					// 						</div>
					// 						<div class="col-md-12 padsmars dfddfff">
					// 							<div class="col-md-5 ledpilped padsmars">
					// 								<h4>Assigned </h4>
					// 							</div> 
					// 							<div class="col-md-7 ledpilped">
					// 								<p> ` + data[d].Assigned +` </p>
					// 							</div>
					// 						</div>
					// 					</div>
					// 				</a>
                    //             </div>`
                    if(getCookie('fbbank') === 'Finbot')
                    {
                        var url = 'financeleads'

                    }else{
                        var url = 'add-leads'

                    }
                           

                    var tile=` <div class="newleadsd"><a href="/`+url+`?keyid=` + data[d]._id + `"><div class="ledsnedone"><div class="col-md-12 col-xs-12 padsmars"><div class="col-md-12 col-xs-12 padsmars"><div class="col-md-12 col-xs-12 padsmars"><h2>`+ data[d].company + `</h2></div></div><div class="col-md-12 col-xs-12 padsmars albgclors"><div class="col-md-12 col-xs-12 padsmars newcontur"></div>      </div></div><div class="col-md-12 col-xs-12 padsmars"><div class="inerleadsse"><h3>`+data[d].contact+`</h3><div class="col-md-12 col-xs-12 padsmars lonamounts"><div class="col-md-6 col-xs-12 padsmars"><h6>Lead Amount</h6><h1>Rs. ` + Number(data[d].leadamount).toLocaleString('en-IN') +`</h1></div><div class="col-md-6 col-xs-12 padsmars"><h6>Assigned</h6><h1>`+ data[d].Assigned +`</h1></div></div><div class="col-md-12 col-xs-12 padsmars lonamounts"><div class="col-md-6 col-xs-12 padsmars"><h6>Lead Stage</h6><h1>`+ data[d].leadstage +`</h1></div><div class="col-md-6 col-xs-12 padsmars"><h6>Contact No</h6><h1>`+ data[d].contactnumber +`</h1></div></div></div></div></div></a></div>`

                    $('.topcompanyleads').prepend(tile);

                }

            }
        },
        error: function () {
            $(location).attr('href', '/')
        }
    });
};
function getcompanyleaddocs(name) {
    // $('.allmanpads').empty();
    // $('.pipelinemains').hide();
    $('.docdis').empty();
    

    
    if (getCookie('fbbank') === 'Finbot') {
        var _url = '/fbpartnersfinance/getcompanyleaddocs?name=' + name;
    } else {
    var _url = '/fbpartners/getcompanyleaddocs?name=' + name;
    }
    

    $.ajax({
        url: _url,
        type: "get",
        success: function (data) {
            ////console.log(data);
            if (!$.trim(data)) {
              //  $('.pipelinemains').hide();
                var tileempty = '<div class="empytre">' +
                '<div class="oneemptys">' +
                '<div class="col-md-12 listcontras">' +
                '<div class="recordnew hgreen contact-panel">' +
                '<a href="">' +
                '<div class="panel-body">' +
                '<h3>' + 'Let' + 's' + ' add new contacts' + '</h3>' +
                '<img alt="logo" src="static/images/fbpartners/emptyleads.svg" style="width: 250px !important; height:100% !important;">'
        
                + '</div>'
               //// $('.allmanpads').prepend(tileempty);
            } else {

                  for(var d in data){

                  
              
           
                    data[d].documents.forEach(function (el) {
                        console.log(el.documentdocs)
                        
                        el.documentdocs.forEach(function (ele) {
                        $(".docdis").append('<tr><td class="ksidws">' + ele.docname + '</td><td class="ksidws2"><a href="/fbpartners/viewodoc?docname=' + ele.docpath + '" class="fildownad"><i class="fa fa-download"></i></a></td></tr>')
                        })
                    });
                }


                   // $('.allmanpads').prepend(tile);

                

            }
        },
        error: function () {
            $(location).attr('href', '/')
        }
    });
};

function getcontactleads(number) {
    $('.topcompanyleads').empty();
   // $('.pipelinemains').hide();

   if(getCookie('fbbank') === 'Finbot'){
       var _url = '/fbpartnersfinance/getcontactleads?number=' + number;

   }else{
       var _url = '/fbpartners/getcontactleads?number=' + number;
   }


   // var _url = '/fbpartners/getcompanyleads?name=' + name;

   $.ajax({
       url: _url,
       type: "get",
       success: function (data) {
           ////console.log(data);
           if (!$.trim(data)) {
               var tile1 = 
               `<img src="static/images/fbpartners/leadss.svg" width="100%"></img>`
               $('.topledsner').css("overflow-y","initial");
               
                              $('.topcompanyleads').prepend(tile1) 
                              
           } else {


   


               for (var d in data) {
                  

                //    var tile = 

                //        `<div class="projuct-names">
                //                    <a href="/add-leads?keyid=` + data[d]._id + `">
                //                        <div class="col-md-12 padsmars">
                //                            <div class="col-md-12 padsmars dfddfff">
                //                                <div class="col-md-5 ledpilped padsmars">
                //                                    <h4 class="poprodc">Rs. ` + Number(data[d].leadamount).toLocaleString('en-IN') +`</h4>
                //                                </div
                //                                ><div class="col-md-7 ledpilped"> 
                //                                    <p> `+ data[d].company + `</p>
                //                                </div>
                //                            </div>
                //                            <div class="col-md-12 padsmars dfddfff">
                //                                <div class="col-md-5 ledpilped padsmars">
                //                                    <h4>Contact No </h4>
                //                                </div> 
                //                                <div class="col-md-7 ledpilped">
                //                                    <p>`+ data[d].contactnumber +`</p>
                //                                </div>
                //                            </div>
                //                            <div class="col-md-12 padsmars dfddfff">
                //                                <div class="col-md-5 ledpilped padsmars">
                //                                    <h4>Assigned </h4>
                //                                </div> 
                //                                <div class="col-md-7 ledpilped">
                //                                    <p> ` + data[d].Assigned +` </p>
                //                                </div>
                //                            </div>
                //                        </div>
                //                    </a>
                //                </div>`

                if(getCookie('fbbank') === 'Finbot')
                    {
                        var url = 'add-financeleads'

                    }else{
                        var url = 'add-leads'

                    }
                           

                                var tile=` <div class="newleadsd"><a href="/`+url+`?keyid=` + data[d]._id + `"><div class="ledsnedone"><div class="col-md-12 col-xs-12 padsmars"><div class="col-md-12 col-xs-12 padsmars"><div class="col-md-12 col-xs-12 padsmars"><h2>`+ data[d].company + `</h2></div></div><div class="col-md-12 col-xs-12 padsmars albgclors"><div class="col-md-12 col-xs-12 padsmars newcontur"></div>      </div></div><div class="col-md-12 col-xs-12 padsmars"><div class="inerleadsse"><h3>`+data[d].contact+`</h3><div class="col-md-12 col-xs-12 padsmars lonamounts"><div class="col-md-6 col-xs-12 padsmars"><h6>Lead Amount</h6><h1>Rs. ` + Number(data[d].leadamount).toLocaleString('en-IN') +`</h1></div><div class="col-md-6 col-xs-12 padsmars"><h6>Assigned</h6><h1>`+ data[d].Assigned +`</h1></div></div><div class="col-md-12 col-xs-12 padsmars lonamounts"><div class="col-md-6 col-xs-12 padsmars"><h6>Lead Stage</h6><h1>`+ data[d].leadstage +`</h1></div><div class="col-md-6 col-xs-12 padsmars"><h6>Contact No</h6><h1>`+ data[d].contactnumber +`</h1></div></div></div></div></div></a></div>`


                   $('.topcompanyleads').prepend(tile);

               }

           }
       },
       error: function () {
           $(location).attr('href', '/')
       }
   });
};

function getmytasks() {
    $('.allmanpads').empty();
    $('.pipelinemains').hide();

    var _url = '/fbpartners/getmyleads';

    $.ajax({
        url: _url,
        type: "get",
        success: function (data) {

            if (!$.trim(data)) {
                newtile();
            } else {


                $('.allmanpads').empty();
                $('.pipelinemains').hide();


                for (var d in data) {
                    var tile = '<div class="col-md-4 col-xs-12 judjjn ourservices"><div class="newleadsd"><a href="/add-leads?keyid=' + data[d]._id + '"><div class="ledsnedone"><div class="col-md-12 col-xs-12 padsmars">' +
                        '<div class="col-md-12 col-xs-12 padsmars"><div class="col-md-8 col-xs-8 padsmars"><h2>' + data[d].company + '</h2></div></div>' +
                        '<div class="col-md-12 col-xs-12 padsmars albgclors"><div class="col-md-12 col-xs-12 padsmars newcontur"></div>      </div></div>' +
                        '<div class="col-md-12 col-xs-12 padsmars"><div class="inerleadsse"><h3>' + data[d].contact + '</h3><div class="col-md-12 col-xs-12 padsmars lonamounts"><div class="col-md-7 col-xs-7 padsmars"><h6>Lead Amount</h6><h1>Rs. ' + Number(data[d].leadamount).toLocaleString('en-IN') + '</h1></div>' +
                        '<div class="col-md-5 col-xs-5 padsmars"><h6>Assigned to</h6><h1>' + data[d].Assigned + '</h1></div></div>' +
                        '<div class="col-md-12 col-xs-12 padsmars lonamounts"><div class="col-md-7 col-xs-7 padsmars"><h6>Lead Stage</h6><h1>' + data[d].leadstage + '</h1></div>' +
                        '<div class="col-md-5 col-xs-5 padsmars"><h6>Contact No</h6><h1>' + data[d].contactnumber + '</h1></div>' +
                        '</div></div></div></div></a></div></div>'


                    $('.allmanpads').prepend(tile);

                }

            }
        },
        error: function () {
            $(location).attr('href', '/')
        }
    });
};




function leadsbystage() {
    $('.pipelinemains').show();
    $('#mteam,#musers,#msource').empty()
  
    $('.leadstages').empty();
    var _url = '/fbpartnerlead/getdealerpipelineleads';

    $.ajax({
        url: _url,
        type: "get",
        success: function (data) {
            ////console.log(data);
            data.stages.forEach(function (el) {

                var tile = '<div class="box1 stager">' +
                    '<header class="box-hed1">' +
                    '<h1>' + el + '</h1>' +
                    '<h2 class = "leadsnum">0</h2><div class="clr"></div><div class="border1">' +
                    '<div class="col-md-12 col-xs-12 padsmars newcontur"></div> </div></header><div class="fixed-sen1 screenheight personone" id="ra-dash1"></div>' +
                    '<div class="reat1"><h3><span>Total: </span><span class="amtdisplays"></span></h3></div></div>'
                el = el.replace(/\s+/g, '-');

                $('.leadstages').append(tile);
                $('.stager').addClass(el).removeClass('stager');


            })

            var datao2 = _.groupBy(data.leads, 'leadstage');

            _.each(
                _.sortBy(
                    _.toArray(datao2),
                    function (num) {

                        return num;
                    }
                ).reverse(),
                function (v) {

                    var sum = 0;
                    var count = 0;
                    var mteam = [], mdealer = [], musers = [], mzone = [], mstate = [];
                    for (var i = 0; i < v.length; i++) {
                        if (getCookie('tenet') == 2) {
                            if (v[i].sourcecode) {
                                mdealer.push({
                                    sourcecode: v[i].sourcecode
                                })
                            }
                            var tile = '<div class="projuct-names" data-amount="' + v[i].leadamount + '" data-zone="' + v[i].zone + '" data-state="' + v[i].state + '" data-team="' + v[i].team + '" data-AssignedEmail="' + v[i].AssignedEmail + '" data-dealer="' + v[i].sourcecode + '">'
                        } else {
                            $('#source,#allsource').remove();
                            var tile = '<div class="projuct-names" data-amount="' + v[i].leadamount + '" data-zone="' + v[i].zone + '" data-state="' + v[i].state + '" data-team="' + v[i].team + '" data-AssignedEmail="' + v[i].AssignedEmail + '">'
                        }
                        var tile = tile +
                            '<a href="/dealerleads?keyid=' + v[i]._id + '">' +
                            '<div class="col-md-12 padsmars"><div class="col-md-12 padsmars dfddfff"><div class="col-md-5 ledpilped padsmars"><h4 class="poprodc">Rs. ' + Number(v[i].leadamount).toLocaleString('en-IN') + '</h4></div><div class="col-md-7 ledpilped"> <p> ' + v[i].company + '</p></div></div>' +
                            '<div class="col-md-12 padsmars dfddfff"><div class="col-md-5 ledpilped padsmars"><h4>Contact No </h4></div> <div class="col-md-7 ledpilped"><p> ' + v[i].contactnumber + '</p></div></div>' +
                            '<div class="col-md-12 padsmars dfddfff"><div class="col-md-5 ledpilped padsmars"><h4>Assigned </h4></div> <div class="col-md-7 ledpilped"><p> ' + v[i].Assigned + '</p></div></div>' +




                            '</div>' +
                            '</div>' +
                            '</a>' +

                            '</div>'
                           

                        sum += parseInt(v[i].leadamount);
                        count++;

                        // //console.log( v[i].leadstages[0].leadsstage);
                        var stg = v[i].leadstage.replace(/\s+/g, '-');
                    
                        $('.' + stg).find('.personone').prepend(tile);
                        $('.' + stg).find('.amtdisplays').text('Rs. ' + sum.toLocaleString('en-IN'));
                        $('.' + stg).find('.leadsnum').text(count);
                        if (v[i].teamId) {
                            // if (data[d].team) {
                            mteam.push({
                                team: v[i].team,
                                teamId: v[i].teamId
                            })
                        }
                        if (v[i].AssignedEmail) {
                            musers.push({
                                Assigned: v[i].Assigned,
                                AssignedEmail: v[i].AssignedEmail
                            })
                        }
                        if (v[i].sourcetype) {
                            msource.push({
                                sourcetype: v[i].sourcetype
                            })
                        }
                        if (v[i].zone) {
                            mzone.push({
                                zone: v[i].zone
                            })
                        }
                        if (v[i].state) {
                            mstate.push({
                                state: v[i].state
                            })
                        }


                    }
                    if ($.trim(mzone)) {

                        var uniq_mzone = mzone.filter((v, i, a) => a.findIndex(t => (t.zone === v.zone)) === i);
                        for (z in uniq_mzone) {
                            $('#mzone').append(`<option value="${uniq_mzone[z].zone}">${uniq_mzone[z].zone}</option>`)
                            // $('#msource').append(`<option value="${uniq_msource[z].zone.replace(/\s+/g, '_')}">${uniq_msource[z].zone}</option>`)
                        }
                    }
    
                    if ($.trim(mstate)) {
                        var uniq_mstate = [...new Map(mstate.map(item => {
                            return [item.state, item]
                        })).values()];
    
                        for (t in uniq_mstate) {
                            $('#mstate').append(`<option value="${uniq_mstate[t].state}">${uniq_mstate[t].state}</option>`)
                        }
                    }
    
                    if ($.trim(mteam)) {
                        var uniq_mteam = [...new Map(mteam.map(item => {
                            return [item.teamId, item]
                        })).values()];
    
                        for (t in uniq_mteam) {
                            $('#mteam').append(`<option value="${uniq_mteam[t].team}">${uniq_mteam[t].team}</option>`)
                        }
                    }
    
                    if ($.trim(mdealer)) {
                        var uniq_mdealer = [...new Map(mdealer.map(item => {
                            return [item.sourcecode, item]
                        })).values()];
    
                        for (s in uniq_mdealer) {
                            $('#mdealer').append(`<option value="${uniq_mdealer[s].sourcecode}">${uniq_mdealer[s].sourcecode}</option>`)
                        }
                    }
    
                    if ($.trim(musers)) {
                        var uniq_musers = [...new Map(musers.map(item => {
                            return [item.AssignedEmail, item]
                        })).values()];
    
                        for (u in uniq_musers) {
                            $('#musers').append(`<option value="${uniq_musers[u].AssignedEmail}">${uniq_musers[u].Assigned}</option>`)
                        }
                    }

                }
            );


        },
        error: function () {
            $(location).attr('href', '/')
        }
    });
}
function leadsbystagefilter(filter) {
    $('.pipelinemains').show();
    $('#mteam,#musers,#msource').empty()
  
    $('.leadstages').empty();
 
    var _url = '/fbpartnerlead/getdealerpipelineleadsbyfilter?filter=' + filter;

    $.ajax({
        url: _url,
        type: "get",
        success: function (data) {
            ////console.log(data);
            data.stages.forEach(function (el) {

                var tile = '<div class="box1 stager">' +
                    '<header class="box-hed1">' +
                    '<h1>' + el + '</h1>' +
                    '<h2 class = "leadsnum">0</h2><div class="clr"></div><div class="border1">' +
                    '<div class="col-md-12 col-xs-12 padsmars newcontur"></div> </div></header><div class="fixed-sen1 screenheight personone" id="ra-dash1"></div>' +
                    '<div class="reat1"><h3><span>Total: </span><span class="amtdisplays"></span></h3></div></div>'
                el = el.replace(/\s+/g, '-');

                $('.leadstages').append(tile);
                $('.stager').addClass(el).removeClass('stager');


            })

            var datao2 = _.groupBy(data.leads, 'leadstage');

            _.each(
                _.sortBy(
                    _.toArray(datao2),
                    function (num) {

                        return num;
                    }
                ).reverse(),
                function (v) {

                    var sum = 0;
                    var count = 0;
                    var mteam = [], mdealer = [], musers = [], mzone = [], mstate = [];
                    for (var i = 0; i < v.length; i++) {
                        if (getCookie('tenet') == 2) {
                            if (v[i].sourcecode) {
                                mdealer.push({
                                    sourcecode: v[i].sourcecode
                                })
                            }
                            var tile = '<div class="projuct-names" data-amount="' + v[i].leadamount + '" data-zone="' + v[i].zone + '" data-state="' + v[i].state + '" data-team="' + v[i].team + '" data-AssignedEmail="' + v[i].AssignedEmail + '" data-dealer="' + v[i].sourcecode + '">'
                        } else {
                            $('#source,#allsource').remove();
                            var tile = '<div class="projuct-names" data-amount="' + v[i].leadamount + '" data-zone="' + v[i].zone + '" data-state="' + v[i].state + '" data-team="' + v[i].team + '" data-AssignedEmail="' + v[i].AssignedEmail + '">'
                        }
                        var tile = tile +
                            '<a href="/dealerleads?keyid=' + v[i]._id + '">' +
                            '<div class="col-md-12 padsmars"><div class="col-md-12 padsmars dfddfff"><div class="col-md-5 ledpilped padsmars"><h4 class="poprodc">Rs. ' + Number(v[i].leadamount).toLocaleString('en-IN') + '</h4></div><div class="col-md-7 ledpilped"> <p> ' + v[i].company + '</p></div></div>' +
                            '<div class="col-md-12 padsmars dfddfff"><div class="col-md-5 ledpilped padsmars"><h4>Contact No </h4></div> <div class="col-md-7 ledpilped"><p> ' + v[i].contactnumber + '</p></div></div>' +
                            '<div class="col-md-12 padsmars dfddfff"><div class="col-md-5 ledpilped padsmars"><h4>Assigned </h4></div> <div class="col-md-7 ledpilped"><p> ' + v[i].Assigned + '</p></div></div>' +




                            '</div>' +
                            '</div>' +
                            '</a>' +

                            '</div>'
                            if (v[i].zone) {
                                mzone.push({
                                    zone: v[i].zone
                                })
                            } if (v[i].state) {
                                mstate.push({
                                    state: v[i].state
                                })
                            }
                            if (v[i].teamId) {
                                mteam.push({
                                    team: v[i].team,
                                    teamId: v[i].teamId
                                })
                            }
                            if (v[i].AssignedEmail) {
                                musers.push({
                                    Assigned: v[i].Assigned,
                                    AssignedEmail: v[i].AssignedEmail
                                })
                            }

                        sum += parseInt(v[i].leadamount);
                        count++;

                        // //console.log( v[i].leadstages[0].leadsstage);
                        var stg = v[i].leadstage.replace(/\s+/g, '-');
                    
                        $('.' + stg).find('.personone').prepend(tile);
                        $('.' + stg).find('.amtdisplays').text('Rs. ' + sum.toLocaleString('en-IN'));
                        $('.' + stg).find('.leadsnum').text(count);


                    }
                    if ($.trim(mzone)) {
                        var uniq_mzone = [...new Map(mzone.map(item => {
                            return [item.zone, item]
                        })).values()];
    
                        for (t in uniq_mzone) {
                            $('#mzone').append(`<option value="${uniq_mzone[t].zome}">${uniq_mteam[t].zone}</option>`)
                        }
                    }
    
                    if ($.trim(mstate)) {
                        var uniq_mstate = [...new Map(mstate.map(item => {
                            return [item.state, item]
                        })).values()];
    
                        for (t in uniq_mstate) {
                            $('#mstate').append(`<option value="${uniq_mstate[t].state}">${uniq_mstate[t].state}</option>`)
                        }
                    }
    
                    if ($.trim(mteam)) {
                        var uniq_mteam = [...new Map(mteam.map(item => {
                            return [item.teamId, item]
                        })).values()];
    
                        for (t in uniq_mteam) {
                            $('#mteam').append(`<option value="${uniq_mteam[t].team}">${uniq_mteam[t].team}</option>`)
                        }
                    }
    
                    if ($.trim(mdealer)) {
                        var uniq_mdealer = [...new Map(mdealer.map(item => {
                            return [item.sourcecode, item]
                        })).values()];
    
                        for (s in uniq_mdealer) {
                            $('#mdealer').append(`<option value="${uniq_mdealer[s].sourcecode}">${uniq_mdealer[s].sourcecode}</option>`)
                        }
                    }
    
                    if ($.trim(musers)) {
                        var uniq_musers = [...new Map(musers.map(item => {
                            return [item.AssignedEmail, item]
                        })).values()];
    
                        for (u in uniq_musers) {
                            $('#musers').append(`<option value="${uniq_musers[u].AssignedEmail}">${uniq_musers[u].Assigned}</option>`)
                        }
                    }

                }
            );


        },
        error: function () {
            $(location).attr('href', '/')
        }
    });
}
function myleadsbystage() {
    $('.pipelinemains').show();

    $('.leadstages').empty();
    var _url = '/fbpartners/getmypipelineleads';

    $.ajax({
        url: _url,
        type: "get",
        success: function (data) {

            data.stages.forEach(function (el) {
                ////console.log(el);
                var tile = '<div class="box1 stager">' +
                    '<header class="box-hed1">' +
                    '<h1>' + el + '</h1>' +
                    '<h2 class = "leadsnum">0</h2><div class="clr"></div><div class="border1">' +
                    '<div class="col-md-12 col-xs-12 padsmars newcontur"></div>' +
                    '</div></header><div class="fixed-sen1 personone" id="ra-dash1"></div>' +
                    '<div class="reat1"><h3><span>Total: </span><span class="amtdisplays"></span></h3></div></div>'
                el = el.replace(/\s+/g, '-');

                $('.leadstages').append(tile);
                $('.stager').addClass(el).removeClass('stager');


            })

            var datao2 = _.groupBy(data.leads, 'leadstage');

            _.each(
                _.sortBy(
                    _.toArray(datao2),
                    function (num) {

                        return num;
                    }
                ).reverse(),
                function (v) {

                    var sum = 0;
                    var count = 0;
                    for (var i = 0; i < v.length; i++) {
                        // //console.log(v[i].leadamount);
                        var tile = '<div class="projuct-names">' +
                            '<a href="/dealerleads?keyid=' + v[i]._id + '">' +
                            '<div class="col-md-12 padsmars"><div class="col-md-12 padsmars dfddfff"><div class="col-md-5 ledpilped padsmars"><h4 class="poprodc">Rs. ' + Number(v[i].leadamount).toLocaleString('en-IN') + '</h4></div><div class="col-md-7 ledpilped"> <p> ' + v[i].company + '</p></div></div>' +
                            '<div class="col-md-12 padsmars dfddfff"><div class="col-md-5 ledpilped padsmars"><h4>Contact No </h4></div> <div class="col-md-7 ledpilped"><p> ' + v[i].contactnumber.toLocaleString('en-IN') + '</p></div></div>' +
                            '<div class="col-md-12 padsmars dfddfff"><div class="col-md-5 ledpilped padsmars"><h4>Assigned </h4></div> <div class="col-md-7 ledpilped"><p> ' + v[i].Assigned + '</p></div></div>' +




                            '</div>' +
                            '</div>' +
                            '</a>' +

                            '</div>'






                        sum += parseInt(v[i].leadamount);
                        count++;


                        var stg = v[i].leadstage.replace(/\s+/g, '-');
                        $('.' + stg).find('.personone').prepend(tile);
                        $('.' + stg).find('.amtdisplays').text('Rs. ' + sum.toLocaleString('en-IN'));
                        $('.' + stg).find('.leadsnum').text(count);

                    }

                }
            );


        },
        error: function () {
            $(location).attr('href', '/')
        }
    });
}

function getproducts() {
    $('.allmanpads').empty();
    
    var _url = '/fbpartners/getproducts';
    $.ajax({
        url: _url,
        type: "get",
        success: function (data) {
            if (!$.trim(data)) {
                var tileempty = '<div class="empytre">' +
                    '<div class="oneemptys">' +
                    '<div class="col-md-12 listcontras">' +
                    '<div class="recordnew hgreen contact-panel">' +
                    '<a href="">' +
                    '<div class="panel-body">' +
                    '<h3>' + 'Let' + 's' + ' add new product' + '</h3>' +
                    '<img alt="logo" src="static/images/fbpartners/emptyproduct.svg" style="width: 250px !important; height:100% !important;">'

                    +
                    '</div>'
                $('.allmanpads').prepend(tileempty);
            } else {
                for (var d in data) {
                    var tile = '<div class="col-lg-4 col-md-4 col-xs-12 ctile twobtosmaindf ourservices searchproducts">' +
                        '<div class="twoprodyctmain">' +
                        '<a href="/add-products?keyid=' + data[d].id + '">' +
                        '<div class="boxtwones">' +
                        '<div class="col-lg-12 col-md-12 padsmars">' +
                        '<div class="col-lg-12 col-md-12 col-xs-12 padsmars dutemainfrf">' +
                        '<div class="col-lg-12 col-md-12 padsmars">' +
                        '<div class="bgcolortsyhd"><div class="profhywijs"><h1>' + data[d].Name.replace(/-/g, ' ') + '</h1><p>Products Name</p></div></div>' +
                        '<div class="twbacming">' +
                        '<img src="static/' + data[d].logopath + '" alt="" />' +
                        '<div class="louraccd">' +
                        '<h1>' + data[d].Name + '</h1>' +
                        '<p>Products Name</p>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '<div class="col-lg-12 col-md-12 polopolews">' +
                        '<div class="col-lg-12 col-md-12 col-xs-12 padsmars otsdwonbge">' +
                        '<h1>Description</h1>' +
                        '<h1 class="compemailsd">' + add3Dots(data[d].Description, '180') + '</h1>' +
                        '</div>' +
                        '<div class="col-lg-12 col-md-12 col-xs-12 padsmars nertunbvx">' +
                        '<div class="col-md-6 col-xs-6 padsmars">' +
                        '<h1>Serial Number</h1>	' +
                        '<h1 class="compemailsd">' + data[d].SerialNumber + '</h1>' +
                        '</div>' +
                        '<div class="col-md-6 col-xs-6 padsmars">' +
                        '<h1>Manufacturer</h1>' +
                        '<h1 class="compemailsd">' + data[d].Manufacturer + '</h1>' +
                        '</div>' +
                        '</div>' +
                        '<div class="col-lg-12 col-md-12 col-xs-12 padsmars nertunbvx">' +
                        '<div class="col-md-6 col-xs-6 padsmars">' +
                        '<h1>Contact</h1>' +
                        '</div>' +
                        '<div class="col-md-6 col-xs-6 padsmars">' +
                        '<div class="proconprofl"><h1 class="compemailsd">' + data[d].ContactPerson + '</h1></div>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</a>' +
                        '</div>' +
                        '</div>'

                    $('.allmanpads').prepend(tile);
                    if (data[d].logopath != '' && data[d].logopath != null) {
                        // if (data[d].logopath != null) {

                        $(".ctile .bgcolortsyhd").css("display", "none");
                        $(".ctile .twbacming").css("display", "block");

                    } else {

                        $(".ctile .twbacming").css("display", "none");
                        $(".ctile .bgcolortsyhd").css("display", "block");
                    }
                    $('.ctile').removeClass('ctile')


                }
                
            }
        },
        error: function (err) {
            $(location).attr('href', '/');
        }
    });
}

function getproductstwo() {
    $('.allmanpads').empty();
    
    var _url = '/fbpartners/getproductstwo';
    $.ajax({
        url: _url,
        type: "get",
        success: function (data) {
            if (!$.trim(data)) {
                var tileempty = '<div class="empytre">' +
                    '<div class="oneemptys">' +
                    '<div class="col-md-12 listcontras">' +
                    '<div class="recordnew hgreen contact-panel">' +
                    '<a href="">' +
                    '<div class="panel-body">' +
                    '<h3>' + 'Let' + 's' + ' add new product' + '</h3>' +
                    '<img alt="logo" src="static/images/fbpartners/emptyproduct.svg" style="width: 250px !important; height:100% !important;">'

                    +
                    '</div>'
                $('.allmanpads').prepend(tileempty);
            } else {
                for (var d in data) {
                    if (data[d].logopath) {
                        var imgorname = `<img class="compnyoprofil${d}" src="static/`+data[d].logopath+`"width="100%"/>`
                    } else {
                        var imgorname=`<div class="prfle_ltr prfle_ltr${d}" >${data[d].Name?data[d].Name.charAt(0) + '' + data[d].Name.charAt(1):'N/A'}</div>`
                    }
       
        var tile = `<tr class="table__row">
        <td class="product-user"><a href="/add-productstwo?keyid=${data[d].id}" class="prodts">
           <div class="product-user-info">
                 <div class="product-user-name">
                     ${imgorname}
                  </div>
                  <div class="product-user-content">
                    <h4>${data[d].Name?add3Dots(data[d].Name, '40'):"N/A"}</h4>
                    <span>${data[d].Manufacturer?add3Dots(data[d].Manufacturer, '40'):"N/A"}</span>
                  </div>
        </div>   </a>
        </td>
        <td class="table__cell--code"><a href="/add-productstwo?keyid=${data[d].id}" class="prodts"><h5><span>${(data[d].Code?data[d].Code:'N/A')}</span></h5></a>
        </td>
        <td class="table__cell--range"><a href="/add-productstwo?keyid=${data[d].id}" class="prodts"><h5><span>${data[d].Price_min} - ${data[d].Price_max}</span></h5></a>
        </td>
        <td class="table__cell--type">
        <a href="/add-productstwo?keyid=${data[d].id}" class="prodts"><h5><span>${data[d].Type}</span></h5></a>
        </td>
        <td class="table__cell--Category">
        <a href="/add-productstwo?keyid=${data[d].id}" class="prodts"><div class="product-user-content">
        <h4>${data[d].Category}</h4>
        <span>${data[d].Subcategory}</span></div></a>
        </td>
        <td style="width: 60px;" class="table__cell--download pull-right">
        <h5><span class="fadownload"><i class="fa fa-download"></i></span>
            <span class="famail"><i class="fa fa-envelope"></i></span>
            </h5>
        </td>
        
     </tr>`
                                       $('.allmanpads').append(tile);
                }
  
            }
        },
        error: function (err) {
            $(location).attr('href', '/');
        }
    });
}

//---------------------taskSuresh Start-----------------
// function getNewTask() {
//     $('.allmanpads').empty();
    
//     var _url = '/fbpartners/getNewTask';
//     $.ajax({
//         url: _url,
//         type: "get",
//         success: function (data) {
//             if (!$.trim(data)) {
//                 var tileempty = '<div class="empytre">' +
//                     '<div class="oneemptys">' +
//                     '<div class="col-md-12 listcontras">' +
//                     '<div class="recordnew hgreen contact-panel">' +
//                     '<a href="">' +
//                     '<div class="panel-body">' +
//                     '<h3>' + 'Let' + 's' + ' add new product' + '</h3>' +
//                     '<img alt="logo" src="static/images/fbpartners/emptyproduct.svg" style="width: 250px !important; height:100% !important;">'
//                     +
//                     '</div>'
//                 $('.allmanpads').prepend(tileempty);
//             } else {
//                 var count=0
//                 for (var d in data) {
//                 // console.log('1649',count++);
//                     if (data[d].logopath) {
//                         var imgorname = `<img class="compnyoprofil${d}" src="static/`+data[d].logopath+`"width="100%"/>`
//                     } else {
//                         var imgorname=`<div class="prfle_ltr prfle_ltr${d}" >${data[d].Name?data[d].Name.charAt(0) + '' + data[d].Name.charAt(1):'N/A'}</div>`
//                     }
       
//                     var tile=`<tr class="task-table__row">
//                                 <td class="task-user"><a href="/add-newTask?keyid=${data[d].id}" class="task">
//                                     <div class="task-user-info">
//                                     <div class="task-user-name">${imgorname}
//                                     </div>
//                                     <div class="task-user-content">
//                                         <h4>${data[d].Name?add3Dots(data[d].Name, '40'):"N/A"}</h4>
//                                         <span>${data[d].Name?add3Dots(data[d].Name, '40'):"N/A"}</span>
//                                     </div>
//                                     </div> </a>
//                                 </td>

//                                 <td class="table__cell--type"><a href="/add-newTask?keyid=${data[d].id}" class="task"><h5><span>${data[d].Type}</span></h5></a>
//                                 </td>

//                                 <-- <td class="table__cell--stdate">
//                                 <a href="/add-newTask?keyid=${data[d].id}" class="task"><h5><span>${data[d].Start_Date}</span></h5></a>
//                                 </td>

//                                 <td class="table__cell--endate">
//                                 <a href="/add-newTask?keyid=${data[d].id}" class="task"><h5><span>${data[d].End_Date}</span></h5></a>
//                                 </td> -->

//                                 <td class="table__cell--summary">
//                                 <a href="/add-newTask?keyid=${data[d].id}" class="task"><h5><span>${data[d].Summary}</span></h5></a>
//                                 </td>

//                                 <td class="table__cell--towner">
//                                 <a href="/add-newTask?keyid=${data[d].id}" class="task"><h5><span>${data[d].Task_Owner}</span></h5></a>
//                                 </td>

//                                 <td style="width: 60px;" class="table__cell--download pull-right">
//                                 <h5><span class="fadownload"><i class="fa fa-download"></i></span>
//                                 <span class="famail"><i class="fa fa-envelope"></i></span></h5>
//                                 </td>

//                             </tr>`
//                     $('.allmanpads').append(tile);
//                 }
//             }
//         },
//         error: function (err) {
//             $(location).attr('href', '/');
//         }
//     });
// }

function getNewTask() {
    $('.allmanpads').empty();
   
    var _url = '/fbpartners/getNewTask';
    $.ajax({
        url: _url,
        type: "get",
        success: function (data) {
            if (!$.trim(data)) {
                var tileempty = '<div class="empytre">' +
                    '<div class="oneemptys">' +
                    '<div class="col-md-12 listcontras">' +
                    '<div class="recordnew hgreen contact-panel">' +
                    '<a href="">' +
                    '<div class="panel-body">' +
                    '<h3>' + 'Let' + 's' + ' Add New Api' + '</h3>' +
                    '<img alt="logo" src="static/images/fbpartners/api.svg" style="width: 250px !important; height:100% !important;">'

                    +
                    '</div>'
                $('.allmanpads').prepend(tileempty);
            } else {
                // console.log(data)
                for (var d in data) {
                    var tile = `<div class="col-md-4 col-xs-12 ourservices">
                                    <div class=" apicol expnse_col">
                                        <div class="adloadns"><a href="/add-taskS?keyid=${data[d].id}">
                                            <div class="col-md-12 col-xs-12 padsmars">
                                                <h3>${data[d].Name}</h3>
                                                <p class="expns_p">${add3Dots(data[d].Summary, "150")}</p>

                                            </div>
                                            <div class="col-md-12 col-xs-12 padsmars">
                                                <div class="anewloadnsrs1">
                                                    <div class="col-md-12 col-xs-12 padsmars amta1">
                                                        <div class="col-lg-6 col-md-6 col-xs-6 padsmars">	
                                                            <div class="lonmounhtsrs1">
                                
                                                                <h4>Start Date</h4>
                                                                <p>${dateformate(data[d].Start_Date)}</p>
                            
                                                            </div>
                                                        </div>	
                                                        <div class="col-lg-6 col-md-6 col-xs-6 padsmars">
                                                            <div class="paningamers1">
                                
                                                                <h4>End Date</h4>
                                
                                                                <p>${dateformate(data[d].End_Date?add3Dots(data[d].End_Date):"N/A")}</p>
                                
                                                            </div>
                                                        </div>	
                                                    </div>					
                                                </div>
                                            </div>

                                        </a></div>							
                                    </div>	
                                </div>`
                    $('.allmanpads').prepend(tile);
                    if (data[d].logopath != null) {
                        $(".ctile  .conssue").css("display", "none");
                        $(".ctile .usrprofilepic").css("display", "block");
                    } else {
                        $(".ctile  .usrprofilepic").css("display", "none");
                        $(".ctile  .conssue").css("display", "block");
                    }
                    // $('.ctile').removeClass('ctile')
                }
            }
        },
        error: function (err) {
            console.error(err);
            // $(location).attr('href', '/');
        }
    });
}

//---------------------taskSuresh End-----------------


function bindeditproducttwo() {

    // bindmanufacturernames();
    bindlistdrop('productcat');
 
     var _docid = getUrlVars()["keyid"]
 
      $(".docdis").empty();
   if (_docid) {
      $.ajax({
         url: 'fbpartners/productdetailstwo?keyid=' + _docid,
         type: "get",
         success: function (data) {
             
             $('#Name').val(data.Name),
            $('#manufacturer').val(data.Manufacturer), 
            $('#Code').val(data.Code),
             $('#Price_min').val(data.Price_min);
             $('#Price_max').val(data.Price_max);
             $('#Type option[value="' + data.Type + '"]').prop('selected', true).trigger('change'); 
           $('#Category option[value="' + data.Category + '"]').prop('selected', true).trigger('change');
          $('#Subcategory option[value="' + data.Subcategory + '"]').prop('selected', true).trigger('change');
        
         $('#Tags').val(data.Tags)
                
             if (data.logopath != '' && data.logopath != null) {
                 $(".imgarea").empty();
                 $(".imgarea").append('<div class="audio"><div class="addoc"><a href="' + data.logopath + '"><img src="static/' + data.logopath + '"></a></div></div>')
             }
             var s2 = $('#Tags').select2({
                 placeholder: "Please Enter Suggested Tags",
                 tags: true
             });
             if (data.Tags) {
                 var attach = data.Tags;
                 $.each(attach.split(/\,/), function (i, val) {
                     // Create a DOM Option and pre-select by default
                     var newOption = new Option(val, val);
                     // Append it to the select
                     $('#Tags').append(newOption).trigger('change');
                     $('#Tags').val(val).trigger('change');
 
                     s2.val(attach.split(/\,/)).trigger("change");
                 });
             }
             $('[data-page]').attr('onclick','createproddocumenttwo()'); 
             data.proddocstwo.forEach(function (el) {
                 if (Array.isArray(el)) {
                     el = el[0];
                 }
                 $(".docdis").append('<tr><td class="ksidws">' + el.docname + '</td><td class="ksidws2"><a href="/fbpartners/viewodoc?docname=' + el.docpath + '" class="fildownad"><i class="fa fa-download"></i></a></td></tr>')
             });
         }
     });
 }
 else{
 $('#myModal,[data-target="#myModal"]').remove();
 }
 }
 
 function createproddocumenttwo(){
   // debugger;
   var t = getUrlVars()["keyid"];
   if (t) {
 
     let docname = $('#myModal #documentname').val();
     let docpath = $('#myModal .addocs').find('a').attr('href');
     console.log(docname && docpath, ' - ', docname, ' && ', docpath)
     if (docname && docpath) {
       let page = $('.page').attr('data-page');
 
         var _url = "/fbpartners/createnewdoc_productstwo?keyid="+t
       
       $.ajax({
         type: "post",
         url: _url,
         data: JSON.stringify({ doc: { docname: docname, docpath: docpath } }),
         contentType: "application/json; charset=utf-8",
         success: function (data) {
           console.log(data)
           if (data == 'failed') {
             alert('contact Admin')
           } else {
             $('div.imgareas').empty().append(`<span class="imgareas File dz-clickable"><i class="fa fa-arrow-circle-o-up fa-3x dz-clickable"></i><br>Drop
             Files (or)Click here</span>`)
             $('#myModal').modal('hide').find('.form-control').val('');
             $(".docdis").append('<tr><td class="ksidws">' + data.docname + '</td><td class="ksidws2"><a href="/fbpartners/viewodoc?docname=' + page + '/' + data.docpath + '" class="fildownad"><i class="fa fa-download"></i></a></td></tr>')
           }
         }
       });
     }
   }
 }

function getlandingdealerlogo() {
    $('.greeting').empty();
    $(".monthlytarget").empty();
    $(".quaterlytarget").empty();
    var _url = '/fbpartners/Currentuserdetails';


    $.ajax({
        url: _url,
        type: "get",
        success: function (data) {
            var tile = ` <div class="imaglands ctile">
                        <div class="usernamett">` + data[0].name.charAt(0) + `</div><div class="usrprofilepic"><img src="static/images/fbpartners/users/` + data[0].logopath + `"></div>
                     </div>	
                     <div class="welcomeusrstest">
                         <h1>Good Morning, <b>` + data[0].name + `!</b></h1>
     
                     </div>`

            $('.greeting').prepend(tile);
            if (!$.trim(data[0].monthlytarget )) {
                var tilee = ` <h2>Rs.0</h2>
                <h3>Monthly Target</h3>
                <p>This is the target for this month</p>`

        $('.monthlytarget').prepend(tilee);
            }
            else{
            var tile1 = ` <h2>` + data[0].monthlytarget + `</h2>
                    <h3>Monthly Target</h3>
                    <p>This is the target for this month</p>`

            $('.monthlytarget').prepend(tile1);
            }

            if (!$.trim(data[0].quaterlytarget )) {
                var tilee = ` <h2>Rs.0</h2>
                <h3>Quarterly Target</h3>
                <p>This is the target for this month</p>`

        $('.quaterlytarget').prepend(tilee);
            }
            else{

            var tile2 = ` <h2>` + data[0].quaterlytarget + `</h2>
                    <h3>Quarterly Target</h3>
                    <p>This is the target for this quater</p>`

            $('.quaterlytarget').prepend(tile2);
            }

            if (data[0].logopath && data[0].logopath !="undefined"){

                $(".ctile  .usernamett").css("display", "none");
                $(".ctile .usrprofilepic").css("display", "block");

            } else {

                $(".ctile  .usrprofilepic").css("display", "none");
                $(".ctile  .usrnamesltrs").css("display", "block");

            }
            $('.ctile').removeClass('ctile')
        },
        error: function () {
            $(location).attr('href', '/')
        }
    });
}
function getdealerlandingmonthlytarget() {
    
    $('.cmonthlytarget').empty();

    var _url = '/fbpartners/getmonthlytarget';


    $.ajax({
        url: _url,
        type: "get",
        success: function (data) {

            //console.log(data.leadamount);


            if (!$.trim(data)) {
                var tile1 = ` <h2> Rs.0</h2>
                <h3>Achieved Target</h3>
                <p>This is the target acheived for current month</p>`

        $('.cmonthlytarget').prepend(tile1);
                // newtile();
             } else {

            var tile1 = ` <h2>` + data.leadamount + `</h2>
                    <h3>Achieved Target</h3>
                    <p>This is the target acheived for current month</p>`

            $('.cmonthlytarget').prepend(tile1);
             }







        },
        error: function () {
            $(location).attr('href', '/')
        }
    });
}
function getdealerlandingquaterlytarget() {
    $('.cquaterlytarget').empty();
   
    var _url = '/fbpartners/getquaterlytarget';


    $.ajax({
        url: _url,
        type: "get",
        success: function (data) {

             ////console.log(data.leadamount);

             if (!$.trim(data)) {
                var tile1 = ` <h2> Rs.0</h2>
                <h3>Acheived Target</h3>
                <p>This is the target acheived for current quarter</p>`

        $('.cquaterlytarget').prepend(tile1);
                // newtile();
             } else { 

                 var tile1 =  ` <h2>` + data.leadamount + `</h2>
                    <h3>Acheived Target</h3>
                    <p>This is the target acheived for current quarter</p>`

                    $('.cquaterlytarget').prepend(tile1);

             }

                   
                    
                   

                
            
        },
        error: function () {
            $(location).attr('href', '/')
        }
    });
}

function getlandingdealerleads() {
    $('.carousel-inner').empty();
    $('.emptyslider').empty();
   
    //$('.pipelinemains').hide();

    var _url = '/fbpartnerlead/getdealerleads';

    $.ajax({
        url: _url,
        type: "get",
        success: function (data) {

            if (!$.trim(data)) {
               var tile1 = `<div class="item  leadsemptytls">                                                                     
													<div class="testmo">         
														<div class="col-md-4">
																<div class="col-md-12 col-xs-12 ourservices padsmars"><div class="newleadsd"><img src="static/images/fbpartners/sliderempty.svg"></div></div>
														</div>             
														<div class="col-md-4">
																<div class="col-md-12 col-xs-12 ourservices padsmars"><div class="newleadsd"><img src="static/images/fbpartners/sliderempty.svg"></div></div>
															</div>
															 
														<div class="col-md-4">
																<div class="col-md-12 col-xs-12 ourservices padsmars"><div class="newleadsd"><img src="static/images/fbpartners/sliderempty.svg"></div></div></div><div class="col-md-4 navi">
														</div>
													</div>                                            
                                                </div>`
                                                $('.emptyslider').prepend(tile1);
               // newtile();
            } else {
                var i=0;
                var clntile=0
                var tile =`<div class="item active"><div class="testmo">`
                        for (var d in data) { 
                          clntile=1  
                          i++;
                        tile   =tile+`<div class="col-md-4"><div class="col-md-12 col-xs-12 ourservices padsmars"><div class="newleadsd"><a href="/dealerleads?keyid` + data[d]._id + `&key2id=` + data[d].bankid + `"><div class="ledsnedone"><div class="col-md-12 col-xs-12 padsmars"><div class="col-md-12 col-xs-12 padsmars"><div class="col-md-8 col-xs-8 padsmars"><h2>` + data[d].company + `</h2></div></div><div class="col-md-12 col-xs-12 padsmars albgclors"><div class="col-md-2 col-xs-12 gnsclrs"></div><div class="col-md-2 col-xs-12 blsclrs"></div><div class="col-md-2 col-xs-12 blsclrs"></div> <div class="col-md-2 col-xs-12 grsclrs"></div><div class="col-md-2 col-xs-12 grsclrs"></div><div class="col-md-2 col-xs-12 grsclrs"></div></div></div><div class="col-md-12 col-xs-12 padsmars"><div class="inerleadsse"><h3>` + data[d].contact + `</h3><div class="col-md-12 col-xs-12 padsmars lonamounts"><div class="col-md-7 col-xs-12 padsmars"><h6>Lead Amount</h6><h1>Rs. ` + Number(data[d].leadamount).toLocaleString('en-IN') + `</h1></div><div class="col-md-5 col-xs-12 padsmars"><h6>Assigned To</h6><h1>` + data[d].Assigned + `</h1></div></div><div class="col-md-12 col-xs-12 padsmars lonamounts"><div class="col-md-7 col-xs-12 padsmars"><h6>Lead Stage</h6><h1>` + data[d].leadstage + `</h1></div><div class="col-md-5 col-xs-12 padsmars"><h6>Contact No</h6><h1>` + data[d].contactnumber + `</h1></div></div></div></div></div></a></div></div></div>`
                        if(i >= 3 ){                        
                            i=0;
                            clntile=0;
                            tile   =tile+ `</div></div>` 
                                $('.carousel-inner').prepend(tile);
                            tile=`<div class="item "><div class="testmo">`                        
                        } 
                        }

                        if(clntile==1)
                        {
                            tile   =tile+ `</div></div>` 
                                $('.carousel-inner').prepend(tile);
                        }
                        
                     }
        },
        error: function () {
            $(location).attr('href', '/')
        }
    });
};
//-----------------------

function getservices() {

    var _url = '/fbpartners/getservices';

    $.ajax({
        url: _url,
        type: "get",
        success: function (data) {

            if ($.trim(data)) {

                $('.allmanpads').empty();


                for (var d in data) {
                    var tile = '<div class="col-md-3 col-xs-12 ourservices"><div class="ijnuiold comonebox"><a href="/add-services?keyid=' + data[d].id + '")">' +
                        ' <div class="boonones">' +
                        ' <div class="col-md-12 col-xs-12 padsmars personalb"><h2>' + data[d].Manufacturer + '</h2></div>' +
                        ' <div class="digitalsmarkng"><h1>' + data[d].Name + '</h1><h6>' + data[d].SerialNumber + '</h6><p>' + add3Dots(data[d].Description,`180`) + '</p></div>' +
                        ' <div class="col-md-12 padsmars">' +
                        '<div class="col-md-12 col-xs-12 padsmars"><h6>' + data[d].Price + '</h6></div>' +
                        '</div>' +

                        '</a>' + '</div>' + '</div>'


                    $('.allmanpads').prepend(tile);



                }

            }
        },
        error: function () {
            $(location).attr('href', '/')
        }
    });
}


function getpendingamount() {

    // //console.log("checking in")
    var _url = '/fbpartnersloan/getpendingamount';

    $.ajax({
        url: _url,
        type: "get",
        success: function (data) {
            ////console.log(data)

            if ($.trim(data)) {

                $('.pendingamtdt').empty();

                ////console.log(data.pendingamount);
                var tile = '<div class="col-md-3 dashbord-bg1 hwyhwx">' +
                    '<div class="col-md-12 padsmars">' +
                    '<div class="col-md-8 padsmars"><h1>Total AR Amount</h1><h2>Date range: In the last 30 days Report settings </h2></div>' +
                    '<div class="col-md-4 padsmars"></div></div><div class="col-lg-12 col-md-12 col-xs-12 padsmars"><div class="totalloanam">' +
                    '<h4>Rs.' + data.pendingamount + '</h4></div></div></div>'

                $('.pendingamtdt').prepend(tile);

            }
        },
        error: function () {
            $(location).attr('href', '/')
        }
    });
}

function gettopleads() {

    $('.topleads').empty();

    var _url = '/fbpartners/getleadamount';

    $.ajax({
        url: _url,
        type: "get",
        success: function (data) {
            data.reverse();

            for (var d in data) {

                var tile = '<table><a href = "/add-leads?keyid=' + data[d].id + '"><tbody><tr><td>' + data[d].company + '</td><td>Rs. ' + Number(data[d].leadamount).toLocaleString('en-IN') + '</td><td>' + data[d].leadstage + '</td><td>' + data[d].contact + '</td></tr>' +
                    '</tbody></a></table>'
                $('.topleads').prepend(tile);



            }


        },
        error: function () {
            $(location).attr('href', '/')
        }
    });
}
function binddealermangers() {

    $.ajax({
        url: 'fbpartners/getusers',
        type: "get",
        success: function (data) {

          //console.log(data);
            data.forEach(function (ele) {

                if (ele.role !== 'admin' && ele.role !== 'SM') {


                   
                    $('#manager').append('<option  value="' + ele.email + '|' + ele.id + '">' + ele.name + '</option>');

                }



            })
        },
        error: function () {
            //console.log('error');
        }
    });



}

function binddealermanagers(role) {
    

    $('#manager,#scmanager').empty().append('<option value="">Please Select Manager</option>');
    $.ajax({
        url: 'fbpartners/getdealermanagers?role=' + role,
        type: "get",
        success: function (data) {;
            //console.log(data)
            if (data=="No Managers Available") {
               
            } else {
                data.forEach(function (ele) {
 
                    $('#manager').append('<option value="' + ele.id + '|' + ele.email + '">' + ele.name + '</option>');
                    $('#scmanager').append('<option value="' + ele.id + '">' + ele.name + '</option>');
 
                });
            }
        },
        error: function () {
            //console.log('error');
        }
    });


 
}

function bindedituser() {
    // bindmanagers();
    // binddealerteamnames();
    bindbandnames();

    var _docid = getUrlVars()["keyid"]
    if (_docid) {
        //$(".imgarea").empty();
        $.ajax({
            url: 'fbpartners/userdetails?keyid=' + _docid,
            type: "get",
            success: function (data) {
           
                $("#band option[value='" + data[0].bandId + "']").attr('selected', true).trigger('change');
                $('#role option[value="' + data[0].role + '"]').attr('selected', true).trigger('change');
                $('#Email').val(data[0].email);
                $('#Name').val(data[0].name);
                $('#Phone').val(data[0].phone);
                $('#City').val(data[0].city);
                $('#joiningdate').val(dateformate(data[0].joiningdate));

                setTimeout(
                    function () {
                        $('#monthlytarget').val(data[0].monthlytarget);
                        $('#quaterlytarget').val(data[0].quaterlytarget);
                        $('#minsalary').val(data[0].minsalary);
                        $('#maxsalary').val(data[0].maxsalary);
                        $('#Expenses').val(data[0].expenses);
                        $('#salary').val(data[0].salary);
                    }, 100);

                if (data[0].role == 'admin' || data[0].role == 'SA') {
                    $('.managers').hide();
                } else {
                    setTimeout(
                        function () {
                            $('.managers').show();
                            $('#manager option[value="' + data[0].managerId + '|' + data[0].managerEmail + '"]').prop('selected', true).trigger('change');

                            setTimeout(
                                function () {
                                    $('#team option[value="' + data[0].teamId + '"]').attr('selected', true).trigger('change');
                                }, 100);
                        }, 100);
                    // $("#manager option:contains('" + data[0].manager + "')").attr('selected', true).trigger('change')
                }
                if (data[0].logopath && data[0].logopath != "undefined") {
                    //alert("its not null");
                    $(".imgarea").empty();
                    $(".imgarea").append('<div class="audio"><div class="addoc"><a href="' + data[0].logopath + '"><img src="static/images/fbpartners/users/' + data[0].logopath + '"></a></div></div>')
                }
            }
        });
    }
}
function bindpartnerteamby(id){
    $('#team').empty();
    $.ajax({
        url: '/fbpartnersfinance/teamdetails?keyid='+id,
        type: "get",
        success: function (data) {
           
            if (!$.trim(data)) {

            } else {
                $('#team').append('<option value="" >Please Select Team</option>');
                data.forEach(function (ele) {
                    $('#team').append('<option value="' + ele.id + '">' + ele.teamname + '</option>');
                });
            }
        },
        error: function () {
            //console.log('error');
        }
    });
}

function bindeditcompany() {
    var _docid = getUrlVars()["keyid"]
    //bindcontactnames();
    $('.docdis').empty();
    binduserswithteams()
    if (_docid) {
        $.ajax({
            url: 'fbpartners/companydetails?keyid=' + _docid,
            type: "get",
            success: function (data) {
              
                bindfinteambyforlead(data.AssignedEmail);
                  getcompanyleads(data.name)
                  getcompanyleaddocs(data.name)
                  $('#Email').val(data.email),
                  $('#Name').val(data.name).attr('data-disabled', true)
                  $('#entitytype').val(data.entitytype),
              $('#Phone').val(data.phone),
                  $('#Workphone').val(data.workphone),
                  $('#website').val(data.website),

                  $('#Address').val(data.Address),
                  //$('#Contact option:selected').text(data[0].company),
                  $('#Contact ').val(data.contact),
                  // $("#ldAssigned option:contains('" + data.Assigned + "')").attr('selected', true).trigger('change.select2'),
                  // $('#team option:selected').val(data.teamId),
                  $("#ldAssigned option[value='" + data.AssignedEmail + '|' + data.AssignedId + "']").attr('selected', 'selected').trigger('change.select2'),

                  $('#City').val(data.city)
              var s2 = $('#TagName').select2({
                  placeholder: "Please Enter Suggested Tags",
                  tags: true
              });

              if (data.tagNames) {
                  var attach = data.tagNames;

                  $.each(attach.split(/\,/), function (i, val) {
                      // Create a DOM Option and pre-select by default
                      var newOption = new Option(val, val);
                      // Append it to the select
                      $('#TagName').append(newOption).trigger('change');
                      $('#TagName').val(val).trigger('change');

                      s2.val(attach.split(/\,/)).trigger("change");
                  });
              }

              setTimeout(() => {
                  $('#team option[value="' + data.teamId + '"]').attr('selected', 'selected').trigger('change.select2');
              }, 100);

            }
        });
    }

}



function bindeditcontact() {

    var _docid = getUrlVars()["keyid"]
    bindcompanynames();
    binduserswithteams()
    if (_docid) {

        $.ajax({
            url: 'fbpartners/contactsdetails?keyid=' + _docid,
            type: "get",
            success: function (data) {
                bindfinteambyforlead(data.AssignedEmail);
                getcontactleads(data.phone)
                getcontactcompany(data.company)
                // $("#ldAssigned option:contains('" + data.Assigned + "')").attr('selected', 'selected').trigger('change.select2'),
                $("#ldAssigned option[value='" + data.AssignedEmail + '|' + data.AssignedId + "']").attr('selected', 'selected').trigger('change.select2'),

                    $('#Email').val(data.email),
                    $('#Name').val(data.name),
                    $('#Phone').val(data.phone),
                    $('#City').val(data.city),

                    $("#Company option:contains('" + data.company + "')").attr('selected', true).trigger('change.select2'),

                    $('#Address').val(data.Address),
                    // $('#team option:selected').text(data.team),

                    $('#position').val(data.position)
                if (data.logopath != null) {
                    //alert("its not null");
                    $(".imgarea").empty();
                    $(".imgarea").append('<div class="audio"><div class="addoc"><a href="' + data.logopath + '"><img src="static/' + data.logopath + '"></a></div></div>')
                }
                var s2 = $('#TagName').select2({
                    placeholder: "Please Enter Suggested Tags",
                    tags: true
                });
                if (data.tagNames) {
                    var attach = data.tagNames;
                    $.each(attach.split(/\,/), function (i, val) {
                        // Create a DOM Option and pre-select by default
                        var newOption = new Option(val, val);
                        // Append it to the select
                        $('#TagName').append(newOption).trigger('change');
                        $('#TagName').val(val).trigger('change');

                        s2.val(attach.split(/\,/)).trigger("change");
                    });
                }
                setTimeout(() => {
                    $('#team option[value="' + data.teamId + '"]').attr('selected', 'selected').trigger('change.select2');
                }, 100);
            }
        });
    }

}

function bindcontactdetails(number) {

    // var _docid = getUrlVars()["keyid"]
    // bindcompanynames();
    // if (_docid) {

        $.ajax({
            url: 'fbpartners/bindcontactsdetails?number=' + number,
            type: "get",
            success: function (data) {

                     if(data != ''){
               
                    $('#Contact').val(data.name),
                    $('#email').val(data.email),
                    $('#city').val(data.city)
                     }


                   
                   
                   
               
            }
        });
    }

// ----------// ------------Telephonys Start---------------
function gettranscript() {
    $('.landingtasks').empty();
    var _url = '/fbpartners/gettranscript';

    $.ajax({
        url: _url,
        type: "get",
        success: function (data) {
            if (!$.trim(data)) {
                var tile1 = '<img src="static/images/fbpartners/newtask.svg" width="100%"></img>'
                $('.landingtasks').prepend(tile1);
            } else {

                var tile = '<tr>' +
                    '<td class="tbtwobls">' + data.transcript + '</td>' +
                    '</tr>'

                $('.landingtasks').prepend(tile);
                $('.form_typescript').append(data.transcript);

            }
        },
        error: function () {
            $(location).attr('href', '/')
        }
    });
}

function getteleponyusers() {

    var _url = '/fbpartners/getteleponyusers';
    $('.announsmnt>.row100.body ,.announsmnt>img').remove();
    $.ajax({
        url: _url,
        type: "get",
        success: function (data) {
            // console.log(data);
            if (!$.trim(data)) {
                var tile1 = '<img src="static/images/fbpartners/Announcements.svg"></img>'
                $('.announsmnt').append(tile1);
            } else {
                for (var d in data) {
                    var tile = `<div class="row row100 body">
                    <div class="col-sm-1 cell100 column6">${parseInt(d)+1}</div>
                    <div class="col-sm-3 cell100 column1">` + add3Dots(data[d].name, '40') + `</div>
                    <div class="col-sm-2 cell100 column2">${data[d].phone}</div>
                    <div class="col-sm-3 cell100 column3">${data[d].email}</div>
                    <div class="col-sm-2 cell100 column4">${dateformate(data[d].PLCT)? dateformate(data[d].PLCT):''}</div>
                    <div class="col-sm-1 cell100 column6">
                        <div class="example_d tb_img" data-toggle="modal" onclick="getteleponyuserdetails(\'${data[d].id}\');"
                            data-target="#myModal"><img
                                src="static/images/fbpartners/phone.svg" alt="whatsapp">
                        </div>
                    </div>
                </div>`
                    $('.announsmnt').append(tile);
                }
            }
        }
    });
}

function getteleponyuserdetails(uid) {
    if (uid) {
        $('.userul_form').empty();
        $.ajax({
            url: '/fbpartners/getteleponyuserdetails?keyid=' + uid,
            type: "get",
            success: function (data) {
                // console.log(data);
                if (!$.trim(data)) {

                } else {
                    var ul = `<li>Name: <span>${data.name}</span></li>
                    <li>Contact No: <span>${data.phone}</span></li>
                    <li>Email: <span>${data.email}</span></li>`
                    $('.userul_form').append(ul);

                    $('#form2 .cancelbtn').attr('onclick', 'create_tel_financelead(\'' + data.id + '\')')
                    $('#form3 .cancelbtn').attr('onclick', 'create_tel_financetask(\'' + data.id + '\')')
                    $('#form4 .cancelbtn').attr('onclick', 'create_tel_noaction(\'' + data.id + '\')')
                }
            }
        });
    }
}

function bindedittelphony() {
    $.ajax({
        // url: 'fbpartners/telphonydetails?keyid=' + _docid,
        url: 'fbpartners/gettelphonys',
        type: "get",
        success: function (data) {
            $('#mini_interval option[value="' + data.mini_interval + '"]').attr('selected', true).trigger('change');
            $('#calls_per_day').val(data.No_of_calls_per_day);
            $('#Filter option[value="' + data.filter + '"]').attr('selected', true).trigger('change');
            $('#Transcript').val(data.transcript);
            $('#save').attr('onclick', 'Createtelephonys(\'' + data.id + '\')');
            $('#delete').attr('onclick', 'deletetelephonys(\'' + data.id + '\')');
        }
    });
}

function searchtelcontacts() {
    var type = $('#type option:selected').val();
    if ($.trim(type)) {
        var name = $('#' + type + ' option:Selected').toArray().map(item => item.value).join();
        if ($.trim(name)) {
            $('.announsmnt>.row100.body ,.announsmnt>img').remove();

            var _url = '/fbpartners/searchtelcontacts';
            $.ajax({
                url: _url,
                type: "post",
                data: JSON.stringify({
                    filter: {
                        type: type,
                        name: name
                    }
                }),
                contentType: "application/json; charset=utf-8",
                success: function (data) {

                    $("#search").modal('hide');

                    if (!$.trim(data)) {
                        var tile1 = '<img src="static/images/fbpartners/Announcements.svg"></img>'
                        $('.announsmnt').append(tile1);
                    } else {
                        for (var d in data) {
                            var tile = `<div class="row row100 body">
                            <div class="col-sm-1 cell100 column6">${parseInt(d)+1}</div>
                            <div class="col-sm-3 cell100 column1">` + add3Dots(data[d].name, '40') + `</div>
                            <div class="col-sm-2 cell100 column2">${data[d].phone}</div>
                            <div class="col-sm-3 cell100 column3">${data[d].email}</div>
                            <div class="col-sm-2 cell100 column4">${dateformate(data[d].PLCT)? dateformate(data[d].PLCT):''}</div>
                            <div class="col-sm-1 cell100 column6">
                                <div class="example_d tb_img" data-toggle="modal" onclick="getteleponyuserdetails(\'${data[d].id}\');"
                                    data-target="#myModal"><img
                                        src="static/images/fbpartners/phone.svg" alt="whatsapp">
                                </div>
                            </div>
                        </div>`
                            $('.announsmnt').append(tile);
                        }
                    }
                },
                error: function (err) {
                    console.error(err);

                    // $(location).attr('href', '/');
                }
            });
        } else {
            alert('Please Select')
        }
    } else {
        alert('Please Select Type');
    }
}

function bindloantypenames() {
    $('#Loan-Type').empty().append('<option value="">Please Select Loan Type</option>')
    $.ajax({
        url: 'fbpartnersfinance/loantypenames',
        type: "get",
        success: function (data) {
            data.forEach(function (ele) {
                $('#Loan-Type').append('<option value="'+ ele._id +'">' + ele.name + '</option>');
            })
        },
        error: function () {
            //console.log('error');
        }
    });
}

function gettelecalleroffer() {
    $('#Loan-Type').empty().append('<option value="">Please Select Loan Type</option>');
    $('.owl-carousel').empty();
    $.ajax({
        url: '/fbpartners/telecalleroffer',
        type: "get",
        success: function (data) {
            if (!$.trim(data)) {} else {
             
                for (var d in data) {
                    var tile = `<div class="offer_tile">
                    <div class="offr_dscnt">
                        <span>18%</span><small class="ri">OFF</small></div>
                    <div class="offr_brand">
                        <img src="/fbpartners/page/viewdoc?docname=${data[d].attactments}&page=Banner" alt="amazon">
                    </div>
                    <p>${data[d].description}</p>
                    <a href="seedetails?keyid=${data[d].id}">See all offers</a>
                </div>
            </div>`

                    $('.owl-carousel').append(tile);
                }

                owlCarousel();
            }
        },
        error: function () {
            //console.log('error');
        }
    });
}
function getteamsbytelecalerid() {
    var _url = '/fbpartners/getteamsbytelecalerid';
    $('#tel_teams').empty().append('<option value="" >Please Select Team</option>');
    $.ajax({
        type: "get",
        url: _url,
        success: function (data) {
                console.log(data);
                if (!$.trim(data)) {

            } else {
                data.forEach(function (ele) {
                    $('#tel_teams').append('<option value="' + ele.id + '">' + ele.teamname + '</option>');
                })
            }
        },
        error:function(err){
            console.log(err);
        }
    });
}

function getmyteltask() {
    var _url = '/fbpartnersfinance/getmyfintask';
    $('.carousel-inner').empty();
    $('.emptyslider').hide();
    $.ajax({
        url: _url,
        type: "get",
        success: function (data) {
            if (!$.trim(data)) {
                var tile1 = `<div class="item Active leadsemptytls">                                                                     
                                <div class="testmo">         
                                    <div class="col-md-4">
                                            <div class="col-md-12 col-xs-12 ourservices padsmars"><div class="newleadsd"><img src="static/images/fbpartners/sliderempty.svg"></div></div>
                                    </div>             
                                    <div class="col-md-4">
                                            <div class="col-md-12 col-xs-12 ourservices padsmars"><div class="newleadsd"><img src="static/images/fbpartners/sliderempty.svg"></div></div>
                                        </div>
                                        
                                    <div class="col-md-4">
                                            <div class="col-md-12 col-xs-12 ourservices padsmars"><div class="newleadsd"><img src="static/images/fbpartners/sliderempty.svg"></div></div></div><div class="col-md-4 navi">
                                    </div>
                                </div>                                            
                            </div>`
                $('.emptyslider').prepend(tile1).show();
            } else {
                var i = 0;

                var tile = `<div class="item active"><div class="testmo">`
                for (var d in data) {
                    var enddate = ''
                    if (data[d].enddate) {
                        enddate = dateformate(data[d].enddate)
                    }

                    clntile = 1
                    i++;
                    tile = tile + `<div class="col-lg-4 col-md-4 col-sm-12 searchtask">
                        <div class="comonebox">
                        <a href="/taskaction?keyid=` + data[d]._id + `">
                            <div class="boonones">
                            <div class="col-md-12 col-xs-12 padsmars personalb">
                                <h2>` + data[d].type + `</h2>
                            </div>
                            <div class="digitalsmarkng">
                                <h1> <i class="fa fa-pencil-square-o subjecticons"></i> ` + data[d].subject + `</h1>
                                <h6><i class="fa fa-tasks ptasksss priorityicos"></i> ` + data[d].priority + `</h6>
                                <p>` + add3Dots(data[d].description, `180`) + `</p>
                                <h4>
                                    <i class="fa fa-calendar-check-o taskdatsd"></i>` + dateformate(data[d].startdate) + `
                                    <span class="taskenddats">
                                      <i class="fa fa-calendar-times-o taskenddatsd"></i>` + enddate + `
                                    </span>
                                </h4>                                  
                            </div>
                            <div class="col-md-12 padsmars">
                            <div class="col-md-6 col-xs-12 padsmars">   
                                <h6></h6>
                            </div>  
                            
                            </div>
                            </div>
                            </a>
                        </div>  
                    </div>`
                    if (i >= 3) {
                        //console.log(i)
                        clntile = 0;
                        i = 0;
                        tile = tile + `</div></div>`
                        $('.carousel-inner').prepend(tile);
                        tile = `<div class="item "><div class="testmo">`
                    }
                }
                if (clntile == 1) {
                    tile = tile + `</div></div>`
                    $('.carousel-inner').prepend(tile);
                }
            }
        }
    });
}
// ------------Telephonys End---------------
//--------------------------bulk contacts start-----------------------
function getbulkcontacts() {
    //$('.allmanpads').empty();
     var _url = '/fbpartners/getbulkcontacts';
     $.ajax({
         url: _url,
         type: "get",
         success: function (data) {
             //var data = res.docs;
             if (!$.trim(data)) {
                 var tileempty = '<div class="empytre">' +
                     '<div class="oneemptys">' +
                     '<div class="col-md-12 listcontras">' +
                     '<div class="recordnew hgreen contact-panel">' +
                     '<a href="">' +
                     '<div class="panel-body">' +
                     '<h3>' + 'Let' + 's' + ' Add New Contacts' + '</h3>' +
                     '<img alt="logo" src="static/images/fbpartners/contacts.svg" style="width: 250px !important; height:100% !important;">'
 
                     +
                     '</div>'
                 $('.contactslist').appendTo(tileempty);
             } else {
                 // console.log(data)
                 for (var d in data) {
                     var tile = `<a href="bulkcontacts?keyid=${data[d].id}" onclick="return false">  <div class="list_item">
                     <div class="listitem_view"> 
                         <div class="listitem_profile">
                         <div class="prfle_ltr prfle_ltr${d}"></div>
                         <img class="compnyoprofil${d}" src="">
                             <figcaption class="listitem_details">
                                 <h4>${data[d].name}</h4>
                                 <span> ${data[d].bankname}</span>
                             </figcaption>
                         </div>
                         <p class="list_city">${(data[d].city?data[d].city:'N/A')}</p>
                         <div class="list_contact">
                         <p title="${ data[d].email ? data[d].email:'N/A'}" class="list_email">${add3Dots(data[d].email,"25")}</p>
                         <p class="list_phone">${data[d].phone}</p></div>
                      </div>
                 </div></a>`
                 $('.contactslist').prepend(tile);
     if(data[d].logopath){  
                     $(".prfle_ltr"+d).hide()
                    $('.compnyoprofil'+d).attr('src', 'static/'+data[d].logopath);
      }else{
                     $(".compnyoprofil"+d).hide()
                     $(".prfle_ltr"+d).text( data[d].name.charAt(0) + `` + data[d].name.charAt(1) )
                 }
                     if (data[d].logopath != null) {
                         $(".ctile  .conssue").css("display", "none");
                         $(".ctile .usrprofilepic").css("display", "block");
                     } else {
                         $(".ctile  .usrprofilepic").css("display", "none");
                         $(".ctile  .conssue").css("display", "block");
                     }
                     $('.ctile').removeClass('ctile')
                 }
             }
         },
         error: function (err) {
             console.error(err);
 
             // $(location).attr('href', '/');
         }
     });
 }

// searchbulkcontact
function searchbulkcontact() {
    var name = $('.searchform').val();
     if ($.trim(name) && name.length < 3) {
       // $('.allmanpads').empty();
        var _url = '/fbpartners/searchbulkcontact';
        $.ajax({
            url: _url,
            type: "post",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
               // var data = res.docs;
                if (!$.trim(data)) {
                    var tileempty = '<div class="empytre">' +
                        '<div class="oneemptys">' +
                        '<div class="col-md-12 listcontras">' +
                        '<div class="recordnew hgreen contact-panel">' +
                        '<a href="">' +
                        '<div class="panel-body">' +
                        '<h3>' + 'Let' + 's' + ' Add New Contacts' + '</h3>' +
                        '<img alt="logo" src="static/images/fbpartners/contacts.svg" style="width: 250px !important; height:100% !important;">' +
                        '</div>'
                    $('.contactslist').appendTo(tileempty);
                } else {
                    for (var d in data) {
                        var tile = `<a href="bulkcontacts?keyid=${data[d].id}" onclick="return false">  <div class="list_item">
                    <div class="listitem_view">
                        
                        <div class="listitem_profile">
                        <div class="prfle_ltr prfle_ltr${d}"></div>


                        <img class="compnyoprofil${d}" src="">
                        
                            <figcaption class="listitem_details">
                                <h4>${data[d].name}</h4>
                                <span> ${data[d].bankname}</span>
                            </figcaption>
                        </div>
                        <p class="list_city">${(data[d].city?data[d].city:'N/A')}</p>
                        <p title="${ data[d].email ? data[d].email:'N/A'}" class="list_email">${add3Dots(data[d].email,"25")}</p>
                        <p class="list_phone">${data[d].phone}</p>
                        
                     </div>
                </div></a>`

                        $('.contactslist').prepend(tile);  
    if(data[d].logopath){  
                            $(".prfle_ltr"+d).hide()
                           $('.compnyoprofil'+d).attr('src', 'static/'+data[d].logopath);
             }else{
                            $(".compnyoprofil"+d).hide()
                            $(".prfle_ltr"+d).text( data[d].name.charAt(0) + `` + data[d].name.charAt(1) )
                        }
                        if (data[d].logopath != null) {
                            $(".ctile  .conssue").css("display", "none");
                            $(".ctile .usrprofilepic").css("display", "block");
                        } else {
                            $(".ctile  .usrprofilepic").css("display", "none");
                            $(".ctile  .conssue").css("display", "block");
                        }
                        $('.ctile').removeClass('ctile')
                    }

                    //$('ul.pagination').empty();
                }
            },
            error: function (err) {
                console.error(err);

                // $(location).attr('href', '/');
            }
        });
    } else {
        getbulkcontacts();
    }
}
//--------------------------bulk contacts end-----------------------


// -----------Activities Type Start--------------------
function getactivitytypes() {
    $('.activitytype').empty();
    var _url = '/fbpartners/getactivitytypes';
    $('tbody').empty();
    $.ajax({
        url: _url,
        type: "get",
        success: function (data) {

            if (!$.trim(data)) {
                var tileempty = '<div class="empytre">' +
                    '<div class="oneemptys">' +
                    '<div class="col-md-12 listcontras">' +
                    '<div class="recordnew hgreen contact-panel">' +
                    '<a href="">' +
                    '<div class="panel-body">' +
                    '<h3>' + 'Let' + 's' + ' Add New Api' + '</h3>' +
                    '<img alt="logo" src="static/images/fbpartners/api.svg" style="width: 250px !important; height:100% !important;">'

                    +
                    '</div>'
                $('.activitytype').prepend(tileempty);
            } else {
                data.forEach((ele, i) => {
                    var tile = `<a onclick="$(location).attr('href','add-activitytypes?keyid=${ele.id}')">	<div class="list_item">
                    <div class="listitem_view">
                        
                        <div class="listitem_profile">
                        <p class="list_img">  ${ele.path ? '<i class="' + ele.path + '"></i>' : ''}</p>


                            <figcaption class="listitem_details">
                                <h4>${ele.name}</h4>
                            </figcaption>
                        </div>
                        <p class="list_email">${ele.desc}</p>
                        
                     </div>
                </div></a>`
                    $('.activitytype').append(tile);
                });
            }
        },
        error: function (err) {
            $(location).attr('href', '/');
        }
    });
}

function bindeditactivitytypes() {
    var _docid = getUrlVars()['keyid'];
    if (_docid) {
        $.ajax({
            type: "get",
            url: "/fbpartners/bindeditactivitytypes?keyid=" + _docid,
            success: function (data) {
                $('#name').val(data.activitiestype[0].name);
                $('#description').val(data.activitiestype[0].description);
                $('#logopath option[value="' + data.activitiestype[0].logopath + '"]').attr('selected', true).trigger('change');
                $('#colorcode').val(data.activitiestype[0].colorcode).css("background","#"+data.activitiestype[0].colorcode);
                // if (data.activitiestype[0].logopath != null) {
                //     $(".imgarea").empty();
                //     $(".imgarea").append('<div class="audio"><div class="addoc"><a href="' + data.activitiestype[0].logopath + '"><img src="static/' + data.activitiestype[0].logopath + '"></a></div></div>')
                // }
            }
        });
    }
}
function bindactivitytypes() {
    var _url = '/fbpartners/getactivitytypes';
    $('#activitytype').empty().append('<option value="">Please Select Activity Type</option>')
    $.ajax({
        url: _url,
        type: "get",
        success: function (data) {
          
            if (!$.trim(data)) { } else {
                for (var d in data) {
                    $('#activitytype').append('<option   data-colorcode="'+(data[d].colorcode?data[d].colorcode:"808080")+'" value="' + data[d].id + '|' + data[d].path + '">' + data[d].name + '</option>')
                }
            }
        }
    });
}
// -----------Activities Type End--------------------
// -----------Activity Start--------------------
function getactivity() {
    $('.allmanpads').empty();
    var _url = '/fbpartners/getactivity';

    $.ajax({
        url: _url,
        type: "get",
        success: function (data) {

            if (!$.trim(data)) {
                var tileempty = '<div class="empytre">' +
                    '<div class="oneemptys">' +
                    '<div class="col-md-12 listcontras">' +
                    '<div class="recordnew hgreen contact-panel">' +
                    '<a href="">' +
                    '<div class="panel-body">' +
                    '<h3>' + 'Let' + 's' + ' Add New Api' + '</h3>' +
                    '<img alt="logo" src="static/images/fbpartners/api.svg" style="width: 250px !important; height:100% !important;">'

                    +
                    '</div>'
                $('.allmanpads').prepend(tileempty);
            } else {
                for (var d in data) {
                    var tile = `<div class="col-lg-4 col-md-4 col-sm-12 ourservices">
                        <a href="/add-activity?keyid=${data[d].id}">
                        <div class="ncontijw">
                                <div class="conboxmains">
                                    <div class="col-lg-12 col-md-12 col-sm-12 padsmars">
                                        <div class="col-lg-12 col-md-12 col-sm-12 padsmars">
                                            <h2>${data[d].name}</h2>
                                        </div>
                                        <div class="col-md-12 col-xs-12 padsmars newcontur">
                                        </div>
                                        <div class="col-md-12 col-xs-12 padsmars">
                                        <h4>${data[d].description}</h4>
                                        </div>
                                    </div>
                                    <div class="col-md-12 col-xs-12 padsmars newcontur"> 
                                    <div class="col-md-12 col-xs-12 padsmars lonamounts">
                                        <div class="col-md-4 col-sm-4 padsmars">
                                            <h6>Type</h6>
                                        </div>
                                        <div class="col-md-8 col-sm-8 padsmars nrifewq">
                                            <h6 class="compemailsd">${data[d].type}</h6>
                                        </div>
                                    </div>
                                </div>
                                </div>
                            </div>
                    </div>
                    </a>
                </div>`

                    $('.allmanpads').prepend(tile);
                    if (data[d].logopath != null) {
                        $(".ctile  .conssue").css("display", "none");
                        $(".ctile .usrprofilepic").css("display", "block");
                    } else {
                        $(".ctile  .usrprofilepic").css("display", "none");
                        $(".ctile  .conssue").css("display", "block");
                    }
                    $('.ctile').removeClass('ctile')
                }
            }
        },
        error: function (err) {
            $(location).attr('href', '/');
        }
    });
}

function bindeditactivity() {
    var _docid = getUrlVars()['keyid'];
    if (_docid) {
        $.ajax({
            type: "get",
            url: "/fbpartners/bindeditactivity?keyid=" + _docid,
            success: function (data) {
                $('#name').val(data.name);
                $('#description').val(data.description);
                $('#time').val(data.time);
                $('#activitytype option[value="' + data.relationshipId + '"]').attr('selected', true).trigger('change');
            }
        });
    }
}

function getcalender_activity() {
    var _url = '/fbpartners/getcurrentactivity';
    $('#activity').empty();

    $.ajax({
        type: "get",
        url: _url,
        success: function (data) {
          
            if (!$.trim(data)) { } else {
                for (var d in data) {
                    mno = moment(data[d]._id).format('MMMM');
                    $('.fixed_name h5').text(mno);
                    var tile = `<div class="row cldr_list ">
                        <div class="col-lg-2 col-md-2 col-sm-12 navi side_date">
                            <span>${moment(data[d]._id).format('ddd')}</span>
                            <h4>${moment(data[d]._id).format('D')}</h4>
                        </div>
                        <div class="col-lg-10 col-md-10 col-sm-12 navi clndr_contnt">
                            <ul class="cldnr_ul" id="ul${d}">
                               
                            </ul>
                        </div>
                    </div>`
                    $('#activity').append(tile);
                    for (var a in data[d].info) {
                        fa = `<i class="${data[d].info[a].relationshipId.split('|')[1]}"></i>`;

                        li = `<li style="background-color:#" class="${data[d].info[a].type}"><small>${moment(data[d].info[a].date).format("LT")}</small>
                        <h5 class="desc" data-toggle="popover" data-placement="top"
                        data-content='<br>
                        
                        <p>${data[d].info[a].name}</p>
                        <br>
                        '><span style="border-left: 2px solid ${data[d].info[a].colorcode? "#"+data[d].info[a].colorcode:"red"};height: 20px;margin-right:6px" class="vl"></span>${fa}
                        ${data[d].info[a].name}</h5><span>${data[d].info[a].time}</span>
                    </li>`
                        $('#ul' + d + '').append(li);
                        $('.desc').on('click', function (e) {
                            e.preventDefault();
                            e.stopPropagation();
                            $('.desc').not(this).popover('hide');
                            var title = 'Description';

                            $(this).popover({
                                html: true,
                                title: title,
                                // content: content,
                                placement: 'top',
                                template: '<div class="popover" role="tooltip" style="width:320px;">' +
                                    '<div class="arrow"></div>' +
                                    '<h3 class="popover-title"></h3>' +
                                    '<div class="popover-content"></div>' +
                                    '</div>'
                            }).popover('show');


                        });
                    }

                }
            }
        }

    });
}
// activitytypedate
function activitytypedate() {
    if ($('#sd').val() != '' && $('#ed').val() != '') {
        var _url = '/fbpartners/getactivitybydate?sd=' + $('#sd').val() + '&ed=' + $('#ed').val();
        $('.activity').remove();

        $.ajax({
            type: "get",
            url: _url,
            success: function (data) {
                // console.log(data);
                if (!$.trim(data)) { } else {
                    for (var d in data) {
                        mno = moment(data[d]._id).format('MMMM');
    
                        $('.calendar>.container_fluid>.row').append(`<div class="col-lg-12 col-md-12 col-sm-12 cldr_inner activity" id="activity${d}">
                                
                            <div class="fixed_name"><h5>${mno}</h5></div>
                        </div>`);
                        // console.log(d, ' - ', data[d].info);
    
                        var grouped = _.mapObject(_.groupBy(data[d].info, 'day'),
                            clist => clist.map(days => _.omit(days, 'day')));
    
                        // console.log('grouped - ', grouped);
                        $.each(grouped, function (key, value) {
                            var D = moment(value[0].date).format('D');
                            var tile = `<div class="row cldr_list list${key}">
                            <div class="col-lg-2 col-md-2 col-sm-12 navi side_date">
                                <span>${moment(value[0].date).format('ddd')}</span>
                                <h4>${D}</h4>
                            </div>
                            <div class="col-lg-10 col-md-10 col-sm-12 navi clndr_contnt">
                                <ul class="cldnr_ul" id="ul${D}">
                                
                                </ul>
                            </div>
                        </div>`
                            $('#activity' + d + '').append(tile);
                            for (var a in value) {
                                fa = `<i class="${value[a].relationshipId.split('|')[1]}"></i>`;
    
                                li = `<li class="${value[a].type}">
                                        <small>${moment(value[a].date).format("LT")}</small>
                                        <h5 class="desc" data-toggle="popover" data-placement="top" 
                                        data-content='<br><p>${value[a].name}</p><br>'><span style="border-left: 2px solid ${data[d].info[a].colorcode? "#"+data[d].info[a].colorcode:"red"};height: 20px;margin-right:6px" class="vl"></span>${fa} ${value[a].name}
                                        </h5><span>${value[a].time}</span>
                                        </li>`
    
                                $('#activity' + d + '').find('.list' + key + ' #ul' + D).append(li);
    
                                $('.desc').on('click', function (e) {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    $('.desc').not(this).popover('hide');
    
                                    $(this).popover({
                                        html: true,
                                        title: 'Description',
                                        placement: 'top',
                                        template: '<div class="popover" role="tooltip" style="width:320px;">' +
                                            '<div class="arrow"></div>' +
                                            '<h3 class="popover-title"></h3>' +
                                            '<div class="popover-content"></div>' +
                                            '</div>'
                                    }).popover('show');
                                });
                            }
    
                        });
                    }
                }
            }
        });
    } else {
        alert('activitytypedate')
    }
}

function activitybyfilter(f) {
    var _url = '/fbpartners/getactivitybyfilter?filter=' + f;
    $('.activity').remove();

    $.ajax({
        type: "get",
        url: _url,
        success: function (data) {
       
            if (!$.trim(data)) { } else {
                for (var d in data) {
                    mno = moment(data[d]._id).format('MMMM');

                    $('.calendar>.container_fluid>.row').append(`<div class="col-lg-12 col-md-12 col-sm-12 cldr_inner activity" id="activity${d}">
                            
                        <div class="fixed_name"><h5>${mno}</h5></div>
                    </div>`);
                

                    var grouped = _.mapObject(_.groupBy(data[d].info, 'day'),
                        clist => clist.map(days => _.omit(days, 'day')));

                    // console.log('grouped - ', grouped);
                    $.each(grouped, function (key, value) {
                        var D = moment(value[0].date).format('D');
                        var tile = `<div class="row cldr_list list${key}">
                        <div class="col-lg-2 col-md-2 col-sm-12 navi side_date">
                            <span>${moment(value[0].date).format('ddd')}</span>
                            <h4>${D}</h4>
                        </div>
                        <div class="col-lg-10 col-md-10 col-sm-12 navi clndr_contnt">
                            <ul class="cldnr_ul" id="ul${D}">
                            
                            </ul>
                        </div>
                    </div>`
                        $('#activity' + d + '').append(tile);
                        for (var a in value) {
                            fa = `<i class="${value[a].relationshipId.split('|')[1]}"></i>`;

                            li = `<li class="${value[a].type}">
                                    <small>${moment(value[a].date).format("LT")}</small>
                                    <h5 class="desc" data-toggle="popover" data-placement="top" 
                                    data-content='<br><p>${value[a].name}</p><br>'><span style="border-left: 2px solid ${data[d].info[a].colorcode? "#"+data[d].info[a].colorcode:"red"};height: 20px;margin-right:6px" class="vl"></span>${fa} ${value[a].name}
                                    </h5><span>${value[a].time}</span>
                                    </li>`

                            $('#activity' + d + '').find('.list' + key + ' #ul' + D).append(li);

                            $('.desc').on('click', function (e) {
                                e.preventDefault();
                                e.stopPropagation();
                                $('.desc').not(this).popover('hide');

                                $(this).popover({
                                    html: true,
                                    title: 'Description',
                                    placement: 'top',
                                    template: '<div class="popover" role="tooltip" style="width:320px;">' +
                                        '<div class="arrow"></div>' +
                                        '<h3 class="popover-title"></h3>' +
                                        '<div class="popover-content"></div>' +
                                        '</div>'
                                }).popover('show');
                            });
                        }

                    });
                }
            }
        }
    });
}
// -----------Activity End--------------------
// -----------list start--------------------
function showallList() {//csateesh
    var _url = '/fbpartners/getlist';
    $('.table tbody').empty();
    $.ajax({
        url: _url,
        type: "get",
        success: function (data) {
            if (!$.trim(data)) {
                var tileempty = `<div class="empytre">
                <div class="oneemptys">
                <div class="col-md-12 listcontras">
                <div class="recordnew hgreen contact-panel">
                <a href="">
                <div class="panel-body">
                <h3> Let's add new Lists </h3>
                <img alt="logo" src="static/images/fbpartners/emptylist.svg" style="width: 250px !important; height:100% !important;">
                </div>`

                $('.listdeat').prepend(tileempty);
            } else {
                var a
                for (var d in data) {
if(data[d].isgeneric==1){
    a= `<a href="add-list?keyid=${data[d].id}&&key=1">`
}else{
    a= `<a href="add-list?keyid=${data[d].id}">`
}
             var mydata=`<div style="background:#fff" class="col-md-12 col-lg-12 padmarse list_item ">
             ${a}
             <div class="col-md-3 col-lg-3 col-xs-12 listitem_profile">
             <figcaption class="listitem_details">
             <h4 style="margin: 0;">${data[d].name}</h4>
             </figcaption>
             </div>
             <div class="col-md-3 col-lg-3 col-xs-12 list_city">${data[d].type}</div>
             <div class="col-md-3 col-lg-3 col-xs-12 list_brwer">${data[d].value}</div>
             <div class="col-md-3 col-lg-3 col-xs-12 listitem_details">${data[d].description ? add3Dots(data[d].description, '30') : ''}</div>
             </a>
             </div>`
                   
                    $('.listdeat').prepend(mydata)
                }
            }
        },
        error: function (err) {
            console.log(err)
        }
    });
}

function bindeditlist() {
    var _id = getUrlVars()["keyid"];
    var keytype = getUrlVars()["key"];
    if (_id) {
        $.ajax({
            type: "get",
            url: "/fbpartners/bindeditlist?keyid=" + _id+"&&type="+keytype,
            success: function (data) {
                $('#type').val(data.type);
                $('.name').val(data.name);
                $('.value').val(data.value);
                $('.description').val(data.description);
               
                if (data.isgeneric == 1) {
                    $('#isgeneric').prop('checked', true)
            }
            }
        });
    }
}
// -----------list End--------------------
function getcompanys() {

    $('.companydeatles').empty();
    var _url = '/fbpartners/getcompanys';

    $.ajax({
        url: _url,
        type: "get",
        success: function (data) {
            data.reverse();
            if (!$.trim(data)) {
                var tileempty = '<div class="empytre">' +
                '<div class="oneemptys">' +
                '<div class="col-md-12 listcontras">' +
                '<div class="recordnew hgreen contact-panel">' +
                '<a href="">' +
                '<div class="panel-body">' +
                '<h3>' + 'Let' + 's' + ' add new company' + '</h3>' +
                '<img alt="logo" src="static/images/fbpartners/emptycompany.svg" style="width: 250px !important; height:100% !important;">'
        
                + '</div>'
                $('.companydeatles').append(tileempty);
             //$('.row.copnyboxb').append(tileempty);
            } else {              
                for (var d in data) {
                //     var tile = `<div class="list_item"><a href="/add-company?keyid=${data[d].id}"><div class="listitem_view company_view">
				// 							<div class="listitem_company"><h3>${data[d].name?add3Dots(data[d].name, '40'):"N/A"}</h3></div>
				// 							<div class=" list_city description"><h5 class="cmpny_loctn">${data[d].city ? add3Dots(data[d].city, '25'):"N/A"}</h5></div>
				// 							<div class="list_prson ccontact">${data[d].contact?data[d].contact:'N/A'}</div>
				// 							<p class="list_addrs cAddress">${data[d].Address?data[d].Address:"N/A"}
				// 		</p>
				// 							<div class="list_contact">
				// 							<div data-toggle="tooltip" data-placement="top" title="${data[d].email}" class="list_email">${data[d].email?add3Dots(data[d].email,"25"):"N/A"}</div>
				// 							<div class="list_phone">${data[d].phone?data[d].phone:'N/A'}</div></div>
				// 						</div>
                //                         </a>
				// 						</div>`
                //  $('.companydeatles').append(tile)
                var tile = `<div class="list_item"><a href="/add-company?keyid=${data[d].id}"><div class="listitem_view company_view">
                    <figcaption class="listitem_company">
                    <h4>${data[d].name?add3Dots(data[d].name, '40'):"N/A"}</h4>
                   <span>${data[d].entitytype?add3Dots(data[d].entitytype, '40'):"N/A"}</span>
                     </figcaption>
											<div class=" list_city description"><h5 class="cmpny_loctn">${data[d].city ? add3Dots(data[d].city, '25'):"N/A"}</h5></div>
											<div class="list_prson ccontact">${data[d].contact?data[d].contact:'N/A'}</div>
											<p class="list_addrs cAddress">${data[d].Address?data[d].Address:"N/A"}
						</p>
											<div class="list_contact">
											<div data-toggle="tooltip" data-placement="top" title="${data[d].email}" class="list_email">${data[d].email?add3Dots(data[d].email,"25"):"N/A"}</div>
											<div class="list_phone">${data[d].phone?data[d].phone:'N/A'}</div></div>
										</div>
                                        </a>
										</div>`
                 $('.companydeatles').append(tile)
                   
                }
            }
        },
        error: function () {
            $(location).attr('href', '/')
        }
    });
}
function getcontactcompany(name) {

    $('.contcompant').empty();
    var _url = '/fbpartners/getcontactcompany?name=' + name

    $.ajax({
        url: _url,
        type: "get",
        success: function (data) {

            if (!$.trim(data)) {
                var tileempty =`<img src="static/images/fbpartners/cons.svg" width="100%">`
                $('.contcompant').prepend(tileempty);
            } else {
                //data.toLowerCase();
                //lower(data)
                for (var d in data) {



                      var tile = `<div class="ncontijw">
												<a href="/add-company?keyid=` + data[d].id + `">
													<div class="conboxmains">
														<div class="col-md-12 padsmars">
															<div class="col-md-8 col-xs-8 padsmars">
																<h2>` + data[d].name +`</h2>
															</div>
														 
														<!-- <div class="col-md-12 col-xs-12 padsmars newcontur"></div> -->
													</div>
													<div class="col-md-12 col-xs-12 padsmars">
														<div class="alnewcor">
															<!-- <h3>No.56, Plot No, G1, Eden G R Living Spaces, 152, Aani St, Chinmaya Nagar, Virugambakkam, Chennai, Tamil Nadu 600092 - India</h3> -->
															<div class="col-md-12 col-xs-12 padsmars newcontur"></div><div class="col-md-12 col-xs-12 padsmars lonamounts"><div class="col-md-2 col-xs-2 padsmars"><h1><i class="fa fa-phone phonegrens"></i></h1><h1><i class="fa fa-envelope-o emailcs"></i></h1><h1><i class="fa fa-user-o contaupe"></i></h1></div><div class="col-md-10 col-xs-10 padsmars nrifewq"><h1>`+ data[d].phone+`</h1><h1 class="compemailsd">`+ data[d].email +`</h1><h1 class="wwvloeo">`+data[d].contact+`</h1>
															</div>
														</div>
															</div>
														</div>
													</div>
												</a>
											</div>`





                  


                    $('.contcompant').prepend(tile);
                }
            }
        },
        error: function () {
            $(location).attr('href', '/')
        }
    });
}


function getstakeholders() {

   
    $('.bindstakeholders').empty();
    var _docid = getUrlVars()["keyid"]
    var _url = '/fbpartnerlead/getdealerstakeholders?keyid=' + _docid;

    $.ajax({
        url: _url,
        type: "get",
        success: function (data) {

            if (!$.trim(data)) {
                var tileempty = '<div class="empytre">' +
                '<div class="oneemptys">' +
                '<div class="col-md-12 listcontras">' +
                '<div class="recordnew hgreen contact-panel">' +
                '<a href="">' +
                '<div class="panel-body">' +
                '<h3>' + 'Let' + 's' + ' add new company' + '</h3>' +
                '<img alt="logo" src="static/images/fbpartners/emptycompany.svg" style="width: 250px !important; height:100% !important;">'
        
                + '</div>'
               // $('.allmanpads').prepend(tileempty);
              
            } else {
                var rolearry =['admin','BH','cxo','NSM','ZSM','RSM','AM','ASM','SM','SC']
                var highroles=[];
                rolearry.forEach(function(el,i){ 
              
                    if(getCookie('dru6') === el){
                     
                       highroles.push(rolearry.slice(0,i+1))
                
                      
                      
                        
                    }
                    
                })
                
                data.stakeholders.forEach(function(el){
                    var count =1;
                    if(highroles[0].includes(el.stakeholderrole)){  
                        count =0;
                     
                    }

                    var tile = `<div class="temboxeson ctile">
                    <div class="onebormstem">

                    <div class="col-md-12 padsmars">`
                    if(count == 1){
                        tile =tile+ `<span onClick =deletestakeholders("`+ el.id +`")><i class="fa fa-trash-o deletebutton" aria-hidden="true"  ></i><span>`
                             }

                    tile =tile+ `<div class="col-md-3 col-xs-3 padsmars mytemsd">
                    <div class="usernamett" ">`+el.stakeholdername .charAt(0)+`</div>
                    <div class="usrprofilepic""><img src="static/images/fbpartners/users/`+el.logopath+`"></div>
                    </div>
                    <div class="col-md-9 col-xs-9 padsmars temsname">
                    <h2>`+el.stakeholdername +`</h2>
                    <h3>`+el.stakeholderrole +`</h3>
                    <div class="col-md-6 padsmars" style="">
                    <span>`+el.phone +`</span></div>
                   
                    <div class="col-md-6 padsmars" style="">
                    <span>`+el.stakeholderEmail +`</span></div>
                    </div>
                    
                    </div>

                   
                    
                    </div></div>`



                   


                    $('.bindstakeholders').prepend(tile);
                    if ( el.logopath && el.logopath !="undefined") {
                     
                        $(".ctile  .usernamett").css("display", "none");
                        $(".ctile .usrprofilepic").css("display", "block");

                    } else {

                        $(".ctile  .usrprofilepic").css("display", "none");
                        $(".ctile  .usrnamesltrs").css("display", "block");

                    }
                    $('.ctile').removeClass('ctile')




                   


                    //$('.bindstakeholders').prepend(tile);
                })
            }
        },
        error: function () {
            $(location).attr('href', '/')
        }
    });
}
function binduserswithteams() {
    $('#ldAssigned,#manager').empty().append('<option value="">Please Select User</option>');
    var t = getUrlVars()["keyid"];

    $.ajax({
        url: 'fbpartners/bindleadfinAssignedusers',
        type: "get",
        success: function (data) {

            data.forEach(function (ele) {

                    $('#ldAssigned').append('<option value="' + ele.email + '|' + ele.id + '">' + ele.name + '</option>');
                    $('#manager').append('<option value="' + ele.email + '|' + ele.id + '">' + ele.name + '</option>');
                    

                   
                $(".Assigned option:contains('" + unescape(getCookie('dru5')) + "')").attr('selected', true).trigger('change.select2');
               
          
            })
             
             
        },
        error: function () {
            //console.log('error');
        }
    });



}
function bindleadfinAssignedusers() {
    $('#ldAssigned').empty().append('<option value="">Please Select User</option>');
    var t = getUrlVars()["keyid"];
    $.ajax({
        url: 'fbpartners/bindleadfinAssignedusers',
        type: "get",
        success: function (data) {
            data.forEach(function (ele) {
                    $('#ldAssigned').append('<option value="' + ele.email + '|' + ele.id + '">' + ele.name + '</option>');                  
                $(".Assigned option:contains('" + unescape(getCookie('dru5')) + "')").attr('selected', true).trigger('change.select2');         
            })            
             if(t)
             {
                bindeditmydealeads();
             }
             else{
                 $(".Assigned option:contains('" + unescape(getCookie('dru5')) + "')").attr('selected', true).trigger('change.select2');
             }
        },
        error: function () {
            //console.log('error');
        }
    });
}
function bindeditleads() {
    var _docid = getUrlVars()["keyid"]
    bindproductnames();
    //var key2id = getUrlVars()["key2id"]
    var _url = 'fbpartners/leadsdetails?keyid=' + _docid;
    // $(".docdis").empty();
    $(".docdis,#Discussion .modal-body").empty();
    $('#inputmsg').val('');
    $('#inputmsg,#fininputmsg,#chat,.close,#uploadmsg,#chatupload,#attachements').removeAttr('disabled');
    bindleadstagedrop();
    // if (getCookie('dru6') === 'FinancialAdmin') {
    //     ////console.log("finance")
    //     _url = 'fbpartners/financeleadsdetails?keyid=' + _docid;
    //     $(".finhide").hide();
    //     bindfinancecompanynames(key2id);
    //     bindfinproductnames(key2id);

    //     $('#chat').attr('onclick', 'fbfinchat()');
    //     $('#chatupload').attr('onclick', 'fbfinchatupload()');
    // } else {
        bindcompanynames();
        //bindcontactnames();
       // bindusers();
        //bindleadAssignedusers();
        bindleadfinAssignedusers();
       // bindproductnames();       
        bindleadstagenames();
        bindcampaignnames();
        $('#chat').attr('onclick', 'fuserchat()');
        $('#chatupload').attr('onclick', 'fbuserchatupload()');
//}
    if (_docid) {
   
        //bindproduct_invoice();
        getstakeholders();
        $('.discretion').show();

        $.ajax({
            url: _url,
            type: "get",
            success: function (data) {
                if(data === 'Not authorised'){
                    alert('you are not authorized to view this deal');
                    $(location).attr('href', '/landingpage')


                }else{
                bindstagetimeline()
                //finold = data[0].financesummary;


                ////console.log(data);
               
                var options = data[0].leadequipments.split(',');



                options.forEach(function (e) {
                   
                    if(e !== ''){

                        $("#leadequipments option:contains('" + e + "')").attr('selected', true).trigger('change.select2')
                    }
                    }),
            
                    $("input[name='financerequired'][value=" + data[0].financerequired + "]").prop('checked', true),

                    $('#financialpartner option:selected').text(data[0].financialpartner),
                    $('#leadamount').val(data[0].leadamount),
                   
                    $('#leadname').val(data[0].leadname),
                    $("#leadscore option:contains('" + data[0].leadscore + "')").attr('selected', true).trigger('change.select2'),

                    $('#contactnumber').val(data[0].contactnumber),
                    $('#leadsummary').val(data[0].leadsummary),
                    $("#Company option:contains('" + data[0].company + "')").attr('selected', true).trigger('change.select2'),


                    $('#Contact').val(data[0].contact),
                    $('#email').val(data[0].contactEmail),
                    $('#city').val(data[0].contactcity),
                    $('#campaignname option[value="' + data[0].campaignnameId + '"').attr('selected', true).trigger('change'),
                    $('#refid').val(data[0].refid),
                    $('#assignedid').val(data[0].AssignedId),
                    //$('#leadstage option:selected').text(data[0].leadsstages),
                    //$('#leadstage').data('fastselect').setSelectedOption($('.singleSelect option[value='+ data[0].leadstage +']').get(0)), 

                    $("#ldAssigned option:contains('" + data[0].Assigned + "')").attr('selected', true).trigger('change.select2'),



                    $('#fdback').val(data[0].feedbacksummary),
                    $('#fnback').val(data[0].financesummary),




                    $("#leadstage option:contains('" + data[0].leadstage + "')").attr('selected', true).trigger('change.select2'),
                    // $('#leadstage option:selected').text(data[0].leadstage),
                    $('#ldstageold').val(data[0].leadstage)


                if (getCookie('dru6') === 'FinancialAdmin') {
                    for (var d in data[0].leaddocs) {
                        //console.log(data[0].leaddocs[d].docname),
                            $(".docdis").append('<tr><td class="ksidws">' + data[0].leaddocs[d].docname + '</td><td class="ksidws2"><a href="/fbpartners/viewfindoc?docname=' + data[0].leaddocs[d].docpath + '&key2id=' + key2id + '" class="fildownad"><i class="fa fa-download"></i></a></td></tr>')
                    }
                } else {
                    data[0].leaddocs.forEach(function (el) {
                        if (Array.isArray(el)) {
                            el = el[0];
                        }
                        ////console.log(data[0].leaddocs[d].docname), 
                        $(".docdis").append('<tr><td class="ksidws">' + el.docname + '</td><td class="ksidws2"><a href="/fbpartners/viewodoc?docname=' + el.docpath + '" class="fildownad"><i class="fa fa-download"></i></a></td></tr>')
                    })


                }


            }
        }
        });
    }
    
        else{
            $('.jsdfdfff .fa-newspaper-o,.jsdfdfff a').removeAttr('data-toggle data-target');
            $('#addinvoice .uploadlogo img,#contact #addinvoice .uploadlogo,.invoice-no,.toAddress,.fromaddress,#addinvoice table#invoiceproducts tbody').empty()
        }
   

}



function dealerleadfunc() {
    // bindleadusers();
     bindleadfinAssignedusers();
    // bindcampaignnames();
   //  bindleadstagedrop();
   bindleadstagenames()
   bindstagetimeline()
 
    // bindcompanynames();
     bindproductnames();
 }

 function displayleadselect(obj){

    var selval=$(obj).data('fbselctrl')
    
    var selval2= $(obj).attr('data-fbselectedval')
    
    $(obj).hide();
    var tid = $(obj).find('span').attr('id').substr(1)
$('#pt'+ tid).hide();
    var selvals=[];
    
    switch (selval) {
    
    case 'company':
    
    selvals=['email','id','name']
    
    binddropdown('fbpartners/getcompanynames','Company',selvals,selval2,1,1)
    $('#Company').attr('data-valid', 'required') 
    break;
    
    case 'campaign':
    
    selvals=['id','campaignname']
    
    binddropdown('fbpartnersfinance/getfinancecampaign','campaignname',selvals,selval2,2,2)
    
    break;
    
    case 'loantype':
    
    selvals=['_id','name']
    
    binddropdown('fbpartnersfinance/loantypenames','Loan-Type',selvals,selval2,2,2)
    
    break;
    
    case 'Assigned':
    
    selvals=['email','id','name']
    
    binddropdown('fbpartners/bindleadfinAssignedusers','ldAssigned',selvals,selval2,1,1)
    
    $('#pteam').parent().hide();
    
    var selvals2=['id','name']
    
    var teamval= $('#pteam').parent().attr('data-fbselectedval')
    
    var id= $('#pteam').parent().attr('data-fbemailforteam')
    
    binddropdown('/fbpartnersfinance/financeteamdetailsforlead?keyid=' + id,'team',selvals2,teamval,2,1)
    $('#ldAssigned, #team').attr('data-valid', 'required')
    break;
    
    case 'leadscore':
    
    $('#leadscore').select2()
    
    var _url = 'fbpartners/getleadscore'
    
    $.ajax({
    
    url: _url,
    
    type: "get",
    
    success: function (data) {
    
    data.leadscore.forEach(function(responce,i){
    
    $("#leadscore option:last").after($('<option value="'+responce.leadscore+'">'+responce.leadscore+'('+responce.description+')</option>'));
    
    })
    
    $("#leadscore option:contains('" + selval2+ "')").attr('selected', true).trigger('change.select2')
    
    }
    
    });
    
    break;
    
    case 'leadstage':
        $('#leadstage').empty()
    $('#leadstage').select2()
    $('#leadstage').attr('data-valid', 'required')
    
    $(obj).hide();
    
    if(localStorage.getItem('leadstages') == null){
    
    $.ajax({
    
    url: 'fbpartners/getleadstagenames',
 // url: 'fbpartners/getleadstagebyleadnames?keyid='+selval2,
      type: "get",
    
    success: function (dataa) {
    
    localStorage.setItem('leadstages', JSON.stringify(dataa));
    
    var data= JSON.parse(localStorage.getItem('leadstages'))
    var selectedstage=data.filter(leadstal=>leadstal.stagename==selval2 )
    if((selectedstage[0].nextleadstages)){
        var nextleadstages=(selectedstage[0].nextleadstages).split(",")

        var  selectedstage= data.filter((leadstal) => nextleadstages.includes(leadstal.stagename) || leadstal.stagename ==selval2)

        selectedstage.forEach(function (ele) {$('#leadstage').append('<option data-formid="'+ele.loanformid+'" value="' + ele.stagename + '">' + ele.stagename + '</option>');});
    }else{
        data.forEach(function (ele) {$('#leadstage').append('<option data-formid="'+ele.loanformid+'" value="' + ele.stagename + '">' + ele.stagename + '</option>');});
  
    }
    $("#leadstage option:contains('"+selval2+"')").attr('selected', true).trigger('change.select2');
    
    }
    
    })
    
    }else{
    
    var data= JSON.parse(localStorage.getItem('leadstages'))

    var selectedstage=data.filter(leadstal=>leadstal.stagename==selval2 )

    if(selectedstage[0].nextleadstages){
        var nextleadstages=(selectedstage[0].nextleadstages).split(",")
       
        var selectedstage=data.filter(leadstal=>leadstal.stagename==nextleadstages )
        var  selectedstage= data.filter((leadstal) => nextleadstages.includes(leadstal.stagename) || leadstal.stagename ==selval2)
    selectedstage.forEach(function (ele) {$('#leadstage').append('<option data-formid="'+ele.loanformid+'"  value="' + ele.stagename + '">' + ele.stagename + '</option>');});
    }else{
        data.forEach(function (ele) {$('#leadstage').append('<option data-formid="'+ele.loanformid+'" value="' + ele.stagename + '">' + ele.stagename + '</option>');});
 
    }
    $("#leadstage option:contains('" +selval2+ "')").attr('selected', true).trigger('change.select2')
    
    }
    
    break;
    
    case 'team':
    
    //$(obj).hide();
    
    //$('#team').select2()
    
    var id =$(obj).attr('data-fbemailforteam')
    
    selvals=['id','name']
    
    binddropdown('/fbpartnersfinance/financeteamdetailsforlead?keyid=' + id,'team',selvals,selval2,2,1)
    $('#team').attr('data-valid', 'required')
    break;
    case 'State':
        binddropdown('fbpartners/getalllistdrop?keyid=' + JSON.stringify(["State"]), 'State', selvals, selval2, 0, 0)
        $('#' + selval + '').show().attr('data-valid', 'required');
         break;
    case 'Zone':
        binddropdown('fbpartners/getalllistdrop?keyid=' + JSON.stringify(["Zone"]), 'Zone', selvals, selval2, 0, 0)
        $('#' + selval + '').show().attr('data-valid', 'required');
        break;
    
    }
    
    
    }
    function getalllistdrop(){
        var arry=[];
        $('[data-type]').each(function () {
            arry.push($(this).attr('data-key'))
        })
       
        return arry
    }
    function bindlistdrop(id) {
        $.ajax({
            url: 'fbpartners/getalllistdrop?keyid=' + JSON.stringify(getalllistdrop()),
            type: "get",
            success: function (data) {
                $('#' + id + ' [data-type]').each(function () {
                    var fdata = data.filter(x => x.type === $(this).attr('data-key'))
                    var thi = $(this);
                    thi.empty();
                    fdata.forEach(function (ele) {
                        thi.append('<option value="' + ele.value + '">' + ele.name + '</option>');
                    })
                })
            },
            error: function () {
                //console.log('error');
            }
        });
    }
    function binddropdown(_url, id, selvals, bindval, seltype, bindype) {
        $('#' + id).select2()
        $.ajax({
            url: _url,
            type: "get",
            success: function (data) {
                if (bindype == 0) {
                    $('#' + id + '').empty();
                    data.forEach(function (ele) {
                        $('#' + id + '').append('<option value="' + ele.value + '">' + ele.name + '</option>');
                    })
                } else {
                    data.forEach(function (ele) {
                        if (seltype === 1) {
                            $('#' + id).append('<option value="' + ele[selvals[0]] + '|' + ele[selvals[1]] + '">' + ele[selvals[2]] + '</option>');
                        } else {
                            $('#' + id).append('<option value="' + ele[selvals[0]] + '" >' + ele[selvals[1]] + '</option>');
                        }
                    })
                }
                if (bindype === 1) {
                    $("#" + id + " option:contains('" + bindval + "')").attr('selected', true).trigger('change.select2')
                } else {
                    $("#" + id + ' option[value="' + bindval + '"').attr('selected', true).trigger('change.select2')
                }
            }
        });
    }
function bindleadusers() {
    var t = getUrlVars()["keyid"]
    $('.finAssigned,.tAssigned,#ldAssigned').empty().append('<option value="">Please Select User</option>')
    $.ajax({
        url: 'fbpartners/getusers',
        type: "get",
        success: function (data) {
            data.forEach(function (ele) {
                if (ele.role !== 'admin') {
                    $('.finAssigned').append('<option value="' + ele.email + '|' + ele.id + '">' + ele.name + '</option>');
                    $('.tAssigned').append('<option value="' + ele.email + '">' + ele.name + '</option>');
                }
            })
            if (t) {
               // bindeditmydealeads();
            } else {
                $(".Assigned option:contains('" + unescape(getCookie('dru5')) + "')").attr('selected', true).trigger('change.select2');
            }
        },
        error: function () {
            //console.log('error');
        }
    });
}
function bindfinteambyforlead(id) {
    $('#team').empty().append('<option value="" >Please Select Team</option>');
    $.ajax({
        url: '/fbpartnersfinance/financeteamdetailsforlead?keyid=' + id,
        type: "get",
        success: function (data) {
            if (!$.trim(data)) {

            } else {

                data.forEach(function (ele) {
                    $('#team').append('<option value="' + ele.id + '">' + ele.name + '</option>');
                });
            }
        },
        error: function () {
            //console.log('error');
        }
    });
}
function bindeditmydealeads() {
    var _docid = getUrlVars()["keyid"]
    var _url = '/fbpartnerlead/leadsdetails?keyid=' + _docid;
    $(".docdis,#Discussion .modal-body").empty();
    $('#inputmsg').val('');
    $('#inputmsg,#chat,.close,#uploadmsg,#chatupload,#attachements').removeAttr('disabled');
    $(".finhide,.dealerstage,.dealer-products,.dlallpartytab").hide();
  
    if (_docid) {
        bindproduct_invoice();
        getstakeholders();
        bindleadusers();
       // getleadtask();
        bindleadmeetingtypenames();
       // getmydealeadexpenses();
       // getmyleadmeeting();
        
        $('.discretion').show();
       // bindproduct_invoice();
        $.ajax({
            url: _url,
            type: "get",
            success: function (data) {
                if (data === 'Not authorised') {
                    alert('you are not authorized to view this deal');
                    $(location).attr('href', '/landingpage')
                } else {
                    bindmanufacturersbyproducts(data[0].leadequipmentsId) 
                    var s2 = $('#TagName').select2({
                        placeholder: "Please Enter Suggested Tags",
                        tags: true
                    });
                    if (data[0].tagNames) {
                        var attach = data[0].tagNames;
                        $.each(attach.split(/\,/), function (i, val) {
                            // Create a DOM Option and pre-select by default
                            var newOption = new Option(val, val);
                            // Append it to the select
                            $('#TagName').append(newOption).trigger('change');
                            $('#TagName').val(val).trigger('change');
    
                            s2.val(attach.split(/\,/)).trigger("change");
                        });
                    }
                    $("input[name='financerequired'][value=" + data[0].financerequired + "]").prop('checked', true),
                    $("input[name='manfrequired'][value=" + data[0].manfrequired + "]").prop('checked', true),
                        $('#financialpartner option:selected').text(data[0].financialpartner),
                       
                        $('#leadamount').val(data[0].leadamount),
                        $('#bleadamount').text(data[0].leadamount),
                        $('#bstage').text(data[0].leadstage),
                        $('#bAssigned').text(data[0].Assigned),
                        $('#bleadname').text(data[0].leadname),
                        $('#bleadnumber').text(data[0].leadnumber);
                        $('#pState').parent().attr('data-fbselectedval', data[0].state),
                        $('#pState').attr('data-fbldselval', data[0].state),
                        $('#ptState').text(data[0].state),
                        $('#ptZone').text(data[0].zone)
                        $('#pZone').attr('data-fbldselval', data[0].zone),
                        $('#pZone').parent().attr('data-fbselectedval', data[0].zone)

                    if (data[0].financerequired == 'Yes') {

                        $('#bdealername').text('Finbot');
                        $('.dlrtab').show();
                    } else {
                        $('#bdealername').text('Self');
                        $('.financehide').hide();  
                       
                    }
                    // if (data[0].source != undefined) {
                    //     $('#bdealername').text(data[0].source );
                    //     $('#dlrtab').hide();
                    // } else {
                    //     $('#bdealername').text('Finbot');
                    // }
                    if (data[0].isExternal == 1) {
                        $('#bdealername').text(data[0].sourcecode);
                        $('.dlmanftab,.dealer-products').show();  
                        $('.allpar').hide();  
                        $('.dealerstage').show() 
                        $('#dealerstage').text(data[0].dealerstage)  
                        $('.manufacturerhide').hide();                 
                    } 
                    if(data[0].thirdpartycom == 1){
                        $('.dlallpartytab').show()  
                    }
                    if (data[0].manfrefid != undefined) {                      
                        $('.manftab').show();                       
                    }
                    if (data[0]["allowallparty"] == "1") {
                        $('.dlallpartytab').show();
                        
                        $('#allowallparty').prop('checked', true)
                    }
                    $('#contactnumber').val(data[0].contactnumber),
                        $('#leadsummary').val(data[0].leadsummary);
                        $('#manfrefid').val(data[0].manfrefid);
                        $('#refid').val(data[0].refid);
                        $('#manfid').val(data[0].manufacturerid);
                        $('#dlrid').val(data[0].dealerid);
                        $('#finid').val(data[0].financeid);
                        $('#thirdparty').val(data[0].allowallparty);
                        $('#dealer-products').val(data[0].products);
                      //  $("#Company option:contains('" + data[0].company + "')").attr('selected', true).trigger('change.select2');
                      $('#ptCompany').text(data[0].company),
                      $('#pCompany').attr('data-fbldselval', data[0].companyEmail+'|'+'00'),
                      $('#pCompany').parent().attr('data-fbselectedval', data[0].company), 
$('#ptcampaignname').text(data[0].campaignname),
                   $('#pcampaignname').attr('data-fbldselval', data[0].campaignnameId),
                   $('#pcampaignname').parent().attr('data-fbselectedval', data[0].campaignnameId),
                   $('#ptleadscore').text(data[0].leadscore),
                   $('#pleadscore').attr('data-fbldselval', data[0].leadscore),
                   $('#pleadscore').parent().attr('data-fbselectedval', data[0].leadscore),


$('#products').val(data[0].products)   
$('#ptteam').text(data[0].team),
                    $('#pteam').parent().attr('data-fbselectedval', data[0].team)
                    $('#pteam').attr('data-fbldselval', data[0].teamId),
                    $('#pteam').parent().attr('data-fbemailforteam', data[0].AssignedEmail)

$('#ptldAssigned').text(data[0].Assigned),
                    $('#pldAssigned').attr('data-fbldselval', data[0].AssignedEmail+'|'+data[0].AssignedId),
                    $('#pldAssigned').parent().attr('data-fbselectedval', data[0].Assigned),

    
                    $('#ptleadstage').text(data[0].leadstage),
                    $('#pleadstage').parent().attr('data-fbselectedval', data[0].leadstage)
                    // $('#manufacturer option[value*="'+'|'+data[0].manfcode+'"]').attr('selected','selected').trigger('change')
           




                    var options = data[0].leadequipments.split(',');
                    options.forEach(function (e) {
                            if (e !== '') {
                                $("#leadequipments option:contains('" + e + "')").attr('selected', true).trigger('change.select2')
                            }
                        }),
                        $("#leadscore option:contains('" + data[0].leadscore + "')").attr('selected', true).trigger('change.select2'),
                        $("#leadname").val(data[0].leadname),
                        $('#Contact').val(data[0].contact),
                        $('#email').val(data[0].contactEmail),
                        $('#city').val(data[0].contactcity),
                        $('#Borrower-Email').val(data[0].contactEmail),
                        $('#city').val(data[0].contactcity),
                        $("#campaignname option:contains('" + data[0].campaignname + "')").attr('selected', true).trigger('change.select2'),
                        $('#campaignname option[value="' + data[0].campaignnameId + '"').attr('selected', true).trigger('change'),

                        $('#sourceid').val(data[0].sourceid),
                       // $("#ldAssigned option:contains('" + data[0].Assigned + "')").attr('selected', true).trigger('change.select2'),
                        $('#assignedid').val(data[0].AssignedId),
                        
                        $("#leadstage option:contains('" + data[0].leadstage + "')").attr('selected', true).trigger('change.select2'),
                        $('#ldstageold').val(data[0].leadstage);
                      
                        data[0].leaddocs.forEach(function (el) {
                            if (Array.isArray(el)) {
                                el = el[0];
                            }
                            ////console.log(data[0].leaddocs[d].docname), 
                            if(el.isExternal == 1){
                                //$(".docdis").append('<tr><td class="ksidws">' + el.docname + '</td><td class="ksidws2"><a href="/fbpartners/viewoExtdlrdoc?docname=' + el.docpath+''+'"&dealername=Finbot"" class="fildownad"><i class="fa fa-download"></i></a></td></tr>')
                                $(".docdis").append('<tr><td class="ksidws">' + el.docname + '</td><td class="ksidws2"><a href="/fbpartners/viewoExtdlrdoc?dealername='+el.dealername+'&docname=' + el.docpath+'" class="fildownad"><i class="fa fa-download"></i></a></td></tr>')
                            }else{
                                $(".docdis").append('<tr><td class="ksidws">' + el.docname + '</td><td class="ksidws2"><a href="/fbpartners/viewodoc?docname=' + el.docpath + '" class="fildownad"><i class="fa fa-download"></i></a></td></tr>')
                            }
                            
                        })
                        if(data[0].stageforms){
                            // for(var p in data[0].saveforms){
                                 // for (var k in data[0].saveforms[p]) {
                                     // console.log(data[0].saveforms[p])
                                    
                                 
                                 // }
                                 data[0].stageforms.forEach(function(form,i){
                                    
                                     var tr='<tr>'+
                                     '<td onclick="showstageforms(\'' + (form.formnameid).split('-')[1] + '\',\''+form.formnameid+ '\')">'+form.stages+' -'+ (form.formnameid).split("-")[0]+'</td>'+
                                   
                                    
                                     '</tr>'+
                                     
                                  '<tr>'
                                  var tr='<div class="card-header" id="headingTwo"><h2 class="mb-0"><button type="button" class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseTwotwo" aria-expanded="false" ><i class="fa fa-plus fa-angle-down"></i>'+form.stages+' -'+ (form.formnameid).split("-")[0]+'</button>'+
     
     '<div onclick="showstageforms(\'' + (form.formnameid).split('-')[1] + '\',\''+form.formnameid+ '\')" style="display: contents;"><a class="adsignatorys"  style=" vertical-align: middle;"> Show </a></div>'+
     
     '<hr style="width: 64%;display: inline-block;vertical-align: middle;margin-left: 3%;"></h2> </div>'
                                  
                             
                                     $(".formdeatiles").append(tr)
                                 });
                               
                            // }
                             }
                             $.each(data[0].form, function (key, value) {
                                var v = $(`[data-prop="${key}"]`).parent().attr(`data-ctrltype`);
                                $("[data-prop='"+key+"']").parent().removeClass('fbhide');
                                // if (v) {
                                switch (v) {
                                    case 'radio':
                                        $('#additionalhtml').find(`[data-prop="${key}"] input[type=radio][value="${value}"]`).prop('checked', true);
                                        $('#additionalhtml').find(`[data-prop="${key}"] input[type=radio]`).prop('disabled', true);
                                        break;
                                    case 'checkbox':
                                        $('#additionalhtml').find(`[data-prop="${key}"] input[type=checkbox][value="${value}"]`).prop('checked', true);
                                        $('#additionalhtml').find(`[data-prop="${key}"] input[type=checkbox]`).prop('disabled', true);
                                        break;
                                    case 'select':
                                        $('#additionalhtml').find(`[data-prop="${key}"] option[value="${value}"]`).prop('selected', true);
                                        $('#additionalhtml').find(`[data-prop="${key}"]`).prop('disabled', true);
                                        break;
                                    default:
                                        $('#additionalhtml').find(`[data-prop="${key}"]`).val(`${value}`).prop('disabled', true);
                                        break;
                                    // }
                                }
                            });
                            setTimeout(() => {
                                $('#manufacturer option[value*="' + '|' + data[0].manfcode + '"]').attr('selected', 'selected').trigger('change');
                            }, 100);
                                                      
                }
            }
        });
    }
}

// function bindeditmydealeads() {
//     var _docid = getUrlVars()["keyid"]
//     var _url = '/fbpartners/leadsdetails?keyid=' + _docid;

//     $(".docdis,#Discussion .modal-body").empty();

//     $('#inputmsg').val('');
//     $('#inputmsg,#chat,.close,#uploadmsg,#chatupload,#attachements').removeAttr('disabled');

//     $(".finhide").hide();
// $(".formdeatiles").empty()
//     if (_docid) {
//         bindproduct_invoice();
//         getstakeholders();

//        // getleadtask();
//         bindleadmeetingtypenames();
//        // getmydealeadexpenses();
//        // getmyleadmeeting();
        
//         $('.discretion').show();
//         bindproduct_invoice();

//         $.ajax({
//             url: _url,
//             type: "get",
//             success: function (data) {
//                 console.log(data)
//                 if (data === 'Not authorised') {
//                     alert('you are not authorized to view this deal');
//                     $(location).attr('href', '/landingpage')
//                 } else {

//                     $("input[name='financerequired'][value=" + data[0].financerequired + "]").prop('checked', true),
//                     $("input[name='manfrequired'][value=" + data[0].manfrequired + "]").prop('checked', true),

//                         $('#financialpartner option:selected').text(data[0].financialpartner),
//                         $('#leadamount').val(data[0].leadamount),
//                         $('#bleadamount').text(data[0].leadamount),
//                         $('#bstage').text(data[0].leadstage),
//                         $('#bAssigned').text(data[0].Assigned),
//                         $('#bleadname').text(data[0].leadname),
//                         $('#bleadnumber').text(data[0].leadnumber);

//                         if (data[0].financerequired == 'Yes') {

//                                                     $('#bdealername').text('Finbot');
//                                                     $('.dlrtab').show();
//                                                 } else {
//                                                     $('#bdealername').text('Self');
                                                   
//                                                 }
//                                                 // if (data[0].source != undefined) {
//                                                 //     $('#bdealername').text(data[0].source );
//                                                 //     $('#dlrtab').hide();
//                                                 // } else {
//                                                 //     $('#bdealername').text('Finbot');
//                                                 // }
//                                                 if (data[0].isExternal == 1) {
//                                                     $('#bdealername').text(data[0].source );
//                                                     $('.dlmanftab').show();                       
//                                                 } 
//                                                 if (data[0].manfrefid != undefined) {
                                                    
//                                                     $('.manftab').show();                       
//                                                 }
                            
//                                                 $('#contactnumber').val(data[0].contactnumber),
//                                                     $('#leadsummary').val(data[0].leadsummary);
//                                                     $('#manfrefid').val(data[0].manfrefid);
//                                                     $('#refid').val(data[0].sourceid);
//                                                     $('#manfid').val(data[0].manufacturerid);
//                                                     $('#dlrid').val(data[0].dealerid);
//                                                     $('#finid').val(data[0].financeid);
//                        $("#Company option:contains('" + data[0].company + "')").attr('selected', true).trigger('change.select2');
// $("#pCompany").text(data[0].company)
// $('#pCompany').attr('data-fbldselval', data[0].companyEmail+'|'+'00');
    
// $('#pCompany').parent().attr('data-fbselectedval', data[0].company);
// $('#pcampaignname').text(data[0].campaignname);
    
// $('#pcampaignname').attr('data-fbldselval', data[0].campaignnameId);

// $('#pcampaignname').parent().attr('data-fbselectedval', data[0].campaignnameId)
// $('#pleadscore').text(data[0].leadscore);
    
// $('#pleadscore').attr('data-fbldselval', data[0].leadscore);

// $('#pleadscore').parent().attr('data-fbselectedval', data[0].leadscore);
// $('#pleadstage').text(data[0].leadstage);
// $('#pteam').text(data[0].team);
    
// $('#pteam').parent().attr('data-fbselectedval', data[0].team)

// $('#pteam').attr('data-fbldselval', data[0].teamId);

// $('#pteam').parent().attr('data-fbemailforteam', data[0].AssignedEmail);

// $('#pldAssigned').text(data[0].Assigned);
    
// $('#pldAssigned').attr('data-fbldselval', data[0].AssignedEmail+'|'+data[0].AssignedId);

// $('#pldAssigned').parent().attr('data-fbselectedval', data[0].Assigned);

    
// $('#pleadstage').parent().attr('data-fbselectedval', data[0].leadstage);
// $("#pldAssigned").text(data[0].Assigned)
// //bindformshtml(data[0].leadstage);


//                     var options = data[0].leadequipments.split(',');
//                     options.forEach(function (e) {
//                             if (e !== '') {
//                                 $("#leadequipments option:contains('" + e + "')").attr('selected', true).trigger('change.select2')
//                             }
//                         }),
//                         $("#leadscore option:contains('" + data[0].leadscore + "')").attr('selected', true).trigger('change.select2'),
//                         $("#leadname").val(data[0].leadname),
//                         $('#Contact').val(data[0].contact),
//                         $('#email').val(data[0].contactEmail),
//                         $('#city').val(data[0].contactcity),
//                         $('#Borrower-Email').val(data[0].contactEmail),
//                         $('#city').val(data[0].contactcity),
//                         $("#campaignname option:contains('" + data[0].campaignname + "')").attr('selected', true).trigger('change.select2'),
//                         $('#campaignname option[value="' + data[0].campaignnameId + '"').attr('selected', true).trigger('change'),

//                         $('#sourceid').val(data[0].sourceid),
//                        // $("#ldAssigned option:contains('" + data[0].Assigned + "')").attr('selected', true).trigger('change.select2'),
//                         $('#assignedid').val(data[0].AssignedId),
                        
//                         $("#leadstage option:contains('" + data[0].leadstage + "')").attr('selected', true).trigger('change.select2'),
//                         $('#ldstageold').val(data[0].leadstage);
//                         data[0].leaddocs.forEach(function (el) {
//                             if (Array.isArray(el)) {
//                                 el = el[0];
//                             }
//                             ////console.log(data[0].leaddocs[d].docname), 
//                             $(".docdis").append('<tr><td class="ksidws">' + el.docname + '</td><td class="ksidws2"><a href="/fbpartners/viewodoc?docname=' + el.docpath + '" class="fildownad"><i class="fa fa-download"></i></a></td></tr>')
//                         });
// //console.log(data[0].saveforms)
//                         if(data[0].stageforms){
//                        // for(var p in data[0].saveforms){
//                             // for (var k in data[0].saveforms[p]) {
//                                 // console.log(data[0].saveforms[p])
                               
                            
//                             // }
//                             data[0].stageforms.forEach(function(form,i){
//                                // console.log(form)
//                                // console.log(data[0])
//                                 // for(var d in data){
//                                  // var id=(data.formnameid).split('-')[1]
//                                 // }
//                                 var tr='<tr>'+
//                                 '<td onclick="showstageforms(\'' + (form.formnameid).split('-')[1] + '\',\''+form.formnameid+ '\')">'+form.stages+' -'+ (form.formnameid).split("-")[0]+'</td>'+
                              
                               
//                                 '</tr>'+
                                
//                              '<tr>'
//                              var tr='<div class="card-header" id="headingTwo"><h2 class="mb-0"><button type="button" class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseTwotwo" aria-expanded="false" ><i class="fa fa-plus fa-angle-down"></i>'+form.stages+' -'+ (form.formnameid).split("-")[0]+'</button>'+

// '<div onclick="showstageforms(\'' + (form.formnameid).split('-')[1] + '\',\''+form.formnameid+ '\')" style="display: contents;"><a class="adsignatorys"  style=" vertical-align: middle;"> Show </a></div>'+

// '<hr style="width: 64%;display: inline-block;vertical-align: middle;margin-left: 3%;"></h2> </div>'
                             
                        
//                                 $(".formdeatiles").append(tr)
//                             });
//                             $.each(data[0].form, function (key, value) {
//                                 var v = $(`[data-prop="${key}"]`).parent().attr(`data-ctrltype`);
//                                 console.log(`${v} - data-prop="${key}" - value="${value}"`)
//                                 // if (v) {
//                                 switch (v) {
//                                     case 'radio':
//                                         $('#additionalhtml').find(`[data-prop="${key}"] input[type=radio][value="${value}"]`).prop('checked', true);
//                                         $('#additionalhtml').find(`[data-prop="${key}"] input[type=radio]`).prop('disabled', true);
//                                         break;
//                                     case 'checkbox':
//                                         $('#additionalhtml').find(`[data-prop="${key}"] input[type=checkbox][value="${value}"]`).prop('checked', true);
//                                         $('#additionalhtml').find(`[data-prop="${key}"] input[type=checkbox]`).prop('disabled', true);
//                                         break;
//                                     case 'select':
//                                         $('#additionalhtml').find(`[data-prop="${key}"] option[value="${value}"]`).prop('selected', true);
//                                         $('#additionalhtml').find(`[data-prop="${key}"]`).prop('disabled', true);
//                                         break;
//                                     default:
//                                         $('#additionalhtml').find(`[data-prop="${key}"]`).val(`${value}`).prop('disabled', true);
//                                         break;
//                                     // }
//                                 }
//                             });
                           
                            
//                        // }
//                         }
//                        // bindleadstagenames2(data[0].leadstage)
//                 }
//             }
//         });
//     }
// }

function getleadtask() {
    $('.leadtask').empty();
    var _docid = getUrlVars()["keyid"]
    var _url = '/fbpartnersfinance/getleadtask?id=' + _docid;

    $.ajax({
        url: _url,
        type: "get",
        success: function (data) {

            if (!$.trim(data)) {
                var tileempty = '<div class="empytre">' +
                    '<div class="oneemptys">' +
                    '<div class="col-md-12 listcontras">' +
                    '<div class="recordnew hgreen contact-panel">' +
                    '<a href="">' +
                    '<div class="panel-body">' +
                    '<h3>' + 'Let' + 's' + ' add new task' + '</h3>' +
                    '<img alt="logo" src="static/images/fbpartners/emptytask.svg" style="width: 250px !important; height:100% !important;">'

                    +
                    '</div>'
                $('.leadtask').prepend(tileempty);
            } else {
                for (var d in data) {
                    var tile = `<div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
																		<div class="comonebox">
																		<a href="/taskaction?keyid=` + data[d]._id + `">
																			<div class="boonones">
																			<div class="col-md-12 col-xs-12 padsmars personalb">
																				<h2>` + data[d].type + `</h2>
																			</div>
																			<div class="digitalsmarkng">
																				<h1>` + data[d].subject + `</h1>
																				<h6>` + data[d].priority + `</h6>
																				<p>` + add3Dots(data[d].description, `180`) + `</p>
																				<h4>` + dateformate(data[d].startdate) + `</h4>
																			</div>
																			<div class="col-md-12 padsmars">
																			<div class="col-md-6 col-xs-12 padsmars">	
																				<h6></h6>
																			</div>	
																			
																			</div>
																			</div>
																			</a>
																		</div>	
																	</div>`




                    $('.leadtask').prepend(tile);
                    // $('.ptasksss').addClass(data[d].priority).removeClass('ptasksss')
                }
            }
        },
        error: function () {
            $(location).attr('href', '/')
        }
    });
}
function showstageforms(_docid, formnameid) {
    var id =  getUrlVars()["keyid"];
    if (_docid) {
        $.ajax({
            url: 'fbloanconfig/formdetails?keyid=' + _docid,
            type: "get",
            success: function (data) {

                $("#exampleModal").modal('show')
                $('#exampleModal #formname').text(data.name);
                $('#exampleModal #description').text(data.description);
                // $('#type option[value="' + data.type + '"').prop('selected', 'selected').trigger('change');
                $('#exampleModal .screebmains').html(data.html);
                $('#exampleModal .icon-div,.helptooltip').remove();
                if (formnameid) {
                    getformdeatiles(formnameid,id)
                }
            }
        });
    }
}
function getmydealeadexpenses() {
    var _docid = getUrlVars()["keyid"]

    var _url = "/fbpartnersfinance/getmyfinleadexpenses?keyid=" + _docid;
    $('.leadexpenses').empty();
    $.ajax({
        url: _url,
        type: "get",
        success: function (data) {
         
            if (!$.trim(data)) {
                var tileempty = '<div class="empytre">' +
                    '<div class="oneemptys">' +
                    '<div class="col-md-12 listcontras">' +
                    '<div class="recordnew hgreen contact-panel">' +
                    '<a href="">' +
                    '<div class="panel-body">' +
                    '<h3>' + 'No Expenses Yet' + '</h3>' +
                    '<img alt="logo" src="static/images/fbpartners/emptyexpenses.svg" style="width: 250px !important; height:100% !important;">'

                    +
                    '</div>'
                $('.leadexpenses').prepend(tileempty);
            } else {
                for (var d in data) {
                    var tile = `<div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 expensestiles" id="list_` + d + `">
                    <div class="newldas">
                        <a href="add-expenses?keyid=` + data[d].id + `">
                            <div class="ledsnedone">
                                <div class="col-md-12 col-xs-12 padsmars">
                                    <h2>` + data[d].subject + `</h2>
                                    <div class="col-md-12 col-xs-12 padsmars albgclors">
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 gnsclrs"></div>
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 blsclrs"></div>
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 grsclrs"></div>
                                    </div>
                                </div>
                                <div class="col-md-12 col-xs-12 padsmars">
                                    <div class="inerleadsse">
                                        <h3></h3>
                                        <div class="col-md-12 col-xs-12 padsmars lonamounts">
                                            <div class="col-md-6 col-xs-12 padsmars">   
                                                <h6><i class="fa fa-phone contacticns"></i></h6>
                                                <h1>` + dateformate(data[d].fromDate) + `</h1>                                                 
                                            </div>  
                                            <div class="col-md-6 col-xs-12 padsmars">                                                   
                                                <h6><i class="fa fa-briefcase positionicons"></i></h6>
                                                <h1>` + dateformate(data[d].toDate) + `</h1>
                                            </div>  
                                        </div>                  
                                    </div>
                                </div>
                                <div class="col-md-12 padsmars uiledris">                                       
                                    <div class="col-md-12 col-xs-12 padsmars">  
                                         <p class="addreshigjt">` + add3Dots(`` + data[d].description + ``, `180`) + `</p>
                                    </div>
                                    <div class="col-md-12 col-xs-12 padsmars">  
                                          <p class="emailusmes"><i class="fa fa-envelope-o gmailicons"></i>` + data[d].email + `</p>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>  
                </div>`

                    $('.leadexpenses').prepend(tile);

                }
                for (var e in data) {
                    var etype = data[e].type.map(item => item.Travel_type).join(',');
                   
                    $("#list_" + e + " .inerleadsse h3").text(etype);
                }
            }
        },
        error: function () {
            $(location).attr('href', '/')
        }
    });
}
function bindleadmeetingtypenames() {
    $('#meetingtype').empty().append('<option value="">Please Select Meeting Type</option>')
    $.ajax({
        url: 'fbpartnersfinance/getleadmeetingtypenames',
        type: "get",
        success: function (data) {

            data.forEach(function (ele) {


                $('#meetingtype').append('<option value="' + ele.id + '|' + ele.Attendedfor + '">' + ele.name + '[' + ele.Attendedfor + ']' + '</option>')
                //$("#notes").val(ele.notes)

            })
        },
        error: function () {
            //console.log('error');
        }
    });
}
function getformdeatiles(_docid,id) {
    if (_docid) {
        $.ajax({
            url: 'fbpartnerleads/leadsformdetails?keyid=' + _docid+'&id=' + id,
            type: "get",
            success: function (data) {
                if (!$.trim(data)) {
                    $("#exampleModal .btn-secondary").show();
                } else {
                    $.each(data, function (key, value) {
                        var v = $(`[data-prop="${key}"]`).parent().attr(`data-ctrltype`);
                        // console.log(Object.keys(value))
                        // if (v) {
                        switch (v) {
                            case 'radio':
                                $('.screebmains').find(`[data-prop="${key}"] input[type=radio][value="${value}"]`).prop('checked', true);
                                $('.screebmains').find(`[data-prop="${key}"] input[type=radio]`).prop('disabled', true);
                                break;
                            case 'checkbox':
                                $('.screebmains').find(`[data-prop="${key}"] input[type=checkbox][value="${value}"]`).prop('checked', true);
                                $('.screebmains').find(`[data-prop="${key}"] input[type=checkbox]`).prop('disabled', true);
                                break;
                            case 'select':
                                $('.screebmains').find(`[data-prop="${key}"] option[value="${value}"]`).prop('selected', true);
                                $('.screebmains').find(`[data-prop="${key}"]`).prop('disabled', true);
                                break;
                            default:
                                $('.screebmains').find(`[data-prop="${key}"]`).val(`${value}`).prop('disabled', true);
                                break;
                        }
                        // }
                    });
                    // }, 100);
                    $("#exampleModal .btn-secondary").hide()
                }
            }
        });
    }
}
function getmyleadmeeting() {
    var _docid = getUrlVars()["keyid"]
    //console.log("giting fit")
    $('.leadmeeting').empty();
    var _url = '/fbpartnersfinance/getmyleadmeeting?id=' + _docid;

    $.ajax({
        url: _url,
        type: "get",
        success: function (data) {

            if (!$.trim(data)) {
                var tileempty = '<div class="empytre">' +
                    '<div class="oneemptys">' +
                    '<div class="col-md-12 listcontras">' +
                    '<div class="recordnew hgreen contact-panel">' +
                    '<a href="">' +
                    '<div class="panel-body">' +
                    '<h3>' + 'Let' + 's' + ' add new meeting' + '</h3>' +
                    '<img alt="logo" src="static/images/fbpartners/emptymeeting.svg" style="width: 250px !important; height:100% !important;">'

                    +
                    '</div>'
                $('.leadmeeting').prepend(tileempty);
            } else {
                //data.toLowerCase();
                //lower(data)
                for (var d in data) {


                    var tile = `<div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 twobtosmaindf ourservices">
									<div class="twoprodyctmain1">
										<a href="/meetingaction?keyid=` + data[d]._id + `">
                                            <div class="boxtwones1">
                                                <div class="full-time">
                                                    <h1> ` + data[d].Attendedfor + `</h1>
                                                    <h2>` + data[d].meetingtype + `</h2>
                                                    <h5>subject </h5>
                                                    <h3 class="notestexts">` + data[d].subject + `</h3><hr><div class="dev-left1">          <p>Date : ` + dateformate(data[d].scheduleddate) + `</p>          <p>Start Time : ` + data[d].starttime + `</p>           <p>End Time : ` + data[d].endtime + `</p>      </div>       <div class="dev-right1">       <i class="fa fa-floppy-o floppy1 leadhighlights"></i>           
                                                </div>       
										<div class="clr"></div>       
                                    </div>
                                    </div>    
								</a>
								</div> 
								</div>`







                    $('.leadmeeting').prepend(tile);
                    //console.log(data[d].status)
                    if (new Date(data[d].scheduleddate) < new Date() && data[d].status === '1') {
                        //console.log("in first meeting")
                        $('.leadhighlights').addClass('leadhighlightred').removeClass('leadhighlights')
                        //$(".leadhighlight").css("background-color", "rgb(255, 82, 0)");

                    } else if (data[d].status === '0') {
                        //console.log("in second meeting")
                        $('.leadhighlights').addClass('leadhighlightgreen').removeClass('leadhighlights')
                        //$('.leadhighlights').addClass('leadhighlight')
                        // $(".leadhighlight").css("background-color", "rgba(228, 66, 17, 0.94)");

                    } else {
                        //console.log("in third meeting")
                        $('.leadhighlights').addClass('leadhighlightblue').removeClass('leadhighlights')

                    }
                    // $('.leadhighlight').removeClass('leadhighlight')

                }
            }
        },
        error: function () {
            $(location).attr('href', '/')
        }
    });
}
function dateformate(s) {
    var startdate = new Date(s);
    syear = startdate.getFullYear();
    smonth = startdate.getMonth() + 1;
    sdt = startdate.getDate();
    if (sdt < 10) {
        sdt = '0' + sdt;
    }
    if (smonth < 10) {
        smonth = '0' + smonth;
    }
    //yy-mm-dd
    if (syear) {
        return syear + '-' + smonth + '-' + sdt
    } else {
        return ''
    }
}
// -----------API KEYS Start--------------------
function getallapi() {
    $('.allmanpads').empty();
   
    var _url = '/fbpartners/getapikeys';
    $.ajax({
        url: _url,
        type: "get",
        success: function (data) {
            if (!$.trim(data)) {
                var tileempty = '<div class="empytre">' +
                    '<div class="oneemptys">' +
                    '<div class="col-md-12 listcontras">' +
                    '<div class="recordnew hgreen contact-panel">' +
                    '<a href="">' +
                    '<div class="panel-body">' +
                    '<h3>' + 'Let' + 's' + ' Add New Api' + '</h3>' +
                    '<img alt="logo" src="static/images/fbpartners/api.svg" style="width: 250px !important; height:100% !important;">'

                    +
                    '</div>'
                $('.allmanpads').prepend(tileempty);
            } else {
                // console.log(data)
                for (var d in data) {

                    var tile = `	<div class="col-md-4 col-xs-12 ourservices">
<div class=" apicol expnse_col">
    <div class="adloadns"><a href="/add-apikeys?keyid=${data[d].id}">
            <div class="col-md-12 col-xs-12 padsmars">
                <h3>${data[d].company}</h3>
                <p class="expns_p">${add3Dots(data[d].description, "150")}</p>

            </div>
            <div class="col-md-12 col-xs-12 padsmars">
                <div class="anewloadnsrs1">
                    <div class="col-md-12 col-xs-12 padsmars amta1">
                        <div class="col-lg-6 col-md-6 col-xs-6 padsmars">	
                            <div class="lonmounhtsrs1">
                                
                                <h4>Start Date</h4>
                                <p>${dateformate(data[d].startDate)}</p>
                            
                            </div>
                        </div>	
                        <div class="col-lg-6 col-md-6 col-xs-6 padsmars">
                            <div class="paningamers1">
                                
                                <h4>End Date</h4>
                                <p>${dateformate(data[d].endDate)}</p>
                                
                            </div>
                        </div>	
                    </div>					
                </div>
            </div>
        </a>
        </div>							
</div>	
</div>`
                    $('.allmanpads').prepend(tile);
                    if (data[d].logopath != null) {
                        $(".ctile  .conssue").css("display", "none");
                        $(".ctile .usrprofilepic").css("display", "block");
                    } else {
                        $(".ctile  .usrprofilepic").css("display", "none");
                        $(".ctile  .conssue").css("display", "block");
                    }
                    $('.ctile').removeClass('ctile')
                }
            }
        },
        error: function (err) {
            console.error(err);
            // $(location).attr('href', '/');
        }
    });
}

function bindeditapikey() {
    var _docid = getUrlVars()['keyid'];
    if (!_docid) {
        $('#publickey').val(guidGenerator());
        $('#privatekey').val(guidGenerator());
    } else {
        $.ajax({
            type: "get",
            url: "/fbpartners/getapikeysby?keyid=" + _docid,
            success: function (data) {
                console.log(data);
                $('#Companyname').val(data.company);
                $('#Description').val(data.description);
                $('#privatekey').val(data.privateKey);
                $('#publickey').val(data.publicKey);
                $('#csd').val(dateformate(data.startDate));
                $('#ced').val(dateformate(data.endDate));
                // $('#Api_Type option[value=' + data.type + ']').attr('selected', true).trigger('change');

                if (Array.isArray(data.pages)&&data.pages.length>0) {
                    $('tbody tr').each((tr_idx, tr) => {
                        // console.log(data.pages[tr_idx]);
                        if (data.pages[tr_idx].level == "3") {
                            $(tr).find('input[type=checkbox]').prop('checked', true)
                        } else if (data.pages[tr_idx].level == "2") {
                            $(tr).find('td .write,td .read').prop('checked', true)
                        } else if (data.pages[tr_idx].level == "1") {
                            $(tr).find('td .read').prop('checked', true)
                        } else {
                            $(tr).find('input[type=checkbox]').prop('checked', false)
                        }
                    });
                }
            }
        });
    }
}
// -----------API KEYS End--------------------
//--------------------dealer teams start---------------------
function getdealerteammembers(id) {
    $('.bindstakeholders').empty();
    var _docid = getUrlVars()["keyid"]
    var _url = '/fbpartnersfinance/getfinteammembers?keyid=' + id;
    $.ajax({
        url: _url,
        type: "get",
        success: function (data) {
            if (!$.trim(data)) {
                var tileempty = '<div class="empytre">' +
                '<div class="oneemptys">' +
                '<div class="col-md-12 listcontras">' +
                '<div class="recordnew hgreen contact-panel">' +
                '<a href="">' +
                '<div class="panel-body">' +
                '<h3>' + 'Let' + 's' + ' add new company' + '</h3>' +
                '<img alt="logo" src="static/images/fbpartners/emptycompany.svg" style="width: 250px !important; height:100% !important;">'
        
                + '</div>'
               // $('.allmanpads').prepend(tileempty);
              
            } else {

                //data.toLowerCase();
                //lower(data
             
                data.forEach(function(el){


                    // var tile = '<div class="projuct-names">' +
                    //         '<a >' +
                    //         '<div class="col-md-12 padsmars"><div class="col-md-12 padsmars dfddfff"><div class="col-md-5 ledpilped padsmars"><h4>Name </h4></div> <div class="col-md-7 ledpilped"><p> ' + el.name  + '</p></div></div>' +
                    //         '<div class="col-md-12 padsmars dfddfff"><div class="col-md-5 ledpilped padsmars"><h4>Email </h4></div> <div class="col-md-7 ledpilped"><p> ' + el.role  + '</p></div></div>' +
                    //         '<div class="col-md-12 padsmars dfddfff"><div class="col-md-5 ledpilped padsmars"><h4>Role </h4></div> <div class="col-md-7 ledpilped"><p> ' + el.city + '</p></div></div>' +
                    //     '</div>'

                    var tile = `<div class="temboxeson ctile">
                        <a href="#"><div class="onebormstem">
                        <div class="col-md-12 padsmars">
                        <div class="col-md-3 col-xs-3 padsmars mytemsd">
                        <div class="usernamett" ">`+el.name .charAt(0)+`</div>
                        <div class="usrprofilepic""><img src="static/`+el.logopath+`"></div>
                        </div>
                        <div class="col-md-9 col-xs-9 padsmars temsname">
                        <h2>`+el.name +`</h2>
                        <h3>`+el.role +`</h3>
                        </div></div>
                        <div class="col-md-12 col-xs-12 padsmars temtneij">
                        <div class="col-md-12 col-xs-12 padsmars newteamsn">
                        <div class="col-md-7 col-xs-12 padsmars">
                        <div class="tmnewsdje">
                        <h3>City</h3>
                        <h2>`+el.city +`</h2>
                        </div></div>
                        <div class="col-md-5 col-xs-12 padsmars">
                        <div class="bhreamnr">
                        <h3>Phone</h3>
                        <h2>`+el.phone +`</h2>
                        </div></div></div>
                        <div class="col-md-12 col-xs-12 activityu">
                        <h3><img src="static/images/fbpartners/mail.svg" alt="" class="mailicond">`+el.email +`</h3></div></div></div></a></div>`
                    $('.bindstakeholders').prepend(tile);
                    if (el.logopath != null) {

                        $(".ctile  .usernamett").css("display", "none");
                        $(".ctile .usrprofilepic").css("display", "block");

                    } else {

                        $(".ctile  .usrprofilepic").css("display", "none");
                        $(".ctile  .usrnamesltrs").css("display", "block");

                    }
                    $('.ctile').removeClass('ctile')
                })
            }
        },
        error: function () {
            $(location).attr('href', '/')
        }
    });
}
function bindeditdealerteams() {

    binddealermangers();
    bindscforteam();
    //bindtelforteam()



    var _docid = getUrlVars()["keyid"]
    if (_docid) {
        //$(".imgarea").empty();
        $.ajax({
            url: 'fbpartnersfinance/financeteamdetails?keyid=' + _docid,
            type: "get",
            success: function (data) {
               // gedealerteamstakeholders(_docid)
               getdealerteammembers(_docid)
               if(data[0].salescoordinator !== undefined){
                var options = data[0].salescoordinator.split(',');
                options.forEach(function (e) {     
                    if(e !== ''){
                        $("#scmanager option:contains('" + e + "')").attr('selected', true).trigger('change.select2')
                    }
                    })
                 }
                //    if(data[0].telecaller !== undefined){
                //     var options = data[0].telecaller.split(',');
                //     options.forEach(function (e) {     
                //         if(e !== ''){
                //             $("#telecaller option:contains('" + e + "')").attr('selected', true).trigger('change.select2')
                //         }
                //         })
                //      }
              
                $('#teamname').val(data[0].teamname),
                $('#description').val(data[0].description),
                $('#currentmngr').val(data[0].managerId),
                $("#manager option:contains('"+data[0].manager+"')").attr('selected', true).trigger('change.select2')

                if (data[0].logopath != null) {

                    $(".imgarea").empty();
                    $(".imgarea").append('<div class="audio"><div class="addoc"><a href="' + data[0].logopath + '"><img src="static/' + data[0].logopath + '"></a></div></div>')
                }
                if (data[0].issales == 1) {
                    $('#issales').prop('checked', true)
                }


            }
        });
    }

}
function getdealerteams() {
    $('.allmanpads').empty();
    var _url = '/fbpartnersfinance/getfinanceteams';
    $.ajax({
        url: _url,
        type: "get",
        success: function (data) {


            if (!$.trim(data)) {
                var tileempty = '<div class="empytre">' +
                '<div class="oneemptys">' +
                '<div class="col-md-12 listcontras">' +
                '<div class="recordnew hgreen contact-panel">' +
                '<a href="">' +
                '<div class="panel-body">' +
                '<h3>' + 'Let' + 's' + ' add new Team' + '</h3>' +
                '<img alt="logo" src="static/images/fbpartners/emptyteam.svg" style="width: 250px !important; height:100% !important;">'
        
                + '</div>'
                $('.allmanpads').prepend(tileempty);
            }
            else {
                for (var d in data) {


                    // var tile = '<div class="col-md-4 col-xs-12 ctile ourservices"><div class="temboxeson"><a href="/add-financeteam?keyid=' + data[d].id + '"><div class="onebormstem"><div class="col-md-12 padsmars"><div class="col-md-3 col-xs-3 padsmars mytemsd"><div class="usernamett">' + data[d].teamname.charAt(0) + '</div><div class="usrprofilepic"><img src="static/' + data[d].logopath + '"></div></div>' +
                    //     '<div class="col-md-9 col-xs-9 padsmars temsname"><h2>' + data[d].teamname + '</h2><h3>' + data[d].manager + '</h3><h3 class="datpikcd">' + data[d].date + '</h3></div></div>' +
                    //     '<div class="col-md-12 col-xs-12 padsmars temtneij"><div class="col-md-12 col-xs-12 padsmars newteamsn"><div class="col-md-6 col-xs-6 padsmars"><div class="tmnewsdje"><h3>' + data[d].description + '</h3><h2>Description</h2></div></div>' +

                    //     '<div class="col-md-12 col-xs-12 activityu"><h3>' + data[d].managerEmail + '</h3></div></div></div></a></div></div>'





                     
                    var tile = ` <div class="col-md-4 col-xs-12 ctile searchteams">
                    <div class="oneaccount"><a href="/add-dealerteam?keyid=` + data[d].id + `">
                         <div class="acuontnew"> 
                                <div class="col-md-12 col-xs-12 padsmars">
                                    <h2>` + data[d].teamname + `</h2>
                                    
                                </div>
                                <div class="col-md-12 col-xs-12 padsmars">
                                    <div class="nracotnr">											
                                        <div class="col-md-12 col-xs-12 padsmars addacouts">
                                            
                                                <h6>` + add3Dots(data[d].description,`180`) + `</h6>
                                        
                                            </div>	
                                        </div>					
                                    </div>
                                </div>
                                <div class="col-md-12 padsmars acccoutn">
                                    <div class="col-md-12 col-xs-12 padsmars newfintemasd"> 
                                    <div class="usernamett">` + data[d].teamname.charAt(0) + `</div><div class="usrprofilepic"><img src="static/` + data[d].logopath + `"></div><h5>` + data[d].managerEmail + `</h5>
                                    </div>  
                                </div>

                            </div>
                        </a>
                    </div>	
                </div>`


                    $('.allmanpads').prepend(tile);
                    if (data[d].logopath != null) {

                        $(".ctile  .usernamett").css("display", "none");
                        $(".ctile .usrprofilepic").css("display", "block");

                    }
                    else {

                        $(".ctile  .usrprofilepic").css("display", "none");
                        $(".ctile  .usrnamesltrs").css("display", "block");

                    }
                    $('.ctile').removeClass('ctile')

                }
            }
        },
        error: function () {
            $(location).attr('href', '/')
        }
    });
}

function binddealerteamnames() {
    $('#team').empty().append('<option value="">Please Select Team</option>');

    $.ajax({
        url: 'fbpartnersfinance/getfinanceteamnames',
        type: "get",
        success: function (data) {

            data.forEach(function (ele) {


                $('#team').append('<option value="' + ele.id + '">' + ele.teamname + '</option>');

            })
        },
        error: function () {
            //console.log('error');
        }
    });



}
function gedealerteamstakeholders(id) {
    $('.bindstakeholders').empty();
   // $('.pipelinemains').hide();

   
       var _url = '/fbpartnersfinance/getteamstakeholders?keyid=' + id;

  


   // var _url = '/fbpartners/getcompanyleads?name=' + name;

   $.ajax({
       url: _url,
       type: "get",
       success: function (data) {
           ////console.log(data);
           if (!$.trim(data)) {
               var tile1 = 
               `<img src="static/images/fbpartners/leadss.svg" width="100%"></img>`
                             
                              $('.bindstakeholders').prepend(tile1) 
           } else {



                  
                  // data.stakeholders.forEach(function(el){
   for(var d in data){
   
    //console.log('role is'+data[d].stakeholderrole);
                       var tile = `<div class="temboxeson teamembers">
                        <a href="#"><div class="onebormstem">
                        <div class="col-md-12 padsmars">
                        <div class="col-md-3 col-xs-3 padsmars mytemsd">
                        <div class="usernamett" style="display: none;">S</div>
                        <div class="usrprofilepic" style="display: block;"><img src="static/`+data[d].logopath+`"></div>
                        </div>
                        <div class="col-md-9 col-xs-9 padsmars temsname">
                        <h2>`+data[d].stakeholdername+`</h2>
                        <h3>`+data[d].stakeholderrole+`</h3>
                        </div></div>
                        <div class="col-md-12 col-xs-12 padsmars temtneij">
                        <div class="col-md-12 col-xs-12 padsmars newteamsn">
                        <div class="col-md-7 col-xs-12 padsmars">
                        <div class="tmnewsdje">
                        <h3>City</h3>
                        <h2>CHannai</h2>
                        </div></div>
                        <div class="col-md-5 col-xs-12 padsmars">
                        <div class="bhreamnr">
                        <h3>Phone</h3>
                        <h2>0987654321</h2>
                        </div></div></div>
                        <div class="col-md-12 col-xs-12 activityu">
                        <h3><img src="static/images/fbpartners/mail.svg" alt="" class="mailicond">SM@gmail.com</h3></div></div></div></a></div>`
                       
                       
                    //    '<div class="projuct-names">' +
                    //            '<a>' +
                    //            '<div class="col-md-12 padsmars"><div class="col-md-12 padsmars dfddfff"><div class="col-md-5 ledpilped padsmars"><h4>Name </h4></div> <div class="col-md-7 ledpilped"><p> ' + data[d].stakeholdername  + '</p></div></div>' +
                    //            '<div class="col-md-12 padsmars dfddfff"><div class="col-md-5 ledpilped padsmars"><h4>Email </h4></div> <div class="col-md-7 ledpilped"><p> ' + data[d].stakeholderrole  + '</p></div></div>' +
                    //            '<div class="col-md-12 padsmars dfddfff"><div class="col-md-5 ledpilped padsmars"><h4>Role </h4></div> <div class="col-md-7 ledpilped"><p> ' + data[d].stakeholderrole + '</p></div></div>' +
                    //        '</div>'
   
   
   
   
   
                      
   
   
                       $('.bindstakeholders').prepend(tile);
                   }


                

               

           }
       },
       error: function () {
           $(location).attr('href', '/')
       }
   });
};
function bindscforteam() {
    $('#scmanager').empty().append('<option value="">Please Select Manager</option>');
    $.ajax({
        url: 'fbpartnersfinance/getfinmanagers?role=SC',
        type: "get",
        success: function (data) {
            if (data == "No Managers Available") {

            } else {
                data.forEach(function (ele) {
                    $('#scmanager').append('<option value="' + ele.id + '">' + ele.name + '</option>');
                });
            }
        },
        error: function () {
            //console.log('error');
        }
    });
}
function bindtelforteam() {
    $('#scmanager').empty().append('<option value="">Please Select Manager</option>');
    $.ajax({
        url: 'fbpartnersfinance/getfinmanagers?role=TEL',
        type: "get",
        success: function (data) {
            if (data == "No Managers Available") {

            } else {
                data.forEach(function (ele) {
                    $('#telecaller').append('<option value="' + ele.id + '">' + ele.name + '</option>');
                });
            }
        },
        error: function () {
            //console.log('error');
        }
    });
}
//-------------------finance team end-------------------
//-------------------------- Get Lead Discussion---------------------------------------
function getchat() {
    var _docid = getUrlVars()['keyid'];
    var _url = "/fbpartners/fbchat?keyid=" + _docid
    // alert('Get Chat');
    $('#Discussion .modal-body').empty();
    var upload = `<span class="imgarea dz-clickable">
    <i class="fa fa-arrow-circle-o-up fa-2x dz-clickable"></i>
    <br>
    <p>Drop Files(or)Click here</p>
  </span>`
    $('.newDiscussionFiles').empty().append(upload);
    $('#Discussion_uploads').modal('hide');

    $.ajax({
        url: _url,
        type: "get",
        success: function (data) {
            if (!$.trim(data)) {
               
                $('.refresh>i').removeClass('fa-pluse');
            } else {
              
                $('.refresh>i').removeClass('fa-pluse');
                $('#inputmsg,#uploadmsg').val('');
                var count = 0;
                data.forEach((d, i) => {

                    if ($.trim(d.attachment)) {
                        var tile = `<div class="unread msg ` + align + `-msg">
                    <div class="msg-img" style="background-image: url(` + img + `)">
                    </div>
                    <div class="msg-bubble">
                      <div class="msg-info">
                        <div class="msg-info-name">` + d.name + `</div>
                        <div class="msg-info-time">` + new Date(d.date).toLocaleString() + `</div>
                      </div>
                      <div class="msg-text msg` + i + `"> 
                        ` + d.msg + `
                      </div>
                      <div class="msg-text msg_doc` + i + `"> 
                      
                    </div>
                    </div>
                  </div>`

                        $('#Discussion .modal-body').append(tile);
                        if(d.isdelivered.includes(unescape((getCookie('dru4'))))){

                            //console.log("in first",d.isdelivered.includes(unescape((getCookie('dru4')))))
                           

                        }
                        else{
                           // $('.newmsg').addClass('red') 
                           //console.log("in second",d.isdelivered.includes(unescape((getCookie('dru4')))))
                            count ++;

                        }
                      
                        if(count == 1){
                            
                            count++;
                         

                            $('.unread').prepend('<p> unread messages</p>')
                           

                        }
                        
                       $('.unread').removeClass('unread')

                        d.attachment.forEach((attach, j) => {
                            var filetype = attach.split('.').pop();
                         
                            if (filetype == "jpg" || filetype == "png" || filetype == "jpeg") {
                                var attachtile = `<a href="/fbpartners/page/viewdoc?page=Discussion&docname=` + attach + `&keyid=` + _docid + `" downloand="" ><img src="/fbpartners/page/viewdoc?page=Discussion&docname=` + attach + `&keyid=` + _docid + `" width="60px" height="60px" class="img-dwld"></a>`
                                $('#Discussion .modal-body .' + align + '-msg .msg-text.msg' + i + '').append(attachtile);
                            }

                           else {
                                var attachtile = `<a href="/fbpartners/page/viewdoc?page=Discussion&docname=` + attach + `&keyid=` + _docid + `" downloand="" ><i class="fa fa-download file-dwld"></i></a>`
                                $('#Discussion .modal-body .' + align + '-msg .msg-text.msg_doc' + i + '').append(attachtile);
                            }
                        });
                        $('.img-dwld,.file-dwld').tooltip({
                            title: 'Download Attachment',
                            placement: 'top'
                        });
                        
                    } else {
                        var tile = `<div class="unread msg ` + align + `-msg">
                    <div class="msg-img" style="background-image: url(` + img + `)">
                    </div>
                    <div class="msg-bubble">
                      <div class="msg-info">
                        <div class="msg-info-name">` + d.name + `</div>
                        <div class="msg-info-time">` + new Date(d.date).toLocaleString() + `</div>
                      </div>
                      <div class="msg-text">   
                        ` + d.msg + `
                      </div>
                    </div>
                  </div>`

                        $('#Discussion .modal-body').append(tile);
                        if(d.isdelivered.includes(unescape((getCookie('dru4'))))){

                            
                           

                        }
                        else{
                         
                            count ++;

                        }
                        //console.log(count);
                        if(count == 1){
                            
                            count++;
                            //console.log('count',count)

                            $('.unread').prepend('<p> unread messages</p>')
                           

                        }
                        
                       $('.unread').removeClass('unread')
                    }
                });

                $('#Discussion .modal-body').animate({
                    scrollTop: parseInt($("#Discussion .modal-body").height()) + 100 * data.length
                }, 'slow');
            }
            updateDlrdiscussionstatus(_docid);
        }
    });
}
function getdealeadchat() {
    var _docid = getUrlVars()['keyid'];
    var _url = "/fbpartnerlead/getdealerfbchat?keyid=" + _docid;
    $('.finleadchat').empty();
    $.ajax({
        url: _url,
        type: "get",
        success: function (data) {
          

            if (!$.trim(data)) {
                //console.log('getchat Description is Empty.. ');
            } else {
                $('#fininputmsg,#finuploadmsg').val('');
                $(".filterusers").empty();

                var count = 0;

                var filterusers = data.reduce((unique, o) => {
                    if (!unique.some(obj => obj.email === o.email && obj.value === o.value)) {
                        unique.push(o);
                    }
                    return unique;
                }, []);

                data.forEach((d, i) => {                   
                    var checklist = [];
        
                    if (d.path && d.path !="undefined") {
                        img = 'static/' + d.path
                        var imgorname = `<img src="static/images/fbpartners/users/${d.path}" width="100%"/>`
                    } else {
                       
                        var imgorname=`<div class="prfle_ltr " >` + d.name.charAt(0) + '' + d.name.charAt(1) +`</div>`
                    }
                    //imageExistsfordisc("static/"+d.id+".jpeg",d.name,function(exist,){
                    var tile = `<div class="col-md-12 chatbxone padmarse unread  ` + (d.email).replace("@", "").replace(".", "") + ` ` + d.type + ` ` + (d.email).replace("@", "").replace(".", "") + `-` + d.type + ` ` + (d.email).replace("@", "").replace(".", "") + `-` + dateformate(d.date) + ` ` + d.type + `-` + dateformate(d.date) + `  ` + (d.email).replace("@", "").replace(".", "") + `-` + d.type + `-` + dateformate(d.date) + `">
                    <div class="chatproimg">
                    ${imgorname}</div>
                    <div class="chatbxtext">
                    <h4 class="cht_name">` + d.name + `<span>` + new Date(d.date).toLocaleString() + `</span></h4>                  
                    <p>` + d.msg + `</p>                    
                `

                    if ($.trim(d.attachment)) {
                        
                       tile=tile+`<div class="chat_moreusers "><div class="col-md-12 col-lg-12 padmarse subcomment_text subcomment_docs finlead_docs">`
                        d.attachment.forEach((attach, j) => {
                            var filetype = attach.split('.').pop();
                            if (["csv", "xlsx", "doc", "docx", "ppt", "pptx", "txt", "odt"].includes(filetype)) {
                                tile = tile + `<div class="fin_docs"><a href="/fbpartners/viewodoc?docname=` + attach + `">
                                <img src="static/images/fbpartners/${filetype}.png" width="100%"></a>
                            </div>`                                                      
                            } else {
                                tile = tile + `                                                                         
                                <div class="fin_docs"><a href="/fbpartners/viewodoc?docname=` + attach + `"><img src="/fbpartners/viewodoc?docname=` + attach + `" width="100%"/></a></div>`                                                             
                            }
                           
                        });
                        tile = tile+` </div></div></div></div>`
                       
                    }

                    if (d.type === "Meeting") {
                        var Discraption = d.discuration.split("|")
                         tile = tile + `<div class="chat_subcomment chat_subcomment1"><div class="col-md-12 col-lg-12 subcomment_text"> <p> ${Discraption[3]}</p>
                        <div class="chat_cmntdetails"><h4>Startdate</h4><p>${dateformate(Discraption[4])}</p></div><div class="chat_cmntdetails"><h4>Start Time</h4><p>${Discraption[5]}</p></div>       
                        <div class="chat_cmntdetails"><h4>End Time </h4><p>${Discraption[6]}</p></div> <div class="task_cmntleft1">    
                        <button data-container="body" class="bs-popoversummary" data-toggle="popover" data-trigger="hover" onmouseover="meetingStatus(\'` + Discraption[0] + `\')" data-original-title="" title="">View</button>  
               </div> <div class="task_cmntright1"><a href="/meetingaction?keyid=` + Discraption[0] + `"><button>Details</button></a> </div> </div></div></div></div>`                           
                                                                                      
                                          
                                       
                    } else if (d.type === "Task") {
                        var Discraption = d.discuration.split("|")

                         tile = tile + `<div class="chat_subcomment chat_subcomment1"><div class="col-md-12 col-lg-12 subcomment_text"> <p> ${Discraption[2]}</p>
                        <div class="chat_cmntdetails"><h4>Startdate</h4><p>${dateformate(Discraption[5])}</p></div><div class="chat_cmntdetails"><h4>Priority</h4><p>${Discraption[3]}</p></div>       
                        <div class="chat_cmntdetails"><h4>Type </h4><p>${Discraption[1]}</p></div> <div class="task_cmntleft1">    
                        <button data-container="body" class="bs-popoversummary" data-toggle="popover" data-trigger="hover" onmouseover="taskStatus(\'` + Discraption[0] + `\')" data-original-title="" title="">View</button>  
               </div> <div class="task_cmntright1"><a href="/taskaction?keyid=` + Discraption[0] + `"><button>Details</button></a> </div> </div></div></div></div>` 

                        
                    } else if (d.type === "Activity") {
                        var Discraption = d.discuration.split("|")

                        var tile = tile + `<div class="chat_subcomment chat_subcomment1"><div class="col-md-12 col-lg-12 subcomment_text">
                        <h4>${Discraption[1]}</h4><p>${Discraption[2]}</p><div class="task_cmntleft1">    
                        <button data-container="body" class="bs-popoversummary" data-toggle="popover" data-trigger="hover" data-content="ActivityType:` + Discraption[6] + ` <br> Time:` + Discraption[3] + `" data-original-title="" title="">View</button>    
               </div> <div class="task_cmntright1">  
               <a href="/add-activity?keyid= ${Discraption[0]} "> <button>Details</button> </a>   
         </div></div></div></div></div>`                            
                    }else
                    {
                        tile=tile+`</div> </div>`
                    }
                    $('.finleadchat').append(tile);
               // })
                    $('.bs-popoversummary').popover({
                        html: true,
                        content: function () {
                            return $('#popover-contentsummary').html();
                        },
                        title: 'Summary <button type="button" onclick="closepopover()" class="close" id="close">&times;</button>'
                    })

                    $('.date').datepicker({
                        format: 'yyyy-mm-dd',
                        todayHighlight: 'TRUE',
                        autoclose: true,
                    });

                    $("#popover-contentsummary").hide()


                    checklist.length = 0;

                    if (d.isdelivered.includes(unescape((getCookie('dru4'))))) {

                    } else {
                        count++;
                    }
                    if (count == 1) {
                        count++;
                        $('.unread').prepend('<p> unread messages</p>')
                        //$('.unread .msg-text').text('unread messages');
                    }
                    $('.unread').removeClass('unread')
                });
                // $('.bs-popoversummary').popover({
                //     html: true,
                //     content: function () {
                //         return $('#popover-contentsummary').html();
                //     },
                //     title: 'Summary <button type="button" onclick="closepopover()" class="close" id="close">&times;</button>'
                // })
                filterusers.forEach(function (users, i) {

                    var popovercontent = `<div class="form-check filterusers">
                    <label class="form-check-label">
                      <input class="form-check-input" type="checkbox" name="f1-names"  onchange="filterdata()" id="` + users.email + `" value="` + (users.email).replace("@", "").replace(".", "") + `">
                    ` + users.name + `
                    </label>
                   </div>`

                    $("#popover-content").append(popovercontent);
                })
                $('.finleadchat').animate({
                    scrollTop: parseInt($(".finleadchat").height()) * data.length
                }, 'slow');

            }

            updateDlrdiscussionstatus(_docid);
        }
    });
}
function filterdata(){
    let users = (function() {
        let a = [];
        $(".form-check-input:checked").each(function() {
            $(".chatbxone").hide()
           
            a.push(this.value);
           
        });
        return a;
    })()
    let filterwith = (function() {
        let a = [];
        $(".form-check-filter:checked").each(function() {
            $(".chatbxone").hide()
           
            a.push(this.value);
            
        });
        return a;
    })()
    
    var listDate = [];
   
var startDate =$('.popover-content #fstartdate').val();
var endDate =$('.popover-content #fenddate').val();

var dateMove = new Date(startDate);
var strDate = startDate;
while (strDate < endDate){
  var strDate = dateMove.toISOString().slice(0,10);
  listDate.push(strDate);
  dateMove.setDate(dateMove.getDate()+1);
};

if(dateformate(strDate)===dateformate(endDate) && endDate!==""){
    listDate.push(strDate);

}
if(users.length!==0 && filterwith.length!==0){
    if(listDate.length!==0){
        listDate.forEach(function(date,i){
        users.forEach(function (clssanae,i,) {
            filterwith.forEach(function(filwith,i){
            $("."+clssanae+"-"+filwith+"-"+date).show()
        })
        })
    })
    }else{
    users.forEach(function (clssanae,i,) {
        filterwith.forEach(function(filwith,i){
        $("."+clssanae+"-"+filwith).show()
    })
    })

    }
}else if(users.length!==0 || filterwith.length!==0){


    if(filterwith.length!==0 ){
        if(listDate.length!==0){
            listDate.forEach(function(date,i){
                filterwith.forEach(function (clssanae,i,) {
                    $("."+clssanae+"-"+date).show()
                    
                })
            })
        }else{
    
        filterwith.forEach(function(filwith,i){
            $("."+filwith).show()
        })
    }
    }else if(users.length>=0){
        if(listDate.length!==0){
            listDate.forEach(function(date,i){
                users.forEach(function (clssanae,i,) {
                    $("."+clssanae+"-"+date).show()
                    
                })
            })
        }else{
        users.forEach(function (clssanae,i,) {
         
            $("."+clssanae).show()
            
        })
    }
    }else if(filterwith.length===0 && users.length===0){    $(".chatbxone").show()
}

}else{
    $(".chatbxone").show()

}
}

function taskStatus(id){
    $('.checklistdata').empty();

    $.ajax({
        url:"/fbpartnersfinance/gettaskstatus/"+id,
        type:"get",
        success:function(responce){
            
            if(responce.summary!==""){
             
                var checklistdata=`  
                
                <h5>Summary : `+responce.summary +` </h5>
            
                `
                $('.checklistdata').append(checklistdata);
            
            }else{
                var checklistdata=`<h5>Task Not Updated`
                $('.checklistdata').append(checklistdata);
            
            }
        }
    })
}
$(".fa-eercast").click(function(){
    bindactivitytypes()
})
//---------------------------------------------------------------------------------  add new 
function meetingStatus(id){
    $('.checklistdata').empty();

    $.ajax({
        url:"/fbpartnersfinance/gtmetingstatus/"+id,
        type:"get",
        success:function(responce){
if(responce.checklist.length!==0){
    var checklistdata=`  
    <label class="custom-control custom-checkbox">
    
    <input type="checkbox" checked value="Meeting" name="chbxTerms" class="custom-control-input">
    <span class="custom-control-label" for="chbxTerms">`+responce.checklist[0].name+`</span>
  
    </label>
    <h5>Summary : `+responce.summary +` </h5>

    `
    $('.checklistdata').append(checklistdata);

}else{
    var checklistdata=`<h5>Meeting Not Updated`
    $('.checklistdata').append(checklistdata);

}
        }
    })
}

function getfinchat() {
    var _docid = getUrlVars()['keyid'];
    var _url = "/fbExternallead/fbfinchat?keyid=" + _docid;

    $('.finDiscussion').empty();
    

    $.ajax({
        url: _url,
        type: "get",
        success: function (data) {
            if (!$.trim(data)) {

            } else {               
                $('#fininputmsg,#finuploadmsg').val('');
                $('#inputmsg,#uploadmsg').val('');
                var count = 0;
                data.forEach((d, i) => {
                    if (d.path && d.path !="undefined") {
                        img = 'static/' + d.path
                        var imgorname = `<img src="static/images/fbpartners/users/${d.path}" width="100%"/>`
                    } else {
                       
                        var imgorname=`<div class="prfle_ltr " >` + d.name.charAt(0) + '' + d.name.charAt(1) +`</div>`
                    }
                    //imageExistsfordisc("static/"+d.id+".jpeg",d.name,function(exist,){
                        var tile = ` <div class="col-md-12 chatbxone padmarse unread">
                        <div class="chatproimg">${imgorname}</div>
                         <div class="chatbxtext">
                             <h4 class="cht_name">${d.name} <span>${timeDifference(d.date)}</span></h4>
                            <p>${d.msg} </p>
                        </div>     
                    </div>`    
                   $('.finDiscussion').append(tile);

                    if (d.isdelivered.includes(unescape((getCookie('dru4'))))) {

                    } else {
                        count++;
                    }
                    if (count == 1) {
                        count++;
                        $('.unread .msg-text').text('unread messages');
                    }
                    $('.unread').removeClass('unread')
               // });
            });

                $('.finDiscussion').animate({
                    scrollTop: parseInt($(".finDiscussion").height()) + 100 * data.length
                }, 'slow');
            }
            updatefinDlrdiscussionstatus(_docid);
        }
    });
}
function getmanfchat() {
    var _docid = getUrlVars()['keyid'];
    var _url = "fbExternallead/fbmanfchat?keyid=" + _docid;
    $('.manfDiscussion').empty();
    $.ajax({
        url: _url,
        type: "get",
        success: function (data) {
            if (!$.trim(data)) {
                //console.log('getchat Description is Empty.. ');
                $('.refresh>i').removeClass('fa-pluse');
            } else {
                // $('#fininputmsg,#finuploadmsg').val('');
  
                var count = 0;
                data.forEach((d, i) => {
                    if (d.path && d.path !="undefined") {
                        img = 'static/' + d.path
                        var imgorname = `<img src="static/images/fbpartners/users/${d.path}" width="100%"/>`
                    } else {
                       
                        var imgorname=`<div class="prfle_ltr " >` + d.name.charAt(0) + '' + d.name.charAt(1) +`</div>`
                    }
                    //imageExistsfordisc("static/"+d.id+".jpeg",d.name,function(exist){
                    var tile = `<div class="col-md-12 chatbxone padmarse unread">
                    <div class="chatproimg">${imgorname}</div>
                     <div class="chatbxtext">
                         <h4 class="cht_name">${d.name} <span>${timeDifference(d.date)}</span></h4>
                        <p>${d.msg} </p>
                    </div>     
                </div>`

                   

                    $('.manfDiscussion').append(tile);
                      console.log('5516',d.isdelivered)
                    if (d.isdelivered.includes(unescape((getCookie('dru4'))))) {
                        console.log('5518',count)
                    } else {
                        count++;
                    }
                    console.log('5522',count)
                    if (count == 1) {
                        console.log('5523',count)
                        count++;
                        $('.unread').prepend('<p> unread messages</p>')
                       // $('.unread .msg-text').text('unread messages');
                    }
                    $('.unread').removeClass('unread')
               // });
            });

                $('.manfDiscussion').animate({
                    scrollTop: parseInt($(".manfDiscussion").height()) + 100 * data.length
                }, 'slow');
            }
            updatemanfdiscussionstatus(_docid);
        }
    });

}
function getallpartychat() {
    // var _docid = getUrlVars()['keyid'];
    if(getCookie('tenet') === '2'){
        var _docid = $('#sourceid').val();
      }else{
        var _docid = getUrlVars()['keyid'];
      }
    var _url = "fbExternallead/fballpartychat?keyid=" + _docid;
    $('.dallpartyDiscussion').empty();
    $.ajax({
        url: _url,
        type: "get",
        success: function (data) {
            if (!$.trim(data)) {
                //console.log('getchat Description is Empty.. ');
                $('.refresh>i').removeClass('fa-pluse');
            } else {
                // $('#fininputmsg,#finuploadmsg').val('');
  
                var count = 0;
                data.forEach((d, i) => {
                    if (d.path && d.path !="undefined") {
                        img = 'static/' + d.path
                        var imgorname = `<img src="static/images/fbpartners/users/${d.path}" width="100%"/>`
                    } else {
                       
                        var imgorname=`<div class="prfle_ltr " >` + d.name.charAt(0) + '' + d.name.charAt(1) +`</div>`
                    }
                    //imageExistsfordisc("static/"+d.id+".jpeg",d.name,function(exist){
                    var tile = `<div class="col-md-12 chatbxone padmarse unread">
                    <div class="chatproimg">${imgorname}</div>
                     <div class="chatbxtext">
                         <h4 class="cht_name">${d.name} <span>${timeDifference(d.date)}</span></h4>
                        <p>${d.msg} </p>
                    </div>     
                </div>`

                   

                    $('.dallpartyDiscussion').append(tile);

                    if (d.isdelivered.includes(unescape((getCookie('dru4'))))) {

                    } else {
                        count++;
                    }
                    if (count == 1) {
                        count++;
                        $('.unread').prepend('<p> unread messages</p>')
                       // $('.unread .msg-text').text('unread messages');
                    }
                    $('.unread').removeClass('unread')
               // });
            });

                $('.dallpartyDiscussion').animate({
                    scrollTop: parseInt($(".dallpartyDiscussion").height()) + 100 * data.length
                }, 'slow');
            }
           updateallpartydiscussionstatus(_docid);
        }
    });

}
function getdlmanfchat() {
    var _docid = getUrlVars()['keyid'];
    var _url = "/fbExternallead/fbdlmanfchat?keyid=" + _docid;

    $('.dlmanfDiscussion').empty();
    

    $.ajax({
        url: _url,
        type: "get",
        success: function (data) {
            if (!$.trim(data)) {
                //console.log('getchat Description is Empty.. ');
                $('.refresh>i').removeClass('fa-pluse');
            } else {

                $('.refresh>i').removeClass('fa-pluse');
                $('#fininputmsg,#finuploadmsg').val('');
                $('#inputmsg,#uploadmsg').val('');
                var count = 0;
                data.forEach((d, i) => {
                    // console.log(d)
                    if (d.path && d.path !="undefined") {
                        img = 'static/' + d.path
                        var imgorname = `<img src="static/images/fbpartners/users/${d.path}" width="100%"/>`
                    } else {
                       
                        var imgorname=`<div class="prfle_ltr " >` + d.name.charAt(0) + '' + d.name.charAt(1) +`</div>`
                    }
                   // imageExistsfordisc("static/"+d.id+".jpeg",d.name,function(exist){
                                          
                        var tile=` <div class="col-md-12 chatbxone padmarse unread">
                        <div class="chatproimg">${imgorname}</div>
                         <div class="chatbxtext">
                             <h4 class="cht_name">${d.name} <span>${timeDifference(d.date)}</span></h4>
                            <p>${d.msg} </p>
                        </div>     
                    </div> `

                    

                    $('.dlmanfDiscussion').append(tile);

                    if (d.isdelivered.includes(unescape((getCookie('dru4'))))) {

                    } else {
                        count++;
                    }
                    if (count == 1) {
                        count++;
                        $('.unread').prepend('<p> unread messages</p>')
                        //$('.unread .msg-text').text('unread messages');
                    }
                    $('.unread').removeClass('unread')
               // });
            });

                $('.dlmanfDiscussion').animate({
                    scrollTop: parseInt($(".dlmanfDiscussion").height()) + 100 * data.length
                }, 'slow');
            }
            updatemanftoDlrdiscussionstatus(_docid);
        }
    });
}
function updateDlrdiscussionstatus(_docid){
    var _url = '/fbpartnerlead/updateDlrdiscussionstatus';
    $.ajax({
        url: _url,
        type: "POST",
        data: JSON.stringify({
          lead: {
            id: _docid,
           
          }
        }),
        contentType: "application/json; charset=utf-8",
        success: function (data) {
  
          if (data == 'failed') {
            alert('contact Admin')
          }else {
         
          } 
  
        }
      });
}
function updatemanfdiscussionstatus(_docid){
    var _url = '/fbExternallead/updateDlrtomanfdiscussionstatus';
    $.ajax({
        url: _url,
        type: "POST",
        data: JSON.stringify({
          lead: {
            id: _docid,
            useremail:getCookie('dru4').replace("%40","@")
            
          }
        }),
        contentType: "application/json; charset=utf-8",
        success: function (data) {
  
          if (data == 'failed') {
            alert('contact Admin')
          }else {
         
          } 
  
        }
      });
}
function updatemanftoDlrdiscussionstatus(_docid){
    var _url = '/fbExternallead/updatemanftoDlrdiscussionstatus';
    $.ajax({
        url: _url,
        type: "POST",
        data: JSON.stringify({
          lead: {
            id: _docid,
            useremail:getCookie('dru4').replace("%40","@") 
           
          }
        }),
        contentType: "application/json; charset=utf-8",
        success: function (data) {
  
          if (data == 'failed') {
            alert('contact Admin')
          }else {
         
          } 
  
        }
      });
}
function updatefinDlrdiscussionstatus(_docid) {
    var _url = '/fbpartnerlead/updatefinDlrdiscussionstatus';
    $.ajax({
        url: _url,
        type: "POST",
        data: JSON.stringify({
            lead: {
                id: _docid,

            }
        }),
        contentType: "application/json; charset=utf-8",
        success: function (data) {

            if (data == 'failed') {
                alert('contact Admin')
            } else {

            }

        }
    });
}
function updateallpartydiscussionstatus(_docid){
    var _url = '/fbExternallead/updateallpartydiscussionstatus';
    $.ajax({
        url: _url,
        type: "POST",
        data: JSON.stringify({
          lead: {
            id: _docid,
            useremail:getCookie('dru4').replace("%40","@")
          }
        }),
        contentType: "application/json; charset=utf-8",
        success: function (data) {
  
          if (data == 'failed') {
            alert('contact Admin')
          }else {
         
          } 
  
        }
      });
}
// function bindstagetimeline()
// {


//     var _docid= getUrlVars()["keyid"]
//     var _url='fbpartners/leadstagedetails?keyid='+_docid;


//     // $(".ctile").empty();


//     if(_docid)
//     {

//         $.ajax({
//             url:_url,
//             type: "get",                   
//             success: function (data) {
//                // //console.log(data);

//                 data.leads.forEach(function(el){




//                     var ldstage = el.leadsstage;
//                 $(".leadstimlines").each(function(){

//                     var lduistage = $(this).find('.timeline__event__title').text();


//                    if(ldstage == lduistage){

//                        $(this).addClass('is--complete');

//                        $(this).find('.timeline__event__date').html( el.diddate)
//                    }
//                 })

//             //   var tile=  '<li class="timeline__event is--complete"><figure class="dot"><span class="ratio svg dot__icon">'+
//             //         '<canvas width="9px" height="9px"></canvas> <svg viewBox="0 0 9 9"><use xlink:href="/src/svg/symbols/symbols.svg#tick"></use></svg>'+
//             //         '</span> </figure><h5 class="timeline__event__title">'+ el+'</h5>  <h6 class="timeline__event__difference"></h6> '+											
//             //         '<p class="timeline__event__date">Monday 1st August</p> '                                                                       


//                 //    $('.ctile').prepend(tile);















//                 });


//             }
//         });
//     }

// }

function bindstagetimeline() {

    var _docid = getUrlVars()["keyid"]
    var _url = 'fbpartnerlead/dealerleadstagedetails?keyid=' + _docid;;


    //$(".timeline").empty();


    if (_docid) {

        $.ajax({
            url: _url,
            type: "get",
            success: function (data) {
               

                data.leadstages.forEach(function (el, index, arr) {

                    if (Array.isArray(el)) {
                        el = el[0]
                    }


                    var current = new Date(el.updateddate);
                    var next = new Date((arr.length - 1 === index) ? Date.now() : arr[index + 1].updateddate);
                    ////console.log("Previous: " + ((0 === index)? "START" : arr[index-1].updateddate));

                    var timeDiff = Math.abs(next.getTime() - current.getTime());
                    var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

                    $('.timeline__event__title').text();

                    $(".leadstimlines").each(function () {




                        if (el.leadsstage == $(this).find('.timeline__event__title').text()) {

                            $(this).addClass('is--complete');


                            //    $(this).find('.timeline__event__pophovers').attr('data-content',el.updateddate+''+diffDays+' days') ;
                            $(this).find('.timeline__event__date').html(el.updateddate)
                            $(this).find('.timeline__event__days').html(diffDays + ' days')
                        }
                    })






                });


            }
        });
    }

}
function binddealerstagetimeline() {
    var _url = 'fbExternallead/Extdealerleadstagedetails?keyid=' + $('#sourceid').val();;
    
        $.ajax({
            url: _url,
            type: "get",
            success: function (data) {
                if (!$.trim(data)) {
                }else{
                data.leadstages.forEach(function (el, index, arr) {

                    if (Array.isArray(el)) {
                        el = el[0]
                    }


                    var current = new Date(el.updateddate);
                    var next = new Date((arr.length - 1 === index) ? Date.now() : arr[index + 1].updateddate);
                    ////console.log("Previous: " + ((0 === index)? "START" : arr[index-1].updateddate));

                    var timeDiff = Math.abs(next.getTime() - current.getTime());
                    var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

                    $('.timeline__event__title').text();

                    $(".dealerleadstimlines").each(function () {
                        if (el.leadsstage == $(this).find('.timeline__event__title').text()) {

                            $(this).addClass('is--complete');


                            //    $(this).find('.timeline__event__pophovers').attr('data-content',el.updateddate+''+diffDays+' days') ;
                            $(this).find('.timeline__event__date').html(el.updateddate)
                            $(this).find('.timeline__event__days').html(diffDays + ' days')
                        }
                    })
                });
            }
            }
        });
    

}

function bindcampaignnames() {
   
    var _url = '/fbpartnersfinance/getfinancecampaign';
   
    $.ajax({
        url: _url,
        type: "get",
        success: function (data) {
    
            if (!$.trim(data)) {
                //console.log('No Data Found..');
            } else {
                // //console.log(data);
                //$('#expenseson').append('<option value="0">Please Select Campaign</option>');
                  $('#campaignname').empty().append('<option value="">Please Select Campaign</option>');
                data.forEach(function (ele, index) {
                    $('#campaignname').append('<option value="' + ele.id + '" >' + ele.campaignname + '</option>');
                });
            }
        }
    });
}

function bindfinusers() {
    $('#Assigned,.Assigne,.tAssigned').empty().append('<option value="">Please Select User</option>')

    $.ajax({
        url: 'fbpartnersfinance/getfinusers',
        type: "get",
        success: function (data) {

            data.forEach(function (ele) {

                if (ele.role !== 'FinancialAdmin') {



                    $('#Assigned').append('<option value="' + ele.email + '|' + ele.id + '">' + ele.name + '</option>');
                    $('.Assigne').append('<option value="' + ele.email + '|' + ele.id + '">' + ele.name + '</option>');

                    // $('#finAssigned').append('<option value="' + ele.email + '|' + ele.id + '">' + ele.name + '</option>');
                }
                $(".Assigned option:contains('" + unescape(getCookie('dru5')) + "')").attr('selected', true).trigger('change.select2');
                //$('#Assigned').attr("selected","selected")  
                //$('#Assigned option:selected').text(ele.name)

            })
        },
        error: function () {
            //console.log('error');
        }
    });



}

function bindeditproduct() {
   
        bindusers();
        bindmanufacturernames();
   

    var _docid = getUrlVars()["keyid"]
    //bindcompanynames();
    //bindcontactnames();
    $(".docdis").empty();
    if (_docid) {
        $.ajax({
            url: 'fbpartners/productdetails?keyid=' + _docid,
            type: "get",
            success: function (data) {
                
                if (data.productowner) {
                    var options = data.productowner.split(',');
                    if (Array.isArray(options) && options.length) {
                        options.forEach(function (e) {
                            $("#Assigned option:contains('" + e + "')").attr('selected', true).trigger('change.select2')
                        })
                    };
                }
                $('#Name').val(data.Name),
                    $('#Serial-Number').val(data.SerialNumber),
                    $('#Price').val(data.Price);
                // $('#Tax').val(data.Tax);
                $('#Tax option[value="' + data.Tax + '"]').attr('selected', true).trigger('change'),
                $('#hsncode').val(data.HSNCode),
                $("#manufacturer option:contains('" + data.Manufacturer + "')").attr('selected', true).trigger('change.select2');
                
                    $('#Description').val(data.Description),
                    $('#sDescription').val(data.ShortDescription),
                    $('#Contact').val(data.ContactPerson)

                if (data.logopath != '' && data.logopath != null) {
                    $(".imgarea").empty();
                    $(".imgarea").append('<div class="audio"><div class="addoc"><a href="' + data.logopath + '"><img src="static/' + data.logopath + '"></a></div></div>')
                }
                if (data.isservice == 1) {
                    $('#isservice').prop('checked', true)
                }
                data.proddocs.forEach(function (el) {
                    if (Array.isArray(el)) {
                        el = el[0];
                    }
                    $(".docdis").append('<tr><td class="ksidws">' + el.docname + '</td><td class="ksidws2"><a href="/fbpartners/viewodoc?docname=' + el.docpath + '" class="fildownad"><i class="fa fa-download"></i></a></td></tr>')
                });
            }
        });
    }
}
function bindmanufacturernames() {
   // $('#manufacturer').empty().append('<option value="">Please Select manufacturer</option>')

    $.ajax({
        url: 'fbpartnersfinance/getmanufacturernames',
        type: "get",
        success: function (data) {

            data.forEach(function (ele) {
             

                $('#manufacturer').append('<option value="' + ele._id+ '|' + ele.code+'">'+ele.name+'</option>');

            })
        },
        error: function () {
            //console.log('error');
        }
    });



}
function gettotalamount() {

    var _docid = getUrlVars()["keyid"]
    //bindcompanynames();
    //bindcontactnames();

    if (_docid) {
        //$(".imgarea").empty();
        $.ajax({
            url: 'fbpartnersloan/gettotalamount?keyid=' + _docid,
            type: "get",
            success: function (data) {
                ////console.log(data)
                if (data == 'less amount') {
                    // //console.log(data);
                    $('.alertsreds').css("display", "block");
                }


            },
            error: function () {
                //console.log('error');
            }
        });
    }

}

function bindeditservice() {

    var _docid = getUrlVars()["keyid"]
    bindcompanynames();
    bindcontactnames();
    if (_docid) {
        $.ajax({
            url: 'fbpartners/servicedetails?keyid=' + _docid,
            type: "get",
            success: function (data) {

                $('#Name').val(data[0].Name),
                    $('#Serial-Number').val(data[0].SerialNumber),
                    $('#Price').val(data[0].Price),
                    $('#Company option:selected ').text(data[0].Manufacturer),
                    $('#Description').val(data[0].Description),

                    $('#Contact option:selected').text(data[0].ContactPerson)


            }
        });
    }

}

function bindeditloan() {
    var _docid = getUrlVars()["keyid"]

    if (_docid) {
        $.ajax({
            url: 'fbpartnersloan/loansdetails?keyid=' + _docid,
            type: "get",
            success: function (data) {

                $('#loanName').val(data[0].loanname),
                    $('#loannumber').val(data[0].loannumber),
                    $('#loanamount').val(data[0].loanamt),
                    $('#description').val(data[0].description),
                    $('#startdate').val(data[0].startDate),
                    $('#Enddate').val(data[0].endDate)

            }
        });
    }

}

function bindcompanynames() {
   
    $('#Company').empty().append('<option value="">Please Select Company</option>')
    $.ajax({
        url: 'fbpartners/getcompanynames',
        type: "get",
        success: function (data) {

            data.forEach(function (ele) {


                $('#Company').append('<option value="' + ele.email + '|' + ele.id + '">' + ele.name + '</option>');

            })
        },
        error: function () {
            //console.log('error');
        }
    });



}


function bindleadstagenames() {
    $('.kiolsdmcs').empty();
    $.ajax({
        url: 'fbpartners/getleadstagenames',
        type: "get",
        success: function (data) {
         
            // data.forEach(function(ele)
            // {
            //     $('#leadstage').append('<option value="'+ele.stagename+ '">'+ele.stagename+'</option>');
            // });

            var dat = data.reverse();
            dat.forEach(function (ele) {



                var tile = '<li class="timeline__event leadstimlines">  ' +

                    '<figure class="dot">      ' +
                    '<span class="ratio svg dot__icon">' +
                    '<canvas width="9px" height="9px"></canvas>' +
                    '<svg viewBox="0 0 9 9"><use xlink:href="/src/svg/symbols/symbols.svg#tick"></use></svg>' +
                    '</span>             </figure>' +

                    '<h5 class="timeline__event__title">' + ele.stagename + '</h5>' +
                    '<h6 class="timeline__event__difference"></h6>' +
                    '<p class="timeline__event__date"> </p><p class="timeline__event__days"> </p>' +

                    '</li>'





                $('.kiolsdmcs').prepend(tile);

            })
        },
        error: function () {
            //console.log('error');
        }
    });



}
function binddealerleadstagenames() {
    $('.dstagekiolsdmcs').empty();
    $.ajax({
        url: 'fbpartners/getdealerleadstagenames?id='+ $('#dlrid').val() +"&name="+$('#bdealername').text(),
        type: "get",
        success: function (data) {
            var dat = data.reverse();
            dat.forEach(function (ele) {
                var tile = '<li class="timeline__event dealerleadstimlines">  ' +

                    '<figure class="dot">      ' +
                    '<span class="ratio svg dot__icon">' +
                    '<canvas width="9px" height="9px"></canvas>' +
                    '<svg viewBox="0 0 9 9"><use xlink:href="/src/svg/symbols/symbols.svg#tick"></use></svg>' +
                    '</span>             </figure>' +

                    '<h5 class="timeline__event__title">' + ele.stagename + '</h5>' +
                    '<h6 class="timeline__event__difference"></h6>' +
                    '<p class="timeline__event__date"> </p><p class="timeline__event__days"> </p>' +

                    '</li>'
                $('.dstagekiolsdmcs').prepend(tile);

            })
        },
        error: function () {
            //console.log('error');
        }
    });



}
function bindleadstagedrop() {
    $('#leadstage').empty().append('<option value="">Please Select Lead Stages</option>')
    
    $('.kiolsdmcs').empty();
    $.ajax({
        url: 'fbpartners/getleadstagenames',
        type: "get",
        success: function (data) {
            data.forEach(function (ele) {
                $('#leadstage').append('<option value="' + ele.stagename + '">' + ele.stagename + '</option>');
            });


        },
        error: function () {
            //console.log('error');
        }
    });



}
function bindusers() {
    $('#Assigned,.tAssigned').empty().append('<option value="">Please Select User</option>')
    $('#Assigned,.attendingmeeting').empty();
    $.ajax({
        url: 'fbpartners/getusers',
        type: "get",
        success: function (data) {
            //$('#Assigned').append('<option value="0">Please Select Assign</option>');
            data.forEach(function (ele) {
                if (ele.role !="admin") {
                    $('#Assigned').append('<option value="' + ele.email + '|' + ele.id + '">' + ele.name + '</option>');
                    if(getCookie('dru4').replace("%40","@")!==ele.email ){
                        //  alert("ok")
                         $('.tAssigned').append('<option value="'  + ele.email + '">' + ele.name + '</option>');

                            }
                            $('.attendingmeeting').append('<option value="'+ ele.email+'">' + ele.name + '</option>');

                  //  $('.tAssigned').append('<option value="'  + ele.email + '">' + ele.name + '</option>');
                }
                $(".Assigned option:contains('" + unescape(getCookie('dru5')) + "')").attr('selected', true).trigger('change.select2');
                
            })
            $("#Assigned").on("change",function(e){
                // alert("HI")
               //  console.log(e.target.value)
                 $('.tAssigned').empty();
               var  assinerdname=getCookie("dru5")
                // console.log(getCookie("dru3"))
                var assnevale=$('#Assigned option:selected').val().split('|')[0]
                 var updatedData = data.filter(item => item.email !== assnevale);
                 updatedData.forEach(function (ele) {
                                          if (ele.role !="admin" && ele.role !="FinancialAdmin" ) {
                                            
                                  $('.tAssigned').append('<option value="'  + ele.email + '">' + ele.name + '</option>');
             
                              }
                    
                                    })
                                    
                                    if(e.target.value.split("|")[0]!==getCookie("dru4")){
                                   //  alert("slove")
                                     $("#attending option:contains('" + assinerdname + "')").attr('selected', true).trigger('change.select2')
                 
                                 }
 
                                
                                 
             })
        },
        error: function () {
            //console.log('error');
        }
    });
}
function bindleadAssignedusers() {
    $('#ldAssigned').empty().append('<option value="">Please Select User</option>')
  
  // $('#Assigned').empty();
    $.ajax({
        url: 'fbpartners/getusers',
        type: "get",
        success: function (data) {
            //$('#Assigned').append('<option value="0">Please Select Assign</option>');
            data.forEach(function (ele) {
                if (ele.role ==="SM"||(ele.role ==="ASM")) {
                    $('#ldAssigned').append('<option value="' + ele.email + '|' + ele.id + '">' + ele.name + '</option>');
                    //$('.tAssigned').append('<option value="'  + ele.email + '">' + ele.name + '</option>');
                }
                $(".Assigned option:contains('" + unescape(getCookie('dru5')) + "')").attr('selected', true).trigger('change.select2');
                
            })
        },
        error: function () {
            //console.log('error');
        }
    });
}
function bindmanagers() {
    $('#manager').empty().append('<option value="">Please Select Manager</option>')

    $.ajax({
        url: 'fbpartners/getmanagers',
        type: "get",
        success: function (data) {

            data.forEach(function (ele) {
             

                $('#manager').append('<option value="' + ele.id + '|' + ele.email + '">' + ele.name + '</option>');

            })
        },
        error: function () {
            //console.log('error');
        }
    });



 }

function binddealersmanagers() {
    $('#manager').empty().append('<option value="">Please Select Manager</option>')
    $.ajax({
        url: "/fbpartners/getdealersmanagers",
        type: "get",
        success: function (data) {
           
            if (data=="No Managers Available") {
               
            } else {
                data.forEach(function (ele) {
 
                    $('#manager').append('<option value="' + ele.id + '|' + ele.email + '">' + ele.name + '</option>');
 
                });
            }
        },
        error: function () {
            //console.log('error');
        }
    });


 
}

// function bindmanagers(role) {

//     $.ajax({
//         url: 'fbpartners/getmanagers?role=' + role,
//         type: "get",
//         success: function (data) {

//             data.forEach(function (ele) {


//                 $('#manager').append('<option value="' + ele.id + '|' + ele.email + '">' + ele.name + '</option>');

//             })
//         },
//         error: function () {
//             //console.log('error');
//         }
//     });



// }


function getcontact(company) {
    $('#Contact').empty().append('<option value="">Please Select Contact</option>')

    $.ajax({
        url: '/fbpartners/getcontacts',
        type: "get",
        success: function (data) {

            data.forEach(function (ele) {

                if (ele.company == company)
                    $('#Contact').append('<option value="' + ele.id + '">' + ele.name + '</option>');

            })
        },
        error: function () {
            //console.log('error');
        }
    });



}


function bindcontactnames() {
    $('#Contact').empty().append('<option value="">Please Select Contact</option>')

    $.ajax({
        url: 'fbpartners/getcontactnames',
        type: "get",
        success: function (data) {

            data.forEach(function (ele) {


                $('#Contact').append('<option value="' + ele.id + '">' + ele.name + '</option>');

            })
        },
        error: function () {
            //console.log('error');
        }
    });



}

function bindproductnames() {
    $.ajax({
        url: 'fbpartners/getproductnames',
        type: "get",
        success: function (data) {
            data.forEach(function (ele) {
                //$('#leadequipments').append('<option value="' + ele.Name + '">' + ele.Name + '</option>');
                $('#leadequipments').append('<option data-id="' + ele.id + '" value="' + ele.Name + '">' + ele.Name +'[' +ele.Manufacturer +']</option>');
            })
        },
        error: function () {
            //console.log('error');
        }
    });
}
function bindmanufacturersbyproducts(id) {
   // var id = $('#leadequipments option:selected').toArray().map(item => $(item).data("id")).join();
    console.log('6138',id)
    $.ajax({
        url: 'fbpartnersfinace/bindmanufacturersbyproducts?id='+id,
        type: "get",
        success: function (data) {
            data.forEach(function (ele) {
                //$('#leadequipments').append('<option value="' + ele.Name + '">' + ele.Name + '</option>');
                $('#manufacturer').append('<option value="'+ ele.hosturl +'|'+ele.code+'">' + ele.name +'</option>');
            })
        },
        error: function () {
            //console.log('error');
        }
    });
}
function bindfinproductnames(id) {

    $.ajax({
        url: 'fbpartners/getfinproductnames?key2id=' + id,
        type: "get",
        success: function (data) {

            data.forEach(function (ele) {


                $('#leadequipments').append('<option value="' + ele.Name + '">' + ele.Name + '</option>');
                //$('.fstResults').append('<span class="fstResultItem">'+ele.Name+'</span>');
            })
        },
        error: function () {
            //console.log('error');
        }
    });



}
function binddueemi() {
    $('.dueemidetals').empty();
    var _docid = getUrlVars()["keyid"]
    $.ajax({

        url: 'fbpartnersloan/getdueemi',
        type: "get",
        success: function (data) {

            for (var d in data) {

                var tile =
                    '<table>' +
                    '<tr>' +

                    '<td class="jdjiep">' + data[d].company + '</td>' +
                    '<td class="jdjiep3e"> Rs. ' + Number(data[d].EMIamount).toLocaleString('en-IN') + '</td>' +
                    '<td class="jdjiep4e">' + data[d].diffDays + '<button class ="sendmail"  data-cemail="' + data[d].companyEmail + '" data-Emiamount="' + data[d].EMIamount + '"data-sno="' + data[d].sno + '" data-duedate="' + data[d].duedate + '" data-company="' + data[d].company + '" onclick="notifydue();">send mail</buton></td>' +
                    '</tr>' + '</table>'
                $('.dueemidetals').prepend(tile);

            }

        }
    });

}
function adshbinddueemi() {
    // alert("emi")
        $('.dueemidetals').empty();
    
    
        var _docid = getUrlVars()["keyid"]
    
    
        $.ajax({
    
            url: 'fbpartnersloan/getdueemi',
            type: "get",
            success: function (data) {
    //console.log(data)
                for (var d in data) {
    
                    var tile =`<tr>
                    <td class="colsd2">`+data[d].company+`</td>
                    <td class="colsd3">`+Number(data[d].EMIamount).toLocaleString('en-IN') +`</td>'
                    <td class="colsd4">`+new Date(data[d].duedate).toLocaleDateString()+`,`+data[d].diffDays +`days</td>
                     <td class="colsd33"><button type="button" class="allnotifybtn22" data-cemail="` + data[d].companyEmail + `" data-Emiamount="`+ data[d].EMIamount + `"data-sno="` + data[d].sno + `" data-duedate="` + data[d].duedate + `" data-company="` +data[d].company + `" onclick="notifydue();">Notify</button></td>
 
                 </tr>`;
                     //    '<table>' +
                     //    '<tr>' +
    
                     //    '<td class="jdjiep">' + data[d].company + '</td>' +
                     //    '<td class="jdjiep3e"> Rs. ' + Number(data[d].EMIamount).toLocaleString('en-IN') + '</td>' +
                     //    '<td class="jdjiep4e">' + data[d].diffDays + '<button class ="sendmail"  data-cemail="' + data[d].companyEmail + '" data-Emiamount="' + data[d].EMIamount + '"data-sno="' + data[d].sno + '" data-duedate="' + data[d].duedate + '" data-company="' + data[d].company + '" onclick="notifydue();">send mail</buton></td>' +
                     //    '</tr>' + '</table>'
                   // $('.dueemidetals').prepend(tile);
                    $(".duemi").append(tile)
    
                }
    
            }
        });
    
    }
 
 
 
 //************************************************************************************************
 function upcomingemi(){
   //  alert("hi")
     $.ajax({
         url:"/fbpartnersloan/upcomingemidates",
         type:"get",
         success:function(data){
          //   //console.log("pending"+data )
 var upcomingemi=''
         $.each(data,function(i,v){
          //   //console.log(new Date(v["EMIs"].duedate)-new Date())
             var d1=new Date()
             var d2=new Date(v["EMIs"].duedate)
             var ndays;
             var tv1 = d1.valueOf();  // msec since 1970
             var tv2 = d2.valueOf();
           
             ndays = (tv2 - tv1) / 1000 / 86400;
             ndays = Math.round(ndays - 0.5);
             //console.log(ndays)
 upcomingemi=`<tr>
 <td class="colsd2">`+v.company+`</td>
 <td class="colsd3">`+v['EMIs'].EMIamount+`</td>
 <td class="colsd4">`+new Date(v["EMIs"].duedate).toLocaleDateString()+`,`+ndays+`days</td>
 <td class="colsd33"><button type="button" class="allnotifybtn22" data-cemail="` + v.companyEmail + `" data-Emiamount="`+ v['EMIs'].EMIamount + `"data-sno="` + v['EMIs'].sno + `" data-duedate="` + v['EMIs'].duedate + `" data-company="` +v.company + `" onclick="notifydue();">Notify</button></td>
 
 </tr>`;
 $(".upcomigemi").append(upcomingemi)
 
         })
 
         }
     })
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

function check() {

    var $page = document.location.href.match(/[^\/]+$/)[0];
    $('.c-menu ul li a').each(function () {
        var $href = $(this).attr('href');
        if ($href == $page) {
            $(this).addClass('is-active');
        } else {
            $(this).removeClass('is-active');
        }
    });
}

function datadisable() {
    var _docid = getUrlVars()["keyid"]
    if (_docid) {
        $(":input").not(".fblogout1,.documentupload,#qkl-ldAssigned,#qkl-team,.qkl-save").attr('disabled', 'disabled');
    }
    $("#editinputs").click(function () {       
        $(":input ").not("#fdback, #fnback,#financesummary,.readonly").removeAttr('disabled');
        $("[data-valid]").removeAttr('disabled');
        $('[data-disabled]').attr('disabled', 'disabled');
    })
}
function userdetails() {
    $('.greeting').empty();
    var _url = '/fbpartners/Currentuserdetails';
    $.ajax({
        url: _url,
        type: "get",
        success: function (data) {
           
            var tile = ` <div class="imaglands ctile">
            <div class="usernamett">` + data[0].name.charAt(0) + `</div><div class="usrprofilepic">
                <img src="static/` + data[0].logopath + `"></div>
         </div> 
         <div class="welcomeusrstest">
             <h1>Good Morning, <b>` + data[0].name + `!</b></h1>
 
         </div>`
 
            $('.greeting').prepend(tile);
 
            if (data[0].logopath != null) {
                $(".ctile  .usernamett").css("display", "none");
                $(".ctile .usrprofilepic").css("display", "block");
            } else {
                $(".ctile  .usrprofilepic").css("display", "none");
                $(".ctile  .usrnamesltrs").css("display", "block");
            }
            $('.ctile').removeClass('ctile')
        }
    });
}
function displayuserlogo(){
   
    if(unescape( getCookie('fblogo')) && unescape( getCookie('fblogo'))!="undefined" && unescape( getCookie('fblogo'))!="j:null"  ){
 
        $(".uselogoheader").show()
                   $(".prfle_ltr").hide()
        $(".uselogoheader").attr( "src",'static/images/fbpartners/users/'+unescape( getCookie('fblogo')))
    }else{
        $(".uselogoheader").hide()
                 $(".prfle_ltr").show()
      //  $("#currentuser").text((unescape(getCookie('dru5'))).charAt(0) + '' + (unescape(getCookie('dru5'))).charAt(1) + '');
        $(" .prfle_ltr").text((unescape(getCookie('dru5'))).charAt(0) + '' + (unescape(getCookie('dru5'))).charAt(1) + '') 
    }
}

$(function () {
    displaydealerlogo();
    displayuserlogo();
   
    getnotifications();
    loader = '<div class="iprogress"><i class="fa fa-refresh  fa-spin fa-5x"><\/i><\/div>'
    // var loading = $("#loading");
    $(document).ajaxStart(function () {
        ////console.log('ajaxstart fired')

        $('body').append(loader)
    });

    $(document).ajaxStop(function () {
        ////console.log('ajaxstop fired')
        $(".iprogress").remove()
    });
});
    var ticketslist = ["FinancialAdmin", "admin", "BH", "AM", "SA", "SPM", "SE"]; //50-50
    // var tickets = ["NSM", "ZSM", "RSM", "ASM", "SC", "SM", "TE", "TM"]; //MOSTLY PARTNERS
    var myticketslist = ["ASM", "SM", "Banker", "cxo", "NSM", "ZSM", "RSM", "ASM", "SC", "SM", "TE", "TM", "CM", "CC", "CT", "CTM"]; //99% FINBOT SIDE

    if (ticketslist.includes(getCookie('dru6'))) {
        $('.tkt li#myticketslist,.tkt li#tickets').remove();
    } else if (myticketslist.includes(getCookie('dru6'))) {
        $('.tkt li#ticketslist,.tkt li#tickets').remove();
    } else {
        $('.tkt li#ticketslist,.tkt li#myticketslist').remove();
    }
    
    $('.u-list>li').hide();
    $('.moblist>li').hide();
    if(localStorage.getItem('menu') == null){
        $.ajax({
            url: '/fbpartners/getmenu',
            type: "get",
            success: function (dataa) {
            localStorage.setItem('menu', JSON.stringify(dataa));
           // localStorage.removeItem('menu');
    
           var data= JSON.parse(localStorage.getItem('menu'))
          
           menuloop(data)
    
    
            },
            error: function () {
                $(location).attr('href', '/')
            }
        });
    }else{
        var data= JSON.parse(localStorage.getItem('menu'))
       
        menuloop(data)
    
    }
    function menuloop(data){
       
        $('.u-list>li').each(
            function (el) {
                var item = $(this).attr('id')
                if (jQuery.inArray(item, data) !== -1) {
                    $(this).show();
                }
            });
          
            $('.moblist>li').each(
                function (el) {
                    var item = $(this).attr('id')
                  
                    if (jQuery.inArray(item, data) !== -1) {
                        $(this).show();
                    }
                });
    }
    
    var username = $.trim(unescape(getCookie('dru5'))).toUpperCase();
   var logo = $.trim(unescape(getCookie('fblogo')))
 
    $("#banklogo").attr("src", "static/" + getCookie('fblogo'));
  // $("#banklogo").attr("src", "static/" + logo);
    $("#currentuser").text(getCookie('fbbank'));
    $("#currentwelcome").text('Welcome  ' + username);


   

    

function bindbanddetails(id) {
    var _docid = id
    //bindcontactnames();
    if (_docid) {
        $.ajax({
            url: 'fbpartnersfinance/banddetails?keyid=' + _docid,
            type: "get",
            success: function (data) {



                $('#salary').val(data[0].salary),
                    $('#monthlytarget').val(data[0].monthlytarget),
                    $('#quaterlytarget').val(data[0].quaterlytarget)





            }
        });
    }

}




function displaydealerlogo() {
    if (localStorage.getItem("userdeat") == null) {
      
        var _url = '/fbpartnersfinance/getdealerlogo?name=' + getCookie('fbbank');
        $.ajax({
            url: _url,
            type: "get",
            success: function (data) {
                localStorage.setItem('userdeat', JSON.stringify(data));
                $("#banklogo").attr("src", "static/" + data.logopath);
                $("#currentuser").text(data.bankname);

                if (data.logopath != undefined && data.logopath != '') {
                    $(".mainlogos .usernamett").css("display", "none");
                    $(".mainlogos #banklogo").css("display", "block");
                } else {
                    $(".mainlogos #banklogo").css("display", "none");
                    $(".mainlogos .usernamett").css("display", "block");
                }
            },
            error: function () {
                $(location).attr('href', '/')
            }
        });
    } else {
        var data = JSON.parse(localStorage.getItem('userdeat'))
        //  console.log(data)
        $("#banklogo").attr("src", "static/" + data.logopath);
        $("#currentuser").text(data.bankname);
        if (data.logopath != undefined && data.logopath != '') {
            $(".mainlogos .usernamett").css("display", "none");
            $(".mainlogos #banklogo").css("display", "block");
        } else {
            $(".mainlogos #banklogo").css("display", "none");
            $(".mainlogos .usernamett").css("display", "block");
        }
    }
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
function add3Dots(string, limit) {
    var dots = "...";
    if (string.length > limit) {
        string = string.substring(0, limit) + dots
    }
    return string
}
// ======================================== Account Start =============================================

function getmyaccount() {
    var _url = '/fbpartners/getmyaccount'
    $.ajax({
        url: _url,
        type: "get",
        success: function (data) {
          
            $('.ad-cent1 h1,#fname').text(data.name);
            $('#lcity').text(data.city);
            $('.ad-cent1 p,#emailid').text(data.email);
            $('#phoneno').text(data.phone);

            $('.profile-pic').attr('src', 'static/' + data.logopath);
            $('#newimg').text(data.logopath);
            $('#firstname').val(data.name);
            $('#email').val(data.email);
            $("#city").val(data.city);
            $('#phone').val(data.phone);
            $('#password').val();


            $('#chngpswd').click(function () {
                $('#pswd').css({
                    display: 'none'
                });
                $('#password').css({
                    display: 'block'
                });
                $('#chngpswd').text('cancel').attr('id', 'canpswd').attr('onclick', 'cancelpswd()');

                $('#lblupdatepswd').show();
                $('.toggle-password').show();
            });

            $('.savebtn').attr('onclick', 'myaccupdate(\'' + data.id + '\')');
            $('#updatepswd').attr('onclick', 'updatepswd(\'' + data.id + '\')');

            $('.editcog1').click(function () {
                $('.fa.fa-check').attr('onclick', 'myaccupdate(\'' + data.id + '\')');
            });
        }
    });
}

function getmypartneracc() {
    var _url = '/fbpartners/getmypartneracc'
    $.ajax({
        url: _url,
        type: "get",
        success: function (data) {
           
            $('.ad-cent1 h1,#bname').text(data.bankdisplayname);
            $('#lwebsite').text(data.website);
            $('.ad-cent1 p').text(data.email);
            $('#phoneno').text(data.phone);
            $('p#desc').text(data.partnerdesc);
            $('#emailid').text(data.email);
            $('#hostname').text(data.url);
            $('#loginpass').text(data.pwd);
            $('#Mailer').text(data.mailerto);
            $('#emailpass').text(data.emailpwd);
            $('#port').text(data.port);

            $('.profile-pic').attr('src', 'static/' + data.logopath);
            $('#newimg').text(data.logopath);
            $('#bankname').val(data.bankdisplayname);
            $('#email').val(data.email);
            $("#website").val(data.website);
            $('#phone').val(data.phone);
            $('#eMailer').val(data.mailerto);
            $('#portnum').val(data.port);
            $("#host_name").val(data.url)
            $('#emailpwd').val(data.emailpwd);
            $("#loginpassggg").val(data.pwd)
            $('#email').val(data.email);
            $('input#desc').val(data.partnerdesc);


            $('.savebtn').attr('onclick', 'mypartneraccupdate()');
            $('.editcog1').click(function () {
                $('.fa.fa-check').attr('onclick', 'mypartneraccupdate()');
            });
        }
    });
}

// ======================================== Account End =============================================

// =============================Banners Show Start=====================
function getbanners() {
    var _url = "/fbpartners/showbanners";
    $('#myCarousel .carousel-indicators,#myCarousel .carousel-inner').empty();
 
    $.ajax({
        url: _url,
        type: "get",
        success: function (data) {
            if (!$.trim(data)) {
                ////console.log('Empty Data');
                empty_banner();
            } else {
                ////console.log(data);
                for (var d in data) {
                    var ol = '<li data-target="#myCarousel" data-slide-to="' + d + '" class="' + (d == 0 ? 'active' : '') + '"></li>'
 
                    $('#myCarousel .carousel-indicators').append(ol);
 
                    var item = `<div class="item ` + (d == 0 ? 'active' : '') + `">
                        <img src="/fbpartners/viewbanner?docname=` + data[d].attactments + `&page=Banner" alt="banner` + d + `" style="width:100%;height: 420px !important;">
                        <div class="carousel-caption">
                          <h3>` + data[d].name + `</h3>
                          <p>` + add3Dots(data[d].description, `120`) + `</p>
                        </div>
                      </div>`
 
                    $('#myCarousel .banners').append(item);
                }
            }
        }
    });
}

function gettiles() {
    var _url = "/fbpartners/showtiles";
 
    $('#carousel123 .carousel-inner').empty();
    $.ajax({
        url: _url,
        type: "get",
        success: function (data) {
          //  console.log(data)
            if (!$.trim(data)) {
                ////console.log('Empty Data');
                empty_tiles();
            } else {
               
                ////console.log(data)
                for (var d in data) {
                  
                  // if(d==1){
                var item=`<div class="item ` + (d == 0 ? 'active' : '') + `">
                <div class="pad15">
                <div class="col-xs-12 col-sm-6 col-md-3">
                    <a href="javascript:void(0);">
                        <img src="/fbpartners/viewbanner?docname=` + data[d].attactments + `&page=Banner" class="img-responsive">
                    </a>
                </div>
                </div>
            </div>`
                    $('#carousel123 .carousel-inner').append(item);
                  // }
                }
                if(data.length<=3){
                    for(i=0;i<=3;i++){
                    var dummyimges = `<div class="item ">
                    <div class="pad15">
                    <div class="col-xs-12 col-sm-6 col-md-3">
                        <a href="javascript:void(0);">
                        <img src="static/images/fbpartners/Finbot Banners/offers-btimg_dummy.jpg" class="img-responsive">
                        </a>
                    </div>
                    </div>
                </div>`
                    $('#carousel123 .carousel-inner').append(dummyimges);
                    }
                }
               
              


            }
            // for every slide in carousel, copy the next slide's item in the slide.
           
        $('.carousel-showmanymoveone .item').each(function(){
            var itemToClone = $(this);
        
            for (var i=1;i<4;i++) {
              itemToClone = itemToClone.next();
        
              // wrap around if at end of item collection
              if (!itemToClone.length) {
                itemToClone = $(this).siblings(':first');
              }
        
              // grab item, clone, add marker class, add to collection
              itemToClone.children(':first-child').clone()
                .addClass("cloneditem-"+(i))
                .appendTo($(this));
            }
          });
        }
    });
} 

function empty_banner() {
  
    var ol=`<li data-target="#myCarousel" data-slide-to="0" class="active"></li>
    <li data-target="#myCarousel" data-slide-to="1"></li>`
       var item = `<div class="item active">
                       <img src="static/images/fbpartners/Finbot Banners/offer-banner_dummy.jpg" alt="banner" style="width:100%;height: 420px !important;">
                       <div class="carousel-caption">
                                             <h3></h3>
                                             <p></p>
                                           </div>
                       </div>
                       <div class="item">
                       <img src="static/images/fbpartners/Finbot Banners/offer-banner_dummy.jpg" alt="banner" style="width:100%;height: 420px !important;" >
                       <div class="carousel-caption">
                                             <h3></h3>
                                             <p></p>
                                           </div>
                                           </div>
                       <div class="item">
                       <img src="static/images/fbpartners/Finbot Banners/offer-banner_dummy.jpg" alt="banner" style="width:100%;height: 420px !important;" >
                       <div class="carousel-caption">
                                             <h3></h3>
                                             <p></p>
                                           </div>
                       </div>
                       <div class="item">
                       <img src="static/images/fbpartners/Finbot Banners/offer-banner_dummy.jpg" alt="banner" style="width:100%;height: 420px !important;" >
                       <div class="carousel-caption">
                                             <h3></h3>
                                             <p></p>
                                           </div>
                       </div>`
       $('#myCarousel .carousel-indicators').append(ol);
       $('#myCarousel .carousel-inner').append(item);
   
    $('#myCarousel').carousel('pause');
    
}
 
function empty_tiles() {
    var tile = `<div class="item active">
    <div class="pad15">
    <div class="col-xs-12 col-sm-6 col-md-3">
        <a href="javascript:void(0);">
            <img src="static/images/fbpartners/Finbot Banners/offers-btimg_dummy.jpg" class="img-responsive">
        </a>
    </div>
    </div>
</div>
<div class="item ">
<div class="pad15">
    <div class="col-xs-12 col-sm-6 col-md-3">
        <a href="javascript:void(0);">
            <img src="static/images/fbpartners/Finbot Banners/offers-btimg_dummy.jpg" class="img-responsive">
        </a>
    </div>
    </div>
</div>
<div class="item ">
<div class="pad15">
    <div class="col-xs-12 col-sm-6 col-md-3">
        <a href="javascript:void(0);">
            <img src="static/images/fbpartners/Finbot Banners/offers-btimg_dummy.jpg" class="img-responsive">
        </a>
    </div>
    </div>
</div>
<div class="item ">
<div class="pad15">
    <div class="col-xs-12 col-sm-6 col-md-3">
        <a href="javascript:void(0);">
            <img src="static/images/fbpartners/Finbot Banners/offers-btimg_dummy.jpg" class="img-responsive">
        </a>
    </div>
    </div>
</div>`
    $('#carousel123 .carousel-inner').append(tile);
    $('#carousel123').attr("data-interval",false);
    $('#carousel123').carousel('pause');

    // $('#carousel123').carousel({
    //     interval: false,
    //   });
}

// =============================Banners End=====================



// ==========================Product Invoice====================
function bindproduct_invoice() {
    var _docid = getUrlVars()['keyid'];
    if (_docid) {
        $('#addinvoice table#invoiceproducts tbody').empty();
        var _url = "/fbpartners/bindproduct_invoice?keyid=" + _docid
        $.ajax({
            type: "GET",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            url: _url,
            success: function (data) {
                if (!$.trim(data)) {
                    $('#contact #addinvoice .uploadlogo,.invoice-no,.toAddress,.fromaddress,#addinvoice table#invoiceproducts tbody').empty()
                } else {
                  
                    if (data.isfinance === 1) {
                        $('#isfinanceinvoice').attr('checked', true);
                    }
                    if (data.partner.image) {
                        $("#addinvoice .uploadlogo img").attr("src", "static/" + data.partner.image);
                        $("#addinvoice .uploadlogo img").attr("onerror", "bankImgError(this,\"" + data.partner.bank + "\")");
                    } else {
                        $("#addinvoice .uploadlogo").empty().append('<div class="usernamett bname" id="currentuser" style="display: block;">' + data.partner.bank + '</div>')
                    }
                    if (data.Quotation_No != '' && data.Quotation_Date != null) {
                        var invoice = `<h3><b>Quotation No:</b> ` + data.Quotation_No + `</h3><h3><b>Quotation Date:</b> ` + new Date(data.Quotation_Date).toDateString() + `</h3>`
                        $('tr.ldinvoice').remove();
                        $(".docdis").append('<tr class="ldinvoice"><td class="ksidws">Quotation </td><td class="ksidws2"><a href="/fbpartners/viewodoc?docname=leads/' + data.Quotation_No + '-Quotation.pdf" class="fildownad"><i class="fa fa-download"></i></a></td></tr>');
                    } else {
                        var invoice = `<h3><b>Quotation No:</b> INVXXXXXXXXXX</h3><h3><b>Quotation Date:</b> Thu Nov XX 20XX</h3>`
                    }
                    $('#contact').empty().text('Kind Attn: ' + data.contact + ',' + data.contactnumber + '')
                    $('.invoice-no').empty().append(invoice)
                    var pamount = 0;
                    var company = data.company;

                    var toaddress = `<h4><b>Ship To</b>&nbsp;&nbsp;:&nbsp;&nbsp;<b></b></h4>
                    <h5><b>` + company.name + ` ,</b></h5>
                    <p>` + company.Address + `,` + company.city + `</p>
                    <h5><b>Phone</b>: ` + company.phone + `</h5>
                    <h5><b>Website :</b> ` + company.website + `</h5>
                    <h5><b>Email Id :</b>` + company.email + `</h5>
                    <h5><b>GSTIN    :</b>${company.gstin}</h5>`

                    $('.toAddress').empty().append(toaddress);

                    var fromaddress = `<h4><b>Sold By&nbsp;&nbsp;:&nbsp;&nbsp;</b></h5>
                    <h5><b>` + data.partner.bank + ` ,</b></h5>
                    <p>` + data.partner.address + `</p>
                    <h5><b>Email Id :</b>` + data.partner.email + `</h5>
                    <h5><b>Phone</b>: ` + data.partner.phone + `</h5>
                    <h5><b>Website :</b> ` + data.partner.website + `</h5>
                    <h5><b>GSTIN    :</b>${data.partner.gstin}</h5>`

                    $('.fromaddress').empty().append(fromaddress);

                    data.reviewer.forEach((item, index) => {
                        pamount += (((parseInt(item.product_qty) || 1) * parseInt(item.Price) - (parseInt(item.product_discount) || 0)) + (((parseInt(item.product_qty) || 1) * parseInt(item.Price) - (parseInt(item.product_discount) || 0)) * (parseInt(item.Tax) / 100)));
                        var Short_Desc = item.Short_Desc ? item.Short_Desc : 'Short Description is not available'
                        var new_tr = `<tr class="product_` + index + ` p">
                <td class="productname"><p>` + item.Name + `</p></td>
                <td class="productname"><p>` + add3Dots(Short_Desc, 180) + `</p></td>
                <td class="qtysns qty"><p contenteditable="true" onclick="$(this).focus();" data-onlyno="true" id="qty${index}">` + (parseInt(item.product_qty) || 1) + `</p></td>
                <td class="grossamts"><p class="cgrossamt price" >` + parseInt(item.Price) + `</p></td>     
                <td class="tax"><p contenteditable="true" onclick="$(this).focus();" data-onlyno="true" id="ctax${index}" >` + parseInt(item.Tax) + `</p></td>
                <td class="totalamnts pamount"><p>` + (((parseInt(item.product_qty) || 1) * parseInt(item.Price)) - (parseInt(item.product_discount) || 0)) + `</p></td>
                <td class="totalamnts discount_amount"><p contenteditable="true" onclick="$(this).focus();" data-onlyno="true" >` + (parseInt(item.product_discount) || 0) + `</p></td>
                <td class="totalamnts PTamount"><p>` + (((parseInt(item.product_qty) || 1) * parseInt(item.Price) - (parseInt(item.product_discount) || 0)) + (((parseInt(item.product_qty) || 1) * parseInt(item.Price) - (parseInt(item.product_discount) || 0)) * (parseInt(item.Tax) / 100))) + `</p></td>
                </tr>`
                        $('#addinvoice table#invoiceproducts tbody').append(new_tr);
                    });

                    $('td.qty p').on('keypress change input', function (e) {
                        var pc = $('#' + this.id + '').closest('tr').attr('class').replace(/[^0-9]/g, '');
                        var p = 0,
                            PT = 0;
                        if ($('#' + this.id + '').text() != '') {

                            discount = (parseInt($('.product_' + pc + ' td.discount_amount p').text()) || 0);
                            p = ((parseInt($('#' + this.id + '').text()) || 1) * parseInt(data.reviewer[pc].Price) - discount);
                            Tax = p * (parseInt($('.product_' + pc + ' td.tax p').text()) / 100);
                            PT = p + Tax;

                            $('.product_' + pc + ' td.pamount p').text(p);
                            $('.product_' + pc + ' td.PTamount p').text(PT).trigger('change');
                        }
                        if ($(this).text() != '') {
                            var ta = 0;
                            $('#invoiceproducts tbody tr td.PTamount p').each(function (e) {
                                ta += parseInt($(this).text());
                            });
                            $('#invoiceproducts tbody tr td p.amount').text(ta);
                            convertNumberToWords(ta)
                        }
                        var tqty = 0;
                        $('#invoiceproducts tbody tr td.qty p').each(function () {
                            tqty += parseInt($(this).text());
                            $('.tqty p').text(tqty)
                        });
                    });

                    $('td.tax p').on('keypress change input', function (e) {
                        var pc = $('#' + this.id + '').closest('tr').attr('class').replace(/[^0-9]/g, '');
                        var p = 0,
                            PT = 0;

                        if ($('#' + this.id + '').text() != '') {
                            discount = (parseInt($('.product_' + pc + ' td.discount_amount p').text()) || 0);
                            p = ((parseInt($('.product_' + pc + ' td.qty p').text()) || 1) * parseInt(data.reviewer[pc].Price) - discount);
                            Tax = p * (parseInt($('#' + this.id + '').text()) / 100);
                            PT = p + Tax;
                            $('.product_' + pc + ' td.pamount p').text(p);
                            $('.product_' + pc + ' td.PTamount p').text(PT).trigger('change');
                        }
                        if ($(this).text() != '') {
                            var ta = 0;
                            $('#invoiceproducts tbody tr td.PTamount p').each(function (e) {
                                ta += parseInt($(this).text());
                            });
                            $('#invoiceproducts tbody tr td p.amount').text(ta);
                            convertNumberToWords(ta)
                        }
                    });

                    $('td.discount_amount p').on('keypress change input', function (e) {
                        var pc = $(this).closest('tr').attr('class').replace(/[^0-9]/g, '');
                        var PT = 0;
                        var p = parseInt($('.product_' + pc + ' td.pamount>p').text());
                        if (p > parseInt($(this).text())) {
                            if ($(this).text() != '') {
                                discount = (parseInt($(this).text()) || 0);
                                p = ((parseInt($('.product_' + pc + ' td.qty p').text()) || 1) * parseInt(data.reviewer[pc].Price) - discount);
                                Tax = p * (parseInt($('.product_' + pc + ' td.tax p').text()) / 100);
                                PT = p + Tax;
                                $('.product_' + pc + ' td.pamount p').text(p);
                                $('.product_' + pc + ' td.PTamount p').text(PT).trigger('change');
                            }
                            if ($(this).text() != '') {
                                var ta = 0;
                                $('#invoiceproducts tbody tr td.PTamount p').each(function (e) {
                                    ta += parseInt($(this).text());
                                });
                                $('#invoiceproducts tbody tr td p.amount').text(ta);
                                convertNumberToWords(ta)
                            }
                        } else {
                            $(this).text('0');
                        }
                    });

                    var final = `<tr id="lastbutone">
                <td class="productname"></td>
                <td class="productname"></td>
                <td class="qtysns tqty"><p>` + data.reviewer.length + `</p></td>
                <td class="grossamts" colspan="3"></td>               
                <td class="grossamts"><h3>Gross Total</h3></td>               
                <td class="totalamnts"><p class="amount famount">` + Math.ceil(pamount) + `</p></td>
              </tr>
              <tr id="last">
                <td colspan="8">

                </td>
              </tr>
              <tr id="inivoicetotal">
                <td colspan="6">
                    <h3 id="amount_words">Total in Words : Rupees Eighty Nine Lakhs Sixty Thousand Only Convert the Total Inclusive of GST in to words></h3>
                </td>
                <td colspan="1"><h3>Total(₹)</h3></td>
                <td colspan="1"><p class="amount" onchange="convertNumberToWords(this.value)">` + Math.ceil(pamount) + `</p></td>
              </tr>`

                    $('#addinvoice table#invoiceproducts tbody').append(final);

                    $('#addinvoice #close').removeAttr('disabled');
                    $('#addinvoice #save_proceed').attr('onclick', 'saveproceedproductinvoice()').removeAttr('disabled');
                    $('#addinvoice #save').attr('onclick', 'saveproductinvoice()').removeAttr('disabled');

                    convertNumberToWords(Math.ceil(pamount));

                    if (data.imp_info == "") {
                        var imp_info = `1. Warranty : One year Standard warranty on main equipment, the disposable consumable do not carry any warranty and durables are covered under warranty for manufacturing defects only. Any incidental or wear & tear damages on equipment will not be covered under warranty.
2. Payment terms : 50% advance along with confirmed order and 50% against the despatch documents / Delivery of the equipment.
3.Delivery Period : 4 to 6 weeks from the date of confirmed order with advance.
4.Validity : Offer is valid for 15 days from the date of this offer.`

                        $('#imp_info').empty().text(imp_info)
                    } else {
                        $('#imp_info').empty().text(data.imp_info)
                    }

                    $('[data-onlyno="true"]').keypress(function (e) {
                        var x = event.charCode || event.keyCode;
                        if (isNaN(String.fromCharCode(e.which)) && x != 46 || x === 32 || x === 13 || (x === 46 && event.currentTarget.innerText.includes('.'))) e.preventDefault();
                        if (!((e.keyCode > 95 && e.keyCode < 106) || (e.keyCode > 47 && e.keyCode < 58) || e.keyCode == 8)) {
                            return false;
                        }
                    });

                }
            }
        });
    }
}
// ==========================Product Invoice End====================
//-------------------------Notifcations start---------------
function getnotifications() {
    // alert("notifications")
    $(".notifications").empty();
    $('#nfcount').text('0');
    //    $("notifications").val()
    var _url = "/fbpartnersfinance/getnotigication";
    $.ajax({
        url: _url,
        type: "get",
        success: function (responce) {
            $(".notifications").empty();
            if (Array.isArray(responce) && responce.length > 0) {

                let nfcount = responce.length;
                $('#nfcount').text(nfcount);
                var count = 4;
                for (var i = 0; i < count; i++) {
                    if (responce[i] !== undefined) {
                        var path;
                        switch (responce[i].type) {
                            case "Meeting":
                                path = `/meetingaction?keyid=${responce[i].typeId}`
                                break;
                                case "lead":
                                    path =`/financelead2?keyid=${responce[i].typeId}`
                                    break;
                            case "Task":
                                path = `/taskaction?keyid=${responce[i].typeId}`
                                break;
                            case "Expenses":
                                path = `/taskaction?keyid=${responce[i].typeId}`
                                break;
                            case "Exam":
                                path = `/Exam?keyid=${responce[i].typeId}`
                                break;
                            case "Dealer":
                                path = `/taskaction?keyid=${responce[i].typeId}`
                                break;
                            case "Ticket":
                                path = `/Ticket`
                                break;
                            case "Ticket Assign":
                                path = `/Ticket`
                                break;
                        }
                        if (responce[i].count > 0) {
                            var notif = `<li style="font-size:9.9px"><a href="${path}"> ${responce[i].Desc}<label style="color:red;font-family: fantasy;width:3px;height:3rem">${responce[i].count}</label></a><span id="noti${i}" style="display:none">${responce[i].id}</span></li>`
                        } else {
                            var notif = `<li style="font-size:9.9px"><a href="${path}"> ${responce[i].Desc}</a><span id="noti${i}" style="display:none">` + responce[i].id + `</span></li>`
                        }
                        $(".notifications").append(notif)
                    } else {
                        count = 0;
                    }
                }

                var notiftile = `<li class="divider"></li>
             <li><a class="text-center" href="/mynotifications?keyid=all" data-original-title="" title="">View All</a></li> `
                $(".notifications").append(notiftile)
            } else {
                var notiftile = `<li><a href="/mynotifications">NO Notification <span id="noNotifications" style="display:none">no notifications</span></a></li>
             <li><a class="text-center" href="/mynotifications?keyid=all"  data-original-title="" title="">View All</a></li> `
                $(".notifications").append(notiftile)
            }
        }
    })
}
function getnotifications_count() {
    var _url = "/fbpartnersfinance/getnotigication";
    $('#nfcount').text('0');
    $.ajax({
        url: _url,
        type: "get",
        success: function (responce) {
            console.log(responce)
            if (Array.isArray(responce) && responce.length > 0) {
                let nfcount = responce.length;
                $('#nfcount').text(nfcount);
            }
        },
        error:function (err) {  }
    });
}
setInterval(() => {
    getnotifications_count();
}, 60000*5);
function getmynotifications(){
    // alert("hi")
  var  _url="/fbpartnersfinance/getnotigication";
  $.ajax({
      url:_url,
      type:"get",
      success:function(responce){
          var stackholders=[]
       
      if(responce.length!==0){
      //  console.log("hi")
          responce.forEach(function(data,i){
            //  alert()
         stackholders.push(data.id)
         switch (data.type) {
          case "Meeting":
              path = `/meetingaction?keyid=${data.typeId}`
              break;
          case "Task":
              path = `/taskaction?keyid=${data.typeId}`
              break;
          case "Expenses":
              path = `/taskaction?keyid=${data.typeId}`
              break;
          case "Exam":
              path = `/Exam?keyid=${data.typeId}`
              break;
          case "Dealer":
              path = `/taskaction?keyid=${data.typeId}`
              break;
          case "Ticket":
              path = `/Ticket`
              break;
          case "Ticket Assign":
              path = `/Ticket`
              break;
              case "lead":
              path = `/financelead2?keyid=${data.typeId}`
              break;
          case "dealer lead":
              path = `/dealerleads?keyid=${data.typeId}`
              break;
      }
            var  tile = `<a style="text-decoration:none !important" href="`+path+`"> <tr class="table__row">                                
              
              <td class="UserTable__name">
              
              
              
                  <h5><span class="ticket_id" data-toggle="modal" data-toggle="tooltip" title="Get Ticket Details" </span> ` + data.name + `</h5>
                  <h6><span>Desc : </span>` + data.Desc + `</h6>
              
                  <h6><span>Comments : </span>` + data.count + `</h6>
                  <input id="id_cot" name="id_cot" class="id_cot" type="hidden" value="`+data.id+`">
                  <h6><span>From : </span>` + data.name + `</h6>
                  <h6><span>Created:</span> ` +new Date(data.date).toLocaleString()  + ` </h6>
              </td> 
              <td class="table__cell--remainder">
              
              <td class="table__cell--remainder2">
              
                  <label>`+ data.type+` </label>
              
                  <div class="selctopa">    
                 
              
              </td>
              </div>
              </tr> </a>`
 
 
              $('#notificationss').append(tile);
          })
        
      }else{
         // $("#notifications").empty();
 
         // alert("hi")
          var emptytile=`<a><div class="empytre"><div class="oneemptys"><div class="col-md-12 listcontras"><div class="recordnew hgreen contact-panel">
          <a href=""><div class="panel-body"><h3>No Notifications</h3>
          <img alt="logo" src="static/images/fbpartners/emptyfaq.svg" style="width: 250px !important; height:100% !important;">
          </div></a></div></div></div></div></a>`
          $('#notificationss').append(emptytile);
      }
      pullnotifications(stackholders)
      }
  })
 }
//-------------------------Notifications end-----------------
$('[data-onlyno]').on('keypress change input', function () {
    this.value = this.value.replace(/[^0-9]/g, '');
    if (/^\s/g.test(this.value)) {
        this.value = this.value.replace(/^\s+/, '');
    }
});
$('[data-startspace]').on('keypress change input', function () {
    this.value = this.value.replace(/^\s+/g, '');
});

$('[data-onlyalpha]').on('keypress keyup change', function () {
    this.value = this.value.replace(/[^a-zA-Z ]*$/, '');
    if (/^\s+/g.test(this.value)) {
        this.value = this.value.replace(/^\s+/g, '');
    }
});
if (getCookie('fbbank') === 'Finbot') {
    $('#addex,#ex').remove();
    if (getCookie('dru6') == "FinancialAdmin") {
        // financeexpenses
        $('#finex').find('a').attr('href', '/financeexpenses');
        $('#addfinex').remove();
    }
} else {
    $('#addfinex,#finex').remove();
    if (getCookie('dru6') == "admin") {
        // financeexpenses
        $('#ex').find('a').attr('href', '/expenses');
        $('#addex').remove();
    }
}
if (getCookie('dru6') === 'AM'||getCookie('dru6') === 'admin') {
    $('.disabl').removeClass('disabl')

}

function ImgError(source) {
    source.src = "https://vignette.wikia.nocookie.net/roblox-phantom-forces/images/7/7c/Noimage.png/revision/latest?cb=20171115203949";
    source.onerror = "";
    return true;
}
 
function bankImgError(s, bankname) {
    s.remove();
    $("#addinvoice .uploadlogo").append('<div class="usernamett bname" id="currentuser" style="display: block;">' + bankname + '</div>');
    return true;
}

function routingforseetingpage(){
    if(getCookie('tenet')==="1"){
        $(location).attr('href', '/financesettings')
        }else if(getCookie('tenet')==="2"){
          $(location).attr('href', '/manufacturersettings')
    
        }else{
          $(location).attr('href', '/settings')
    
        }
}
function imageExistsfordisc(url,name, callback) {
    var img = new Image();
    img.onload = function() { callback(`<img src=${url} width="100%">`); };
    img.onerror = function() { callback(`<div class="prfle_ltr">${name.slice(0,2)}</div>`); };
    img.src = url;
  }
  function timeDifference(previous) {
    current = new Date()
    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;

    var elapsed = current - new Date(previous);

    if (elapsed < msPerMinute) {
        return Math.round(elapsed / 1000) + ' seconds ago';
    }

    else if (elapsed < msPerHour) {
        return Math.round(elapsed / msPerMinute) + ' minutes ago';
    }

    else if (elapsed < msPerDay) {
        return Math.round(elapsed / msPerHour) + ' hours ago';
    }

    else if (elapsed < msPerMonth) {
        return new Date(previous);;
    }

    else if (elapsed < msPerYear) {
        return new Date(previous);;
    }

    else {
        return new Date(previous);;
    }
}
