import React, { createContext, useContext, useState } from 'react';
const AuthContext = createContext();
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react/cjs/react.development';

//import {API_URL} from '../../config'

const API_URL = "http://159.253.19.16:3001"

export const AuthProvider = ({children}) => {

  const [user,setUser] = useState({
    name: '',
    phone: '',
    shops: [],
    email: ''

  });

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

  const token = loginState.userToken;

  useEffect(() => {
      let userToken = null;
      let name = null;
      try {
        userToken = async()=>await AsyncStorage.getItem('userToken');
        user = async()=>await AsyncStorage.getItem('user');
        name = user.name;
      } catch(e) {
        console.log(e);
      }
      dispatch({ type: 'RETRIEVE_TOKEN', token: userToken, id: name });
  }, []);


  //регистрация
  const  userSignUp = (name,password,func) =>{

     fetch(API_URL + "/users/signup",{
      method:"POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        phone,
        name,
        password
      })
    })
    .then(res=>res.json())
    .then(async data=>{
      console.log(data)
        const {name, email, phone,role,token} = data
        func()
        try {
          await AsyncStorage.setItem('userToken', token);
          await AsyncStorage.setItem('user', { name,email,phone,role });
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
        const {name, shops, email, phone,role,token} = data 
        setUser({...user,name,email,phone,shops})
        func()

        try {
          await AsyncStorage.setItem('userToken', token);
          await AsyncStorage.setItem('user', { name,shops,email,phone,role });
        } catch(e) {
          console.log(e);
        }
        dispatch({ type: 'LOGIN', id: name, token: token });

    }).catch(err=>console.log(err))

  }

   const userSignOut = async ()=>{
    try {
      await AsyncStorage.removeItem('userToken');
      await AsyncStorage.removeItem('user');
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
    userSignUp,
    userSignIn,
    checkPhone,
    checkCode,
    loading,
    userSignOut,
    loginState,
    token,
    user,
    setUser

  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)