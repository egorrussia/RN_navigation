import React,{useEffect,useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import DrawerNavigator from './navigators/DrawerNavigator';
import RootStackNavigator from './navigators/RootStackNavigator';
import {AuthProvider,useAuth} from "./components/context/auth";
import { useFonts } from 'expo-font';
import Loader from "./components/Loader";
import {NativeBaseProvider,StatusBar,extendTheme} from 'native-base';
import {StyleSheet} from 'react-native';


const theme = extendTheme({
  components: {
    Button: {
      baseStyle: {
        rounded: 'md',
        
      },
      defaultProps: {
        colorScheme: 'emerald',
        _text: {
          color:'emerald.50'
        },
      },
      variants: {
        ghost: {
          colorScheme: 'emerald',
          _text: {
            color:'emerald.50'
          },            
        }
      },    
    },
    Heading: {
      baseStyle: ({ colorMode }) => {
        return {
          color: colorMode === 'dark' ? 'red.300' : 'blue.300',
          fontWeight: 'normal',
        };
      },
    },
    Input:{
      defaultProps: {
        _focus: {
          border: '#6ee7b7',
        }
      },
    },
    FormControlLabel: {
      baseStyle: {
        _text:{
          fontSize: 'sm',
          fontWeight: 'bold'

        },
        
      },
      defaultProps: {
        _text: {
          color: 'muted.500'
        },
      },


  }
  },
});


const NavigationWrapper = ()=>{

  const {loginState} = useAuth();
  const {isLoading,userToken} = loginState;
  if(isLoading){
    return <Loader/>
  }
  const auth = !!userToken;
  return (

        <NavigationContainer>
          <StatusBar backgroundColor="#009387" barStyle="light-content"/>
          {(auth) ? <DrawerNavigator/> : <RootStackNavigator/>} 
        </NavigationContainer>
  )

}

const styles = StyleSheet.create({
  container: {

      backgroundColor: 'red'

    },

});


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
      <NativeBaseProvider theme={theme}>
        <AuthProvider>
          <NavigationWrapper/>
        </AuthProvider>
      </NativeBaseProvider>

    )

}


export default App;

