import React, { useEffect, useState } from 'react'
import { Modal, StyleSheet, Text } from 'react-native'
import { TouchableHighlight } from 'react-native'
import { Button, FlatList, Image, View } from 'react-native'
import { Card , Divider} from 'react-native-elements';
import { TextInput } from 'react-native-gesture-handler'
import axios from 'axios';

export const Posts = () => {
    const [postLists, setPostList] = useState([])
    const [modalVisible, setModalVisible] = useState(false)
    const [confirmationModalVisible, setConfirmationModalVisible] = useState(false);
    const [confirmItemId, setConfirmItemId] = useState("");
    const [newPost, setNewPost] = useState({
        title: "",
        subtitle: "",
        description: "",
        /* avatar: "", */
        active: false
    })

    useEffect(() => {
        updatePosts();
    }, []);

    const updatePosts = () => {
        axios.get(`http://192.168.0.12:3000/api/v1/posts/`)
        .then((response) =>{
            setPostList(response.data)
        })
        .catch((error) =>{console.log(error)})
    }

    const handleCreatePost = () => {
        axios
            .post(`http://192.168.0.12:3000/api/v1/posts/new-post/`, newPost)
            .then((response) => {
                setModalVisible(false);
                updatePosts();
                setNewPost({
                    title: "",
                    subtitle: "",
                    description: "",
                    /* avatar: "", */
                    active: false
                });
            })
            .catch((error) => {
                console.error(error);
            })
    };

    const handleDeletePost = () => {
        axios
            .delete(`http://192.168.0.12:3000/api/v1/posts/removepost/${confirmItemId}`)
            .then((response) => {
                setConfirmationModalVisible(false);
                updatePosts();
                setConfirmItemId("")
            })
            .catch((error) => {
                console.error(error);
            })
    }

    return (
        <View style={styles.view}>
            <TouchableHighlight style ={styles.button}>
                <Button title="Añadir un post" onPress={() => setModalVisible(true)} color="black"/>
            </TouchableHighlight>

            <FlatList
                style={styles.flat}
                data={postLists} 
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <View style={{ width: "93%" }}>
                        <Card containerStyle={styles.card}>
                            <View style={styles.cardContent}>
                                <View style={styles.cardHeader}>
                                    <Image
                                        style={styles.image}
                                        source={{ uri: item.avatar }}
                                    />
                                    <Text style={[styles.textField, { fontSize:20, fontWeight:"bold" }]}>{item.title}</Text>
                                    <TouchableHighlight onPress={() => {setConfirmationModalVisible(true); setConfirmItemId(item._id)}} style={{backgroundColor:"#F25F67", borderRadius:10, width:40, height:40, justifyContent:'center', alignItems:"center"}}
                                    >
                                        <Image source={{ uri: "https://cdn-icons-png.flaticon.com/512/18/18297.png" }} style={{ width: 30, height: 30}} />
                                    </TouchableHighlight>
                                </View>
                                
                                <Divider style={{ backgroundColor: 'black' }} />
                                <Text style={styles.textField}>Sub: {item.subtitle}</Text>
                                <Divider style={{ backgroundColor: 'black' }} />
                                <Text style={styles.textField}>Desc: {item.description}</Text>
                                <Divider style={{ backgroundColor: 'black' }} />
                                <Text style={styles.textField}>Estado: {item.active ? "Activo" : "Inactivo"}</Text>
                            </View>
                        </Card>
                    </View>
                )}
            >
            </FlatList>

            <Modal visible={modalVisible} onRequestClose={() => setModalVisible(false)} animationType='slide'>
               <View style={styles.modalContainer}>
                    <TextInput 
                        placeholder='title' 
                        style={styles.input}
                        onChangeText={(title_text) => setNewPost({...newPost, title: title_text})}
                    ></TextInput>

                    <TextInput 
                        placeholder='subtitle' 
                        style={styles.input}
                        onChangeText={(subtitle_text) => setNewPost({...newPost, subtitle: subtitle_text})}
                    ></TextInput>

                    {/* <TextInput 
                        placeholder='avatar' 
                        style={styles.input}
                        onChangeText={(avatar_text) => setNewPost({...newPost, avatar: avatar_text})}
                    ></TextInput> */}

                    <TextInput 
                        placeholder='description' 
                        style={styles.description}
                        onChangeText={(description_text) => setNewPost({...newPost, description: description_text})}
                    ></TextInput>

                    <TouchableHighlight style ={styles.button}>
                        <Button title="Create post" onPress={handleCreatePost} color="black"/>
                    </TouchableHighlight>
                </View> 
            </Modal>

            <Modal visible={confirmationModalVisible} onRequestClose={() => setConfirmationModalVisible(false)} animationType='slide'>
                <View style={styles.modalContainer}>
                    <Text>¿Estás seguro de que deseas eliminar este post?</Text>
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
        backgroundColor:"white",
    },

    button: {
      width:200,
      alignItems: 'center',
      backgroundColor: 'black',
      padding: 10,
      borderRadius: 50,
      margin:7,
      marginTop:15
    },

    modalContainer: {
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },

    input: {
        width:300,
        height:50,
        padding: 15,
        borderRadius:10,
        backgroundColor: "#a4a4a4"
    },

    description: {
        width:300,
        height:100,
        padding: 15,
        borderRadius:10,
        backgroundColor: "#a4a4a4"
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
    }
});
