import React,{useState,useEffect} from 'react';
import { View,Input,Button,Box,Center,Heading,VStack,FormControl,Link,Text} from 'native-base';
import {StyleSheet,Dimensions} from 'react-native';
import * as Animatable from 'react-native-animatable';

import { useAuth } from '../components/context/auth';
import Fade from 'react-native-fade';

const {width,height} = Dimensions.get('window');
const CARD_WIDTH = width * 0.8;

const SignInScreen = ({navigation})=>{

    const {userSignIn}=useAuth();
    const [visible, setVisible] = useState(false);

    const [data,setData] = useState({
        phone: '+7 (',
        password: '',
        secureTextEntry: true

    })

    useEffect(()=>{
        setVisible(!visible)
    },[])


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

<Box style={styles.container}>
    <Fade visible={visible} duration={3000} style={styles.header}>
        <Heading size="lg" color='white'>
            Добро пожаловать!
        </Heading>
    </Fade>
    <Animatable.View style={styles.content} animation="fadeInUpBig" >
        <VStack space={2} style={styles.form}>
            <FormControl>
                <FormControl.Label >
                    Телефон
                </FormControl.Label>
                <Input onChangeText={(val)=>textInputChange(val)} keyboardType={'phone-pad'} value={data.phone} maxLength={18}/>
            </FormControl>
            <FormControl>
                <FormControl.Label>
                    Пароль
                </FormControl.Label>
                <Input secureTextEntry={true} onChangeText={(val)=>handlePasswordChange(val)}/>
            </FormControl>
            <Center>
                <Link _text={{ fontSize: 'sm', fontWeight: '700', color:'cyan.500' }}>
                    Забыли пароль?
                </Link>
            </Center>
            <Button 
                onPress={()=>{
                        userSignIn(data,()=>{
                        navigation.navigate("Products")
                })

            }}>
                Войти
            </Button>
        </VStack>
        <View mt={2}>
            <Button mt={2}
                variant="ghost"
                onPress={()=>navigation.navigate("SignUp")}>
                Зарегистрироваться
            </Button>
        </View>
    </Animatable.View>
</Box>

        // <Box>
        //     <Animatable.View style={styles.footer} animation="fadeInUpBig">
        //         <Center>

                
        //         <Form style={styles.form}>
        //             <Item floatingLabel>
        //                 <Label>Телефон</Label>
        //                 <Input onChangeText={(val)=>textInputChange(val)} keyboardType={'phone-pad'} value={data.phone} maxLength={18}/>
        //             </Item>
        //             <Item floatingLabel last>
        //                 <Label>Пароль</Label>
        //                 <Input secureTextEntry={true} onChangeText={(val)=>handlePasswordChange(val)}/>
        //             </Item>
        //         </Form>
        //         <Text>Забыли пароль?</Text>
        //         <Button style={styles.button} block success onPress={()=>{
        //             userSignIn(data,()=>{
        //                 navigation.navigate("Products")
        //             })

        //         }}>
        //             Войти
        //         </Button>
        //         </Center>
        //         <Button block success onPress={()=>{
        //             userSignIn(data,()=>{
        //                 navigation.navigate("Products")
        //             })

        //         }}>
        //             Войти
        //         </Button>                
        //         <Button onPress={()=>navigation.navigate("SignUp")}>
        //             Зарегистрироваться
        //         </Button>
        //     </Animatable.View>
        // </Box>


        
    )

}

export default SignInScreen;

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#009387",
        alignItems: 'center'
    },
    header: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    content: {
        flex: 4
        // position:'absolute',
        // display: 'flex',
        // height: 400,
        // width: '100%',
        // justifyContent: 'center',
        // alignItems: 'center'
    },
    form: {
        width: CARD_WIDTH + 20,
        padding: 10,
        borderRadius: 5,
        backgroundColor: "#fff"

    },
})

