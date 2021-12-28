const fs = require('fs');
const md5 = require('md5');
const jwt = require('jsonwebtoken');
let Account = require('../model/account')
module.exports = {
    login: async (req, res) => {
        let username = req.body.username;
        let password = req.body.password;
        let newToken = jwt.sign({
            username: username,
            password: password
        }, fs.readFileSync('primary.key'));
        const filter = {
            username: username,
            password: md5(password),
        }
        const update = {
            token: newToken
        }
        let result = await Account.findOneAndUpdate(filter, update);
        if (result !== null) {
            result.token = newToken;
            res.status(200).json({
                message: "Đăng nhập thành công!",
            });
        } else {
            res.status(400).json({
                message: "Đăng nhập thất bại!"
            });
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
}