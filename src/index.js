const express = require('express')
const cors = require('cors')
//const dotenv = require('dotenv')
//require('dotenv').config();

const cookieParser = require('cookie-parser')

const indexRoutes = require('./routes/index.Routes.js')
const dashboardRoutes = require('./routes/dashboard.Routes.js')
const usersRouter = require('./routes/users.Routes.js')
const proyectoRouter = require('./routes/proyecto.Routes.js')
const taskRouter = require('./routes/task.Routes.js')
const reportRouter = require('./routes/report.Router.js')

const app = express();
app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());

//dotenv.config({path:'./env'})

app.use(cookieParser())

app.set('view engine','ejs')
app.set('views',__dirname + '/views')

app.use(express.static(__dirname + '/public'))

app.use('/',indexRoutes)
app.use('/dashboard',dashboardRoutes)
app.use('/users',usersRouter)
app.use('/project',proyectoRouter)
app.use('/task',taskRouter)
app.use('/report',reportRouter)

app.listen(3000,()=>{
    //console.log('server open in port 3000')
})