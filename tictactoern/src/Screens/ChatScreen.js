import React, {useEffect, useState, useRef} from 'react';
import {Button, StyleSheet, Text, TextInput, View, TouchableOpacity} from "react-native";
import io from "socket.io-client/build/index";


function ChatScreen({ route, navigation }) {
    const [newMessage, setNewMessage] = useState("");
    const [messageArr, setMessageArr] = useState([])
    const socket = useRef(null);

    useEffect(() => {
        socket.current = io("http://127.0.0.1:3000");
        socket.current.on('message', (message) => {
            setMessageArr(prevState => [...prevState, message])
        })
    },[]);

    const handleSendMessage = () => {
        socket.current.emit('message', newMessage)
        setNewMessage("");
    };

    const renderMessages = () => {
        return messageArr.map((e,i) => {
            return (
                <View style={styles.message}>
                    <Text key={`${e}-${i}`}>{e}</Text>
                </View>
            )
        })
    }
    return (
        <View style={styles.container}>
            {renderMessages()}
            <View style={styles.chatInputWrapper}>
                <TextInput
                    style={styles.input}
                    value={newMessage}
                    onChangeText={(value) => setNewMessage(value)}/>
                <TouchableOpacity style={styles.buttonWrapper} onPress={handleSendMessage}>
                    <Text style={styles.button}>Send</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        marginHorizontal: 15
    },
    chatInputWrapper: {
        flexDirection: 'row',
        paddingBottom: 50,
    },
    message: {
        padding: 10
    },
    input: {
        flex: 1,
        height: 40,
        borderWidth: 1
    },
    buttonWrapper: {
        backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5
    },
    button: {
        color: 'white',
        fontSize: 18
    }
});

export default ChatScreen
