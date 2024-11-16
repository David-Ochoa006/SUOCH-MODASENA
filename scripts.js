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

/* Filtra los productos según el término de búsqueda */
function searchProducts() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase(); // Obtiene el término de búsqueda
    const products = document.querySelectorAll('.product'); // Obtiene todos los productos
    products.forEach(product => {
        const productName = product.querySelector('h3').innerText.toLowerCase(); // Obtiene el nombre del producto
        if (productName.includes(searchTerm)) {
            product.style.display = 'block'; // Muestra el producto si el nombre incluye el término de búsqueda
        } else {
            product.style.display = 'none'; // Oculta el producto si el nombre no incluye el término de búsqueda
        }
    });
}

/* Filtra los productos según la categoría seleccionada */
function filterCategory(category) {
    const products = document.querySelectorAll('.product'); // Obtiene todos los productos
    products.forEach(product => {
        if (product.getAttribute('data-category') === category || category === 'all') {
            product.style.display = 'block'; // Muestra el producto si la categoría coincide o si la categoría es 'all'
        } else {
            product.style.display = 'none'; // Oculta el producto si la categoría no coincide
        }
    });
}

/* Añade un producto al carrito */
function addToCart(productId) {
    fetch(`http://localhost:3000/api/products/${productId}`) // Obtiene el producto por ID desde la API
        .then(response => response.json()) // Convierte la respuesta a JSON
        .then(product => {
            cart.push(product); // Añade el producto al carrito
            renderCart(); // Renderiza el carrito actualizado
        });
}

/* Renderiza los productos en el carrito */
function renderCart() {
    const cartItems = document.querySelector('.cart-items'); // Obtiene el contenedor de los elementos del carrito
    cartItems.innerHTML = ''; // Limpia el contenido del contenedor
    let total = 0; // Inicializa el total del carrito
    cart.forEach(item => {
        const cartItem = document.createElement('div'); // Crea un nuevo elemento para el artículo del carrito
        cartItem.className = 'cart-item'; // Establece la clase del elemento
        cartItem.innerHTML = `
            <p>${item.name}</p>
            <p>$${item.price}</p>
        `;
        cartItems.appendChild(cartItem); // Añade el artículo al contenedor del carrito
        total += item.price; // Suma el precio del artículo al total
    });
    document.getElementById('cart-total').innerText = total.toFixed(2); // Muestra el total del carrito
}

/* Función de pago (no implementada) */
function checkout() {
    alert('Función de pago no implementada.'); // Muestra un mensaje de alerta indicando que la función de pago no está implementada
}

/* Registra un nuevo usuario */
function registerUser(event) {
    event.preventDefault(); // Previene el comportamiento por defecto del formulario
    const name = document.getElementById('name').value; // Obtiene el nombre del formulario
    const email = document.getElementById('email').value; // Obtiene el correo electrónico del formulario
    const password = document.getElementById('password').value; // Obtiene la contraseña del formulario

    fetch('http://localhost:3000/api/register', { // Envía una solicitud POST para registrar al usuario
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password }) // Envía los datos del formulario como JSON
    })
    .then(response => response.json()) // Convierte la respuesta a JSON
    .then(data => {
        if (data.success) {
            window.location.href = 'login.html'; // Redirige a la página de inicio de sesión si el registro es exitoso
        } else {
            alert(data.message); // Muestra un mensaje de alerta con el error si el registro falla
        }
    });
}

/* Inicia sesión un usuario */
function loginUser(event) {
    event.preventDefault(); // Previene el comportamiento por defecto del formulario
    const email = document.getElementById('email').value; // Obtiene el correo electrónico del formulario
    const password = document.getElementById('password').value; // Obtiene la contraseña del formulario

    fetch('http://localhost:3000/api/login', { // Envía una solicitud POST para iniciar sesión
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password }) // Envía los datos del formulario como JSON
    })
    .then(response => response.json()) // Convierte la respuesta a JSON
    .then(data => {
        if (data.success) {
            localStorage.setItem('token', data.token); // Almacena el token de autenticación en el almacenamiento local
            window.location.href = 'index.html'; // Redirige a la página de inicio si el inicio de sesión es exitoso
        } else {
            alert(data.message); // Muestra un mensaje de alerta con el error si el inicio de sesión falla
        }
    });
}

// Llama a esta función cuando el contenido del documento esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:3000/api/products') // Obtiene los productos desde la API
        .then(response => response.json()) // Convierte la respuesta a JSON
        .then(products => {
            const productContainer = document.querySelector('.product-list'); // Obtiene el contenedor de la lista de productos
            products.forEach(product => {
                const productElement = document.createElement('div'); // Crea un nuevo elemento para el producto
                productElement.className = 'product'; // Establece la clase del elemento
                productElement.setAttribute('data-category', product.category); // Establece la categoría del producto como atributo
                productElement.innerHTML = `
                    <img src="${product.imageUrl}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p>$${product.price}</p>
                    <button onclick="addToCart('${product._id}')">Añadir al Carrito</button>
                `;
                productContainer.appendChild(productElement); // Añade el producto al contenedor de productos
            });
        });
});
