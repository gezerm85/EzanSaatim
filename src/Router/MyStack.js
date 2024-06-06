import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { Home } from '../pages/Home';

const Stack = createStackNavigator();

const MyStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackground:'#444db3',
        headerPressColor: '#fff'

      }}
    >
      <Stack.Screen options={{headerShown:false}} name="Home" component={Home} />
    </Stack.Navigator>
  )
}

export default MyStack