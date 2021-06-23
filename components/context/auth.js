import React, { createContext, useContext, useState } from 'react';
const AuthContext = createContext();
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react/cjs/react.development';
const USER_KEY='@user_key';
//import {API_URL} from '../../config'

const API_URL = "http://159.253.19.16:3001"

export const AuthProvider = ({children}) => {

  const [phone, setPhone] = useState('');
  const [userName, setUserName] = useState('');
  const [shops, setShops] = useState([]);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(true);

  const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
  };

  const loginReducer = (prevState, action) => {
    switch( action.type ) {
      case 'RETRIEVE_TOKEN': 
        return {
          ...prevState,
          userToken: action.token,
          userName: action.id,
          isLoading: false,
        };
      case 'LOGIN': 
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGOUT': 
        return {
          ...prevState,
          userName: null,
          userToken: null,
          isLoading: false,
        };
      case 'REGISTER': 
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);

  useEffect(()=>{
    
    (async ()=>{

      try {
        await AsyncStorage.setItem(USER_KEY, JSON.stringify({userName}))
      } catch (e) {
        // saving error
      }

    })()

},[userName])

  // useEffect(()=>{
  //     try {
  //       let userData = async()=>await AsyncStorage.getItem(USER_KEY)
  //       if(userData){
  //         const {userName}=JSON.parse(userData)
  //         if(userName){
  //           setUserName(userName)
  //         }
  //       }
  //       setLoading(false)
  //     } catch (e) {
  //       // saving error
  //     }
  // },[])

  useEffect(() => {
      let userToken = null;
      let name = null;
      try {
        userToken = async()=>await AsyncStorage.getItem('userToken');
        name = async()=>await AsyncStorage.getItem('userName');
      } catch(e) {
        console.log(e);
      }
      dispatch({ type: 'RETRIEVE_TOKEN', token: userToken, id: name });
  }, []);


  //регистрация
  const  userSignUp = (func) =>{

     fetch(API_URL + "/users/signup",{
      method:"POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        phone,
        name: userName,
        password,
        selected_shop_ids:shops
      })
    })
    .then(res=>res.json())
    .then(async data=>{
        const {name, shops, email, phone,role,token='1234'} = data.item 
        func()
        try {
          await AsyncStorage.setItem('userToken', token);
          await AsyncStorage.setItem('userName', name);
        } catch(e) {
          console.log(e);
        }
        dispatch({ type: 'LOGIN', id: name, token: token });
    }).catch(err=>console.log(err))
  }

  //авторизация
  const  userSignIn = ({phone,password},func) =>{

    fetch(API_URL + "/users/signin",{
      method:"POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        phone,
        password
      })
    })
    .then(res=>res.json())
    .then(async data=>{
        const {name, shops, email, phone,role,token='1234'} = data.item 
        setUserName(name)
        setEmail(email)
        setPhone(phone)
        func()

        try {
          await AsyncStorage.setItem('userToken', token);
          await AsyncStorage.setItem('userName', name);
        } catch(e) {
          console.log(e);
        }
        dispatch({ type: 'LOGIN', id: name, token: token });

    }).catch(err=>console.log(err))

  }

   const userSignOut = async ()=>{
    try {
      await AsyncStorage.removeItem('userToken');
      await AsyncStorage.removeItem('userName');
    } catch(e) {
      console.log(e);
    }
    dispatch({ type: 'LOGOUT' });
  }

  const  checkPhone = ({phone},func) =>{

    fetch(API_URL + "/users/checkphone",{
      method:"POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        phone
      })
    })
    .then(res=>res.json())
    .then(data=>{
        const {check} = data;
        func(check)
    }).catch(err=>console.log(err))

  }

  const  checkCode = ({phone,code},func) =>{

    fetch(API_URL + "/users/checkcode",{
      method:"POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        phone,
        code
      })
    })
    .then(res=>res.json())
    .then(data=>{
        const {success} = data;
        func(success);
    }).catch(err=>console.log(err))

  }

  const value = {
    phone,
    shops,
    userName,
    password,
    setPassword,
    setShops,
    setUserName,
    setPhone,
    email,
    setEmail,
    userSignUp,
    userSignIn,
    checkPhone,
    checkCode,
    loading,
    userSignOut,
    loginState

  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)