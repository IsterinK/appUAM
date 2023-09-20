import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native';
import { Image } from 'react-native';
import { Text } from 'react-native';
import { View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

const ProductsApiFetch = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() =>{
        axios
         .get("https://fakestoreapi.com/products/")
         .then((response) => {
            setProducts(response.data);
         })
         .catch((error) =>{
            console.error("Error al obtener datos: ", error);
         })
    }, []);

  return (
    <SafeAreaView>
      {/* {loading ? (
        <ActivityIndicator size="large" color="#0000ff">
        </ActivityIndicator>
      ): <FlatList 
      data={products} 
      keyExtractor={(item) => item.id.toString()}
      renderItem={({item}) => (
        <View>
          <Image source={{url:item.image}}
            style={
              {
                width: 100,
                height: 100
              }
            }>
          </Image>
          <Text>{item.title}</Text>
          <Text>{item.price}</Text>
          <Text>{item.category}</Text>

        </View>
      )}>
      </FlatList>} */}
      <FlatList 
      data={products} 
      keyExtractor={(item) => item.id.toString()}
      renderItem={({item}) => (
        <View>
          <Image source={{uri:item.image}}
            style={
              {
                width: 100,
                height: 100
              }
            }>
          </Image>
          <Text>{item.title}</Text>
          <Text>{item.price}</Text>
          <Text>{item.category}</Text>

        </View>
      )}>
      </FlatList>
    </SafeAreaView>
  )
}

export default ProductsApiFetch
