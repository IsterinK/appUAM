import React, { useEffect, useState } from 'react'
import { Modal, StyleSheet, Text , TouchableHighlight , Button, FlatList, Image, View } from 'react-native'
import { Card , Divider} from 'react-native-elements';
import axios from 'axios';
import Swiper from 'react-native-swiper';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ServiceForm from "../components/ServiceForm"
import AsyncStorage from '@react-native-async-storage/async-storage';

export const Service = () => {
    const ip = "192.168.0.12"

    const [postLists, setPostList] = useState([])
    const [modalVisible, setModalVisible] = useState(false)
    const [confirmationModalVisible, setConfirmationModalVisible] = useState(false);
    const [confirmItemId, setConfirmItemId] = useState("");
    
    useEffect(() => {
        updateServices();
    }, []);

    const updateServices = () => {
        axios.get(`http://mantenimientoandino.co:3000/api/v1/admin/services`)
        .then((response) =>{
            setPostList(response.data)
        })
        .catch((error) =>{console.log(error)})
    }

    const handleDeletePost = async () => {
        const accessToken = await AsyncStorage.getItem("accessToken");
        axios
            .delete(`http://mantenimientoandino.co:3000/api/v1/admin/services/${confirmItemId}`, {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                },
              })
            .then((response) => {
                setConfirmationModalVisible(false);
                updateServices();
                setConfirmItemId("")
            })
            .catch((error) => {
                console.error(error);
            })
    }

    return (
        <View style={styles.view}>
            <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
                <Text style={styles.buttonText}>Añadir un servicio</Text>
            </TouchableOpacity>

            <FlatList
                style={styles.flat}
                data={postLists} 
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <View style={{ width: "93%", marginBottom:15 }}>
                        <Card containerStyle={styles.card}>
                            <View style={styles.cardContent}>
                                <View style={styles.cardHeader}>
                                    <Image
                                        style={styles.image}
                                        source={{ uri: "https://cdn-icons-png.flaticon.com/512/5062/5062832.png" }}
                                    />
                                    <Text style={[styles.textField, { fontSize:17, fontWeight:"bold" }]}>{item.name}</Text>
                                    <TouchableHighlight onPress={() => {setConfirmationModalVisible(true); setConfirmItemId(item._id)}} style={{backgroundColor:"#F25F67", borderRadius:10, width:40, height:40, justifyContent:'center', alignItems:"center"}}
                                    >
                                        <Image source={{ uri: "https://cdn-icons-png.flaticon.com/512/18/18297.png" }} style={{ width: 30, height: 30}} />
                                    </TouchableHighlight>
                                </View>
                                
                                <Divider style={{ backgroundColor: 'black' }} />
                                <Text style={styles.textField}>Cat: {item.categoryService}</Text>
                                <Divider style={{ backgroundColor: 'black' }} />
                                <Text style={styles.textField}>Desc: {item.description}</Text>
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

            <Modal 
                visible={modalVisible} 
                onRequestClose={() => setModalVisible(false)} 
                animationType='slide'
            >
               <ServiceForm updateServices={()=>updateServices()} onHideModal={() => setModalVisible(false)}/>
            </Modal>

            <Modal visible={confirmationModalVisible} onRequestClose={() => setConfirmationModalVisible(false)} animationType='slide'>
                <View style={styles.modalContainer}>
                    <Text>¿Estás seguro de que deseas eliminar este servicio?</Text>
                    <Button title="Confirmar" onPress={handleDeletePost} color="green" />
                    <Button title="Cancelar" color="gray" onPress={() => setConfirmationModalVisible(false)} />
                </View>
            </Modal>
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
