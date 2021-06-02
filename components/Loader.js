import React from 'react';
import {View} from 'native-base';
import {StyleSheet,Image} from 'react-native';

const Loader = ()=>{
    return (
        <View style={styles.loader}>
            <Image source={require('../images/loader.gif')} style={styles.image}/>
        </View>
      
    )
}

export default Loader;

const styles = StyleSheet.create({
    loader: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: 50,
        height: 50
    }
})