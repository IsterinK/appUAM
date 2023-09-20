import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { ActivityIndicator, Image, SafeAreaView, Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Card, Button, Icon } from '@rneui/themed';
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
                        <Card containerStyle={{ height: 300 , borderRadius:20}}>
                            <Card.Title>{item.title}</Card.Title>
                            <Card.Divider/>
                            <Card.Image
                            style={{ padding: 3, height: 130, resizeMode:'center'}}
                            source={{uri: item.image}}
                            />
                            <Card.Divider/>
                            <Text style={{ margin:3 }}>{item.category}</Text>
                            <Card.Divider/>
                            <Text style={{ margin:3 }}>{item.price}</Text>
                        </Card>
                    </View>
                )}/>
    </SafeAreaView>
  )
}

export default ProductsApiAxios
