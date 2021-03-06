import React,{useState,useEffect} from 'react';
import { View,Text,Button,Icon,Center,Box} from 'native-base';
import MapView,{PROVIDER_GOOGLE} from 'react-native-maps';
import {useAuth} from '../components/context/auth';
import {StyleSheet,Dimensions,Image,Platform,Animated} from 'react-native';
import {API_URL} from "../config";
import {useNavigation} from '@react-navigation/native';
import Popup from '../components/Popup';
import {AntDesign} from '@expo/vector-icons';


const {width,height} = Dimensions.get('window');
const CARD_WIDTH = width * 0.8;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;

const SelectShopsScreen = ()=>{

    const navigation=useNavigation();

    let mapIndex = 0
    let mapAnimation = new Animated.Value(0)
    const _map = React.useRef()
    const _scrollView = React.useRef()

    const [shops,setShops] = useState([]);
    const [choosenShops,setChoosenShops] = useState([]);
    
    
    const [region, setRegion] = useState({
        latitude: 55.63,
        longitude: 37.65,
        latitudeDelta: 0.04,
        longitudeDelta: 0.05
    })

    const {user, setUser, token} =useAuth();
    
    const [showModal, setShowModal] = useState(false);

    useEffect(()=>{

        fetch(API_URL + "/shops",{headers:{
            "Authorization":`Bearer ${token}`
        }})
        .then(res=>res.json())
        .then(data=>{
            setShops(data.items)
        })

    },[])

    useEffect(()=>{ 
        mapAnimation.addListener(({value})=>{
            let index = Math.floor(value/CARD_WIDTH + 0.3)
            if(index >= shops.length){
                index = shops.length -1 
            }
            if(index<=0){
                index = 0
            }
    
            clearTimeout(regionTimeOut);
            const regionTimeOut = setTimeout(()=>{
                if(mapIndex!=index){
                    mapIndex = index;
                    const {coordinates} = shops[index]
                    _map.current.animateToRegion({
                        ...{
                            latitude: coordinates.lat,
                            longitude: coordinates.lon
                        },
                        latitudeDelta: region.latitudeDelta,
                        longitudeDelta: region.longitudeDelta
                    },350)
                }
            },10)
        })
    });

    const interpolations = shops.map((shop,index)=>{
        const inputRange = [
            (index - 1) * CARD_WIDTH,
            index * CARD_WIDTH,
            ((index + 1) * CARD_WIDTH),
          ];
        const scale = mapAnimation.interpolate({
            inputRange,
            outputRange: [1, 1.5, 1],
            extrapolate: "clamp"
        });
    
        return { scale };
    })

    const onMarkerPress = (mapEventData)=>{

        const markerID = mapEventData._targetInst.return.key;
        let x = 0;
    
        shops.forEach((shop, i)=>{
            if(shop._id==markerID){
                console.log(i);
                x = (i * CARD_WIDTH) + (i * 20);
                return;
            }
        })

        //let x = (markerID * CARD_WIDTH) + (markerID * 20);
        if(Platform.OS=='ios'){
            x = x - SPACING_FOR_CARD_INSET
        };

        _scrollView.current.scrollTo({x:x,y:0,animated:true})
    }

    const selectShops = () =>{
        if(choosenShops.length){
            setUser({...user, shops: choosenShops}); 
            navigation.navigate("Products");
        }
    }


    return(
        <Box>
            <MapView style={styles.map}
                ref={_map}
                initialRegion={region}
                provider={PROVIDER_GOOGLE}
                loadingEnabled={true}
            >
                {shops.map((shop,index)=>{

                    const scaleStyle = {
                        transform: [
                        {
                            scale: interpolations[index].scale,
                        },
                        ],
                    };

                    return(
                        <MapView.Marker 
                            key={shop._id} 
                            coordinate={{
                                latitude:shop.coordinates.lat,
                                longitude:shop.coordinates.lon
                            }}
                            onPress={(e)=>onMarkerPress(e)}
                        >
                            <Animated.View style={[styles.markerWrap]}>
                                <Animated.Image
                                source={require('../icons/map_marker.png')}
                                style={[styles.marker, scaleStyle]}
                                resizeMode="cover"
                                />
                            </Animated.View>
                        </MapView.Marker>
                    )
                })}
            </MapView>
            <View style={styles.skipWrapper}>
                <Button colorScheme="emerald" size='sm' onPress={() => setShowModal(true)}>
                    ???????????????????? ??????
                </Button>
            </View>
            <Popup text="?????????????? ?????????????? ?????????? ?????????? ?? ???????????????????? ????????????????????????"
                showModal={showModal}
                setShowModal={setShowModal}
                buttons={{
                    buttonYes:{
                        title:"????, ??????????????",
                        click:()=>navigation.navigate("Products")
                    }
                }}
            /> 
            <View  style={styles.scrollView}>
                <Animated.ScrollView
                    ref={_scrollView}
                    horizontal
                    scrollEventThrottle={1}
                    showsHorizontalScrollIndicator={false}
                    snapToInterval={CARD_WIDTH + 20}
                    snapToAlignment="center"
                    contentInset={{
                        top: 0,
                        left: SPACING_FOR_CARD_INSET,
                        bottom: 0,
                        right: SPACING_FOR_CARD_INSET
                    }}
                    contentContainerStyle={{
                        paddingHorizontal: Platform.OS=='android' ? SPACING_FOR_CARD_INSET : 0
                    }}
                    onScroll={
                        Animated.event(
                            [
                                {
                                    nativeEvent: {
                                        contentOffset: {
                                            x: mapAnimation,

                                        }
                                    }
                                }
                            ],
                            {useNativeDriver: true}
                        )
                    }    
                >
                    {shops.map((shop,index)=>{

                        const choosenIndex = choosenShops.indexOf(shop._id)
                        return(
                            <View key={shop._id} style={styles.cardWrapper}>
                                <View style={styles.card}>
                                    <Image 
                                        source={require('../images/shop.jpg')}
                                        resizeMode="cover"
                                        style ={styles.cardImage}
                                    />
                                    <View style={styles.textContent}>
                                        <Text style={styles.cardTitle}>{shop.title}</Text>
                                        <Text style={styles.cardDescription}>???????????????????????? ????-?? ??.20</Text>
                                        <View style={styles.iconWrapper}>
                                            <AntDesign name={(choosenIndex!=-1) ? "checkcircle" : "checkcircleo"}
                                                style={(choosenIndex!=-1) ? styles.checkcircle : styles.checkcircleo}
                                                onPress={()=>{
                                                    const newShops=[...choosenShops]
                                                    if(choosenIndex==-1){
                                                        newShops.push(shop._id)
                                                    }else{
                                                        newShops.splice(choosenIndex,1)
                                                    }
                        
                                                    setChoosenShops(newShops);                                                
                                                }}
                                            />
                                        </View>
                                    </View>
                                </View>
                            </View>

                        )}
                    )}

                </Animated.ScrollView>
                <Center>
                    <Button 
                        width={CARD_WIDTH}
                        colorScheme="emerald"
                        variant={choosenShops.length==0 ? "outline" : "solid"}
                        disabled={choosenShops.length==0}
                        onPress={selectShops}
                    >
                        ??????????
                    </Button>
                </Center>

            </View>
        </Box>
    )

}

