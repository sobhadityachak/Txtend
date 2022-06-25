/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { useEffect, useState } from "react";
import { ColorSchemeName, View } from "react-native";

import NotFoundScreen from "../screens/NotFoundScreen";
import { RootStackParamList } from "../../types";
import LinkingConfiguration from "./LinkingConfiguration";
// import CustomSignUpScreen from "../screens/authentication/CustomSignUpScreen";
import { useAuthContext } from "../contexts/AuthContext";
import DrawerNavigator from "./DrawerNavigateScreens";
import {Auth, Hub} from 'aws-amplify';

// import FinalSignInScreen from "../screens/authentication/finalSignIn";
import SignUpScreen from "../screens/authentication/SignUpScreen";
import NewSignUpScreen from "../screens/authentication/newSignUp";
import NewSignInScreen from "../screens/authentication/newSignIn";
// import ForgotPasswordScreen from "../screens/authentication/ForgetPasswordScreen";
// import NewPasswordScreen from "../screens/authentication/NewPasswordScreen";
import AppLoading from "expo-app-loading";
// import FinalSignUpScreen from "../screens/authentication/finalSignUp";


export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

// notifee.onBackgroundEvent(async ({ detail, type }) => {
//   if (type === EventType.PRESS) {
//     // user press on notification detected while app was on background on Android
//     const channelId = detail.notification?.data?.channel_id;
//     if (channelId) {
//        navigationContainerRef.current?.navigate('ChannelScreen', { channelId });
//     }
//     await Promise.resolve();
//   }
// });

function RootNavigator() {
  const { setUserId } = useAuthContext();

  // if (!userId) {
  //   return <ActivityIndicator />;
  // }
  
  const [user, setUser] = useState(undefined);

  const checkUser = async () => {
    try {
      const authUser = await Auth.currentAuthenticatedUser({bypassCache: true});
      setUser(authUser);
    } catch (e) {
      setUser(null);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  useEffect(() => {
    const listener = data => {
      if (data.payload.event === 'signIn' || data.payload.event === 'signOut') {
        checkUser();
      }
    };

    // if(authUser){
    //         //for background notification
    //         messaging().onNotificationOpenedApp((remoteMessage)=>{
    //           console.log(
    //             "Notification caused app to open from background state:",
    //             remoteMessage
    //           );
    //           const channel = JSON.parse(remoteMessage?.data?.channel || "");
    //           console.log('This message belongs to channel with id - ', channel.id);
    //           navigation.navigate("ChannelScreen", {
    //             screen: "Chat",
    //             params: { channelId: channel.id },
    //           });
    //         });
    // }


    Hub.listen('auth', listener);
    return () => Hub.remove('auth', listener);
  }, []);

  if (user === undefined) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        {/* <AppLoading /> */}
        {/* <SplashScreen/> */}
      </View>
    );
  }
  return (
    // <Stack.Navigator>
    //   {/* {!userId ? (
    //     <Stack.Screen
    //     name="SignUpScreen"
    //     component={SignUpScreen}
    //     options={{headerShown: false}}
    //     />
    //   ) : ( */}

      <Stack.Navigator screenOptions={{headerShown: false}}>
        {(user)? (
          <Stack.Screen name="Root" component={DrawerNavigator} />
        ) : (
          <>
            <Stack.Screen name="SignUp" component={NewSignUpScreen} />
            <Stack.Screen name="SignIn" component={NewSignInScreen} />
            <Stack.Screen name="Profile" component={SignUpScreen} />
            {/* <Stack.Screen
              name="ForgotPassword"
              component={ForgotPasswordScreen}
            /> */}
            {/* <Stack.Screen name="NewPassword" component={NewPasswordScreen} /> */}
      {/* <Stack.Screen
        name="Root"
        component={DrawerNavigator}
        options={{ headerShown: false }}
      /> */}
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />
      </>
        )}
    </Stack.Navigator>
  );
}

// export default ;