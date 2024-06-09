const pool = require('../../database/conection.js')

class TaskController{
    constructor(){

    }
    inicio(req,res){
        try {
            const idUser = req.user
            const idPL =idUser.id_user
            pool.query(`SELECT * FROM task JOIN task_status ON task.id_task_status = task_status.id_task_status JOIN project ON task.id_project = project.id_project JOIN users_project ON users_project.id_project = project.id_project WHERE users_project.id_user = ?`,[idPL],(error,rows)=>{
                if(error){
                    console.log(error)
                }else if(rows.length <= 0){
                    res.render('task',{user:req.user,data:[]})
                }else{
                    res.render('task',{user:req.user,data:rows})
                }
            })
        } catch (error) {
            console.log('fatal error:' + error)
        }
        
    }

    optionTask(req,res){
        try {
            const {id_task,option_task_s}=req.body
            const idUser = req.user
            const idPL =idUser.id_user
            if(option_task_s == 0){
                res.render('task-progress',{idTask:id_task,user:req.user})
            }
            if(option_task_s == 1){
                pool.query(`UPDATE task SET id_task_status = 2 WHERE id_task = ?`,[id_task],(error,result)=>{
                    if(error){
                        console.log(error)
                    }else{
                        pool.query(`SELECT * FROM task JOIN task_status ON task.id_task_status = task_status.id_task_status JOIN project ON task.id_project = project.id_project JOIN users_project ON users_project.id_project = project.id_project WHERE users_project.id_user = ?`,[idPL],(error,rows)=>{
                            if(error){
                                console.log(error)
                            }else if(rows.length <= 0){
                                res.render('task',{user:req.user,data:[]})
                            }else{
                                res.render('task',{user:req.user,data:rows})
                            }
                        })
                    }
                })
            }
            if(option_task_s == 2){
                pool.query(`UPDATE task SET id_task_status = 3 WHERE id_task = ?`,[id_task],(error,result)=>{
                    if(error){
                        console.log(error)
                    }else{
                        pool.query(`SELECT * FROM task JOIN task_status ON task.id_task_status = task_status.id_task_status JOIN project ON task.id_project = project.id_project JOIN users_project ON users_project.id_project = project.id_project WHERE users_project.id_user = ?`,[idPL],(error,rows)=>{
                            if(error){
                                console.log(error)
                            }else if(rows.length <= 0){
                                res.render('task',{user:req.user,data:[]})
                            }else{
                                res.render('task',{user:req.user,data:rows})
                            }
                        })
                    }
                })
            }
            if(option_task_s == 3){
                pool.query(`UPDATE task SET id_task_status = 1 WHERE id_task = ?`,[id_task],(error,result)=>{
                    if(error){
                        console.log(error)
                    }else{
                        pool.query(`SELECT * FROM task JOIN task_status ON task.id_task_status = task_status.id_task_status JOIN project ON task.id_project = project.id_project JOIN users_project ON users_project.id_project = project.id_project WHERE users_project.id_user = ?`,[idPL],(error,rows)=>{
                            if(error){
                                console.log(error)
                            }else if(rows.length <= 0){
                                res.render('task',{user:req.user,data:[]})
                            }else{
                                res.render('task',{user:req.user,data:rows})
                            }
                        })
                    }
                })
            }
            if(option_task_s == 4){
                pool.query(`SELECT * FROM task_progress JOIN users ON users.id_user = task_progress.id_user WHERE task_progress.id_task = ?`,[id_task],(error,rows)=>{
                    if(error){
                        console.log(error)
                    }else{
                        res.render('page-progress',{data:rows,user:req.user})
                    }
                })
            }
        } catch (error) {
            console.log('fatal error:' + error)
        }
    }

    newTaskProgress(req,res){
        try {
            const {nameTaskPro,dateInitial,timeInitial,dateFinish,timeFinish,description,id_user,id_task}=req.body
            pool.query(`INSERT INTO task_progress(title_task_progress,date_initial_task_progress,h_start_task_progress,date_finish_task_progress,h_finish_task_progress,description_task_progress,id_task,id_user) VALUES(?,?,?,?,?,?,?,?)`,[nameTaskPro,dateInitial,timeInitial,dateFinish,timeFinish,description,id_task,id_user],(error,rows)=>{
                if(error){
                    console.log(error)
                }else{
                    res.redirect('/task')
                }
            })
        } catch (error) {
            console.log('fatal error:' + error)
        }
    }

    optionTaskProgress(req,res){
        try {
            const {option_task_progress,id_task_progress}= req.body
            if(option_task_progress ==0){
                pool.query(`SELECT * FROM task_progress WHERE id_task_progress = ?`,[id_task_progress],(error,rows)=>{
                    if(error){
                        console.log(error)
                    }else{
                        res.render('edit-task-progress',{data:rows,user:req.user})
                    }
                })
            }
            if(option_task_progress ==1){
                pool.query(`DELETE FROM task_progress WHERE id_task_progress = ?`,[id_task_progress],(error,rows)=>{
                    if(error){
                        console.log(error)
                    }else{
                        res.redirect('/task')
                    }
                })
            }
        } catch (error) {
            console.log('fatal error:' + error)
        }
    }

    editTaskProgress(req,res){
        try {
            const {nameTaskPro,dateInitial,timeInitial,dateFinish,timeFinish,description,id_task_progress}=req.body
            pool.query(`UPDATE task_progress SET title_task_progress=?,date_initial_task_progress=?,h_start_task_progress=?,date_finish_task_progress=?,h_finish_task_progress=?,description_task_progress=? WHERE id_task_progress=?`,[nameTaskPro,dateInitial,timeInitial,dateFinish,timeFinish,description,id_task_progress],(error,rows)=>{
                if(error){
                    console.log(error)
                }else{
                    res.redirect('/task')
                }
            })
        } catch (error) {
            
        }
    }
}

module.exports = new TaskController();