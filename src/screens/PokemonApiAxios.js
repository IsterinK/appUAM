import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Card } from '@rneui/themed';
import { View } from 'react-native';
import { Image } from 'react-native';

const PokemonApiAxios = () => {

    const [pokemons, setPokemons] = useState('');

    useEffect(() => {
        axios.get('https://backendpractice-production-717a.up.railway.app/api/v1/pokemons/')
        .then((response) => {
            setPokemons(response.data)
        })
        .catch((error) => {
            console.error("Error al obtener los datos", error)
        })
    }, [])

    
  return (
    <SafeAreaView>

        <FlatList data={pokemons} 

            renderItem={({item}) => (
                <Card sx={{ maxWidth:345}}>
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
