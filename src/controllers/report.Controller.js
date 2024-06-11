const pool = require('../../database/conection.js')

class ReportController{
    constructor(){

    }
    inicio(req,res){
        try {
            const ktr = req.user
            const idP = ktr.id_user
            pool.query(`SELECT * FROM project JOIN users_project ON project.id_project = users_project.id_project JOIN project_status ON project_status.id_project_status = project.id_project_status WHERE users_project.id_user= ?`,[idP],(error,rows)=>{
                if(error){
                    console.log(error)
                }else{
                    
                    pool.query(`SELECT * FROM task JOIN project ON task.id_project = project.id_project JOIN users_project ON users_project.id_project = project.id_project JOIN task_status ON task.id_task_status = task_status.id_task_status WHERE users_project.id_user = ? ORDER BY project.name_project ASC`,[idP],(error,list)=>{
                        if(error){
                            console.log(error)
                        }else{
                            pool.query(`SELECT COUNT(task.id_task) AS TOTAL_TASK,project.name_project,project.id_project,SUM(CASE WHEN task.id_task_status = '3' THEN 1 ELSE 0 END) AS TASK_COMPLETE FROM task JOIN project ON project.id_project = task.id_project JOIN users_project ON project.id_project = users_project.id_project WHERE users_project.id_user = ? GROUP BY users_project.id_project;`,[idP],(error,count)=>{
                                if(error){
                                    console.log(error)
                                }else{
                                    res.render('reports',{user:req.user,data:rows,dato:list,cont:count})
                                }
                            })
                            
                        }
                    })
                }
            })
        } catch (error) {
            console.log('fatal error:' + error)
        }
    }
}

module.exports = new ReportController();