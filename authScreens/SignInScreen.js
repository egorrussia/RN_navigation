import React,{useState} from 'react';
import { View,Text,Form,Input,Label,Item,Button } from 'native-base';
import {StyleSheet} from 'react-native';
import * as Animatable from 'react-native-animatable';

import { useAuth } from '../components/context/auth';

const SignInScreen = ({navigation})=>{

    const {userSignIn}=useAuth()

    const [data,setData] = useState({
        phone: '+7 (',
        password: '',
        secureTextEntry: true

    })

    const textInputChange =(val)=>{
        const prefix = '+7 (';
        const forwardDirection = (data.phone.length<val.length);
        if (val.length < 4) {
            setData({
                ...data,
                phone: prefix
            })
            return;
        }

        const phoneNum = val.slice(prefix.length);
        if (forwardDirection) {
            const lastLetter = val.slice(-1);
            if (parseInt(lastLetter) != lastLetter) {
                return;
            }

            switch(phoneNum.length){
                case 3:
                    val+=') '                  
                    break
                case 8:
                    val+=' '             
                    break
                case 11:
                    val+=' '       
                    break
            }
            setData({
                ...data,
                phone: val
            })
        }else{
            let redundantDigits = 1;
            switch(phoneNum.length){
                case 4:
                    redundantDigits = 2;
                case 8:
                case 11:
                    val = val.slice(0, val.length-redundantDigits);
                default:
                    setData({
                        ...data,
                        phone: val
                    })
                    return;
            }
        }

    }

    const handlePasswordChange =(val)=>{
        if(val.lenght!=0){
            setData({
                ...data,
                password: val
            })

        }
            
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text></Text>
            </View>
            <Animatable.View style={styles.footer} animation="fadeInUpBig">
                <Form style={styles.form}>
                    <Item floatingLabel>
                        <Label>Телефон</Label>
                        <Input onChangeText={(val)=>textInputChange(val)} keyboardType={'phone-pad'} value={data.phone} maxLength={18}/>
                    </Item>
                    <Item floatingLabel last>
                        <Label>Пароль</Label>
                        <Input secureTextEntry={true} onChangeText={(val)=>handlePasswordChange(val)}/>
                    </Item>
                </Form>
                <Button style={styles.button} block success onPress={()=>{
                    userSignIn(data,()=>{
                        navigation.navigate("Products")
                    })

                }}>
                    <Text>Войти</Text>
                </Button>
                <Button style={styles.button} block bordered success onPress={()=>navigation.navigate("SignUp")}>
                    <Text>Зарегистрироваться</Text>
                </Button>
            </Animatable.View>
        </View>
        
    )

}

export default SignInScreen;

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#009387"
    },
    header: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    footer: {
        flex: 2,
        backgroundColor: "#FFF",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30
        // paddingVertical: 50,
        // paddingHorizontal: 20

    },
    title:{
        fontSize:30,
        fontWeight: 'bold'
    },
    form: {
        paddingHorizontal: 30,
        marginBottom: 30


    },
    button:{
        borderRadius: 10,
        marginTop: 20,
        marginRight: 30,
        marginLeft:30
    }
})

