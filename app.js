const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors());

let cartones = [];

// Generar los primeros 5 cartones...
for (let i = 1; i <= 5; i++) {
  let carton = {
    id: i,
    numeros: generarNumeros(),
  };
  cartones.push(carton);
}

// Función para generar números aleatorios sin repetirse
function generarNumeros() {
  let numeros = [];
  while (numeros.length < 15) {
    let numero = Math.floor(Math.random() * 30) + 1;
    if (!numeros.includes(numero)) {
      numeros.push(numero);
    }
  }
  return numeros;
}

// GET: devuelve la lista completa de cartones generados
app.get('/cartones', (req, res) => {
  res.json(cartones);
});

// POST: crea un nuevo cartón
app.post('/cartones', (req, res) => {
  let carton = {
    id: cartones.length + 1,
    numeros: generarNumeros(),
  };
  cartones.push(carton);
  res.json(carton);
});

// Levantar el servidor
app.listen(3000, () => {
  console.log('Servicio de cartones escuchando en el puerto 3000');
});