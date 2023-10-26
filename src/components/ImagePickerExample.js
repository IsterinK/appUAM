import React, { useState } from 'react';
import { TouchableOpacity, Image, View, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function ImagePickerExample({ onImageSelect }) {
  const [images, setImages] = useState([]);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      aspect: [4, 3],
      quality: 1,
      allowsMultipleSelection: true,
    });

    if (!result.canceled) {
      const selectedImages = result.assets;
      setImages(selectedImages); 
      onImageSelect(selectedImages); 
    }
  };

  const openCamera = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const selectedImages = result.assets;
      setImages(selectedImages);
      onImageSelect(selectedImages);
    }
  };

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: "#a4a4a4", width: 300, height: 120, borderRadius: 10 }}>
      <TouchableOpacity onPress={pickImage} style={{ alignItems: 'center', flexDirection: 'row' }}>
        <Text style={{ fontSize: 18, marginRight: 10 }}>{images.length > 0 ? "Images Selected" : "Select an Image"}</Text>
        {images.length > 0 ? (
          images.map((image, index) => (
            <Image
              key={index}
              source={{ uri: image.uri }}
              style={{ width: 40, height: 40, borderRadius: 50 }}
            />
          ))
        ) : (
          <Image
            source={{ uri: "https://static.vecteezy.com/system/resources/previews/011/912/003/original/plus-sign-icon-free-png.png" }}
            style={{ width: 40, height: 40, borderRadius: 50 }}
          />
        )}
      </TouchableOpacity>
      <TouchableOpacity onPress={openCamera} style={{ marginTop: 10, alignItems: 'center', flexDirection: 'row' }}>
        <Text style={{ fontSize: 18, marginRight: 10 }}>Open Camera</Text>
        <Image
          source={{ uri: "https://cdn-icons-png.flaticon.com/512/2956/2956744.png" }}
          style={{ width: 40, height: 40 }}
        />
      </TouchableOpacity>
    </View>
  );
}