import React, { useState } from 'react'
import { SafeAreaView } from 'react-native';
import { Text } from 'react-native';

const MyFirstComponent = () => {
    const [userName, setUserName] = useState('')
  return (
    <SafeAreaView>
        <Text>MyFirstComponent - Manuel Patiño</Text>
    </SafeAreaView>
  )
}

export default MyFirstComponent
