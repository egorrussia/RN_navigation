import React from 'react';
import MainHeader from '../components/MainHeader';
import {Container,Text,Content,View} from 'native-base';
import {StyleSheet} from 'react-native';

export default ContactsScreen = ({navigation}) =>{

    return (
        <Container>
            <MainHeader navigation={navigation}/>
            <Content>
                <View style={styles.container}>
                    <Text>Контакты</Text>
                </View>
            </Content>
        </Container>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      alignItems: 'center', 
      justifyContent: 'center'
    },
});
