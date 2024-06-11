const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')
const pool = require('../../database/conection.js')
const {promisify} = require('util')
require('dotenv').config()

exports.register = async(req,res)=>{
    try {
        const {name,lastName,email,password,profession,id_role}=req.body
        let passHash =await bcryptjs.hash(password, 10)
        pool.query(`INSERT INTO users(name_user,lastname_user,email_user,password_user,profession_user,id_role) VALUES(?,?,?,?,?,?)`,[name,lastName,email,passHash,profession,id_role],(error,rows)=>{
            if(error){
                console.log('fatal error:' + error)
            }else{
                res.status(200)
                res.redirect('/users')
            }
        })
        
    } catch (error) {
        res.status(500).send(error.message)
    }

}

exports.login = async (req,res)=>{
    try {
        const {user,pass}= req.body
        pool.query(`SELECT * FROM users WHERE email_user = ?`,[user], async(error,rows)=>{
            if(rows.length <=0 || ! (await bcryptjs.compare(pass, rows[0].password_user))){
                console.log('email user or password is incorrect')
            }else{
                const id = rows[0].id_user
                const token = jwt.sign({id:id}, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRATION_TIME
                })
                //token sin fecha de expiracion
                //const token = jwt.sign({id:id}, process.env.JWT_SECRET)
                //console.log(token)
                //console.log(user)
                const cookiesOptions ={
                    expires: new Date(Date.now() + process.env.JWT_EXPIRATION_COOKIE * 24 * 60 * 1000),
                    httpOnly: true
                }
                res.cookie('jwt', token, cookiesOptions)
                res.redirect('/dashboard')
            }
        })
    } catch (error) {
        console.log(error)
    }
}

exports.isAuthenticated = async(req,res,next)=>{
    if (req.cookies.jwt){
        try {
            const decodificated = await promisify(jwt.verify)(req.cookies.jwt,process.env.JWT_SECRET)
            pool.query(`SELECT * FROM users WHERE id_user=?`,[decodificated.id],(error,rows)=>{
                if(!rows){return next()}
                req.user = rows[0]
                return next()
            })
        } catch (error) {
            console.log(error)
            return next()
        }
    }else{
        res.redirect('/')
    }
}

exports.logout = (req,res)=>{
    res.clearCookie('jwt')
    return res.redirect('/')
}