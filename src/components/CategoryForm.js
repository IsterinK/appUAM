import React, { useState } from 'react'
import { TextInput } from 'react-native-gesture-handler'
import { StyleSheet, Text , TouchableHighlight , Button, View } from 'react-native'
import axios from 'axios';
import ImagePickerExample from '../components/ImagePickerExample';
import AsyncStorage from "@react-native-async-storage/async-storage";

const PostForm = ({ onHideModal, updatePosts  }) => {
    const ip = "192.168.0.12"
    let avatarObjects = [];
    const [newCategory, setNewCategory] = useState({
      name: "",
      description: "",
    });
  
    const [errorMessages, setErrorMessages] = useState({
      name: "",
      description: "",
      avatar: "",
    });
  
    const handleImageSelection = (selectedImages) => {
      avatarObjects = selectedImages.map((image) => ({
        name: "avatar", 
        type: image.type+ '/jpeg',
        uri: image.uri,
      }));
    };
  
    const handleCreatePost = async () => {
        const errors = {};
      
        // Verifica si los campos están vacíos
        if (newCategory.name.trim() === "") {
          errors.name = "Name is required";
        }
        if (newCategory.description.trim() === "") {
          errors.description = "Description is required";
        }
        if (!avatarObjects) {
          errors.avatar = "Avatar image is required";
        }
      
        if (Object.keys(errors).length > 0) {
          setErrorMessages(errors);
        } else {
            console.log(avatarObjects[0]);
            
          const formData = new FormData();
          formData.append("nameCategoryService", newCategory.name);
          formData.append("descriptionCategoryService", newCategory.description);
          formData.append("avatar", avatarObjects[0]);
          axios
            .post(`http://mantenimientoandino.co:3000/api/v1/admin/category-services/new-category`, formData,
            {
                headers: {
                    'Content-Type': "multipart/form-data",
                    Authorization: `Bearer ${await AsyncStorage.getItem("accessToken")}`,
                  }
            }
            )
            .then((response) => {
              if (response.status === 201) {
                setNewCategory({
                  name: "",
                  description: "",
                  avatar: [],
                });
                updatePosts();
                setErrorMessages({});
              } else {
                console.log("holaaaa");
                console.log(response.status);
              }
            })
            .catch((error) => {
              console.error(error);
            });
            onHideModal();
        }
      };
      
  
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontWeight: "bold", fontSize: 30, marginBottom: 10 }}>Crear Categoria</Text>
  
        <TextInput
          placeholder='Nombre'
          style={styles.input}
          onChangeText={(name_text) => {
            setNewCategory({ ...newCategory, name: name_text });
            setErrorMessages({ ...errorMessages, name: "" });
          }}
        />
        <Text style={{ color: 'red' }}>{errorMessages.name}</Text>
  
  
        <TextInput
          placeholder='Descripcion'
          style={styles.description}
          onChangeText={(description_text) => {
            setNewCategory({ ...newCategory, description: description_text });
            setErrorMessages({ ...errorMessages, description: "" });
          }}
        />
        <Text style={{ color: 'red' }}>{errorMessages.description}</Text>
  
        <ImagePickerExample onImageSelect={handleImageSelection} singleImageSelection={false}/>
        <Text style={{ color: 'red' }}>{errorMessages.avatar}</Text>
  
        <TouchableHighlight style={styles.button}>
          <Button title="Create post" onPress={handleCreatePost} color="black" />
        </TouchableHighlight>
      </View>
    );
  };
  
  const styles = {
    input: {
      width: 300,
      height: 50,
      padding: 15,
      borderRadius: 10,
      backgroundColor: "#a4a4a4",
    },
    description: {
      width: 300,
      height: 100,
      padding: 15,
      borderRadius: 10,
      backgroundColor: "#a4a4a4",
    },
    button: {
      width: 200,
      alignItems: 'center',
      backgroundColor: 'black',
      padding: 10,
      borderRadius: 50,
      margin: 7,
      marginTop: 15,
    },
  };
  
export default PostForm;