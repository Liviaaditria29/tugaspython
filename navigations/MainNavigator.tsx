// MainNavigator.tsx
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import TabNavigator from './TabNavigator';
import Login from '../screens/authScreen/Login';
import Register from '../screens/authScreen/Register';

// Definisikan tipe rute
export type RootStackParamList = {
  Root: undefined; // TabNavigator
  Login: undefined; // Login screen
  Register: undefined; // Register screen
};

const Stack = createStackNavigator<RootStackParamList>();

const MainNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Root"
          component={TabNavigator}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{title: 'Login'}}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{title: 'Register'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;
