const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000; 

let datosComida = {};
const dataPath = path.join(__dirname, 'src', 'data', 'datosProductos.json');

// Carga los datos del JSON.
function cargarDatos(req, res, next) {
    if (Object.keys(datosComida).length > 0) {
        next(); 
        return;
    }
    fs.readFile(dataPath, 'utf8', (err, data) => {
        if (err) {
            console.error("Error al leer datosProductos.json:", err);
            return res.status(500).json({ error: 'No se pudo leer el archivo de datos.' });
        }
        try {
            datosComida = JSON.parse(data);
            next(); 
        } catch (e) {
            console.error("Error al parsear datosProductos.json:", e);
            return res.status(500).json({ error: 'El archivo de datos tiene un formato JSON inválido.' });
        }
    });
}

// Sirve archivos estaticos.
app.use(express.static(path.join(__dirname, 'src')));

// Rutas para los htmls.
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'html', 'index.html'));
});

app.get('/productos', (req,res) => {
    res.sendFile(path.join(__dirname, 'src', 'html', 'productos.html'));
});

// Aplica la carga de datos a TODAS las rutas de la APIS.
app.use('/api', cargarDatos);


// 2. Endpoint unificado (Usando por platosSemana.js y cargaProductos.js).
app.get('/api/datosProductos', (req, res) => {
    res.json(datosComida); // Devuelve el JSON completo.
});


// 3. Endpoint especificos por categoria de comidas(Usando productos.js).
app.get('/api/productos/:categoria', (req, res) => {
    const categoriaKey = req.params.categoria; 
    const keyConPrefijo = `productos${categoriaKey.charAt(0).toUpperCase() + categoriaKey.slice(1)}`;

    if (datosComida[keyConPrefijo]) {
        res.json(datosComida[keyConPrefijo]); // Devuelve SOLO el array.
    } else {
        res.status(404).json({ error: 'Categoría de productos no encontrada.' }); //prueba, seguir viendo el video.
    }
});


// Iniciar el servidor.
app.listen(PORT, () => {
    console.log(`Servidor 'Buen Morfar' ejecutándose en http://localhost:${PORT}`); //prueba.
});