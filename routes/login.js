var express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var SEED = require('../config/config').SEED;


var app = express();

var Usuario = require('../models/usuario');

app.post('/', (req, res)=>{

          var body = req.body;

          Usuario.findOne({ email: body.email },(err, usuarioDB)=>{
                    if (err) {
                              return res.status(500).json({
                                        ok: false,
                                        mensaje: 'Error al buscar usuario',
                                        errors: err
                              });
                    }

                    if(!usuarioDB) {
                              return res.status(400).json({
                                        ok: false,
                                        mensaje: 'Credenciales incorrectas - email',
                                        errors: err
                              });
                    }

                    if(!bcrypt.compareSync(body.password, usuarioDB.password)){
                              return res.status(400).json({
                                        ok: false,
                                        mensaje: 'Credenciales incorrectas - password',
                                        errors: err
                              });

                    }


                    usuarioDB.password = ':)';

                    //Crear Tokens
                    var tokens = jwt.sign({usuario: usuarioDB}, SEED , {expiresIn: 14400}); // expira en 4 horas



                    res.status(200).json({
                              ok: true,
                              usuario: usuarioDB,
                              token: tokens,
                              id: usuarioDB._id
                    });

          });

          
});


module.exports = app;