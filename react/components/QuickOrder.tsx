import React,{useState, useEffect} from 'react';
import {useMutation, useLazyQuery} from 'react-apollo';
// import {useLazyQuery} from 'react-apollo';
import UPDATE_CART from '../graphql/updateCart.graphql';         //Siempre se utiliza dentro del componente
import GET_PRODUCT from '../graphql/getProductBySku.graphql';


function QuickOrder() {

    // Los hooks deben estar en nivel superior del componente
    const [inputSku, setInputSku] = useState("");
    const [search, setSearch] = useState("");

    const [getProductData, {data: product}] = useLazyQuery(GET_PRODUCT);

    const [addToCart] = useMutation(UPDATE_CART);

    // console.log('addToCart:::',addToCart);

    useEffect(() => {
        console.log('Data de mi Producto:::', product);
        console.log('Búsqueda:::', search);
        // if(!product){
        //     alert('Ingrese algo real');
        //     console.log('product1:::', product);
        // }else{
            console.log('product2:::', product);
            let skuId = parseInt(inputSku);
            console.log('skuID::: ', skuId);
            addToCart({
                variables:{
                    salesChannel : "1",
                    items :[
                        {
                            id: skuId,
                            quantity: 1,
                            seller: "1"
                        }
                    ]
                }
            }).then(()=>{
                window.location.href = "/checkout"   
            })
        // }
    }, [product, search]);

    const handleChange = (event:any) =>{
        setInputSku(event.target.value);
        console.log('Value:::', inputSku);
    }
    const handleSubmit = (event:any) => {
        event.preventDefault();
        if(!inputSku){
            alert('Ingrese algún dato')
        }else{
            console.log('Valor:::', inputSku);
            // Setearemos la búsqueda
            // Buscaremos data del producto
            setSearch(inputSku);
            addProductToCart();
        }
    }

    const addProductToCart = () => {
        // Ingresar la declaración de la mutación
        getProductData({
            variables :{        // Para pasar propiedades se coloca la palabra variables
                sku: inputSku
            }
        });
    }
    return (
        <div>
            <h2>Compra rápida en Vtex</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="sku">Ingresa el número de SKU</label>
                    <input type="text" id='sku' onChange={handleChange}/>
                </div>
                <input type="submit" value="Añadir al Carrito" />
            </form>
        </div>
    );
}

export default QuickOrder;