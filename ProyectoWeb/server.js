//variables globales.
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000; 

// --- Configuracion de las rutas de los archivos ---
const dataPath = path.join(__dirname, 'src', 'data', 'datosProductos.json');
const votosPath = path.join(__dirname, 'src', 'data', 'votos.json');

let datosComida = {};
let datosVotos = {};

app.use(express.json()); // Necesario para leer el cuerpo de la petición POST.
app.use(express.static(path.join(__dirname, 'src'))); // Sirve para mapear los archivos estáticos.

function cargarDatos(req, res, next) {
    if (Object.keys(datosComida).length === 0) {
        try {
            datosComida = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
        } catch (e) {
            console.error("Error al leer datosProductos.json:", e);
            return res.status(500).json({ error: 'Error al cargar el menú principal.' });
        }
    }
    if (Object.keys(datosVotos).length === 0) {
        try {
            datosVotos = JSON.parse(fs.readFileSync(votosPath, 'utf8'));
        } catch (e) {
            datosVotos = {};
        }
    }
    next();
}

// Rutas HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'html', 'index.html'));
});

app.get('/productos', (req,res) => {
    res.sendFile(path.join(__dirname, 'src', 'html', 'productos.html'));
});

app.use('/api', cargarDatos);


// --- ENDPOINTS RESTFUL (GET) ---

// 1. OBtiene TODOS los datos del menú.
app.get('/api/datosProductos', (req, res) => {
    res.json(datosComida);
});

// 2. Obtiene los productos por categoría.
app.get('/api/productos/:categoria', (req, res) => {
    const categoriaKey = req.params.categoria;
    const keyConPrefijo = `productos${categoriaKey.charAt(0).toUpperCase() + categoriaKey.slice(1)}`;

    if (datosComida[keyConPrefijo]) {
        res.json(datosComida[keyConPrefijo]);
    } else {
        res.status(404).json({ error: 'Categoría de productos no encontrada.' });
    }
});

// OBTiene el estado de los votos.
app.get('/api/votos', (req, res) => {
    res.json(datosVotos);
});


// --- endpoints (POST) ---

//  Recibe y guardar un voto.
app.post('/api/votos', (req, res) => {
    const { platoId } = req.body;
    
    if (!platoId) {
        return res.status(400).json({ mensaje: 'ID del plato requerido.' });
    }

    const idStr = String(platoId);
    datosVotos[idStr] = (datosVotos[idStr] || 0) + 1;

    try {
        fs.writeFileSync(votosPath, JSON.stringify(datosVotos, null, 2));
        res.status(200).json({ mensaje: `Voto registrado para el plato ID ${platoId}. Total de votos: ${datosVotos[idStr]}` });
    } catch (error) {
        console.error("Error al guardar votos.json:", error);
        res.status(500).json({ mensaje: 'Error interno del servidor al guardar el voto.' });
    }
});


//INICIAR EL SERVIDOR
app.listen(PORT, () => {
    console.log(`Servidor 'Buen Morfar' (RESTful) ejecutándose en http://localhost:${PORT}`);
});