import React from 'react';
import MainHeader from '../components/MainHeader';
import {Container,Text,Content,View,Box} from 'native-base';
import {StyleSheet} from 'react-native';

export default CartScreen = ({navigation}) =>{

    return (
        // <Container>
        //     <MainHeader navigation={navigation}/>
        //     <Content>
        //         <View style={styles.container}>
        //             <Text>Корзина</Text>
        //         </View>
        //     </Content>
        // </Container>
        <Box flex={1} bg="#fff" alignItems="center" justifyContent="center">
        <Text>Open up App.js to start working on your app!</Text>
      </Box>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      alignItems: 'center', 
      justifyContent: 'center'
    },
});
