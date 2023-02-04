import express from 'express';
import { paginaInicio, 
        paginaNosotros, 
        paginaViajes,   
        paginaTestimonios,    
        paginaDetalleViaje 
    } from '../controllers/paginasController.js';
import { guardarTestimonio } from '../controllers/testimonioController.js'
//no puedo definir app = express dos veces en el proyecto(se reiniciaria siempre el servidor), entonces uso router, "ampliando express"
//el router es el encargado de registrar todas las urls o endpoints de la app
const router = express.Router();

//get a las paginas con pug (desde controllers)
//para pasarle variables js a pug hago una const, despues de res.render('nosotros, { viajes}
    //y en pug lo llamo por ejemplo como p= viajes y ya reconoce que es una variable js)
    //const viajes = 'viaje alemania'
router.get('/', paginaInicio);
router.get('/nosotros', paginaNosotros);
router.get('/viajes', paginaViajes);
//para evitar crear una ruta para cada elemento, crea un metodo del controlador con /:y el elemento, viaje
router.get('/viajes/:slug', paginaDetalleViaje);
router.get('/testimonios', paginaTestimonios);
router.post('/testimonios', guardarTestimonio);

export default router;