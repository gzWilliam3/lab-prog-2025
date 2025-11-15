// para todos, es necesario de tener express instalado (el de npm)

const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000; 

// Variable global para almacenar los datos del menú (se carga una sola vez al iniciar)
let datosComida = {};
const dataPath = path.join(__dirname, 'src', 'data', 'datosProductos.json');

// Esto asegura que el JSON se lea solo una vez cuando se necesite por primera vez.
function cargarDatos(req, res, next) {
    if (Object.keys(datosComida).length > 0) {
        // Datos ya cargados, pasa a la siguiente ruta.
        next();
        return;
    }

    // Cargar los datos del JSON por primera vez.
    fs.readFile(dataPath, 'utf8', (err, data) => {
        if (err) {
            console.error("Error al leer datosProductos.json:", err);
            return res.status(500).json({ error: 'No se pudo leer el archivo de datos del servidor.' });
        }
        try {
            datosComida = JSON.parse(data);
            next(); // Continuar con el manejo de la ruta.
        } catch (e) {
            console.error("Error al parsear datosProductos.json:", e);
            return res.status(500).json({ error: 'El archivo de datos tiene un formato JSON inválido.' });
        }
    });
}

// 1. Servir archivos estáticos (HTML, CSS, JS, Assets) desde la carpeta 'src'.
app.use(express.static(path.join(__dirname, 'src')));

// Rutas amigables para los HTMLs (mantiene lo que ya tenías).
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'html', 'index.html'));
});

app.get('/productos', (req,res) => {
    res.sendFile(path.join(__dirname, 'src', 'html', 'productos.html'));
});

// Aplica el middleware de carga de datos a todas las rutas de la API.
app.use('/api', cargarDatos);


// 2. ENDPOINT UNIFICADO (Usado por platosSemana.js y cargaProductos.js)
app.get('/api/datosProductos', (req, res) => {
    // Devuelve el objeto JSON COMPLETO
    res.json(datosComida);
});


//ENDPOINTS ESPECÍFICOS POR CATEGORÍA.
//Ruta: /api/productos/pasta, /api/productos/sandwich, etc.
app.get('/api/productos/:categoria', (req, res) => {
    const categoriaKey = req.params.categoria; 
    
    // Transforma 'pasta' en 'productosPasta'.
    const keyConPrefijo = `productos${categoriaKey.charAt(0).toUpperCase() + categoriaKey.slice(1)}`;

    if (datosComida[keyConPrefijo]) {
        // Devuelve SOLAMENTE el array de la categoría solicitada.
        res.json(datosComida[keyConPrefijo]);
    } else {
        res.status(404).json({ error: 'Categoría de productos no encontrada.' });
    }
});


// Iniciar el servidor.
app.listen(PORT, () => {
    console.log(` Servidor 'Buen Morfar' ejecutándose en http://localhost:${PORT}`); //prueba, seguir viendo video.
});