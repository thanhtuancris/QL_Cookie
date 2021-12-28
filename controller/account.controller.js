const fs = require('fs');
const md5 = require('md5');
const jwt = require('jsonwebtoken');
let Account = require('../model/account')
module.exports = {
    login: async (req, res) => {
        let username = req.body.username.trim();
        let password = req.body.password.trim();
        let acc = {
            username: username,
            password: md5(password)
        }
        let check = await Account.findOne(acc);
        if(check !== null) {
            let newToken = jwt.sign({
                username: username,
                password: password
            }, fs.readFileSync('primary.key'));
            let filter = {
                username: username,
                password: md5(password),
                isdelete: false,
                status: true,
                role: 10
            }
            let update = {
                token: newToken
            }
            let result = await Account.findOneAndUpdate(filter, update, {new:true})
            if (result != null) {
                res.status(200).json({
                    message: "Đăng nhập thành công!",
                    data: result.token
                });
            } else {
                res.status(400).json({
                    message: "Đăng nhập thất bại"
                });
            }
        }else{
            res.status(400).json({
                message: "Sai tài khoản hoặc mật khẩu!"
            })
        }
    },
    logout: async (req, res) => {
        let token = req.body.token;
        if (token !== null) {
            const filter = {
                token: token
            }
            const update = {
                token: ""
            }
            let result = await Account.findOneAndUpdate(filter, update);
            if (result !== null) {
                res.status(200).json({
                    message: "Đăng xuất thành công!"
                });
            } else {
                res.status(400).json({
                    message: "Đăng xuất thất bại!"
                });
            }
        } else {
            res.status(400).json({
                message: "Đăng xuất thất bại!"
            });
        }
    },
    changePassword: async function(req, res){
        let check = await Admin.findOne({
            token: req.body.token,
            isdelete: false,
            status: true,
            role: 10
        });
        try {
            if (check) {
                let username = check.username;
                let password = req.body.password.trim();
                let newpassword = req.body.newpassword.trim();
                let newToken = jwt.sign({
                    username: username,
                    password: md5(newpassword)
                }, fs.readFileSync('primary.key'));
                let filter = {
                    username: username,
                    password: md5(password)
                }
                let update = {
                    token: newToken,
                    date_edit: new Date(),
                    password: md5(newpassword),
                }
                let result1 = await Admin.findOneAndUpdate(filter, update, {
                    new: true
                });
                if (result1 != null) {
                    // result1.token = newToken;
                    res.status(200).json({
                        message: "Đổi mật khẩu thành công!",
                    });
                } else {
                    res.status(400).json({
                        message: "Mật khẩu cũ sai, vui lòng thử lại"
                    });
                }
            } else {
                res.status(401).json({
                    message: "Không có quyền thực thi!"
                });
            }
        } catch (ex) {
            res.status(401).json({
                message: ex.message,
            });
        }
    }
}