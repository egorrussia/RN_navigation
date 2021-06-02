import React,{useEffect,useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import DrawerNavigator from './navigators/DrawerNavigator';
import RootStackNavigator from './navigators/RootStackNavigator';
import {AuthProvider} from "./components/context/auth";
import * as Font from 'expo-font';
import Loader from "./components/Loader";

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
      <NavigationContainer>
          {/* <DrawerNavigator/> */}
          <RootStackNavigator/>
      </NavigationContainer>
    </AuthProvider>
  );
}

export default App;

