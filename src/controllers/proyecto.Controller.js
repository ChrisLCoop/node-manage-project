const pool = require('../../database/conection.js')

class ProyectoController{
    constructor(){

    }
    inicio(req,res){
        try {
            const ktr = req.user
            const idP = ktr.id_user
            pool.query(`SELECT * FROM project JOIN project_status JOIN users_project ON users_project.id_project = project.id_project AND project.id_project_status = project_status.id_project_status WHERE users_project.id_user = ?`,[idP],(error,rows)=>{
                if(error){
                    console.log(error)
                }else if(rows.length <=0){
                    res.render('projects',{user:req.user,data:[]})
                    }else{
                        res.render('projects',{user:req.user,data:rows})
                    }
            })
        } catch (error) {
            console.log('fatal error:' + error)
        }
    }
    pageProjectStatus(req,res){
        try {
            pool.query(`SELECT * FROM project_status`,(error,rows)=>{
                if(error){
                    console.log(error)
                }else if(rows.length <=0){
                    res.render('page-project-status',{data:[],user:req.user})
                }else{
                    res.render('page-project-status',{data:rows,user:req.user})
                }
            })
        } catch (error) {
            console.log('fatal error:' + error)
        }
    }
    newProjectStatus(req,res){
        try {
            const{nameProSta}=req.body
            pool.query(`INSERT INTO project_status(name_project_status) VALUES(?)`,[nameProSta],(error,rows)=>{
                if(error){
                    console.log(error)
                }else{
                    res.redirect('/project/project-status')
                }
            })
            
        } catch (error) {
            console.log('fatal error:' + error)
        }
    }
    pageCreateProject(req,res){
        try {
            pool.query(`SELECT * FROM project_status`,(error,rows)=>{
                if(error){
                    console.log(error)
                }else if(rows.length <=0){
                    res.send('Create First at least one Status Project')
                }else{
                    res.render('new-project',{data:rows,user:req.user})
                }
            })
        } catch (error) {
            console.log('fatal error:' + error)
        }
    }
    createNewProject(req,res){
        try {
            const {nameProject,dateInitial,dateFinish,description,id_project_status,id_user} =req.body
            pool.query(`INSERT INTO project(name_project,date_initial_project,date_finish_project,description_project,id_project_status) VALUES(?,?,?,?,?)`,[nameProject,dateInitial,dateFinish,description,id_project_status],(error,rows)=>{
                if(error){
                    console.log(error)
                }else{
                    const idNewProject = rows.insertId
                    pool.query(`INSERT INTO users_project(id_user,id_project) VALUES(?,?)`,[id_user,idNewProject],(error,result)=>{
                        if(error){
                            console.log(error)
                        }else{
                            res.redirect('/project')
                        }
                    })
                }
            })
        } catch (error) {
            console.log('fatal error:' + error)
        }
    }
    optionProject(req,res){
        try {
            const ktr = req.user
            const idP = ktr.id_user
            const{project_action,id_project}= req.body
            if(project_action ==0){
                pool.query(`SELECT * FROM users JOIN users_project ON users.id_user = users_project.id_user WHERE id_role=3 AND users_project.id_project NOT IN (?);`,[id_project],(error,rows)=>{
                    if(error){
                        console.log(error)
                    }else{
                        pool.query(`SELECT * FROM users JOIN users_project ON users.id_user = users_project.id_user AND users.id_role=3 WHERE users_project.id_project =?`,[id_project],(error,list)=>{
                            if(error){
                                console.log(error)
                            }else if(list.length<=0) {
                                res.render('team-project',{data:rows,idProject:id_project,user:req.user,dato:[]})
                            }else{
                                res.render('team-project',{data:rows,idProject:id_project,user:req.user,dato:list})
                            }
                        })
                    }
                })
            }
            if(project_action==1){
                pool.query(`SELECT * FROM project JOIN project_status ON project.id_project_status = project_status.id_project_status WHERE project.id_project =?`,[id_project],(error,rows)=>{
                    if(error){
                        console.log(error)
                    }else{
                        pool.query(`SELECT * FROM users JOIN users_project ON users.id_user = users_project.id_user WHERE users_project.id_project = ? AND users.id_user NOT IN (?)`,[id_project,idP],(error,list)=>{
                            if(error){
                                console.log(error)
                            }else if(list.length <=0){
                                //res.render('project-summary',{user:req.user,data:rows,dato:[]})
                                res.send('add at least one employee to the project')
                            }else{
                                res.render('project-summary',{user:req.user,data:rows,dato:list,idProject:id_project})
                            }
                        })
                        
                    }
                })
            }
            if(project_action==2){
                pool.query(`SELECT * FROM project JOIN project_status ON project.id_project_status = project_status.id_project_status WHERE project.id_project = ?`,[id_project],(error,rows)=>{
                    if(error){
                        console.log(error)
                    }else{
                        res.render('edit-project',{data:rows,user:req.user})
                    }
                })
            }
            if(project_action==3){
                pool.query(`SELECT * FROM task WHERE id_project = ?`,[id_project],(error,rows)=>{
                    if(error){
                        console.log(error)
                    }else if(rows.length >=1){
                        res.send('first delete all tasks from this project')
                    }else{
                        pool.query(`DELETE FROM users_project WHERE id_project = ?`,[id_project],(error,rows)=>{
                            if(error){
                                console.log(error)
                            }else{
                                pool.query(`DELETE FROM project WHERE id_project = ?`,[id_project],(error,rows)=>{
                                    if(error){
                                        console.log(error)
                                    }else{
                                        res.redirect('/project')
                                    }
                                })
                            }
                        })
                    }
                })
            }
            if(project_action==4){
                pool.query(`UPDATE project SET id_project_status= 1 WHERE id_project=?`,[id_project],(error,rows)=>{
                    if(error){
                        console.log(error)
                    }else{
                        res.redirect('/project')
                    }
                })
            }
            if(project_action==5){
                pool.query(`UPDATE project SET id_project_status= 2 WHERE id_project=?`,[id_project],(error,rows)=>{
                    if(error){
                        console.log(error)
                    }else{
                        res.redirect('/project')
                    }
                })
            }
            if(project_action==6){
                pool.query(`UPDATE project SET id_project_status= 3 WHERE id_project=?`,[id_project],(error,rows)=>{
                    if(error){
                        console.log(error)
                    }else{
                        res.redirect('/project')
                    }
                })
            }
        } catch (error) {
            console.log('fatal error:' + error)
        }
    }

