const pool = require('../../database/conection.js')
const bcryptjs = require('bcryptjs')

class UserController{
    constructor(){

    }
    general(req,res){
        res.render('users',{user:req.user})
    }
    pagenewuser(req,res){
        try {
            pool.query(`SELECT * FROM roles`,(error,rows)=>{
                if(error){
                    res.status(404).send(error.message)
                }else if (rows.length <=0){
                    res.send('Cree primero roles de usuario',{user:req.user})
                    
                }else{
                    res.render('new-user',{data:rows,user:req.user})
                }
            })
        } catch (error) {
            res.status(500).send(error.message)
        }
        
    }
    pagecategoryuser(req,res){
        try {
            pool.query(`SELECT * FROM roles`,(error,rows)=>{
                if(error){
                    res.status(404).send(error.message)
                }
                if(rows.length <=0){
                    res.render('page-category-user',{data:[],user:req.user})
                }else{
                    res.render('page-category-user',{data:rows,user:req.user})
                    
                }
            })
        } catch (error) {
            res.status(500).send(error.message)
        }
        
    }
    pageCreateRoleUser(req,res){
        res.render('create-role-user',{user:req.user})
    }
    createNewRoleUser(req,res){
        try {
            const {nameRole} =req.body
            pool.query(`INSERT INTO roles(name_role) VALUES (?)`,[nameRole],(error,rows)=>{
                if(error){
                    res.status(404).send(error.message)
                }else{
                    res.status(200)
                    res.redirect('/users/category')
                }
            })
        } catch (error) {
            res.status(500).send(error.message)
        }
        
    }
    /*
    createUser(req,res){
        try {
            const {name,lastName,email,password,id_role}=req.body
            
            pool.query(`INSERT INTO users(name_user,lastname_user,email_user,password_user,id_role) VALUES(?,?,?,?,?)`,[name,lastName,email,password,id_role],(error,rows)=>{
                if(error){
                    res.status(404).send(error.message)
                }else{
                    res.status(200)
                    res.redirect('/users')
                }
            })
        } catch (error) {
            res.status(500).send(error.message)
        }
    }*/

    pageEditUser(req,res){
        try {
            const ktr = req.user
            const idP = ktr.id_user
            pool.query(`SELECT * FROM users WHERE id_user = ?`,[idP],(error,rows)=>{
                if(error){
                    res.status(404).send(error.message)
                }else{
                    const datoR=rows[0]
                    const valR=datoR.avatar_filepath
                    res.render('edit-user',{data:rows,avt:valR,user:req.user})
                    
                }
            })
        } catch (error) {
            res.status(500).send(error.message)
        }
        
    }
    editInfoUser(req,res){
        try {
            
            const {name,lastName,email,id_user} = req.body
            pool.query(`UPDATE users SET name_user=(?),lastname_user=(?),email_user=(?) WHERE id_user=?`,[name,lastName,email,id_user],(error,rows)=>{
                if(error){
                    res.status(404).send(error.message)
                }else{
                    res.redirect('/users/edit-user')
                }
            })
        } catch (error) {
            res.status(500).send(error.message)
        }
    }
    editAvatarProfileuser(req,res){
        try {
            const ktr = req.user
            const idP = ktr.id_user
            const {filename} = req.file;
            const filepath = `/uploads/${filename}`;
            
            pool.query(`UPDATE users SET avatar_filepath=(?) WHERE id_user=?`,[filepath,idP],(error,rows)=>{
                if(error){
                    res.status(404).send(error.message)
                }else{
                    res.redirect('/users/edit-user')
                }
            })
        } catch (error) {
            res.status(500).send(error.message)
        }
    }
    userRoleTemp(req,res){
        try {
            res.render('create-super-user')

        } catch (error) {
            res.status(500).send(error.message)
        }

    }
}

module.exports = new UserController();