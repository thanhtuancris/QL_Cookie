let Data = require('../model/data')
module.exports = {
    add_data: function(req, res, next) {
        if(!req.body.token){
            res.status(400).json({
                message: "Thiếu trường dữ liệu token!"
            })
            return
        }
        if(!req.body.cookie){
            res.status(400).json({
                message: "Thiếu trường dữ liệu cookie"
            })
            return
        }
         if(!req.body.note){
            res.status(400).json({
                message: "Thiếu trường dữ liệu note"
            })
            return
        }
        next()
    },
    get_data: function(req, res, next) {
        if(!req.body.token){
            res.status(400).json({
                message: "Thiếu trường dữ liệu token!"
            })
            return
        }
        next()
    },
    update_data: function(req, res, next) {
        if(!req.body.token){
            res.status(400).json({
                message: "Thiếu trường dữ liệu token!"
            })
            return
        }
        if(!req.body.isalive){
            res.status(400).json({
                message: "Thiếu trường dữ liệu isalive!"
            })
            return
        }
        next()
    },
    delete_data: function(req, res, next) {
        if(!req.body.token){
            res.status(400).json({
                message: "Thiếu trường dữ liệu token!"
            })
            return
        }
        if(!req.body.idCookie){
            res.status(400).json({
                message: "Thiếu trường dữ liệu ID!"
            })
            return
        }
        next()
    },
    import_data: function(req, res, next) {
        if(!req.body.token){
            res.status(400).json({
                message: "Thiếu trường dữ liệu token!"
            })
            return
        }
        if(!req.body.note){
            res.status(400).json({
                message: "Thiếu trường dữ liệu note!"
            })
            return
        }
        if(!req.body.cookie){
            res.status(400).json({
                message: "Thiếu trường dữ liệu cookie!"
            })
            return
        }
        next()
    },
    delete_many: function(req, res, next) {
        if(!req.body.token){
            res.status(400).json({
                message: "Thiếu trường dữ liệu token!"
            })
            return
        }
        if(!req.body.idCookie){
            res.status(400).json({
                message: "Thiếu trường dữ liệu ID!"
            })
            return
        }
        next()
    },
    add_cookie: async function(req, res, next) {
       let request_cookie = req.headers.request_cookie
       if(request_cookie !== 'Kh0ngc0dauem;;@@'){
           res.status(400).json({
               message: "Thiếu trường dữ liệu"
           })
           return
       }
       next()
    },
}