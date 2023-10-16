import React, { useState } from 'react';
import { TouchableOpacity, Image, View, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function ImagePickerExample({ onImageSelect }) {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const selectedImage = result.assets[0];
      setImage(selectedImage);
      onImageSelect(selectedImage); // Llama a la función onImageSelect con la imagen seleccionada
    }
  };

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: "#a4a4a4", width: 300, height: 60, borderRadius: 10 }}>
      <TouchableOpacity onPress={pickImage} style={{ alignItems: 'center', flexDirection: 'row' }}>
        <Text style={{ fontSize: 18, marginRight: 10 }}>{image ? "Image Selected" : "Select an image"}</Text>
        <Image
          source={{ uri: image ? "https://assets.stickpng.com/images/5aa78e207603fc558cffbf19.png" : "https://static.vecteezy.com/system/resources/previews/011/912/003/original/plus-sign-icon-free-png.png" }}
          style={{ width: 40, height: 40, borderRadius: 50 }}
        />
      </TouchableOpacity>
    </View>
  );
}
