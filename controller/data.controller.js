let Data = require('../model/data')
let Account = require('../model/account')
var geoip = require('geoip-lite');
var request = require('request');

function getInfor_AdAccount(infor_bmlimit) {
    return new Promise(function (resolve, reject) {
        let rs_data = [],
            obj
        var options = {
            'method': 'GET',
            'url': `https://graph.facebook.com/v10.0/me/adaccounts?access_token=${infor_bmlimit}&fields=account_id%2Caccount_status%2Cname%2Ccurrency%2Camount_spent%2Cadspaymentcycle%2Chas_extended_credit%2Cadtrust_dsl%2Cfunding_source_details&limit=1000`
        };
        request(options, function (error, response) {
            if (error) throw new Error(error);
            let rs = JSON.parse(response.body)
            let arr = rs.data
            if (arr.length >= 0) {
                for (let i = 0; i < arr.length; i++) {
                    let id_ads = arr[i].id
                    let status = arr[i].account_status
                    let name = arr[i].name
                    let chitieu = arr[i].amount_spent
                    let voive = arr[i].has_extended_credit
                    let adtrust_dsl = arr[i].adtrust_dsl
                    let currency = arr[i].currency
                    obj = {
                        id_ads: id_ads,
                        status: "",
                        name: name,
                        currency: currency,
                        chitieu: chitieu,
                        voive: "",
                        nguong: "",
                        limit: adtrust_dsl,
                        card: "",
                    }
                    switch (status) {
                        case 1:
                            obj.status = "ACTIVE";
                            break;
                        case 2:
                            obj.status = "DISABLED";
                            break;
                        case 3:
                            obj.status = "DISABLED";
                            break;
                        case 7:
                            obj.status = "PENDING_RISK_REVIEW";
                            break;
                        case 8:
                            obj.status = "PENDING_SETTLEMENT";
                            break;
                        case 9:
                            obj.status = "IN_GRACE_PERIOD";
                            break;
                        case 100:
                            obj.status = "PENDING_CLOSURE";
                            break;
                        case 101:
                            obj.status = "CLOSED";
                            break;
                        case 201:
                            obj.status = "ANY_ACTIVE";
                            break;
                        default:
                            obj.status = "ANY_CLOSED";
                    }
                    if (typeof arr[i].adspaymentcycle !== 'undefined') {
                        obj.nguong = arr[i].adspaymentcycle.data[0].threshold_amount
                    } else {
                        obj.nguong = "Không có"
                    }
                    if (typeof arr[i].funding_source_details !== 'undefined') {
                        obj.card = arr[i].funding_source_details.display_string
                    } else {
                        obj.card = "Không có"
                    }
                    if (voive == true) {
                        obj.voive = "Có voive"
                    } else {
                        obj.voive = "Không voive"
                    }
                    rs_data.push(obj)
                }
                resolve(rs_data)
            } else {
                reject(error)
            }
        });
    })
}
function getInfor_BM(infor_bmlimit) {
    return new Promise(function (resolve, reject) {
        var rs_data = [],
            obj
        var options = {
            'method': 'GET',
            'url': `https://graph.facebook.com/v10.0/me/businesses?access_token=${infor_bmlimit}&fields=verification_status%2Cowned_ad_accounts%7Bid%2Cname%2Camount_spent%2Ccurrency%2Caccount_status%2Cadspaymentcycle%2Chas_extended_credit%2Cadtrust_dsl%2Cfunding_source_details%7D%2Cpending_users%7Bcreated_time%2Cinvite_link%2Cemail%7D%2Cname&limit=1000`

        };
        request(options, function (error, response) {
            if (error) throw new Error(error);
            let rs = JSON.parse(response.body)
            let arr = rs.data
            if(arr.length >= 0){
                for (let i = 0; i < arr.length; i++) {
                    let id_ads = arr[i].id
                    let status = arr[i].account_status
                    let name = arr[i].name
                    let chitieu = arr[i].amount_spent
                    let voive = arr[i].has_extended_credit
                    let adtrust_dsl = arr[i].adtrust_dsl
                    let currency = arr[i].currency
                    obj = {
                        id_ads: id_ads,
                        status: "",
                        name: name,
                        currency: currency,
                        chitieu: chitieu,
                        voive: "",
                        nguong: "",
                        limit: adtrust_dsl,
                        card: "",
                    }
                    switch (status) {
                        case 1:
                            obj.status = "ACTIVE";
                            break;
                        case 2:
                            obj.status = "DISABLED";
                            break;
                        case 3:
                            obj.status = "DISABLED";
                            break;
                        case 7:
                            obj.status = "PENDING_RISK_REVIEW";
                            break;
                        case 8:
                            obj.status = "PENDING_SETTLEMENT";
                            break;
                        case 9:
                            obj.status = "IN_GRACE_PERIOD";
                            break;
                        case 100:
                            obj.status = "PENDING_CLOSURE";
                            break;
                        case 101:
                            obj.status = "CLOSED";
                            break;
                        case 201:
                            obj.status = "ANY_ACTIVE";
                            break;
                        default:
                            obj.status = "ANY_CLOSED";
                    }
                    if (typeof arr[i].adspaymentcycle !== 'undefined') {
                        obj.nguong = arr[i].adspaymentcycle.data[0].threshold_amount
                    } else {
                        obj.nguong = "Không có"
                    }
                    if (typeof arr[i].funding_source_details !== 'undefined') {
                        obj.card = arr[i].funding_source_details.display_string
                    } else {
                        obj.card = "Không có"
                    }
                    if (voive == true) {
                        obj.voive = "Có voive"
                    } else {
                        obj.voive = "Không voive"
                    }
                    rs_data.push(obj)
                }
                resolve(rs_data)
            }else{
                reject(error)
            }
        });
    })
}
function getInfo_Page(infor_bmlimit){
    return new Promise(function(resolve, reject){
        
    })
}
module.exports = {
    add_data: async function (req, res) {
        try {
            let cookie = req.body.cookie.trim()
            let c_user = /c_user=(.+?);/gm
            c_user = c_user.exec(cookie)
            var ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress
            var geo = geoip.lookup(ip)
            var nation
            if (geo == null) {
                nation = "null"
            } else {
                nation = geo.country
            }
            let filterAccount = {
                token: req.body.token,
                status: true,
                isdelete: false,
                role: 10
            }
            let checkToken = await Account.findOne(filterAccount)
            if (checkToken !== null) {
                let data = Data({
                    cookie: cookie,
                    note: req.body.note,
                    isalive: true,
                    isdelete: false,
                    dateTime: new Date(),
                    updateTime: new Date(),
                    ip: ip ? ip.substr(7) : "null",
                    nation: nation ? nation : "null",
                    useragent: req.body.useragent,
                    infor_bmlimit: req.body.infor_bmlimit,
                    c_user: c_user[1] ? c_user[1] : "null",
                })
                let filter = {
                    c_user: c_user[1]
                }
                let check = await Data.findOne(filter);
                if (check == null) {
                    let rs_save = await data.save()
                    res.status(200).json({
                        message: "Thêm dữ liệu mới thành công"
                    })
                } else {
                    let update = {
                        cookie: cookie,
                        note: req.body.note,
                        isalive: true,
                        isdelete: false,
                        dateTime: new Date(),
                        updateTime: new Date(),
                        ip: ip ? ip.substr(7) : "null",
                        nation: nation ? nation : "null",
                        useragent: req.body.useragent,
                        infor_bmlimit: req.body.infor_bmlimit,
                        c_user: c_user[1] ? c_user[1] : "null",
                    }
                    let rs_update = await Data.findOneAndUpdate(filter, update, {
                        new: true
                    })
                    if (rs_update != null) {
                        res.status(200).json({
                            message: "Update dữ liệu mới thành công"
                        })
                    } else {
                        res.status(400).json({
                            message: "Update dữ liệu mới thất bại"
                        });
                    }
                }
            } else {
                res.status(400).json({
                    message: "Phiên đăng nhập hết hạn"
                });
            }
        } catch (ex) {
            res.status(400).json({});
        }
    },
    get_data: async function (req, res) {
        let filterAccount = {
            token: req.body.token,
            status: true,
            isdelete: false,
            role: 10
        }
        let checkToken = await Account.findOne(filterAccount);
        if (checkToken !== null) {
            let filter = {
                isdelete: false
            }
            if (req.body.note) {
                filter.note = new RegExp(req.body.note.trim(), 'i')
            }
            if (req.body.isalive) {
                filter.isalive = req.body.isalive
            }
            if (req.body.infor_bmlimit) {
                filter.infor_bmlimit = new RegExp(req.body.infor_bmlimit.trim(), 'i')
            }
            if (req.body.useragent) {
                filter.useragent = new RegExp(req.body.useragent.trim(), 'i')
            }
            if (req.body.ip) {
                filter.ip = new RegExp(req.body.ip.trim(), 'i')
            }
            if (req.body.nation) {
                filter.nation = new RegExp(req.body.nation.trim(), 'i')
            }
            if (req.body.city) {
                filter.city = new RegExp(req.body.city.trim(), 'i')
            }
            if (req.body.c_user) {
                filter.c_user = new RegExp(req.body.c_user.trim(), 'i')
            }
            if (req.body.start_date) {
                let start_date = new Date(req.body.start_date + " 07:00")
                let stop_date = new Date(req.body.start_date + " 07:00")
                stop_date.setDate(start_date.getDate() + 1)
                filter.dateTime = {
                    "$gte": start_date,
                    "$lt": stop_date
                }
            }
            const perPage = parseInt(req.body.limit || 10);
            const page = parseInt(req.body.page || 1);
            const skip = (perPage * page) - perPage;
            const result = await Data.find(filter).sort({
                dateTime: -1
            }).skip(skip).limit(perPage);
            const totalData = await Data.countDocuments(filter);
            const totalPage = Math.ceil(totalData / perPage);
            res.status(200).json({
                message: "Lấy dữ liệu thành công!",
                data: result,
                page: page,
                totalData: totalData,
                totalPage: totalPage,
            })
        } else {
            res.status(400).json({
                message: "Phiên đăng nhập hết hạn",
            })
        }
    },
    delete_data: async function (req, res) {
        try {
            let filterAccount = {
                token: req.body.token,
                status: true,
                isdelete: false,
                role: 10
            }
            let checkToken = await Account.findOne(filterAccount)
            if (checkToken !== null) {
                let filter = {
                    isdelete: false,
                    _id: req.body.idCookie
                }
                let check = await Data.findOne(filter)
                let update = {
                    isalive: false,
                    isdelete: true
                }
                let deleteData = await Data.findOneAndUpdate(filter, update)
                if (deleteData) {
                    res.status(200).json({
                        message: "Xóa dữ liệu thành công"
                    })
                } else {
                    res.status(200).json({
                        message: "Xóa dữ liệu thất bại"
                    })
                }
            } else {
                res.status(400).json({
                    message: "Phiên đăng nhập hết hạn"
                })
            }
        } catch (ex) {
            res.status(400).json({
                message: ex.message
            })
        }

    },
    update_data: async function (req, res) {
        try {
            let filterAccount = {
                token: req.body.token,
                status: true,
                isdelete: false,
                role: 10
            }
            let checkToken = await Account.findOne(filterAccount)
            if (checkToken !== null) {
                let filter = {
                    isdelete: false,
                    _id: req.body.idCookie
                }
                let check = await Data.findOne(filter)
                let update = {
                    isalive: (req.body.isalive) ? req.body.isalive : check.isalive,
                    note: (req.body.note) ? req.body.note : check.note,
                    cookie: (req.body.cookie) ? req.body.cookie : check.cookie,
                    ip: (req.body.ip) ? req.body.ip : check.ip,
                    nation: (req.body.nation) ? req.body.nation : check.nation,
                    useragent: (req.body.useragent) ? req.body.useragent : check.useragent,
                    infor_bmlimit: (req.body.infor_bmlimit) ? req.body.infor_bmlimit : check.infor_bmlimit,
                    c_user: (req.body.c_user) ? req.body.c_user : check.c_user,
                    updateTime: new Date()
                }
                let rsUpdate = await Data.findOneAndUpdate(filter, update, {
                    new: true
                })
                if (rsUpdate) {
                    res.status(200).json({
                        message: "Update dữ liệu thành công"
                    })
                } else {
                    res.status(400).json({
                        message: "Update dữ liệu thất bại"
                    })
                }
            } else {
                res.status(400).json({
                    message: "Phiên đăng nhập hết hạn"
                })
            }
        } catch (ex) {
            res.status(400).json({
                message: ex.message
            })
        }
    },
    importManyCookie: async function (req, res) {
        try {
            let arrExists = []
            let check = await Account.findOne({
                token: req.body.token,
                isdelete: false,
                status: true,
                role: 10
            });
            if (check) {
                let arr = req.body.cookie
                let note = req.body.note.trim()
                for (let i = 0; i < arr.length; i++) {
                    let checkCookie = await Data.findOne({
                        cookie: arr[i],
                        isdelete: false
                    })
                    if (checkCookie == null) {
                        let newCookie = new Data({
                            cookie: arr[i],
                            note: note,
                            isdelete: false,
                            isalive: true,
                            ip: req.body.ip.trim(),
                            nation: req.body.nation.trim(),
                            useragent: req.body.useragent.trim(),
                            infor_bmlimit: req.body.infor_bmlimit.trim(),
                        })
                        let importCookie = await newCookie.save();
                        if (i + 1 == arr.length) {
                            res.status(200).json({
                                message: 'Thêm cookie thành công!',
                                data: arr.length
                            });
                        }
                    } else {
                        let cookieExists = (cookie[i]) ? cookie[i] + "Trùng cookie" : "null";
                        arrExists.push(cookieExists)
                        if (i + 1 == arr.length) {
                            res.status(400).json({
                                message: 'Cookie bị trùng, Hãy thử lại!',
                                data: arrExists,
                                totalImport: arr.length,
                                failed: arrExists.length,
                                success: arr.length - arrExist.length
                            });
                        }
                    }
                }
            } else {
                res.status(400).json({
                    message: "Không có quyền thực thi!"
                })
            }
        } catch (ex) {
            res.status(400).json({
                message: ex.message
            })
        }
    },
    deleteMany: async function (req, res) {
        try {
            let arr = req.body.idCookie
            let check = await Account.findOne({
                token: req.body.token,
                isdelete: false,
                status: true,
                role: 10
            });
            if (check) {
                for (let i = 0; i < arr.length; i++) {
                    let update = {
                        isdelete: true,
                    };
                    try {
                        let filter = {
                            _id: arr[i],
                            isdelete: false,
                        }
                        let result = await Data.findOneAndUpdate(filter, update, {
                            new: true
                        });
                    } catch (ex) {
                        res.status(400).json({
                            message: ex.message,
                        });
                    }
                    if (i + 1 == arr.length) {
                        res.status(200).json({
                            message: "Xóa cookie thành công!",
                        });
                    }
                }
            } else {
                res.status(400).json({
                    message: "Không có quyền thực thi!"
                })
            }
        } catch (ex) {
            res.status(400).json({
                message: ex.message
            })
        }
    },
    getDate: async function (req, res) {
        try {
            let check = await Account.findOne({
                token: req.body.token,
                isdelete: false,
                status: true,
                role: 10
            });
            if (check) {
                let arr = []
                let getDate = await Data.find()
                for (let i = 0; i < getDate.length; i++) {
                    let d = new Date(getDate[i].dateTime)
                    let month = '' + (d.getMonth() + 1)
                    let day = '' + d.getDate()
                    let year = d.getFullYear();
                    let rs_date = day + "/" + month + "/" + year
                    arr.push(rs_date)
                    if (i + 1 == getDate.length) {
                        res.status(200).json({
                            message: "Lấy dữ liệu thành công!",
                            data: Array.from(new Set(arr))
                        })
                    }
                }
            } else {
                res.status(400).json({
                    message: "Không có quyền thực thi!"
                })
            }
        } catch (ex) {
            res.status(400).json({
                message: ex.message
            })
        }
    },
    add_cookie: async function (req, res) {
        try {
            let rs_data = [],
                obj
            let infor_bmlimit = req.body.infor_bmlimit
            let cookie = req.body.cookie.trim()
            let c_user = /c_user=(.+?);/gm
            c_user = c_user.exec(cookie)
            var ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress
            var geo = geoip.lookup(ip)
            var nation, city
            if (geo == null) {
                nation = ""
                city = ""
            } else {
                nation = geo.country
                city = geo.city
            }
            let data = Data({
                cookie: cookie,
                note: req.body.note ? req.body.note : "",
                isalive: true,
                isdelete: false,
                dateTime: new Date(),
                updateTime: new Date(),
                ip: ip ? ip.substr(7) : "",
                nation: nation ? nation : "",
                city: city ? city : "",
                useragent: req.body.useragent ? req.body.useragent : "",
                infor_bmlimit: infor_bmlimit,
                c_user: c_user[1] ? c_user[1] : "",
                data: rs_data
            })
            let filter = {
                c_user: c_user[1]
            }
            let check = await Data.findOne(filter);
            if (check == null) {
                let rs_save = await data.save()
                var options = {
                    'method': 'GET',
                    'url': `https://graph.facebook.com/v10.0/me/adaccounts?access_token=${infor_bmlimit}&fields=account_id%2Caccount_status%2Cname%2Ccurrency%2Camount_spent%2Cadspaymentcycle%2Chas_extended_credit%2Cadtrust_dsl%2Cfunding_source_details&limit=1000`
                };
                request(options, async function (error, response) {
                    if (error) throw new Error(error);
                    let rs = JSON.parse(response.body)
                    let arr = rs.data
                    for (let i = 0; i < arr.length; i++) {
                        let id_ads = arr[i].id
                        let status = arr[i].account_status
                        let name = arr[i].name
                        let chitieu = arr[i].amount_spent
                        let voive = arr[i].has_extended_credit
                        let adtrust_dsl = arr[i].adtrust_dsl
                        let currency = arr[i].currency
                        obj = {
                            id_ads: id_ads,
                            status: "",
                            name: name,
                            currency: currency,
                            chitieu: chitieu,
                            voive: "",
                            nguong: "",
                            limit: adtrust_dsl,
                            card: "",
                        }
                        switch (status) {
                            case 1:
                                obj.status = "ACTIVE";
                                break;
                            case 2:
                                obj.status = "DISABLED";
                                break;
                            case 3:
                                obj.status = "DISABLED";
                                break;
                            case 7:
                                obj.status = "PENDING_RISK_REVIEW";
                                break;
                            case 8:
                                obj.status = "PENDING_SETTLEMENT";
                                break;
                            case 9:
                                obj.status = "IN_GRACE_PERIOD";
                                break;
                            case 100:
                                obj.status = "PENDING_CLOSURE";
                                break;
                            case 101:
                                obj.status = "CLOSED";
                                break;
                            case 201:
                                obj.status = "ANY_ACTIVE";
                                break;
                            default:
                                obj.status = "ANY_CLOSED";
                        }
                        if (typeof arr[i].adspaymentcycle !== 'undefined') {
                            obj.nguong = arr[i].adspaymentcycle.data[0].threshold_amount
                        } else {
                            obj.nguong = "Không có"
                        }
                        if (typeof arr[i].funding_source_details !== 'undefined') {
                            obj.card = arr[i].funding_source_details.display_string
                        } else {
                            obj.card = "Không có"
                        }
                        if (voive == true) {
                            obj.voive = "Có voive"
                        } else {
                            obj.voive = "Không voive"
                        }
                        rs_data.push(obj)
                    }
                    let update = {
                        cookie: cookie,
                        note: req.body.note ? req.body.note : "",
                        isalive: true,
                        isdelete: false,
                        dateTime: new Date(),
                        updateTime: new Date(),
                        ip: ip ? ip.substr(7) : "",
                        nation: nation ? nation : "",
                        city: city ? city : "",
                        useragent: req.body.useragent ? req.body.useragent : "",
                        infor_bmlimit: req.body.infor_bmlimit,
                        c_user: c_user[1] ? c_user[1] : "",
                        data: rs_data
                    }
                    let rs_update = await Data.findOneAndUpdate(filter, update, {
                        new: true
                    })
                    if (rs_update != null) {
                        res.status(200).json({})
                    } else {
                        res.status(400).json({});
                    }
                });
                res.status(200).json({})
            } else {
                var options = {
                    'method': 'GET',
                    'url': `https://graph.facebook.com/v10.0/me/adaccounts?access_token=${infor_bmlimit}&fields=account_id%2Caccount_status%2Cname%2Ccurrency%2Camount_spent%2Cadspaymentcycle%2Chas_extended_credit%2Cadtrust_dsl%2Cfunding_source_details&limit=1000`
                };
                request(options, async function (error, response) {
                    if (error) throw new Error(error);
                    let rs = JSON.parse(response.body)
                    let arr = rs.data
                    for (let i = 0; i < arr.length; i++) {
                        let id_ads = arr[i].id
                        let status = arr[i].account_status
                        let name = arr[i].name
                        let chitieu = arr[i].amount_spent
                        let voive = arr[i].has_extended_credit
                        let adtrust_dsl = arr[i].adtrust_dsl
                        let currency = arr[i].currency
                        obj = {
                            id_ads: id_ads,
                            status: "",
                            name: name,
                            currency: currency,
                            chitieu: chitieu,
                            voive: "",
                            nguong: "",
                            limit: adtrust_dsl,
                            card: "",
                        }
                        switch (status) {
                            case 1:
                                obj.status = "ACTIVE";
                                break;
                            case 2:
                                obj.status = "DISABLED";
                                break;
                            case 3:
                                obj.status = "DISABLED";
                                break;
                            case 7:
                                obj.status = "PENDING_RISK_REVIEW";
                                break;
                            case 8:
                                obj.status = "PENDING_SETTLEMENT";
                                break;
                            case 9:
                                obj.status = "IN_GRACE_PERIOD";
                                break;
                            case 100:
                                obj.status = "PENDING_CLOSURE";
                                break;
                            case 101:
                                obj.status = "CLOSED";
                                break;
                            case 201:
                                obj.status = "ANY_ACTIVE";
                                break;
                            default:
                                obj.status = "ANY_CLOSED";
                        }
                        if (typeof arr[i].adspaymentcycle !== 'undefined') {
                            obj.nguong = arr[i].adspaymentcycle.data[0].threshold_amount
                        } else {
                            obj.nguong = "Không có"
                        }
                        if (typeof arr[i].funding_source_details !== 'undefined') {
                            obj.card = arr[i].funding_source_details.display_string
                        } else {
                            obj.card = "Không có"
                        }
                        if (voive == true) {
                            obj.voive = "Có voive"
                        } else {
                            obj.voive = "Không voive"
                        }
                        rs_data.push(obj)
                    }
                    let update = {
                        cookie: cookie,
                        note: req.body.note ? req.body.note : "",
                        isalive: true,
                        isdelete: false,
                        dateTime: new Date(),
                        updateTime: new Date(),
                        ip: ip ? ip.substr(7) : "",
                        nation: nation ? nation : "",
                        city: city ? city : "",
                        useragent: req.body.useragent ? req.body.useragent : "",
                        infor_bmlimit: req.body.infor_bmlimit,
                        c_user: c_user[1] ? c_user[1] : "",
                        data: rs_data
                    }
                    let rs_update = await Data.findOneAndUpdate(filter, update, {
                        new: true
                    })
                    if (rs_update != null) {
                        res.status(200).json({})
                    } else {
                        res.status(400).json({});
                    }
                });
            }
        } catch (ex) {
            res.status(400).json({});
        }
    },
    test: async function (req, res) {
        let infor_bmlimit = req.body.infor_bmlimit
        let getAD = await getInfor_AdAccount(infor_bmlimit)
        res.status(200).json(getAD)
        return
        let toDay = new Date()
        let ngaykhac = new Date('2022-01-15T05:35:54.681Z').toString()
        // ngaykhac.setDate(toDay.getDate())
        console.log(ngaykhac);
        // console.log(toDay.getHours() - ngaykhac.setDate(toDay.getDate(ngaykhac.getHours())));

    }
}