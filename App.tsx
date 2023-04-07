/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//screens
import Home from './screens/Home';
import Create from './screens/Create';
import Settings from './screens/Settings';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons'
import { ItemsIcon } from './components/Icons/Icons';
const Stack  = createNativeStackNavigator()

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View } from 'react-native';

const Tab = createBottomTabNavigator();

const Tabs = ({route, navigation}: {navigation: any, route: any}) => {


  const [text, setText] = React.useState('');
    const hasUnsavedChanges = Boolean(text);
  
  return (
  <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          
          tabBarStyle:{backgroundColor: route.name === 'Home' || 'Settings' ? 'white' : 'white', paddingTop: 5},
          
          tabBarIcon: ({ focused, color, size }) => {

            if (route.name === 'Home') {
              return <Icon name='ios-home' size={size} color={
                focused
                  ? 'black'
                  : 'gray'
              } />;
            } 
            else if (route.name === 'Settings') {
              return <Icon name='settings' size={size} color={
                focused
                  ? 'black'
                  : 'gray'
              } />;            }
            else if (route.name === 'Create') {
              return <Icon name='md-list-outline' size={size} color={
                focused
                  ? 'black'
                  : 'gray'
              } />;   }

          },
          tabBarActiveTintColor: 'black',
          tabBarInactiveTintColor: '#A09FA3',
        })}
      >
         {/* screenOptions={{headerShown: false, tabBarStyle:{backgroundColor: 'white'}}} */}
      
    <Tab.Screen  name='Create' component={Create} 
     options={{tabBarLabel: 'Home',tabBarLabelStyle:{fontWeight: '400', fontSize: 10},tabBarIcon: ({ color, size }) => (
        <Icon name="home" color={color} size={26} style={{bottom: 3}} />),}}/>
        
    <Tab.Screen  name='Home' component={Home}
     options={{tabBarLabel: 'Items', tabBarLabelStyle:{fontWeight: '700', fontSize: 10},tabBarIcon: ({ color, size }) => (
      <ItemsIcon  color={color}/>
        )}}/>    
    
    {/* <Tab.Screen  name='Settings' component={Settings}
     options={{tabBarLabel: 'Settings',tabBarLabelStyle:{fontWeight: '700', fontSize: 10},tabBarIcon: ({ color, size }) => (
        <Icon name="settings-outline" color={color} size={22} />),}}
        />
     */}
  </Tab.Navigator>
  )
  }

function App(): JSX.Element {


  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name='Tabs' component={Tabs} />
        <Stack.Screen name='Items' component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
    );
}



export default App;
