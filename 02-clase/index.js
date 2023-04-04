class ProductManager {
    
constructor(){
    this.products = []
}

    getProducts = () => {
        return this.products
    }

    addProduct = (
        title,
        description,
        price,
        thumbnail,
        code,
        stock
        ) => {
        
        if(!title || !description || !price || !thumbnail || !code || !stock) {
            console.log(`Todos los campos son obligatorios, por favor revisa tu entrada.`)
            return
        }

        const producto = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        };
        
        if (this.products.length === 0){
            producto.id = 1
        } else{
            producto.id = this.products[this.products.length - 1].id + 1
        }

        const foundCode = this.products.find(prod => prod.code === producto.code)

        if(foundCode){
            console.log(`El código de producto ${producto.code} coincide con uno existente, coloque otro por favor.`)
        } else{
            this.products.push(producto)
        }

    }


    getProductById = (productId) =>{
        const found = this.products.find( prodId => prodId.id === productId)
        
        if(!found){
            console.log(`Not Found`)
        } else {
            console.log(`El producto elegido es -${found.title}-`)
            console.log(found)
            
        }
    }

}


/* ===== =====   PROCESO DE TESTING   ===== ===== */


//Se llama a la instancia ProductoManager()
const productHandler = new ProductManager()

//Se llamará “getProducts” recién creada la instancia, debe devolver un arreglo vacío []
console.log(productHandler.getProducts())

/* 
Se llamará al método “addProduct” con los campos:
    
    -title: “producto prueba”
    -description:”Este es un producto prueba”
    -price:200,
    -thumbnail:”Sin imagen”
    -code:”abc123”
    -stock:25
*/

productHandler.addProduct('producto prueba', 'Este es un producto prueba', 200, 'Sin imagen', 'abc123', 25)

//El objeto debe agregarse satisfactoriamente con un id generado automáticamente SIN REPETIRSE
//Se llamará el método “getProducts” nuevamente, esta vez debe aparecer el producto recién agregado

console.log(productHandler.getProducts())

//Se llamará al método “addProduct” con los mismos campos de arriba, debe arrojar un error porque el código estará repetido.

productHandler.addProduct('producto prueba', 'Este es un producto prueba', 200, 'Sin imagen', 'abc123', 25) //Produco de prueba 1
productHandler.addProduct('producto prueba2', 'Este es un producto prueba2', 700, 'Sin imagen', 'abc1234', 25) //Producto de prueba 2 con Code diferente
console.log(productHandler.getProducts())

//Se evaluará que getProductById devuelva error si no encuentra el producto o el producto en caso de encontrarlo

productHandler.getProductById(1) //Id existente
productHandler.getProductById(7) //Error Not Found








