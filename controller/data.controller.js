let Data = require('../model/data')
let Account = require('../model/account')
module.exports = {
    add_data: async function(req, res){
        let filterAccount = {
            token: req.body.token,
            status: true,
            isdelete: false,
            role: 10
        }
        let checkToken = await Account.findOne(filterAccount)
        if(checkToken !== null){
            let data = Data({
                cookie: req.body.cookie.trim(),
                note: req.body.note.trim(),
                isalive: true,
                isdelete: false,
                dateTime: new Date()
            })
            let check = await Data.findOne({
                cookie: req.body.cookie.trim()
            });
            if(check !== null){
                res.status(400).json({
                    message: "Dữ liệu đã tồn tại"
                });
            }else{
                let rs_save = await data.save()
                if(rs_save != null){
                    res.status(200).json({
                        message: "Thêm dữ liệu thành công",
                    })
                }else{
                    res.status(400).json({
                        message: "Thêm dữ liệu thất bại"
                    });
                }
            }
        }else{
            res.status(400).json({
                message: "Phiên đăng nhập hết hạn"
            });
        }
        
    },
    get_data: async function(req, res){
        let filterAccount = {
            token: req.body.token,
            status: true,
            isdelete: false,
            role: 10
        }
        let checkToken = await Account.findOne(filterAccount);
        if(checkToken !== null){
            let filter = {
                isdelete: false
            }
            // if (req.body.start_date && req.body.stop_date) {
            //     var start_date = new Date();
            //     start_date.setDate(start_date.getDate() - req.body.start_date);
            //     start_date.setUTCHours(0, 0, 0, 0);
            //     var stop_date = new Date();
            //     stop_date.setDate(stop_date.getDate() - req.body.stop_date);
            //     stop_date.setUTCHours(0, 0, 0, 0);
    
            //     filter.date_reg = {
            //         "$gte": stop_date.toISOString(),
            //         "$lte": start_date.toISOString()
            //     };
            // }
            if(req.body.note){
                filter.note = new RegExp(req.body.note.trim(), 'i')
            }
            if(req.body.isalive){
                filter.isalive = req.body.isalive
            }
            if(req.body.start_date){
                let start_date = new Date(req.body.start_date + " 07:00")
                let stop_date = new Date(req.body.start_date + " 07:00")
                stop_date.setDate(start_date.getDate() + 1)
                filter.dateTime = {
                    "$gte": start_date,
                    "$lt": stop_date
                }
            }
            const perPage =  parseInt(req.body.limit || 10);
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
        }else{
            res.status(400).json({
                message: "Phiên đăng nhập hết hạn",
            })
        }
    },
    delete_data: async function(req, res){
        try{
            let filterAccount = {
                token: req.body.token,
                status: true,
                isdelete: false,
                role: 10
            }
            let checkToken = await Account.findOne(filterAccount)
            if(checkToken !== null){
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
                if(deleteData){
                    res.status(200).json({
                        message: "Xóa dữ liệu thành công"
                    })
                }else{
                    res.status(200).json({
                        message: "Xóa dữ liệu thất bại"
                    })
                }
            }else{
                res.status(400).json({
                    message: "Phiên đăng nhập hết hạn"
                })
            }
        }catch(ex){
            res.status(400).json({
                message: ex.message
            })
        }
        
    },
    update_data: async function(req, res){
        try{
            let filterAccount = {
                token: req.body.token,
                status: true,
                isdelete: false,
                role: 10
            }
            let checkToken = await Account.findOne(filterAccount)
            if(checkToken !== null){
                let filter = {
                    isdelete: false,
                    _id: req.body.idCookie
                }
                // let check = await Data.findOne(filter)
                let update = {
                    isalive: (req.body.isalive) ? req.body.isalive : check.isalive,
                    note: (req.body.note) ? req.body.note : check.note,
                    cookie: (req.body.cookie) ? req.body.cookie : check.cookie,
                }
                let rsUpdate = await Data.findOneAndUpdate(filter, update)
                if(rsUpdate){
                    res.status(200).json({
                        message: "Update dữ liệu thành công"
                    })
                }else{
                    res.status(400).json({
                        message: "Update dữ liệu thất bại"
                    })
                }
            }else{
                res.status(400).json({
                    message: "Phiên đăng nhập hết hạn"
                })
            }
        }catch(ex){
            res.status(400).json({
                message: ex.message
            })
        }
    }, 
    importManyCookie: async function(req, res){
        try{
            let arrExists = []
            let check = await Account.findOne({
                token: req.body.token,
                isdelete: false,
                status: true,
                role: 10
            });
            if(check){
                let arr = req.body.cookie
                let note = req.body.note.trim()
                for (let i = 0; i < arr.length; i++) {
                    let checkCookie = await Data.findOne({
                        cookie: arr[i],
                        isdelete: false
                    })
                    if(checkCookie == null){
                        let newCookie = new Data({
                            cookie: arr[i],
                            note: note,
                            isdelete: false,
                            isalive: true,
                        })
                        let importCookie = await newCookie.save();
                        if(i+1 == arr.length){
                            res.status(200).json({
                                message: 'Thêm cookie thành công!',
                                data: arr.length
                            });
                        }
                    }else{
                        let cookieExists = (cookie[i]) ? cookie[i] + "Trùng cookie" : "null";
                        arrExists.push(cookieExists)
                        if(i+1 == arr.length){
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
            }else{
                res.status(400).json({
                    message: "Không có quyền thực thi!"
                })
            }
        }catch(ex){
            res.status(400).json({
                message: ex.message
            })
        }
    },
    deleteMany: async function(req, res){
        try{
            let arr = req.body.idCookie
            let check = await Account.findOne({
                token: req.body.token,
                isdelete: false,
                status: true,
                role: 10
            });
            if(check){
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
            }else{
                res.status(400).json({
                    message: "Không có quyền thực thi!"
                })
            }
        }catch(ex){
            res.status(400).json({
                message: ex.message
            })
        }
    },
    getDate: async function(req,res){
        try{
            let check = await Account.findOne({
                token: req.body.token,
                isdelete: false,
                status: true,
                role: 10
            });
            if(check){
                let arr = []
                let getDate = await Data.find()
                for(let i = 0; i < getDate.length; i++){
                    let d = new Date(getDate[i].dateTime)
                    let month = '' + (d.getMonth() + 1)
                    let day = '' + d.getDate()
                    let year = d.getFullYear();
                    let rs_date = day + "/" + month + "/" + year
                    arr.push(rs_date)
                    if(i+1 == getDate.length){
                        res.status(200).json({
                            message: "Lấy dữ liệu thành công!",
                            data: Array.from(new Set(arr))
                        })
                    }
                }
            }else{
                res.status(400).json({
                    message: "Không có quyền thực thi!"
                })
            }
        }catch(ex){
            res.status(400).json({
                message: ex.message
            })
        }
    }
}