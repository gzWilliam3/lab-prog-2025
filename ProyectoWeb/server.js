const express = require('express');
const app = express();
const PORT = 3000;

// me sirve la carpeta src y todos sus archivos
app.use(express.static('src'));

// rutas personalizadas para facilitar cuestiones

// para htmls
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/src/html/index.html');
});

app.get('/productos', (req,res) => {
    res.sendFile(__dirname + '/src/html/productos.html');
});

// ruta personal para el JSON
app.get('/api/datosProductos', (req,res) => {
    res.sendFile(__dirname + '/src/data/datosProductos.json');
});

// inicia el servidor
app.listen(PORT, () => {
  console.log(`BuenMorfar corriendo en http://localhost:${PORT}`);
});
