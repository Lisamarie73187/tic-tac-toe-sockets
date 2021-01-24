import React, {useEffect, useState, useRef} from 'react';
import { StyleSheet,  View} from "react-native";
import io from "socket.io-client/build/index";
import { GiftedChat } from 'react-native-gifted-chat';



function ChatScreen({ route, navigation }) {
    const [messageArr, setMessageArr] = useState([]);
    const socket = useRef(null);

    useEffect(() => {
        socket.current = io("http://127.0.0.1:3000");
        socket.current.on('message', (message) => {
            setMessageArr(previousMessages => GiftedChat.append(previousMessages, message))
        })
    },[]);

    const onSend = (messages) => {
        socket.current.emit('message', messages[0].text)
        setMessageArr(previousMessages => GiftedChat.append(previousMessages, messages))
    }



    return (
        <View style={styles.container}>
            <GiftedChat
                messages={messageArr}
                onSend={messages => onSend(messages)}
                user={{
                    _id: 1,
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
});

export default ChatScreen
