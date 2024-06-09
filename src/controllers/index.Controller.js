const pool = require('../../database/conection.js')

class IndexController {
    constructor(){

    }
    pageLoginUser(req, res){
        res.render("index");
    }
    
}

module.exports = new IndexController();