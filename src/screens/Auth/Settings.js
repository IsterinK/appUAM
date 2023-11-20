import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLogin } from '../../context/LoginProvider';
import axios from "axios";

const ip = "192.168.0.12:3000";

const Settings = () => {
    const { isLoggedIn, setIsLoggedIn } = useLogin();
    const [user, setUser] = useState("")
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const accessToken = await AsyncStorage.getItem("accessToken");
                const access = axios.get(`http://${ip}/api/v1/users/auth/getme`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                });
                const response = await access;
                setUser(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();

    }, []);

    const handleOptionPress = (option) => {
        if (option === 'Admin') {
            console.log('Hacer algo para la opción "Posts"');
        } else if (option === 'Cerrar sesión') {
            handleLogout()
        }
    };

    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('accessToken');
            setIsLoggedIn(false)
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        }
    };

    return (
        <View style={styles.view}>
            <Text style={{color:"white", fontWeight:'bold', fontSize:25, marginBottom:25}}>Ajustes</Text>

            {user.rol === "admin" && (
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => handleOptionPress('Admin')}
                >
                    <Text style={styles.buttonText}>Posts</Text>
                </TouchableOpacity>
            )}

            <TouchableOpacity
                style={styles.button}
                onPress={() => handleOptionPress('Cerrar sesión')}
            >
                <Text style={styles.buttonText}>Cerrar sesión</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    view: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#d58635',
    },
    button: {
        width: 200,
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 50,
        margin: 10,
    },
    buttonText: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default Settings;
