var jwt = require('jsonwebtoken');
var SEED = require('../config/config').SEED;



//==================================================================
// Verificar Token (Va antes que las otras rutas de abajo porque despues de autenticar pasa a las siguientes)
//==================================================================

exports.verificarToken = function (req, res, next) {

          var token = req.query.token;

          jwt.verify(token, SEED, (err, decoded)=>{

                    if (err) {
                              return res.status(401).json({
                                        ok: false,
                                        mensaje: 'Token incorrecto',
                                        errors: err
                              });
                    }

                    req.usuario = decoded.usuario;

                    next();
          });

}


