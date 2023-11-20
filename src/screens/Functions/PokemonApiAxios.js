import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { SafeAreaView, FlatList } from 'react-native';
import { Card } from '@rneui/themed';
import { View } from 'react-native';
import { Image } from 'react-native';

const ip = "192.168.0.12:3000";

const PokemonApiAxios = () => {

    const [pokemons, setPokemons] = useState('');

    useEffect(() => {
        axios.get(`http://${ip}/api/v1/pokemons`)
        .then((response) => {
            setPokemons(response.data)
        })
        .catch((error) => {
            console.error("Error al obtener los datos", error)
        })
    }, [])

    
  return (
    <SafeAreaView style={{paddingTop:40, backgroundColor: "#d58635", paddingBottom:65}}>
        <FlatList data={pokemons} 
            renderItem={({item}) => (
                <Card sx={{ maxWidth:345}} containerStyle={{borderRadius:15}}>
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Divider></Card.Divider>
                    <View style= {{position:"relative", alignItems:"center"}}>
                        <Image 
                            style={{width:"100%",height:100}}
                            resizeMode='contain'
                            source={{uri: item.img}}
                        />
                    </View>
                </Card>
            )}
        
        />
    </SafeAreaView>
  )
}

export default PokemonApiAxios
