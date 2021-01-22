import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import 'react-native-gesture-handler';

import GameScreen from './src/Screens/GameScreen'
import HomeScreen from './src/Screens/HomeScreen'
import ChatScreen from './src/Screens/ChatScreen'


const Stack = createStackNavigator();


const App = () => {
  return (
          <NavigationContainer>
              <Stack.Navigator initialRouteName="Home">
                  <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}/>
                  <Stack.Screen name="Game" component={GameScreen} />
                  <Stack.Screen name="Chat" component={ChatScreen} />
              </Stack.Navigator>
          </NavigationContainer>
  );
};



export default App;