const styles = StyleSheet.create({
    map: {
        height:"100%"
    },
    skipWrapper:{
        position: "absolute",
        top:Platform.OS === 'ios' ? 10 : 0,
        width:"100%",
        flexDirection: "row",
        flex:1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingVertical: 10,
        paddingHorizontal: 5

    },
    image:{
        width: 120,
        height: 80
    },
    scrollView:{
        position: "absolute",
        bottom: 0,
        left:0,
        right: 0,
        paddingVertical:5,
        backgroundColor: "#fff",

    },
    cardWrapper:{
        padding: 5
    },
    card:{
        backgroundColor: "#FFF",
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
        borderBottomLeftRadius: 5,
        marginHorizontal: 5,
        overflow: 'hidden',
        height: 220,
        width: CARD_WIDTH,
        elevation: 2,
    },
    textContent:{
        flex:2,
        padding: 10
    },
    cardImage:{
        flex: 3,
        width: "100%",
        height: "100%",
        alignSelf: "center"
    },
    cardTitle: {
        fontSize: 12,
        fontWeight: "bold"
    },
    cardDescription:{
        fontSize: 12,
        color: "#444"
    },
    markerWrap: {
        alignItems: "center",
        justifyContent: "center",
        width:50,
        height:50,
    },
    marker: {
        width: 30,
        height: 30,
    },
    iconWrapper: {
        alignItems:"flex-end",
        paddingRight: 5,
    },
    checkcircleo: {
        fontSize: 50,
        fontWeight:"200",
        color: "#eee"
    },
    checkcircle: {
        fontSize: 50,
        fontWeight:"200",
        color:'#10b981'

    },
    button:{
        borderRadius: 10,
        marginRight: 35,
        marginLeft:35,
        marginBottom: 10,
        marginTop: 10,

    },
    skipButton:{
        marginRight: 10,
        marginLeft:10,
        marginBottom: 10,
        marginTop: 10,
        backgroundColor:'#fff',
        borderRadius:20,
        padding:8,
        height:35,
        shadowColor: '#ccc',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 10,
    },

    popupWrapper: {
        position: "absolute",
        justifyContent: 'center',
        alignItems: 'center',
        width:"100%",
        height: "100%",
        flexDirection: "column",
        backgroundColor: "black",
        opacity: 0.7,
       
    },
    popupInner: {
        marginRight: 50,
        marginLeft:50,
        borderRadius: 10,
        height: 200,
        backgroundColor: "#fff",
        margin: 'auto',

    }


})

export default SelectShopsScreen;

