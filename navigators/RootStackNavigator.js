import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import SignInScreen from '../authScreens/SignInScreen';
import SignUpScreen from '../authScreens/SignUpScreen';
import SelectShopScreen from '../authScreens/SelectShopScreen';
import UserDataScreen from '../authScreens/UserDataScreen';
import DrawerNavigator from './DrawerNavigator';


const RootStack = createStackNavigator();

const RootStackNavigator = ({navigation})=>{
    return(
        <RootStack.Navigator headerMode='none'>
            <RootStack.Screen name="SelectShop" component={SelectShopScreen}/>
            <RootStack.Screen name="SignIn" component={SignInScreen}/>
            <RootStack.Screen name="SignUp" component={SignUpScreen}/>
            <RootStack.Screen name="UserData" component={UserDataScreen}/>
            {/* <RootStack.Screen name="SelectShop" component={SelectShopScreen}/> */}
            <RootStack.Screen name="Products" component={DrawerNavigator}/>
        </RootStack.Navigator>
    )
}

export default RootStackNavigator;