    updateProject(req,res){
        try {
            const {nameProject,dateInitial,dateFinish,description,id_project}=req.body
            pool.query(`UPDATE project SET name_project=?,date_initial_project=?,date_finish_project=?,description_project=? WHERE id_project=?`,[nameProject,dateInitial,dateFinish,description,id_project],(error,rows)=>{
                if(error){
                    console.log(error)
                }else{
                    res.redirect('/project')
                }
            })

        } catch (error) {
            console.log('fatal error:' + error)
        }
    }

    addOrRemoveTeam(req,res){
        try {
            const{option_tw,id_project,id_user}=req.body
            if(option_tw ==0){
                pool.query(`INSERT INTO users_project(id_user,id_project) VALUES(?,?)`,[id_user,id_project],(error,rows)=>{
                    if(error){
                        console.log(error)
                    }else{
                        res.redirect('/project')
                    }
                })
            }
            if(option_tw==1){
                pool.query(`DELETE FROM users_project WHERE id_user=?`,[id_user],(error,rows)=>{
                    if(error){
                        console.log(error)
                    }else{
                        res.redirect('/project')
                    }
                })
            }
        } catch (error) {
            console.log('fatal error:' + error)
        }
    }

    pageAdminTask(req,res){
        try {
            const{id_project}= req.body
            pool.query(`SELECT * FROM task JOIN task_status ON task.id_task_status = task_status.id_task_status JOIN project ON project.id_project = task.id_project WHERE task.id_project = ?`,[id_project],(error,rows)=>{
                if(error){
                    console.log(error)
                }else if(rows.length <=0){
                    res.render('admin-task',{data:[0],user:req.user,idProject:id_project})
                }else{
                    res.render('admin-task',{data:rows,user:req.user,idProject:id_project})
                }
            })
        } catch (error) {
            console.log('fatal error:' + error)
        }
    }

    pageNewTask(req,res){
        try {
            const {id_project}=req.body
            pool.query(`SELECT * FROM task_status`,(error,rows)=>{
                if(error){
                    console.log(error)
                }else if(rows.length <=0){
                    res.send('Create at least one Task Status')
                }else{
                    res.render('new-task',{data:rows,idProject:id_project,user:req.user})
                }
            })
        } catch (error) {
            console.log('fatal error:' + error)
        }
    }

    pageCreateTaskStatus(req,res){
        try {
            pool.query(`SELECT * FROM task_status`,(error,rows)=>{
                if(error){
                    console.log(error)
                }else if(rows.length <=0){
                    res.render('create-task-status',{data:[],user:req.user})
                }else{
                    res.render('create-task-status',{data:rows,user:req.user})
                }
            })
        } catch (error) {
            console.log('fatal error:' + error)
        }
    }

    newTaskStatus(req,res){
        try {
            const{nameTaskStatus}=req.body
            pool.query(`INSERT INTO task_status(name_task_status) VALUES(?)`,[nameTaskStatus],(error,rows)=>{
                if(error){
                    console.log(error)
                }else{
                    res.redirect('/project/create-task-status')
                }
            })
        } catch (error) {
            console.log('fatal error:' + error)
        }
    }

    newTask(req,res){
        try {
            const {nameTask,description,id_task_status,id_project}= req.body
            pool.query(`INSERT INTO task(name_task,description_task,id_task_status,id_project) VALUES(?,?,?,?)`,[nameTask,description,id_task_status,id_project],(error,rows)=>{
                if(error){
                    console.log(error)
                }else{
                    res.redirect('/project')
                }
            })
        } catch (error) {
            console.log('fatal error:' + error)
        }
    }

    optionTask(req,res){
        try {
            const {id_task,op_task_val}=req.body
            if(op_task_val==0){
                pool.query(`SELECT * FROM task WHERE id_task = ?`,[id_task],(error,rows)=>{
                    if(error){
                        console.log(error)
                    }else{
                        res.render('edit-task',{data:rows,user:req.user})
                    }
                })
            }
            if(op_task_val==1){
                pool.query(`DELETE FROM task_progress WHERE id_task=?`,[id_task],(error,rows)=>{
                    if(error){
                        console.log(error)
                    }else{
                        pool.query(`DELETE FROM task WHERE id_task=?`,[id_task],(error,resutls)=>{
                            if(error){
                                console.log(error)
                            }else{
                                res.redirect('/project')
                            }
                        })
                    }
                })
            }
        } catch (error) {
            console.log('fatal error:' + error)
        }
    }

    updateTask(req,res){
        try {
            const {nameTask,description,id_task} = req.body
            pool.query(`UPDATE task SET name_task=?,description_task=? WHERE id_task=?`,[nameTask,description,id_task],(error,rows)=>{
                if(error){
                    console.log(error)
                }else{
                    res.redirect('/project')
                }
            })
        } catch (error) {
            console.log('fatal error:' + error)
        }
    }
}

module.exports = new ProyectoController();