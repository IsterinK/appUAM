import React, { useEffect, useState } from 'react'
import { FlatList, SafeAreaView } from 'react-native';
import { Text, Card, Button, Icon } from '@rneui/themed';
import axios from 'axios'

const ip = "192.168.0.12:3000";

const MoviesApiAxios = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
      axios.get(`http://${ip}/api/v1/movies`)
      .then((response) => {
          setMovies(response.data)
      })
      .catch((error) => {
          console.error("Error al obtener los datos", error)
      })
  }, [])

  return (
    <SafeAreaView style={{paddingTop:40, backgroundColor: "#d58635", marginBottom:60}}>
        <FlatList 
        data={movies}
        renderItem={({item})=>(
          <Card containerStyle={{ height: 800 , borderRadius:15}}>
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
