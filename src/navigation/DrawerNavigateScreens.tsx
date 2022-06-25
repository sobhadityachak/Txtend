import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import { Text, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Avatar, ChannelList, OverlayProvider } from "stream-chat-expo";
import { useAuthContext } from "../contexts/AuthContext";
// import ChannelScreen from "../screens/chatScreens/ChannelScreen";
// import { Auth } from "aws-amplify";
import React from "react";
import UserListScreen from "../screens/userlist/UserListScreen";
// import Button from "../components/Button";
// import ChannelMembersScreen from "../screens/chatScreens/ChannelMembersScreen";
// import  from "@expo/vector-icons";
import NewChannelScreen from "../screens/NewChannelScreen";
import ChannelStack from "./ChannelStack";
import { TouchableOpacity } from "react-native-gesture-handler";
// import { favCon } from "../../assets/profile.jpg";
// import Navigation from ".";
import SignUpScreen from "../screens/authentication/SignUpScreen";
// import Colors from "../constants/Colors";
// import { AntDesign } from '@expo/vector-icons';
// import { FloatingAction } from "react-native-floating-action";
import { Button, Icon } from "@rneui/themed"
import SettingScreen from "../screens/settings/SettingScreen";
import GroupChats from "../screens/channels/GroupchatScreen";
// import qrCodeGenerator from "../screens/barcode/qrcodeGenerator";
// import { Auth } from "aws-amplify";
import QrCodeGenerator from "../screens/barcode/qrcodeGenerator";
import AllChats from "../screens/channels/AllChatsScreen";
import Dms from "../screens/channels/DMchatsScreen";
import FavouritesScreen from "../screens/channels/FavouritesScreen";
import qrCodeScanner from "../screens/barcode/qrcodeScanner";
// import { Auth } from "aws-amplify";
// import messaging from '@react-native-firebase/messaging'

const Drawer = createDrawerNavigator();
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
        name="DMs"
        component={Dms}
        options={{
          title: "Direct Messages",
          // drawerLabel: {{focused: true, color:'white'}}
        }}
      />
      <Drawer.Screen
        name="AllChats"
        component={AllChats}
        options={{ title: "All Chats" }}
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
      {/* <Drawer.Screen
        name="PrivateChat"
        component={PrivateChats}
        options={{ title: "Private Chat" }}
      /> */}
      <Drawer.Screen
        name="Favourites"
        component={FavouritesScreen}
        options={{ title: "Favourites" }}
      />
      <Drawer.Screen
        name="Settings"
        component={SettingScreen}
        options={{ title: "Settings",
         headerShadowVisible:true, headerTitleAlign:'center'}}
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
      <Drawer.Screen
      name="qrScanner"
      component={qrCodeScanner}
      />
    </Drawer.Navigator>

  );
};

const CustomProfile = () => {

  return (
    <View >
      {/* <Image
            style={styles.profile}
            source={{uri:picture}}
            resizeMode='contain'
            borderRadius={1000}
            PlaceholderContent={<ActivityIndicator />}
          // style={{styles.profile}} 
           />  */}
      <Avatar size={80} containerStyle={styles.profile} />

      {/* <Text style={{ margin: 5 }}>{userName}</Text> */}
      {/* <Text style={{ margin: 5 }}>{number}</Text> */}

    </View>
  )
}

const CustomDrawerContent = (props) => {
  // const [tab, setTab] = useState("private");
  const { navigation } = props;
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
            iconStyle={{ marginLeft: 57, }}
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
            iconStyle={{ marginLeft: 55, }}
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
            iconStyle={{ marginLeft: 108, }}
          /></TouchableOpacity>
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
    width: '90%',
    height: '90%',
    // margin: 10,

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
export default DrawerNavigator;
