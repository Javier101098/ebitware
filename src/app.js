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
// routes
app.use('/', Routes);


// Iniciar el servidor
app.listen(app.get('port'), () => {
  console.log(`server on port ${app.get('port')}`);
});
