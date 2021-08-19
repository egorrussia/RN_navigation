import React from 'react';
import {StyleSheet} from 'react-native';
//import {Header, Left, Button,Right,Icon,Body,Title, View, Text, HStack} from 'native-base';
import { HStack,Button,StatusBar,useTheme} from "native-base";
import { MaterialIcons } from '@expo/vector-icons';
import {FontAwesome5} from '@expo/vector-icons';

const MainHeader = ({navigation})=>{

    return(
      <>
        
        <HStack style={styles.header}>
          <Button style={styles.button} variant="ghost" onPress={()=>navigation.openDrawer()}>
              <MaterialIcons style={styles.icon} name='menu'/>
          </Button>
          <HStack>
            <Button style={styles.button} variant="ghost" onPress={()=>navigation.navigate('Cart')}>
                <FontAwesome5 style={styles.icon} name='shopping-basket'/>
            </Button>
            <Button style={styles.button} variant="ghost" onPress={()=>navigation.navigate('Settings')}>
                <FontAwesome5 style={styles.icon} name='user-circle'/>
            </Button>
          </HStack>
        </HStack>
      </>
    )
}

export default MainHeader;

const styles = StyleSheet.create({

    header: {
      backgroundColor: "#009387",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: 5
   
    },
    button: {
      paddingHorizontal:2
    },
    icon: {
      color: "#fff",
      fontSize: 20

    }
})