// Variable global para llevar el seguimiento de la diapositiva actual del carrusel
let currentSlide = 0;
// Array global para almacenar los productos en el carrito
let cart = [];



/* Mueve el carrusel en la dirección especificada */
function moveCarousel(step) {
    currentSlide += step; // Ajusta el índice de la diapositiva actual
    showSlide(currentSlide); // Muestra la diapositiva actualizada
}

/* Muestra la diapositiva en el índice proporcionado */
function showSlide(index) {
    const slides = document.querySelectorAll('.carousel-item'); // Obtiene todos los elementos de diapositiva
    if (index >= slides.length) currentSlide = 0; // Si el índice es mayor que el número de diapositivas, vuelve a la primera
    if (index < 0) currentSlide = slides.length - 1; // Si el índice es negativo, va a la última diapositiva
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === currentSlide); // Muestra la diapositiva activa
    });
}


// app.js
const express = require('express');
const conexionMysql = require('./conexionMysql'); // Importa la conexión desde db.js

const Scripts = express();

// Ruta para obtener datos de la base de datos
Scripts.get('/productos', (req, res) => {
  conexionMysql.query('SELECT * FROM productos', (err, results) => {
    if (err) {
        console.error('Error al realizar la consulta:', err);
        res.status(500).send('Error en la base de datos');
        return;
    }
    res.json(results); // Devuelve los datos en formato JSON
    });
});

// Inicia el servidor
Scripts.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});

