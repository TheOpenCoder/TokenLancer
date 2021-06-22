import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider } from 'react-native-paper';
import * as ScreenOrientation from 'expo-screen-orientation';

import { LogBox } from 'react-native';
console.disableYellowBox = true;
LogBox.ignoreAllLogs();





const Stack = createStackNavigator();

async function changeScreenOrientation() {
 await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
}

//screens
import LandingScreen from './src/screens/Landing';
import LoginScreen from './src/screens/Login';
import RegisterScreen from './src/screens/Register';
import MainScreen from './src/screens/Main';
import PostJobScreen from './src/screens/PostJob';
import AcceptJobScreen from './src/screens/AcceptJob';


export default function App() {

  const [loggedIn,setLoggedIn] = useState(false); 

  changeScreenOrientation();

  const onSignUp = () => {
    setLoggedIn(true);
  }

 if(!loggedIn){
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName = "Landing">
            <Stack.Screen name="Landing" component = {LandingScreen} options={{ headerShown: false}} />
            <Stack.Screen name="Login" component = {LoginScreen} options={{ headerShown: false}} />
            <Stack.Screen name="Register" component = {RegisterScreen} options={{ headerShown: false}} />
        </Stack.Navigator>
    </NavigationContainer>
    </PaperProvider>
  );
 }

 return (
  <PaperProvider>
   <NavigationContainer>
    <Stack.Navigator initialRouteName = "Landing">
        <Stack.Screen name="Main" component = {MainScreen} options={{ headerShown: false}} />
        <Stack.Screen name="Post" component = {PostJobScreen} options={{ headerShown: false}} />
        <Stack.Screen name="Accept" component = {AcceptJobScreen} options={{ headerShown: false}} />
    </Stack.Navigator>
   </NavigationContainer>
   </PaperProvider>
);




}

