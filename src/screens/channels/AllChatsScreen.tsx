import { Icon, Button } from "@rneui/base";
// import { Button } from "@rneui/themed";
import React from "react";
import { SafeAreaView, View, Text } from "react-native";
import { OverlayProvider, ChannelList } from "stream-chat-expo";
import { useAuthContext } from "../../contexts/AuthContext1";

const AllChats = (props) => {
    const { userId } = useAuthContext();
  
    const { navigation } = props;
  
    const onChannelSelect = (channel) => {
      // navigate to a screen for this channel
      navigation.navigate("ChannelScreen", {
        screen: "Chat",
        params: { channel },
      });
    };
    const onNewChat = () => {
      // console.log('press')
      // navigate to a screen for this channel
      navigation.navigate("qrScanner");
    };
    const publicFilters = {
      // type: { $ne: "messaging" },
      members: { $in: [userId] },
    };
    return (
      <OverlayProvider >
        <SafeAreaView style={{ marginTop: 20, }}>
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
            backgroundColor: 'transparent',
            // borderBottomWidth: 50,
            // borderBottomColor: 'lightgray',
            // borderBottomEndRadius: -320,
          
          }}>
            <Icon
              containerStyle={{
                width: 60,
                height: 40,
                alignContent: 'center',
                justifyContent: 'center',
  
              }}
              raised
              reverse
              solid
              size={30}
              name='chevrons-right'
              type='feather'
              color='#4c8bf5'
              // color='blue'
              onPress={() => navigation.openDrawer()}
  
            />
            <Text style={{ 
                fontWeight: '700',
                fontSize: 18, 
                marginHorizontal: 60,
                }}>All Chats</Text>

            <Button
              raised
              // reverse
              onPress={onNewChat}
              title="+ Chat"
              // icon={{
              //   name: 'dingding',
              //   type: 'ant-design',
              //   size: 20,
              //   color: 'rgba(90, 154, 230, 1)',
              // }}
              iconContainerStyle={{ marginRight: 0 }}
              titleStyle={{ fontWeight: '600', color: '#4c8bf5' }}
              buttonStyle={{
                backgroundColor: 'white',
                borderColor: 'gray',
                // borderWidth: 0,
                // borderRadius: 30,
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
                // marginStart: 60,
              }}
            />
          </View>
        </SafeAreaView>
  
        <ChannelList onSelect={onChannelSelect} filters={publicFilters} />
      </OverlayProvider>
    )
  }
  export default AllChats;