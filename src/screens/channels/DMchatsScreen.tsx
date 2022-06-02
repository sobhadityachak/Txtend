import { Button, Icon } from "@rneui/base";
import React from "react";
import { SafeAreaView, View, Text } from "react-native";
import { OverlayProvider, ChannelList } from "stream-chat-expo";
import { useAuthContext } from "../../contexts/AuthContext";

const Dms = (props) => {
    const { userId } = useAuthContext();
  
    const { navigation } = props;
  
    const onChannelSelect = (channel) => {
      // navigate to a screen for this channel
      navigation.navigate("ChannelScreen", {
        screen: "Chat",
        params: { channelId: channel.id },
      });
    };
    const onNewChat = () => {
      // console.log('press')
      // navigate to a screen for this channel
      navigation.navigate("qrGenerator");
    };
    const privateFilters = { type: "messaging", members: { $in: [userId] } };
    return (<OverlayProvider >
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
          backgroundColor: 'white',
          // borderBottomWidth: 2,
          // borderBottomColor: 'lightgray',
  
        }}>
          <Icon
            containerStyle={{
              width: 55,
              height: 50,
              alignContent: 'center',
              justifyContent: 'center',
              marginRight: 0,
            }}
            raised
            // reverse
            solid
            size={25}
            // name='angle-dobule-right'
            // type='fontisto'
            name='user'
            type='ant-design'
            color='#4c8bf5'
            // color='blue'
            onPress={() => navigation.openDrawer()}
  
          />
          <Text style={{ 
            fontWeight: '700', 
            fontSize: 18,
            marginHorizontal: 33,
            // color:"white"
          }}>Direct messages</Text>
          <Button
            raised
            
            onPress={onNewChat}
            title="Chat"
            // titleStyle={{color: 'white'}}
            icon={{
              name: 'barcode',
              type: 'ant-design',
              size: 20,
              color: 'transparent',
              reverse: true,
            }}
            iconContainerStyle={{ }}
            titleStyle={{ fontWeight: '500', color: 'white' }}
            buttonStyle={{
              // backgroundColor: '#4c8bf5',
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
              width: 105,
              // marginHorizontal: 0,
              // marginVertical: 5,
              // marginBottom: 15,
              borderRadius: 30,
              // marginStart: 80,
              // alignSelf: 
            backgroundColor: '#4c8bf5'
            }}
          />
        </View>
      </SafeAreaView>
  
      <ChannelList onSelect={onChannelSelect} filters={privateFilters} />
    </OverlayProvider>
    )
  }
  export default Dms;