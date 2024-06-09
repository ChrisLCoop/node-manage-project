const pool = require('../../database/conection.js')

class ReportController{
    constructor(){

    }
    inicio(req,res){
        res.render('reports',{user:req.user})
    }
}

module.exports = new ReportController();