import React from 'react';
import { View, Text, Button, StyleSheet, StatusBar } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Drawer } from 'react-native-paper';
//import { color } from 'react-native-reanimated';
import {FontAwesome5} from '@expo/vector-icons';
import {useAuth} from "../components/context/auth";



const size = 5;
const color = "#fff";

const DrawerContent = (props) => {
  
    const {userSignOut} = useAuth();

    return (
    <View style={styles.drawer}>
        <DrawerContentScrollView {...props}>
            <View style={styles.DrawerContent}>
                <View style={styles.userInfo}>
                    <Text>Егор</Text>
                </View>
            </View>
            <Drawer.Section style={styles.drawerSection}>
                <Drawer.Item
                    icon={({color,size})=><FontAwesome5 name='shopping-bag' color={color} size={size}/>}
                    label='Продукты'
                    onPress={()=>{props.navigation.navigate('Products')}}
                />
                <Drawer.Item
                    icon={({color,size})=><FontAwesome5 name='truck' color={color} size={size}/>}
                    label='Доставка'
                    onPress={()=>{props.navigation.navigate('Delivery')}}
                />                
                <Drawer.Item
                    icon={({color,size})=><FontAwesome5 name='phone' color={color} size={size}/>}
                    label='Контакты'
                    onPress={()=>{props.navigation.navigate('Contacts')}}
                />
            </Drawer.Section>

        </DrawerContentScrollView>
        <Drawer.Section style={styles.bottomDrawerSection}>
            <Drawer.Item 
                label='Выход'
                onPress={()=>userSignOut()}
            />
        </Drawer.Section>

    </View>
    );
};

export default DrawerContent;


const styles = StyleSheet.create({
    bottomDrawerSection: {
      marginBottom: 15, 
      borderTopColor: '#f4f4f4', 
      borderTopWidth: 1
    },
    drawer: {
        flex:1
    },
    drawerContent: {

    },
    userInfo: {
        marginTop: 15,
        marginLeft: 15,
        marginBottom: 50
    },
    drawerSection:{

    }
  });