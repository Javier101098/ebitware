const express = require('express'),
 path = require('path'),
 morgan = require('morgan'),
 mysql = require('mysql'),
 myConnection = require('express-myconnection');
const app = express();

// importacion de rutas
const Routes = require('./routes/clientes');

// configuracion de puerto 
app.set('port', process.env.PORT || 3000);

// middlewares
app.use(morgan('dev'));
app.use(myConnection(mysql, {
  host: 'localhost',
  user: 'root',
  password: '',
  port: 3306,
  database: 'cliente'
}, 'single'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use((req,res,next)=>{
  res.header('Access-Control-Allow-Origin','*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-with, Content-Type, Accept,Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods','GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow','GET , POST, OPTIONS, PUT ,DELETE');
  next();
});
// routes
app.use('/', Routes);


// Iniciar el servidor
app.listen(app.get('port'), () => {
  console.log(`server on port ${app.get('port')}`);
});
