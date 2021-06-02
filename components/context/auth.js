import React, { createContext, useContext, useState } from 'react';
const AuthContext = createContext();
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react/cjs/react.development';
const USER_KEY='@user_key';
//import {API_URL} from '../../config'

const API_URL = "http://159.253.19.16:3001"

export const AuthProvider = ({children}) => {
  /** START */
  // создание данных и функций
  const [phone, setPhone] = useState('');
  const [userName, setUserName] = useState('');
  const [shops, setShops] = useState([]);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    
    (async ()=>{

      try {
        await AsyncStorage.setItem(USER_KEY, JSON.stringify({userName}))
      } catch (e) {
        // saving error
      }

    })()

},[userName])

  useEffect(()=>{
    
    (async ()=>{

      try {
        let userData = await AsyncStorage.getItem(USER_KEY)
        if(userData){
          const {userName}=JSON.parse(userData)
          if(userName){
            setUserName(userName)
          }
        }
        setLoading(false)
      } catch (e) {
        // saving error
      }
    })()
  },[])

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
    .then(data=>{
        console.log(data)
        func()
    }).catch(err=>console.log(err))

  }

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
    .then(data=>{
        const {name, shops, email, phone,role} = data.item 
        setUserName(name)
        setEmail(email)
        setPhone(phone)
        func()
    }).catch(err=>console.log(err))

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
    loading
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)