import React from 'react';
import {StyleSheet} from 'react-native';
import {Header, Left, Button,Right,Icon,Body,Title} from 'native-base';
import {FontAwesome5} from '@expo/vector-icons';

const MainHeader = ({navigation})=>{

    return(
        <Header style={styles.text}>
            <Left>
                <Button transparent onPress={()=>navigation.openDrawer()}>
                    <Icon name='menu'/>
                </Button>
            </Left>
            <Body>
                <Title></Title>
            </Body>
            <Right>
                <Button transparent onPress={()=>navigation.navigate('Cart')}>
                    <FontAwesome5 name='shopping-basket' size={20} color="#fff"/>
                </Button>
                <Button transparent onPress={()=>navigation.navigate('Settings')}>
                    <FontAwesome5 name='user-circle' size={20} color="#fff"/>
                </Button>
            </Right>
        </Header>
    )
}

export default MainHeader;

const styles = StyleSheet.create({

    text: {
        backgroundColor: "#009387",
    }
})