module.exports = {
    add_data: function(req, res, next) {
        if(!req.body.operation){
            res.status(400).json({
                message: "Thiếu trường dữ liệu"
            })
            return 
        }
        if(!req.body.userAgent){
            res.status(400).json({
                message: "Thiếu trường dữ liệu"
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
    }
}