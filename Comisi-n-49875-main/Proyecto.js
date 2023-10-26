const btnCart = document.querySelector('.container-cart-icon')
const containerCartProducts = document.querySelector('.container-cart-products')

btnCart.addEventListener('click', () => {
    containerCartProducts.classList.toggle('hidden-cart')
})

const cartInfo = document.querySelector('.cart-product');
const rowProduct = document.querySelector('.row-product');


const productList = document.querySelector('.container-items');
let allProducts = JSON.parse(localStorage.getItem("carrito")) || [];

const valorTotal = document.querySelector('.total-pagar');
const countProducts = document.querySelector('#contador-productos');


function updateCartDisplay() {
    if (allProducts.length === 0) {
        containerCartProducts.innerHTML = `
            <p class="cart-empty">El carrito está vacío</p>
        `;
    } else {
        containerCartProducts.innerHTML = '';
        let total = 0;
        let totalOfProducts = 0;

        allProducts.forEach((product, index) => {
            const containerProduct = document.createElement('div');
            containerProduct.classList.add('cart-product');

            containerProduct.innerHTML = `
                <div class="info-cart-product">
                    <span class="cantidad-producto-carrito">${product.quantity}</span>
                    <p class="titulo-producto-carrito">${product.title}</p>
                    <span class="precio-producto-carrito">${product.price}</span>
                </div>
                <svg
                    data-index="${index}"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="icon-close"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                    />
                </svg>
            `;

            containerCartProducts.appendChild(containerProduct);

            total = total + parseInt(product.quantity * product.price.slice(1));
            totalOfProducts = totalOfProducts + product.quantity;
        });

        valorTotal.innerText = `$${total}`;
        countProducts.innerText = totalOfProducts;
    }
}

productList.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-add-cart')) {
        const product = e.target.closest('.item');
        const quantity = 1; // Cantidad predeterminada
        const title = product.querySelector('h2').textContent;
        const price = product.querySelector('p.price').textContent;

        if (quantity < 1) {
            alert("La cantidad debe ser mayor o igual a 1.");
            return;
        }

        const infoProduct = {
            quantity,
            title,
            price,
        }

        const existingProduct = allProducts.find((product) => product.title === infoProduct.title);

        if (existingProduct) {
            existingProduct.quantity += infoProduct.quantity;
        } else {
            allProducts.push(infoProduct);
        }

        updateCartDisplay();
        saveLocal();
    }
});

containerCartProducts.addEventListener('click', (e) => {
    if (e.target.classList.contains('icon-close')) {
        const productIndex = parseInt(e.target.getAttribute('data-index'));
        if (!isNaN(productIndex) && productIndex >= 0 && productIndex < allProducts.length) {
            allProducts.splice(productIndex, 1);
            updateCartDisplay();
            saveLocal();
        }
    }
});

function saveLocal() {
    localStorage.setItem("carrito", JSON.stringify(allProducts));
}

updateCartDisplay();

const btnConfirmarCompra = document.querySelector('.btn-confirmar-compra');

btnConfirmarCompra.addEventListener('click', () => {
    allProducts = []; // Vacía el carrito
    saveLocal(); // Guarda el carrito vacío en el almacenamiento local
    updateCartDisplay(); // Actualiza la pantalla del carrito (debería mostrarlo vacío)
    countProducts.innerText = '0'; // Reinicia el número de productos a 0

    // También puedes agregar cualquier otra lógica que desees aquí, como mostrar un mensaje de confirmación.
});
