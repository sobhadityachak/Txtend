import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import { Text, StyleSheet, View, Pressable, Touchable, TextBase, BackHandler, ActivityIndicator } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Avatar, ChannelList, OverlayProvider } from "stream-chat-expo";
import { useAuthContext, useUserContext } from "../contexts/AuthContext";
// import ChannelScreen from "../screens/chatScreens/ChannelScreen";
// import { Auth } from "aws-amplify";
import React, { useEffect, useState } from "react";
import UserListScreen from "../screens/userlist/UserListScreen";
// import Button from "../components/Button";
// import ChannelMembersScreen from "../screens/chatScreens/ChannelMembersScreen";
import { FontAwesome5 } from "@expo/vector-icons";
import NewChannelScreen from "../screens/NewChannelScreen";
import ChannelStack from "./ChannelStack";
import { TouchableOpacity } from "react-native-gesture-handler";
// import { favCon } from "../../assets/profile.jpg";
import Navigation from ".";
import SignUpScreen from "../screens/authentication/SignUpScreen";
// import Colors from "../constants/Colors";
// import { AntDesign } from '@expo/vector-icons';
// import { FloatingAction } from "react-native-floating-action";
import { Button, Icon, Image } from "@rneui/themed"
import SettingScreen from "../screens/settings/SettingScreen";
import GroupChats from "../screens/channels/GroupchatScreen";
import qrCodeGenerator from "../screens/barcode/qrcodeGenerator";
import { Auth } from "aws-amplify";
import QrCodeGenerator from "../screens/barcode/qrcodeGenerator";
import AllChats from "../screens/channels/AllChatsScreen";
import Dms from "../screens/channels/DMchatsScreen";
import FavouritesScreen from "../screens/channels/FavouritesScreen";
// import { Auth } from "aws-amplify";
// import messaging from '@react-native-firebase/messaging'

const Drawer = createDrawerNavigator();
// const CustomHead (...props) => {
//   const { navigation } = props;

//   return (
//     <SafeAreaProvider>
//       <SafeAreaView>
//         <Text>Group chat</Text>
//       </SafeAreaView>
//     </SafeAreaProvider>
//   ) 

// };

const DrawerNavigator = () => {


  return (

    <Drawer.Navigator

      drawerContent={CustomDrawerContent}
      backBehavior='history'
      // header
      // defaultScreenOptions={}
      // detachInactiveScreens
      // initialRouteName={"DMs"}
      screenOptions={{
        // headerTitleAlign: 'center',
        // drawerActiveBackgroundColor: 'black',
        // drawerContentContainerStyle:{width:900}
        // headerLeft: (()=>Navigation.openDrawer())
        headerShown: false
      }}
    >
      <Drawer.Screen
        name="AllChats"
        component={AllChats}
        options={{ title: "All Chats" }}
      />
      <Drawer.Screen

        name="DMs"
        component={Dms}
        options={{
          title: "Direct Messages",
          // drawerLabel: {{focused: true, color:'white'}}
        }}
      />


      <Drawer.Screen
        name="ChannelScreen"
        component={ChannelStack}
        options={{
          headerShown: false,
        }}

      />


      <Drawer.Screen
        name="Groups"
        component={GroupChats}
        options={{
          // header: ()=>(<Text>group</Text>),
          headerShadowVisible: false,
          // headerTransparent: true,
          //  headerShown: false,
          headerTitleAlign: "center",
          // hea
          headerShown: false,
          title: "Group Chats",
        }}
      />
      <Drawer.Screen
        name="PrivateChat"
        component={PrivateChats}
        options={{ title: "Private Chat" }}
      />
      <Drawer.Screen
        name="Favourites"
        component={FavouritesScreen}
        options={{ title: "Favourites" }}
      />
      <Drawer.Screen
        name="Settings"
        component={SettingScreen}
        options={{ title: "Settings" }}
      />

      <Drawer.Screen
        name="Contacts"
        component={UserListScreen}
        options={{ title: "Contacts" }}
      />

      <Drawer.Screen
        name="NewChannel"
        component={NewChannelScreen}
        options={{ title: "Create New Group" }}
      />
      <Drawer.Screen
        name="SignUp"
        component={SignUpScreen}
      />
      <Drawer.Screen
        name="AddMembers"
        component={ChannelStack}
      />
      <Drawer.Screen
        name="qrGenerator"
        component={QrCodeGenerator}
      />
    </Drawer.Navigator>

  );
};

