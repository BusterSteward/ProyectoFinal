const express = require("express");
const {Sequelize, DataTypes, Model} = require('sequelize');
const cors = require('cors');

//Realizamos conexion a la base de datos
const conexion = new Sequelize('Infinite_dungeon','root','',{
    host:'localhost',
    dialect:'mysql'
});


conexion.authenticate()
.then(() => {
    console.log("Conexion exitosa");
})
.catch(err => {
    console.log("Error de conexion");
})

//Modelos de la base de datos
/*
    Usuario{
        email VARCHAR(45) PRIMARY KEY,
        password VARCHAR(100),
        nombre VARCHAR(45)
    }
*/ 
class Usuarios extends Model{}

Usuarios.init({
    email: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    }
},
{
    sequelize: conexion,
    modelName: 'Usuarios'
}
)

class Puntuaciones extends Model{}

Puntuaciones.init({
    idpuntuaciones: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fecha: DataTypes.DATE,
    puntos: DataTypes.INTEGER,
    salas: DataTypes.INTEGER,
    usuarios_email: {
        type: DataTypes.STRING,
        references: {
            model: Usuarios,
            key: 'email'
        }
    }
},
{
    sequelize: conexion,
    modelName: 'Puntuaciones'
})

Usuarios.hasMany(Puntuaciones, { foreignKey: 'usuarios_email', sourceKey: 'email' });
Puntuaciones.belongsTo(Usuarios, { foreignKey: 'usuarios_email', targetKey: 'email' });

//Arrancamos la API
const app = express();
app.use(express.json());
app.use(cors())

app.get('/prueba', (req, res) => {
    //res.setHeader('Content-Type', 'text/plain')
    res.send("funsiona")
})

app.get('/usuarios', async (req, res) => {
    await Usuarios.sync()

    const usuario = await Usuarios.findOne({
        where: {
            email: req.query.email
        }
    })
    if(!usuario){
        res.status(404).json({
            ok: false,
            status: 404,
            msg: "Usuario no encontrado",
        })
    
    }
    else{
        if(usuario.password != req.query.password){
            res.status(404).json({
                ok: false,
                status: 404,
                msg: "Contraseña incorrecta"
            })
        }
        else{
            res.status(200).json({
                ok: true,
                status: 200,
                msg: "TODO OK",
                datos: usuario
            })

        }
    }
})
app.post('/usuarios', async (req, res) => {
    await Usuarios.sync()
    try{
        const body = req.body;
        const createUsuario = await Usuarios.create({
            "email": body.email,
            "password": body.password,
            "nombre": body.nombre
        })
        res.status(200).json({
            ok: true,
            status: 200,
            msg: "TODO OK",
        })
    }
    catch(err){
         // Si hay una excepción, verifica si es una violación de la restricción UNIQUE (clave primaria)
        if (err instanceof Sequelize.UniqueConstraintError) {
            res.status(400).json({  
                ok: false,
                status: 400,
                msg: "El usuario ya existe", 
            });
        } else {
            // Maneja otros errores de alguna manera
            res.status(500).json({ 
                ok: false,
                status: 500,
                msg: "Hubo un problema con el servidor",  
            });
        }
    }

})
app.get('/puntuaciones', async (req, res) => {
    await Puntuaciones.sync()
    try{
        const numPagina = parseInt(req.query.numPagina);
        const nRegistros = parseInt(req.query.nRegistros);
        const email = req.query.email;
        let miwhere = email ? {usuarios_email: email} : {};
       
        console.log("npagina",numPagina,"nregistros", nRegistros,"email",email)
        const puntuaciones = await Puntuaciones.findAndCountAll({
            where: miwhere,
            offset: (numPagina - 1) * nRegistros,
            limit: nRegistros,
            include: [{
                model: Usuarios,
                attributes: ['email', 'nombre']
            }]
        })
        res.status(200).json({
            ok: true,
            status: 200,
            datos: puntuaciones
        })
    }
    catch(err){
        console.error(err)
        
        res.status(500).json({
            ok: false,
            status: 500,
            msg: "Hubo un problema con el servidor",
        })
    }
})

app.post('/puntuaciones', (req, res) => {

})

app.get('/partidas/:email', (req, res) => {

})

app.post('/partidas', (req, res) => {

})


app.listen(3000, () => {
    console.log("Server is running on port 3000");
})