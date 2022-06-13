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
  const { picId } = useUserContext();
  // const navigation = useNavigation();

  const connectStreamChatUser = async () => {
    const userData = await Auth.currentAuthenticatedUser();
    const { sub, username,} = userData.attributes;

    const tokenResponse = await API.graphql(graphqlOperation(getStreamToken));
    const token = tokenResponse?.data?.getStreamToken;
    if (!token) {
      Alert.alert("Failed to creat ID check your connection and retry...!");
      return;
    }else console.warn(token);
    // console.warn(picture);
    await client.connectUser(
      {
        id: sub,
        name: username,
        image: picId,
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
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  // const { setUserId } = useAuthContext();

  // const { client } = useChatContext();
  const signUp = () => {
    if(!connectStreamChatUser()) return(
      <>
      <ActivityIndicator />
      <AppLoading/>
       </>
    );
   connectStreamChatUser();
   // console.log(username)
   // navigate to the home page
 };
  return (
    <>
    <AuthContext.Provider value={{ userId, setUserId }}>
      {children}
      
    </AuthContext.Provider>
  </>
  );
};

const NewSignUpScreen = () => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const { setUserId } = useAuthContext();

  const { client } = useChatContext();

  const connectUser = async () => {
    // sign in with your backend and get the user token


    await client.connectUser(
      {
        id: username,
        name: name,
        image:
          "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/elon.png",
      },
      client.devToken(username)
    );

    const channel = client.channel("livestream", "public", { name: "Public" });
    await channel.watch();

   setUserId(username);
  //  setUserImage()

  };

  const signUp = () => {
     if(!connectUser()) return(
       <>
       <ActivityIndicator />
       <AppLoading/>
        </>
     );
    connectUser();
    // console.log(username)
    // navigate to the home page
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Welcome back</Text>
        <Text style={styles.subtitle}>We are so excited to see you again</Text>

        <Text style={styles.text}>ACCOUNT INFORMATION</Text>

        <TextInput
          value={username}
          onChangeText={setUsername}
          style={styles.input}
          placeholderTextColor="grey"
          placeholder="Username"
        />
        <TextInput
          value={name}
          onChangeText={setName}
          style={styles.input}
          placeholderTextColor="grey"
          placeholder="Full name"
        />
        <TextInput
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          placeholderTextColor="grey"
          placeholder="Password"
        />

        <Text style={styles.forgotPasswordText}>Forgot password?</Text>

        <Pressable style={styles.button} onPress={signUp}>
          <Text style={styles.buttonText}>Login</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#36393E",
    flex: 1,
    padding: 10,
    paddingVertical: 30,
  },
  title: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
    alignSelf: "center",
    marginVertical: 10,
  },
  subtitle: {
    color: "lightgrey",
    fontSize: 20,
    alignSelf: "center",
    marginBottom: 30,
  },
  input: {
    backgroundColor: "#202225",
    marginVertical: 5,
    padding: 15,
    color: "white",
    borderRadius: 5,
  },
  button: {
    backgroundColor: "#5964E8",
    alignItems: "center",
    padding: 15,
    borderRadius: 5,
    marginVertical: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  forgotPasswordText: {
    color: "#4CABEB",
    marginVertical: 5,
  },
  text: {
    color: "white",
    fontWeight: "bold",
    marginVertical: 5,
  },
});
export default AuthContextComponent;

export const useAuthContext = () => useContext(AuthContext);
export const useUserContext = () => useContext(userContext);

