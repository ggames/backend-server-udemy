//Requires
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');


//Inicializar variable
var app = express();

//Body Parser

// create application/x-www-form-urlencoded parser
app.use(bodyParser.urlencoded({extended: false}));

// parse various different custom JSON types as JSON
app.use(bodyParser.json());


//Importar Rutas
var appRoutes = require('./routes/app');
var usuarioRoutes = require('./routes/usuario');
var loginRoutes = require('./routes/login');

//Conexion a la base de datos
mongoose.connect('mongodb://localhost:27017/HospitalDB').then(
          () => {console.log('Conexion realizada con exito \x1b[32m%s\x1b[0m ', 'HospitalDB')}
).catch((err)=> {console.log('error de conexion', err )});


//Rutas
app.use('/usuario', usuarioRoutes); //Importa la ubicacion de la ruta tiene que estar arriba de AppRoutes
app.use('/login', loginRoutes);
app.use('/', appRoutes);


//Escuchar peticiones
app.listen(3000, ()=> {
          console.log('Express server puerto 3000: \x1b[32m%s\x1b[0m','online');
});