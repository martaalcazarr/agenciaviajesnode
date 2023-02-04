import { Testimonio } from '../models/testimonios.js';

const guardarTestimonio = async (req, res) => {
    //validar valores
    const {nombre, correo, mensaje } = req.body;
    //trim para quitar los espacios al principio y al final 
    const errores = []
    if(nombre.trim() === ''){
        errores.push({mensaje: 'El nombre está vacio'})
    }
    if(correo.trim() === ''){
        errores.push({mensaje: 'El correo está vacio'})
    }
    if(mensaje.trim() === ''){
        errores.push({mensaje: 'El mensaje está vacio'})
    }
    console.log(req.body)
    //si hay al menos uno vacio, muestra
    if(errores.length > 0){
        //consultar testimonios existentes
        const testimonios = await Testimonio.findAll();
        //mostrar la pagina con errores
        res.render('testimonios', {
            pagina: 'Testimonios',
            errores,
            nombre,
            mensaje,
            correo,
            testimonios
        });
        
    }else{
        //almacenarlo en la db
        try{
            await Testimonio.create({
                nombre,
                correo,
                mensaje
            })
            res.redirect('/testimonios')
        }catch (error){
            console.log(error)
        }
    }
}

export {
    guardarTestimonio
}