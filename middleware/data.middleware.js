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
    add_cookie: function(req, res, next) {
        let token1 = "Toang123@@"
        let token2 = "hellocacBan123@"
        if(req.headers.token1 !== token1){
            res.status(400).json({
                message: "Nhập lại trường dữ liệu"
            })
            return
        }
        if(req.headers.token2 !== token2){
            res.status(400).json({
                message: "Nhập lại trường dữ liệu"
            })
            return
        }
        next()
    },
}