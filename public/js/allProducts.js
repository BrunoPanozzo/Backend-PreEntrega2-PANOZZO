//lado cliente, browser
document.addEventListener("DOMContentLoaded", function () {
    document.querySelector(".btn-agregarItem").addEventListener("click", function () {
        // Handle the button click event here
        alert("Button clicked!");
    });

})

document.addEventListener("DOMContentLoaded", function () {    
    const allDeleteButtons = document.querySelectorAll(".btn-eliminarItem")
    allDeleteButtons.forEach(btn => {
        btn.addEventListener("click", function () {
            // Handle the button click event here
            //alert(`${btn.id} clicked`);  
            socket.emit('deleteProduct', `${btn.id}`)
        });
    });
})

const socket = io()

socket.on('newProduct', (product) => {
    //agregar el nuevo producto al html
    
    const container = document.getElementById('productsList')
    container.innerHTML += `
    <div class="card text-bg-light mb-3 item">
            <div class="card-header">${product.category}</div>
            <div class="card-body">
                <h5 class="card-title">${product.title}</h5>
                <img src="/images/productos/${product.thumbnail}" alt=${product.title} width="270" />
                <p class="card-text item-precio">$ ${product.price}</p>
                <p class="card-text item-stock">Stock Disponible: ${product.stock}</p>
                <p class="card-text item-descripcion">${product.description}</p>
            </div>
            <div class"col align-self-center">
                <button type="button" class="btn btn-danger text-decoration
                    text-center btn-eliminarItem" id=${product.id}>Eliminar producto
                </button>
            </div>
        </div>
     `
})

socket.on('deleteProduct', (idProd) => {
    //eliminar el producto al html
    const container = document.getElementById(idProd)
    if (container) 
        container.remove()
})