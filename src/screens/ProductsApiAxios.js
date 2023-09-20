import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { ActivityIndicator, Image, SafeAreaView, Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
const ProductsApiAxios = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
    
        axios.get('https://fakestoreapi.com/products/')
        .then((response) => {
            setProducts(response.data)
        })
        .catch((error) => {
            console.error("Error al obtener los datos", error)
        })
    }, [])

  return (
    <SafeAreaView>

        {/* {loading ? (<ActivityIndicator size="large" color="#2181CD"></ActivityIndicator>) : (
            
        )} */}
        
        <FlatList 
        data={products}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item})=>(
                    <View>
                        <Image source = {{uri: item.image}} style ={{width: 100 , height:100}} />
                        <Text>{item.title}</Text>
                        <Text>{item.price}</Text>

                        <Text>{item.category}</Text>
                    </View>
                )}/>
                
        
    </SafeAreaView>
  )
}

export default ProductsApiAxios
