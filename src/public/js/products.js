

const comprar =async (pid) => {
    let inputCarrito = document.getElementById("carrito")
    let cid = inputCarrito.value
    console.log(`codigo producto ${pid}, codigo carrito ${cid}`);

    let respuesta = await fetch(`/api/cart/${cid}/product/${pid}`, {method: "post"})
    if (respuesta.status === 200){
        let datos = await respuesta.json()
        console.log(datos);
        alert("producto agregado")
        
    }
    
}