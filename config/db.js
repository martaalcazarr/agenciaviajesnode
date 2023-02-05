import Sequelize from 'sequelize';
//dotenv se importa en el archivo donde vaya a usar las varibles de entorno
import dotenv from 'dotenv';
//para que lea el .env con dotenv.config()

dotenv.config()

console.log(process.env.DB_HOST)
//variables de entorno para no mostrar la información privada. las variables de entorno
//se ven de una forma al desarrollar y de otra al colgar la pagina online
const db = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS,{
    //host: process.env.DB_HOST,
    host: '0.0.0.0',
    port: '7530',
    dialect: 'mysql',
    define:{
        timestamps: false
    },
    pool:{
        max: 5,
        min: 0,
        acquires: 30000,
        idle: 1000
    },
    operatorAliases: false
})

export default db
