import React, { useEffect, useState } from 'react'
import { TextInput } from 'react-native-gesture-handler'
import { StyleSheet, Text , TouchableHighlight , Button, View } from 'react-native'
import axios from 'axios';
import ImagePickerExample from '../components/ImagePickerExample';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';


const ServiceForm = ({ onHideModal, updateServices }) => {
    const ip = "192.168.0.12"
    let avatarObjects = [];
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("Seleccione una categoría");

    async function getAccessToken() {
        try {
          const accessToken = await AsyncStorage.getItem('accessToken');
          return accessToken;
        } catch (error) {
          console.error('Error al obtener el AccessToken:', error);
          return null;
        }
    }

    const handleSetCategories = () => {
        axios
            .get(`http://mantenimientoandino.co:3000/api/v1/admin/category-services`)
            .then((response) => {
              if (response.status === 200) {
                setCategories(response.data)
              } else {
                console.log(response.status);
              }
            })
            .catch((error) => {
              console.error(error);
            });
    }

    const [newService, setNewService] = useState({
        name: "",
        description: "",
        categoryService: "",
    });
  
    const [errorMessages, setErrorMessages] = useState({
        name: "",
        description: "",
        photos: "",
    });
  
    const handleImageSelection = (selectedImages) => {
      avatarObjects = selectedImages.map((image, index) => ({
        name: `photo_${index}.jpg`, 
        type: 'image/jpeg',
        uri: image.uri,
      }));
    };
  
    const handleCreatePost = async () => {
        const errors = {};
      
        // Verifica si los campos están vacíos
        if (newService.name.trim() === "") {
          errors.name = "Name is required";
        }
        if (newService.description.trim() === "") {
          errors.description = "Description is required";
        }
        if (avatarObjects.length === 0) {
          errors.photos = "Avatar image is required";
        }
      
        if (Object.keys(errors).length > 0) {
          setErrorMessages(errors);
        } else {
            const formData = new FormData();
            formData.append("name", newService.name);
            formData.append("description", newService.description);
            formData.append("categoryService", newService.categoryService);
            formData.append("active", true);
            avatarObjects.forEach((avatar, index) => {
              formData.append("photos", avatar);
            });

            const config = {
                headers: {
                    Authorization: `Bearer ${await AsyncStorage.getItem("accessToken")}`,
                    'Content-Type': 'multipart/form-data',
                },
            };

            axios
            .post(`http://mantenimientoandino.co:3000/api/v1/admin/services/new-service`, formData, config)
            .then((response) => {
                if (response.status === 201) {
                    setNewService({
                        name: "",
                        description: "",
                        photos: []
                    });
                    updateServices();
                    setErrorMessages({});
                } else {
                    console.log(response.data);
                }
            })
        .catch((error) => {
            console.error(error);
        });
        onHideModal();
        }
    };

    useEffect(() => {
        handleSetCategories();
    }, []);
  
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontWeight: "bold", fontSize: 30, marginBottom: 10 }}>Creación del servicio</Text>
  
        <TextInput
          placeholder='name'
          style={styles.input}
          onChangeText={(name_text) => {
            setNewService({ ...newService, name: name_text });
            setErrorMessages({ ...errorMessages, name: "" });
          }}
        />
        <Text style={{ color: 'red' }}>{errorMessages.name}</Text>
  
        <TextInput
          placeholder='description'
          style={styles.description}
          onChangeText={(description_text) => {
            setNewService({ ...newService, description: description_text });
            setErrorMessages({ ...errorMessages, description: "" });
          }}
        />
        <Text style={{ color: 'red' }}>{errorMessages.description}</Text>

        <View style={styles.pickerContainer}>
            <Picker
            selectedValue={selectedCategory}
            onValueChange={(itemSelected) => {
                setSelectedCategory(itemSelected);
                setNewService({ ...newService, categoryService: itemSelected });
            }}
            style={styles.picker}
            >
            <Picker.Item label='Seleccione una categoría' value='Seleccione una categoría' enabled={false} />

            {categories.map((item) => (
                <Picker.Item key={item._id} label={item.nameCategoryService} value={item.nameCategoryService} />
            ))}
            </Picker>
      </View>

        <ImagePickerExample onImageSelect={handleImageSelection} singleImageSelection={true}/>
        
        <Text style={{ color: 'red' }}>{errorMessages.photos}</Text>
  
        <TouchableHighlight style={styles.button}>
          <Button title="Create service" onPress={handleCreatePost} color="black" />
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
    pickerContainer: {
        marginBottom: 15,
        borderRadius:10,
        borderWidth:3,
        borderColor:"#a4a4a4",
        backgroundColor:"#a4a4a4"
    },
    picker: {
        backgroundColor:"#a4a4a4",
        height: 55,
        width: 290,
        color: "#000000",
    },
  };
  
export default ServiceForm;