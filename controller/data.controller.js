let Data = require('../model/data')
let Account = require('../model/account')
module.exports = {
    add_data: async function(req, res){
        let checkToken = await Account.findOne({token: req.body.token})
        if(checkToken !== null){
            let operation = req.body.operation.trim()
            let userAgent = req.body.userAgent.trim()
            let cookie = req.body.cookie.trim()
            let name = req.body.name.trim()
            let nation = req.body.nation.trim()
            let image = req.body.image.trim()
            let token = req.body.token.trim()
            let tokenBusiness = req.body.tokenBusiness.trim()
            let phone = req.body.phone
            let data = Data({
                name: name,
                nation: nation,
                image: image,
                token: token,
                tokenBusiness: tokenBusiness,
                phone: phone,
                operation: operation,
                userAgent: userAgent,
                cookie: cookie,
                isAlive: true,
                isDelete: false,
                dateTime: new Date()
            })
            let check = await Data.findOne({
                phone: phone
            });
            if(check != null){
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
        let checkToken = await Account.findOne({token: req.body.token});
        if(checkToken !== null){
            let filter = {
                isDelete: false
            }
            if(req.body.operation){
                filter = {
                    operation: new RegExp(req.body.operation.trim(), 'i')
                }
            }
            if(req.body.userAgent){
                filter = {
                    userAgent: new RegExp(req.body.userAgent.trim(), 'i')
                }
            }
            if(req.body.isDelete == 'true'){
                filter = {
                    isDelete: true
                }
            }
            if(req.body.isAlive){
                filter = {
                    isAlive: req.body.isAlive
                }
            }
            if(req.body.name){
                filter = {
                    name: new RegExp(req.body.name.trim(), 'i')
                }
            }
            if(req.body.nation){
                filter = {
                    nation: new RegExp(req.body.name.trim(), 'i')
                }
            }
            if(req.body.phone){
                filter = {
                    phone: new RegExp(req.body.phone.trim(), 'i')
                }
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
            const perPage = 10;
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
                meta: {
                    page,
                    totalData,
                    totalPage,
                }
            })
        }else{
            res.status(400).json({
                message: "Phiên đăng nhập hết hạn",
            })
        }
    },
    
    delete_data: async function(req, res){
        let checkToken = await Account.findOne({token: req.body.token})
        if(checkToken !== null){
            let filter = {
                isDelete: false,
                name: req.body.name
            }
            let check = await Data.findOne(filter)
            let update = {
                isActive: false,
                isDelete: true
            }
            let deleteData = await Data.findOneAndUpdate(filter, update)
            if(deleteData){
                res.status(200).json({
                    message: "Delete dữ liệu thành công"
                })
            }else{
                res.status(200).json({
                    message: "Delete dữ liệu thất bại"
                })
            }
        }else{
            res.status(400).json({
                message: "Phiên đăng nhập hết hạn"
            })
        }
        
    },
    update_data: async function(req, res){
        let checkToken = await Account.findOne({token: req.body.token})
        if(checkToken !== null){
            let filter = {
                isDelete: false,
                name: req.body.name
            }
            let check = await Data.findOne(filter)
            let update = {
                isActive: (req.body.isActive) ? req.body.isActive : check.isActive,
                name: (req.body.name) ? req.body.name: check.name,
                nation: (req.body.nation) ? req.body.nation: check.nation,
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
    }
}