const { log } = require('console');



var express = require('express'),
    mongoose = require('mongoose'),
    router = express.Router(),
    formidable = require('formidable'),
    path = require('path'),
    cors = require('cors'),
    util = require('util'),
    fastcsv = require('fast-csv'),
    axios = require('axios'),
    fbpartners = mongoose.model('fbpartners'),
    fbpartnerleads = mongoose.model('fbpartnerleads'),
    fbleads = mongoose.model('fbleads'),
    fbcompany = require('../models/fbcompany'),
    fblist = require('../models/fblist'),
    fbcontest = require('../models/fbcontest'),
    fbcontacts = require('../models/fbcontacts'),
    fbconnectors = mongoose.model('fbconnector'),
    fbAssociates = mongoose.model('fbAssociates'),
    fbleadslite = mongoose.model('fbleadslite'),
    fbusers = mongoose.model('fbusers'),
    fbteams = mongoose.model('fbteams'),
    fbapikeys = require('../models/fbapikeys'),
    fbproducts = require('../models/fbproducts'),
    fbtelphony = require('../models/fbtelphony'),
    fbbulkcontacts = require('../models/fbbulkcontacts'),
    fbpartnermeeting = mongoose.model('fbpartnermeeting'),
    fbactivitiesType = require('../models/fbactivitiesType'),
    fbactivity = require('../models/fbactivity'),
    fbproductstwo = require('../models/fbproductstwo'),
    taskSuresh = require('../models/taskSuresh'),////

    drinvoice = require('../libs/fbmailer').fbinvoice,
    drmailer = require('../libs/fbmailer').fbChangePassword,
    // drmailer = require('../libs/mailer').fbChangePassword,
    drvalidate = require('../libs/drvalidate').drvalidate,
    drleadmailer = require('../libs/fbmailer').fbleadcreate,
    //drinvoice = require('../libs/mailer').fbinvoice,
    bodyParser = require('body-parser'),
    fbbanner = mongoose.model('fbpartnerbanner'),
    dractivity = mongoose.model('dractivity'),
    uuid = require('node-uuid'),
    moment = require('moment'),
    fs = require('fs'),
    fse = require('fs-extra'),
    _ = require('underscore'),
    generator = require('../libs/fbinvoice'),
    router = express.Router();
router.post("/fbpartners/createpartner", function (req, res) {
    var _cbank = req.body.doc;
    new drvalidate(req, res, function (err, _session) {
        if (!err) {
            if (_cbank.Adpassword == '$$admin17##') {
                fbpartners.findOne({ bankname: _cbank.bankname }, function (err, name) {
                    if (name) {
                        res.send('partner exists enter new name');
                    }
                    else {
                        //  if(_cbank.hosttype === '2'){
                        //     var hostname = '';
                        //     var hostid ='';
                        //  }else{
                        var hostname = _session.bank;
                        var hostid = _session.tenant_id;

                        //}  
                        var _newbank = new fbpartners({

                            bankname: _cbank.bankname,
                            partnerdesc: 'i am ' + _cbank.bankname,
                            logopath: _cbank.logopath,
                            hosttype: _cbank.hosttype,
                            phone: _cbank.phone,
                            bankdisplayname: _cbank.bankdisplayname,
                            hostname: hostname,
                            hostid: hostid,
                            isembedded: _cbank.isembedded,
                            mailerto: _cbank.emailto,
                            emailpwd: _cbank.emailpassword,
                            port: _cbank.port,
                            url: _cbank.url,
                            domain: _cbank.domain,
                            Assigned: _cbank.Assigned,
                            AssignedEmail: _cbank.AssignedEmail,
                            AssignedId: _cbank.AssignedId,
                            team: _cbank.team,
                            teamId: _cbank.teamId,
                            // users: [{ id: _cbank.id, uname: 'admin', email: _cbank.email, pwd: _cbank.password, role: 'admin', 'createddate': moment().format('MM/DD/YYYY') }],
                            //companys: [{ id: guidGenerator(), cname: 'Indivisual', email: 'chandra.save@gmail.com', phone: '9972122556', workphone: '9972122556', website: 'finbot.in', Address: 'finbot hyderabad', contact: 'chandra sekhar', city: 'hyd', createddate: new Date(), lstupdateddate: new Date(), status: 1 }],
                            leadstages: [{ id: guidGenerator(), stagename: 'Lead sourced', description: 'lead is generated' }, { id: guidGenerator(), stagename: 'contact met', description: 'lead contact met' }, { id: guidGenerator(), stagename: 'Quotation sent', description: 'quotation is sent to customer' }, { id: guidGenerator(), stagename: 'waiting for client confirmation', description: 'waiting for client confirmation' }, { id: guidGenerator(), stagename: 'order expected', description: 'order expected' }, { id: guidGenerator(), stagename: 'order received', description: 'customer accepted' }, { id: guidGenerator(), stagename: 'Finance closure', description: 'banker approved' }, { id: guidGenerator(), stagename: 'Invoiced', description: 'invoice generated' }, { id: guidGenerator(), stagename: 'payement received', description: 'payement received' }, { id: guidGenerator(), stagename: 'order Won', description: 'lead is Won' }, { id: guidGenerator(), stagename: 'order lost', description: 'lead is cancelled' }],
                        })
                        _newbank.save(function (err) {
                            if (!err) {
                                getbankdetailswithname(_cbank.bankname, function (err, docs) {
                                    if (!err) {
                                        createuserwithdealer(_cbank, docs, function (err) {
                                            if (!err) {
                                                // res.sendStatus(200)
                                                createcompanywithdealer(_cbank, docs, function (err) {
                                                    if (!err) {
                                                        // createnewassociate(_cbank,_session,function(err){
                                                        //if(!err){
                                                        res.sendStatus(200)
                                                        //  }else{
                                                        // res.sendStatus(500)
                                                        //  }
                                                        // })
                                                    } else {
                                                        res.sendStatus(500)
                                                    }
                                                })
                                            } else {
                                                res.sendStatus(500)
                                            }
                                        })
                                    } else {
                                        res.sendStatus(500)
                                    }

                                })
                                // res.sendStatus(200);
                            } else {
                                res.sendStatus(500);
                            }
                        });
                    }
                });
            }
            else {
                res.send('wrong Admin password');
            }
        } else {
            res.sendStatus(403)
        }
    });
});
function createorupdateassociate(_cbank, _session, fn) {
    fbAssociates.findOne({
        Asscode: _cbank.Asscode,
        hostid: _session.tenant_id,
    }, function (err, name) {
        if (name) {
            updateassociate(_cbank, _session, function (err) {
                if (!err) {
                    fn(null)
                } else {
                    fn(err)
                }
            })
        } else {
            createnewassociate(_cbank, _session, function (err) {
                if (!err) {
                    fn(null)
                } else {
                    fn(err)
                }
            })
        }
    });
}
function createnewassociate(_cbank, _session, fn) {
    var _newbank = new fbAssociates({
        Asscode: _cbank.bankname,
        displayname: _cbank.name,
        email: _cbank.email,
        phone: _cbank.phone,
        website: _cbank.website,
        Address: _cbank.Address,
        manufacturer: _cbank.manufacturer,
        pannumber: _cbank.pannumber,
        CIINnumber: _cbank.CIIN,
        GstNumber: _cbank.gstnumber,
        rating: _cbank.rating,
        employeesrange: _cbank.employeesrange,
        segments: _cbank.Segements,
        penetrationpercentage: _cbank.penetrationpercentage,
        ispep: _cbank.ispartner,
        issinglelead: _cbank.issinglelead,
        State: _cbank.State,
        Zone: _cbank.Zone,
        City: _cbank.City,
        ismanufacturer: _cbank.ismanufacturer,
        programmanager: _cbank.programmanager,
        programmanagerEmail: _cbank.programmanagerEmail,
        programmanagerId: _cbank.programmanagerId,
        joiningdate: _cbank.joiningdate,
        Asstype: _cbank.Asstype,
        hostname: _session.bank,
        hostid: _session.tenant_id,
        Assigned: _cbank.Assigned,
        AssignedEmail: _cbank.AssignedEmail,
        AssignedId: _cbank.AssignedId,
        logopath: _cbank.logopath,
        team: _cbank.team,
        teamId: _cbank.teamId,
        createddate: new Date()
    })

    _newbank.save(function (err) {
        if (!err) {
            fn(null)
        } else {
            fn(err)
        }
    });
}
function updateassociate(_cbank, _session, fn) {
    var _record = {};
    var _cbank = req.body.bank;
    _record['displayname'] = _cbank.name,
        _record['Asscode'] = _cbank.bankname,
        _record['email'] = _cbank.email,
        _record['phone'] = _cbank.phone,
        _record['website'] = _cbank.website,
        _record['rating'] = _cbank.rating,
        _record['Address'] = _cbank.Address,
        _record['pannumber'] = _cbank.pannumber,
        _record['CIINnumber'] = _cbank.CIIN,
        _record['State'] = _cbank.State;
    _record['Zone'] = _cbank.Zone;
    _record['City'] = _cbank.City;
    _record['GstNumber'] = _cbank.gstnumber,
        _record['issinglelead'] = _cbank.issinglelead,
        _record['manufacturer'] = _cbank.manufacturer,
        _record['segments'] = _cbank.Segements,
        _record['penetrationpercentage'] = _cbank.penetrationpercentage,
        _record['employeesrange'] = _cbank.employeesrange,
        _record['ispep'] = _cbank.ispartner,
        _record['ismanufacturer'] = _cbank.ismanufacturer,
        _record['programmanager'] = _cbank.programmanager,
        _record['programmanagerEmail'] = _cbank.programmanagerEmail,
        _record['programmanagerId'] = _cbank.programmanagerId,
        _record['joiningdate'] = _cbank.joiningdate,
        _record['Asstype'] = _cbank.Asstype,
        _record['Assigned'] = _cbank.Assigned,
        _record['AssignedEmail'] = _cbank.AssignedEmail,
        _record['AssignedId'] = _cbank.AssignedId,
        _record['team'] = _cbank.team,
        _record['teamId'] = _cbank.teamId,
        _record['logopath'] = _cbank.logopath
    _record['lstupdateddate'] = new Date();
    fbAssociates.update({ '_id': _cbank.id }, { "$set": _record }, function (err) {
        if (!err) {
            fn(null)
        } else {
            fn(err)
        }
    })
}
router.post("/fbpartners/createquickonboarding", function (req, res) {
    var _cbank = req.body.doc;
    fbpartners.findOne({ bankname: _cbank.bankname }, function (err, name) {
        if (name) {
            res.send('partner exists enter new name');
        }
        else {
            var _session = {}
            _session['bank'] = 'Finbot'
            _session['email'] = _cbank.AssignedEmail
            _cbank['password'] = '$finbot$'
            gethostdetails('Finbot', function (err, host) {
                if (!err) {
                    _session['tenant_id'] = host[0].id
                    getAssignedforquickonboard(_session, function (err, Assigned) {
                        if (!err) {
                            var _newbank = new fbpartners({
                                bankname: _cbank.bankname,
                                partnerdesc: 'i am ' + _cbank.bankname,
                                hosttype: "3",
                                bankdisplayname: _cbank.bankdisplayname,
                                hostname: 'Finbot',
                                hostid: host[0].id,
                                isembedded: '1',
                                dlrproducts: _cbank.products,
                                employeesrange: _cbank.employeesrange,
                                revenue: _cbank.revenue,
                                Assigned: Assigned.Assigned,
                                AssignedEmail: Assigned.AssignedEmail,
                                AssignedId: Assigned.AssignedId,
                                team: Assigned.team,
                                teamId: Assigned.teamId,
                            })
                            _newbank.save(function (err) {
                                if (!err) {
                                    getbankdetailswithname(_cbank.bankname, function (err, docs) {
                                        if (!err) {

                                            createuserwithdealer(_cbank, docs, function (err) {
                                                if (!err) {

                                                    createnewassociate(_cbank, _session, function (err) {
                                                        if (!err) {
                                                            res.sendStatus(200)
                                                        } else {
                                                            res.sendStatus(500)
                                                        }
                                                    })
                                                } else {
                                                    res.sendStatus(500)
                                                }
                                            })
                                        } else {
                                            res.sendStatus(500)
                                        }

                                    })
                                } else {
                                    res.sendStatus(500);
                                }
                            });
                        } else {
                            res.sendStatus(500)
                        }
                    })
                } else {
                    res.sendStatus(500)
                }
            })
        }
    });
});
function getAssignedforquickonboard(_session, fn) {
    var _cleads = {};
    getmydetails(_session.tenant_id, _session.bank, _session.email, function (err, doc) {
        if (!err) {
            if (doc.teamId !== '' && doc.teamId !== null) {
                _cleads['Assigned'] = doc.name
                _cleads['AssignedId'] = doc.id
                _cleads['AssignedEmail'] = _session.email
                _cleads['team'] = doc.team
                _cleads['teamId'] = doc.teamId
                fn(null, _cleads)
            } else {
                _cleads['Assigned'] = doc.name
                _cleads['AssignedId'] = doc.id
                _cleads['AssignedEmail'] = _session.email
                fbteams.findOne({ tenant_id: _session.tenant_id, managerId: doc.id }).exec(
                    function (err, docs) {
                        if (!err) {
                            if (docs) {
                                _cleads['team'] = docs.teamname
                                _cleads['teamId'] = docs.id
                                fn(null, _cleads)
                            } else {
                                _cleads['team'] = ''
                                _cleads['teamId'] = ''
                                fn(null, _cleads)
                            }
                        } else {
                            fn(err, null)
                        }
                    })
            }
        } else {
            fn(err, null)
        }
    })
}
function getbankdetailswithname(bankname, fn) {
    fbpartners.findOne({ bankname: bankname }, { _id: 1 }, function (err, doc) {
        if (!err) {
            fn(err, doc)
        } else {
            fn(err, null)
        }
    })
}
function createuserwithdealer(_cbank, docs, fn) {
    var _fbusers = new fbusers({
        tenant_id: docs._id,
        bankname: _cbank.bankname,
        id: _cbank.id,
        name: 'admin',
        email: _cbank.email,
        pwd: _cbank.password,
        hosttype: _cbank.hosttype,
        role: 'admin',
        'createddate': moment().format('MM/DD/YYYY')
    });
    _fbusers.save(function (err) {
        if (!err) {
            fn(null)
        } else {
            fn(err)
        }
    })
}
function createcompanywithdealer(_cbank, docs, fn) {

    var newcompany = new fbcompany({
        id: guidGenerator(),
        tenant_id: docs._id,
        bankname: _cbank.bankname,
        name: 'Indivisual',
        email: _cbank.email,
        phone: '',
        workphone: '',
        website: '',
        Address: '',
        contact: 'admin',
        city: '',
        createddate: new Date(),
        lstupdateddate: new Date(),
        status: 1
    });
    newcompany.save(function (err) {
        if (!err) {
            fn(null)
        } else {
            fn(err)
        }
    });

}

function sendresetlink(doc, tenant_id, _bname, req, fn) {
    var ip = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;
    var _dractivity = new dractivity({
        tenant_id: tenant_id,
        bank: _bname,
        email: doc.email,
        hosttype: doc.hosttype,
        ipaddress: ip,
        isactive: 1,
        acttype: 2
    });
    _dractivity.save(function (err, _dractivity) {
        if (err) res.send('failed');
        else {

            var changeurl = 'app.finbot.in' + "/reset-password?activation=" + _dractivity._id
            getloginparnerdeatiles(req.cookies.fbbank, (err, fromemail, pwd, port, url, logoorpath, bankname, dealeraddress) => {

                new drmailer(doc.email, fromemail, pwd, port, url, logoorpath, bankname, changeurl, 1, dealeraddress, function (err, msg) {

                    if (err) fn(err)
                    else {
                        fn(null)
                    }

                })
            })

        }
    });
}
function getloginparnerdeatiles(bankname, fn) {
    fbpartners.findOne({
        bankname: bankname
    }, {
        _id: 1,
        port: 1, url: 1, emailpwd: 1, mailerto: 1, logopath: 1, bankname: 1
    }).exec(function (err, doc) {
        if (!err) {
            if (doc) {
                if (doc.bankname != "Finbot") {
                    getfbassociate(doc.bankname, function (err, dealeraddress) {
                        if (!err) {
                            if (dealeraddress) {
                                fn(null, doc.mailerto, doc.emailpwd, doc.port, doc.url, doc.logopath, doc.bankname, dealeraddress)
                            } else {
                                fn(null, doc.mailerto, doc.emailpwd, doc.port, doc.url, doc.logopath, doc.bankname, '');
                            }
                        } else {
                            fn(null, doc.mailerto, doc.emailpwd, doc.port, doc.url, doc.logopath, doc.bankname, '');
                        }
                    })
                } else {
                    fn(null, 'noreply@finbot.in', 'yandex123$#', '465', 'smtp.yandex.com', doc.logopath, doc.bankname, {
                        "displayname": "Finbot",
                        "email": "venu.t@finbot.in",
                        "phone": '9030201477',
                        'Address': '1-65/2/1/17/2, 3rd Floor, Encore Building, Kakhatiya hills, Road No: 9, Serilingampally, Hyderabad, Telangana- 500081',
                        'website': "https://www.finbot.in"
                    })
                }
            } else {
                fn(null, 'Data Empty');
            }
        } else {
            fn(null, err);
        }
    });
}

function getfbassociate(bankname, fn) {
    fbAssociates.findOne({
        "Asscode": {
            "$eq": (bankname).toString()
        }
    }, {
        "_id": 1,
        "displayname": 1,
        "email": 1,
        "phone": 1,
        'Address': 1,
        'website': 1
    }).exec(function (err, dealeraddress) {
        if (!err) {
            if (dealeraddress) {
                fn(null, dealeraddress)
            } else {
                fn(null, '');
            }
        } else {
            fn(null, '');
        }
    });
}
function guidGenerator() {
    var S4 = function () {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}
// router.post("/fbpartners/login", function (req, res) {
//     var host = /(\w+\.)?(.*)\.\w+/.exec(req.header('host'));

//     host[0] = host[0].replace('www.', '')


//     var _cuser = req.body.user;
//     var bankname

//     if (!_cuser.bankname) {

//         bankname = host[0].replace('www.', '');

//     } else {
//         bankname = _cuser.bankname
//     }

//     fbpartners.findOne({
//             bankname: bankname,
//             'users.email': _cuser.email
//         }, {

//             'logopath': 1,
//             'bankname': 1,
//             'users.$': 1
//         },
//         function (err, doc) {


//             if (err) {
//                 res.sendStatus(500)
//             } else {
//                 if (doc) {

//                     if (doc.users[0].pwd == _cuser.password) {
//                         var ip = req.headers['x-forwarded-for'] ||
//                             req.connection.remoteAddress ||
//                             req.socket.remoteAddress ||
//                             req.connection.socket.remoteAddress;

//                         var _dractivity = new dractivity({

//                             tenant_id: doc._id,
//                             bank: bankname,
//                             email: _cuser.email,
//                            // teamid: doc.users[0].teamId,
//                             ipaddress: ip,
//                             role: doc.users[0].role,
//                             isactive: 1,
//                             acttype: 1
//                         });
//                         _dractivity.save(function (err, _dractivity) {
//                             if (err) res.send('authentication failed');
//                             else {

//                                 res.cookie('dru2', _dractivity._id, {
//                                     maxAge: 9000000,
//                                     httpOnly: true
//                                 });
//                                 res.cookie('dru3', doc._id, {
//                                     maxAge: 9000000,
//                                    // httpOnly: true
//                                 });

//                                 res.cookie('dru4', _dractivity.email, {
//                                     maxAge: 9000000
//                                 });
//                                 res.cookie('dru5', doc.users[0].uname, {
//                                     maxAge: 9000000
//                                 });
//                                 res.cookie('dru6', doc.users[0].role, {
//                                     maxAge: 9000000
//                                 });
//                                 res.cookie('fblogo', doc.logopath, {
//                                     maxAge: 9000000
//                                 });
//                                 res.cookie('fbbank', doc.bankname, {
//                                     maxAge: 9000000
//                                 });

//                                 res.send(_dractivity)
//                             }
//                         });
//                     } else {
//                         res.send('failed');
//                     }

//                 } else {
//                     res.send('failed');
//                 };
//             }
//         });
// });
router.post("/fbpartners/login", function (req, res) {
    var host = /(\w+\.)?(.*)\.\w+/.exec(req.header('host'));

    host[0] = host[0].replace('www.', '')


    var _cuser = req.body.user;
    var bankname

    if (!_cuser.bankname) {

        bankname = host[0].replace('www.', '');

    } else {
        bankname = _cuser.bankname
    }

    fbusers.findOne({
        'bankname': bankname,
        'email': _cuser.email,
        'pwd': _cuser.password
    }, {
        'id': 1,
        'logopath': 1,
        'bankname': 1,
        'tenant_id': 1,
        'role': 1,
        'name': 1,
        'hosttype': 1,
        'teamId': 1

    },
        function (err, doc) {


            if (err) {
                res.sendStatus(500)
            } else {
                if (doc) {
                    var ip = req.headers['x-forwarded-for'] ||
                        req.connection.remoteAddress ||
                        req.socket.remoteAddress ||
                        req.connection.socket.remoteAddress;
                    var _dractivity = new dractivity({
                        tenant_id: doc.tenant_id,
                        bank: doc.bankname,
                        email: _cuser.email,
                        hosttype: doc.hosttype,
                        teamId: doc.teamId,
                        createddate: new Date(),
                        ipaddress: ip,
                        role: doc.role,
                        isactive: 1,
                        acttype: 1
                    });
                    _dractivity.save(function (err, _dractivity) {
                        if (err) res.send('authentication failed');
                        else {
                            res.cookie('dru2', _dractivity._id, {
                                maxAge: 9000000,
                                httpOnly: true
                            });
                            res.cookie('dru3', doc.tenant_id, {
                                maxAge: 9000000,
                                httpOnly: true
                            });
                            res.cookie('dru7', doc.id, {
                                maxAge: 9000000,
                                httpOnly: true
                            });
                            res.cookie('dru4', _dractivity.email, {
                                maxAge: 9000000
                            });
                            res.cookie('dru5', doc.name, {
                                maxAge: 9000000
                            });
                            res.cookie('dru6', doc.role, {
                                maxAge: 9000000
                            });
                            res.cookie('tenet', doc.hosttype, {
                                maxAge: 9000000
                            });
                            res.cookie('fblogo', doc.logopath, {
                                maxAge: 9000000
                            });
                            res.cookie('fbbank', doc.bankname, {
                                maxAge: 9000000
                            });
                            res.send(_dractivity)
                        }
                    });


                } else {
                    res.send('failed');
                };
            }
        });
});
router.post("/fbpartners/logout", function (req, res) {
    res.clearCookie("dru2");
    res.clearCookie("dru3");
    res.clearCookie("dru4");
    res.clearCookie("dru5");
    res.clearCookie("dru6");
    res.sendStatus(200);
});

router.post("/fbpartners/forgotpassword", function (req, res) {
    var _cuser = req.body.user;

    fbusers.findOne({
        bankname: _cuser.bankname,

        email: _cuser.email



    }, { tenant_id: 1 },
        function (err, doc) {
            if (err) {
                res.send('failed');
            } else {

                if (doc) {

                    var ip = req.headers['x-forwarded-for'] ||
                        req.connection.remoteAddress ||
                        req.socket.remoteAddress ||
                        req.connection.socket.remoteAddress;
                    var _dractivity = new dractivity({
                        tenant_id: doc.tenant_id,
                        bank: _cuser.bankname,
                        email: _cuser.email,
                        ipaddress: ip,
                        isactive: 1,
                        acttype: 2
                    });

                    _dractivity.save(function (err, _dractivity) {
                        if (err) {

                            res.send('failed');
                        }
                        else {


                            var changeurl = 'app.finbot.in' + "/reset-password?activation=" + _dractivity._id
                            getloginparnerdeatiles(_cuser.bankname, (err, fromemail, pwd, port, url, logoorpath, bankname, dealeraddress) => {

                                new drmailer(_cuser.email, fromemail, pwd, port, url, logoorpath, bankname, changeurl, 0, dealeraddress, function (err, msg) {

                                    if (err) {

                                        res.send('failed');
                                    }
                                    else {

                                        res.send('password reset link sent to your mail. please check your email account');
                                    }

                                })
                            })

                        }
                    });

                } else {
                    res.send('failed');
                };
            }
        });
});

router.post("/fbpartners/resetpassword", function (req, res) {

    var _cuser = req.body.user;

    var ip = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;
    dractivity.findOne({
        _id: _cuser.token,
        bank: _cuser.bankname,

        isactive: 1,
        acttype: 2
    }, function (err, data) {
        if (err) res.send('invalid token contact finbot team')
        else {
            var _record = {};
            _record['pwd'] = _cuser.password;
            _record['email'] = data.email;

            fbusers.update(
                {
                    bankname: _cuser.bankname,
                    email: data.email
                },

                {
                    "$set": _record
                },
                function (err, result) {
                    if (!err) {

                        res.sendStatus(200);
                    } else {

                        res.sendStatus(500)
                    }
                })


        }
    });
});
router.get("/fbpartners/getcompanys", function (req, res) {

    new drvalidate(req, res, function (err, _session) {
        if (!err) {
            if (_session.role === 'admin' || _session.role === 'BH' || _session.role === 'FinancialAdmin' || _session.role === 'BH') {
                fbcompany.find({
                    tenant_id: _session.tenant_id
                }).exec(
                    function (err, docs) {
                        if (!err) {
                            res.send(docs);
                        } else {

                            res.sendStatus(500);
                        }
                    });
            } else {
                if (_session.role === 'SM') {
                    // getteamidbyuser(_session,function(err,doc){
                    //     if(!err){

                    fbcompany.find({
                        tenant_id: _session.tenant_id,

                        $or: [{ teamId: _session.teamId }, { AssignedEmail: _session.email }]
                    }).exec(
                        function (err, docs) {
                            if (!err) {
                                res.send(docs);
                            } else {
                                //console.log('err:'+err)
                                res.sendStatus(500);
                            }
                        });

                    // }else{
                    //     res.sendStatus(500)
                    // }

                    // }) 

                } else {
                    getteamidsbystakeholders(_session, function (err, teams) {
                        if (!err) {
                            fbcompany.find({
                                tenant_id: _session.tenant_id,
                                $or: [{ teamId: { $in: teams } }, { AssignedEmail: _session.email }]

                            }).exec(
                                function (err, docs) {
                                    if (!err) {
                                        res.send(docs);
                                    } else {
                                        //console.log('err:'+err)
                                        res.sendStatus(500);
                                    }
                                });
                        } else {
                            res.sendStatus(500)
                        }
                    })

                }
            }
        } else {
            res.sendStatus(403);
        }
    });

});

router.get("/fbpartners/gettestcompanys", function (req, res) {

    new drvalidate(req, res, function (err, _session) {
        if (!err) {
            if (_session.role === 'admin' || _session.role === 'BH' || _session.role === 'FinancialAdmin' || _session.role === 'BH') {
                var query = fbpartners.aggregate([{
                    "$unwind": {
                        "path": "$companys",
                        "preserveNullAndEmptyArrays": false
                    }
                }, {
                    "$match": {
                        'companystakeholders.stakeholderEmail': _session.email,

                        _id: {
                            $eq: mongoose.Types.ObjectId(_session.tenant_id)
                        },
                        bankname: {
                            $eq: _session.bank
                        }
                    }
                },
                {
                    "$project": {
                        "id": "$companys.id",
                        "email": "$companys.email",
                        "name": "$companys.cname",
                        "city": "$companys.city",
                        "phone": "$companys.phone",
                        "workphone": "$companys.workphone",
                        "contact": "$companys.contact",

                    }
                }
                ])

            } else {

                var query = fbpartners.aggregate([{
                    "$unwind": {
                        "path": "$companys",
                        "preserveNullAndEmptyArrays": false
                    }
                }, {
                    "$match": {
                        'companystakeholders.stakeholderEmail': _session.email,

                        _id: {
                            $eq: mongoose.Types.ObjectId(_session.tenant_id)
                        },
                        bankname: {
                            $eq: _session.bank
                        }
                    }
                },
                {
                    "$project": {
                        "id": "$companys.id",
                        "email": "$companys.email",
                        "name": "$companys.cname",
                        "city": "$companys.city",
                        "phone": "$companys.phone",
                        "workphone": "$companys.workphone",
                        "contact": "$companys.contact",
                    }
                }
                ])

            }
            // fbpartners.findOne({
            //     _id: _session.tenant_id,
            //     bankname: _session.bank,
            //     'companystakeholders.stakeholderEmail': _session.email,
            // }, {
            //     companys: 1
            // })
            query.exec(
                function (err, docs) {
                    if (!err) {
                        var reviewer = [];

                        docs.companys.forEach(function (ele) {

                            reviewer.push({
                                'email': ele.email,
                                'name': ele.cname,
                                'id': ele.id,
                                'city': ele.city,
                                'phone': ele.phone,
                                'workphone': ele.workphone,
                                'Address': ele.Address,
                                'contact': ele.contact,
                            })

                        })
                        res.send(docs);
                    } else {
                        //console.log('err:'+err)
                        res.sendStatus(500);
                    }
                });
        } else {
            res.sendStatus(403);
        }
    });

});
///-----------------------------contest staart------------------
// --------------------------COntest Start ---------------
// createcontest
router.post('/fbpartners/createcontest', function (req, res) {
    new drvalidate(req, res, function (err, _session) {
        if (!err) {
            var _ccontest = req.body.contest;

            if (_ccontest.Participants_Type == "Teams") {
                getcontestteamby_id(_ccontest.Participantslist, _session, function (err, teamdetails) {
                    if (!err) {
                        // console.log('teamdetails - ', teamdetails);
                        var newfbcontest = new fbcontest({
                            id: guidGenerator(),
                            tenant_id: _session.tenant_id,
                            bankname: _session.bank,
                            name: _ccontest.name,
                            rules: _ccontest.rules,
                            owner: _ccontest.owner,
                            ownerId: _ccontest.ownerId,
                            ownerEmail: _ccontest.ownerEmail,
                            startdate: _ccontest.StartDate,
                            endDate: _ccontest.EndDate,
                            Participants_Type: _ccontest.Participants_Type,
                            Participants: teamdetails,
                            team: _ccontest.Participantslist,
                            attactments: _ccontest.attactments,
                            createdate: new Date(),
                            lstupdateddate: new Date(),
                            status: 0
                        })
                        newfbcontest.save(function (err) {
                            if (!err) {
                                res.sendStatus(200);
                            } else {
                                res.sendStatus(500);
                            }
                        });
                    }
                });
            } else {
                getparticioantby_userid(_ccontest.Participantslist, _session, function (err, participantslist) {
                    if (!err) {
                        // console.log('participantslist - ', participantslist);
                        var newfbcontest = new fbcontest({
                            id: guidGenerator(),
                            tenant_id: _session.tenant_id,
                            bankname: _session.bank,
                            name: _ccontest.name,
                            rules: _ccontest.rules,
                            owner: _ccontest.owner,
                            ownerId: _ccontest.ownerId,
                            ownerEmail: _ccontest.ownerEmail,
                            startdate: _ccontest.StartDate,
                            endDate: _ccontest.EndDate,
                            Participants_Type: _ccontest.Participants_Type,
                            Participants: participantslist,
                            team: '',
                            attactments: _ccontest.attactments,
                            createdate: new Date(),
                            lstupdateddate: new Date(),
                            status: 0
                        })
                        newfbcontest.save(function (err) {
                            if (!err) {
                                res.sendStatus(200);
                            } else {
                                res.sendStatus(500);
                            }
                        });
                    }
                });
            }
        }
    });
});

function getparticioantby_userid(participant, _session, fn) {
    var reviewer = [];
    var count = 0;
    participants = participant.split('|');

    participants.forEach(val => {
        fbusers.findOne({

            id: val,
            tenant_id: _session.tenant_id
        }, {

            'id': 1,
            'name': 1,
            'tenant_id': 1,
            'email': 1,


        })
            .exec(
                function (err, docs) {
                    if (!err) {
                        if (Array.isArray(docs) && docs.length) {
                            docs.forEach(function (ele) {
                                reviewer.push(ele)
                            });
                        }
                        if (participants.length - 1 == count) {

                            fn(null, reviewer);
                        }
                        count++;
                    } else {
                        fn(err, null);
                    }
                });
    });

}

function getcontestteamby_id(teams, _session, fn) {
    var reviewer = [];
    var count = 0;
    var team = teams.split('|');

    team.forEach(function (val, a) {
        fbusers.find({
            teamId: val,
            tenant_id: _session.tenant_id
        }, {

            'id': 1,
            'name': 1,
            'email': 1,


        })
            .exec(
                function (err, docs) {
                    if (!err) {
                        if (Array.isArray(docs) && docs.length) {
                            docs.forEach(function (ele) {
                                reviewer.push(ele)
                            });
                        }
                        if (team.length - 1 == count) {

                            fn(null, reviewer);
                        }
                        count++;
                    } else {
                        fn(err, null);
                    }
                });
    });
}

// updatecontest
router.post('/fbpartners/updatecontest', function (req, res) {
    new drvalidate(req, res, function (err, _session) {
        if (!err) {
            var _ccontest = req.body.contest;
            var record = {};

            if (_ccontest.Participants_Type == "Teams") {
                getcontestteamby_id(_ccontest.Participantslist, _session, function (err, teamdetails) {
                    if (!err) {

                        record['name'] = _ccontest.name;
                        record['rules'] = _ccontest.rules;
                        record['owner'] = _ccontest.owner;
                        record['ownerId'] = _ccontest.ownerId;
                        record['ownerEmail'] = _ccontest.ownerEmail;
                        record['startdate'] = _ccontest.StartDate;
                        record['endDate'] = _ccontest.EndDate;
                        record['Participants_Type'] = _ccontest.Participants_Type;
                        record['Participants'] = teamdetails;
                        record['team'] = _ccontest.Participantslist;
                        record['attactments'] = _ccontest.attactments;
                        record['lstupdateddate'] = new Date();

                        fbcontest.update({
                            tenant_id: _session.tenant_id,
                            _id: req.query.keyid
                        }, {
                            $set: record
                        }, function (err) {
                            if (!err) {
                                res.sendStatus(200);
                            } else {
                                res.sendStatus(500);
                            }
                        });
                    }
                });
            } else {
                getparticioantby_userid(_ccontest.Participantslist, _session, function (err, participantslist) {
                    if (!err) {
                        record['name'] = _ccontest.name;
                        record['rules'] = _ccontest.rules;
                        record['owner'] = _ccontest.owner;
                        record['ownerId'] = _ccontest.ownerId;
                        record['ownerEmail'] = _ccontest.ownerEmail;
                        record['startdate'] = _ccontest.StartDate;
                        record['endDate'] = _ccontest.EndDate;
                        record['Participants_Type'] = _ccontest.Participants_Type;
                        record['Participants'] = participantslist;
                        record['team'] = '';
                        record['attactments'] = _ccontest.attactments;
                        record['lstupdateddate'] = new Date();

                        fbcontest.update({
                            tenant_id: _session.tenant_id,
                            _id: req.query.keyid
                        }, {
                            $set: record
                        }, function (err) {
                            if (!err) {
                                res.sendStatus(200);
                            } else {
                                res.sendStatus(500);
                            }
                        });
                    }
                });
            }
        }
    });
});
//deletecontest
router.post('/fbpartners/deletecontest', function (req, res) {
    new drvalidate(req, res, (err, _session) => {
        if (!err) {
            var objid = req.query.keyid
            fbcontest.findOne({
                '_id': objid,
                tenant_id: _session.tenant_id
            }, {
                _id: 1,
                attactments: 1
            },
                function (err, doc) {
                    if (!err) {
                        if ((doc.attactments != null) && (doc.attactments != "")) {
                            var new_location = path.join('./fbpartners/', _session.bank, 'Contest', doc.attactments);

                            fs.unlink(new_location, function (err) {

                            });
                        }
                        fbcontest.remove({
                            tenant_id: _session.tenant_id,
                            '_id': doc._id
                        }, function (err, doc) {
                            if (!err) {
                                res.sendStatus(200);
                            } else {
                                res.sendStatus(500)
                            }
                        });
                    } else {
                        res.sendStatus(500)
                    }
                });
        } else {
            res.sendStatus(403);
        }
    })
});
//getcontest
router.get("/fbpartners/getcontest", function (req, res) {
    new drvalidate(req, res, (err, _session) => {
        if (!err) {

            if ((_session.role === 'FinancialAdmin') || (_session.role === 'admin')) {
                fbcontest.find({
                    tenant_id: _session.tenant_id
                }, {
                    name: 1,
                    rules: 1,
                    startdate: 1,
                    endDate: 1,
                    attactments: 1
                }).exec(
                    function (err, docs) {
                        if (!err) {
                            res.send(docs);
                        } else {
                            res.sendStatus(500);
                        }
                    });
            }
        } else {
            res.sendStatus(403);
        }
    });
});
//getownercontest
router.get("/fbpartners/getownercontest", function (req, res) {
    new drvalidate(req, res, (err, _session) => {
        if (!err) {
            fbcontest.find({
                tenant_id: _session.tenant_id,
                ownerEmail: _session.email
            }, {
                name: 1,
                rules: 1,
                startdate: 1,
                endDate: 1,
                attactments: 1
            }).exec(
                function (err, docs) {
                    if (!err) {
                        res.send(docs);
                    } else {
                        res.sendStatus(500);
                    }
                });
        } else {
            res.sendStatus(403);
        }
    });
});
//getparticipantscontest
router.get("/fbpartners/getparticipantscontest", function (req, res) {
    new drvalidate(req, res, (err, _session) => {
        if (!err) {
            fbcontest.find({
                tenant_id: _session.tenant_id,
                'Participants.email': _session.email
            }, {
                name: 1,
                rules: 1,
                startdate: 1,
                endDate: 1,
                attactments: 1
            }).exec(
                function (err, docs) {
                    if (!err) {
                        res.send(docs);
                    } else {
                        res.sendStatus(500);
                    }
                });
        } else {
            res.sendStatus(403);
        }
    });
});
// getcontestby
router.get("/fbpartners/getcontestby", function (req, res) {
    new drvalidate(req, res, (err, _session) => {
        if (!err) {
            fbcontest.findOne({
                tenant_id: _session.tenant_id,
                _id: req.query.keyid
            }).exec(function (err, docs) {
                if (!err) {
                    res.send(docs);
                } else {
                    res.sendStatus(500);
                }
            });
        } else {
            res.sendStatus(403);
        }
    });
});

router.get("/fbpartners/getcontestbyfilter", function (req, res) {
    var filter = req.query.filter
    new drvalidate(req, res, function (err, _session) {
        if (!err) {
            switch (filter) {
                case "ALL":
                    var query = fbcontest.find({
                        tenant_id: _session.tenant_id
                    }, {
                        name: 1,
                        rules: 1,
                        startdate: 1,
                        endDate: 1,
                        attactments: 1
                    })
                    break;
                case "open":
                    var query = fbcontest.find({
                        tenant_id: _session.tenant_id,
                        'status': 0
                    }, {
                        name: 1,
                        rules: 1,
                        startdate: 1,
                        endDate: 1,
                        attactments: 1
                    })
                    break;
                case "closed":
                    var query = fbcontest.find({
                        tenant_id: _session.tenant_id,
                        'status': 1
                    }, {
                        name: 1,
                        rules: 1,
                        startdate: 1,
                        endDate: 1,
                        attactments: 1
                    })

                    break;
                case "month":
                    var query = fbcontest.find({
                        tenant_id: _session.tenant_id,
                        "startdate": {
                            "$gte": new Date(moment().startOf('month')),
                            "$lte": new Date()
                        }
                    }, {
                        name: 1,
                        rules: 1,
                        startdate: 1,
                        endDate: 1,
                        attactments: 1
                    })
                    break;
                case "sixmonth":
                    var query = fbcontest.find({
                        tenant_id: _session.tenant_id,
                        "startdate": {
                            "$gt": new Date(moment().subtract(6, 'months')),
                            "$lt": new Date()
                        }
                    }, {
                        name: 1,
                        rules: 1,
                        startdate: 1,
                        endDate: 1,
                        attactments: 1
                    })
                    break;
            }

            query.exec(
                function (err, docs) {
                    if (!err) {
                        res.send(docs);
                    } else {
                        res.sendStatus(500);
                    }
                });
        } else {
            res.sendStatus(403);
        }
    });

});

router.get("/fbpartners/getparticipantscontestbyfilter", function (req, res) {
    var filter = req.query.filter
    new drvalidate(req, res, function (err, _session) {
        if (!err) {
            switch (filter) {
                case "ALL":
                    var query = fbcontest.find({
                        tenant_id: _session.tenant_id,
                        'Participants.email': _session.email
                    }, {
                        name: 1,
                        rules: 1,
                        startdate: 1,
                        endDate: 1,
                        attactments: 1
                    })
                    break;
                case "open":
                    var query = fbcontest.find({
                        tenant_id: _session.tenant_id,
                        'status': 0,
                        'Participants.email': _session.email
                    }, {
                        name: 1,
                        rules: 1,
                        startdate: 1,
                        endDate: 1,
                        attactments: 1
                    })
                    break;
                case "closed":
                    var query = fbcontest.find({
                        tenant_id: _session.tenant_id,
                        'status': 1,
                        'Participants.email': _session.email
                    }, {
                        name: 1,
                        rules: 1,
                        startdate: 1,
                        endDate: 1,
                        attactments: 1
                    })

                    break;
                case "month":
                    var query = fbcontest.find({
                        tenant_id: _session.tenant_id,
                        "startdate": {
                            "$gte": new Date(moment().startOf('month')),
                            "$lte": new Date()
                        },
                        'Participants.email': _session.email
                    }, {
                        name: 1,
                        rules: 1,
                        startdate: 1,
                        endDate: 1,
                        attactments: 1
                    })
                    break;
                case "sixmonth":
                    var query = fbcontest.find({
                        tenant_id: _session.tenant_id,
                        "startdate": {
                            "$gt": new Date(moment().subtract(6, 'months')),
                            "$lt": new Date()
                        },
                        'Participants.email': _session.email
                    }, {
                        name: 1,
                        rules: 1,
                        startdate: 1,
                        endDate: 1,
                        attactments: 1
                    })
                    break;
            }

            query.exec(
                function (err, docs) {
                    if (!err) {
                        res.send(docs);
                    } else {
                        res.sendStatus(500);
                    }
                });
        } else {
            res.sendStatus(403);
        }
    });

});

router.get("/fbpartners/getownercontesttbyfilter", function (req, res) {
    var filter = req.query.filter
    new drvalidate(req, res, function (err, _session) {
        if (!err) {
            switch (filter) {
                case "ALL":
                    var query = fbcontest.find({
                        tenant_id: _session.tenant_id,
                        ownerEmail: _session.email
                    }, {
                        name: 1,
                        rules: 1,
                        startdate: 1,
                        endDate: 1,
                        attactments: 1
                    })
                    break;
                case "open":
                    var query = fbcontest.find({
                        tenant_id: _session.tenant_id,
                        'status': 0,
                        ownerEmail: _session.email
                    }, {
                        name: 1,
                        rules: 1,
                        startdate: 1,
                        endDate: 1,
                        attactments: 1
                    })
                    break;
                case "closed":
                    var query = fbcontest.find({
                        tenant_id: _session.tenant_id,
                        'status': 1,
                        ownerEmail: _session.email
                    }, {
                        name: 1,
                        rules: 1,
                        startdate: 1,
                        endDate: 1,
                        attactments: 1
                    })

                    break;
                case "month":
                    var query = fbcontest.find({
                        tenant_id: _session.tenant_id,
                        "startdate": {
                            "$gte": new Date(moment().startOf('month')),
                            "$lte": new Date()
                        },
                        ownerEmail: _session.email
                    }, {
                        name: 1,
                        rules: 1,
                        startdate: 1,
                        endDate: 1,
                        attactments: 1
                    })
                    break;
                case "sixmonth":
                    var query = fbcontest.find({
                        tenant_id: _session.tenant_id,
                        "startdate": {
                            "$gt": new Date(moment().subtract(6, 'months')),
                            "$lt": new Date()
                        },
                        ownerEmail: _session.email
                    }, {
                        name: 1,
                        rules: 1,
                        startdate: 1,
                        endDate: 1,
                        attactments: 1
                    })
                    break;
            }

            query.exec(
                function (err, docs) {
                    if (!err) {
                        res.send(docs);
                    } else {
                        res.sendStatus(500);
                    }
                });
        } else {
            res.sendStatus(403);
        }
    });

});

// --------------------------COntest Start ---------------
// createcontest
router.post('/fbpartners/createcontest', function (req, res) {
    new drvalidate(req, res, function (err, _session) {
        if (!err) {
            var _ccontest = req.body.contest;

            if (_ccontest.Participants_Type == "Teams") {
                getcontestteamby_id(_ccontest.Participantslist, _session, function (err, teamdetails) {
                    if (!err) {
                        // console.log('teamdetails - ', teamdetails);
                        var newfbcontest = new fbcontest({
                            id: guidGenerator(),
                            tenant_id: _session.tenant_id,
                            bankname: _session.bank,
                            name: _ccontest.name,
                            rules: _ccontest.rules,
                            owner: _ccontest.owner,
                            ownerId: _ccontest.ownerId,
                            ownerEmail: _ccontest.ownerEmail,
                            startdate: _ccontest.StartDate,
                            endDate: _ccontest.EndDate,
                            Participants_Type: _ccontest.Participants_Type,
                            Participants: teamdetails,
                            team: _ccontest.Participantslist,
                            attactments: _ccontest.attactments,
                            createdate: new Date(),
                            lstupdateddate: new Date(),
                            status: 0
                        })
                        newfbcontest.save(function (err) {
                            if (!err) {
                                res.sendStatus(200);
                            } else {
                                res.sendStatus(500);
                            }
                        });
                    }
                });
            } else {
                getparticioantby_userid(_ccontest.Participantslist, _session, function (err, participantslist) {
                    if (!err) {
                        // console.log('participantslist - ', participantslist);
                        var newfbcontest = new fbcontest({
                            id: guidGenerator(),
                            tenant_id: _session.tenant_id,
                            bankname: _session.bank,
                            name: _ccontest.name,
                            rules: _ccontest.rules,
                            owner: _ccontest.owner,
                            ownerId: _ccontest.ownerId,
                            ownerEmail: _ccontest.ownerEmail,
                            startdate: _ccontest.StartDate,
                            endDate: _ccontest.EndDate,
                            Participants_Type: _ccontest.Participants_Type,
                            Participants: participantslist,
                            team: '',
                            attactments: _ccontest.attactments,
                            createdate: new Date(),
                            lstupdateddate: new Date(),
                            status: 0
                        })
                        newfbcontest.save(function (err) {
                            if (!err) {
                                res.sendStatus(200);
                            } else {
                                res.sendStatus(500);
                            }
                        });
                    }
                });
            }
        }
    });
});

function getparticioantby_userid(participant, _session, fn) {
    var reviewer = [];
    var count = 0;
    participants = participant.split('|');

    participants.forEach(val => {
        fbusers.findOne({
            id: val,
            tenant_id: _session.tenant_id
        }, {
            'id': 1,
            'name': 1,
            'tenant_id': 1,
            'email': 1,
        }).exec(
            function (err, docs) {
                if (!err) {
                    if (docs != null) {
                        reviewer.push(docs);
                    }
                    if (participants.length - 1 == count) {
                        fn(null, reviewer);
                    }
                    count++;
                } else {
                    fn(err, null);
                }
            });
    });
}

function getcontestteamby_id(teams, _session, fn) {
    var reviewer = [];
    var count = 0;
    var team = teams.split('|');

    team.forEach(function (val, a) {
        fbusers.findOne({
            teamId: val,
            tenant_id: _session.tenant_id
        }, {
            'id': 1,
            'name': 1,
            'email': 1,
        }).exec(
            function (err, docs) {
                if (!err) {
                    if (docs != null) {
                        reviewer.push(docs);
                    }
                    if (team.length - 1 == count) {
                        fn(null, reviewer);
                    }
                    count++;
                } else {
                    fn(err, null);
                }
            });
    });
}
// updatecontest
router.post('/fbpartners/updatecontest', function (req, res) {
    new drvalidate(req, res, function (err, _session) {
        if (!err) {
            var _ccontest = req.body.contest;
            var record = {};

            if (_ccontest.Participants_Type == "Teams") {
                getcontestteamby_id(_ccontest.Participantslist, _session, function (err, teamdetails) {
                    if (!err) {

                        record['name'] = _ccontest.name;
                        record['rules'] = _ccontest.rules;
                        record['owner'] = _ccontest.owner;
                        record['ownerId'] = _ccontest.ownerId;
                        record['ownerEmail'] = _ccontest.ownerEmail;
                        record['startdate'] = _ccontest.StartDate;
                        record['endDate'] = _ccontest.EndDate;
                        record['Participants_Type'] = _ccontest.Participants_Type;
                        record['Participants'] = teamdetails;
                        record['team'] = _ccontest.Participantslist;
                        record['attactments'] = _ccontest.attactments;
                        record['lstupdateddate'] = new Date();

                        fbcontest.update({
                            tenant_id: _session.tenant_id,
                            _id: req.query.keyid
                        }, {
                            $set: record
                        }, function (err) {
                            if (!err) {
                                res.sendStatus(200);
                            } else {
                                res.sendStatus(500);
                            }
                        });
                    }
                });
            } else {
                getparticioantby_userid(_ccontest.Participantslist, _session, function (err, participantslist) {
                    if (!err) {
                        record['name'] = _ccontest.name;
                        record['rules'] = _ccontest.rules;
                        record['owner'] = _ccontest.owner;
                        record['ownerId'] = _ccontest.ownerId;
                        record['ownerEmail'] = _ccontest.ownerEmail;
                        record['startdate'] = _ccontest.StartDate;
                        record['endDate'] = _ccontest.EndDate;
                        record['Participants_Type'] = _ccontest.Participants_Type;
                        record['Participants'] = participantslist;
                        record['team'] = '';
                        record['attactments'] = _ccontest.attactments;
                        record['lstupdateddate'] = new Date();

                        fbcontest.update({
                            tenant_id: _session.tenant_id,
                            _id: req.query.keyid
                        }, {
                            $set: record
                        }, function (err) {
                            if (!err) {
                                res.sendStatus(200);
                            } else {
                                res.sendStatus(500);
                            }
                        });
                    }
                });
            }
        }
    });
});
//deletecontest
router.post('/fbpartners/deletecontest', function (req, res) {
    new drvalidate(req, res, (err, _session) => {
        if (!err) {
            var objid = req.query.keyid
            fbcontest.findOne({
                '_id': objid,
                tenant_id: _session.tenant_id
            }, {
                _id: 1,
                attactments: 1
            },
                function (err, doc) {
                    if (!err) {
                        if ((doc.attactments != null) && (doc.attactments != "")) {
                            var new_location = path.join('./fbpartners/', _session.bank, 'Contest', doc.attactments);

                            fs.unlink(new_location, function (err) {

                            });
                        }
                        fbcontest.remove({
                            tenant_id: _session.tenant_id,
                            '_id': doc._id
                        }, function (err, doc) {
                            if (!err) {
                                res.sendStatus(200);
                            } else {
                                res.sendStatus(500)
                            }
                        });
                    } else {
                        res.sendStatus(500)
                    }
                });
        } else {
            res.sendStatus(403);
        }
    })
});
//getcontest
router.get("/fbpartners/getcontest", function (req, res) {
    new drvalidate(req, res, (err, _session) => {
        if (!err) {

            if ((_session.role === 'FinancialAdmin') || (_session.role === 'admin')) {
                fbcontest.find({
                    tenant_id: _session.tenant_id
                }, {
                    name: 1,
                    rules: 1,
                    startdate: 1,
                    endDate: 1,
                    attactments: 1
                }).exec(
                    function (err, docs) {
                        if (!err) {
                            res.send(docs);
                        } else {
                            res.sendStatus(500);
                        }
                    });
            }
        } else {
            res.sendStatus(403);
        }
    });
});
//getownercontest
router.get("/fbpartners/getownercontest", function (req, res) {
    new drvalidate(req, res, (err, _session) => {
        if (!err) {
            fbcontest.find({
                tenant_id: _session.tenant_id,
                ownerEmail: _session.email
            }, {
                name: 1,
                rules: 1,
                startdate: 1,
                endDate: 1,
                attactments: 1
            }).exec(
                function (err, docs) {
                    if (!err) {
                        res.send(docs);
                    } else {
                        res.sendStatus(500);
                    }
                });
        } else {
            res.sendStatus(403);
        }
    });
});
//getparticipantscontest
router.get("/fbpartners/getparticipantscontest", function (req, res) {
    new drvalidate(req, res, (err, _session) => {
        if (!err) {
            fbcontest.find({
                tenant_id: _session.tenant_id,
                'Participants.email': _session.email
            }, {
                name: 1,
                rules: 1,
                startdate: 1,
                endDate: 1,
                attactments: 1
            }).exec(
                function (err, docs) {
                    if (!err) {
                        res.send(docs);
                    } else {
                        res.sendStatus(500);
                    }
                });
        } else {
            res.sendStatus(403);
        }
    });
});
// getcontestby
router.get("/fbpartners/getcontestby", function (req, res) {
    new drvalidate(req, res, (err, _session) => {
        if (!err) {
            fbcontest.findOne({
                tenant_id: _session.tenant_id,
                _id: req.query.keyid
            }).exec(function (err, docs) {
                if (!err) {
                    res.send(docs);
                } else {
                    res.sendStatus(500);
                }
            });
        } else {
            res.sendStatus(403);
        }
    });
});

router.get("/fbpartners/getcontestbyfilter", function (req, res) {
    var filter = req.query.filter
    new drvalidate(req, res, function (err, _session) {
        if (!err) {
            switch (filter) {
                case "ALL":
                    var query = fbcontest.find({
                        tenant_id: _session.tenant_id
                    }, {
                        name: 1,
                        rules: 1,
                        startdate: 1,
                        endDate: 1,
                        attactments: 1
                    })
                    break;
                case "open":
                    var query = fbcontest.find({
                        tenant_id: _session.tenant_id,
                        'status': 0
                    }, {
                        name: 1,
                        rules: 1,
                        startdate: 1,
                        endDate: 1,
                        attactments: 1
                    })
                    break;
                case "closed":
                    var query = fbcontest.find({
                        tenant_id: _session.tenant_id,
                        'status': 1
                    }, {
                        name: 1,
                        rules: 1,
                        startdate: 1,
                        endDate: 1,
                        attactments: 1
                    })

                    break;
                case "month":
                    var query = fbcontest.find({
                        tenant_id: _session.tenant_id,
                        "startdate": {
                            "$gte": new Date(moment().startOf('month')),
                            "$lte": new Date()
                        }
                    }, {
                        name: 1,
                        rules: 1,
                        startdate: 1,
                        endDate: 1,
                        attactments: 1
                    })
                    break;
                case "sixmonth":
                    var query = fbcontest.find({
                        tenant_id: _session.tenant_id,
                        "startdate": {
                            "$gt": new Date(moment().subtract(6, 'months')),
                            "$lt": new Date()
                        }
                    }, {
                        name: 1,
                        rules: 1,
                        startdate: 1,
                        endDate: 1,
                        attactments: 1
                    })
                    break;
            }

            query.exec(
                function (err, docs) {
                    if (!err) {
                        res.send(docs);
                    } else {
                        res.sendStatus(500);
                    }
                });
        } else {
            res.sendStatus(403);
        }
    });

});

router.get("/fbpartners/getparticipantscontestbyfilter", function (req, res) {
    var filter = req.query.filter
    new drvalidate(req, res, function (err, _session) {
        if (!err) {
            switch (filter) {
                case "ALL":
                    var query = fbcontest.find({
                        tenant_id: _session.tenant_id,
                        'Participants.email': _session.email
                    }, {
                        name: 1,
                        rules: 1,
                        startdate: 1,
                        endDate: 1,
                        attactments: 1
                    })
                    break;
                case "open":
                    var query = fbcontest.find({
                        tenant_id: _session.tenant_id,
                        'status': 0,
                        'Participants.email': _session.email
                    }, {
                        name: 1,
                        rules: 1,
                        startdate: 1,
                        endDate: 1,
                        attactments: 1
                    })
                    break;
                case "closed":
                    var query = fbcontest.find({
                        tenant_id: _session.tenant_id,
                        'status': 1,
                        'Participants.email': _session.email
                    }, {
                        name: 1,
                        rules: 1,
                        startdate: 1,
                        endDate: 1,
                        attactments: 1
                    })

                    break;
                case "month":
                    var query = fbcontest.find({
                        tenant_id: _session.tenant_id,
                        "startdate": {
                            "$gte": new Date(moment().startOf('month')),
                            "$lte": new Date()
                        },
                        'Participants.email': _session.email
                    }, {
                        name: 1,
                        rules: 1,
                        startdate: 1,
                        endDate: 1,
                        attactments: 1
                    })
                    break;
                case "sixmonth":
                    var query = fbcontest.find({
                        tenant_id: _session.tenant_id,
                        "startdate": {
                            "$gt": new Date(moment().subtract(6, 'months')),
                            "$lt": new Date()
                        },
                        'Participants.email': _session.email
                    }, {
                        name: 1,
                        rules: 1,
                        startdate: 1,
                        endDate: 1,
                        attactments: 1
                    })
                    break;
            }

            query.exec(
                function (err, docs) {
                    if (!err) {
                        res.send(docs);
                    } else {
                        res.sendStatus(500);
                    }
                });
        } else {
            res.sendStatus(403);
        }
    });

});

router.get("/fbpartners/getownercontesttbyfilter", function (req, res) {
    var filter = req.query.filter
    new drvalidate(req, res, function (err, _session) {
        if (!err) {
            switch (filter) {
                case "ALL":
                    var query = fbcontest.find({
                        tenant_id: _session.tenant_id,
                        ownerEmail: _session.email
                    }, {
                        name: 1,
                        rules: 1,
                        startdate: 1,
                        endDate: 1,
                        attactments: 1
                    })
                    break;
                case "open":
                    var query = fbcontest.find({
                        tenant_id: _session.tenant_id,
                        'status': 0,
                        ownerEmail: _session.email
                    }, {
                        name: 1,
                        rules: 1,
                        startdate: 1,
                        endDate: 1,
                        attactments: 1
                    })
                    break;
                case "closed":
                    var query = fbcontest.find({
                        tenant_id: _session.tenant_id,
                        'status': 1,
                        ownerEmail: _session.email
                    }, {
                        name: 1,
                        rules: 1,
                        startdate: 1,
                        endDate: 1,
                        attactments: 1
                    })

                    break;
                case "month":
                    var query = fbcontest.find({
                        tenant_id: _session.tenant_id,
                        "startdate": {
                            "$gte": new Date(moment().startOf('month')),
                            "$lte": new Date()
                        },
                        ownerEmail: _session.email
                    }, {
                        name: 1,
                        rules: 1,
                        startdate: 1,
                        endDate: 1,
                        attactments: 1
                    })
                    break;
                case "sixmonth":
                    var query = fbcontest.find({
                        tenant_id: _session.tenant_id,
                        "startdate": {
                            "$gt": new Date(moment().subtract(6, 'months')),
                            "$lt": new Date()
                        },
                        ownerEmail: _session.email
                    }, {
                        name: 1,
                        rules: 1,
                        startdate: 1,
                        endDate: 1,
                        attactments: 1
                    })
                    break;
            }

            query.exec(
                function (err, docs) {
                    if (!err) {
                        res.send(docs);
                    } else {
                        res.sendStatus(500);
                    }
                });
        } else {
            res.sendStatus(403);
        }
    });

});

//-----------------------------contest end----------------------
// --------------------Activity Types Start------------------
// CreateActivitytype
router.post('/fbpartners/CreateActivitytype', function (req, res) {
    new drvalidate(req, res, function (err, _session) {
        if (!err) {
            var _cactivities = req.body.activities;
            fbactivitiesType.findOne({
                $or: [{
                    'tenant_id': {
                        $eq: _session.tenant_id
                    }
                }, {
                    'activitiestype.name': {
                        $eq: _cactivities.name
                    }
                }]
            }, function (err, doc) {
                if (!err) {

                    if (doc) {
                        const activitiestype_name = doc.activitiestype.some(activities => activities.name == _cactivities.name);

                        if (activitiestype_name) {

                            res.send(_cactivities.name + '  Activity Type is already Exists.')
                        } else {
                            var _record = {
                                id: guidGenerator(),
                                name: _cactivities.name,
                                description: _cactivities.description,
                                logopath: _cactivities.path,
                                colorcode: _cactivities.colorcode,
                                createddate: new Date(),
                                lstupdateddate: new Date()
                            }

                            fbactivitiesType.update({
                                tenant_id: _session.tenant_id
                            }, {
                                "$push": {
                                    'activitiestype': _record
                                }
                            },
                                function (err) {
                                    if (!err) {
                                        res.sendStatus(200);
                                        // res.status(200).json(_record);
                                    } else {
                                        res.sendStatus(500)
                                    }
                                });
                        }
                    } else {
                        var newfbactivitiesType = new fbactivitiesType({
                            tenant_id: _session.tenant_id,
                            bankname: _session.bank,
                            activitiestype: [{
                                id: guidGenerator(),
                                name: _cactivities.name,
                                description: _cactivities.description,
                                logopath: _cactivities.path,
                                colorcode: _cactivities.colorcode,
                                createddate: new Date(),
                                lstupdateddate: new Date()
                            }],
                            createddate: new Date(),
                            lstupdateddate: new Date(),
                            status: 1
                        })

                        newfbactivitiesType.save(function (err, result) {
                            if (err) {
                                res.send('failed')
                            } else {
                                res.sendStatus(200);
                                // res.status(200).json(result);
                            }
                        });
                    }
                } else {

                    res.sendStatus(500);
                }
            });
        } else {
            res.sendStatus(403)
        }
    });
});
// updateActivitytype
router.post('/fbpartners/updateActivitytype', function (req, res) {
    new drvalidate(req, res, function (err, _session) {
        if (!err) {
            var _cactivities = req.body.activities;
            var _ckeyid = req.query.keyid;
            fbactivitiesType.findOne({
                $or: [{
                    'tenant_id': {
                        $eq: _session.tenant_id
                    }
                }, {
                    'bankname': {
                        $eq: _session.bank
                    }
                }],
                'activitiestype.id': _ckeyid
            }, {
                'activitiestype.$': 1
            }, function (err, doc) {
                if (!err) {
                    if (doc) {
                        if (doc.activitiestype[0].id == _ckeyid) {
                            // console.log('Activities Type Same Exist');
                            update_activitiestype(_session, _cactivities, function (err, result) {
                                if (!err) {
                                    res.sendStatus(200);
                                } else {
                                    res.sendStatus(500);
                                }
                            })
                        } else {
                            // console.log('Activitie Type Exist');
                            res.send('Activitie Type Exist');
                        }
                    } else {
                        res.send('faied');
                    }
                } else {
                    res.sendStatus(500);
                }
            });
        } else {
            res.sendStatus(403)
        }
    });
});

function update_activitiestype(_session, _cactivities, fn) {
    var record = {};
    record['activitiestype.$.name'] = _cactivities.name;
    record['activitiestype.$.description'] = _cactivities.description;
    record['activitiestype.$.colorcode'] = _cactivities.colorcode;
    record['activitiestype.$.logopath'] = _cactivities.path;
    record['activitiestype.$.lstupdateddate'] = _cactivities.type;

    fbactivitiesType.update({
        tenant_id: _session.tenant_id,
        'activitiestype.id': _cactivities.id
    }, {
        $set: record
    }, function (err) {
        if (!err) {
            fn(null, 'ok')
        } else {
            fn(err, null);
        }
    });
}
// deleteActivitytype
router.post('/fbpartners/deleteActivitytype', function (req, res) {
    new drvalidate(req, res, function (err, _session) {
        if (!err) {
            var _keyid = req.query.keyid;
            fbactivitiesType.findOneAndUpdate({
                tenant_id: _session.tenant_id,
                'activitiestype.id': _keyid
            }, {
                $pull: {
                    activitiestype: {
                        id: _keyid
                    }
                }
            }, {
                new: true
            },
                function (err, doc) {
                    if (!err) {
                        res.sendStatus(200);
                    } else {
                        res.sendStatus(500)
                    }
                });
        } else {
            res.sendStatus(403);
        }
    })
});
//getactivitytypes
router.get("/fbpartners/getactivitytypes", function (req, res) {
    new drvalidate(req, res, async (err, _session) => {
        if (!err) {
            fbactivitiesType.aggregate([{
                "$unwind": {
                    "path": "$activitiestype",
                    "preserveNullAndEmptyArrays": true
                }
            }, {
                "$match": {
                    tenant_id: {
                        $eq: _session.tenant_id
                    }
                }
            }, {
                $project: {
                    id: "$activitiestype.id",
                    name: "$activitiestype.name",
                    desc: "$activitiestype.description",
                    colorcode: "$activitiestype.colorcode",
                    path: "$activitiestype.logopath"
                }
            }]).exec(function (err, docs) {
                if (err) {
                    res.sendStatus(500);
                } else {

                    res.send(docs);
                }
            });

        } else {
            res.sendStatus(403);
        }
    });
});
// getactivitytypesby
router.get("/fbpartners/bindeditactivitytypes", function (req, res) {
    new drvalidate(req, res, (err, _session) => {
        if (!err) {
            fbactivitiesType.findOne({
                tenant_id: _session.tenant_id,
                'activitiestype.id': req.query.keyid
            }, {
                _id: 0,
                'activitiestype.$': 1
            }).exec(function (err, docs) {
                if (!err) {
                    res.send(docs);
                } else {
                    res.sendStatus(500);
                }
            });

        } else {
            res.sendStatus(403);
        }
    });
});
// Not Using
router.get("/fbpartners/getactivitytypes- Not Using/:page", function (req, res) {
    new drvalidate(req, res, async (err, _session) => {
        if (!err) {
            if ((_session.role === 'FinancialAdmin') || (_session.role === 'admin')) {
                // Declaring variable
                const perPage = 30; // results per page
                const page = parseInt(req.params.page) || 1; // Page 

                // Count how many products were found
                const numOfapikeys = await fbactivitiesType.aggregate([{
                    $unwind: "$activitiestype"
                }, {
                    "$match": {
                        tenant_id: {
                            $eq: _session.tenant_id
                        },
                        bankname: {
                            $eq: _session.bank
                        }
                    }
                },
                {
                    $group: {
                        _id: '$_id',
                        // sum: {
                        //     $sum: '$activitiestype'
                        // }
                        count: {
                            $sum: 1
                        },
                    }
                }
                ])
                // console.log('numOfapikeys - ', numOfapikeys)
                await fbactivitiesType.aggregate([{
                    "$unwind": {
                        "path": "$activitiestype",
                        "preserveNullAndEmptyArrays": true
                    }
                }, {
                    "$match": {
                        tenant_id: {
                            $eq: _session.tenant_id
                        },
                        bankname: {
                            $eq: _session.bank
                        }
                    }
                }, {
                    $group: {
                        _id: '$_id',
                        count: {
                            $sum: 1
                        },
                        "activities": {
                            "$push": "$activitiestype"
                        }
                    }
                }, {
                    $skip: ((perPage * page) - perPage)
                },
                {
                    $limit: perPage
                }, {
                    $project: {
                        numOfResults: "$count",
                        activities: '$activities'
                    }
                }
                ]).exec(function (err, docs) {
                    if (err) {

                        res.sendStatus(500);
                    } else {

                        res.send({
                            docs: docs,
                            currentPage: page,
                            pages: Math.ceil(numOfapikeys[0].count / perPage),
                            numOfResults: numOfapikeys[0].count
                        });
                    }
                });

            } else {

                res.send('Not Authorized')
            }
        } else {
            res.sendStatus(403);
        }
    });
});
// ------------------------Activities Type End--------------------

// --------------------Activity Types Start------------------
// CreateActivitytype
router.post('/fbpartners/CreateActivitytype', function (req, res) {
    new drvalidate(req, res, function (err, _session) {
        if (!err) {
            var _cactivities = req.body.activities;
            fbactivitiesType.findOne({
                $or: [{
                    'tenant_id': {
                        $eq: _session.tenant_id
                    }
                }, {
                    'activitiestype.name': {
                        $eq: _cactivities.name
                    }
                }]
            }, function (err, doc) {
                if (!err) {

                    if (doc) {
                        const activitiestype_name = doc.activitiestype.some(activities => activities.name == _cactivities.name);

                        if (activitiestype_name) {

                            res.send(_cactivities.name + '  Activity Type is already Exists.')
                        } else {
                            var _record = {
                                id: guidGenerator(),
                                name: _cactivities.name,
                                description: _cactivities.description,
                                logopath: _cactivities.path,
                                colorcode: _cactivities.colorcode,
                                createddate: new Date(),
                                lstupdateddate: new Date()
                            }

                            fbactivitiesType.update({
                                tenant_id: _session.tenant_id
                            }, {
                                "$push": {
                                    'activitiestype': _record
                                }
                            },
                                function (err) {
                                    if (!err) {
                                        res.sendStatus(200);
                                        // res.status(200).json(_record);
                                    } else {
                                        res.sendStatus(500)
                                    }
                                });
                        }
                    } else {
                        var newfbactivitiesType = new fbactivitiesType({
                            tenant_id: _session.tenant_id,
                            bankname: _session.bank,
                            activitiestype: [{
                                id: guidGenerator(),
                                name: _cactivities.name,
                                description: _cactivities.description,
                                logopath: _cactivities.path,
                                colorcode: _cactivities.colorcode,
                                createddate: new Date(),
                                lstupdateddate: new Date()
                            }],
                            createddate: new Date(),
                            lstupdateddate: new Date(),
                            status: 1
                        })

                        newfbactivitiesType.save(function (err, result) {
                            if (err) {
                                res.send('failed')
                            } else {
                                res.sendStatus(200);
                                // res.status(200).json(result);
                            }
                        });
                    }
                } else {
                    res.sendStatus(500);
                }
            });
        } else {
            res.sendStatus(403)
        }
    });
});
// updateActivitytype
router.post('/fbpartners/updateActivitytype', function (req, res) {
    new drvalidate(req, res, function (err, _session) {
        if (!err) {
            var _cactivities = req.body.activities;
            var _ckeyid = req.query.keyid;
            fbactivitiesType.findOne({
                $or: [{
                    'tenant_id': {
                        $eq: _session.tenant_id
                    }
                }, {
                    'bankname': {
                        $eq: _session.bank
                    }
                }],
                'activitiestype.id': _ckeyid
            }, {
                'activitiestype.$': 1
            }, function (err, doc) {
                if (!err) {
                    if (doc) {
                        if (doc.activitiestype[0].id == _ckeyid) {
                            // console.log('Activities Type Same Exist');
                            update_activitiestype(_session, _cactivities, function (err, result) {
                                if (!err) {
                                    res.sendStatus(200);
                                } else {
                                    res.sendStatus(500);
                                }
                            })
                        } else {
                            // console.log('Activitie Type Exist');
                            res.send('Activitie Type Exist');
                        }
                    } else {
                        res.send('faied');
                    }
                } else {
                    res.sendStatus(500);
                }
            });
        } else {
            res.sendStatus(403)
        }
    });
});

function update_activitiestype(_session, _cactivities, fn) {
    var record = {};
    record['activitiestype.$.name'] = _cactivities.name;
    record['activitiestype.$.description'] = _cactivities.description;
    record['activitiestype.$.colorcode'] = _cactivities.colorcode;
    record['activitiestype.$.logopath'] = _cactivities.path;
    record['activitiestype.$.lstupdateddate'] = _cactivities.type;

    fbactivitiesType.update({
        tenant_id: _session.tenant_id,
        'activitiestype.id': _cactivities.id
    }, {
        $set: record
    }, function (err) {
        if (!err) {
            fn(null, 'ok')
        } else {
            fn(err, null);
        }
    });
}
// deleteActivitytype
router.post('/fbpartners/deleteActivitytype', function (req, res) {
    new drvalidate(req, res, function (err, _session) {
        if (!err) {
            var _keyid = req.query.keyid;
            fbactivitiesType.findOneAndUpdate({
                tenant_id: _session.tenant_id,
                'activitiestype.id': _keyid
            }, {
                $pull: {
                    activitiestype: {
                        id: _keyid
                    }
                }
            }, {
                new: true
            },
                function (err, doc) {
                    if (!err) {
                        res.sendStatus(200);
                    } else {
                        res.sendStatus(500)
                    }
                });
        } else {
            res.sendStatus(403);
        }
    })
});
//getactivitytypes
router.get("/fbpartners/getactivitytypes", function (req, res) {
    new drvalidate(req, res, async (err, _session) => {
        if (!err) {
            fbactivitiesType.aggregate([{
                "$unwind": {
                    "path": "$activitiestype",
                    "preserveNullAndEmptyArrays": true
                }
            }, {
                "$match": {
                    tenant_id: {
                        $eq: _session.tenant_id
                    }
                }
            }, {
                $project: {
                    id: "$activitiestype.id",
                    name: "$activitiestype.name",
                    desc: "$activitiestype.description",
                    colorcode: "$activitiestype.colorcode",
                    path: "$activitiestype.logopath"
                }
            }]).exec(function (err, docs) {
                if (err) {
                    res.sendStatus(500);
                } else {

                    res.send(docs);
                }
            });

        } else {
            res.sendStatus(403);
        }
    });
});
// getactivitytypesby
router.get("/fbpartners/bindeditactivitytypes", function (req, res) {
    new drvalidate(req, res, (err, _session) => {
        if (!err) {
            fbactivitiesType.findOne({
                tenant_id: _session.tenant_id,
                'activitiestype.id': req.query.keyid
            }, {
                _id: 0,
                'activitiestype.$': 1
            }).exec(function (err, docs) {
                if (!err) {
                    res.send(docs);
                } else {
                    res.sendStatus(500);
                }
            });

        } else {
            res.sendStatus(403);
        }
    });
});
// Not Using
router.get("/fbpartners/getactivitytypes- Not Using/:page", function (req, res) {
    new drvalidate(req, res, async (err, _session) => {
        if (!err) {
            if ((_session.role === 'FinancialAdmin') || (_session.role === 'admin')) {
                // Declaring variable
                const perPage = 30; // results per page
                const page = parseInt(req.params.page) || 1; // Page 

                // Count how many products were found
                const numOfapikeys = await fbactivitiesType.aggregate([{
                    $unwind: "$activitiestype"
                }, {
                    "$match": {
                        tenant_id: {
                            $eq: _session.tenant_id
                        },
                        bankname: {
                            $eq: _session.bank
                        }
                    }
                },
                {
                    $group: {
                        _id: '$_id',
                        // sum: {
                        //     $sum: '$activitiestype'
                        // }
                        count: {
                            $sum: 1
                        },
                    }
                }
                ])
                // console.log('numOfapikeys - ', numOfapikeys)
                await fbactivitiesType.aggregate([{
                    "$unwind": {
                        "path": "$activitiestype",
                        "preserveNullAndEmptyArrays": true
                    }
                }, {
                    "$match": {
                        tenant_id: {
                            $eq: _session.tenant_id
                        },
                        bankname: {
                            $eq: _session.bank
                        }
                    }
                }, {
                    $group: {
                        _id: '$_id',
                        count: {
                            $sum: 1
                        },
                        "activities": {
                            "$push": "$activitiestype"
                        }
                    }
                }, {
                    $skip: ((perPage * page) - perPage)
                },
                {
                    $limit: perPage
                }, {
                    $project: {
                        numOfResults: "$count",
                        activities: '$activities'
                    }
                }
                ]).exec(function (err, docs) {
                    if (err) {

                        res.sendStatus(500);
                    } else {

                        res.send({
                            docs: docs,
                            currentPage: page,
                            pages: Math.ceil(numOfapikeys[0].count / perPage),
                            numOfResults: numOfapikeys[0].count
                        });
                    }
                });

            } else {

                res.send('Not Authorized')
            }
        } else {
            res.sendStatus(403);
        }
    });
});
// ------------------------Activities Type End--------------------

// ------------------------Activity Start------------------------
// CreateActivity
router.post('/fbpartners/CreateActivity', function (req, res) {
    new drvalidate(req, res, function (err, _session) {
        if (!err) {
            var _cactivities = req.body.activities;

            getmydetails(_session.tenant_id, _session.bank, _session.email, function (err, owner) {
                if (!err) {
                    var newfbactivity = new fbactivity({
                        tenant_id: _session.tenant_id,
                        bankname: _session.bank,
                        id: guidGenerator(),
                        name: _cactivities.name,
                        description: _cactivities.description,
                        time: _cactivities.time,
                        colorcode: _cactivities.colorcode,
                        type: "Activity",
                        subtype: _cactivities.typename,
                        relationshipId: _cactivities.typeId,
                        owner: owner.name,
                        ownerId: owner.id,
                        ownerEmail: owner.email,
                        createddate: new Date(),
                        lstupdateddate: new Date(),
                        status: 1
                    })

                    newfbactivity.save(function (err, result) {
                        if (err) {
                            res.send('failed')
                        } else {
                            res.status(200).json(result);
                        }
                    })
                } else {
                    res.sendStatus(500);
                }
            });
        } else {
            res.sendStatus(403)
        }
    });
});
// updateActivity
router.post('/fbpartners/updateActivity', function (req, res) {
    new drvalidate(req, res, function (err, _session) {
        if (!err) {
            var _cactivities = req.body.activities;

            var _ckeyid = req.query.keyid;
            var record = {};
            record['name'] = _cactivities.name;
            record['description'] = _cactivities.description;
            record['colorcode'] = _cactivities.colorcode,
                record['subtype'] = _cactivities.typename;
            record['relationshipId'] = _cactivities.typeId;

            record['time'] = _cactivities.time;
            record['lstupdateddate'] = new Date();

            fbactivity.update({
                tenant_id: _session.tenant_id,
                id: _ckeyid
            }, {
                $set: record
            }, function (err) {
                if (!err) {
                    res.sendStatus(200);
                } else {
                    res.sendStatus(500)
                }
            });
        } else {
            res.sendStatus(403)
        }
    });
});
// deleteActivity
router.post('/fbpartners/deleteActivity', function (req, res) {
    new drvalidate(req, res, function (err, _session) {
        if (!err) {
            var _keyid = req.query.keyid;
            fbactivity.remove({
                tenant_id: _session.tenant_id,
                'id': _keyid
            },
                function (err, doc) {
                    if (!err) {
                        res.sendStatus(200);
                    } else {
                        res.sendStatus(500)
                    }
                });
        } else {
            res.sendStatus(403);
        }
    })
});
//getactivity
router.get("/fbpartners/getactivity", function (req, res) {
    new drvalidate(req, res, async (err, _session) => {
        if (!err) {
            fbactivity.find({
                ownerEmail: _session.email,
                tenant_id: _session.tenant_id
            }).sort({
                createddate: -1
            }).exec(function (err, docs) {
                if (err) {
                    res.sendStatus(500);
                } else {
                    res.send(docs);
                }
            });

        } else {
            res.sendStatus(403);
        }
    });
});
// getactivityby
router.get("/fbpartners/bindeditactivity", function (req, res) {
    new drvalidate(req, res, (err, _session) => {
        if (!err) {
            fbactivity.findOne({
                tenant_id: _session.tenant_id,
                'id': req.query.keyid
            }, {
                name: 1,
                description: 1,
                time: 1,
                relationshipId: 1
            }).exec(function (err, docs) {
                if (!err) {
                    res.send(docs);
                } else {
                    res.sendStatus(500);
                }
            });

        } else {
            res.sendStatus(403);
        }
    });
});
// getcurrentactivity --Present Month Only
router.get("/fbpartners/getcurrentactivity", function (req, res) {
    new drvalidate(req, res, (err, _session) => {
        if (!err) {

            fbactivity.aggregate([{
                $match: {
                    tenant_id: _session.tenant_id,
                    ownerEmail: _session.email,
                    'createddate': {
                        "$gte": new Date(moment().startOf('month')),
                        "$lte": new Date(moment().endOf('month'))
                    }
                }
            },
            {
                $group: {
                    _id: {
                        $dateToString: {
                            format: "%Y-%m-%d",
                            date: "$createddate"
                        }
                    },
                    count: {
                        $sum: 1
                    },
                    info: {
                        $push: {
                            date: "$createddate",
                            day: { $dayOfMonth: "$createddate" },
                            type: "$type",
                            id: "$id",
                            name: "$name",
                            description: "$description",
                            colorcode: "$colorcode",
                            time: "$time",
                            subtype: "$subtype",
                            relationshipId: "$relationshipId"
                        }
                    }
                }
            },
            {
                $sort: {
                    _id: -1
                }
            }
            ]).exec(function (err, docs) {
                if (err) {

                    res.sendStatus(500);
                } else {

                    res.send(docs);
                }
            });

        } else {
            res.sendStatus(403);
        }
    });
});
// getactivitybyfilter
router.get("/fbpartners/getactivitybyfilter", function (req, res) {
    new drvalidate(req, res, (err, _session) => {
        if (!err) {
            var filter = req.query.filter;
            // console.log('getactivitybyfilter - ',filter)
            switch (filter) {
                case "week":
                    dateoption = {
                        "$gt": new Date(moment().startOf('week')),
                        // "$lte": new Date()
                        "$lte": new Date(moment().endOf('week'))
                    }
                    break;

                case "month":
                    dateoption = {
                        "$gt": new Date(moment().startOf('month')),
                        "$lte": new Date(moment().endOf('month'))
                    }
                    break;

                case "threemonth":
                    const quarter = moment().quarter();
                    dateoption = {
                        "$gt": new Date(moment().quarter(quarter).startOf('quarter')),
                        "$lte": new Date(moment().quarter(quarter).endOf('quarter'))
                    }
                    break;

                case "sixmonth":
                    dateoption = {
                        "$gt": new Date(moment().subtract(6, 'months')),
                        "$lte": new Date()
                    }
                    break;

                default:
                    dateoption = {
                        "$gt": new Date(moment().startOf('month')),
                        "$lte": new Date(moment().endOf('month'))
                    }
                    break;
            }

            fbactivity.aggregate([{
                $match: {
                    tenant_id: _session.tenant_id,
                    ownerEmail: _session.email,
                    'createddate': dateoption
                }
            },
            {
                $group: {
                    _id: {
                        month: { $month: "$createddate" },
                        year: { $year: "$createddate" }
                    },
                    count: {
                        $sum: 1
                    },
                    info: {
                        $push: {
                            date: "$createddate",
                            day: { $dayOfMonth: "$createddate" },
                            type: "$type",
                            id: "$id",
                            name: "$name",
                            colorcode: "$colorcode",
                            description: "$description",
                            time: "$time",
                            subtype: "$subtype",
                            relationshipId: "$relationshipId"
                        }
                    }
                }
            },
            {
                $sort: {
                    _id: 1
                    // '_id.year': 1,
                    // '_id.month': 1
                }
            }
            ]).exec(function (err, docs) {
                if (err) {
                    res.sendStatus(500);
                } else {
                    res.send(docs);
                }
            });

        } else {
            res.sendStatus(403);
        }
    });
});
// getactivitybydate
router.get("/fbpartners/getactivitybydate", function (req, res) {
    new drvalidate(req, res, (err, _session) => {
        if (!err) {
            var startdate = req.query.sd;
            var enddate = req.query.ed;

            fbactivity.aggregate([{
                $match: {
                    tenant_id: _session.tenant_id,
                    ownerEmail: _session.email,
                    'createddate': {
                        "$gt": new Date(startdate),
                        "$lte": new Date(enddate)
                    }
                }
            },
            {
                $group: {
                    _id: {
                        month: { $month: "$createddate" },
                        year: { $year: "$createddate" },
                    },
                    count: {
                        $sum: 1
                    },
                    info: {
                        $push: {
                            date: "$createddate",
                            day: { $dayOfMonth: "$createddate" },
                            type: "$type",
                            id: "$id",
                            name: "$name",
                            description: "$description",
                            colorcode: "$colorcode",
                            time: "$time",
                            subtype: "$subtype",
                            relationshipId: "$relationshipId"
                        }
                    }
                }
            },
            {
                $sort: {
                    _id: 1
                }
            }
            ]).exec(function (err, docs) {
                if (err) {
                    res.sendStatus(500);
                } else {
                    res.send(docs);
                }
            });

        } else {
            res.sendStatus(403);
        }
    });
});

// ------------------------Activity end------------------------
// -----------------------List Start--------------------------
router.post("/fbpartners/savecsvlist", function (req, res) {
    drvalidate(req, res, function (err, _session) {
        if (!err) {
            var file_name = req.body.filename;
            if (file_name) {
                var list_data = path.join('./fbpartners/', _session.bank, 'lists', file_name);
                let stream = fs.createReadStream(list_data);
                let csvData = [];
                let csvStream = fastcsv.parse().on("data", function (data) {
                    csvData.push({
                        id: guidGenerator(),
                        type: data[0],
                        name: data[1],
                        value: data[2],
                        description: data[3]
                    });
                }).on("end", function () {
                    csvData.shift(); // remove the first line: header

                    if (Array.isArray(csvData) && csvData.length > 0) {

                        // Removing Duplicate Objects From CSVData Array
                        var ab = csvData.filter((v, i, a) => a.findIndex(t => (t.name === v.name)) != i);
                        if (Array.isArray(ab) && ab.length > 0) {

                            res.send('Duplicate Data is Present');
                        }
                        if (Array.isArray(ab) && ab.length == 0) {
                            fblist.findOne({
                                'bankname': _session.bank,
                                'tenant_id': _session.tenant_id
                            }, function (err, doc) {
                                if (!err) {
                                    if (doc == null) {
                                        var reviewer = [];

                                        csvData.forEach(function (ele) {

                                            reviewer.push({
                                                'id': ele.id,
                                                'type': ele.type,
                                                'name': ele.name,
                                                'value': ele.value,
                                                'description': ele.description,
                                                'createddate': new Date(),
                                                'lstupdateddate': new Date()
                                            })

                                        })

                                        var newlist = new fblist({
                                            tenant_id: _session.tenant_id,
                                            bankname: _session.bank,
                                            list: reviewer,
                                            createddate: new Date(),
                                            lstupdateddate: new Date(),
                                            status: 1
                                        })
                                        newlist.save(function (err) {
                                            if (!err) {

                                                res.sendStatus(200)
                                            } else {

                                                res.sendStatus(500)
                                            }
                                        })
                                    }
                                    if (doc != null) {
                                        var a = doc.list;
                                        var b = csvData
                                        var valuesA = a.reduce((a, {
                                            name
                                        }) => Object.assign(a, {
                                            [name]: name
                                        }), {});
                                        var result = b.filter(({
                                            name
                                        }) => !valuesA[name])
                                        var new_record = [];
                                        if (result.length == 0) {
                                            res.send('uploaded data is already exist');
                                        } else if (result.length > 0) {
                                            result.forEach(function (elem) {

                                                var _record = {};
                                                _record['id'] = elem.id;
                                                _record['type'] = elem.type;
                                                _record['name'] = elem.name;
                                                _record['value'] = elem.value;
                                                _record['description'] = elem.description;
                                                _record['createddate'] = new Date();
                                                _record['lstupdateddate'] = new Date();

                                                new_record.push(_record)

                                            })
                                            fblist.update({
                                                'tenant_id': _session.tenant_id,
                                                'bankname': _session.bank
                                            }, {
                                                "$push": {
                                                    'list': new_record
                                                }
                                            }, function (err) {
                                                if (!err) {

                                                    res.sendStatus(200)
                                                } else {

                                                    res.sendStatus(500)
                                                }
                                            });
                                        }
                                    }
                                } else {

                                    res.sendStatus(500)
                                }
                            });
                        }
                    } else {

                        res.send('Empty Data is Present..Please upload file with data')
                    }
                });
                stream.pipe(csvStream);
            } else {
                // console.log('File Name - ', file_name);
                res.sendStatus(500);
            }
        } else {
            res.sendStatus(403);
        }
    });
});



router.post("/fbpartners/createlist", function (req, res) {
    new drvalidate(req, res, function (err, _session) {
        if (!err) {
            var _list = req.body.list;
            if (_list.isgeneric === 1 && _session.bank === "Finbot") {
                checkiflistExist(_list, _session.bank, '0', function (err, doc) {
                    if (!err) {
                        if (doc == null) {
                            createnewlist(_session.bank, '0', function (err) {
                                if (!err) {
                                    pushsublist(_list, _session.bank, '0', function (err) {
                                        if (!err) {
                                            res.sendStatus(200)
                                        } else {
                                            res.sendStatus(500)
                                        }
                                    });
                                } else {
                                    res.sendStatus(500);
                                }
                            });
                        } else if (doc != null) {
                            var result = doc.list.filter(function (mydata) {
                                return mydata.name == _list.name;
                            });

                            if (result.length == 0) {
                                pushsublist(_list, _session.bank, _session.tenant_id, function (err) {
                                    if (!err) {
                                        res.sendStatus(200)
                                    } else {
                                        res.sendStatus(500)
                                    }
                                });
                            } else if (result.length != 0) {
                                // console.log('cannot add for having same name')
                                res.send("exist")
                            }
                        }
                    } else {
                        res.sendStatus(500)
                    }
                });
            } else {
                checkiflistExist(_list, _session.bank, _session.tenant_id, function (err, doc) {
                    if (!err) {
                        if (doc == null) {
                            createnewlist(_session.bank, _session.tenant_id, function (err) {
                                if (!err) {
                                    pushsublist(_list, _session.bank, _session.tenant_id, function (err) {
                                        if (!err) {
                                            res.sendStatus(200)
                                        } else {
                                            res.sendStatus(500)
                                        }
                                    });
                                } else {
                                    res.sendStatus(500);
                                }
                            });
                        } else if (doc != null) {
                            var result = doc.list.filter(function (mydata) {
                                return mydata.name == _list.name;
                            });

                            if (result.length == 0) {
                                pushsublist(_list, _session.bank, _session.tenant_id, function (err) {
                                    if (!err) {
                                        res.sendStatus(200)
                                    } else {
                                        res.sendStatus(500)
                                    }
                                })

                            } else if (result.length != 0) {
                                // console.log('cannot add for having same name')
                                res.send("exist")
                            }
                        }
                    } else {
                        res.sendStatus(500)
                    }

                })
            }
        } else {
            res.sendStatus(403);
        }
    })
});

function checkiflistExist(_list, bank, tenant_id, fn) {
    fblist.findOne({
        'bankname': bank,
        'tenant_id': tenant_id
    }, function (err, doc) {
        if (err) {
            fn(err, null)
        } else {
            fn(null, doc)
        }
    })
}

function createnewlist(bank, tenant_id, fn) {
    var newlist = new fblist({
        tenant_id: tenant_id,
        bankname: bank,
        list: [],
        createddate: new Date(),
        lstupdateddate: new Date(),
        status: 1
    })
    newlist.save(function (err, data) {
        if (!err) {
            // console.log('created collection - added data', data)
            fn(null)
        } else {
            // console.log('something wrong')
            fn(err)
        }
    })
}

function pushsublist(_list, bank, tenant_id, fn) {
    var _record = {};
    _record['id'] = _list.id;
    _record['type'] = _list.type;
    _record['name'] = _list.name;
    _record['value'] = _list.value;
    _record['description'] = _list.description;
    _record['isgeneric'] = _list.isgeneric;
    _record['createddate'] = new Date();
    _record['lstupdateddate'] = new Date();

    fblist.update({
        'tenant_id': tenant_id,
        'bankname': bank
    }, {
        "$push": {
            'list': _record
        }
    }, function (err) {
        if (err) {
            fn(err)
        } else {
            fn(null)
        }
    })
}

router.get("/fbpartners/getlist", function (req, res) {
    new drvalidate(req, res, function (err, _session) {
        if (!err) {
            // if (_session.bank === 'Finbot') {
            //     var query = {
            //         'bankname': _session.bank,
            //         $or: [{
            //             tenant_id: {
            //                 $eq: _session.tenant_id
            //             }

            //         }, {
            //             tenant_id: {
            //                 $eq: '0'
            //             }

            //         }]
            //     }
            // } else {
            //     var query = {
            //         'bankname': _session.bank,
            //         'tenant_id': _session.tenant_id
            //     }
            // }

            var query = {
                $or: [{
                    tenant_id: {
                        $eq: _session.tenant_id
                    }

                }, {
                    tenant_id: {
                        $eq: '0'
                    }

                }]
            }
            fblist.aggregate([{
                "$unwind": {
                    "path": "$list",
                    "preserveNullAndEmptyArrays": false
                }
            }, {
                "$match": query
            },
            {
                "$project": {
                    "id": "$list.id",
                    "type": "$list.type",
                    "name": "$list.name",
                    "value": "$list.value",
                    "description": "$list.description",
                    "isgeneric": "$list.isgeneric"
                }
            }
            ]).exec(function (err, doc) {
                if (err) {
                    res.sendStatus(500)
                } else {
                    res.send(doc);
                }
            })
        } else {
            res.sendStatus(403)
        }
    })
});

router.get("/fbpartners/bindeditlist", function (req, res) {
    new drvalidate(req, res, function (err, _session) {
        if (!err) {
            var type = req.query.type;

            if ((type == '1') && (_session.bank === "Finbot")) {
                var query = fblist.findOne({
                    'bankname': _session.bank,
                    // 'tenant_id': '0',
                    $or: [{
                        tenant_id: {
                            $eq: _session.tenant_id
                        }

                    }, {
                        tenant_id: {
                            $eq: '0'
                        }

                    }],
                    'list.id': req.query.keyid
                }, {
                    'list.$': 1,
                    _id: 0
                })
            } else {
                var query = fblist.findOne({
                    'bankname': _session.bank,
                    'tenant_id': _session.tenant_id,
                    'list.id': req.query.keyid
                }, {
                    'list.$': 1,
                    _id: 0
                })
            }

            query.exec(function (err, doc) {
                if (err) {
                    res.sendStatus(500)
                } else {

                    if (doc) {
                        res.send(doc.list[0]);
                    } else {
                        res.sendStatus(500)
                    }
                }
            })
        } else {
            res.sendStatus(403)
        }
    })
});

router.post("/fbpartners/updatelist", function (req, res) {
    new drvalidate(req, res, function (err, _session) {
        if (!err) {
            var _update = req.body.list
            var _record = {};
            _record['list.$.type'] = _update.type;
            _record['list.$.name'] = _update.name;
            _record['list.$.value'] = _update.value;
            _record['list.$.description'] = _update.description;
            _record['list.$.isgeneric'] = _update.isgeneric;
            _record['list.$.lstupdateddate'] = new Date();
            if ((_update.isgeneric === '1') && (_session.bank === "Finbot")) {
                var query = fblist.update({
                    'tenant_id': '0',
                    'bankname': _session.bank,
                    'list.id': _update.id
                }, {
                    "$set": _record
                })
            } else {
                var query = fblist.update({
                    'tenant_id': _session.tenant_id,
                    'bankname': _session.bank,
                    'list.id': _update.id
                }, {
                    "$set": _record
                })

            }
            query.exec(function (err, data) {
                if (err) {
                    // console.log('failed-updating - 1')
                    res.sendStatus(500);
                } else {
                    // console.log('ok', data)
                    res.sendStatus(200);
                }
            });
        } else {
            res.sendStatus(403)
        }
    });
});

router.post("/fbpartners/deletelist", function (req, res) {
    new drvalidate(req, res, function (err, _session) {
        if (!err) {


            var _record = {};
            var type = req.query.type;
            _record['list.$.id'] = req.query.id;

            if (type == "1") {
                var query = fblist.update({
                    'tenant_id': '0',
                    'list.id': req.query.id
                }, {
                    $pull: {
                        list: {
                            id: _record['list.$.id']
                        }
                    }
                })

            } else {
                var query = fblist.update({
                    'tenant_id': _session.tenant_id,
                    'list.id': req.query.id
                }, {
                    $pull: {
                        list: {
                            id: _record['list.$.id']
                        }
                    }
                })
            }

            query.exec(function (err, doc) {
                if (!err) {
                    res.sendStatus(200)
                } else {
                    res.sendStatus(500)
                }
            });
        } else {
            res.sendStatus(403)
        }
    })
});

router.get("/fbpartners/getalllistdrop", function (req, res) {
    new drvalidate(req, res, function (err, _session) {
        if (!err) {
            var list = JSON.parse(req.query.keyid);

            fblist.aggregate([{
                "$unwind": {
                    "path": "$list",
                    "preserveNullAndEmptyArrays": false
                }
            }, {
                "$match": {
                    "list.type": {
                        "$in": list
                    },
                    $or: [{
                        tenant_id: {
                            $eq: _session.tenant_id
                        }

                    }, {
                        tenant_id: {
                            $eq: '0'
                        }

                    }],

                }
            },
            {
                "$project": {
                    "id": "$list.id",
                    "type": "$list.type",
                    "name": "$list.name",
                    "value": "$list.value",
                    "description": "$list.description"
                }
            }
            ]).exec(
                function (err, docs) {
                    if (!err) {

                        res.send(docs)
                    } else {

                        res.sendStatus(500)
                    }
                });
        } else {
            res.sendStatus(403)
        }
    })
})
//-------------------list End-------------------------------------


//--------------------------fblist end-----------------------------

// -------------------------Telphony Start-----------------

router.post("/fbpartners/createtelephony", function (req, res) {
    drvalidate(req, res, function (err, _session) {
        if (!err) {
            if (_session.bank === "Finbot") {
                var _telphony = req.body.telphony;

                var newfbtelphony = new fbtelphony({
                    id: _telphony.id,
                    tenant_id: _session.tenant_id,
                    bankname: _session.bank,
                    mini_interval: _telphony.mini_interval,
                    transcript: _telphony.transcript,
                    No_of_calls_per_day: _telphony.calls_per_day,
                    filter: _telphony.filter,
                    createddate: new Date(),
                    lstupdateddate: new Date(),
                    status: 1
                })

                newfbtelphony.save(function (err) {
                    if (!err) {
                        res.sendStatus(200);
                    } else {
                        res.sendStatus(500);
                    }
                });
            } else {
                res.sendStatus(500);
            }
        } else {
            res.sendStatus(403);
        }

    });
});

router.post("/fbpartners/updatetelephony", function (req, res) {
    drvalidate(req, res, function (err, _session) {
        if (!err) {
            if (_session.bank === "Finbot") {
                var _telphony = req.body.telphony;
                var _record = {};

                _record['mini_interval'] = _telphony.mini_interval;
                _record['transcript'] = _telphony.transcript;
                _record['No_of_calls_per_day'] = _telphony.calls_per_day;
                _record['filter'] = _telphony.filter;
                _record['lstupdateddate'] = new Date();
                _record['status'] = 1;

                fbtelphony.update({
                    'tenant_id': _session.tenant_id,
                    'id': _telphony.id
                }, {
                    "$set": _record
                }, function (err) {
                    if (!err) {
                        res.sendStatus(200);
                    } else {
                        res.sendStatus(500);
                    }
                });
            } else {
                res.sendStatus(500);
            }
        } else {
            res.sendStatus(403);
        }
    });
});

router.post("/fbpartners/deletetelephony", function (req, res) {
    drvalidate(req, res, function (err, _session) {
        if (!err) {
            if (_session.bank === "Finbot") {
                var _telphony = req.body.telphony;
                fbtelphony.remove({
                    'tenant_id': _session.tenant_id,
                    'id': _telphony.id
                },
                    function (err, doc) {
                        if (!err) {
                            res.sendStatus(200);
                        } else {
                            res.sendStatus(500)
                        }
                    });
            } else {
                res.sendStatus(500)
            }
        } else {
            res.sendStatus(403);
        }
    });
});

router.get("/fbpartners/gettranscript", function (req, res) {
    new drvalidate(req, res, function (err, _session) {
        if (!err) {
            if (_session.bank === "Finbot") {
                fbtelphony.findOne({
                    'tenant_id': _session.tenant_id
                }, {
                    id: 1,
                    transcript: 1
                }).exec(function (err, docs) {
                    if (!err) {
                        res.send(docs);
                    } else {
                        res.sendStatus(500);
                    }
                });
            } else {
                res.sendStatus(500);
            }
        } else {
            res.sendStatus(500);
        }
    });
});

router.get("/fbpartners/gettelphonys", function (req, res) {
    new drvalidate(req, res, function (err, _session) {
        if (!err) {
            if (_session.bank === "Finbot") {
                fbtelphony.findOne({
                    'tenant_id': _session.tenant_id
                }).sort({
                    createddate: 1
                }).exec(function (err, docs) {
                    if (!err) {
                        res.send(docs);
                    } else {
                        res.sendStatus(500);
                    }
                });
            } else {
                res.sendStatus(500)
            }
        } else {
            res.sendStatus(500);
        }
    });
});

router.get('/fbpartners/telphonydetails', function (req, res) {
    new drvalidate(req, res, function (err, _session) {
        if (!err) {
            if (_session.bank === "Finbot") {
                fbtelphony.findOne({
                    'tenant_id': _session.tenant_id,
                    'id': req.query.keyid
                }).exec(function (err, docs) {
                    if (!err) {
                        res.send(docs);
                    } else {
                        res.sendStatus(500);
                    }
                });
            } else {
                res.sendStatus(500)
            }
        } else {
            res.sendStatus(403);
        }
    })
});

router.get('/fbpartners/getteleponyusers', function (req, res) {
    new drvalidate(req, res, function (err, _session) {
        if (!err) {
            if (_session.bank === "Finbot") {
                fbtelphony.findOne({
                    'tenant_id': _session.tenant_id
                }, {
                    id: 1,
                    mini_interval: 1,
                    _id: 0,
                    No_of_calls_per_day: 1
                }).exec(function (err, docs) {
                    if (!err) {
                        if (docs != null) {
                            var nocalls = parseInt(docs.No_of_calls_per_day);
                            fbbulkcontacts.find({
                                'tenant_id': _session.tenant_id,
                                assignedfor: _session.email,
                                assigned: 1,
                                $or: [{
                                    PLCT: {
                                        $lt: new Date(moment().subtract(parseInt(docs.mini_interval), 'days'))
                                    }
                                }, {
                                    PLCT: {
                                        $eq: null
                                    }
                                }],
                                // status: 1
                                status: {
                                    $in: [1, 2]
                                }
                            })
                                // .skip(nocalls)
                                .limit(nocalls)
                                .sort({
                                    PLCT: 1
                                })
                                .exec(function (err, cdocs) {
                                    if (!err) {
                                        if (Array.isArray(cdocs) && cdocs.length > 0) {
                                            // var a = cdocs.map(function (el) {
                                            //     var o = Object.assign({}, el);
                                            //     o.telphony_id = docs.id;
                                            //     return o;
                                            // });
                                            res.send(cdocs)
                                        } else {
                                            res.send([]);
                                        }
                                    } else {
                                        res.sendStatus(500);
                                    }
                                });
                        } else {
                            res.send([]);
                        }
                    } else {
                        res.sendStatus(500);
                    }
                });
            } else {
                res.sendStatus(500)
            }
        } else {
            res.sendStatus(403)
        }
    });
});
// not using
router.get('/fbpartners/getteleponyusersby', function (req, res) {
    new drvalidate(req, res, function (err, _session) {
        if (!err) {
            if (_session.bank === "Finbot") {
                fbtelphony.findOne({
                    'id': req.query.keyid,
                    'tenant_id': _session.tenant_id
                }, {
                    id: 1,
                    mini_interval: 1,
                    _id: 0
                }).exec(function (err, docs) {
                    if (!err) {
                        if (docs != null) {
                            fbbulkcontacts.find({
                                'tenant_id': _session.tenant_id,
                                $or: [{
                                    PLCT: {
                                        $lt: new Date(moment().subtract(parseInt(docs.mini_interval), 'days'))
                                    }
                                }, {
                                    PLCT: {
                                        $eq: null
                                    }
                                }],
                                status: 1
                            }).sort({
                                PLCT: 1
                            }).exec(function (err, cdocs) {
                                if (!err) {
                                    if (Array.isArray(cdocs) && cdocs.length > 0) {
                                        // var a = cdocs.map(function (el) {
                                        //     var o = Object.assign({}, el);
                                        //     o.telphony_id = docs.id;
                                        //     return o;
                                        // });

                                        res.send(cdocs);
                                    } else {
                                        res.send([]);
                                    }
                                } else {
                                    res.sendStatus(500);
                                }
                            });
                        } else {
                            res.send([]);
                        }
                    } else {
                        res.sendStatus(500);
                    }
                });
            } else {
                res.sendStatus(500)
            }
        } else {
            res.sendStatus(403)
        }
    });
});

router.post('/fbpartners/searchtelcontacts', function (req, res) {
    new drvalidate(req, res, function (err, _session) {
        if (!err) {
            if (_session.bank === "Finbot") {

                const filter = req.body.filter;
                fbtelphony.findOne({
                    'tenant_id': _session.tenant_id
                }, {
                    id: 1,
                    mini_interval: 1,
                    _id: 0,
                    No_of_calls_per_day: 1
                }).exec(function (err, docs) {
                    if (!err) {
                        if (docs != null) {
                            var nocalls = parseInt(docs.No_of_calls_per_day);
                            var name = filter.name.split(',');
                            var _reviewer = [];
                            var count = 1;
                            name.forEach(function (e) {
                                searchtelcontacts(_session, filter.type, e, docs.mini_interval, nocalls, function (err, data) {
                                    if (!err) {
                                        if (data != null) {
                                            if (Array.isArray(data) && data.length > 0) {
                                                data.forEach(function (ele) {
                                                    _reviewer.push(ele);
                                                })
                                            }
                                        }
                                        if (name.length == count) {
                                            res.send(_reviewer);
                                        }
                                        count++;
                                    }
                                });
                            });
                        } else {
                            res.send([]);
                        }
                    } else {
                        res.sendStatus(500);
                    }
                });
            } else {
                res.sendStatus(500)
            }
        } else {
            res.sendStatus(403);
        }
    });
});
function searchtelcontacts(_session, type, name, mini_interval, nocalls, fn) {

    switch ((type).toLowerCase()) {
        case 'zone':
            query = fbbulkcontacts.find({
                tenant_id: _session.tenant_id,
                assignedfor: {
                    $in: [_session.email, '']
                },
                assigned: {
                    $in: [0, 1, '']
                },
                // assigned: {
                //     $ne: 1
                // },
                zone: {
                    $regex: name,
                    $options: '$i'
                },
                $or: [{
                    PLCT: {
                        $lt: new Date(moment().subtract(parseInt(mini_interval), 'days'))
                    }
                }, {
                    PLCT: {
                        $eq: null
                    }
                }],
                status: {
                    $in: [1, 2]
                }
            })
                .limit(nocalls)
                .sort({
                    PLCT: 1
                })
            break;
        case 'city':
            query = fbbulkcontacts.find({
                tenant_id: _session.tenant_id,
                assignedfor: {
                    $in: [_session.email, '']
                },
                assigned: {
                    $in: [0, 1, '']
                },
                // assigned: {
                //     $ne: 1
                // },
                city: {
                    $regex: name,
                    $options: '$i'
                },
                $or: [{
                    PLCT: {
                        $lt: new Date(moment().subtract(parseInt(mini_interval), 'days'))
                    }
                }, {
                    PLCT: {
                        $eq: null
                    }
                }],
                status: {
                    $in: [1, 2]
                }
            })
                .limit(nocalls).sort({
                    PLCT: 1
                })
            break;
        case 'state':
            query = fbbulkcontacts.find({
                tenant_id: _session.tenant_id,
                assignedfor: {
                    $in: [_session.email, '']
                },
                assigned: {
                    $in: [0, 1, '']
                },
                // assigned: {
                //     $ne: 1
                // },
                state: {
                    $regex: name,
                    $options: '$i'
                },
                $or: [{
                    PLCT: {
                        $lt: new Date(moment().subtract(parseInt(mini_interval), 'days'))
                    }
                }, {
                    PLCT: {
                        $eq: null
                    }
                }],
                status: {
                    $in: [1, 2]
                }
            })
                .limit(nocalls).sort({
                    PLCT: 1
                })
            break;
    }
    query.exec(function (err, cdocs) {
        if (!err) {
            if (Array.isArray(cdocs) && cdocs.length > 0) {
                if (_session.role == 'TE') {
                    var _record = {};
                    _record['assigned'] = 1;
                    _record['assignedfor'] = _session.email;
                    cdocs.forEach(function (el) {
                        fbbulkcontacts.update({
                            tenant_id: _session.tenant_id,
                            id: el.id
                        }, {
                            "$set": _record
                        }, function (err) {
                            if (err) {

                            }
                        });
                    });
                }
                fn(null, cdocs);
            } else {

                fn(null, null);
            }
        } else {

            fn(err, null);
        }
    });
}

router.get('/fbpartners/getteleponyuserdetails', function (req, res) {
    new drvalidate(req, res, function (err, _session) {
        if (!err) {
            if (_session.bank === "Finbot") {
                fbbulkcontacts.findOne({
                    tenant_id: _session.tenant_id,
                    id: req.query.keyid
                }).exec(function (errr, data) {
                    if (!err) {
                        res.send(data);
                    } else {
                        res.sendStatus(500)
                    }
                });
            } else {
                res.sendStatus(500)
            }
        } else {
            res.sendStatus(403);
        }
    });
})
router.get('/fbpartners/getteamsbytelecalerid', function (req, res) {
    new drvalidate(req, res, function (error, _session) {
        if (!error) {
            fbusers.findOne({
                "role": { $in: ['TE', 'TM'] },
                tenant_id: _session.tenant_id,
                email: _session.email
            }, {
                id: 1, email: 1, name: 1,
                teamId: 1,
                team: 1
            }).exec(function (err, data) {
                if (!err) {
                    if (data) {

                        fbteams.find({
                            tenant_id: _session.tenant_id,
                            telecallerId: {
                                $regex: data.id
                            }
                        }, { teamname: 1, id: 1 }).exec(
                            function (err, docs) {
                                if (!err) {

                                    res.send(docs);
                                } else {

                                    res.sendStatus(500);
                                }
                            });
                    } else {
                        res.sendStatus(500);
                    }
                } else {
                    res.sendStatus(500)
                }
            });
        } else {
            res.sendStatus(403);
        }
    })
})
// -------------------------Telphony End-----------------
//--------------------------------bulk contacts start------------------
// bulkcontacts
router.post('/fbpartners/bulkcontacts', function (req, res) {
    new drvalidate(req, res, function (err, _session) {
        if (!err) {
            if (_session.bank == 'Finbot') {
                var file_name = req.body.filename;
                if (file_name) {
                    var contacts = path.join('./fbpartners/', _session.bank, 'contacts', file_name);

                    var assigned = '', assignedfor = ''
                    if (_session.role == 'TE') {
                        assigned = 1,
                            assignedfor = _session.email
                    }
                    let stream = fs.createReadStream(contacts);
                    let csvData = [];
                    let csvStream = fastcsv.parse().on("data", function (data) {
                        csvData.push({
                            id: guidGenerator(),
                            tenant_id: _session.tenant_id,
                            bankname: _session.bank,
                            name: data[0],
                            email: data[1],
                            phone: data[2],
                            city: data[3],
                            state: data[4],
                            phone2: data[5],
                            email2: data[6],
                            zone: data[7],
                            assigned: assigned,
                            assignedfor: assignedfor,
                            PLCT: '',
                            DCT: '',
                            activity: [],
                            createddate: new Date(),
                            lstupdateddate: new Date(),
                            status: 1
                        });

                    }).on("end", async function () {
                        csvData.shift(); // remove the first line: header
                        // Removing Duplicate Objects From CSVData Array
                        var a = csvData.filter((v, i, a) => a.findIndex(t => (t.email === v.email || t.phone == v.phone)) === i);

                        if (Array.isArray(a) && a.length > 0) {
                            var count = 0;
                            await a.forEach(async function (e) {
                                fbbulkcontacts.findOne({
                                    tenant_id: _session.tenant_id,
                                    $or: [{
                                        'email': {
                                            $eq: e.email
                                        }
                                    }, {
                                        'phone': {
                                            $eq: e.phone
                                        }
                                    }]
                                }, async function (err, doc) {
                                    if (!err) {
                                        if (doc) {

                                        } else {
                                            var newcontact = new fbbulkcontacts({
                                                id: e.id,
                                                tenant_id: _session.tenant_id,
                                                bankname: _session.bank,
                                                name: e.name,
                                                email: e.email,
                                                phone: e.phone,
                                                city: e.city,
                                                state: e.state,
                                                phone2: e.phone2,
                                                email2: e.email2,
                                                zone: e.zone,
                                                assigned: e.assigned,
                                                assignedfor: e.assignedfor,
                                                PLCT: '',
                                                DCT: '',
                                                activity: [],
                                                createddate: e.createdate,
                                                lstupdateddate: e.createdate,
                                                status: 1
                                            });
                                            newcontact.save();
                                        }
                                    }
                                });
                                count++;
                                if (a.length == count) {
                                    res.sendStatus(200);
                                }
                            });
                        } else {
                            res.send('Empty Data is Present');
                        }
                    });
                    stream.pipe(csvStream);
                } else {
                    res.sendStatus(500);
                }
            } else {
                res.sendStatus(500);
            }
        } else {
            res.sendStatus(403);
        }
    });
});
// get fbBulkcontacts 
router.get('/fbpartners/getbulkcontacts', function (req, res) {
    new drvalidate(req, res, function (err, _session) {
        if (!err) {
            fbbulkcontacts.find({
                tenant_id: _session.tenant_id
            }).exec(function (err, docs) {
                if (err) {
                    res.sendStatus(500);
                } else {
                    res.send(docs)
                }
            });
        } else {
            res.sendStatus(403);
        }
    });
});
// get bulkContacts by Zone or City or state
router.post('/fbpartners/searchbulkcontact', function (req, res) {
    new drvalidate(req, res, function (err, _session) {
        if (!err) {
            const filter = req.body.filter;

            const perPage = parseInt(filter.perPage) || 10; // results per page
            const page = parseInt(filter.page) || 1; // Page 

            fbbulkcontacts.find({
                tenant_id: _session.tenant_id,
                $or: [{
                    zone: {
                        $regex: filter.name,
                        $options: '$i'
                    }
                }, {
                    city: {
                        $regex: filter.name,
                        $options: '$i'
                    }
                }, {
                    state: {
                        $regex: filter.name,
                        $options: '$i'
                    }
                }]
            }).skip((perPage * page) - perPage)
                .limit(perPage).exec(function (err, docs) {
                    if (err) {
                        res.sendStatus(500);
                    } else {
                        res.send({
                            docs: docs,
                            currentPage: page,
                        });
                    }
                });
        } else {
            res.sendStatus(403);
        }
    });
});
//--------------------------------bulk contacts end---------------------
function getteamidsbystakeholders(_session, fn) {
    var query = fbteams.find({ 'teamstakeholders.stakeholderEmail': _session.email, tenant_id: _session.tenant_id, issales: 1 }, { teamname: 1, id: 1 })
    query.exec(function (err, docs) {
        if (!err) {
            var teams = [];
            docs.forEach(function (el) {
                teams.push(el.id)
            })
            fn(null, teams)
        }
        else {
            fn(err, null)
        }
    })

}
router.get("/fbpartners/gettenantleadstages", function (req, res) {

    new drvalidate(req, res, function (err, _session) {
        if (!err) {
            fbpartners.findOne({
                _id: _session.tenant_id,
                bankname: _session.bank
            }, {
                leadstages: 1
            }).exec(
                function (err, docs) {
                    if (!err) {
                        var reviewer = [];

                        docs.leadstages.forEach(function (ele) {

                            reviewer.push({
                                'stagename': ele.stagename,
                                'id': ele.id,
                                "nextleadstages": ele.nextleadstages,
                                "nextleadstagesid": ele.nextleadstagesid,
                                "loanform": ele.loanform,
                                "loanformid": ele.loanformid,
                                'description': ele.description,
                                'time': ele.maxtime,
                                'lf_status': ele.loanformstatus || 0,
                                'nls_status': ele.nextleadtatus || 0
                            })

                        })
                        res.send(reviewer);
                    } else {
                        //console.log('err:'+err)
                        res.sendStatus(500);
                    }
                });
        } else {
            res.sendStatus(403);
        }
    });

});

router.post("/fbpartners/updateleadstagesflows", function (req, res) {
    drvalidate(req, res, function (err, _session) {
        if (!err) {

            var _cflow = req.body.flow;
            var _record = {};
            gettenantleadstages(_session, function (err, Stages) {
                if (!err) {
                    var arry = [];
                    _cflow.stages.forEach(function (el) {
                        var rec = Stages.filter(x => x.id == el.id);
                        rec[0]['order'] = el.order
                        arry.push(rec[0])
                    })
                    arry.sort((a, b) => a.order - b.order);
                    _record['leadstages'] = arry;
                    fbpartners.update({
                        '_id': _session.tenant_id,
                        'bankname': _session.bank
                    }, {
                        "$set": _record
                    }, function (err) {
                        if (!err) {
                            var result = {};
                            result.Result = "OK";
                            result.Record = arry;
                            res.json(result);
                        } else {
                            res.sendStatus(500)
                        }
                    })
                } else {

                    res.sendStatus(500);
                }
            });
        } else {
            res.sendStatus(403);
        }
    });
});
router.get("/fbpartners/getcontacts", function (req, res) {
    new drvalidate(req, res, function (err, _session) {
        if (!err) {
            if (_session.role === 'admin' || _session.role === 'BH' || _session.role === 'FinancialAdmin' || _session.role === 'BH') {
                fbcontacts.find({
                    tenant_id: _session.tenant_id
                }).exec(
                    function (err, docs) {
                        if (!err) {
                            res.send(docs);
                        } else {
                            res.sendStatus(500);
                        }
                    });
            } else {
                if (_session.role === 'SM') {
                    // getteamidbyuser(_session,function(err,doc){
                    //     if(!err){
                    fbcontacts.find({
                        tenant_id: _session.tenant_id,
                        $or: [{ teamId: _session.teamId }, { owner: _session.email }]
                    }).exec(
                        function (err, docs) {
                            if (!err) {
                                res.send(docs);
                            } else {
                                res.sendStatus(500);
                            }
                        });

                    //     }else{
                    //         res.sendStatus(500)
                    //     }

                    //   }) 

                } else {
                    getteamidsbystakeholders(_session, function (err, teams) {
                        if (!err) {
                            fbcontacts.find({
                                tenant_id: _session.tenant_id,
                                $or: [{ teamId: { $in: teams } }, { owner: _session.email }]

                            }).exec(
                                function (err, docs) {
                                    if (!err) {
                                        res.send(docs);
                                    } else {
                                        res.sendStatus(500);
                                    }
                                });
                        } else {
                            res.sendStatus(500)
                        }
                    })

                }

            }
        } else {
            res.sendStatus(403);
        }
    });
});
router.get("/fbpartners/getcompanynames", function (req, res) {
    new drvalidate(req, res, function (err, _session) {
        if (!err) {
            fbcompany.find({
                tenant_id: _session.tenant_id
            }, {
                'name': 1,
                'id': 1,
                'email': 1
            }).exec(
                function (err, docs) {
                    if (!err) {
                        res.send(docs);
                    } else {

                        res.sendStatus(500);
                    }
                });
        } else {
            res.sendStatus(403);
        }
    });
});

router.get("/fbpartners/getleadstagenames", function (req, res) {
    new drvalidate(req, res, function (err, _session) {
        if (!err) {
            fbpartners.find({
                _id: _session.tenant_id,
                bankname: _session.bank
            }, {
                'leadstages': 1
            }).exec(
                function (err, docs) {
                    if (!err) {
                        var reviewer = [];

                        docs[0].leadstages.forEach(function (ele) {

                            reviewer.push({
                                'stagename': ele.stagename,
                                'id': ele.id,
                                "nextleadstages": ele.nextleadstages,
                                "nextleadstagesid": ele.nextleadstagesid,
                                "loanform": ele.loanform,
                                "loanformid": ele.loanformid,
                                'time': ele.maxtime
                            })
                            //console.log('reviewer:'+ele.email)


                        })
                        //console.log(reviewer);
                        res.send(reviewer);
                    } else {

                        res.sendStatus(500);
                    }
                });
        } else {
            res.sendStatus(403);
        }
    });

});
router.get("/fbpartners/getdealerleadstagenames", function (req, res) {
    new drvalidate(req, res, function (err, _session) {
        if (!err) {
            fbpartners.find({
                _id: req.query.id,
                bankname: req.query.name
            }, {
                'leadstages': 1
            }).exec(
                function (err, docs) {
                    if (!err) {
                        var reviewer = [];

                        docs[0].leadstages.forEach(function (ele) {

                            reviewer.push({
                                'stagename': ele.stagename,
                                'id': ele.id,
                                "nextleadstages": ele.nextleadstages,
                                "nextleadstagesid": ele.nextleadstagesid,
                                "loanform": ele.loanform,
                                "loanformid": ele.loanformid,
                                'time': ele.maxtime
                            })
                            //console.log('reviewer:'+ele.email)


                        })
                        //console.log(reviewer);
                        res.send(reviewer);
                    } else {

                        res.sendStatus(500);
                    }
                });
        } else {
            res.sendStatus(403);
        }
    });

});
router.post("/fbpartners/savemaxtime_leadstages", function (req, res) {
    drvalidate(req, res, function (err, _session) {
        if (!err) {
            var _cleadstage = req.body.leadstage;
            fbpartners.update({
                _id: _session.tenant_id,
                'leadstages.id': req.query.keyid
            }, {
                "$set": {
                    "leadstages.$.maxtime": _cleadstage.time
                }
            }).exec(function (err, result) {
                if (!err) {
                    var result = {};
                    result.Result = "OK";
                    res.json(result);
                } else {
                    res.sendStatus(500)
                }
            })
        } else {
            res.sendStatus(403);
        }
    })
});
// router.get("/fbpartners/getmanagers", function (req, res) {


//     new drvalidate(req, res, function (err, _session) {
//         if (!err) {
//             fbpartners.find({ _id: _session.tenant_id, bankname: _session.bank, 'users.role': 'manager' }, { 'users': 1 }).exec(
//                 function (err, docs) {
//                     if (!err) {
//                         var reviewer = [];
//                         //console.log(docs)
//                         docs[0].users.forEach(function (ele) {
//                             if (ele.role == 'manager') {


//                                 reviewer.push({ 'name': ele.uname, 'id': ele.id, 'role': ele.role, 'email': ele.email })
//                                 //console.log('reviewer:'+ele.email)
//                             }

//                         }
//                         )
//                         //console.log(reviewer);
//                         res.send(reviewer);
//                     }
//                     else {
//                         console.log('err:' + err)
//                         res.sendStatus(500);
//                     }
//                 });
//         }

//         else {
//             res.sendStatus(403);
//         }
//     });

// });

router.get("/fbpartners/getmanagers", function (req, res) {

    var role = req.query.role

    new drvalidate(req, res, function (err, _session) {
        if (!err) {
            fbusers.find({
                tenant_id: _session.tenant_id,
                bankname: _session.bank,
                'role': role
            }, {
                'email': 1, 'name': 1, 'id': 1, 'city': 1, 'role': 1, 'phone': 1, 'logopath': 1,
            }).exec(
                function (err, docs) {
                    if (!err) {
                        var reviewer = [];
                        if (Array.isArray(docs) && docs.length) {

                            res.send(docs);
                        } else {
                            res.send("No Managers Available");
                        }
                    } else {

                        res.sendStatus(500);
                    }
                });
        } else {
            res.sendStatus(403);
        }
    });

});

router.get("/fbpartners/getcontactnames", function (req, res) {
    new drvalidate(req, res, function (err, _session) {
        if (!err) {
            fbcontacts.find({
                tenant_id: _session.tenant_id
            }, {
                _id: 0,
                'name': 1,
                'id': 1
            }).exec(
                function (err, docs) {
                    if (!err) {
                        res.send(docs);
                    } else {
                        res.sendStatus(500);
                    }
                });
        } else {
            res.sendStatus(403);
        }
    });
});

router.get("/fbpartners/getleadss", function (req, res) {

    new drvalidate(req, res, function (err, _session) {
        if (!err) {
            fbpartnerleads.find({
                tenant_id: _session.tenant_id,
                sourceid: undefined
            }, {
                leadequipments: 1,
                financialpartner: 1,
                leadamount: 1,
                financerequired: 1,
                financesummary: 1,
                company: 1,
                contact: 1,
                contactnumber: 1,
                leadsummary: 1,
                Assigned: 1,
                leadstages: 1,
                leadstage: 1,
                sourceid: 1
            }).exec(
                function (err, docs) {
                    if (!err) {




                        res.send(docs);
                    } else {

                        res.sendStatus(500);
                    }
                });
        } else {
            res.sendStatus(403);
        }
    });

});
router.get("/fbpartners/getleads", function (req, res) {

    new drvalidate(req, res, function (err, _session) {
        if (!err) {
            var nlength = 0;
            if (_session.role === 'admin' || _session.role === 'BH') {
                var query = fbpartnerleads.find({
                    tenant_id: _session.tenant_id,


                }, {

                    leadname: 1,
                    leadequipments: 1,
                    financialpartner: 1,
                    leadamount: 1,
                    _id: 1,
                    financerequired: 1,
                    financesummary: 1,
                    company: 1,
                    contact: 1,
                    contactnumber: 1,
                    leadsummary: 1,
                    leadstages: 1,
                    leadstage: 1,
                    AssignedEmail: 1,
                    Assigned: 1,
                    tenant_id: 1,
                    stakeholders: 1,

                })

            }
            else {
                var query = fbpartnerleads.find({
                    tenant_id: _session.tenant_id,

                    'stakeholders.stakeholderEmail': _session.email
                }, {
                    leadname: 1,
                    leadequipments: 1,
                    financialpartner: 1,
                    leadamount: 1,
                    _id: 1,
                    financerequired: 1,
                    financesummary: 1,
                    company: 1,
                    contact: 1,
                    contactnumber: 1,
                    leadsummary: 1,
                    leadstages: 1,
                    leadstage: 1,
                    AssignedEmail: 1,
                    Assigned: 1,
                    tenant_id: 1,
                    stakeholders: 1,

                })

            }



            query.exec(
                function (err, docs) {
                    if (!err) {
                        // nlength++;







                        res.send(docs);

                    } else {
                        //console.log('err:'+err)
                        res.sendStatus(500);
                    }
                });
            // });

            //  })


        } else {
            res.sendStatus(403);
        }
    });
});
router.get("/fbpartners/getleadsbyfilter", function (req, res) {
    new drvalidate(req, res, function (err, _session) {
        if (!err) {
            var filter = req.query.filter;
            var date = new Date();

            var query;
            switch (filter) {
                case "ALL":
                    if (_session.role === 'admin') {
                        var query = fbpartnerleads.find({
                            tenant_id: _session.tenant_id,
                        }, {
                            leadequipments: 1,
                            financialpartner: 1,
                            leadamount: 1,
                            _id: 1,
                            financerequired: 1,
                            financesummary: 1,
                            company: 1,
                            contact: 1,
                            contactnumber: 1,
                            leadsummary: 1,
                            leadstages: 1,
                            leadstage: 1,
                            AssignedEmail: 1,
                            Assigned: 1,
                            tenant_id: 1,
                            stakeholders: 1,
                        })

                    } else {
                        var query = fbpartnerleads.find({
                            tenant_id: _session.tenant_id,

                            'stakeholders.stakeholderEmail': _session.email
                        }, {
                            leadequipments: 1,
                            financialpartner: 1,
                            leadamount: 1,
                            _id: 1,
                            financerequired: 1,
                            financesummary: 1,
                            company: 1,
                            contact: 1,
                            contactnumber: 1,
                            leadsummary: 1,
                            leadstages: 1,
                            leadstage: 1,
                            AssignedEmail: 1,
                            Assigned: 1,
                            tenant_id: 1,
                            stakeholders: 1,

                        })

                    }
                    break;
                case "month":
                    if (_session.role === 'admin') {
                        var query = fbpartnerleads.find({
                            tenant_id: _session.tenant_id,
                            'createddate': {
                                "$gt": new Date(moment().startOf('month').utc().format()),
                                "$lte": new Date(date.setDate(date.getDate())).toISOString()
                            }
                        }, {
                            leadequipments: 1,
                            financialpartner: 1,
                            leadamount: 1,
                            _id: 1,
                            financerequired: 1,
                            financesummary: 1,
                            company: 1,
                            contact: 1,
                            contactnumber: 1,
                            leadsummary: 1,
                            leadstages: 1,
                            leadstage: 1,
                            AssignedEmail: 1,
                            Assigned: 1,
                            tenant_id: 1,
                            stakeholders: 1,
                        })

                    } else {
                        query = fbpartnerleads.find({
                            'createddate': {
                                "$gt": new Date(moment().startOf('month').utc().format()),
                                "$lte": new Date(date.setDate(date.getDate())).toISOString()
                            },
                            tenant_id: _session.tenant_id,
                            'stakeholders.stakeholderEmail': _session.email
                        }, {
                            leadequipments: 1,
                            financialpartner: 1,
                            leadamount: 1,
                            _id: 1,
                            financerequired: 1,
                            financesummary: 1,
                            company: 1,
                            contact: 1,
                            contactnumber: 1,
                            leadsummary: 1,
                            leadstages: 1,
                            leadstage: 1,
                            AssignedEmail: 1,
                            Assigned: 1,
                            tenant_id: 1,
                            stakeholders: 1,

                        })

                    }
                    break;
                case "week":

                    if (_session.role === 'admin') {
                        var query = fbpartnerleads.find({
                            tenant_id: _session.tenant_id,
                            'createddate': {
                                "$gt": moment().startOf('week'),
                                "$lte": new Date(date.setDate(date.getDate())).toISOString()
                            }
                        }, {
                            leadequipments: 1,
                            financialpartner: 1,
                            leadamount: 1,
                            _id: 1,
                            financerequired: 1,
                            financesummary: 1,
                            company: 1,
                            contact: 1,
                            contactnumber: 1,
                            leadsummary: 1,
                            leadstages: 1,
                            leadstage: 1,
                            AssignedEmail: 1,
                            Assigned: 1,
                            tenant_id: 1,
                            stakeholders: 1,
                        })

                    } else {
                        query = fbpartnerleads.find({
                            'createddate': {
                                "$gt": moment().startOf('week'),
                                "$lte": new Date(date.setDate(date.getDate())).toISOString()
                            },
                            tenant_id: _session.tenant_id,
                            'stakeholders.stakeholderEmail': _session.email
                        }, {
                            leadequipments: 1,
                            financialpartner: 1,
                            leadamount: 1,
                            _id: 1,
                            financerequired: 1,
                            financesummary: 1,
                            company: 1,
                            contact: 1,
                            contactnumber: 1,
                            leadsummary: 1,
                            leadstages: 1,
                            leadstage: 1,
                            AssignedEmail: 1,
                            Assigned: 1,
                            tenant_id: 1,
                            stakeholders: 1,

                        })

                    }
                    break;

                case "threemonth":
                    const quarter = moment().quarter();

                    const start = moment().quarter(quarter).startOf('quarter');

                    const end = moment().quarter(quarter).endOf('quarter');

                    if (_session.role === 'admin') {
                        query = fbpartnerleads.find({
                            tenant_id: _session.tenant_id,
                            'createddate': {
                                "$gt": start,
                                "$lte": end
                            }
                        }, {
                            leadequipments: 1,
                            financialpartner: 1,
                            leadamount: 1,
                            _id: 1,
                            financerequired: 1,
                            financesummary: 1,
                            company: 1,
                            contact: 1,
                            contactnumber: 1,
                            leadsummary: 1,
                            leadstages: 1,
                            leadstage: 1,
                            AssignedEmail: 1,
                            Assigned: 1,
                            tenant_id: 1,
                            stakeholders: 1,
                        })

                    } else {
                        query = fbpartnerleads.find({
                            'createddate': {
                                "$gt": start,
                                "$lte": end
                            },
                            tenant_id: _session.tenant_id,
                            'stakeholders.stakeholderEmail': _session.email
                        }, {
                            leadequipments: 1,
                            financialpartner: 1,
                            leadamount: 1,
                            _id: 1,
                            financerequired: 1,
                            financesummary: 1,
                            company: 1,
                            contact: 1,
                            contactnumber: 1,
                            leadsummary: 1,
                            leadstages: 1,
                            leadstage: 1,
                            AssignedEmail: 1,
                            Assigned: 1,
                            tenant_id: 1,
                            stakeholders: 1,

                        })

                    }
                    break;
                case "sixmonth":
                    if (_session.role === 'admin') {
                        query = fbpartnerleads.find({
                            tenant_id: _session.tenant_id,
                            'createddate': {
                                "$gt": moment().subtract(6, 'months'),
                                "$lte": new Date(date.setDate(date.getDate())).toISOString()
                            }
                        }, {
                            leadequipments: 1,
                            financialpartner: 1,
                            leadamount: 1,
                            _id: 1,
                            financerequired: 1,
                            financesummary: 1,
                            company: 1,
                            contact: 1,
                            contactnumber: 1,
                            leadsummary: 1,
                            leadstages: 1,
                            leadstage: 1,
                            AssignedEmail: 1,
                            Assigned: 1,
                            tenant_id: 1,
                            stakeholders: 1,
                        })

                    } else {
                        query = fbpartnerleads.find({
                            'createddate': {
                                "$gt": moment().subtract(6, 'months'),
                                "$lte": new Date(date.setDate(date.getDate())).toISOString()
                            },
                            tenant_id: _session.tenant_id,
                            'stakeholders.stakeholderEmail': _session.email
                        }, {
                            leadequipments: 1,
                            financialpartner: 1,
                            leadamount: 1,
                            _id: 1,
                            financerequired: 1,
                            financesummary: 1,
                            company: 1,
                            contact: 1,
                            contactnumber: 1,
                            leadsummary: 1,
                            leadstages: 1,
                            leadstage: 1,
                            AssignedEmail: 1,
                            Assigned: 1,
                            tenant_id: 1,
                            stakeholders: 1,

                        })

                    }
                    break;
                case "isfinanceleads":
                    if (_session.role === 'admin') {
                        query = fbpartnerleads.find({
                            tenant_id: _session.tenant_id,
                            financerequired: 'Yes'
                        }, {
                            leadequipments: 1,
                            financialpartner: 1,
                            leadamount: 1,
                            _id: 1,
                            c: 1,
                            financesummary: 1,
                            company: 1,
                            contact: 1,
                            contactnumber: 1,
                            leadsummary: 1,
                            leadstages: 1,
                            leadstage: 1,
                            AssignedEmail: 1,
                            Assigned: 1,
                            tenant_id: 1,
                            stakeholders: 1,
                        })

                    } else {
                        query = fbpartnerleads.find({
                            tenant_id: _session.tenant_id,

                            'stakeholders.stakeholderEmail': _session.email,
                            financerequired: 'Yes'
                        }, {
                            leadequipments: 1,
                            financialpartner: 1,
                            leadamount: 1,
                            _id: 1,
                            financerequired: 1,
                            financesummary: 1,
                            company: 1,
                            contact: 1,
                            contactnumber: 1,
                            leadsummary: 1,
                            leadstages: 1,
                            leadstage: 1,
                            AssignedEmail: 1,
                            Assigned: 1,
                            tenant_id: 1,
                            stakeholders: 1,

                        })

                    }
                    break;
            }
            query.exec(
                function (err, docs) {
                    if (!err) {
                        res.send(docs);
                    } else {
                        //console.log('err:'+err)
                        res.sendStatus(500);
                    }
                });
        } else {
            res.sendStatus(403);
        }
    });
});
router.get("/fbpartners/getmyteamleads", function (req, res) {

    new drvalidate(req, res, function (err, _session) {
        if (!err) {

            fbpartnerleads.find({
                tenant_id: _session.tenant_id,
                sourceid: undefined,
                teamId: _session.teamid
            }, {
                leadequipments: 1,
                financialpartner: 1,
                leadamount: 1,
                financerequired: 1,
                financesummary: 1,
                company: 1,
                contact: 1,
                contactnumber: 1,
                leadsummary: 1,
                Assigned: 1,
                leadstages: 1,
                leadstage: 1,
                sourceid: 1,
                teamId: 1
            }).exec(
                function (err, docs) {
                    if (!err) {
                        //var reviewer=[];





                        res.send(docs);
                    } else {

                        res.sendStatus(500);
                    }
                });
        } else {
            res.sendStatus(403);
        }
    });

});
router.get("/fbpartners/getpartners", function (req, res) {

    new drvalidate(req, res, function (err, _session) {
        if (!err) {
            fbpartners.find({}, {
                bankname: 1,
                partnerdesc: 1,
                logopath: 1,
                financiername: 1,
                financierid: 1,
                _id: 1
            }).exec(
                function (err, docs) {
                    if (!err) {


                        res.send(docs);
                    } else {

                        res.sendStatus(500);
                    }
                });
        } else {
            res.sendStatus(403);
        }
    });

});

router.post("/fbpartners/deletestakeholder", function (req, res) {
    drvalidate(req, res, function (err, _session) {

        if (!err) {
            var _cstakeholder = req.body.stakeholder;
            var _record = {};
            _record['stakeholders.$.id'] = _cstakeholder.sid;



            fbpartnerleads.findOneAndUpdate({
                '_id': _cstakeholder.id,

                'stakeholders.id': _cstakeholder.sid
            }, {
                $pull: {
                    stakeholders: {
                        id: _record['stakeholders.$.id']
                    }
                }
            }, {
                new: true
            },
                function (err, doc) {
                    if (!err) {
                        var obj = {};
                        obj.Result = "OK"

                        res.json(obj)
                    } else {
                        res.sendStatus(500)
                    }
                });
        } else {
            res.sendStatus(403);
        }

    });

});
//    router.get("/fbpartners/getmyleads",function(req, res){

//     new drvalidate(req,res,function(err,_session)
//            {
//                if(!err)
//                {  
//                    if(_session.role == 'manager'){
//                     var nlength = 0
//                     var reviewers=[];
//                     fbpartners.findOne({_id:_session.tenant_id,bankname:_session.bank},{users:1}).exec(
//                         function(err,docs)
//                         {
//                            if(!err){

//                               var reviewer=[];

//                               docs.users.forEach(function(ele)
//                                   {
//                                    if(_session.email == ele.email||ele.managerEmail)
//                                         reviewer.push({'id':ele.id  })

//                                   }
//                               )
//                               //console.log(reviewer);

//                               reviewer.forEach(function(eles){
//                                 nlength++;
//                                 fbpartners.findOne({_id:_session.tenant_id,bankname:_session.bank,'leads.AssignedId':eles.id},{'leads':1}).exec(
//                                     function(err,docs)
//                                     {
//                                        if(!err){


//                                         //console.log(docs);
//                                           docs.leads.forEach(function(ele)
//                                               {

//                                                if(eles.id == ele.AssignedId){

//                                                 reviewers.push({'leadequipments':ele.leadequipments,'financialpartner':ele.financialpartner,'leadamount':ele.leadamount,'id':ele.id,'financerequired':ele.financerequired,'financesummary':ele.financesummary,'company':ele.company,'contact':ele.contact,'contactnumber':ele.contactnumber,'leadsummary':ele.leadsummary,'leadstage':ele.leadstage,'Assigned':ele.Assigned,'AssignedEmail':ele.AssignedEmail })
//                                                }


//                                               }
//                                           )

//                                           console.log(nlength);
//                                           if(nlength == reviewer.length) {
//                                             console.log(reviewers);
//                                            res.send(reviewers);
//                                           }

//                                        }
//                                        else{
//                                            console.log('err:'+err)
//                                            res.sendStatus(500);
//                                        }


//                                     });

//                                 //res.send(reviewer);
//                               });

//                             //   console.log(nlength);
//                             //               if(nlength == reviewer.length) {
//                             //                 console.log(reviewers);
//                             //                res.send(reviewers);
//                             //               }

//                             }
//                             else{

//                                 res.sendStatus(500);
//                             }

//                         });


//                    }
//                    else{
//                  fbpartners.findOne({_id:_session.tenant_id,bankname:_session.bank,'leads.AssignedEmail':_session.email},{'leads':1}).exec(
//                             function(err,docs)
//                             {
//                                if(!err){
//                                   var reviewer=[];
//                                  //console.log(docs);
//                                   docs.leads.forEach(function(ele)
//                                       {
//                                        if(ele.AssignedEmail == _session.email ){


//                                             reviewer.push({'leadequipments':ele.leadequipments,'financialpartner':ele.financialpartner,'leadamount':ele.leadamount,'id':ele.id,'financerequired':ele.financerequired,'financesummary':ele.financesummary,'company':ele.company,'contact':ele.contact,'contactnumber':ele.contactnumber,'leadsummary':ele.leadsummary,'leadstage':ele.leadstage,'Assigned':ele.Assigned,'AssignedEmail':ele.AssignedEmail })
//                                        }
//                                       }
//                                   )


//                                    res.send(reviewer);
//                                }
//                                else{
//                                    console.log('err:'+err)
//                                    res.sendStatus(500);
//                                }
//                             });
//                         }
//                }

//                else{
//                    res.sendStatus(403);
//                }  

//            }); 

//    });

//-------------------------lead score start-------------
router.post("/fbpartners/createleadscore", (req, res) => {
    new drvalidate(req, res, function (err, _session) {
        //console.log(_session.tenant_id)
        if (!err) {

            var _records = [];
            var arrayscore = [];
            var arrycolor = [];
            var leadscorid = []
            var scorevalue = req.body.leadscore['scorevalue']
            arrayscore = scorevalue.split(",")
            var colorcode = req.body.leadscore['colorcode']
            arrycolor = colorcode.split(',')
            var leadsid = req.body.leadscore['id']
            //console.log(leadsid)
            leadscorid = leadsid.split(',')
            var descp = req.body.leadscore['description']
            descp = descp.split(',')

            for (var i = 0; i < arrayscore.length; i++) {
                var _record = {};
                // console.log(leadscorid[i])
                if (leadscorid[i]) {
                    var _id = leadscorid[i]
                } else {
                    var _id = guidGenerator();
                }

                _record['id'] = _id;
                _record['leadscore'] = arrayscore[i];
                _record['colorcode'] = arrycolor[i];
                _record['description'] = descp[i]

                _records.push(_record)
            }
            fbpartners.update({
                '_id': _session.tenant_id,
            }, {
                "$set": {
                    'leadscore': _records
                }
            }).exec(function (err) {

                if (!err) {
                    var result = {};
                    result.Result = "OK";
                    result.Record = _records;
                    res.json(result);
                } else {
                    res.sendStatus(500)
                }
            })
        }

    })

})
router.post("/fbpartners/leadscore", function (req, res) {
    new drvalidate(req, res, function (err, _session) {

        if (!err) {
            //console.log(req.body.leadscore['scorevalue'])
            var _records = [];
            var arrayscore = [];
            var arrycolor = []
            var scorevalue = req.body.leadscore['scorevalue']
            arrayscore = scorevalue.split(",")
            var colorcode = req.body.leadscore['colorcode']
            arrycolor = colorcode.split(',')

            for (var i = 0; i < arrayscore.length; i++) {
                var _record = {};

                var _id = guidGenerator();
                _record['id'] = _id;
                _record['leadscore'] = arrayscore[i];
                _record['colorcode'] = arrycolor[i];

                _records.push(_record)
            }
            fbpartners.update({
                '_id': _session.tenant_id,
            }, {
                "$push": {
                    'leadscore': _records
                }
            }, function (err) {

                if (!err) {
                    var result = {};
                    result.Result = "OK";
                    result.Record = _records;
                    res.json(result);
                } else {
                    res.sendStatus(500)
                }
            })
        }

    })

})
router.get("/fbpartners/getleadscore", function (req, res) {

    new drvalidate(req, res, function (err, _session) {
        if (!err) {
            fbpartners.findOne({
                _id: _session.tenant_id,
                bankname: _session.bank
            }, {
                leadscore: 1
            }).exec(
                function (err, docs) {
                    if (!err) {

                        res.send(docs);
                    } else {
                        ////console.log('err:'+err)
                        res.sendStatus(500);
                    }
                });
        } else {
            res.sendStatus(403);
        }
    });

});
router.get("/fbpartners/getleadscorevalues", function (req, res) {

    new drvalidate(req, res, function (err, _session) {
        if (!err) {
            fbpartners.findOne({
                _id: _session.tenant_id,
                bankname: _session.bank
            }, {
                leadscore: 1
            }).exec(
                function (err, docs) {
                    if (!err) {

                        res.send(docs.leadscore);
                    } else {
                        ////console.log('err:'+err)
                        res.sendStatus(500);
                    }
                });
        } else {
            res.sendStatus(403);
        }
    });

});
router.get("/fbpartners/getleadscorebyid/:id", function (req, res) {

    new drvalidate(req, res, function (err, _session) {
        if (!err) {
            fbpartners.find({
                _id: _session.tenant_id,
                bankname: _session.bank,
                "leadscore.id": req.params.id
            }, {
                "leadscore.$": 1,
                _id: 0
            }).exec(
                function (err, docs) {
                    if (!err) {

                        res.send(docs);
                    } else {
                        ////console.log('err:'+err)
                        res.sendStatus(500);
                    }
                });
        } else {
            res.sendStatus(403);
        }
    });

});

router.post("/fbpartners/updateleadscore/:id", function (req, res) {

    drvalidate(req, res, function (err, _session) {

        if (!err) {
            var _leadsc = req.body.leadscore;

            var _record = {};
            var leadid = req.params.id
            _record['leadscore.$.leadscore'] = _leadsc.scorevalue;
            _record['leadscore.$.colorcode'] = _leadsc.colorcode;

            fbpartners.update({
                '_id': _session.tenant_id,
                bankname: _session.bank,
                'leadscore.id': leadid
            }, {
                "$set": _record
            }, function (err) {

                if (!err) {
                    var result = {};
                    result.Result = "OK";
                    result.Record = _record;
                    res.json(result);
                } else {

                    res.sendStatus(500)
                }
            })
        } else {
            res.sendStatus(403);
        }

    });

});
//------------------------lead score end -------------

//-------------------------partners team start----------------------------
// function createstakeholders(_cteam,_session,fn) {
//     //console.log(_cteam);
//     var stakeholders=[];
//     if(_cteam.salescoordinatorId !== ''||_cteam.salescoordinatorId !== undefined){

//         _cteam.salescoordinatorId.split(',').forEach(function(el){
//             fbusers.findOne({ tenant_id: _session.tenant_id, bankname: _session.bank, 'id': el }, { 'name': 1,'id':1,'role':1,'email':1,'phone':1,'logopath':1,'team':1,'teamId':1 }).exec(
//                 function (err, docs) {

//                     if (!err) { 
//                         stakeholders.push({id:guidGenerator(),stakeholderId:docs.id,stakeholdername:docs.name,stakeholderEmail:docs.email,stakeholderrole:docs.role,phone:docs.phone,logopath:docs.logopath,team:_cteam.teamname,teamId:_cteam.id})

//                     }else{
//                         fn(err,stakeholders)

//                     }
//                 });


//         }) 
//     } 



//     fbusers.findOne({ tenant_id: _session.tenant_id, bankname: _session.bank, 'id': _cteam.managerId }, {  'name': 1,'id':1,'role':1,'email':1,'phone':1,'logopath':1,'team':1,'teamId':1,'managerEmail':1,'managerId':1,'manager':1 }).exec(
//         function (err, docs) {

//             if (!err) {

//                // var reviewer = [];

//                if(docs.managerId == undefined||docs.managerId === ''){
//                 stakeholders.push({id:guidGenerator(),stakeholderId:_cteam.managerId,stakeholdername:_cteam.manager,stakeholderEmail:_cteam.managerEmail,stakeholderrole:docs.role,logopath:docs.logopath,phone:docs.phone,team:_cteam.teamname,teamId:_cteam.id})
//                 fn(err,stakeholders)

//                }
//                else{

//                 stakeholders.push({id:guidGenerator(),stakeholderId:docs.id,stakeholdername:docs.name,stakeholderEmail:docs.email,stakeholderrole:docs.role,phone:docs.phone,logopath:docs.logopath,team:_cteam.teamname,teamId:_cteam.id})
//                 fbusers.findOne({ tenant_id: _session.tenant_id, bankname: _session.bank, 'id': docs.managerId }, { 'name': 1,'id':1,'role':1,'email':1,'phone':1,'logopath':1,'team':1,'teamId':1,'managerEmail':1,'managerId':1,'manager':1 }).exec(
//                     function (err, docs) {
//                         if (!err) {

//                             if(docs.managerId == undefined||docs.managerId === ''){
//                                 if(docs.role !== 'admin'){
//                                 stakeholders.push({id:guidGenerator(),stakeholderId:docs.id,stakeholdername:docs.name,stakeholderEmail:docs.email,stakeholderrole:docs.role,phone:docs.phone,logopath:docs.logopath,team:_cteam.teamname,teamId:_cteam.id})
//                                 }else{

//                                 fn(err,stakeholders)
//                                 }

//                                }
//                                else{

//                                    if(docs.role !== 'admin'){
//                                     stakeholders.push({id:guidGenerator(),stakeholderId:docs.id,stakeholdername:docs.name,stakeholderEmail:docs.email,stakeholderrole:docs.role,phone:docs.phone,logopath:docs.logopath,team:_cteam.teamname,teamId:_cteam.id})
//                                    }
//                                    else{
//                                        fn(err,stakeholders)
//                                    }


//                                 fbusers.findOne({ tenant_id: _session.tenant_id, bankname: _session.bank, 'id':  docs.managerId }, {  'name': 1,'id':1,'role':1,'email':1,'phone':1,'logopath':1,'team':1,'teamId':1,'managerEmail':1,'managerId':1,'manager':1  }).exec(
//                                     function (err, docs) {
//                                         if (!err) {


//                                             if(docs.managerId == undefined||docs.managerId === ''){
//                                                 if(docs.role !== 'admin'){
//                                                     stakeholders.push({id:guidGenerator(),stakeholderId:docs.id,stakeholdername:docs.name,stakeholderEmail:docs.email,stakeholderrole:docs.role,phone:docs.phone,logopath:docs.logopath,team:_cteam.teamname,teamId:_cteam.id})
//                                                 fn(err,stakeholders)
//                                                 }else{

//                                                     fn(err,stakeholders)
//                                                 }

//                                                }
//                                                else{


//                                                 if(docs.role !== 'admin'){
//                                                     stakeholders.push({id:guidGenerator(),stakeholderId:docs.id,stakeholdername:docs.name,stakeholderEmail:docs.email,stakeholderrole:docs.role,phone:docs.phone,logopath:docs.logopath,team:_cteam.teamname,teamId:_cteam.id})
//                                                 }else{
//                                                     fn(err,stakeholders)
//                                                 }

//                                                 fbusers.findOne({ tenant_id: _session.tenant_id, bankname: _session.bank, 'id':  docs.managerId }, {  'name': 1,'id':1,'role':1,'email':1,'phone':1,'logopath':1,'team':1,'teamId':1,'managerEmail':1,'managerId':1,'manager':1  }).exec(
//                                                 function (err, docs) {
//                                                     if (!err) {

//                                                         if(docs.managerId == undefined&&docs.managerId === ''){
//                                                             if(docs.role !== 'admin'){
//                                                                 stakeholders.push({id:guidGenerator(),stakeholderId:docs.id,stakeholdername:docs.name,stakeholderEmail:docs.email,stakeholderrole:docs.role,phone:docs.phone,logopath:docs.logopath,team:_cteam.teamname,teamId:_cteam.id})
//                                                             fn(err,stakeholders)
//                                                             }else{
//                                                                 fn(err,stakeholders)
//                                                             }

//                                                            }
//                                                            else{


//                                                             if(docs.role !== 'admin'){
//                                                                 stakeholders.push({id:guidGenerator(),stakeholderId:docs.id,stakeholdername:docs.name,stakeholderEmail:docs.email,stakeholderrole:docs.role,phone:docs.phone,logopath:docs.logopath,team:_cteam.teamname,teamId:_cteam.id})
//                                                             fn(err,stakeholders);
//                                                             }
//                                                             else{
//                                                                 fn(err,stakeholders)
//                                                             }





//                                                            }

//                                                     }
//                                                     else{
//                                                         fn(err,null)

//                                                     }
//                                                 })


//                                                }


//                                         }
//                                         else{
//                                             fn(err,null)
//                                         }
//                                     })



//                                }
//                                //fn(stakeholders)

//                         }
//                         else{

//                             fn(err,null)
//                         }
//                     })

//                }



//                 //fn(stakeholders);
//             }
//             else {

//                 fn(err,null)
//             }
//         });

// }

function createstakeholders(_cteam, _session, fn) {
    //console.log(_cteam);
    var stakeholders = [];
    var users = [];
    if (_cteam.salescoordinatorId !== '' || _cteam.salescoordinatorId !== undefined) {

        _cteam.salescoordinatorId.split(',').forEach(function (el) {

            users.push(el)
        })
        fbusers.find({ tenant_id: _session.tenant_id, bankname: _session.bank, 'id': { $in: users } }, { 'name': 1, 'id': 1, 'role': 1, 'email': 1, 'phone': 1, 'logopath': 1, 'team': 1, 'teamId': 1 }).exec(
            function (err, docs) {

                if (!err) {
                    docs.forEach(function (el) {


                        stakeholders.push({ id: guidGenerator(), stakeholderId: el.id, stakeholdername: el.name, stakeholderEmail: el.email, stakeholderrole: el.role, phone: el.phone, logopath: el.logopath })
                    })
                } else {
                    fn(err, stakeholders)

                }
            });


    }

    getcurrentmanagerbyid(_cteam.managerId, _session, stakeholders, function (err, doc) {
        if (!err) {
            fn(err, stakeholders)
        } else {
            fn(err, null)
        }
    })



}


router.post("/fbpartners/createfinanceteam", function (req, res) {
    drvalidate(req, res, function (err, _session) {

        if (!err) {

            var _bname = _session.bank;
            var _cteam = req.body.team;

            createstakeholders(_cteam, _session, function (err, stakeholders) {

                if (!err) {
                    var _fbteams = new fbteams({
                        id: guidGenerator(),
                        tenant_id: _session.tenant_id,
                        bankname: _session.bank,
                        teamname: _cteam.teamname,
                        issales: _cteam.issales,
                        description: _cteam.description,
                        logopath: _cteam.logopath,
                        manager: _cteam.manager,
                        managerId: _cteam.managerId,
                        managerEmail: _cteam.managerEmail,
                        salescoordinator: _cteam.salescoordinator,
                        salescoordinatorId: _cteam.salescoordinatorId,
                        //    telecaller: _cteam.telecaller,
                        //    telecallerId: _cteam.telecallerId,
                        teamstakeholders: stakeholders,
                        createddate: new Date(),
                        lstupdateddate: new Date()
                    })

                    _fbteams.save(function (err) {

                        if (!err) {

                            res.sendStatus(200)

                        } else {

                            res.sendStatus(500);
                        }
                    });
                } else {
                    res.sendStatus(500)
                }



            });


        } else {
            res.sendStatus(403);
        }

    });
});

function getteammanagerdetails(_cteam, _session, fn) {


    fbpartners.find({
        _id: _session.tenant_id,
        bankname: _session.bank,
        'users.id': _cteam.managerId
    }, {
        'users.$': 1
    }).exec(
        function (err, docs) {
            if (!err) {
                var reviewer = [];

                var teamname = docs[0].users[0].team
                var teamid = docs[0].users[0].teamId
                // docs[0].users.forEach(function (ele) {



                //     reviewer.push({'team': ele.team,'teamId': ele.teamId })


                // }
                // )
                updateteamdata(_cteam, _session, teamname, teamid, function () {
                    if (err) {
                        fn(err)
                    } else {
                        fn(null)

                    }

                });

                //  res.send(reviewer);

            } else {

                fn(err)
            }
        });

}

function updateteamdata(_cteam, _session, teamname, teamid, fn) {



    var _record = {};
    if (!teamname) {

        _record['users.$.team'] = teamname;
        _record['users.$.teamId'] = teamid;
    } else {
        var team = teamname + '|' + _cteam.teamname
        var teamid = teamid + '|' + _cteam.id
        _record['users.$.team'] = team;
        _record['users.$.teamId'] = teamid;
    }




    fbpartners.update({
        '_id': _session.tenant_id,
        bankname: _session.bank,
        'users.id': _cteam.managerId
    }, {
        "$set": _record
    }, function (err) {

        if (!err) {
            // var result = {};
            // result.Result = "OK";
            // result.Record = _record;
            // res.json(result);
            fn(null)
        } else {

            // res.sendStatus(500)
            fn(err)
        }
    })



}

function updateremovedteammanager(_cteam, _session, managerid, newteam, newteamid, fn) {
    var _record = {};
    _record['users.$.team'] = newteam;
    _record['users.$.teamId'] = newteamid;


    fbpartners.update({
        '_id': _session.tenant_id,
        bankname: _session.bank,
        'users.id': managerid
    }, {
        "$set": _record
    }, function (err) {

        if (!err) {
            fn(null)
        } else {

            fn(err)
        }
    })

}



function getoldteammanager(_cteam, _session, fn) {
    fbpartners.find({
        _id: _session.tenant_id,
        bankname: _session.bank,
        'financeteams.id': _cteam.id
    }, {
        'financeteams.$': 1
    }).exec(
        function (err, docs) {
            if (!err) {
                var reviewer = [];
                var managerid = docs[0].financeteams[0].managerId


                getmanagerteamdetails(_cteam, _session, managerid, function () {
                    if (err) {
                        fn(err)
                    } else {
                        fn(null)

                    }

                });
                // docs[0].financeteams.forEach(function (ele) {
                //     // console.log(ele)

                //     reviewer.push({ 'teamname': ele.teamname, 'id': ele.id, 'description': ele.description, 'logopath': ele.logopath, 'manager': ele.manager, 'managerEmail': ele.managerEmail, 'managerId': ele.managerId })


                // }
                // )
                // res.send(reviewer);


            } else {
                fn(err)
            }
        });


}

// router.post("/fbpartners/updatefinanceteam", function (req, res) {

//     drvalidate(req, res, function (err, _session) {

//         if (!err) {
//             var _cteam = req.body.team;
//             var _record = {};

//             if(_cteam.currentmngr ===  _cteam.managerId)

//             {



//                 _record['financeteams.$.teamname'] = _cteam.teamname;
//                 _record['financeteams.$.description'] = _cteam.description;
//                 _record['financeteams.$.logopath'] = _cteam.logopath;
//                 _record['financeteams.$.manager'] = _cteam.manager;
//                 _record['financeteams.$.managerId'] = _cteam.managerId;
//                 _record['financeteams.$.managerEmail'] = _cteam.managerEmail;


//                 _record['financeteams.$.lstupdateddate'] = new Date();

//                 fbpartners.update({
//                     '_id': _session.tenant_id,
//                     bankname: _session.bank,
//                     'financeteams.id': _cteam.id
//                 }, {
//                     "$set": _record
//                 }, function (err) {

//                     if (!err) {



//                                 var result = {};
//                                 result.Result = "OK";
//                                 result.Record = _record;
//                                 res.json(result);


//                     } else {

//                         res.sendStatus(500)
//                     }
//                 })

//             }
//             else{




//                 _record['financeteams.$.teamname'] = _cteam.teamname;
//                 _record['financeteams.$.description'] = _cteam.description;
//                 _record['financeteams.$.logopath'] = _cteam.logopath;
//                 _record['financeteams.$.manager'] = _cteam.manager;
//                 _record['financeteams.$.managerId'] = _cteam.managerId;
//                 _record['financeteams.$.managerEmail'] = _cteam.managerEmail;


//                 _record['financeteams.$.lstupdateddate'] = new Date();
//                 removemanager(_cteam, _session, function () {
//                     if (err) {
//                         res.sendStatus(500);

//                     } else {
//                         fbpartners.update({
//                             '_id': _session.tenant_id,
//                             bankname: _session.bank,
//                             'financeteams.id': _cteam.id
//                         }, {
//                             "$set": _record
//                         }, function (err) {

//                             if (!err) {

//                                // getteammanagerdetails(_cteam, _session, function (err) {
//                                    /// if (err) {
//                                        // res.sendStatus(500)

//                                    // } else {
//                                         var result = {};
//                                         result.Result = "OK";
//                                         result.Record = _record;
//                                         res.json(result);
//                                    // }
//                                // })
//                             } else {

//                                 res.sendStatus(500)
//                             }
//                         })
//                     }
//                 })

//             }



//         } else {
//             res.sendStatus(403);
//         }

//     });

// });

function removemanager(_cteam, _session, fn) {





    fbpartners.find({
        _id: _session.tenant_id,
        bankname: _session.bank,
        'teamstakeholders.stakeholderId': _cteam.currentmngr,
        'teamstakeholders.teamId': _cteam.id
    }, {
        'teamstakeholders.$': 1
    }).exec(
        function (err, docs) {
            if (!err) {
                if (docs == '') {
                    fn(null)
                } else {


                    var reviewer = [];

                    var _record = {}
                    _record['teamstakeholders.$.id'] = docs[0].teamstakeholders[0].id;
                    fbpartners.findOneAndUpdate({
                        '_id': _session.tenant_id,
                        bankname: _session.bank,
                        'teamstakeholders.id': docs[0].teamstakeholders[0].id
                    }, {
                        $pull: {
                            teamstakeholders: {
                                id: _record['teamstakeholders.$.id']
                            }
                        }
                    }, {
                        new: true
                    },
                        function (err, doc) {
                            if (!err) {
                                var obj = {};
                                obj.Result = "OK"

                                // res.json(obj)update

                                updatenewmanager(_cteam, _session, function () {
                                    if (err) {
                                        fn(err)

                                    } else {
                                        fn(null)

                                    }
                                })

                            } else {
                                // res.sendStatus(500)
                                fn(err)
                            }
                        });

                }

                // fn(null)
                // res.send(reviewer);
            } else {
                // console.log('err:' + err)
                // res.sendStatus(500);
                fn(err);
            }
        });

}
function updatenewmanager(_cteam, _session, fn) {
    var stakeholders = {}

    fbpartners.find({ _id: _session.tenant_id, bankname: _session.bank, 'users.id': _cteam.managerId }, { 'users.$': 1 }).exec(
        function (err, docs) {

            if (!err) {
                stakeholders['id'] = guidGenerator();
                stakeholders['stakeholderId'] = docs[0].users[0].id;
                stakeholders['stakeholdername'] = docs[0].users[0].uname;
                stakeholders['stakeholderEmail'] = docs[0].users[0].email;
                stakeholders['stakeholderrole'] = docs[0].users[0].role;
                stakeholders['logopath'] = docs[0].users[0].logopath;
                stakeholders['team'] = _cteam.teamname
                stakeholders['teamId'] = _cteam.id;

                fbpartners.update({
                    '_id': _session.tenant_id,
                    bankname: _session.bank
                }, {
                    "$push": {
                        'teamstakeholders': stakeholders
                    }
                }, function (err) {

                    if (!err) {
                        // var result = {};
                        // result.Result = "OK";
                        // result.Record = _record;
                        // res.json(result);
                        fn(null)
                    } else {
                        //res.sendStatus(500)
                        fn(err)
                    }
                })



            }
            else {

            }
        })



}
router.post("/fbpartners/updatefinanceteam", function (req, res) {

    drvalidate(req, res, function (err, _session) {

        if (!err) {
            var _cteam = req.body.team;
            var _record = {};

            if (_cteam.currentmngr === _cteam.managerId) {

                _record['teamname'] = _cteam.teamname;
                _record['description'] = _cteam.description;
                _record['logopath'] = _cteam.logopath;
                _record['issales'] = _cteam.issales
                _record['manager'] = _cteam.manager;
                _record['managerId'] = _cteam.managerId;
                _record['managerEmail'] = _cteam.managerEmail;
                _record['salescoordinator'] = _cteam.salescoordinator;
                _record['salescoordinatorId'] = _cteam.salescoordinatorId;
                // _record['telecaller'] = _cteam.telecaller;
                // _record['telecallerId'] = _cteam.telecallerId; 
                _record['lstupdateddate'] = new Date();
                fbteams.update({
                    'id': _cteam.id,
                    tenant_id: _session.tenant_id

                }, {
                    "$set": _record
                }, function (err) {

                    if (!err) {
                        res.sendStatus(200)

                    } else {

                        res.sendStatus(500)
                    }
                })

            }
            else {



                createstakeholders(_cteam, _session, function (err, stakeholders) {
                    if (!err) {
                        _record['teamname'] = _cteam.teamname;
                        _record['description'] = _cteam.description;
                        _record['logopath'] = _cteam.logopath;
                        _record['issales'] = _cteam.issales
                        _record['manager'] = _cteam.manager;
                        _record['managerId'] = _cteam.managerId;
                        _record['managerEmail'] = _cteam.managerEmail;
                        _record['salescoordinator'] = _cteam.salescoordinator;
                        _record['salescoordinatorId'] = _cteam.salescoordinatorId;
                        // _record['telecaller'] = _cteam.telecaller;
                        // _record['telecallerId'] = _cteam.telecallerId; 
                        _record['teamstakeholders'] = stakeholders

                        _record['lstupdateddate'] = new Date();


                        fbteams.update({
                            tenant_id: _session.tenant_id,
                            'id': _cteam.id,
                        }, {
                            "$set": _record
                        }, function (err) {

                            if (!err) {

                                res.sendStatus(200)
                            } else {

                                res.sendStatus(500)
                            }
                        })
                    }
                    else {
                        res.sendStatus(500)
                    }
                })

            }
        } else {
            res.sendStatus(403);
        }

    });
});
router.post("/fbpartners/deletefinanceteam", function (req, res) {
    drvalidate(req, res, function (err, _session) {

        if (!err) {
            var _cteam = req.body.team;
            fbteams.findOneAndDelete({ 'tenant_id': _session.tenant_id, 'id': _cteam.id },
                function (err, doc) {

                    if (!err) {

                        res.sendStatus(200);
                    } else { res.sendStatus(500) }
                });
        } else {
            res.sendStatus(403);
        }

    });

});


router.get("/fbpartners/financeteamdetails", function (req, res) {
    var id = req.query.keyid;

    new drvalidate(req, res, function (err, _session) {
        if (!err) {
            fbteams.find({
                tenant_id: _session.tenant_id,
                id: id
            }).exec(
                function (err, docs) {
                    if (!err) {

                        res.send(docs);
                    } else {
                        //console.log('err:' + err)
                        res.sendStatus(500);
                    }
                });
        } else {
            res.sendStatus(403);
        }
    });

});

router.get("/fbpartners/getdealermanagers", function (req, res) {

    var role = req.query.role

    new drvalidate(req, res, function (err, _session) {
        if (!err) {

            switch (role) {
                case 'SE':
                    var query = fbusers.find({ "role": { $in: ['SPM', 'SA'] }, tenant_id: _session.tenant_id, bankname: _session.bank }, { id: 1, email: 1, city: 1, name: 1, role: 1, salary: 1, logopath: 1, phone: 1 })


                    break;

                case 'NSM':
                    var query = fbusers.find({ "role": { $in: ['BH', 'admin'] }, tenant_id: _session.tenant_id, bankname: _session.bank }, { id: 1, email: 1, city: 1, name: 1, role: 1, salary: 1, logopath: 1, phone: 1 })

                    break;
                case 'TM':
                    var query = fbusers.find({ "role": { $nin: ['SM', 'SE', 'SC', 'admin'] }, tenant_id: _session.tenant_id, bankname: _session.bank }, { id: 1, email: 1, city: 1, name: 1, role: 1, salary: 1, logopath: 1, phone: 1 })

                    break;

                default:

                    var query = fbusers.find({ "role": role, tenant_id: _session.tenant_id, bankname: _session.bank }, { id: 1, email: 1, city: 1, name: 1, role: 1, salary: 1, logopath: 1, phone: 1 })

                    break;

                // }
            }


            query.exec(
                function (err, docs) {
                    if (!err) {
                        var reviewer = [];
                        if (Array.isArray(docs) && docs.length) {
                            // docs[0].users.forEach(function (ele) {
                            //     //if (ele.role == role) {
                            //         reviewer.push({
                            //             'name': ele.uname,
                            //             'id': ele.id,
                            //             'role': ele.role,
                            //             'email': ele.email
                            //         })

                            //    // }

                            // })

                            res.send(docs);
                        } else {
                            res.send("No Managers Available");
                        }
                    } else {

                        res.sendStatus(500);
                    }
                });
        } else {
            res.sendStatus(403);
        }
    });

});





router.get("/fbpartners/getfinanceteams", function (req, res) {

    new drvalidate(req, res, function (err, _session) {
        if (!err) {
            fbteams.find({
                tenant_id: _session.tenant_id,

            }, { teamname: 1, id: 1, description: 1, logopath: 1, managerEmail: 1 }).exec(
                function (err, docs) {
                    if (!err) {
                        var reviewer = [];


                        res.send(docs);
                    } else {
                        ////console.log('err:'+err)
                        res.sendStatus(500);
                    }
                });
        } else {
            res.sendStatus(403);
        }
    });

});
//--------------------------partners team end-------------------------------
router.post('/fbpartners/uploadtemp', function (req, res) {

    var docname = req.query.docname;
    var page = req.query.page;


    new drvalidate(req, res, function (err, _session) {
        if (!err) {
            var form = new formidable.IncomingForm();
            form.parse(req, function (err, fields, files) {
                res.writeHead(200, {
                    'content-type': 'text/plain'
                });
            });

            form.on('end', function (fields, files) {

                var temp_path = this.openedFiles[0].path;





                /* The file name of the uploaded file */
                //var file_name = uuid.v1()+this.openedFiles[0].name;
                var extn = this.openedFiles[0].name.split('.').pop()

                /* The file name of the uploaded file */
                var file_name = uuid.v1() + docname + '.' + extn;
                // var file_name = uuid.v1()+docname;

                /* Location where we want to copy the uploaded file */

                var new_location = path.join('./fbpartners/', _session.bank, page);

                fse.copy(temp_path, new_location + '/' + file_name, function (err) {
                    if (err) {
                        res.sendStatus(500);

                    } else {
                        res.end(file_name);
                    }

                });
            });



        } else {
            res.sendStatus(403);
        }
    });

});
router.post('/fbpartners/uploadleadtemp', function (req, res) {

    var docname = req.query.docname;
    var page = req.query.page;
    var isvisible = req.query.isvisible;
    var dealername = req.query.dealername;
    var leadid = req.query.leadid;
    new drvalidate(req, res, function (err, _session) {
        if (!err) {
            var form = new formidable.IncomingForm();
            form.parse(req, function (err, fields, files) {
                res.writeHead(200, {
                    'content-type': 'text/plain'
                });
            });

            form.on('end', function (fields, files) {

                var temp_path = this.openedFiles[0].path;





                /* The file name of the uploaded file */
                //var file_name = uuid.v1()+this.openedFiles[0].name;
                var extn = this.openedFiles[0].name.split('.').pop()

                /* The file name of the uploaded file */
                var file_name = uuid.v1() + docname + '.' + extn;
                // var file_name = uuid.v1()+docname;

                /* Location where we want to copy the uploaded file */

                var new_location = path.join('./fbpartners/', _session.bank, page, leadid);

                if (isvisible === '1') {

                    var new_location2;
                    if (_session.bank === 'Finbot') {
                        getfinanceleadid(refid, 2, function (err, id) {
                            new_location2 = path.join('./fbpartners/', dealername, 'leads', id);

                        })

                    } else {
                        getfinanceleadid(refid, 1, function (err, id) {
                            new_location2 = path.join('./fbpartners/', 'Finbot', 'finleads', id);
                        });

                    }

                }

                fse.copy(temp_path, new_location + '/' + file_name, function (err) {
                    if (err) {
                        res.sendStatus(500);

                    } else {

                        if (isvisible === '1') {

                            fse.copy(temp_path, new_location2 + '/' + file_name, function (err) {
                                if (err) {
                                    res.sendStatus(500);

                                } else {
                                    // console.log(file_name);
                                    res.end(file_name);

                                }
                            })

                        } else {
                            //console.log(file_name);

                            res.end(file_name);
                        }
                    }

                });
            });




        } else {
            res.sendStatus(403);
        }
    });

});
router.post('/fbpartners/uploadfinleadtemp', function (req, res) {

    var docname = req.query.docname;
    var page = req.query.page;
    var isvisible = req.query.isvisible;
    var dealername = req.query.dealername;
    var leadid = req.query.leadid;
    var refid = req.query.refid;
    new drvalidate(req, res, function (err, _session) {
        if (!err) {
            var form = new formidable.IncomingForm();
            form.parse(req, function (err, fields, files) {
                res.writeHead(200, {
                    'content-type': 'text/plain'
                });
            });

            form.on('end', function (fields, files) {
                var temp_path = this.openedFiles[0].path;
                /* The file name of the uploaded file */
                //var file_name = uuid.v1()+this.openedFiles[0].name;
                var extn = this.openedFiles[0].name.split('.').pop()
                /* The file name of the uploaded file */
                var file_name = uuid.v1() + docname + '.' + extn;
                // var file_name = uuid.v1()+docname;
                /* Location where we want to copy the uploaded file */
                // getfinanceleadid(refid,1,function(err,id){
                //if(!err){
                var new_location = path.join('./fbpartners/', dealername, 'finleads', leadid.toString());

                fse.copy(temp_path, new_location + '/' + file_name, function (err) {
                    if (err) {
                        res.sendStatus(500);

                    } else {

                        // if(isvisible === '1'){

                        //     fse.copy(temp_path, new_location2 + '/' + file_name, function (err) {
                        //         if (err) {
                        //             res.sendStatus(500);

                        //         } else {
                        //            // console.log(file_name);
                        //             res.end(file_name);

                        //         }
                        //     })

                        // }else{
                        //console.log(file_name);

                        res.end(file_name);
                        // }
                    }

                });
                // }else{
                //     res.sendStatus(500)
                // }
                // });
            });



        } else {
            res.sendStatus(403);
        }
    });

});
router.post('/fbpartners/uploaddlrleadtemp', function (req, res) {

    var docname = req.query.docname;
    var page = req.query.page;
    var isvisible = req.query.isvisible;
    var dealername = req.query.dealername;
    var leadid = req.query.leadid;
    var refid = req.query.refid;
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        res.writeHead(200, {
            'content-type': 'text/plain'
        });
    });

    form.on('end', function (fields, files) {

        var temp_path = this.openedFiles[0].path;





        /* The file name of the uploaded file */
        //var file_name = uuid.v1()+this.openedFiles[0].name;
        var extn = this.openedFiles[0].name.split('.').pop()

        /* The file name of the uploaded file */

        var file_name = uuid.v1() + docname + '.' + extn;
        // var file_name = uuid.v1()+docname;

        /* Location where we want to copy the uploaded file */
        // getfinanceleadid(refid,2,function(err,id){


        // if(!err){
        var new_location = path.join('./fbpartners/', dealername, 'leads', leadid.toString())

        // var new_location = path.join('./fbpartners/', 'Finbot', 'finnleads',id);

        //     if(isvisible === '1'){
        //     if(_session.bank === 'Finbot'){
        //         var new_location2 = path.join('./fbpartners/', dealername, page);



        //     }else{
        //         var new_location2 = path.join('./fbpartners/', 'Finbot', page);

        //     }
        // }

        fse.copy(temp_path, new_location + '/' + file_name, function (err) {
            if (err) {
                res.sendStatus(500);

            } else {

                // if(isvisible === '1'){

                //     fse.copy(temp_path, new_location2 + '/' + file_name, function (err) {
                //         if (err) {
                //             res.sendStatus(500);

                //         } else {
                //            // console.log(file_name);
                //             res.end(file_name);

                //         }
                //     })

                // }else{
                //console.log(file_name);

                res.end(file_name);
                // }
            }

        });
        // }else{
        //     res.sendStatus(500)
        // }
        //});
    });


});
router.get("/fbpartners/viewodoc", function (req, res) {
    //var loanid =req.query.keyid
    var docname = req.query.docname;
    new drvalidate(req, res, function (err, _session) {
        if (!err) {
            //var file_name =docname+'.docx';
            /* Location where we want to copy the uploaded file */

            var new_location = path.join('./fbpartners/', _session.bank, docname);

            fs.exists(new_location, function (exists) {
                if (exists) {
                    // Content-type is very interesting part that guarantee that
                    // Web browser will handle response in an appropriate manner.
                    res.writeHead(200, {
                        "Content-Type": "application/octet-stream",
                        "Content-Disposition": "attachment; filename=" + docname
                        //"Content-Type": "application/pdf",
                        //"Content-Disposition": "inline; filename="+docname
                    });
                    fs.createReadStream(new_location).pipe(res);
                } else {
                    res.writeHead(400, {
                        "Content-Type": "text/plain"
                    });
                    res.end("ERROR File does not exist");
                }
            });
        } else {
            res.sendStatus(403);
        }
    });
});

router.get("/fbpartners/viewoExtdlrdoc", function (req, res) {
    //var loanid =req.query.keyid
    var docname = req.query.docname;
    var dealername = req.query.dealername
    new drvalidate(req, res, function (err, _session) {
        if (!err) {
            //var file_name =docname+'.docx';
            /* Location where we want to copy the uploaded file */

            var new_location = path.join('./fbpartners/', dealername, docname);

            fs.exists(new_location, function (exists) {
                if (exists) {
                    // Content-type is very interesting part that guarantee that
                    // Web browser will handle response in an appropriate manner.
                    res.writeHead(200, {
                        "Content-Type": "application/octet-stream",
                        "Content-Disposition": "attachment; filename=" + docname
                        //"Content-Type": "application/pdf",
                        //"Content-Disposition": "inline; filename="+docname
                    });
                    fs.createReadStream(new_location).pipe(res);
                } else {
                    res.writeHead(400, {
                        "Content-Type": "text/plain"
                    });
                    res.end("ERROR File does not exist");
                }
            });
        } else {
            res.sendStatus(403);
        }
    });
});

router.get("/fbpartners/viewopdfdoc", function (req, res) {
    //var loanid =req.query.keyid
    var docname = req.query.docname;
    new drvalidate(req, res, function (err, _session) {
        if (!err) {
            //var file_name =docname+'.docx';
            /* Location where we want to copy the uploaded file */

            var new_location = path.join('./fbpartners/', _session.bank, docname);
            // var mime = {
            //     js: 'application/javascript',
            //     html: 'text/html',
            //     css: 'text/css',
            //     csv: 'application/msword',
            //     xls: 'application/vnd.ms-excel',
            //     xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            //     doc: 'application/msword',
            //     docx: 'application/vnd.openxmlformats-officedocument.wordprocessing',
            //     ppt: 'application/vnd.ms-powerpoint',
            //     pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
            //     txt: 'text/plain',
            //     gif: 'image/gif',
            //     jpg: 'image/jpg',
            //     jpeg: 'image/jpeg',
            //     png: 'image/png',
            //     svg: 'image/svg+xml',
            //     pdf: 'application/pdf'
            // };

            fs.exists(new_location, function (exists) {
                if (exists) {
                    // Content-type is very interesting part that guarantee that
                    // Web browser will handle response in an appropriate manner.
                    var extns = docname.split('.').pop().toLowerCase();


                    // var type = mime[path.extname(new_location).slice(1)] || 'text/plain';
                    // console.log('type - ', type);
                    if (extns == "pdf") {
                        type = 'application/pdf'
                    } else {
                        type = 'image/' + extns
                    }

                    res.writeHead(200, {
                        // "Content-Type": "application/octet-stream",
                        // "Content-Disposition": "attachment; filename=" + docname
                        // "Content-Type": "application/pdf",
                        "Content-Type": type,
                        "Content-Disposition": "inline; filename=" + docname
                    });
                    fs.createReadStream(new_location).pipe(res);
                } else {
                    res.writeHead(400, {
                        "Content-Type": "text/plain"
                    });
                    res.end("ERROR File does not exist");
                }
            });
        } else {
            res.sendStatus(403);
        }
    });
});

router.get("/fbpartners/viewoExtpdfdoc", function (req, res) {
    //var loanid =req.query.keyid
    var docname = req.query.docname;
    var dealername = req.query.dealername;
    new drvalidate(req, res, function (err, _session) {
        if (!err) {
            //var file_name =docname+'.docx';
            /* Location where we want to copy the uploaded file */

            var new_location = path.join('./fbpartners/', dealername, docname);


            fs.exists(new_location, function (exists) {
                if (exists) {
                    // Content-type is very interesting part that guarantee that
                    // Web browser will handle response in an appropriate manner.
                    var extns = docname.split('.').pop().toLowerCase();


                    // var type = mime[path.extname(new_location).slice(1)] || 'text/plain';
                    // console.log('type - ', type);
                    if (extns == "pdf") {
                        type = 'application/pdf'
                    } else {
                        type = 'image/' + extns
                    }

                    res.writeHead(200, {

                        "Content-Type": type,
                        "Content-Disposition": "inline; filename=" + docname
                    });
                    fs.createReadStream(new_location).pipe(res);
                } else {
                    res.writeHead(400, {
                        "Content-Type": "text/plain"
                    });
                    res.end("ERROR File does not exist");
                }
            });
        } else {
            res.sendStatus(403);
        }
    });
});

router.get("/fbpartners/viewofinleaddoc", function (req, res) {
    //var loanid =req.query.keyid
    var docname = req.query.docname;
    new drvalidate(req, res, function (err, _session) {
        if (!err) {
            //var file_name =docname+'.docx';
            /* Location where we want to copy the uploaded file */
            var nlength = 0;
            var doc = docname.split("|")

            doc.forEach(function (e) {

                nlength++;
                var new_location = path.join('./fbpartners/', _session.bank, e);

                fs.exists(new_location, function (exists) {
                    if (exists) {

                        // Content-type is very interesting part that guarantee that
                        // Web browser will handle response in an appropriate manner.
                        if (nlength == doc.length) {

                            res.writeHead(200, {
                                "Content-Type": "application/octet-stream",
                                "Content-Disposition": "attachment; filename=" + e
                            });
                            fs.createReadStream(new_location).pipe(res);
                        }
                    } else {
                        res.writeHead(400, {
                            "Content-Type": "text/plain"
                        });
                        res.end("ERROR File does not exist");
                    }
                });
            })
        } else {
            res.sendStatus(403);
        }
    });
});


function getbankname(bankid, fn) {
    fbpartners.find({
        _id: bankid
    }, {
        bankname: 1
    }).exec(function (err, docs) {
        if (!err) {

            fn(null, docs[0].bankname)

        } else {

            fn(err, null);
        }
    });
}
function getfinanceleadid(refid, type, fn) {
    if (type == 1) {
        var query = fbleads.find({
            sourceid: refid
        }, {
            _id: 1
        })
    } else {
        var query = fbpartnerleads.find({
            refid: refid
        }, {
            _id: 1
        })

    }


    query.exec(function (err, docs) {
        if (!err) {

            fn(null, docs[0]._id)

        } else {

            fn(err, null);
        }
    });
}

router.get("/fbpartners/viewfindoc", function (req, res) {
    var bankid = req.query.key2id
    var docname = req.query.docname;
    new drvalidate(req, res, function (err, _session) {
        if (!err) {
            getbankname(bankid, function (bankname) {
                //var file_name =docname+'.docx';
                /* Location where we want to copy the uploaded file */
                var new_location = path.join('./fbpartners/', bankname, docname);

                fs.exists(new_location, function (exists) {
                    if (exists) {
                        // Content-type is very interesting part that guarantee that
                        // Web browser will handle response in an appropriate manner.
                        res.writeHead(200, {
                            "Content-Type": "application/octet-stream",
                            "Content-Disposition": "attachment; filename=" + docname
                        });
                        fs.createReadStream(new_location).pipe(res);
                    } else {
                        res.writeHead(400, {
                            "Content-Type": "text/plain"
                        });
                        res.end("ERROR File does not exist");
                    }
                });
            });
        } else {
            res.sendStatus(403);
        }
    });
});

function managerusers(email, tenantid, bank, fn) {
    fbpartners.findOne({
        _id: tenantid,
        bankname: bank
    }, {
        users: 1
    }).exec(
        function (err, docs) {
            //if(!err){

            var reviewer = [];

            docs.users.forEach(function (ele) {
                if (email == ele.email || email == ele.managerEmail)
                    reviewer.push({
                        'id': ele.id
                    })

            })
            //}
            if (!err) {

                fn(reviewer)

            } else {

                res.sendStatus(500);
            }
        });
}

function getleadstages(tenantid, bank, fn) {
    fbpartners.findOne({
        _id: tenantid,
        bankname: bank
    }, {
        leadstages: 1
    }).exec(
        function (err, docs) {
            //if(!err){

            var reviewer = [];

            docs.leadstages.forEach(function (ele) {

                reviewer.push(ele.stagename)

            })
            //}
            if (!err) {

                fn(reviewer)

            } else {

                fn(err)
            }
        });
}

function leadsbyid(tenantid, reviewer, fn) {

    fbpartnerleads.find({
        tenant_id: tenantid
    }, {
        leadequipments: 1,
        financialpartner: 1,
        leadamount: 1,
        _id: 1,
        financerequired: 1,
        financesummary: 1,
        company: 1,
        contact: 1,
        contactnumber: 1,
        leadsummary: 1,
        leadstages: 1,
        leadstage: 1,
        AssignedEmail: 1,
        AssignedId: 1,
        Assigned: 1
    }).exec(
        function (err, docs) {

            var reviewers = [];
            var nlength = 0

            reviewer.forEach(function (eles) {
                docs.forEach(function (ele) {


                    if (eles.id == ele.AssignedId) {


                        reviewers.push({
                            'leadequipments': ele.leadequipments,
                            'financialpartner': ele.financialpartner,
                            'leadamount': ele.leadamount,
                            '_id': ele._id,
                            'financerequired': ele.financerequired,
                            'financesummary': ele.financesummary,
                            'company': ele.company,
                            'contact': ele.contact,
                            'contactnumber': ele.contactnumber,
                            'leadsummary': ele.leadsummary,
                            'leadstage': ele.leadstage,
                            'Assigned': ele.Assigned,
                            'AssignedEmail': ele.AssignedEmail
                        })
                    }


                })
                nlength++
            });
            if (!err) {


                if (nlength == reviewer.length) {

                    fn(reviewers)
                }

            } else {
                res.sendStatus(500);
            }



        });

}

router.get("/fbpartners/getmyleads", function (req, res) {

    new drvalidate(req, res, function (err, _session) {
        if (!err) {
            if (_session.role == 'manager') {

                managerusers(_session.email, _session.tenant_id, _session.bank, function (reviewer) {


                    leadsbyid(_session.tenant_id, reviewer, function (reviewers) {
                        //console.log('data is'+reviewers);
                        res.send(reviewers);
                    });


                });




            } else {
                fbpartnerleads.find({
                    tenant_id: _session.tenant_id
                }, {
                    leadequipments: 1,
                    financialpartner: 1,
                    leadamount: 1,
                    _id: 1,
                    financerequired: 1,
                    financesummary: 1,
                    company: 1,
                    contact: 1,
                    contactnumber: 1,
                    leadsummary: 1,
                    leadstages: 1,
                    leadstage: 1,
                    AssignedEmail: 1,
                    AssignedId: 1,
                    Assigned: 1
                }).exec(
                    function (err, docs) {
                        if (!err) {
                            var reviewer = [];
                            //console.log(docs);
                            docs.forEach(function (ele) {
                                if (ele.AssignedEmail == _session.email) {


                                    reviewer.push({
                                        'leadequipments': ele.leadequipments,
                                        'financialpartner': ele.financialpartner,
                                        'leadamount': ele.leadamount,
                                        '_id': ele._id,
                                        'financerequired': ele.financerequired,
                                        'financesummary': ele.financesummary,
                                        'company': ele.company,
                                        'contact': ele.contact,
                                        'contactnumber': ele.contactnumber,
                                        'leadsummary': ele.leadsummary,
                                        'leadstage': ele.leadstage,
                                        'leadstages': ele.leadstages,
                                        'Assigned': ele.Assigned,
                                        'AssignedEmail': ele.AssignedEmail,
                                        'teamId': ele.teamId,
                                    })
                                }
                            })


                            res.send(reviewer);
                        } else {

                            res.sendStatus(500);
                        }
                    });
            }

        } else {
            res.sendStatus(403);
        }

    });

});





router.get("/fbpartners/getmypipelineleads", function (req, res) {

    new drvalidate(req, res, function (err, _session) {
        if (!err) {
            if (_session.role == 'manager') {

                managerusers(_session.email, _session.tenant_id, _session.bank, function (reviewer) {


                    leadsbyid(_session.tenant_id, reviewer, function (reviewers) {
                        getleadstages(_session.tenant_id, _session.bank, function (stages) {

                            var resp = {
                                'stages': stages,
                                'leads': reviewers
                            }
                            res.send(resp);
                        });
                    });


                });




            } else {
                fbpartnerleads.find({
                    tenant_id: _session.tenant_id,
                    AssignedEmail: _session.email
                }, {
                    leadequipments: 1,
                    financialpartner: 1,
                    leadamount: 1,
                    _id: 1,
                    financerequired: 1,
                    financesummary: 1,
                    company: 1,
                    contact: 1,
                    contactnumber: 1,
                    leadsummary: 1,
                    leadstages: 1,
                    leadstage: 1,
                    AssignedEmail: 1
                }).exec(
                    function (err, docs) {
                        if (!err) {
                            var reviewer = [];

                            docs.forEach(function (ele) {
                                if (ele.AssignedEmail == _session.email) {


                                    reviewer.push({
                                        'leadequipments': ele.leadequipments,
                                        'financialpartner': ele.financialpartner,
                                        'leadamount': ele.leadamount,
                                        '_id': ele._id,
                                        'financerequired': ele.financerequired,
                                        'financesummary': ele.financesummary,
                                        'company': ele.company,
                                        'contact': ele.contact,
                                        'contactnumber': ele.contactnumber,
                                        'leadsummary': ele.leadsummary,
                                        'leadstage': ele.leadstage,
                                        'Assigned': ele.Assigned,
                                        'AssignedEmail': ele.AssignedEmail
                                    })
                                }
                            })

                            var resp = {
                                'stages': ['Lead generation', 'contact met', 'Quotation sent', 'waiting for client confirmation', 'order expected', 'order received', 'order lost', 'Finance closure', 'Invoiced', 'payement received'],
                                'leads': reviewer
                            }
                            res.send(resp);
                        } else {

                            res.sendStatus(500);
                        }
                    });
            }

        } else {
            res.sendStatus(403);
        }

    });

});

// router.get("/fbpartners/financeleadsdetails",function(req,res){
//     var id =req.query.keyid;
//     new drvalidate(req,res,function(err,_session)
//     {
//         if(!err)
//             {  
//                 fbpartnerleads.find({},{leadequipments:1,financialpartner:1,leadamount:1,_id:1,financerequired:1,financesummary:1,company:1,contact:1,contactnumber:1,leadsummary:1,leadstages:1,leadstage:1,AssignedEmail:1,Assigned:1}).exec(
//                          function(err,docs)
//                          {
//                             if(!err){
//                                 var reviewer=[];
//                                 //console.log(docs);
//                                 docs.forEach(function(eles)
//                                 {
//                                     //console.log(ele);
//                                      eles.leads.forEach(function(ele)
//                                      {
//                                          //console.log(ele)
//                                  if(ele.id = id ){



//                                 reviewer.push({'leadequipments':ele.leadequipments,'financialpartner':ele.financialpartner,'leadamount':ele.leadamount,'id':ele.id,'financerequired':ele.financerequired,'financesummary':ele.financesummary,'company':ele.company,'contact':ele.contact,'contactnumber':ele.contactnumber,'leadsummary':ele.leadsummary,'leadstage':ele.leadstage,'Assigned':ele.Assigned,'AssignedEmail':ele.AssignedEmail })
//                                 //console.log(reviewer);

//                                  }
//                                 })
//                                 }
//                             )
//                            console.log(reviewer);
//                                 res.send(reviewer);
//                             }
//                             else{
//                                 //console.log('err:'+err)
//                                 res.sendStatus(500);
//                             }
//                          });

//             }
//             else{
//                 res.sendStatus(403);
//             }      
//     }); 
// });

router.post("/fbpartners/campainleads/:storeid", function (req, res) {


    var bankid = req.params.storeid
    // var _cleads=req.body;

    var sno;
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {


        var leaddocss = [];
        var leadstag = [];
        var stakeholders = [];
        var Assigned = {};
        leadstag.push({
            leadsstage: 'Lead sourced',
            updateddate: moment().format('MM/DD/YYYY')
        })

        if (fields.Company === '') {


            // updateleadcontact(_cleads, _session, function(){

            //  })
            fbpartners.findOne({
                _id: bankid,
                'contacts.email': fields.contactEmail
                // $or: [ { 'contacts.phone': fields.contactnumber}, { 'contacts.email': fields.contactEmail } ]

            }, {
                'contacts.$': 1
            },
                function (err, doc) {


                    if (err) {
                        res.sendStatus(500)
                    } else {

                        if (doc) {


                        } else {

                            var _record = {};
                            _record['id'] = guidGenerator();

                            _record['cname'] = fields.ContactPerson;
                            _record['phone'] = fields.contactnumber;
                            _record['city'] = fields.contactcity;
                            _record['email'] = fields.contactEmail;
                            _record['company'] = 'Indivisual';

                            _record['createddate'] = new Date();
                            _record['lstupdateddate'] = new Date();
                            _record['status'] = 1;


                            fbpartners.update({
                                _id: bankid,
                            }, {
                                "$push": {
                                    'contacts': _record
                                }
                            }, function (err) {

                                if (!err) {

                                } else {
                                    res.sendStatus(500)
                                }
                            })
                        }
                    }
                })



        } else {

            fbpartners.findOne({
                _id: bankid,
                'companys.email': fields.companyEmail
            }, {
                'companys.$': 1
            },
                function (err, doc) {


                    if (err) {
                        res.sendStatus(500)
                    } else {
                        if (doc) {



                        } else {

                            var _record = {};
                            _record['id'] = guidGenerator();

                            _record['cname'] = fields.Company;
                            _record['email'] = fields.CompanyEmail;

                            _record['createddate'] = new Date();
                            _record['lstupdateddate'] = new Date();
                            _record['status'] = 1;


                            fbpartners.update({
                                _id: bankid,
                            }, {
                                "$push": {
                                    'companys': _record
                                }
                            }, function (err) {

                                if (!err) {
                                    // var result = {};
                                    // result.Result = "OK";
                                    // result.Record = _record;
                                    // res.json(result);
                                    var _record = {};
                                    _record['id'] = guidGenerator();

                                    _record['cname'] = fields.ContactPerson;
                                    _record['phone'] = fields.contactnumber;
                                    _record['city'] = fields.contactcity;
                                    _record['email'] = fields.contactEmail;
                                    _record['company'] = fields.Company;

                                    _record['createddate'] = new Date();
                                    _record['lstupdateddate'] = new Date();
                                    _record['status'] = 1;


                                    fbpartners.update({
                                        _id: bankid,
                                    }, {
                                        "$push": {
                                            'contacts': _record
                                        }
                                    }, function (err) {

                                        if (!err) {
                                            // var result = {};
                                            // result.Result = "OK";
                                            // result.Record = _record;
                                            // res.json(result);
                                        } else {
                                            res.sendStatus(500)
                                        }
                                    })

                                } else {
                                    res.sendStatus(500)
                                }
                            })
                        }
                    }
                })
        }



        getcampaignstakeholders(fields, bankid, stakeholders, Assigned, function () {
            getserialnumbers(sno, bankid, function (sno) {

                var _fbpartnerleads = new fbpartnerleads({

                    tenant_id: bankid,
                    refid: guidGenerator(),
                    leadequipments: '',
                    leadname: '',
                    leadnumber: sno,
                    leadamount: '0',
                    leadsummary: fields.leadsummary ? fields.leadsummary : '',
                    leadstages: leadstag,
                    financerequired: 'No',
                    financesummary: '',
                    feedbacksummary: '',
                    leadstage: 'Lead sourced',
                    contact: fields.ContactPerson ? fields.ContactPerson : '',
                    contactnumber: fields.contactnumber ? fields.contactnumber : '',
                    contactEmail: fields.contactEmail ? fields.contactEmail : '',
                    contactcity: fields.contactcity ? fields.contactcity : '',
                    company: fields.Company ? fields.Company : 'Indivisual',
                    companyEmail: fields.Company ? fields.CompanyEmail : 'chandra.save@gmail.com',
                    campaignname: Assigned.campaignname,
                    campaignnameId: fields.campaignId,
                    financialpartner: '',
                    Assigned: Assigned.Assigned,
                    AssignedEmail: Assigned.AssignedEmail,
                    AssignedId: Assigned.AssignedId,
                    createddate: new Date(),
                    lstupdateddate: new Date(),
                    stakeholders: stakeholders,
                    leaddocs: leaddocss



                })


                _fbpartnerleads.save(function (err) {
                    if (!err) {

                        res.sendStatus(200)

                    } else {

                        res.sendStatus(500);
                    }
                });
            });
        });
    });


});


router.get("/fbpartners/getpipelineleads", function (req, res) {

    new drvalidate(req, res, function (err, _session) {
        if (!err) {
            if (_session.role === 'admin') {
                var query = fbpartnerleads.find({
                    tenant_id: _session.tenant_id,


                }, {
                    leadequipments: 1,
                    financialpartner: 1,
                    leadamount: 1,
                    _id: 1,
                    financerequired: 1,
                    financesummary: 1,
                    company: 1,
                    contact: 1,
                    contactnumber: 1,
                    leadsummary: 1,
                    leadstages: 1,
                    AssignedEmail: 1,
                    leadstage: 1,
                    Assigned: 1

                })

            }
            else {
                var query = fbpartnerleads.find({
                    tenant_id: _session.tenant_id,

                    'stakeholders.stakeholderEmail': _session.email
                }, {
                    leadequipments: 1,
                    financialpartner: 1,
                    leadamount: 1,
                    _id: 1,
                    financerequired: 1,
                    financesummary: 1,
                    company: 1,
                    contact: 1,
                    contactnumber: 1,
                    leadsummary: 1,
                    leadstages: 1,
                    AssignedEmail: 1,
                    leadstage: 1,
                    Assigned: 1

                })

            }

            query.exec(
                function (err, docs) {
                    if (!err) {
                        getleadstages(_session.tenant_id, _session.bank, function (stages) {
                            var resp = {
                                'stages': stages,
                                'leads': docs
                            }

                            res.send(resp);
                        });
                    } else {

                        res.sendStatus(500);
                    }
                });
        } else {
            res.sendStatus(403);
        }
    });

});

router.get("/fbpartners/getleadamount", function (req, res) {

    new drvalidate(req, res, function (err, _session) {
        if (!err) {
            fbpartnerleads.find({
                tenant_id: _session.tenant_id
            }, {
                leadamount: 1,
                _id: 1,
                contact: 1,
                company: 1,
                leadstage: 1
            }).exec(
                function (err, docs) {
                    if (!err) {
                        var reviewer = [];


                        res.send(docs.sort(function (a, b) {
                            return b.leadamount - a.leadamount;
                        }).slice(0, 10));
                    } else {
                        res.sendStatus(500);
                    }
                });
        } else {
            res.sendStatus(403);
        }
    });

});
router.get("/fbpartners/getcompanyleads", function (req, res) {

    new drvalidate(req, res, function (err, _session) {
        if (!err) {
            var name = req.query.name;
            fbpartnerleads.find({
                tenant_id: _session.tenant_id,
                'company': name
            }, {
                leadamount: 1,
                _id: 1,
                contact: 1,
                company: 1,
                leadstage: 1,
                Assigned: 1,
                contactnumber: 1
            }).exec(
                function (err, docs) {
                    if (!err) {
                        var reviewer = [];


                        res.send(docs.sort(function (a, b) {
                            return b.leadamount - a.leadamount;
                        }).slice(0, 10));
                    } else {
                        console.log('err:' + err)
                        res.sendStatus(500);
                    }
                });
        } else {
            res.sendStatus(403);
        }
    });

});
router.get("/fbpartners/getcompanyleaddocs", function (req, res) {

    new drvalidate(req, res, function (err, _session) {
        if (!err) {
            var name = req.query.name;
            fbpartnerleads.find({
                tenant_id: _session.tenant_id,
                'company': name
            }, {
                leaddocs: 1
            }).exec(
                function (err, docs) {
                    if (!err) {
                        var reviewer = [];
                        if (name === 'Indivisual') {
                            res.send(reviewer)

                        } else {


                            res.send(docs)
                        }



                    } else {
                        res.sendStatus(500);
                    }
                });
        } else {
            res.sendStatus(403);
        }
    });

});
router.get("/fbpartners/getcontactleads", function (req, res) {

    new drvalidate(req, res, function (err, _session) {
        if (!err) {
            var number = req.query.number;
            fbpartnerleads.find({
                tenant_id: _session.tenant_id,
                'contactnumber': number
            }, {
                leadamount: 1,
                _id: 1,
                contact: 1,
                company: 1,
                leadstage: 1,
                Assigned: 1,
                contactnumber: 1
            }).exec(
                function (err, docs) {
                    if (!err) {
                        var reviewer = [];


                        res.send(docs.sort(function (a, b) {
                            return b.leadamount - a.leadamount;
                        }).slice(0, 10));
                    } else {

                        res.sendStatus(500);
                    }
                });
        } else {
            res.sendStatus(403);
        }
    });

});

router.get("/fbpartners/leadsdetails", function (req, res) {
    var id = req.query.keyid;

    new drvalidate(req, res, function (err, _session) {
        if (!err) {
            if (_session.role === 'admin') {
                var query = fbpartnerleads.find({
                    tenant_id: _session.tenant_id,
                    '_id': id
                })

            } else {
                var query = fbpartnerleads.find({
                    tenant_id: _session.tenant_id,
                    '_id': id,
                    'stakeholders.stakeholderEmail': _session.email
                })


            }
            query.exec(
                function (err, docs) {
                    if (!err) {


                        if (docs.length > 0) {
                            res.send(docs);

                        }
                        else {
                            res.send('Not authorised')
                        }
                        //res.send(docs);
                    } else {
                        res.sendStatus(500);
                    }
                });
        } else {
            res.sendStatus(403);
        }
    });

});

router.get("/fbpartners/leadstagedetails", function (req, res) {
    var id = req.query.keyid;

    new drvalidate(req, res, function (err, _session) {
        if (!err) {
            fbpartnerleads.find({
                tenant_id: _session.tenant_id,
                '_id': id
            }, {
                leadstages: 1
            }).exec(
                function (err, docs) {
                    if (!err) {
                        res.send(docs[0]);
                    } else {
                        res.sendStatus(500);
                    }
                });
        } else {
            res.sendStatus(403);
        }
    });

});

function getcampaignstakeholders(_cleads, bankid, stakeholders, Assigned, fn) {

    fbpartners.find({ _id: bankid, 'financecampaign.id': _cleads.campaignId }, { 'financecampaign.$': 1 }).exec(
        function (err, docs) {

            if (!err) {

                Assigned['campaignname'] = docs[0].financecampaign[0].campaignname
                Assigned['Assigned'] = docs[0].financecampaign[0].manager
                Assigned['AssignedEmail'] = docs[0].financecampaign[0].managerEmail
                Assigned['AssignedId'] = docs[0].financecampaign[0].managerId



                var teamid = docs[0].financecampaign[0].teamId

                fbpartners.find({ _id: bankid, 'teamstakeholders.teamId': docs[0].financecampaign[0].teamId }, { teamstakeholders: 1 }).exec(
                    function (err, docs) {

                        if (!err) {
                            // var reviewer = [];


                            docs[0].teamstakeholders.forEach(function (ele) {
                                if (teamid === ele.teamId) {

                                    stakeholders.push({ 'id': guidGenerator(), 'stakeholderId': ele.stakeholderId, 'stakeholdername': ele.stakeholdername, 'stakeholderEmail': ele.stakeholderEmail, 'stakeholderrole': ele.stakeholderrole, 'logopath': ele.logopath, 'team': ele.team, 'teamId': ele.teamId })


                                }

                            })
                            fn(stakeholders)


                        } else {
                            fn(err)

                        }
                    });
                // }else{

                // }
                // });
                // stakeholders.push({id:guidGenerator(),stakeholderId:docs[0].users[0].id,stakeholdername:docs[0].users[0].uname,stakeholderEmail:docs[0].users[0].email,stakeholderrole:docs[0].users[0].role,logopath:docs[0].users[0].logopath,team:docs[0].users[0].team,teamId:docs[0].users[0].teamId})
                // var teamid = docs[0].users[0].teamId;



                // }else{
                //     fn(err)

                //     }
                // });

            }
            else {
                fn(err)

            }
        });

}

function getstakeholders(_cleads, _session, stakeholders, fn) {

    fbpartners.find({ _id: _session.tenant_id, bankname: _session.bank, 'users.id': _cleads.AssignedId }, { 'users.$': 1 }).exec(
        function (err, docs) {

            if (!err) {

                var teamid = docs[0].users[0].teamId;
                if (teamid !== '') {

                    stakeholders.push({ id: guidGenerator(), stakeholderId: docs[0].users[0].id, stakeholdername: docs[0].users[0].uname, stakeholderEmail: docs[0].users[0].email, stakeholderrole: docs[0].users[0].role, logopath: docs[0].users[0].logopath, team: docs[0].users[0].team, teamId: docs[0].users[0].teamId })
                    var query = fbpartners.aggregate([{
                        "$unwind": {
                            "path": "$teamstakeholders",
                            "preserveNullAndEmptyArrays": false
                        }
                    }, {
                        "$match": {
                            "teamstakeholders.teamId": {
                                $eq: docs[0].users[0].teamId
                            },
                            _id: {
                                $eq: mongoose.Types.ObjectId(_session.tenant_id)
                            },
                            bankname: {
                                $eq: _session.bank
                            }
                        }
                    },
                    {
                        "$project": {
                            "id": "$teamstakeholders.id",
                            "stakeholderId": "$teamstakeholders.stakeholderId",
                            "stakeholdername": "$teamstakeholders.stakeholdername",
                            "stakeholderEmail": "$teamstakeholders.stakeholderEmail",
                            "stakeholderrole": "$teamstakeholders.stakeholderrole",

                            "logopath": "$teamstakeholders.logopath",
                            "team": "$teamstakeholders.team",
                            "teamId": "$teamstakeholders.teamId"
                        }
                    }
                    ])
                    query.exec(
                        function (err, docs) {
                            if (!err) {

                                var reviewer = [];
                                docs.forEach(function (ele) {



                                    stakeholders.push({ 'id': ele.id, 'stakeholderId': ele.stakeholderId, 'stakeholdername': ele.stakeholdername, 'stakeholderEmail': ele.stakeholderEmail, 'stakeholderrole': ele.stakeholderrole, 'logopath': ele.logopath, 'team': ele.team, 'teamId': ele.teamId })
                                })
                                fn(stakeholders)
                            } else {

                                fn(err)
                            }
                        });



                } else {


                    // var reviewer = [];


                    fbpartners.find({ _id: _session.tenant_id, bankname: _session.bank, 'financeteams.managerId': _cleads.AssignedId }, { 'financeteams.$': 1 }).exec(
                        function (err, docs) {

                            if (!err) {
                                var query = fbpartners.aggregate([{
                                    "$unwind": {
                                        "path": "$teamstakeholders",
                                        "preserveNullAndEmptyArrays": false
                                    }
                                }, {
                                    "$match": {
                                        "teamstakeholders.teamId": {
                                            $eq: docs[0].financeteams[0].id
                                        },
                                        _id: {
                                            $eq: mongoose.Types.ObjectId(_session.tenant_id)
                                        },
                                        bankname: {
                                            $eq: _session.bank
                                        }
                                    }
                                },
                                {
                                    "$project": {
                                        "id": "$teamstakeholders.id",
                                        "stakeholderId": "$teamstakeholders.stakeholderId",
                                        "stakeholdername": "$teamstakeholders.stakeholdername",
                                        "stakeholderEmail": "$teamstakeholders.stakeholderEmail",
                                        "stakeholderrole": "$teamstakeholders.stakeholderrole",

                                        "logopath": "$teamstakeholders.logopath",
                                        "team": "$teamstakeholders.team",
                                        "teamId": "$teamstakeholders.teamId"
                                    }
                                }
                                ])
                                query.exec(
                                    function (err, docs) {
                                        if (!err) {
                                            var reviewer = [];
                                            docs.forEach(function (ele) {



                                                stakeholders.push({ 'id': ele.id, 'stakeholderId': ele.stakeholderId, 'stakeholdername': ele.stakeholdername, 'stakeholderEmail': ele.stakeholderEmail, 'stakeholderrole': ele.stakeholderrole, 'logopath': ele.logopath, 'team': ele.team, 'teamId': ele.teamId })
                                            })
                                            fn(stakeholders)
                                        } else {

                                            fn(err)
                                        }
                                    });


                            } else {
                                fn(err)


                            }
                        });






                }

                // fbpartners.find({ _id: _session.tenant_id, bankname: _session.bank, 'teamstakeholders.teamId': docs[0].users[0].teamId }, { 'teamstakeholders': 1 }).exec(
                //     function (err, docs) {

                //         if (!err) {
                //            // var reviewer = [];
                //           // console.log(docs[0]);
                //           // console.log('team id '+teamid)

                //             docs[0].teamstakeholders.forEach(function (ele) {
                //                 if(teamid === ele.teamId){

                //                 stakeholders.push({'id':ele.id,'stakeholderId':ele.stakeholderId,'stakeholdername':ele.stakeholdername,'stakeholderEmail':ele.stakeholderEmail,'stakeholderrole':ele.stakeholderrole,'logopath':ele.logopath,'team':ele.team,'teamId':ele.teamId})


                //                 }

                //             })
                //             fn(stakeholders)


                //         }else{
                //             fn(err)

                //         }
                //     });

            }
            else {
                fn(err)

            }
        });

}

// function getfinstakeholders(_cleads,_session,stakeholders,fn) {
//     fbpartners.find({ _id: _session.tenant_id, bankname: _session.bank}, { AssignedId: 1 }).exec(
//         function (err, docs) {

//             if (!err) {
//                console.log('finstake'+docs)
//                 if(docs[0].AssignedId !== undefined ){
//                    console.log("in first");

//                     fbpartners.find({bankname:'Finbot', 'financeusers.id': docs[0].AssignedId }, { 'financeusers.$': 1 }).exec(
//                         function (err, docs) {
//                            // console.log('step1 doc is'+docs[0])

//                             if (!err) {
//                                 stakeholders.push({id:guidGenerator(),stakeholderId:docs[0].financeusers[0].id,stakeholdername:docs[0].financeusers[0].uname,stakeholderEmail:docs[0].financeusers[0].email,stakeholderrole:docs[0].financeusers[0].role,logopath:docs[0].financeusers[0].logopath,team:docs[0].financeusers[0].team,teamId:docs[0].financeusers[0].teamId})
//                                 var teamid = docs[0].financeusers[0].teamId;
//                                // console.log('teamid is'+teamid);
//                                 fbpartners.find({ bankname:'Finbot', 'teamstakeholders.teamId': docs[0].financeusers[0].teamId }, { teamstakeholders: 1 }).exec(
//                                     function (err, docs) {

//                                         if (!err) {
//                                            // var reviewer = [];
//                                            console.log('step two docs is'+docs[0]);

//                                             docs[0].teamstakeholders.forEach(function (ele) {
//                                                 if(teamid === ele.teamId){

//                                                 stakeholders.push({'id':guidGenerator(),'stakeholderId':ele.stakeholderId,'stakeholdername':ele.stakeholdername,'stakeholderEmail':ele.stakeholderEmail,'stakeholderrole':ele.stakeholderrole,'logopath':ele.logopath,'team':ele.team,'teamId':ele.teamId})


//                                                 }

//                                             })
//                                             fn(stakeholders)


//                                         }else{
//                                             fn(err)

//                                         }
//                                     });

//                             }
//                             else{
//                                 fn(err)

//                             }
//                         });

//                 }
//                 else{
//                     console.log("in second");
//                     fbpartners.find({ bankname:'Finbot', 'teamstakeholders.team': 'UnAssigned' }, { teamstakeholders: 1 }).exec(
//                         function (err, docs) {
//                            console.log(docs)
//                             if (!err) {
//                                // var reviewer = [];
//                             console.log('step 3 docs is'+docs[0]);

//                                 docs[0].teamstakeholders.forEach(function (ele) {
//                                     if('UnAssigned' === ele.team){

//                                     stakeholders.push({'id':guidGenerator(),'stakeholderId':ele.stakeholderId,'stakeholdername':ele.stakeholdername,'stakeholderEmail':ele.stakeholderEmail,'stakeholderrole':ele.stakeholderrole,'logopath':ele.logopath,'team':ele.team,'teamId':ele.teamId})


//                                     }

//                                 })
//                                 fn(stakeholders)


//                             }else{
//                                 fn(err)

//                             }
//                         });

//                 }
//             }
//             else{


//             }
//         })


// }


function getserialnumbers(sno, tenantid, fn) {
    fbpartnerleads.find({ tenant_id: tenantid }, { 'leadnumber': 1 }).sort({ _id: -1 }).limit(1)
        .exec(
            function (err, docs) {
                // var sno = [];
                if (!err) {

                    if (docs.length > 0) {
                        if (docs[0].leadnumber !== undefined && docs[0].leadnumber !== null) {

                            sno = parseInt(docs[0].leadnumber.replace(/[^0-9]/g, '')) + 1;


                        } else {

                            sno = 100001;




                        }
                    } else {
                        sno = 100001;

                    }


                    fn(sno)

                }
                else {
                    fn(err)
                }

            });

}
function getfinserialnumbers(sno, fn) {
    fbleads.find().sort({ _id: -1 }).limit(1)
        .exec(
            function (err, docs) {
                // var sno = [];
                if (!err) {
                    if (docs.length > 0) {


                        if (docs[0].leadnumber !== undefined) {


                            sno = parseInt(docs[0].leadnumber.replace(/[^0-9]/g, '')) + 1;


                        } else {

                            sno = 100001;

                        }
                    } else {
                        sno = 100001;

                    }

                    fn(sno)

                }
                else {

                    fn(err)
                }

            });

}

router.post("/fbpartners/updatestakeholders", function (req, res) {
    drvalidate(req, res, function (err, _session) {

        if (!err) {
            // var _bname = _session.bank;
            var _cstakeholders = req.body.stakeholder;

            fbpartnerleads.findOne({
                '_id': _cstakeholders.id,
                'stakeholders.stakeholderId': _cstakeholders.stakeholderId
            }, function (err, stakeholder) {
                if (!err) {
                    if (stakeholder) {
                        res.send('stakeholder Already Exists');
                    } else {
                        var _record = {};
                        fbpartners.find({
                            _id: _session.tenant_id,
                            bankname: _session.bank,
                            'users.id': _cstakeholders.stakeholderId
                        }, {
                            'users.$': 1
                        }).exec(
                            function (err, docs) {
                                if (!err) {
                                    _record['id'] = guidGenerator();
                                    _record['stakeholderId'] = docs[0].users[0].id;
                                    _record['stakeholdername'] = docs[0].users[0].uname;
                                    _record['stakeholderEmail'] = docs[0].users[0].email;
                                    _record['stakeholderrole'] = docs[0].users[0].role;
                                    _record['logopath'] = docs[0].users[0].logopath;
                                    _record['phone'] = docs[0].users[0].phone;
                                    _record['city'] = docs[0].users[0].city;
                                    _record['team'] = docs[0].users[0].team;
                                    _record['teamId'] = docs[0].users[0].teamId;


                                    fbpartnerleads.update({
                                        '_id': _cstakeholders.id

                                    }, {
                                        "$push": {
                                            'stakeholders': _record
                                        }
                                    }, function (err) {

                                        if (!err) {
                                            var result = {};
                                            result.Result = "OK";
                                            result.Record = _record;
                                            res.json(result);
                                        } else {
                                            res.sendStatus(500)
                                        }
                                    })
                                } else {

                                    res.sendStatus(500)
                                }
                            });
                    }
                } else {
                    res.sendStatus(500);
                }
            });

        } else {
            res.sendStatus(403);
        }

    });
});




//     router.post("/fbpartners/test",function(req,res){

//         //const pdfInvoice = require('pdf-invoice')
//  console.log("am in");
//         new drvalidate(req,res,function(err,_session)
//         {
//             if(!err)
//             { 
//                 var form = new formidable.IncomingForm();
//                 form.parse(req, function(err, fields, files) {
//                     res.writeHead(200, {'content-type': 'text/plain'});    
//                 });

//                 form.on('end', function(fields, files) {

//                     var temp_path = this.openedFiles[0].path;
//                     //var extn =this.openedFiles[0].name.split('.').pop()

//                     /* The file name of the uploaded file */
//                     var file_name = uuid.v1()+this.openedFiles[0].name;
//                     /* Location where we want to copy the uploaded file */
//                     var new_location = path.join('./test/');
//                     fse.copy(temp_path, new_location+'/'+file_name , function(err) {  
//                     if (err) {
//                         res.sendStatus(500);                          

//                     } else {
//                ;
//                         const workbook = xlsx.readFile('./test/'+file_name);
//                         const sheet_name_list = workbook.SheetNames;
//                         console.log(xlsx.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]))

//                          res.end (file_name);
//                     }

//                  });
//                 });



//             }
//              else{
//                 res.sendStatus(403);
//             }  
//         });


// //        
//  //document = ({ size: 'A4', margin: 50 });

// //document.fillColor('#d2e0f7');
// // That's it! Do whatever you want now.
// // Pipe it to a file for instance:
// //document.fillColor('#d2e0f7');
// //const fs = require('fs')

// //document.generate() // triggers rendering
// //document.pdfkitDoc.pipe(fs.createWriteStream('./fbpartners/test8.pdf'))


//           //document.generate() // triggers rendering
//           //document.pdfkitDoc.pipe(fs.createWriteStream('./fbpartners/file.pdf'))

//           //res.send("checking");

//           //fbpdf(company,customer,items,)
//     });

router.post("/fbpartners/updateleads", function (req, res) {

    drvalidate(req, res, function (err, _session) {

        if (!err) {
            var _cleads = req.body.leads;
            var _record = {};


            if (_cleads.financerequired === 'Yes') {

                fbleads.find({
                    'sourceid': _cleads.refid
                }).exec(
                    function (err, docs) {

                        if (!err) {

                            if (docs.length <= 0) {





                                createfinancelead(_cleads, _session, function () {

                                    if (err) {
                                        res.sendStatus(500);
                                    } else {


                                        if (_cleads.oldassigned === _cleads.AssignedId) {

                                            _record['leadname'] = _cleads.leadname;
                                            _record['leadequipments'] = _cleads.leadequipments;
                                            _record['leadamount'] = _cleads.leadamount;
                                            _record['leadstage'] = _cleads.leadstage;
                                            _record['leadsummary'] = _cleads.leadsummary;
                                            _record['contactnumber'] = _cleads.contactnumber;
                                            _record['financerequired'] = _cleads.financerequired;
                                            _record['financesummary'] = _cleads.financesummary;
                                            _record['feedbacksummary'] = _cleads.feedbacksummary;
                                            _record['leadstage'] = _cleads.cleadstage;

                                            _record['contact'] = _cleads.contact;
                                            _record['company'] = _cleads.company;
                                            _record['companyEmail'] = _cleads.companyEmail;

                                            _record['contactEmail'] = _cleads.contactEmail,
                                                _record['contactcity'] = _cleads.contactcity,
                                                _record['campaignname'] = _cleads.campaign,
                                                _record['campaignnameId'] = _cleads.campaignnameId,
                                                // _record['teamId'] = _cleads.teamId,
                                                _record['financialpartner'] = _cleads.financialpartner;
                                            _record['Assigned'] = _cleads.Assigned;
                                            _record['AssignedEmail'] = _cleads.AssignedEmail;
                                            _record['AssignedId'] = _cleads.AssignedId;
                                            _record['lstupdateddate'] = new Date();



                                            updateleaddocs(_cleads, _cleads.id, function (err) {
                                                if (err) {
                                                    res.sendStatus(500)
                                                } else {
                                                    fbpartnerleads.update({
                                                        '_id': _cleads.id
                                                    }, {
                                                        "$set": _record
                                                    }, function (err) {

                                                        if (!err) {

                                                            res.sendStatus(200)
                                                        } else {

                                                            res.sendStatus(500)
                                                        }
                                                    })
                                                }
                                            })



                                        }
                                        else {

                                            getstakeholders(_cleads, _session, stakeholders, function () {
                                                // updateotherleads(_cleads,_session,function(){
                                                _record['leadname'] = _cleads.leadname;
                                                _record['leadequipments'] = _cleads.leadequipments;
                                                _record['leadamount'] = _cleads.leadamount;
                                                _record['leadstage'] = _cleads.leadstage;
                                                _record['leadscore'] = _cleads.leadscore;
                                                _record['leadsummary'] = _cleads.leadsummary;
                                                _record['contactnumber'] = _cleads.contactnumber;
                                                _record['financerequired'] = _cleads.financerequired;
                                                _record['financesummary'] = _cleads.financesummary;
                                                _record['feedbacksummary'] = _cleads.feedbacksummary;
                                                _record['leadstage'] = _cleads.cleadstage;

                                                _record['contact'] = _cleads.contact;
                                                _record['company'] = _cleads.company;
                                                _record['companyEmail'] = _cleads.companyEmail;
                                                _record['contactEmail'] = _cleads.contactEmail,
                                                    _record['contactcity'] = _cleads.contactcity,
                                                    _record['campaignname'] = _cleads.campaign,
                                                    _record['campaignnameId'] = _cleads.campaignnameId,
                                                    // _record['teamId'] = _cleads.teamId,
                                                    _record['financialpartner'] = _cleads.financialpartner;
                                                _record['Assigned'] = _cleads.Assigned;
                                                _record['AssignedEmail'] = _cleads.AssignedEmail;
                                                _record['AssignedId'] = _cleads.AssignedId;
                                                _record['stakeholders'] = stakeholders;
                                                _record['lstupdateddate'] = new Date();




                                                updateleaddocs(_cleads, _cleads.id, function (err) {
                                                    if (err) {
                                                        res.sendStatus(500)
                                                    } else {

                                                        fbpartnerleads.update({
                                                            '_id': _cleads.id
                                                        }, {
                                                            "$set": _record
                                                        }, function (err) {

                                                            if (!err) {

                                                                res.sendStatus(200)
                                                            } else {

                                                                res.sendStatus(500)
                                                            }
                                                        })
                                                    }
                                                })
                                                // })

                                            })

                                        }

                                    }


                                })

                            } else {


                                updatedealrtofinlead(_cleads, _session.tenant_id, function () {
                                    var _record = {};
                                    var stakeholders = [];
                                    if (_cleads.oldassigned === _cleads.AssignedId) {
                                        _record['leadname'] = _cleads.leadname;

                                        _record['leadequipments'] = _cleads.leadequipments;
                                        _record['leadamount'] = _cleads.leadamount;
                                        _record['leadscore'] = _cleads.leadscore;
                                        _record['leadstage'] = _cleads.leadstage;
                                        _record['leadsummary'] = _cleads.leadsummary;
                                        _record['contactnumber'] = _cleads.contactnumber;
                                        _record['financerequired'] = _cleads.financerequired;
                                        _record['financesummary'] = _cleads.financesummary;
                                        _record['feedbacksummary'] = _cleads.feedbacksummary;
                                        _record['leadstage'] = _cleads.cleadstage;

                                        _record['contact'] = _cleads.contact;
                                        _record['company'] = _cleads.company;
                                        _record['companyEmail'] = _cleads.companyEmail;
                                        _record['contactEmail'] = _cleads.contactEmail,
                                            _record['contactcity'] = _cleads.contactcity,
                                            _record['campaignname'] = _cleads.campaign,
                                            _record['campaignnameId'] = _cleads.campaignnameId,
                                            // _record['teamId'] = _cleads.teamId,
                                            _record['financialpartner'] = _cleads.financialpartner;
                                        _record['Assigned'] = _cleads.Assigned;
                                        _record['AssignedEmail'] = _cleads.AssignedEmail;
                                        _record['AssignedId'] = _cleads.AssignedId;
                                        _record['lstupdateddate'] = new Date();



                                        updateleaddocs(_cleads, _cleads.id, function (err) {
                                            if (err) {
                                                res.sendStatus(500)
                                            } else {
                                                fbpartnerleads.update({
                                                    '_id': _cleads.id
                                                }, {
                                                    "$set": _record
                                                }, function (err) {

                                                    if (!err) {

                                                        res.sendStatus(200)
                                                    } else {

                                                        res.sendStatus(500)
                                                    }
                                                })
                                            }
                                        })



                                    }
                                    else {

                                        getstakeholders(_cleads, _session, stakeholders, function () {
                                            _record['leadname'] = _cleads.leadname;

                                            _record['leadequipments'] = _cleads.leadequipments;
                                            _record['leadamount'] = _cleads.leadamount;
                                            _record['leadscore'] = _cleads.leadscore;
                                            _record['leadstage'] = _cleads.leadstage;
                                            _record['leadsummary'] = _cleads.leadsummary;
                                            _record['contactnumber'] = _cleads.contactnumber;
                                            _record['financerequired'] = _cleads.financerequired;
                                            _record['financesummary'] = _cleads.financesummary;
                                            _record['feedbacksummary'] = _cleads.feedbacksummary;
                                            _record['leadstage'] = _cleads.cleadstage;

                                            _record['contact'] = _cleads.contact;
                                            _record['company'] = _cleads.company;
                                            _record['companyEmail'] = _cleads.companyEmail;
                                            _record['contactEmail'] = _cleads.contactEmail,
                                                _record['contactcity'] = _cleads.contactcity,
                                                _record['campaignname'] = _cleads.campaign,
                                                _record['campaignnameId'] = _cleads.campaignnameId,
                                                // _record['teamId'] = _cleads.teamId,
                                                _record['financialpartner'] = _cleads.financialpartner;
                                            _record['Assigned'] = _cleads.Assigned;
                                            _record['AssignedEmail'] = _cleads.AssignedEmail;
                                            _record['AssignedId'] = _cleads.AssignedId;
                                            _record['stakeholders'] = stakeholders;
                                            _record['lstupdateddate'] = new Date();




                                            updateleaddocs(_cleads, _cleads.id, function (err) {
                                                if (err) {
                                                    res.sendStatus(500)
                                                } else {

                                                    fbpartnerleads.update({
                                                        '_id': _cleads.id
                                                    }, {
                                                        "$set": _record
                                                    }, function (err) {

                                                        if (!err) {

                                                            res.sendStatus(200)
                                                        } else {

                                                            res.sendStatus(500)
                                                        }
                                                    })
                                                }
                                            })
                                        })
                                    }



                                });





                            }


                        } else {

                            res.sendStatus(500);




                        }
                    });





            } else {
                var _record = {};
                var stakeholders = [];
                if (_cleads.oldassigned === _cleads.AssignedId) {
                    _record['leadname'] = _cleads.leadname;
                    _record['leadnumber'] = _cleads.leadnumber;
                    _record['leadscore'] = _cleads.leadscore;
                    _record['leadequipments'] = _cleads.leadequipments;
                    _record['leadamount'] = _cleads.leadamount;
                    _record['leadstage'] = _cleads.leadstage;
                    _record['leadsummary'] = _cleads.leadsummary;
                    _record['contactnumber'] = _cleads.contactnumber;
                    _record['financerequired'] = _cleads.financerequired;
                    _record['financesummary'] = _cleads.financesummary;
                    _record['feedbacksummary'] = _cleads.feedbacksummary;
                    _record['leadstage'] = _cleads.cleadstage;

                    _record['contact'] = _cleads.contact;
                    _record['company'] = _cleads.company;
                    // _record['teamId'] = _cleads.teamId,
                    _record['financialpartner'] = _cleads.financialpartner;
                    _record['Assigned'] = _cleads.Assigned;
                    _record['AssignedEmail'] = _cleads.AssignedEmail;
                    _record['AssignedId'] = _cleads.AssignedId;
                    _record['lstupdateddate'] = new Date();



                    updateleaddocs(_cleads, _cleads.id, function (err) {
                        if (err) {
                            res.sendStatus(500)
                        } else {
                            fbpartnerleads.update({
                                '_id': _cleads.id
                            }, {
                                "$set": _record
                            }, function (err) {

                                if (!err) {

                                    res.sendStatus(200)
                                } else {

                                    res.sendStatus(500)
                                }
                            })
                        }
                    })



                }
                else {

                    getstakeholders(_cleads, _session, stakeholders, function () {
                        _record['leadname'] = _cleads.leadname;
                        _record['leadnumber'] = _cleads.leadnumber;
                        _record['leadequipments'] = _cleads.leadequipments;
                        _record['leadamount'] = _cleads.leadamount;
                        _record['leadscore'] = _cleads.leadscore;
                        _record['leadstage'] = _cleads.leadstage;
                        _record['leadsummary'] = _cleads.leadsummary;
                        _record['contactnumber'] = _cleads.contactnumber;
                        _record['financerequired'] = _cleads.financerequired;
                        _record['financesummary'] = _cleads.financesummary;
                        _record['feedbacksummary'] = _cleads.feedbacksummary;
                        _record['leadstage'] = _cleads.cleadstage;

                        _record['contact'] = _cleads.contact;
                        _record['company'] = _cleads.company;
                        // _record['teamId'] = _cleads.teamId,
                        _record['financialpartner'] = _cleads.financialpartner;
                        _record['Assigned'] = _cleads.Assigned;
                        _record['AssignedEmail'] = _cleads.AssignedEmail;
                        _record['AssignedId'] = _cleads.AssignedId;
                        _record['stakeholders'] = stakeholders;
                        _record['lstupdateddate'] = new Date();




                        updateleaddocs(_cleads, _cleads.id, function (err) {
                            if (err) {
                                res.sendStatus(500)
                            } else {

                                fbpartnerleads.update({
                                    '_id': _cleads.id
                                }, {
                                    "$set": _record
                                }, function (err) {

                                    if (!err) {

                                        res.sendStatus(200)
                                    } else {

                                        res.sendStatus(500)
                                    }
                                })
                            }
                        })
                    })
                }

            }


        } else {
            res.sendStatus(403);
        }

    });

});
function updateotherleads(_cleads, _session) {

    // fbpartnerleads.find({
    //     tenant_id: _session.tenant_id,
    //     leadstage:{ $nin: [ 'order lost', 'order Won' ] }


    // }, {

    //     Assigned: 1,
    //     stakeholders:1,

    // }).exec(
    //     function (err, docs) {
    //         if (!err) {

    //         }else{

    //         }
    //     })

    getstakeholders(_cleads, _session, stakeholders, function () {
        fbpartnerleads.updateMany({
            tenant_id: _session.tenant_id,
            leadstage: { $nin: ['order lost', 'order Won'] }


        }, {

            Assigned: 1,
            stakeholders: 1,

        }).exec(
            function (err, docs) {
                if (!err) {

                } else {

                }
            })

    });


}

function updatedealrtofinlead(_cleads, tenant_id, fn) {



    var _record = {};

    _record['leadname'] = _cleads.leadname;
    _record['leadequipments'] = _cleads.leadequipments;
    //_record['leadamount'] = _cleads.leadamount;
    // _record['leadstage'] = _cleads.leadstage;
    _record['leadsummary'] = _cleads.leadsummary;
    _record['contactnumber'] = _cleads.contactnumber;
    _record['financerequired'] = _cleads.financerequired;
    _record['financesummary'] = _cleads.financesummary;
    _record['feedbacksummary'] = _cleads.feedbacksummary;
    //_record['leadstage'] = _cleads.cleadstage;

    _record['contact'] = _cleads.contact;
    _record['contactEmail'] = _cleads.contactEmail;
    _record['contactcity'] = _cleads.contactcity;

    _record['company'] = _cleads.company;
    _record['companyEmail'] = _cleads.companyEmail;
    _record['teamId'] = _cleads.teamId,
        // _record['financialpartner'] = _cleads.financialpartner;
        // _record['Assigned'] = _cleads.Assigned;
        // _record['AssignedEmail'] = _cleads.AssignedEmail;
        // _record['AssignedId'] = _cleads.AssignedId;
        _record['lstupdateddate'] = new Date();




    if (_cleads.docpath !== undefined && _cleads.isvisible == 1) {
        updatepartnertofinleaddocs(_cleads, tenant_id, function (err) {
            if (err) {
                res.sendStatus(500)
            } else {
                fbleads.update({
                    'sourceid': _cleads.refid
                }, {
                    "$set": _record
                }, function (err) {

                    if (!err) {

                        fn(null)

                        //res.sendStatus(200)
                    } else {
                        fn(err)

                        // res.sendStatus(500)
                    }
                })
            }
        })

    } else {


        fbleads.update({
            'sourceid': _cleads.refid
        }, {
            "$set": _record
        }, function (err) {

            if (!err) {

                fn(null)
                //res.sendStatus(200)
            } else {

                fn(err)
                // res.sendStatus(500)
            }
        })

    }



}

router.post("/fbpartners/deleteleads", function (req, res) {
    drvalidate(req, res, function (err, _session) {

        if (!err) {
            var _cleads = req.body.leads;
            var _record = {};
            _record['_id'] = _cleads.id;



            fbpartnerleads.findByIdAndRemove({
                'tenant_id': _session.tenant_id,
                '_id': _cleads.id
            },

                function (err, doc) {
                    if (!err) {
                        res.sendStatus(200);
                    } else {
                        res.sendStatus(500)
                    }
                });
        } else {
            res.sendStatus(403);
        }

    });

});

// -----------------products--------------  

router.get("/fbpartners/getproducts", function (req, res, next) {
    new drvalidate(req, res, function (err, _session) {
        if (!err) {
            fbproducts.find({
                tenant_id: _session.tenant_id
            }, {
                Name: 1,
                SerialNumber: 1,
                Manufacturer: 1,
                id: 1,
                Description: 1,
                ContactPerson: 1,
                Price: 1,
                logopath: 1
            }).exec(function (err, docs) {
                if (err) {
                    re.sendStatus(500);
                } else {
                    res.send(docs);
                }
            });
        } else {
            res.sendStatus(403);
        }
    });
});

router.get("/fbpartners/getproductnames", function (req, res) {
    new drvalidate(req, res, function (err, _session) {
        if (!err) {
            fbproducts.find({
                tenant_id: _session.tenant_id
            }, {
                'id': 1,
                'Name': 1,
                'Manufacturer': 1
            }).exec(
                function (err, docs) {
                    if (!err) {
                        res.send(docs);
                    } else {
                        res.sendStatus(500);
                    }
                });
        } else {
            res.sendStatus(403);
        }
    });
});
router.get("/fbpartnersfinance/getfinproductnames", function (req, res) {
    var id = req.query.key2id;

    new drvalidate(req, res, function (err, _session) {
        if (!err) {
            fbpartners.find({
                _id: id
            }, {
                'products': 1
            }).exec(
                function (err, docs) {
                    if (!err) {
                        var reviewer = [];

                        docs[0].products.forEach(function (ele) {

                            reviewer.push({
                                'Name': ele.Name,
                                'id': ele.id,
                            })

                        })

                        res.send(reviewer);
                    } else {

                        res.sendStatus(500);
                    }
                });
        } else {
            res.sendStatus(403);
        }
    });

});
router.get("/fbpartners/productdetails", function (req, res) {
    var id = req.query.keyid;

    new drvalidate(req, res, function (err, _session) {
        if (!err) {
            fbproducts.findOne({
                tenant_id: _session.tenant_id,
                'id': id
            }).exec(
                function (err, docs) {
                    if (!err) {
                        res.send(docs);
                    } else {
                        res.sendStatus(500);
                    }
                });
        } else {
            res.sendStatus(403);
        }
    });

});
router.get("/fbpartners/dummyproduct", function (req, res) {
    drvalidate(req, res, function (err, _session) {
        if (!err) {
            var _Record = [];
            for (i = 1; i < 10001; i++) {
                var _record = {};
                var _doc = [];
                _record['id'] = guidGenerator();
                _record['tenant_id'] = _session.tenant_id;
                _record['bankname'] = _session.bank;
                _record['Name'] = 'product' + i;
                _record['Price'] = i;
                _record['Tax'] = '18';
                _record['HSNCode'] = 'HSNCode' + i;
                _record['isservice'] = 0;
                _record['productowner'] = '';
                _record['SerialNumber'] = 'snnumbr' + i;
                _record['Manufacturer'] = 'Manufacturer' + i;
                _record['Description'] = 'Description' + i;
                _record['ContactPerson'] = 'ContactPerson' + i;
                _record['logopath'] = '';
                _record['proddocs'] = _doc;
                _record['createddate'] = new Date();
                _record['lstupdateddate'] = new Date();
                _record['status'] = 1;
                _Record.push(_record);
            }

            fbproducts.insertMany(_Record, function (err) {
                if (!err) {
                    res.sendStatus(200);
                } else {
                    res.sendStatus(500);
                }
            })
        } else {
            res.sendStatus(403);
        }

    });
});
router.post("/fbpartners/createproducts", function (req, res) {
    drvalidate(req, res, function (err, _session) {

        if (!err) {
            var _cproducts = req.body.products;

            var _doc = [];
            var _cdoc = {};
            _cdoc['docname'] = _cproducts.docname;
            _cdoc['docpath'] = _cproducts.docpath;
            _doc.push(_cdoc);

            var _newproducts = new fbproducts({
                id: guidGenerator(),
                tenant_id: _session.tenant_id,
                bankname: _session.bank,
                Name: _cproducts.Name,
                Price: _cproducts.Price,
                Tax: _cproducts.Tax,
                HSNCode: _cproducts.HSNCode,
                isservice: _cproducts.isservice,
                productowner: _cproducts.productowner,
                SerialNumber: _cproducts.SerialNumber,
                Manufacturer: _cproducts.Manufacturer,
                ShortDescription: _cproducts.sDescription,

                ManufacturerId: _cproducts.ManufacturerId,
                Manufacturercode: _cproducts.Manufacturercode,
                Description: _cproducts.Description,
                ContactPerson: _cproducts.ContactPerson,
                logopath: _cproducts.logopath,
                createddate: new Date(),
                lstupdateddate: new Date(),
                status: 1
            })

            if (_cproducts.docpath !== undefined) {
                _newproducts.proddocs = _doc;
            }

            _newproducts.save(function (err) {
                if (!err) {
                    res.sendStatus(200)
                } else {
                    res.sendStatus(500)
                }
            });
        } else {
            res.sendStatus(403);
        }

    });
});
// Save products to Fbpartners SubDocuments
router.post("/fbpartners/savecsvsubproducts", function (req, res) {
    drvalidate(req, res, function (err, _session) {
        if (!err) {
            var filename = req.body.filename;
            if (filename) {
                var product = path.join('./fbpartners/', _session.bank, 'products', filename);
                let stream = fs.createReadStream(product);
                let csvData = [];
                let csvStream = fastcsv.parse().on("data", function (data) {
                    csvData.push({
                        id: guidGenerator(),
                        Name: data[0],
                        Price: data[1],
                        Tax: data[2],
                        HSNCode: data[3],
                        isservice: data[4],
                        productowner: data[5],
                        SerialNumber: data[6],
                        Manufacturer: data[7],
                        Description: data[8],
                        ContactPerson: data[9],
                        logopath: data[10],
                        createddate: new Date(),
                        lstupdateddate: new Date(),
                        status: 1,
                        proddocs: []
                    });
                }).on("end", function () {
                    csvData.shift(); // remove the first line: header

                    fbpartners.update({
                        '_id': _session.tenant_id,
                        bankname: _session.bank,
                    }, {
                        "$push": {
                            'products': csvData
                        }
                    }, function (err) {
                        if (!err) {
                            res.sendStatus(200)
                        } else {
                            res.sendStatus(500)
                        }
                    });
                });
                stream.pipe(csvStream);
            } else {
                res.sendStatus(500);
            }
        } else {
            res.sendStatus(403);
        }
    });
});
// Normal Products CSV Formate to Separate Document
router.post("/fbpartners/savecsvproducts", function (req, res) {
    drvalidate(req, res, function (err, _session) {
        if (!err) {
            var filename = req.body.filename;
            if (filename) {
                var product = path.join('./fbpartners/', _session.bank, 'products', filename);
                let stream = fs.createReadStream(product);
                let csvData = [];
                let csvStream = fastcsv.parse().on("data", function (data) {
                    csvData.push({
                        id: guidGenerator(),
                        tenant_id: _session.tenant_id,
                        bankname: _session.bank,
                        Name: data[0],
                        Price: data[1],
                        Tax: data[2],
                        HSNCode: data[3],
                        isservice: data[4],
                        productowner: data[5],
                        SerialNumber: data[6],
                        Manufacturer: data[7],
                        Description: data[8],
                        ContactPerson: data[9],
                        logopath: data[10],
                        createddate: new Date(),
                        lstupdateddate: new Date(),
                        status: 1,
                        proddocs: []
                    });
                }).on("end", function () {
                    csvData.shift(); // remove the first line: header
                    if (Array.isArray(csvData) && csvData.length > 0) {
                        var arrcount = 0;
                        var start = 0;
                        var lengthofdata = 100;
                        var arrlength = csvData.length / lengthofdata;

                        arrlength = round(arrlength, 1);

                        for (let i = 0; i <= arrlength - 1; i++) {
                            var result = csvData.slice(start, start + lengthofdata).map(_data => {
                                return _data;
                            });
                            fbproducts.insertMany(result, function (err, doc) {
                                if (err) {
                                    res.send(err);
                                } else {
                                    arrcount++;
                                    if (arrlength == arrcount) {
                                        res.sendStatus(200);
                                    }
                                }
                            });
                            start = start + lengthofdata;
                        }


                        // fbproducts.insertMany(csvData, function (err, doc) {
                        //     if (err) {
                        //         res.send(err);
                        //     } else {
                        //         console.log('arrcount - ', arrcount);
                        //         arrcount++;
                        //         if (arrlength == arrcount) {
                        //             res.sendStatus(200);
                        //         }
                        //     }
                        // });

                    } else {
                        res.send('Empty Data is Present');
                    }
                });
                stream.pipe(csvStream);
            } else {
                res.sendStatus(500);
            }
        } else {
            res.sendStatus(403);
        }
    });
});
router.post("/fbpartners/savecsvproductstwo", function (req, res) {
    drvalidate(req, res, function (err, _session) {
        if (!err) {
            var filename = req.body.filename;

            if (filename) {
                var producttwo = path.join('./fbpartners/', _session.bank, 'productstwo', filename);
                let stream = fs.createReadStream(producttwo);
                let csvData = [];
                let csvStream = fastcsv.parse().on("data", function (data) {
                    csvData.push({
                        id: guidGenerator(),
                        tenant_id: _session.tenant_id,
                        bankname: _session.bank,
                        Name: data[0],
                        Manufacturer: data[1],
                        Code: data[2],
                        Price_min: data[3],
                        Price_max: data[4],
                        Type: data[5],
                        Category: data[6],
                        Subcategory: data[7],
                        Tags: data[8],
                        logopath: data[9],
                        createddate: new Date(),
                        lstupdateddate: new Date(),
                        status: 1,
                        proddocstwo: []
                    });
                }).on("end", function () {
                    csvData.shift(); // remove the first line: header
                    if (Array.isArray(csvData) && csvData.length > 0) {
                        var arrcount = 0;
                        var start = 0;
                        var lengthofdata = 100;
                        var arrlength = csvData.length / lengthofdata;

                        arrlength = round(arrlength, 1);

                        for (let i = 0; i <= arrlength - 1; i++) {
                            var result = csvData.slice(start, start + lengthofdata).map(_data => {
                                return _data;
                            });
                            fbproductstwo.insertMany(result, function (err, doc) {
                                if (err) {
                                    res.send(err);
                                } else {
                                    arrcount++;
                                    if (arrlength == arrcount) {
                                        res.sendStatus(200);
                                    }
                                }
                            });
                            start = start + lengthofdata;
                        }

                    } else {
                        res.send('Empty Data is Present');
                    }
                });
                stream.pipe(csvStream);
            } else {
                res.sendStatus(500);
            }
        } else {
            res.sendStatus(403);
        }
    });
});
function updateproddocs(_cproducts, tenant_id, bank, _cproductsid, fn) {
    var _record = {};
    var _record = {};
    var _doc = [];
    var _cdoc = {};
    _cdoc['docname'] = _cproducts.docname;
    _cdoc['docpath'] = _cproducts.docpath;
    _doc.push(_cdoc);
    _record['proddocs'] = _doc;
    fbproducts.update({
        'tenant_id': tenant_id,
        'id': _cproductsid
    }, {
        "$push": _record
    }, function (err) {

        if (err) {
            fn(err)
        } else {
            fn(null)
        }
    })

}

function updatepartnertofinleaddocs(_cleads, tenantid, fn) {
    // if (_cleads.docpath !== undefined) {

    var _record = {};
    var _record = {};
    var _doc = [];
    var _cdoc = {};

    _cdoc['docname'] = _cleads.docname;
    _cdoc['docpath'] = _cleads.docpath;
    _doc.push(_cdoc);
    _record['leaddocs'] = _doc;

    fbleads.update({
        'sourceid': _cleads.refid
    }, {
        "$push": _record
    }, function (err) {

        if (err) {
            fn(err)
        } else {


            fn(null)
        }
    })


}

function updateleaddocs(_cleads, _cleadsid, fn) {
    if (_cleads.docpath !== undefined) {
        var _record = {};
        var _record = {};
        var _doc = [];
        var _cdoc = {};
        _cdoc['docname'] = _cleads.docname;
        _cdoc['docpath'] = _cleads.docpath;

        _doc.push(_cdoc);
        _record['leaddocs'] = _doc;
        fbpartnerleads.update({
            '_id': _cleadsid
        }, {
            "$push": _record
        }, function (err) {

            if (err) {
                fn(err)
            } else {

                updateleadstages(_cleads, _cleadsid, function (err) {
                    if (err) {
                        fn(err)
                    } else {
                        fn(null)
                    }
                });
            }
        })
    } else {
        updateleadstages(_cleads, _cleadsid, function (err) {
            if (err) {
                // console.log('error is' +err)
                fn(err)
            } else {
                //  console.log("am here");
                fn(null)
            }
        });

    }

}

function updateleadstages(_cleads, _cleadsid, fn) {

    var _record = {};
    var _record = {};
    var _doc = [];
    var _cdoc = {};

    _cdoc['leadsstage'] = _cleads.leadstage;
    _cdoc['updateddate'] = moment().format('MM/DD/YYYY');
    _doc.push(_cdoc);
    _record['leadstages'] = _doc;

    if (_cleads.leadstage !== '') {

        fbpartnerleads.update({
            '_id': _cleadsid
        }, {
            "$push": _record
        }, function (err) {

            if (err) {

                fn(err)
            } else {

                fn(null)

            }
        })
    } else {
        fn(null)
    }

}

router.post("/fbpartners/updateproducts", function (req, res) {

    drvalidate(req, res, function (err, _session) {

        if (!err) {
            var _cproducts = req.body.products;
            var _record = {};

            _record['Name'] = _cproducts.Name;
            _record['Price'] = _cproducts.Price;
            _record['Tax'] = _cproducts.Tax;
            _record['HSNCode'] = _cproducts.HSNCode;
            _record['isservice'] = _cproducts.isservice;
            _record['productowner'] = _cproducts.productowner;
            _record['SerialNumber'] = _cproducts.SerialNumber;
            _record['Manufacturer'] = _cproducts.Manufacturer;
            _record['ManufacturerId'] = _cproducts.ManufacturerId;
            _record['Manufacturercode'] = _cproducts.Manufacturercode;
            _record['Description'] = _cproducts.Description;
            _record['ShortDescription'] = _cproducts.sDescription;
            _record['ContactPerson'] = _cproducts.ContactPerson;
            _record['logopath'] = _cproducts.logopath;
            _record['lstupdateddate'] = new Date();
            _record['status'] = 1;

            if (_cproducts.docpath == undefined) {

                fbproducts.update({
                    'tenant_id': _session.tenant_id,
                    'id': _cproducts.id
                }, {
                    "$set": _record
                }, function (err) {

                    if (!err) {
                        res.sendStatus(200)
                    } else {

                        res.sendStatus(500)
                    }
                })
            } else {
                updateproddocs(_cproducts, _session.tenant_id, _session.bank, _cproducts.id, function (err) {
                    if (err) {
                        res.sendStatus(500)
                    } else {
                        fbproducts.update({
                            'tenant_id': _session.tenant_id,
                            'id': _cproducts.id
                        }, {
                            "$set": _record
                        }, function (err) {

                            if (!err) {
                                res.sendStatus(200)
                            } else {

                                res.sendStatus(500)
                            }
                        })
                    }
                })
            }
        } else {
            res.sendStatus(403);
        }

    });

});

router.post("/fbpartners/deleteproducts", function (req, res) {
    drvalidate(req, res, function (err, _session) {
        if (!err) {
            var _cproducts = req.body.products;

            fbproducts.remove({
                'tenant_id': _session.tenant_id,
                'id': _cproducts.id
            }, function (err, doc) {
                if (!err) {
                    res.sendStatus(200);
                } else {
                    res.sendStatus(500)
                }
            });
        } else {
            res.sendStatus(403);
        }
    });
});


//-------------------products end---------
//-----------------------productstwo start----------------------------
router.post("/fbpartners/createproductstwo", function (req, res) {
    drvalidate(req, res, function (err, _session) {

        if (!err) {
            var _cproductstwo = req.body.productstwo;

            var _newproducts = new fbproductstwo({
                id: guidGenerator(),
                tenant_id: _session.tenant_id,
                bankname: _session.bank,
                Name: _cproductstwo.Name,
                Manufacturer: _cproductstwo.Manufacturer,

                Code: _cproductstwo.Code,
                Price_min: _cproductstwo.Price_min,
                Price_max: _cproductstwo.Price_max,
                Type: _cproductstwo.Type,
                Category: _cproductstwo.Category,
                Subcategory: _cproductstwo.Subcategory,
                Tags: _cproductstwo.Tags,
                logopath: _cproductstwo.logopath,
                createddate: new Date(),
                lstupdateddate: new Date(),
                status: 1
            })

            _newproducts.save(function (err) {
                if (!err) {
                    res.sendStatus(200)
                } else {
                    res.sendStatus(500)
                }
            });
        } else {
            res.sendStatus(403);
        }

    });
});

//----------------taskSuresh Start-------------------

//--Create Product-------
router.post("/fbpartners/createNewProduct", function (req, res) {
    drvalidate(req, res, function (err, _session) {
console.log(_session);
        if (!err) {
            var prod = req.body.product;
        var _newproducts = new taskSuresh({
            id: prod.id,
            tenant_id: _session.tenant_id,
            Bank_Name: _session.bank,
            Name: prod.Name,
            Type: prod.Type,
            Start_Date: prod.Start_Date,
            End_Date: prod.End_Date,
            Summary: prod.Summary,
            Task_Owner: prod.Task_Owner,
        })
        _newproducts.save(function (err) {
                if (!err) {
                    res.sendStatus(200)
                } else {
                    res.sendStatus(500)
                }
            });
        } else {
            res.sendStatus(403);
        }
    });
});

//-----get Product-----------------
router.get("/fbpartners/getNewProduct", function (req, res, next) {
    new drvalidate(req, res, function (err, _session) {
        if (!err) {
            taskSuresh.find({
                tenant_id: _session.tenant_id,
                Bank_Name: _session.bank,
            }, {
                id: 1,
                Name: 1,
                Type: 1,
                Start_Date: 1,
                End_Date: 1,
                Summary: 1,
                Task_Owner: 1,
            }).exec(function (err, docs) {
                if (err) {
                    re.sendStatus(500);
                } else {
                    res.send(docs);
                }  
            });
        } else {
            res.sendStatus(403);
        }
    });
});

//details
// router.get("/fbpartners/newProductDetails", function (req, res) {
//     var id = req.query.keyid;

//     new drvalidate(req, res, function (err, _session) {
//         if (!err) {
//             taskSuresh.findOne({
//                 tenant_id: _session.tenant_id,
//                 'id': id
//             }).exec(
//                 function (err, docs) {
//                     if (!err) {
//                         res.sendrack/framework/apps/fbpartners/js/fbpartnersUI.js(docs);
//                     } else {
//                         res.sendStatus(500);
//                     }
//                 });
//         } else {
//             res.sendStatus(403);
//         }
//     });
// });

//save
// router.post("/fbpartners/savecsvNewProduct", function (req, res) {
//     drvalidate(req, res, function (err, _session) {
//         if (!err) {
//             var filename = req.body.filename;

//             if (filename) {
//                 var producttwo = path.join('./fbpartners/', _session.bank, 'productstwo', filename);
//                 let stream = fs.createReadStream(producttwo);
//                 let csvData = [];
//                 let csvStream = fastcsv.parse().on("data", function (data) {
//                     csvData.push({
//                         id: guidGenerator(),
//                         tenant_id: _session.tenant_id,
//                         bankname: _session.bank,
//                         Name: data[0],
//                         Manufacturer: data[1],
//                         Code: data[2],
//                         Price_min: data[3],
//                         Price_max: data[4],
//                         Type: data[5],
//                         Category: data[6],
//                         Subcategory: data[7],
//                         Tags: data[8],
//                         logopath: data[9],
//                         createddate: new Date(),
//                         lstupdateddate: new Date(),
//                         status: 1,
//                         proddocstwo: []
//                     });
//                 }).on("end", function () {
//                     csvData.shift(); // remove the first line: header
//                     if (Array.isArray(csvData) && csvData.length > 0) {
//                         var arrcount = 0;
//                         var start = 0;
//                         var lengthofdata = 100;
//                         var arrlength = csvData.length / lengthofdata;

//                         arrlength = round(arrlength, 1);

//                         for (let i = 0; i <= arrlength - 1; i++) {
//                             var result = csvData.slice(start, start + lengthofdata).map(_data => {
//                                 return _data;
//                             });
//                             fbproductstwo.insertMany(result, function (err, doc) {
//                                 if (err) {
//                                     res.send(err);
//                                 } else {
//                                     arrcount++;
//                                     if (arrlength == arrcount) {
//                                         res.sendStatus(200);
//                                     }
//                                 }
//                             });
//                             start = start + lengthofdata;
//                         }

//                     } else {
//                         res.send('Empty Data is Present');
//                     }
//                 });
//                 stream.pipe(csvStream);
//             } else {
//                 res.sendStatus(500);
//             }
//         } else {
//             res.sendStatus(403);
//         }
//     });
// });

//---------------------taskSuresh End---------------------

router.post("/fbpartners/updateproductstwo", function (req, res) {

    drvalidate(req, res, function (err, _session) {

        if (!err) {
            var _cproductstwo = req.body.productstwo;
            // console.log(_cproductstwo);
            var _record = {};

            _record['Name'] = _cproductstwo.Name;
            _record['Manufacturer'] = _cproductstwo.Manufacturer;

            _record['Code'] = _cproductstwo.Code;
            _record['Price_min'] = _cproductstwo.Price_min;
            _record['Price_max'] = _cproductstwo.Price_max;
            _record['Type'] = _cproductstwo.Type;
            _record['Category'] = _cproductstwo.Category;
            _record['Subcategory'] = _cproductstwo.Subcategory;
            _record['Tags'] = _cproductstwo.Tags;

            _record['logopath'] = _cproductstwo.logopath;
            _record['lstupdateddate'] = new Date();
            _record['status'] = 1;

            if (_cproductstwo.docpath == undefined) {

                fbproductstwo.update({
                    'tenant_id': _session.tenant_id,
                    'id': _cproductstwo.id
                }, {
                    "$set": _record
                }, function (err) {

                    if (!err) {
                        res.sendStatus(200)
                    } else {

                        res.sendStatus(500)
                    }
                })
            } else {
                updateproddocstwo(_cproductstwo, _session.tenant_id, _session.bank, _cproductstwo.id, function (err) {
                    if (err) {
                        res.sendStatus(500)
                    } else {
                        fbproductstwo.update({
                            'tenant_id': _session.tenant_id,
                            'id': _cproductstwo.id
                        }, {
                            "$set": _record
                        }, function (err) {

                            if (!err) {
                                res.sendStatus(200)
                            } else {

                                res.sendStatus(500)
                            }
                        })
                    }
                })
            }
        } else {
            res.sendStatus(403);
        }

    });

});

router.post("/fbpartners/deleteproductstwo", function (req, res) {
    drvalidate(req, res, function (err, _session) {
        if (!err) {
            var _cproductstwo = req.body.productstwo;

            fbproductstwo.remove({
                'tenant_id': _session.tenant_id,
                'id': _cproductstwo.id
            }, function (err, doc) {
                if (!err) {
                    res.sendStatus(200);
                } else {
                    res.sendStatus(500)
                }
            });
        } else {
            res.sendStatus(403);
        }
    });
});
router.get("/fbpartners/getproductstwo", function (req, res, next) {
    new drvalidate(req, res, function (err, _session) {
        if (!err) {
            fbproductstwo.find({
                tenant_id: _session.tenant_id
            }, {
                Name: 1,
                Manufacturer: 1,
                Code: 1,
                Price_min: 1,
                Price_max: 1,
                id: 1,
                Type: 1,
                Category: 1,
                Subcategory: 1,
                Tags: 1,
                logopath: 1
            }).exec(function (err, docs) {
                if (err) {
                    re.sendStatus(500);
                } else {
                    res.send(docs);
                }
            });
        } else {
            res.sendStatus(403);
        }
    });
});
router.get("/fbpartners/productdetailstwo", function (req, res) {
    var id = req.query.keyid;

    new drvalidate(req, res, function (err, _session) {
        if (!err) {
            fbproductstwo.findOne({
                tenant_id: _session.tenant_id,
                'id': id
            }).exec(
                function (err, docs) {
                    if (!err) {
                        res.send(docs);
                    } else {
                        res.sendStatus(500);
                    }
                });
        } else {
            res.sendStatus(403);
        }
    });

});
function updateproddocstwo(_cproductstwo, tenant_id, bank, _cproductstwoid, fn) {
    var _record = {};

    var _doc = [];
    var _cdoc = {};
    // console.log(_cproductstwoid);
    _cdoc['docname'] = _cproductstwo.docname;
    _cdoc['docpath'] = _cproductstwo.docpath;
    _doc.push(_cdoc);
    // console.log(_cdoc);
    _record['proddocstwo'] = _doc;
    fbproductstwo.update({
        'tenant_id': tenant_id,
        'id': _cproductstwoid
    }, {
        "$push": _record
    }, function (err) {

        if (err) {
            fn(err)
        } else {
            fn(null)
        }
    })

}
router.post('/fbpartners/createnewdoc_productstwo', function (req, res) {
    new drvalidate(req, res, function (err, _session) {
        if (!err) {
            var _cdoc = {};
            let doc = req.body.doc;
            // console.log(doc.docname);
            // _cdoc['id'] = guidGenerator();
            _cdoc['docname'] = doc.docname;
            _cdoc['docpath'] = doc.docpath;
            fbproductstwo.update({ 'id': req.query.keyid, tenant_id: _session.tenant_id }, {
                "$push": { 'proddocstwo': _cdoc }
            }, function (err) {
                if (err) {
                    console.log(err);
                    res.send(err)
                } else {
                    res.send(_cdoc);
                }
            });
        } else {
            res.sendStatus(403)
        }
    });
});

//------------------------ productstwo end---------------------------

//------------------services start----------
router.get("/fbpartners/getservices", function (req, res) {

    new drvalidate(req, res, function (err, _session) {
        if (!err) {
            fbpartners.findOne({
                _id: _session.tenant_id,
                bankname: _session.bank
            }, {
                services: 1
            }).exec(
                function (err, docs) {
                    if (!err) {
                        var reviewer = [];

                        docs.services.forEach(function (ele) {

                            reviewer.push({
                                'Name': ele.Name,
                                'SerialNumber': ele.SerialNumber,
                                'Manufacturer': ele.Manufacturer,
                                'id': ele.id,
                                'Description': ele.Description,
                                'ContactPerson': ele.ContactPerson,
                                'Price': ele.Price,
                            })

                        })
                        res.send(reviewer);
                    } else {
                        res.sendStatus(500);
                    }
                });
        } else {
            res.sendStatus(403);
        }
    });

});

router.get("/fbpartners/servicedetails", function (req, res) {
    var id = req.query.keyid;

    new drvalidate(req, res, function (err, _session) {
        if (!err) {
            fbpartners.find({
                _id: _session.tenant_id,
                bankname: _session.bank,
                'services.id': id
            }, {
                'services.$': 1
            }).exec(
                function (err, docs) {
                    if (!err) {
                        var reviewer = [];

                        docs[0].services.forEach(function (ele) {

                            reviewer.push({
                                'Name': ele.Name,
                                'SerialNumber': ele.SerialNumber,
                                'Manufacturer': ele.Manufacturer,
                                'id': ele.id,
                                'Description': ele.Description,
                                'ContactPerson': ele.ContactPerson,
                                'Price': ele.Price,
                            })


                        })
                        res.send(reviewer);
                    } else {
                        res.sendStatus(500);
                    }
                });
        } else {
            res.sendStatus(403);
        }
    });

});

router.post("/fbpartners/createservice", function (req, res) {
    drvalidate(req, res, function (err, _session) {

        if (!err) {
            var _bname = _session.bank;
            var _cservices = req.body.services;
            var _record = {};
            _record['id'] = _cservices.id;
            _record['Name'] = _cservices.Name;
            _record['Price'] = _cservices.Price;
            _record['SerialNumber'] = _cservices.SerialNumber;
            _record['Manufacturer'] = _cservices.Manufacturer;
            _record['Description'] = _cservices.Description;
            _record['ContactPerson'] = _cservices.ContactPerson;

            _record['status'] = 1;


            fbpartners.update({
                '_id': _session.tenant_id,
                bankname: _bname
            }, {
                "$push": {
                    'services': _record
                }
            }, function (err) {

                if (!err) {
                    var result = {};
                    result.Result = "OK";
                    result.Record = _record;
                    res.json(result);

                } else {
                    res.sendStatus(500)
                }
            })
        } else {
            res.sendStatus(403);
        }

    });
});


router.post("/fbpartners/updateservices", function (req, res) {

    drvalidate(req, res, function (err, _session) {

        if (!err) {
            var _cservices = req.body.services;
            var _record = {};
            _record['services.$.Name'] = _cservices.Name;
            _record['services.$.Price'] = _cservices.Price;
            _record['services.$.SerialNumber'] = _cservices.SerialNumber;
            _record['services.$.Manufacturer'] = _cservices.Manufacturer;
            _record['services.$.Description'] = _cservices.Description;
            _record['services.$.ContactPerson'] = _cservices.ContactPerson;
            _record['services.$.status'] = 1;


            fbpartners.update({
                '_id': _session.tenant_id,
                bankname: _session.bank,
                'services.id': _cservices.id
            }, {
                "$set": _record
            }, function (err) {

                if (!err) {
                    var result = {};
                    result.Result = "OK";
                    result.Record = _record;
                    res.json(result);
                } else {

                    res.sendStatus(500)
                }
            })
        } else {
            res.sendStatus(403);
        }

    });

});

router.post("/fbpartners/deleteservices", function (req, res) {
    drvalidate(req, res, function (err, _session) {

        if (!err) {
            var _cservices = req.body.services;
            var _record = {};
            _record['services.$.id'] = _cservices.id;



            fbpartners.findOneAndUpdate({
                '_id': _session.tenant_id,
                bankname: _session.bank,
                'services.id': _cservices.id
            }, {
                $pull: {
                    leads: {
                        id: _record['services.$.id']
                    }
                }
            }, {
                new: true
            },
                function (err, doc) {
                    if (!err) {
                        var obj = {};
                        obj.Result = "OK"

                        res.json(obj)
                    } else {
                        res.sendStatus(500)
                    }
                });
        } else {
            res.sendStatus(403);
        }

    });

});
//-------------------serbvices end----------
//-----------------------bulk  upload  companys start -----
function checksavecsvcompany(result, companys, _session, fn) {
    fbcompany.find({
        tenant_id: _session.tenant_id,
        name: {
            $in: companys
        }
    }, (err, doc) => {
        if (err) {
            fn(err)
        } else {
            var pushcompany = [];
            if (doc.length > 0) {
                var pushdata = [];
                doc.forEach(function (el) {
                    pushdata.push(el.name)
                });

                var company = [...new Set(result.filter(x => !pushdata.includes(x.name)))];
                // var company = result.filter((d) => !pushdata.includes(d.name));

                if (company.length == 0) {
                    fn(null);
                } else {
                    company.forEach(function (el) {
                        var record = {};
                        record['tenant_id'] = el.tenant_id;
                        record['bankname'] = el.bank;
                        record['id'] = el.id;
                        record['name'] = el.name;
                        record['email'] = el.email;
                        record['phone'] = el.phone;
                        record['workphone'] = el.workphone;
                        record['website'] = el.website;
                        record['Address'] = el.Address;
                        record['contact'] = el.contact;
                        record['city'] = el.city;
                        record['createddate'] = new Date();
                        record['lstupdateddate'] = new Date();
                        record['status'] = 1;
                        pushcompany.push(record);
                    });

                    createbulkcompany(pushcompany, _session, function (err) {
                        if (!err) {
                            fn(null);
                        } else {
                            fn(err)
                        }
                    });

                }
            } else {
                result.forEach(function (el) {
                    var record = {};
                    record['tenant_id'] = el.tenant_id;
                    record['bankname'] = el.bank;
                    record['id'] = el.id;
                    record['name'] = el.name;
                    record['email'] = el.email;
                    record['phone'] = el.phone;
                    record['workphone'] = el.workphone;
                    record['website'] = el.website;
                    record['Address'] = el.Address;
                    record['contact'] = el.contact;
                    record['city'] = el.city;
                    record['createddate'] = new Date();
                    record['lstupdateddate'] = new Date();
                    record['status'] = 1;
                    pushcompany.push(record);
                });
                createbulkcompany(pushcompany, _session, function (err) {
                    if (!err) {
                        fn(null)
                    } else {
                        fn(err)
                    }
                })
            }
        }
    });
}
router.post("/fbpartners/savecsvcompany", function (req, res) {
    drvalidate(req, res, function (err, _session) {
        if (!err) {
            var file_name = req.body.filename;
            if (file_name) {
                var product = path.join('./fbpartners/', _session.bank, 'companys', file_name);
                let stream = fs.createReadStream(product);
                let csvData = [];
                let csvStream = fastcsv.parse().on("data", function (data) {
                    csvData.push({
                        id: guidGenerator(),
                        tenant_id: _session.tenant_id,
                        bankname: _session.bank,
                        name: data[0],
                        email: data[1],
                        phone: data[2],
                        workphone: data[3],
                        website: data[4],
                        Address: data[5],
                        contact: data[6],
                        city: data[7],
                        createddate: new Date(),
                        lstupdateddate: new Date(),
                        status: 1
                    });
                }).on("end", function () {
                    csvData.shift(); // remove the first line: header
                    var newcompany = csvData.filter((v, i, a) => a.findIndex(t => (t.name == v.name)) === i);

                    if (Array.isArray(newcompany) && newcompany.length > 0) {
                        var companys = [];
                        csvData.forEach(function (e) {
                            companys.push(e.name)
                        });
                        var company = [...new Set(companys)];

                        var arrcount = 0;
                        var start = 0;
                        var lengthofdata = 100;
                        var arrlength = csvData.length / lengthofdata;

                        arrlength = round(arrlength, 1);

                        for (let i = 0; i <= arrlength - 1; i++) {
                            var result = csvData.slice(start, start + lengthofdata).map(_data => {
                                return _data;
                            });
                            checksavecsvcompany(result, company, _session, function (err) {
                                if (err) {
                                    res.send(err);
                                } else {
                                    arrcount++;
                                    if (arrlength == arrcount) {
                                        res.sendStatus(200);
                                    }
                                }
                            });
                            start = start + lengthofdata;
                        }
                    } else {
                        res.send('Empty Data is Present');
                    }
                });
                stream.pipe(csvStream);

            } else {
                res.sendStatus(500);
            }
        } else {
            res.sendStatus(403);
        }
    });
});
function round(val, multiplesOf) {
    var s = 1 / multiplesOf;
    var res = Math.ceil(val * s) / s;
    res = res < val ? res + multiplesOf : res;
    var afterZero = multiplesOf.toString().split(".")[1];
    return parseFloat(res.toFixed(afterZero ? afterZero.length : 0));
}
//----------------------bulk upload companys end----------
router.get("/fbpartners/companydetails", function (req, res) {
    new drvalidate(req, res, function (err, _session) {
        if (!err) {
            var id = req.query.keyid;
            fbcompany.findOne({
                'tenant_id': _session.tenant_id,
                'id': id,
                'status': 1
            }).exec(
                function (err, docs) {
                    if (!err) {
                        res.send(docs);
                    } else {

                        res.sendStatus(500);
                    }
                });
        } else {
            res.sendStatus(403);
        }
    });
});
router.get("/fbpartners/getcontactcompany", function (req, res) {
    new drvalidate(req, res, function (err, _session) {
        if (!err) {
            var name = req.query.name;
            fbcompany.find({
                'tenant_id': _session.tenant_id,
                'name': name
            }).exec(
                function (err, docs) {
                    if (!err) {
                        res.send(docs);
                    } else {

                        res.sendStatus(500);
                    }
                });
        } else {
            res.sendStatus(403);
        }
    });
});

router.get("/fbpartners/contactsdetails", function (req, res) {
    new drvalidate(req, res, function (err, _session) {
        if (!err) {
            var id = req.query.keyid;
            fbcontacts.findOne({
                'id': id,
                'tenant_id': _session.tenant_id
            }).exec(
                function (err, docs) {
                    if (!err) {
                        res.send(docs);
                    } else {
                        res.sendStatus(500);
                    }
                });
        } else {
            res.sendStatus(403);
        }
    });
});
router.get("/fbpartners/bindcontactsdetails", function (req, res) {
    new drvalidate(req, res, function (err, _session) {
        if (!err) {
            var number = req.query.number;
            fbcontacts.findOne({
                'phone': number,
                'tenant_id': _session.tenant_id
            }).exec(
                function (err, docs) {
                    if (!err) {
                        res.send(docs);
                    } else {
                        res.sendStatus(500);
                    }
                });
        } else {
            res.sendStatus(403);
        }
    });
});
//---------------bulk upload contacts start---------------------

router.post("/fbpartners/savecsvcontact", function (req, res) {
    drvalidate(req, res, function (err, _session) {
        if (!err) {
            var file_name = req.body.filename;

            if (file_name) {
                var contacts = path.join('./fbpartners/', _session.bank, 'contacts', file_name);
                let stream = fs.createReadStream(contacts);
                let csvData = [];

                let csvStream = fastcsv.parse().on("data", function (data) {
                    csvData.push({
                        id: guidGenerator(),
                        tenant_id: _session.tenant_id,
                        bankname: _session.bank,
                        name: data[0],
                        email: data[1],
                        phone: data[2],
                        city: data[3],
                        Address: data[4],
                        company: data[5],
                        position: data[6],
                        logopath: data[7],
                        createddate: new Date(),
                        lstupdateddate: new Date(),
                        status: 1
                    });
                }).on("end", function () {
                    csvData.shift(); // remove the first line: header
                    if (Array.isArray(csvData) && csvData.length > 0) {
                        var companys = [];
                        csvData.forEach(function (e) {
                            companys.push(e.company)
                        });
                        var company = [...new Set(companys)];
                        checkandcreatecompanys(company, _session, function (err) {
                            if (!err) {
                                var arrcount = 0;
                                var start = 0;
                                var lengthofdata = 100;
                                var arrlength = csvData.length / lengthofdata;

                                arrlength = round(arrlength, 1);

                                for (let i = 0; i <= arrlength - 1; i++) {

                                    var result = csvData.slice(start, start + lengthofdata).map(_data => {
                                        return _data;
                                    });



                                    checkandcreatecontacts(result, _session, function (err) {
                                        if (!err) {

                                            arrcount++;
                                            if (arrlength == arrcount) {
                                                res.sendStatus(200);
                                            }
                                        } else {
                                            res.sendStatus(500);
                                        }
                                    })
                                    start = start + lengthofdata;
                                }

                            } else {
                                res.sendStatus(500);
                            }
                        });

                    } else {
                        res.send('Empty Data is Present');
                    }
                });
                stream.pipe(csvStream);
            } else {
                res.sendStatus(500);
            }
        } else {
            res.sendStatus(403);
        }
    });
});

function checkandcreatecompanys(companys, _session, fn) {
    fbcompany.find({
        tenant_id: _session.tenant_id,
        name: {
            $in: companys
        }
    }, (err, doc) => {
        if (err) {
            fn(err)
        } else {
            var pushcompany = [];
            if (doc.length > 0) {
                var pushdata = [];
                doc.forEach(function (el) {
                    pushdata.push(el.name)
                });

                var company = [...new Set(companys.filter(x => !pushdata.includes(x)))];

                if (company.length == 0) {
                    fn(null);
                } else {
                    company.forEach(function (el) {
                        var record = {};
                        record['tenant_id'] = _session.tenant_id;
                        record['bankname'] = _session.bank;
                        record['id'] = guidGenerator();
                        record['name'] = el;
                        record['email'] = '';
                        record['phone'] = '';
                        record['workphone'] = '';
                        record['website'] = '';
                        record['Address'] = '';
                        record['contact'] = '';
                        record['city'] = '';
                        record['createddate'] = new Date();
                        record['lstupdateddate'] = new Date();
                        record['status'] = 1;
                        pushcompany.push(record);
                    });

                    createbulkcompany(pushcompany, _session, function (err) {
                        if (!err) {
                            fn(null);
                        } else {
                            fn(err)
                        }
                    });
                }
            } else {
                companys.forEach(function (el) {
                    var record = {};
                    record['tenant_id'] = _session.tenant_id;
                    record['bankname'] = _session.bank;
                    record['id'] = guidGenerator();
                    record['name'] = el;
                    record['email'] = '';
                    record['phone'] = '';
                    record['workphone'] = '';
                    record['website'] = '';
                    record['Address'] = '';
                    record['contact'] = '';
                    record['city'] = '';
                    record['createddate'] = new Date();
                    record['lstupdateddate'] = new Date();
                    record['status'] = 1;
                    pushcompany.push(record);
                });
                createbulkcompany(pushcompany, _session, function (err) {
                    if (!err) {
                        fn(null)
                    } else {
                        fn(err)
                    }
                })
            }
        }
    });
}

function createbulkcompany(pushcompany, _session, fn) {
    fbcompany.collection.insertMany(pushcompany, function (err, doc) {
        if (!err) {
            fn(null);
        } else {
            fn(err)
        }
    });
}

function checkandcreatecontacts(contacts, _session, fn) {
    var contactemail = [];
    var contactphone = [];
    contacts.forEach(function (el) {
        contactemail.push(el.email)
        contactphone.push(el.phone)
    });

    fbcontacts.find({
        tenant_id: _session.tenant_id,
        $or: [{
            'email': {
                $in: contactemail
            }
        }, {
            'phone': {
                $in: contactphone
            }
        }]
    }).exec(function (err, doc) {
        if (!err) {
            var pushcontacts = [];

            if (doc.length > 0) {
                contacts.forEach(function (el) {
                    if (doc.filter(x => x.email == el.email || x.phone == el.phone)) { } else {
                        pushcontacts.push(el);
                    }
                });

                if (pushcontacts.length == 0) {
                    fn(null)
                } else {
                    createbulkcontact(pushcontacts, _session, function () {
                        if (!err) {
                            fn(null)
                        } else {
                            fn(err)
                        }
                    })
                }
            } else {
                var contact = contacts.filter((v, i, a) => a.findIndex(t => (t.email === v.email || t.phone == v.phone)) === i);
                createbulkcontact(contact, _session, function () {
                    if (!err) {
                        fn(null);
                    } else {
                        fn(err)
                    }
                });
            }
        } else {
            fn(err);
        }
    });
}

function createbulkcontact(contacts, _session, fn) {
    fbcontacts.collection.insertMany(contacts, function (err, doc) {
        if (!err) {
            fn(null);
        } else {
            fn(err);
        }
    });
}

//-----------------bulk upload contacts end------------------
router.post("/fbpartners/createcompany", function (req, res) {
    drvalidate(req, res, function (err, _session) {

        if (!err) {
            var _ccompany = req.body.company;

            fbcompany.findOne({
                $or: [{
                    'name': {
                        $eq: _ccompany.cname
                    }
                }, {
                    'email': {
                        $eq: _ccompany.email
                    }
                }, {
                    'phone': {
                        $eq: _ccompany.phone
                    }
                }]
            }, function (err, doc) {
                if (!err) {
                    if (doc) {
                        if (doc.name == _ccompany.cname) {
                            res.send('Name is already Exist')
                        }
                        if (doc.email == _ccompany.email) {
                            res.send('Email is already Exist')
                        }
                        if (doc.phone == _ccompany.phone) {
                            res.send('Phone Number is already Exist')
                        }
                    } else {
                        var newcompany = new fbcompany({
                            id: guidGenerator(),
                            tenant_id: _session.tenant_id,
                            bankname: _session.bank,
                            name: _ccompany.cname,
                            entitytype: _ccompany.entitytype,
                            email: _ccompany.email,
                            phone: _ccompany.phone,
                            workphone: _ccompany.workphone,
                            tagNames: _ccompany.tagNames,
                            website: _ccompany.website,
                            Address: _ccompany.Address,
                            contact: _ccompany.contact,
                            city: _ccompany.city,
                            createddate: new Date(),
                            lstupdateddate: new Date(),
                            Assigned: _ccompany.Assigned,
                            AssignedEmail: _ccompany.AssignedEmail,
                            AssignedId: _ccompany.AssignedId,
                            team: _ccompany.team,
                            teamId: _ccompany.teamId,
                            status: 1
                        });
                        newcompany.save(function (err) {
                            if (!err) {
                                res.sendStatus(200);
                            } else {
                                res.sendStatus(500);
                            }
                        });

                    }
                }
            });
        } else {
            res.sendStatus(403);
        }

    });
});
function getteamdetailsbyemail(_session, fn) {
    if (_session.role === 'SM') {
        getteamidbyuser(_session, function (err, doc) {
            if (!err) {
                fn(null, doc)
            } else {
                fn(err, null)
            }

        });
    } else {
        fbteams.findOne({ managerEmail: _session.email, issales: 1 }, { teamname: 1, id: 1 }).exec(function (err, doc) {
            if (!err) {
                var docs = {}
                docs['team'] = doc.teamname
                docs['teamId'] = doc.id
                fn(null, docs)
            } else {
                fn(err, null)
            }

        })

    }

}
function getteamidbyuser(_session, fn) {
    var query = fbusers.findone({ 'email': _session.email, tenant_id: _session.tenant_id }, { teamId: 1, team: 1 })
    query.exec(function (err, docs) {
        if (!err) {

            fn(null, docs)
        }
        else {
            fn(err, null)
        }
    })

}

router.post("/fbpartners/createtestcompany", function (req, res) {
    drvalidate(req, res, function (err, _session) {

        if (!err) {
            var _bname = _session.bank;
            var _ccompany = req.body.company;
            var _record = {};
            var stakeholders = [];
            //var scompany = [];
            _record['id'] = _ccompany.id;
            _record['cname'] = _ccompany.cname;
            _record['email'] = _ccompany.email;
            _record['phone'] = _ccompany.phone;
            _record['workphone'] = _ccompany.workphone;
            _record['website'] = _ccompany.website;
            _record['Address'] = _ccompany.Address;
            _record['contact'] = _ccompany.contact;
            _record['city'] = _ccompany.city;
            _record['createddate'] = new Date();
            _record['lstupdateddate'] = new Date();
            _record['status'] = 1;


            fbpartners.update({
                '_id': _session.tenant_id,
                bankname: _bname
            }, {
                "$push": {
                    'companys': _record
                }
            }, function (err) {

                if (!err) {
                    // var result = {};
                    // result.Result = "OK";
                    // result.Record = _record;
                    // res.json(result);
                    if (_session.bank === "Finbot") {

                        getmyfindetails(_session.tenant_id, _session.bank, _session.email, function (err, details) {

                            details['cid'] = _ccompany.id;
                            details['cname'] = _ccompany.cname;

                            createfincompanystakeholders(details, _session, stakeholders, function () {

                                fbpartners.update({
                                    '_id': _session.tenant_id,
                                    bankname: _bname
                                }, {
                                    "$push": {
                                        'companystakeholders': stakeholders
                                    }
                                }, function (err) {

                                    if (!err) {
                                        var result = {};
                                        result.Result = "OK";
                                        result.Record = _record;
                                        res.json(result);
                                    } else {
                                        res.sendStatus(500)
                                    }
                                })


                            })

                        });
                    }
                    else {
                        getmydetails(_session.tenant_id, _session.bank, _session.email, function (err, details) {

                            details['cid'] = _ccompany.id;
                            details['cname'] = _ccompany.cname;

                            createcompanystakeholders(details, _session, stakeholders, function () {

                                fbpartners.update({
                                    '_id': _session.tenant_id,
                                    bankname: _bname
                                }, {
                                    "$push": {
                                        'companystakeholders': stakeholders
                                    }
                                }, function (err) {

                                    if (!err) {
                                        var result = {};
                                        result.Result = "OK";
                                        result.Record = _record;
                                        res.json(result);
                                    } else {
                                        res.sendStatus(500)
                                    }
                                })


                            })

                        });
                    }
                } else {
                    res.sendStatus(500)
                }
            })
        } else {
            res.sendStatus(403);
        }

    });
});

function createcompanystakeholders(details, _session, stakeholders, fn) {



    //stakeholders.push({owner:_cleads.Assigned,ownerEmail:_cleads.AssignedEmail})
    fbpartners.find({ _id: _session.tenant_id, bankname: _session.bank, 'users.id': details.userid }, { 'users.$': 1 }).exec(
        function (err, docs) {

            if (!err) {

                // var reviewer = [];

                if (docs[0].users[0].managerId == undefined || docs[0].users[0].managerId === '') {
                    stakeholders.push({ id: guidGenerator(), stakeholderId: docs[0].users[0].id, stakeholdername: docs[0].users[0].uname, stakeholderEmail: docs[0].users[0].email, stakeholderrole: docs[0].users[0].role, logopath: docs[0].users[0].logopath, company: details.cname, companyId: details.cid })
                    fn(stakeholders)

                }
                else {

                    stakeholders.push({ id: guidGenerator(), stakeholderId: docs[0].users[0].id, stakeholdername: docs[0].users[0].uname, stakeholderEmail: docs[0].users[0].email, stakeholderrole: docs[0].users[0].role, logopath: docs[0].users[0].logopath, company: details.cname, companyId: details.cid })
                    fbpartners.find({ _id: _session.tenant_id, bankname: _session.bank, 'users.id': docs[0].users[0].managerId }, { 'users.$': 1 }).exec(
                        function (err, docs) {
                            if (!err) {

                                if (docs[0].users[0].managerId == undefined || docs[0].users[0].managerId === '') {
                                    if (docs[0].users[0].role !== 'admin') {
                                        stakeholders.push({ id: guidGenerator(), stakeholderId: docs[0].users[0].id, stakeholdername: docs[0].users[0].uname, stakeholderEmail: docs[0].users[0].email, stakeholderrole: docs[0].users[0].role, logopath: docs[0].users[0].logopath, company: details.cname, companyId: details.cid })
                                    } else {

                                        fn(stakeholders)
                                    }

                                }
                                else {

                                    if (docs[0].users[0].role !== 'admin') {
                                        stakeholders.push({ id: guidGenerator(), stakeholderId: docs[0].users[0].id, stakeholdername: docs[0].users[0].uname, stakeholderEmail: docs[0].users[0].email, stakeholderrole: docs[0].users[0].role, logopath: docs[0].users[0].logopath, company: details.cname, companyId: details.cid })
                                    }
                                    else {
                                        fn(stakeholders)
                                    }


                                    fbpartners.find({ _id: _session.tenant_id, bankname: _session.bank, 'users.id': docs[0].users[0].managerId }, { 'users.$': 1 }).exec(
                                        function (err, docs) {
                                            if (!err) {


                                                if (docs[0].users[0].managerId == undefined || docs[0].users[0].managerId === '') {
                                                    if (docs[0].users[0].role !== 'admin') {
                                                        stakeholders.push({ id: guidGenerator(), stakeholderId: docs[0].users[0].id, stakeholdername: docs[0].users[0].uname, stakeholderEmail: docs[0].users[0].email, stakeholderrole: docs[0].users[0].role, logopath: docs[0].users[0].logopath, company: details.cname, companyId: details.cid })
                                                        fn(stakeholders)
                                                    } else {
                                                        fn(stakeholders)
                                                    }

                                                }
                                                else {


                                                    if (docs[0].users[0].role !== 'admin') {
                                                        stakeholders.push({ id: guidGenerator(), stakeholderId: docs[0].users[0].id, stakeholdername: docs[0].users[0].uname, stakeholderEmail: docs[0].users[0].email, stakeholderrole: docs[0].users[0].role, logopath: docs[0].users[0].logopath, company: details.cname, companyId: details.cid })
                                                    } else {
                                                        fn(stakeholders)
                                                    }

                                                    fbpartners.find({ _id: _session.tenant_id, bankname: _session.bank, 'users.id': docs[0].users[0].managerId }, { 'users.$': 1 }).exec(
                                                        function (err, docs) {
                                                            if (!err) {

                                                                if (docs[0].users[0].managerId == undefined && docs[0].users[0].managerId === '') {
                                                                    if (docs[0].users[0].role !== 'admin') {
                                                                        stakeholders.push({ id: guidGenerator(), stakeholderId: docs[0].users[0].id, stakeholdername: docs[0].users[0].uname, stakeholderEmail: docs[0].users[0].email, stakeholderrole: docs[0].users[0].role, logopath: docs[0].users[0].logopath, company: details.cname, companyId: details.cid })
                                                                        fn(stakeholders)
                                                                    } else {
                                                                        fn(stakeholders)
                                                                    }

                                                                }
                                                                else {


                                                                    if (docs[0].users[0].role !== 'admin') {
                                                                        stakeholders.push({ id: guidGenerator(), stakeholderId: docs[0].users[0].id, stakeholdername: docs[0].users[0].uname, stakeholderEmail: docs[0].users[0].email, stakeholderrole: docs[0].users[0].role, logopath: docs[0].users[0].logopath, company: details.cname, companyId: details.cid })
                                                                        fn(stakeholders);
                                                                    }
                                                                    else {
                                                                        fn(stakeholders)
                                                                    }





                                                                }

                                                            }
                                                            else {
                                                                fn(err)

                                                            }
                                                        })


                                                }


                                            }
                                            else {
                                                fn(err)
                                            }
                                        })



                                }
                                //fn(stakeholders)

                            }
                            else {

                                fn(err)
                            }
                        })

                }



                //fn(stakeholders);
            }
            else {

                fn(err)
            }
        });

}
function createfincompanystakeholders(details, _session, stakeholders, fn) {

    fbpartners.find({ _id: _session.tenant_id, bankname: _session.bank, 'financeusers.id': details.userid }, { 'financeusers.$': 1 }).exec(
        function (err, docs) {

            if (!err) {

                // var reviewer = [];
                if (docs[0].financeusers[0].managerId == undefined || docs[0].financeusers[0].managerId === '') {
                    stakeholders.push({ id: guidGenerator(), stakeholderId: docs[0].financeusers[0].id, stakeholdername: docs[0].financeusers[0].uname, stakeholderEmail: docs[0].financeusers[0].email, stakeholderrole: docs[0].financeusers[0].role, logopath: docs[0].financeusers[0].logopath, company: _cteam.teamname, companyId: _cteam.id })
                    fn(stakeholders)

                }
                else {
                    //stakeholders.push({manager:docs[0].financeusers[0].manager,managerEmail:docs[0].financeusers[0].managerEmail})
                    stakeholders.push({ id: guidGenerator(), stakeholderId: docs[0].financeusers[0].id, stakeholdername: docs[0].financeusers[0].uname, stakeholderEmail: docs[0].financeusers[0].email, stakeholderrole: docs[0].financeusers[0].role, logopath: docs[0].financeusers[0].logopath, company: details.cname, companyId: details.cid })
                    fbpartners.find({ _id: _session.tenant_id, bankname: _session.bank, 'financeusers.id': docs[0].financeusers[0].managerId }, { 'financeusers.$': 1 }).exec(
                        function (err, docs) {
                            if (!err) {
                                if (docs[0].financeusers[0].managerId == undefined || docs[0].financeusers[0].managerId === '') {
                                    if (docs[0].financeusers[0].role !== 'FinancialAdmin') {
                                        stakeholders.push({ id: guidGenerator(), stakeholderId: docs[0].financeusers[0].id, stakeholdername: docs[0].financeusers[0].uname, stakeholderEmail: docs[0].financeusers[0].email, stakeholderrole: docs[0].financeusers[0].role, logopath: docs[0].financeusers[0].logopath, company: details.cname, companyId: details.cid })
                                    } else {
                                        fn(stakeholders)
                                    }

                                }
                                else {

                                    if (docs[0].financeusers[0].role !== 'FinancialAdmin') {
                                        stakeholders.push({ id: guidGenerator(), stakeholderId: docs[0].financeusers[0].id, stakeholdername: docs[0].financeusers[0].uname, stakeholderEmail: docs[0].financeusers[0].email, stakeholderrole: docs[0].financeusers[0].role, logopath: docs[0].financeusers[0].logopath, company: details.cname, companyId: details.cid })

                                    }
                                    else {
                                        fn(stakeholders)
                                    }

                                    fbpartners.find({ _id: _session.tenant_id, bankname: _session.bank, 'financeusers.id': docs[0].financeusers[0].managerId }, { 'financeusers.$': 1 }).exec(
                                        function (err, docs) {
                                            if (!err) {

                                                if (docs[0].financeusers[0].managerId == undefined || docs[0].financeusers[0].managerId === '') {
                                                    if (docs[0].financeusers[0].role !== 'FinancialAdmin') {
                                                        stakeholders.push({ id: guidGenerator(), stakeholderId: docs[0].financeusers[0].id, stakeholdername: docs[0].financeusers[0].uname, stakeholderEmail: docs[0].financeusers[0].email, stakeholderrole: docs[0].financeusers[0].role, logopath: docs[0].financeusers[0].logopath, company: details.cname, companyId: details.cid })
                                                        fn(stakeholders)
                                                    } else {
                                                        fn(stakeholders)
                                                    }

                                                }
                                                else {



                                                    if (docs[0].financeusers[0].role !== 'FinancialAdmin') {
                                                        stakeholders.push({ id: guidGenerator(), stakeholderId: docs[0].financeusers[0].id, stakeholdername: docs[0].financeusers[0].uname, stakeholderEmail: docs[0].financeusers[0].email, stakeholderrole: docs[0].financeusers[0].role, logopath: docs[0].financeusers[0].logopath, company: details.cname, companyId: details.cid })
                                                    }
                                                    else {
                                                        fn(stakeholders)
                                                    }
                                                    fbpartners.find({ _id: _session.tenant_id, bankname: _session.bank, 'financeusers.id': docs[0].financeusers[0].managerId }, { 'financeusers.$': 1 }).exec(
                                                        function (err, docs) {
                                                            if (!err) {
                                                                if (docs[0].financeusers[0].managerId == undefined && docs[0].financeusers[0].managerId === '') {
                                                                    if (docs[0].financeusers[0].role !== 'FinancialAdmin') {
                                                                        stakeholders.push({ id: guidGenerator(), stakeholderId: docs[0].financeusers[0].id, stakeholdername: docs[0].financeusers[0].uname, stakeholderEmail: docs[0].financeusers[0].email, stakeholderrole: docs[0].financeusers[0].role, logopath: docs[0].financeusers[0].logopath, company: details.cname, companyId: details.cid })
                                                                        fn(stakeholders)
                                                                    } else {
                                                                        fn(stakeholders)
                                                                    }

                                                                }
                                                                else {

                                                                    if (docs[0].financeusers[0].role !== 'FinancialAdmin') {

                                                                        stakeholders.push({ id: guidGenerator(), stakeholderId: docs[0].financeusers[0].id, stakeholdername: docs[0].financeusers[0].uname, stakeholderEmail: docs[0].financeusers[0].email, stakeholderrole: docs[0].financeusers[0].role, logopath: docs[0].financeusers[0].logopath, company: details.cname, companyId: details.cid })
                                                                    }
                                                                    else {
                                                                        fn(stakeholders)
                                                                    }
                                                                    fbpartners.find({ _id: _session.tenant_id, bankname: _session.bank, 'financeusers.id': docs[0].financeusers[0].managerId }, { 'financeusers.$': 1 }).exec(
                                                                        function (err, docs) {
                                                                            if (!err) {
                                                                                if (docs[0].financeusers[0].managerId == undefined && docs[0].financeusers[0].managerId === '') {
                                                                                    if (docs[0].financeusers[0].role !== 'FinancialAdmin') {
                                                                                        stakeholders.push({ id: guidGenerator(), stakeholderId: docs[0].financeusers[0].id, stakeholdername: docs[0].financeusers[0].uname, stakeholderEmail: docs[0].financeusers[0].email, stakeholderrole: docs[0].financeusers[0].role, logopath: docs[0].financeusers[0].logopath, company: details.cname, companyId: details.cid })
                                                                                        // stakeholders.push({CXO:docs[0].financeusers[0].uname,CXOEmail:docs[0].financeusers[0].email})
                                                                                        fn(stakeholders)
                                                                                    }
                                                                                    else {
                                                                                        fn(stakeholders)
                                                                                    }

                                                                                }
                                                                                else {

                                                                                    if (docs[0].financeusers[0].role !== 'FinancialAdmin') {
                                                                                        stakeholders.push({ id: guidGenerator(), stakeholderId: docs[0].financeusers[0].id, stakeholdername: docs[0].financeusers[0].uname, stakeholderEmail: docs[0].financeusers[0].email, stakeholderrole: docs[0].financeusers[0].role, logopath: docs[0].financeusers[0].logopath, company: details.cname, companyId: details.cid })
                                                                                        fn(stakeholders)
                                                                                    } else {
                                                                                        fn(stakeholders)
                                                                                    }

                                                                                }

                                                                            } else {
                                                                                fn(err)

                                                                            }
                                                                        })


                                                                }

                                                            }
                                                            else {
                                                                fn(err)

                                                            }
                                                        })


                                                }


                                            }
                                            else {
                                                fn(err)
                                            }
                                        })



                                }


                            }
                            else {

                                fn(err)
                            }
                        })

                }


                // docs[0].financeusers.forEach(function (ele) {

                //     reviewer.push({ 'email': ele.email, 'name': ele.uname, 'id': ele.id, 'city': ele.city, 'role': ele.role, 'phone': ele.phone, 'logopath': ele.logopath, 'manager': ele.manager, 'band': ele.band, 'bandId': ele.bandId, 'salary': ele.salary, 'monthlytarget': ele.monthlytarget, 'quaterlytarget': ele.quaterlytarget, 'team': ele.team })


                // }
                // )
                // fn(stakeholders);
            }
            else {

                fn(err)
            }
        });

}

function gettenantleadstages(_session, fn) {
    fbpartners.findOne({
        _id: _session.tenant_id,
        bankname: _session.bank
    }, {
        leadstages: 1
    }).exec(
        function (err, docs) {
            if (!err) {
                var reviewer = [];

                docs.leadstages.forEach(function (ele) {

                    reviewer.push({

                        'stagename': ele.stagename,
                        'id': ele.id,
                        "nextleadstages": ele.nextleadstages,
                        "nextleadstagesid": ele.nextleadstagesid,
                        "loanform": ele.loanform,
                        "loanformid": ele.loanformid,
                        'description': ele.description,
                        'maxtime': ele.maxtime,
                        'loanformstatus': ele.loanformstatus || 0,
                        'nextleadtatus': ele.nextleadtatus || 0
                    })

                })

                fn(err, reviewer);
            } else {
                fn(err, null)
            }
        });


}









router.post("/fbpartners/createleadstages", function (req, res) {
    drvalidate(req, res, function (err, _session) {

        if (!err) {
            var _bname = _session.bank;
            var _cleadstage = req.body.leadstage;

            var _record = {};
            _record['id'] = _cleadstage.id;
            _record['stagename'] = _cleadstage.stagename;
            _record['description'] = _cleadstage.description;
            gettenantleadstages(_session, function (err, stages) {
                if (!err) {
                    var stagelength = stages.length - 2;

                    stages.splice(stagelength, 0, _record);



                    fbpartners.update({
                        '_id': _session.tenant_id,
                        bankname: _bname
                    }, {
                        "$set": {
                            'leadstages': stages
                        }
                    }, function (err) {

                        if (!err) {
                            var result = {};
                            result.Result = "OK";
                            result.Record = _record;
                            res.json(result);
                        } else {
                            res.sendStatus(500)
                        }
                    })
                } else {
                    res.sendStatus(500)
                }
            })
        } else {
            res.sendStatus(403);
        }

    });
});
function getRandom(length) {

    return Math.floor(Math.pow(10, length - 1) + Math.random() * 9 * Math.pow(10, length - 1));

}

router.post("/fbpartners/updatenextleadstages", function (req, res) {
    drvalidate(req, res, function (err, _session) {

        if (!err) {
            var _cleadstage = req.body.leadstage;
            fbpartners.update({ _id: _session.tenant_id, 'leadstages.id': req.query.keyid }, {
                "$set": {
                    "leadstages.$.nextleadstages": _cleadstage.nextleadstages,
                    "leadstages.$.nextleadstagesid": _cleadstage.nextleadstagesid,
                    "leadstages.$.nextleadtatus": _cleadstage.nextleadtatus
                }
            }).exec(function (err, result) {
                if (!err) {
                    var result = {};
                    result.Result = "OK";
                    res.json(result);
                } else {
                    res.sendStatus(500)
                }
            })
        } else {
            res.sendStatus(403);
        }
    })
})
router.post("/fbpartners/updateloanformleadstages", function (req, res) {
    drvalidate(req, res, function (err, _session) {

        if (!err) {
            var _cleadstage = req.body.leadstage;
            fbpartners.update({ _id: _session.tenant_id, 'leadstages.id': req.query.keyid }, {
                "$set": {
                    "leadstages.$.loanform": _cleadstage.LoanType, "leadstages.$.loanformid": _cleadstage.LoanTypeid,
                    "leadstages.$.loanformstatus": _cleadstage.loanformstatus
                }
            }).exec(function (err, result) {
                if (!err) {
                    var result = {};
                    result.Result = "OK";
                    res.json(result);
                } else {
                    res.sendStatus(500)
                }
            })
        } else {
            res.sendStatus(403);
        }
    })
})
router.get("/fbpartners/dummycompany", function (req, res) {
    drvalidate(req, res, function (err, _session) {
        var i = 1;

        if (!err) {
            var _Record = [];
            var _bname = _session.bank;

            for (i = 1; i < 10001; i++) {
                var _record = {};
                _record['id'] = guidGenerator();
                _record['cname'] = 'company' + i;
                _record['email'] = 'companyemail' + i + '@finbot.in';
                _record['phone'] = getRandom(10).toString();
                _record['workphone'] = getRandom(10).toString();
                _record['Address'] = 'Address' + i;
                _record['contact'] = 'contact' + i;
                _record['createddate'] = new Date();
                _record['lstupdateddate'] = new Date();
                _record['city'] = 'city' + i;
                _record['status'] = 1;
                _Record.push(_record);
            }

            fbcompany.insertMany(_Record, function (err) {
                if (!err) {
                    var result = {};
                    result.Result = "OK";
                    result.Record = _record;
                    res.json(result);
                } else {
                    res.sendStatus(500)
                }
            })
        } else {
            res.sendStatus(403);
        }

    });
});

router.post("/fbpartners/updatecompany", function (req, res) {
    drvalidate(req, res, function (err, _session) {
        if (!err) {
            var _ccompany = req.body.company;
            var _record = {};

            _record['entitytype'] = _ccompany.entitytype;
            _record['email'] = _ccompany.email;
            _record['phone'] = _ccompany.phone;
            _record['workphone'] = _ccompany.workphone;
            _record['website'] = _ccompany.website;
            _record['Address'] = _ccompany.Address;
            _record['contact'] = _ccompany.contact;
            _record['city'] = _ccompany.city;
            _record['tagNames'] = _ccompany.tagNames;
            _record['Assigned'] = _ccompany.Assigned;
            _record['AssignedEmail'] = _ccompany.AssignedEmail;
            _record['AssignedId'] = _ccompany.AssignedId;
            _record['team'] = _ccompany.team;
            _record['teamId'] = _ccompany.teamId;
            _record['lstupdateddate'] = new Date();


            fbcompany.update({
                'tenant_id': _session.tenant_id,
                'id': _ccompany.id
            }, {
                "$set": _record
            }, function (err) {
                if (!err) {
                    res.sendStatus(200);
                    // res.send(_record)
                } else {
                    res.sendStatus(500);
                }
            });


        } else {
            res.sendStatus(403);
        }

    });

});


router.post("/fbpartners/deletecompany", function (req, res) {
    drvalidate(req, res, function (err, _session) {
        if (!err) {
            var _ccompany = req.body.company;
            fbcompany.remove({
                'tenant_id': _session.tenant_id,
                'id': _ccompany.id
            }, function (err, doc) {
                if (!err) {
                    res.sendStatus(200);
                } else {
                    res.sendStatus(500);
                }
            });
        } else {
            res.sendStatus(403);
        }
    });
});
router.post("/fbpartners/deleteleadstage", function (req, res) {
    drvalidate(req, res, function (err, _session) {

        if (!err) {
            var _cleadstage = req.body.leadstage;
            var _record = {};
            _record['leadstages.$.id'] = _cleadstage.id;



            fbpartners.findOneAndUpdate({
                '_id': _session.tenant_id,
                bankname: _session.bank,
                'leadstages.id': _cleadstage.id
            }, {
                $pull: {
                    leadstages: {
                        id: _record['leadstages.$.id']
                    }
                }
            }, {
                new: true
            },
                function (err, doc) {
                    if (!err) {
                        var obj = {};
                        obj.Result = "OK"

                        res.json(obj)
                    } else {
                        res.sendStatus(500)
                    }
                });
        } else {
            res.sendStatus(403);
        }

    });

});
router.post("/fbpartners/createcontact", function (req, res) {
    drvalidate(req, res, function (err, _session) {
        if (!err) {
            var _ccontact = req.body.contact;
            fbcontacts.findOne({
                $or: [{
                    'email': {
                        $eq: _ccontact.email
                    }
                }, {
                    'phone': {
                        $eq: _ccontact.phone
                    }
                }]
            }, function (err, doc) {
                if (!err) {
                    if (doc) {
                        res.send('Contact  Exist');
                    } else {

                        var newcontact = new fbcontacts({
                            id: guidGenerator(),
                            tenant_id: _session.tenant_id,
                            bankname: _session.bank,
                            name: _ccontact.cname,
                            email: _ccontact.email,
                            phone: _ccontact.phone,
                            city: _ccontact.city,
                            Address: _ccontact.Address,
                            tagNames: _ccontact.tagNames,
                            company: _ccontact.company,
                            position: _ccontact.position,
                            logopath: _ccontact.logopath,
                            createddate: new Date(),
                            lstupdateddate: new Date(),
                            Assigned: _ccontact.Assigned,
                            AssignedEmail: _ccontact.AssignedEmail,
                            AssignedId: _ccontact.AssignedId,
                            team: _ccontact.team,
                            teamId: _ccontact.teamId,
                            status: 1
                        })

                        newcontact.save(function (err) {
                            if (!err) {
                                res.sendStatus(200);
                            } else {
                                res.sendStatus(500);
                            }
                        });


                    }
                }
            });
        } else {
            res.sendStatus(403);
        }

    });
});
router.get("/fbpartners/dummycontact", function (req, res) {
    drvalidate(req, res, function (err, _session) {

        if (!err) {
            var _bname = _session.bank;
            var _Record = [];
            //var _ccontact = req.body.contact;
            for (i = 1; i < 10001; i++) {
                var _record = {};
                _record['id'] = guidGenerator();
                _record['name'] = 'contact' + i;
                _record['email'] = 'email' + i + '@finbot.in';
                _record['phone'] = getRandom(10).toString();
                _record['city'] = 'city' + i;
                _record['company'] = 'company' + 1;
                _record['position'] = 'position' + i;
                _record['logopath'] = '';
                _record['createddate'] = new Date();
                _record['lstupdateddate'] = new Date();
                _record['status'] = 1;
                _Record.push(_record);

            }

            fbcontacts.insertMany(_Record, function (err) {

                if (!err) {
                    var result = {};
                    result.Result = "OK";
                    result.Record = _record;
                    res.json(result);
                } else {
                    res.sendStatus(500)
                }
            })
        } else {
            res.sendStatus(403);
        }

    });
});

router.post("/fbpartners/updatecontact", function (req, res) {
    drvalidate(req, res, function (err, _session) {
        if (!err) {
            var _ccontact = req.body.contact;
            fbcontacts.findOne({
                $or: [{
                    'email': {
                        $eq: _ccontact.email
                    }
                }, {
                    'phone': {
                        $eq: _ccontact.phone
                    }
                }]
            }, function (err, doc) {
                if (!err) {
                    if (doc != null) {
                        if (doc.id == _ccontact.id) {
                            updatecontact(_ccontact, _session.tenant_id, function (err, result) {
                                if (!err) {
                                    res.sendStatus(200);
                                } else {
                                    res.sendStatus(500);
                                }
                            });
                        } else {
                            res.send('Contact  Exist');
                        }
                    } else {
                        updatecontact(_ccontact, _session.tenant_id, function (err, result) {
                            if (!err) {
                                res.sendStatus(200);
                            } else {
                                res.sendStatus(500);
                            }
                        });
                    }
                }
            });
        } else {
            res.sendStatus(403);
        }

    });

});

function updatecontact(_ccontact, tenant_id, fn) {
    var _record = {};

    _record['name'] = _ccontact.cname;
    _record['email'] = _ccontact.email;
    _record['phone'] = _ccontact.phone;
    _record['city'] = _ccontact.city;
    _record['Address'] = _ccontact.Address;
    _record['company'] = _ccontact.company;
    _record['tagNames'] = _ccontact.tagNames;
    _record['position'] = _ccontact.position;
    _record['logopath'] = _ccontact.logopath;
    _record['Assigned'] = _ccontact.Assigned,
        _record['AssignedEmail'] = _ccontact.AssignedEmail,
        _record['AssignedId'] = _ccontact.AssignedId,
        _record['team'] = _ccontact.team,
        _record['teamId'] = _ccontact.teamId,
        _record['lstupdateddate'] = new Date();
    _record['status'] = 1;


    fbcontacts.update({
        'tenant_id': tenant_id,
        'id': _ccontact.id
    }, {
        "$set": _record
    }, function (err) {
        if (!err) {
            fn(null)
        } else {
            fn(err);
        }
    });
}

router.post("/fbpartners/updatecontactid", function (req, res) {

    drvalidate(req, res, function (err, _session) {

        if (!err) {
            var _ccontact = req.body.contact;
            fbcontacts.findOne({
                $or: [{
                    'email': {
                        $eq: _ccontact.email
                    }
                }, {
                    'phone': {
                        $eq: _ccontact.phone
                    }
                }]
            }, function (err, doc) {
                if (!err) {
                    if (doc != null) {
                        if (doc.id == _ccontact.id) {
                            updatecontact(_ccontact, _session.tenant_id, function (err, result) {
                                if (!err) {
                                    res.sendStatus(200);
                                } else {
                                    res.sendStatus(500);
                                }
                            });
                        } else {
                            res.send('Contact  Exist');
                        }
                    } else {
                        updatecontact(_ccontact, _session.tenant_id, function (err, result) {
                            if (!err) {
                                res.sendStatus(200);
                            } else {
                                res.sendStatus(500);
                            }
                        });
                    }
                }
            });
        } else {
            res.sendStatus(403);
        }

    });

});

router.post("/fbpartners/deletecontact", function (req, res) {
    drvalidate(req, res, function (err, _session) {

        if (!err) {
            var _ccontact = req.body.contact;

            fbcontacts.findOne({
                'tenant_id': _session.tenant_id,
                'id': _ccontact.id
            }, {
                id: 1,
                logopath: 1
            },
                function (err, doc) {
                    if (!err) {
                        if ((doc.logopath != null) && (doc.logopath != "")) {
                            var new_location = path.join(app.root, 'rack/static/');

                            fs.unlink(new_location + doc.logopath, function (err) {
                                if (err) { }
                            });
                        }
                        fbcontacts.remove({
                            tenant_id: _session.tenant_id,
                            'id': doc.id,
                        }, function (err, doc) {
                            if (!err) {
                                res.sendStatus(200);
                            } else {
                                res.sendStatus(500)
                            }
                        });
                    } else {
                        res.sendStatus(500)
                    }
                });
        } else {
            res.sendStatus(403);
        }

    });
});

router.get("/fbpartners/getusers", function (req, res) {

    new drvalidate(req, res, function (err, _session) {
        if (!err) {
            fbusers.find({
                tenant_id: _session.tenant_id,
                bankname: _session.bank,
                role: { $nin: ['CT', 'CTM', 'Banker'] }
            }, {
                'email': 1, 'name': 1, 'id': 1, 'city': 1, 'role': 1, 'phone': 1, 'logopath': 1, 'date': 1, 'manager': 1, 'band': 1, 'bandId': 1, 'salary': 1, 'expenses': 1, 'monthlytarget': 1, 'quaterlytarget': 1, "team": 1, "teamId": 1, 'createddate': 1, 'joiningdate': 1
            }).exec(
                function (err, docs) {
                    if (!err) {

                        res.send(docs);
                    } else {

                        res.sendStatus(500);
                    }
                });
        } else {
            res.sendStatus(403);
        }
    });

});
router.get("/fbpartners/getExtusers", function (req, res) {

    new drvalidate(req, res, function (err, _session) {
        if (!err) {
            fbusers.find({
                tenant_id: _session.tenant_id,
                bankname: _session.bank,
                role: { $in: ['CT', 'CTM', 'Banker'] }
            }, {
                'email': 1, 'name': 1, 'id': 1, 'city': 1, 'role': 1, 'phone': 1, 'logopath': 1, 'date': 1, 'manager': 1, 'band': 1, 'bandId': 1, 'salary': 1, 'expenses': 1, 'monthlytarget': 1, 'quaterlytarget': 1, "team": 1, "teamId": 1, 'createddate': 1, 'joiningdate': 1
            }).exec(
                function (err, docs) {
                    if (!err) {

                        res.send(docs);
                    } else {

                        res.sendStatus(500);
                    }
                });
        } else {
            res.sendStatus(403);
        }
    });

});
router.get("/fbpartners/getallusers", function (req, res) {
    new drvalidate(req, res, function (err, _session) {
        if (!err) {
            fbusers.find({
                tenant_id: _session.tenant_id,
                bankname: _session.bank,
                role: {
                    $nin: ['admin', 'FinancialAdmin']
                }
            }, {
                'email': 1,
                'name': 1,
                'id': 1,
                'city': 1,
                'role': 1,
                'phone': 1,
                'logopath': 1,
                'date': 1,
                'manager': 1,
                'band': 1,
                'bandId': 1,
                'salary': 1,
                'expenses': 1,
                'monthlytarget': 1,
                'quaterlytarget': 1,
                "team": 1,
                "teamId": 1,
                'createddate': 1
            }).exec(
                function (err, docs) {
                    if (!err) {
                        res.send(docs);
                    } else {
                        res.sendStatus(500);
                    }
                });
        } else {
            res.sendStatus(403);
        }
    });
});

router.get("/fbpartners/bindleadfinAssignedusers", function (req, res) {

    new drvalidate(req, res, function (err, _session) {
        if (!err) {
            var roles = ['CT', 'CTM']

            if (roles.includes(_session.role)) {
                getmydetails(_session.tenant_id, _session.bank, _session.email, function (err, details) {
                    if (!err) {
                        fbusers.find({
                            tenant_id: _session.tenant_id,
                            connectorcode: details.connectorcode
                        }, {
                            'email': 1, 'name': 1, 'id': 1, 'city': 1, 'role': 1, 'phone': 1, 'logopath': 1, 'date': 1, 'manager': 1, 'band': 1, 'bandId': 1, 'salary': 1, 'expenses': 1, 'monthlytarget': 1, 'quaterlytarget': 1, "team": 1, "teamId": 1, 'createddate': 1
                        }).exec(
                            function (err, docs) {
                                if (!err) {
                                    var users = [];
                                    docs.forEach(function (el) {
                                        users.push({
                                            'name': el.name,
                                            'id': el.id,
                                            'email': el.email,

                                        })
                                    })
                                    res.send(users)
                                } else {
                                    res.sendStatus(500)
                                }
                            });

                    } else {
                        res.sendStatus(500)
                    }
                })
            } else {
                fbusers.find({ tenant_id: _session.tenant_id, teamId: { $nin: [null, ''] } }, {
                    'email': 1, 'name': 1, 'id': 1, 'city': 1, 'role': 1, 'phone': 1, 'logopath': 1, 'date': 1, 'manager': 1, 'band': 1, 'bandId': 1, 'salary': 1, 'expenses': 1, 'monthlytarget': 1, 'quaterlytarget': 1, "team": 1, "teamId": 1, 'createddate': 1
                }).exec(
                    function (err, docs) {
                        if (!err) {
                            var users = [];
                            var duser = [];
                            var teams = [];
                            if (docs.length > 0) {
                                docs.forEach(function (el) {
                                    duser.push({
                                        'name': el.name,
                                        'id': el.id,
                                        'email': el.email,
                                        'teamId': el.teamId,
                                    })
                                    teams.push(el.teamId)
                                })

                                checkforsalesteam(teams, _session, function (err, doc) {
                                    if (!err) {
                                        duser.forEach(function (el) {
                                            if (doc.filter(x => x.id === el.teamId).length === 1) {
                                                users.push({
                                                    'name': el.name,
                                                    'id': el.id,
                                                    'email': el.email,
                                                })

                                            }
                                        })


                                    }
                                })
                            }
                            getallteammanagers(_session, function (err, docs) {
                                if (!err) {

                                    if (docs.length > 0) {

                                        docs.forEach(function (el) {
                                            if (users.filter(x => x.id === el.managerId).length == 0) {
                                                users.push({
                                                    'name': el.manager,
                                                    'id': el.managerId,
                                                    'email': el.managerEmail,
                                                })
                                            }
                                        })

                                        res.send(users)

                                    } else {
                                        res.send(users)
                                    }

                                } else {
                                    res.sendStatus(500)
                                }
                            })
                        } else {
                            res.sendStatus(500);
                        }


                        // } else {

                        //     res.sendStatus(500);
                        // }
                    });
            }
        } else {
            res.sendStatus(403);
        }
    });

});
router.get("/fbpartners/bindusersforsm", function (req, res) {

    new drvalidate(req, res, function (err, _session) {
        if (!err) {

            var users = [];
            getallteammanagers(_session, function (err, docs) {
                if (!err) {

                    if (docs.length > 0) {

                        docs.forEach(function (el) {

                            users.push({
                                'name': el.manager,
                                'id': el.managerId,
                                'email': el.managerEmail,
                            })

                        })

                        res.send(users)

                    } else {
                        res.send(users)
                    }

                } else {
                    res.sendStatus(500)
                }
            })





        } else {
            res.sendStatus(403);
        }
    });

});
router.get("/fbpartners/getallteammembers", function (req, res) {
    var id = req.query.keyid
    new drvalidate(req, res, function (err, _session) {
        if (!err) {

            fbusers.find({
                tenant_id: _session.tenant_id,
                teamId: id
            }, {
                'email': 1, 'name': 1, 'id': 1, 'city': 1, 'role': 1, 'phone': 1, 'logopath': 1, 'date': 1, 'manager': 1, 'band': 1, 'bandId': 1, 'salary': 1, 'expenses': 1, 'monthlytarget': 1, 'quaterlytarget': 1, "team": 1, "teamId": 1, 'createddate': 1
            }).exec(
                function (err, docs) {
                    if (!err) {

                        var users = [];

                        if (docs.length > 0) {
                            docs.forEach(function (el) {
                                users.push(el.id)
                            })

                        }
                        getallteammmembers(id, _session, users, function (err, docs) {
                            if (!err) {
                                fbusers.find({
                                    tenant_id: _session.tenant_id,
                                    id: { $in: users }
                                }, {
                                    'email': 1, 'name': 1, 'id': 1, 'city': 1, 'role': 1, 'phone': 1, 'logopath': 1, 'date': 1, 'manager': 1, 'band': 1, 'bandId': 1, 'salary': 1, 'expenses': 1, 'monthlytarget': 1, 'quaterlytarget': 1, "team": 1, "teamId": 1, 'createddate': 1
                                }).exec(function (err, doc) {
                                    res.send(doc)
                                })

                            }
                            else {
                                res.sendStatus(500);
                            }

                        })
                    } else {
                        res.sendStatus(500)
                    }
                })


        } else {
            res.sendStatus(403);
        }
    });

});
function checkforsalesteam(team, _session, fn) {
    if (_session.hosttype === '1') {

        var query = fbteams.find({
            tenant_id: _session.tenant_id,
            id: { $in: team },
            teamtype: 'Sales'
        }, { teamname: 1, id: 1 })
    } else {

        var query = fbteams.find({
            tenant_id: _session.tenant_id,
            id: { $in: team },
            issales: 1
        }, { teamname: 1, id: 1 })
    }
    query.exec(
        function (err, docs) {
            if (!err) {

                fn(err, docs)
            } else {
                fn(err, null)
            }
        });
}
function getallteammanagers(_session, fn) {
    if (_session.hosttype === '1') {
        var query = fbteams.find({
            tenant_id: _session.tenant_id,
            managerId: { $nin: ['', null] },
            teamtype: 'Sales'
        }, { managerEmail: 1, managerId: 1, manager: 1 })
    } else {
        var query = fbteams.find({
            tenant_id: _session.tenant_id,
            managerId: { $nin: ['', null] },
            issales: 1
        }, { managerEmail: 1, managerId: 1, manager: 1 })
    }
    query.exec(
        function (err, docs) {
            if (!err) {
                fn(err, docs)
            } else {
                fn(err, null)
            }
        });
}

function getallteammmembers(id, _session, users, fn) {
    fbteams.findOne({
        tenant_id: _session.tenant_id,
        id: id
    }, { managerId: 1, salescoordinatorId: 1, telecallerId: 1 }).exec(
        function (err, docs) {
            if (!err) {

                users.push(docs.managerId)
                docs.salescoordinatorId.split(',').forEach(function (el) {
                    users.push(el)
                })
                docs.telecallerId.split(',').forEach(function (el) {
                    users.push(el)
                })
                fn(err, null)
            } else {
                fn(err, null)
            }
        });



}
// router.get("/fbpartners/Currentuserdetails", function (req, res) {
//     new drvalidate(req, res, function (err, _session) {
//         if (!err) {
//             fbpartners.find({
//                 _id: _session.tenant_id,
//                 bankname: _session.bank,
//                 'financeusers.email': _session.email
//             }, {
//                 'financeusers.$': 1
//             }).exec(
//                 function (err, docs) {
//                     if (!err) {
//                         var reviewer = [];

//                         docs[0].users.forEach(function (ele) {

//                             reviewer.push({
//                                 'email': ele.email,
//                                 'name': ele.uname,
//                                 'id': ele.id,
//                                 'city': ele.city,
//                                 'role': ele.role,
//                                 'phone': ele.phone,
//                                 'logopath': ele.logopath,
//                                 'manager': ele.manager,
//                                 'band': ele.band,
//                                 'bandId': ele.bandId,
//                                 'salary': ele.salary,
//                                 'monthlytarget': ele.monthlytarget,
//                                 'quaterlytarget': ele.quaterlytarget,
//                                 'team': ele.team
//                             })


//                         })
//                         res.send(reviewer);
//                     } else {

//                         res.sendStatus(500);
//                     }
//                 });
//         } else {
//             res.sendStatus(403);
//         }
//     });
// });
function getmanageremail(_session, email, fn) {
    var query = fbusers.find({ tenant_id: _session.tenant_id, 'email': email }, { 'managerEmail': 1 })
    query.exec(function (err, docs) {
        if (!err) {

            var users = docs.managerEmail

            fn(users)
        } else {

            fn(err);
        }
    });

}
router.get("/fbpartners/getmanagerusers", function (req, res) {

    new drvalidate(req, res, function (err, _session) {
        if (!err) {

            fbusers.find({
                tenant_id: _session.tenant_id,
                bankname: _session.bank,
                'managerEmail': _session.email
            }, {
                'email': 1, 'name': 1, 'id': 1, 'city': 1, 'role': 1, 'phone': 1, 'logopath': 1, 'date': 1, 'manager': 1, 'band': 1, 'bandId': 1, 'salary': 1, 'expenses': 1, 'monthlytarget': 1, 'quaterlytarget': 1, "team": 1, "teamId": 1
            })
            query.exec(
                function (err, docs) {

                    if (!err) {
                        var reviewer = [];

                        res.send(docs);
                    } else {

                        res.sendStatus(500);
                    }
                });
        } else {
            res.sendStatus(403);
        }
    });

});

router.get("/fbpartners/userdetails", function (req, res) {
    var id = req.query.keyid;

    new drvalidate(req, res, function (err, _session) {
        if (!err) {
            fbusers.find({ tenant_id: _session.tenant_id, 'id': id }, { 'pwd': 0 }).exec(
                function (err, docs) {
                    if (!err) {
                        res.send(docs);
                    } else {
                        res.sendStatus(500);
                    }
                });
        } else {
            res.sendStatus(403);
        }
    });

});

router.get("/fbpartners/Currentuserdetails", function (req, res) {
    var id = req.query.keyid;

    new drvalidate(req, res, function (err, _session) {
        if (!err) {
            fbusers.find({
                tenant_id: _session.tenant_id,

                'email': _session.email
            }, {
                'email': 1,
                'name': 1,
                'id': 1,
                'city': 1,
                'role': 1,
                'phone': 1,
                'logopath': 1,
                'manager': 1,
                'Expenses': 1,
                'band': 1,
                'bandId': 1,
                'salary': 1,
                'monthlytarget': 1,
                'quaterlytarget': 1,
                'team': 1
            }).exec(
                function (err, docs) {
                    if (!err) {

                        res.send(docs);
                    } else {

                        res.sendStatus(500);
                    }
                });
        } else {
            res.sendStatus(403);
        }
    });

});
router.get("/fbpartners/updatemainusers", function (req, res) {

    drvalidate(req, res, function (err, _session) {

        if (!err) {


            fbpartners.findOne({
                _id: _session.tenant_id,
                bankname: _session.bank
            }, {
                users: 1
            }).exec(
                function (err, docs) {
                    if (!err) {

                        nlength = 0;
                        tlength = docs.users.length;

                        docs.users.forEach(function (ele) {
                            var _fbusers = new fbusers({
                                id: ele.id,
                                bankname: _session.bank,
                                tenant_id: _session.tenant_id,
                                name: ele.uname,
                                pwd: ele.pwd,
                                role: ele.role,
                                email: ele.email,
                                phone: ele.phone,
                                city: ele.city,
                                manager: ele.manager,
                                managerId: ele.managerId,
                                managerEmail: ele.managerEmail,
                                band: ele.band,
                                bandId: ele.bandId,
                                expenses: ele.expenses,
                                team: ele.team,
                                teamId: ele.teamId,
                                hosttype: '3',
                                quaterlytarget: ele.quaterlytarget,
                                salary: ele.salary,
                                monthlytarget: ele.monthlytarget,
                                logopath: ele.logopath,
                                createddate: ele.createddate,
                                lstupdateddate: ele.lstupdateddate,
                                status: '1'

                            });
                            _fbusers.save(function (err) {

                                if (!err) {
                                    nlength++
                                    if (tlength == nlength) {
                                        res.sendStatus(200)
                                    }
                                } else {

                                    res.sendStatus(500);
                                }
                            });


                        })

                    } else {

                        res.sendStatus(500);
                    }
                });



        } else {
            res.sendStatus(403);
        }

    });
});
router.get("/fbpartners/updatemaincompany", function (req, res) {

    drvalidate(req, res, function (err, _session) {

        if (!err) {


            fbpartners.findOne({
                _id: _session.tenant_id,
                bankname: _session.bank
            }, {
                companys: 1
            }).exec(
                function (err, docs) {
                    if (!err) {

                        nlength = 0;
                        tlength = docs.companys.length;

                        docs.companys.forEach(function (ele) {
                            var _fbcompany = new fbcompany({
                                id: ele.id,
                                tenant_id: _session.tenant_id,
                                bankname: _session.bank,
                                name: ele.cname,
                                email: ele.email,
                                phone: ele.phone,
                                workphone: ele.workphone,
                                website: ele.website,
                                Address: ele.Address,
                                contact: ele.contact,
                                city: ele.city,
                                createddate: ele.createddate,
                                lstupdateddate: ele.lstupdateddate,
                                status: 1

                            });
                            _fbcompany.save(function (err) {

                                if (!err) {
                                    nlength++
                                    if (tlength == nlength) {
                                        res.sendStatus(200)
                                    }
                                } else {

                                    res.sendStatus(500);
                                }
                            });


                        })

                    } else {

                        res.sendStatus(500);
                    }
                });



        } else {
            res.sendStatus(403);
        }

    });
});
router.get("/fbpartners/updatemaincontact", function (req, res) {

    drvalidate(req, res, function (err, _session) {

        if (!err) {


            fbpartners.findOne({
                _id: _session.tenant_id,
                bankname: _session.bank
            }, {
                contacts: 1
            }).exec(
                function (err, docs) {
                    if (!err) {

                        nlength = 0;
                        tlength = docs.contacts.length;

                        docs.contacts.forEach(function (ele) {
                            var _fbcontact = new fbcontacts({
                                id: ele.id,
                                tenant_id: _session.tenant_id,
                                bankname: _session.bank,
                                name: ele.cname,
                                email: ele.email,
                                phone: ele.phone,
                                city: ele.city,
                                Address: ele.Address,
                                company: ele.company,
                                position: ele.position,
                                logopath: ele.logopath,
                                createddate: ele.createddate,
                                lstupdateddate: ele.lstupdateddate,
                                status: 1

                            });
                            _fbcontact.save(function (err) {

                                if (!err) {
                                    nlength++
                                    if (tlength == nlength) {
                                        res.sendStatus(200)
                                    }
                                } else {

                                    res.sendStatus(500);
                                }
                            });


                        })

                    } else {

                        res.sendStatus(500);
                    }
                });



        } else {
            res.sendStatus(403);
        }

    });
});
router.get("/fbpartners/updatemainproduct", function (req, res) {

    drvalidate(req, res, function (err, _session) {

        if (!err) {


            fbpartners.findOne({
                _id: _session.tenant_id,
                bankname: _session.bank
            }, {
                products: 1
            }).exec(
                function (err, docs) {
                    if (!err) {

                        nlength = 0;
                        tlength = docs.products.length;

                        docs.products.forEach(function (ele) {
                            var _fbproduct = new fbproducts({
                                id: ele.id,
                                tenant_id: _session.tenant_id,
                                bankname: _session.bank,
                                Name: ele.Name,
                                Price: ele.Price,
                                Tax: ele.Tax,
                                HSNCode: ele.HSNCode,
                                isservice: ele.isservice,
                                productowner: ele.productowner,
                                SerialNumber: ele.SerialNumber,
                                Manufacturer: ele.Manufacturer,
                                Description: ele.Description,
                                ContactPerson: ele.ContactPerson,
                                logopath: ele.logopath,
                                proddocs: ele.proddocs,
                                createddate: ele.createddate,
                                lstupdateddate: ele.lstupdateddate,
                                status: 1
                            })


                            _fbproduct.save(function (err) {

                                if (!err) {
                                    nlength++
                                    if (tlength == nlength) {
                                        res.sendStatus(200)
                                    }
                                } else {

                                    res.sendStatus(500);
                                }
                            });


                        })

                    } else {

                        res.sendStatus(500);
                    }
                });



        } else {
            res.sendStatus(403);
        }

    });
});
router.get("/fbpartners/updatemainfinusers", function (req, res) {

    drvalidate(req, res, function (err, _session) {

        if (!err) {


            fbpartners.findOne({
                _id: _session.tenant_id,
                bankname: _session.bank
            }, {
                financeusers: 1
            }).exec(
                function (err, docs) {
                    if (!err) {

                        nlength = 0;
                        tlength = docs.financeusers.length;

                        docs.financeusers.forEach(function (ele) {
                            var _fbusers = new fbusers({
                                id: ele.id,
                                name: ele.uname,
                                bankname: _session.bank,
                                tenant_id: _session.tenant_id,
                                pwd: ele.pwd,
                                role: ele.role,
                                email: ele.email,
                                phone: ele.phone,
                                city: ele.city,
                                manager: ele.manager,
                                managerId: ele.managerId,
                                managerEmail: ele.managerEmail,
                                band: ele.band,
                                bandId: ele.bandId,
                                bankcode: ele.bankcode,
                                expenses: ele.expenses,
                                team: ele.team,
                                teamId: ele.teamId,
                                hosttype: "1",
                                quaterlytarget: ele.quaterlytarget,
                                salary: ele.salary,
                                monthlytarget: ele.monthlytarget,
                                logopath: ele.logopath,
                                createddate: ele.createddate,
                                lstupdateddate: ele.lstupdateddate,
                                status: '1'

                            });
                            _fbusers.save(function (err) {

                                if (!err) {
                                    nlength++
                                    if (tlength == nlength) {
                                        res.sendStatus(200)
                                    }
                                } else {

                                    res.sendStatus(500);
                                }
                            });


                        })

                    } else {

                        res.sendStatus(500);
                    }
                });



        } else {
            res.sendStatus(403);
        }

    });
});
router.get("/fbpartners/getmonthlytarget", function (req, res) {

    new drvalidate(req, res, function (err, _session) {
        if (!err) {
            fbpartnerleads.find({
                AssignedEmail: _session.email,
                'leadstage': 'leadwon'
            }, {
                leadamount: 1,
                lstupdateddate: 1
            }).exec(
                function (err, docs) {
                    if (!err) {
                        if (docs == '') {

                            var reviewer1 = [];
                            res.send(reviewer1);

                        }
                        else {

                            var reviewer = [];
                            var currentdate = moment()
                            var currentmonth = moment().month();
                            var currentyear = moment().year();

                            docs.forEach(function (ele) {
                                var datamonth = moment(ele.lstupdateddate).month();
                                var datayear = moment(ele.lstupdateddate).year();

                                //if(currentdate.diff(moment(ele.lstupdateddate), 'month') == 0){
                                if (currentmonth == datamonth && currentyear == datayear) {
                                    reviewer.push({
                                        'leadamount': parseInt(ele.leadamount)
                                    })
                                }
                            });

                            var total = reviewer.reduce((a, b) => {
                                return {
                                    leadamount: (a.leadamount + b.leadamount)
                                };
                            });
                            res.send(total);
                        }
                    } else {

                        res.sendStatus(500);
                    }
                });

        } else {
            res.sendStatus(403);
        }
    });
});

router.get("/fbpartners/getquaterlytarget", function (req, res) {

    new drvalidate(req, res, function (err, _session) {
        if (!err) {
            fbpartnerleads.find({
                AssignedEmail: _session.email,
                'leadstage': 'leadwon'
            }, {
                leadamount: 1,
                lstupdateddate: 1
            }).exec(
                function (err, docs) {
                    if (!err) {
                        if (docs == '') {

                            var reviewer1 = [];
                            res.send(reviewer1);

                        }
                        else {
                            var reviewer = [];
                            var start = moment().startOf('quarter').toISOString();

                            var end = moment().endOf('quarter').toISOString();



                            docs.forEach(function (ele) {
                                var datadate = moment(ele.lstupdateddate)


                                //if(currentdate.diff(moment(ele.lstupdateddate), 'month') == 0){
                                if (start < datadate && end > datadate) {


                                    reviewer.push({
                                        'leadamount': parseInt(ele.leadamount)
                                    })
                                }

                            })

                            var total = reviewer.reduce((a, b) => {
                                return {
                                    leadamount: (a.leadamount + b.leadamount)
                                };
                            });
                            res.send(total);
                        }
                    } else {

                        res.sendStatus(500);
                    }
                });

        } else {
            res.sendStatus(403);
        }
    });
});

router.get("/fbpartners/getdealersmanagers", function (req, res) {

    //var role = req.query.role

    new drvalidate(req, res, function (err, _session) {
        if (!err) {



            var query = fbusers.find({
                tenant_id: _session.tenant_id,
                bankname: _session.bank,
                "role": { $ne: "SM" },
            }, {
                'email': 1, 'name': 1, 'id': 1, 'role': 1, 'manager': 1, 'band': 1
            })
            query.exec(
                function (err, docs) {
                    if (!err) {
                        var reviewer = [];
                        if (Array.isArray(docs) && docs.length) {

                            res.send(docs);
                        } else {
                            res.send("No Managers Available");
                        }
                    } else {

                        res.sendStatus(500);
                    }
                });
        } else {
            res.sendStatus(403);
        }
    });

});



// router.post("/fbpartners/createuser", function (req, res) {
//     drvalidate(req, res, function (err, _session) {

//         if (!err) {

//             var _bname = _session.bank;
//             var _cuser = req.body.user;

//             fbpartners.findOne({
//                     '_id': _session.tenant_id,
//                     bankname: _bname,
//                     'users.email': _cuser.email
//                 }, {
//                     'users.$': 1
//                 },
//                 function (err, doc) {
//                     if (doc) {

//                         res.send('email exists');
//                     } else {


//                         var _record = {};
//                         _record['id'] = _cuser.id;
//                         _record['uname'] = _cuser.uname;
//                         _record['pwd'] = _cuser.password;
//                         _record['role'] = _cuser.role;
//                         _record['email'] = _cuser.email;
//                         _record['phone'] = _cuser.phone;
//                         _record['city'] = _cuser.city;
//                         _record['manager'] = _cuser.manager;
//                         _record['managerId'] = _cuser.managerId;
//                         _record['managerEmail'] = _cuser.managerEmail;
//                         _record['band'] = _cuser.band;
//                         _record['bandId'] = _cuser.bandId;
//                         _record['expenses'] = _cuser.Expenses;
//                         _record['team'] = _cuser.team;
//                         _record['teamId'] = _cuser.teamId;
//                         _record['quaterlytarget'] = _cuser.quaterlytarget;
//                         _record['salary'] = _cuser.salary;
//                         _record['monthlytarget'] = _cuser.monthlytarget;
//                         _record['logopath'] = _cuser.logopath;
//                         _record['createddate'] = moment().format('MM/DD/YYYY');
//                         _record['lstupdateddate'] = moment().format('MM/DD/YYYY');
//                         _record['status'] = 1;


//                         fbpartners.update({
//                             '_id': _session.tenant_id,
//                             bankname: _bname
//                         }, {
//                             "$push": {
//                                 'users': _record
//                             }
//                         }, function (err) {

//                             if (!err) {

//                                 sendresetlink(_record, _session.tenant_id, _bname, req, function (err) {
//                                     if (!err) {
//                                         res.sendStatus(200)
//                                     } else {

//                                         res.sendStatus(500)
//                                     }

//                                 })
//                             } else {

//                                 res.sendStatus(500)
//                             }
//                         })
//                     }
//                 });
//         } else {
//             res.sendStatus(403);
//         }


//     });
// });
//-----------------------bulk  upload  Users start -----
// router.post("/fbpartners/saveuserscsv", function (req, res) {
//     drvalidate(req, res, function (err, _session) {
//         if (!err) {
//             var file_name = req.body.filename;
//             if (file_name) {
//                 var users = path.join('./fbpartners/', _session.bank, 'users', file_name);
//                 let stream = fs.createReadStream(users);
//                 let csvData = [];
//                 let csvStream = fastcsv.parse().on("data", function (data) {
//                     csvData.push({
//                         id: guidGenerator(),
//                         tenant_id: _session.tenant_id,
//                         bankname: _session.bank,
//                         name: data[0], //
//                       //  pwd: "forgot123$#", //default pswd
//                         role: data[1], //
//                         email: data[2], //
//                         phone: data[3], //
//                         city: '',
//                         manager: '',
//                         managerId: '',
//                         managerEmail: data[4], //emaill
//                         band: data[5], //bname
//                         bandId: '',
//                         expenses: '',
//                         team: '',
//                         teamId: '',
//                         hosttype: _session.hosttype,
//                         salary: '',
//                         monthlytarget: '',
//                         quaterlytarget: '',
//                         logopath: '',
//                         createddate: new Date(),
//                         lstupdateddate: new Date(),
//                         status: 1
//                     });
//                 }).on("end", function () {
//                     csvData.shift(); // remove the first line: header
//                     // Removing Duplicate Objects From CSVData Array
//                     var a = csvData.filter((v, i, a) => a.findIndex(t => (t.email === v.email && t.phone == v.phone)) === i);

//                     var roles = ["BH", "CXO", "NSM", "ZSM", "RSM", "ASM", "SM", "SC", "AM", "SA", "SPM", "SE", "CM", "CC", "TM", "TE"]

//                     if (Array.isArray(a) && a.length > 0) {
//                         var count = 0;
//                         var reviewer = []
//                         roles.forEach(r => {
//                             a.forEach(ele => {
//                                 if (r == (ele.role).toUpperCase()) {
//                                     checkmanager(_session.tenant_id, ele.managerEmail, reviewer, function (mdetails) {
//                                         checkband(_session.tenant_id, ele.band, function (bdetails) {
//                                             var banddetaails = {};
//                                             if (bdetails) {
//                                                 banddetaails.name = bdetails.name,
//                                                     banddetaails.id = bdetails.id,
//                                                     banddetaails.expenses = bdetails.expenses,
//                                                     banddetaails.salary = bdetails.salary
//                                             } else {
//                                                 banddetaails.name = '',
//                                                     banddetaails.id = '',
//                                                     banddetaails.expenses = '',
//                                                     banddetaails.salary = ''
//                                             }
//                                             checkedusersave(_session, ele, banddetaails, reviewer, function (res_save) {
//                                                 console.log(res_save)
//                                             });
//                                         });
//                                     });
//                                 }
//                             });
//                             count++;
//                             if (r.length == count) {
//                                 res.sendStatus(200);
//                             }
//                         });
//                     } else {
//                         res.send('Empty Data is Present');
//                     }
//                 });
//                 stream.pipe(csvStream);
//             } else {
//                 res.sendStatus(500);
//             }
//         } else {
//             res.sendStatus(403);
//         }
//     });
// });
router.post("/fbpartners/saveuserscsv", function (req, res) {
    drvalidate(req, res, function (err, _session) {
        if (!err) {
            var file_name = req.body.filename;
            if (file_name) {
                var users = path.join('./fbpartners/', _session.bank, 'users', file_name);
                let stream = fs.createReadStream(users);
                let csvData = [];
                let csvStream = fastcsv.parse().on("data", function (data) {
                    csvData.push({
                        id: guidGenerator(),
                        tenant_id: _session.tenant_id,
                        bankname: _session.bank,
                        name: data[0], //
                        //  pwd: "forgot123$#", //default pswd
                        role: data[1], //
                        email: data[2], //
                        phone: data[3], //
                        city: '',
                        manager: '',
                        managerId: '',
                        managerEmail: data[4], //emaill
                        band: data[5], //bname
                        bandId: '',
                        expenses: '',
                        team: '',
                        teamId: '',
                        hosttype: _session.hosttype,
                        salary: '',
                        monthlytarget: '',
                        quaterlytarget: '',
                        logopath: '',
                        createddate: new Date(),
                        lstupdateddate: new Date(),
                        status: 1
                    });
                }).on("end", function () {
                    csvData.shift(); // remove the first line: header
                    // Removing Duplicate Objects From CSVData Array
                    var a = csvData.filter((v, i, a) => a.findIndex(t => (t.email === v.email)) === i);

                    var roles = ["BH", "CXO", "NSM", "ZSM", "RSM", "ASM", "SM", "SC", "AM", "SA", "SPM", "SE", "CM", "CC", "TM", "TE"]

                    if (Array.isArray(a) && a.length > 0) {
                        var count = 0;
                        var reviewer = []
                        roles.forEach(r => {
                            var roleusers = a.filter(x => x.role === r)


                            a.forEach(ele => {
                                if (r == (ele.role).toUpperCase()) {
                                    checkmanager(_session.tenant_id, ele.managerEmail, reviewer, function (mdetails) {
                                        checkband(_session.tenant_id, ele.band, function (bdetails) {
                                            var banddetaails = {};
                                            if (bdetails) {
                                                banddetaails.name = bdetails.name,
                                                    banddetaails.id = bdetails.id,
                                                    banddetaails.expenses = bdetails.expenses,
                                                    banddetaails.salary = bdetails.salary
                                            } else {
                                                banddetaails.name = '',
                                                    banddetaails.id = '',
                                                    banddetaails.expenses = '',
                                                    banddetaails.salary = ''
                                            }
                                            checkedusersave(_session, ele, banddetaails, reviewer, function (res_save) {

                                            });
                                        });
                                    });
                                }
                            });
                            count++;
                            if (r.length == count) {
                                res.sendStatus(200);
                            }
                        });
                    } else {
                        res.send('Empty Data is Present');
                    }
                });
                stream.pipe(csvStream);
            } else {
                res.sendStatus(500);
            }
        } else {
            res.sendStatus(403);
        }
    });
});
function checkedusersave(_session, ele, banddetaails, reviewer, fn) {
    fbusers.findOne({
        $or: [{
            'email': {
                $eq: ele.email
            }
        }, {
            'phone': {
                $eq: ele.phone
            }
        }]
    }, function (err, doc) {
        if (!err) {
            if (doc) {
                fn('User  Exist');
            } else {
                var index = reviewer.map((o) => o.email).indexOf("ele.managerEmail");


                var manager = '',
                    managerId = '',
                    managerEmail = '',
                    team = '',
                    teamId = '';

                if (index >= 0) {
                    manager = reviewer[index].name;
                    managerId = reviewer[index].id;
                    managerEmail = reviewer[index].email;
                    team = reviewer[index].team;
                    teamId = reviewer[index].teamId;
                }
                var _fbusers = new fbusers({
                    id: ele.id,
                    bankname: _session.bank,
                    tenant_id: _session.tenant_id,
                    name: ele.name,
                    pwd: ele.pwd,
                    role: (ele.role).toUpperCase(),
                    email: ele.email,
                    phone: ele.phone,
                    city: ele.city,
                    manager: manager,
                    managerId: managerId,
                    managerEmail: managerEmail,
                    team: team,
                    teamId: teamId,
                    band: banddetaails.name,
                    bandId: banddetaails.id,
                    expenses: banddetaails.expenses,
                    salary: banddetaails.salary,
                    hosttype: ele.hosttype,
                    quaterlytarget: ele.quaterlytarget,
                    monthlytarget: ele.monthlytarget,
                    logopath: ele.logopath,
                    createddate: ele.createddate,
                    lstupdateddate: ele.lstupdateddate,
                    status: '1'
                });
                _fbusers.save(function (err, result) {
                    if (err) {
                        fn('Error - Not Saved');
                    } else {
                        reviewer.push(_fbusers);
                        fn('ok');
                    }
                });
            }
        } else {
            fn("Error Occured");
        }
    });
}

function checkmanager(tenant_id, memail, reviewer, fn) {

    fbusers.findOne({
        _id: tenant_id,
        email: memail
    }).exec(function (err, doc) {
        if (!err) {
            if (doc) {

                reviewer.push(doc);
                fn(reviewer);
            } else {

                fn(null);
            }
        } else {
            fn(null);
        }
    })
}

function checkband(tenant_id, bname, fn) {
    fbpartners.aggregate([{
        "$unwind": {
            "path": "$bands",
            "preserveNullAndEmptyArrays": false
        }
    }, {
        "$match": {
            _id: {
                $eq: mongoose.Types.ObjectId(tenant_id)
            },
            'bands.name': bname
        }
    },
    {
        "$project": {
            "_id": 0,
            "name": "$bands.name",
            "id": "$bands.id",
            "expenses": "$bands.expenselimit",
            "salary": "$bands.salary"
        }
    }
    ]).exec(function (err, doc) {
        if (!err) {
            if (Array.isArray(doc) && doc.length > 0) {
                fn(doc[0]);
            } else {
                fn(null);
            }
        } else {
            fn(null);
        }
    });
}
//----------------------bulk upload Users end----------
// -----------API KEYS Start--------------------
// createapikey
router.post('/fbpartners/createapikey', function (req, res) {
    new drvalidate(req, res, function (err, _session) {
        if (!err) {
            var _capi = req.body.apidetails;
            fbapikeys.findOne({
                $or: [{
                    // 'company': {
                    //     $eq:  _capi.company
                    // }
                    'company': {
                        $regex: _capi.company,
                        $options: '$i'
                    }
                }, {
                    'privateKey': {
                        $eq: _capi.privateKey
                    }
                }]
            }, function (err, doc) {
                if (!err) {
                    if (doc) {

                    } else {
                        var newapi = new fbapikeys({
                            id: guidGenerator(),
                            tenant_id: _session.tenant_id,
                            bankname: _session.bank,
                            company: _capi.company,
                            description: _capi.description,
                            privateKey: _capi.privateKey,
                            publicKey: _capi.publicKey,
                            startDate: _capi.startDate,
                            endDate: _capi.endDate,
                            // type: _capi.type,
                            pages: _capi.pages,
                            createddate: new Date(),
                            lstupdateddate: new Date(),
                            status: 1
                        })

                        newapi.save(function (err, result) {
                            if (err) {
                                res.send('failed')
                            } else {
                                res.sendStatus(200);
                            }
                        })
                    }
                } else {
                    res.sendStatus(500);
                }
            });
        } else {
            res.sendStatus(403)
        }
    });
});
// updateapikey
router.post('/fbpartners/updateapikey', function (req, res) {
    new drvalidate(req, res, function (err, _session) {
        if (!err) {
            if ((_session.role === 'FinancialAdmin') || (_session.role === 'admin')) {
                var _capi = req.body.apidetails;
                var _ckeyid = req.query.keyid;
                fbapikeys.findOne({
                    $or: [{
                        'company': {
                            $eq: _capi.company
                        }
                    }, {
                        'privateKey': {
                            $eq: _capi.privateKey
                        }
                    }]
                }, {
                    company: 1,
                    id: 1,
                    privateKey: 1,
                    publicKey: 1
                }, function (err, doc) {
                    if (!err) {
                        if (doc) {
                            if (doc.id == _ckeyid) {

                                updateapikey(_session, _capi, _ckeyid, function (err, result) {
                                    if (!err) {
                                        res.sendStatus(200);
                                    } else {
                                        res.sendStatus(500);
                                    }
                                })
                            } else {

                                res.send('Api Details Exist');
                            }
                        } else {
                            res.send('faied');
                        }
                    } else {
                        res.sendStatus(500);
                    }
                });
            } else {

                res.send('Not Authorized')
            }
        } else {
            res.sendStatus(403)
        }
    });
});

function updateapikey(_session, _capi, keyid, fn) {
    var record = {};
    record['company'] = _capi.company;
    record['description'] = _capi.description;
    record['privateKey'] = _capi.privateKey;
    record['publicKey'] = _capi.publicKey;
    record['startDate'] = _capi.startDate;
    record['endDate'] = _capi.endDate;
    // record['type'] = _capi.type;
    record['pages'] = _capi.pages;
    record['lstupdateddate'] = new Date();

    fbapikeys.update({
        tenant_id: _session.tenant_id,
        id: keyid
    }, {
        $set: record
    }, function (err) {
        if (!err) {
            fn(null, 'ok')
        } else {
            fn(err, null);
        }
    });
}
// deleteapikey
router.post('/fbpartners/deleteapikey', function (req, res) {
    new drvalidate(req, res, function (err, _session) {
        if (!err) {
            if ((_session.role === 'FinancialAdmin') || (_session.role === 'admin')) {

                var _keyid = req.qery.keyid;
                fbapikeys.remove({
                    tenant_id: _session.tenant_id,
                    'id': _keyid
                }, function (err, doc) {
                    if (!err) {
                        res.sendStatus(200);
                    } else {
                        res.sendStatus(500)
                    }
                });
            } else {

                res.send('Not Authorized')
            }
        } else {
            res.sendStatus(403);
        }
    })
});
//getapikeys
router.get("/fbpartners/getapikeys", function (req, res) {
    new drvalidate(req, res, (err, _session) => {
        if (!err) {
            if ((_session.role === 'FinancialAdmin') || (_session.role === 'admin')) {
                fbapikeys.find({
                    tenant_id: _session.tenant_id
                }).exec(function (err, docs) {
                    if (err) {
                        re.sendStatus(500);
                    } else {
                        res.send(docs);
                    }
                });

            } else {

                res.send('Not Authorized')
            }
        } else {
            res.sendStatus(403);
        }
    });
});
// getapikeysby
router.get("/fbpartners/getapikeysby", function (req, res) {
    new drvalidate(req, res, (err, _session) => {
        if (!err) {
            if ((_session.role === 'FinancialAdmin') || (_session.role === 'admin')) {
                fbapikeys.findOne({
                    tenant_id: _session.tenant_id,
                    id: req.query.keyid
                }).exec(function (err, docs) {
                    if (!err) {
                        res.send(docs);
                    } else {
                        res.sendStatus(500);
                    }
                });
            } else {
                res.send('Not Authorized')
            }
        } else {
            res.sendStatus(403);
        }
    });
});

//-----------------------------API KEYS end----------------------
//----------------------Ext users start----------------
router.post("/fbpartners/createExtuser", function (req, res) {
    drvalidate(req, res, async function (err, _session) {

        if (!err) {

            var _bname = _session.bank;
            var _cuser = req.body.user;

            let logopath = '';
            if (_cuser.logopath) {
                var extns = _cuser.logopath.split('.').pop().toLowerCase();
                const new_location = path.join(app.root, 'rack/static/images/fbpartners/users/');
                const pathToFile = new_location + _cuser.logopath;
                const newPathToFile = new_location + _cuser.id + '.' + extns;

                fs.rename(pathToFile, newPathToFile, function (err) {
                    if (err) {
                        console.log(err);
                        throw err
                    } else {
                        // console.log("Successfully renamed the file!");
                        logopath = _cuser.id + '.' + extns;
                        // console.log('logopath - ', logopath);
                    }
                });
            }
            await fbusers.findOne({
                tenant_id: _session.tenant_id,
                bankname: _bname,
                'email': _cuser.email
            },
                function (err, doc) {
                    if (doc) {
                        res.send('email exists');
                    } else {
                        //if(_cuser.role === "Banker"){
                        var _fbusers = new fbusers({
                            id: _cuser.id,
                            tenant_id: _session.tenant_id,
                            bankname: _bname,
                            name: _cuser.name,
                            role: _cuser.role,
                            email: _cuser.email,
                            phone: _cuser.phone,
                            city: _cuser.city,
                            manager: _cuser.manager || '',
                            managerId: _cuser.managerId || '',
                            managerEmail: _cuser.managerEmail || '',
                            band: _cuser.band || '',
                            bandId: _cuser.bandId || '',
                            expenses: _cuser.Expenses || 0,
                            team: _cuser.team || '',
                            teamId: _cuser.teamId || '',
                            quaterlytarget: _cuser.quaterlytarget || 0,
                            salary: _cuser.salary || 0,
                            hosttype: _session.hosttype,
                            monthlytarget: _cuser.monthlytarget || 0,
                            bankcode: _cuser.bankcode || '',
                            bankcodeId: _cuser.bankcodeId || '',
                            connectorcode: _cuser.connectorcode || '',
                            connectorcodeId: _cuser.connectorcodeId || '',

                            logopath: logopath,
                            createddate: new Date(),
                            lstupdateddate: new Date(),
                            status: '1'
                        });

                        // console.log(_fbusers)
                        _fbusers.save(function (err) {
                            if (!err) {
                                sendresetlink(_fbusers, _session.tenant_id, _bname, req, function (err) {
                                    if (!err) {
                                        res.sendStatus(200)
                                    } else {
                                        res.sendStatus(500)
                                    }
                                })
                            } else {
                                res.sendStatus(500)
                            }
                        })

                        // } else{
                        //   getteamdetailsbycntrcode(_cuser.connectorcodeId,function(err,doc){
                        //       if(!err){
                        //         var _fbusers = new fbusers({                        
                        //             id : _cuser.id,
                        //             tenant_id:_session.tenant_id,
                        //             bankname:_bname,
                        //             name : _cuser.name,                     
                        //             role : _cuser.role,
                        //             email : _cuser.email,
                        //             phone : _cuser.phone,
                        //             city : _cuser.city,
                        //             manager : doc.Assigned,
                        //             managerId : doc.AssignedId,
                        //             managerEmail : doc.AssignedEmail,
                        //              band : _cuser.band,
                        //             bandId : _cuser.bandId,
                        //             expenses : _cuser.Expenses,
                        //             team : doc.team,
                        //             teamId : doc.teamId,
                        //             quaterlytarget : _cuser.quaterlytarget,
                        //             salary : _cuser.salary,
                        //             hosttype:_session.hosttype,
                        //             monthlytarget : _cuser.monthlytarget,
                        //             bankcode : _cuser.bankcode,
                        //             connectorcode:_cuser.connectorcode,
                        //             connectorcodeId:_cuser.connectorcodeId,

                        //             logopath :_cuser.logopath,
                        //             createddate : moment().format('MM/DD/YYYY'),
                        //             lstupdateddate : moment().format('MM/DD/YYYY'),
                        //             status : '1'
                        //         });


                        //         _fbusers.save(function (err) {

                        //                 if (!err) {

                        //                     sendresetlink(_fbusers, _session.tenant_id, _bname, req, function (err) {
                        //                         if (!err) {
                        //                             res.sendStatus(200)
                        //                         } else {

                        //                             res.sendStatus(500)
                        //                         }

                        //                     })
                        //                 } else {

                        //                     res.sendStatus(500)
                        //                 }
                        //             })
                        //       }else{
                        //         res.sendStatus(500)
                        //       }
                        //   })
                        // }
                    }
                });
        } else {
            res.sendStatus(403);
        }
    });
});

router.post("/fbpartners/updateExtuser", function (req, res) {

    drvalidate(req, res, function (err, _session) {

        if (!err) {
            var _cuser = req.body.user;
            var _record = {};

            _record['name'] = _cuser.name;
            _record['role'] = _cuser.role;
            _record['email'] = _cuser.email;
            _record['phone'] = _cuser.phone;
            _record['city'] = _cuser.city;
            _record['bankcode'] = _cuser.bankcode;
            _record['bankcodeId'] = _cuser.bankcodeId;
            _record['connectorcode'] = _cuser.connectorcode;
            _record['connectorcodeId'] = _cuser.connectorcodeId;
            _record['lstupdateddate'] = new Date();

            var extns = _cuser.logopath.split('.').pop().toLowerCase();
            const new_location = path.join(app.root, 'rack/static/images/fbpartners/users/');
            const pathToFile = new_location + _cuser.logopath;
            const newPathToFile = new_location + _cuser.id + '.' + extns;
            if (_cuser.logopath && pathToFile != newPathToFile) {
                _record['logopath'] = _cuser.id + '.' + extns;

                fs.stat(newPathToFile, function (err, stats) {
                    if (err) {

                        fs.rename(pathToFile, newPathToFile, function (err) {
                            if (err) {

                                // res.sendStatus(500)
                                _record['logopath'] = '';
                                fbusers.update({
                                    tenant_id: _session.tenant_id,
                                    bankname: _session.bank,
                                    'id': _cuser.id
                                }, {
                                    "$set": _record
                                }, function (err) {

                                    if (!err) {
                                        res.sendStatus(200)
                                    } else {
                                        res.sendStatus(500)
                                    }
                                })
                            } else {

                                fbusers.update({
                                    tenant_id: _session.tenant_id,
                                    bankname: _session.bank,
                                    'id': _cuser.id
                                }, {
                                    "$set": _record
                                }, function (err) {

                                    if (!err) {
                                        res.sendStatus(200)
                                    } else {
                                        res.sendStatus(500)
                                    }
                                })
                            }
                        });
                    } else {

                        fs.unlink(newPathToFile, function (err) {
                            if (err) {

                                res.sendStatus(500)
                            } else {

                                fs.rename(pathToFile, newPathToFile, function (err) {
                                    if (err) {

                                        res.sendStatus(500)
                                    } else {

                                        fbusers.update({
                                            tenant_id: _session.tenant_id,
                                            bankname: _session.bank,
                                            'id': _cuser.id
                                        }, {
                                            "$set": _record
                                        }, function (err) {

                                            if (!err) {
                                                res.sendStatus(200)
                                            } else {
                                                res.sendStatus(500)
                                            }
                                        })
                                    }
                                });
                            }
                        });
                    }
                });
            } else {

                _record['logopath'] = _cuser.logopath;
                fbusers.update({
                    tenant_id: _session.tenant_id,
                    bankname: _session.bank,
                    'id': _cuser.id
                }, {
                    "$set": _record
                }, function (err) {

                    if (!err) {
                        res.sendStatus(200)
                    } else {
                        res.sendStatus(500)
                    }
                })
            }

        } else {
            res.sendStatus(403);
        }
    });
});
//---------------------Ext users End----------------------
router.post("/fbpartners/createuser", function (req, res) {
    drvalidate(req, res, async function (err, _session) {

        if (!err) {

            let _bname = _session.bank;
            let _cuser = req.body.user;
            let logopath = '';

            if (_cuser.logopath) {
                var extns = _cuser.logopath.split('.').pop().toLowerCase();
                const new_location = path.join(app.root, 'rack/static/images/fbpartners/users/');
                const pathToFile = new_location + _cuser.logopath;
                const newPathToFile = new_location + _cuser.id + '.' + extns;
                // console.log('_cuser.logopath - ', _cuser.logopath);
                fs.rename(pathToFile, newPathToFile, function (err) {
                    if (err) {
                        console.log(err);
                        throw err
                    } else {
                        // console.log("Successfully renamed the file!");
                        logopath = _cuser.id + '.' + extns;
                        // console.log('logopath - ', logopath);
                    }
                });
            }

            await fbusers.findOne({
                tenant_id: _session.tenant_id,
                bankname: _bname,
                'email': _cuser.email
            },
                function (err, doc) {
                    if (doc) {
                        res.send('email exists');
                    } else {
                        var _fbusers = new fbusers({
                            id: _cuser.id,
                            tenant_id: _session.tenant_id,
                            bankname: _bname,
                            name: _cuser.name,
                            pwd: _cuser.password,
                            role: _cuser.role,
                            email: _cuser.email,
                            phone: _cuser.phone,
                            city: _cuser.city,
                            manager: _cuser.manager,
                            managerId: _cuser.managerId,
                            managerEmail: _cuser.managerEmail,
                            band: _cuser.band,
                            bandId: _cuser.bandId,
                            expenses: _cuser.Expenses,
                            team: _cuser.team,
                            teamId: _cuser.teamId,
                            quaterlytarget: _cuser.quaterlytarget,
                            salary: _cuser.salary,
                            hosttype: _session.hosttype,
                            monthlytarget: _cuser.monthlytarget,
                            bankcode: _cuser.bankcode,
                            connectorcode: _cuser.connectorcode,
                            connectorcodeId: _cuser.connectorcodeId,
                            joiningdate: _cuser.joiningdate,
                            logopath: logopath,
                            createddate: moment().format('MM/DD/YYYY'),
                            lstupdateddate: moment().format('MM/DD/YYYY'),
                            status: '1'
                        });


                        _fbusers.save(function (err) {
                            if (!err) {
                                // res.sendStatus(200)
                                sendresetlink(_fbusers, _session.tenant_id, _bname, req, function (err) {
                                    if (!err) {
                                        res.sendStatus(200)
                                    } else {
                                        res.sendStatus(500)
                                    }
                                })
                            } else {
                                res.sendStatus(500)
                            }
                        })
                    }
                });
        } else {
            res.sendStatus(403);
        }


    });
});

function getteamdetailsbycntrcode(id, fn) {
    fbconnectors.findOne({ _id: id }, { Assigned: 1, AssignedEmail: 1, AssignedId: 1, team: 1, teamId: 1 }).exec(function (err, doc) {
        if (!err) {
            fn(null, doc)
        } else {
            fn(err, null)
        }
    })
}

router.post("/fbpartners/updateuser", function (req, res) {
    drvalidate(req, res, function (err, _session) {
        if (!err) {
            var _cuser = req.body.user;
            var _record = {};
            _record['name'] = _cuser.name;
            _record['role'] = _cuser.role;
            _record['email'] = _cuser.email;
            _record['phone'] = _cuser.phone;
            _record['city'] = _cuser.city;
            _record['manager'] = _cuser.manager;
            _record['managerId'] = _cuser.managerId;
            _record['managerEmail'] = _cuser.managerEmail;
            _record['bandId'] = _cuser.bandId;
            _record['team'] = _cuser.team;
            _record['teamId'] = _cuser.teamId;
            _record['expenses'] = _cuser.Expenses;
            _record['bankcode'] = _cuser.bankcode;
            _record['connectorcode'] = _cuser.connectorcode;
            _record['connectorcodeId'] = _cuser.connectorcodeId;
            _record['quaterlytarget'] = _cuser.quaterlytarget;
            _record['salary'] = _cuser.salary;
            _record['monthlytarget'] = _cuser.monthlytarget;
            _record['lstupdateddate'] = new Date();
            _record['joiningdate'] = _cuser.joiningdate;
            if (_cuser.logopath !== undefined) {
                var extns = _cuser.logopath.split('.').pop().toLowerCase();
            } else {
                var extns = ''
            }
            const new_location = path.join(app.root, 'rack/static/images/fbpartners/users/');
            const pathToFile = new_location + _cuser.logopath;
            const newPathToFile = new_location + _cuser.id + '.' + extns;

            if (_cuser.logopath && pathToFile != newPathToFile) {

                _record['logopath'] = _cuser.id + '.' + extns;
                fs.stat(newPathToFile, function (err, stats) {
                    if (err) {

                        fs.rename(pathToFile, newPathToFile, function (err) {
                            if (err) {

                                res.sendStatus(500)
                            } else {

                                updateuser(_cuser, _record, _session, function (data) {
                                    if (data == "OK") {
                                        res.sendStatus(200)
                                    } else {
                                        res.sendStatus(500)
                                    }
                                });
                            }
                        });
                    } else {

                        fs.unlink(newPathToFile, function (err) {
                            if (err) {

                                res.sendStatus(500)
                            } else {

                                fs.rename(pathToFile, newPathToFile, function (err) {
                                    if (err) {

                                        res.sendStatus(500)
                                    } else {
                                        // console.log('3.2.2 else')
                                        updateuser(_cuser, _record, _session, function (data) {
                                            if (data == "OK") {
                                                res.sendStatus(200)
                                            } else {
                                                res.sendStatus(500)
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
            } else {
                // console.log('4')
                _record['logopath'] = _cuser.logopath;
                updateuser(_cuser, _record, _session, function (data) {
                    if (data == "OK") {
                        res.sendStatus(200)
                    } else {
                        res.sendStatus(500)
                    }
                })
            }
        } else {
            res.sendStatus(403);
        }
    });
});

function updateuser(_cuser, _record, _session, fn) {

    fbusers.update({
        tenant_id: _session.tenant_id,
        bankname: _session.bank,
        'id': _cuser.id
    }, {
        "$set": _record
    }, function (err) {
        if (!err) {
            // fn('OK');
            var roles = ['ASM', 'RSM', 'ZSM', 'NSM']
            if (_cuser.currentmngr !== _cuser.managerId) {
                if (roles.includes(_cuser.role)) {
                    console.log('in 1');
                    replacemangerinteamstakeholders(_cuser, _session, function (err) {
                        if (!err) {

                            console.log('in 2');
                            replacemangerinleadstakeholders(_cuser, _session, function (err) {
                                if (!err) {
                                    console.log('in 3');
                                    fn('OK')
                                } else {
                                    fn(err)
                                }
                            })
                        } else {
                            fn(err)
                        }
                    })
                } else {
                    fn('OK')
                }
            } else {
                fn('OK')
            }
        } else {
            fn(err)
        }
    })
}
router.get("/fbpartners/testroute", function (req, res) {
    drvalidate(req, res, function (err, _session) {

        if (!err) {
            var pullrecord = ["bbe10af8-2da7-9cb8-3201-0e053d4c73f9", "247044fc-4285-d08a-eb55-01f7baca1514"]
            var _cuser = {};
            _cuser['email'] = 'rsm1@finbot.in'

            pullteamstakeholdersbyids(pullrecord, _cuser, function (err) {
                if (!err) {
                    res.sendStatus(200)
                } else {
                    res.sendStatus(500)
                }
            })
        } else {

        }
    });
});
router.get("/fbpartners/testroute1", function (req, res) {
    drvalidate(req, res, function (err, _session) {

        if (!err) {
            var pullrecord = [{
                "id": "61b02fed-ef8c-2eef-c788-e7bcd90d4004",
                "stakeholderId": "989a8d33-83c4-fc31-231e-1bac28e11720",
                "stakeholdername": "zsm2",
                "stakeholderEmail": "zsm2@finbot.in",
                "stakeholderrole": "ZSM",
                "phone": "9999999999",
                "team": "teamtwlve",
                "teamId": "0b2ef941-4d59-b662-2e6c-968e88ba3e0d"
            },
            {
                "id": "72f6d509-0599-4c46-5ed6-38e90e64681b",
                "stakeholderId": "077f22f0-8b6c-fae3-b80c-db1ad25b86fd",
                "stakeholdername": "nsm2",
                "stakeholderEmail": "nsm2@finbot.in",
                "stakeholderrole": "NSM",
                "phone": "9999999999",
                "team": "teamtwlve",
                "teamId": "0b2ef941-4d59-b662-2e6c-968e88ba3e0d"
            },
            {
                "id": "4b6ed79c-4430-333b-af59-dc6cee219293",
                "stakeholderId": "ff7b924f-daab-e027-7d4c-5c046db145e8",
                "stakeholdername": "cxo2",
                "stakeholderEmail": "cxo2@finbot.in",
                "stakeholderrole": "cxo",
                "phone": "9999999999",
                "team": "teamtwlve",
                "teamId": "0b2ef941-4d59-b662-2e6c-968e88ba3e0d"
            },]
            var _cuser = {};
            _cuser['email'] = 'rsm1@finbot.in'

            pushteamstakeholders(pullrecord, _cuser, function (err) {
                if (!err) {
                    res.sendStatus(200)
                } else {
                    res.sendStatus(500)
                }
            })
        } else {

        }
    });
});
router.get("/fbpartners/testroute2", function (req, res) {
    drvalidate(req, res, function (err, _session) {

        if (!err) {
            var pullrecord = ["bbe10af8-2da7-9cb8-3201-0e053d4c73f9", "247044fc-4285-d08a-eb55-01f7baca1514"]
            var _cuser = ['92551cc7-9ba2-71f1-e58d-c37470ec576c', '92551cc7-9ba2-71f1-e58d-c37470ec576c'];


            pullleadstakeholdersbyids(pullrecord, _cuser, function (err) {
                if (!err) {
                    res.sendStatus(200)
                } else {
                    res.sendStatus(500)
                }
            })
        } else {

        }
    });
});
router.get("/fbpartners/testroute3", function (req, res) {
    drvalidate(req, res, function (err, _session) {

        if (!err) {
            var pullrecord = [{
                "id": "61b02fed-ef8c-2eef-c788-e7bcd90d4004",
                "stakeholderId": "989a8d33-83c4-fc31-231e-1bac28e11720",
                "stakeholdername": "zsm2",
                "stakeholderEmail": "zsm2@finbot.in",
                "stakeholderrole": "ZSM",
                "phone": "9999999999",
                "team": "teamtwlve",
                "teamId": "0b2ef941-4d59-b662-2e6c-968e88ba3e0d"
            },
            {
                "id": "72f6d509-0599-4c46-5ed6-38e90e64681b",
                "stakeholderId": "077f22f0-8b6c-fae3-b80c-db1ad25b86fd",
                "stakeholdername": "nsm2",
                "stakeholderEmail": "nsm2@finbot.in",
                "stakeholderrole": "NSM",
                "phone": "9999999999",
                "team": "teamtwlve",
                "teamId": "0b2ef941-4d59-b662-2e6c-968e88ba3e0d"
            },
            {
                "id": "4b6ed79c-4430-333b-af59-dc6cee219293",
                "stakeholderId": "ff7b924f-daab-e027-7d4c-5c046db145e8",
                "stakeholdername": "cxo2",
                "stakeholderEmail": "cxo2@finbot.in",
                "stakeholderrole": "cxo",
                "phone": "9999999999",
                "team": "teamtwlve",
                "teamId": "0b2ef941-4d59-b662-2e6c-968e88ba3e0d"
            },]

            var _cuser = ['92551cc7-9ba2-71f1-e58d-c37470ec576c', '92551cc7-9ba2-71f1-e58d-c37470ec576c'];

            pushleadstakeholders(pullrecord, _cuser, function (err) {
                if (!err) {
                    res.sendStatus(200)
                } else {
                    res.sendStatus(500)
                }
            })
        } else {

        }
    });
});
router.get("/fbpartners/testroute4", function (req, res) {
    drvalidate(req, res, function (err, _session) {

        if (!err) {

            id = '989a8d33-83c4-fc31-231e-1bac28e11720'
            getmanagerbyid(id, _session, function (err, doc) {
                if (!err) {

                    res.send(doc)
                } else {

                }

            })
        } else {

        }
    });
});
function replacemangerinteamstakeholders(_cuser, _session, fn) {
    getstakeholdersforuser(_cuser, _session, function (err) {
        if (!err) {
            fn(null)
        } else {
            fn(err)
        }
    })

}
function replacemangerinleadstakeholders(_cuser, _session, fn) {
    getleadstakeholdersforuser(_cuser, _session, function (err) {
        if (!err) {
            fn(null)
        } else {
            fn(err)
        }
    })

}
function getteamsbystakeholders(_cuser, _session, fn) {
    var query = fbteams.find({ 'teamstakeholders.stakeholderEmail': _cuser.email, tenant_id: _session.tenant_id }, { teamname: 1, id: 1 })
    query.exec(function (err, docs) {
        if (!err) {
            var teams = [];
            docs.forEach(function (el) {
                teams.push(el.id)
            })
            fn(null, teams)
        }
        else {
            fn(err, null)
        }
    })

}
function getstakeholdersforuser(_cuser, _session, fn) {
    fbusers.findOne({ id: _cuser.currentmngr, tenant_id: _session.tenant_id }, { role: 1, id: 1, managerId: 1, name: 1, email: 1, logopath: 1, phone: 1 }, function (err, docs) {
        if (!err) {
            var stake = [];
            var pushrecord = [];
            //pushrecord.push({id:guidGenerator(),stakeholderId:docs.id,stakeholdername:docs.name,stakeholderEmail:docs.email,stakeholderrole:docs.role,phone:docs.phone,logopath:docs.logopath})
            stake.push(docs.id);
            var _user = docs
            if (_user.role !== 'BH' || _user.role !== 'CXO') {
                console.log('in 5', _user);
                getmanagerbyid(_user.managerId, _session, stake, function (err, doc) {
                    if (!err) {
                        getcurrentmanagerbyid(_cuser.managerId, _session, pushrecord, function (err, doc) {
                            if (!err) {
                                pullteamstakeholdersbyids(stake, _cuser, _session, function (err) {
                                    if (!err) {
                                        pushteamstakeholders(pushrecord, _cuser, _session, function (err) {
                                            if (!err) {
                                                fn(null)
                                            } else {
                                                fn(err)
                                            }
                                        })

                                    } else {
                                        fn(err)
                                    }

                                })
                            } else {
                                fn(err)
                            }
                        });

                    } else {

                    }

                })

            }
        }
        else {

        }
    })

}
function getleadstakeholdersforuser(_cuser, _session, fn) {
    fbusers.findOne({ id: _cuser.currentmngr, tenant_id: _session.tenant_id }, { role: 1, id: 1, managerId: 1, name: 1, email: 1, logopath: 1, phone: 1 }, function (err, docs) {
        if (!err) {
            var stake = [];
            var pushrecord = [];
            //pushrecord.push({id:guidGenerator(),stakeholderId:docs.id,stakeholdername:docs.name,stakeholderEmail:docs.email,stakeholderrole:docs.role,phone:docs.phone,logopath:docs.logopath})
            stake.push(docs.id);
            var _user = docs
            console.log('in 6', _user);
            if (_user.role !== 'BH' || _user.role !== 'CXO') {
                getmanagerbyid(_user.managerId, _session, stake, function (err, doc) {
                    if (!err) {
                        getleadcurrentmanagerbyid(_cuser.managerId, _session, pushrecord, function (err, doc) {
                            if (!err) {
                                getteamsbystakeholders(_cuser, _session, function (err, teams) {
                                    if (!err) {
                                        pullleadstakeholdersbyids(stake, teams, _session, function (err) {
                                            if (!err) {
                                                pushleadstakeholders(pushrecord, teams, _session, function (err) {
                                                    if (!err) {
                                                        fn(null)
                                                    } else {
                                                        fn(err)
                                                    }
                                                })

                                            } else {
                                                fn(err)
                                            }

                                        })
                                    } else {
                                        fn(err)
                                    }
                                })

                            } else {
                                fn(err)
                            }
                        });

                    } else {
                        fn(err)
                    }

                })

            }
        }
        else {
            fn(err)
        }
    })

}
function getmanagerbyid(id, _session, stak, fn) {

    fbusers.findOne({ id: id, tenant_id: _session.tenant_id }, { id: 1, role: 1, manager: 1, managerEmail: 1, managerId: 1, name: 1, email: 1, phone: 1, logopath: 1 }, function (err, docs) {
        if (!err) {
            console.log('14542', docs);
            //fn(err,docs)
            stak.push(docs.id)

            if (docs.role !== 'cxo' && docs.role !== "BH") {
                getmanagerbyid(docs.managerId, _session, stak, fn)
            }
            else {
                fn(null, null)
            }
        } else {

            fn(err, null)
        }
    })

}
function getcurrentmanagerbyid(id, _session, pushrecord, fn) {

    fbusers.findOne({ id: id, tenant_id: _session.tenant_id }, { id: 1, role: 1, manager: 1, managerEmail: 1, managerId: 1, name: 1, email: 1, phone: 1, logopath: 1 }, function (err, docs) {
        if (!err) {

            //fn(err,docs)

            pushrecord.push({ id: guidGenerator(), stakeholderId: docs.id, stakeholdername: docs.name, stakeholderEmail: docs.email, stakeholderrole: docs.role, phone: docs.phone, logopath: docs.logopath })
            if (docs.role !== 'cxo' && docs.role !== "BH") {

                getcurrentmanagerbyid(docs.managerId, _session, pushrecord, fn)
            }
            else {
                fn(null, null)
            }
        } else {

            fn(err, null)
        }
    })

}
function getleadcurrentmanagerbyid(id, _session, pushrecord, fn) {

    fbusers.findOne({ id: id, tenant_id: _session.tenant_id }, { id: 1, role: 1, manager: 1, managerEmail: 1, managerId: 1, name: 1, email: 1, phone: 1, logopath: 1 }, function (err, docs) {
        if (!err) {

            //fn(err,docs)

            pushrecord.push({ id: guidGenerator(), stakeholderId: docs.id, stakeholdername: docs.name, stakeholderEmail: docs.email, stakeholderrole: docs.role, phone: docs.phone, logopath: docs.logopath, isadded: 0 })
            if (docs.role !== 'cxo' && docs.role !== "BH") {

                getleadcurrentmanagerbyid(docs.managerId, _session, pushrecord, fn)
            }
            else {
                fn(null, null)
            }
        } else {

            fn(err, null)
        }
    })

}

function pullteamstakeholdersbyids(pullrecord, _cuser, _session, fn) {

    var query = fbteams.updateMany({ 'teamstakeholders.stakeholderEmail': _cuser.email, tenant_id: _session.tenant_id }, { $pull: { teamstakeholders: { stakeholderId: { $in: pullrecord } } } })
    query.exec(function (err, doc) {
        if (!err) {

            fn(null)
        }
        else {
            fn(err)
        }
    })
}
function pullleadstakeholdersbyids(pullrecord, teamid, _session, fn) {

    if (_session.hosttype === '1') {
        var query = fbleadslite.updateMany({ teamId: { $in: teamid }, leadstage: { $nin: ['order lost', 'order Won'] } }, { $pull: { stakeholders: { stakeholderId: { $in: pullrecord } } } })
    } else {
        var query = fbpartnerleads.updateMany({ teamId: { $in: teamid }, leadstage: { $nin: ['order lost', 'order Won'] } }, { $pull: { stakeholders: { stakeholderId: { $in: pullrecord } } } })
    }
    query.exec(function (err, doc) {
        if (!err) {

            fn(null)
        }
        else {
            fn(err)
        }
    })
}
function pushteamstakeholders(doc, _cuser, _session, fn) {

    var query = fbteams.updateMany({
        'teamstakeholders.stakeholderEmail': _cuser.email,
        tenant_id: _session.tenant_id
    }, {
        "$push": {
            teamstakeholders: doc
        }
    })
    query.exec(function (err) {
        if (!err) {
            fn(null)
        }
        else {
            fn(err)
        }
    })
}
function pushleadstakeholders(doc, teamid, _session, fn) {

    if (_session.hosttype === '1') {
        var query = fbleadslite.updateMany({
            teamId: { $in: teamid },
            leadstage: { $nin: ['order lost', 'order Won'] }
        }, {
            "$push": {
                stakeholders: doc
            }
        })
    } else {
        var query = fbpartnerleads.updateMany({
            teamId: { $in: teamid },
            leadstage: { $nin: ['order lost', 'order Won'] }
        }, {
            "$push": {
                stakeholders: doc
            }
        })

    }
    query.exec(function (err, doc) {
        if (!err) {

            fn(null)
        }
        else {
            fn(err)
        }
    })
}

router.post("/fbpartners/deleteuser", function (req, res) {
    drvalidate(req, res, function (err, _session) {

        if (!err) {
            var _cuser = req.body.user;
            //.log(_cuser);         
            fbusers.findOneAndRemove({ 'tenant_id': _session.tenant_id, 'id': _cuser.id },
                function (err, doc) {

                    if (!err) {

                        res.sendStatus(200);
                    } else { res.sendStatus(500) }
                });

        } else {
            res.sendStatus(403);
        }

    });

});

router.post('/fbpartners/uploadlogo', function (req, res) {
    new drvalidate(req, res, function (err, _session) {
        if (!err) {
            var form = new formidable.IncomingForm();
            form.parse(req, function (err, fields, files) {
                res.writeHead(200, {
                    'content-type': 'text/plain'
                });
            });

            form.on('end', function (fields, files) {

                var temp_path = this.openedFiles[0].path;
                /* The file name of the uploaded file */
                var file_name = _session.tenant_id + "_" + uuid.v1() + this.openedFiles[0].name;
                /* Location where we want to copy the uploaded file */
                var new_location = path.join(app.root, 'rack/static/');

                fse.copy(temp_path, new_location + file_name, function (err) {
                    if (err) {
                        res.sendStatus(500);
                    } else {


                        res.end(file_name);

                    }
                });
            });

        } else {
            res.sendStatus(403);
        }
    })
});

router.post('/fbpartners/useruploadlogo', function (req, res) {
    new drvalidate(req, res, function (err, _session) {
        if (!err) {

            var form = new formidable.IncomingForm();
            form.parse(req, function (err, fields, files) {
                res.writeHead(200, {
                    'content-type': 'text/plain'
                });
            });

            form.on('end', async function (fields, files) {
                /* Location where we want to copy the uploaded file */
                var new_location = path.join(app.root, 'rack/static/images/fbpartners/users/');

                await fse.ensureDirSync(new_location);
                var temp_path = this.openedFiles[0].path;
                /* The file name of the uploaded file */
                var file_name = _session.tenant_id + "_" + uuid.v1() + this.openedFiles[0].name;

                await fse.copy(temp_path, new_location + file_name, function (err) {
                    if (err) {
                        res.sendStatus(500);
                    } else {
                        res.end(file_name);
                    }
                });
            });
        } else {
            res.sendStatus(403);
        }
    })
});

function getpartnermenu(role, fn) {
    var menu = []


    switch (role) {
        case "ASM":
            menu = ["dashboard", "companies", "leads", "loans", "contacts", "products", "tickets", "box", "Knowledge", "offers",];
            break;
        case "SC":
            menu = ["dashboard", "companies", "leads", "loans", "contacts", "products", "tickets", "box", "Knowledge", "offers",];
            break;
        case "admin":

            menu = ["AdDashboard", "companies", "leads", "loans", "contacts", "products", "settings", "ticketslist", "box", "Knowledge", "offers"];
            break;
        case "SM":
            menu = ["dashboard", "leads", , "companies", "contacts", "products", "tickets", "box", "Knowledge", "offers",];
            break;


        case "NSM":
            menu = ["dashboard", "companies", "leads", "loans", "contacts", "products", "tickets", "box", "Knowledge", "offers",];
            break;
        case "ZSM":
            menu = ["dashboard", "companies", "leads", "loans", "contacts", "products", "tickets", "box", "Knowledge", "offers",];
            break;
        case "RSM":
            menu = ["dashboard", "companies", "leads", "loans", "contacts", "products", "tickets", "mymeeting", "Knowledge", "offers",];
            break;
        case "BH":
            menu = ["AdDashboard", "companies", "leads", "loans", "contacts", "products", "settings", "ticketslist", "box", "Knowledge", "offers"];
            break;

        case "AM":
            menu = ["loans", "ticketslist", "Knowledge", "products"];
            break;
        case "SA":
            menu = ["ticketslist", "Knowledge", "products"];
            break;
        case "SPM":
            menu = ["ticketslist", "Knowledge", "products"];
            break;
        case "SE":
            menu = ["ticketslist", "Knowledge", "products"];
            break;


        default:
            menu = ["Knowledge"];
            break;
    }
    fn(menu)
}

function getfinancemenu(role, fn) {
    var menu = []

    switch (role) {
        case "Banker":
            menu = ["myleads", "myticketslist"];
            break;
        case "FinancialAdmin":
            menu = ["MyDashboard", "financesettings", "myleads", "dealers", "ticketslist", "companies", "contacts", "products", "box", "Knowledge", "mybuckets", "mytask"];
            break;
        case "BH":
            menu = ["MyDashboard", "financesettings", "myleads", "dealers", "ticketslist", "companies", "contacts", "products", "box", "Knowledge", "mytask"];
            break;
        case "cxo":
            menu = ["MyDashboard", "myteam", "myleads", "dealers", "myticketslist", "financesettings", "companies", "contacts", "products", "box", "Knowledge"];
            break;
        case "NSM":
            menu = ["MyDashboard", "myteam", "myleads", "dealers", "myticketslist", "companies", "contacts", "products", "box", "Knowledge", "offers",];
            break;
        case "ZSM":
            menu = ["MyDashboard", "myteam", "myleads", "dealers", "myticketslist", "companies", "contacts", "products", "box", "Knowledge", "offers",];
            break;
        case "RSM":
            menu = ["MyDashboard", "myteam", "myleads", "dealers", "myticketslist", "companies", "contacts", "products", "box", "Knowledge", "offers",];
            break;
        case "ASM":
            menu = ["MyDashboard", "myteam", "myleads", "dealers", "myticketslist", "companies", "contacts", "products", "box", "Knowledge", "offers",];
            break;
        case "SC":
            menu = ["MyDashboard", "myteam", "myleads", "dealers", "myticketslist", "companies", "contacts", "products", "box", "Knowledge", "offers",];
            break;
        case "SM":
            menu = ["MyDashboard", "myleads", "dealers", "myticketslist", "companies", "contacts", "products", "box", "Knowledge", "offers"];
            break;
        case "CM":
            menu = ["MyDashboard", "myteam", "myleads", "dealers", "myticketslist", "companies", "contacts", "products", "box", "Knowledge", "offers",];
            break;
        case "CC":
            menu = ["MyDashboard", "myteam", "myleads", "dealers", "myticketslist", "companies", "contacts", "products", "box", "Knowledge", "offers",];
            break;
        case "TE":
            menu = ["telephony", "myticketslist", "Knowledge", "offers"];
            break;
        case "TM":
            menu = ["telephony", "myticketslist", "Knowledge", "offers"];
            break;
        case "CT":
            menu = ["myleads", "myticketslist", "Knowledge", "companies", "contacts", "products", "offers",];
            break;
        case "CTM":
            menu = ["myleads", "myticketslist", "Knowledge", "companies", "contacts", "products", "offers",];
            break;
        case "CCM":
            menu = ["MyDashboard", "mybuckets"];
            break;
        case "CH":
            menu = ["MyDashboard", "mybuckets"];
            break;
        case "CE":
            menu = ["MyDashboard", "mybuckets"];
            break;

        case "SA":
            menu = ["ticketslist", "Knowledge", "products"];
            break;
        case "SPM":
            menu = ["ticketslist", "Knowledge", "products"];
            break;
        case "SE":
            menu = ["ticketslist", "Knowledge", "products"];
            break;
        // case "salesExecutive":
        //     menu = ["dashboard","myleads", "dealers", "mymeeting", "myticketslist", "courses","companies","contacts","products","mytask","exam","offers"];
        //     break;

        default:
            menu = ["Knowledge"];
            break;
    }
    fn(menu)
}

function getmanufacturermenu(role, fn) {
    var menu = []
    switch (role) {
        case "ASM":
            menu = ["dashboard", "companies", "leads", "dealers", "contacts", "products", "tickets", "Knowledge"];
            break;
        case "SC":
            menu = ["dashboard", "companies", "leads", "dealers", "contacts", "products", "tickets", "Knowledge"];
            break;
        case "admin":

            menu = ["dashboard", "companies", "leads", "dealers", "contacts", "products", "mfsettings", "ticketslist", "Knowledge"];
            break;
        case "SM":
            menu = ["dashboard", "leads", "mymeeting", "companies", "contacts", "products", "tickets", "Knowledge"];
            break;

        case "NSM":
            menu = ["dashboard", "companies", "leads", "dealers", "contacts", "products", "tickets", "Knowledge"];
            break;
        case "ZSM":
            menu = ["dashboard", "companies", "leads", "dealers", "contacts", "products", "tickets", "Knowledge"];
            break;
        case "RSM":
            menu = ["dashboard", "companies", "leads", "dealers", "contacts", "products", "tickets", "Knowledge"];
            break;
        case "BH":
            menu = ["dashboard", "companies", "leads", "dealers", "contacts", "products", "settings", "ticketslist", "Knowledge"];
            break;
        case "AM":
            menu = ["ticketslist", "Knowledge", "products"];
            break;
        case "SA":
            menu = ["ticketslist", "Knowledge", "products"];
            break;
        case "SPM":
            menu = ["ticketslist", "Knowledge", "products"];
            break;
        case "SE":
            menu = ["ticketslist", "Knowledge", "products"];
            break;


        default:
            menu = ["products"];
            break;
    }
    fn(menu)
}
function gethostdetails(name, fn) {
    var details = []
    switch (name) {
        case "Finbot":
            details.push({ id: '5e4a3f812e889a430c09a7fa' })
            break;
    }
    fn(null, details)
}

function getbankmenu(role, fn) {
    var menu = []

    switch (role) {
        case "Banker":
            menu = ["myleads", "myticketslist"];
            break;
        case "admin":
            menu = ["MyDashboard", "financesettings", "myleads", "dealers", "ticketslist", "companies", "contacts", "products", "box", "Knowledge", "mytask"];
            break;
        case "BH":
            menu = ["MyDashboard", "financesettings", "myleads", "dealers", "ticketslist", "companies", "contacts", "products", "box", "Knowledge", "mytask"];
            break;
        case "cxo":
            menu = ["MyDashboard", "myteam", "myleads", "dealers", "myticketslist", "financesettings", "companies", "contacts", "products", "box", "Knowledge"];
            break;
        case "NSM":
            menu = ["MyDashboard", "myteam", "myleads", "dealers", "myticketslist", "companies", "contacts", "products", "box", "Knowledge", "offers",];
            break;
        case "ZSM":
            menu = ["MyDashboard", "myteam", "myleads", "dealers", "myticketslist", "companies", "contacts", "products", "box", "Knowledge", "offers",];
            break;
        case "RSM":
            menu = ["MyDashboard", "myteam", "myleads", "dealers", "myticketslist", "companies", "contacts", "products", "box", "Knowledge", "offers",];
            break;
        case "ASM":
            menu = ["MyDashboard", "myteam", "myleads", "dealers", "myticketslist", "companies", "contacts", "products", "box", "Knowledge", "offers",];
            break;
        case "SC":
            menu = ["MyDashboard", "myteam", "myleads", "dealers", "myticketslist", "companies", "contacts", "products", "box", "Knowledge", "offers",];
            break;
        case "SM":
            menu = ["MyDashboard", "myleads", "dealers", "myticketslist", "companies", "contacts", "products", "box", "Knowledge", "offers"];
            break;
        case "CM":
            menu = ["MyDashboard", "myteam", "myleads", "dealers", "myticketslist", "companies", "contacts", "products", "box", "Knowledge", "offers",];
            break;
        case "CC":
            menu = ["MyDashboard", "myteam", "myleads", "dealers", "myticketslist", "companies", "contacts", "products", "box", "Knowledge", "offers",];
            break;
        case "TE":
            menu = ["telephony", "myticketslist", "Knowledge", "offers"];
            break;
        case "TM":
            menu = ["telephony", "myticketslist", "Knowledge", "offers"];
            break;
        case "CT":
            menu = ["myleads", "myticketslist", "Knowledge", "companies", "contacts", "products", "offers",];
            break;
        case "CTM":
            menu = ["myleads", "myticketslist", "Knowledge", "companies", "contacts", "products", "offers",];
            break;

        case "SA":
            menu = ["ticketslist", "Knowledge", "products"];
            break;
        case "SPM":
            menu = ["ticketslist", "Knowledge", "products"];
            break;
        case "SE":
            menu = ["ticketslist", "Knowledge", "products"];
            break;
        // case "salesExecutive":
        //     menu = ["dashboard","myleads", "dealers", "mymeeting", "myticketslist", "courses","companies","contacts","products","mytask","exam","offers"];
        //     break;

        default:
            menu = ["Knowledge"];
            break;
    }
    fn(menu)
}


// router.get("/fbpartners/getmenu", function (req, res) {

//     new drvalidate(req, res, function (err, _session) {

//         if (!err) {
//             if (_session.bank == "Finbot") {
//                 getfinancemenu(_session.role, function (menu) {
//                     if (err) {
//                         res.sendStatus(500);
//                     } else {
//                         res.send(menu)
//                     }
//                 })

//             } else {

//                 getpartnermenu(_session.role, function (menu) {
//                     if (err) {
//                         res.sendStatus(500);
//                     } else {
//                         res.send(menu)
//                     }
//                 })
//             }


//             // res.send(menu);
//         } else {

//             console.log(err);
//             res.sendStatus(403);
//         }
//     });

// });
router.get("/fbpartners/getmenu", function (req, res) {

    new drvalidate(req, res, function (err, _session) {

        if (!err) {

            switch (_session.hosttype) {
                case '1':
                    getfinancemenu(_session.role, function (menu) {
                        if (err) {
                            res.sendStatus(500);
                        } else {
                            res.send(menu)
                        }
                    })
                    break;
                case '2':
                    getmanufacturermenu(_session.role, function (menu) {
                        if (err) {
                            res.sendStatus(500);
                        } else {
                            res.send(menu)
                        }
                    })
                    break;
                case '3':
                    getpartnermenu(_session.role, function (menu) {
                        if (err) {
                            res.sendStatus(500);
                        } else {
                            res.send(menu)
                        }
                    })
                    break;
                case '4':
                    getbankmenu(_session.role, function (menu) {
                        if (err) {
                            res.sendStatus(500);
                        } else {
                            res.send(menu)
                        }
                    })
                    break;
            }

        } else {
            res.sendStatus(403);
        }
    });

});

// =================Landing Page Start===============================



// ======================================== Dicussion Start ==============================================

// View Page images/documents
router.get("/fbpartners/page/viewdoc", function (req, res) {
    new drvalidate(req, res, function (err, _session) {
        if (!err) {

            var bankid = _session.tenant_id;
            var docname = req.query.docname || "no-photos.svg";
            // var docname = req.query.docname;
            var page = req.query.page;

            getbankname(bankid, function (err, bankname) {
                if (!err) {
                    /* Location where we want to copy the uploaded file */
                    var new_location = path.join('./fbpartners/' + bankname + '/' + page + '/' + docname);

                    fs.exists(new_location, function (exists) {
                        if (exists) {
                            // Content-type is very interesting part that guarantee that
                            // Web browser will handle response in an appropriate manner.
                            res.writeHead(200, {
                                "Content-Type": "application/octet-stream",
                                "Content-Disposition": "attachment; filename=" + docname
                            });
                            fs.createReadStream(new_location).pipe(res);
                        } else {
                            res.writeHead(400, {
                                "Content-Type": "text/plain"
                            });
                            res.end("ERROR File does not exist");
                        }
                    });
                } else {

                    res.sendStatus(500);
                }
            });
        } else {
            res.sendStatus(403);
        }
    });
});

router.post('/fbpartners/fbuserchat', (req, res) => {
    new drvalidate(req, res, (err, _session) => {
        if (!err) {
            var leadchat = req.body.userchat;
            var _record = {};
            getmydetails(_session.tenant_id, _session.bank, _session.email, function (err, details) {
                if (!err) {
                    _record['_id'] = guidGenerator();
                    _record['msg'] = leadchat.msg;
                    _record['date'] = new Date();
                    _record['name'] = details.name;
                    _record['id'] = details.userid;
                    _record['path'] = details.path;
                    _record['email'] = details.emailid;
                    _record['isdelivered'] = '|' + _session.email;
                    _record['isfinance'] = leadchat.isfinance;


                    fbpartnerleads.update({
                        _id: leadchat.leadid,
                        tenant_id: _session.tenant_id
                    }, {
                        "$push": {
                            'lead_discretion': _record
                        }
                    }, function (err) {
                        if (!err) {
                            res.sendStatus(200)
                        } else {
                            res.sendStatus(500)
                        }
                    });
                } else {
                    res.sendStatus(500);
                }
            });
        } else {
            res.sendStatus(403);
        }
    });
});
// FBPatner-Users
function getmydetails(id, bank, email, fn) {

    fbusers.findOne({
        tenant_id: id,
        email: email
    }, {
        'email': 1, 'name': 1, 'id': 1, 'city': 1, 'role': 1, 'logopath': 1, 'phone': 1, 'logopath': 1, 'date': 1, 'manager': 1, 'managerId': 1, 'managerEmail': 1, 'bankcode': 1, 'salary': 1, 'expenses': 1, 'monthlytarget': 1, 'quaterlytarget': 1, "team": 1, "teamId": 1, "connectorcode": 1
    }).exec(function (err, docs) {
        if (!err) {

            fn(null, docs);
        } else {

            fn(err, null);
        }
    });
}
router.post('/fbpartners/fbfinchat', (req, res) => {
    new drvalidate(req, res, (err, _session) => {
        if (!err) {
            var leadchat = req.body.userchat;
            var _record = {};

            getmydetails(_session.tenant_id, _session.bank, _session.email, function (err, details) {
                if (!err) {
                    _record['_id'] = guidGenerator();
                    _record['msg'] = leadchat.msg;
                    _record['date'] = new Date();
                    _record['name'] = details.name;
                    _record['id'] = details.id;
                    _record['path'] = details.logopath;
                    _record['email'] = details.email;
                    _record['isdelivered'] = '|' + _session.email;
                    _record['isfinance'] = leadchat.isfinance;



                    fbpartnerleads.update({
                        refid: leadchat.leadid,
                        //tenant_id: _session.tenant_id
                    }, {
                        "$push": {
                            'lead_discretion': _record
                        }
                    }, function (err) {
                        if (!err) {
                            res.sendStatus(200);
                        } else {
                            res.sendStatus(500);
                        }
                    });
                } else {
                    res.sendStatus(500);
                }
            });






        } else {
            res.sendStatus(403);
        }
    });
});
// FBPAtner-Financeal Users
function getmyfindetails(email, fn) {
    fbpartners.aggregate([{
        "$unwind": {
            "path": "$financeusers",
            "preserveNullAndEmptyArrays": false
        }
    }, {
        "$match": {
            "financeusers.email": {
                $eq: email
            },
            // _id: {
            // $eq: mongoose.Types.ObjectId(id)
            // },
            bankname: {
                $eq: 'Finbot'
            }
        }
    },
    {
        "$project": {
            // "_id": 1,
            "name": "$financeusers.uname",
            "userid": "$financeusers.id",
            "path": "$financeusers.logopath",
            "emailid": "$financeusers.email",
            "teamid": "$financeusers.teamId",
            "managername": "$financeusers.manager",
            "managerid": "$financeusers.managerId",
            "manageremail": "$financeusers.managerEmail"
        }
    }
    ]).exec(function (err, docs) {
        if (!err) {

            fn(null, docs[0]);
        } else {

            fn(err, null);
        }
    });
}


// router.post('/fbpartners/updatefinDlrdiscussionstatus', (req, res) => {
//     new drvalidate(req, res, (err, _session) => {
//         if (!err) {
//             var leadchat = req.body.lead;
//            if(_session.bank=== 'Finbot'){
//             var query = fbpartnerleads.aggregate([{
//                 "$unwind": {
//                     "path": "$lead_discretion",
//                     "preserveNullAndEmptyArrays": false
//                 }
//             }, {
//                 "$match": {
//                     "lead_discretion.isdelivered": {
//                        // "$regex": '|'+_session.email, $nin: [ '|'+_session.email ] 
//                        $not: { $regex: _session.email, } 
//                     },
//                     "refid":leadchat.id,
//                     // _id: {
//                     //     $eq: mongoose.Types.ObjectId(leadchat.id)
//                     // }

//                 }
//             },
//             {
//                 "$project": {
//                     "_id":"$lead_discretion._id",
//                     "id":"$lead_discretion.id",
//                     "msg": "$lead_discretion.msg",
//                     "email": "$lead_discretion.email",
//                     "isdelivered": "$lead_discretion.isdelivered",



//                 }
//             }
//             ])

//            }else{
//             var query = fbpartnerleads.aggregate([{
//                 "$unwind": {
//                     "path": "$lead_discretion",
//                     "preserveNullAndEmptyArrays": false
//                 }
//             }, {
//                 "$match": {
//                     "lead_discretion.isdelivered": {
//                        // "$regex": '|'+_session.email, $nin: [ '|'+_session.email ] 
//                        $not: { $regex: _session.email, } 
//                     },

//                     _id: {
//                         $eq: mongoose.Types.ObjectId(leadchat.id)
//                     }

//                 }
//             },
//             {
//                 "$project": {
//                     "_id":"$lead_discretion._id",
//                     "id":"$lead_discretion.id",
//                     "msg": "$lead_discretion.msg",
//                     "email": "$lead_discretion.email",
//                     "isdelivered": "$lead_discretion.isdelivered",



//                 }
//             }
//             ])

//            }


//        query.exec(
//             function (err, docs) {
//                 if (!err) {

//                     if(docs.length>0){

//                     var nlength =0;

//                     docs.forEach(function(el){

//                         var _record={};

//                         _record['lead_discretion.$.isdelivered'] = el.isdelivered+'|'+_session.email;

//                         fbpartnerleads.update({
//                             '_id': leadchat.id,

//                             'lead_discretion._id': el._id
//                         }, {
//                             "$set": _record
//                         }, function (err) {

//                             if (!err) {
//                                 nlength++;

//                                 if(docs.length == nlength){



//                                 res.sendStatus(200);
//                                 }
//                             } else {

//                                 res.sendStatus(500)
//                             }
//                         })


//                     })
//                 }
//                 else{

//                     res.send("all read")
//                 }


//                 } else {

//                     res.sendStatus(500);
//                 }
//             });


//         } else {
//             res.sendStatus(403);
//         }
//     });
// });


// ======================================== Dicussion End ==============================================

// ------------------------------Account Start----------------------------------

router.get('/fbpartners/getmyaccount', (req, res) => {
    new drvalidate(req, res, function (err, _session) {
        if (!err) {
            getmydetails(_session.tenant_id, _session.bank, _session.email, (detailserr, data) => {
                if (!detailserr) {

                    res.send(data);
                } else {

                    res.sendStatus(500);
                }
            });
        } else {
            res.sendStatus(403);
        }
    });
});

router.post('/fbpartners/myaccupdate', (req, res) => {
    new drvalidate(req, res, (err, _session) => {
        if (!err) {
            var _cuser = req.body.user;
            var keyid = req.query.keyid;
            var _record = {};
            _record['name'] = _cuser.uname;
            _record['email'] = _cuser.email;
            _record['phone'] = _cuser.phone;
            _record['city'] = _cuser.city;
            _record['logopath'] = _cuser.image;
            _record['status'] = '1';
            var extns = _cuser.image.split('.').pop().toLowerCase();
            const new_location = path.join(app.root, 'rack/static/images/fbpartners/users/');
            const pathToFile = new_location + _cuser.image;
            const newPathToFile = new_location + keyid + '.' + extns;

            if (_cuser.image && pathToFile != newPathToFile) {

                _record['logopath'] = _cuser.id + '.' + extns;
                fs.stat(newPathToFile, function (err, stats) {
                    if (err) {
                        fs.rename(pathToFile, newPathToFile, function (err) {
                            if (err) {
                                res.sendStatus(500)
                            } else {
                                fbusers.update({
                                    tenant_id: _session.tenant_id,
                                    id: keyid
                                }, {
                                    $set: _record
                                }).exec((err, doc) => {
                                    if (!err) {
                                        var result = {};
                                        result.Result = "OK";
                                        result.Record = _record;
                                        res.json(result);
                                    } else {
                                        res.sendStatus(500)
                                    }
                                })
                            }
                        });
                    } else {
                        fs.unlink(newPathToFile, function (err) {
                            if (err) {
                                res.sendStatus(500)
                            } else {
                                fs.rename(pathToFile, newPathToFile, function (err) {
                                    if (err) {
                                        res.sendStatus(500)
                                    } else {
                                        fbusers.update({
                                            tenant_id: _session.tenant_id,
                                            id: keyid
                                        }, {
                                            $set: _record
                                        }).exec((err, doc) => {
                                            if (!err) {
                                                var result = {};
                                                result.Result = "OK";
                                                result.Record = _record;
                                                res.json(result);
                                            } else {
                                                res.sendStatus(500)
                                            }
                                        })
                                    }
                                });
                            }
                        });
                    }
                });
            } else {
                _record['logopath'] = _cuser.image;
                fbusers.update({
                    tenant_id: _session.tenant_id,
                    id: keyid
                }, {
                    $set: _record
                }).exec((err, doc) => {
                    if (!err) {
                        var result = {};
                        result.Result = "OK";
                        result.Record = _record;
                        res.json(result);
                    } else {
                        res.sendStatus(500)
                    }
                })
            }

        } else {
            res.sendStatus(403);
        }
    });
});

// /fbpartners/updatemypswd
router.post('/fbpartners/updatemypswd', (req, res) => {
    new drvalidate(req, res, (err, _session) => {
        if (!err) {
            var _cuser = req.body.user;

            var _record = {};

            _record['pwd'] = _cuser.pswd;

            fbusers.update({
                tenant_id: _session.tenant_id,
                'id': req.query.keyid
            }, {
                "$set": _record
            }, function (err) {
                if (!err) {
                    var result = {};
                    result.Result = "OK";
                    result.Record = _record;
                    res.json(result);
                } else {
                    res.sendStatus(500)
                }
            })
        } else {
            res.sendStatus(403);
        }
    });
});

router.get('/fbpartners/getmypartneracc', (req, res) => {
    new drvalidate(req, res, function (err, _session) {
        if (!err) {
            fbpartners.findOne({
                '_id': _session.tenant_id
            }, {
                "bankdisplayname": 1,
                "partnerdesc": 1,
                "email": 1,
                "phone": 1,
                "website": 1,
                "logopath": 1,
                port: 1,
                url: 1,
                mailerto: 1,
                emailpwd: 1
            }, (err, data) => {
                if (!err) {
                    res.send(data);
                } else {
                    res.sendStatus(500);
                }
            });
        } else {
            res.sendStatus(403);
        }
    });
});

router.post('/fbpartners/mypartneraccupdate', (req, res) => {

    new drvalidate(req, res, (err, _session) => {
        if (!err) {
            if (!err) {
                var _cpartner = req.body.partner;

                var _record = {};
                _record["bankdisplayname"] = _cpartner.bname;
                _record["partnerdesc"] = _cpartner.desc;
                _record["email"] = _cpartner.emailid;
                _record["phone"] = _cpartner.phone;
                _record["website"] = _cpartner.website;
                _record["mailerto"] = _cpartner.mailerto;
                _record["emailpwd"] = _cpartner.mailerpwd;
                _record["port"] = _cpartner.port;
                _record["url"] = _cpartner.url;
                var extns = _cpartner.image.split('.').pop().toLowerCase();
                const new_location = path.join(app.root, 'rack/static/');
                const pathToFile = new_location + _cpartner.image;
                const newPathToFile = new_location + _session.tenant_id + '.' + extns;
                if (_cpartner.image && pathToFile != newPathToFile) {
                    _record["logopath"] = _session.tenant_id + '.' + extns;
                    fs.stat(newPathToFile, function (err, stats) {
                        if (err) {
                            fs.rename(pathToFile, newPathToFile, function (err) {
                                if (err) {
                                    res.sendStatus(500)
                                } else {
                                    fbpartners.update({
                                        '_id': _session.tenant_id
                                    }, {
                                        "$set": _record
                                    }, function (err) {
                                        if (!err) {
                                            var result = {};
                                            result.Result = "OK";
                                            result.Record = _record;
                                            res.json(result);
                                        } else {
                                            res.sendStatus(500)
                                        }
                                    });
                                }
                            });
                        } else {
                            fs.unlink(newPathToFile, function (err) {
                                if (err) {
                                    res.sendStatus(500)
                                } else {
                                    fs.rename(pathToFile, newPathToFile, function (err) {
                                        if (err) {
                                            res.sendStatus(500)
                                        } else {
                                            fbpartners.update({
                                                '_id': _session.tenant_id
                                            }, {
                                                "$set": _record
                                            }, function (err) {
                                                if (!err) {
                                                    var result = {};
                                                    result.Result = "OK";
                                                    result.Record = _record;
                                                    res.json(result);
                                                } else {
                                                    res.sendStatus(500)
                                                }
                                            });
                                        }
                                    });
                                }
                            });
                        }
                    });
                } else {
                    _record["logopath"] = _cpartner.image;
                    fbpartners.update({
                        '_id': _session.tenant_id
                    }, {
                        "$set": _record
                    }, function (err) {
                        if (!err) {
                            var result = {};
                            result.Result = "OK";
                            result.Record = _record;
                            res.json(result);
                        } else {
                            res.sendStatus(500)
                        }
                    });
                }
            } else {
                res.sendStatus(403);
            }
        } else {
            res.sendStatus(403);
        }
    });
});
// ------------------------------Acount End----------------------------------

// ------------------------------Banner Sart-----------------------------
//View banners images
router.get("/fbpartners/viewbanner", function (req, res) {
    new drvalidate(req, res, function (err, _session) {
        if (!err) {

            var docname = req.query.docname;
            var page = req.query.page;

            var new_location = path.join('./fbpartners/finbot', page, docname);

            fs.exists(new_location, function (exists) {
                if (exists) {
                    // Content-type is very interesting part that guarantee that
                    // Web browser will handle response in an appropriate manner.
                    res.writeHead(200, {
                        "Content-Type": "application/octet-stream",
                        "Content-Disposition": "attachment; filename=" + docname
                    });
                    fs.createReadStream(new_location).pipe(res);
                } else {
                    res.writeHead(400, {
                        "Content-Type": "text/plain"
                    });
                    res.end("ERROR File does not exist");
                }
            });
        } else {
            res.sendStatus(403);
        }
    });
});

router.get('/fbpartners/showbanners', (req, res) => {
    new drvalidate(req, res, (err, _session) => {
        if (!err) {
            var tenant_id = (_session.tenant_id).toString();

            fbbanner.find({
                dealers: {
                    $in: ['ALL', tenant_id]
                },
                startdate: {
                    "$lte": new Date()
                },
                enddate: {
                    "$gte": new Date()
                },
                status: 1,
                "banner_type": "Banner",
            }).sort({
                createdate: 1
            }).exec(function (err, docs) {
                if (!err) {
                    if (docs != null) {

                        res.send(docs);
                    } else {
                        var reviewer = []
                        res.send(reviewer);
                    }
                } else {
                    res.sendStatus(500);
                }
            });
        } else {
            res.sendStatus(403);
        }
    });
});

// showtiles
router.get('/fbpartners/showtiles', (req, res) => {
    new drvalidate(req, res, (err, _session) => {
        if (!err) {
            var tenant_id = (_session.tenant_id).toString();

            fbbanner.find({
                dealers: {
                    $in: ['ALL', tenant_id]
                },
                startdate: {
                    "$lte": new Date()
                },
                enddate: {
                    "$gte": new Date()
                },
                status: 1,
                banner_type: "Tile",
            }).sort({
                createdate: 1
            }).exec(function (err, docs) {
                if (!err) {
                    if (docs != null) {

                        res.send(docs);
                    } else {
                        var reviewer = []
                        res.send(reviewer);
                    }
                } else {
                    res.sendStatus(500);
                }
            });
        } else {
            res.sendStatus(403);
        }
    });
});



// ------------------------------Banner END-----------------------------


// ==========================Product Invoice Start====================

function getleadinvoice_gen(leadid, tenant_id, bank, fn) {
    fbpartnerleads.aggregate([{
        "$unwind": {
            "path": "$lead_invoice",
            "preserveNullAndEmptyArrays": true
        }
    },
    {
        $match: {
            _id: {
                $eq: mongoose.Types.ObjectId(leadid)
            }
        }
    }, {
        "$sort": {
            "lead_invoice.Quotation_Date": -1
        }
    },
    {
        $project: {
            leadequipments: 1,
            leadequipmentsId: 1,
            companyname: '$company',
            contact: 1,
            contactnumber: 1,
            contactEmail: 1,
            Quotation_No: '$lead_invoice.Quotation_No',
            Quotation_Date: '$lead_invoice.Quotation_Date',
            items: '$lead_invoice.items',
            company: '$lead_invoice.company',
            partner: '$lead_invoice.partner',
            imp_info: '$lead_invoice.imp_info',
            isvisible: '$lead_invoice.isvisible'
        }
    },
    {
        $limit: 1
    }
    ]).exec(function (err, ld) {
        if (!err) {
            if (Array.isArray(ld) && ld.length > 0) {
                fbpartners.findOne({
                    _id: tenant_id,
                    bankname: bank
                }, {
                    Address: 1,
                    email: 1,
                    phone: 1,
                    bankname: 1,
                    website: 1,
                    logopath: 1,
                    invoiceno: 1,
                    GstNumber: 1
                }).exec(
                    function (err, partner) {
                        if (!err) {
                            fbcompany.findOne({
                                tenant_id: tenant_id,
                                bankname: bank,
                                'name': ld[0].companyname
                            }).exec(
                                function (err, cdocs) {
                                    if (!err) {
                                        var reviewer = [],
                                            data = {};
                                        if (ld[0].leadequipmentsId) {
                                            var options = ld[0].leadequipmentsId.split(',');
                                            if (Array.isArray(ld[0].items) && ld[0].items.length > 0) {
                                                if (options.length == ld[0].items.length) {
                                                    data = {
                                                        invoiceno: partner.invoiceno,
                                                        Quotation_No: ld[0].Quotation_No,
                                                        Quotation_Date: ld[0].Quotation_Date,
                                                        reviewer: ld[0].items,
                                                        company: ld[0].company,
                                                        partner: ld[0].partner,
                                                        imp_info: ld[0].imp_info || '',
                                                        isfinance: ld[0].isvisible || 0

                                                    }
                                                } else {
                                                    options.forEach(function (e) {
                                                        fbproducts.findOne({
                                                            tenant_id: tenant_id,
                                                            // Name: e
                                                            id: e
                                                        }).exec(function (_err, p) {
                                                            if (!_err) {
                                                                if (p != null) {
                                                                    reviewer.push({
                                                                        'Name': p.Name,
                                                                        'SerialNumber': p.SerialNumber,
                                                                        'Manufacturer': p.Manufacturer,
                                                                        'id': p.id,
                                                                        'Description': p.Description,
                                                                        'Short_Desc': p.ShortDescription,
                                                                        'Price': p.Price,
                                                                        'Tax': p.Tax,
                                                                        'logopath': p.logopath,
                                                                        'product_discount': 0,
                                                                        'product_qty': 1
                                                                    });
                                                                }
                                                            }
                                                        })
                                                    });

                                                    data = {
                                                        invoiceno: partner.invoiceno,
                                                        Quotation_No: ld[0].Quotation_No,
                                                        Quotation_Date: ld[0].Quotation_Date,
                                                        reviewer,
                                                        company: cdocs,
                                                        partner: {
                                                            address: partner.Address,
                                                            email: partner.email,
                                                            phone: partner.phone,
                                                            bank: partner.bankname,
                                                            website: partner.website,
                                                            image: partner.logopath,
                                                            gstin: partner.GstNumber
                                                        },
                                                        imp_info: ld[0].imp_info || '',
                                                        isfinance: ld[0].isvisible || 0
                                                    }
                                                }
                                                data['contact'] = ld[0].contact;
                                                data['contactnumber'] = ld[0].contactnumber;
                                                data['contactEmail'] = ld[0].contactEmail;
                                                fn(null, data);
                                            } else {
                                                var count = 1;
                                                options.forEach(function (e, i) {
                                                    fbproducts.findOne({
                                                        tenant_id: tenant_id,
                                                        // Name: e
                                                        id: e
                                                    }).exec(function (_err, p) {
                                                        if (!_err) {
                                                            if (p != null) {
                                                                reviewer.push({
                                                                    'Name': p.Name,
                                                                    'SerialNumber': p.SerialNumber,
                                                                    'Manufacturer': p.Manufacturer,
                                                                    'id': p.id,
                                                                    'Description': p.Description,
                                                                    'Short_Desc': p.ShortDescription,
                                                                    'Price': p.Price,
                                                                    'Tax': p.Tax,
                                                                    'logopath': p.logopath,
                                                                    'product_discount': 0,
                                                                    'product_qty': 1
                                                                });
                                                            }
                                                            if (options.length == count) {
                                                                fn(null, {
                                                                    invoiceno: partner.invoiceno,
                                                                    Quotation_No: "",
                                                                    Quotation_Date: "",
                                                                    reviewer,
                                                                    company: cdocs,
                                                                    partner: {
                                                                        address: partner.Address,
                                                                        email: partner.email,
                                                                        phone: partner.phone,
                                                                        bank: partner.bankname,
                                                                        website: partner.website,
                                                                        image: partner.logopath,
                                                                        gstin: partner.GstNumber
                                                                    },
                                                                    imp_info: ld[0].imp_info || '',
                                                                    isfinance: ld[0].isvisible || 0,
                                                                    contact: ld[0].contact,
                                                                    contactnumber: ld[0].contactnumber,
                                                                    contactEmail: ld[0].contactEmail
                                                                });
                                                            }
                                                            count++;
                                                        }
                                                    })
                                                });
                                            }
                                        } else {
                                            fn(err, null)
                                        }
                                    } else {
                                        fn(err, null)
                                    }
                                });
                        } else {
                            fn(err, null)
                        }
                    });
            } else {
                fn(err, null)
            }
        } else {
            fn(err, null)
        }
    });
}
// bindproduct_invoice
router.get("/fbpartners/bindproduct_invoice", function (req, res) {
    new drvalidate(req, res, function (err, _session) {
        if (!err) {
            var leadid = req.query.keyid;

            getleadinvoice_gen(leadid, _session.tenant_id, _session.bank, (err, invoicedata) => {
                if (!err) {
                    res.send(invoicedata);
                } else {
                    res.sendStatus(500);
                }
            });

        } else {
            res.sendStatus(403);
        }
    });
});

function postleadinvoice_gen(leadid, tenant_id, bank, product, fn) {
    fbpartnerleads.findOne({
        _id: leadid
    }, {
        leadequipments: 1,
        leadequipmentsId: 1,
        company: 1,
        lead_invoice: 1,
        contact: 1,
        contactnumber: 1,
        contactEmail: 1,
        imp_info: 1
    }).exec(function (err, ld) {
        if (!err) {
            fbpartners.findOne({
                _id: tenant_id,
                bankname: bank,
            }, {
                Address: 1,
                email: 1,
                phone: 1,
                bankname: 1,
                website: 1,
                logopath: 1,
                invoiceno: 1,
                GstNumber: 1
            }).exec(
                function (err, partner) {
                    if (!err) {
                        fbcompany.findOne({
                            tenant_id: tenant_id,
                            bankname: bank,
                            'name': ld.company
                        }).exec(
                            function (err, docs) {
                                if (!err) {
                                    if (ld.leadequipmentsId) {
                                        var options = ld.leadequipmentsId.split(',');
                                        var reviewer = [];
                                        if (Array.isArray(options) && options.length > 0) {
                                            var count = 1;

                                            options.forEach(function (e) {
                                                fbproducts.findOne({
                                                    tenant_id: tenant_id,
                                                    // Name: e
                                                    id: e
                                                }).exec(function (_err, p) {
                                                    if (!_err) {
                                                        if (p) {
                                                            product.forEach(function (ep) {
                                                                if (p.Name == ep.pname) {
                                                                    reviewer.push({
                                                                        'Name': p.Name,
                                                                        'SerialNumber': p.SerialNumber,
                                                                        'Manufacturer': p.Manufacturer,
                                                                        'id': p.id,
                                                                        'Description': p.Description,
                                                                        'Short_Desc': p.ShortDescription,
                                                                        'Price': p.Price,
                                                                        'Tax': ep.tax,
                                                                        'logopath': p.logopath,
                                                                        'product_discount': ep.discount,
                                                                        'product_qty': ep.qty
                                                                    });
                                                                }
                                                            });
                                                        }

                                                        if (options.length == count) {
                                                            fn(null, {
                                                                invoiceno: partner.invoiceno,
                                                                Quotation_No: "",
                                                                Quotation_Date: "",
                                                                imp_info: '',
                                                                isfinance: 0,
                                                                reviewer,
                                                                company: docs,
                                                                partner: {
                                                                    address: partner.Address,
                                                                    email: partner.email,
                                                                    phone: partner.phone,
                                                                    bank: partner.bankname,
                                                                    website: partner.website,
                                                                    image: partner.logopath,
                                                                    gstin: partner.GstNumber
                                                                },
                                                                contact: ld.contact,
                                                                contactnumber: ld.contactnumber,
                                                                contactEmail: ld.contactEmail
                                                            });
                                                        }
                                                        count++;
                                                    }
                                                })
                                            });
                                        } else {
                                            fn(null, {
                                                invoiceno: partner.invoiceno,
                                                Quotation_No: '',
                                                Quotation_Date: '',
                                                imp_info: '',
                                                isfinance: 0,
                                                reviewer,
                                                company: docs,
                                                partner: {
                                                    address: partner.Address,
                                                    email: partner.email,
                                                    phone: partner.phone,
                                                    bank: partner.bankname,
                                                    website: partner.website,
                                                    image: partner.logopath,
                                                    gstin: partner.GstNumber
                                                },
                                                contact: ld.contact,
                                                contactnumber: ld.contactnumber,
                                                contactEmail: ld.contactEmail
                                            });
                                        }
                                    } else {
                                        fn(err, null)
                                    }
                                } else {
                                    fn(err, null)
                                }
                            });
                    } else {
                        fn(err, null)
                    }
                });
        } else {
            fn(err, null)
        }
    });
}
// Save product Invoice
router.post('/fbpartners/saveproductinvoice', (req, res) => {
    new drvalidate(req, res, (err, _session) => {
        if (!err) {
            var leadid = req.query.keyid;
            var amount = req.body.amount || 0;
            var imp_info = req.body.imp_info || '';
            var arr = req.body.arr || [];
            var isvisible = req.body.isvisible;

            postleadinvoice_gen(leadid, _session.tenant_id, _session.bank, arr, (err, invoicedata) => {
                if (!err) {

                    if (Array.isArray(invoicedata.reviewer) && invoicedata.reviewer.length > 0) {
                        var str = (_session.bank).toUpperCase();
                        var matches = str.match(/\b(\w)/g);
                        var acronym = matches.join('');
                        if (invoicedata.invoiceno == '' || invoicedata.invoiceno == undefined || invoicedata.invoiceno == null) {
                            var new_invoiceno = acronym + '000001';
                        } else {
                            var new_invoiceno = acronym + "00000" + (parseInt(invoicedata.invoiceno.replace(/[^0-9]/g, '')) + 1);
                        }

                        var _cinvoice = {};
                        _cinvoice['Quotation_No'] = new_invoiceno;
                        _cinvoice['items'] = invoicedata.reviewer;
                        _cinvoice['company'] = invoicedata.company
                        _cinvoice['partner'] = invoicedata.partner;
                        _cinvoice['Quotation_Date'] = new Date();
                        _cinvoice['imp_info'] = imp_info;
                        _cinvoice['isvisible'] = isvisible;

                        fbpartnerleads.findByIdAndUpdate({
                            _id: leadid
                        }, {
                            // "$set": {
                            //     'lead_invoice': _cinvoice //Replacing array --> So Sinlge
                            // }
                            "$push": {
                                'lead_invoice': _cinvoice //Saving multiple times
                            }
                        }, {
                            new: true,
                            returnNewDocument: true
                        }).exec(function (err, ld) {
                            if (!err) {



                                fbpartners.update({
                                    _id: _session.tenant_id,
                                }, {
                                    '$set': {
                                        invoiceno: new_invoiceno
                                    }
                                }).exec(function (err, doc_in) {
                                    if (!err) {
                                        ld.lead_invoice.forEach(function (ele) {
                                            if (ele.Quotation_No == new_invoiceno) {
                                                var document = generator({
                                                    invoice: ele.Quotation_No,
                                                    items: ele.items,
                                                    company: ele.company,
                                                    partner: ele.partner,
                                                    createddate: ele.Quotation_Date,
                                                    contact: ld.contact,
                                                    contactnumber: ld.contactnumber,
                                                    contactEmail: ld.contactEmail,
                                                    imp_info: ele.imp_info || '',
                                                });

                                                document.generate();
                                                var newlocation = './fbpartners/' + _session.bank + '/leads/';
                                                fse.ensureDirSync(newlocation);
                                                var file_name = new_invoiceno + '-Quotation.pdf'
                                                var pat = newlocation + file_name;
                                                document.pdfkitDoc.pipe(fs.createWriteStream(path.join(process.cwd(), pat)));
                                                var _record = {};
                                                var _doc = [];
                                                var _cdoc = {};
                                                _cdoc['docname'] = new_invoiceno;
                                                _cdoc['docpath'] = '/leads/' + file_name;
                                                _cdoc['isExternal'] = 1;
                                                _doc.push(_cdoc);
                                                _record['leaddocs'] = _doc;
                                                var _cleads = {}
                                                _cleads['id'] = ld.refid;
                                                _cleads['refid'] = leadid;
                                                _cleads['record'] = _record;
                                                _cleads['tenantid'] = ld.financeid;
                                                _cleads['type'] = 1;

                                                if (isvisible === 1) {
                                                    sendinvoicereqfinlead(_cleads, function (err, docs) {
                                                        if (!err) {

                                                            res.sendStatus(200)
                                                        } else {
                                                            res.sendStatus(500)
                                                        }
                                                    });
                                                }
                                            }
                                        });

                                    } else {
                                        res.sendStatus(500);
                                    }
                                });


                            } else {
                                res.sendStatus(500);
                            }
                        });
                    } else {
                        res.sendStatus(500);
                    }
                } else {
                    res.sendStatus(500);
                }
            });
        } else {
            res.sendStatus(403);
        }
    });
});

function updateinvoicetofin(refid, _record, fn) {

    fbleads.update({
        'sourceid': refid
    }, {
        "$push": _record
    }, function async(err) {
        if (!err) {
            fn(true);
        } else {
            fn(false)
        }
    });
}

function getfblead_id(sourceid, fn) {
    fbleads.findOne({
        'sourceid': sourceid
    }, {
        _id: 1
    }).exec(function (err, fblead) {
        if (!err) {
            if (fblead) {
                fn(null, (fblead._id).toString())
            } else {
                fn(null, null)
            }
        } else {
            fn(err, null)
        }
    });
}
// Save And Proceed Product Invoice
router.post('/fbpartners/saveproceedproductinvoice', (req, res) => {
    new drvalidate(req, res, (err, _session) => {
        if (!err) {
            var leadid = req.query.keyid;
            var amount = req.body.amount || 0;
            var imp_info = req.body.imp_info || '';
            var arr = req.body.arr || [];
            var isvisible = req.body.isvisible;

            postleadinvoice_gen(leadid, _session.tenant_id, _session.bank, arr, (err, invoicedata) => {
                if (!err) {

                    if (Array.isArray(invoicedata.reviewer) && invoicedata.reviewer.length > 0) {

                        var str = (_session.bank).toUpperCase();
                        var matches = str.match(/\b(\w)/g);
                        var acronym = matches.join('');

                        if (invoicedata.invoiceno == '' || invoicedata.invoiceno == undefined || invoicedata.invoiceno == null) {
                            var new_invoiceno = acronym + '000001';
                        } else {
                            var new_invoiceno = acronym + "00000" + (parseInt(invoicedata.invoiceno.replace(/[^0-9]/g, '')) + 1);
                        }

                        var _cinvoice = {};
                        _cinvoice['Quotation_No'] = new_invoiceno;
                        _cinvoice['items'] = invoicedata.reviewer;
                        _cinvoice['company'] = invoicedata.company
                        _cinvoice['partner'] = invoicedata.partner;
                        _cinvoice['Quotation_Date'] = new Date();
                        _cinvoice['imp_info'] = imp_info;
                        _cinvoice['isvisible'] = isvisible;

                        fbpartnerleads.findByIdAndUpdate({
                            _id: leadid
                        }, {
                            // "$set": {
                            //     'lead_invoice': _cinvoice //Replacing array --> So Sinlge
                            // }
                            "$push": {
                                'lead_invoice': _cinvoice //Saving multiple times
                            }
                        }, {
                            new: true,
                            returnNewDocument: true
                        }).exec(function (err, ld) {
                            if (!err) {

                                var pat;
                                ld.lead_invoice.forEach(function (ele) {
                                    if (ele.Quotation_No == new_invoiceno) {
                                        var document = generator({
                                            invoice: ele.Quotation_No,
                                            items: ele.items,
                                            company: ele.company,
                                            partner: ele.partner,
                                            createddate: ele.Quotation_Date,
                                            contact: ld.contact,
                                            contactnumber: ld.contactnumber,
                                            contactEmail: ld.contactEmail,
                                            imp_info: ele.imp_info || '',
                                        });

                                        document.generate();
                                        var newlocation = './fbpartners/' + _session.bank + '/leads/';
                                        fse.ensureDirSync(newlocation);
                                        var file_name = new_invoiceno + '-Quotation.pdf'
                                        pat = newlocation + file_name;
                                        document.pdfkitDoc.pipe(fs.createWriteStream(path.join(process.cwd(), pat)));
                                        var _record = {};
                                        var _doc = [];
                                        var _cdoc = {};
                                        _cdoc['docname'] = new_invoiceno;
                                        _cdoc['docpath'] = '/leads/' + file_name;
                                        _cdoc['isExternal'] = 1;
                                        _doc.push(_cdoc);
                                        _record['leaddocs'] = _doc;
                                        var _cleads = {}
                                        _cleads['id'] = ld.refid,
                                            _cleads['record'] = _record,
                                            _cleads['tenantid'] = ld.financeid,
                                            _cleads['type'] = 1,
                                            getloginparnerdeatiles(req.cookies.fbbank, (err, fromemail, pwd, port, url, logoorpath, bankname, dealeraddress) => {
                                                new drinvoice(fromemail, pwd, port, url, logoorpath, bankname, invoicedata.reviewer, invoicedata.company, invoicedata.partner, new_invoiceno, pat, dealeraddress, function (err, maildoc) {
                                                    if (err) {
                                                        res.send('failed');
                                                    } else {

                                                        fbpartners.update({
                                                            _id: _session.tenant_id,
                                                        }, {
                                                            '$set': {
                                                                invoiceno: new_invoiceno
                                                            }
                                                        }).exec(function (err, doc_in) {
                                                            if (!err) {
                                                                // res.sendStatus(200);
                                                                if (isvisible === 1) {


                                                                    sendinvoicereqfinlead(_cleads, function (err, docs) {
                                                                        if (!err) {
                                                                            res.sendStatus(200)
                                                                        } else {
                                                                            res.sendStatus(500)
                                                                        }
                                                                    });
                                                                }
                                                            } else {
                                                                if (isvisible === 1) {
                                                                    sendinvoicereqfinlead(_cleads, function (err, docs) {
                                                                        if (!err) {
                                                                            res.sendStatus(200)
                                                                        } else {
                                                                            res.sendStatus(500)
                                                                        }
                                                                    });
                                                                }
                                                            }
                                                        });
                                                    }
                                                });
                                            });



                                    }
                                });



                            } else {
                                res.sendStatus(500);
                            }
                        });
                    } else {
                        res.sendStatus(500);
                    }
                } else {
                    res.sendStatus(500);
                }
            });
        } else {
            res.sendStatus(500);
        }
    });
});

function sendinvoicereqfinlead(_cleads, fn) {
    axios({
        method: 'post',
        url: 'http://abcde.com/fbExternallead/sendinvoicedealertofinlead',
        data: {
            leads: _cleads
        }
    }).then(function (response) {

        fn(null, response)
    })
}
// ==========================Product Invoice End====================
//-----------------------all master data start-------------------------
router.get("/fbpartners/allMasterdata/:dayorweekormonth/:bankname", function (req, res) {
    new drvalidate(req, res, function (err, _session) {
        var start = moment().startOf(req.params.dayorweekormonth) // set to 12:00 am today
        var end = moment().endOf(req.params.dayorweekormonth);
        getbankid(req.params.bankname, function (err, bankid) {

            fbpartnermeeting.aggregate([
                { $limit: 1 }, // 2. Keep only one document of the collection.
                { $project: { _id: '$$REMOVE' } }, // 3. Remove everything from the document.

                { $lookup: { from: 'fbpartnermeeting', pipeline: [{ $match: { "tenant_id": { "$eq": bankid }, "createddate": { "$gte": start._d, "$lt": end._d } } }], as: 'meetings' } },
                { $lookup: { from: 'fbpartnertask', pipeline: [{ $match: { "tenant_id": { "$eq": bankid, }, "createddate": { "$gte": start._d, "$lt": end._d } } }], as: 'tasks' } },
                { $lookup: { from: 'fbleadslite', pipeline: [{ $match: { "dealername": { "$eq": req.params.bankname, }, "createddate": { "$gte": start._d, "$lt": end._d } } }], as: 'leads' } },
                { $lookup: { from: 'dractivity', pipeline: [{ $match: { "bank": { "$eq": req.params.bankname, }, "createddate": { "$gte": start._d, "$lt": end._d } } }], as: 'usersactivity' } },
                { $lookup: { from: 'fbcompany', pipeline: [{ $match: { "bankname": { "$eq": req.params.bankname, }, "createddate": { "$gte": start._d, "$lt": end._d } } }], as: 'companys' } },
                { $lookup: { from: 'fbcontacts', pipeline: [{ $match: { "bankname": { "$eq": req.params.bankname, }, "createddate": { "$gte": start._d, "$lt": end._d } } }], as: 'contacts' } },

                {
                    "$project": {
                        "companys": { $size: '$companys' },
                        "contacts": { $size: "$contacts" },
                        "tasks": {
                            "$map": {
                                "input": "$tasks",
                                "as": "tasks",
                                "in": {
                                    "taskid": "$$tasks.taskid",
                                    "Assigned": "$$tasks.Assigned",
                                    "_id": "$$tasks._id",
                                    "status": "$$tasks.taskstatus",
                                    "AssignedEmail": "$$tasks.AssignedEmail",
                                    "AssignedId": "$$tasks.AssignedId",
                                }
                            }
                        },
                        "meetings": {
                            "$map": {
                                "input": "$meetings",
                                "as": "meetings",
                                "in": {
                                    "meetingid": "$$meetings.meetingid",
                                    "Assigned": "$$meetings.Assigned",
                                    "_id": "$$meetings._id",
                                    "status": "$$meetings.status",
                                    "AssignedEmail": "$$meetings.AssignedEmail",
                                    "AssignedId": "$$meetings.AssignedId",

                                }
                            }
                        },
                        "usersactivity": {
                            "$map": {
                                "input": "$usersactivity",
                                "as": "usersactivity",
                                "in": {
                                    "uemail": "$$usersactivity.email",
                                    "createddate": "$$usersactivity.createddate",
                                }
                            }
                        }, "leads": {
                            "$map": {
                                "input": "$leads",
                                "as": "leads",
                                "in": {
                                    "leadnumber": "$$leads.leadnumber",
                                    "_id": "$$leads._id",
                                    "leadamount": "$$leads.leadamount",
                                    "leadname": "$$leads.leadname",
                                    "Assigned": "$$leads.Assigned",
                                    "AssignedEmail": "$$leads.AssignedEmail",
                                    "AssignedId": "$$leads.AssignedId",
                                }
                            }
                        }
                    }
                }]).exec(function (err, result) {
                    if (!err) {
                        res.send(result)
                    } else {

                        res.send(err)
                    }
                })



        })
    })

})


function getbankid(bankname, fn) {
    fbpartners.find({
        bankname: bankname
    }, {
        _id: 1
    }).exec(function (err, docs) {
        if (!err) {

            fn(null, docs[0]._id.toString())

        } else {

            fn(err, null);
        }
    });
}
//------------------------all master data end--------------------------


module.exports = router;