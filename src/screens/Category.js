import React, { useEffect, useState } from 'react'
import { Modal, StyleSheet, Text , TouchableHighlight , Button, FlatList, Image, View } from 'react-native'
import { Card , Divider} from 'react-native-elements';
import CategoryForm from '../components/CategoryForm'
import Services from '../components/Services';
import axios from 'axios';
import Swiper from 'react-native-swiper';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Category = () => {
    const ip = "192.168.0.12"
    const [categoriesList, setCategoriesList] = useState([])
    const [modalVisible, setModalVisible] = useState(false);
    const [modalServicesVisible, setModalServicesVisible] = useState(false);
    const [categorySelected, setCategorySelected] = useState('');
    const [confirmationModalVisible, setConfirmationModalVisible] = useState(false);
    const [confirmItemId, setConfirmItemId] = useState("");
    
    useEffect(() => {
        updatePosts();
    }, []);

    const updatePosts = () => {
        axios.get(`http://mantenimientoandino.co:3000/api/v1/admin/category-services`)
        .then((response) =>{
            setCategoriesList(response.data)
        })
        .catch((error) =>{console.log(error)})
    }

    const handleDeletePost = () => {
        axios
            .delete(`http://${ip}:3000/api/v1/posts/removepost/${confirmItemId}`)
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
            <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
                <Text style={styles.buttonText}>Añadir Categoria</Text>
            </TouchableOpacity>

            <FlatList
                style={styles.flat}
                data={categoriesList} 
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
                                    <Text style={[styles.textField, { fontSize:17, fontWeight:"bold" }]}>{item.nameCategoryService}</Text>
                                    <TouchableHighlight onPress={() => {setModalServicesVisible(true); setCategorySelected(item.nameCategoryService)}} style={{backgroundColor:"#819FF7", borderRadius:10, width:70, height:40, justifyContent:'center', alignItems:"center"}}
                                    >
                                        <Text>Servicios</Text>
                                    </TouchableHighlight>
                                </View>

                                <Divider style={{ backgroundColor: 'black' }} />
                                <Text style={styles.textField}>Desc: {item.descriptionCategoryService}</Text>
                                <Divider style={{ backgroundColor: 'black' }} />
                                <Text style={styles.textField}>Estado: {item.active ? "Activo" : "Inactivo"}</Text>
                                <Divider style={{ backgroundColor: 'black' }} />
                                <Image
                                    style={styles.avatar}
                                    source={{ uri: `http://mantenimientoandino.co:3000/${item.avatar}` }}
                                />
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
               <CategoryForm updatePosts={()=>updatePosts()} onHideModal={() => setModalVisible(false)}/>
            </Modal>
            <Modal 
                visible={modalServicesVisible} 
                onRequestClose={() => setModalVisible(false)} 
                animationType='slide'
            >
               <Services category={categorySelected} onHideModal={() => setModalServicesVisible(false)}/>
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

export default Category