const CustomProfile = () => {
  const [userName, setUserName] = useState('');
  // const [picture,setUserPicture]  = useState('');
  const [number, setUserNumber] = useState('');
  // const { picId } = useUserContext();
  // const picture =require('../../assets/images/Logo.png');
  // console.warn(picId);

  // route or async

  const getUserData = async () => {
    const userData = await Auth.currentAuthenticatedUser();
    const { username, preferred_username } = userData.attributes;
    setUserName(preferred_username);
    // setUserPicture(picture);
    setUserNumber(username);
  }

  useEffect(() => {
    getUserData();

  }, [])

  return (
    <View style={styles.profile}>
      {/* <Image
            style={styles.profile}
            source={{uri:picture}}
            resizeMode='contain'
            borderRadius={1000}
            PlaceholderContent={<ActivityIndicator />}
          // style={{styles.profile}} 
           />  */}
      <Avatar size={50} containerStyle={styles.profile} />

      <Text style={{ margin: 5 }}>{userName}</Text>
      <Text style={{ margin: 5 }}>{number}</Text>

    </View>
  )
}

const CustomDrawerContent = (props) => {
  // const [tab, setTab] = useState("private");
  const { navigation } = props;


  const logout = () => {
    // Auth.signOut();
    console.log("user _log out")
    // navigation.navigate('signUp');
  };
  // useEffect(() => {
  //   //         //for background notification
  //   messaging().onNotificationOpenedApp((remoteMessage) => {
  //     console.log(
  //       "Notification caused app to open from background state:",
  //       remoteMessage
  //     );
  //     const channel = JSON.parse(remoteMessage?.data?.channel || "");
  //     console.log('This message belongs to channel with id - ', channel.id);
  //     navigation.navigate("ChannelScreen", {
  //       screen: "Chat",
  //       params: { channelId: channel.id },
  //     });
  //   });
  //   // for notification when app is in quit state
  //   messaging()
  //     .getInitialNotification()
  //     .then((remoteMessage) => {
  //       if (remoteMessage) {
  //         console.log(
  //           "Notification caused app to open from quite state:",
  //           remoteMessage
  //         );
  //         const channel = JSON.parse(remoteMessage?.data?.channel || "");

  //         console.log("This message belongs to channel with id - ", channel.id);

  //         navigation.navigate("Channel", { channelId: channel.id });
  //       }
  //     });
  // }, [])


  return (
    <DrawerContentScrollView {...props} style={{ flex: 1 }}>
      {/* <Text style={styles.title}>notJust Development</Text> */}


      <View style={{ height: 200, }}>
        <TouchableOpacity
          onPress={() => (
            navigation.navigate('qrGenerator')
          )}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            // borderRadius: 200,
          }}>
          <CustomProfile {...props} />
          {/* <Image
            style={styles.profile}
            source={}
            resizeMode='contain'
            borderRadius={1000}

          // style={{styles.profile}} 
          /> */}
          {/* <Text style={{ margin: 5 }}> +91 7005183122</Text> */}
        </TouchableOpacity>
      </View>

      <View style={styles.tabs}>
        <TouchableOpacity
          style={styles.Ac}
          onPress={() => {
            navigation.navigate("AllChats");
          }}

        ><Text style={styles.drawerContent}>All Chats</Text>
          <Icon

            //  raised
            // reverse
            // solid
            size={20}
            name='chevron-right'
            type='feather'
            color='black'
            iconStyle={{ marginLeft: 110, }}
          // color='blue'
          // onPress={() => navigation.openDrawer()}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.Dm}
          onPress={() => {
            navigation.navigate("DMs");
          }}

        ><Text style={styles.drawerContent}>Direct Messages</Text>
          <Icon
            //  raised
            // reverse
            // solid
            size={20}
            name='chevron-right'
            type='feather'
            color='black'
            iconStyle={{ marginLeft: 50, }}
          // color='blue'
          // onPress={() => navigation.openDrawer()}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.Gr}
          onPress={() => {
            navigation.navigate("Groups");
          }}

        ><Text style={styles.drawerContent}>Groups</Text><Icon
            //  raised
            // reverse
            // solid
            size={20}
            name='chevron-right'
            type='feather'
            color='black'
            iconStyle={{ marginLeft: 120, }}
          // color='blue'
          // onPress={() => navigation.openDrawer()}
          /></TouchableOpacity>

        <TouchableOpacity
          style={styles.Fav}
          onPress={() => {
            navigation.navigate("Favourites");
          }}

        ><Text style={styles.drawerContent}>Favourite Chats</Text><Icon
            //  raised
            // reverse
            // solid
            size={20}
            name='chevron-right'
            type='feather'
            color='black'
            iconStyle={{ marginLeft: 55, }}
          // color='blue'
          // onPress={() => navigation.openDrawer()}
          /></TouchableOpacity>

        <TouchableOpacity
          style={styles.Co}
          onPress={() => {
            navigation.navigate("Contacts");
          }}

        ><Text style={styles.drawerContent}>Txtend Contacts</Text><Icon
            //  raised
            // reverse
            // solid
            size={20}
            name='chevron-right'
            type='feather'
            color='black'
            iconStyle={{ marginLeft: 75, }}
          // color='blue'
          // onPress={() => navigation.openDrawer()}
          /></TouchableOpacity>
        <TouchableOpacity
          style={styles.Se}
          onPress={() => {
            navigation.navigate("Settings");
          }}

        ><Text style={styles.drawerContent}>Settings</Text><Icon
            //  raised
            // reverse
            // solid
            size={20}
            name='chevron-right'
            type='feather'
            color='black'
            // color='blue'
            // onPress={() => navigation.openDrawer()}
            iconStyle={{ marginLeft: 100, }}
          /></TouchableOpacity>

        {/* <Button
            
            title="Log Out"
            onPress={logout}
          />*/}
      </View>
    </DrawerContentScrollView>

  );
};

