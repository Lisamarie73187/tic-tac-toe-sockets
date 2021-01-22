import React,{useEffect, useState} from 'react';
import {Text, View, Button, StyleSheet, TextInput} from "react-native";
import io from "socket.io-client";


function HomeScreen({ navigation }) {
    const [roomName, setRoomName] = useState("");



    // useEffect(() => {
    //     socket.on('connect', () => {
    //         socket.emit('room', room);
    //         console.log(room)
    //     });
    //
    //
    // }, [])
    // socket.on('message', (data) => {
    //     console.log('Incoming message:', data);
    // });

    // const getRandomRoomNumber = () => {
    //     const min = Math.ceil(4000);
    //     const max = Math.floor(5000);
    //     const roomNumber =  Math.floor(Math.random() * (max - min) + min);
    //     socket.on('connect', () => {
    //         socket.emit('room', roomNumber);
    //         console.log(roomNumber)
    //     });
    // }

    return (
        <View style={styles.container}>
            <Button
                title="Play a game"
                onPress={() => navigation.push('Game', {room: roomName})}
            />
            <Button
                title="Chat"
                onPress={() => navigation.push('Chat')}
            />
            <TextInput
                style={styles.input}
                value={roomName}
                onChangeText={(value) => setRoomName(value)}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        width: 300,
        height: 40,
        borderWidth: 1
    }
});

export default HomeScreen
