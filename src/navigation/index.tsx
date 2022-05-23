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
import { ActivityIndicator, ColorSchemeName, View } from "react-native";

import NotFoundScreen from "../screens/NotFoundScreen";
import { RootStackParamList } from "../../types";
import LinkingConfiguration from "./LinkingConfiguration";
import CustomSignUpScreen from "../screens/authentication/CustomSignUpScreen";
import { useAuthContext } from "../contexts/AuthContext";
import DrawerNavigator from "./DrawerNavigateScreens";
import {Auth, Hub} from 'aws-amplify';

import FinalSignInScreen from "../screens/authentication/finalSignIn";
import ConfirmEmailScreen from "../screens/authentication/ConfirmPhoneScreen";
// import ForgotPasswordScreen from "../screens/authentication/ForgetPasswordScreen";
// import NewPasswordScreen from "../screens/authentication/NewPasswordScreen";
import AppLoading from "expo-app-loading";
import FinalSignUpScreen from "../screens/authentication/finalSignUp";

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

function RootNavigator() {
  const { userId } = useAuthContext();

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

    Hub.listen('auth', listener);
    return () => Hub.remove('auth', listener);
  }, []);

  if (user === undefined) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <AppLoading />
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
        {user ? (
          <Stack.Screen name="Root" component={DrawerNavigator} />
        ) : (
          <>
            <Stack.Screen name="SignUp" component={FinalSignUpScreen} />
            <Stack.Screen name="SignIn" component={FinalSignInScreen} />
            <Stack.Screen name="ConfirmPhone" component={ConfirmEmailScreen} />
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