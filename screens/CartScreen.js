import React from 'react';
import MainHeader from '../components/MainHeader';
import {Text,View,Center,Box} from 'native-base';


export default CartScreen = ({navigation}) =>{

    return (
        <Box>
            <MainHeader navigation={navigation}/>
            <Center>
                <Text>Корзина</Text>
            </Center>
        </Box>
    )
}

