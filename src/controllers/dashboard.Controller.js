const pool = require("../../database/conection");


class DashboardController {
    constructor(){

    }
    inicio(req, res){
        try {
            const iReq = req.user
            const iDus = iReq.id_user
            pool.query(`SELECT * FROM project JOIN project_status ON project.id_project_status = project_status.id_project_status JOIN users_project ON project.id_project = users_project.id_project WHERE users_project.id_user = ?`,[iDus],(error,rows)=>{
                if(error){
                    console.log(error)
                }else if(rows.length <=0){
                    res.render('dashboard',{data:[],user:req.user,countP:[],countTa:[],estak:[]})
                }else{
                    pool.query(`SELECT COUNT(*) FROM users_project WHERE id_user = ?`,[iDus],(error,listP)=>{
                        if(error){
                            console.log(error)
                        }else{
                            pool.query(`SELECT COUNT(*) FROM task JOIN project ON task.id_project = project.id_project JOIN users_project ON project.id_project = users_project.id_project WHERE users_project.id_user = ?`,[iDus],(error,counT)=>{
                                if(error){
                                    console.log(error)
                                }else{
                                    const valueTP= listP[0]
                                    const valP = Object.values(valueTP)
                                    const valueToPr = valP[0]
                                    const valueTask=counT[0]
                                    const valueTa=Object.values(valueTask)
                                    const valCTask=valueTa[0]
                                    
                                    pool.query(`SELECT COUNT(task.id_task) AS TOTAL_TASK,project.name_project,project.id_project,SUM(CASE WHEN task.id_task_status = '3' THEN 1 ELSE 0 END) AS TASK_COMPLETE FROM task JOIN project ON project.id_project = task.id_project JOIN users_project ON project.id_project = users_project.id_project WHERE users_project.id_user = ? GROUP BY users_project.id_project;`,[iDus],(error,results)=>{
                                        if(error){
                                            console.log(error)
                                        }else{
                                            res.render('dashboard',{data:rows,user:req.user,countP:valueToPr,countTa:valCTask,estak:results})
                                            
                                        }
                                    })
                                    
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

module.exports = new DashboardController ();