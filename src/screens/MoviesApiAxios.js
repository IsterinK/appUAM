import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Text, Card, Button, Icon } from '@rneui/themed';
import axios from 'axios'

const MoviesApiAxios = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
      axios.get('https://backendpractice-production-717a.up.railway.app/api/v1/movies')
      .then((response) => {
          setMovies(response.data)
      })
      .catch((error) => {
          console.error("Error al obtener los datos", error)
      })
  }, [])

  return (
    <SafeAreaView>
        <FlatList 
        data={movies}
        renderItem={({item})=>(
          <Card containerStyle={{ height: 800 , borderRadius:20}}>
            <Card.Title>{item.original_title}</Card.Title>
            <Card.Divider/>
            <Card.Image
              style={{ padding: 3, borderRadius:20, height: "95%", resizeMode:'cover'}}
              source={{uri: item.poster_path}}
            />
          </Card>
        )}/>   
    </SafeAreaView>
  )
}

export default MoviesApiAxios
