import React,{useState,useEffect} from 'react';
import { View,Text,Form,Input,Label,Item,Button,Icon} from 'native-base';
import {StyleSheet} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {useAuth} from '../components/context/auth';

import {Feather} from "@expo/vector-icons"
import { set } from 'react-native-reanimated';


const SignUpScreen = ({navigation})=>{
    const [resPhone, setResPhone] = useState();
    const [data,setData] = useState({
        phone: '+7 (',
        code:''
    })

    const {setPhone,checkPhone,checkCode} = useAuth();
    const [phoneFieldEnable,setPhoneFieldEnable] = useState(true);
    const [getCodeButtonEnable,setGetCodeButtonEnable] = useState(false);
    const [codeFieldEnable,setCodeFieldEnable] = useState(false);
    const [timerEnable,setTimerEnable] = useState(false);
    const [errorPhoneMsgEnable,setErrorPhoneMsgEnable] = useState(false);
    const [errorCodeMsgEnable,setErrorCodeMsgEnable] = useState(false);
    const [counter, setCounter] = useState();

    const inputChange =(val, field)=>{
        if(field=='phone'){
            if(errorPhoneMsgEnable){
                setErrorPhoneMsgEnable(false);
            };
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
                    case 14:
                        //функция проверки номера
                        const resPhone = val.replace(/\D+/g, '');
                        if (resPhone.length === 11) {
                            setResPhone(resPhone);
                            setGetCodeButtonEnable(true);
                        }
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
                    case 13:
                        setGetCodeButtonEnable(false);
                    default:
                        setData({
                            ...data,
                            phone: val
                        })
                        return;
                }
            }

        }

        if(field=='code'){
            if(val.length==4){
                checkCode({phone:data.phone,code:val},(success)=>{

                    if(success){
                        setPhone(data.phone);
                        navigation.navigate("UserData");
                    }else{
                        setErrorCodeMsgEnable(true);
                    }

                })
            }
        }

        if(val.lenght!=0){
            setData({
                ...data,
                [field]: val
            })
        }

        
    }

    const getCode = () =>{

        setErrorCodeMsgEnable(false);
        checkPhone(data,(check)=>{
                        
            if(check){
                setPhoneFieldEnable(false);
                setCodeFieldEnable(true);
                startTimer();
                setData({
                    ...data
                    ,code:''
                })

            }else{
                setErrorMsgEnable(true);
           }

        })
    }

    const startTimer = ()=>{
        let num = 10;
        setGetCodeButtonEnable(false);
        setTimerEnable(true);
        setCounter(num);
        const timerId = setInterval(()=>{

            setCounter(num-=1)
            if(num==0){
                clearInterval(timerId);
                setTimerEnable(false);
                setGetCodeButtonEnable(true);
            }
        },1000)
    }


    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text></Text>
            </View>
            <Animatable.View style={styles.footer} animation="fadeInUpBig">
                <Form style={styles.form}>
                    {(phoneFieldEnable) && (
                        <>
                            <Item floatingLabel>
                                <Label>Телефон</Label>
                                <Input onChangeText={(val)=>inputChange(val, 'phone')} keyboardType={'phone-pad'} autoFocus value={data.phone} maxLength={18}/>
                            </Item>
                            {(errorPhoneMsgEnable) && (<Text style={styles.error}>данный номер уже зарегистрирован</Text>)}
                            <Button style={styles.button} disabled={!getCodeButtonEnable} bordered={!getCodeButtonEnable} block success onPress={()=>getCode()}>
                                <Text>Получить код</Text>
                            </Button>
                        </>
                    )}
                    {(codeFieldEnable) && (
                        <>
                            <Item floatingLabel last>
                                <Label>Код</Label>
                                <Input keyboardType={'phone-pad'} disabled={errorCodeMsgEnable} autoFocus onChangeText={(val)=>inputChange(val, 'code')} value={data.code} maxLength={4}/>
                            </Item>
                            {(errorCodeMsgEnable) && (<Text style={styles.error}>код указан неверно</Text>)}
                            {(timerEnable) && (<Text style={styles.counter}>Отправить код повторно через: {counter}</Text>)}
                            <Button style={styles.button} disabled={!getCodeButtonEnable} bordered={!getCodeButtonEnable} block success onPress={()=>getCode()}>
                                <Text>Получить код</Text>
                            </Button>
                        </>
                    )}
                </Form>
            </Animatable.View>
        </View>
    )

}



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
    },
    textInput: {
        paddingLeft: 10,
        fontSize: 20
        
    },
    counter:{
        fontSize: 12,
        color: "#444",
        textAlign:'center'
    },
    phoneItem: {
        marginTop: 50
    },
    error: {
       fontSize: 10,
       color: 'red',
       marginLeft:20
    }
})

export default SignUpScreen;