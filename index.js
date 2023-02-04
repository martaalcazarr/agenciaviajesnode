//importar express
//version comun de javascript
//const express = require('express');
//version de import
import express from 'express';
import router from './routes/index.js';
import db from './config/db.js';


//llamo a express con app
const app = express();

//conectar la db
db.authenticate()
    .then(() => console.log('db conectada'))
    .catch(error => console.log(error))

//definir puerto
//process.env.port es una variable de entorno para asignar dónde va el deployment porqué
//ahi no sabemos que puerto estará disponible, el 4000 es solo para desarrollar el proyecto
const port = process.env.PORT || 4000;

//habilitar pug
app.set('view engine', 'pug');

//middleware de express propio
//obtener el año actual
app.use( (req, res, next) => {
    //locals es una variable de express
    const year = new Date();
    res.locals.actualYear = year.getFullYear();
    res.locals.nombreSitio = "Agencia de Viajes"
    //next es para irse al siguiente middleware(el app.use(express.static)) y no dejar la pagina pegada
    //si con next se queda pegado, con return next() lo obligo a devolver next
    next();
})

//agregar bodyparser para leer los datos del formulario
app.use(express.urlencoded({extended: true}));

//definir carpeta publica como archivos estaticos de express
app.use(express.static('public'));

//agregar el router para que funcione el otro index.js en routes
//con app use abrimos desde la pagina principal router, entonces se la agrega a todas las rutas que definamos
app.use('/', router);

//para arrancar el servidor con app.listen y el callback nos dice que está funcionando el servidor
app.listen(port, ()=>{
    console.log(`el servidor está funcionando en el puerto ${port}`);
})