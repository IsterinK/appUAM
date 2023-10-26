import React, { useState } from 'react'
import { TextInput } from 'react-native-gesture-handler'
import { StyleSheet, Text , TouchableHighlight , Button, View } from 'react-native'
import axios from 'axios';
import ImagePickerExample from '../components/ImagePickerExample';


const PostForm = ({ onHideModal, updatePosts  }) => {
    const ip = "192.168.0.12"
    let avatarObjects = [];
    const [newPost, setNewPost] = useState({
      title: "",
      subtitle: "",
      description: "",
      active: false,
    });
  
    const [errorMessages, setErrorMessages] = useState({
      title: "",
      subtitle: "",
      description: "",
      avatar: "",
    });
  
    const handleImageSelection = (selectedImages) => {
      avatarObjects = selectedImages.map((image, index) => ({
        name: `avatar_${index}.jpg`, 
        type: 'image/jpeg',
        uri: image.uri,
      }));
    };
  
    const handleCreatePost = () => {
        const errors = {};
      
        // Verifica si los campos están vacíos
        if (newPost.title.trim() === "") {
          errors.title = "Title is required";
        }
        if (newPost.subtitle.trim() === "") {
          errors.subtitle = "Subtitle is required";
        }
        if (newPost.description.trim() === "") {
          errors.description = "Description is required";
        }
        if (!avatarObjects) {
          errors.avatar = "Avatar image is required";
        }
      
        if (Object.keys(errors).length > 0) {
          setErrorMessages(errors);
        } else {
          const formData = new FormData();
          formData.append("title", newPost.title);
          formData.append("subtitle", newPost.subtitle);
          formData.append("description", newPost.description);
          avatarObjects.forEach((avatar, index) => {
            formData.append(`avatar_${index}`, avatar);
          });
          console.log(formData)

          axios
            .post(`http://${ip}:3000/api/v1/posts/new-post/`, formData)
            .then((response) => {
              if (response.status === 201) {
                setNewPost({
                  title: "",
                  subtitle: "",
                  description: "",
                  avatar: [],
                  active: false,
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
        <Text style={{ fontWeight: "bold", fontSize: 30, marginBottom: 10 }}>Create a post</Text>
  
        <TextInput
          placeholder='title'
          style={styles.input}
          onChangeText={(title_text) => {
            setNewPost({ ...newPost, title: title_text });
            setErrorMessages({ ...errorMessages, title: "" });
          }}
        />
        <Text style={{ color: 'red' }}>{errorMessages.title}</Text>
  
        <TextInput
          placeholder='subtitle'
          style={styles.input}
          onChangeText={(subtitle_text) => {
            setNewPost({ ...newPost, subtitle: subtitle_text });
            setErrorMessages({ ...errorMessages, subtitle: "" });
          }}
        />
        <Text style={{ color: 'red' }}>{errorMessages.subtitle}</Text>
  
        <TextInput
          placeholder='description'
          style={styles.description}
          onChangeText={(description_text) => {
            setNewPost({ ...newPost, description: description_text });
            setErrorMessages({ ...errorMessages, description: "" });
          }}
        />
        <Text style={{ color: 'red' }}>{errorMessages.description}</Text>
  
        <ImagePickerExample onImageSelect={handleImageSelection} />
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