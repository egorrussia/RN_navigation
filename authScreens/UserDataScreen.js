import React,{useState,useEffect} from 'react';
import { View,Text,Form,Input,Label,Item,Button,Icon} from 'native-base';
import {StyleSheet} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {useAuth} from '../components/context/auth';

import {Feather} from "@expo/vector-icons"

const UserDataScreen = ({navigation})=>{

    const [data,setData] = useState({
        name: '',
        password: '',
        secureTextEntry:true
    })

    const [check,setCheck] = useState({
        name: false,
        password: false
     })

    const [error,setError] = useState({
        name: false,
        password: false
    })

    const {setUserName,setPassword} = useAuth();
    const nameErrorText = 'поле должно содержать более 2-х символов'
    var passwordErrorText = 'пароль должен быть не менее 4-х символов'
   
    const inputChange =(val, field)=>{
        setData({...data,[field]: val})
    }


    const checkFields = async ()=>{

                if (data.name.length>=2){
                    check.name = true
                    error.name = false
                } else {
                    check.name = false
                    error.name = true
                }

                if(data.password.length>=4){
                    check.password = true
                    error.password = false    
                }else{
                    check.password = false
                    error.password = true  
                }

                setCheck({ ...check })
                setError({...error})

    }


    useEffect(()=>{

        if(check.name && check.password){
            setUserName(data.name);
            setPassword(data.password);
            navigation.navigate("SelectShop");
        }

    },[check])

    const updateSecureTextEntry = () =>{

        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        })

    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text></Text>
            </View>
            <Animatable.View style={styles.footer} animation="fadeInUpBig">
                <Form style={styles.form}>
                    <Item floatingLabel>
                        <Label>Имя</Label>
                        <Input onChangeText={(val)=> inputChange(val,'name')}/>
                    </Item>
                    <Text style={styles.error}>{error.name && nameErrorText}</Text>
                    <Item floatingLabel>
                        <Label>Пароль</Label>
                        <Input secureTextEntry={data.secureTextEntry} onChangeText={(val) => inputChange(val,'password')}/>
                        <Icon 
                            type="Feather"
                            name={data.secureTextEntry ? "eye-off" : "eye"}
                            style={{fontSize: 15, color: 'grey'}}
                            onPress={()=>updateSecureTextEntry()}
                        />
                    </Item>
                    <Text style={styles.error}>{error.password && passwordErrorText}</Text>
                </Form>
                <Button style={styles.button} block success 
                    onPress={async ()=>{
                        await checkFields()
                    }}>
                    <Text>Далее</Text>
                </Button>
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
        flex: 11,
        backgroundColor: "#FFF",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30
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
    error: {
       fontSize: 10,
       color: 'red',
       marginLeft:20
    }
})

export default UserDataScreen;