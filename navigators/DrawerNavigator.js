import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import CartScreen from '../screens/CartScreen';
import ProductsScreen from '../screens/ProductsScreen';
import DeliveryScreen from '../screens/DeliveryScreen';
import ContactsScreen from '../screens/ContactsScreen';
import UserSettingsScreen from '../screens/UserSettingsScreen';

import DrawerContent from './DrawerContent';

const Drawer = createDrawerNavigator()

const DrawerNavigator = ({navigation,route}) => {

    return (
    <Drawer.Navigator drawerContent={props=><DrawerContent {...props}/>}>
        <Drawer.Screen name="Cart" component={CartScreen}/>
        <Drawer.Screen name="Products" component={ProductsScreen}/>
        <Drawer.Screen name="Delivery" component={DeliveryScreen}/>
        <Drawer.Screen name="Contacts" component={ContactsScreen}/>
        <Drawer.Screen name="Settings" component={UserSettingsScreen}/>
    </Drawer.Navigator>
)};

export default DrawerNavigator;

