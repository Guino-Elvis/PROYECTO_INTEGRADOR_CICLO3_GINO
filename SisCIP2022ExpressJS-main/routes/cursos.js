var express = require('express');
var router = express.Router();
var dbConn  = require('../lib/db');


router.get('/', function(req, res, next) {
    res.render('cursos/add');
});

// add a new book
router.post('/add', function(req, res, next) {    

    let titulo = req.body.titulo;
    let descripcion = req.body.descripcion;
    let tipo = req.body.tipo;
    let errors = false;

    if(!errors) {
        var form_data = {
            titulo: titulo,
            descripcion: descripcion,
            tipo: tipo
        }
        
        // insert query
        dbConn.query('INSERT INTO cursos SET ?', form_data, function(err, result) {
            //if(err) throw err
            if (err) {
                req.flash('error', err)
                // render to add.ejs
                res.render('cursos/add', {
                    titulo: titulo,
                    descripcion: descripcion,
                    tipo: tipo                
                })
            } else {                
                req.flash('success', 'Curso successfully added');
                res.redirect('/dashboard');
            }
        })
    }
})

module.exports = router;