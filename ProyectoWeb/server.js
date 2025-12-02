<<<<<<< HEAD
//Codigo hecho con patron RPC.
=======
//variables globales.
>>>>>>> origin/actualizacionEntreRamas
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

// Configuracion de las rutas de los archivos.
const dataPath = path.join(__dirname, 'src', 'data', 'datosProductos.json');
const votosPath = path.join(__dirname, 'src', 'data', 'votos.json');
const comentariosPath = path.join(__dirname, 'src', 'data', 'comentarios.json');

<<<<<<< HEAD
// Configuracion de rutas de los archivos de datos.
const dataPath = path.join(__dirname, 'src', 'data', 'datosProductos.json');
const votosPath = path.join(__dirname, 'src', 'data', 'votos.json');

let datosComida = {};
let datosVotos = {}; 

// Permite al servidor leer el cuerpo de las peticiones POST en formato JSON.
app.use(express.json()); 
app.use(express.static(path.join(__dirname, 'src')));
app.use('/assets',express.static(path.join(__dirname, 'src', 'assets')));

function cargarDatos(req, res, next) {
    // Carga los datos del menú y votos.
=======
let datosComida = {};
let datosVotos = {};
let datosComentarios = {};

app.use(express.json()); // Necesario para leer el cuerpo de la petición POST.
app.use(express.static(path.join(__dirname, 'src'))); // Sirve para mapear los archivos estáticos.

function cargarDatos(req, res, next) {
>>>>>>> origin/actualizacionEntreRamas
    if (Object.keys(datosComida).length === 0) {
        try {
            datosComida = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
        } catch (e) {
            console.error("Error al leer datosProductos.json:", e);
            return res.status(500).json({ error: 'Error al cargar el menú principal.' });
        }
    }
    if (Object.keys(datosVotos).length === 0) {
<<<<<<< HEAD
         try {
            datosVotos = JSON.parse(fs.readFileSync(votosPath, 'utf8'));
        } catch (e) {
            datosVotos = {}; 
        }
    }
    next();
}

// Rutas HTML
=======
        try {
            datosVotos = JSON.parse(fs.readFileSync(votosPath, 'utf8'));
        } catch (e) {
            datosVotos = {};
        }
    }
    if (Object.keys(datosComentarios).length === 0) {
    try {
        datosComentarios = JSON.parse(fs.readFileSync(comentariosPath, 'utf8'));
    } catch (e) {
        datosComentarios = {};
    }
}

    next();
}

app.use('/api', cargarDatos);

// Rutas HTML.
>>>>>>> origin/actualizacionEntreRamas
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'html', 'index.html'));
});

app.get('/productos', (req,res) => {
    res.sendFile(path.join(__dirname, 'src', 'html', 'productos.html'));
});

<<<<<<< HEAD
app.get('/reviews', (req,res) => {
    res.sendFile(path.join(__dirname, 'src', 'html', 'reviews.html'));
});

=======
>>>>>>> origin/actualizacionEntreRamas
app.use('/api', cargarDatos);

// ENDPOINTS GET

<<<<<<< HEAD
// OBTENER todos los datos del menú.
app.get('/api/getDatosProductos', (req, res) => {
    res.json(datosComida); 
});

// OBTENER productos por categoría.
=======
// OBtiene TODOS los datos del menú.
app.get('/api/datosProductos', (req, res) => {
    res.json(datosComida);
});

// Obtiene los productos por categoría.
>>>>>>> origin/actualizacionEntreRamas
app.get('/api/productos/:categoria', (req, res) => {
    const categoriaKey = req.params.categoria;
    const keyConPrefijo = `productos${categoriaKey.charAt(0).toUpperCase() + categoriaKey.slice(1)}`;

    if (datosComida[keyConPrefijo]) {
        res.json(datosComida[keyConPrefijo]);
    } else {
        res.status(404).json({ error: 'Categoría de productos no encontrada.' });
    }
});

<<<<<<< HEAD
// OBTENER el estado de los votos.
app.get('/api/getVotos', (req, res) => {
    res.json(datosVotos);
});


// RECIBIR y guardar un voto.
app.post('/api/votarPlato', (req, res) => {
=======
// Obtiene el estado de los votos.
app.get('/api/votos', (req, res) => {
    res.json(datosVotos);
});

app.get('/api/comentarios/:id', (req, res) => {
    const id = req.params.id;

    if (!datosComentarios[id]) {
        return res.json([]);
    }

    res.json(datosComentarios[id]);
});


// endpoints POST

// Recibe y guardar un voto.
app.post('/api/votos', (req, res) => {
>>>>>>> origin/actualizacionEntreRamas
    const { platoId } = req.body;
    
    if (!platoId) {
        return res.status(400).json({ mensaje: 'ID del plato requerido.' });
    }

<<<<<<< HEAD
    const idStr = String(platoId); 
=======
    const idStr = String(platoId);
>>>>>>> origin/actualizacionEntreRamas
    datosVotos[idStr] = (datosVotos[idStr] || 0) + 1;

    try {
        fs.writeFileSync(votosPath, JSON.stringify(datosVotos, null, 2));
        res.status(200).json({ mensaje: `Voto registrado para el plato ID ${platoId}. Total de votos: ${datosVotos[idStr]}` });
    } catch (error) {
        console.error("Error al guardar votos.json:", error);
<<<<<<< HEAD
        res.status(500).json({ mensaje: 'Error interno del servidor al guardar el voto.' }); //prueba.
=======
        res.status(500).json({ mensaje: 'Error interno del servidor al guardar el voto.' });
    }
});

app.post('/api/comentarios/:id', (req, res) => {
    const id = req.params.id;
    const { nombre, comentario } = req.body;

    if (!nombre || !comentario) {
        return res.status(400).json({ mensaje: "Faltan campos obligatorios." });
    }

    const nuevoComentario = {
        nombre,
        comentario,
        fecha: new Date().toISOString()
    };

    if (!datosComentarios[id]) {
        datosComentarios[id] = [];
    }

    datosComentarios[id].push(nuevoComentario);

    try {
        fs.writeFileSync(comentariosPath, JSON.stringify(datosComentarios, null, 2));
        res.status(200).json({ mensaje: "Comentario guardado correctamente." });
    } catch (error) {
        console.error("Error al guardar comentarios:", error);
        res.status(500).json({ mensaje: "Error interno al guardar comentario." });
>>>>>>> origin/actualizacionEntreRamas
    }
});


<<<<<<< HEAD
// INICIAR EL SERVIDOR.
app.listen(PORT, () => {
    console.log(`Servidor 'Buen Morfar' (RPC) ejecutándose en http://localhost:${PORT}`);
=======
//INICIAR EL SERVIDOR
app.listen(PORT, () => {
    console.log(`Servidor 'Buen Morfar' (RESTful) ejecutándose en http://localhost:${PORT}`);
>>>>>>> origin/actualizacionEntreRamas
});