const styles = StyleSheet.create({
  drawerContent: {
    alignContent: 'flex-start',
    alignItems: 'flex-start',
    // alignSelf: 'flex-start',
    color: '#707070',
    // marginEnd: 100,
    // marginStart: 20,
    // marginHorizontal: 50,
    // marginLeft: 0,
    // position: 'absolute',
    // marginRight:
  },
  title: {
    color: "white",
    fontWeight: "bold",
    alignSelf: "center",
    fontSize: 16,
    margin: 10,
  },
  groupTitle: {
    margin: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
  profile: {
    width: '70%',
    height: '70%',
    margin: 10,

  },
  tabs: {
    // flexDirection: "row",
    // justifyContent: "space-evenl",
    // paddingVertical: 5,
    justifyContent: 'center',
    margin: 10,
    // shadowRadius: 5,
    // flex: 5,
    // alignItems: 'center',
    // alignContent: 'center',
    // borderRadius: 10,
    // borderColor: '#000000',
    //  marginRight: 50,
  },
  logout: {
    color: "white",
    fontWeight: "bold",
    margin: 10,
    textAlign: "center",
  },
  icon: {
    marginRight: 10,
    backgroundColor: '#4885ed',
    height: 40,
    width: 70,
    borderRadius: 50,
    // justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',

    marginBottom: 5,
  },
  Ac: {
    flex: 1,
    flexDirection: 'row',
    // alignContent: 'flex-start',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'right',
    margin: 5,
    backgroundColor: '#edeaea',
    borderRadius: 10,
    height: 50,
    // fontWeight: 'bold',
    // shadowRadius: 50,
    // shadowColor: "#000000"

    // width: '90%',
    // padding: 10,
    // position: "relative",
  },
  Dm: {
    flexDirection: 'row',
    alignContent: 'space-between',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'right',
    margin: 5,
    backgroundColor: '#e4edf2',
    borderRadius: 10,
    height: 50,
    fontWeight: 'bold',
    shadowRadius: 50,
  },
  Gr: {
    flexDirection: 'row',
    alignContent: 'space-between',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'right',
    margin: 5,
    backgroundColor: '#e4f2ec',
    borderRadius: 10,
    height: 50,
    fontWeight: 'bold',
  },
  Fav: {
    flexDirection: 'row',
    alignContent: 'space-between',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'right',
    margin: 5,
    backgroundColor: '#f2e4e4',
    borderRadius: 10,
    height: 50,
    fontWeight: 'bold',
  },
  Co: {
    flexDirection: 'row',
    alignContent: 'space-between',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'right',
    margin: 5,
    backgroundColor: '#f1f2e4',
    borderRadius: 10,
    height: 50,
    fontWeight: 'bold',
  },
  Se: {
    flexDirection: 'row',
    alignContent: 'space-between',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'right',
    margin: 5,
    backgroundColor: '#edeaea',
    borderRadius: 10,
    height: 50,
    fontWeight: 'bold',
  },


});

// const actions = [{}
//   // {
//   //   text: "Accessibility",
//   //   icon: require("./images/ic_accessibility_white.png"),
//   //   name: "bt_accessibility",
//   //   position: 2
//   // },
//   // {
//   //   text: "Language",
//   //   icon: require("./images/ic_language_white.png"),
//   //   name: "bt_language",
//   //   position: 1
//   // },
//   // {
//   //   text: "Location",
//   //   icon: require("./images/ic_room_white.png"),
//   //   name: "bt_room",
//   //   position: 3
//   // },
//   // {
//   //   text: "Video",
//   //   icon: require("./images/ic_videocam_white.png"),
//   //   name: "bt_videocam",
//   //   position: 4
//   // }
// ];

// const InviteMember = (props) => {
//   const { userId } = useAuthContext();

//   const { navigation } = props;

//   const onChannelSelect = (channel) => {
//     // navigate to a screen for this channel
//     navigation.navigate("ChannelScreen", {
//       screen: "Chat",
//       params: { channel },
//     });
//   };
//   const publicFilters = {
//     type: { $ne: "messaging" },
//     members: { $in: [userId] },
//   };
//   return (
//     <ChannelList onSelect={onChannelSelect} filters={publicFilters} />
//   )
// }

// const MembersAddIcon = (props) => {
//   // if (!route?.params?.channel) {
//   //   return null;
//   // }
//   const { navigation } = props;

//   return (
//     // <Pressable
//     //   // style={styles.icon}
//     //   onPress={() =>
//     //     <>
//     //     <NewChannelScreen/>
//     //     </>
//     //   }
//     // >
//     //   <FontAwesome5 name="users" size={24} color="lightgray" />
//     // </Pressable>
//     <View style={{
//       backgroundColor: "white",
//       opacity: 1,
//       flexDirection: "row",
//       justifyContent: "center",
//       alignItems:"center"

//     }}>
//       {/* <Text>Floating Action example</Text> */}
//       {/* <FloatingAction
//         // actions={actions}
//         onPressItem={name => {
//           console.log('selected button');
//         }}
//       />
//       <FAB
//                 color="blue"
//                 size="small"
//                 icon={{ name: 'edit', color: 'white', size: 20, }}
//                 onPress={()=> console.log('pres')}

//               /> */}
//       <Icon 

//         // raised
//         // reverse
//         // solid
//         size={35}
//         name='wind'
//         type='feather'
//         color='rgba(90, 154, 230, 1)'
//         // color='blue'
//         onPress={() => navigation.toggleDrawer()}

//       />
//     </View>
//   );
// };



// const AllChats = (props) => {
//   const { userId } = useAuthContext();

//   const { navigation } = props;

//   const onChannelSelect = (channel) => {
//     // navigate to a screen for this channel
//     navigation.navigate("ChannelScreen", {
//       screen: "Chat",
//       params: { channel },
//     });
//   };
//   const onNewChat = () => {
//     // console.log('press')
//     // navigate to a screen for this channel
//     navigation.navigate("Contacts");
//   };
//   const publicFilters = {
//     // type: { $ne: "messaging" },
//     members: { $in: [userId] },
//   };
//   return (
//     <OverlayProvider >
//       <SafeAreaView style={{ height: 120, }}>
//         <View style={{
//           // color: 'white',
//           // opacity: 1,
//           flexDirection: "row",
//           justifyContent: 'space-evenly',
//           alignItems: 'center',
//           // margin: 10,
//           height: 90,
//           alignContent: 'space-between',
//           // borderBottomRightRadius: 30,
//           // backgroundColor: 'rgba(90,154,230,1)',
//           // borderBottomWidth: 2,
//           // borderBottomColor: 'lightgray',
//           backgroundColor: 'white',
//         }}>
//           <Icon
//             containerStyle={{
//               width: 60,
//               height: 40,
//               alignContent: 'center',
//               justifyContent: 'center',

//             }}
//             raised
//             reverse
//             solid
//             size={30}
//             name='chevrons-right'
//             type='feather'
//             color='#4c8bf5'
//             // color='blue'
//             onPress={() => navigation.openDrawer()}

//           />
//           <Text style={{ fontWeight: '700', fontSize: 18, marginHorizontal: 60, }}>All Chats</Text>
//           <Button
//             raised
//             // reverse
//             onPress={onNewChat}
//             title="+ Chat"
//             // icon={{
//             //   name: 'dingding',
//             //   type: 'ant-design',
//             //   size: 20,
//             //   color: 'rgba(90, 154, 230, 1)',
//             // }}
//             iconContainerStyle={{ marginRight: 0 }}
//             titleStyle={{ fontWeight: '600', color: '#4c8bf5' }}
//             buttonStyle={{
//               backgroundColor: 'white',
//               borderColor: 'gray',
//               // borderWidth: 0,
//               // borderRadius: 30,
//               // width: 10,
//               height: 45,
//               // shadowRadius: 1,
//               // shadowOffset: {width: 5, height: 15},
//               // shadowColor: 'black',
//               // shadowOpacity: 1,
//               // borderRadius: 2,
//             }}
//             containerStyle={{
//               width: 100,
//               marginHorizontal: 0,
//               marginVertical: 5,
//               // marginBottom: 15,
//               borderRadius: 30,
//               // marginStart: 60,
//             }}
//           />
//         </View>
//       </SafeAreaView>

//       <ChannelList onSelect={onChannelSelect} filters={publicFilters} />
//     </OverlayProvider>
//   )
// }



const PrivateChats = (props) => {
  const { userId } = useAuthContext();

  const { navigation } = props;

  const onChannelSelect = (channel) => {
    // navigate to a screen for this channel
    navigation.navigate("ChannelScreen", {
      screen: "Chat",
      params: { channel },
    });
  };
  const privateFilters = { type: "messaging", members: { $in: [userId] } };
  return (
    <OverlayProvider >
      <SafeAreaView style={{ height: 120, }}>
        <View style={{
          // color: 'white',
          // opacity: 1,
          flexDirection: "row",
          justifyContent: 'space-evenly',
          alignItems: 'center',
          // margin: 10,
          height: 90,
          alignContent: 'space-between',
          // borderBottomRightRadius: 30,
          // backgroundColor: 'rgba(90,154,230,1)',
          // borderBottomWidth: 2,
          // borderBottomColor: 'lightgray',

        }}>
          <Icon

            // raised
            // reverse
            solid
            size={25}
            name='chevrons-right'
            type='feather'
            color='#4c8bf5'
            // color='blue'
            onPress={() => navigation.openDrawer()}

          />
          <Text style={{ fontWeight: '700', fontSize: 20, }}>Group Chats</Text>
          <Button
            // raised
            onPress={() => { }}
            title="Group +"
            // icon={{
            //   name: 'dingding',
            //   type: 'ant-design',
            //   size: 20,
            //   color: 'rgba(90, 154, 230, 1)',
            // }}
            iconContainerStyle={{ marginRight: 10 }}
            titleStyle={{ fontWeight: '600', color: '#4c8bf5' }}
            buttonStyle={{
              backgroundColor: 'transparent',
              borderColor: 'gray',
              borderWidth: 0,
              borderRadius: 30,
              // width: 10,
              height: 45,
              // shadowRadius: 1,
              // shadowOffset: {width: 5, height: 15},
              // shadowColor: 'black',
              // shadowOpacity: 1,
              // borderRadius: 2,
            }}
            containerStyle={{
              width: 100,
              marginHorizontal: 0,
              marginVertical: 5,
              // marginBottom: 15,
              borderRadius: 30,
              marginStart: 80,
            }}
          />
        </View>
      </SafeAreaView>

      <ChannelList onSelect={onChannelSelect} filters={privateFilters} />
    </OverlayProvider>
  )
}



export default DrawerNavigator;
