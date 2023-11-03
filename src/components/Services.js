import React, { useEffect, useState } from 'react'
import { Modal, StyleSheet, Text , TouchableHighlight , Button, FlatList, Image, View } from 'react-native'
import { Card , Divider} from 'react-native-elements';
import axios from 'axios';
import Swiper from 'react-native-swiper';
import { TouchableOpacity } from 'react-native-gesture-handler';
const Services = ({ category , onHideModal}) => {
    const [servicesList, setServicesList] = useState([])
    useEffect(() => {
        updateCategories();
    }, []);

    const updateCategories = () => {
        axios.get(`http://mantenimientoandino.co:3000/api/v1/admin/services`)
        .then((response) =>{
            const filteredServices = response.data.filter(item => item.categoryService === category);
            setServicesList(filteredServices)
        })
        .catch((error) =>{console.log(error)})
        
    }

    const closeModal = () => {
        onHideModal()
    }
    return (
        <View style={styles.view}>
            <Text style={{ fontWeight: "bold", fontSize: 30, marginBottom: 10 }}> Servicios de {category}</Text>
            {servicesList.length > 0 ?
                (<FlatList
                style={styles.flat}
                data={servicesList} 
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <View style={{ width: "93%", marginBottom:15 }}>
                        <Card containerStyle={styles.card}>
                            <View style={styles.cardContent}>
                                <View style={styles.cardHeader}>
                                    <Image
                                        style={styles.image}
                                        source={{ uri: "https://www.iconarchive.com/download/i96797/iconsmind/outline/Post-Mail-2.ico" }}
                                    />
                                    <Text style={[styles.textField, { fontSize:17, fontWeight:"bold" }]}>{item.name}</Text>
                                </View>

                                <Divider style={{ backgroundColor: 'black' }} />
                                <Text style={styles.textField}>Desc: {item.description}</Text>
                                <Divider style={{ backgroundColor: 'black' }} />
                                <Text style={styles.textField}>Category: {item.categoryService}</Text>
                                <Divider style={{ backgroundColor: 'black' }} />
                                <Text style={styles.textField}>Estado: {item.active ? "Activo" : "Inactivo"}</Text>
                                <Divider style={{ backgroundColor: 'black' }} />
                                <Swiper style={styles.imageContainer} showsPagination={true}>
                                    {item.photos.map((image, index) => (
                                        <Image
                                        key={index}
                                        style={styles.avatar}
                                        source={{ uri: `http://mantenimientoandino.co:3000/${image}` }}
                                        />
                                    ))}
                                </Swiper>
                            </View>
                        </Card>
                    </View>
                )}
            >
            </FlatList>
            ):(
                <Text>La categoria no tiene servicios</Text>
            )
            }
            <TouchableHighlight style={{backgroundColor:"#FA5858", borderRadius:10, width:70, height:40, justifyContent:'center', alignItems:"center"}} onPress={onHideModal}>
                <Text>VOLVER</Text>
            </TouchableHighlight>
        </View>
    )
}

const styles = StyleSheet.create({
    view:{
        width:"100%",
        alignItems:"center",
        flex:1,
        backgroundColor:"#ED9E4E",
    },

    imageContainer:{
        height:320
    },

    avatar:{
        resizeMode:'stretch',
        height:250,
        margin:15,
        borderRadius:15
    },

    cardHeader:{
        display:"flex",
        flexDirection:'row',
        margin:10,
        alignItems: 'center', 
    },  

    image:{
        width:40,
        height:40,
        marginRight:5,
    },  

    flat:{
        width:"100%",
    },

    card: {
        borderRadius:25,
        borderColor:"black",
        padding:10,
        width:"100%",
    },

    textField:{
        margin:5,
        height:40,
        flex:1,
        textAlignVertical:"center",
    },

    cardContent:{
        margin:0,
        padding:0,
    },

    modalContainer: {
        flex: 1,
        gap: 10,
        paddingTop: 50,
        alignContent: "center",
        alignItems: 'center'
    },

    button: {
        marginBottom: 20,
        width:350,
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 50,
        borderWidth:1,
        borderColor:"black",
        margin:7,
        marginTop:60
      },

    buttonText: {
        color: "#000000",
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default Services
