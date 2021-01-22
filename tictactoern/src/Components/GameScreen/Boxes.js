import React, {useEffect, useState, useRef} from 'react';
import {Button, StyleSheet, Text, TextInput, View, TouchableOpacity} from "react-native";
import io from "socket.io-client/build/index";


function Boxes(props) {

    return (
        <TouchableOpacity onPress={props.handleOnPress}>
            <View style={styles.box}>
                <Text>{props.squareNum}</Text>
            </View>
        </TouchableOpacity>

    );
}

const styles = StyleSheet.create({
    box: {
        borderWidth: 1,
        width: 100,
        height: 100
    },
});

export default Boxes
