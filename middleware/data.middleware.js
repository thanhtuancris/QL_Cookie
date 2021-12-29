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
                message: "Thiếu trường dữ liệu"
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
        next()
    },
    import_data: function(req, res, next) {
        if(!req.body.token){
            res.status(400).json({
                message: "Thiếu trường dữ liệu token!"
            })
            return
        }
        next()
    },
}