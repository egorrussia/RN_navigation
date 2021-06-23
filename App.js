import React,{useEffect,useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import DrawerNavigator from './navigators/DrawerNavigator';
import RootStackNavigator from './navigators/RootStackNavigator';
import {AuthProvider,useAuth} from "./components/context/auth";
import * as Font from 'expo-font';
import Loader from "./components/Loader";

const NavigationWrapper = ()=>{

  const {loginState} = useAuth();
  const {isLoading,userToken} = loginState;
  if(isLoading){
    return <Loader/>
  }
  const auth = !!userToken;
  return (
    <NavigationContainer>
      {(auth) ? <DrawerNavigator/> : <RootStackNavigator/>} 
    </NavigationContainer>
  )

}

const App = () => {

  const [loading,setLoading]=useState(true);

  useEffect(()=>{
    const loadFonts = async () =>{
      await Font.loadAsync({
        Roboto: require('native-base/Fonts/Roboto.ttf'),
        Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      });
      setLoading(false)
    }
    loadFonts()
  }, [])

  if(loading){
    return(
      <Loader/>
    )
  }


  return (
    <AuthProvider>
      <NavigationWrapper/>
    </AuthProvider>
  );
}




export default App;

