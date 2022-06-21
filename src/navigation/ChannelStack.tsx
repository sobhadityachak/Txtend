import { FontAwesome5 } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useState, useEffect } from "react";
import * as React from 'react'

import { Pressable, StyleSheet } from "react-native";
import ChannelMembersScreen from "../screens/chatScreens/ChannelMembersScreen";
import ChannelScreen from "../screens/chatScreens/ChannelScreen";
import InviteMembersScreen from "../screens/InviteMembersScreen";
import { AntDesign } from "@expo/vector-icons";

import { useRoute, useNavigation } from "@react-navigation/native";
import { useAuthContext } from "../contexts/AuthContext1";
import { ChannelAvatar, useChatContext } from "stream-chat-expo";
import { FAB, Button, Icon } from "@rneui/themed"
import QrcodeScanner from "../screens/barcode/qrcodeScanner";

const Stack = createNativeStackNavigator();
// const { user } = useAuthContext();

const ChannelStack = () => {
  
  const { client } = useChatContext();
  const route = useRoute();
  const navigation = useNavigation();
  const channel = route.params?.channel;
  const { userId } = useAuthContext();
  const [users, setUsers] = useState([]);

  // const fetchUsers = async () => {
  //   const response = await client.queryUsers({});
  //   setUsers(response.users);
  // };
  // const dmUser = (friend) => {
  //   friend.forEach(element => {
  //     if(element != userId)
  //       setDmUser(element)
  //   });
  // }
  // useEffect(() => {
  //   fetchUsers();
  // }, []);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Chat"
        component={ChannelScreen}
        options={({ navigation, route }) => ({
         title: 'j',
          headerRight: () => (
            <MembersIcon route={route} navigation={navigation} />
            ),
          headerLeft: () => <HamburgerMenu navigation={navigation} />,
          // headerShadowVisible: true,
          // headerTransparent:true,
          // headerTitle: false,
         headerShown: false,
        //  headerT
        })}
        
      />
      <Stack.Screen
        name="ChannelMembers"
        component={ChannelMembersScreen}
        options={{ 
          headerTransparent: true,
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="InviteMembers"
        component={InviteMembersScreen}
        options={{ headerTransparent: false, }}
      />
      <Stack.Screen
        name="qrScanner"
        component={QrcodeScanner}
        />
    </Stack.Navigator>
  );
};

const MembersIcon = ({ route, navigation }) => {
  if (!route?.params?.channel) {
    return null;
  }

  return (
    <Pressable
      style={styles.icon}
      onPress={() =>
        navigation.navigate("ChannelMembers", {
          channel: route.params.channel,
        })
      }
    >
      <FontAwesome5 name="users" size={24} color="lightgray" />
    </Pressable>
  );
};

const HamburgerMenu = ({ navigation }) => (
  // <Pressable style={styles.icon} onPress={() => navigation.openDrawer()}>
  //   <AntDesign name="leftcircle" size={24} color="lightgray" />
  // </Pressable>
  
  <Icon 
        
  // raised
  // reverse
  // solid
  size={38}
  name='leftcircle'
  type='ant-design'
  color='rgba(90, 154, 230, 1)'
  // color='blue'
  onPress={() => navigation.toggleDrawer()}

/>
);

const styles = StyleSheet.create({
  icon: {
    marginRight: 10,
  },
});

export default ChannelStack;
