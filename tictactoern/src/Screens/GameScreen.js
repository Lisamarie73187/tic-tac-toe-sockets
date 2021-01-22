import React, {useEffect, useState, useRef} from 'react';
import {Button, StyleSheet, Text, TextInput, View, TouchableOpacity, Alert} from "react-native";
import io from "socket.io-client/build/index";
import Boxes from "../Components/GameScreen/Boxes";


function GameScreen() {
    const socket = useRef(null);

    const [squares, setSquares] = useState(Array(9).fill(null));
    const [xTurn, setXturn] = useState(true)

    useEffect(() => {
        socket.current = io("http://127.0.0.1:3000");
        receiveSocketEvent()
    },[]);

    const receiveSocketEvent = () => {
        socket.current.on('turn', (turnObj) => {
            setSquares(turnObj.newSquares);
            setXturn(!turnObj.xTurn);
            // checkForWinner(turnObj.newSquares)
        })
    }

    const handleOnPress = (i) => {
        const newSquares = squares.slice();
        newSquares[i] = xTurn ? 'X' : 'O';
        socket.current.emit('turn', {newSquares, xTurn})
    };

    const checkForWinner = (newSquares) => {
        const winner = calculateWinner(newSquares);
        if(winner){
            Alert.alert('Winner', `player ${winner} wins`,   [
                {
                    text: "OK",
                    onPress: () => setSquares(Array(9).fill(null)),
                }
            ])
        }
    };

    const calculateWinner = (newSquares) => {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (newSquares[a] && newSquares[a] === newSquares[b] && newSquares[a] === newSquares[c]) {
                return newSquares[a];
            }
        }
        return null;
    };

    return (
        <View style={styles.container}>
            <Text>Tic tac toe</Text>
            <View style={styles.boxWrapper}>
                {squares.map((square, i) => {
                    return (
                        <Boxes squareNum={square} handleOnPress={() => handleOnPress(i)} />
                    )
                })}
            </View>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    boxWrapper: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        width: 300
    }
});

export default GameScreen
