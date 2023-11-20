import React, {useEffect, useMemo, useState} from 'react'
import { Button, FlatList, Modal, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import { Card, Divider, Image } from 'react-native-elements';
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { AntDesign } from '@expo/vector-icons';

const ip = "192.168.0.12"

const UsersManagement = () => {
    const [user, setUser] = useState("")
    const [usersList, setUsersList] = useState([])
    const [selected, setSelected] = useState(true)
    
    const activeUsers = useMemo(() => usersList.filter(user => user.active === true), [usersList]);
    const noActiveUsers = useMemo(() => usersList.filter(user => user.active === false), [usersList]);

    const [confirmationModalVisible, setConfirmationModalVisible] = useState(false);
    const [confirmItemId, setConfirmItemId] = useState("");

    const getUsers = () => {
        axios.get(`http://${ip}:3000/api/v1/users/`)
        .then((response) =>{
            setUsersList(response.data)
        })
        .catch((error) =>{console.log(error)})
    }

    const handleDeleteUser = async () => {
        axios
            .delete(`http://${ip}:3000/api/v1/users/remove/${confirmItemId}`,{
                headers: {
                    Authorization: `Bearer ${await AsyncStorage.getItem("accessToken")}`
                }
            })
            .then((response) => {
                setConfirmationModalVisible(false);
                getUsers()
                setConfirmItemId("")
            })
            .catch((error) => {
                console.error(error);
            })
    }

    const handleActivateUser = async (userId) => {
        axios
        .patch(`http://${ip}:3000/api/v1/users/auth/active/${userId}`, null, {
            headers: {
                Authorization: `Bearer ${await AsyncStorage.getItem("accessToken")}`
            }
        })
        .then((response) => {
            getUsers()
        })
        .catch((error) => {
            console.error(error.message);
        });
    }

    const handleOptionPress = (option) => {
        if (option === 'active') {
            setSelected(true)
        } else if (option === 'noactive') {
            setSelected(false)
        }
    };

    useEffect(() => {
        getUsers();
    }, []);

    return (
        <View style={styles.view}>
            <Text 
                style={{
                    color:"white", 
                    fontWeight:'bold', 
                    fontSize:25, 
                    paddingLeft:60,
                    paddingRight:60,
                    borderRadius:8,
                    borderWidth:1,
                    marginBottom:10,
                    borderColor: "white"
                }}
            >
                Usuarios
            </Text>

            <View style={{flex:1, flexDirection:'row', width:'100%', justifyContent:'center'}}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => handleOptionPress('active')}
                >
                    <Text style={styles.buttonText}>Activos</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => handleOptionPress('noactive')}
                >
                    <Text style={styles.buttonText}>Inactivos</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                style={styles.flat}
                data={selected ? activeUsers : noActiveUsers} 
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <View style={{ width: "93%", marginBottom:15 }}>
                        <Card containerStyle={styles.card}>
                            <View style={styles.cardContent}>
                                <View style={styles.cardHeader}>
                                    <AntDesign name="user" size={30} color="black" style={styles.image}/>
                                        <Text style={[styles.textField, { fontSize:17, fontWeight:"bold" }]}>{item.name + " " + item.lastname}</Text>
                                        <TouchableHighlight onPress={() => {setConfirmationModalVisible(true); setConfirmItemId(item._id)}} style={{backgroundColor:"#F25F67", borderRadius:10, width:40, height:40, justifyContent:'center', alignItems:"center"}}>
                                        <Image source={{ uri: "https://cdn-icons-png.flaticon.com/512/18/18297.png" }} style={{ width: 30, height: 30}} />
                                    </TouchableHighlight>
                                </View>
                                
                                <Divider style={{ backgroundColor: 'black' }} />
                                <Text style={styles.textField}>Email: {item.email}</Text>
                                <Divider style={{ backgroundColor: 'black' }} />
                                <Text style={styles.textField}>Tipo de documento: {item.documentType}</Text>
                                <Divider style={{ backgroundColor: 'black' }} />
                                <Text style={styles.textField}># Documento: {item.identification}</Text>
                                <Divider style={{ backgroundColor: 'black' }} />
                                
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View>
                                    <Text style={styles.textField}>Estado: {item.active ? "Activo" : "Inactivo"}</Text>
                                </View>
                                    {item.active ? (
                                        <TouchableOpacity
                                            style={{backgroundColor: 'darkred', alignItems:'center', justifyContent:'center', margin:5, padding:5, borderRadius:5}}
                                            onPress={() => handleActivateUser(item._id)}
                                        >
                                            <Text style={{color:"white"}}>Desactivar</Text>
                                        </TouchableOpacity>
                                    ) : (
                                        <TouchableOpacity
                                            style={{backgroundColor: 'green', alignItems:'center', justifyContent:'center', margin:5, padding:5, borderRadius:5}}
                                            onPress={() => handleActivateUser(item._id)}
                                        >
                                            <Text style={{color:"white"}}>Activar</Text>
                                        </TouchableOpacity>
                                    )}
                                </View>
                                <Divider style={{ backgroundColor: 'black' }} />
                                <Text style={styles.textField}>Rol: {item.rol}</Text>
                            </View>
                        </Card>
                    </View>
                )}
            >
            </FlatList>

            <Modal visible={confirmationModalVisible} onRequestClose={() => setConfirmationModalVisible(false)} animationType='slide'>
                <View style={styles.modalContainer}>
                    <Text>¿Estás seguro de que deseas eliminar este usuario?</Text>
                    <Button title="Confirmar" onPress={handleDeleteUser} color="green" />
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
        paddingTop:60,
        paddingBottom:65
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
        marginTop:60
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
        width:'40%',
        height:45,
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10,
        borderWidth:1,
        borderColor:"black",
        marginTop:10,
        marginRight:5
      },

    buttonText: {
        color: "#000000",
        fontSize: 16,
        fontWeight: "bold",
    },
});


export default UsersManagement
