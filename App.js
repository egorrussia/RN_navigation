import React,{useEffect,useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import DrawerNavigator from './navigators/DrawerNavigator';
import RootStackNavigator from './navigators/RootStackNavigator';
import {AuthProvider,useAuth} from "./components/context/auth";
import { useFonts } from 'expo-font';
import Loader from "./components/Loader";
import {NativeBaseProvider} from 'native-base';


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

  // useEffect(()=>{
  //   const loadFonts = async () =>{
  //     await Font.loadAsync({
  //       Roboto: require('native-base/Fonts/Roboto.ttf'),
  //       Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
  //     });
  //     setLoading(false)
  //   }
  //   loadFonts()
  // }, [])

    const [loaded] = useFonts({
      Roboto: require('./assets/fonts/Roboto-Medium.ttf')
    });
    

    if (!loaded) {
      return(
        <NativeBaseProvider>
          <Loader/>
        </NativeBaseProvider>
      )
    }

    return(
      <NativeBaseProvider>
        <AuthProvider>
          <NavigationWrapper/>
        </AuthProvider>
      </NativeBaseProvider>
    )


  // if(loading){
  //   return(
      
  //     <NativeBaseProvider>
  //       <Loader/>
  //     </NativeBaseProvider>
  //   )
  // }

  // return (
  //   <NativeBaseProvider>
  //     <AuthProvider>
  //       <NavigationWrapper/>
  //     </AuthProvider>
  //   </NativeBaseProvider>
  // );
}


export default App;

