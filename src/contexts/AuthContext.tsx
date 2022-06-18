// import { createContext, useState, useContext } from "react";
// import React from "react";

// const AuthContext = createContext({
//   userId: null,
//   setUserId: (newId: string) => {},
// });

// const AuthContextComponent = ({ children }) => {
//   const [userId, setUserId] = useState(null);

//   return (
//     <AuthContext.Provider value={{ userId, setUserId }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthContextComponent;

// export const useAuthContext = () => useContext(AuthContext);
import { Auth, API, graphqlOperation } from "aws-amplify";
import { createContext, useState, useContext, useEffect } from "react";
import { getStreamToken } from "../graphql/queries";
import { Alert, Pressable, SafeAreaView, ScrollView, TextInput, Text, StyleSheet, ActivityIndicator } from "react-native";
import React from 'react';

import messaging from '@react-native-firebase/messaging'
import Navigation from "../navigation";
import { useNavigation } from "@react-navigation/native";
import { useChatContext } from "stream-chat-expo";
import AppLoading from "expo-app-loading";
import { useForm } from "react-hook-form";

const AuthContext = createContext({
  userId: null,
  setUserId: (newId: string) => {},
  
});
const userContext = createContext({
  picId: undefined,
  setPicId: (newId: string) => {},
  
});

const AuthContextComponent = ({ children, client, }) => {
  const [userId, setUserId] = useState(null);
  // const { picId } = useUserContext();
  // const navigation = useNavigation();

  const connectStreamChatUser = async () => {
    const {watch} = useForm();
    const name = watch('username');
    const picID = watch('picID')
    
    const userData = await Auth.currentAuthenticatedUser();
    const { sub, username,} = userData.attributes;

    const tokenResponse = await API.graphql(graphqlOperation(getStreamToken));
    const token = tokenResponse?.data?.getStreamToken;
    if (!token) {
      Alert.alert("Failed to creat ID check your connection and retry...!");
      return;
    }else console.warn(token);
    console.log(
      sub, name, picID, username
    );
    await client.connectUser(
      {
        id: sub,
        name: username,
        // image: picID,
        // number: username,
          // "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/elon.png",
      },
      token //token dynamically generated from aws backend
      //client.devToken(sub)
    );

    const channel = client.channel("livestream", "public", { name: "Public" });
    await channel.watch();
    // const channels = client.channels();

    setUserId(sub);
    // setPicId(picture);
    // console.log(sub)
  };

  useEffect(() => {
    connectStreamChatUser();
  }, []);

  // const requestPermission = async () => {
  //   const authStatus = await messaging().requestPermission();
  //   const enabled =
  //     authStatus === messaging.AuthorizationStatus.AUTHORIZED || 
  //     authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  //   if (enabled) {
  //     console.log('Authorization status:', authStatus);
  //     // const token = await messaging().getToken();
  //     //if it does not work initially
  //   }
  // };

  // const registerDevice = async () => {
  //   const token = await messaging().getToken();
  //   await client.addDevice(token, "firebase");
  // }

  // useEffect(()=>{
  //   if(userId){
  //     requestPermission();
  //     registerDevice();
  //   }
  // },[userId])

  return (
    <>
    <AuthContext.Provider value={{ userId, setUserId }}>
      {children}
      
    </AuthContext.Provider>
  </>
  );
};


export default AuthContextComponent;

export const useAuthContext = () => useContext(AuthContext);
export const useUserContext = () => useContext(userContext);

