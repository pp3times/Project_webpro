const express = require('express')
const pool = require('../config')
const path = require("path")
const multer = require('multer')
const { json } = require("express");
const router = express.Router()


router.post('/register/account',async function(req, res, next) {
    let username = req.body.username;
    let password1 = req.body.password1;
    let password2 = req.body.password2;
    let tel = req.body.tel;
    let email = req.body.email;
    let address = req.body.address;
    let birth = req.body.birth;
    let gender = req.body.gender;
    console.log(username, password1, password2, tel, email, address, birth, gender)
    if(password1 != password2){
        alert("Password do not match")
    }
    else{
        const conn = await pool.getConnection()
        await conn.beginTransaction();
        try {
            const user = await conn.query(
                'INSERT INTO Users(user_name, user_password, user_phone, user_address, user_email, user_gender, user_birth) VALUES(?, ?, ?, ?, ?, ?, ?)', [
                    username, password1, tel, address, email, gender, birth
                ]
            )
            user_id = user[0].insertId
            console.log(user_id)
            const login = await conn.query(
                'INSERT INTO Login(login_username, login_password, User_user_id) VALUES(?, ?, ?)', [
                    username, password1, user_id
                ]
            )
            await conn.commit()
            res.json('sucess')
        } catch (err) {
            await conn.rollback();
            next(err);
        } finally {
            console.log('finally')
            conn.release();
        }
        
    }
    
})
router.post('/connected',async function(req, res, next) {
    let username = req.body.username;
    let password = req.body.password
    const [data, field] = await pool.query(
        'SELECT login_username, login_password, User_user_id FROM Login WHERE login_username = ?',[
            username
        ]
    )
    let fklogin = data[0].User_user_id
    const [user, field1] = await pool.query(
        'SELECT * FROM Users WHERE user_id = ?',[
            fklogin
        ]
    )
    let dataname = ''
    let datapassword = ''
    if(data.length != 0){
        dataname = data[0].login_username;
        datapassword = data[0].login_password;
    }
    console.log(data[0])
    if((dataname == username) && (datapassword == password)){
        res.json(user[0])
    }
    else{
        res.send('Username or password not correct')
    }

})
module.exports = router
