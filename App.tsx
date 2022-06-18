import "react-native-gesture-handler";
import "react-native-get-random-values";

import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

import useCachedResources from "./src/hooks/useCachedResources";
import Navigation from "./src/navigation";

import { StreamChat } from "stream-chat";
import { OverlayProvider, Chat, Theme, DeepPartial } from "stream-chat-expo";
import AuthContext from "./src/contexts/AuthContext1";
// import { StreamColors } from "./src/constants/Colors";
import React from "react";
import { Amplify, } from "aws-amplify";
// import { withAuthenticator } from "aws-amplify-react-native";
import awsconfig from "./src/aws-exports";
// import React = require("react");
//import auth from '@react-native-firebase/auth';
// import messaging from '@react-native-firebase/messaging'

// Amplify.configure({ 
//   ...awsconfig, 
//   Analytics: { disabled: true }, 
//   Auth: {
//     userPoolId: '1_dLDOUXoEx',
//     userPoolWebClientId: '6elm2bg7uu6ijtgh0eek4joj0d',
//     authenticationFlowType: 'CUSTOM_AUTH'
//   }
// });
Amplify.configure({
  ...awsconfig,
  Analytics: { disabled: false },
})


const API_KEY = "d2sx6cyu72g8";
const client = StreamChat.getInstance(API_KEY);

// const theme: DeepPartial<Theme> = {
//   colors: StreamColors,
// };

function App() {
  const isLoadingComplete = useCachedResources();
 
  const [userId, setUserId] = useState(undefined);

  // Request Push Notification permission from device.


  // useEffect(() => {
    // this is done when component mounts
    // return () => {
    //   // this is done when component unmounts
    //   // client.disconnectUser();
    // };
    // requestPermission();
  // }, []);

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <AuthContext client={client} >
          <OverlayProvider >
            <Chat client={client}>
              <Navigation colorScheme={"light"} />
            </Chat>
          </OverlayProvider>
        </AuthContext>
        <StatusBar style="auto" />
      </SafeAreaProvider>
    );
  }
}
export default App;
// // export default withAuthenticator(App); //passing app func throw the default aws-auth state
// // withAuthenticator manages all the auth pages and states of the aws auth


/* eslint-disable react/display-name */
/* eslint-disable react/display-name */
/*
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { LogBox, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, useHeaderHeight } from '@react-navigation/stack';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { StreamChat } from 'stream-chat';
import {
  Channel,
  ChannelAvatar,
  ChannelList,
  Chat,
  MessageInput,
  MessageList,
  OverlayProvider,
  useChannelsContext,
  useAttachmentPickerContext,
} from 'stream-chat-expo';

LogBox.ignoreAllLogs(true);

const styles = StyleSheet.create({
  previewContainer: {
    display: 'flex',
    flexDirection: 'row',
    borderBottomColor: '#EBEBEB',
    borderBottomWidth: 1,
    padding: 10,import React, { useContext, useEffect, useMemo, useState } from 'react';
import { LogBox, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, useHeaderHeight } from '@react-navigation/stack';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { StreamChat } from 'stream-chat';
import {
  Channel,
  ChannelAvatar,
  ChannelList,
  Chat,
  MessageInput,
  MessageList,
  OverlayProvider,
  useChannelsContext,
  useAtt
  },
  previewTitle: {
    textAlignVertical: 'center',
  },
});

const chatClient = StreamChat.getInstance('d2sx6cyu72g8');
const userToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoic3RpbGwtZnJvZy0yIn0.eHbPy6wfy5f9_dzchVUmUF8IOS7h_R7R0jPGB9yEFh4';
const user = { id: 'still-frog-2' };

const filters = {
  members: { $in: ['still-frog-2'] },
  type: 'messaging',
};

const sort = { last_message_at: -1 };

const CustomChannelPreview = ({ channel, setActiveChannel }) => {
  const { onSelect } = useChannelsContext();
  return (
    <TouchableOpacity style={styles.previewContainer} onPress={() => onSelect(channel)}>
      <ChannelAvatar channel={channel} />
      <Text style={styles.previewTitle}>{channel.data.name}</Text>
    </TouchableOpacity>
  );
};

const ChannelListScreen = ({ navigation }) => {
  const { setChannel } = useContext(AppContext);

  const memoizedFilters = useMemo(() => filters, []);

  return (
    <Chat client={chatClient}>
      <View style={StyleSheet.absoluteFill}>
        <ChannelList
          filters={memoizedFilters}
          onSelect={(channel) => {
            setChannel(channel);
            navigation.navigate('Channel');
          }}
          Preview={CustomChannelPreview}
          sort={sort}
        />
      </View>
    </Chat>
  );
};

const ChannelScreen = ({ navigation }) => {
  const { channel } = useContext(AppContext);
  const headerHeight = useHeaderHeight();
  const { setTopInset } = useAttachmentPickerContext();

  useEffect(() => {
    setTopInset(headerHeight);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerHeight]);

  return (
    <SafeAreaView>
      <Chat client={chatClient}>
        <Channel channel={channel} keyboardVerticalOffset={headerHeight}>
          <View style={StyleSheet.absoluteFill}>
            <MessageList />
            <MessageInput />
          </View>
        </Channel>
      </Chat>
    </SafeAreaView>
  );
};

const Stack = createStackNavigator();
const AppContext = React.createContext();

const App = () => {
  const { bottom } = useSafeAreaInsets();

  const [channel, setChannel] = useState();
  const [clientReady, setClientReady] = useState(false);
  const [thread, setThread] = useState();

  useEffect(() => {
    const setupClient = async () => {
      await chatClient.connectUser(user, userToken);

      setClientReady(true);
    };

    setupClient();
  }, []);

  return (
    <NavigationContainer>
      <AppContext.Provider value={{ channel, setChannel, setThread, thread }}>
        <OverlayProvider bottomInset={bottom}>
          {clientReady && (
            <Stack.Navigator
              initialRouteName='ChannelList'
              screenOptions={{
                headerTitleStyle: { alignSelf: 'center', fontWeight: 'bold' },
              }}
            >
              <Stack.Screen
                component={ChannelScreen}
                name='Channel'
                options={() => ({
                  headerBackTitle: 'Back',
                  headerRight: () => <></>,
                  headerTitle: channel?.data?.name,
                })}
              />
              <Stack.Screen component={ChannelListScreen} name='ChannelList' options={{ headerTitle: 'Channel List' }} />
            </Stack.Navigator>
          )}
        </OverlayProvider>
      </AppContext.Provider>
    </NavigationContainer>
  );
};

// export default () => {
//   return (
//     <SafeAreaProvider>
//       <App />
//     </SafeAreaProvider>
//   );
// };
*/
// export default App;