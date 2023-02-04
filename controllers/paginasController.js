import { Viaje } from "../models/Viaje.js";
import { Testimonio } from "../models/testimonios.js";

//controllers para renderizar cada pagina con su pug
const paginaInicio = async (req, res) => {
    //consultar 3 viajes del modelo viaje
    //y 3 testimonios a la vez, primero creo un arreglo, le hago push a las 2 consultas
    //y entonces hago un await con ese promise
    const promiseDB = []
    promiseDB.push(Viaje.findAll({limit: 3}));
    promiseDB.push(Testimonio.findAll({limit: 3}))
    try{
        const resultado = await Promise.all(promiseDB)
        
        res.render('inicio',{
            pagina: 'Inicio',
            clase: 'home', 
            //le paso la posicion 0 y 1 porque quedan dentro del arreglo en esas posiciones
            viajes: resultado[0],
            testimonios: resultado[1]
        });

    }catch(error){
        console.log(error)
    }
    
}

const paginaNosotros = (req, res) => {
    res.render('nosotros', {
        pagina: 'Nosotros'
    });
}

const paginaViajes = async (req, res) => {
    //consultar db
    const viajes = await Viaje.findAll();
   
    res.render('viajes', {
        pagina: 'Próximos viajes',
        viajes
    });
}

const paginaTestimonios = async (req, res) => {
    try{
        const testimonios = await Testimonio.findAll();
        res.render('testimonios', {
            pagina: 'Testimonios',
            testimonios
        })
    }catch (error){
        console.log(error)
    }
}

//muestra un viaje por su slug
const paginaDetalleViaje = async (req, res) => {
    const {slug} = req.params;
    try{
        const viaje = await Viaje.findOne({where : {slug}});
        res.render('viaje',{
            pagina: 'Información viaje',
            viaje
        })
    }catch(error){
        console.log(error)
    }
}

export {
    paginaInicio,
    paginaNosotros,
    paginaViajes,
    paginaTestimonios,
    paginaDetalleViaje
}